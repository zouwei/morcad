import type { CadLayer } from './types.js';

export class LayerManager {
  private container: HTMLElement;
  private panel: HTMLElement | null = null;
  private onToggle: (layerName: string, visible: boolean) => void;
  private layerStates: Map<string, boolean> = new Map();

  constructor(
    container: HTMLElement,
    onToggle: (layerName: string, visible: boolean) => void,
  ) {
    this.container = container;
    this.onToggle = onToggle;
  }

  render(layers: CadLayer[]): void {
    if (this.panel) this.panel.remove();

    for (const l of layers) {
      this.layerStates.set(l.name, l.visible);
    }

    this.panel = document.createElement('div');
    Object.assign(this.panel.style, {
      position: 'absolute',
      top: '8px',
      right: '8px',
      background: 'rgba(30,30,30,0.85)',
      color: '#eee',
      borderRadius: '6px',
      padding: '6px 8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: '10',
      backdropFilter: 'blur(4px)',
      userSelect: 'none',
    });

    const title = document.createElement('div');
    title.textContent = 'Layers';
    Object.assign(title.style, { fontWeight: 'bold', marginBottom: '4px', color: '#aaa', fontSize: '11px' });
    this.panel.appendChild(title);

    for (const layer of layers) {
      const row = document.createElement('label');
      Object.assign(row.style, { display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '2px 0' });

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = layer.visible;
      checkbox.style.accentColor = layer.colorHex;
      checkbox.addEventListener('change', () => {
        this.layerStates.set(layer.name, checkbox.checked);
        this.onToggle(layer.name, checkbox.checked);
      });

      const swatch = document.createElement('span');
      Object.assign(swatch.style, {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '2px',
        background: layer.colorHex,
        border: '1px solid rgba(255,255,255,0.2)',
        flexShrink: '0',
      });

      const name = document.createElement('span');
      name.textContent = layer.name;
      name.style.overflow = 'hidden';
      name.style.textOverflow = 'ellipsis';
      name.style.whiteSpace = 'nowrap';

      row.appendChild(checkbox);
      row.appendChild(swatch);
      row.appendChild(name);
      this.panel.appendChild(row);
    }

    // Make container relatively positioned for absolute panel overlay
    if (getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }
    this.container.appendChild(this.panel);
  }

  dispose(): void {
    this.panel?.remove();
    this.panel = null;
  }
}
