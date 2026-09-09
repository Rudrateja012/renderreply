import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if any(c in line for c in ['#2563eb', '#4f46e5', '#6366f1', '#3b82f6', '#14b8a6']):
        print(f"L{idx+1}: {line.strip()[:120]}")
