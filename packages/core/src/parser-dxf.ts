import DxfParser from 'dxf-parser';
import { aciToHex } from './aci-colors.js';
import type { CadDocument, CadLayer, BoundingBox, CadEntity } from './types.js';

function computeBoundingBox(entities: CadEntity[]): BoundingBox {
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  for (const e of entities) {
    const points: Array<{ x: number; y: number }> = [];

    if (e.vertices) {
      for (const v of e.vertices) {
        if (typeof v.x === 'number' && typeof v.y === 'number') {
          points.push({ x: v.x, y: v.y });
        }
      }
    }
    if (typeof e.x === 'number' && typeof e.y === 'number') {
      points.push({ x: e.x, y: e.y });
      if (typeof e.r === 'number') {
        points.push({ x: e.x + e.r, y: e.y + e.r });
        points.push({ x: e.x - e.r, y: e.y - e.r });
      }
    }
    if (e.position && typeof e.position.x === 'number') {
      points.push({ x: e.position.x, y: e.position.y });
      if (typeof e.radius === 'number') {
        points.push({ x: e.position.x + e.radius, y: e.position.y + e.radius });
        points.push({ x: e.position.x - e.radius, y: e.position.y - e.radius });
      }
    }
    if (e.center && typeof e.center.x === 'number') {
      points.push({ x: e.center.x, y: e.center.y });
      if (typeof e.radius === 'number') {
        points.push({ x: e.center.x + e.radius, y: e.center.y + e.radius });
        points.push({ x: e.center.x - e.radius, y: e.center.y - e.radius });
      }
    }
    if (e.start) points.push({ x: e.start.x, y: e.start.y });
    if (e.end) points.push({ x: e.end.x, y: e.end.y });

    for (const p of points) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }

  if (!isFinite(minX)) { minX = 0; maxX = 100; minY = 0; maxY = 100; }

  const width = maxX - minX || 1;
  const height = maxY - minY || 1;

  return {
    minX, minY, maxX, maxY,
    width, height,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

function detectUnits(header: Record<string, unknown> | undefined): CadDocument['units'] {
  const insunits = (header as Record<string, { value: number }> | undefined)?.['$INSUNITS']?.value;
  if (insunits === undefined) return 'unknown';
  if (insunits === 1 || insunits === 2 || insunits === 8 || insunits === 9 || insunits === 10) return 'imperial';
  if (insunits >= 4 && insunits <= 7) return 'metric';
  return 'unknown';
}

const RAD_TO_DEG = 180 / Math.PI;

// dxf-parser stores ARC/CIRCLE angles in radians; renderer's buildArc expects degrees
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeDxfAngles(e: any): any {
  if (e.type === 'ARC' && e.startAngle != null) {
    return { ...e, startAngle: e.startAngle * RAD_TO_DEG, endAngle: e.endAngle * RAD_TO_DEG };
  }
  return e;
}

// Apply INSERT transform to a single point
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformPt(p: any, ins: any, sx: number, sy: number, sz: number, cosR: number, sinR: number, bp: any) {
  const bx = (p.x ?? 0) - (bp.x ?? 0);
  const by = (p.y ?? 0) - (bp.y ?? 0);
  const bz = (p.z ?? 0) - (bp.z ?? 0);
  return {
    x: bx * sx * cosR - by * sy * sinR + (ins.x ?? 0),
    y: bx * sx * sinR + by * sy * cosR + (ins.y ?? 0),
    z: bz * sz + (ins.z ?? 0),
  };
}

// Apply INSERT transform to an entity's geometric fields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformEntity(entity: any, ins: any, sx: number, sy: number, sz: number, cosR: number, sinR: number, bp: any, insertLayer: string): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tp = (p: any) => transformPt(p, ins, sx, sy, sz, cosR, sinR, bp);
  const e = { ...entity };

  if (e.vertices)      e.vertices = e.vertices.map(tp);
  if (e.start)         e.start = tp(e.start);
  if (e.end)           e.end = tp(e.end);
  if (e.center)        e.center = tp(e.center);
  if (e.position)      e.position = tp(e.position);
  if (e.controlPoints) e.controlPoints = e.controlPoints.map(tp);
  if (e.fitPoints)     e.fitPoints = e.fitPoints.map(tp);
  if (e.points)        e.points = e.points.map(tp);   // SOLID points

  // ELLIPSE: majorAxisEndPoint is relative to center — only rotate/scale, do not translate
  if (e.majorAxisEndPoint) {
    const p = e.majorAxisEndPoint;
    e.majorAxisEndPoint = {
      x: p.x * sx * cosR - p.y * sy * sinR,
      y: p.x * sx * sinR + p.y * sy * cosR,
      z: (p.z ?? 0) * sz,
    };
  }

  // Scale radius for circles/arcs (uniform scale approximation)
  if (e.radius != null) {
    e.radius = e.radius * Math.max(Math.abs(sx), Math.abs(sy));
  }

  // ByBlock layer (layer "0" inside a block definition) inherits INSERT's layer
  if (!e.layer || e.layer === '0') e.layer = insertLayer;

  return e;
}

// Recursively expand INSERT and DIMENSION entities using block definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expandEntities(rawEntities: any[], blocks: Record<string, any>, depth: number): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [];

  for (const e of rawEntities) {
    if (e.type === 'INSERT' && depth < 8) {
      const block = blocks[e.name as string];
      if (block?.entities?.length) {
        const ins = e.position ?? { x: 0, y: 0, z: 0 };
        const sx = e.xScale ?? 1;
        const sy = e.yScale ?? 1;
        const sz = e.zScale ?? 1;
        // DXF INSERT rotation is in DEGREES
        const rot = ((e.rotation ?? 0) * Math.PI) / 180;
        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);
        const bp = block.position ?? { x: 0, y: 0, z: 0 };
        const insertLayer = (e.layer as string) ?? '0';

        const expanded = expandEntities(block.entities, blocks, depth + 1);
        for (const be of expanded) {
          result.push(transformEntity(be, ins, sx, sy, sz, cosR, sinR, bp, insertLayer));
        }

        // Array insert: repeat for rowCount × columnCount
        const rows = (e.rowCount as number) ?? 1;
        const cols = (e.columnCount as number) ?? 1;
        if (rows > 1 || cols > 1) {
          const rowSpacing = (e.rowSpacing as number) ?? 0;
          const colSpacing = (e.columnSpacing as number) ?? 0;
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (r === 0 && c === 0) continue; // already added above
              const arrIns = {
                x: ins.x + c * colSpacing,
                y: ins.y + r * rowSpacing,
                z: ins.z ?? 0,
              };
              const arrExpanded = expandEntities(block.entities, blocks, depth + 1);
              for (const be of arrExpanded) {
                result.push(transformEntity(be, arrIns, sx, sy, sz, cosR, sinR, bp, insertLayer));
              }
            }
          }
        }
      }
      // skip the INSERT entity itself — geometry is now in the expanded entities
    } else if (e.type === 'DIMENSION' && depth < 8) {
      // Expand the dimension geometry block (contains actual dimension lines/arrowheads)
      const blockName = e.block as string | undefined;
      if (blockName && blocks[blockName]?.entities?.length) {
        const expanded = expandEntities(blocks[blockName].entities, blocks, depth + 1);
        for (const be of expanded) {
          result.push({ ...be, layer: be.layer || e.layer || '0' });
        }
      }
      // Keep the DIMENSION entity itself for potential future text rendering
      result.push(e);
    } else {
      result.push(normalizeDxfAngles(e));
    }
  }

  return result;
}

