import re, sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# find all stroke and fill attributes in SVGs
svg_tags = re.findall(r'<svg[^>]*>', html)
colors = set()
for tag in svg_tags:
    st = re.findall(r'stroke="([^"]+)"', tag)
    fl = re.findall(r'fill="([^"]+)"', tag)
    colors.update(st)
    colors.update(fl)

print("All SVG stroke/fill colors in index.html:")
for c in sorted(colors):
    print(" ", c)
