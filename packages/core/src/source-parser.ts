import type { ParsedSource, CadRenderOptions } from './types.js';

export function parseSource(source: string): ParsedSource {
  const lines = source.trim().split('\n');

  // 判断是否为参数模式（任意行匹配 "key: value"）
  const isParameterMode = lines.some(l => /^\w+:\s/.test(l));

  if (!isParameterMode) {
    return { filePath: source.trim(), options: {} };
  }

  const params: Record<string, string> = {};
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)/);
    if (match) params[match[1]] = match[2].trim();
  }

  const options: CadRenderOptions = {};
  if (params.height) options.height = parseInt(params.height, 10);
  if (params.theme) options.theme = params.theme as CadRenderOptions['theme'];
  if (params.layers) options.initialLayers = params.layers.split(',').map(s => s.trim());

  return {
    filePath: params.file ?? '',
    options,
  };
}
