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
  // 1-8 is imperial-ish (feet, inches, miles, mm, cm, m, km, microinch, mil, yard, angstrom...)
  // 4 = mm, 5 = cm, 6 = m → metric; 1 = inches, 2 = feet → imperial
  if (insunits === 1 || insunits === 2 || insunits === 8 || insunits === 9 || insunits === 10) return 'imperial';
  if (insunits >= 4 && insunits <= 7) return 'metric';
  return 'unknown';
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

  // Ensure layer "0" always exists
  if (!layers.find(l => l.name === '0')) {
    layers.unshift({ name: '0', color: 7, colorHex: '#ffffff', visible: true, frozen: false, lineWeight: 0 });
  }

  const entities: CadEntity[] = raw?.entities ?? [];
  const boundingBox = computeBoundingBox(entities);

  return {
    layers,
    entities,
    boundingBox,
    units: detectUnits(raw?.header),
    sourceFormat: 'dxf',
  };
}
