import { invoke } from '@tauri-apps/api/core';
import type { FileReaderAdapter } from '@morcad/core';

export const tauriFileAdapter: FileReaderAdapter = {
  async readFile(absolutePath: string): Promise<Uint8Array> {
    // Tauri IPC：读取文件二进制内容（绕过 WebView 沙箱）
    const bytes = await invoke<number[]>('read_file_binary', { path: absolutePath });
    return new Uint8Array(bytes);
  },

  resolvePath(relativePath: string, docPath: string | null): string {
    if (!docPath) return relativePath;
    const docDir = docPath.replace(/[/\\][^/\\]+$/, '');
    return `${docDir}/${relativePath.replace(/^\.\//, '')}`;
  },
};
