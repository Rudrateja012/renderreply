with open(r'c:\Users\rudra\Videos\renderreply\app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Verify that openMediaInScheduler and updateSelectedAccountsCount are properly defined
print("openMediaInScheduler in content:", "openMediaInScheduler" in content)
print("updateSelectedAccountsCount in content:", "updateSelectedAccountsCount" in content)
print(".jpeg handling:", "isImageExt" in content)
