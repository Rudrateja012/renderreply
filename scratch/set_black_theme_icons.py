import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Archive callout icon - monochrome black stroke
html = html.replace('stroke="#2563eb"', 'stroke="#0f172a"')

# 2. Modal badges - Black theme
html = html.replace('style="background: #eef2ff; color: #4f46e5;"', 'style="background: #0f172a; color: #ffffff;"')
html = html.replace('style="background: #fdf2f8; color: #db2777;"', 'style="background: #0f172a; color: #ffffff;"')
html = html.replace('style="background: rgba(168, 85, 247, 0.15); color: #c084fc;"', 'style="background: #0f172a; color: #ffffff;"')
html = html.replace('style="background: rgba(79, 70, 229, 0.1); color: #4f46e5;"', 'style="background: #0f172a; color: #ffffff;"')
html = html.replace('style="background: rgba(99, 102, 241, 0.12); color: #4f46e5;"', 'style="background: #0f172a; color: #ffffff;"')
html = html.replace('style="color: #6366f1;"', 'style="color: #0f172a;"')

# 3. Specific icons stroke to currentColor or #0f172a
html = html.replace('stroke="#6366f1"', 'stroke="currentColor"')
html = html.replace('stroke="#4f46e5"', 'stroke="currentColor"')
html = html.replace('stroke="#3b82f6"', 'stroke="currentColor"')
html = html.replace('stroke="#14b8a6"', 'stroke="currentColor"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html to black theme icons!")
