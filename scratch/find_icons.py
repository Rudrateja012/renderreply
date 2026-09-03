import re, sys

sys.stdout.reconfigure(encoding='utf-8')

for filename in ['index.html', 'app.js']:
    with open(filename, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    
    print(f"=== {filename} ===")
    count = 0
    for i, line in enumerate(lines):
        if re.search(r'[^\x00-\x7F]', line):
            count += 1
            # print unicode characters in the line
            non_ascii = ''.join(set(re.findall(r'[^\x00-\x7F]', line)))
            print(f"Line {i+1}: [{non_ascii}] {line.strip()[:120]}")
    print(f"Total lines with non-ascii in {filename}: {count}\n")
