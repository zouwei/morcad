import { createCadRenderer } from '@morcad/core';
import { tauriFileAdapter } from './file-reader.js';

/**
 * Bound render function: used by Moraya's renderer-registry.ts render() entry.
 * Signature matches createCadRenderer output: (container, source, docPath, isDark)
 */
export const cadRender = createCadRenderer(tauriFileAdapter);

/**
 * RendererPlugin object for Moraya's renderer-registry.ts
 *
 * Register by adding this export to:
 *   src/lib/services/plugin/renderer-registry.ts → RENDERER_PLUGINS array
 */
export const cadRendererPlugin = {
  id: 'cad-viewer',
  name: 'CAD Viewer (DXF/DWG)',
  description:
    'Renders AutoCAD DXF/DWG engineering drawings inline. ' +
    'DWG support uses a GPLv3 WASM module loaded on demand.',
  stars: 0,
  npmPackage: '@morcad/moraya',
  exportName: '',
  sizeKb: 800,
  languages: ['morcad', 'dxf', 'dwg'],
  homepage: 'https://github.com/your-org/morcad',
  cdnUrl: '',
  isFilePathRenderer: true,
  aiHint:
    'Use ```dxf for DXF files, ```dwg for DWG files, or ```morcad for parameter mode. ' +
    'Examples:\n```dxf\n./drawings/floor-plan.dxf\n```\n' +
    '```morcad\nfile: ./drawings/floor-plan.dxf\nlayers: WALLS, DOORS\nheight: 500\n```',

  async render(container: HTMLElement, source: string, _mod: unknown, docPath?: string | null) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return cadRender(container, source, docPath ?? null, isDark);
  },
};

export { tauriFileAdapter } from './file-reader.js';
