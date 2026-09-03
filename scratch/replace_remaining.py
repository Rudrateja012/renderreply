def clean_remaining():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Clean thread triggers
    comment_svg = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 3px; vertical-align: -1px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
    camera_svg = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 3px; vertical-align: -1px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>'
    check_svg = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align: -1px; margin-right: 3px;"><polyline points="20 6 9 17 4 12"/></svg>'

    html = html.replace('💬 Comment "PRICING"', f'{comment_svg}Comment "PRICING"')
    html = html.replace('📸 Story Mention', f'{camera_svg}Story Mention')
    html = html.replace('>✓ Email Captured<', f'>{check_svg}Email Captured<')
    html = html.replace('>✓ DM Delivered<', f'>{check_svg}DM Delivered<')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    js = js.replace("status: '✓ Email Captured'", "status: 'Email Captured'")
    js = js.replace("status: '✓ DM Delivered'", "status: 'DM Delivered'")
    js = js.replace("btnCopy.textContent = '✓ Copied!'", "btnCopy.textContent = 'Copied!'")
    js = js.replace("statusPill.textContent = '✓ Resolved'", "statusPill.textContent = 'Resolved'")
    js = js.replace("text: '✓ Conversation marked as resolved'", "text: 'Conversation marked as resolved'")
    js = js.replace("<span>✓ Resolved (Reopen)</span>", "<span>Resolved (Reopen)</span>")

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)

    print("Remaining items cleaned successfully")

clean_remaining()
