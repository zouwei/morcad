import { createCadRenderer as d } from "@morcad/core";
import { invoke as o } from "@tauri-apps/api/core";
const i = {
  async readFile(e) {
    const r = await o("read_file_binary", { path: e });
    return new Uint8Array(r);
  },
  resolvePath(e, r) {
    return r ? `${r.replace(/[/\\][^/\\]+$/, "")}/${e.replace(/^\.\//, "")}` : e;
  }
}, s = d(i);
function c(e) {
  return {
    async readFile(r) {
      const n = await e(r);
      return typeof n == "string" ? new TextEncoder().encode(n) : Array.isArray(n) ? new Uint8Array(n) : n;
    },
    resolvePath: i.resolvePath
  };
}
const f = {
  id: "cad-viewer",
  name: "CAD Viewer (DXF/DWG)",
  description: "Renders AutoCAD DXF/DWG engineering drawings inline. DWG support uses a GPLv3 WASM module loaded on demand.",
  stars: 0,
  npmPackage: "@morcad/moraya",
  exportName: "",
  sizeKb: 800,
  languages: ["morcad", "dxf", "dwg"],
  homepage: "https://github.com/zouwei/morcad",
  cdnUrl: "https://cdn.jsdelivr.net/gh/zouwei/morcad@v0.2.8/packages/moraya/dist/index.bundle.js",
  isFilePathRenderer: !0,
  aiHint: "Use ```dxf for DXF files, ```dwg for DWG files, or ```morcad for parameter mode. Examples:\n```dxf\n./drawings/floor-plan.dxf\n```\n```morcad\nfile: ./drawings/floor-plan.dxf\nlayers: WALLS, DOORS\nheight: 500\n```",
  async render(e, r, n, a) {
    const t = document.documentElement.getAttribute("data-theme") === "dark";
    return typeof n == "function" ? d(
      c(n)
    )(e, r, a ?? null, t) : s(e, r, a ?? null, t);
  }
};
export {
  s as cadRender,
  f as cadRendererPlugin,
  i as tauriFileAdapter
};
//# sourceMappingURL=index.js.map
