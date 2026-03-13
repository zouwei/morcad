import { defineConfig } from 'vite';
import { createReadStream, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: '.',
  // Serve sample DXF files at the URL root (e.g. /floor-plan.dxf)
  publicDir: '../sample-files',
  server: {
    port: 9090,
    strictPort: true,
    open: true,
  },
  optimizeDeps: {
    exclude: ['@mlightcad/libredwg-web'],
  },
  plugins: [
    {
      name: 'serve-libredwg-wasm',
      // Serve libredwg-web.wasm at /libredwg-web.wasm so the browser can
      // fetch the ~5 MB WASM binary needed for DWG parsing.
      configureServer(server) {
        // @mlightcad/libredwg-web 安装在 packages/core/node_modules 下（pnpm workspace 隔离）
        const candidates = [
          resolve(__dirname, '../../packages/core/node_modules/@mlightcad/libredwg-web/wasm/libredwg-web.wasm'),
          resolve(__dirname, '../../node_modules/@mlightcad/libredwg-web/wasm/libredwg-web.wasm'),
          resolve(__dirname, '../../node_modules/.pnpm/@mlightcad+libredwg-web@0.6.6/node_modules/@mlightcad/libredwg-web/wasm/libredwg-web.wasm'),
        ];
        const wasmPath = candidates.find(p => existsSync(p)) ?? candidates[0];
        server.middlewares.use('/libredwg-web.wasm', (_req, res) => {
          if (existsSync(wasmPath)) {
            res.setHeader('Content-Type', 'application/wasm');
            createReadStream(wasmPath).pipe(res);
          } else {
            res.statusCode = 404;
            res.end(`libredwg-web.wasm not found. Tried: ${candidates.join(', ')}`);
          }
        });
      },
    },
  ],
});
