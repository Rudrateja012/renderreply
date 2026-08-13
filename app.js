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

  // INITIALIZE APP DATA & CONNECTION STATE
  updateConnectionUI();
  loadDashboardData('7 Days');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
