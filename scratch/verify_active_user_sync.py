with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

assert 'window.syncSchedulerAccountsToActiveUser' in js
assert 'syncSchedulerAccountsToActiveUser' in js
assert 'document.querySelectorAll(\'#social-grouped-list .acc-handle-text\')' in js
assert 'document.querySelectorAll(\'#social-grouped-list .acc-globe-avatar\')' in js

print("ALL TEST CHECKS PASSED SUCCESSFULLY!")
