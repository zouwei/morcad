# MorCad — DXF/DWG Inline CAD Viewer

> Render AutoCAD DXF and DWG engineering drawings inline in Markdown documents — as naturally as embedding a Mermaid diagram.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

---

## Overview

MorCad is a CAD file renderer plugin for [Moraya](https://github.com/zouwei/moraya) and Obsidian. It renders `.dxf` and `.dwg` engineering drawings directly inside Markdown code blocks using Three.js WebGL with an orthographic camera — no separate viewer window needed.

**Supported platforms:**

| Platform | Integration | Status |
|----------|-------------|--------|
| Moraya | `RendererPlugin` | v0.1.0 |
| Obsidian | `registerMarkdownCodeBlockProcessor` | Planned v0.2.0 |

---

## Usage

### Basic (file path)

````markdown
```dxf
./drawings/floor-plan.dxf
```
````

````markdown
```dwg
./drawings/building.dwg
```
````

### With parameters (v0.2.0)

````markdown
```morcad
file: ./electrical-plan.dxf
layers: WALLS, DOORS, ELECTRICAL
height: 500
theme: auto
```
````

File paths are relative to the current Markdown document's directory.

---

## Features

- **DXF rendering** — pure JavaScript, no WASM, MIT stack
- **DWG rendering** — LibreDWG compiled to WebAssembly, loaded on demand (~5 MB)
- **Orthographic camera** — correct 2D engineering drawing projection, no perspective distortion
- **Layer panel** — toggle layer visibility with a collapsible overlay
- **Dark / light theme** — follows the host editor's theme automatically
- **Pan & zoom** — mouse wheel / two-finger pinch + drag to pan
- **Entity support** — LINE, ARC, CIRCLE, LWPOLYLINE, POLYLINE, SPLINE, ELLIPSE, INSERT (block expansion), HATCH, DIMENSION, SOLID, TEXT

---

## Repository Structure

```
morcad/
├── packages/
│   ├── core/          # Framework-agnostic rendering engine (Three.js)
│   ├── moraya/        # Moraya RendererPlugin adapter (Tauri IPC)
│   └── obsidian/      # Obsidian plugin adapter (planned)
├── examples/
│   └── vanilla/       # Plain HTML demo (no framework)
└── docs/
```

---

## Moraya Integration

### 1. Build the plugin bundle

```bash
pnpm build:moraya:bundle
# Output: packages/moraya/dist/index.bundle.js
```

### 2. Register in Moraya

Add to `src/lib/services/plugin/renderer-registry.ts`:

```typescript
import { cadRendererPlugin } from '@morcad/moraya';

export const RENDERER_PLUGINS = [
  // ...existing plugins
  cadRendererPlugin,
];
```

### 3. Add the Tauri command

```rust
// src-tauri/src/main.rs
#[tauri::command]
async fn read_file_binary(path: String) -> Result<Vec<u8>, String> {
    std::fs::read(&path).map_err(|e| e.to_string())
}
```

---

## Development

**Prerequisites:** Node.js 18+, pnpm 10+

```bash
# Install dependencies
pnpm install

# Build everything
pnpm build

# Build only core
pnpm build:core

# Build Moraya plugin bundle
pnpm build:moraya:bundle

# Watch mode (core + moraya in separate terminals)
pnpm dev:core
pnpm dev:moraya

# Run the vanilla demo
pnpm dev:demo
```

---

## License

This project is licensed under the **GNU General Public License v3.0**.

DWG support depends on [`@mlightcad/libredwg-web`](https://github.com/mlightcad/cad-viewer), which is compiled from [LibreDWG](https://www.gnu.org/software/libredwg/) (GPLv3). This license requirement applies to the entire project.

MorCad is distributed as an independent plugin. The host applications (Moraya, Obsidian) retain their own licenses. Users download this plugin voluntarily and separately from the host application.

See [LICENSE](./LICENSE) for the full license text.
