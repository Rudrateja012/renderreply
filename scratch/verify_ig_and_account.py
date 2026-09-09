with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

assert 'real_factcheck' not in html, "real_factcheck found in index.html"
assert 'render6457' in html, "render6457 missing in index.html"
assert '<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>' in html, "Real Instagram icon SVG missing in index.html"

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

assert 'syncSchedulerAccountsToActiveUser' in js, "syncSchedulerAccountsToActiveUser missing in app.js"
assert 'openConnectAccountModal' in js, "openConnectAccountModal missing in app.js"

print("ALL VERIFICATION CHECKS PASSED PERFECTLY!")
