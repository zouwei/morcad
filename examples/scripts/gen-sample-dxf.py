#!/usr/bin/env python3
"""
Generate complex DXF sample files for MorCad demos.
Run from project root:
    python3 examples/scripts/gen-sample-dxf.py
"""

import math
import os
from pathlib import Path

OUTPUT_DIR = Path(__file__).parent.parent / "sample-files"


# ── DXF writer helper ──────────────────────────────────────────────────────────

class DxfWriter:
    def __init__(self):
        self._lines: list[str] = []

    def _c(self, code: int, value) -> None:
        self._lines.append(str(code))
        self._lines.append(str(value))

    # ── Structure ──

    def begin(self, layers: list[tuple[str, int]]) -> None:
        """Write HEADER + TABLES sections."""
        # minimal HEADER
        self._c(0, "SECTION"); self._c(2, "HEADER")
        self._c(9, "$ACADVER"); self._c(1, "AC1015")
        self._c(9, "$INSUNITS"); self._c(70, 4)   # mm
        self._c(0, "ENDSEC")
        # TABLES
        self._c(0, "SECTION"); self._c(2, "TABLES")
        self._c(0, "TABLE");   self._c(2, "LAYER")
        self._c(70, len(layers))
        for name, color in layers:
            self._c(0, "LAYER")
            self._c(2, name)
            self._c(70, 0)
            self._c(62, color)
        self._c(0, "ENDTAB")
        self._c(0, "ENDSEC")
        # BLOCKS (empty)
        self._c(0, "SECTION"); self._c(2, "BLOCKS"); self._c(0, "ENDSEC")
        # ENTITIES header
        self._c(0, "SECTION"); self._c(2, "ENTITIES")

    def end(self) -> None:
        self._c(0, "ENDSEC"); self._c(0, "EOF")

    def save(self, path: Path) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("\n".join(self._lines) + "\n")
        print(f"  Written: {path}")

    # ── Primitives ──

    def _f(self, v: float) -> str:
        return f"{v:.4f}"

    def line(self, x1, y1, z1, x2, y2, z2, layer, color=None):
        self._c(0, "LINE"); self._c(8, layer)
        if color is not None: self._c(62, color)
        self._c(10, self._f(x1)); self._c(20, self._f(y1)); self._c(30, self._f(z1))
        self._c(11, self._f(x2)); self._c(21, self._f(y2)); self._c(31, self._f(z2))

    def circle(self, cx, cy, cz, r, layer, color=None):
        self._c(0, "CIRCLE"); self._c(8, layer)
        if color is not None: self._c(62, color)
        self._c(10, self._f(cx)); self._c(20, self._f(cy)); self._c(30, self._f(cz))
        self._c(40, self._f(r))

    def arc(self, cx, cy, cz, r, a0, a1, layer, color=None):
        self._c(0, "ARC"); self._c(8, layer)
        if color is not None: self._c(62, color)
        self._c(10, self._f(cx)); self._c(20, self._f(cy)); self._c(30, self._f(cz))
        self._c(40, self._f(r)); self._c(50, self._f(a0)); self._c(51, self._f(a1))

    def lwpoly(self, pts: list[tuple[float, float]], layer, closed=False, color=None):
        """LWPOLYLINE — pts are (x, y)."""
        self._c(0, "LWPOLYLINE"); self._c(8, layer)
        if color is not None: self._c(62, color)
        self._c(90, len(pts))
        self._c(70, 1 if closed else 0)
        for x, y in pts:
            self._c(10, self._f(x)); self._c(20, self._f(y))

    def face3d(self, v0, v1, v2, v3, layer, color=None):
        """3DFACE — each v is (x, y, z)."""
        self._c(0, "3DFACE"); self._c(8, layer)
        if color is not None: self._c(62, color)
        for i, (x, y, z) in enumerate([v0, v1, v2, v3]):
            self._c(10 + i, self._f(x))
            self._c(20 + i, self._f(y))
            self._c(30 + i, self._f(z))

    # ── Composite helpers ──

    def rect(self, x0, y0, x1, y1, layer, color=None):
        """Axis-aligned rectangle as LWPOLYLINE."""
        self.lwpoly([(x0, y0), (x1, y0), (x1, y1), (x0, y1)], layer, closed=True, color=color)

    def dim_line(self, x1, y1, x2, y2, layer="DIMENSION"):
        """Dimension line with tick marks."""
        self.line(x1, y1, 0, x2, y2, 0, layer)
        dx = x2 - x1; dy = y2 - y1
        length = math.hypot(dx, dy)
        if length == 0: return
        nx, ny = -dy / length * 50, dx / length * 50  # perpendicular tick
        for px, py in [(x1, y1), (x2, y2)]:
            self.line(px - nx, py - ny, 0, px + nx, py + ny, 0, layer)

    def centerline(self, x1, y1, x2, y2, layer="CENTERLINE", ext=100):
        """Centerline extending slightly past end-points."""
        dx = x2 - x1; dy = y2 - y1
        length = math.hypot(dx, dy)
        if length == 0: return
        ux, uy = dx / length, dy / length
        self.line(x1 - ux * ext, y1 - uy * ext, 0,
                  x2 + ux * ext, y2 + uy * ext, 0, layer)

    def door(self, hinge_x, hinge_y, dir_x, dir_y, width, layer_door="DOORS"):
        """Door symbol: hinge + opening line + swing arc (quarter circle)."""
        end_x = hinge_x + dir_x * width
        end_y = hinge_y + dir_y * width
        self.line(hinge_x, hinge_y, 0, end_x, end_y, 0, layer_door)
        # Determine arc start angle
        base_angle = math.degrees(math.atan2(dir_y, dir_x))
        # swing 90° counterclockwise
        a0 = base_angle
        a1 = base_angle + 90
        self.arc(hinge_x, hinge_y, 0, width, a0, a1, layer_door)

    def window(self, x0, y0, x1, y1, layer_win="WINDOWS"):
        """Window symbol: opening rect + two inner lines."""
        self.line(x0, y0, 0, x1, y1, 0, layer_win)
        # double line symbol perpendicular
        dx = x1 - x0; dy = y1 - y0
        mx, my = (x0 + x1) / 2, (y0 + y1) / 2
        length = math.hypot(dx, dy)
        if length == 0: return
        nx, ny = -dy / length * 120, dx / length * 120
        self.line(x0 + nx, y0 + ny, 0, x1 + nx, y1 + ny, 0, layer_win)
        self.line(x0 - nx, y0 - ny, 0, x1 - nx, y1 - ny, 0, layer_win)


