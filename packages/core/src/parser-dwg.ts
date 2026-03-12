import { aciToHex } from './aci-colors.js';
import type { CadDocument, CadLayer, CadEntity, BoundingBox } from './types.js';

let libredwgInstance: unknown = null;

const RAD_TO_DEG = 180 / Math.PI;
const TWO_PI = Math.PI * 2;

function computeBoundingBox(entities: CadEntity[]): BoundingBox {
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  function expand(x: number, y: number) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  for (const e of entities) {
    if (e.start) { expand(e.start.x, e.start.y); }
    if (e.end)   { expand(e.end.x,   e.end.y);   }
    if (e.center) {
      const r = e.radius ?? 0;
      expand(e.center.x - r, e.center.y - r);
      expand(e.center.x + r, e.center.y + r);
    }
    if (e.vertices) {
      for (const v of e.vertices as { x: number; y: number }[]) {
        expand(v.x, v.y);
      }
    }
  }

  if (!isFinite(minX)) { minX = 0; maxX = 100; minY = 0; maxY = 100; }

  const width = maxX - minX || 1;
  const height = maxY - minY || 1;
  return {
    minX, minY, maxX, maxY, width, height,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

type Pt3 = { x: number; y: number; z: number };

// Apply INSERT transform to a single point
function applyInsertTransform(
  p: { x: number; y: number; z?: number },
  ins: Pt3, sx: number, sy: number, sz: number,
  cosR: number, sinR: number, bp: Pt3,
): Pt3 {
  const bx = p.x - bp.x;
  const by = p.y - bp.y;
  const bz = (p.z ?? 0) - bp.z;
  return {
    x: bx * sx * cosR - by * sy * sinR + ins.x,
    y: bx * sx * sinR + by * sy * cosR + ins.y,
    z: bz * sz + ins.z,
  };
}

// Apply INSERT transform to all geometry fields of a mapped entity
function transformEntity(
  entity: CadEntity,
  ins: Pt3, sx: number, sy: number, sz: number,
  cosR: number, sinR: number, bp: Pt3,
): CadEntity {
  const tp = (p: { x: number; y: number; z?: number }) =>
    applyInsertTransform(p, ins, sx, sy, sz, cosR, sinR, bp);

  const e = { ...entity };
  if (e.start)    e.start    = tp(e.start);
  if (e.end)      e.end      = tp(e.end);
  if (e.center)   e.center   = tp(e.center);
  if (e.vertices) e.vertices = (e.vertices as { x: number; y: number; z?: number }[]).map(tp);

  // For CIRCLE/ARC: scale radius by uniform factor (approximate for non-uniform scale)
  if (e.radius != null) {
    e.radius = e.radius * Math.max(Math.abs(sx), Math.abs(sy));
  }
  return e;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEntity(e: any, db: any, depth = 0): CadEntity | CadEntity[] | null {
  // colorIndex: ACI value (0=ByBlock, 256=ByLayer, 1-255=explicit, absent=ByLayer)
  // negative colorIndex indicates the layer is turned off — use Math.abs
  const rawIdx = e.colorIndex;
  const aciColor = rawIdx != null ? Math.abs(rawIdx as number) : 256;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const base: Record<string, any> = {
    layer: e.layer ?? '0',
    color: aciColor,  // 256 = ByLayer
  };
  // If entity has 24-bit TrueColor (colorIndex absent) pass it through separately
  if (rawIdx == null && e.color != null) {
    base.trueColor = e.color as number;
  }

  switch (e.type) {
    case 'LINE':
      return {
        ...base,
        type: 'LINE',
        start: { x: e.startPoint.x, y: e.startPoint.y, z: e.startPoint.z ?? 0 },
        end:   { x: e.endPoint.x,   y: e.endPoint.y,   z: e.endPoint.z   ?? 0 },
      };

    case 'CIRCLE':
      return {
        ...base,
        type: 'CIRCLE',
        center: { x: e.center.x, y: e.center.y, z: e.center.z ?? 0 },
        radius: e.radius,
      };

    case 'ARC':
      // DWG binary stores angles in radians; renderer expects degrees
      return {
        ...base,
        type: 'ARC',
        center: { x: e.center.x, y: e.center.y, z: e.center.z ?? 0 },
        radius: e.radius,
        startAngle: e.startAngle * RAD_TO_DEG,
        endAngle:   e.endAngle   * RAD_TO_DEG,
      };

    case 'LWPOLYLINE':
      return {
        ...base,
        type: 'LWPOLYLINE',
        vertices: (e.vertices as { x: number; y: number }[]).map(v => ({ x: v.x, y: v.y })),
        shape: Boolean(e.flag & 1),  // bit 0 = closed
      };

    case 'POLYLINE':
    case 'POLYLINE2D':   // actual type name from @mlightcad/libredwg-web converter
    case 'POLYLINE3D': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const verts = (e.vertices as any[]).map((v: any) => ({
        x: v.x ?? v.point?.x ?? 0,
        y: v.y ?? v.point?.y ?? 0,
        z: v.z ?? v.point?.z ?? 0,
      }));
      if (verts.length < 2) return null;
      return { ...base, type: 'POLYLINE', vertices: verts };
    }

    case 'SPLINE': {
      // Use fit points when available (they lie on the curve); fall back to control points
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = e.fitPoints?.length > 0 ? e.fitPoints : (e.controlPoints ?? []);
      if (raw.length < 2) return null;
      return {
        ...base,
        type: 'POLYLINE',
        vertices: raw.map((p: { x: number; y: number; z?: number }) => ({ x: p.x, y: p.y, z: p.z ?? 0 })),
      };
    }

    case 'ELLIPSE': {
      // Sample the parametric ellipse equation into a polyline
      const cx = e.center?.x ?? 0, cy = e.center?.y ?? 0, cz = e.center?.z ?? 0;
      const majorX = e.majorAxisEndPoint?.x ?? 1, majorY = e.majorAxisEndPoint?.y ?? 0;
      const majorLen = Math.sqrt(majorX * majorX + majorY * majorY);
      if (majorLen === 0) return null;
      const majorAngle = Math.atan2(majorY, majorX);
      const minorLen = majorLen * (e.axisRatio ?? 1);
      const startA = e.startAngle ?? 0;
      let endA = e.endAngle ?? TWO_PI;
      if (endA <= startA) endA += TWO_PI;
      const segs = 72;
      const vertices: Pt3[] = [];
      for (let i = 0; i <= segs; i++) {
        const t = startA + (i / segs) * (endA - startA);
        const ex = Math.cos(t) * majorLen;
        const ey = Math.sin(t) * minorLen;
        vertices.push({
          x: cx + ex * Math.cos(majorAngle) - ey * Math.sin(majorAngle),
          y: cy + ex * Math.sin(majorAngle) + ey * Math.cos(majorAngle),
          z: cz,
        });
      }
      return { ...base, type: 'POLYLINE', vertices };
    }

    case 'SOLID': {
      // SOLID corners use DXF winding: 0,1,3,2 (not 0,1,2,3)
      const c1 = e.corner1 ?? { x: 0, y: 0 };
      const c2 = e.corner2 ?? c1;
      const c3 = e.corner3 ?? c2;
      const c4 = e.corner4 ?? c3;
      return {
        ...base,
        type: 'POLYLINE',
        vertices: [c1, c2, c4, c3, c1].map((c: { x: number; y: number; z?: number }) => ({
          x: c.x, y: c.y, z: c.z ?? 0,
        })),
      };
    }

    case '3DFACE': {
      const c1 = e.corner1, c2 = e.corner2, c3 = e.corner3, c4 = e.corner4 ?? e.corner3;
      if (!c1 || !c2 || !c3) return null;
      return {
        ...base,
        type: '3DFACE',
        vertices: [c1, c2, c3, c4].map((c: { x: number; y: number; z?: number }) => ({
          x: c.x, y: c.y, z: c.z ?? 0,
        })),
      };
    }

    case 'LEADER': {
      // Leader annotation lines (pointer lines to text)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const verts = (e.vertices as any[]) ?? [];
      if (verts.length < 2) return null;
      return {
        ...base,
        type: 'POLYLINE',
        vertices: verts.map((v: { x: number; y: number; z?: number }) => ({ x: v.x, y: v.y, z: v.z ?? 0 })),
      };
    }

    case 'DIMENSION': {
      // Expand DIMENSION's anonymous geometry block (contains lines, arcs, arrows)
      // The block name is stored in e.name (DWG) -- but we already have block records
      const dimBlockName: string = e.name ?? '';
      if (!dimBlockName) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blockRecords: any[] = db?.tables?.BLOCK_RECORD?.entries ?? [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const block = blockRecords.find((b: any) => b.name === dimBlockName);
      if (!block?.entities?.length) return null;
      const result: CadEntity[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const be of block.entities as any[]) {
        const mapped = mapEntity(be, db, depth + 1);
        if (!mapped) continue;
        const arr = Array.isArray(mapped) ? mapped : [mapped];
        result.push(...arr);
      }
      return result.length > 0 ? result : null;
    }

    case 'HATCH': {
      // Render HATCH boundary outline as polylines
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paths: any[] = e.boundaryPaths ?? [];
      const result: CadEntity[] = [];
      for (const path of paths) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const edges: any[] = path.edges ?? [];
        for (const edge of edges) {
          if (edge.type === 1 /* Line */) {
            result.push({ ...base, type: 'LINE', start: edge.start, end: edge.end });
          } else if (edge.type === 2 /* CircularArc */) {
            result.push({
              ...base, type: 'ARC',
              center: edge.center,
              radius: edge.radius,
              startAngle: edge.startAngle * RAD_TO_DEG,
              endAngle: edge.endAngle * RAD_TO_DEG,
            });
          } else if (edge.type === 3 /* EllipticArc */) {
            result.push({
              ...base, type: 'ELLIPSE',
              center: edge.center,
              majorAxisEndPoint: edge.majorAxisEndPoint,
              axisRatio: edge.minorToMajorRatio ?? 1,
              startAngle: edge.startAngle ?? 0,
              endAngle: edge.endAngle ?? TWO_PI,
            });
          } else if (edge.type === 4 /* Spline */) {
            const pts = edge.fitPoints?.length > 0 ? edge.fitPoints : (edge.controlPoints ?? []);
            if (pts.length >= 2) result.push({ ...base, type: 'POLYLINE', vertices: pts });
          }
        }
        // polyline boundary (no edges)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const polyPts: any[] = path.polylineVertices ?? [];
        if (polyPts.length >= 2) {
          result.push({
            ...base, type: 'POLYLINE',
            vertices: polyPts.map((p: { x: number; y: number }) => ({ x: p.x, y: p.y, z: 0 })),
          });
        }
      }
      return result.length > 0 ? result : null;
    }

    case 'TEXT':
      // DwgTextEntity extends DwgTextBase directly:
      //   e.text: string, e.startPoint: DwgPoint2D, e.textHeight: number, e.rotation: radians
      return {
        ...base,
        type: 'TEXT',
        text: String(e.text ?? ''),
        startPoint: { x: e.startPoint?.x ?? 0, y: e.startPoint?.y ?? 0, z: 0 },
        textHeight: e.textHeight ?? e.height ?? 1,
        rotation: (e.rotation ?? 0) * RAD_TO_DEG,
      };

    case 'ATTDEF':
    case 'ATTRIB': {
      // DwgAttdefEntity / DwgAttribEntity: text is a nested DwgTextBase object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tb = e.text as Record<string, any> | null; // DwgTextBase
      const attrText = String(tb?.text ?? e.tag ?? '');
      const attrPos = tb?.startPoint ?? e.startPoint ?? { x: 0, y: 0 };
      const attrH = tb?.textHeight ?? tb?.height ?? e.textHeight ?? e.height ?? 1;
      const attrRot = (tb?.rotation ?? e.rotation ?? 0) * RAD_TO_DEG;
      return {
        ...base,
        type: e.type as string,
        text: attrText,
        startPoint: { x: attrPos.x ?? 0, y: attrPos.y ?? 0, z: 0 },
        textHeight: attrH,
        rotation: attrRot,
      };
    }

    case 'MTEXT':
      // DwgMTextEntity: e.text: string, e.insertionPoint: DwgPoint3D, e.textHeight: number
      return {
        ...base,
        type: 'MTEXT',
        text: String(e.text ?? ''),
        position: e.insertionPoint ?? e.position ?? { x: 0, y: 0, z: 0 },
        height: e.textHeight ?? e.height ?? 1,
        rotation: (e.rotation ?? 0) * RAD_TO_DEG,
      };

    case 'INSERT': {
      if (depth >= 8) return null; // guard against infinite recursion

      const blockName: string = e.name ?? '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blockRecords: any[] = db?.tables?.BLOCK_RECORD?.entries ?? [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const block = blockRecords.find((b: any) => b.name === blockName);
      if (!block?.entities?.length) return null;

      const ins: Pt3 = {
        x: e.insertionPoint?.x ?? 0,
        y: e.insertionPoint?.y ?? 0,
        z: e.insertionPoint?.z ?? 0,
      };
      const sx = e.xScale ?? 1;
      const sy = e.yScale ?? 1;
      const sz = e.zScale ?? 1;
      const rot = e.rotation ?? 0; // radians (DWG binary)
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const bp: Pt3 = {
        x: block.basePoint?.x ?? 0,
        y: block.basePoint?.y ?? 0,
        z: block.basePoint?.z ?? 0,
      };

      // Layer/color inheritance: INSERT's layer overrides only if block entity uses ByBlock (0)
      const insertLayer = e.layer ?? '0';

      const result: CadEntity[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const be of block.entities as any[]) {
        const mapped = mapEntity(be, db, depth + 1);
        if (!mapped) continue;
        const arr = Array.isArray(mapped) ? mapped : [mapped];
        for (const r of arr) {
          const transformed = transformEntity(r, ins, sx, sy, sz, cosR, sinR, bp);
          // Inherit INSERT layer when entity uses layer "0" (ByBlock convention in blocks)
          if (transformed.layer === '0') transformed.layer = insertLayer;
          result.push(transformed);
        }
      }
      return result.length > 0 ? result : null;
    }

    default:
      return null;
  }
}

export async function parseDwg(content: Uint8Array, wasmBaseUrl?: string): Promise<CadDocument> {
  if (!libredwgInstance) {
    // 动态导入：仅遇到 .dwg 文件时才下载 ~5MB WASM（spec §14.2）
    const { LibreDwg } = await import('@mlightcad/libredwg-web') as {
      LibreDwg: { create(wasmDir?: string): Promise<unknown> };
    };
    // LibreDwg.create 内部拼接为 `${filepath}/${filename}`，需去除末尾斜杠避免双斜杠
    const baseUrl = wasmBaseUrl?.replace(/\/+$/, '');
    libredwgInstance = await LibreDwg.create(baseUrl);
  }

  const lib = libredwgInstance as {
    dwg_read_data(data: ArrayBuffer, fileType: number): unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    convert(ptr: unknown): any;
    dwg_free(ptr: unknown): void;
  };

  // fileType 0 = DWG
  const ptr = lib.dwg_read_data(content.buffer, 0);
  if (!ptr) throw new Error('Failed to parse DWG file');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = lib.convert(ptr) as any;
  lib.dwg_free(ptr);

  // ---- Layers ----
  const layers: CadLayer[] = (db.tables?.LAYER?.entries ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (l: any) => {
      // colorIndex can be negative when the layer is off; use Math.abs for actual ACI
      const colorIdx = Math.abs(Number(l.colorIndex ?? 7)) || 7;
      return {
        name:       String(l.name ?? '0'),
        color:      colorIdx,
        colorHex:   aciToHex(colorIdx),
        visible:    !l.frozen && !l.off,
        frozen:     Boolean(l.frozen),
        lineWeight: Number(l.lineweight ?? 0),
      };
    }
  );

  if (!layers.find(l => l.name === '0')) {
    layers.unshift({ name: '0', color: 7, colorHex: '#ffffff', visible: true, frozen: false, lineWeight: 0 });
  }

  // ---- Entities (model space, INSERT 展开) ----
  const entities: CadEntity[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const e of (db.entities ?? []) as any[]) {
    const mapped = mapEntity(e, db, 0);
    if (!mapped) continue;
    if (Array.isArray(mapped)) {
      entities.push(...mapped);
    } else {
      entities.push(mapped);
    }
  }

  const boundingBox = computeBoundingBox(entities);

  return { layers, entities, boundingBox, units: 'unknown', sourceFormat: 'dwg' };
}
