/* ==========================================================================
   STORE PROFILE & OVERVIEW CENTRALIZED SYNCHRONIZATION ENGINE
   ========================================================================== */
window.storeProfileState = {
  name: 'Rudra Teja',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  bio: 'Welcome to my SuperProfile & RenderReply Store!',
  insta: '@rudrateja',
  yt: 'youtube.com/@rudrateja',
  tw: '@rudrateja'
};

window.storeProfileDraft = null;

function formatSocialUrl(platform, handle) {
  if (!handle) return '#';
  let str = handle.trim();
  if (str.startsWith('http://') || str.startsWith('https://')) return str;
  if (platform === 'insta') {
    return `https://instagram.com/${str.replace(/^@/, '')}`;
  }
  if (platform === 'yt') {
    if (str.startsWith('youtube.com/')) return `https://${str}`;
    return `https://youtube.com/${str.startsWith('@') ? str : '@' + str}`;
  }
  if (platform === 'tw') {
    return `https://x.com/${str.replace(/^@/, '')}`;
  }
  return '#';
}

function renderStoreSocialIcons(insta, yt, tw) {
  const container = document.getElementById('store-social-icons-container');
  if (!container) return;

  let html = '';
  if (insta && insta.trim()) {
    const url = formatSocialUrl('insta', insta);
    const handleClean = insta.trim().startsWith('@') ? insta.trim() : '@' + insta.trim();
    html += `
      <a href="${url}" target="_blank" rel="noopener" class="official-social-btn insta" title="Instagram (${handleClean})">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>`;
  }
  if (yt && yt.trim()) {
    const url = formatSocialUrl('yt', yt);
    html += `
      <a href="${url}" target="_blank" rel="noopener" class="official-social-btn youtube" title="YouTube Channel">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>`;
  }
  if (tw && tw.trim()) {
    const url = formatSocialUrl('tw', tw);
    const handleClean = tw.trim().startsWith('@') ? tw.trim() : '@' + tw.trim();
    html += `
      <a href="${url}" target="_blank" rel="noopener" class="official-social-btn twitter" title="X / Twitter (${handleClean})">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>`;
  }
  container.innerHTML = html;
}

window.syncStoreProfileToUI = function(data) {
  const profile = data || window.storeProfileState;
  
  // 1. Store Overview summary card
  const nameTxt = document.getElementById('store-display-name-txt');
  const bioTxt = document.getElementById('store-bio-text-txt');
  const avatarImg = document.getElementById('store-avatar-img');
  
  if (nameTxt) nameTxt.textContent = profile.name || 'Rudra Teja';
  if (bioTxt) bioTxt.textContent = profile.bio || '';
  if (avatarImg && profile.avatar) avatarImg.src = profile.avatar;

  renderStoreSocialIcons(profile.insta, profile.yt, profile.tw);

  // 2. Setup form inputs
  const setupName = document.getElementById('setup-input-name');
  const setupAvatar = document.getElementById('setup-input-avatar');
  const setupBio = document.getElementById('setup-input-bio');
  const setupInsta = document.getElementById('setup-input-insta');
  const setupYt = document.getElementById('setup-input-yt');
  const setupTw = document.getElementById('setup-input-tw');

  if (setupName && document.activeElement !== setupName) setupName.value = profile.name || '';
  if (setupAvatar && document.activeElement !== setupAvatar) setupAvatar.value = profile.avatar || '';
  if (setupBio && document.activeElement !== setupBio) setupBio.value = profile.bio || '';
  if (setupInsta && document.activeElement !== setupInsta) setupInsta.value = profile.insta || '';
  if (setupYt && document.activeElement !== setupYt) setupYt.value = profile.yt || '';
  if (setupTw && document.activeElement !== setupTw) setupTw.value = profile.tw || '';

  // 3. Brand Identity Tab (Store Settings)
  const csName = document.getElementById('cs-input-store-name');
  const csBio = document.getElementById('cs-input-store-bio');
  const csLogo = document.getElementById('cs-logo-img');
  const csInsta = document.getElementById('cs-soc-insta');
  const csYt = document.getElementById('cs-soc-yt');
  const csTw = document.getElementById('cs-soc-tw');
  const csPrevName = document.getElementById('cs-prev-name');
  const csPrevAvatar = document.getElementById('cs-prev-avatar');

  if (csName && document.activeElement !== csName) csName.value = profile.name || '';
  if (csBio && document.activeElement !== csBio) csBio.value = profile.bio || '';
  if (csLogo && profile.avatar) csLogo.src = profile.avatar;
  if (csInsta && document.activeElement !== csInsta) csInsta.value = profile.insta?.replace(/^@/, '') || '';
  if (csYt && document.activeElement !== csYt) csYt.value = profile.yt || '';
  if (csTw && document.activeElement !== csTw) csTw.value = profile.tw?.replace(/^@/, '') || '';
  if (csPrevName) csPrevName.textContent = profile.name || 'Rudra Teja';
  if (csPrevAvatar && profile.avatar) csPrevAvatar.src = profile.avatar;

  // 4. Mobile / Phone Previews
  const dspName = document.getElementById('dsp-name-el');
  const dspBio = document.getElementById('dsp-bio-el');
  const dspAvatar = document.getElementById('dsp-avatar-el');

  if (dspName) dspName.textContent = profile.name || 'Rudra Teja';
  if (dspBio) dspBio.textContent = profile.bio || '';
  if (dspAvatar && profile.avatar) dspAvatar.src = profile.avatar;

  // 5. Live Storefront Modal Preview
  const spmName = document.getElementById('spm-creator-name');
  const spmBio = document.getElementById('spm-creator-bio');
  const spmAvatar = document.getElementById('spm-avatar-img');

  if (spmName) spmName.textContent = profile.name || 'Rudra Teja';
  if (spmBio) spmBio.textContent = profile.bio || '';
  if (spmAvatar && profile.avatar) spmAvatar.src = profile.avatar;

  // 6. Top Navbar / User Profile Header
  const userNameEl = document.querySelector('.user-name');
  const unifiedAvatar = document.getElementById('unified-avatar-el');
  if (userNameEl) userNameEl.textContent = profile.name || 'Rudra Teja';
  if (unifiedAvatar && profile.avatar) unifiedAvatar.src = profile.avatar;
};

window.syncStoreProfileLiveFromSetupInputs = function() {
  const setupName = document.getElementById('setup-input-name')?.value;
  const setupAvatar = document.getElementById('setup-input-avatar')?.value;
  const setupBio = document.getElementById('setup-input-bio')?.value;
  const setupInsta = document.getElementById('setup-input-insta')?.value;
  const setupYt = document.getElementById('setup-input-yt')?.value;
  const setupTw = document.getElementById('setup-input-tw')?.value;

  const currentLiveProfile = {
    name: setupName !== undefined ? setupName : window.storeProfileState.name,
    avatar: setupAvatar !== undefined ? setupAvatar : window.storeProfileState.avatar,
    bio: setupBio !== undefined ? setupBio : window.storeProfileState.bio,
    insta: setupInsta !== undefined ? setupInsta : window.storeProfileState.insta,
    yt: setupYt !== undefined ? setupYt : window.storeProfileState.yt,
    tw: setupTw !== undefined ? setupTw : window.storeProfileState.tw
  };

  window.syncStoreProfileToUI(currentLiveProfile);
};

// GLOBAL NATIVE HANDLERS FOR DIRECT / INLINE BROWSER CALLS
window.switchStoreTab = function (tabName, btnEl) {
  if (!tabName) return;

  const allNavBtns = document.querySelectorAll('.store-subnav-btn');
  allNavBtns.forEach(b => b.classList.remove('active'));

  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const targetBtn = document.querySelector(`.store-subnav-btn[data-store-tab="${tabName}"]`);
    if (targetBtn) targetBtn.classList.add('active');
  }

  const allTabContents = document.querySelectorAll('.store-tab-content');
  allTabContents.forEach(content => {
    if (content.id === `store-tab-${tabName}`) {
      content.classList.add('active');
      content.style.display = 'block';
    } else {
      content.classList.remove('active');
      content.style.display = 'none';
    }
  });
};

window.switchMainTab = function (tabName, linkEl) {
  if (!tabName) return;

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(n => n.classList.remove('active'));

  if (linkEl) {
    linkEl.classList.add('active');
  } else {
    const targetNav = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
    if (targetNav) targetNav.classList.add('active');
  }

  const tabViews = document.querySelectorAll('.tab-view');
  tabViews.forEach(view => {
    if (view.id === `${tabName}-view`) {
      view.classList.add('active');
      view.style.display = 'block';
    } else {
      view.classList.remove('active');
      view.style.display = 'none';
    }
  });
};

window.openProductStudio = function () {
  const backdrop = document.getElementById('modal-product-backdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    backdrop.style.display = 'flex';
    backdrop.style.opacity = '1';
    backdrop.style.pointerEvents = 'auto';
  }
};

window.closeProductStudio = function () {
  const backdrop = document.getElementById('modal-product-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    backdrop.style.display = 'none';
    backdrop.style.opacity = '0';
    backdrop.style.pointerEvents = 'none';
  }
};

// Global fallback stubs to prevent unhandled ReferenceErrors
window.editProductItem = function (id) {
  const backdrop = document.getElementById('modal-product-backdrop');
  if (backdrop) {
    window.openProductStudio();
  }
};

window.deleteProductItem = function (id) {
  // Handled dynamically via storeProducts array in initApp
};

