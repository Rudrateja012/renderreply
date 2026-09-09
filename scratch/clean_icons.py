import re

def clean_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace Archive Callout Icon
    archive_svg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>'
    content = content.replace('<div class="archive-callout-icon">📦</div>', f'<div class="archive-callout-icon">{archive_svg}</div>')

    # 2. Clean up Auto-DM Template dropdown options
    content = content.replace('<option value="tpl-growth" selected>📦 30-Day Growth Toolkit Delivery</option>', '<option value="tpl-growth" selected>30-Day Growth Toolkit Delivery</option>')
    content = content.replace('<option value="tpl-store">🎟️ StanStore 20% Discount Link</option>', '<option value="tpl-store">StanStore 20% Discount Link</option>')
    content = content.replace('<option value="tpl-lead">📋 Creator Masterclass Free Access</option>', '<option value="tpl-lead">Creator Masterclass Free Access</option>')
    content = content.replace('<option value="tpl-custom">✨ Custom AI Direct Reply</option>', '<option value="tpl-custom">Custom AI Direct Reply</option>')

    # 3. Clean up modal badges
    msg_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>'
    content = content.replace('<div class="dm-bw-badge">💬</div>', f'<div class="dm-bw-badge">{msg_svg}</div>')

    folder_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>'
    content = content.replace('<span class="modal-icon-badge" style="background: #eef2ff; color: #4f46e5;">📁</span>', f'<span class="modal-icon-badge" style="background: #eef2ff; color: #4f46e5;">{folder_svg}</span>')

    sparkle_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>'
    content = content.replace('<span class="modal-icon-badge" style="background: #fdf2f8; color: #db2777;">✨</span>', f'<span class="modal-icon-badge" style="background: #fdf2f8; color: #db2777;">{sparkle_svg}</span>')

    bolt_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
    content = content.replace('<span class="modal-icon-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc;">⚡</span>', f'<span class="modal-icon-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc;">{bolt_svg}</span>')

    # 4. Clean up DM chip icons & section icons
    content = content.replace('<span class="dm-chip-icon">💬</span>', f'<span class="dm-chip-icon">{msg_svg}</span>')

    scissors_svg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>'
    palette_svg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"></path></svg>'
    sparkle_sm = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>'

    content = content.replace('<span class="section-icon">✂️</span>', f'<span class="section-icon">{scissors_svg}</span>')
    content = content.replace('<span class="section-icon">🎨</span>', f'<span class="section-icon">{palette_svg}</span>')
    content = content.replace('<span class="section-icon">✨</span>', f'<span class="section-icon">{sparkle_sm}</span>')
    content = content.replace('<span class="panel-icon">✨</span>', f'<span class="panel-icon">{sparkle_sm}</span>')

    # 5. Clean store dropdown options
    content = content.replace('<option value="store-item-1">📦 Ultimate Creator Notion Hub ($29.00)</option>', '<option value="store-item-1">Ultimate Creator Notion Hub ($29.00)</option>')
    content = content.replace('<option value="store-item-2">🚀 30-Day DM Automation Playbook ($49.00)</option>', '<option value="store-item-2">30-Day DM Automation Playbook ($49.00)</option>')
    content = content.replace('<option value="store-item-3">🎥 Viral Reels Editing LUTs Pack ($19.00)</option>', '<option value="store-item-3">Viral Reels Editing LUTs Pack ($19.00)</option>')
    content = content.replace('<option value="custom">✍️ Custom Topic / Growth Idea</option>', '<option value="custom">Custom Topic / Growth Idea</option>')

    # 6. Clean DM preview texts & simulation quotes
    content = content.replace('"Hey Alex! Here is your 30-Day Growth Toolkit. Enjoy! 📦"', '"Hey Alex! Here is your 30-Day Growth Toolkit. Enjoy!"')
    content = content.replace('"Hey! Here is your toolkit guide. Enjoy! 📦"', '"Hey! Here is your toolkit guide. Enjoy!"')
    content = content.replace('"Sent you a DM! Check your inbox with the #GROWTH guide 🚀"', '"Sent you a DM! Check your inbox with the #GROWTH guide."')

    # 7. Clean preset icons in video studio
    content = content.replace('<span class="preset-icon">⚡</span>', f'<span class="preset-icon">{bolt_svg}</span>')
    phone_sm = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
    content = content.replace('<span class="preset-icon">📱</span>', f'<span class="preset-icon">{phone_sm}</span>')
    rocket_sm = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>'
    content = content.replace('<span class="preset-icon">🚀</span>', f'<span class="preset-icon">{rocket_sm}</span>')
    bulb_sm = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>'
    content = content.replace('<span class="preset-icon">💡</span>', f'<span class="preset-icon">{bulb_sm}</span>')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("index.html cleaned successfully!")

