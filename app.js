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
  let currentRange = '7 Days';

  // HELPER SVG GENERATOR FOR PERFECT GRAPH RENDERING
  function createChartSvg(options) {
    const { yTop = '0', yBottom = '0', xLabels = ['6', '7', '8', '9', '10', '11', '12'], points = [], strokeColor = '#0f172a', fillColor = null } = options;
    const xCoords = [35, 75, 117, 159, 201, 243, 285];

    let pathD = '';
    let areaD = '';

    if (points && points.length > 0) {
      pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xCoords[i]},${p}`).join(' ');
      if (fillColor) {
        areaD = `${pathD} L ${xCoords[points.length - 1]},90 L ${xCoords[0]},90 Z`;
      }
    } else {
      pathD = `M ${xCoords[0]},90 L ${xCoords[xCoords.length - 1]},90`;
    }

    return `
      <svg viewBox="0 0 310 135" style="width: 100%; height: 100%;">
        ${fillColor ? `
        <defs>
          <linearGradient id="chartFillGrad_${Math.random().toString(36).substr(2, 9)}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.0"/>
          </linearGradient>
        </defs>` : ''}
        
        <line x1="30" y1="30" x2="290" y2="30" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
        <line x1="30" y1="90" x2="290" y2="90" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
        
        <text x="20" y="34" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="end">${yTop}</text>
        <text x="20" y="94" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="end">${yBottom}</text>

        ${fillColor && areaD ? `<path d="${areaD}" fill="url(#chartFillGrad)" />` : ''}

        <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>

        ${xCoords.map((x, i) => {
          const y = (points && points[i] !== undefined) ? points[i] : 90;
          return `<circle cx="${x}" cy="${y}" r="4" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.2"/>`;
        }).join('')}

        ${xLabels.map((lbl, i) => `
          <text x="${xCoords[i]}" y="116" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="middle">${lbl}</text>
        `).join('')}
      </svg>
    `;
  }

  // DATA FOR TIME RANGES
  const DASHBOARD_DATA = {
    '7 Days': {
      followers: '0',
      following: '1',
      views: '7',
      comments: '5',
      replies: '2',
      sentToday: '0',
      activeRules: '1',
      leads: '0',
      repliesSubtitle: 'Automation activity over the last 7 days.',
      followersSubtitle: 'Follower growth over the last 7 days.',
      leadsSubtitle: 'Leads captured over the last 7 days.',
      repliesSvg: createChartSvg({
        yTop: '2', yBottom: '0',
        xLabels: ['0', '7', '8', '9', '10', '11', '12'],
        points: [30, 90, 90, 90, 90, 90, 90],
        strokeColor: '#0f172a',
        fillColor: '#0f172a'
      }),
      followersSvg: createChartSvg({
        yTop: '0', yBottom: '0',
        xLabels: ['0', '7', '8', '9', '10', '11', '12'],
        points: [90, 90, 90, 90, 90, 90, 90],
        strokeColor: '#64748b'
      }),
      leadsSvg: createChartSvg({
        yTop: '0', yBottom: '0',
        xLabels: ['0', '7', '8', '9', '10', '11', '12'],
        points: [90, 90, 90, 90, 90, 90, 90],
        strokeColor: '#8b5cf6'
      })
    },
    '30 Days': {
      followers: '48',
      following: '12',
      views: '1,240',
      comments: '184',
      replies: '96',
      sentToday: '14',
      activeRules: '3',
      leads: '28',
      repliesSubtitle: 'Automation activity over the last 30 days.',
      followersSubtitle: 'Follower growth over the last 30 days.',
      leadsSubtitle: 'Leads captured over the last 30 days.',
      repliesSvg: createChartSvg({
        yTop: '40', yBottom: '0',
        xLabels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
        points: [85, 70, 45, 60, 30, 35, 15],
        strokeColor: '#2563eb',
        fillColor: '#2563eb'
      }),
      followersSvg: createChartSvg({
        yTop: '20', yBottom: '0',
        xLabels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
        points: [80, 70, 60, 50, 40, 30, 20],
        strokeColor: '#10b981'
      }),
      leadsSvg: createChartSvg({
        yTop: '15', yBottom: '0',
        xLabels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
        points: [85, 75, 55, 45, 30, 25, 18],
        strokeColor: '#8b5cf6'
      })
    },
    '90 Days': {
      followers: '210',
      following: '45',
      views: '8,920',
      comments: '640',
      replies: '412',
      sentToday: '22',
      activeRules: '5',
      leads: '114',
      repliesSubtitle: 'Automation activity over the last 90 days.',
      followersSubtitle: 'Follower growth over the last 90 days.',
      leadsSubtitle: 'Leads captured over the last 90 days.',
      repliesSvg: createChartSvg({
        yTop: '120', yBottom: '0',
        xLabels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        points: [90, 75, 55, 40, 45, 25, 10],
        strokeColor: '#059669',
        fillColor: '#059669'
      }),
      followersSvg: createChartSvg({
        yTop: '80', yBottom: '0',
        xLabels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        points: [85, 70, 55, 45, 35, 25, 15],
        strokeColor: '#10b981'
      }),
      leadsSvg: createChartSvg({
        yTop: '50', yBottom: '0',
        xLabels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        points: [88, 72, 58, 42, 30, 20, 12],
        strokeColor: '#8b5cf6'
      })
    },
    'Lifetime': {
      followers: '840',
      following: '120',
      views: '45,600',
      comments: '3,410',
      replies: '2,890',
      sentToday: '35',
      activeRules: '8',
      leads: '520',
      repliesSubtitle: 'All-time automation activity.',
      followersSubtitle: 'All-time follower growth.',
      leadsSubtitle: 'All-time leads captured.',
      repliesSvg: createChartSvg({
        yTop: '500', yBottom: '0',
        xLabels: ['2023', 'Q1', 'Q2', 'Q3', 'Q4', '2025', '2026'],
        points: [95, 80, 60, 45, 30, 20, 10],
        strokeColor: '#7c3aed',
        fillColor: '#7c3aed'
      }),
      followersSvg: createChartSvg({
        yTop: '300', yBottom: '0',
        xLabels: ['2023', 'Q1', 'Q2', 'Q3', 'Q4', '2025', '2026'],
        points: [90, 75, 60, 45, 30, 20, 10],
        strokeColor: '#10b981'
      }),
      leadsSvg: createChartSvg({
        yTop: '200', yBottom: '0',
        xLabels: ['2023', 'Q1', 'Q2', 'Q3', 'Q4', '2025', '2026'],
        points: [92, 78, 62, 44, 28, 18, 8],
        strokeColor: '#8b5cf6'
      })
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

  // Stats Element IDs
  const statIds = {
    followers: document.getElementById('stat-followers'),
    following: document.getElementById('stat-following'),
    views: document.getElementById('stat-views'),
    comments: document.getElementById('stat-comments'),
    replies: document.getElementById('stat-replies'),
    sentToday: document.getElementById('stat-sent-today'),
    activeRules: document.getElementById('stat-active-rules'),
    leads: document.getElementById('stat-captured-leads')
  };

  // Chart Containers
  const chartReplies = document.getElementById('chart-replies-container');
  const chartFollowers = document.getElementById('chart-followers-container');
  const chartLeads = document.getElementById('chart-leads-container');

  const subReplies = document.getElementById('subtitle-replies');
  const subFollowers = document.getElementById('subtitle-followers');
  const subLeads = document.getElementById('subtitle-leads');

  // Account Row Elements
  const accountInfoContainer = document.getElementById('account-info-container');
  const accountActionContainer = document.getElementById('account-action-container');

  // 1. SKELETON LOADING SHIMMER ANIMATION FOR THE WHOLE PAGE
  function showSkeletonLoading() {
    Object.values(statIds).forEach(el => {
      if (el) el.innerHTML = '<span class="skeleton skeleton-text"></span>';
    });

    if (chartReplies) chartReplies.innerHTML = '<span class="skeleton skeleton-chart"></span>';
    if (chartFollowers) chartFollowers.innerHTML = '<span class="skeleton skeleton-chart"></span>';
    if (chartLeads) chartLeads.innerHTML = '<span class="skeleton skeleton-chart"></span>';
  }

  // 2. LOAD DASHBOARD DATA FUNCTION
  function loadDashboardData(range = '7 Days') {
    currentRange = range;
    showSkeletonLoading();

    setTimeout(() => {
      if (!isConnected) {
        Object.values(statIds).forEach(el => {
          if (el) el.textContent = '0';
        });

        if (chartReplies) {
          chartReplies.innerHTML = `
            <div class="chart-empty-state">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6" stroke-linecap="round"/></svg>
              <span>No activity data available.</span>
            </div>`;
        }

        if (chartFollowers) {
          chartFollowers.innerHTML = `
            <div class="chart-empty-state">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>No growth data available.</span>
            </div>`;
        }

        if (chartLeads) {
          chartLeads.innerHTML = createChartSvg({
            yTop: '0', yBottom: '0',
            xLabels: ['6', '7', '8', '9', '10', '11', '12'],
            points: [90, 90, 90, 90, 90, 90, 90],
            strokeColor: '#8b5cf6'
          });
        }
        return;
      }

      const data = DASHBOARD_DATA[range] || DASHBOARD_DATA['7 Days'];

      if (statIds.followers) statIds.followers.textContent = data.followers;
      if (statIds.following) statIds.following.textContent = data.following;
      if (statIds.views) statIds.views.textContent = data.views;
      if (statIds.comments) statIds.comments.textContent = data.comments;
      if (statIds.replies) statIds.replies.textContent = data.replies;
      if (statIds.sentToday) statIds.sentToday.textContent = data.sentToday;
      if (statIds.activeRules) statIds.activeRules.textContent = data.activeRules;
      if (statIds.leads) statIds.leads.textContent = data.leads;

      if (subReplies) subReplies.textContent = data.repliesSubtitle;
      if (subFollowers) subFollowers.textContent = data.followersSubtitle;
      if (subLeads) subLeads.textContent = data.leadsSubtitle;

      if (chartReplies) chartReplies.innerHTML = data.repliesSvg;
      if (chartFollowers) chartFollowers.innerHTML = data.followersSvg;
      if (chartLeads) chartLeads.innerHTML = data.leadsSvg;
    }, 400);
  }

  // 3. TOGGLE CONNECTION STATE
  function updateConnectionUI() {
    if (!accountInfoContainer || !accountActionContainer) return;

    if (isConnected) {
      accountInfoContainer.innerHTML = `
        <div class="account-icon">R</div>
        <div class="account-details">
          <span class="account-handle">@render6457</span>
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

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      tabViews.forEach(view => {
        if (view.id === `${targetTab}-view`) {
          view.classList.add('active');
          triggerReloadAnimation(view);
        } else {
          view.classList.remove('active');
        }
      });
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

      showToast(`Loading metrics for ${selectedRange}...`);
      loadDashboardData(selectedRange);
    });
  });

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
  const refreshBtns = document.querySelectorAll('.btn-refresh');
  refreshBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Refreshing page data...');
      loadDashboardData(currentRange);
    });
  });

  // 9. LIVE INBOX DM INTERACTION
  const chatInputMsg = document.getElementById('chat-input-msg');
  const btnSendChat = document.getElementById('btn-send-chat');
  const chatFeedBox = document.getElementById('chat-feed-box');

  if (btnSendChat && chatInputMsg) {
    btnSendChat.addEventListener('click', () => {
      const text = chatInputMsg.value.trim();
      if (text && chatFeedBox) {
        const newMsg = document.createElement('div');
        newMsg.className = 'msg-bubble bot';
        newMsg.innerHTML = `<span class="msg-tag">RudRa (Human Agent)</span>${text}`;
        chatFeedBox.appendChild(newMsg);
        chatInputMsg.value = '';
        chatFeedBox.scrollTop = chatFeedBox.scrollHeight;
        showToast('DM message sent to @alex_creator');
      }
    });
  }

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

  function renderGallery() {
    if (!modalProdGallery) return;
    modalProdGallery.innerHTML = '';

    uploadedPhotos.forEach((url, idx) => {
      const item = document.createElement('div');
      item.className = `gallery-thumb-item ${url === currentPhotoUrl ? 'active' : ''}`;
      item.innerHTML = `
        <img src="${url}" alt="Photo ${idx + 1}">
        ${uploadedPhotos.length > 1 ? `<button type="button" class="gallery-thumb-remove" title="Remove photo">✕</button>` : ''}
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
      showToast('Photo removed from gallery');
    }
  };

  function openProductModal() {
    window.openProductStudio();
    renderGallery();
  }

  function closeProductModal() {
    window.closeProductStudio();
  }

  if (btnAddAmazonProd) {
    btnAddAmazonProd.addEventListener('click', openProductModal);
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
      price: '$19.99',
      oldPrice: '$39.99',
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
      price: '$49.00',
      oldPrice: '$99.00',
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
      oldPrice: '$19.99',
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
      if (document.getElementById('modal-prod-title')) document.getElementById('modal-prod-title').value = prod.title;
      if (document.getElementById('modal-prod-price')) document.getElementById('modal-prod-price').value = prod.price.replace('$', '');
      if (document.getElementById('modal-prod-desc')) document.getElementById('modal-prod-desc').value = prod.desc;
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
        const card = document.createElement('div');
        card.className = 'catalog-prod-card';
        card.innerHTML = `
          <div class="catalog-img-wrapper">
            <img src="${prod.photos[0]}" alt="${prod.title}">
            <span class="prod-badge-tag">${prod.price === 'FREE' ? 'Lead Magnet' : 'Digital Guide'}</span>
          </div>
          <div class="catalog-prod-body">
            <div class="prod-title-price">
              <div class="prod-name">${prod.title}</div>
              <div class="prod-price ${prod.price === 'FREE' ? 'free' : ''}">${prod.price}</div>
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
    window.storeProductsRef = storeProducts;
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
      } else if (!priceVal.startsWith('$')) {
        formattedPrice = `$${priceVal}`;
      }

      let formattedOldPrice = oldPriceVal;
      if (oldPriceVal && !oldPriceVal.startsWith('$')) {
        formattedOldPrice = `$${oldPriceVal}`;
      }

      if (!ctaText) {
        ctaText = formattedPrice === 'FREE' ? 'Download Now' : 'Instant Access';
      }

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
      renderStoreProductsAndSyncPreview();
      closeProductModal();
      showToast(`Published "${title}" (${formattedPrice}) to Creator Storefront!`);
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

  // STREAMLINED NON-INTRUSIVE CHANGE AVATAR (REMOVED PROMPT BLOCKER)
  const btnChangeAvatar = document.getElementById('btn-change-avatar');
  if (btnChangeAvatar) {
    btnChangeAvatar.addEventListener('click', (e) => {
      e.preventDefault();
      // Cycle avatar sample image smoothly without blocking modal prompt dialog
      const avatarSampleUrls = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'
      ];
      const storeAvatar = document.getElementById('store-avatar-img');
      const unifiedAvatar = document.getElementById('unified-avatar-el');
      const setupInputAvatar = document.getElementById('setup-input-avatar');

      const currentSrc = storeAvatar ? storeAvatar.src : '';
      const nextIdx = (avatarSampleUrls.indexOf(currentSrc) + 1) % avatarSampleUrls.length;
      const nextUrl = avatarSampleUrls[nextIdx];

      if (storeAvatar) storeAvatar.src = nextUrl;
      if (unifiedAvatar) unifiedAvatar.src = nextUrl;
      if (setupInputAvatar) setupInputAvatar.value = nextUrl;

      showToast('Avatar creator photo updated!');
    });
  }

  // STORE SUB-NAV TAB SWITCHER FUNCTION
  window.switchStoreTab = function(tabName, clickedBtn) {
    const subnavBtns = document.querySelectorAll('.store-subnav-btn');
    subnavBtns.forEach(btn => {
      btn.classList.remove('active');
      if (clickedBtn) {
        if (btn === clickedBtn) btn.classList.add('active');
      } else {
        if (btn.getAttribute('data-store-tab') === tabName) btn.classList.add('active');
      }
    });

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

  // GLOBAL EVENT DELEGATION FOR DEEP INTERACTIVE BUTTONS
  document.addEventListener('click', (e) => {
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

    // 4. Edit Header Trigger (Pencil / Cancel icon toggle)
    const editPencilSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    const closeCrossSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    function updateEditHeaderTriggerIcon(isOpen) {
      const triggerBtn = document.getElementById('btn-edit-header-trigger');
      if (!triggerBtn) return;
      if (isOpen) {
        triggerBtn.innerHTML = closeCrossSvg;
        triggerBtn.title = 'Close Setup';
      } else {
        triggerBtn.innerHTML = editPencilSvg;
        triggerBtn.title = 'Edit Store Info';
      }
    }

    const editHeaderBtn = e.target.closest('#btn-edit-header-trigger');
    if (editHeaderBtn) {
      e.preventDefault();
      const formBox = document.getElementById('profile-setup-form-box');
      const summaryBox = document.getElementById('profile-summary-box');
      if (formBox && (formBox.style.display === 'none' || !formBox.style.display)) {
        formBox.style.display = 'block';
        if (summaryBox) summaryBox.style.display = 'none';
        updateEditHeaderTriggerIcon(true);
      } else {
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

  // 10. Payment Options Handlers
  const btnAddHist = document.getElementById('btn-add-history');
  const btnViewWalletHist = document.getElementById('btn-view-wallet-history');
  const btnSetUpiDef = document.getElementById('btn-set-upi-default');
  const btnRzpLogin = document.getElementById('btn-rzp-login');
  const btnTxnViewAll = document.getElementById('btn-txn-view-all');

  if (btnAddHist) {
    btnAddHist.addEventListener('click', () => {
      showToast('Add new wallet history entry dialog opened');
    });
  }

  if (btnViewWalletHist) {
    btnViewWalletHist.addEventListener('click', () => {
      showToast('Loading full wallet deposit & withdrawal logs...');
    });
  }

  if (btnSetUpiDef) {
    btnSetUpiDef.addEventListener('click', () => {
      const upiVal = document.getElementById('input-payout-upi')?.value || 'VPA / UPI ID';
      showToast(`Default payout VPA set to: ${upiVal}`);
    });
  }

  if (btnRzpLogin) {
    btnRzpLogin.addEventListener('click', () => {
      showToast('Connecting to Razorpay Creator OAuth Portal...');
    });
  }

  if (btnTxnViewAll) {
    btnTxnViewAll.addEventListener('click', () => {
      showToast('Showing all historical store transactions');
    });
  }

  // INITIALIZE CREATOR STORE SETTINGS HANDLERS
  initCreatorStoreSettings();

  // INITIALIZE APP DATA & CONNECTION STATE
  updateConnectionUI();
  loadDashboardData('7 Days');
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
      const val = nameInput.value || 'Rajeev Sharma';
      if (namePrev) namePrev.textContent = val;
      if (nameCount) nameCount.textContent = `${nameInput.value.length}/50`;
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
      const val = handleInput.value.trim() || 'rajeev';
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
    const handle = handleInput ? handleInput.value.trim() : 'rajeev';
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
      const handle = handleInput ? handleInput.value.trim() : 'rajeev';
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
      const val = bioInput.value || 'Building premium Instagram businesses and automation systems.';
      if (bioPrev) bioPrev.textContent = val;
      if (bioCount) bioCount.textContent = `${bioInput.value.length}/160`;
    });
  }

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
          syncAllStorePreviewFields();
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
          syncAllStorePreviewFields();
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
      if (nameInput) {
        nameInput.value = 'Rajeev Sharma';
        nameInput.dispatchEvent(new Event('input'));
      }
      if (bioInput) {
        bioInput.value = 'Building premium Instagram businesses and automation systems.';
        bioInput.dispatchEvent(new Event('input'));
      }
      if (handleInput) {
        handleInput.value = 'rajeev';
        handleInput.dispatchEvent(new Event('input'));
      }
      syncAllStorePreviewFields();
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
      namePrev.textContent = heroTitleInput.value || 'Rajeev Sharma';
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
      seoTitleTxt.textContent = seoTitleInput.value || 'Rajeev Sharma | Official Storefront';
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
    const nameVal = document.getElementById('cs-input-store-name')?.value || 'Rajeev Sharma';
    const bioVal = document.getElementById('cs-input-store-bio')?.value || 'Building premium Instagram businesses and automation systems.';
    const handleVal = document.getElementById('cs-input-store-handle')?.value?.trim() || 'rajeev';
    
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

  // Also hook external store open button
  const btnOpenExternal = document.getElementById('btn-open-store-external');
  if (btnOpenExternal && spmModal) {
    btnOpenExternal.addEventListener('click', (e) => {
      e.preventDefault();
      syncAllStorePreviewFields();
      spmModal.classList.add('active');
      showToast('Opening Live Storefront...');
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
    loggedInCustomerEmail = email || 'rajeev@gmail.com';
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
      const email = document.getElementById('auth-input-email')?.value || 'rajeev@gmail.com';
      handleSuccessfulLogin(email);
    });
  }

  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener('click', () => {
      handleSuccessfulLogin('rajeev.sharma@gmail.com');
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
    bio: 'Helping creators automate Instagram & convert followers into leads.',
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
        phoneScreen.className = phoneScreen.className.replace(/theme-[a-z-]+/g, '');
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
        phoneScreen.className = phoneScreen.className.replace(/font-[a-z-]+/g, '');
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