# ── 1. floor-plan.dxf ─────────────────────────────────────────────────────────

def make_floor_plan() -> DxfWriter:
    """
    15m × 12m apartment.
    Rooms (mm):
      Living Room    : (0,0)     – (15000,3000)
      Kitchen        : (0,3000)  – (5000,7000)
      Hallway        : (5000,3000)– (6500,7000)
      Bathroom       : (6500,3000)– (10500,7000)
      Bedroom 2      : (10500,3000)–(15000,7000)
      Study          : (0,7000)  – (6500,12000)
      Master Bedroom : (6500,7000)–(15000,12000)
    """
    layers = [
        ("WALLS",      7),   # white
        ("DOORS",      3),   # green
        ("WINDOWS",    4),   # cyan
        ("FURNITURE",  2),   # yellow
        ("FIXTURES",   5),   # blue
        ("CENTERLINE", 1),   # red
        ("DIMENSION",  6),   # magenta
        ("ANNOTATION", 1),   # red
    ]
    d = DxfWriter()
    d.begin(layers)

    W, H = 15000, 12000  # outer dimensions

    # ── Outer walls ──
    d.lwpoly([(0, 0), (W, 0), (W, H), (0, H)], "WALLS", closed=True)

    # ── Interior horizontal walls ──
    d.line(0,     3000, 0,  W,     3000, 0, "WALLS")  # living/upper zone
    d.line(0,     7000, 0,  W,     7000, 0, "WALLS")  # upper zone / bedrooms

    # ── Interior vertical walls ──
    d.line(5000,  3000, 0,  5000,  7000, 0, "WALLS")  # kitchen | hallway
    d.line(6500,  3000, 0,  6500,  H,    0, "WALLS")  # hallway/bath | bed2/master
    d.line(10500, 3000, 0, 10500,  7000, 0, "WALLS")  # bath | bed2

    # ── Doors ──
    # Front door (south wall, living room, x=1200)
    d.door(1200, 0, 0, 1, 900, "DOORS")
    # Kitchen door from hallway (x=5000, y=4500)
    d.door(5000, 4200, 1, 0, 900, "DOORS")
    # Bathroom door from hallway (x=6500, y=4500)
    d.door(6500, 4500, 1, 0, 800, "DOORS")
    # Bedroom 2 door (y=7000 wall, x=11500)
    d.door(11500, 7000, 0, -1, 900, "DOORS")
    # Study door from hallway (x=5000, y=8000)
    d.door(5000, 8000, -1, 0, 900, "DOORS")
    # Master bedroom door (x=6500, y=9000)
    d.door(6500, 9500, 1, 0, 1000, "DOORS")
    # Living internal door
    d.door(6500, 1500, -1, 0, 900, "DOORS")

    # ── Windows ──
    # South wall (living room)
    d.window(3500, 0, 5500, 0, "WINDOWS")
    d.window(9000, 0, 11500, 0, "WINDOWS")
    # North wall (study / master bed)
    d.window(1500, H, 4000, H, "WINDOWS")
    d.window(8000, H, 11000, H, "WINDOWS")
    d.window(12000, H, 14000, H, "WINDOWS")
    # East wall (bedroom 2, master)
    d.window(W, 3800, W, 5800, "WINDOWS")
    d.window(W, 8500, W, 11000, "WINDOWS")
    # West wall (kitchen / study)
    d.window(0, 4200, 0, 6200, "WINDOWS")
    d.window(0, 9000, 0, 11500, "WINDOWS")

    # ── Furniture: Living Room (0,0)-(15000,3000) ──
    # Sofa L-shape
    d.rect(500,   400,  3500,  1200, "FURNITURE")   # main sofa
    d.rect(500,   400,  1000,  2000, "FURNITURE")   # side piece
    # Coffee table
    d.rect(1200,  1400, 2800,  2200, "FURNITURE")
    # TV unit on east wall section
    d.rect(7500,  100,  12500,  600, "FURNITURE")
    # Dining table + chairs
    d.rect(5200,  600,  7000,  2400, "FURNITURE")  # table
    for cy in [900, 1500, 2100]:
        d.circle(4900,  cy, 0, 200, "FURNITURE")   # chairs left
        d.circle(7300,  cy, 0, 200, "FURNITURE")   # chairs right
    d.circle(6100,  350,  0, 200, "FURNITURE")     # chair top
    d.circle(6100,  2650, 0, 200, "FURNITURE")     # chair bottom

    # ── Furniture: Kitchen (0,3000)-(5000,7000) ──
    # Counter along west & north wall (L-shape)
    d.rect(0,     3000,  600,  7000, "FURNITURE")   # west counter
    d.rect(0,     6400,  4800,  7000, "FURNITURE")  # north counter
    # Island
    d.rect(1200,  4400,  3800,  5600, "FURNITURE")
    # Refrigerator
    d.rect(4300,  3000,  5000,  4000, "FURNITURE")
    # Stove (4 burners)
    d.rect(200,   3050,  1400,  3950, "FURNITURE")
    for bx, by in [(500, 3250), (1100, 3250), (500, 3750), (1100, 3750)]:
        d.circle(bx, by, 0, 120, "FURNITURE")

    # ── Furniture: Bathroom (6500,3000)-(10500,7000) ──
    # Bathtub along east wall
    d.rect(9100,  3200, 10300, 6200, "FIXTURES")
    d.arc( 9700,  4700, 0, 500, 0, 360, "FIXTURES")  # inner oval approx
    # Toilet
    d.rect(6700,  3100,  7700,  4100, "FIXTURES")   # tank
    d.arc( 7200,  4500, 0, 600, 180, 360, "FIXTURES")  # bowl
    # Double sink
    d.rect(7000,  5800, 10000, 6700, "FIXTURES")
    d.circle(7900, 6250, 0, 280, "FIXTURES")
    d.circle(9100, 6250, 0, 280, "FIXTURES")
    # Shower (walk-in, corner)
    d.rect(6600,  4400, 8600,  6000, "FIXTURES")
    d.arc( 6600,  4400, 0, 500, 0, 90, "FIXTURES")   # drain position

    # ── Furniture: Bedroom 2 (10500,3000)-(15000,7000) ──
    d.rect(10700, 3200, 14800, 5800, "FURNITURE")   # queen bed
    d.rect(10700, 3200, 11700, 4200, "FURNITURE")   # pillow L
    d.rect(13800, 3200, 14800, 4200, "FURNITURE")   # pillow R
    d.rect(10700, 6100, 12200, 6900, "FURNITURE")   # wardrobe 1
    d.rect(13300, 6100, 14800, 6900, "FURNITURE")   # wardrobe 2
    d.rect(14200, 4000, 14800, 5800, "FURNITURE")   # nightstand
    d.circle(14500, 4900, 0, 150, "FURNITURE")      # lamp

    # ── Furniture: Study (0,7000)-(6500,12000) ──
    d.rect(200,   7200,  4000,  8200, "FURNITURE")   # desk
    d.circle(2100, 8700, 0, 350, "FURNITURE")        # office chair (circle)
    d.rect(200,   10500, 6000, 11800, "FURNITURE")   # bookshelf
    d.rect(4500,  7200,  6200,  9200, "FURNITURE")   # sofa/reading chair

    # ── Furniture: Master Bedroom (6500,7000)-(15000,12000) ──
    d.rect(8500,  7200, 14000, 10500, "FURNITURE")   # king bed
    d.rect(8500,  7200,  9800,  8500, "FURNITURE")   # pillow L
    d.rect(12700, 7200, 14000,  8500, "FURNITURE")   # pillow R
    d.rect(6700,  7200,  8200,  8800, "FURNITURE")   # nightstand L
    d.rect(14200, 7200, 14900,  8800, "FURNITURE")   # nightstand R
    d.circle(7450, 8000, 0, 200, "FURNITURE")        # lamp L
    d.circle(14550, 8000, 0, 200, "FURNITURE")       # lamp R
    d.rect(6600,  10800, 14900, 11800, "FURNITURE")  # walk-in wardrobe hint
    # Dressing table
    d.rect(6700, 9200, 8200, 10400, "FURNITURE")
    d.arc( 7450, 9200, 0, 600, 0, 180, "FURNITURE")  # mirror

    # ── Dimension lines ──
    # Overall width
    d.dim_line(0, -800, W, -800, "DIMENSION")
    # Overall height
    d.dim_line(-800, 0, -800, H, "DIMENSION")
    # Room widths
    d.dim_line(0,    -400, 5000,  -400, "DIMENSION")
    d.dim_line(5000, -400, 6500,  -400, "DIMENSION")
    d.dim_line(6500, -400, 10500, -400, "DIMENSION")
    d.dim_line(10500,-400, W,     -400, "DIMENSION")

    # ── Centerlines ──
    d.centerline(7500, 0, 7500, H)    # building X-axis
    d.centerline(0, 5000, W, 5000)    # building Y-axis

    d.end()
    return d


