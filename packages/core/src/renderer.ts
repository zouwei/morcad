import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { aciToHex } from './aci-colors.js';
import type { CadDocument, CadRenderOptions, CadLayer, BoundingBox, CadEntity } from './types.js';

export class CadRenderer {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera | THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private layerGroups: Map<string, THREE.Group> = new Map();
  private animationId: number | null = null;
  private layers: CadLayer[] = [];
  private is3D: boolean;
  private isDark: boolean;

  constructor(container: HTMLElement, options: CadRenderOptions) {
    const height = options.height ?? 400;
    this.is3D = options.mode === '3d';
    this.isDark = options.theme !== 'light';

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.resolveBackground(options));

    const aspect = container.clientWidth / height;

    if (this.is3D) {
      const cam = new THREE.PerspectiveCamera(45, aspect, 0.1, 10000000);
      cam.position.set(0, -500, 500);
      cam.up.set(0, 0, 1);
      this.camera = cam;
    } else {
      const cam = new THREE.OrthographicCamera(
        -aspect * 500, aspect * 500, 500, -500, 0.1, 1000000
      );
      cam.position.set(0, 0, 100);
      this.camera = cam;
    }

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(container.clientWidth, height);
    // display:block removes the inline-baseline gap; margin-top adds the requested top gap.
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.marginTop = '5px';
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableRotate = this.is3D;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.screenSpacePanning = true;

