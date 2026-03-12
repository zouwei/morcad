import { createCadRenderer } from '@morcad/core';
import type { FileReaderAdapter } from '@morcad/core';
import { tauriFileAdapter } from './file-reader.js';

/**
 * Bound render function: used by Moraya's renderer-registry.ts render() entry.
 * Signature matches createCadRenderer output: (container, source, docPath, isDark)
 */
export const cadRender = createCadRenderer(tauriFileAdapter);

/**
 * Build a FileReaderAdapter from a Moraya-injected readFile function.
 * Moraya passes readFile as the `mod` argument to render():
 *   readFile(absolutePath: string): Promise<Uint8Array | number[] | string>
 */
function adapterFromReadFile(
  readFile: (path: string) => Promise<Uint8Array | number[] | string>,
): FileReaderAdapter {
  return {
    async readFile(absolutePath) {
      const result = await readFile(absolutePath);
      if (typeof result === 'string') {
        return new TextEncoder().encode(result);
      }
      if (Array.isArray(result)) {
        return new Uint8Array(result);
      }
      return result;
    },
    resolvePath: tauriFileAdapter.resolvePath,
  };
}

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
  homepage: 'https://github.com/zouwei/morcad',
  cdnUrl: 'https://cdn.jsdelivr.net/gh/zouwei/morcad@v0.1.9/packages/moraya/dist/index.bundle.js',
  isFilePathRenderer: true,
  aiHint:
    'Use ```dxf for DXF files, ```dwg for DWG files, or ```morcad for parameter mode. ' +
    'Examples:\n```dxf\n./drawings/floor-plan.dxf\n```\n' +
    '```morcad\nfile: ./drawings/floor-plan.dxf\nlayers: WALLS, DOORS\nheight: 500\n```',

  async render(container: HTMLElement, source: string, _mod: unknown, docPath?: string | null) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    // If Moraya injects a readFile function via _mod, use it; otherwise fall back to Tauri IPC.
    if (typeof _mod === 'function') {
      const renderer = createCadRenderer(
        adapterFromReadFile(_mod as (path: string) => Promise<Uint8Array | number[] | string>),
      );
      return renderer(container, source, docPath ?? null, isDark);
    }
    return cadRender(container, source, docPath ?? null, isDark);
  },
};

export { tauriFileAdapter } from './file-reader.js';