# ── 2. mechanical-part.dxf ────────────────────────────────────────────────────

def make_mechanical_part() -> DxfWriter:
    """
    Industrial flange bracket (mm):
    - Stepped body: 320×220 main plate with 80×60 boss
    - Bolt hole pattern: 6 × Ø18 on PCD Ø260
    - Central bore: Ø80 with keyway 20×30
    - Radiused corners R25
    - Two views: front + side sectional hints
    """
    layers = [
        ("OUTLINE",    7),  # white
        ("CENTERLINE", 1),  # red
        ("HIDDEN",     8),  # grey
        ("HOLES",      5),  # blue
        ("DIMENSION",  6),  # magenta
        ("SECTION",    3),  # green
        ("HATCH",      8),  # grey
    ]
    d = DxfWriter()
    d.begin(layers)

    # ─ Front view: flange face ─
    ox, oy = 0, 0
    W2, H2 = 320, 220   # flange outer

    # Outline – rect with rounded corners R25
    R = 25
    d.line(ox+R, oy,       0, ox+W2-R, oy,       0, "OUTLINE")
    d.line(ox+R, oy+H2,    0, ox+W2-R, oy+H2,    0, "OUTLINE")
    d.line(ox,   oy+R,     0, ox,      oy+H2-R,  0, "OUTLINE")
    d.line(ox+W2,oy+R,     0, ox+W2,   oy+H2-R,  0, "OUTLINE")
    d.arc(ox+R,    oy+R,    0, R, 180, 270, "OUTLINE")
    d.arc(ox+W2-R, oy+R,    0, R, 270, 360, "OUTLINE")
    d.arc(ox+W2-R, oy+H2-R, 0, R,   0,  90, "OUTLINE")
    d.arc(ox+R,    oy+H2-R, 0, R,  90, 180, "OUTLINE")

    # Central bore Ø80
    CX, CY = ox + W2/2, oy + H2/2
    d.circle(CX, CY, 0, 40, "OUTLINE")

    # Keyway on central bore (20 wide, 30 deep outward from top)
    kw = 10  # half-width
    d.line(CX-kw, CY+40, 0, CX-kw, CY+70, 0, "OUTLINE")
    d.line(CX+kw, CY+40, 0, CX+kw, CY+70, 0, "OUTLINE")
    d.line(CX-kw, CY+70, 0, CX+kw, CY+70, 0, "OUTLINE")

    # PCD circle (Ø260, bolt circle diameter)
    PCD = 130  # radius
    d.circle(CX, CY, 0, PCD, "CENTERLINE")

    # 6 bolt holes Ø18 on PCD
    for i in range(6):
        angle = math.radians(i * 60)
        hx = CX + PCD * math.cos(angle)
        hy = CY + PCD * math.sin(angle)
        d.circle(hx, hy, 0, 9,  "HOLES")       # through hole
        d.circle(hx, hy, 0, 14, "HIDDEN")      # counterbore Ø28 (shown hidden)

    # 4 small tapped holes Ø8 near center boss
    for angle in [45, 135, 225, 315]:
        a = math.radians(angle)
        hx = CX + 55 * math.cos(a)
        hy = CY + 55 * math.sin(a)
        d.circle(hx, hy, 0, 4, "HOLES")

    # Boss outline (Ø120 raised boss)
    d.circle(CX, CY, 0, 60, "OUTLINE")      # boss outline (outer edge of boss)

    # Centerlines
    d.centerline(CX, oy - 30, CX, oy + H2 + 30)
    d.centerline(ox - 30, CY, ox + W2 + 30, CY)
    # PCD cross marker lines (every 60°)
    for i in range(6):
        angle = math.radians(i * 60)
        hx = CX + PCD * math.cos(angle)
        hy = CY + PCD * math.sin(angle)
        d.line(hx - 12, hy, 0, hx + 12, hy, 0, "CENTERLINE")
        d.line(hx, hy - 12, 0, hx, hy + 12, 0, "CENTERLINE")

    # ─ Side (cross-section) view offset to the right ─
    SX = ox + W2 + 100  # section view X origin
    T = 30              # flange thickness
    BT = 60             # boss height above flange

    # Section profile outline
    d.line(SX,        oy,      0, SX + T,  oy,      0, "OUTLINE")  # bottom
    d.line(SX + T,    oy,      0, SX + T,  oy+H2,   0, "OUTLINE")  # right
    d.line(SX,        oy+H2,   0, SX + T,  oy+H2,   0, "OUTLINE")  # top
    d.line(SX,        oy,      0, SX,      oy+H2,   0, "OUTLINE")  # left

    # Boss (raised center section)
    boss_y0 = CY - 60
    boss_y1 = CY + 60
    d.line(SX + T,    boss_y0, 0, SX+T+BT, boss_y0, 0, "OUTLINE")
    d.line(SX + T,    boss_y1, 0, SX+T+BT, boss_y1, 0, "OUTLINE")
    d.line(SX + T+BT, boss_y0, 0, SX+T+BT, boss_y1, 0, "OUTLINE")

    # Bore in section view (hidden lines)
    bore_r = 40
    d.line(SX,       CY - bore_r, 0, SX+T+BT, CY - bore_r, 0, "HIDDEN")
    d.line(SX,       CY + bore_r, 0, SX+T+BT, CY + bore_r, 0, "HIDDEN")

    # Hatch lines on section (45° spacing 15mm)
    hatch_regions = [
        # flange left of boss  (x: SX..SX+T, y: oy..boss_y0)
        (SX, oy,      SX + T, boss_y0),
        (SX, boss_y1, SX + T, oy + H2),
        # boss region  (x: SX+T..SX+T+BT, y: boss_y0..boss_y1) – exclude bore
        (SX + T, boss_y0, SX+T+BT, CY - bore_r),
        (SX + T, CY + bore_r, SX+T+BT, boss_y1),
        # flange full width strip top/bottom
        (SX, oy,      SX + T, oy + bore_r + CY - H2/2),
    ]
    step = 15
    for (x0h, y0h, x1h, y1h) in hatch_regions:
        span = (x1h - x0h) + (y1h - y0h)
        n = int(span / step) + 1
        for k in range(n):
            t = k * step
            # line from (x0h+t, y0h) to (x0h, y0h+t) — 45° hatch
            ax = min(x0h + t, x1h); ay = y0h + max(0, t - (x1h - x0h))
            bx = x0h + max(0, t - (y1h - y0h)); by = min(y0h + t, y1h)
            if ax != bx or ay != by:
                d.line(ax, ay, 0, bx, by, 0, "HATCH")

    # ─ Dimension annotations ─
    # Overall width
    d.dim_line(ox, oy - 60, ox + W2, oy - 60)
    # Overall height
    d.dim_line(ox - 60, oy, ox - 60, oy + H2)
    # PCD diameter
    d.dim_line(CX - PCD, CY, CX + PCD, CY)
    # Bore diameter
    d.dim_line(CX, CY - 40, CX, CY + 40)
    # Section view thickness
    d.dim_line(SX, oy - 60, SX + T, oy - 60)
    d.dim_line(SX + T, oy - 60, SX + T + BT, oy - 60)

    d.end()
    return d


