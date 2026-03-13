import ezdxf
from ezdxf import zoom
from ezdxf.entities import Text

doc = ezdxf.new(dxfversion='R2010')
doc.header['$INSUNITS'] = 4  # 毫米
msp = doc.modelspace()

# ==================== 图层设置 ====================
doc.layers.add(name='Body', color=7)
doc.layers.add(name='Lid', color=5)
doc.layers.add(name='Handle', color=1)
doc.layers.add(name='Spout', color=1)
doc.layers.add(name='Fish', color=3)
doc.layers.add(name='Decoration', color=4)
doc.layers.add(name='Dim', color=8)

# ==================== 壶体 (结合两张草图的圆润形状) ====================
body_points = [
    (0, 0), (85, 0), (95, 45), (90, 85), (70, 115), (30, 125),
    (-30, 125), (-70, 115), (-90, 85), (-95, 45), (-85, 0), (0, 0)
]
msp.add_lwpolyline(body_points, close=True, dxfattribs={'layer': 'Body', 'lineweight': 50})

# 壶底座
msp.add_lwpolyline([( -70, 0), (-80, -8), (80, -8), (70, 0)], dxfattribs={'layer': 'Body'})

# ==================== 莲瓣盖 (第一张草图) ====================
# 盖子主体
msp.add_ellipse(center=(0, 125), major_axis=(75, 0), ratio=0.25, dxfattribs={'layer': 'Lid'})

# 莲瓣装饰（10瓣，用弧线模拟）
for i in range(10):
    ang = i * 36
    cx = 68 * (0.92 + 0.08 * (i % 2)) * __import__('math').cos(__import__('math').radians(ang))
    cy = 125 + 68 * 0.22 * __import__('math').sin(__import__('math').radians(ang))
    msp.add_arc(center=(cx, cy), radius=12, start_angle=ang-25, end_angle=ang+25, dxfattribs={'layer': 'Lid'})

# ==================== 鱼形盖钮 (两张草图都有) ====================
# 鱼身
fish_body = [(5, 145), (18, 158), (30, 155), (35, 145), (25, 135)]
msp.add_lwpolyline(fish_body, dxfattribs={'layer': 'Fish'})
msp.add_spline(fish_body, dxfattribs={'layer': 'Fish'})

# 鱼尾
msp.add_lwpolyline([(5,145), (-8,150), (-5,160), (5,155)], dxfattribs={'layer': 'Fish'})
# 鱼眼
msp.add_circle(center=(22, 152), radius=2.5, dxfattribs={'layer': 'Fish'})
msp.add_circle(center=(22, 152), radius=1, dxfattribs={'layer': 'Fish'})

# ==================== 云纹装饰 (第一张壶身) ====================
cloud_points = [
    (-55, 55), (-45, 65), (-30, 52), (-20, 70), (-5, 55),
    (15, 68), (35, 50), (50, 62), (65, 48)
]
msp.add_spline(cloud_points, dxfattribs={'layer': 'Decoration'})

# ==================== C形把手 (第一张粉色把手) ====================
handle_points = [
    (-92, 70), (-120, 90), (-125, 120), (-105, 145), (-80, 145)
]
msp.add_spline(handle_points, dxfattribs={'layer': 'Handle', 'lineweight': 80})

# 把手旋涡装饰
msp.add_arc(center=(-125, 105), radius=18, start_angle=180, end_angle=270, dxfattribs={'layer': 'Handle'})

# ==================== 壶嘴 ====================
spout_points = [
    (85, 75), (120, 65), (145, 55), (155, 40)
]
msp.add_lwpolyline(spout_points, dxfattribs={'layer': 'Spout'})
msp.add_arc(center=(155, 40), radius=12, start_angle=0, end_angle=90, dxfattribs={'layer': 'Spout'})

# ==================== 简单尺寸标注 ====================
msp.add_linear_dim(p1=( -95,0), p2=(95,0), distance=-15, dxfattribs={'layer': 'Dim'}).render()  # 宽度
msp.add_text("茶壶设计 - 莲瓣鱼盖", dxfattribs={'layer': 'Dim', 'height': 8}).set_placement((0, 170), align='MIDDLE_CENTER')

# ==================== 保存文件 ====================
doc.saveas('teapot.dxf')
print("✅ teapot.dxf 已生成！请用CAD软件打开查看。")
zoom.extents(msp)