export function parseDxf(content: string): CadDocument {
  const parser = new DxfParser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = parser.parseSync(content) as any;

  const rawLayers = raw?.tables?.layer?.layers ?? {};
  const layers: CadLayer[] = Object.values(rawLayers).map((layer: unknown) => {
    const l = layer as Record<string, unknown>;
    return {
      name: String(l.name ?? '0'),
      color: Number(l.color ?? 7),
      colorHex: aciToHex(Number(l.color ?? 7)),
      visible: !l.frozen,
      frozen: Boolean(l.frozen),
      lineWeight: Number(l.lineWeight ?? 0),
    };
  });

  if (!layers.find(l => l.name === '0')) {
    layers.unshift({ name: '0', color: 7, colorHex: '#ffffff', visible: true, frozen: false, lineWeight: 0 });
  }

  const blocks: Record<string, unknown> = raw?.blocks ?? {};
  const rawEntities: CadEntity[] = raw?.entities ?? [];

  // Expand INSERT (block references) and DIMENSION geometry blocks
  const entities: CadEntity[] = expandEntities(rawEntities, blocks, 0);
  const boundingBox = computeBoundingBox(entities);

  return {
    layers,
    entities,
    boundingBox,
    units: detectUnits(raw?.header),
    sourceFormat: 'dxf',
  };
}