# ── 3. electrical.dxf ────────────────────────────────────────────────────────

def make_electrical() -> DxfWriter:
    """
    Single-line electrical distribution panel diagram.
    Layers: WIRING, BREAKERS, LOADS, GROUND, BUS, ANNOTATION
    """
    layers = [
        ("BUS",        7),   # white – main busbar
        ("WIRING",     2),   # yellow – branch circuits
        ("BREAKERS",   3),   # green – circuit breakers
        ("LOADS",      4),   # cyan – load symbols
        ("GROUND",     5),   # blue – grounding
        ("ANNOTATION", 1),   # red – labels/dimensions
    ]
    d = DxfWriter()
    d.begin(layers)

    # ─ Main busbar (horizontal) ─
    BUS_Y = 5000
    BUS_X0, BUS_X1 = 500, 8500
    d.line(BUS_X0, BUS_Y,   0, BUS_X1, BUS_Y,   0, "BUS")
    d.line(BUS_X0, BUS_Y+30,0, BUS_X1, BUS_Y+30,0, "BUS")
    d.line(BUS_X0, BUS_Y-30,0, BUS_X1, BUS_Y-30,0, "BUS")

    # Main incoming feeder from top
    d.line(700, BUS_Y, 0, 700, 6800, 0, "WIRING")
    # Transformer symbol
    d.circle(700, 7300, 0, 300, "WIRING")
    d.circle(700, 7900, 0, 300, "WIRING")
    d.line(700, 8200, 0, 700, 9000, 0, "WIRING")
    # Utility meter
    d.rect(500, 8700, 900, 9200, "WIRING")
    d.circle(700, 8950, 0, 150, "WIRING")

    # Main circuit breaker symbol (on bus feed)
    def breaker(x, y_top, y_bot, layer="BREAKERS"):
        mid = (y_top + y_bot) / 2
        d.line(x, y_top, 0, x, mid - 80, 0, layer)
        d.arc(x, mid, 0, 80, 270, 90, layer)  # arc body
        d.line(x - 80, mid + 80, 0, x + 80, mid - 80, 0, layer)  # trip indicator
        d.line(x, mid + 80, 0, x, y_bot, 0, layer)

    breaker(700, 6800, 6200)
    breaker(700, BUS_Y, BUS_Y + 300)  # main CB on bus

    # ─ Branch circuits (6 branches going down from busbar) ─
    branches = [
        (1200, "L1 - Lighting 20A"),
        (2100, "L2 - Lighting 20A"),
        (3000, "L3 - Outlets 20A"),
        (4000, "L4 - Outlets 20A"),
        (5200, "L5 - HVAC 30A"),
        (6400, "L6 - Kitchen 20A"),
        (7500, "L7 - EV Charger 50A"),
    ]

    def load_light(x, y):
        """Lighting load symbol (circle + cross)."""
        d.circle(x, y, 0, 120, "LOADS")
        d.line(x - 120, y, 0, x + 120, y, 0, "LOADS")
        d.line(x, y - 120, 0, x, y + 120, 0, "LOADS")

    def load_outlet(x, y):
        """Outlet symbol (circle + half arcs)."""
        d.circle(x, y, 0, 120, "LOADS")
        d.arc(x - 60, y, 0, 60, 90, 270, "LOADS")
        d.arc(x + 60, y, 0, 60, 270, 90, "LOADS")

    def load_motor(x, y):
        """Motor load symbol (M in circle)."""
        d.circle(x, y, 0, 150, "LOADS")
        # 'M' represented as diagonal lines
        d.line(x - 80, y - 80, 0, x - 80, y + 80, 0, "LOADS")
        d.line(x - 80, y + 80, 0, x,      y,       0, "LOADS")
        d.line(x,      y,      0, x + 80, y + 80,  0, "LOADS")
        d.line(x + 80, y + 80, 0, x + 80, y - 80,  0, "LOADS")

    def load_generic(x, y):
        """Generic load (rectangle)."""
        d.rect(x - 100, y - 80, x + 100, y + 80, "LOADS")

    load_fns = [load_light, load_light, load_outlet, load_outlet,
                load_motor, load_generic, load_motor]

    for i, (bx, label) in enumerate(branches):
        by0 = BUS_Y - 30  # top of vertical branch
        by1 = BUS_Y - 600  # CB top
        by2 = BUS_Y - 1200  # load point
        d.line(bx, by0, 0, bx, by1, 0, "WIRING")
        breaker(bx, by1, by2)
        d.line(bx, by2 - 160, 0, bx, by2 - 400, 0, "WIRING")
        load_fns[i % len(load_fns)](bx, by2 - 600)

    # ─ Grounding system ─
    # Main ground bar (horizontal)
    GB_Y = BUS_Y - 3500
    d.line(600, GB_Y, 0, 8000, GB_Y, 0, "GROUND")
    # Ground spikes
    for gx in [700, 1800, 3500, 6000, 7500]:
        d.line(gx, GB_Y, 0, gx, GB_Y - 200, 0, "GROUND")
        for k in range(3):
            dy = GB_Y - 250 - k * 100
            half = 150 - k * 40
            d.line(gx - half, dy, 0, gx + half, dy, 0, "GROUND")

    # Ground connections from each branch
    for bx, _ in branches:
        d.line(bx, BUS_Y - 600, 0, bx, GB_Y, 0, "GROUND")

    # ─ Annotation: panel border ─
    d.rect(-200, GB_Y - 400, 9000, 9500, "ANNOTATION")
    # Title block
    d.rect(-200, 9200, 9000, 9800, "ANNOTATION")
    d.line(4400, 9200, 0, 4400, 9800, 0, "ANNOTATION")
    d.line(7200, 9200, 0, 7200, 9800, 0, "ANNOTATION")

    d.end()
    return d