def clean_app_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean toasts and strings
    replacements = [
        ('window.showToast(`📦 Archived "${mediaName}"`);', 'window.showToast(`Archived "${mediaName}"`);'),
        ('window.showToast(`✨ Restored "${mediaName}" to Gallery`);', 'window.showToast(`Restored "${mediaName}" to Gallery`);'),
        ('window.showToast(`🗑️ Deleted "${mediaName}"`);', 'window.showToast(`Deleted "${mediaName}"`);'),
        ('window.showToast(`📋 Created duplicate: "${clone.name}"`);', 'window.showToast(`Created duplicate: "${clone.name}"`);'),
        ('window.showToast(`📥 Downloading "${mediaName}"...`);', 'window.showToast(`Downloading "${mediaName}"...`);'),
        ("window.showToast('📦 Switched to Archived Reels');", "window.showToast('Switched to Archived Reels');"),
        ('window.showToast(`📁 Created folder: ${cleanName}`);', 'window.showToast(`Created folder: "${cleanName}"`);'),
        ('window.showToast(`🗑️ Deleted folder: ${folderName}`);', 'window.showToast(`Deleted folder: "${folderName}"`);'),
        ('window.showToast(`✨ Created story: "${cleanTitle}"`);', 'window.showToast(`Created story: "${cleanTitle}"`);'),
        ('window.showToast(`✓ Uploaded "${file.name}" to Gallery!`);', 'window.showToast(`Uploaded "${file.name}" to Gallery`);'),
        ('window.showToast(`🎯 Opened "${media.name}" in Post Scheduler`);', 'window.showToast(`Opened "${media.name}" in Post Scheduler`);'),
        ('window.showToast(`🚀 Scheduling commands sent for "${title}"!`);', 'window.showToast(`Scheduling commands sent for "${title}"`);'),
        ('window.showToast(`⚡ Simulated comment-to-DM for #${kw} tested successfully!`);', 'window.showToast(`Comment-to-DM simulated successfully for #${kw}`);'),
        ("window.showToast('⚠️ Please enter a trigger keyword before saving.');", "window.showToast('Please enter a trigger keyword before saving.');"),
        ('window.showToast(`✅ Auto-DM saved! Keyword: #${keyword.toUpperCase()} → ${template}`);', 'window.showToast(`Auto-DM saved! Keyword: #${keyword.toUpperCase()} → ${template}`);'),
        ("window.showToast('📥 Downloaded RenderReply Bulk Schedule CSV Template!');", "window.showToast('Downloaded Bulk Schedule CSV Template');"),
        ('window.showToast(`🎵 Audio Selected: ${title}`);', 'window.showToast(`Audio selected: ${title}`);'),
        ("window.showToast('🎬 Generated 30-Second Viral Script!');", "window.showToast('Generated 30-second viral script');"),
        ("window.showToast('✨ Loaded Script into Studio Editor!');", "window.showToast('Loaded script into Studio editor');"),
        ("window.showToast('⚠️ Please enter a Template Name.');", "window.showToast('Please enter a Template Name.');"),
        ("window.showToast('⚠️ Please enter a Custom Trigger Keyword (e.g. GROWTH).');", "window.showToast('Please enter a Custom Trigger Keyword.');"),
        ("window.showToast('⚠️ Please select or enter a Trigger Emoji.');", "window.showToast('Please select or enter a Trigger Keyword.');"),
        ("window.showToast('⚠️ Please enter a DM message body.');", "window.showToast('Please enter a DM message body.');"),
        ("window.showToast('⚠️ Cannot schedule in the past. Adjusted to now.');", "window.showToast('Cannot schedule in the past. Adjusted to now.');"),
        ("window.showToast('↩️ Returned to Gallery');", "window.showToast('Returned to Gallery');"),
        ('quote.textContent = `"Sent you a DM! Check your inbox with the #${clean || \'GROWTH\'} guide 🚀"`;', 'quote.textContent = `"Sent you a DM! Check your inbox with the #${clean || \'GROWTH\'} guide."`;'),
        ('if (dmText) dmText.textContent = `"Hey! Here is your toolkit guide for #${media.autoDmKeyword || \'GROWTH\'}. Enjoy! 📦"`;', 'if (dmText) dmText.textContent = `"Hey! Here is your toolkit guide for #${media.autoDmKeyword || \'GROWTH\'}. Enjoy!"`;')
    ]

    for old, new in replacements:
        content = content.replace(old, new)

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("app.js cleaned successfully!")

if __name__ == '__main__':
    clean_index_html()
    clean_app_js()
