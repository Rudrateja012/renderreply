import re, sys

sys.stdout.reconfigure(encoding='utf-8')

# Regex for emojis (including supplementary planes and standard emoji ranges)
emoji_pattern = re.compile(
    "["
    "\U0001F1E0-\U0001F1FF"  # flags (iOS)
    "\U0001F300-\U0001F5FF"  # symbols & pictographs
    "\U0001F600-\U0001F64F"  # emoticons
    "\U0001F680-\U0001F6FF"  # transport & map symbols
    "\U0001F700-\U0001F77F"  # alchemical symbols
    "\U0001F780-\U0001F7FF"  # Geometric Shapes Extended
    "\U0001F800-\U0001F8FF"  # Supplemental Arrows-C
    "\U0001F900-\U0001F9FF"  # Supplemental Symbols and Pictographs
    "\U0001FA00-\U0001FA6F"  # Chess Symbols
    "\U0001FA70-\U0001FAFF"  # Symbols and Pictographs Extended-A
    "\U00002702-\U000027B0"  # Dingbats
    "\U000024C2-\U0001F251" 
    "\U00002600-\U000026FF"  # Misc symbols (like ⚡ \u26A1, ⚙️, etc.)
    "\U00002B00-\U00002BFF"
    "\U00002300-\U000023FF"
    "]+", flags=re.UNICODE
)

for filename in ['index.html', 'app.js', 'styles.css']:
    try:
        with open(filename, 'r', encoding='utf-8', errors='replace') as f:
            lines = f.readlines()
    except Exception as e:
        continue
    
    print(f"\n==================== {filename} ====================")
    for i, line in enumerate(lines):
        matches = emoji_pattern.findall(line)
        if matches:
            print(f"Line {i+1}: {matches} ---> {line.strip()[:100]}")
