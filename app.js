// GLOBAL NATIVE HTML ONCLICK HANDLERS FOR 100% GUARANTEED BROWSER EXECUTION
window.switchStoreTab = function(tabName, btnEl) {
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

window.switchMainTab = function(tabName, linkEl) {
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
          <linearGradient id="chartFillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.0"/>
          </linearGradient>
        </defs>` : ''}
        
        <!-- Horizontal Dotted Grid Lines -->
        <line x1="30" y1="30" x2="290" y2="30" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
        <line x1="30" y1="90" x2="290" y2="90" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
        
        <!-- Y-Axis Labels -->
        <text x="20" y="34" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="end">${yTop}</text>
        <text x="20" y="94" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="end">${yBottom}</text>

        <!-- Shaded Area (if any) -->
        ${fillColor && areaD ? `<path d="${areaD}" fill="url(#chartFillGrad)" />` : ''}

        <!-- Graph Line -->
        <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Nodes -->
        ${xCoords.map((x, i) => {
          const y = (points && points[i] !== undefined) ? points[i] : 90;
          return `<circle cx="${x}" cy="${y}" r="4" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.2"/>`;
        }).join('')}

        <!-- X-Axis Labels -->
        ${xLabels.map((lbl, i) => `
          <text x="${xCoords[i]}" y="116" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="middle">${lbl}</text>
        `).join('')}
      </svg>
    `;
  }

  // DUMMY DATA FOR EACH TIME RANGE
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

    chartReplies.innerHTML = '<span class="skeleton skeleton-chart"></span>';
    chartFollowers.innerHTML = '<span class="skeleton skeleton-chart"></span>';
    chartLeads.innerHTML = '<span class="skeleton skeleton-chart"></span>';
  }

  // 2. LOAD DASHBOARD DATA FUNCTION WITH SKELETON LOADING TRANSITION
  function loadDashboardData(range = '7 Days') {
    currentRange = range;
    showSkeletonLoading();

    setTimeout(() => {
      if (!isConnected) {
        // Disconnected State UI
        Object.values(statIds).forEach(el => {
          if (el) el.textContent = '';
        });

        chartReplies.innerHTML = `
          <div class="chart-empty-state">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6" stroke-linecap="round"/></svg>
            <span>No activity data available.</span>
          </div>`;

        chartFollowers.innerHTML = `
          <div class="chart-empty-state">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>No growth data available.</span>
          </div>`;

        chartLeads.innerHTML = createChartSvg({
          yTop: '0', yBottom: '0',
          xLabels: ['6', '7', '8', '9', '10', '11', '12'],
          points: [90, 90, 90, 90, 90, 90, 90],
          strokeColor: '#8b5cf6'
        });
        return;
      }

      const data = DASHBOARD_DATA[range] || DASHBOARD_DATA['7 Days'];

      // Populate metrics
      statIds.followers.textContent = data.followers;
      statIds.following.textContent = data.following;
      statIds.views.textContent = data.views;
      statIds.comments.textContent = data.comments;
      statIds.replies.textContent = data.replies;
      statIds.sentToday.textContent = data.sentToday;
      statIds.activeRules.textContent = data.activeRules;
      statIds.leads.textContent = data.leads;

      // Update chart subtitles
      if (subReplies) subReplies.textContent = data.repliesSubtitle;
      if (subFollowers) subFollowers.textContent = data.followersSubtitle;
      if (subLeads) subLeads.textContent = data.leadsSubtitle;

      // Populate SVG Charts
      chartReplies.innerHTML = data.repliesSvg;
      chartFollowers.innerHTML = data.followersSvg;
      chartLeads.innerHTML = data.leadsSvg;
    }, 600);
  }

  // 3. TOGGLE CONNECTION STATE
  function updateConnectionUI() {
    if (isConnected) {
      accountInfoContainer.innerHTML = `
        <div class="account-icon">R</div>
        <div class="account-details">
          <span class="account-handle">@render6457</span>
          <span class="account-status">Instagram Connected</span>
        </div>`;

      accountActionContainer.innerHTML = `<button class="btn btn-disconnect" id="btn-disconnect-modal">Disconnect</button>`;
      
      const newDisconnectBtn = document.getElementById('btn-disconnect-modal');
      newDisconnectBtn.addEventListener('click', handleDisconnectClick);
    } else {
      accountInfoContainer.innerHTML = `<span class="disconnected-text">No Instagram accounts connected.</span>`;
      accountActionContainer.innerHTML = `<button class="btn btn-primary" id="btn-connect-modal">Connect Instagram</button>`;

      const connectBtn = document.getElementById('btn-connect-modal');
      connectBtn.addEventListener('click', () => {
        openModal(
          'Connect Instagram Account',
          'Would you like to connect your Instagram account (@render6457) to resume automation rules?',
          () => {
            isConnected = true;
            updateConnectionUI();
            loadDashboardData(currentRange);
            showToast('Instagram account connected successfully!');
          }
        );
      });
    }
  }

  function handleDisconnectClick() {
    openModal(
      'Disconnect Account?',
      'Are you sure you want to disconnect @render6457? Active automations will be paused.',
      () => {
        isConnected = false;
        updateConnectionUI();
        loadDashboardData(currentRange);
        showToast('Disconnected account @render6457');
      }
    );
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
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // 6. MODAL UTILITY
  function openModal(title, text, onConfirm) {
    modalTitle.textContent = title;
    modalContent.textContent = text;
    modalContainer.classList.add('active');

    const handleConfirm = () => {
      if (onConfirm) onConfirm();
      closeModal();
      modalConfirm.removeEventListener('click', handleConfirm);
    };

    modalConfirm.onclick = handleConfirm;
  }

  function closeModal() {
    modalContainer.classList.remove('active');
  }

  modalCancel.addEventListener('click', closeModal);
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) closeModal();
  });

  // 7. TIME RANGE PICKER CLICK LISTENERS
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

  // 8. REFRESH BUTTON CLICK HANDLER
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

  // BROWSER TAB STOREFRONT OVERLAY HANDLERS (CREATOR DIGITAL STOREFRONT)
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
      navigator.clipboard.writeText('https://renderreply.com/p/render6457');
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

  // STOREFRONT PREVIEW OVERLAY BUTTON HANDLER
  if (btnOpenBrowserOverlay && browserOverlay) {
    btnOpenBrowserOverlay.addEventListener('click', () => {
      browserOverlay.classList.add('active');
      showToast('Opening Creator Storefront live preview...');
    });
  }

  // PRODUCT STUDIO FULL PAGE EDITOR LOGIC
  const modalProductBackdrop = document.getElementById('modal-product-backdrop');
  const btnAddAmazonProd = document.getElementById('btn-add-amazon-prod');
  const btnCloseProductModal = document.getElementById('btn-close-product-modal');
  const btnCancelProductModal = document.getElementById('btn-cancel-product-modal');
  const formProductModal = document.getElementById('form-product-modal');

  // Photo Upload & Preview elements
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
        ${uploadedPhotos.length > 1 ? `<button type="button" class="gallery-thumb-remove" title="Remove photo" onclick="event.stopPropagation(); removeGalleryPhoto(${idx});">✕</button>` : ''}
      `;
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
    if (modalProductBackdrop) {
      modalProductBackdrop.classList.add('active');
      renderGallery();
    }
  }

  function closeProductModal() {
    if (modalProductBackdrop) {
      modalProductBackdrop.classList.remove('active');
    }
  }

  if (btnAddAmazonProd) {
    btnAddAmazonProd.addEventListener('click', openProductModal);
  }

  document.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit-prod');
    if (editBtn) {
      const card = editBtn.closest('div[style*="background: #ffffff"]');
      if (card) {
        const titleEl = card.querySelector('div[style*="font-weight: 800"]');
        const imgEl = card.querySelector('img');
        if (titleEl) {
          document.getElementById('modal-prod-title').value = titleEl.textContent.trim();
        }
        if (imgEl && imgEl.src) {
          currentPhotoUrl = imgEl.src;
          if (!uploadedPhotos.includes(imgEl.src)) {
            uploadedPhotos.unshift(imgEl.src);
          }
          if (inputProdPhoto) inputProdPhoto.value = imgEl.src;
          if (livePreviewImg) livePreviewImg.src = imgEl.src;
        }
      }
      openProductModal();
    }
  });

  if (btnCloseProductModal) {
    btnCloseProductModal.addEventListener('click', closeProductModal);
  }

  if (btnCancelProductModal) {
    btnCancelProductModal.addEventListener('click', closeProductModal);
  }

  // Handle Multiple Image File Uploads
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

  // Handle Custom URL input
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

  // Initial gallery render
  renderGallery();

  // Handle Real-Time Input Preview Binding
  function updateLivePreview() {
    const titleVal = document.getElementById('modal-prod-title').value.trim() || 'Product Title';
    const priceVal = document.getElementById('modal-prod-price').value.trim() || '19.99';
    const oldPriceVal = document.getElementById('modal-prod-oldprice').value.trim();
    const ctaVal = document.getElementById('modal-prod-cta').value.trim() || 'Instant Access';
    const descVal = document.getElementById('modal-prod-desc').value.trim() || 'Product Description overview...';

    if (livePreviewImg) livePreviewImg.src = currentPhotoUrl;
    if (livePreviewTitle) livePreviewTitle.textContent = titleVal;
    if (livePreviewDesc) livePreviewDesc.textContent = descVal;
    if (livePreviewPrice) livePreviewPrice.textContent = (priceVal.toLowerCase() === 'free' || priceVal === '0') ? 'FREE' : (priceVal.startsWith('$') ? priceVal : `$${priceVal}`);
    if (livePreviewOldPrice) livePreviewOldPrice.textContent = oldPriceVal ? (oldPriceVal.startsWith('$') ? oldPriceVal : `$${oldPriceVal}`) : '';
    if (livePreviewCta) livePreviewCta.textContent = ctaVal;
  }

  // PRODUCTS REGISTRY & DEDICATED PRODUCT DETAIL VIEW HANDLERS
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

  function renderStoreProductsAndSyncPreview() {
    const builderContainer = document.getElementById('builder-products-container');
    const phoneProdList = document.getElementById('phone-prod-list-el');

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
            <div class="prod-meta">${prod.rating || '5.0 ★ (Active)'}</div>
            <div class="prod-actions">
              <button class="btn btn-edit-prod-item" data-id="${index}">Edit Details</button>
              <button class="btn btn-delete-prod-item" data-id="${index}">Delete</button>
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
  };

  renderStoreProductsAndSyncPreview();

  document.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.btn-delete-prod-item');
    if (deleteBtn) {
      const idx = parseInt(deleteBtn.getAttribute('data-id'), 10);
      if (!isNaN(idx) && idx >= 0 && idx < storeProducts.length) {
        const removed = storeProducts.splice(idx, 1);
        renderStoreProductsAndSyncPreview();
        showToast(`Removed "${removed[0]?.title || 'Product'}" from storefront catalog`);
      }
    }
  });

  // SUBMIT NEW PRODUCT FORM
  if (formProductModal) {
    formProductModal.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('modal-prod-title').value.trim();
      let priceVal = document.getElementById('modal-prod-price').value.trim();
      let oldPriceVal = document.getElementById('modal-prod-oldprice').value.trim();
      let ctaText = document.getElementById('modal-prod-cta').value.trim();
      const desc = document.getElementById('modal-prod-desc').value.trim();

      if (!title || !priceVal || !desc) return;

      // Format Price
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

      const finalPhoto = currentPhotoUrl;

      // Create Product Object
      const newProdObj = {
        id: `prod-${Date.now()}`,
        title: title,
        price: formattedPrice,
        oldPrice: formattedOldPrice,
        desc: desc,
        cta: ctaText,
        rating: '5.0 ★ (New Product)',
        photos: uploadedPhotos.length > 0 ? [...uploadedPhotos] : [finalPhoto]
      };

      storeProducts.push(newProdObj);
      renderStoreProductsAndSyncPreview();

      // ADD ITEM TO BROWSER OVERLAY E-COMMERCE GRID
      const ecomGrid = document.querySelector('.ecom-products-grid');
      if (ecomGrid) {
        const newCard = document.createElement('div');
        newCard.className = 'ecom-product-card';
        newCard.style.cursor = 'pointer';
        newCard.innerHTML = `
          <div class="ecom-card-banner">
            <img src="${finalPhoto}" alt="${title}" class="ecom-card-photo">
          </div>
          <div class="ecom-card-body">
            <div class="ecom-rating-row">
              ★★★★★ <span style="color: var(--text-secondary);">5.0 (Just added)</span>
            </div>
            <div class="ecom-prod-title">${title}</div>
            <div class="ecom-prod-desc">${desc}</div>
            <div class="ecom-price-row">
              <div>
                <span class="ecom-price-tag" style="${formattedPrice === 'FREE' ? 'color: #10b981;' : ''}">${formattedPrice}</span>
                ${formattedOldPrice ? `<span class="ecom-price-old">${formattedOldPrice}</span>` : ''}
              </div>
              <button class="btn-ecom-buy" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; font-weight: 800;" onclick="event.stopPropagation(); showToast('Product added to Store Cart! Proceeding to checkout...');">${ctaText}</button>
            </div>
          </div>
        `;
        newCard.addEventListener('click', (e) => {
          if (!e.target.classList.contains('btn-ecom-buy')) {
            openProductDetail(newProdObj);
          }
        });
        ecomGrid.appendChild(newCard);
      }

      // Close Studio Editor
      closeProductModal();
      showToast(`Published "${title}" (${formattedPrice}) to Creator Storefront!`);
    });
  }



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

    // Populate detail fields
    document.getElementById('detail-prod-title').textContent = prod.title;
    document.getElementById('detail-prod-price').textContent = prod.price;
    document.getElementById('detail-prod-oldprice').textContent = prod.oldPrice || '';
    document.getElementById('detail-prod-desc').textContent = prod.desc;
    document.getElementById('detail-rating-text').textContent = prod.rating || '5.0 (Customer reviews)';
    
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

    // Show/hide arrows if only 1 photo
    if (prevBtn) prevBtn.style.display = photos.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = photos.length > 1 ? 'flex' : 'none';

    // Render thumbnail strip
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

  // Previous & Next carousel arrow handlers
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

  // Render "More Products from this Store" grid
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
            ★★★★★ <span style="color: var(--text-secondary);">${prod.rating.split('(')[1] ? prod.rating.split('(')[1].replace(')', '') : '5.0'}</span>
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

  // Back to Storefront button handler
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

  // Bind initial storefront cards to open Detail View
  const bindInitialStorefrontCards = () => {
    const cards = document.querySelectorAll('.ecom-products-grid .ecom-product-card');
    cards.forEach((card, idx) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-ecom-buy')) return;
        if (storeProducts[idx]) {
          openProductDetail(storeProducts[idx]);
        }
      });
    });
  };

  bindInitialStorefrontCards();

  // ADD TO CART CLICK HANDLERS IN CREATOR STOREFRONT
  const ecomBuyBtns = document.querySelectorAll('.btn-ecom-buy');
  ecomBuyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Product added to Store Cart! Proceeding to checkout...');
    });
  });

  // 12. GOOGLE SHEETS SYNC BUTTON
  const btnSyncSheets = document.getElementById('btn-sync-sheets');
  if (btnSyncSheets) {
    btnSyncSheets.addEventListener('click', () => {
      showToast('Synced 28 leads with Google Sheets!');
    });
  }

  // ==========================================================================
  // CREATOR STOREFRONT BUILDER SUB-TABS & FEATURE HANDLERS
  // ==========================================================================
  
  // Generic Sub-Tab Toggle Handler (for Automation Rules, Bio Link, etc.)
  const allSubTabBtns = document.querySelectorAll('.sub-tab-btn');
  allSubTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      if (parent) {
        parent.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showToast(`Filtered: ${btn.textContent.trim()}`);
      }
    });
  });

  // 1. Storefront Sub-Tab Navigation
  const storeSubnavBtns = document.querySelectorAll('.store-subnav-btn');
  const storeTabContents = document.querySelectorAll('.store-tab-content');

  storeSubnavBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-store-tab');

      storeSubnavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      storeTabContents.forEach(content => {
        if (content.id === `store-tab-${targetTab}`) {
          content.classList.add('active');
          if (typeof triggerReloadAnimation === 'function') {
            try { triggerReloadAnimation(content); } catch (err) {}
          }
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Profile Header Setup Form State Handlers (Icon-Only Buttons & Real-Time Sync)
  const btnEditHeaderTrigger = document.getElementById('btn-edit-header-trigger');
  const profileSetupFormBox = document.getElementById('profile-setup-form-box');
  const profileSummaryBox = document.getElementById('profile-summary-box');
  const btnSaveProfileSetup = document.getElementById('btn-save-profile-setup');
  const btnCancelProfileSetup = document.getElementById('btn-cancel-profile-setup');

  const editPencilSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
  const closeCrossSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  const setEditBtnIcon = (isOpen) => {
    if (!btnEditHeaderTrigger) return;
    if (isOpen) {
      btnEditHeaderTrigger.innerHTML = closeCrossSvg;
      btnEditHeaderTrigger.title = 'Close Setup';
    } else {
      btnEditHeaderTrigger.innerHTML = editPencilSvg;
      btnEditHeaderTrigger.title = 'Edit Store Info';
    }
  };

  if (btnEditHeaderTrigger) {
    btnEditHeaderTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (profileSetupFormBox && (profileSetupFormBox.style.display === 'none' || !profileSetupFormBox.style.display)) {
        profileSetupFormBox.style.display = 'block';
        if (profileSummaryBox) profileSummaryBox.style.display = 'none';
        setEditBtnIcon(true);
      } else {
        if (profileSetupFormBox) profileSetupFormBox.style.display = 'none';
        if (profileSummaryBox) profileSummaryBox.style.display = 'flex';
        setEditBtnIcon(false);
      }
    });
  }

  if (btnCancelProfileSetup) {
    btnCancelProfileSetup.addEventListener('click', (e) => {
      e.preventDefault();
      if (profileSetupFormBox) profileSetupFormBox.style.display = 'none';
      if (profileSummaryBox) profileSummaryBox.style.display = 'flex';
      setEditBtnIcon(false);
    });
  }

  // Real-Time Live Smartphone Preview Input Sync
  const setupInputName = document.getElementById('setup-input-name');
  const setupInputAvatar = document.getElementById('setup-input-avatar');
  const setupInputBio = document.getElementById('setup-input-bio');

  function updateRealtimePreview() {
    const nameVal = setupInputName?.value.trim() || 'RudRa RR';
    const avatarVal = setupInputAvatar?.value.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';
    const bioVal = setupInputBio?.value.trim() || 'Welcome to my SuperProfile & RenderReply Store! 🚀';

    // Store Card Updates
    const nameTxt = document.getElementById('store-display-name-txt');
    const bioTxt = document.getElementById('store-bio-text-txt');
    const avatarImg = document.getElementById('store-avatar-img');

    if (nameTxt) nameTxt.textContent = nameVal;
    if (bioTxt) bioTxt.textContent = bioVal;
    if (avatarImg) avatarImg.src = avatarVal;

    // Unified Real-Time Preview Updates (No Icons)
    const unifiedAvatar = document.getElementById('unified-avatar-el');
    const unifiedName = document.getElementById('unified-name-el');
    const unifiedBio = document.getElementById('unified-bio-el');

    if (unifiedAvatar) unifiedAvatar.src = avatarVal;
    if (unifiedName) unifiedName.textContent = `${nameVal} Store`;
    if (unifiedBio) unifiedBio.textContent = bioVal;
  }

  [setupInputName, setupInputAvatar, setupInputBio].forEach(inputEl => {
    if (inputEl) {
      inputEl.addEventListener('input', updateRealtimePreview);
    }
  });

  if (btnSaveProfileSetup) {
    btnSaveProfileSetup.addEventListener('click', () => {
      updateRealtimePreview();
      if (profileSetupFormBox) profileSetupFormBox.style.display = 'none';
      if (profileSummaryBox) profileSummaryBox.style.display = 'flex';
      setEditBtnIcon(false);
      showToast('✓ Creator store profile info saved & published!');
    });
  }

  // 2. Brand Color Picker & Swatches Handling
  const colorPickerInput = document.getElementById('input-brand-color-picker');
  const colorHexText = document.getElementById('input-brand-color-hex');
  const colorSwatches = document.querySelectorAll('.swatch');
  const customerDashHeader = document.getElementById('dash-prev-bg');
  const customerDashPurchasesBtn = document.getElementById('dash-purchases-btn');
  const dashSampleCheckoutPill = document.getElementById('dash-sample-checkout-pill');
  const dashLiveHexBadge = document.getElementById('dash-live-hex-badge');
  const seoBox = document.getElementById('seo-img-box');
  const phoneHeaderBg = document.getElementById('phone-header-bg');

  function applyBrandColor(color) {
    if (colorPickerInput) colorPickerInput.value = color;
    if (colorHexText) colorHexText.value = color.toUpperCase();
    if (customerDashHeader) customerDashHeader.style.background = color;
    if (customerDashPurchasesBtn) {
      customerDashPurchasesBtn.style.backgroundColor = color;
      customerDashPurchasesBtn.style.borderColor = color;
    }
    if (dashSampleCheckoutPill) {
      dashSampleCheckoutPill.style.borderColor = color;
      dashSampleCheckoutPill.style.color = color;
    }
    if (dashLiveHexBadge) {
      dashLiveHexBadge.textContent = `${color.toUpperCase()} • Primary Accent`;
    }
    if (seoBox) {
      seoBox.style.borderLeftColor = color;
    }
    if (phoneHeaderBg) {
      phoneHeaderBg.style.background = `linear-gradient(180deg, ${color} 0%, #090d16 100%)`;
    }
  }

  if (colorPickerInput) {
    colorPickerInput.addEventListener('input', (e) => {
      applyBrandColor(e.target.value);
    });
  }

  if (colorHexText) {
    colorHexText.addEventListener('change', (e) => {
      let val = e.target.value.trim();
      if (!val.startsWith('#')) val = '#' + val;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        applyBrandColor(val);
      }
    });
  }

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-color');
      applyBrandColor(color);
      showToast(`Applied brand theme color ${color}`);
    });
  });

  // SEO Real-Time Input Sync
  const inputMetaTitle = document.getElementById('input-meta-title');
  const inputMetaDesc = document.getElementById('input-meta-desc');
  const seoPreviewTitle = document.getElementById('seo-preview-title');
  const seoPreviewDesc = document.getElementById('seo-preview-desc');

  if (inputMetaTitle && seoPreviewTitle) {
    inputMetaTitle.addEventListener('input', () => {
      seoPreviewTitle.textContent = inputMetaTitle.value.trim() || 'RudRa RR | Official Creator Storefront';
    });
  }

  if (inputMetaDesc && seoPreviewDesc) {
    inputMetaDesc.addEventListener('input', () => {
      seoPreviewDesc.textContent = inputMetaDesc.value.trim() || 'Welcome to my official creator storefront!';
    });
  }

  // 3. Copy Store URL Handler
  const btnCopyStoreUrl = document.getElementById('btn-copy-store-url');
  if (btnCopyStoreUrl) {
    btnCopyStoreUrl.addEventListener('click', () => {
      const linkPill = document.getElementById('store-official-link-pill');
      const urlText = linkPill ? linkPill.textContent : 'https://renderreply.com/store/render6457';
      navigator.clipboard.writeText(urlText);
      showToast('Store official link copied to clipboard!');
    });
  }

  // 4. Store Details Handle Save
  const btnSaveHandle = document.getElementById('btn-save-handle');
  const inputStoreHandle = document.getElementById('input-store-handle');
  if (btnSaveHandle && inputStoreHandle) {
    btnSaveHandle.addEventListener('click', () => {
      const handle = inputStoreHandle.value.trim();
      if (handle) {
        const fullUrl = `https://renderreply.com/store/${handle}`;
        const pill = document.getElementById('store-official-link-pill');
        if (pill) pill.textContent = fullUrl;
        showToast(`Store handle updated to @${handle}!`);
      }
    });
  }

  // 5. Render Storefront Analytics Main Chart
  const renderStoreAnalyticsChart = () => {
    const chartArea = document.getElementById('store-analytics-main-chart');
    if (!chartArea) return;

    chartArea.innerHTML = createChartSvg({
      yTop: '250',
      yBottom: '0',
      xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      points: [40, 25, 60, 35, 80, 50, 20],
      strokeColor: '#6366f1',
      fillColor: '#6366f1'
    });
  };

  renderStoreAnalyticsChart();

  // Store Analytics Range Filter Buttons
  const storeRangeBtns = document.querySelectorAll('[data-store-range]');
  storeRangeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const range = btn.getAttribute('data-store-range');
      storeRangeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Filtered store analytics for ${range}`);
    });
  });

  // 6. Interactive Buttons & Modal Triggers for Storefront
  const btnAddProductModal = document.getElementById('btn-add-product-modal');
  if (btnAddProductModal) {
    btnAddProductModal.addEventListener('click', openProductModal);
  }

  const btnChangeAvatar = document.getElementById('btn-change-avatar');
  if (btnChangeAvatar) {
    btnChangeAvatar.addEventListener('click', (e) => {
      e.preventDefault();
      const url = prompt('Enter Profile Avatar Image URL:', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80');
      if (url) {
        const storeAvatar = document.getElementById('store-avatar-img');
        const unifiedAvatar = document.getElementById('unified-avatar-el');
        const setupInputAvatar = document.getElementById('setup-input-avatar');
        if (storeAvatar) storeAvatar.src = url;
        if (unifiedAvatar) unifiedAvatar.src = url;
        if (setupInputAvatar) setupInputAvatar.value = url;
        showToast('Avatar creator photo updated!');
      }
    });
  }

  const btnAddCert = document.getElementById('btn-add-cert');
  if (btnAddCert) {
    btnAddCert.addEventListener('click', () => {
      openModal(
        'Add Certificate or Trust Badge',
        'Upload official certification or license to display trust badge on your storefront.',
        () => {
          showToast('Certificate badge added to store!');
        }
      );
    });
  }

  const btnWatchTutorial = document.getElementById('btn-watch-tutorial');
  if (btnWatchTutorial) {
    btnWatchTutorial.addEventListener('click', () => {
      showToast('Opening Store Setup Video Tutorial...');
    });
  }

  const btnAddStoreContent = document.getElementById('btn-add-store-content');
  if (btnAddStoreContent) {
    btnAddStoreContent.addEventListener('click', () => {
      showToast('Opening Content Block Builder...');
    });
  }

  const btnAddStoreHeader = document.getElementById('btn-add-store-header');
  if (btnAddStoreHeader) {
    btnAddStoreHeader.addEventListener('click', () => {
      showToast('Added new Section Header text block to store!');
    });
  }

  const btnChangeMetaImg = document.getElementById('btn-change-meta-img');
  if (btnChangeMetaImg) {
    btnChangeMetaImg.addEventListener('click', () => {
      showToast('SEO Social Meta Sharing Image updated!');
    });
  }

  const btnUploadQr = document.getElementById('btn-upload-qr');
  if (btnUploadQr) {
    btnUploadQr.addEventListener('click', () => {
      showToast('Custom Payment UPI QR Code Image updated!');
    });
  }

  // 7. Product Catalog Item Delete & Edit Buttons
  document.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit-prod-item');
    if (editBtn) {
      const card = editBtn.closest('.catalog-prod-card');
      if (card) {
        const nameEl = card.querySelector('.prod-name');
        const priceEl = card.querySelector('.prod-price');
        if (nameEl) document.getElementById('modal-prod-title').value = nameEl.textContent.trim();
        if (priceEl) document.getElementById('modal-prod-price').value = priceEl.textContent.trim().replace('$', '');
      }
      openProductModal();
      return;
    }

    const deleteBtn = e.target.closest('.btn-delete-prod-item');
    if (deleteBtn) {
      const card = deleteBtn.closest('.catalog-prod-card');
      if (card) {
        card.remove();
        showToast('Product item deleted from store catalog');
      }
      return;
    }
  });

  // 8. Geographic Analytics View Toggles
  const geoBtns = document.querySelectorAll('.pill-btn');
  geoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      if (parent) {
        const sibs = parent.querySelectorAll('.pill-btn');
        sibs.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        showToast(`Switched view to ${btn.textContent.trim()}`);
      }
    });
  });

  // 10. Learn & Help Support Video Modal & Copy Email Handlers
  const btnCopyEmail1 = document.getElementById('btn-copy-support-email');
  const btnCopyEmail2 = document.querySelector('.btn-copy-support-email-gen');
  
  function copySupportEmail() {
    navigator.clipboard.writeText('support@renderreply.com');
    showToast('Support email copied: support@renderreply.com');
  }

  if (btnCopyEmail1) btnCopyEmail1.addEventListener('click', copySupportEmail);
  if (btnCopyEmail2) btnCopyEmail2.addEventListener('click', copySupportEmail);

  document.addEventListener('click', (e) => {
    const watchBtn = e.target.closest('.btn-watch-video, .video-play-overlay');
    if (watchBtn) {
      const card = watchBtn.closest('.video-support-card');
      const title = card ? (card.querySelector('.video-card-title')?.textContent.trim() || 'Video Tutorial') : 'Video Tutorial';
      openModal(
        `🎥 Playing: ${title}`,
        `Watching guide for "${title}". Learn how to automate, configure, and grow your Instagram storefront.`,
        () => showToast(`Completed watching tutorial: ${title}`)
      );
    }
  });

  // GLOBAL STOREFRONT DIRECT CLICK DELEGATOR FOR 100% GUARANTEED INTERACTION
  document.addEventListener('click', (e) => {
    // 1. Sub-nav tab buttons
    const subnavBtn = e.target.closest('.store-subnav-btn');
    if (subnavBtn) {
      e.preventDefault();
      const targetTab = subnavBtn.getAttribute('data-store-tab');
      document.querySelectorAll('.store-subnav-btn').forEach(b => b.classList.remove('active'));
      subnavBtn.classList.add('active');
      document.querySelectorAll('.store-tab-content').forEach(content => {
        if (content.id === `store-tab-${targetTab}`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
      return;
    }

    // 2. Edit Header Trigger (Pencil icon)
    const editHeaderBtn = e.target.closest('#btn-edit-header-trigger');
    if (editHeaderBtn) {
      e.preventDefault();
      const formBox = document.getElementById('profile-setup-form-box');
      const summaryBox = document.getElementById('profile-summary-box');
      if (formBox && (formBox.style.display === 'none' || !formBox.style.display)) {
        formBox.style.display = 'block';
        if (summaryBox) summaryBox.style.display = 'none';
      } else {
        if (formBox) formBox.style.display = 'none';
        if (summaryBox) summaryBox.style.display = 'flex';
      }
      return;
    }

    // 3. Cancel Profile Setup
    const cancelSetupBtn = e.target.closest('#btn-cancel-profile-setup');
    if (cancelSetupBtn) {
      e.preventDefault();
      const formBox = document.getElementById('profile-setup-form-box');
      const summaryBox = document.getElementById('profile-summary-box');
      if (formBox) formBox.style.display = 'none';
      if (summaryBox) summaryBox.style.display = 'flex';
      return;
    }

    // 4. Save Profile Setup
    const saveSetupBtn = e.target.closest('#btn-save-profile-setup');
    if (saveSetupBtn) {
      e.preventDefault();
      updateRealtimePreview();
      const formBox = document.getElementById('profile-setup-form-box');
      const summaryBox = document.getElementById('profile-summary-box');
      if (formBox) formBox.style.display = 'none';
      if (summaryBox) summaryBox.style.display = 'flex';
      showToast('✓ Creator store profile info saved & published!');
      return;
    }

    // 5. Add Product Modal Trigger
    const addProdBtn = e.target.closest('#btn-add-product-modal');
    if (addProdBtn) {
      e.preventDefault();
      openProductModal();
      return;
    }

    // 6. Save Creator Storefront
    const saveStoreBtn = e.target.closest('#btn-save-creatorstore');
    if (saveStoreBtn) {
      e.preventDefault();
      showToast('Creator Storefront changes saved successfully!');
      return;
    }

    // 7. Copy Store URL
    const copyUrlBtn = e.target.closest('#btn-copy-store-url');
    if (copyUrlBtn) {
      e.preventDefault();
      const linkPill = document.getElementById('store-official-link-pill');
      const urlText = linkPill ? linkPill.textContent : 'https://renderreply.com/store/render6457';
      navigator.clipboard.writeText(urlText);
      showToast('Store official link copied to clipboard!');
      return;
    }

    // 8. Open Storefront Browser Overlay
    const openOverlayBtn = e.target.closest('#btn-open-browser-overlay');
    if (openOverlayBtn) {
      e.preventDefault();
      if (browserOverlay) browserOverlay.classList.add('active');
      showToast('Opening Creator Storefront live preview...');
      return;
    }

    // 9. Close Storefront Browser Overlay
    const exitOverlayBtn = e.target.closest('#btn-exit-browser-tab, #btn-close-browser-tab');
    if (exitOverlayBtn) {
      e.preventDefault();
      if (browserOverlay) browserOverlay.classList.remove('active');
      return;
    }

    // 10. Close Product Studio Modal
    const closeStudioBtn = e.target.closest('#btn-close-product-modal, #btn-cancel-product-modal');
    if (closeStudioBtn) {
      e.preventDefault();
      closeProductModal();
      return;
    }

    // 11. Publish Product Button
    const publishBtn = e.target.closest('#btn-publish-product');
    if (publishBtn) {
      e.preventDefault();
      if (formProductModal) {
        const submitEvt = new Event('submit', { cancelable: true, bubbles: true });
        formProductModal.dispatchEvent(submitEvt);
      }
      return;
    }
  });

  // 13. INITIALIZE APP DATA & CONNECTION STATE
  updateConnectionUI();
  loadDashboardData('7 Days');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
