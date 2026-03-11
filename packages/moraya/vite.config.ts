import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['three', '@morcad/core', '@tauri-apps/api', '@tauri-apps/api/core'],
    },
    outDir: 'dist',
    sourcemap: true,
  },
});
