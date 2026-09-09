import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if 'edit' in line.lower():
        print(f"L{idx+1}: {line.strip()[:100]}")