# ── 4. 3d-building.dxf ───────────────────────────────────────────────────────

def make_3d_building() -> DxfWriter:
    """
    3D wireframe of a two-story building with gable roof.
    Dims: 16000 × 10000 footprint, story height 3200, roof peak 2500 above top plate.
    """
    layers = [
        ("FOUNDATION", 8),   # grey
        ("WALLS",      7),   # white
        ("ROOF",       3),   # green
        ("OPENINGS",   4),   # cyan
        ("STRUCTURE",  2),   # yellow
    ]
    d = DxfWriter()
    d.begin(layers)

    W, D, H1, H2 = 16000, 10000, 3200, 3200  # width, depth, story1, story2
    RIDGE = H1 + H2 + 2500   # total height to ridge
    EAVE  = H1 + H2           # eave height (top of wall)
    RIDGE_X = W / 2           # ridge center X

    def h_line(x1, y1, z1, x2, y2, z2, layer):
        d.line(x1, y1, z1, x2, y2, z2, layer)

    def v_line(x, y, z0, z1, layer):
        d.line(x, y, z0, x, y, z1, layer)

    # ── Foundation slab outline ──
    d.rect(0, 0, W, D, "FOUNDATION")  # 2D footprint at z=0 (LWPOLYLINE)

    # ── Floor 1 (z=0) footprint ──
    corners = [(0, 0), (W, 0), (W, D), (0, D)]
    for (x0, y0), (x1, y1) in zip(corners, corners[1:] + [corners[0]]):
        h_line(x0, y0, 0, x1, y1, 0, "WALLS")

    # ── Floor 2 plate (z=H1) ──
    for (x0, y0), (x1, y1) in zip(corners, corners[1:] + [corners[0]]):
        h_line(x0, y0, H1, x1, y1, H1, "WALLS")

    # ── Top plate (z=H1+H2) ──
    for (x0, y0), (x1, y1) in zip(corners, corners[1:] + [corners[0]]):
        h_line(x0, y0, EAVE, x1, y1, EAVE, "WALLS")

    # ── Vertical wall edges (4 corners) ──
    for cx, cy in corners:
        v_line(cx, cy, 0, EAVE, "WALLS")

    # ── Mid-floor columns (interior grid 4×3 bays) ──
    for gx in [W/4, W/2, 3*W/4]:
        for gy in [D/3, 2*D/3]:
            v_line(gx, gy, 0, EAVE, "STRUCTURE")
            for z in [0, H1, EAVE]:
                h_line(gx - 100, gy, z, gx + 100, gy, z, "STRUCTURE")
                h_line(gx, gy - 100, z, gx, gy + 100, z, "STRUCTURE")

    # ── Floor beams at mid-span (z=H1) ──
    for gx in [W/4, W/2, 3*W/4]:
        h_line(gx, 0, H1, gx, D, H1, "STRUCTURE")
    for gy in [D/3, 2*D/3]:
        h_line(0, gy, H1, W, gy, H1, "STRUCTURE")

    # ── Gable roof ──
    # Ridge line
    d.line(0, D/2, RIDGE, W, D/2, RIDGE, "ROOF")
    # 4 eave-to-ridge lines (corners → ridge)
    for cx, cy in [(0, 0), (W, 0), (W, D), (0, D)]:
        d.line(cx, cy, EAVE, RIDGE_X if cx > 0 else RIDGE_X, D/2, RIDGE, "ROOF")
        # eave edges front/back
    h_line(0, 0, EAVE, W, 0, EAVE, "ROOF")
    h_line(0, D, EAVE, W, D, EAVE, "ROOF")
    # Gable end triangles (front & back)
    d.line(0, 0,   EAVE, RIDGE_X, 0,   RIDGE, "ROOF")
    d.line(W, 0,   EAVE, RIDGE_X, 0,   RIDGE, "ROOF")
    d.line(0, D,   EAVE, RIDGE_X, D,   RIDGE, "ROOF")
    d.line(W, D,   EAVE, RIDGE_X, D,   RIDGE, "ROOF")

    # Roof 3DFACEs (8 triangular panels)
    # Front slope: left half and right half
    d.face3d((0,   0,   EAVE), (RIDGE_X, 0, RIDGE),
             (RIDGE_X, D/2, RIDGE), (0, D/2, EAVE), "ROOF")
    d.face3d((W,   0,   EAVE), (RIDGE_X, 0, RIDGE),
             (RIDGE_X, D/2, RIDGE), (W, D/2, EAVE), "ROOF")
    # Back slope
    d.face3d((0,   D,   EAVE), (RIDGE_X, D, RIDGE),
             (RIDGE_X, D/2, RIDGE), (0, D/2, EAVE), "ROOF")
    d.face3d((W,   D,   EAVE), (RIDGE_X, D, RIDGE),
             (RIDGE_X, D/2, RIDGE), (W, D/2, EAVE), "ROOF")

    # ── Windows (openings in walls) ──
    # South façade windows (z=800 to z=2400, each W=1600)
    win_z0, win_z1 = 800, 2400
    for wx in [1500, 4500, 7500, 10000, 13000]:
        d.rect(wx, 0, wx + 1600, 0, "OPENINGS")   # dummy (will appear as line)
        d.line(wx,      0, win_z0, wx+1600, 0, win_z0, "OPENINGS")
        d.line(wx,      0, win_z1, wx+1600, 0, win_z1, "OPENINGS")
        d.line(wx,      0, win_z0, wx,      0, win_z1, "OPENINGS")
        d.line(wx+1600, 0, win_z0, wx+1600, 0, win_z1, "OPENINGS")
        # mullion
        d.line(wx + 800, 0, win_z0, wx + 800, 0, win_z1, "OPENINGS")
        d.line(wx, 0, (win_z0+win_z1)/2, wx+1600, 0, (win_z0+win_z1)/2, "OPENINGS")
    # Similar for floor 2 south
    win_z0_2, win_z1_2 = H1 + 800, H1 + 2400
    for wx in [1500, 4500, 8500, 12000]:
        d.line(wx,      0, win_z0_2, wx+1600, 0, win_z0_2, "OPENINGS")
        d.line(wx,      0, win_z1_2, wx+1600, 0, win_z1_2, "OPENINGS")
        d.line(wx,      0, win_z0_2, wx,      0, win_z1_2, "OPENINGS")
        d.line(wx+1600, 0, win_z0_2, wx+1600, 0, win_z1_2, "OPENINGS")

    # Main entrance door (south, centered)
    d.line(6800, 0, 0, 9200, 0, 0, "OPENINGS")
    d.line(6800, 0, 0, 6800, 0, 2800, "OPENINGS")
    d.line(9200, 0, 0, 9200, 0, 2800, "OPENINGS")
    d.line(6800, 0, 2800, 9200, 0, 2800, "OPENINGS")

    d.end()
    return d


