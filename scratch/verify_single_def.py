with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

count_defs = js.count('window.updateSelectedAccountsCount = function')
assert count_defs == 1, f"Expected 1 definition of window.updateSelectedAccountsCount, found {count_defs}"

print("VERIFICATION SUCCEEDED: 1 definition of updateSelectedAccountsCount found!")