    this.startRenderLoop();
  }

  private resolveBackground(options: CadRenderOptions): string {
    if (options.backgroundColor) return options.backgroundColor;
    const theme = options.theme ?? 'auto';
    if (theme === 'light') return '#f5f5f5';
    // dark and auto both use engineering dark-canvas convention
    return '#1e1e1e';
  }

  private startRenderLoop(): void {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  async loadDocument(doc: CadDocument): Promise<void> {
    this.layers = doc.layers;

    for (const layer of doc.layers) {
      const group = new THREE.Group();
      group.name = layer.name;
      group.visible = layer.visible;
      this.layerGroups.set(layer.name, group);
      this.scene.add(group);
    }

    if (!this.layerGroups.has('0')) {
      const g = new THREE.Group();
      g.name = '0';
      this.layerGroups.set('0', g);
      this.scene.add(g);
    }

    // 坐标归一化：移除 XY 中心偏移，Z 从最小值归零
    const ox = doc.boundingBox.centerX;
    const oy = doc.boundingBox.centerY;
    const { minZ: rawMinZ, maxZ: rawMaxZ } = this.computeZExtent(doc.entities);
    const oz = rawMinZ;

    for (const entity of doc.entities) {
      const mesh = this.buildEntity(entity, doc, ox, oy, oz);
      if (mesh) {
        const layerName = entity.layer ?? '0';
        const group = this.layerGroups.get(layerName) ?? this.layerGroups.get('0');
        group?.add(mesh);
      }
    }

    const zDepth = rawMaxZ - rawMinZ;
    this.fitCameraToDocument(doc.boundingBox, zDepth);
  }

  private computeZExtent(entities: CadEntity[]): { minZ: number; maxZ: number } {
    let minZ = 0, maxZ = 0;
    const check = (z: number) => {
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    };
    for (const e of entities) {
      if (e.start?.z  != null) check(e.start.z);
      if (e.end?.z    != null) check(e.end.z);
      if (e.center?.z != null) check(e.center.z);
      if (e.vertices) {
        for (const v of e.vertices as { z?: number }[]) {
          if (v.z != null) check(v.z);
        }
      }
    }
    return { minZ, maxZ };
  }

  private resolveEntityColor(entity: CadEntity, doc: CadDocument): string {
    // ── DXF path (dxf-parser): entity has colorIndex (ACI) + color (24-bit RGB) ──
    if (entity.colorIndex != null) {
      const idx = entity.colorIndex as number;
      if (idx !== 0 && idx !== 256) {
        // Explicit ACI color — try 24-bit RGB first, fall back to ACI lookup
        const hex = entity.color != null
          ? '#' + (entity.color as number).toString(16).padStart(6, '0')
          : aciToHex(idx);
        return this.themeAdaptColor(hex);
      }
    } else {
      // ── DWG path (parser-dwg): color = ACI index, trueColor = 24-bit RGB ──
      const aci = entity.color as number | undefined;
      if (aci != null && aci !== 256 && aci !== 0) {
        return this.themeAdaptColor(aciToHex(aci));
      }
      // 24-bit TrueColor (when ACI is absent, ByBlock, or ByLayer)
      if (entity.trueColor != null) {
        return '#' + (entity.trueColor as number).toString(16).padStart(6, '0');
      }
    }
    const layer = doc.layers.find(l => l.name === (entity.layer ?? '0'));
    return this.themeAdaptColor(layer?.colorHex ?? '#ffffff');
  }

  /** ACI 7 is "white/black" (context-dependent in AutoCAD). Show as near-black on light themes. */
  private themeAdaptColor(hex: string): string {
    if (!this.isDark && hex.toLowerCase() === '#ffffff') return '#1a1a1a';
    return hex;
  }

  private buildEntity(
    entity: CadEntity,
    doc: CadDocument,
    ox: number,
    oy: number,
    oz: number,
  ): THREE.Object3D | null {
    const color = this.resolveEntityColor(entity, doc);
    const mat = new THREE.LineBasicMaterial({ color });

    switch (entity.type) {
      case 'LINE':
        return this.buildLine(entity, mat, ox, oy, oz);
      case 'CIRCLE':
        return this.buildCircle(entity, mat, ox, oy, oz);
      case 'ARC':
        return this.buildArc(entity, mat, ox, oy, oz);
      case 'POLYLINE':
      case 'LWPOLYLINE':
        return this.buildPolyline(entity, mat, ox, oy, oz);
      case '3DFACE':
        return this.buildFace3D(entity, mat, ox, oy, oz);
      case 'SPLINE':
        return this.buildSpline(entity, mat, ox, oy, oz);
      case 'ELLIPSE':
        return this.buildEllipse(entity, mat, ox, oy, oz);
      case 'SOLID':
        return this.buildSolid(entity, mat, ox, oy, oz);
      case 'TEXT':
      case 'ATTRIB':
      case 'MTEXT':
        return this.buildText(entity, color, ox, oy, oz);
      case 'SOLID_FILL':
        return this.buildSolidFill(entity, color, ox, oy, oz);
      default:
        return null;
    }
  }

  private buildLine(e: CadEntity, mat: THREE.LineBasicMaterial, ox: number, oy: number, oz: number): THREE.Line | null {
    const start = e.start ?? e.vertices?.[0];
    const end   = e.end   ?? e.vertices?.[1];
    if (!start || !end) return null;
    const points = [
      new THREE.Vector3(start.x - ox, start.y - oy, (start.z ?? 0) - oz),
      new THREE.Vector3(end.x   - ox, end.y   - oy, (end.z   ?? 0) - oz),
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geo, mat);
  }

  private buildCircle(e: CadEntity, mat: THREE.LineBasicMaterial, ox: number, oy: number, oz: number): THREE.Line | null {
    const cx = (e.center?.x ?? e.x ?? 0) - ox;
    const cy = (e.center?.y ?? e.y ?? 0) - oy;
    const cz = (e.center?.z ?? 0) - oz;
    const r = e.radius ?? e.r ?? 1;

    const segments = 64;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, cz));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geo, mat);
  }

  private buildArc(e: CadEntity, mat: THREE.LineBasicMaterial, ox: number, oy: number, oz: number): THREE.Line | null {
    const cx = (e.center?.x ?? e.x ?? 0) - ox;
    const cy = (e.center?.y ?? e.y ?? 0) - oy;
    const cz = (e.center?.z ?? 0) - oz;
    const r = e.radius ?? e.r ?? 1;
    let startAngle = (e.startAngle ?? 0) * (Math.PI / 180);
    let endAngle = (e.endAngle ?? 360) * (Math.PI / 180);

    if (endAngle < startAngle) endAngle += Math.PI * 2;

    const segments = 64;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = startAngle + (i / segments) * (endAngle - startAngle);
      points.push(new THREE.Vector3(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, cz));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geo, mat);
  }

  private buildPolyline(e: CadEntity, mat: THREE.LineBasicMaterial, ox: number, oy: number, oz: number): THREE.Line | null {
    if (!e.vertices || e.vertices.length < 2) return null;
    const points = e.vertices.map((v: { x: number; y: number; z?: number }) =>
      new THREE.Vector3(v.x - ox, v.y - oy, (v.z ?? 0) - oz)
    );
    if (e.shape) points.push(points[0].clone());
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geo, mat);
  }

  private buildSpline(e: CadEntity, mat: THREE.LineBasicMaterial, ox: number, oy: number, oz: number): THREE.Line | null {
    // Approximate spline using fit points (on-curve) or control points as fallback
    const pts: { x: number; y: number; z?: number }[] =
      (e.fitPoints?.length > 0 ? e.fitPoints : e.controlPoints) ?? [];
    if (pts.length < 2) return null;
    const points = pts.map((p: { x: number; y: number; z?: number }) =>
      new THREE.Vector3(p.x - ox, p.y - oy, (p.z ?? 0) - oz)
    );
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geo, mat);
  }

  private buildEllipse(e: CadEntity, mat: THREE.LineBasicMaterial, ox: number, oy: number, oz: number): THREE.Line | null {
    const cx = (e.center?.x ?? 0) - ox;
    const cy = (e.center?.y ?? 0) - oy;
    const cz = (e.center?.z ?? 0) - oz;
    const majorX = e.majorAxisEndPoint?.x ?? 1;
    const majorY = e.majorAxisEndPoint?.y ?? 0;
    const majorLen = Math.sqrt(majorX * majorX + majorY * majorY);
    if (majorLen === 0) return null;
    const majorAngle = Math.atan2(majorY, majorX);
    const minorLen = majorLen * (e.axisRatio ?? 1);
    // DXF ellipse angles are in radians
    const startA = e.startAngle ?? 0;
    let endA = e.endAngle ?? (Math.PI * 2);
    if (endA <= startA) endA += Math.PI * 2;
    const segs = 72;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segs; i++) {
      const t = startA + (i / segs) * (endA - startA);
      const ex = Math.cos(t) * majorLen;
      const ey = Math.sin(t) * minorLen;
      points.push(new THREE.Vector3(
        cx + ex * Math.cos(majorAngle) - ey * Math.sin(majorAngle),
        cy + ex * Math.sin(majorAngle) + ey * Math.cos(majorAngle),
        cz,
      ));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geo, mat);
  }

  private buildSolid(e: CadEntity, mat: THREE.LineBasicMaterial, ox: number, oy: number, oz: number): THREE.Line | null {
    // dxf-parser SOLID uses entity.points[0..3]; DWG parser already converts to POLYLINE
    const pts: { x: number; y: number; z?: number }[] = e.points ?? e.vertices ?? [];
    if (pts.length < 3) return null;
    const p0 = pts[0], p1 = pts[1], p2 = pts[2], p3 = pts[3] ?? pts[2];
    // DXF winding: 0,1,3,2 (not 0,1,2,3)
    const ordered = [p0, p1, p3, p2, p0];
    const points = ordered.map(p => new THREE.Vector3(p.x - ox, p.y - oy, (p.z ?? 0) - oz));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geo, mat);
  }

  private buildText(
    e: CadEntity,
    color: string,
    ox: number,
    oy: number,
    oz: number,
  ): THREE.Object3D | null {
    // TEXT uses startPoint; MTEXT uses position; ATTDEF/ATTRIB use startPoint or position
    const rawText = (e.text ?? e.string ?? '') as string;
    if (!rawText) return null;

    // Strip AutoCAD MTEXT formatting codes: {\...;content}, \P (paragraph break), \~ etc.
    const text = rawText
      .replace(/\{\\[^;]*;([^}]*)\}/g, '$1')
      .replace(/\\[Pp]/g, ' ')
      .replace(/\\[A-Za-z][^;]*;/g, '')
      .replace(/[{}]/g, '')
      .trim();
    if (!text) return null;

    const pos = e.startPoint ?? e.insertionPoint ?? e.position ?? { x: 0, y: 0, z: 0 };
    const height = Math.max(Number(e.textHeight ?? e.height ?? 1), 0.01);
    const rotation = ((e.rotation ?? 0) * Math.PI) / 180;

    // Build canvas texture
    const fontSize = 32;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.font = `${fontSize}px sans-serif`;
    const textW = ctx.measureText(text).width;
    canvas.width = Math.ceil(textW) + 4;
    canvas.height = fontSize + 8;
    // Re-apply font after canvas resize (resize resets context state)
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(material);

    const aspect = canvas.width / canvas.height;
    sprite.scale.set(height * aspect, height, 1);
    sprite.position.set(pos.x - ox, pos.y - oy, (pos.z ?? 0) - oz);
    // THREE.Sprite doesn't support rotation natively; encode it in material if needed
    // For non-zero rotations, use a workaround: rotate the sprite's parent group
    if (rotation !== 0) {
      const group = new THREE.Group();
      group.rotation.z = rotation;
      group.position.copy(sprite.position);
      sprite.position.set(0, 0, 0);
      group.add(sprite);
      return group;
    }

    return sprite;
  }

  private buildSolidFill(e: CadEntity, color: string, ox: number, oy: number, oz: number): THREE.Mesh | null {
    const raw = e.vertices as { x: number; y: number; z?: number }[] | undefined;
    if (!raw || raw.length < 3) return null;
    const all = raw.filter(v => isFinite(v.x) && isFinite(v.y));
    if (all.length < 3) return null;

    // IQR-based outlier filtering to remove corrupted extreme vertices.
    // Uses max(IQR, 5% of full range) as minimum fence so the filter
    // never collapses when many vertices share the same coordinate.
    const n = all.length;
    const xs = all.map(v => v.x).sort((a, b) => a - b);
    const ys = all.map(v => v.y).sort((a, b) => a - b);
    const q1x = xs[Math.floor(n * 0.25)], q3x = xs[Math.floor(n * 0.75)];
    const q1y = ys[Math.floor(n * 0.25)], q3y = ys[Math.floor(n * 0.75)];
    const fenceX = Math.max(q3x - q1x, (xs[n - 1] - xs[0]) * 0.05) * 4;
    const fenceY = Math.max(q3y - q1y, (ys[n - 1] - ys[0]) * 0.05) * 4;
    const pts = all.filter(v =>
      v.x >= q1x - fenceX && v.x <= q3x + fenceX &&
      v.y >= q1y - fenceY && v.y <= q3y + fenceY,
    );
    if (pts.length < 3) return null;

    // Bounding box of cleaned vertices
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const v of pts) {
      if (v.x < minX) minX = v.x; if (v.x > maxX) maxX = v.x;
      if (v.y < minY) minY = v.y; if (v.y > maxY) maxY = v.y;
    }
    const w = maxX - minX, h = maxY - minY;
    if (w + h < 1e-10) return null;
    if (Math.max(w, h) / Math.max(Math.min(w, h), 1e-10) > 500) return null;

    // Use HTML Canvas with evenodd fill rule — correctly handles DWG HATCH boundaries
    // that encode mainland + island detours as a single self-intersecting polyline.
    const MAX_DIM = 1024;
    const scale = MAX_DIM / Math.max(w, h);
    const cw = Math.max(4, Math.min(Math.ceil(w * scale) + 2, MAX_DIM + 2));
    const ch = Math.max(4, Math.min(Math.ceil(h * scale) + 2, MAX_DIM + 2));

    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const c = new THREE.Color(color);
    ctx.fillStyle = `rgb(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)})`;
    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      const px = (pts[i].x - minX) * scale + 1;
      const py = (maxY - pts[i].y) * scale + 1; // Y-flip: canvas Y grows down, world Y grows up
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill('evenodd');

    const texture = new THREE.CanvasTexture(canvas);
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,   // canvas background is transparent — must be true
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (minX + maxX) / 2 - ox,
      (minY + maxY) / 2 - oy,
      (pts[0].z ?? 0) - oz,
    );
    return mesh;
  }

  private buildFace3D(e: CadEntity, mat: THREE.LineBasicMaterial, ox: number, oy: number, oz: number): THREE.LineSegments | null {
    // 3DFACE: 4 vertices forming a quad (or tri if v3===v4); render as wireframe edges
    const verts = e.vertices as { x: number; y: number; z?: number }[] | undefined;
    if (!verts || verts.length < 3) return null;

    const v = verts.map(pt => new THREE.Vector3(pt.x - ox, pt.y - oy, (pt.z ?? 0) - oz));
    const v3 = v[3] ?? v[2]; // triangular face if v3 same as v2

    // Edges: 0-1, 1-2, 2-3, 3-0
    const points = [v[0], v[1], v[1], v[2], v[2], v3, v3, v[0]];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.LineSegments(geo, mat);
  }

  private fitCameraToDocument(bb: BoundingBox, zDepth: number): void {
    if (this.is3D) {
      this.fitCamera3D(bb, zDepth);
    } else {
      this.fitCamera2D(bb);
    }
  }

  private fitCamera2D(bb: BoundingBox): void {
    const padding = 1.1;
    const halfW = (bb.width * padding) / 2;
    const halfH = (bb.height * padding) / 2;
    const aspect = this.renderer.domElement.width / this.renderer.domElement.height;

    const cam = this.camera as THREE.OrthographicCamera;
    const halfSize = Math.max(halfW / aspect, halfH);
    cam.left   = -halfSize * aspect;
    cam.right  =  halfSize * aspect;
    cam.top    =  halfSize;
    cam.bottom = -halfSize;
    cam.position.set(0, 0, 100);
    cam.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  private fitCamera3D(bb: BoundingBox, zDepth: number): void {
    // Model is centred at (0,0) in XY after normalisation, and spans [0, zDepth] in Z.
    const cz = zDepth / 2;   // vertical centre of the model
    const maxExtent = Math.max(bb.width, bb.height, zDepth, 1);
    const dist = maxExtent * 1.6;

    const cam = this.camera as THREE.PerspectiveCamera;
    // Isometric-ish angle: camera at 45° azimuth, ~35° elevation
    cam.position.set(dist * 0.8, -dist * 0.8, cz + dist * 0.7);
    cam.up.set(0, 0, 1);
    cam.lookAt(0, 0, cz);
    cam.updateProjectionMatrix();
    this.controls.target.set(0, 0, cz);
    this.controls.update();
  }

  setLayerVisibility(layerName: string, visible: boolean): void {
    const group = this.layerGroups.get(layerName);
    if (group) group.visible = visible;
  }

  resetCamera(): void {
    this.controls.reset();
  }

  getLayers(): CadLayer[] {
    return this.layers;
  }

  dispose(): void {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);

    this.scene.traverse(obj => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineSegments) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) m.dispose();
      }
      if (obj instanceof THREE.Sprite) {
        const m = obj.material as THREE.SpriteMaterial;
        m.map?.dispose();
        m.dispose();
      }
    });

    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