function initApp() {
  // APP STATE
  let isConnected = true;
  let currentRange = '30 Days';

  // HELPER SVG GENERATOR FOR REACH & ENGAGEMENT DUAL-LINE GRAPH
  function createDualLineChartSvg(options) {
    const {
      reachPoints = [18, 28, 38, 32, 44, 42, 48.2],
      activityPoints = [1.2, 1.8, 2.4, 2.1, 3.0, 2.8, 3.4],
      xLabels = ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
      yTop = '50K',
      yBottom = '0'
    } = options;

    const numPoints = xLabels.length;
    const paddingLeft = 36;
    const paddingRight = 310;
    const availableWidth = paddingRight - paddingLeft;
    const step = numPoints > 1 ? availableWidth / (numPoints - 1) : 0;
    const xCoords = xLabels.map((_, i) => paddingLeft + i * step);

    const maxReach = Math.max(...reachPoints, 1);
    const maxAct = Math.max(...activityPoints, 1);

    const scaleReachY = val => 112 - (val / maxReach) * 82;
    const scaleActY = val => 112 - (val / maxAct) * 60;

    const reachY = reachPoints.map(v => scaleReachY(v));
    const actY = activityPoints.map(v => scaleActY(v));

    const reachPathD = reachY.map((y, i) => `${i === 0 ? 'M' : 'L'} ${xCoords[i]},${y}`).join(' ');
    const reachAreaD = `${reachPathD} L ${xCoords[xCoords.length - 1]},112 L ${xCoords[0]},112 Z`;

    const actPathD = actY.map((y, i) => `${i === 0 ? 'M' : 'L'} ${xCoords[i]},${y}`).join(' ');

    const gradId = `reachGrad_${Math.random().toString(36).substr(2, 9)}`;

    return `
      <svg viewBox="0 0 330 145" class="dual-line-chart-svg" style="width: 100%; height: 100%;">
        <defs>
          <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#09090b" stop-opacity="0.10"/>
            <stop offset="100%" stop-color="#09090b" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Background Dash Gridlines -->
        <line x1="32" y1="28" x2="315" y2="28" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="32" y1="70" x2="315" y2="70" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="32" y1="112" x2="315" y2="112" stroke="#f1f5f9" stroke-width="1"/>

        <!-- Y Axis Labels -->
        <text x="26" y="32" font-family="'Inter', sans-serif" font-size="9" font-weight="700" fill="#71717a" text-anchor="end">${yTop}</text>
        <text x="26" y="115" font-family="'Inter', sans-serif" font-size="9" font-weight="700" fill="#71717a" text-anchor="end">${yBottom}</text>

        <!-- Reach Area Fill -->
        <path d="${reachAreaD}" fill="url(#${gradId})"/>

        <!-- Reach Bold Black Line -->
        <path d="${reachPathD}" fill="none" stroke="#09090b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Profile Activity Slate Line -->
        <path d="${actPathD}" fill="none" stroke="#71717a" stroke-width="1.8" stroke-dasharray="3 3" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Data Points Circles -->
        ${reachY.map((y, i) => `
          <circle class="chart-point-reach pt-reach-${i}" cx="${xCoords[i]}" cy="${y}" r="3.2" fill="#ffffff" stroke="#09090b" stroke-width="2"/>
          <circle class="chart-point-act pt-act-${i}" cx="${xCoords[i]}" cy="${actY[i]}" r="2.5" fill="#ffffff" stroke="#71717a" stroke-width="1.5"/>
        `).join('')}

        <!-- X Axis Labels -->
        ${xLabels.map((lbl, i) => `
          <text x="${xCoords[i]}" y="132" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#71717a" text-anchor="middle">${lbl}</text>
        `).join('')}

        <!-- Invisible Hover Trigger Strips -->
        ${xCoords.map((x, i) => `
          <rect class="chart-hover-trigger" data-idx="${i}" data-label="${xLabels[i]}" data-reach="${reachPoints[i]}K" data-act="${activityPoints[i]}K" data-x="${x}" data-reach-y="${reachY[i]}" data-act-y="${actY[i]}" x="${x - (step || 20)/2}" y="0" width="${step || 40}" height="145" fill="transparent" style="cursor: crosshair;"/>
        `).join('')}
      </svg>
    `;
  }

  // COMPREHENSIVE DATA FOR TIME RANGES (4-SECTION SAAS SYSTEM)
  const DASHBOARD_DATA = {
    '7 Days': {
      followers: '48', following: '12', views: '380', comments: '52',
      totalReplies: '28', sentToday: '6', activeRulesFlat: '3', capturedLeadsFlat: '9',
      reach: '12.4K', trendReach: '▲ +9.2%',
      engaged: '1.4K', trendEngaged: '▲ +5.6%',
      visits: '820', trendVisits: '▲ +12.4%',
      clicks: '210', trendClicks: '▲ +14.8%',
      replies: '310', trendReplies: '▲ +8.5%',
      dmsToday: '18', trendDmsToday: '▲ +4.0%',
      activeRules: '5 Active', trendRules: '● 100% Uptime',
      leads: '84', trendLeads: '▲ +18.2%',
      reachSub: 'Instagram reach vs profile activity over the last 7 days.',
      legReach: '12.4K', legAct: '820',
      reachSvg: createDualLineChartSvg({
        reachPoints: [4, 6, 8, 7, 10, 11, 12.4],
        activityPoints: [0.2, 0.3, 0.5, 0.4, 0.7, 0.75, 0.82],
        xLabels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        yTop: '15K', yBottom: '0'
      }),
      funnel: {
        s1Num: '420', s1Pct: '100%', s1Fill: '100%',
        s2Num: '310', s2Pct: '73.8%', s2Fill: '73.8%',
        s3Num: '160', s3Pct: '38.0%', s3Fill: '38.0%',
        s4Num: '84',  s4Pct: '20.0%', s4Fill: '20.0%',
        rate: '20.0% Total Conv'
      },
      demographics: {
        total: '12.4K',
        nonFollowers: '62% (7.7K)', followers: '38% (4.7K)',
        us: '40% (5.0K)', in: '30% (3.7K)', gb: '15% (1.9K)'
      }
    },
    '14 Days': {
      followers: '48', following: '12', views: '740', comments: '110',
      totalReplies: '58', sentToday: '10', activeRulesFlat: '3', capturedLeadsFlat: '18',
      reach: '24.8K', trendReach: '▲ +11.5%',
      engaged: '2.9K', trendEngaged: '▲ +7.2%',
      visits: '1,680', trendVisits: '▲ +15.1%',
      clicks: '440', trendClicks: '▲ +18.0%',
      replies: '620', trendReplies: '▲ +10.2%',
      dmsToday: '42', trendDmsToday: '▲ +4.8%',
      activeRules: '5 Active', trendRules: '● 100% Uptime',
      leads: '172', trendLeads: '▲ +24.5%',
      reachSub: 'Instagram reach vs profile activity over the last 14 days.',
      legReach: '24.8K', legAct: '1.68K',
      reachSvg: createDualLineChartSvg({
        reachPoints: [8, 12, 16, 14, 20, 22, 24.8],
        activityPoints: [0.5, 0.7, 1.0, 0.9, 1.4, 1.5, 1.68],
        xLabels: ['Day 2', 'Day 4', 'Day 6', 'Day 8', 'Day 10', 'Day 12', 'Day 14'],
        yTop: '30K', yBottom: '0'
      }),
      funnel: {
        s1Num: '890', s1Pct: '100%', s1Fill: '100%',
        s2Num: '620', s2Pct: '69.6%', s2Fill: '69.6%',
        s3Num: '310', s3Pct: '34.8%', s3Fill: '34.8%',
        s4Num: '172', s4Pct: '19.3%', s4Fill: '19.3%',
        rate: '19.3% Total Conv'
      },
      demographics: {
        total: '24.8K',
        nonFollowers: '63% (15.6K)', followers: '37% (9.2K)',
        us: '41% (10.2K)', in: '29% (7.2K)', gb: '14% (3.5K)'
      }
    },
    '30 Days': {
      followers: '48', following: '12', views: '1,240', comments: '184',
      totalReplies: '96', sentToday: '14', activeRulesFlat: '3', capturedLeadsFlat: '28',
      reach: '48.2K', trendReach: '▲ +14.2%',
      engaged: '5.8K', trendEngaged: '▲ +8.4%',
      visits: '3,410', trendVisits: '▲ +18.0%',
      clicks: '890', trendClicks: '▲ +22.5%',
      replies: '1,240', trendReplies: '▲ +12.8%',
      dmsToday: '86', trendDmsToday: '▲ +5.2%',
      activeRules: '5 Active', trendRules: '● 100% Uptime',
      leads: '342', trendLeads: '▲ +31.4%',
      reachSub: 'Instagram reach vs profile activity over the last 30 days.',
      legReach: '48.2K', legAct: '3.41K',
      reachSvg: createDualLineChartSvg({
        reachPoints: [18, 28, 38, 32, 44, 42, 48.2],
        activityPoints: [1.2, 1.8, 2.4, 2.1, 3.0, 2.8, 3.41],
        xLabels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        yTop: '50K', yBottom: '0'
      }),
      funnel: {
        s1Num: '1,850', s1Pct: '100%', s1Fill: '100%',
        s2Num: '1,240', s2Pct: '67.0%', s2Fill: '67.0%',
        s3Num: '620',   s3Pct: '33.5%', s3Fill: '33.5%',
        s4Num: '342',   s4Pct: '18.5%', s4Fill: '18.5%',
        rate: '18.5% Total Conv'
      },
      demographics: {
        total: '48.2K',
        nonFollowers: '64% (30.8K)', followers: '36% (17.4K)',
        us: '42% (20.2K)', in: '28% (13.5K)', gb: '14% (6.7K)'
      }
    },
    '60 Days': {
      followers: '48', following: '12', views: '2,850', comments: '410',
      totalReplies: '210', sentToday: '18', activeRulesFlat: '4', capturedLeadsFlat: '62',
      reach: '92.6K', trendReach: '▲ +19.4%',
      engaged: '11.2K', trendEngaged: '▲ +12.0%',
      visits: '6,890', trendVisits: '▲ +21.4%',
      clicks: '1,740', trendClicks: '▲ +26.8%',
      replies: '2,410', trendReplies: '▲ +16.5%',
      dmsToday: '140', trendDmsToday: '▲ +6.1%',
      activeRules: '5 Active', trendRules: '● 100% Uptime',
      leads: '680', trendLeads: '▲ +35.2%',
      reachSub: 'Instagram reach vs profile activity over the last 60 days.',
      legReach: '92.6K', legAct: '6.89K',
      reachSvg: createDualLineChartSvg({
        reachPoints: [35, 50, 68, 62, 80, 85, 92.6],
        activityPoints: [2.5, 3.6, 4.8, 4.2, 5.9, 6.2, 6.89],
        xLabels: ['Day 1', 'Day 10', 'Day 20', 'Day 30', 'Day 40', 'Day 50', 'Day 60'],
        yTop: '100K', yBottom: '0'
      }),
      funnel: {
        s1Num: '3,620', s1Pct: '100%', s1Fill: '100%',
        s2Num: '2,410', s2Pct: '66.5%', s2Fill: '66.5%',
        s3Num: '1,220', s3Pct: '33.7%', s3Fill: '33.7%',
        s4Num: '680',   s4Pct: '18.7%', s4Fill: '18.7%',
        rate: '18.7% Total Conv'
      },
      demographics: {
        total: '92.6K',
        nonFollowers: '65% (60.2K)', followers: '35% (32.4K)',
        us: '43% (39.8K)', in: '28% (25.9K)', gb: '13% (12.0K)'
      }
    },
    '90 Days': {
      followers: '48', following: '12', views: '4,920', comments: '680',
      totalReplies: '340', sentToday: '22', activeRulesFlat: '5', capturedLeadsFlat: '104',
      reach: '142.8K', trendReach: '▲ +24.8%',
      engaged: '17.4K', trendEngaged: '▲ +15.2%',
      visits: '10,450', trendVisits: '▲ +25.0%',
      clicks: '2,680', trendClicks: '▲ +30.2%',
      replies: '3,820', trendReplies: '▲ +19.4%',
      dmsToday: '185', trendDmsToday: '▲ +7.0%',
      activeRules: '5 Active', trendRules: '● 100% Uptime',
      leads: '1,040', trendLeads: '▲ +39.0%',
      reachSub: 'Instagram reach vs profile activity over the last 90 days.',
      legReach: '142.8K', legAct: '10.4K',
      reachSvg: createDualLineChartSvg({
        reachPoints: [50, 75, 95, 90, 115, 128, 142.8],
        activityPoints: [3.8, 5.2, 7.0, 6.8, 8.5, 9.6, 10.45],
        xLabels: ['Day 1', 'Day 15', 'Day 30', 'Day 45', 'Day 60', 'Day 75', 'Day 90'],
        yTop: '150K', yBottom: '0'
      }),
      funnel: {
        s1Num: '5,740', s1Pct: '100%', s1Fill: '100%',
        s2Num: '3,820', s2Pct: '66.5%', s2Fill: '66.5%',
        s3Num: '1,940', s3Pct: '33.8%', s3Fill: '33.8%',
        s4Num: '1,040', s4Pct: '18.1%', s4Fill: '18.1%',
        rate: '18.1% Total Conv'
      },
      demographics: {
        total: '142.8K',
        nonFollowers: '66% (94.2K)', followers: '34% (48.6K)',
        us: '44% (62.8K)', in: '27% (38.5K)', gb: '13% (18.6K)'
      }
    }
  };

  // DOM ELEMENTS
  const navItems = document.querySelectorAll('.nav-item');
  const tabViews = document.querySelectorAll('.tab-view');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  // Modals
  const modalContainer = document.getElementById('modal-container');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const modalCancel = document.getElementById('modal-btn-cancel');
  const modalConfirm = document.getElementById('modal-btn-confirm');

  // Browser Storefront Overlay
  const browserOverlay = document.getElementById('browser-storefront-overlay');
  const btnOpenBrowserOverlay = document.getElementById('btn-open-browser-overlay');
  const btnCloseBrowserTab = document.getElementById('btn-close-browser-tab');
  const btnExitBrowserTab = document.getElementById('btn-exit-browser-tab');

  // Stats Element IDs (4-Section System)
  const flatStatIds = {
    followers: document.getElementById('stat-followers'),
    following: document.getElementById('stat-following'),
    views: document.getElementById('stat-views'),
    comments: document.getElementById('stat-comments'),
    totalReplies: document.getElementById('stat-total-replies'),
    sentToday: document.getElementById('stat-sent-today'),
    activeRules: document.getElementById('stat-active-rules-flat'),
    leads: document.getElementById('stat-captured-leads-flat')
  };

  const statIds = {
    reach: document.getElementById('stat-reach'),
    engaged: document.getElementById('stat-engaged'),
    visits: document.getElementById('stat-visits'),
    clicks: document.getElementById('stat-clicks'),
    replies: document.getElementById('stat-replies'),
    dmsToday: document.getElementById('stat-dms-today'),
    activeRules: document.getElementById('stat-active-rules'),
    leads: document.getElementById('stat-leads')
  };

  const trendIds = {
    reach: document.getElementById('trend-reach'),
    engaged: document.getElementById('trend-engaged'),
    visits: document.getElementById('trend-visits'),
    clicks: document.getElementById('trend-clicks'),
    replies: document.getElementById('trend-replies'),
    dmsToday: document.getElementById('trend-dms-today'),
    activeRules: document.getElementById('trend-active-rules'),
    leads: document.getElementById('trend-leads')
  };

  // Chart Containers
  const chartReachWrapper = document.getElementById('dash-reach-chart-box');
  const reachChartSub = document.getElementById('reach-chart-sub');
  const legReachVal = document.getElementById('leg-reach-val');
  const legActVal = document.getElementById('leg-activity-val');

  // Funnel elements
  const funnelRate = document.getElementById('funnel-overall-rate');
  const funnelStep1Num = document.getElementById('funnel-step1-num');
  const funnelStep1Fill = document.getElementById('funnel-step1-fill');
  const funnelStep2Num = document.getElementById('funnel-step2-num');
  const funnelStep2Pct = document.getElementById('funnel-step2-pct');
  const funnelStep2Fill = document.getElementById('funnel-step2-fill');
  const funnelStep3Num = document.getElementById('funnel-step3-num');
  const funnelStep3Pct = document.getElementById('funnel-step3-pct');
  const funnelStep3Fill = document.getElementById('funnel-step3-fill');
  const funnelStep4Num = document.getElementById('funnel-step4-num');
  const funnelStep4Pct = document.getElementById('funnel-step4-pct');
  const funnelStep4Fill = document.getElementById('funnel-step4-fill');

  // Demographics elements
  const donutTotal = document.getElementById('donut-total-reach');
  const donutNonFollowers = document.getElementById('donut-pct-nonfollowers');
  const donutFollowers = document.getElementById('donut-pct-followers');
  const audUs = document.getElementById('aud-country-us');
  const audIn = document.getElementById('aud-country-in');
  const audGb = document.getElementById('aud-country-gb');

  // Account Row Elements
  const accountInfoContainer = document.getElementById('account-info-container');
  const accountActionContainer = document.getElementById('account-action-container');

  // 1. SKELETON LOADING SHIMMER ANIMATION FOR THE WHOLE PAGE
  function showSkeletonLoading() {
    Object.values(flatStatIds).forEach(el => {
      if (el) el.innerHTML = '<span class="skeleton skeleton-text" style="width: 48px; height: 26px;"></span>';
    });

    Object.values(statIds).forEach(el => {
      if (el) el.innerHTML = '<span class="skeleton skeleton-text"></span>';
    });

    if (chartReachWrapper) chartReachWrapper.innerHTML = '<span class="skeleton skeleton-chart"></span>';
  }

  // 2. LOAD DASHBOARD DATA FUNCTION
  function loadDashboardData(range = '30 Days') {
    currentRange = range;
    showSkeletonLoading();

    setTimeout(() => {
      if (!isConnected) {
        Object.values(flatStatIds).forEach(el => {
          if (el) el.textContent = '0';
        });

        Object.values(statIds).forEach(el => {
          if (el) el.textContent = '0';
        });

        if (chartReachWrapper) {
          chartReachWrapper.innerHTML = `
            <div class="chart-empty-state">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6" stroke-linecap="round"/></svg>
              <span>No activity data available.</span>
            </div>`;
        }
        return;
      }

      const data = DASHBOARD_DATA[range] || DASHBOARD_DATA['30 Days'];

      // Update Flat Overview Stats (Screenshot Section)
      if (flatStatIds.followers) flatStatIds.followers.textContent = data.followers || '48';
      if (flatStatIds.following) flatStatIds.following.textContent = data.following || '12';
      if (flatStatIds.views) flatStatIds.views.textContent = data.views || '1,240';
      if (flatStatIds.comments) flatStatIds.comments.textContent = data.comments || '184';
      if (flatStatIds.totalReplies) flatStatIds.totalReplies.textContent = data.totalReplies || '96';
      if (flatStatIds.sentToday) flatStatIds.sentToday.textContent = data.sentToday || '14';
      if (flatStatIds.activeRules) flatStatIds.activeRules.textContent = data.activeRulesFlat || '3';
      if (flatStatIds.leads) flatStatIds.leads.textContent = data.capturedLeadsFlat || '28';

      // Update Top Stats
      if (statIds.reach) statIds.reach.textContent = data.reach;
      if (statIds.engaged) statIds.engaged.textContent = data.engaged;
      if (statIds.visits) statIds.visits.textContent = data.visits;
      if (statIds.clicks) statIds.clicks.textContent = data.clicks;
      if (statIds.replies) statIds.replies.textContent = data.replies;
      if (statIds.dmsToday) statIds.dmsToday.textContent = data.dmsToday;
      if (statIds.activeRules) statIds.activeRules.textContent = data.activeRules;
      if (statIds.leads) statIds.leads.textContent = data.leads;

      // Update Trends
      if (trendIds.reach) trendIds.reach.textContent = data.trendReach;
      if (trendIds.engaged) trendIds.engaged.textContent = data.trendEngaged;
      if (trendIds.visits) trendIds.visits.textContent = data.trendVisits;
      if (trendIds.clicks) trendIds.clicks.textContent = data.trendClicks;
      if (trendIds.replies) trendIds.replies.textContent = data.trendReplies;
      if (trendIds.dmsToday) trendIds.dmsToday.textContent = data.trendDmsToday;
      if (trendIds.activeRules) trendIds.activeRules.textContent = data.trendRules;
      if (trendIds.leads) trendIds.leads.textContent = data.trendLeads;

      // Update Chart 1: Dual Line Reach
      if (reachChartSub) reachChartSub.textContent = data.reachSub;
      if (legReachVal) legReachVal.textContent = data.legReach;
      if (legActVal) legActVal.textContent = data.legAct;
      if (chartReachWrapper) chartReachWrapper.innerHTML = data.reachSvg;

      // Update Chart 2: Conversion Funnel
      if (data.funnel) {
        if (funnelRate) funnelRate.textContent = data.funnel.rate;
        if (funnelStep1Num) funnelStep1Num.textContent = data.funnel.s1Num;
        if (funnelStep1Fill) funnelStep1Fill.style.width = data.funnel.s1Fill;
        if (funnelStep2Num) funnelStep2Num.textContent = data.funnel.s2Num;
        if (funnelStep2Pct) funnelStep2Pct.textContent = data.funnel.s2Pct;
        if (funnelStep2Fill) funnelStep2Fill.style.width = data.funnel.s2Fill;
        if (funnelStep3Num) funnelStep3Num.textContent = data.funnel.s3Num;
        if (funnelStep3Pct) funnelStep3Pct.textContent = data.funnel.s3Pct;
        if (funnelStep3Fill) funnelStep3Fill.style.width = data.funnel.s3Fill;
        if (funnelStep4Num) funnelStep4Num.textContent = data.funnel.s4Num;
        if (funnelStep4Pct) funnelStep4Pct.textContent = data.funnel.s4Pct;
        if (funnelStep4Fill) funnelStep4Fill.style.width = data.funnel.s4Fill;
      }

      // Update Chart 3: Demographics
      if (data.demographics) {
        if (donutTotal) donutTotal.textContent = data.demographics.total;
        if (donutNonFollowers) donutNonFollowers.textContent = data.demographics.nonFollowers;
        if (donutFollowers) donutFollowers.textContent = data.demographics.followers;
        if (audUs) audUs.textContent = data.demographics.us;
        if (audIn) audIn.textContent = data.demographics.in;
        if (audGb) audGb.textContent = data.demographics.gb;
      }

      attachChartTooltipListeners();
    }, 280);
  }

  // 3. TOGGLE CONNECTION STATE
  function updateConnectionUI() {
    if (!accountInfoContainer || !accountActionContainer) return;

    if (isConnected) {
      accountInfoContainer.innerHTML = `
        <div class="account-icon">R</div>
        <div class="account-details">
          <span class="account-handle" id="dashboard-account-handle">@render6457</span>
          <span class="account-status">Instagram Connected</span>
        </div>`;

      accountActionContainer.innerHTML = `<button class="btn btn-disconnect" id="btn-disconnect-modal">Disconnect</button>`;

      const newDisconnectBtn = document.getElementById('btn-disconnect-modal');
      if (newDisconnectBtn) {
        newDisconnectBtn.addEventListener('click', handleDisconnectClick);
      }
    } else {
      accountInfoContainer.innerHTML = `<span class="disconnected-text">No Instagram accounts connected.</span>`;
      accountActionContainer.innerHTML = `<button class="btn btn-primary" id="btn-connect-modal">Connect Instagram</button>`;

      const connectBtn = document.getElementById('btn-connect-modal');
      if (connectBtn) {
        connectBtn.addEventListener('click', () => {
          isConnected = true;
          updateConnectionUI();
          loadDashboardData(currentRange);
          showToast('Instagram account connected successfully!');
        });
      }
    }
  }

  function handleDisconnectClick() {
    isConnected = false;
    updateConnectionUI();
    loadDashboardData(currentRange);
    showToast('Disconnected account @render6457');
  }

  // 4. TAB NAVIGATION WITH RELOAD ANIMATION
  function triggerReloadAnimation(containerEl) {
    if (!containerEl) return;
    containerEl.classList.add('is-reloading-view');
    setTimeout(() => {
      containerEl.classList.remove('is-reloading-view');
    }, 100);
  }

  // MOBILE NAVIGATION DRAWER & AUTO SCREEN ADJUSTMENT CONTROLS
  const sidebar = document.getElementById('app-sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const btnMobileToggle = document.getElementById('btn-mobile-menu-toggle');
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');

  function openMobileSidebar() {
    if (sidebar) sidebar.classList.add('mobile-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
  }

  if (btnMobileToggle) {
    btnMobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openMobileSidebar();
    });
  }

  if (btnCloseSidebar) {
    btnCloseSidebar.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileSidebar();
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }

  // SMOOTH CAPSULE PILL ANIMATION CONTROLLERS
  function updateSidebarCapsulePill() {
    const nav = document.getElementById('sidebar-nav');
    const indicator = document.getElementById('sidebar-pill-indicator');
    const activeItem = nav?.querySelector('.nav-item.active');
    if (!nav || !indicator || !activeItem) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const topOffset = itemRect.top - navRect.top;

    indicator.style.transform = `translateY(${topOffset}px)`;
    indicator.style.height = `${itemRect.height}px`;
    indicator.style.opacity = '1';
  }

  function updateTimeRangeCapsulePill() {
    const picker = document.getElementById('dashboard-time-picker');
    const indicator = document.getElementById('time-range-indicator');
    const activeBtn = picker?.querySelector('.time-range-btn.active');
    if (!picker || !indicator || !activeBtn) return;

    const pickerRect = picker.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const leftOffset = btnRect.left - pickerRect.left;

    indicator.style.transform = `translateX(${leftOffset}px)`;
    indicator.style.width = `${btnRect.width}px`;
    indicator.style.opacity = '1';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMobileSidebar();
    }
    updateSidebarCapsulePill();
    updateTimeRangeCapsulePill();
  });
  // ==========================================================================
  // SKELETON SHIMMER LOADING SYSTEM (REPLACES WHOLE-VIEW BLUR/OVERLAYS)
  // ==========================================================================
  function triggerSkeletonShimmer(elements, onDone, duration = 400) {
    if (!elements || elements.length === 0) {
      if (onDone) onDone();
      return;
    }
    const elList = Array.isArray(elements) ? elements : Array.from(elements);
    const validEls = elList.filter(el => el && el instanceof HTMLElement);
    
    validEls.forEach(el => {
      el.classList.add('skeleton-loading');
    });

    setTimeout(() => {
      if (onDone) onDone();
      validEls.forEach(el => {
        el.classList.remove('skeleton-loading');
      });
    }, duration);
  }

  function skeletonizeDashboard(onDone, duration = 400) {
    const targets = [
      ...document.querySelectorAll('.flat-metric-value'),
      ...document.querySelectorAll('#dashboard-view .dash-stat-val'),
      ...document.querySelectorAll('#dashboard-view .dash-trend'),
      ...document.querySelectorAll('#dashboard-view .funnel-stat-num'),
      ...document.querySelectorAll('#dashboard-view .demo-sub-item span'),
      document.getElementById('demo-total-reach'),
      document.getElementById('dash-funnel-rate-badge'),
      ...document.querySelectorAll('#dashboard-view td span')
    ].filter(el => el !== null);

    triggerSkeletonShimmer(targets, onDone, duration);
  }

  function skeletonizeCapturedLeads(onDone, duration = 400) {
    const targets = [
      document.getElementById('leads-stat-total'),
      document.getElementById('leads-stat-emails'),
      document.getElementById('leads-stat-phones'),
      document.getElementById('leads-live-count-badge'),
      ...document.querySelectorAll('.leads-reel-count'),
      ...document.querySelectorAll('#leads-view .lead-handle'),
      ...document.querySelectorAll('#leads-view .lead-name'),
      ...document.querySelectorAll('#leads-view .lead-email-line'),
      ...document.querySelectorAll('#leads-view .lead-phone-line'),
      ...document.querySelectorAll('#leads-view .time-text'),
      ...document.querySelectorAll('#leads-view .kw-tag'),
      ...document.querySelectorAll('#leads-view .lead-status-pill')
    ].filter(el => el !== null);

    triggerSkeletonShimmer(targets, onDone, duration);
  }

  function skeletonizeInbox(onDone, duration = 400) {
    const targets = [
      document.getElementById('iq-active-bots'),
      document.getElementById('iq-open-leads'),
      document.getElementById('count-all'),
      document.getElementById('count-attention'),
      document.getElementById('count-bot'),
      document.getElementById('count-resolved'),
      ...document.querySelectorAll('.rr-t-user-name'),
      ...document.querySelectorAll('.rr-t-snippet'),
      ...document.querySelectorAll('.rr-t-timestamp')
    ].filter(el => el !== null);

    triggerSkeletonShimmer(targets, onDone, duration);
  }

  function skeletonizeRules(onDone, duration = 400) {
    const targets = [
      document.getElementById('filter-count-all'),
      document.getElementById('filter-count-post'),
      document.getElementById('filter-count-story'),
      document.getElementById('filter-count-reel'),
      document.getElementById('filter-count-dm'),
      ...document.querySelectorAll('.rule-metric-val'),
      ...document.querySelectorAll('.rule-card-title')
    ].filter(el => el !== null);

    triggerSkeletonShimmer(targets, onDone, duration);
  }

  function skeletonizeStorePreview(onDone, duration = 400) {
    const targets = [
      document.getElementById('dsp-name-el'),
      document.getElementById('dsp-bio-el'),
      ...document.querySelectorAll('.dsp-prod-name'),
      ...document.querySelectorAll('.dsp-prod-price')
    ].filter(el => el !== null);

    triggerSkeletonShimmer(targets, onDone, duration);
  }

  function triggerReloadAnimation(viewEl) {
    if (!viewEl) return;
    if (viewEl.id === 'dashboard-view') {
      skeletonizeDashboard(null, 300);
    } else if (viewEl.id === 'leads-view') {
      skeletonizeCapturedLeads(null, 300);
    } else if (viewEl.id === 'inbox-view') {
      skeletonizeInbox(null, 300);
    } else if (viewEl.id === 'automation-rules-view') {
      skeletonizeRules(null, 300);
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      updateSidebarCapsulePill();

      tabViews.forEach(view => {
        if (view.id === `${targetTab}-view`) {
          view.classList.add('active');
          triggerReloadAnimation(view);
        } else {
          view.classList.remove('active');
        }
      });

      if (targetTab === 'creatorstore') {
        setTimeout(() => {
          if (typeof window.updateSubnavArrows === 'function') {
            window.updateSubnavArrows();
          }
        }, 60);
      }

      if (window.innerWidth <= 1024) {
        closeMobileSidebar();
      }
    });
  });

  // 5. TOAST NOTIFICATION UTILITY
  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // 6. MODAL UTILITY
  function openModal(title, text, onConfirm) {
    if (!modalContainer || !modalTitle || !modalContent) return;
    modalTitle.textContent = title;
    modalContent.textContent = text;
    modalContainer.classList.add('active');

    const handleConfirm = () => {
      if (onConfirm) onConfirm();
      closeModal();
      if (modalConfirm) modalConfirm.removeEventListener('click', handleConfirm);
    };

    if (modalConfirm) modalConfirm.onclick = handleConfirm;
  }

  function closeModal() {
    if (modalContainer) modalContainer.classList.remove('active');
  }

  if (modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) closeModal();
    });
  }

  // 7. TIME RANGE PICKER LISTENERS
  const timeBtns = document.querySelectorAll('.time-range-btn');
  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedRange = btn.getAttribute('data-range');
      timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateTimeRangeCapsulePill();

      skeletonizeDashboard(() => {
        loadDashboardData(selectedRange);
        attachChartTooltipListeners();
      }, 350);

      showToast(`Loading metrics for ${selectedRange}...`);
    });
  });

  // ==========================================================================
  // DASHBOARD ADVANCED FEATURES: TOOLTIPS, CSV EXPORT, INSPECT DRAWER & FUNNEL
  // ==========================================================================

  // 1. CHART TOOLTIP & NODE HOVER LOGIC
  function attachChartTooltipListeners() {
    const chartBox = document.getElementById('dash-reach-chart-box');
    if (!chartBox) return;

    let tooltip = chartBox.querySelector('.dash-chart-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'dash-chart-tooltip';
      chartBox.appendChild(tooltip);
    }

    const triggers = chartBox.querySelectorAll('.chart-hover-trigger');
    triggers.forEach(trig => {
      trig.addEventListener('mouseenter', () => {
        const lbl = trig.getAttribute('data-label');
        const reach = trig.getAttribute('data-reach');
        const act = trig.getAttribute('data-act');
        const xPos = parseFloat(trig.getAttribute('data-x'));
        const idx = trig.getAttribute('data-idx');

        tooltip.innerHTML = `
          <div class="tt-title">${lbl} Performance</div>
          <div class="tt-row">
            <span><span class="tt-dot reach"></span>Reach:</span>
            <span class="tt-reach">${reach}</span>
          </div>
          <div class="tt-row">
            <span><span class="tt-dot act"></span>Profile Activity:</span>
            <span class="tt-act">${act}</span>
          </div>
        `;

        // Calculate left percentage based on SVG viewBox width 330
        const leftPct = (xPos / 330) * 100;
        tooltip.style.left = `${leftPct}%`;
        tooltip.style.top = `38%`;
        tooltip.classList.add('active');

        // Enlarge corresponding circle dots
        const reachDot = chartBox.querySelector(`.pt-reach-${idx}`);
        const actDot = chartBox.querySelector(`.pt-act-${idx}`);
        if (reachDot) {
          reachDot.setAttribute('r', '5.2');
          reachDot.setAttribute('fill', '#09090b');
        }
        if (actDot) {
          actDot.setAttribute('r', '4.2');
          actDot.setAttribute('fill', '#71717a');
        }
      });

      trig.addEventListener('mouseleave', () => {
        const idx = trig.getAttribute('data-idx');
        tooltip.classList.remove('active');

        const reachDot = chartBox.querySelector(`.pt-reach-${idx}`);
        const actDot = chartBox.querySelector(`.pt-act-${idx}`);
        if (reachDot) {
          reachDot.setAttribute('r', '3.2');
          reachDot.setAttribute('fill', '#ffffff');
        }
        if (actDot) {
          actDot.setAttribute('r', '2.5');
          actDot.setAttribute('fill', '#ffffff');
        }
      });
    });
  }

  // 2. EXPORT DASHBOARD SUMMARY AS CSV
  function initDashboardCsvExport() {
    const btnExport = document.getElementById('btn-export-dash-csv');
    if (!btnExport) return;

    btnExport.addEventListener('click', () => {
      const data = DASHBOARD_DATA[currentRange] || DASHBOARD_DATA['30 Days'];
      const timestamp = new Date().toISOString().split('T')[0];

      const csvRows = [
        ['"RenderReply Instagram Analytics Summary Report"'],
        ['"Generated Date"', `"${timestamp}"`],
        ['"Selected Time Period"', `"${currentRange}"`],
        ['"Instagram Account"', '"@render6457"'],
        [''],
        ['"--- QUICK-STATS METRICS ---"'],
        ['"Metric"', '"Value"', '"Growth Trend"'],
        ['"Accounts Reached"', `"${data.reach}"`, `"${data.trendReach}"`],
        ['"Accounts Engaged"', `"${data.engaged}"`, `"${data.trendEngaged}"`],
        ['"Profile Visits"', `"${data.visits}"`, `"${data.trendVisits}"`],
        ['"Link / Bio Clicks"', `"${data.clicks}"`, `"${data.trendClicks}"`],
        ['"Auto-Replies Sent"', `"${data.replies}"`, `"${data.trendReplies}"`],
        ['"DMs Triggered Today"', `"${data.dmsToday}"`, `"${data.trendDmsToday}"`],
        ['"Active Keywords / Rules"', `"${data.activeRules}"`, `"${data.trendRules}"`],
        ['"Captured Leads / Emails"', `"${data.leads}"`, `"${data.trendLeads}"`],
        [''],
        ['"--- AUTOMATION CONVERSION FUNNEL ---"'],
        ['"Stage"', '"Volume"', '"Conversion Rate"'],
        ['"1. Comments Detected"', `"${data.funnel ? data.funnel.s1Num : '1,850'}"`, '"100%"'],
        ['"2. DMs Sent"', `"${data.funnel ? data.funnel.s2Num : '1,240'}"`, `"${data.funnel ? data.funnel.s2Pct : '67.0%'}"`],
        ['"3. Links Clicked"', `"${data.funnel ? data.funnel.s3Num : '620'}"`, `"${data.funnel ? data.funnel.s3Pct : '33.5%'}"`],
        ['"4. Leads Captured"', `"${data.funnel ? data.funnel.s4Num : '342'}"`, `"${data.funnel ? data.funnel.s4Pct : '18.5%'}"`],
        [''],
        ['"--- TOP PERFORMING POSTS ---"'],
        ['"Content Title"', '"Reach"', '"Triggers Fired"', '"DM Click-Through Rate"'],
        ['"10x Instagram Automation Strategy 2026"', '"24.8K"', '"620 replies"', '"28.4%"'],
        ['"How I Make ₹50,000/mo Selling Digital Products"', '"16.2K"', '"410 replies"', '"31.2%"'],
        ['"Free Java Fullstack Roadmap 2026 PDF"', '"12.5K"', '"380 replies"', '"42.8%"'],
        ['"Story Automation Blueprint & DM Triggers"', '"8.4K"', '"190 replies"', '"24.0%"'],
        [''],
        ['"--- RECENT AUTOMATED DM LEADS ---"'],
        ['"Handle"', '"Full Name"', '"Keyword Trigger"', '"Status"', '"Timestamp"'],
        ['"@alex_growth"', '"Alex Miller"', '"#GUIDE"', '"Email Captured"', '"2m ago"'],
        ['"@sarah.designs"', '"Sarah K."', '"PRICING"', '"DM Delivered"', '"12m ago"'],
        ['"@marcus_dev"', '"Marcus Vance"', '"ROADMAP"', '"Email Captured"', '"28m ago"'],
        ['"@priya_creates"', '"Priya Sharma"', '"LINK"', '"DM Delivered"', '"1h ago"'],
        ['"@david_agency"', '"David Ross"', '"FREE"', '"Email Captured"', '"2h ago"']
      ];

      const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `RenderReply_${currentRange.replace(/\s+/g, '')}_Analytics_Report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported ${currentRange} Analytics Report CSV!`);
    });
  }

  // 3. SLIDE-OVER INSPECT DRAWER DATA & LOGIC
  const LEADS_INSPECT_DATA = [
    {
      handle: '@alex_growth',
      name: 'Alex Miller',
      avatar: 'AM',
      email: 'alex.miller@growthagency.io',
      phone: '+1 (555) 234-8910',
      source: 'Instagram Reel Comment',
      keyword: '#GUIDE',
      status: 'Email Captured',
      statusClass: 'email',
      time: '2m ago',
      timestamp: 'Today, 2:14 PM',
      postTitle: '10x Instagram Automation Strategy 2026',
      postThumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80',
      commentText: 'Can you send me the #GUIDE for full funnel setup?',
      botReplyText: 'Hey Alex! Here is your complete 10x Automation Blueprint & PDF guide: https://renderreply.com/p/guide. Let me know if you have questions!',
      ruleName: 'Reel Lead Magnet #GUIDE'
    },
    {
      handle: '@sarah.designs',
      name: 'Sarah K.',
      avatar: 'SK',
      email: 'sarah.k@designstudio.co',
      phone: '+1 (555) 789-1234',
      source: 'Instagram Story Reply',
      keyword: 'PRICING',
      status: 'DM Delivered',
      statusClass: '',
      time: '12m ago',
      timestamp: 'Today, 2:04 PM',
      postTitle: 'How I Make ₹50,000/mo Selling Digital Products',
      postThumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
      commentText: 'PRICING details please!',
      botReplyText: 'Hi Sarah! Here is the breakdown of our digital templates & pricing plans: https://renderreply.com/pricing',
      ruleName: 'Pricing Trigger Rule'
    },
    {
      handle: '@marcus_dev',
      name: 'Marcus Vance',
      avatar: 'MV',
      email: 'marcus.vance@techlead.dev',
      phone: '+44 7911 123456',
      source: 'Instagram Carousel Comment',
      keyword: 'ROADMAP',
      status: 'Email Captured',
      statusClass: 'email',
      time: '28m ago',
      timestamp: 'Today, 1:48 PM',
      postTitle: 'Free Java Fullstack Roadmap 2026 PDF',
      postThumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=80&q=80',
      commentText: 'Sent you ROADMAP on the carousel post',
      botReplyText: 'Awesome Marcus! The Fullstack 2026 Roadmap PDF has been emailed to you and here is the direct link: https://renderreply.com/p/roadmap-pdf',
      ruleName: 'Java Roadmap Lead Magnet'
    },
    {
      handle: '@priya_creates',
      name: 'Priya Sharma',
      avatar: 'PS',
      email: 'priya.sharma@creatorspace.in',
      phone: '+91 98765 43210',
      source: 'Instagram Story Mention',
      keyword: 'LINK',
      status: 'DM Delivered',
      statusClass: '',
      time: '1h ago',
      timestamp: 'Today, 1:15 PM',
      postTitle: 'Story Automation Blueprint & DM Triggers',
      postThumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=80&q=80',
      commentText: 'LINK',
      botReplyText: 'Hey Priya! Here is the instant link you requested from our story: https://renderreply.com/story-blueprint',
      ruleName: 'Story Reply Automation'
    },
    {
      handle: '@david_agency',
      name: 'David Ross',
      avatar: 'DR',
      email: 'david@scaleagency.com',
      phone: '+1 (555) 901-4432',
      source: 'Instagram Reel Comment',
      keyword: 'FREE',
      status: 'Email Captured',
      statusClass: 'email',
      time: '2h ago',
      timestamp: 'Today, 12:10 PM',
      postTitle: '10x Instagram Automation Strategy 2026',
      postThumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80',
      commentText: 'FREE resource download',
      botReplyText: 'Hey David! Your free resource package is ready: https://renderreply.com/free-pack. Check your email for login credentials!',
      ruleName: 'Free Lead Pack Automation'
    }
  ];

  const POSTS_INSPECT_DATA = [
    {
      title: '10x Instagram Automation Strategy 2026',
      type: 'Instagram Reel',
      published: '3 days ago',
      mediaId: '17983948291048',
      mediaUrl: 'https://instagram.com/p/C9x81k2mN',
      thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      associatedRule: 'Reel Lead Magnet #GUIDE',
      captionSnippet: "Want my exact 10x Instagram automation blueprint? Comment '#GUIDE' below and I'll DM you the free strategy pack!",
      // Instagram Core Interactions API
      likes: '1,480',
      comments: '620',
      shares: '385',
      saves: '512',
      // Instagram Video / Reel Insights API
      plays: '31,450',
      impressions: '34,200',
      reach: '24,800',
      avgWatchTime: '14.2s (84% retention)',
      totalWatchHours: '28.4 hrs',
      // Profile Activity API
      followersGained: '+142',
      profileVisits: '890',
      websiteClicks: '340',
      // Audience Distribution API
      nonFollowersPercent: 86,
      nonFollowersCount: '21,328',
      followersPercent: 14,
      followersCount: '3,472',
      engagementRate: '8.4%',
      // RenderReply Automation Funnel
      keyword: '#GUIDE',
      triggersFired: '620',
      dmOpenRate: '96.8%',
      dmCtr: '28.4%',
      leadsCaptured: '176',
      conversionRate: '28.4%',
      revenueGenerated: '₹35,200',
      sampleComment: 'Hey Alex: #GUIDE please!',
      sampleReply: 'Hey Alex! Here is your 10x Instagram Automation Blueprint & Preset Pack ready to download:'
    },
    {
      title: 'How I Make ₹50,000/mo Selling Digital Products',
      type: 'Instagram Reel',
      published: '5 days ago',
      mediaId: '18029348123901',
      mediaUrl: 'https://instagram.com/p/C8k12j9mP',
      thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      associatedRule: 'Pricing Trigger Rule',
      captionSnippet: "Full breakdown of how I monetize my reels with digital templates. Drop 'PRICING' to get the full revenue sheet!",
      likes: '980',
      comments: '410',
      shares: '245',
      saves: '420',
      plays: '22,800',
      impressions: '25,400',
      reach: '16,200',
      avgWatchTime: '15.1s (78% retention)',
      totalWatchHours: '19.8 hrs',
      followersGained: '+98',
      profileVisits: '640',
      websiteClicks: '210',
      nonFollowersPercent: 82,
      nonFollowersCount: '13,284',
      followersPercent: 18,
      followersCount: '2,916',
      engagementRate: '9.2%',
      keyword: 'PRICING',
      triggersFired: '410',
      dmOpenRate: '95.4%',
      dmCtr: '31.2%',
      leadsCaptured: '128',
      conversionRate: '31.2%',
      revenueGenerated: '₹25,600',
      sampleComment: 'Sarah K: PRICING plans?',
      sampleReply: 'Hey Sarah! Here are our exact pricing tiers and instant checkout links for creators:'
    },
    {
      title: 'Free Java Fullstack Roadmap 2026 PDF',
      type: 'Instagram Carousel',
      published: '1 week ago',
      mediaId: '17992837461029',
      mediaUrl: 'https://instagram.com/p/C7m90x4kL',
      thumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=120&q=80',
      associatedRule: 'Java Roadmap Lead Magnet',
      captionSnippet: "Swipe through for the complete 2026 Java Roadmap. Comment 'ROADMAP' and our bot will send you the high-res PDF!",
      likes: '1,120',
      comments: '380',
      shares: '530',
      saves: '890',
      plays: '16,400',
      impressions: '17,800',
      reach: '12,500',
      avgWatchTime: 'Swipe rate: 78.4%',
      totalWatchHours: '14.2 hrs',
      followersGained: '+215',
      profileVisits: '780',
      websiteClicks: '410',
      nonFollowersPercent: 74,
      nonFollowersCount: '9,250',
      followersPercent: 26,
      followersCount: '3,250',
      engagementRate: '11.8%',
      keyword: 'ROADMAP',
      triggersFired: '380',
      dmOpenRate: '98.1%',
      dmCtr: '42.8%',
      leadsCaptured: '162',
      conversionRate: '42.8%',
      revenueGenerated: '₹32,400',
      sampleComment: 'Marcus V: ROADMAP',
      sampleReply: 'Hey Marcus! Here is your direct PDF download link for the Java Fullstack Roadmap 2026:'
    },
    {
      title: 'Story Automation Blueprint & DM Triggers',
      type: 'Instagram Story',
      published: '2 weeks ago',
      mediaId: '18091283746192',
      mediaUrl: 'https://instagram.com/stories/render6457',
      thumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
      associatedRule: 'Story Reply Automation',
      captionSnippet: "Automate your story replies 24/7. Tap or reply 'LINK' to try the live demo!",
      likes: '340',
      comments: '190',
      shares: '94',
      saves: '160',
      plays: '9,600',
      impressions: '10,200',
      reach: '8,400',
      avgWatchTime: '92% Completion rate',
      totalWatchHours: '6.4 hrs',
      followersGained: '+34',
      profileVisits: '320',
      websiteClicks: '190',
      nonFollowersPercent: 42,
      nonFollowersCount: '3,528',
      followersPercent: 58,
      followersCount: '4,872',
      engagementRate: '7.5%',
      keyword: 'LINK',
      triggersFired: '190',
      dmOpenRate: '94.2%',
      dmCtr: '24.0%',
      leadsCaptured: '46',
      conversionRate: '24.0%',
      revenueGenerated: '₹9,200',
      sampleComment: 'Priya S: LINK',
      sampleReply: 'Hey Priya! Here is the link to our live automated story workflow and demo:'
    }
  ];

  const inspectDrawer = document.getElementById('dash-inspect-drawer');
  const inspectBackdrop = document.getElementById('dash-inspect-backdrop');
  const inspectTypeBadge = document.getElementById('inspect-type-badge');
  const inspectMainTitle = document.getElementById('inspect-main-title');
  const inspectSubTitle = document.getElementById('inspect-sub-title');
  const inspectContent = document.getElementById('inspect-drawer-content');
  const inspectActions = document.getElementById('inspect-drawer-actions');
  const btnCloseInspect = document.getElementById('btn-close-inspect');

  function openInspectDrawer() {
    if (inspectDrawer) {
      inspectDrawer.classList.add('active');
      inspectDrawer.setAttribute('aria-hidden', 'false');
    }
    if (inspectBackdrop) inspectBackdrop.classList.add('active');
  }

  function closeInspectDrawer() {
    if (inspectDrawer) {
      inspectDrawer.classList.remove('active');
      inspectDrawer.setAttribute('aria-hidden', 'true');
    }
    if (inspectBackdrop) inspectBackdrop.classList.remove('active');
  }
  window.closeInspectDrawer = closeInspectDrawer;

  if (btnCloseInspect) btnCloseInspect.addEventListener('click', closeInspectDrawer);
  if (inspectBackdrop) inspectBackdrop.addEventListener('click', closeInspectDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inspectDrawer && inspectDrawer.classList.contains('active')) {
      closeInspectDrawer();
    }
  });

  function inspectLead(idx) {
    const lead = LEADS_INSPECT_DATA[idx];
    if (!lead) return;

    if (inspectTypeBadge) inspectTypeBadge.textContent = 'Lead Inspection';
    if (inspectMainTitle) inspectMainTitle.textContent = lead.handle;
    if (inspectSubTitle) inspectSubTitle.textContent = `${lead.name} • Captured ${lead.time}`;

    if (inspectContent) {
      inspectContent.innerHTML = `
        <div class="inspect-info-grid">
          <div class="inspect-info-item">
            <div class="inspect-info-lbl">Captured Email</div>
            <div class="inspect-info-val">${lead.email}</div>
          </div>
          <div class="inspect-info-item">
            <div class="inspect-info-lbl">Phone Number</div>
            <div class="inspect-info-val">${lead.phone}</div>
          </div>
          <div class="inspect-info-item">
            <div class="inspect-info-lbl">Trigger Keyword</div>
            <div class="inspect-info-val"><span class="kw-tag">${lead.keyword}</span></div>
          </div>
          <div class="inspect-info-item">
            <div class="inspect-info-lbl">Delivery Status</div>
            <div class="inspect-info-val"><span class="lead-status-pill ${lead.statusClass}">${lead.status}</span></div>
          </div>
        </div>

        <div>
          <div class="inspect-section-title">Trigger Source Content</div>
          <div class="post-content-cell" style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 10px;">
            <img src="${lead.postThumb}" class="post-table-thumb" alt="">
            <div class="post-cell-meta">
              <span class="post-table-title">${lead.postTitle}</span>
              <span class="post-table-sub">Active Automation: <strong>${lead.ruleName}</strong></span>
            </div>
          </div>
        </div>

        <div>
          <div class="inspect-section-title">Automated DM Log</div>
          <div class="inspect-chat-preview">
            <div class="inspect-bubble-inbound">
              <strong>${lead.handle}</strong>: "${lead.commentText}"
              <span class="inspect-bubble-meta">${lead.timestamp}</span>
            </div>
            <div class="inspect-bubble-outbound">
              <strong>RenderReply Bot</strong>: ${lead.botReplyText}
              <span class="inspect-bubble-meta" style="color: #cbd5e1;">Sent instantly • < 0.8s</span>
            </div>
          </div>
        </div>
      `;
    }

    if (inspectActions) {
      inspectActions.innerHTML = `
        <button type="button" class="btn btn-outline btn-sm" id="btn-copy-lead-email">Copy Email</button>
        <button type="button" class="btn btn-primary btn-sm" id="btn-goto-inbox-lead">Open in Live Inbox →</button>
      `;

      const btnCopy = document.getElementById('btn-copy-lead-email');
      if (btnCopy) {
        btnCopy.addEventListener('click', () => {
          navigator.clipboard.writeText(lead.email).then(() => {
            btnCopy.textContent = 'Copied!';
            showToast(`Copied ${lead.email} to clipboard`);
            setTimeout(() => { btnCopy.textContent = 'Copy Email'; }, 2000);
          });
        });
      }

      const btnGotoInbox = document.getElementById('btn-goto-inbox-lead');
      if (btnGotoInbox) {
        btnGotoInbox.addEventListener('click', () => {
          closeInspectDrawer();
          const inboxNav = document.querySelector('.nav-item[data-tab="inbox"]');
          if (inboxNav) inboxNav.click();
          showToast(`Opened conversation with ${lead.handle}`);
        });
      }
    }

    openInspectDrawer();
  }

  function inspectPost(idx) {
    const post = POSTS_INSPECT_DATA[idx];
    if (!post) return;

    if (inspectTypeBadge) inspectTypeBadge.textContent = 'Content Performance';
    if (inspectMainTitle) inspectMainTitle.textContent = post.title;
    if (inspectSubTitle) inspectSubTitle.textContent = `${post.type} • Published ${post.published}`;

    if (inspectContent) {
      inspectContent.innerHTML = `
        <!-- MEDIA BANNER -->
        <div style="display: flex; gap: 14px; align-items: center; background: #ffffff; border: 1px solid #e2e8f0; padding: 14px; border-radius: 12px;">
          <img src="${post.thumb}" style="width: 60px; height: 60px; border-radius: 10px; object-fit: cover; border: 1px solid #e2e8f0; flex-shrink: 0;" alt="">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 13.5px; font-weight: 800; color: #09090b; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${post.title}</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
              <span style="font-size: 10.5px; background: #f1f5f9; color: #09090b; padding: 2px 7px; border-radius: 5px; font-weight: 700; border: 1px solid #e2e8f0;">${post.type}</span>
              <span style="font-size: 11px; color: #71717a;">${post.published}</span>
            </div>
            <div style="font-size: 11px; color: #71717a; margin-top: 4px;">Assigned Rule: <strong style="color: #09090b;">${post.associatedRule}</strong></div>
          </div>
        </div>

        <!-- 1. INSTAGRAM CORE ENGAGEMENT & INTERACTIONS -->
        <div class="inspect-section-block">
          <div class="inspect-section-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Instagram Engagement &amp; Interactions
          </div>
          <div class="inspect-metrics-4col">
            <div class="inspect-stat-pill-box">
              <div class="inspect-stat-pill-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div class="inspect-stat-pill-num">${post.likes}</div>
              <div class="inspect-stat-pill-lbl">Likes</div>
            </div>

            <div class="inspect-stat-pill-box">
              <div class="inspect-stat-pill-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="inspect-stat-pill-num">${post.comments}</div>
              <div class="inspect-stat-pill-lbl">Comments</div>
            </div>

            <div class="inspect-stat-pill-box">
              <div class="inspect-stat-pill-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </div>
              <div class="inspect-stat-pill-num">${post.shares}</div>
              <div class="inspect-stat-pill-lbl">Shares</div>
            </div>

            <div class="inspect-stat-pill-box">
              <div class="inspect-stat-pill-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div class="inspect-stat-pill-num">${post.saves}</div>
              <div class="inspect-stat-pill-lbl">Saves</div>
            </div>
          </div>
        </div>

        <!-- 2. REEL VIDEO & PROFILE GROWTH INSIGHTS -->
        <div class="inspect-section-block">
          <div class="inspect-section-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Video Insights &amp; Profile Growth
          </div>
          <div class="inspect-info-grid">
            <div class="inspect-info-item">
              <div class="inspect-info-lbl">Total Video Plays</div>
              <div class="inspect-info-val">${post.plays}</div>
              <div class="inspect-info-sub">Total watch: ${post.totalWatchHours}</div>
            </div>

            <div class="inspect-info-item">
              <div class="inspect-info-lbl">Followers Gained</div>
              <div class="inspect-info-val">${post.followersGained} Follows</div>
              <div class="inspect-info-sub">Directly from this post</div>
            </div>

            <div class="inspect-info-item">
              <div class="inspect-info-lbl">Profile Visits</div>
              <div class="inspect-info-val">${post.profileVisits}</div>
              <div class="inspect-info-sub">${post.websiteClicks} bio link taps</div>
            </div>

            <div class="inspect-info-item">
              <div class="inspect-info-lbl">Average Retention</div>
              <div class="inspect-info-val">${post.avgWatchTime}</div>
              <div class="inspect-info-sub">Engagement rate: ${post.engagementRate}</div>
            </div>
          </div>
        </div>

        <!-- 3. REACH & AUDIENCE DISTRIBUTION (EXPLORE/NON-FOLLOWERS) -->
        <div class="inspect-section-block">
          <div class="inspect-section-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Audience &amp; Discovery (Explore Feed)
          </div>
          <div class="inspect-reach-progress-wrap">
            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; color: #09090b;">
              <span>Total Reach: ${post.reach}</span>
              <span style="color: #71717a; font-size: 11px; font-weight: 600;">Impressions: ${post.impressions}</span>
            </div>
            
            <!-- Dual Monochrome Progress Bar -->
            <div class="inspect-reach-bar">
              <div class="reach-bar-nonfollowers" style="width: ${post.nonFollowersPercent}%;" title="Non-followers: ${post.nonFollowersPercent}%"></div>
              <div class="reach-bar-followers" style="width: ${post.followersPercent}%;" title="Followers: ${post.followersPercent}%"></div>
            </div>

            <div class="inspect-reach-legend">
              <div class="inspect-reach-legend-item">
                <span class="legend-dot black"></span>
                <span><strong>${post.nonFollowersPercent}%</strong> Non-Followers (${post.nonFollowersCount})</span>
              </div>
              <div class="inspect-reach-legend-item">
                <span class="legend-dot light"></span>
                <span><strong>${post.followersPercent}%</strong> Followers (${post.followersCount})</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. RENDERREPLY AUTOMATION FUNNEL & LEADS -->
        <div class="inspect-section-block">
          <div class="inspect-section-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            RenderReply DM Automation &amp; Lead Conversion
          </div>
          <div class="inspect-info-grid">
            <div class="inspect-info-item">
              <div class="inspect-info-lbl">Keyword Triggered</div>
              <div class="inspect-info-val"><span class="kw-tag">${post.keyword}</span></div>
              <div class="inspect-info-sub">${post.triggersFired} instant replies sent</div>
            </div>

            <div class="inspect-info-item">
              <div class="inspect-info-lbl">DM Open &amp; CTR</div>
              <div class="inspect-info-val">${post.dmCtr} CTR</div>
              <div class="inspect-info-sub">${post.dmOpenRate} DM open rate</div>
            </div>

            <div class="inspect-info-item">
              <div class="inspect-info-lbl">Leads / Emails Captured</div>
              <div class="inspect-info-val" style="font-size: 15px;">${post.leadsCaptured} Verified Leads</div>
              <div class="inspect-info-sub">${post.conversionRate} Conversion Rate</div>
            </div>

            <div class="inspect-info-item">
              <div class="inspect-info-lbl">Pipeline Revenue</div>
              <div class="inspect-info-val" style="font-size: 15px;">${post.revenueGenerated}</div>
              <div class="inspect-info-sub">Generated from this Reel</div>
            </div>
          </div>
        </div>

        <!-- 5. AUTOMATED DM CHAT PREVIEW -->
        <div class="inspect-section-block">
          <div class="inspect-section-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Live DM Automation Flow
          </div>
          <div class="inspect-chat-preview">
            <div class="inspect-bubble-inbound">
              <strong>User Comment</strong>: "${post.sampleComment}"
              <span class="inspect-bubble-meta">Triggered keyword ${post.keyword}</span>
            </div>
            <div class="inspect-bubble-outbound">
              <strong>RenderReply Bot</strong>: ${post.sampleReply}
              <span class="inspect-bubble-meta" style="color: #cbd5e1;">Instant delivery (&lt; 0.8s) • Lead Magnet Attached</span>
            </div>
          </div>
        </div>
      `;
    }

    if (inspectActions) {
      inspectActions.innerHTML = `
        <button type="button" class="btn btn-outline btn-sm" id="btn-inspect-close-post">Close</button>
        <button type="button" class="btn btn-primary btn-sm" id="btn-inspect-edit-rule">Manage Automation Rule →</button>
      `;

      const btnClosePost = document.getElementById('btn-inspect-close-post');
      if (btnClosePost) {
        btnClosePost.addEventListener('click', closeInspectDrawer);
      }

      const btnEditRule = document.getElementById('btn-inspect-edit-rule');
      if (btnEditRule) {
        btnEditRule.addEventListener('click', () => {
          closeInspectDrawer();
          const autoNav = document.querySelector('.nav-item[data-tab="automation-rules"]');
          if (autoNav) {
            autoNav.click();
          } else if (typeof window.switchMainTab === 'function') {
            window.switchMainTab('automation-rules');
          }

          const searchRuleName = (post.associatedRule || '').toLowerCase();
          const matchedRule = automationRulesState.find(r =>
            r.name.toLowerCase().includes(searchRuleName) ||
            searchRuleName.includes(r.name.toLowerCase()) ||
            (r.keywords && r.keywords.some(k => searchRuleName.includes(k.toLowerCase())))
          );

          if (matchedRule) {
            setTimeout(() => {
              openEditAutomationModal(matchedRule.id);
            }, 250);
          }
          showToast(`Viewing automation rule "${post.associatedRule}"`);
        });
      }
    }

    openInspectDrawer();
  }

  function initTableClickInspectors() {
    const postRows = document.querySelectorAll('.clickable-table-row[data-post-idx]');
    postRows.forEach(row => {
      row.addEventListener('click', () => {
        const idx = parseInt(row.getAttribute('data-post-idx'), 10);
        inspectPost(idx);
      });
    });

    const leadRows = document.querySelectorAll('.clickable-table-row[data-lead-idx]');
    leadRows.forEach(row => {
      row.addEventListener('click', () => {
        const idx = parseInt(row.getAttribute('data-lead-idx'), 10);
        inspectLead(idx);
      });
    });
  }

  // 4. FUNNEL STEP INTERACTIVE DETAILS
  function initFunnelInteractions() {
    const funnelSteps = document.querySelectorAll('.funnel-step-item');
    const dropoffMessages = [
      'Top of Funnel: All detected keyword comments on posts & reels',
      'Step 1 → 2: 67.0% of commenters received an instant bot DM (33% drop-off from private accounts/rate limits)',
      'Step 2 → 3: 50.0% of DM recipients clicked the bio/store link (33.5% of overall funnel)',
      'Step 3 → 4: 55.2% of link clickers opted in with their email address (18.5% total funnel conversion)'
    ];

    funnelSteps.forEach((step, i) => {
      step.setAttribute('title', dropoffMessages[i] || 'Funnel step breakdown');
      step.addEventListener('click', () => {
        showToast(dropoffMessages[i] || 'Funnel step details');
      });
    });
  }

  // ==========================================================================
  // CAPTURED LEADS VIEW TAB ENGINE & CONTROLLER
  // ==========================================================================
  const CAPTURED_LEADS_DATABASE = [
    {
      id: 'lead-1',
      handle: '@alex_growth',
      name: 'Alex Miller',
      avatar: 'AM',
      email: 'alex.miller@growthagency.io',
      phone: '+1 (555) 234-8910',
      keyword: '#GUIDE',
      campaign: 'guide',
      status: 'Email Captured',
      statusClass: 'email',
      sourceTitle: '10x Instagram Automation Strategy 2026',
      sourceThumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80',
      time: '2m ago',
      timestamp: 'Today, 2:14 PM',
      commentText: 'Can you send me the #GUIDE for full funnel setup?',
      botReplyText: 'Hey Alex! Here is your complete 10x Automation Blueprint & PDF guide: https://renderreply.com/p/guide',
      ruleName: 'Reel Lead Magnet #GUIDE'
    },
    {
      id: 'lead-2',
      handle: '@sarah.designs',
      name: 'Sarah K.',
      avatar: 'SK',
      email: 'sarah.k@designstudio.co',
      phone: '+1 (555) 789-1234',
      keyword: 'PRICING',
      campaign: 'pricing',
      status: 'DM Delivered',
      statusClass: '',
      sourceTitle: 'How I Make ₹50,000/mo Selling Digital Products',
      sourceThumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
      time: '12m ago',
      timestamp: 'Today, 2:04 PM',
      commentText: 'PRICING details please!',
      botReplyText: 'Hi Sarah! Here is the breakdown of our digital templates & pricing plans: https://renderreply.com/pricing',
      ruleName: 'Pricing Trigger Rule'
    },
    {
      id: 'lead-3',
      handle: '@marcus_dev',
      name: 'Marcus Vance',
      avatar: 'MV',
      email: 'marcus.vance@techlead.dev',
      phone: '+44 7911 123456',
      keyword: 'ROADMAP',
      campaign: 'roadmap',
      status: 'Email Captured',
      statusClass: 'email',
      sourceTitle: 'Free Java Fullstack Roadmap 2026 PDF',
      sourceThumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=80&q=80',
      time: '28m ago',
      timestamp: 'Today, 1:48 PM',
      commentText: 'Sent you ROADMAP on the carousel post',
      botReplyText: 'Awesome Marcus! The Fullstack 2026 Roadmap PDF has been emailed to you and here is the direct link: https://renderreply.com/p/roadmap-pdf',
      ruleName: 'Java Roadmap Lead Magnet'
    },
    {
      id: 'lead-4',
      handle: '@priya_creates',
      name: 'Priya Sharma',
      avatar: 'PS',
      email: 'priya.sharma@creatorspace.in',
      phone: '+91 98765 43210',
      keyword: 'LINK',
      campaign: 'story',
      status: 'DM Delivered',
      statusClass: '',
      sourceTitle: 'Story Automation Blueprint & DM Triggers',
      sourceThumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=80&q=80',
      time: '1h ago',
      timestamp: 'Today, 1:15 PM',
      commentText: 'LINK',
      botReplyText: 'Hey Priya! Here is the instant link you requested from our story: https://renderreply.com/story-blueprint',
      ruleName: 'Story Reply Automation'
    },
    {
      id: 'lead-5',
      handle: '@david_agency',
      name: 'David Ross',
      avatar: 'DR',
      email: 'david@scaleagency.com',
      phone: '+1 (555) 901-4432',
      keyword: 'FREE',
      campaign: 'free',
      status: 'Email Captured',
      statusClass: 'email',
      sourceTitle: 'Free Lead Pack Automation',
      sourceThumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80',
      time: '2h ago',
      timestamp: 'Today, 12:10 PM',
      commentText: 'FREE resource download',
      botReplyText: 'Hey David! Your free resource package is ready: https://renderreply.com/free-pack. Check your email for login credentials!',
      ruleName: 'Free Lead Pack Automation'
    },
    {
      id: 'lead-6',
      handle: '@elena_ecom',
      name: 'Elena Rostova',
      avatar: 'ER',
      email: 'elena@ecomscale.co',
      phone: '+1 (555) 432-1098',
      keyword: '#GUIDE',
      campaign: 'guide',
      status: 'Email Captured',
      statusClass: 'email',
      sourceTitle: '10x Instagram Automation Strategy 2026',
      sourceThumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80',
      time: '3h ago',
      timestamp: 'Today, 11:32 AM',
      commentText: '#GUIDE please!',
      botReplyText: 'Hey Elena! Here is the full guide to scaling digital products with RenderReply: https://renderreply.com/p/guide',
      ruleName: 'Reel Lead Magnet #GUIDE'
    },
    {
      id: 'lead-7',
      handle: '@karan_tech',
      name: 'Karan Patel',
      avatar: 'KP',
      email: 'karan@codevalley.dev',
      phone: '+91 99887 76655',
      keyword: 'ROADMAP',
      campaign: 'roadmap',
      status: 'Email Captured',
      statusClass: 'email',
      sourceTitle: 'Free Java Fullstack Roadmap 2026 PDF',
      sourceThumb: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=80&q=80',
      time: '4h ago',
      timestamp: 'Today, 10:18 AM',
      commentText: 'ROADMAP link',
      botReplyText: 'Hey Karan! We sent the Fullstack Roadmap PDF straight to your inbox and here: https://renderreply.com/p/roadmap-pdf',
      ruleName: 'Java Roadmap Lead Magnet'
    },
    {
      id: 'lead-8',
      handle: '@chloe_fashion',
      name: 'Chloe Bennett',
      avatar: 'CB',
      email: 'chloe@stylecreator.com',
      phone: '+1 (555) 678-9012',
      keyword: 'PRICING',
      campaign: 'pricing',
      status: 'DM Delivered',
      statusClass: '',
      sourceTitle: 'How I Make ₹50,000/mo Selling Digital Products',
      sourceThumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
      time: '5h ago',
      timestamp: 'Today, 09:44 AM',
      commentText: 'Can I get the PRICING?',
      botReplyText: 'Hey Chloe! Here are all current creator store tiers and checkout links: https://renderreply.com/pricing',
      ruleName: 'Pricing Trigger Rule'
    }
  ];

  let currentLeadsCampaign = 'all';
  let currentLeadsStatus = 'all';
  let currentLeadsSearchQuery = '';

  function renderCapturedLeadsTable() {
    const tableBody = document.getElementById('leads-view-table-body');
    if (!tableBody) return;

    const filtered = CAPTURED_LEADS_DATABASE.filter(lead => {
      // Campaign Filter
      if (currentLeadsCampaign !== 'all' && lead.campaign !== currentLeadsCampaign) {
        return false;
      }
      // Status Filter
      if (currentLeadsStatus === 'email' && !lead.statusClass.includes('email')) {
        return false;
      }
      if (currentLeadsStatus === 'dm' && lead.statusClass.includes('email')) {
        return false;
      }
      // Search Query
      if (currentLeadsSearchQuery) {
        const q = currentLeadsSearchQuery.toLowerCase();
        const matches = (
          lead.handle.toLowerCase().includes(q) ||
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.phone.toLowerCase().includes(q) ||
          lead.keyword.toLowerCase().includes(q) ||
          lead.sourceTitle.toLowerCase().includes(q)
        );
        if (!matches) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 48px 20px;">
            <div style="color: #71717a; font-size: 13px; font-weight: 600;">
              No captured leads matched your current filter or search criteria.
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map((lead, idx) => `
      <tr class="clickable-table-row" data-db-lead-id="${lead.id}">
        <td>
          <div class="lead-user-cell">
            <div class="lead-user-avatar">${lead.avatar}</div>
            <div class="lead-cell-meta">
              <span class="lead-handle">${lead.handle}</span>
              <span class="lead-name">${lead.name}</span>
            </div>
          </div>
        </td>
        <td>
          <div class="lead-contact-block">
            <div class="lead-email-line">
              <span>${lead.email}</span>
            </div>
            <div class="lead-phone-line">${lead.phone}</div>
          </div>
        </td>
        <td class="cell-align-center">
          <span class="kw-tag">${lead.keyword}</span>
        </td>
        <td class="cell-align-center">
          <span class="lead-status-pill ${lead.statusClass}">${lead.status}</span>
        </td>
        <td>
          <div class="post-content-cell">
            <img src="${lead.sourceThumb}" class="post-table-thumb" alt="">
            <div class="post-cell-meta">
              <span class="post-table-title" style="max-width: 170px;">${lead.sourceTitle}</span>
              <span class="post-table-sub">Auto: ${lead.ruleName}</span>
            </div>
          </div>
        </td>
        <td class="cell-align-right time-text">${lead.time}</td>
        <td class="cell-align-center">
          <button type="button" class="btn-mini-action btn-inspect-db-lead" data-db-lead-id="${lead.id}">
            Inspect
          </button>
        </td>
      </tr>
    `).join('');

    // Attach click listeners to rows & inspect buttons
    tableBody.querySelectorAll('.clickable-table-row').forEach(row => {
      row.addEventListener('click', (e) => {
        const id = row.getAttribute('data-db-lead-id');
        const found = CAPTURED_LEADS_DATABASE.find(l => l.id === id);
        if (found) {
          inspectCustomLead(found);
        }
      });
    });

    tableBody.querySelectorAll('.btn-inspect-db-lead').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-db-lead-id');
        const found = CAPTURED_LEADS_DATABASE.find(l => l.id === id);
        if (found) {
          inspectCustomLead(found);
        }
      });
    });
  }

  function inspectCustomLead(lead) {
    if (inspectTypeBadge) inspectTypeBadge.textContent = 'Lead Inspection';
    if (inspectMainTitle) inspectMainTitle.textContent = lead.handle;
    if (inspectSubTitle) inspectSubTitle.textContent = `${lead.name} • Captured ${lead.time}`;

    if (inspectContent) {
      inspectContent.innerHTML = `
        <div class="inspect-info-grid">
          <div class="inspect-info-item">
            <div class="inspect-info-lbl">Captured Email</div>
            <div class="inspect-info-val">${lead.email}</div>
          </div>
          <div class="inspect-info-item">
            <div class="inspect-info-lbl">Phone Number</div>
            <div class="inspect-info-val">${lead.phone}</div>
          </div>
          <div class="inspect-info-item">
            <div class="inspect-info-lbl">Trigger Keyword</div>
            <div class="inspect-info-val"><span class="kw-tag">${lead.keyword}</span></div>
          </div>
          <div class="inspect-info-item">
            <div class="inspect-info-lbl">Delivery Status</div>
            <div class="inspect-info-val"><span class="lead-status-pill ${lead.statusClass}">${lead.status}</span></div>
          </div>
        </div>

        <div>
          <div class="inspect-section-title">Trigger Source Content</div>
          <div class="post-content-cell" style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 10px;">
            <img src="${lead.sourceThumb}" class="post-table-thumb" alt="">
            <div class="post-cell-meta">
              <span class="post-table-title">${lead.sourceTitle}</span>
              <span class="post-table-sub">Active Automation: <strong>${lead.ruleName}</strong></span>
            </div>
          </div>
        </div>

        <div>
          <div class="inspect-section-title">Automated DM Log</div>
          <div class="inspect-chat-preview">
            <div class="inspect-bubble-inbound">
              <strong>${lead.handle}</strong>: "${lead.commentText}"
              <span class="inspect-bubble-meta">${lead.timestamp}</span>
            </div>
            <div class="inspect-bubble-outbound">
              <strong>RenderReply Bot</strong>: ${lead.botReplyText}
              <span class="inspect-bubble-meta" style="color: #cbd5e1;">Sent instantly • < 0.8s</span>
            </div>
          </div>
        </div>
      `;
    }

    if (inspectActions) {
      inspectActions.innerHTML = `
        <button type="button" class="btn btn-outline btn-sm" id="btn-copy-custom-lead-email">Copy Email</button>
        <button type="button" class="btn btn-primary btn-sm" id="btn-goto-custom-inbox-lead">Open in Live Inbox →</button>
      `;

      const btnCopy = document.getElementById('btn-copy-custom-lead-email');
      if (btnCopy) {
        btnCopy.addEventListener('click', () => {
          navigator.clipboard.writeText(lead.email).then(() => {
            btnCopy.textContent = 'Copied!';
            showToast(`Copied ${lead.email} to clipboard`);
            setTimeout(() => { btnCopy.textContent = 'Copy Email'; }, 2000);
          });
        });
      }

      const btnGotoInbox = document.getElementById('btn-goto-custom-inbox-lead');
      if (btnGotoInbox) {
        btnGotoInbox.addEventListener('click', () => {
          closeInspectDrawer();
          const inboxNav = document.querySelector('.nav-item[data-tab="inbox"]');
          if (inboxNav) inboxNav.click();
          showToast(`Opened conversation with ${lead.handle}`);
        });
      }
    }

    openInspectDrawer();
  }

  function initCapturedLeadsTabControls() {
    const reelCards = document.querySelectorAll('#leads-reels-cards-grid .leads-reel-card');
    const campaignPills = document.querySelectorAll('#leads-campaign-filters .leads-camp-pill');
    const tableWrapper = document.querySelector('#leads-view .dash-table-card');
    const descPill = document.getElementById('leads-active-filter-desc');
    const currentReelLabel = document.getElementById('leads-current-reel-label');

    const campaignDescriptions = {
      all: 'This is All Reels Leads',
      guide: 'Showing leads for 10x Instagram Automation Strategy (Keyword: #GUIDE)',
      pricing: 'Showing leads for How I Make ₹50K/mo Selling Digital (Keyword: PRICING)',
      roadmap: 'Showing leads for Free Java Roadmap 2026 PDF (Keyword: ROADMAP)',
      story: 'Showing leads for Story Automation Blueprint (Keyword: LINK)',
      free: 'Showing leads for Free Resource Pack Download (Keyword: FREE)'
    };

    const campaignShortLabels = {
      all: 'All Reels Selected',
      guide: 'Reel: #GUIDE',
      pricing: 'Reel: PRICING',
      roadmap: 'Carousel: ROADMAP',
      story: 'Story: LINK',
      free: 'Reel: FREE'
    };

    function selectCampaign(campKey, isTriggeredFromReel = false) {
      currentLeadsCampaign = campKey || 'all';

      // Sync Reel Cards active state
      reelCards.forEach(c => {
        if (c.getAttribute('data-campaign') === currentLeadsCampaign) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });

      // Update Sub-pills and descriptions
      if (descPill) {
        descPill.textContent = campaignDescriptions[currentLeadsCampaign] || 'Filtered Leads';
      }
      if (currentReelLabel) {
        currentReelLabel.textContent = campaignShortLabels[currentLeadsCampaign] || 'Selected Reel';
      }

      skeletonizeCapturedLeads(() => {
        renderCapturedLeadsTable();
      }, 250);

      const label = campaignShortLabels[currentLeadsCampaign] || 'Filtered Leads';
      if (isTriggeredFromReel) {
        showToast(`Reloaded: ${campaignDescriptions[currentLeadsCampaign]}`);
      }
    }

    // Reel Cards Click Listeners
    reelCards.forEach(card => {
      card.addEventListener('click', () => {
        const camp = card.getAttribute('data-campaign') || 'all';
        selectCampaign(camp, true);
      });
    });

    // Status Filter Buttons
    const statusBtns = document.querySelectorAll('#leads-status-filter-buttons button');
    statusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        statusBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLeadsStatus = btn.getAttribute('data-status-filter') || 'all';
        
        skeletonizeCapturedLeads(() => {
          renderCapturedLeadsTable();
        }, 200);
      });
    });

    // Search Input
    const searchInput = document.getElementById('input-search-leads-tab');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentLeadsSearchQuery = e.target.value.trim();
        renderCapturedLeadsTable();
      });
    }

    // Refresh Button (Skeleton Loading Animation for Captured Leads)
    const btnRefreshLeads = document.getElementById('btn-refresh-leads');
    if (btnRefreshLeads) {
      btnRefreshLeads.addEventListener('click', () => {
        const icon = btnRefreshLeads.querySelector('.refresh-icon') || btnRefreshLeads.querySelector('svg');
        if (icon) icon.classList.add('spinning');
        showToast('Refreshing captured leads database...');
        
        skeletonizeCapturedLeads(() => {
          if (icon) icon.classList.remove('spinning');
          renderCapturedLeadsTable();
          showToast('Captured leads database synchronized with Instagram.');
        }, 400);
      });
    }

    // Export CSV Button
    const btnExportLeadsCsv = document.getElementById('btn-export-csv-leads');
    if (btnExportLeadsCsv) {
      btnExportLeadsCsv.addEventListener('click', () => {
        const rows = [
          ['"Instagram Handle"', '"Full Name"', '"Email Address"', '"Phone Number"', '"Trigger Keyword"', '"Status"', '"Source Content"', '"Captured Time"']
        ];

        CAPTURED_LEADS_DATABASE.forEach(l => {
          rows.push([
            `"${l.handle}"`,
            `"${l.name}"`,
            `"${l.email}"`,
            `"${l.phone}"`,
            `"${l.keyword}"`,
            `"${l.status}"`,
            `"${l.sourceTitle}"`,
            `"${l.timestamp}"`
          ]);
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'RenderReply_All_Captured_Leads.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Exported all captured leads to CSV!');
      });
    }

    // Initial render
    selectCampaign('all', false);
  }

  // Initialize Advanced Dashboard Features & Leads View
  attachChartTooltipListeners();
  initDashboardCsvExport();
  initTableClickInspectors();
  initFunnelInteractions();
  initCapturedLeadsTabControls();

  // 1. Dashboard View Refresh Button (Skeleton Shimmer Loading)
  const btnDashboardRefresh = document.getElementById('btn-dashboard-refresh');
  if (btnDashboardRefresh) {
    btnDashboardRefresh.addEventListener('click', () => {
      const refreshIcon = btnDashboardRefresh.querySelector('.refresh-icon') || btnDashboardRefresh.querySelector('svg');
      if (refreshIcon) refreshIcon.classList.add('spinning');
      showToast('Refreshing real-time dashboard analytics...');
      
      skeletonizeDashboard(() => {
        loadDashboardData(currentRange);
        if (refreshIcon) refreshIcon.classList.remove('spinning');
        attachChartTooltipListeners();
        showToast('Dashboard analytics synchronized with Instagram.');
      }, 400);
    });
  }

  // 3. Bio Link / Store Preview Refresh Button (Skeleton Shimmer Loading)
  const btnLppRefresh = document.getElementById('btn-lpp-refresh');
  if (btnLppRefresh) {
    btnLppRefresh.addEventListener('click', () => {
      const icon = btnLppRefresh.querySelector('svg');
      if (icon) icon.classList.add('spinning');
      showToast('Refreshing live mobile store preview...');
      
      skeletonizeStorePreview(() => {
        if (icon) icon.classList.remove('spinning');
        showToast('Live store preview updated.');
      }, 400);
    });
  }

  // 7b. BIO LINK SUB-TAB SWITCHING & INTERACTIVE PILLS
  const biolinkSubNavBtns = document.querySelectorAll('.biolink-subtabs .sub-tab-btn');
  const biolinkTabContents = document.querySelectorAll('.biolink-tab-content');

  biolinkSubNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-biolink-tab');
      if (!targetTab) return;

      biolinkSubNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      biolinkTabContents.forEach(content => {
        if (content.id === `biolink-tab-${targetTab}`) {
          content.classList.add('active');
          content.style.display = 'block';
        } else {
          content.classList.remove('active');
          content.style.display = 'none';
        }
      });
    });
  });

  const biolinkPillBtns = document.querySelectorAll('.biolink-card .pill-btn');
  biolinkPillBtns.forEach(pill => {
    pill.addEventListener('click', () => {
      const parentGroup = pill.closest('.pill-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        pill.classList.add('active');
      }
    });
  });


  // 8. REFRESH BUTTON CLICK HANDLERS
  const refreshBtns = document.querySelectorAll('.btn-refresh:not(#btn-rules-refresh)');
  refreshBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Refreshing page data...');
      loadDashboardData(currentRange);
    });
  });

  // ==========================================================================
  // 8b. RENDERREPLY INSTAGRAM AUTOMATION RULES ENGINE & STUDIO
  // ==========================================================================
  let currentRuleFilter = 'all';
  let currentRuleSearchQuery = '';

  const automationRulesState = [
    {
      id: 'rule-pricing',
      name: 'Pricing Plans Template',
      ruleSub: 'Pricing Plans Template',
      thumbImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      type: 'post',
      typeName: 'Post Comments',
      keywords: ['PRICING'],
      target: 'POST',
      targetType: 'POST',
      active: true,
      sentCount: 2140,
      successRate: '99.2%',
      response: 'Hey {first_name}! Thanks for asking about pricing. Here are our official creator plans and checkout link: {link}',
      attachLink: true,
      linkUrl: 'https://renderreply.com/p/pricing',
      linkTitle: 'Pricing Plans & Checkout',
      commentReply: false,
      commentReplyText: ''
    },
    {
      id: 'rule-story',
      name: 'Story Mention Thank You',
      ruleSub: 'Story Mention Thank You',
      thumbImg: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
      type: 'story',
      typeName: 'Story Mentions',
      keywords: ['STORY_TAG'],
      target: 'STORIES',
      targetType: 'STORIES',
      active: true,
      sentCount: 1820,
      successRate: '98.7%',
      response: 'Thanks for tagging us in your Story, {username}! Here is an exclusive 15% VIP discount code: VIP15. Link: {link}',
      attachLink: true,
      linkUrl: 'https://renderreply.com/p/vip-pass',
      linkTitle: 'VIP Pass & Discount',
      commentReply: false,
      commentReplyText: ''
    },
    {
      id: 'rule-reel',
      name: 'Free Ebook Reel Auto-DM',
      ruleSub: 'Free Ebook Reel Auto-DM',
      thumbImg: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      type: 'reel',
      typeName: 'Reels & Live',
      keywords: ['GUIDE'],
      target: 'REELS',
      targetType: 'REELS',
      active: true,
      sentCount: 932,
      successRate: '97.9%',
      response: 'Hey {first_name}! Here is the free Creator Automation Ebook you requested: {link}',
      attachLink: true,
      linkUrl: 'https://renderreply.com/free-guide.pdf',
      linkTitle: 'Free Creator Ebook PDF',
      commentReply: false,
      commentReplyText: ''
    }
  ];

  const defaultThumbImages = {
    post: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    story: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
    reel: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    dm: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=600&q=80'
  };

  // DOM Elements for Automation Rules
  const rulesGridEl = document.getElementById('automation-rules-grid');
  const btnRulesRefresh = document.getElementById('btn-rules-refresh');
  const btnNewAutomation = document.getElementById('btn-new-automation');
  const rulesSearchInput = document.getElementById('rules-search-input');
  const rulesFilterTabs = document.querySelectorAll('.rule-tab-btn');

  // KPI elements
  const filterCountAll = document.getElementById('filter-count-all');
  const filterCountPost = document.getElementById('filter-count-post');
  const filterCountStory = document.getElementById('filter-count-story');
  const filterCountReel = document.getElementById('filter-count-reel');
  const filterCountDm = document.getElementById('filter-count-dm');

  // Studio Modal Elements
  const modalAutoStudio = document.getElementById('modal-automation-studio');
  const autoModalTitle = document.getElementById('auto-modal-title');
  const autoModalModeBadge = document.getElementById('auto-modal-mode-badge');
  const btnCloseAutoModal = document.getElementById('btn-close-auto-modal');
  const btnCancelAutoModal = document.getElementById('btn-cancel-auto-modal');
  const btnSaveAutoRule = document.getElementById('btn-save-auto-rule');
  const btnSaveAutoText = document.getElementById('btn-save-auto-text');
  const btnAutoTestSim = document.getElementById('btn-auto-test-sim');

  const inputAutoEditId = document.getElementById('auto-edit-rule-id');
  const inputAutoRuleName = document.getElementById('auto-rule-name');
  const inputAutoKeywords = document.getElementById('auto-rule-keywords');
  const inputAutoResponse = document.getElementById('auto-rule-response');
  const chkAutoAttachLink = document.getElementById('auto-attach-link-chk');
  const inputAutoAttachUrl = document.getElementById('auto-attach-url');
  const chkAutoCommentReply = document.getElementById('auto-comment-reply-chk');
  const inputAutoCommentReplyText = document.getElementById('auto-comment-reply-text');
  const chkAutoRuleActive = document.getElementById('auto-rule-active-chk');
  const triggerOptBtns = document.querySelectorAll('.auto-trigger-opt');

  // Simulator Elements
  const simTriggerTypeLabel = document.getElementById('sim-trigger-type-label');
  const simInboundKeyword = document.getElementById('sim-inbound-keyword');
  const simBotMessageBubble = document.getElementById('sim-bot-message-bubble');
  const simLinkCardBox = document.getElementById('sim-link-card-box');
  const simLinkTitlePreview = document.getElementById('sim-link-title-preview');
  const simLinkUrlPreview = document.getElementById('sim-link-url-preview');
  const simPublicReplyPill = document.getElementById('sim-public-reply-pill');

  let activeModalTriggerType = 'post';

  function updateAutomationKPIs() {
    if (filterCountAll) filterCountAll.textContent = automationRulesState.length;
    if (filterCountPost) filterCountPost.textContent = automationRulesState.filter(r => r.type === 'post').length;
    if (filterCountStory) filterCountStory.textContent = automationRulesState.filter(r => r.type === 'story').length;
    if (filterCountReel) filterCountReel.textContent = automationRulesState.filter(r => r.type === 'reel').length;
    if (filterCountDm) filterCountDm.textContent = automationRulesState.filter(r => r.type === 'dm').length;
  }

  function renderAutomationRules(filter = currentRuleFilter, searchQuery = currentRuleSearchQuery) {
    if (!rulesGridEl) return;
    currentRuleFilter = filter;
    currentRuleSearchQuery = searchQuery;

    updateAutomationKPIs();

    let filtered = automationRulesState.filter(rule => {
      const matchesFilter = (filter === 'all' || rule.type === filter);
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesFilter;

      const matchesSearch = rule.name.toLowerCase().includes(query) ||
        (rule.ruleSub && rule.ruleSub.toLowerCase().includes(query)) ||
        rule.keywords.some(k => k.toLowerCase().includes(query)) ||
        rule.target.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      rulesGridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 14px;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.8" style="margin-bottom: 10px;">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3 style="font-size: 16px; font-weight: 800; color: #09090b; margin-bottom: 4px;">No Automation Rules Found</h3>
          <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Try adjusting your search keywords or create a new automation rule.</p>
          <button type="button" class="btn btn-primary btn-sm" id="btn-empty-new-auto" style="border-radius: 8px;">+ Create Automation</button>
        </div>
      `;

      const emptyBtn = document.getElementById('btn-empty-new-auto');
      if (emptyBtn) emptyBtn.addEventListener('click', () => openCreateAutomationModal());
      return;
    }

    rulesGridEl.innerHTML = filtered.map(rule => {
      const primaryKeyword = rule.keywords && rule.keywords.length > 0 ? `"${rule.keywords[0]}"` : '"AUTO"';
      const imgSrc = rule.thumbImg || defaultThumbImages[rule.type] || defaultThumbImages.post;

      return `
        <div class="rule-card ${rule.active ? '' : 'paused'}" data-rule-id="${rule.id}">
          <!-- Top Thumbnail Header -->
          <div class="rule-thumb-header">
            <img src="${imgSrc}" alt="${rule.name}" class="rule-thumb-img" loading="lazy" />
            <div class="rule-thumb-overlay"></div>
            <span class="rule-thumb-badge">${rule.typeName || 'Instagram'}</span>
          </div>

          <!-- Card Body -->
          <div class="rule-card-body">
            <div class="rule-card-title">${rule.name}</div>
            <div class="rule-card-sub">Rule: ${rule.ruleSub || rule.name}</div>

            <!-- Tags Row: TRIGGER & TARGET -->
            <div class="rule-tags">
              <div class="tag-column">
                <span class="tag-label">TRIGGER</span>
                <span class="tag-value">${primaryKeyword}</span>
              </div>
              <div class="tag-column">
                <span class="tag-label">TARGET</span>
                <span class="tag-target-val">${rule.targetType || 'POST'}</span>
              </div>
            </div>

            <!-- Action Badges: DM, Link, Reply -->
            <div class="rule-action-badges">
              <span class="rule-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                DM
              </span>
              ${rule.attachLink ? `
              <span class="rule-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Link
              </span>` : ''}
              ${rule.commentReply ? `
              <span class="rule-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Reply
              </span>` : ''}
            </div>

            <!-- Footer: only 3-dots button -->
            <div class="rule-card-footer">
              <button type="button" class="rule-more-btn" data-action="more" data-rule-id="${rule.id}" title="Rule Options">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="5" r="1.2"/>
                  <circle cx="12" cy="12" r="1.2"/>
                  <circle cx="12" cy="19" r="1.2"/>
                </svg>
              </button>

              <!-- Floating Dropdown Menu -->
              <div class="rule-dropdown-menu" id="dropdown-${rule.id}">
                <div class="rule-menu-toggle-row">
                  <span class="rule-menu-toggle-label" id="toggle-lbl-${rule.id}">${rule.active ? 'Active' : 'Paused'}</span>
                  <label class="rule-switch" title="Toggle Active / Pause">
                    <input type="checkbox" class="rule-toggle-input" data-rule-id="${rule.id}" ${rule.active ? 'checked' : ''}>
                    <span class="rule-slider"></span>
                  </label>
                </div>
                <button type="button" class="rule-menu-item" data-action="edit" data-rule-id="${rule.id}">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit
                </button>
                <button type="button" class="rule-menu-item danger" data-action="delete" data-rule-id="${rule.id}">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    wireRuleCardEvents();
  }

  function wireRuleCardEvents() {
    // 1. Toggle Switch inside 3-dots popup
    const toggleInputs = rulesGridEl.querySelectorAll('.rule-toggle-input');
    toggleInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const ruleId = e.target.getAttribute('data-rule-id');
        const rule = automationRulesState.find(r => r.id === ruleId);
        if (rule) {
          rule.active = e.target.checked;
          const lbl = document.getElementById(`toggle-lbl-${rule.id}`);
          if (lbl) lbl.textContent = rule.active ? 'Active' : 'Paused';

          const card = rulesGridEl.querySelector(`.rule-card[data-rule-id="${rule.id}"]`);
          if (card) card.classList.toggle('paused', !rule.active);

          showToast(`Automation "${rule.name}" is now ${rule.active ? 'Active' : 'Paused'}.`);
        }
      });
    });

    // 2. 3-dots button & dropdown toggle
    const moreBtns = rulesGridEl.querySelectorAll('.rule-more-btn');
    moreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const ruleId = btn.getAttribute('data-rule-id');
        const targetDropdown = document.getElementById(`dropdown-${ruleId}`);

        // Close all other dropdowns
        document.querySelectorAll('.rule-dropdown-menu').forEach(d => {
          if (d !== targetDropdown) d.classList.remove('show');
        });

        if (targetDropdown) {
          targetDropdown.classList.toggle('show');
        }
      });
    });

    // 3. Edit Buttons
    const editBtns = rulesGridEl.querySelectorAll('[data-action="edit"]');
    editBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllRuleDropdowns();
        const ruleId = btn.getAttribute('data-rule-id');
        openEditAutomationModal(ruleId);
      });
    });

    // 4. Delete Rule Buttons
    const delBtns = rulesGridEl.querySelectorAll('[data-action="delete"]');
    delBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllRuleDropdowns();
        const ruleId = btn.getAttribute('data-rule-id');
        const rule = automationRulesState.find(r => r.id === ruleId);
        if (rule) {
          openModal(
            'Delete Automation Rule',
            `Are you sure you want to delete the automation rule "${rule.name}"? This action will permanently remove this trigger.`,
            () => {
              const idx = automationRulesState.findIndex(r => r.id === ruleId);
              if (idx !== -1) {
                automationRulesState.splice(idx, 1);
                showToast(`Deleted rule "${rule.name}".`);
                renderAutomationRules();
              }
            }
          );
        }
      });
    });
  }

  function closeAllRuleDropdowns() {
    document.querySelectorAll('.rule-dropdown-menu').forEach(d => d.classList.remove('show'));
  }

  document.addEventListener('click', closeAllRuleDropdowns);

  // STUDIO MODAL FUNCTIONS & PHONE SIMULATOR
  function updateStudioModalSimulator() {
    const name = inputAutoRuleName ? inputAutoRuleName.value.trim() : 'Automation';
    const keywords = inputAutoKeywords ? inputAutoKeywords.value.trim() : 'KEYWORD';
    const responseText = inputAutoResponse ? inputAutoResponse.value : '';
    const attachLink = chkAutoAttachLink ? chkAutoAttachLink.checked : false;
    const attachUrl = inputAutoAttachUrl ? inputAutoAttachUrl.value.trim() : 'https://renderreply.com';
    const commentReply = chkAutoCommentReply ? chkAutoCommentReply.checked : false;
    const commentReplyText = inputAutoCommentReplyText ? inputAutoCommentReplyText.value.trim() : '';

    const firstKw = keywords.split(',')[0].trim().replace(/^["']|["']$/g, '') || 'PRICING';

    const typeLabels = {
      post: 'Post Comment Trigger',
      story: 'Story Mention Trigger',
      reel: 'Reel Comment Trigger',
      dm: 'Direct Message Trigger'
    };

    if (simTriggerTypeLabel) {
      simTriggerTypeLabel.textContent = typeLabels[activeModalTriggerType] || 'Trigger Event';
    }

    if (simInboundKeyword) {
      if (activeModalTriggerType === 'story') {
        simInboundKeyword.textContent = `User tagged you in Story: "@render6457"`;
      } else if (activeModalTriggerType === 'dm') {
        simInboundKeyword.textContent = `User sent DM: "${firstKw}"`;
      } else {
        simInboundKeyword.textContent = `User commented: "${firstKw}"`;
      }
    }

    if (simBotMessageBubble) {
      let previewText = responseText
        .replace(/{first_name}/g, 'Alex')
        .replace(/{username}/g, '@alex_creator')
        .replace(/{link}/g, attachUrl || 'https://renderreply.com/p/pricing')
        .replace(/{store_url}/g, 'https://renderreply.com/p/render6457');

      simBotMessageBubble.textContent = previewText || 'Automated response text...';
    }

    if (simLinkCardBox) {
      simLinkCardBox.style.display = attachLink ? 'block' : 'none';
      if (simLinkTitlePreview) simLinkTitlePreview.textContent = name || 'Instant Access Link';
      if (simLinkUrlPreview) simLinkUrlPreview.textContent = attachUrl.replace(/^https?:\/\//, '') || 'renderreply.com/link';
    }

    if (simPublicReplyPill) {
      if (commentReply && commentReplyText && (activeModalTriggerType === 'post' || activeModalTriggerType === 'reel')) {
        simPublicReplyPill.style.display = 'block';
        simPublicReplyPill.innerHTML = `<span>Public Reply: "${commentReplyText}"</span>`;
      } else {
        simPublicReplyPill.style.display = 'none';
      }
    }
  }

  function openCreateAutomationModal(templatePreset = null) {
    if (!modalAutoStudio) return;

    if (inputAutoEditId) inputAutoEditId.value = '';
    if (autoModalTitle) autoModalTitle.textContent = 'Create New Instagram Automation';
    if (autoModalModeBadge) {
      autoModalModeBadge.textContent = 'Create Mode';
      autoModalModeBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      autoModalModeBadge.style.color = '#34d399';
    }
    if (btnSaveAutoText) btnSaveAutoText.textContent = 'Save & Activate Rule';

    if (templatePreset) {
      if (inputAutoRuleName) inputAutoRuleName.value = templatePreset.name || 'New Template Automation';
      if (inputAutoKeywords) inputAutoKeywords.value = templatePreset.keywords || 'PRICING';
      if (inputAutoResponse) inputAutoResponse.value = templatePreset.response || 'Hey {first_name}! Here is your link: {link}';
      activeModalTriggerType = templatePreset.type || 'post';
    } else {
      if (inputAutoRuleName) inputAutoRuleName.value = 'Pricing Plans Auto-DM';
      if (inputAutoKeywords) inputAutoKeywords.value = 'PRICING, PRICE, COST';
      if (inputAutoResponse) inputAutoResponse.value = 'Hey {first_name}! Here are our official creator pricing plans and instant checkout link: {link}';
      activeModalTriggerType = 'post';
    }

    triggerOptBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-trigger') === activeModalTriggerType);
    });

    if (chkAutoAttachLink) chkAutoAttachLink.checked = true;
    if (inputAutoAttachUrl) inputAutoAttachUrl.value = 'https://renderreply.com/p/pricing';
    if (chkAutoCommentReply) chkAutoCommentReply.checked = true;
    if (inputAutoCommentReplyText) inputAutoCommentReplyText.value = 'Sent you a DM! Check your requests.';
    if (chkAutoRuleActive) chkAutoRuleActive.checked = true;

    updateStudioModalSimulator();

    modalAutoStudio.classList.add('active');
    modalAutoStudio.style.display = 'flex';
  }

  function openEditAutomationModal(ruleId) {
    if (!modalAutoStudio) return;
    const rule = automationRulesState.find(r => r.id === ruleId);
    if (!rule) return;

    if (inputAutoEditId) inputAutoEditId.value = rule.id;
    if (autoModalTitle) autoModalTitle.textContent = 'Edit Automation Rule';
    if (autoModalModeBadge) {
      autoModalModeBadge.textContent = 'Edit Mode';
      autoModalModeBadge.style.background = 'rgba(99, 102, 241, 0.2)';
      autoModalModeBadge.style.color = '#818cf8';
    }
    if (btnSaveAutoText) btnSaveAutoText.textContent = 'Update Automation Rule';

    if (inputAutoRuleName) inputAutoRuleName.value = rule.name;
    if (inputAutoKeywords) inputAutoKeywords.value = rule.keywords.join(', ');
    if (inputAutoResponse) inputAutoResponse.value = rule.response;

    activeModalTriggerType = rule.type || 'post';
    triggerOptBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-trigger') === activeModalTriggerType);
    });

    if (chkAutoAttachLink) chkAutoAttachLink.checked = !!rule.attachLink;
    if (inputAutoAttachUrl) inputAutoAttachUrl.value = rule.linkUrl || 'https://renderreply.com';
    if (chkAutoCommentReply) chkAutoCommentReply.checked = !!rule.commentReply;
    if (inputAutoCommentReplyText) inputAutoCommentReplyText.value = rule.commentReplyText || '';
    if (chkAutoRuleActive) chkAutoRuleActive.checked = !!rule.active;

    updateStudioModalSimulator();

    modalAutoStudio.classList.add('active');
    modalAutoStudio.style.display = 'flex';
  }

  function closeStudioModal() {
    if (modalAutoStudio) {
      modalAutoStudio.classList.remove('active');
      modalAutoStudio.style.display = 'none';
    }
  }

  // Hook Studio Modal Listeners
  if (btnNewAutomation) {
    btnNewAutomation.addEventListener('click', () => openCreateAutomationModal());
  }

  if (btnCloseAutoModal) btnCloseAutoModal.addEventListener('click', closeStudioModal);
  if (btnCancelAutoModal) btnCancelAutoModal.addEventListener('click', closeStudioModal);
  if (modalAutoStudio) {
    modalAutoStudio.addEventListener('click', (e) => {
      if (e.target === modalAutoStudio) closeStudioModal();
    });
  }

  // Trigger type buttons in modal
  triggerOptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      triggerOptBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeModalTriggerType = btn.getAttribute('data-trigger') || 'post';
      updateStudioModalSimulator();
    });
  });

  // Real-time simulator inputs
  [inputAutoRuleName, inputAutoKeywords, inputAutoResponse, inputAutoAttachUrl, inputAutoCommentReplyText].forEach(el => {
    if (el) {
      el.addEventListener('input', updateStudioModalSimulator);
    }
  });

  [chkAutoAttachLink, chkAutoCommentReply, chkAutoRuleActive].forEach(chk => {
    if (chk) {
      chk.addEventListener('change', updateStudioModalSimulator);
    }
  });

  // Keyword preset chips
  const kwChips = document.querySelectorAll('.auto-keyword-presets .kw-preset-chip');
  kwChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const kw = chip.getAttribute('data-kw');
      if (kw && inputAutoKeywords) {
        let current = inputAutoKeywords.value.trim();
        if (current && !current.includes(kw)) {
          inputAutoKeywords.value = `${current}, ${kw}`;
        } else if (!current) {
          inputAutoKeywords.value = kw;
        }
        updateStudioModalSimulator();
      }
    });
  });

  // Variable insertion chips
  const varChips = document.querySelectorAll('.auto-var-chips .var-chip');
  varChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const v = chip.getAttribute('data-var');
      if (v && inputAutoResponse) {
        const start = inputAutoResponse.selectionStart || inputAutoResponse.value.length;
        const end = inputAutoResponse.selectionEnd || inputAutoResponse.value.length;
        const text = inputAutoResponse.value;
        inputAutoResponse.value = text.substring(0, start) + v + text.substring(end);
        inputAutoResponse.focus();
        inputAutoResponse.selectionStart = inputAutoResponse.selectionEnd = start + v.length;
        updateStudioModalSimulator();
      }
    });
  });



  // Save Automation Rule Button
  if (btnSaveAutoRule) {
    btnSaveAutoRule.addEventListener('click', () => {
      const ruleName = inputAutoRuleName ? inputAutoRuleName.value.trim() : '';
      const kwRaw = inputAutoKeywords ? inputAutoKeywords.value.trim() : '';
      const response = inputAutoResponse ? inputAutoResponse.value.trim() : '';

      if (!ruleName) {
        showToast('Please enter an automation rule name.');
        if (inputAutoRuleName) inputAutoRuleName.focus();
        return;
      }

      if (!kwRaw) {
        showToast('Please provide at least one trigger keyword.');
        if (inputAutoKeywords) inputAutoKeywords.focus();
        return;
      }

      if (!response) {
        showToast('Please enter automated DM message content.');
        if (inputAutoResponse) inputAutoResponse.focus();
        return;
      }

      const keywords = kwRaw.split(',').map(k => k.trim().toUpperCase().replace(/^["']|["']$/g, '')).filter(k => k);
      const isEditing = !!(inputAutoEditId && inputAutoEditId.value);
      const attachLink = chkAutoAttachLink ? chkAutoAttachLink.checked : false;
      const attachUrl = inputAutoAttachUrl ? inputAutoAttachUrl.value.trim() : '';
      const commentReply = chkAutoCommentReply ? chkAutoCommentReply.checked : false;
      const commentReplyText = inputAutoCommentReplyText ? inputAutoCommentReplyText.value.trim() : '';
      const active = chkAutoRuleActive ? chkAutoRuleActive.checked : true;

      const typeNames = {
        post: 'Post Comments',
        story: 'Story Mentions',
        reel: 'Reels & Live',
        dm: 'Direct Keywords'
      };

      const gradients = {
        post: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        story: 'linear-gradient(135deg, #831843 0%, #be185d 50%, #ec4899 100%)',
        reel: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)',
        dm: 'linear-gradient(135deg, #7c2d12 0%, #b45309 50%, #d97706 100%)'
      };

      const badges = [
        { label: 'Instant DM', type: 'primary' }
      ];
      if (attachLink) badges.push({ label: 'Attached Link', type: 'accent' });
      if (commentReply) badges.push({ label: 'Auto-Reply', type: 'default' });

      if (isEditing) {
        const rule = automationRulesState.find(r => r.id === inputAutoEditId.value);
        if (rule) {
          rule.name = ruleName;
          rule.ruleSub = ruleName;
          rule.type = activeModalTriggerType;
          rule.typeName = typeNames[activeModalTriggerType] || 'Trigger';
          rule.keywords = keywords;
          rule.target = activeModalTriggerType === 'story' ? 'STORIES' : activeModalTriggerType === 'reel' ? 'REELS' : 'POST';
          rule.targetType = activeModalTriggerType.toUpperCase();
          rule.thumbIcon = '';
          rule.response = response;
          rule.attachLink = attachLink;
          rule.linkUrl = attachUrl;
          rule.commentReply = commentReply;
          rule.commentReplyText = commentReplyText;
          rule.active = active;

          showToast(`Automation rule "${ruleName}" updated successfully!`);
        }
      } else {
        const newRule = {
          id: `rule-${Date.now()}`,
          name: ruleName,
          ruleSub: ruleName,
          thumbIcon: '',
          type: activeModalTriggerType,
          typeName: typeNames[activeModalTriggerType] || 'Trigger',
          keywords: keywords,
          target: activeModalTriggerType === 'story' ? 'STORIES' : activeModalTriggerType === 'reel' ? 'REELS' : 'POST',
          targetType: activeModalTriggerType.toUpperCase(),
          active: active,
          sentCount: 0,
          successRate: '100%',
          response: response,
          attachLink: attachLink,
          linkUrl: attachUrl,
          linkTitle: ruleName,
          commentReply: commentReply,
          commentReplyText: commentReplyText
        };

        automationRulesState.unshift(newRule);
        showToast(`New automation rule "${ruleName}" created and active!`);
      }

      closeStudioModal();
      renderAutomationRules();
    });
  }

  // Refresh Automation Rules Button (Skeleton Shimmer Loading)
  if (btnRulesRefresh) {
    btnRulesRefresh.addEventListener('click', () => {
      const icon = btnRulesRefresh.querySelector('.refresh-icon') || btnRulesRefresh.querySelector('svg');
      if (icon) icon.classList.add('spinning');
      showToast('Refreshing automation rules engine...');

      skeletonizeRules(() => {
        if (icon) icon.classList.remove('spinning');
        renderAutomationRules();
        showToast('Automation rules synchronized with Instagram Graph API.');
      }, 400);
    });
  }

  // Sub-Tab Filter Listeners
  rulesFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      rulesFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-rule-filter') || 'all';
      renderAutomationRules(filter, rulesSearchInput ? rulesSearchInput.value : '');
    });
  });

  // Search Input Listener
  if (rulesSearchInput) {
    rulesSearchInput.addEventListener('input', (e) => {
      renderAutomationRules(currentRuleFilter, e.target.value);
    });
  }

  // Templates Tab Integration: Clicking any template opens New Automation preloaded!
  const templateCards = document.querySelectorAll('.template-card');
  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.template-card-title')?.textContent || 'Pricing Template';
      const desc = card.querySelector('.template-card-text')?.textContent || '';
      const tag = card.querySelector('.template-header-title')?.textContent.replace(/["']/g, '') || 'PRICING';

      // Switch to Automation Rules Tab
      const autoTab = document.querySelector('.nav-item[data-tab="automation-rules"]');
      if (autoTab) autoTab.click();

      openCreateAutomationModal({
        name: title,
        keywords: tag,
        response: `Hey {first_name}! Thanks for asking about ${title}. Here is the direct link: {link}`,
        type: 'post'
      });

      showToast(`Loaded "${title}" template into Automation Studio!`);
    });
  });

  // Initial render of automation rules
  renderAutomationRules();

  // 9. RENDERREPLY CLEAN LIVE DM INBOX ENGINE
  const inboxThreadsData = {
    alex: {
      name: 'Alex Mercer',
      handle: '@alex_creator',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      followers: '48.2K Followers',
      source: 'Reel Comment: "PRICING"',
      status: 'attention',
      botActive: true,
      triggerTitle: 'Triggered by Reel: "Build a 7-Figure IG Automation Engine" (Keyword: "PRICING")',
      messages: [
        { type: 'divider', text: 'TODAY, OCT 24' },
        { type: 'user', text: 'Hey! Can I get the pricing plans for your creator roadmap and preset packs?', time: '02:14 PM', context: 'Commented "PRICING" on Reel #894' },
        { type: 'bot', text: 'Hey Alex! Here are our membership options, instant downloads, and 1-on-1 strategy sessions:', time: '02:14 PM', flow: 'Reel Viral Funnel v2.4', hasCard: true }
      ]
    },
    sarah: {
      name: 'Sarah Miller',
      handle: '@sarah_m',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      followers: '120K Followers',
      source: 'Story Mention: "FREE_CHECKLIST"',
      status: 'bot',
      botActive: true,
      triggerTitle: 'Triggered by Story Mention: "@rudrateja tag on story"',
      messages: [
        { type: 'divider', text: 'TODAY, OCT 24' },
        { type: 'user', text: 'Loved your latest story breakdown! Can you send me the free creator checklist you mentioned?', time: '01:10 PM', context: 'Mentioned you in Story' },
        { type: 'bot', text: 'Hey Sarah! Thank you so much for the story tag! Here is your exclusive 2026 Instagram Growth Checklist PDF: https://renderreply.com/store/rudrateja/downloads/checklist.pdf', time: '01:10 PM', flow: 'Story Mention Auto-Thank You v1.8', hasCard: false }
      ]
    },
    dev: {
      name: 'John Doe',
      handle: '@dev_johndoe',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      followers: '15.4K Followers',
      source: 'DM Keyword: "JAVA"',
      status: 'bot',
      botActive: true,
      triggerTitle: 'Triggered by DM Keyword: "JAVA"',
      messages: [
        { type: 'divider', text: 'TODAY, OCT 24' },
        { type: 'user', text: 'JAVA', time: '11:20 AM', context: 'Sent DM keyword "JAVA"' },
        { type: 'bot', text: 'Hey John! Here is the instant access link to the Java Full Stack Roadmap 2026 PDF: https://renderreply.com/store/rudrateja/downloads/java-roadmap.pdf Happy coding!', time: '11:20 AM', flow: 'Full Stack Roadmap Auto-DM', hasCard: false }
      ]
    },
    priya: {
      name: 'Priya S.',
      handle: '@priya_designs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      followers: '89K Followers',
      source: 'Custom Inquiry: Agency License',
      status: 'attention',
      botActive: false,
      triggerTitle: 'Custom Inquiry: Agency Multi-Account License (Bot Paused)',
      messages: [
        { type: 'divider', text: 'TODAY, OCT 24' },
        { type: 'user', text: 'Hi Rudra! Can we customize the RenderReply templates for multiple client agencies? Do you have an agency tier?', time: '09:45 AM', context: 'Custom DM Inquiry' }
      ]
    },
    vikram: {
      name: 'Vikram P.',
      handle: '@vikram_tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      followers: '210K Followers',
      source: 'Preset Bundle: Downloaded',
      status: 'resolved',
      botActive: true,
      triggerTitle: 'Triggered by Reel: "Instagram Automation Presets 2026" (Keyword: "PRESET")',
      messages: [
        { type: 'divider', text: 'YESTERDAY, OCT 23' },
        { type: 'user', text: 'PRESET', time: '04:15 PM', context: 'Commented "PRESET" on Reel #890' },
        { type: 'bot', text: 'Hey Vikram! Here is your free Instagram Automation Preset Bundle: https://renderreply.com/store/rudrateja/downloads/presets.zip', time: '04:15 PM', flow: 'Preset Distribution Flow', hasCard: false },
        { type: 'user', text: 'Thank you so much Rudra! Downloaded presets successfully. They work amazingly well!', time: '04:30 PM', context: 'Direct DM' },
        { type: 'human', text: 'Awesome Vikram! Let me know if you need any tweaks for your specific reels setup. Cheers! ', time: '04:35 PM' }
      ]
    }
  };

  let activeThreadId = 'alex';

  function renderThreadChatFeed(threadId) {
    const thread = inboxThreadsData[threadId];
    if (!thread) return;

    const chatFeed = document.getElementById('chat-feed-box');
    if (!chatFeed) return;

    let html = '';
    thread.messages.forEach(msg => {
      if (msg.type === 'divider') {
        html += `<div class="rr-clean-divider"><span>${msg.text}</span></div>`;
      } else if (msg.type === 'user') {
        html += `
          <div class="rr-clean-msg user">
            <img src="${thread.avatar}" alt="${thread.name}" class="rr-clean-msg-avatar">
            <div class="rr-clean-bubble user">
              ${msg.context ? `<div class="msg-origin-tag">${msg.context}</div>` : ''}
              <div class="msg-text">${msg.text}</div>
              <div class="msg-time">${msg.time}</div>
            </div>
          </div>
        `;
      } else if (msg.type === 'bot') {
        html += `
          <div class="rr-clean-msg bot">
            <div class="rr-clean-bubble bot">
              <div class="msg-sender-line">
                <span class="bot-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: -2px;"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="12" y1="2" x2="12" y2="4"/></svg>RenderReply Bot</span>
                <span class="flow-label">${msg.flow || 'Automation Flow'}</span>
              </div>
              <div class="msg-text">${msg.text}</div>
              ${msg.hasCard ? `
                <div class="rr-clean-product-card">
                  <div class="dm-card-tag">OFFICIAL STORE</div>
                  <div class="dm-card-title">Rudra Teja Creator Storefront</div>
                  <div class="dm-card-sub">Instant PDF downloads, Instagram automation presets & private audit calls.</div>
                  <a href="https://renderreply.com/store/rudrateja" target="_blank" rel="noopener" class="btn btn-sm btn-primary" style="margin-top: 8px; width: 100%;">
                    View Pricing & Products ↗
                  </a>
                </div>
              ` : ''}
              <div class="msg-time bot-time">${msg.time} • <span style="color: #38bdf8;">Delivered <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" style="vertical-align: -2px;"><polyline points="18 6 9 17 4 12"/><polyline points="22 10 15 17 13 15"/></svg></span></div>
            </div>
          </div>
        `;
      } else if (msg.type === 'human') {
        html += `
          <div class="rr-clean-msg human">
            <div class="rr-clean-bubble human">
              <div class="msg-sender-line">
                <span class="human-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: -2px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Rudra Teja (Human Agent)</span>
                <span class="flow-label" style="background: rgba(255,255,255,0.15); color: #ffffff;">Direct Reply</span>
              </div>
              <div class="msg-text">${msg.text}</div>
              <div class="msg-time" style="color: rgba(255,255,255,0.7);">${msg.time} • Delivered <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" style="vertical-align: -2px;"><polyline points="18 6 9 17 4 12"/><polyline points="22 10 15 17 13 15"/></svg></div>
            </div>
          </div>
        `;
      }
    });

    if (!thread.botActive) {
      html += `
        <div class="rr-clean-system-notice">
          <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px; vertical-align: -2px;"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Bot paused for this conversation to allow direct human agent reply</span>
        </div>
      `;
    }

    chatFeed.innerHTML = html;
    chatFeed.scrollTop = chatFeed.scrollHeight;
  }

  function updateInboxFolderCounts() {
    let allCount = 0;
    let attentionCount = 0;
    let botCount = 0;
    let resolvedCount = 0;

    Object.values(inboxThreadsData).forEach(t => {
      allCount++;
      if (t.status === 'attention') attentionCount++;
      else if (t.status === 'bot') botCount++;
      else if (t.status === 'resolved') resolvedCount++;
    });

    const countAllEl = document.getElementById('count-all');
    const countAttEl = document.getElementById('count-attention');
    const countBotEl = document.getElementById('count-bot');
    const countResEl = document.getElementById('count-resolved');
    const iqOpenLeads = document.getElementById('iq-open-leads');
    const iqActiveBots = document.getElementById('iq-active-bots');

    if (countAllEl) countAllEl.textContent = allCount;
    if (countAttEl) countAttEl.textContent = attentionCount;
    if (countBotEl) countBotEl.textContent = botCount;
    if (countResEl) countResEl.textContent = resolvedCount;
    if (iqOpenLeads) iqOpenLeads.textContent = attentionCount;
    if (iqActiveBots) iqActiveBots.textContent = botCount;
  }

  function applyActiveFolderFilter() {
    const activeTab = document.querySelector('.rr-folder-tab.active');
    const filter = activeTab ? activeTab.getAttribute('data-filter') : 'all';

    document.querySelectorAll('.rr-clean-thread-item').forEach(item => {
      const itemStatus = item.getAttribute('data-status');
      if (filter === 'all') {
        item.style.display = 'flex';
      } else if (filter === 'attention' && itemStatus === 'attention') {
        item.style.display = 'flex';
      } else if (filter === 'bot' && itemStatus === 'bot') {
        item.style.display = 'flex';
      } else if (filter === 'resolved' && itemStatus === 'resolved') {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function selectInboxThread(threadId) {
    const thread = inboxThreadsData[threadId];
    if (!thread) return;

    activeThreadId = threadId;

    // Update active class in thread list
    document.querySelectorAll('.rr-clean-thread-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-thread-id') === threadId);
    });

    // Update Chat Header
    const currentAvatar = document.getElementById('rr-current-avatar');
    const currentName = document.getElementById('rr-current-name');
    const currentHandle = document.getElementById('rr-current-handle');
    const currentFollowers = document.getElementById('rr-current-followers');
    const currentSource = document.getElementById('rr-current-source');
    const btnToggleBot = document.getElementById('btn-toggle-bot');
    const botToggleDot = document.getElementById('bot-toggle-dot');
    const botToggleText = document.getElementById('bot-toggle-text');
    const btnResolveChat = document.getElementById('btn-resolve-chat');

    if (currentAvatar) currentAvatar.src = thread.avatar;
    if (currentName) currentName.textContent = thread.name;
    if (currentHandle) currentHandle.textContent = thread.handle;
    if (currentFollowers) currentFollowers.textContent = thread.followers;
    if (currentSource) currentSource.textContent = thread.source;

    if (btnToggleBot && botToggleDot && botToggleText) {
      if (thread.botActive) {
        btnToggleBot.className = 'btn-clean-bot-toggle';
        botToggleDot.className = 'dot-status green';
        botToggleText.textContent = 'Bot Engaged';
      } else {
        btnToggleBot.className = 'btn-clean-bot-toggle paused';
        botToggleDot.className = 'dot-status amber';
        botToggleText.textContent = 'Bot Paused';
      }
    }

    if (btnResolveChat) {
      if (thread.status === 'resolved') {
        btnResolveChat.className = 'btn-clean-resolve resolved';
        btnResolveChat.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Resolved (Reopen)</span>
        `;
      } else {
        btnResolveChat.className = 'btn-clean-resolve';
        btnResolveChat.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Resolve</span>
        `;
      }
    }

    // Update Trigger Context Banner
    const tcbTitle = document.getElementById('rr-tcb-title');
    if (tcbTitle) tcbTitle.textContent = thread.triggerTitle;

    // Update Composer Placeholder
    const composerInput = document.getElementById('chat-input-msg');
    if (composerInput) {
      composerInput.placeholder = `Reply to ${thread.handle} as Rudra Teja (pauses bot for 30m)...`;
    }

    // Render Feed
    renderThreadChatFeed(threadId);
    updateInboxFolderCounts();
  }

  // Setup Thread Click Handlers
  document.querySelectorAll('.rr-clean-thread-item').forEach(item => {
    item.addEventListener('click', () => {
      const threadId = item.getAttribute('data-thread-id');
      if (threadId) selectInboxThread(threadId);
    });
  });

  // Folder Tabs Filtering (All, Needs Action, Bot Active, Resolved)
  document.querySelectorAll('.rr-folder-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.rr-folder-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyActiveFolderFilter();
    });
  });

  // Thread Search Filter
  const threadSearchInput = document.getElementById('rr-inbox-search');
  if (threadSearchInput) {
    threadSearchInput.addEventListener('input', () => {
      const query = threadSearchInput.value.toLowerCase().trim();
      document.querySelectorAll('.rr-clean-thread-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }

  // Bot Pause / Resume Toggle Button
  const btnToggleBot = document.getElementById('btn-toggle-bot');
  if (btnToggleBot) {
    btnToggleBot.addEventListener('click', () => {
      const thread = inboxThreadsData[activeThreadId];
      if (!thread) return;

      thread.botActive = !thread.botActive;
      selectInboxThread(activeThreadId);

      if (thread.botActive) {
        showToast(`Bot automation resumed for ${thread.handle}.`);
      } else {
        showToast(`Bot paused for 30m. You are now chatting directly with ${thread.handle}.`);
      }
    });
  }

  // Resolve / Reopen Chat Button
  const btnResolveChat = document.getElementById('btn-resolve-chat');
  if (btnResolveChat) {
    btnResolveChat.addEventListener('click', () => {
      const thread = inboxThreadsData[activeThreadId];
      if (!thread) return;

      const activeThreadEl = document.querySelector(`.rr-clean-thread-item[data-thread-id="${activeThreadId}"]`);

      if (thread.status !== 'resolved') {
        // Mark as resolved
        thread.status = 'resolved';
        if (activeThreadEl) {
          activeThreadEl.setAttribute('data-status', 'resolved');
          const statusPill = activeThreadEl.querySelector('.rr-pill-badge');
          if (statusPill) {
            statusPill.className = 'rr-pill-badge resolved';
            statusPill.textContent = 'Resolved';
          }
        }
        thread.messages.push({
          type: 'divider',
          text: 'Conversation marked as resolved'
        });
        showToast(`Conversation with ${thread.handle} moved to Resolved!`);
      } else {
        // Reopen conversation
        thread.status = 'attention';
        if (activeThreadEl) {
          activeThreadEl.setAttribute('data-status', 'attention');
          const statusPill = activeThreadEl.querySelector('.rr-pill-badge');
          if (statusPill) {
            statusPill.className = 'rr-pill-badge action';
            statusPill.textContent = 'Needs Action';
          }
        }
        thread.messages.push({
          type: 'divider',
          text: 'Conversation reopened'
        });
        showToast(`Conversation with ${thread.handle} reopened!`);
      }

      selectInboxThread(activeThreadId);
      applyActiveFolderFilter();
    });
  }

  // Quick Preset Chips Click
  document.querySelectorAll('.clean-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text');
      const composer = document.getElementById('chat-input-msg');
      if (composer && text) {
        composer.value = text;
        composer.focus();
      }
    });
  });

  // Send Message Action Handler
  const chatInputMsg = document.getElementById('chat-input-msg');
  const btnSendChat = document.getElementById('btn-send-chat');

  function handleSendInboxMessage() {
    if (!chatInputMsg) return;
    const text = chatInputMsg.value.trim();
    if (!text) return;

    const thread = inboxThreadsData[activeThreadId];
    if (!thread) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Direct DM send
    thread.messages.push({
      type: 'human',
      text: text,
      time: timeStr
    });

    // Auto-pause bot if active
    if (thread.botActive) {
      thread.botActive = false;
      const btnToggle = document.getElementById('btn-toggle-bot');
      const botDot = document.getElementById('bot-toggle-dot');
      const botTxt = document.getElementById('bot-toggle-text');
      if (btnToggle && botDot && botTxt) {
        btnToggle.className = 'btn-clean-bot-toggle paused';
        botDot.className = 'dot-status amber';
        botTxt.textContent = 'Bot Paused';
      }
    }

    // Re-render feed
    renderThreadChatFeed(activeThreadId);
    chatInputMsg.value = '';

    // Update thread preview
    const activeThreadEl = document.querySelector(`.rr-clean-thread-item[data-thread-id="${activeThreadId}"]`);
    if (activeThreadEl) {
      const prev = activeThreadEl.querySelector('.rr-t-snippet');
      if (prev) prev.textContent = `You: ${text}`;
    }

    showToast(`DM message sent to ${thread.handle}`);
  }

  if (btnSendChat) {
    btnSendChat.addEventListener('click', handleSendInboxMessage);
  }

  if (chatInputMsg) {
    chatInputMsg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendInboxMessage();
      }
    });
  }

  // View Rule Button Handler
  const btnViewRule = document.getElementById('rr-tcb-view-rule');
  if (btnViewRule) {
    btnViewRule.addEventListener('click', () => {
      const autoTab = document.querySelector('.nav-item[data-tab="automation-rules"]');
      if (autoTab) autoTab.click();
      showToast('Viewing active Instagram automation rule in studio.');
    });
  }

  // Refresh Inbox Button (Skeleton Shimmer Loading)
  const btnInboxRefresh = document.getElementById('btn-inbox-refresh');
  if (btnInboxRefresh) {
    btnInboxRefresh.addEventListener('click', () => {
      const icon = btnInboxRefresh.querySelector('svg');
      if (icon) icon.classList.add('spinning');
      showToast('Syncing real-time Instagram DMs & comments...');
      
      skeletonizeInbox(() => {
        if (icon) icon.classList.remove('spinning');
        selectInboxThread(activeThreadId);
        showToast('Live DM Inbox synchronized with Instagram.');
      }, 400);
    });
  }

  // Initialize initial thread view on startup
  selectInboxThread('alex');

  // BROWSER TAB STOREFRONT OVERLAY HANDLERS
  if (btnOpenBrowserOverlay && browserOverlay) {
    btnOpenBrowserOverlay.addEventListener('click', () => {
      browserOverlay.classList.add('active');
      showToast('Opening Creator Digital Storefront...');
    });
  }

  if (btnCloseBrowserTab && browserOverlay) {
    btnCloseBrowserTab.addEventListener('click', () => {
      browserOverlay.classList.remove('active');
    });
  }

  if (btnExitBrowserTab && browserOverlay) {
    btnExitBrowserTab.addEventListener('click', () => {
      browserOverlay.classList.remove('active');
    });
  }

  // SAVE & PREVIEW HANDLERS FOR BIO LINK & STOREFRONT
  const btnSaveBiolink = document.getElementById('btn-save-biolink');
  if (btnSaveBiolink) {
    btnSaveBiolink.addEventListener('click', () => {
      showToast('Bio Link page changes saved successfully!');
    });
  }

  const btnSaveCreatorstore = document.getElementById('btn-save-creatorstore');
  if (btnSaveCreatorstore) {
    btnSaveCreatorstore.addEventListener('click', () => {
      showToast('Creator Storefront changes saved successfully!');
    });
  }

  const btnCopyLink = document.getElementById('btn-copy-link');
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('https://renderreply.com/p/render6457');
      }
      showToast('Bio Link URL copied to clipboard!');
    });
  }

  const btnPreviewBiolink = document.getElementById('btn-preview-biolink');
  if (btnPreviewBiolink && browserOverlay) {
    btnPreviewBiolink.addEventListener('click', () => {
      browserOverlay.classList.add('active');
      showToast('Opening Bio Link live preview...');
    });
  }

  // PRODUCT STUDIO FULL PAGE EDITOR LOGIC
  const modalProductBackdrop = document.getElementById('modal-product-backdrop');
  const btnAddAmazonProd = document.getElementById('btn-add-amazon-prod');
  const btnCloseProductModal = document.getElementById('btn-close-product-modal');
  const btnCancelProductModal = document.getElementById('btn-cancel-product-modal');
  const formProductModal = document.getElementById('form-product-modal');

  const inputProdFiles = document.getElementById('modal-prod-files');
  const inputProdPhoto = document.getElementById('modal-prod-photo');
  const modalProdGallery = document.getElementById('modal-prod-gallery');
  const livePreviewImg = document.getElementById('live-preview-img');
  const livePreviewTitle = document.getElementById('live-preview-title');
  const livePreviewDesc = document.getElementById('live-preview-desc');
  const livePreviewPrice = document.getElementById('live-preview-price');
  const livePreviewOldPrice = document.getElementById('live-preview-oldprice');
  const livePreviewCta = document.getElementById('live-preview-cta');

  let uploadedPhotos = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
  ];
  let currentPhotoUrl = uploadedPhotos[0];
  let activeEditingProdId = null;

  function renderGallery() {
    if (!modalProdGallery) return;
    modalProdGallery.innerHTML = '';

    uploadedPhotos.forEach((url, idx) => {
      const item = document.createElement('div');
      item.className = `gallery-thumb-item ${url === currentPhotoUrl ? 'active' : ''}`;
      item.innerHTML = `
        <img src="${url}" alt="Photo ${idx + 1}">
        ${uploadedPhotos.length > 1 ? `<button type="button" class="gallery-thumb-remove" title="Remove photo">Remove</button>` : ''}
      `;

      const removeBtn = item.querySelector('.gallery-thumb-remove');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.removeGalleryPhoto(idx);
        });
      }

      item.addEventListener('click', () => {
        currentPhotoUrl = url;
        if (inputProdPhoto) inputProdPhoto.value = url;
        if (livePreviewImg) livePreviewImg.src = url;
        renderGallery();
      });
      modalProdGallery.appendChild(item);
    });
  }

  window.removeGalleryPhoto = (idx) => {
    if (uploadedPhotos.length > 1) {
      uploadedPhotos.splice(idx, 1);
      if (!uploadedPhotos.includes(currentPhotoUrl)) {
        currentPhotoUrl = uploadedPhotos[0];
      }
      if (inputProdPhoto) inputProdPhoto.value = currentPhotoUrl;
      if (livePreviewImg) livePreviewImg.src = currentPhotoUrl;
      renderGallery();
      showToast('Photo removed from product gallery');
    }
  };

  function calculateAndUpdateDiscount() {
    const inputPrice = document.getElementById('modal-prod-price');
    const inputOldPrice = document.getElementById('modal-prod-oldprice');
    const inputDiscount = document.getElementById('modal-prod-discount');
    const livePrice = document.getElementById('live-preview-price');
    const liveOldPrice = document.getElementById('live-preview-oldprice');

    if (!inputPrice || !inputOldPrice || !inputDiscount) return;

    const valPrice = inputPrice.value.trim();
    const valOldPrice = inputOldPrice.value.trim();

    const cleanPriceStr = valPrice.replace(/[^0-9.]/g, '');
    const cleanOldPriceStr = valOldPrice.replace(/[^0-9.]/g, '');

    const priceNum = parseFloat(cleanPriceStr);
    const oldPriceNum = parseFloat(cleanOldPriceStr);

    const isFree = valPrice.toLowerCase() === 'free' || (valPrice !== '' && priceNum === 0);

    let discountText = '0% OFF';

    if (isFree && !isNaN(oldPriceNum) && oldPriceNum > 0) {
      discountText = '100% FREE';
    } else if (!isNaN(oldPriceNum) && !isNaN(priceNum) && oldPriceNum > priceNum && oldPriceNum > 0) {
      const pct = Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100);
      discountText = `${pct}% OFF`;
    } else if (isFree) {
      discountText = '100% FREE';
    } else {
      discountText = '0% OFF';
    }

    inputDiscount.value = discountText;

    if (livePrice) {
      if (isFree) {
        livePrice.textContent = 'FREE';
        livePrice.style.color = '#10b981';
      } else if (!isNaN(priceNum) && priceNum > 0) {
        livePrice.textContent = `₹${priceNum.toLocaleString('en-IN')}`;
        livePrice.style.color = '';
      } else if (valPrice) {
        livePrice.textContent = valPrice.startsWith('₹') ? valPrice : (valPrice.startsWith('$') ? valPrice.replace('$', '₹') : `₹${valPrice}`);
        livePrice.style.color = '';
      } else {
        livePrice.textContent = '₹0';
      }
    }

    if (liveOldPrice) {
      if (!isNaN(oldPriceNum) && oldPriceNum > 0) {
        liveOldPrice.textContent = `₹${oldPriceNum.toLocaleString('en-IN')}`;
        liveOldPrice.style.display = 'inline';
      } else if (valOldPrice) {
        liveOldPrice.textContent = valOldPrice.startsWith('₹') ? valOldPrice : (valOldPrice.startsWith('$') ? valOldPrice.replace('$', '₹') : `₹${valOldPrice}`);
        liveOldPrice.style.display = 'inline';
      } else {
        liveOldPrice.textContent = '';
        liveOldPrice.style.display = 'none';
      }
    }
  }

  function openProductModal() {
    const titleEl = document.getElementById('modal-prod-header-title');
    const subEl = document.getElementById('modal-prod-header-sub');
    const pubBtn = document.getElementById('btn-publish-product');

    if (!activeEditingProdId) {
      if (titleEl) titleEl.textContent = 'Add New Product';
      if (subEl) subEl.textContent = 'Add a new product to your store catalog';
      if (pubBtn) pubBtn.textContent = '+ Add Product';
    } else {
      if (titleEl) titleEl.textContent = 'Edit Product Details';
      if (subEl) subEl.textContent = 'Manage and update your store item details';
      if (pubBtn) pubBtn.textContent = 'Update Product';
    }

    window.openProductStudio();
    renderGallery();
    calculateAndUpdateDiscount();
  }

  function resetProductForm() {
    activeEditingProdId = null;
    if (document.getElementById('modal-prod-title')) document.getElementById('modal-prod-title').value = '';
    if (document.getElementById('modal-prod-price')) document.getElementById('modal-prod-price').value = '';
    if (document.getElementById('modal-prod-oldprice')) document.getElementById('modal-prod-oldprice').value = '';
    if (document.getElementById('modal-prod-cta')) document.getElementById('modal-prod-cta').value = 'Instant Access';
    if (document.getElementById('modal-prod-desc')) document.getElementById('modal-prod-desc').value = '';
    uploadedPhotos = ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'];
    currentPhotoUrl = uploadedPhotos[0];
    if (inputProdPhoto) inputProdPhoto.value = currentPhotoUrl;
    if (livePreviewImg) livePreviewImg.src = currentPhotoUrl;
    calculateAndUpdateDiscount();
  }

  function closeProductModal() {
    window.closeProductStudio();
    resetProductForm();
  }

  if (btnAddAmazonProd) {
    btnAddAmazonProd.addEventListener('click', () => {
      resetProductForm();
      openProductModal();
    });
  }

  const inputPrice = document.getElementById('modal-prod-price');
  const inputOldPrice = document.getElementById('modal-prod-oldprice');
  const inputTitle = document.getElementById('modal-prod-title');
  const inputDesc = document.getElementById('modal-prod-desc');
  const inputCta = document.getElementById('modal-prod-cta');

  if (inputPrice) {
    inputPrice.addEventListener('input', calculateAndUpdateDiscount);
    inputPrice.addEventListener('change', calculateAndUpdateDiscount);
  }
  if (inputOldPrice) {
    inputOldPrice.addEventListener('input', calculateAndUpdateDiscount);
    inputOldPrice.addEventListener('change', calculateAndUpdateDiscount);
  }
  if (inputTitle) {
    inputTitle.addEventListener('input', (e) => {
      if (livePreviewTitle) livePreviewTitle.textContent = e.target.value.trim() || 'Product Name';
    });
  }
  if (inputDesc) {
    inputDesc.addEventListener('input', (e) => {
      if (livePreviewDesc) livePreviewDesc.textContent = e.target.value.trim() || 'Product Description';
    });
  }
  if (inputCta) {
    inputCta.addEventListener('input', (e) => {
      if (livePreviewCta) livePreviewCta.textContent = e.target.value.trim() || 'Instant Access';
    });
  }

  if (btnCloseProductModal) {
    btnCloseProductModal.addEventListener('click', closeProductModal);
  }

  if (btnCancelProductModal) {
    btnCancelProductModal.addEventListener('click', closeProductModal);
  }

  if (inputProdFiles) {
    inputProdFiles.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataUrl = event.target.result;
            uploadedPhotos.push(dataUrl);
            currentPhotoUrl = dataUrl;
            if (inputProdPhoto) inputProdPhoto.value = dataUrl;
            if (livePreviewImg) livePreviewImg.src = dataUrl;
            renderGallery();
          };
          reader.readAsDataURL(file);
        });
        showToast(`Uploaded ${files.length} product photo(s)!`);
      }
    });
  }

  if (inputProdPhoto) {
    inputProdPhoto.addEventListener('change', () => {
      const val = inputProdPhoto.value.trim();
      if (val) {
        if (!uploadedPhotos.includes(val)) {
          uploadedPhotos.unshift(val);
        }
        currentPhotoUrl = val;
        if (livePreviewImg) livePreviewImg.src = val;
        renderGallery();
      }
    });
  }

  renderGallery();

  // PRODUCTS REGISTRY
  const storeProducts = [
    {
      id: 'prod-1',
      title: 'Java Full-Stack Developer Roadmap PDF',
      price: '₹499',
      oldPrice: '₹999',
      desc: 'Comprehensive guide from Java core syntax to microservices, Spring Boot, and cloud deployment. Includes architecture diagrams, interview questions, and production checklist.',
      cta: 'Instant Access',
      rating: '5.0 (64 customer reviews)',
      photos: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 'prod-2',
      title: '1-on-1 Instagram Strategy Session',
      price: '₹1,499',
      oldPrice: '₹2,999',
      desc: '30-minute private call to audit your Instagram DM automation funnel, optimize bio link conversion, and scale high-ticket lead generation.',
      cta: 'Book Session',
      rating: '4.9 (28 customer reviews)',
      photos: [
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 'prod-3',
      title: 'Instagram Automation Preset Bundle',
      price: 'FREE',
      oldPrice: '₹499',
      desc: 'Pre-configured comment triggers, DM copy templates, and Bio link presets ready to import directly into your RenderReply dashboard.',
      cta: 'Download Now',
      rating: '5.0 (112 customer reviews)',
      photos: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
      ]
    }
  ];

  window.editProductItem = function (id) {
    const prod = storeProducts.find(p => p.id === id);
    if (prod) {
      activeEditingProdId = id;
      if (document.getElementById('modal-prod-title')) document.getElementById('modal-prod-title').value = prod.title;
      if (document.getElementById('modal-prod-price')) document.getElementById('modal-prod-price').value = prod.price.replace(/[₹$]/g, '');
      if (document.getElementById('modal-prod-oldprice')) document.getElementById('modal-prod-oldprice').value = prod.oldPrice ? prod.oldPrice.replace(/[₹$]/g, '') : '';
      if (document.getElementById('modal-prod-cta')) document.getElementById('modal-prod-cta').value = prod.cta || 'Instant Access';
      if (document.getElementById('modal-prod-desc')) document.getElementById('modal-prod-desc').value = prod.desc;

      if (prod.photos && prod.photos.length > 0) {
        uploadedPhotos = [...prod.photos];
        currentPhotoUrl = uploadedPhotos[0];
        if (inputProdPhoto) inputProdPhoto.value = currentPhotoUrl;
        if (livePreviewImg) livePreviewImg.src = currentPhotoUrl;
      }
      if (livePreviewTitle) livePreviewTitle.textContent = prod.title;
      if (livePreviewDesc) livePreviewDesc.textContent = prod.desc;
      if (livePreviewPrice) livePreviewPrice.textContent = prod.price;
      if (livePreviewOldPrice) livePreviewOldPrice.textContent = prod.oldPrice || '';
      calculateAndUpdateDiscount();
    }
    openProductModal();
  };

  window.deleteProductItem = function (id) {
    const idx = storeProducts.findIndex(p => p.id === id);
    if (idx !== -1) {
      const removed = storeProducts.splice(idx, 1);
      renderStoreProductsAndSyncPreview();
      showToast(`Removed "${removed[0]?.title || 'Product'}" from catalog`);
    }
  };

  function renderStoreProductsAndSyncPreview() {
    const builderContainer = document.getElementById('builder-products-container');
    const unifiedProdGrid = document.getElementById('unified-prod-grid-el');
    const ecomGrid = document.querySelector('.ecom-products-grid');

    if (builderContainer) {
      builderContainer.innerHTML = '';
      storeProducts.forEach((prod, index) => {
        const isFree = prod.price === 'FREE' || prod.price === '0' || prod.price === '$0.00';
        const isSession = prod.title.toLowerCase().includes('session') || prod.title.toLowerCase().includes('strategy');
        const badgeTag = isFree ? 'Lead Magnet' : (isSession ? '1-on-1 Session' : 'Digital Guide');
        const card = document.createElement('div');
        card.className = 'catalog-prod-card';
        card.innerHTML = `
          <div class="catalog-img-wrapper">
            <img src="${prod.photos[0]}" alt="${prod.title}">
            <span class="prod-badge-tag ${isFree ? 'free-tag' : ''}">${badgeTag}</span>
          </div>
          <div class="catalog-prod-body">
            <div class="prod-title-price">
              <div class="prod-name">${prod.title}</div>
              <div class="prod-price ${isFree ? 'free' : ''}">${prod.price}</div>
            </div>
            <div class="prod-meta">${prod.rating || '5.0 (Active)'}</div>
            <div class="prod-actions">
              <button type="button" class="btn btn-edit-prod-item" data-id="${prod.id}">Edit Details</button>
              <button type="button" class="btn btn-delete-prod-item" data-id="${prod.id}">Delete</button>
            </div>
          </div>
        `;
        builderContainer.appendChild(card);
      });
    }

    if (unifiedProdGrid) {
      unifiedProdGrid.innerHTML = '';
      storeProducts.forEach(prod => {
        const unifiedCard = document.createElement('div');
        unifiedCard.className = 'unified-prod-card';
        unifiedCard.innerHTML = `
          <div class="unified-prod-img-wrapper">
            <img src="${prod.photos[0]}" alt="${prod.title}">
          </div>
          <div class="unified-prod-body">
            <div class="unified-prod-title">${prod.title}</div>
            <div class="unified-prod-desc-snippet">${prod.desc || 'Comprehensive creator guide and resource package.'}</div>
            <div class="unified-prod-footer">
              <span class="unified-prod-price ${prod.price === 'FREE' ? 'free' : ''}">${prod.price}</span>
              <button type="button" class="unified-prod-cta-btn">${prod.cta || 'Instant Access'}</button>
            </div>
          </div>
        `;
        unifiedProdGrid.appendChild(unifiedCard);
      });
    }

    if (ecomGrid) {
      ecomGrid.innerHTML = '';
      storeProducts.forEach(prod => {
        const ecomCard = document.createElement('div');
        ecomCard.className = 'ecom-product-card';
        ecomCard.style.cursor = 'pointer';
        ecomCard.innerHTML = `
          <div class="ecom-card-banner">
            <img src="${prod.photos[0]}" alt="${prod.title}" class="ecom-card-photo">
          </div>
          <div class="ecom-card-body">
            <div class="ecom-rating-row">
              <div class="star-rating-row">
                <svg class="star-icon" viewBox="0 0 24 24" width="13" height="13" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg class="star-icon" viewBox="0 0 24 24" width="13" height="13" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg class="star-icon" viewBox="0 0 24 24" width="13" height="13" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg class="star-icon" viewBox="0 0 24 24" width="13" height="13" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg class="star-icon" viewBox="0 0 24 24" width="13" height="13" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <span style="color: var(--text-secondary);">${prod.rating ? prod.rating.replace('customer reviews', 'reviews') : '5.0'}</span>
            </div>
            <div class="ecom-prod-title">${prod.title}</div>
            <div class="ecom-prod-desc">${prod.desc}</div>
            <div class="ecom-price-row">
              <div>
                <span class="ecom-price-tag" style="${prod.price === 'FREE' ? 'color: #10b981;' : ''}">${prod.price}</span>
                ${prod.oldPrice ? `<span class="ecom-price-old">${prod.oldPrice}</span>` : ''}
              </div>
              <button class="btn-ecom-buy" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; font-weight: 800;">${prod.cta}</button>
            </div>
          </div>
        `;
        ecomCard.addEventListener('click', (e) => {
          if (!e.target.classList.contains('btn-ecom-buy')) {
            openProductDetail(prod);
          }
        });
        ecomGrid.appendChild(ecomCard);
      });
    }

    // SYNC TO PHONE MOCKUP PREVIEW (#dsp-prod-list)
    const dspList = document.getElementById('dsp-prod-list');
    if (dspList) {
      dspList.innerHTML = '';
      const colors = [
        'linear-gradient(135deg,#1e3a5f,#2563eb)',
        'linear-gradient(135deg,#3b1f6a,#7c3aed)',
        'linear-gradient(135deg,#1f3a3a,#059669)',
        'linear-gradient(135deg,#4a1d24,#e11d48)'
      ];
      storeProducts.forEach((prod, index) => {
        const row = document.createElement('div');
        row.className = 'dsp-prod-row';
        row.dataset.prodId = prod.id;
        const isFree = prod.price === 'FREE' || prod.price === '$0.00' || prod.price === '0';
        const photo = (prod.photos && prod.photos[0]) ? prod.photos[0] : '';
        const fallbackBg = colors[index % colors.length];

        row.innerHTML = `
          ${photo ? `<img src="${photo}" class="dsp-prod-img" alt="${prod.title}" style="object-fit:cover;">` : `<div class="dsp-prod-img" style="background:${fallbackBg};"></div>`}
          <div class="dsp-prod-info">
            <div class="dsp-prod-name">${prod.title}</div>
            <div class="dsp-prod-price ${isFree ? 'free' : ''}">${prod.price}</div>
          </div>
        `;
        dspList.appendChild(row);
      });
    }

    // SYNC TO LIVE STOREFRONT PREVIEW MODAL (#spm-products-grid)
    const spmGrid = document.getElementById('spm-products-grid');
    if (spmGrid) {
      spmGrid.innerHTML = '';
      storeProducts.forEach(prod => {
        const isFree = prod.price === 'FREE' || prod.price === '$0.00' || prod.price === '0';
        const photo = (prod.photos && prod.photos[0]) ? prod.photos[0] : 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80';
        const card = document.createElement('div');
        card.className = 'spm-prod-card';
        card.innerHTML = `
          <div class="spm-prod-thumb-box">
            <img src="${photo}" alt="${prod.title}" class="spm-prod-img">
          </div>
          <div class="spm-prod-details">
            <h3 class="spm-prod-title">${prod.title}</h3>
            <p class="spm-prod-desc">${prod.desc}</p>
            <div class="spm-prod-footer">
              <span class="spm-prod-price ${isFree ? 'free' : ''}">${prod.price}</span>
              <button class="btn spm-btn-buy" data-id="${prod.id}">${prod.cta || (isFree ? 'Download Free' : 'Buy Instant PDF')}</button>
            </div>
          </div>
        `;
        spmGrid.appendChild(card);
      });
    }

    // SYNC CATALOG COUNTS & BADGES
    const countPill = document.getElementById('catalog-count-pill');
    if (countPill) countPill.textContent = storeProducts.length;
    const pstatCount = document.getElementById('pstat-products-count');
    if (pstatCount) pstatCount.textContent = storeProducts.length;

    // SYNC ALL PRODUCTS CATALOG MODAL
    renderModalAllProductsList();

    window.storeProductsRef = storeProducts;
  }

  // RENDER ALL PRODUCTS MODAL LIST
  function renderModalAllProductsList(filterTag = 'all', searchQuery = '') {
    const list = document.getElementById('modal-all-products-list');
    if (!list) return;
    list.innerHTML = '';

    const query = (searchQuery || '').toLowerCase().trim();
    const filtered = storeProducts.filter(p => {
      const matchQuery = !query || 
        (p.title && p.title.toLowerCase().includes(query)) || 
        (p.desc && p.desc.toLowerCase().includes(query)) || 
        (p.price && p.price.toLowerCase().includes(query));
      
      let matchFilter = true;
      const isFree = p.price === 'FREE' || p.price === '0' || p.price === '$0.00';
      const isSession = p.title.toLowerCase().includes('session') || p.title.toLowerCase().includes('strategy');
      
      if (filterTag === 'free') matchFilter = isFree;
      if (filterTag === 'guide') matchFilter = !isFree && !isSession;
      if (filterTag === 'session') matchFilter = isSession;

      return matchQuery && matchFilter;
    });

    // Update KPI counters
    const kpiTotal = document.getElementById('modal-kpi-total-prods');
    if (kpiTotal) kpiTotal.textContent = storeProducts.length;
    const kpiFree = document.getElementById('modal-kpi-free-prods');
    if (kpiFree) {
      const freeCount = storeProducts.filter(p => p.price === 'FREE' || p.price === '0' || p.price === '$0.00').length;
      kpiFree.textContent = `${freeCount} Free`;
    }
    const kpiPaid = document.getElementById('modal-kpi-paid-prods');
    if (kpiPaid) {
      const paidCount = storeProducts.filter(p => p.price !== 'FREE' && p.price !== '0' && p.price !== '$0.00').length;
      kpiPaid.textContent = `${paidCount} Items`;
    }
    const badgeCount = document.getElementById('modal-all-prods-count-badge');
    if (badgeCount) badgeCount.textContent = `${storeProducts.length} Products`;

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 36px 16px; color: #94a3b8;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.8" style="margin-bottom: 8px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div style="font-size: 14px; font-weight: 700; color: #f8fafc;">No products matched your search</div>
          <div style="font-size: 12px; margin-top: 4px;">Try changing filters or add a new product.</div>
        </div>
      `;
      const footerSummary = document.getElementById('modal-all-prods-footer-summary');
      if (footerSummary) footerSummary.textContent = `Showing 0 of ${storeProducts.length} products`;
      return;
    }

    filtered.forEach(prod => {
      const isFree = prod.price === 'FREE' || prod.price === '0' || prod.price === '$0.00';
      const isSession = prod.title.toLowerCase().includes('session') || prod.title.toLowerCase().includes('strategy');
      const badgeText = isFree ? 'Lead Magnet' : (isSession ? '1-on-1 Session' : 'Digital Guide');
      const photo = (prod.photos && prod.photos[0]) ? prod.photos[0] : 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80';

      const card = document.createElement('div');
      card.className = 'modal-prod-item-card';
      card.dataset.id = prod.id;
      card.innerHTML = `
        <div class="modal-prod-info-wrap">
          <div class="modal-prod-thumb-box">
            <img src="${photo}" alt="${prod.title}">
          </div>
          <div class="modal-prod-text-content">
            <div class="modal-prod-title-row">
              <span class="modal-prod-title-txt" title="${prod.title}">${prod.title}</span>
              <span class="prod-badge-tag ${isFree ? 'free-tag' : ''}">${badgeText}</span>
            </div>
            <div class="modal-prod-desc-snippet">${prod.desc}</div>
            <div class="modal-prod-sub-meta">
              <span style="color: #f59e0b; font-weight: 700; display: inline-flex; align-items: center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" style="vertical-align: -1px; margin-right: 2px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${prod.rating ? prod.rating.split('(')[0].trim() : '5.0'}</span>
              <span>•</span>
              <span style="color: #94a3b8;">CTA: "${prod.cta || 'Instant Access'}"</span>
              <span>•</span>
              <span style="color: #10b981; font-weight: 600;">Status: Active</span>
            </div>
          </div>
        </div>
        <div class="modal-prod-actions-wrap">
          <div class="modal-prod-pricing-col">
            <div class="modal-prod-price-txt ${isFree ? 'free' : ''}">${prod.price}</div>
            ${prod.oldPrice ? `<div class="modal-prod-oldprice-txt">${prod.oldPrice}</div>` : ''}
          </div>
          <div class="modal-prod-btns-group">
            <button type="button" class="btn btn-outline btn-xs btn-edit-prod-item" data-id="${prod.id}" title="Edit Product Details">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button type="button" class="btn btn-outline btn-xs btn-preview-modal-prod" data-id="${prod.id}" title="Preview in Live Storefront">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="13" r="3"/></svg>
              Preview
            </button>
            <button type="button" class="btn btn-outline btn-xs btn-delete-prod-item" data-id="${prod.id}" title="Delete Product" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.3);">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Delete
            </button>
          </div>
        </div>
      `;
      list.appendChild(card);
    });

    const footerSummary = document.getElementById('modal-all-prods-footer-summary');
    if (footerSummary) footerSummary.textContent = `Showing ${filtered.length} of ${storeProducts.length} products`;
  }

  // OPEN & CLOSE ALL PRODUCTS MODAL
  window.openAllProductsModal = function () {
    if (typeof window.resetBuilderCatalogView === 'function') {
      window.resetBuilderCatalogView();
    }
    renderModalAllProductsList('all', '');
    const searchInput = document.getElementById('modal-input-all-prods-search');
    if (searchInput) searchInput.value = '';
    const filterTabs = document.querySelectorAll('#modal-all-prods-filter-tabs .modal-pfilter-btn');
    filterTabs.forEach(b => {
      if (b.getAttribute('data-filter') === 'all') {
        b.classList.add('active');
        b.style.background = '#6366f1';
        b.style.color = '#fff';
      } else {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.color = '#94a3b8';
      }
    });

    const modal = document.getElementById('modal-all-products');
    if (modal) {
      modal.classList.add('active');
    }
    showToast('Showing all products in catalog');
  };

  window.closeAllProductsModal = function () {
    const modal = document.getElementById('modal-all-products');
    if (modal) {
      modal.classList.remove('active');
    }
  };

  const modalProdSearchInput = document.getElementById('modal-input-all-prods-search');
  if (modalProdSearchInput) {
    modalProdSearchInput.addEventListener('input', (e) => {
      const activeTab = document.querySelector('#modal-all-prods-filter-tabs .modal-pfilter-btn.active');
      const filterTag = activeTab ? (activeTab.getAttribute('data-filter') || 'all') : 'all';
      renderModalAllProductsList(filterTag, e.target.value);
    });
  }

  renderStoreProductsAndSyncPreview();

  // FORM PRODUCT MODAL SUBMIT
  if (formProductModal) {
    formProductModal.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('modal-prod-title').value.trim();
      let priceVal = document.getElementById('modal-prod-price').value.trim();
      let oldPriceVal = document.getElementById('modal-prod-oldprice').value.trim();
      let ctaText = document.getElementById('modal-prod-cta').value.trim();
      const desc = document.getElementById('modal-prod-desc').value.trim();

      if (!title || !priceVal || !desc) return;

      let formattedPrice = priceVal;
      if (priceVal.toLowerCase() === 'free' || priceVal === '0') {
        formattedPrice = 'FREE';
      } else if (!priceVal.startsWith('₹') && !priceVal.startsWith('$')) {
        formattedPrice = `₹${priceVal}`;
      } else if (priceVal.startsWith('$')) {
        formattedPrice = priceVal.replace('$', '₹');
      }

      let formattedOldPrice = oldPriceVal;
      if (oldPriceVal && !oldPriceVal.startsWith('₹') && !oldPriceVal.startsWith('$')) {
        formattedOldPrice = `₹${oldPriceVal}`;
      } else if (oldPriceVal && oldPriceVal.startsWith('$')) {
        formattedOldPrice = oldPriceVal.replace('$', '₹');
      }

      if (!ctaText) {
        ctaText = formattedPrice === 'FREE' ? 'Download Now' : 'Instant Access';
      }

      if (activeEditingProdId) {
        const existingProd = storeProducts.find(p => p.id === activeEditingProdId);
        if (existingProd) {
          existingProd.title = title;
          existingProd.price = formattedPrice;
          existingProd.oldPrice = formattedOldPrice;
          existingProd.desc = desc;
          existingProd.cta = ctaText;
          if (uploadedPhotos.length > 0) existingProd.photos = [...uploadedPhotos];
        }
        showToast(`Updated "${title}" product details successfully!`);
      } else {
        const newProdObj = {
          id: `prod-${Date.now()}`,
          title: title,
          price: formattedPrice,
          oldPrice: formattedOldPrice,
          desc: desc,
          cta: ctaText,
          rating: '5.0 (New Product)',
          photos: uploadedPhotos.length > 0 ? [...uploadedPhotos] : [currentPhotoUrl]
        };
        storeProducts.push(newProdObj);
        showToast(`Published "${title}" (${formattedPrice}) to Creator Storefront!`);
      }

      renderStoreProductsAndSyncPreview();
      closeProductModal();
    });
  }

  const btnSaveDraft = document.getElementById('btn-save-draft');
  if (btnSaveDraft) {
    btnSaveDraft.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Product draft saved successfully!');
      closeProductModal();
    });
  }

  const btnScheduleProd = document.getElementById('btn-schedule-prod');
  if (btnScheduleProd) {
    btnScheduleProd.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Product scheduled for publication!');
      closeProductModal();
    });
  }

  // PRODUCT DETAIL VIEW HANDLERS
  let activeDetailProduct = null;
  let activePhotoIdx = 0;

  const openProductDetail = (prod) => {
    activeDetailProduct = prod;
    activePhotoIdx = 0;

    const heroHeader = document.querySelector('.ecom-hero-header');
    const sectionTitle = document.querySelector('.ecom-section-title');
    const mainGrid = document.querySelector('.ecom-products-grid');
    const trustBar = document.getElementById('ecom-trust-bar');
    const detailView = document.getElementById('ecom-product-detail-view');
    const ecomStorePage = document.querySelector('.ecom-store-page');

    if (heroHeader) heroHeader.style.display = 'none';
    if (sectionTitle) sectionTitle.style.display = 'none';
    if (mainGrid) mainGrid.style.display = 'none';
    if (trustBar) trustBar.style.display = 'none';
    if (detailView) detailView.style.display = 'flex';
    if (ecomStorePage) ecomStorePage.scrollTop = 0;

    const titleEl = document.getElementById('detail-prod-title');
    const priceEl = document.getElementById('detail-prod-price');
    const oldPriceEl = document.getElementById('detail-prod-oldprice');
    const descEl = document.getElementById('detail-prod-desc');
    const ratingEl = document.getElementById('detail-rating-text');

    if (titleEl) titleEl.textContent = prod.title;
    if (priceEl) priceEl.textContent = prod.price;
    if (oldPriceEl) oldPriceEl.textContent = prod.oldPrice || '';
    if (descEl) descEl.textContent = prod.desc;
    if (ratingEl) ratingEl.textContent = prod.rating || '5.0 (Customer reviews)';

    const buyBtn = document.getElementById('btn-detail-buy-now');
    if (buyBtn) {
      buyBtn.textContent = `${prod.cta || 'Instant Access'} • ${prod.price}`;
      buyBtn.onclick = () => showToast(`Purchasing "${prod.title}" (${prod.price})! Proceeding to checkout...`);
    }

    updateDetailPhotoCarousel();
    renderMoreProductsGrid(prod.id);
  };

  const updateDetailPhotoCarousel = () => {
    if (!activeDetailProduct) return;
    const photos = (activeDetailProduct.photos && activeDetailProduct.photos.length > 0) ? activeDetailProduct.photos : [currentPhotoUrl];

    if (activePhotoIdx >= photos.length) activePhotoIdx = 0;
    if (activePhotoIdx < 0) activePhotoIdx = photos.length - 1;

    const imgEl = document.getElementById('detail-active-img');
    const counterEl = document.getElementById('detail-img-counter');
    const prevBtn = document.getElementById('btn-detail-prev-photo');
    const nextBtn = document.getElementById('btn-detail-next-photo');
    const thumbsStrip = document.getElementById('detail-thumbs-strip');

    if (imgEl) imgEl.src = photos[activePhotoIdx];
    if (counterEl) counterEl.textContent = `${activePhotoIdx + 1} / ${photos.length}`;

    if (prevBtn) prevBtn.style.display = photos.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = photos.length > 1 ? 'flex' : 'none';

    if (thumbsStrip) {
      thumbsStrip.innerHTML = '';
      if (photos.length > 1) {
        photos.forEach((url, i) => {
          const t = document.createElement('div');
          t.className = `gallery-thumb-item ${i === activePhotoIdx ? 'active' : ''}`;
          t.innerHTML = `<img src="${url}" alt="Photo ${i + 1}">`;
          t.addEventListener('click', () => {
            activePhotoIdx = i;
            updateDetailPhotoCarousel();
          });
          thumbsStrip.appendChild(t);
        });
      }
    }
  };

  const btnPrevPhoto = document.getElementById('btn-detail-prev-photo');
  if (btnPrevPhoto) {
    btnPrevPhoto.addEventListener('click', () => {
      activePhotoIdx--;
      updateDetailPhotoCarousel();
    });
  }

  const btnNextPhoto = document.getElementById('btn-detail-next-photo');
  if (btnNextPhoto) {
    btnNextPhoto.addEventListener('click', () => {
      activePhotoIdx++;
      updateDetailPhotoCarousel();
    });
  }

  const renderMoreProductsGrid = (currentId) => {
    const grid = document.getElementById('more-products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const otherProds = storeProducts.filter(p => p.id !== currentId);
    otherProds.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'ecom-product-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="ecom-card-banner">
          <img src="${prod.photos[0]}" alt="${prod.title}" class="ecom-card-photo">
        </div>
        <div class="ecom-card-body">
          <div class="ecom-rating-row">
            <div class="star-rating-row">
              <svg class="star-icon" viewBox="0 0 24 24" width="13" height="13" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <span style="color: var(--text-secondary);">${prod.rating ? prod.rating.split('(')[0] : '5.0'}</span>
          </div>
          <div class="ecom-prod-title">${prod.title}</div>
          <div class="ecom-prod-desc">${prod.desc.substring(0, 75)}...</div>
          <div class="ecom-price-row">
            <div>
              <span class="ecom-price-tag" style="${prod.price === 'FREE' ? 'color: #10b981;' : ''}">${prod.price}</span>
              ${prod.oldPrice ? `<span class="ecom-price-old">${prod.oldPrice}</span>` : ''}
            </div>
            <button type="button" class="btn-ecom-buy" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; font-weight: 800;">${prod.cta}</button>
          </div>
        </div>
      `;
      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-ecom-buy')) {
          openProductDetail(prod);
        }
      });
      grid.appendChild(card);
    });
  };

  const closeProductDetail = () => {
    const heroHeader = document.querySelector('.ecom-hero-header');
    const sectionTitle = document.querySelector('.ecom-section-title');
    const mainGrid = document.querySelector('.ecom-products-grid');
    const trustBar = document.getElementById('ecom-trust-bar');
    const detailView = document.getElementById('ecom-product-detail-view');

    if (heroHeader) heroHeader.style.display = 'flex';
    if (sectionTitle) sectionTitle.style.display = 'flex';
    if (mainGrid) mainGrid.style.display = 'grid';
    if (trustBar) trustBar.style.display = 'flex';
    if (detailView) detailView.style.display = 'none';
  };

  const btnBackToStore = document.getElementById('btn-back-to-storefront');
  if (btnBackToStore) btnBackToStore.addEventListener('click', closeProductDetail);

  const btnViewAllProds = document.getElementById('btn-view-all-store-products');
  if (btnViewAllProds) btnViewAllProds.addEventListener('click', closeProductDetail);

  // STREAMLINED CHANGE AVATAR WITH FILE UPLOAD AND FULL STORE PROFILE SYNC
  const btnChangeAvatar = document.getElementById('btn-change-avatar');
  const storeAvatarImg = document.getElementById('store-avatar-img');
  const storeAvatarFileInput = document.getElementById('store-avatar-file-input');

  function cycleSampleAvatar() {
    const avatarSampleUrls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
    ];
    const currentSrc = window.storeProfileState ? window.storeProfileState.avatar : '';
    let currentIdx = avatarSampleUrls.indexOf(currentSrc);
    if (currentIdx === -1) currentIdx = 0;
    const nextUrl = avatarSampleUrls[(currentIdx + 1) % avatarSampleUrls.length];

    if (!window.storeProfileState) window.storeProfileState = {};
    window.storeProfileState.avatar = nextUrl;
    const setupAvatarInput = document.getElementById('setup-input-avatar');
    if (setupAvatarInput) setupAvatarInput.value = nextUrl;

    if (window.syncStoreProfileToUI) {
      window.syncStoreProfileToUI(window.storeProfileState);
    }
    showToast('Avatar creator photo updated!');
  }

  const handleAvatarChangeClick = (e) => {
    if (e) e.preventDefault();
    if (storeAvatarFileInput) {
      storeAvatarFileInput.click();
    } else {
      cycleSampleAvatar();
    }
  };

  if (btnChangeAvatar) btnChangeAvatar.addEventListener('click', handleAvatarChangeClick);
  if (storeAvatarImg) storeAvatarImg.addEventListener('click', handleAvatarChangeClick);

  if (storeAvatarFileInput) {
    storeAvatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          const newSrc = evt.target.result;
          if (!window.storeProfileState) window.storeProfileState = {};
          window.storeProfileState.avatar = newSrc;
          const setupAvatarInput = document.getElementById('setup-input-avatar');
          if (setupAvatarInput) setupAvatarInput.value = newSrc;
          if (window.syncStoreProfileToUI) {
            window.syncStoreProfileToUI(window.storeProfileState);
          }
          showToast('Profile image uploaded & updated!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // STORE OVERVIEW LIVE SETUP FORM INPUT LISTENERS
  ['setup-input-name', 'setup-input-avatar', 'setup-input-bio', 'setup-input-insta', 'setup-input-yt', 'setup-input-tw'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        if (window.syncStoreProfileLiveFromSetupInputs) {
          window.syncStoreProfileLiveFromSetupInputs();
        }
      });
    }
  });

  // SUBNAV INLINE ARROW BUTTONS LOGIC
  function initSubnavArrowButtons() {
    const strip = document.getElementById('store-subnav-strip');
    const leftBtn = document.getElementById('btn-subnav-arrow-left');
    const rightBtn = document.getElementById('btn-subnav-arrow-right');
    if (!strip) return;

    function updateArrows() {
      if (!strip) return;
      if (strip.clientWidth === 0) {
        if (rightBtn) rightBtn.classList.remove('hidden');
        if (leftBtn) leftBtn.classList.remove('visible');
        return;
      }
      const maxScroll = strip.scrollWidth - strip.clientWidth;
      if (leftBtn) {
        if (strip.scrollLeft > 10) {
          leftBtn.classList.add('visible');
        } else {
          leftBtn.classList.remove('visible');
        }
      }
      if (rightBtn) {
        if (maxScroll > 8 && strip.scrollLeft < maxScroll - 8) {
          rightBtn.classList.remove('hidden');
        } else {
          rightBtn.classList.add('hidden');
        }
      }
    }
    window.updateSubnavArrows = updateArrows;

    if (leftBtn) {
      leftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        strip.scrollBy({ left: -180, behavior: 'smooth' });
        setTimeout(updateArrows, 300);
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        strip.scrollBy({ left: 180, behavior: 'smooth' });
        setTimeout(updateArrows, 300);
      });
    }

    strip.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    setTimeout(updateArrows, 150);
  }

  // STORE SUB-NAV TAB SWITCHER FUNCTION
  window.switchStoreTab = function(tabName, clickedBtn) {
    const subnavBtns = document.querySelectorAll('.store-subnav-btn');
    let activeBtnEl = null;
    subnavBtns.forEach(btn => {
      btn.classList.remove('active');
      if (clickedBtn) {
        if (btn === clickedBtn) {
          btn.classList.add('active');
          activeBtnEl = btn;
        }
      } else {
        if (btn.getAttribute('data-store-tab') === tabName) {
          btn.classList.add('active');
          activeBtnEl = btn;
        }
      }
    });

    if (activeBtnEl && typeof activeBtnEl.scrollIntoView === 'function') {
      activeBtnEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    const tabContents = document.querySelectorAll('.store-tab-content');
    tabContents.forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none';
    });

    const targetContent = document.getElementById(`store-tab-${tabName}`);
    if (targetContent) {
      targetContent.classList.add('active');
      targetContent.style.display = 'block';
    }
  };

  initSubnavArrowButtons();

  // GLOBAL EVENT DELEGATION FOR DEEP INTERACTIVE BUTTONS
  document.addEventListener('click', (e) => {
    // 0. Ignore programmatic download link clicks
    if (e.target && e.target.tagName === 'A' && e.target.hasAttribute('download')) {
      return;
    }
    // 1. Edit Product Button
    const editBtn = e.target.closest('.btn-edit-prod-item');
    if (editBtn) {
      const prodId = editBtn.getAttribute('data-id');
      window.editProductItem(prodId);
      return;
    }

    // 2. Delete Product Button
    const deleteBtn = e.target.closest('.btn-delete-prod-item');
    if (deleteBtn) {
      const prodId = deleteBtn.getAttribute('data-id');
      window.deleteProductItem(prodId);
      return;
    }

    // 3. Store Sub-nav Buttons
    const subnavBtn = e.target.closest('.store-subnav-btn');
    if (subnavBtn) {
      e.preventDefault();
      const targetTab = subnavBtn.getAttribute('data-store-tab');
      window.switchStoreTab(targetTab, subnavBtn);
      return;
    }

    // 3.5 Payment Options Buttons Delegation
    const upiBtn = e.target.closest('#btn-upi-config');
    if (upiBtn) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const inputUpi = document.getElementById('input-payout-upi');
        const inputHolder = document.getElementById('input-upi-holder-name');
        if (inputUpi && window.paymentState?.payout) inputUpi.value = window.paymentState.payout.upiId || 'rudrateja@okaxis';
        if (inputHolder && window.paymentState?.payout) inputHolder.value = window.paymentState.payout.holderName || 'Rudra Teja';
        const m = document.getElementById('modal-edit-upi');
        if (m) m.classList.add('active');
      } catch (err) {
        console.error('Error triggering Edit UPI modal:', err);
      }
      return;
    }

    const bankBtn = e.target.closest('#btn-bank-config');
    if (bankBtn) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const inputHolder = document.getElementById('input-bank-name-holder');
        const inputBank = document.getElementById('input-bank-name');
        const inputAcc = document.getElementById('input-bank-acc-num');
        const inputIfsc = document.getElementById('input-bank-ifsc');

        if (inputHolder && window.paymentState?.payout) inputHolder.value = window.paymentState.payout.holderName || 'Rudra Teja';
        if (inputBank && window.paymentState?.payout) inputBank.value = window.paymentState.payout.bankName || 'HDFC Bank';
        if (inputAcc && window.paymentState?.payout) inputAcc.value = window.paymentState.payout.accountNumber || '50100293844892';
        if (inputIfsc && window.paymentState?.payout) inputIfsc.value = window.paymentState.payout.ifsc || 'HDFC0000128';

        const m = document.getElementById('modal-edit-bank');
        if (m) m.classList.add('active');
      } catch (err) {
        console.error('Error triggering Edit Bank modal:', err);
      }
      return;
    }

    const withdrawBtn = e.target.closest('#btn-withdraw-funds');
    if (withdrawBtn) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const inputAmt = document.getElementById('input-withdraw-amount');
        if (inputAmt && window.paymentState) {
          inputAmt.max = window.paymentState.availableBalance || 98050;
          inputAmt.value = Math.min(50000, window.paymentState.availableBalance || 98050);
        }
        const m = document.getElementById('modal-wallet-withdraw');
        if (m) m.classList.add('active');
      } catch (err) {
        console.error('Error triggering Withdraw modal:', err);
      }
      return;
    }

    const viewHistBtn = e.target.closest('#btn-view-wallet-history');
    if (viewHistBtn) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const modalSearch = document.getElementById('modal-input-txn-search');
        if (modalSearch) modalSearch.value = 'Withdrawal';
        if (typeof window.updateTxnView === 'function') window.updateTxnView();
        const m = document.getElementById('modal-txn-view-all');
        if (m) m.classList.add('active');
      } catch (err) {
        console.error('Error triggering View History modal:', err);
      }
      return;
    }

    const viewAllBtn = e.target.closest('#btn-txn-view-all');
    if (viewAllBtn) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const modalSearch = document.getElementById('modal-input-txn-search');
        if (modalSearch) modalSearch.value = '';
        if (typeof window.updateTxnView === 'function') window.updateTxnView();
        const m = document.getElementById('modal-txn-view-all');
        if (m) m.classList.add('active');
      } catch (err) {
        console.error('Error triggering View All modal:', err);
      }
      return;
    }

    // 3.6 Builder Dashboard View All Products
    const viewAllProdsBtn = e.target.closest('#btn-view-all-products');
    if (viewAllProdsBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.openAllProductsModal();
      return;
    }

    // 3.7 Phone Mockup "View All Products" Button Trigger (Builder & Settings preview)
    const phoneViewAllBtn = e.target.closest('.dsp-view-all-btn, .cs-phone-view-btn');
    if (phoneViewAllBtn) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof syncAllStorePreviewFields === 'function') syncAllStorePreviewFields();
      const spm = document.getElementById('store-preview-modal');
      if (spm) spm.classList.add('active');
      const spmViewport = document.getElementById('spm-viewport');
      const spmSec = document.querySelector('.spm-products-section');
      if (spmViewport && spmSec) {
        setTimeout(() => {
          spmViewport.scrollTo({ top: spmSec.offsetTop - 20, behavior: 'smooth' });
        }, 120);
      }
      showToast('Viewing all store products in Live Storefront!');
      return;
    }

    // 3.75 Modal Actions
    const previewModalProdBtn = e.target.closest('.btn-preview-modal-prod');
    if (previewModalProdBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.closeAllProductsModal();
      if (typeof syncAllStorePreviewFields === 'function') syncAllStorePreviewFields();
      const spm = document.getElementById('store-preview-modal');
      if (spm) spm.classList.add('active');
      const spmViewport = document.getElementById('spm-viewport');
      const spmSec = document.querySelector('.spm-products-section');
      if (spmViewport && spmSec) {
        setTimeout(() => {
          spmViewport.scrollTo({ top: spmSec.offsetTop - 20, behavior: 'smooth' });
        }, 120);
      }
      return;
    }

    const modalAddProdBtn = e.target.closest('#btn-modal-add-product');
    if (modalAddProdBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.closeAllProductsModal();
      resetProductForm();
      openProductModal();
      return;
    }

    const modalOpenLiveStoreBtn = e.target.closest('#btn-modal-open-live-store');
    if (modalOpenLiveStoreBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.closeAllProductsModal();
      if (typeof syncAllStorePreviewFields === 'function') syncAllStorePreviewFields();
      const spm = document.getElementById('store-preview-modal');
      if (spm) spm.classList.add('active');
      return;
    }

    const modalFilterTabBtn = e.target.closest('.modal-pfilter-btn');
    if (modalFilterTabBtn) {
      e.preventDefault();
      e.stopPropagation();
      const tabs = document.querySelectorAll('#modal-all-prods-filter-tabs .modal-pfilter-btn');
      tabs.forEach(t => {
        t.classList.remove('active');
        t.style.background = 'transparent';
        t.style.color = '#94a3b8';
      });
      modalFilterTabBtn.classList.add('active');
      modalFilterTabBtn.style.background = '#6366f1';
      modalFilterTabBtn.style.color = '#fff';
      const filterTag = modalFilterTabBtn.getAttribute('data-filter') || 'all';
      const searchVal = document.getElementById('modal-input-all-prods-search')?.value || '';
      renderModalAllProductsList(filterTag, searchVal);
      return;
    }

    const closeBtn = e.target.closest('#btn-close-upi-modal, #btn-cancel-upi, #btn-close-bank-modal, #btn-cancel-bank, #btn-close-withdraw-modal, #btn-cancel-withdraw, #btn-close-txn-all-modal, #btn-close-txn-detail-modal, #btn-close-receipt, #btn-close-spm-modal, #spm-dot-close, #btn-close-auth-modal, #btn-close-orders-modal, #btn-close-all-prods-modal, #btn-close-all-prods-bottom');
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const modal = closeBtn.closest('.store-preview-modal-backdrop') || document.getElementById('store-preview-modal');
        if (modal) modal.classList.remove('active');
      } catch (err) {
        console.error('Error closing modal:', err);
      }
      return;
    }

    // 3.82 Template Card Selection
    const templateCard = e.target.closest('.template-card');
    if (templateCard && !e.target.closest('button, a')) {
      e.preventDefault();
      const title = templateCard.querySelector('.template-card-title')?.textContent || 'Template';
      showToast(`Selected "${title}"! Ready to activate in Automation Rules.`);
      return;
    }

    // 3.8 Preview Store & Open Store Triggers
    const previewStoreBtn = e.target.closest('#btn-open-browser-overlay, .btn-preview-store');
    if (previewStoreBtn) {
      e.preventDefault();
      const modal = document.getElementById('store-preview-modal');
      if (modal) modal.classList.add('active');
      if (typeof showToast === 'function') showToast('Opening live interactive Storefront Preview...');
      return;
    }

    const openStoreBtn = e.target.closest('#btn-open-store-external, .btn-open-store');
    if (openStoreBtn) {
      e.preventDefault();
      e.stopPropagation();
      const rawUrl = document.getElementById('store-official-link-pill')?.textContent.trim() || 'renderreply.com/store/rajeev';
      const storeUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
      window.open(storeUrl, '_blank');
      if (typeof showToast === 'function') showToast(`Opening live public storefront in a new tab: ${storeUrl}`);
      return;
    }

    // 4. Edit Header Trigger (Pencil / Cancel icon toggle)
    const editPencilSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    const closeCrossSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    function updateEditHeaderTriggerIcon(isOpen) {
      const triggerBtn = document.getElementById('btn-edit-header-trigger');
      if (!triggerBtn) return;
      if (isOpen) {
        triggerBtn.innerHTML = `${closeCrossSvg} <span>Close Setup</span>`;
        triggerBtn.title = 'Close Setup';
      } else {
        triggerBtn.innerHTML = `${editPencilSvg} <span>Edit Store</span>`;
        triggerBtn.title = 'Edit Store Info';
      }
    }

    const editHeaderBtn = e.target.closest('#btn-edit-header-trigger');
    if (editHeaderBtn) {
      e.preventDefault();
      const formBox = document.getElementById('profile-setup-form-box');
      const summaryBox = document.getElementById('profile-summary-box');
      if (formBox && (formBox.style.display === 'none' || !formBox.style.display)) {
        window.storeProfileDraft = { ...window.storeProfileState };
        if (window.syncStoreProfileToUI) {
          window.syncStoreProfileToUI(window.storeProfileState);
        }
        formBox.style.display = 'block';
        if (summaryBox) summaryBox.style.display = 'none';
        updateEditHeaderTriggerIcon(true);
      } else {
        if (window.storeProfileDraft) {
          window.storeProfileState = { ...window.storeProfileDraft };
          if (window.syncStoreProfileToUI) window.syncStoreProfileToUI(window.storeProfileState);
        }
        if (formBox) formBox.style.display = 'none';
        if (summaryBox) summaryBox.style.display = 'flex';
        updateEditHeaderTriggerIcon(false);
      }
      return;
    }

    // 5. Cancel / Save Profile Setup
    const cancelSetupBtn = e.target.closest('#btn-cancel-profile-setup');
    if (cancelSetupBtn) {
      e.preventDefault();
      if (window.storeProfileDraft) {
        window.storeProfileState = { ...window.storeProfileDraft };
        if (window.syncStoreProfileToUI) window.syncStoreProfileToUI(window.storeProfileState);
      }
      const formBox = document.getElementById('profile-setup-form-box');
      const summaryBox = document.getElementById('profile-summary-box');
      if (formBox) formBox.style.display = 'none';
      if (summaryBox) summaryBox.style.display = 'flex';
      updateEditHeaderTriggerIcon(false);
      return;
    }

    const saveSetupBtn = e.target.closest('#btn-save-profile-setup');
    if (saveSetupBtn) {
      e.preventDefault();
      const setupName = document.getElementById('setup-input-name');
      const setupAvatar = document.getElementById('setup-input-avatar');
      const setupBio = document.getElementById('setup-input-bio');
      const setupInsta = document.getElementById('setup-input-insta');
      const setupYt = document.getElementById('setup-input-yt');
      const setupTw = document.getElementById('setup-input-tw');

      window.storeProfileState = {
        name: setupName?.value.trim() || 'Rudra Teja',
        avatar: setupAvatar?.value.trim() || window.storeProfileState.avatar,
        bio: setupBio?.value.trim() || '',
        insta: setupInsta?.value.trim() || '',
        yt: setupYt?.value.trim() || '',
        tw: setupTw?.value.trim() || ''
      };

      if (window.syncStoreProfileToUI) {
        window.syncStoreProfileToUI(window.storeProfileState);
      }

      const formBox = document.getElementById('profile-setup-form-box');
      const summaryBox = document.getElementById('profile-summary-box');
      if (formBox) formBox.style.display = 'none';
      if (summaryBox) summaryBox.style.display = 'flex';
      updateEditHeaderTriggerIcon(false);
      showToast('Creator store profile info saved & published!');
      return;
    }

    // 6. Add Product Trigger
    const addProdBtn = e.target.closest('#btn-add-product-modal');
    if (addProdBtn) {
      e.preventDefault();
      openProductModal();
      return;
    }

    // 7. Video Tutorial Click
    const watchBtn = e.target.closest('.btn-watch-video, .video-play-overlay');
    if (watchBtn) {
      const card = watchBtn.closest('.video-support-card');
      const title = card ? (card.querySelector('.video-card-title')?.textContent.trim() || 'Video Tutorial') : 'Video Tutorial';
      showToast(`Playing video tutorial: ${title}`);
      return;
    }

    // 8. Copy Email Buttons
    const copyEmailBtn = e.target.closest('#btn-copy-support-email, .btn-copy-support-email-gen');
    if (copyEmailBtn) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('support@renderreply.com');
      }
      showToast('Support email copied: support@renderreply.com');
      return;
    }
  });

  // 9. Detailed Analytics Time Range Buttons & Reload Interactivity
  const rangeBtns = document.querySelectorAll('.time-range-btn[data-store-range]');
  const reloadAnalyticsBtn = document.getElementById('btn-analytics-reload');
  const analyticsCards = document.querySelectorAll('.analytics-card');
  const syncTimestamp = document.getElementById('analytics-sync-timestamp');

  // Analytics Datasets for 7 Days, 30 Days, 90 Days, Lifetime
  const analyticsDatasets = {
    '7 Days': {
      peaks: [165, 185, 181, 185],
      dates: ['Oct 08', 'Oct 10', 'Oct 12', 'Oct 14', 'Oct 16', 'Oct 18', 'Oct 20', 'Oct 22'],
      popoverDate: 'Oct 12:',
      popoverVisits: 165,
      popoverClicks: 70,
      linePath: 'M 25 105 L 60 118 L 95 125 L 130 115 L 165 60 L 200 102 L 235 110 L 270 45 L 305 100 L 340 48 L 375 45 L 410 88 L 445 120 L 480 140 L 515 80',
      areaPath: 'M 25 105 L 60 118 L 95 125 L 130 115 L 165 60 L 200 102 L 235 110 L 270 45 L 305 100 L 340 48 L 375 45 L 410 88 L 445 120 L 480 140 L 515 80 L 515 200 L 25 200 Z',
      barHeights: [60, 70, 75, 70, 95, 65, 60, 100, 65, 70, 105, 70, 55, 95, 60],
      products: [
        { clicks: 336, ctr: '12.0%', conv: '7.03%' },
        { clicks: 229, ctr: '8.3%', conv: '5.03%' },
        { clicks: 153, ctr: '4.0%', conv: '6.63%' },
        { clicks: 76, ctr: '14.8%', conv: '20.02%' },
        { clicks: 43, ctr: '8.9%', conv: '10.09%' }
      ],
      mobilePct: '60%',
      deskPct: '28%',
      tabPct: '12%',
      geo: {
        us: { val: '520 (42%)', pct: '42%' },
        in: { val: '347 (28%)', pct: '28%' },
        uk: { val: '173 (14%)', pct: '14%' },
        de: { val: '111 (9%)', pct: '9%' }
      }
    },
    '30 Days': {
      peaks: [640, 720, 680, 810],
      dates: ['Sep 24', 'Sep 30', 'Oct 06', 'Oct 12', 'Oct 18', 'Oct 24', 'Oct 30', 'Nov 05'],
      popoverDate: 'Oct 18:',
      popoverVisits: 810,
      popoverClicks: 340,
      linePath: 'M 25 120 L 60 90 L 95 100 L 130 80 L 165 40 L 200 70 L 235 85 L 270 30 L 305 60 L 340 35 L 375 25 L 410 65 L 445 90 L 480 75 L 515 50',
      areaPath: 'M 25 120 L 60 90 L 95 100 L 130 80 L 165 40 L 200 70 L 235 85 L 270 30 L 305 60 L 340 35 L 375 25 L 410 65 L 445 90 L 480 75 L 515 50 L 515 200 L 25 200 Z',
      barHeights: [75, 85, 90, 80, 110, 85, 75, 120, 80, 90, 125, 85, 70, 110, 80],
      products: [
        { clicks: 1420, ctr: '14.2%', conv: '8.15%' },
        { clicks: 980, ctr: '9.6%', conv: '6.20%' },
        { clicks: 640, ctr: '5.2%', conv: '7.80%' },
        { clicks: 310, ctr: '16.4%', conv: '22.10%' },
        { clicks: 185, ctr: '10.5%', conv: '12.40%' }
      ],
      mobilePct: '65%',
      deskPct: '25%',
      tabPct: '10%',
      geo: {
        us: { val: '2,140 (45%)', pct: '45%' },
        in: { val: '1,380 (29%)', pct: '29%' },
        uk: { val: '620 (13%)', pct: '13%' },
        de: { val: '380 (8%)', pct: '8%' }
      }
    },
    '90 Days': {
      peaks: [1850, 2100, 1980, 2450],
      dates: ['Aug 01', 'Aug 15', 'Sep 01', 'Sep 15', 'Oct 01', 'Oct 15', 'Nov 01', 'Nov 15'],
      popoverDate: 'Sep 15:',
      popoverVisits: 2450,
      popoverClicks: 920,
      linePath: 'M 25 140 L 60 110 L 95 120 L 130 95 L 165 45 L 200 80 L 235 90 L 270 35 L 305 75 L 340 40 L 375 30 L 410 80 L 445 105 L 480 85 L 515 60',
      areaPath: 'M 25 140 L 60 110 L 95 120 L 130 95 L 165 45 L 200 80 L 235 90 L 270 35 L 305 75 L 340 40 L 375 30 L 410 80 L 445 105 L 480 85 L 515 60 L 515 200 L 25 200 Z',
      barHeights: [85, 95, 100, 90, 120, 95, 85, 130, 90, 100, 135, 95, 80, 120, 90],
      products: [
        { clicks: 4280, ctr: '15.8%', conv: '9.40%' },
        { clicks: 2940, ctr: '11.1%', conv: '7.15%' },
        { clicks: 1890, ctr: '6.4%', conv: '8.90%' },
        { clicks: 940, ctr: '18.2%', conv: '24.50%' },
        { clicks: 560, ctr: '12.0%', conv: '14.10%' }
      ],
      mobilePct: '72%',
      deskPct: '20%',
      tabPct: '8%',
      geo: {
        us: { val: '6,480 (48%)', pct: '48%' },
        in: { val: '3,650 (27%)', pct: '27%' },
        uk: { val: '1,890 (14%)', pct: '14%' },
        de: { val: '1,210 (9%)', pct: '9%' }
      }
    },
    'Lifetime': {
      peaks: [4200, 4800, 4600, 5600],
      dates: ['Jan 2026', 'Mar 2026', 'May 2026', 'Jul 2026', 'Sep 2026', 'Nov 2026', 'Jan 2027', 'Mar 2027'],
      popoverDate: 'Jul 2026:',
      popoverVisits: 5600,
      popoverClicks: 2150,
      linePath: 'M 25 150 L 60 120 L 95 130 L 130 100 L 165 35 L 200 75 L 235 85 L 270 25 L 305 65 L 340 30 L 375 20 L 410 70 L 445 95 L 480 70 L 515 45',
      areaPath: 'M 25 150 L 60 120 L 95 130 L 130 100 L 165 35 L 200 75 L 235 85 L 270 25 L 305 65 L 340 30 L 375 20 L 410 70 L 445 95 L 480 70 L 515 45 L 515 200 L 25 200 Z',
      barHeights: [95, 105, 110, 100, 130, 105, 95, 140, 100, 110, 145, 105, 90, 130, 100],
      products: [
        { clicks: 12450, ctr: '18.4%', conv: '11.20%' },
        { clicks: 8900, ctr: '13.5%', conv: '8.80%' },
        { clicks: 5400, ctr: '7.9%', conv: '10.50%' },
        { clicks: 2850, ctr: '21.0%', conv: '28.40%' },
        { clicks: 1620, ctr: '14.2%', conv: '16.80%' }
      ],
      mobilePct: '75%',
      deskPct: '18%',
      tabPct: '7%',
      geo: {
        us: { val: '18,900 (50%)', pct: '50%' },
        in: { val: '9,840 (26%)', pct: '26%' },
        uk: { val: '5,290 (14%)', pct: '14%' },
        de: { val: '3,410 (9%)', pct: '9%' }
      }
    }
  };

  let activeRange = '7 Days';

  function applyAnalyticsDataset(rangeKey) {
    activeRange = rangeKey;
    const data = analyticsDatasets[rangeKey] || analyticsDatasets['7 Days'];

    // Line & Area SVG paths
    const linePath = document.getElementById('chart-line-path');
    const areaPath = document.getElementById('chart-area-path');
    if (linePath) linePath.setAttribute('d', data.linePath);
    if (areaPath) areaPath.setAttribute('d', data.areaPath);

    // Peak text callouts
    const p1 = document.getElementById('txt-peak-1');
    const p2 = document.getElementById('txt-peak-2');
    const p3 = document.getElementById('txt-peak-3');
    const p4 = document.getElementById('txt-peak-4');
    if (p1 && data.peaks[0]) p1.textContent = data.peaks[0];
    if (p2 && data.peaks[1]) p2.textContent = data.peaks[1];
    if (p3 && data.peaks[2]) p3.textContent = data.peaks[2];
    if (p4 && data.peaks[3]) p4.textContent = data.peaks[3];

    // Popover tooltip values
    const popDate = document.getElementById('popover-date-lbl');
    const popVisits = document.getElementById('popover-visits-val');
    const popClicks = document.getElementById('popover-clicks-val');
    if (popDate) popDate.textContent = data.popoverDate;
    if (popVisits) popVisits.textContent = data.popoverVisits;
    if (popClicks) popClicks.textContent = data.popoverClicks;

    // X-Axis dates
    const xaxisRow = document.getElementById('chart-xaxis-row');
    if (xaxisRow && data.dates) {
      xaxisRow.innerHTML = data.dates.map(d => `<span>${d}</span>`).join('');
    }

    // Bar Heights
    data.barHeights.forEach((h, idx) => {
      const bar = document.getElementById(`bar-${idx}`);
      if (bar) {
        bar.setAttribute('height', h);
        bar.setAttribute('y', 200 - h);
      }
    });

    // Product Table Rows
    const tbody = document.getElementById('analytics-products-tbody');
    if (tbody && data.products) {
      const rows = tbody.querySelectorAll('tr');
      rows.forEach((row, idx) => {
        const prodData = data.products[idx];
        if (prodData) {
          const clicksCell = row.querySelector('.t-clicks');
          const ctrCell = row.querySelector('.t-ctr');
          const convCell = row.querySelector('.t-conv');
          if (clicksCell) clicksCell.textContent = prodData.clicks.toLocaleString();
          if (ctrCell) ctrCell.textContent = prodData.ctr;
          if (convCell) convCell.textContent = prodData.conv;
        }
      });
    }

    // Geographic Country Bars
    if (data.geo) {
      const bUs = document.getElementById('geo-bar-us');
      const vUs = document.getElementById('geo-val-us');
      const bIn = document.getElementById('geo-bar-in');
      const vIn = document.getElementById('geo-val-in');
      const bUk = document.getElementById('geo-bar-uk');
      const vUk = document.getElementById('geo-val-uk');
      const bDe = document.getElementById('geo-bar-de');
      const vDe = document.getElementById('geo-val-de');

      if (bUs && data.geo.us) { bUs.style.width = data.geo.us.pct; vUs.textContent = data.geo.us.val; }
      if (bIn && data.geo.in) { bIn.style.width = data.geo.in.pct; vIn.textContent = data.geo.in.val; }
      if (bUk && data.geo.uk) { bUk.style.width = data.geo.uk.pct; vUk.textContent = data.geo.uk.val; }
      if (bDe && data.geo.de) { bDe.style.width = data.geo.de.pct; vDe.textContent = data.geo.de.val; }
    }

    // Device breakdown percentages
    const mobLbl = document.getElementById('lbl-mob-pct');
    const deskLbl = document.getElementById('lbl-desk-pct');
    const tabLbl = document.getElementById('lbl-tab-pct');
    if (mobLbl) mobLbl.textContent = `Mobile (${data.mobilePct})`;
    if (deskLbl) deskLbl.textContent = `Desktop (${data.deskPct})`;
    if (tabLbl) tabLbl.textContent = `Tablet (${data.tabPct})`;

    if (syncTimestamp) syncTimestamp.textContent = 'Data last synchronized: Just now';
  }

  rangeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      rangeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const range = btn.getAttribute('data-store-range');
      applyAnalyticsDataset(range);
      showToast(`Analytics data updated for: ${range}`);
    });
  });

  if (reloadAnalyticsBtn) {
    reloadAnalyticsBtn.addEventListener('click', () => {
      reloadAnalyticsBtn.classList.add('is-spinning');
      analyticsCards.forEach(card => card.classList.add('is-updating'));
      showToast('Fetching latest live store analytics...');

      setTimeout(() => {
        reloadAnalyticsBtn.classList.remove('is-spinning');
        analyticsCards.forEach(card => card.classList.remove('is-updating'));
        applyAnalyticsDataset(activeRange);
        showToast('Live analytics data refreshed successfully!');
      }, 600);
    });
  }

  // 10. PAYMENT OPTIONS COMPLETE INTERACTIVE SUITE
  initPaymentOptionsSuite();

  // INITIALIZE CREATOR STORE SETTINGS HANDLERS
  initCreatorStoreSettings();

  // INITIALIZE APP DATA & CONNECTION STATE
  updateConnectionUI();
  loadDashboardData('30 Days');

  setTimeout(() => {
    updateSidebarCapsulePill();
    updateTimeRangeCapsulePill();
  }, 50);
}