# ── 5. 3d-mechanical.dxf ─────────────────────────────────────────────────────

def make_3d_mechanical() -> DxfWriter:
    """
    3D machine component: stepped shaft with flanges.
    Body segments:
      - Flange A: Ø120 × 20 thick, at z=0
      - Shaft 1 : Ø60  × 80, z=20..100
      - Flange B: Ø100 × 20, z=100..120
      - Shaft 2 : Ø40  × 60, z=120..180
      - Threaded end: Ø30 × 30, z=180..210
    Bolt holes: 4×Ø12 on PCD Ø90 in Flange A & B
    """
    layers = [
        ("BODY",       7),   # white – main surfaces
        ("EDGES",      2),   # yellow – edge lines
        ("HOLES",      4),   # cyan – bore & holes
        ("CENTERLINE", 1),   # red
        ("HIDDEN",     8),   # grey
    ]
    d = DxfWriter()
    d.begin(layers)

    def cylinder_wireframe(cx, cy, r, z0, z1, n_seg, layer):
        """Draw top/bottom circles + n vertical lines."""
        for z in [z0, z1]:
            prev = None
            for i in range(n_seg + 1):
                a = 2 * math.pi * i / n_seg
                x = cx + r * math.cos(a)
                y = cy + r * math.sin(a)
                if prev:
                    d.line(prev[0], prev[1], z, x, y, z, layer)
                prev = (x, y)
        # Vertical lines (at N evenly spaced angles)
        n_vert = max(8, n_seg // 4)
        for i in range(n_vert):
            a = 2 * math.pi * i / n_vert
            x = cx + r * math.cos(a)
            y = cy + r * math.sin(a)
            d.line(x, y, z0, x, y, z1, layer)

    def disk_faces(cx, cy, r, z, n_seg, layer):
        """3DFACE triangles forming a flat disk."""
        prev_x, prev_y = cx + r, cy
        for i in range(1, n_seg + 1):
            a = 2 * math.pi * i / n_seg
            x = cx + r * math.cos(a)
            y = cy + r * math.sin(a)
            d.face3d((cx, cy, z), (prev_x, prev_y, z), (x, y, z), (x, y, z), layer)
            prev_x, prev_y = x, y

    def cylinder_faces(cx, cy, r, z0, z1, n_seg, layer):
        """3DFACE quads forming the lateral surface of a cylinder."""
        pts_bot = [(cx + r * math.cos(2*math.pi*i/n_seg),
                    cy + r * math.sin(2*math.pi*i/n_seg)) for i in range(n_seg)]
        for i in range(n_seg):
            nx = (i + 1) % n_seg
            b0, b1 = pts_bot[i],  pts_bot[nx]
            d.face3d((b0[0], b0[1], z0), (b1[0], b1[1], z0),
                     (b1[0], b1[1], z1), (b0[0], b0[1], z1), layer)

    CX, CY = 0, 0
    SEG = 24  # facets for smooth-looking cylinders

    # Segment radii and Z ranges
    segs = [
        (60,  0,   20),   # Flange A  Ø120
        (30,  20,  100),  # Shaft 1   Ø60
        (50,  100, 120),  # Flange B  Ø100
        (20,  120, 180),  # Shaft 2   Ø40
        (15,  180, 210),  # Threaded  Ø30
    ]

    for r, z0, z1 in segs:
        cylinder_faces(CX, CY, r, z0, z1, SEG, "BODY")
        disk_faces(CX, CY, r, z0, SEG, "BODY")   # bottom cap
        cylinder_wireframe(CX, CY, r, z0, z1, SEG, "EDGES")

    # Top cap of last segment
    disk_faces(CX, CY, segs[-1][0], segs[-1][2], SEG, "BODY")

    # Transition rings (step faces between adjacent segments)
    for i in range(len(segs) - 1):
        r_big = segs[i][0]
        r_sml = segs[i+1][0]
        z_step = segs[i][2]  # shared Z
        if r_big != r_sml:
            n_annular = SEG
            pts_outer = [(CX + r_big * math.cos(2*math.pi*k/n_annular),
                          CY + r_big * math.sin(2*math.pi*k/n_annular))
                         for k in range(n_annular)]
            pts_inner = [(CX + r_sml * math.cos(2*math.pi*k/n_annular),
                          CY + r_sml * math.sin(2*math.pi*k/n_annular))
                         for k in range(n_annular)]
            for k in range(n_annular):
                nk = (k + 1) % n_annular
                o0, o1 = pts_outer[k], pts_outer[nk]
                i0, i1 = pts_inner[k], pts_inner[nk]
                d.face3d((o0[0], o0[1], z_step), (o1[0], o1[1], z_step),
                         (i1[0], i1[1], z_step), (i0[0], i0[1], z_step), "BODY")

    # Central bore (through entire shaft, Ø16)
    cylinder_wireframe(CX, CY, 8, 0, 210, SEG // 2, "HOLES")
    cylinder_faces(CX, CY, 8, 0, 210, SEG // 2, "HOLES")

    # Bolt holes in Flange A (4 × Ø12, PCD Ø90)
    PCD_A = 45
    for i in range(4):
        a = math.radians(i * 90 + 45)
        hx = CX + PCD_A * math.cos(a)
        hy = CY + PCD_A * math.sin(a)
        cylinder_wireframe(hx, hy, 6, 0, 20, 12, "HOLES")

    # Bolt holes in Flange B (4 × Ø10, PCD Ø70)
    PCD_B = 35
    for i in range(4):
        a = math.radians(i * 90 + 45)
        hx = CX + PCD_B * math.cos(a)
        hy = CY + PCD_B * math.sin(a)
        cylinder_wireframe(hx, hy, 5, 100, 120, 12, "HOLES")

    # Keyway on Shaft 2 (z=120..180, width 10, depth 8)
    kw = 5   # half width
    kd = 8   # depth (into shaft radius)
    r_shaft = segs[3][0]  # 20
    z_kw0, z_kw1 = 120, 180
    d.line(CX - kw, CY + r_shaft,    z_kw0, CX - kw, CY + r_shaft,    z_kw1, "EDGES")
    d.line(CX + kw, CY + r_shaft,    z_kw0, CX + kw, CY + r_shaft,    z_kw1, "EDGES")
    d.line(CX - kw, CY + r_shaft + kd, z_kw0, CX + kw, CY + r_shaft + kd, z_kw0, "EDGES")
    d.line(CX - kw, CY + r_shaft + kd, z_kw1, CX + kw, CY + r_shaft + kd, z_kw1, "EDGES")
    d.line(CX - kw, CY + r_shaft,    z_kw0, CX - kw, CY + r_shaft + kd, z_kw0, "EDGES")
    d.line(CX + kw, CY + r_shaft,    z_kw0, CX + kw, CY + r_shaft + kd, z_kw0, "EDGES")
    d.line(CX - kw, CY + r_shaft,    z_kw1, CX - kw, CY + r_shaft + kd, z_kw1, "EDGES")
    d.line(CX + kw, CY + r_shaft,    z_kw1, CX + kw, CY + r_shaft + kd, z_kw1, "EDGES")

    # Centerline axis
    d.line(CX, CY, -30, CX, CY, 250, "CENTERLINE")
    # Cross-hair at PCD circles
    for r_pcd, z_pcd in [(PCD_A, 10), (PCD_B, 110)]:
        d.circle(CX, CY, z_pcd, r_pcd, "CENTERLINE")

    d.end()
    return d


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print(f"Generating DXF sample files in: {OUTPUT_DIR}")
    files = [
        ("floor-plan.dxf",     make_floor_plan()),
        ("mechanical-part.dxf",make_mechanical_part()),
        ("electrical.dxf",     make_electrical()),
        ("3d-building.dxf",    make_3d_building()),
        ("3d-mechanical.dxf",  make_3d_mechanical()),
    ]
    for name, writer in files:
        writer.save(OUTPUT_DIR / name)
    print(f"\nDone — {len(files)} files written.")


if __name__ == "__main__":
    main()
