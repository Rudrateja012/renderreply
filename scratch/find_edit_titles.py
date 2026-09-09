import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if re.search(r'<(?:h[1-6]|title|header)[^>]*>.*?(?:edit|reels).*?</(?:h[1-6]|title|header)>', line, re.IGNORECASE):
        print(f"L{idx+1}: {line.strip()}")
    elif re.search(r'class="[^"]*(?:title|header|heading)[^"]*"', line) and 'edit' in line.lower():
        print(f"L{idx+1}: {line.strip()}")