function initPaymentOptionsSuite() {
  // Global Toast Helper Fallback
  function toast(msg) {
    try {
      if (typeof window.showToast === 'function') {
        window.showToast(msg);
      } else {
        let el = document.getElementById('global-toast-notification');
        if (!el) {
          el = document.createElement('div');
          el.id = 'global-toast-notification';
          el.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0f172a;color:#fff;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 10px 25px rgba(0,0,0,0.2);z-index:99999;transition:all 0.3s ease;';
          document.body.appendChild(el);
        }
        el.textContent = msg;
        el.style.opacity = '1';
        setTimeout(() => { if (el) el.style.opacity = '0'; }, 3000);
      }
    } catch (err) {
      console.warn('Toast display warning:', err);
    }
  }

  // Payment State Central Store (Safe Init)
  if (!window.paymentState) {
    window.paymentState = {
      totalBalance: 124580,
      availableBalance: 98050,
      pendingBalance: 26530,
      payout: {
        upiId: 'rudrateja@okaxis',
        holderName: 'Rudra Teja',
        bankName: 'HDFC Bank',
        accountNumber: '50100293844892',
        ifsc: 'HDFC0000128',
        primaryChannel: 'UPI'
      },
      transactions: [
        { id: '67300007547192', date: 'Oct 24, 2026 02:15 PM', type: 'Order Sale', amount: 98050, status: 'Cleared', customer: 'rudrateja.order@gmail.com', channel: 'Direct UPI', fee: 2941, gst: 529, net: 94580 },
        { id: '67300007547191', date: 'Oct 22, 2026 11:30 AM', type: 'Order Sale', amount: 49900, status: 'Cleared', customer: 'rudrateja.store@gmail.com', channel: 'Direct UPI', fee: 1497, gst: 269, net: 48134 },
        { id: '60380007982004', date: 'Oct 23, 2026 06:45 PM', type: 'Creator Fund', amount: 26530, status: 'Pending', customer: 'RenderReply Partner Fund', channel: 'System Credit', fee: 0, gst: 0, net: 26530 },
        { id: '89102471029471', date: 'Oct 20, 2026 04:10 PM', type: 'Withdrawal', amount: -50000, status: 'Cleared', customer: 'Payout to rudrateja@okaxis', channel: 'Direct UPI', fee: 0, gst: 0, net: -50000 },
        { id: '67300007547188', date: 'Oct 19, 2026 09:20 AM', type: 'Order Sale', amount: 14990, status: 'Cleared', customer: 'rudrateja.client@gmail.com', channel: 'Bank IMPS', fee: 449, gst: 80, net: 14461 },
        { id: 'OFFLINE-892401', date: 'Oct 18, 2026 05:00 PM', type: 'Manual Credit', amount: 5000, status: 'Cleared', customer: 'Offline Direct Client', channel: 'Manual Adjustment', fee: 0, gst: 0, net: 5000 },
        { id: '67300007547180', date: 'Oct 15, 2026 01:10 PM', type: 'Order Sale', amount: 24990, status: 'Cleared', customer: 'rudrateja.buyer@gmail.com', channel: 'Bank NEFT', fee: 749, gst: 134, net: 24107 }
      ]
    };
  }

  // 1. Safe Sync Balances to UI
  function updateBalancesUI() {
    try {
      const state = window.paymentState;
      if (!state) return;
      const totalEl = document.getElementById('display-total-balance');
      const availEl = document.getElementById('display-avail-balance');
      const pendingEl = document.getElementById('display-pending-balance');
      const wAvailEl = document.getElementById('withdraw-avail-display');

      if (totalEl) totalEl.textContent = `₹${(state.totalBalance || 0).toLocaleString('en-IN')}`;
      if (availEl) availEl.textContent = `₹${(state.availableBalance || 0).toLocaleString('en-IN')}`;
      if (pendingEl) pendingEl.textContent = `₹${(state.pendingBalance || 0).toLocaleString('en-IN')}`;
      if (wAvailEl) wAvailEl.textContent = `₹${(state.availableBalance || 0).toLocaleString('en-IN')}`;
    } catch (err) {
      console.error('Error updating balances UI:', err);
    }
  }

  // 2. Safe Sync Payout Info to UI
  function updatePayoutsUI() {
    try {
      const state = window.paymentState;
      if (!state || !state.payout) return;
      const upiSub = document.getElementById('upi-vpa-subtext');
      const bankSub = document.getElementById('bank-acc-subtext');

      if (upiSub) {
        const upi = state.payout.upiId || 'rudrateja@okaxis';
        upiSub.textContent = `${upi} • Primary Channel`;
      }
      if (bankSub) {
        const bName = state.payout.bankName || 'HDFC Bank';
        const hName = state.payout.holderName || 'Rudra Teja';
        const acc = state.payout.accountNumber || '4892';
        const last4 = acc.slice(-4);
        const ifsc = state.payout.ifsc || 'HDFC0000128';
        bankSub.textContent = `${bName} (${hName}) • •••• ${last4} (IFSC: ${ifsc})`;
      }
    } catch (err) {
      console.error('Error updating payouts UI:', err);
    }
  }

  // 3. Safe Render Transaction Table
  function renderTxnTable(tableBodyId, list) {
    try {
      const tbody = document.getElementById(tableBodyId);
      if (!tbody) return;

      if (!list || list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-muted);">No matching transactions found.</td></tr>`;
        return;
      }

      tbody.innerHTML = list.map(tx => {
        if (!tx) return '';
        const amt = tx.amount || 0;
        const isPos = amt >= 0;
        const amtDisplay = isPos ? `+ ₹${amt.toLocaleString('en-IN')}` : `- ₹${Math.abs(amt).toLocaleString('en-IN')}`;
        const amtClass = isPos ? 'cell-amount pos' : 'cell-amount neg';
        const statusClass = tx.status === 'Cleared' ? 'cleared' : (tx.status === 'Pending' ? 'pending' : 'failed');
        const txIdShort = (tx.id || '').length > 12 ? (tx.id || '').substring(0, 11) + '...' : (tx.id || '');
        const dateStr = (tx.date || '').split(' ')[0] || '';
        const timeStr = (tx.date || '').split(' ')[1] || '';

        return `
          <tr data-txid="${tx.id || ''}">
            <td>${dateStr} ${timeStr}</td>
            <td class="cell-txid" title="${tx.id || ''}">${txIdShort}</td>
            <td>${tx.type || 'Transaction'}</td>
            <td class="${amtClass}" style="text-align: right; font-weight:700;">${amtDisplay}</td>
            <td style="text-align: center;"><span class="badge-status ${statusClass}">${tx.status || 'Cleared'}</span></td>
          </tr>
        `;
      }).join('');

      tbody.querySelectorAll('tr[data-txid]').forEach(row => {
        row.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = row.getAttribute('data-txid');
          openReceiptModal(id);
        });
      });
    } catch (err) {
      console.error('Error rendering txn table:', err);
    }
  }

  // 4. Safe Filter Transactions Logic
  function getFilteredTransactions() {
    try {
      const searchVal = document.getElementById('input-txn-search')?.value.toLowerCase().trim() || '';
      const typeVal = document.getElementById('select-txn-type')?.value || 'ALL';
      const statusVal = document.getElementById('select-txn-status')?.value || 'ALL';

      if (!window.paymentState || !Array.isArray(window.paymentState.transactions)) {
        return [];
      }

      return window.paymentState.transactions.filter(tx => {
        if (!tx) return false;
        const matchSearch = !searchVal || 
          (tx.id && tx.id.toLowerCase().includes(searchVal)) || 
          (tx.type && tx.type.toLowerCase().includes(searchVal)) || 
          (tx.customer && tx.customer.toLowerCase().includes(searchVal));

        const matchType = typeVal === 'ALL' || tx.type === typeVal;
        const matchStatus = statusVal === 'ALL' || tx.status === statusVal;

        return matchSearch && matchType && matchStatus;
      });
    } catch (err) {
      console.error('Error filtering transactions:', err);
      return [];
    }
  }

  function updateTxnView() {
    const filtered = getFilteredTransactions();
    renderTxnTable('txn-table-body', filtered);
    renderTxnTable('modal-txn-table-body', filtered);
  }
  window.updateTxnView = updateTxnView;

  // 5. Safe Receipt Modal Opener
  function openReceiptModal(txId) {
    try {
      const tx = window.paymentState?.transactions?.find(t => t.id === txId);
      if (!tx) return;

      const modal = document.getElementById('modal-txn-detail');
      if (!modal) return;

      const titleEl = document.getElementById('rec-txid-title');
      const dateEl = document.getElementById('rec-date');
      const grossEl = document.getElementById('rec-gross-amt');
      const badgeEl = document.getElementById('rec-status-badge');
      const typeEl = document.getElementById('rec-type');
      const custEl = document.getElementById('rec-customer');
      const chanEl = document.getElementById('rec-channel');
      const feeEl = document.getElementById('rec-fee');
      const gstEl = document.getElementById('rec-gst');
      const netEl = document.getElementById('rec-net-amt');

      if (titleEl) titleEl.textContent = `Txn ID: #${tx.id}`;
      if (dateEl) dateEl.textContent = tx.date || '';
      const amt = tx.amount || 0;
      const isPos = amt >= 0;
      if (grossEl) grossEl.textContent = isPos ? `₹${amt.toLocaleString('en-IN')}` : `- ₹${Math.abs(amt).toLocaleString('en-IN')}`;
      
      if (badgeEl) {
        badgeEl.textContent = tx.status || 'Cleared';
        badgeEl.className = `badge-status ${tx.status === 'Cleared' ? 'cleared' : (tx.status === 'Pending' ? 'pending' : 'failed')}`;
      }

      if (typeEl) typeEl.textContent = tx.type || 'N/A';
      if (custEl) custEl.textContent = tx.customer || 'N/A';
      if (chanEl) chanEl.textContent = tx.channel || 'Standard Gateway';
      if (feeEl) feeEl.textContent = tx.fee ? `- ₹${tx.fee.toLocaleString('en-IN')}` : '₹0';
      if (gstEl) gstEl.textContent = tx.gst ? `- ₹${tx.gst.toLocaleString('en-IN')}` : '₹0';
      if (netEl) netEl.textContent = tx.net ? `₹${tx.net.toLocaleString('en-IN')}` : `₹${amt.toLocaleString('en-IN')}`;

      modal.classList.add('active');
    } catch (err) {
      console.error('Error opening receipt modal:', err);
    }
  }

  function setModalActive(modalId, active) {
    const m = document.getElementById(modalId);
    if (m) {
      if (active) m.classList.add('active');
      else m.classList.remove('active');
    }
  }

  // 6. Safe CSV Export Utility
  function exportCSV(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      const list = getFilteredTransactions();
      if (!list || list.length === 0) {
        toast('No transactions available to export.');
        return;
      }

      let csv = 'Transaction ID,Date,Type,Amount (INR),Status,Customer,Channel,Net (INR)\n';
      list.forEach(t => {
        if (!t) return;
        csv += `"${t.id || ''}","${t.date || ''}","${t.type || ''}",${t.amount || 0},"${t.status || ''}","${t.customer || ''}","${t.channel || ''}",${t.net || t.amount || 0}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `RenderReply_Transactions_${new Date().toISOString().slice(0,10)}.csv`;
      a.onclick = (evt) => { if (evt) evt.stopPropagation(); };
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      toast('Transaction CSV log exported successfully!');
    } catch (err) {
      console.error('Error exporting CSV:', err);
      toast('Failed to export CSV: ' + err.message);
    }
  }

  // ONE-TIME LISTENER BINDING GUARD (Prevents duplicate event loops)
  if (!window._paymentFormsBound) {
    window._paymentFormsBound = true;

    // Search & Filter Listeners
    const inputSearch = document.getElementById('input-txn-search');
    const modalInputSearch = document.getElementById('modal-input-txn-search');
    const selectType = document.getElementById('select-txn-type');
    const selectStatus = document.getElementById('select-txn-status');

    if (inputSearch) inputSearch.addEventListener('input', updateTxnView);
    if (modalInputSearch) modalInputSearch.addEventListener('input', updateTxnView);
    if (selectType) selectType.addEventListener('change', updateTxnView);
    if (selectStatus) selectStatus.addEventListener('change', updateTxnView);

    // CSV Export Buttons
    document.getElementById('btn-export-csv-main')?.addEventListener('click', exportCSV);
    document.getElementById('btn-export-csv-modal')?.addEventListener('click', exportCSV);

    // Live calculation for withdrawal amount input
    const inputWithdrawAmt = document.getElementById('input-withdraw-amount');
    if (inputWithdrawAmt) {
      inputWithdrawAmt.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 0;
        const reqEl = document.getElementById('w-req-amt');
        const netEl = document.getElementById('w-net-amt');
        if (reqEl) reqEl.textContent = `₹${val.toLocaleString('en-IN')}`;
        if (netEl) netEl.textContent = `₹${val.toLocaleString('en-IN')}`;
      });
    }

    // Withdraw Max button click
    const btnWithdrawMax = document.getElementById('btn-withdraw-max');
    if (btnWithdrawMax) {
      btnWithdrawMax.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const maxVal = window.paymentState?.availableBalance || 98050;
        const inputAmt = document.getElementById('input-withdraw-amount');
        const reqEl = document.getElementById('w-req-amt');
        const netEl = document.getElementById('w-net-amt');
        if (inputAmt) inputAmt.value = maxVal;
        if (reqEl) reqEl.textContent = `₹${maxVal.toLocaleString('en-IN')}`;
        if (netEl) netEl.textContent = `₹${maxVal.toLocaleString('en-IN')}`;
      });
    }

    // Print Receipt button click
    const btnPrintRec = document.getElementById('btn-print-receipt');
    if (btnPrintRec) {
      btnPrintRec.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          window.print();
        } catch (err) {
          toast('Receipt print triggered.');
        }
      });
    }

    // Backdrop click-to-close handler for modals
    document.querySelectorAll('.store-preview-modal-backdrop, .payment-modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    });

    // Form Submits with e.preventDefault() & e.stopPropagation()
    document.getElementById('form-edit-upi')?.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const upi = document.getElementById('input-payout-upi')?.value.trim();
        const holder = document.getElementById('input-upi-holder-name')?.value.trim();
        const appProvider = document.getElementById('select-upi-app')?.value || 'UPI';

        if (!upi || !upi.includes('@') || upi.length < 5) {
          toast('Invalid VPA Format! Please enter a valid UPI ID (e.g. username@okaxis or mobile@paytm).');
          return;
        }

        if (upi) window.paymentState.payout.upiId = upi;
        if (holder) window.paymentState.payout.holderName = holder;

        updatePayoutsUI();
        setModalActive('modal-edit-upi', false);
        toast(`UPI Payout Address updated to ${upi} (${appProvider})!`);
      } catch (err) {
        console.error('Error saving UPI:', err);
      }
    });

    document.getElementById('form-edit-bank')?.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const holder = document.getElementById('input-bank-name-holder')?.value.trim();
        const bankName = document.getElementById('input-bank-name')?.value.trim();
        const accNum = document.getElementById('input-bank-acc-num')?.value.trim();
        const ifsc = document.getElementById('input-bank-ifsc')?.value.trim();

        if (holder) window.paymentState.payout.holderName = holder;
        if (bankName) window.paymentState.payout.bankName = bankName;
        if (accNum) window.paymentState.payout.accountNumber = accNum;
        if (ifsc) window.paymentState.payout.ifsc = ifsc;

        updatePayoutsUI();
        setModalActive('modal-edit-bank', false);
        toast(`Bank account details saved: ${bankName} (${accNum.slice(-4)})!`);
      } catch (err) {
        console.error('Error saving bank:', err);
      }
    });

    document.getElementById('form-wallet-withdraw')?.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const amount = parseFloat(document.getElementById('input-withdraw-amount')?.value) || 0;
        const channel = document.getElementById('select-withdraw-channel')?.value || 'UPI';

        if (amount <= 0 || amount > window.paymentState.availableBalance) {
          toast(`Error: Withdrawal amount must be between ₹100 and ₹${window.paymentState.availableBalance.toLocaleString('en-IN')}!`);
          return;
        }

        const txId = `WD-${Date.now().toString().slice(-8)}`;
        const newTx = {
          id: txId,
          date: 'Just now',
          type: 'Withdrawal',
          amount: -amount,
          status: 'Cleared',
          customer: `Instant Payout via ${channel}`,
          channel: channel,
          fee: 0,
          gst: 0,
          net: -amount
        };

        window.paymentState.transactions.unshift(newTx);
        window.paymentState.availableBalance -= amount;
        window.paymentState.totalBalance -= amount;

        updateBalancesUI();
        updateTxnView();
        setModalActive('modal-wallet-withdraw', false);
        toast(`Successfully initiated instant withdrawal of ₹${amount.toLocaleString('en-IN')}!`);
      } catch (err) {
        console.error('Error executing withdrawal:', err);
      }
    });
  }

  // Initial Sync Run
  updateBalancesUI();
  updatePayoutsUI();
  updateTxnView();
}
window.initPaymentOptionsSuite = initPaymentOptionsSuite;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPaymentOptionsSuite);
} else {
  initPaymentOptionsSuite();
}

// CREATOR STOREFRONT - SETTINGS INTERACTIVITY & LIVE PREVIEW SYNC
function initCreatorStoreSettings() {
  // 1. Sub-sidebar Tab Switching
  const sidebarItems = document.querySelectorAll('.cs-sidebar-item');
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-cs-tab');
      if (!tab) return;

      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const panels = document.querySelectorAll('.cs-settings-panel');
      panels.forEach(p => {
        if (p.id === `cs-panel-${tab}`) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });

  // 2. Real-time Name Sync & Counter
  const nameInput = document.getElementById('cs-input-store-name');
  const namePrev = document.getElementById('cs-prev-name');
  const nameCount = document.getElementById('cs-name-count');
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      const val = nameInput.value || 'Rudra Teja';
      if (namePrev) namePrev.textContent = val;
      if (nameCount) nameCount.textContent = `${nameInput.value.length}/50`;
      if (!window.storeProfileState) window.storeProfileState = {};
      window.storeProfileState.name = val;
      if (window.syncStoreProfileToUI) window.syncStoreProfileToUI(window.storeProfileState);
    });
  }

  // 3. Real-time Handle Sync & Copy
  const handleInput = document.getElementById('cs-input-store-handle');
  const handleSubtext = document.querySelector('.cs-handle-subtext');
  const copyHandleBtn = document.getElementById('cs-btn-copy-handle');
  const seoUrlTxt = document.getElementById('cs-seo-url-txt');
  const topLinkPill = document.getElementById('store-official-link-pill');
  const topCopyBtn = document.getElementById('btn-copy-store-url');
  const topQrBtn = document.getElementById('btn-store-qr-code');

  if (handleInput) {
    handleInput.addEventListener('input', () => {
      const val = handleInput.value.trim() || 'rudrateja';
      if (handleSubtext) handleSubtext.textContent = `renderreply.com/store/${val}`;
      if (seoUrlTxt) seoUrlTxt.textContent = `https://renderreply.com/store/${val}`;
      if (topLinkPill) topLinkPill.textContent = `renderreply.com/store/${val}`;
      const qrImg = document.getElementById('cs-qr-img');
      const qrUrlDisp = document.getElementById('cs-qr-url-display');
      if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://renderreply.com/store/${val}`;
      if (qrUrlDisp) qrUrlDisp.textContent = `renderreply.com/store/${val}`;
    });
  }

  function copyCurrentStoreLink() {
    const handle = handleInput ? handleInput.value.trim() : 'rudrateja';
    const url = `https://renderreply.com/store/${handle}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    showToast(`Copied store link to clipboard: ${url}`);
  }

  if (copyHandleBtn) copyHandleBtn.addEventListener('click', copyCurrentStoreLink);
  if (topCopyBtn) topCopyBtn.addEventListener('click', copyCurrentStoreLink);

  // QR Code Modal Open / Close / Download
  const qrModal = document.getElementById('cs-qr-modal');
  const closeQrBtn = document.getElementById('cs-btn-close-qr');
  const downloadQrBtn = document.getElementById('cs-btn-download-qr');

  if (topQrBtn && qrModal) {
    topQrBtn.addEventListener('click', () => {
      qrModal.classList.add('active');
    });
  }

  if (closeQrBtn && qrModal) {
    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.remove('active');
    });
  }

  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) qrModal.classList.remove('active');
    });
  }

  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', () => {
      const handle = handleInput ? handleInput.value.trim() : 'rudrateja';
      const a = document.createElement('a');
      a.href = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://renderreply.com/store/${handle}`;
      a.download = `storefront-qr-${handle}.png`;
      a.target = '_blank';
      a.click();
      showToast('QR Code download initiated!');
    });
  }

  // 4. Real-time Bio Sync & Counter
  const bioInput = document.getElementById('cs-input-store-bio');
  const bioPrev = document.getElementById('cs-prev-bio');
  const bioCount = document.getElementById('cs-bio-count');
  if (bioInput) {
    bioInput.addEventListener('input', () => {
      const val = bioInput.value || 'Welcome to my SuperProfile & RenderReply Store!';
      if (bioPrev) bioPrev.textContent = val;
      if (bioCount) bioCount.textContent = `${bioInput.value.length}/160`;
      if (!window.storeProfileState) window.storeProfileState = {};
      window.storeProfileState.bio = val;
      if (window.syncStoreProfileToUI) window.syncStoreProfileToUI(window.storeProfileState);
    });
  }

  // Real-time Social Links Sync (Brand Identity Panel)
  const csInsta = document.getElementById('cs-soc-insta');
  const csYt = document.getElementById('cs-soc-yt');
  const csTw = document.getElementById('cs-soc-tw');

  [csInsta, csYt, csTw].forEach(inputEl => {
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        if (!window.storeProfileState) window.storeProfileState = {};
        if (csInsta) window.storeProfileState.insta = csInsta.value ? (csInsta.value.startsWith('@') ? csInsta.value : '@' + csInsta.value) : '';
        if (csYt) window.storeProfileState.yt = csYt.value || '';
        if (csTw) window.storeProfileState.tw = csTw.value ? (csTw.value.startsWith('@') ? csTw.value : '@' + csTw.value) : '';
        if (window.syncStoreProfileToUI) window.syncStoreProfileToUI(window.storeProfileState);
      });
    }
  });

  // 5. Change Logo Avatar (Native File Upload + Fallback Cycle)
  const changeLogoBtn = document.getElementById('cs-btn-change-logo');
  const fileLogoInput = document.getElementById('cs-file-logo');
  const logoImg = document.getElementById('cs-logo-img');
  const prevAvatar = document.getElementById('cs-prev-avatar');

  if (changeLogoBtn && fileLogoInput) {
    changeLogoBtn.addEventListener('click', () => {
      fileLogoInput.click();
    });

    fileLogoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          const newSrc = evt.target.result;
          if (logoImg) logoImg.src = newSrc;
          if (prevAvatar) prevAvatar.src = newSrc;
          if (!window.storeProfileState) window.storeProfileState = {};
          window.storeProfileState.avatar = newSrc;
          if (window.syncStoreProfileToUI) window.syncStoreProfileToUI(window.storeProfileState);
          showToast('Uploaded new store logo image!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Change Favicon File Upload
  const changeFaviconBtn = document.getElementById('cs-btn-change-favicon');
  const fileFaviconInput = document.getElementById('cs-file-favicon');
  const faviconBox = document.getElementById('cs-favicon-box');

  if (changeFaviconBtn && fileFaviconInput) {
    changeFaviconBtn.addEventListener('click', () => {
      fileFaviconInput.click();
    });

    fileFaviconInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          if (faviconBox) {
            faviconBox.innerHTML = `<img src="${evt.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" alt="Favicon">`;
          }
          if (window.syncAllStorePreviewFields) window.syncAllStorePreviewFields();
          showToast('Uploaded new favicon icon!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 6. Reset Brand Settings Button
  const resetBrandBtn = document.getElementById('cs-btn-reset-brand');
  if (resetBrandBtn) {
    resetBrandBtn.addEventListener('click', () => {
      window.storeProfileState = {
        name: 'Rudra Teja',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        bio: 'Welcome to my SuperProfile & RenderReply Store!',
        insta: '@rudrateja',
        yt: 'youtube.com/@rudrateja',
        tw: '@rudrateja'
      };
      if (handleInput) {
        handleInput.value = 'rudrateja';
        handleInput.dispatchEvent(new Event('input'));
      }
      if (window.syncStoreProfileToUI) {
        window.syncStoreProfileToUI(window.storeProfileState);
      }
      showToast('Brand identity settings reset to defaults.');
    });
  }

  // 7. HERO SECTION INTERACTIVITY & BANNER FILE UPLOAD
  const heroTitleInput = document.getElementById('cs-hero-title-input');
  const heroSubInput = document.getElementById('cs-hero-sub-input');
  const heroCtaInput = document.getElementById('cs-hero-cta-input');
  const phoneViewBtn = document.querySelector('.cs-phone-view-btn');
  const changeBannerBtn = document.getElementById('cs-btn-change-banner');
  const fileBannerInput = document.getElementById('cs-file-banner');
  const bannerPreviewGraphic = document.getElementById('cs-banner-preview-graphic');
  const phoneHero = document.querySelector('.cs-phone-hero');

  if (heroTitleInput && namePrev) {
    heroTitleInput.addEventListener('input', () => {
      namePrev.textContent = heroTitleInput.value || 'Rudra Teja';
    });
  }

  if (heroSubInput && bioPrev) {
    heroSubInput.addEventListener('input', () => {
      bioPrev.textContent = heroSubInput.value || 'Building premium Instagram businesses and automation systems.';
    });
  }

  if (heroCtaInput && phoneViewBtn) {
    heroCtaInput.addEventListener('input', () => {
      phoneViewBtn.textContent = heroCtaInput.value || 'View All Products';
    });
  }

  if (changeBannerBtn && fileBannerInput) {
    changeBannerBtn.addEventListener('click', () => {
      fileBannerInput.click();
    });

    fileBannerInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          const bgUrl = `url('${evt.target.result}') center/cover no-repeat`;
          if (bannerPreviewGraphic) bannerPreviewGraphic.style.background = bgUrl;
          if (phoneHero) phoneHero.style.background = bgUrl;
          syncAllStorePreviewFields();
          showToast('Uploaded new hero banner image!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Banner Artwork Presets Mapping
  const bannerPresetMap = {
    sunset: 'linear-gradient(180deg, #1e1b4b 0%, #311042 45%, #0f172a 100%)',
    cyber: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
    purple: 'linear-gradient(180deg, #1e1b4b 0%, #4c1d95 100%)',
    rose: 'linear-gradient(135deg, #831843 0%, #be185d 100%)',
    darkneon: 'linear-gradient(180deg, #09090b 0%, #27272a 100%)',
    gold: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)'
  };

  const bannerSwatches = document.querySelectorAll('.cs-banner-swatch');
  bannerSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      bannerSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const bannerKey = swatch.getAttribute('data-banner');
      const bg = bannerPresetMap[bannerKey] || swatch.style.background;
      if (phoneHero && bg) {
        phoneHero.style.background = bg;
        if (bannerPreviewGraphic) bannerPreviewGraphic.style.background = bg;
        syncAllStorePreviewFields();
        showToast('Hero banner preset updated on phone preview!');
      }
    });
  });

  // 8. STORE APPEARANCE & PRODUCT CARD STYLING INTERACTIVITY
  const colorSwatches = document.querySelectorAll('.cs-color-swatch');
  const customColorPicker = document.getElementById('cs-custom-color-picker');
  const phoneVerifiedBadge = document.querySelector('.cs-phone-verified-badge');

  function updatePhoneAccentColor(hexColor) {
    if (phoneViewBtn) phoneViewBtn.style.background = hexColor;
    if (phoneVerifiedBadge) phoneVerifiedBadge.style.background = hexColor;
  }

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const col = swatch.getAttribute('data-color');
      if (col) {
        updatePhoneAccentColor(col);
        showToast(`Theme accent color changed to ${col}!`);
      }
    });
  });

  if (customColorPicker) {
    customColorPicker.addEventListener('input', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      updatePhoneAccentColor(customColorPicker.value);
    });
  }

  // Product Card Customization Controls
  const pickerProdBg = document.getElementById('cs-picker-prod-bg');
  const txtProdBg = document.getElementById('cs-txt-prod-bg');
  const pickerProdPrice = document.getElementById('cs-picker-prod-price');
  const txtProdPrice = document.getElementById('cs-txt-prod-price');
  const pickerProdTitle = document.getElementById('cs-picker-prod-title');
  const txtProdTitle = document.getElementById('cs-txt-prod-title');
  const selectProdShadow = document.getElementById('cs-select-prod-shadow');
  const phoneProdItems = document.querySelectorAll('.cs-phone-prod-item');
  const phoneProdPrices = document.querySelectorAll('.cs-phone-prod-price');
  const phoneProdNames = document.querySelectorAll('.cs-phone-prod-name');

  if (pickerProdBg) {
    pickerProdBg.addEventListener('input', () => {
      const val = pickerProdBg.value;
      if (txtProdBg) txtProdBg.value = val;
      phoneProdItems.forEach(item => item.style.background = val);
    });
  }

  if (pickerProdPrice) {
    pickerProdPrice.addEventListener('input', () => {
      const val = pickerProdPrice.value;
      if (txtProdPrice) txtProdPrice.value = val;
      phoneProdPrices.forEach(item => item.style.color = val);
    });
  }

  if (pickerProdTitle) {
    pickerProdTitle.addEventListener('input', () => {
      const val = pickerProdTitle.value;
      if (txtProdTitle) txtProdTitle.value = val;
      phoneProdNames.forEach(item => item.style.color = val);
    });
  }

  if (selectProdShadow) {
    selectProdShadow.addEventListener('change', () => {
      const shadow = selectProdShadow.value;
      phoneProdItems.forEach(item => {
        item.classList.remove('shadow-subtle', 'shadow-flat', 'shadow-floating');
        item.classList.add(`shadow-${shadow}`);
      });
      showToast(`Product card elevation set to ${shadow}!`);
    });
  }

  // Typography Font Selector
  const selectFont = document.getElementById('cs-select-font');
  const phoneScreen = document.querySelector('.cs-phone-screen');

  if (selectFont && phoneScreen) {
    selectFont.addEventListener('change', () => {
      const font = selectFont.value;
      phoneScreen.style.fontFamily = `"${font}", sans-serif`;
      showToast(`Store font changed to ${font}!`);
    });
  }

  // Button Curvature Style (Rounded, Square, Pill)
  const btnStyleGroup = document.querySelectorAll('#cs-group-btn-style .cs-option-btn');
  btnStyleGroup.forEach(btn => {
    btn.addEventListener('click', () => {
      btnStyleGroup.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const style = btn.getAttribute('data-btn-style');
      if (phoneScreen) {
        phoneScreen.classList.remove('btn-rounded', 'btn-square', 'btn-pill');
        phoneScreen.classList.add(`btn-${style}`);
        showToast(`Button style changed to ${style}!`);
      }
    });
  });

  // Store Theme Mode (Dark / Light)
  const themeModeGroup = document.querySelectorAll('#cs-group-theme-mode .cs-option-btn');
  themeModeGroup.forEach(btn => {
    btn.addEventListener('click', () => {
      themeModeGroup.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-theme-mode');
      if (phoneScreen) {
        if (mode === 'light') {
          phoneScreen.classList.add('light-mode');
        } else {
          phoneScreen.classList.remove('light-mode');
        }
        showToast(`Store theme changed to ${mode} mode!`);
      }
    });
  });

  // 9. LAYOUT & DISPLAY INTERACTIVITY
  // Catalog Layout Picker
  const layoutCards = document.querySelectorAll('.cs-layout-picker-card');
  layoutCards.forEach(card => {
    card.addEventListener('click', () => {
      layoutCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const layout = card.getAttribute('data-catalog-layout');
      if (phoneScreen) {
        if (layout === 'single') {
          phoneScreen.classList.add('single-col');
        } else {
          phoneScreen.classList.remove('single-col');
        }
        showToast(`Catalog layout changed to ${layout}!`);
      }
    });
  });

  // Visibility Toggles
  const toggleProducts = document.getElementById('cs-toggle-products');
  const toggleBadge = document.getElementById('cs-toggle-badge');
  const toggleSocials = document.getElementById('cs-toggle-socials');
  const toggleFooter = document.getElementById('cs-toggle-footer');
  const phoneCard = document.querySelector('.cs-phone-card');
  const phoneSocials = document.querySelector('.cs-phone-socials');
  const phoneFooter = document.querySelector('.cs-phone-footer');

  if (toggleProducts && phoneCard) {
    toggleProducts.addEventListener('change', () => {
      phoneCard.style.display = toggleProducts.checked ? 'block' : 'none';
      showToast(toggleProducts.checked ? 'Featured products section shown' : 'Featured products section hidden');
    });
  }

  if (toggleBadge && phoneVerifiedBadge) {
    toggleBadge.addEventListener('change', () => {
      phoneVerifiedBadge.style.display = toggleBadge.checked ? 'flex' : 'none';
      showToast(toggleBadge.checked ? 'Verified badge enabled' : 'Verified badge disabled');
    });
  }

  if (toggleSocials && phoneSocials) {
    toggleSocials.addEventListener('change', () => {
      phoneSocials.style.display = toggleSocials.checked ? 'flex' : 'none';
      showToast(toggleSocials.checked ? 'Social media icons shown' : 'Social media icons hidden');
    });
  }

  if (toggleFooter && phoneFooter) {
    toggleFooter.addEventListener('change', () => {
      phoneFooter.style.display = toggleFooter.checked ? 'block' : 'none';
      showToast(toggleFooter.checked ? 'Footer branding shown' : 'Footer branding hidden');
    });
  }

  // 10. SEO CARD PREVIEW SYNC
  const seoTitleInput = document.getElementById('cs-input-seo-title');
  const seoDescInput = document.getElementById('cs-input-seo-desc');
  const seoTitleTxt = document.getElementById('cs-seo-title-txt');
  const seoDescTxt = document.getElementById('cs-seo-desc-txt');

  if (seoTitleInput && seoTitleTxt) {
    seoTitleInput.addEventListener('input', () => {
      seoTitleTxt.textContent = seoTitleInput.value || 'Rudra Teja | Official Storefront';
    });
  }

  if (seoDescInput && seoDescTxt) {
    seoDescInput.addEventListener('input', () => {
      seoDescTxt.textContent = seoDescInput.value || 'Building premium Instagram businesses and automation systems.';
    });
  }

  // 11. ADVANCED SETTINGS OVERLAYS (Age Gate & Passcode Lock)
  const toggleAgeGate = document.getElementById('cs-toggle-age-gate');

  if (toggleAgeGate && phoneScreen) {
    toggleAgeGate.addEventListener('change', () => {
      const existingOverlay = phoneScreen.querySelector('.cs-phone-age-gate-overlay');
      if (toggleAgeGate.checked) {
        if (!existingOverlay) {
          const overlay = document.createElement('div');
          overlay.className = 'cs-phone-age-gate-overlay';
          overlay.innerHTML = `
            <div class="cs-age-icon">18+</div>
            <div class="cs-age-title">Age Verification Required</div>
            <div class="cs-age-desc">This storefront contains exclusive creator content. Confirm you are 18 or older to proceed.</div>
            <button class="cs-btn-age-confirm" onclick="this.parentElement.remove()">I am 18 or older</button>
          `;
          phoneScreen.appendChild(overlay);
        }
        showToast('Age Gate overlay activated on live phone preview!');
      } else {
        if (existingOverlay) existingOverlay.remove();
        showToast('Age Gate overlay removed');
      }
    });
  }

  // 13. REAL-TIME PREVIEW STORE MODAL SYNC ENGINE
  const spmModal = document.getElementById('store-preview-modal');
  const btnOpenPreviewModal = document.getElementById('btn-open-browser-overlay');
  const btnCloseSpmModal = document.getElementById('btn-close-spm-modal');
  const spmDotClose = document.getElementById('spm-dot-close');

  function syncAllStorePreviewFields() {
    const nameVal = document.getElementById('cs-input-store-name')?.value || 'Rudra Teja';
    const bioVal = document.getElementById('cs-input-store-bio')?.value || 'Building premium Instagram businesses and automation systems.';
    const handleVal = document.getElementById('cs-input-store-handle')?.value?.trim() || 'rudrateja';
    
    // Name & Bio
    const spmName = document.getElementById('spm-creator-name');
    const spmBio = document.getElementById('spm-creator-bio');
    const dspName = document.getElementById('dsp-name-el');
    const dspBio = document.getElementById('dsp-bio-el');
    const spmUrl = document.getElementById('spm-url-txt');

    if (spmName) spmName.textContent = nameVal;
    if (spmBio) spmBio.textContent = bioVal;
    if (dspName) dspName.textContent = nameVal;
    if (dspBio) dspBio.textContent = bioVal;
    if (spmUrl) spmUrl.textContent = `https://renderreply.com/store/${handleVal}`;

    // Avatar / Logo
    const logoImgSrc = document.getElementById('cs-logo-img')?.src;
    if (logoImgSrc) {
      const spmAvatar = document.getElementById('spm-avatar-img');
      const dspAvatar = document.getElementById('dsp-avatar-el');
      if (spmAvatar) spmAvatar.src = logoImgSrc;
      if (dspAvatar) dspAvatar.src = logoImgSrc;
    }

    // Hero Banner
    const activeBannerSwatch = document.querySelector('.cs-banner-swatch.active');
    const customBannerGraphic = document.getElementById('cs-banner-preview-graphic');
    let bannerBg = customBannerGraphic?.style?.background;
    
    if (!bannerBg || bannerBg === 'none' || bannerBg === '') {
      if (activeBannerSwatch) {
        const bannerKey = activeBannerSwatch.getAttribute('data-banner');
        bannerBg = bannerPresetMap[bannerKey] || activeBannerSwatch.style.background;
      }
    }

    if (bannerBg) {
      const spmHero = document.getElementById('spm-hero-banner');
      const dspHero = document.querySelector('.dsp-hero');
      if (spmHero) spmHero.style.background = bannerBg;
      if (dspHero) dspHero.style.background = bannerBg;
    }

    // Product Card Theme Colors
    const pBg = document.getElementById('cs-picker-prod-bg')?.value;
    const pPrice = document.getElementById('cs-picker-prod-price')?.value;
    const pTitle = document.getElementById('cs-picker-prod-title')?.value;

    if (pBg) {
      document.querySelectorAll('.spm-prod-card').forEach(card => card.style.background = pBg);
    }
    if (pPrice) {
      document.querySelectorAll('.spm-prod-price').forEach(el => el.style.color = pPrice);
    }
    if (pTitle) {
      document.querySelectorAll('.spm-prod-title').forEach(el => el.style.color = pTitle);
    }

    // Primary Accent Color
    const activeColorSwatch = document.querySelector('.cs-color-swatch.active');
    const accentCol = activeColorSwatch?.getAttribute('data-color') || document.getElementById('cs-custom-color-picker')?.value || '#4f46e5';
    if (accentCol) {
      const spmBadge = document.getElementById('spm-verified-badge');
      if (spmBadge) spmBadge.style.background = accentCol;
      document.querySelectorAll('.spm-btn-buy').forEach(btn => {
        btn.style.background = `linear-gradient(135deg, ${accentCol}, #6366f1)`;
      });
    }
  }

  // Open Preview Store Modal
  if (btnOpenPreviewModal && spmModal) {
    btnOpenPreviewModal.addEventListener('click', (e) => {
      e.preventDefault();
      syncAllStorePreviewFields();
      spmModal.classList.add('active');
      showToast('Opening Live Storefront Preview Window...');
    });
  }

  // Also hook external store open button to open store in new tab (not modal)
  const btnOpenExternal = document.getElementById('btn-open-store-external');
  if (btnOpenExternal) {
    btnOpenExternal.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rawUrl = document.getElementById('store-official-link-pill')?.textContent.trim() || 'renderreply.com/store/rajeev';
      const storeUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
      window.open(storeUrl, '_blank');
      showToast(`Opening live storefront in a new tab: ${storeUrl}`);
    });
  }

  // Hook Bio Link Page Preview & Copy buttons
  const btnPreviewBiolink = document.getElementById('btn-preview-biolink');
  const spmUrlTxt = document.getElementById('spm-url-txt');
  if (btnPreviewBiolink && spmModal) {
    btnPreviewBiolink.addEventListener('click', (e) => {
      e.preventDefault();
      syncAllStorePreviewFields();
      if (spmUrlTxt) spmUrlTxt.textContent = 'https://renderreply.com/p/render6457';
      spmModal.classList.add('active');
      showToast('Opening Live Bio Link Preview Window...');
    });
  }

  const btnCopyLink = document.getElementById('btn-copy-link');
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('https://renderreply.com/p/render6457');
      }
      showToast('Bio Link copied: https://renderreply.com/p/render6457');
    });
  }

  const btnSaveBiolink = document.getElementById('btn-save-biolink');
  if (btnSaveBiolink) {
    btnSaveBiolink.addEventListener('click', () => {
      showToast('Bio Link Page configuration saved successfully!');
    });
  }

  // Close Preview Store Modal
  if (btnCloseSpmModal && spmModal) {
    btnCloseSpmModal.addEventListener('click', () => {
      spmModal.classList.remove('active');
    });
  }

  if (spmDotClose && spmModal) {
    spmDotClose.addEventListener('click', () => {
      spmModal.classList.remove('active');
    });
  }

  if (spmModal) {
    spmModal.addEventListener('click', (e) => {
      if (e.target === spmModal) spmModal.classList.remove('active');
    });
  }

  // Attach live inputs to trigger syncAllStorePreviewFields
  const syncInputIds = [
    'cs-input-store-name',
    'cs-input-store-bio',
    'cs-input-store-handle',
    'cs-hero-title-input',
    'cs-hero-sub-input',
    'cs-hero-cta-input',
    'cs-picker-prod-bg',
    'cs-picker-prod-price',
    'cs-picker-prod-title',
    'cs-custom-color-picker'
  ];

  syncInputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', syncAllStorePreviewFields);
      el.addEventListener('change', syncAllStorePreviewFields);
    }
  });

  // 14. CUSTOMER AUTHENTICATION & ORDER HISTORY DASHBOARD LOGIC
  const storeAuthModal = document.getElementById('store-auth-modal');
  const btnOpenAuth = document.getElementById('spm-btn-open-auth');
  const btnEcomOpenAuth = document.getElementById('btn-ecom-open-auth');
  const btnCloseAuth = document.getElementById('btn-close-auth-modal');
  const authTabLogin = document.getElementById('auth-tab-login');
  const authTabSignup = document.getElementById('auth-tab-signup');
  const authModalTitle = document.getElementById('auth-modal-title');
  const btnSubmitAuth = document.getElementById('btn-submit-auth');
  const formCustomerLogin = document.getElementById('form-customer-login');
  const btnGoogleLogin = document.getElementById('btn-google-login');

  const customerOrdersModal = document.getElementById('customer-orders-modal');
  const btnUserAccount = document.getElementById('spm-btn-user-account');
  const btnEcomUserAccount = document.getElementById('ecom-btn-user-account');
  const btnCloseOrders = document.getElementById('btn-close-orders-modal');
  const btnLogout = document.getElementById('spm-btn-logout');
  const btnEcomLogout = document.getElementById('ecom-btn-logout');

  const userLoggedInBox = document.getElementById('spm-user-logged-in-box');
  const ecomUserLoggedInBox = document.getElementById('ecom-user-logged-in-box');
  const userEmailTxt = document.getElementById('spm-user-email-txt');
  const ecomUserEmailTxt = document.getElementById('ecom-user-email-txt');
  const ordersUserEmailDisp = document.getElementById('orders-user-email-display');

  let currentAuthMode = 'login';
  let loggedInCustomerEmail = null;

  if (btnOpenAuth && storeAuthModal) {
    btnOpenAuth.addEventListener('click', () => {
      storeAuthModal.classList.add('active');
    });
  }

  if (btnEcomOpenAuth && storeAuthModal) {
    btnEcomOpenAuth.addEventListener('click', () => {
      storeAuthModal.classList.add('active');
    });
  }

  if (btnCloseAuth && storeAuthModal) {
    btnCloseAuth.addEventListener('click', () => {
      storeAuthModal.classList.remove('active');
    });
  }

  if (storeAuthModal) {
    storeAuthModal.addEventListener('click', (e) => {
      if (e.target === storeAuthModal) storeAuthModal.classList.remove('active');
    });
  }

  if (authTabLogin && authTabSignup) {
    authTabLogin.addEventListener('click', () => {
      currentAuthMode = 'login';
      authTabLogin.classList.add('active');
      authTabSignup.classList.remove('active');
      if (authModalTitle) authModalTitle.textContent = 'Welcome Back to Storefront';
      if (btnSubmitAuth) btnSubmitAuth.textContent = 'Sign In to Account';
    });

    authTabSignup.addEventListener('click', () => {
      currentAuthMode = 'signup';
      authTabSignup.classList.add('active');
      authTabLogin.classList.remove('active');
      if (authModalTitle) authModalTitle.textContent = 'Create Customer Account';
      if (btnSubmitAuth) btnSubmitAuth.textContent = 'Create Account & Access Orders';
    });
  }

  function handleSuccessfulLogin(email) {
    loggedInCustomerEmail = email || 'rudrateja@gmail.com';
    if (userEmailTxt) userEmailTxt.textContent = loggedInCustomerEmail;
    if (ecomUserEmailTxt) ecomUserEmailTxt.textContent = loggedInCustomerEmail;
    if (ordersUserEmailDisp) ordersUserEmailDisp.textContent = loggedInCustomerEmail;

    if (btnOpenAuth) btnOpenAuth.style.display = 'none';
    if (btnEcomOpenAuth) btnEcomOpenAuth.style.display = 'none';
    if (userLoggedInBox) userLoggedInBox.style.display = 'flex';
    if (ecomUserLoggedInBox) ecomUserLoggedInBox.style.display = 'flex';
    if (storeAuthModal) storeAuthModal.classList.remove('active');

    showToast(`Logged in successfully as ${loggedInCustomerEmail}!`);
  }

  if (formCustomerLogin) {
    formCustomerLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-input-email')?.value || 'rudrateja@gmail.com';
      handleSuccessfulLogin(email);
    });
  }

  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener('click', () => {
      handleSuccessfulLogin('rudrateja@gmail.com');
    });
  }

  // Open Orders & Downloads Dashboard
  if (btnUserAccount && customerOrdersModal) {
    btnUserAccount.addEventListener('click', () => {
      customerOrdersModal.classList.add('active');
    });
  }

  if (btnEcomUserAccount && customerOrdersModal) {
    btnEcomUserAccount.addEventListener('click', () => {
      customerOrdersModal.classList.add('active');
    });
  }

  if (btnCloseOrders && customerOrdersModal) {
    btnCloseOrders.addEventListener('click', () => {
      customerOrdersModal.classList.remove('active');
    });
  }

  if (customerOrdersModal) {
    customerOrdersModal.addEventListener('click', (e) => {
      if (e.target === customerOrdersModal) customerOrdersModal.classList.remove('active');
    });
  }

  // Logout Handler
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      loggedInCustomerEmail = null;
      if (userLoggedInBox) userLoggedInBox.style.display = 'none';
      if (ecomUserLoggedInBox) ecomUserLoggedInBox.style.display = 'none';
      if (btnOpenAuth) btnOpenAuth.style.display = 'inline-flex';
      if (btnEcomOpenAuth) btnEcomOpenAuth.style.display = 'inline-flex';
      if (customerOrdersModal) customerOrdersModal.classList.remove('active');
      showToast('Logged out of customer account.');
    });
  }

  if (btnEcomLogout) {
    btnEcomLogout.addEventListener('click', () => {
      loggedInCustomerEmail = null;
      if (userLoggedInBox) userLoggedInBox.style.display = 'none';
      if (ecomUserLoggedInBox) ecomUserLoggedInBox.style.display = 'none';
      if (btnOpenAuth) btnOpenAuth.style.display = 'inline-flex';
      if (btnEcomOpenAuth) btnEcomOpenAuth.style.display = 'inline-flex';
      if (customerOrdersModal) customerOrdersModal.classList.remove('active');
      showToast('Logged out of customer account.');
    });
  }

  // Initial Sync
  syncAllStorePreviewFields();
  if (window.syncStoreProfileToUI) {
    window.syncStoreProfileToUI(window.storeProfileState);
  }
  loadDashboardData('30 Days');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


