# MorCad 测试指南

> **适用版本**：v0.1.0
> **日期**：2026-03-11

---

## 前置条件

```bash
# 确保依赖已安装
cd /Users/liuyidao/Documents/huzou/morcad
pnpm install
```

---

## 路径 A：独立渲染测试（推荐先跑，无需 Moraya）

验证 `@morcad/core` 的 DXF 解析与 Three.js 渲染逻辑。

### 1. 构建 core 包

```bash
pnpm --filter @morcad/core build
```

### 2. 启动本地开发服务器

ES modules 不能通过 `file://` 加载，需要 HTTP 服务：

```bash
cd examples/vanilla
npx serve . -l 8080
# 或
python3 -m http.server 8080
```

### 3. 打开浏览器

访问 `http://localhost:8080`

### 预期结果

| 操作 | 预期 |
|------|------|
| 选择 `floor-plan.dxf` | 渲染平面图：外墙矩形 + 内隔墙 + 门弧线 + 窗口线段 |
| 选择 `electrical.dxf` | 渲染电气图：布线框 + 插座圆形 + 开关交叉线 |
| 选择 `mechanical-part.dxf` | 渲染机械零件：矩形轮廓（圆角弧） + 中心线 + 4 个安装孔圆形 + 中心通孔 |
| 鼠标滚轮 | 缩放图纸 |
| 鼠标拖拽 | 平移图纸 |
| 点击 Reset Camera | 恢复初始视角 |
| 右上角图层面板 | 列出图层（含色块），勾选框可切换显示/隐藏 |
| 取消勾选某图层 | 对应线条消失 |

---

## 路径 B：Moraya 集成测试（端到端）

### 1. 构建自包含 Bundle

将 `@morcad/moraya` 及其全部依赖（three.js、dxf-parser 等）打包为单一 ESM 文件：

```bash
cd /Users/liuyidao/Documents/huzou/morcad
pnpm --filter @morcad/moraya build:bundle
# 生成：packages/moraya/dist/index.bundle.js（约 800 KB）
```

### 2. 安装到 Moraya 插件缓存（模拟 CDN 下载）

```bash
mkdir -p ~/Library/Application\ Support/com.moraya.app/renderer-plugins/cad-viewer
cp /Users/liuyidao/Documents/huzou/morcad/packages/moraya/dist/index.bundle.js \
   ~/Library/Application\ Support/com.moraya.app/renderer-plugins/cad-viewer/index.js
```

### 3. 启动 Moraya 开发环境

```bash
cd /Users/liuyidao/Documents/huzou/moraya
pnpm tauri dev
```

### 4. 在 Moraya 中启用插件

打开插件面板 → 找到 **CAD Viewer (DXF/DWG)** → 点击启用。

### 5. 准备测试文件

将示例 DXF 文件复制到桌面或任意已保存的 Markdown 文档目录：

```bash
cp /Users/liuyidao/Documents/huzou/morcad/examples/sample-files/floor-plan.dxf ~/Desktop/
```

### 6. 创建测试文档

在 Moraya 新建 Markdown 文件，**保存到桌面**（文件需保存才能解析相对路径），写入：

````markdown
## DXF 渲染测试

```dxf
./floor-plan.dxf
```

## 图层过滤测试

```morcad
file: ./floor-plan.dxf
layers: WALLS
height: 300
```
````

切换到 Preview 模式。

### 预期结果

| 代码块 | 预期 |
|--------|------|
| ` ```dxf ` | 完整渲染 floor-plan.dxf，显示所有图层 |
| ` ```morcad ` 带参数 | 只渲染 WALLS 图层，高度 300px |
| 切换文件/关闭标签 | GPU 资源自动释放（无 console 错误） |

---

## 路径 C：DWG 渲染测试

DWG 格式需要 `@mlightcad/libredwg-web` WASM（约 5 MB，懒加载）。

### 获取测试 DWG 文件

DWG 是二进制专有格式，无法从文本生成。请通过以下方式获取测试文件：

**方式 1：从 LibreDWG 测试套件下载（推荐）**

```bash
# 需要网络连接
bash examples/scripts/get-sample-dwg.sh
# 下载 example_2000.dwg 和 example_2007.dwg 到 examples/sample-files/
```

**方式 2：用 CAD 软件创建**

使用 AutoCAD、LibreCAD（`brew install --cask librecad`）或 FreeCAD 创建并保存为 DWG R2000 格式。

**方式 3：使用现有 DWG 文件**

直接在 Vanilla Demo 文件选择器中拖入任意 `.dwg` 文件。

### 测试步骤

1. 准备好 `.dwg` 文件后，启动演示：
   ```bash
   pnpm dev:demo
   ```

2. 在浏览器中打开 `http://localhost:8080`

3. 使用文件选择器上传 `.dwg` 文件

### 预期结果

| 状态 | 说明 |
|------|------|
| 正常 | 渲染图纸线条，显示图层面板，可缩放/平移 |
| WASM 加载时延 | 首次加载 DWG 会下载约 5 MB WASM，稍有延迟 |
| 解析错误 | `status` 区域显示 "Error: ..." 消息，不会白屏崩溃 |

---

## 类型检查 & 构建验证

```bash
# morcad 仓库
cd /Users/liuyidao/Documents/huzou/morcad
pnpm typecheck   # 应输出：Done（无 error）
pnpm build       # 应成功生成 packages/core/dist/ 和 packages/moraya/dist/

# moraya 仓库
cd /Users/liuyidao/Documents/huzou/moraya
pnpm check       # 应输出：0 errors
```

---

## 已知限制（v0.1.0）

| 限制 | 说明 | 计划版本 |
|------|------|---------|
| CDN 下载失败 | `@morcad/moraya` 未发布到 npm，用步骤 2 手动安装绕过 | 发布后自动解决 |
| 未保存文档的相对路径 | `docPath` 为 null，相对路径无法解析；保存文档后正常 | v0.2.0 |
| DWG 支持 | `parser-dwg.ts` 已用正确 LibreDwg API 实现；需真实 DWG 文件测试（见路径 C） | v0.2.0 |
| DWG 示例文件 | 二进制 DWG 无法脚本生成，需从 LibreDWG 测试套件下载或用 CAD 软件创建 | 手动添加 |
| Text/MText 实体 | 不渲染文字标注 | v0.3.0 |
| Insert（图块引用）| 不展开图块 | v0.3.0 |
