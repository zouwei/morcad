import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { BoundingBox } from './types.js';

export function fitCameraToBox(
  camera: THREE.OrthographicCamera,
  controls: OrbitControls,
  bb: BoundingBox,
  rendererWidth: number,
  rendererHeight: number,
): void {
  const padding = 1.1;
  const halfW = (bb.width * padding) / 2;
  const halfH = (bb.height * padding) / 2;
  const aspect = rendererWidth / rendererHeight;

  const halfSize = Math.max(halfW / aspect, halfH);
  camera.left = -halfSize * aspect;
  camera.right = halfSize * aspect;
  camera.top = halfSize;
  camera.bottom = -halfSize;
  camera.position.set(bb.centerX, bb.centerY, 100);
  camera.updateProjectionMatrix();
  controls.target.set(bb.centerX, bb.centerY, 0);
  controls.update();
}
