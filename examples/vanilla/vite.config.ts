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
    port: 8080,
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
        const wasmPath = resolve(__dirname, '../../node_modules/@mlightcad/libredwg-web/wasm/libredwg-web.wasm');
        server.middlewares.use('/libredwg-web.wasm', (_req, res) => {
          if (existsSync(wasmPath)) {
            res.setHeader('Content-Type', 'application/wasm');
            createReadStream(wasmPath).pipe(res);
          } else {
            res.statusCode = 404;
            res.end('libredwg-web.wasm not found');
          }
        });
      },
    },
  ],
});
