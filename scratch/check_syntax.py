import subprocess

try:
    result = subprocess.run(['node', '-c', r'c:\Users\rudra\Videos\renderreply\app.js'], capture_output=True, text=True)
    print("STDOUT:", result.stdout)
    print("STDERR:", result.stderr)
except Exception as e:
    print("Error:", e)
