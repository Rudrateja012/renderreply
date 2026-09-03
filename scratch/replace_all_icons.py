import re

def update_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace 📱 with clean SVG in device preview header
    phone_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="phone-icon-svg" style="vertical-align: -2px; margin-right: 4px;"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
    content = content.replace('<span class="phone-icon">📱</span> REAL-TIME LIVE DEVICE PREVIEW', f'{phone_svg} REAL-TIME LIVE DEVICE PREVIEW')
    content = content.replace('<span class="phone-icon">📱</span>', phone_svg)

    # 2. Replace BioLink social dropdown emojis with crisp vector SVGs
    ig_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px; vertical-align:-2px;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>'
    yt_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px; vertical-align:-2px;"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>'
    tw_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px; vertical-align:-2px;"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>'
    tt_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px; vertical-align:-2px;"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>'
    li_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px; vertical-align:-2px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>'
    gh_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px; vertical-align:-2px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>'

    content = content.replace('📸 Instagram Profile', f'{ig_svg}Instagram Profile')
    content = content.replace('▶️ YouTube Channel', f'{yt_svg}YouTube Channel')
    content = content.replace('🐦 Twitter / X', f'{tw_svg}Twitter / X')
    content = content.replace('🎵 TikTok', f'{tt_svg}TikTok')
    content = content.replace('💼 LinkedIn', f'{li_svg}LinkedIn')
    content = content.replace('💻 GitHub', f'{gh_svg}GitHub')

    # 3. Replace product studio tools
    link_svg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
    list_svg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>'
    bolt_svg = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: -1px; margin-right: 3px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
    info_svg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-left: 2px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'

    content = content.replace('<button type="button" class="np-tool-btn" title="Insert Link">🔗</button>', f'<button type="button" class="np-tool-btn" title="Insert Link">{link_svg}</button>')
    content = content.replace('<button type="button" class="np-tool-btn" title="Bullet List">≡</button>', f'<button type="button" class="np-tool-btn" title="Bullet List">{list_svg}</button>')
    content = content.replace('⚡ Auto-Calculated', f'{bolt_svg}Auto-Calculated')
    content = content.replace('<span style="font-size: 12px; color: #94a3b8; font-weight: 500;">ⓘ</span>', info_svg)

    # 4. Replace template sparkles & Sent to DM
    sparkle_svg = '<span class="sparkle-icon"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg></span>'
    content = re.sub(r'<span class="sparkle-icon">✦</span>', sparkle_svg, content)
    
    check_dm = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-right: 3px; vertical-align: -1px;"><polyline points="20 6 9 17 4 12"/></svg>Sent to DM!'
    content = re.sub(r'✔ Sent to DM!', check_dm, content)

    # 5. Rating star
    star_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" style="vertical-align: -2px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
    content = content.replace('4.95 ★', f'4.95 {star_svg}')

    # 6. Delivered double-ticks in live chat
    double_check_svg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" style="vertical-align: -2px;"><polyline points="18 6 9 17 4 12"/><polyline points="22 10 15 17 13 15"/></svg>'
    content = content.replace('Delivered ✓✓', f'Delivered {double_check_svg}')

    # 7. Clean delivery status tags in orders
    check_pill_svg = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align: -1px; margin-right: 3px;"><polyline points="20 6 9 17 4 12"/></svg>'
    content = content.replace('>✓ Sent via Instagram DM & Email<', f'>{check_pill_svg}Sent via Instagram DM & Email<')
    content = content.replace('>✓ Booking Confirmed<', f'>{check_pill_svg}Booking Confirmed<')
    content = content.replace('>✓ Sent via Instagram DM<', f'>{check_pill_svg}Sent via Instagram DM<')
    content = content.replace('>✓ Resolved<', f'>{check_pill_svg}Resolved<')

    # 8. Remove emojis in default response placeholder / inputs
    content = content.replace('Hey {first_name}! 👋 ', 'Hey {first_name}! ')
    content = content.replace('Hey Alex! 👋 ', 'Hey Alex! ')
    content = content.replace('Sent you a DM! 📩 ', 'Sent you a DM! ')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("index.html updated successfully")

def update_app_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Chat labels: Bot, Human, Paused, Delivered
    bot_icon_svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: -2px;"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="12" y1="2" x2="12" y2="4"/></svg>'
    human_icon_svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: -2px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    pause_icon_svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px; vertical-align: -2px;"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
    double_check_svg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" style="vertical-align: -2px;"><polyline points="18 6 9 17 4 12"/><polyline points="22 10 15 17 13 15"/></svg>'
    double_check_white = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" style="vertical-align: -2px;"><polyline points="18 6 9 17 4 12"/><polyline points="22 10 15 17 13 15"/></svg>'

    content = content.replace('<span class="bot-label">🤖 RenderReply Bot</span>', f'<span class="bot-label">{bot_icon_svg}RenderReply Bot</span>')
    content = content.replace('<span class="human-label">👤 Rudra Teja (Human Agent)</span>', f'<span class="human-label">{human_icon_svg}Rudra Teja (Human Agent)</span>')
    content = content.replace('<span>⏸️ Bot paused for this conversation to allow direct human agent reply</span>', f'<span>{pause_icon_svg}Bot paused for this conversation to allow direct human agent reply</span>')
    
    content = content.replace('Delivered ✓✓', f'Delivered {double_check_svg}')
    content = content.replace('Delivered {double_check_svg}</span></div>\n        ` : `\n          <div class="msg-time" style="color: rgba(255,255,255,0.7);">${msg.time} • Delivered ' + double_check_svg,
                              'Delivered {double_check_svg}</span></div>\n        ` : `\n          <div class="msg-time" style="color: rgba(255,255,255,0.7);">${msg.time} • Delivered ' + double_check_white)

    # Star rating in storefront
    star_svg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" style="vertical-align: -1px; margin-right: 2px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
    content = content.replace("<span style=\"color: #f59e0b; font-weight: 700;\">★ ${prod.rating ? prod.rating.split('(')[0].trim() : '5.0'}</span>",
                              f"<span style=\"color: #f59e0b; font-weight: 700; display: inline-flex; align-items: center;\">{star_svg} ${{prod.rating ? prod.rating.split('(')[0].trim() : '5.0'}}</span>")

    # Clean emojis from copy
    emojis_to_strip = ['👋 ', '✨ ', '🚀 ', '🙌 ', '🎯 ', '📈 ', '🌟 ', '🎁 ', '📩 ', '📸', '🔄 ', '👋', '✨', '🚀', '🙌', '🎯', '📈', '🌟', '🎁', '📩', '🔄']
    for em in emojis_to_strip:
        content = content.replace(em, '')

    # Rule thumbIcon
    content = content.replace("rule.thumbIcon = '📸';", "rule.thumbIcon = '';")
    content = content.replace("thumbIcon: '📸',", "thumbIcon: '',")

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("app.js updated successfully")

update_index_html()
update_app_js()