/* ==========================================================================
   BIO LINK PAGE BUILDER - REAL-TIME LIVE PREVIEW INTERACTIVITY LOGIC
   ========================================================================== */
function initBioLinkBuilder() {
  const bioState = {
    title: '',
    bio: '',
    links: [],
    video1: '',
    video2: '',
    socials: [],
    theme: 'indigo-slate',
    font: 'jakarta',
    shape: 'circle',
    btnStyle: 'pill'
  };

  // 1. Subtabs switching
  const tabBtns = document.querySelectorAll('.biolink-tab-btn');
  const tabPanels = document.querySelectorAll('.biolink-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-biolink-tab');
      if (!targetTab) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanels.forEach(panel => {
        if (panel.id === `biolink-tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 2. Custom Title & Bio inputs
  const inputTitle = document.getElementById('biolink-input-title');
  const inputBio = document.getElementById('biolink-input-bio');
  const displayTitle = document.getElementById('phone-display-title');
  const displayBio = document.getElementById('phone-display-bio');
  const wordCount = document.getElementById('biolink-word-count');

  if (inputBio && displayBio) {
    inputBio.value = bioState.bio;
  }

  function updateTitleAndBio() {
    if (inputTitle && displayTitle) {
      const titleVal = inputTitle.value.trim();
      if (titleVal) {
        displayTitle.textContent = titleVal;
        displayTitle.style.display = 'block';
      } else {
        displayTitle.style.display = 'none';
      }
    }

    if (inputBio && displayBio) {
      const bioVal = inputBio.value;
      displayBio.textContent = bioVal || 'Helping creators automate Instagram & convert followers into leads.';
      
      // Word count
      const words = bioVal.trim() ? bioVal.trim().split(/\s+/).length : 0;
      if (wordCount) {
        wordCount.textContent = `${words} / 80 words`;
      }
    }
  }

  if (inputTitle) inputTitle.addEventListener('input', updateTitleAndBio);
  if (inputBio) inputBio.addEventListener('input', updateTitleAndBio);

  // 3. Featured Links
  const linkLabelInput = document.getElementById('link-input-label');
  const linkUrlInput = document.getElementById('link-input-url');
  const linkColorInput = document.getElementById('link-input-color');
  const btnAddLink = document.getElementById('btn-add-link-item');
  const linksContainer = document.getElementById('biolink-links-list-container');
  const phoneLinksRender = document.getElementById('phone-links-render');

  function renderLinks() {
    if (!linksContainer || !phoneLinksRender) return;

    if (bioState.links.length === 0) {
      linksContainer.innerHTML = `<div class="empty-links-state">No custom links added yet.</div>`;
      phoneLinksRender.innerHTML = '';
      return;
    }

    // Builder list view
    linksContainer.innerHTML = bioState.links.map((link, idx) => `
      <div class="link-item-row">
        <div class="link-item-info">
          <span class="link-item-title">${escapeHtml(link.label)}</span>
          <span class="link-item-url">${escapeHtml(link.url)}</span>
        </div>
        <button class="link-item-delete" data-delete-link="${idx}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    `).join('');

    // Phone preview render
    phoneLinksRender.innerHTML = bioState.links.map(link => `
      <a href="${escapeHtml(link.url)}" target="_blank" class="phone-link-card color-${link.color}">${escapeHtml(link.label)}</a>
    `).join('');

    // Attach delete handlers
    linksContainer.querySelectorAll('[data-delete-link]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-delete-link'));
        bioState.links.splice(idx, 1);
        renderLinks();
      });
    });
  }

  if (btnAddLink) {
    btnAddLink.addEventListener('click', (e) => {
      e.preventDefault();
      const label = linkLabelInput ? linkLabelInput.value.trim() : '';
      const url = linkUrlInput ? linkUrlInput.value.trim() : '';
      const color = linkColorInput ? linkColorInput.value : 'accent';

      if (!label || !url) {
        if (typeof showToast === 'function') showToast('Please enter both Link Label and URL.');
        return;
      }

      bioState.links.push({ label, url, color });
      if (linkLabelInput) linkLabelInput.value = '';
      if (linkUrlInput) linkUrlInput.value = '';
      renderLinks();
      if (typeof showToast === 'function') showToast('Featured link added!');
    });
  }

  // 4. Featured Videos
  const inputVid1 = document.getElementById('biolink-input-video1');
  const inputVid2 = document.getElementById('biolink-input-video2');
  const phoneVideosRender = document.getElementById('phone-videos-render');

  function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  }

  function renderVideos() {
    if (!phoneVideosRender) return;
    const v1Embed = getYouTubeEmbedUrl(inputVid1 ? inputVid1.value.trim() : '');
    const v2Embed = getYouTubeEmbedUrl(inputVid2 ? inputVid2.value.trim() : '');

    let html = '';
    if (v1Embed) html += `<div class="phone-video-card"><iframe src="${v1Embed}" allowfullscreen></iframe></div>`;
    if (v2Embed) html += `<div class="phone-video-card"><iframe src="${v2Embed}" allowfullscreen></iframe></div>`;
    phoneVideosRender.innerHTML = html;
  }

  if (inputVid1) inputVid1.addEventListener('input', renderVideos);
  if (inputVid2) inputVid2.addEventListener('input', renderVideos);

  // 5. Social Profiles Toggle
  const btnToggleSocial = document.getElementById('btn-toggle-social-menu');
  const socialDropdown = document.getElementById('social-menu-dropdown');

  if (btnToggleSocial && socialDropdown) {
    btnToggleSocial.addEventListener('click', (e) => {
      e.stopPropagation();
      socialDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      socialDropdown.classList.remove('active');
    });
  }

  // 6. Themes & Style Options
  const phoneScreen = document.getElementById('phone-screen');
  const themeCards = document.querySelectorAll('.theme-card-option');

  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      const theme = card.getAttribute('data-theme');
      if (!theme) return;

      themeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (phoneScreen) {
        phoneScreen.className = phoneScreen.className.split(' ').filter(c => !c.startsWith('theme-')).join(' ').trim();
        phoneScreen.classList.add(`theme-${theme}`);
      }
    });
  });

  // Typography Options
  const fontBtns = document.querySelectorAll('[data-font]');
  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const font = btn.getAttribute('data-font');
      if (!font) return;

      fontBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (phoneScreen) {
        phoneScreen.className = phoneScreen.className.split(' ').filter(c => !c.startsWith('font-')).join(' ').trim();
        phoneScreen.classList.add(`font-${font}`);
      }
    });
  });

  // Profile Image Shape Options
  const shapeBtns = document.querySelectorAll('[data-shape]');
  const phoneAvatarBox = document.getElementById('phone-avatar-box');
  shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const shape = btn.getAttribute('data-shape');
      if (!shape) return;

      shapeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (phoneAvatarBox) {
        phoneAvatarBox.className = `phone-avatar shape-${shape}`;
      }
    });
  });

  // Featured Button Card Style
  const btnStyleBtns = document.querySelectorAll('[data-btnstyle]');
  btnStyleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const btnstyle = btn.getAttribute('data-btnstyle');
      if (!btnstyle) return;

      btnStyleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (phoneLinksRender) {
        phoneLinksRender.className = `phone-links-render btn-shape-${btnstyle}`;
      }
    });
  });

  // Save Changes & Copy Link Handlers
  const btnSaveBio = document.getElementById('btn-save-biolink');
  if (btnSaveBio) {
    btnSaveBio.addEventListener('click', () => {
      if (typeof showToast === 'function') showToast('Bio Link Page builder configuration saved successfully!');
    });
  }

  const btnCopyBioLink = document.getElementById('btn-copy-link');
  if (btnCopyBioLink) {
    btnCopyBioLink.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('https://renderreply.com/p/render6457');
      }
      if (typeof showToast === 'function') showToast('Bio Link copied: https://renderreply.com/p/render6457');
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBioLinkBuilder);
} else {
  initBioLinkBuilder();
}


/* ==========================================================================
   CAPTURED LEADS INTERACTIVITY LOGIC
   ========================================================================== */
function initCapturedLeadsPage() {
  const btnRefreshLeads = document.getElementById('btn-refresh-leads');
  const btnExportCsv = document.getElementById('btn-export-csv');
  const inputSearchLeads = document.getElementById('input-search-leads');

  if (btnRefreshLeads) {
    btnRefreshLeads.addEventListener('click', () => {
      if (typeof showToast === 'function') showToast('Refreshing captured leads data...');
    });
  }

  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      if (typeof showToast === 'function') showToast('Exporting captured leads to CSV...');
    });
  }

  if (inputSearchLeads) {
    inputSearchLeads.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const emptyStateBox = document.querySelector('.leads-empty-state-box');
      if (emptyStateBox) {
        const descEl = emptyStateBox.querySelector('.leads-empty-desc');
        if (descEl) {
          if (query) {
            descEl.textContent = `No captured activities found matching "${query}".`;
          } else {
            descEl.textContent = 'No interaction activity matched your selected search or filter criteria.';
          }
        }
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCapturedLeadsPage);
} else {
  initCapturedLeadsPage();
}
