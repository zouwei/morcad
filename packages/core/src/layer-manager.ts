import type { CadLayer } from './types.js';

export class LayerManager {
  private container: HTMLElement;
  private panel: HTMLElement | null = null;
  private onToggle: (layerName: string, visible: boolean) => void;
  private layerStates: Map<string, boolean> = new Map();
  private isDark: boolean;

  constructor(
    container: HTMLElement,
    onToggle: (layerName: string, visible: boolean) => void,
    isDark = false,
  ) {
    this.container = container;
    this.onToggle = onToggle;
    this.isDark = isDark;
  }

  render(layers: CadLayer[]): void {
    if (this.panel) this.panel.remove();

    for (const l of layers) {
      this.layerStates.set(l.name, l.visible);
    }

    const dark = this.isDark;
    const bg = dark ? 'rgba(50,50,50,0.75)' : 'rgba(240,240,240,0.88)';
    const fg = dark ? '#eee' : '#333';
    const titleColor = dark ? '#aaa' : '#666';
    const swatchBorder = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';

    this.panel = document.createElement('div');
    Object.assign(this.panel.style, {
      position: 'absolute',
      top: '40px',
      right: '8px',
      background: bg,
      color: fg,
      borderRadius: '6px',
      padding: '6px 8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxHeight: '200px',
      maxWidth: '140px',
      minWidth: '100px',
      overflowY: 'auto',
      zIndex: '10',
      backdropFilter: 'blur(4px)',
      userSelect: 'none',
      boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.15)',
    });

    const title = document.createElement('div');
    title.textContent = 'Layers';
    Object.assign(title.style, { fontWeight: 'bold', marginBottom: '4px', color: titleColor, fontSize: '11px' });
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
        border: `1px solid ${swatchBorder}`,
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

    // Make container relatively positioned for absolute panel overlay.
    // Also clip horizontal overflow so the canvas never causes a scrollbar.
    if (getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }
    this.container.style.overflowX = 'hidden';
    this.container.appendChild(this.panel);
  }

  dispose(): void {
    this.panel?.remove();
    this.panel = null;
  }
}
