export type {
  CadDocument,
  CadLayer,
  CadEntity,
  BoundingBox,
  CadRenderOptions,
  ParsedSource,
  CadViewerInstance,
  FileReaderAdapter,
} from './types.js';

export { parseSource } from './source-parser.js';
export { parseDxf } from './parser-dxf.js';
export { parseDwg } from './parser-dwg.js';
export { CadRenderer } from './renderer.js';
export { LayerManager } from './layer-manager.js';
export { aciToHex } from './aci-colors.js';
export { resolveThemeBackground, getIsDark } from './theme.js';

import { parseDxf } from './parser-dxf.js';
import { parseDwg } from './parser-dwg.js';
import { CadRenderer } from './renderer.js';
import { LayerManager } from './layer-manager.js';
import { parseSource } from './source-parser.js';
import type { CadRenderOptions, CadViewerInstance, FileReaderAdapter } from './types.js';

/**
 * 底层渲染函数：在容器中渲染已读取的 CAD 文件内容
 */
export async function renderCad(
  container: HTMLElement,
  fileContent: Uint8Array,
  fileName: string,
  options?: CadRenderOptions,
): Promise<CadViewerInstance> {
  const opts = options ?? {};
  const isDwg = fileName.toLowerCase().endsWith('.dwg');

  const doc = isDwg
    ? await parseDwg(fileContent, opts.dwgWasmBaseUrl)
    : parseDxf(new TextDecoder().decode(fileContent));

  const cadRenderer = new CadRenderer(container, opts);
  await cadRenderer.loadDocument(doc);

  const layerManager = opts.showLayerPanel !== false
    ? new LayerManager(container, (layerName, visible) => {
        cadRenderer.setLayerVisibility(layerName, visible);
      })
    : null;

  layerManager?.render(doc.layers);

  return {
    dispose() {
      layerManager?.dispose();
      cadRenderer.dispose();
    },
    setLayerVisibility(layer, visible) {
      cadRenderer.setLayerVisibility(layer, visible);
    },
    resetCamera() {
      cadRenderer.resetCamera();
    },
    getLayers() {
      return cadRenderer.getLayers();
    },
  };
}

/**
 * 工厂函数：给定平台适配器，生成完整的平台渲染函数
 */
export function createCadRenderer(adapter: FileReaderAdapter) {
  return async function render(
    container: HTMLElement,
    source: string,
    docPath: string | null,
    isDark: boolean,
  ): Promise<CadViewerInstance> {
    const { filePath, options } = parseSource(source);

    if (!filePath) {
      container.textContent = 'MorCad: no file path specified.';
      return {
        dispose: () => {},
        setLayerVisibility: () => {},
        resetCamera: () => {},
        getLayers: () => [],
      };
    }

    const absolutePath = adapter.resolvePath(filePath, docPath);
    const fileContent = await adapter.readFile(absolutePath);

    const finalOptions: CadRenderOptions = {
      theme: isDark ? 'dark' : 'light',
      ...options,
    };

    return renderCad(container, fileContent, filePath, finalOptions);
  };
}
