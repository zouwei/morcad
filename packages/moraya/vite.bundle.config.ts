/**
 * Self-contained bundle build config for CDN/marketplace distribution.
 *
 * Unlike the default vite.config.ts (which externalizes three, @morcad/core, etc.),
 * this config bundles ALL dependencies into a single ESM file suitable for:
 * - jsDelivr CDN: https://cdn.jsdelivr.net/npm/@morcad/moraya@{version}/dist/index.bundle.js
 * - Moraya plugin marketplace distribution
 *
 * Usage:
 *   pnpm --filter @morcad/moraya build:bundle
 *
 * The resulting dist/index.bundle.js is the file Moraya loads via its
 * renderer-loader.ts mechanism (Blob URL → dynamic import).
 */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ include: ['src'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index.bundle',
    },
    rollupOptions: {
      // Bundle everything — no externals.
      // @tauri-apps/api/core is still external: it is provided by the Tauri
      // WebView environment at runtime and cannot be bundled.
      external: ['@tauri-apps/api', '@tauri-apps/api/core'],
    },
    outDir: 'dist',
    sourcemap: true,
  },
});
