import { aciToHex } from './aci-colors.js';
import type { CadDocument, CadLayer, CadEntity, BoundingBox } from './types.js';

let libredwgInstance: unknown = null;

const RAD_TO_DEG = 180 / Math.PI;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEntity(e: any): CadEntity | null {
  const base = {
    layer: e.layer ?? '0',
    color: e.colorIndex ?? 256,  // 256 = ByLayer
  };

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
        // DwgLWPolylineVertex extends DwgPoint2D (has .x, .y)
        vertices: (e.vertices as { x: number; y: number }[]).map(v => ({ x: v.x, y: v.y })),
        shape: Boolean(e.flag & 1),  // bit 0 = closed
      };

    case 'POLYLINE':
    case 'POLYLINE_2D':
    case 'POLYLINE_3D':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {
        ...base,
        type: 'POLYLINE',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        vertices: (e.vertices as any[]).map((v: any) => ({ x: v.x ?? v.point?.x ?? 0, y: v.y ?? v.point?.y ?? 0 })),
      };

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
    libredwgInstance = await LibreDwg.create(wasmBaseUrl);
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
    (l: any) => ({
      name:       String(l.name ?? '0'),
      color:      Number(l.colorIndex ?? 7),
      colorHex:   aciToHex(Number(l.colorIndex ?? 7)),
      visible:    !l.frozen && !l.off,
      frozen:     Boolean(l.frozen),
      lineWeight: Number(l.lineweight ?? 0),
    })
  );

  if (!layers.find(l => l.name === '0')) {
    layers.unshift({ name: '0', color: 7, colorHex: '#ffffff', visible: true, frozen: false, lineWeight: 0 });
  }

  // ---- Entities ----
  const entities: CadEntity[] = (db.entities ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((e: any) => mapEntity(e))
    .filter(Boolean) as CadEntity[];

  const boundingBox = computeBoundingBox(entities);

  return { layers, entities, boundingBox, units: 'unknown', sourceFormat: 'dwg' };
}
