import re, sys

sys.stdout.reconfigure(encoding='utf-8')

emoji_pattern = re.compile(r'[\U00010000-\U0010ffff]|[\u2600-\u27BF]|[\u2300-\u23FF]|[\u2B50]|[\u2B55]|[\u25B2]|[\u25BC]|[\u25CF]|[\u2713]|[\u2714]|[\u2728]|[\u26A1]|[\u2197]|[\u21B5]|[\u2192]')

for fname in ['index.html', 'app.js']:
    print(f"\n=================== {fname} ===================")
    with open(fname, 'r', encoding='utf-8', errors='replace') as f:
        for idx, line in enumerate(f):
            matches = emoji_pattern.findall(line)
            if matches:
                print(f"L{idx+1}: {matches} | {line.strip()[:100]}")
