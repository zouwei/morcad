/** 解析后的统一 CAD 文档数据结构 */
export interface CadDocument {
  layers: CadLayer[];
  entities: CadEntity[];
  boundingBox: BoundingBox;
  units: 'metric' | 'imperial' | 'unknown';
  sourceFormat: 'dxf' | 'dwg';
}

export interface CadLayer {
  name: string;
  color: number;      // AutoCAD 颜色索引（0-256）
  colorHex: string;   // 已转换的 CSS hex 色值
  visible: boolean;
  frozen: boolean;
  lineWeight: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CadEntity = Record<string, any>;

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

/** 渲染配置 */
export interface CadRenderOptions {
  height?: number;                    // 容器高度（px），默认 400
  theme?: 'light' | 'dark' | 'auto'; // 默认 'auto'
  mode?: '2d' | '3d';                // 渲染模式：2D 正交（默认）或 3D 透视
  initialLayers?: string[];          // 初始可见图层（默认全部可见）
  showLayerPanel?: boolean;          // 是否显示图层面板，默认 true
  backgroundColor?: string;          // 覆盖背景色
  /**
   * DWG 解析所需的 WASM 文件所在目录 URL，结尾带斜杠。
   * 浏览器中使用时必须设置，指向 libredwg-web.wasm 的服务地址。
   * 例：'/' 或 'https://cdn.example.com/wasm/'
   * Node.js/Tauri 中留空（使用本地文件路径）。
   */
  dwgWasmBaseUrl?: string;
}

/** 代码块内容解析结果 */
export interface ParsedSource {
  filePath: string;
  options: CadRenderOptions;
}

/** 渲染实例（外部控制句柄） */
export interface CadViewerInstance {
  dispose(): void;
  setLayerVisibility(layer: string, visible: boolean): void;
  resetCamera(): void;
  getLayers(): CadLayer[];
}

/**
 * 平台适配器接口
 * 唯一需要各平台自行实现的部分，隔离文件系统差异
 */
export interface FileReaderAdapter {
  readFile(absolutePath: string): Promise<Uint8Array>;
  resolvePath(relativePath: string, docPath: string | null): string;
}
