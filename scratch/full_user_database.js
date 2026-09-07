// Comprehensive 4 User Simulated Accounts Database for RenderReply
function createDualLineChartSvg(options) {
  const {
    reachPoints = [18, 28, 38, 32, 44, 42, 48.2],
    activityPoints = [1.2, 1.8, 2.4, 2.1, 3.0, 2.8, 3.4],
    xLabels = ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
    yTop = '50K',
    yBottom = '0'
  } = options || {};

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
      <line x1="32" y1="28" x2="315" y2="28" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="32" y1="70" x2="315" y2="70" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="32" y1="112" x2="315" y2="112" stroke="#f1f5f9" stroke-width="1"/>
      <text x="26" y="32" font-family="'Inter', sans-serif" font-size="9" font-weight="700" fill="#71717a" text-anchor="end">${yTop}</text>
      <text x="26" y="115" font-family="'Inter', sans-serif" font-size="9" font-weight="700" fill="#71717a" text-anchor="end">${yBottom}</text>
      <path d="${reachAreaD}" fill="url(#${gradId})"/>
      <path d="${reachPathD}" fill="none" stroke="#09090b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${actPathD}" fill="none" stroke="#71717a" stroke-width="1.8" stroke-dasharray="3 3" stroke-linecap="round" stroke-linejoin="round"/>
      ${reachY.map((y, i) => `
        <circle class="chart-point-reach pt-reach-${i}" cx="${xCoords[i]}" cy="${y}" r="3.2" fill="#ffffff" stroke="#09090b" stroke-width="2"/>
        <circle class="chart-point-act pt-act-${i}" cx="${xCoords[i]}" cy="${actY[i]}" r="2.5" fill="#ffffff" stroke="#71717a" stroke-width="1.5"/>
      `).join('')}
      ${xLabels.map((lbl, i) => `
        <text x="${xCoords[i]}" y="132" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#71717a" text-anchor="middle">${lbl}</text>
      `).join('')}
      ${xCoords.map((x, i) => `
        <rect class="chart-hover-trigger" data-idx="${i}" data-label="${xLabels[i]}" data-reach="${reachPoints[i]}K" data-act="${activityPoints[i]}K" data-x="${x}" data-reach-y="${reachY[i]}" data-act-y="${actY[i]}" x="${x - (step || 20)/2}" y="0" width="${step || 40}" height="145" fill="transparent" style="cursor: crosshair;"/>
      `).join('')}
    </svg>
  `;
}

const USER_ACCOUNTS_DATABASE = {
  // =========================================================================
  // USER 1: RudRa RR (Tech & AI Automation Creator)
  // =========================================================================
  'acc-rudra': {
    id: 'acc-rudra',
    profile: {
      name: 'RudRa RR',
      email: 'rudrateja08@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Welcome to my SuperProfile & RenderReply Store! Building AI automations and fullstack dev guides.',
      insta: '@render6457',
      yt: 'youtube.com/@rudrateja',
      tw: '@rudrateja',
      initials: 'R',
      badge: 'Tech & Automation Creator',
      role: 'Admin / Full Access'
    },
    dashboard: {
      '7 Days': {
        followers: '48', following: '12', views: '380', comments: '52',
        totalReplies: '28', sentToday: '6', activeRulesFlat: '3', capturedLeadsFlat: '9',
        reach: '12.4K', trendReach: '▲ +9.2%', engaged: '1.4K', trendEngaged: '▲ +5.6%',
        visits: '820', trendVisits: '▲ +12.4%', clicks: '210', trendClicks: '▲ +14.8%',
        replies: '310', trendReplies: '▲ +8.5%', dmsToday: '18', trendDmsToday: '▲ +4.0%',
        activeRules: '5 Active', trendRules: '● 100% Uptime', leads: '84', trendLeads: '▲ +18.2%',
        reachSub: 'Instagram reach vs profile activity over the last 7 days.',
        legReach: '12.4K', legAct: '820',
        reachSvg: createDualLineChartSvg({ reachPoints: [4, 6, 8, 7, 10, 11, 12.4], activityPoints: [0.2, 0.3, 0.5, 0.4, 0.7, 0.75, 0.82], xLabels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], yTop: '15K', yBottom: '0' }),
        funnel: { s1Num: '420', s1Pct: '100%', s1Fill: '100%', s2Num: '310', s2Pct: '73.8%', s2Fill: '73.8%', s3Num: '160', s3Pct: '38.0%', s3Fill: '38.0%', s4Num: '84', s4Pct: '20.0%', s4Fill: '20.0%', rate: '20.0% Total Conv' },
        demographics: { total: '12.4K', nonFollowers: '62% (7.7K)', followers: '38% (4.7K)', us: '40% (5.0K)', in: '30% (3.7K)', gb: '15% (1.9K)' }
      },
      '14 Days': {
        followers: '48', following: '12', views: '740', comments: '110',
        totalReplies: '58', sentToday: '10', activeRulesFlat: '3', capturedLeadsFlat: '18',
        reach: '24.8K', trendReach: '▲ +11.5%', engaged: '2.9K', trendEngaged: '▲ +7.2%',
        visits: '1,680', trendVisits: '▲ +15.1%', clicks: '440', trendClicks: '▲ +18.0%',
        replies: '620', trendReplies: '▲ +10.2%', dmsToday: '42', trendDmsToday: '▲ +4.8%',
        activeRules: '5 Active', trendRules: '● 100% Uptime', leads: '172', trendLeads: '▲ +24.5%',
        reachSub: 'Instagram reach vs profile activity over the last 14 days.',
        legReach: '24.8K', legAct: '1.68K',
        reachSvg: createDualLineChartSvg({ reachPoints: [8, 12, 16, 14, 20, 22, 24.8], activityPoints: [0.5, 0.7, 1.0, 0.9, 1.4, 1.5, 1.68], xLabels: ['Day 2', 'Day 4', 'Day 6', 'Day 8', 'Day 10', 'Day 12', 'Day 14'], yTop: '30K', yBottom: '0' }),
        funnel: { s1Num: '890', s1Pct: '100%', s1Fill: '100%', s2Num: '620', s2Pct: '69.6%', s2Fill: '69.6%', s3Num: '310', s3Pct: '34.8%', s3Fill: '34.8%', s4Num: '172', s4Pct: '19.3%', s4Fill: '19.3%', rate: '19.3% Total Conv' },
        demographics: { total: '24.8K', nonFollowers: '63% (15.6K)', followers: '37% (9.2K)', us: '41% (10.2K)', in: '29% (7.2K)', gb: '14% (3.5K)' }
      },
      '30 Days': {
        followers: '48', following: '12', views: '1,240', comments: '184',
        totalReplies: '96', sentToday: '14', activeRulesFlat: '3', capturedLeadsFlat: '28',
        reach: '48.2K', trendReach: '▲ +14.2%', engaged: '5.8K', trendEngaged: '▲ +8.4%',
        visits: '3,410', trendVisits: '▲ +18.0%', clicks: '890', trendClicks: '▲ +22.5%',
        replies: '1,240', trendReplies: '▲ +12.8%', dmsToday: '86', trendDmsToday: '▲ +5.2%',
        activeRules: '5 Active', trendRules: '● 100% Uptime', leads: '342', trendLeads: '▲ +31.4%',
        reachSub: 'Instagram reach vs profile activity over the last 30 days.',
        legReach: '48.2K', legAct: '3.41K',
        reachSvg: createDualLineChartSvg({ reachPoints: [18, 28, 38, 32, 44, 42, 48.2], activityPoints: [1.2, 1.8, 2.4, 2.1, 3.0, 2.8, 3.41], xLabels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'], yTop: '50K', yBottom: '0' }),
        funnel: { s1Num: '1,850', s1Pct: '100%', s1Fill: '100%', s2Num: '1,240', s2Pct: '67.0%', s2Fill: '67.0%', s3Num: '620', s3Pct: '33.5%', s3Fill: '33.5%', s4Num: '342', s4Pct: '18.5%', s4Fill: '18.5%', rate: '18.5% Total Conv' },
        demographics: { total: '48.2K', nonFollowers: '64% (30.8K)', followers: '36% (17.4K)', us: '42% (20.2K)', in: '28% (13.5K)', gb: '14% (6.7K)' }
      },
      '60 Days': {
        followers: '48', following: '12', views: '2,850', comments: '410',
        totalReplies: '210', sentToday: '18', activeRulesFlat: '4', capturedLeadsFlat: '62',
        reach: '92.6K', trendReach: '▲ +19.4%', engaged: '11.2K', trendEngaged: '▲ +12.0%',
        visits: '6,890', trendVisits: '▲ +21.4%', clicks: '1,740', trendClicks: '▲ +26.8%',
        replies: '2,410', trendReplies: '▲ +16.5%', dmsToday: '140', trendDmsToday: '▲ +6.1%',
        activeRules: '5 Active', trendRules: '● 100% Uptime', leads: '680', trendLeads: '▲ +35.2%',
        reachSub: 'Instagram reach vs profile activity over the last 60 days.',
        legReach: '92.6K', legAct: '6.89K',
        reachSvg: createDualLineChartSvg({ reachPoints: [35, 50, 68, 62, 80, 85, 92.6], activityPoints: [2.5, 3.6, 4.8, 4.2, 5.9, 6.2, 6.89], xLabels: ['Day 1', 'Day 10', 'Day 20', 'Day 30', 'Day 40', 'Day 50', 'Day 60'], yTop: '100K', yBottom: '0' }),
        funnel: { s1Num: '3,620', s1Pct: '100%', s1Fill: '100%', s2Num: '2,410', s2Pct: '66.5%', s2Fill: '66.5%', s3Num: '1,180', s3Pct: '32.5%', s3Fill: '32.5%', s4Num: '680', s4Pct: '18.7%', s4Fill: '18.7%', rate: '18.7% Total Conv' },
        demographics: { total: '92.6K', nonFollowers: '65% (60.1K)', followers: '35% (32.4K)', us: '43% (39.8K)', in: '27% (25.0K)', gb: '15% (13.8K)' }
      },
      '90 Days': {
        followers: '48', following: '12', views: '4,620', comments: '680',
        totalReplies: '340', sentToday: '22', activeRulesFlat: '4', capturedLeadsFlat: '98',
        reach: '142.8K', trendReach: '▲ +24.8%', engaged: '18.4K', trendEngaged: '▲ +15.8%',
        visits: '10,450', trendVisits: '▲ +26.0%', clicks: '2,680', trendClicks: '▲ +31.2%',
        replies: '3,890', trendReplies: '▲ +21.4%', dmsToday: '190', trendDmsToday: '▲ +7.8%',
        activeRules: '5 Active', trendRules: '● 100% Uptime', leads: '1,120', trendLeads: '▲ +42.0%',
        reachSub: 'Instagram reach vs profile activity over the last 90 days.',
        legReach: '142.8K', legAct: '10.45K',
        reachSvg: createDualLineChartSvg({ reachPoints: [50, 75, 95, 90, 115, 130, 142.8], activityPoints: [3.8, 5.2, 7.1, 6.8, 8.9, 9.4, 10.45], xLabels: ['Day 1', 'Day 15', 'Day 30', 'Day 45', 'Day 60', 'Day 75', 'Day 90'], yTop: '160K', yBottom: '0' }),
        funnel: { s1Num: '5,840', s1Pct: '100%', s1Fill: '100%', s2Num: '3,890', s2Pct: '66.6%', s2Fill: '66.6%', s3Num: '1,890', s3Pct: '32.3%', s3Fill: '32.3%', s4Num: '1,120', s4Pct: '19.1%', s4Fill: '19.1%', rate: '19.1% Total Conv' },
        demographics: { total: '142.8K', nonFollowers: '66% (94.2K)', followers: '34% (48.5K)', us: '44% (62.8K)', in: '26% (37.1K)', gb: '16% (22.8K)' }
      }
    },
    store: [
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
    ],
    rules: [
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
    ],
    inbox: {
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
          { type: 'human', text: 'Awesome Vikram! Let me know if you need any tweaks for your specific reels setup. Cheers!', time: '04:35 PM' }
        ]
      }
    },
    leads: [
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
      }
    ],
    payments: {
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
        { id: 'OFFLINE-892401', date: 'Oct 18, 2026 05:00 PM', type: 'Manual Credit', amount: 5000, status: 'Cleared', customer: 'Offline Direct Client', channel: 'Manual Adjustment', fee: 0, gst: 0, net: 5000 }
      ]
    },
    biolink: {
      title: 'RudRa RR | Tech & Fullstack Automation',
      bio: 'Building automated Instagram funnels, open-source Java roadmaps, and creator ecosystems.',
      links: [
        { label: 'Java Fullstack Roadmap 2026 PDF', url: 'https://renderreply.com/p/java-roadmap', color: 'accent' },
        { label: 'Book 1-on-1 Automation Audit', url: 'https://renderreply.com/book-session', color: 'slate' },
        { label: 'Instagram Automation Presets Pack', url: 'https://renderreply.com/presets', color: 'emerald' }
      ],
      video1: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video2: '',
      theme: 'indigo-slate'
    }
  },

  // =========================================================================
  // USER 2: Sarah Jenkins (Fashion & Lifestyle Influencer)
  // =========================================================================
  'acc-sarah': {
    id: 'acc-sarah',
    profile: {
      name: 'Sarah Jenkins',
      email: 'sarah.lifestyle@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Fashion stylist, lifestyle vlogger & daily aesthetic outfit links ✨ NYC & Paris.',
      insta: '@sarah_style',
      yt: 'youtube.com/@sarahstyle',
      tw: '@sarahjenkins',
      initials: 'SJ',
      badge: 'Fashion & Lifestyle',
      role: 'Verified Creator'
    },
    dashboard: {
      '7 Days': {
        followers: '184K', following: '420', views: '92,400', comments: '3,840',
        totalReplies: '2,410', sentToday: '84', activeRulesFlat: '4', capturedLeadsFlat: '680',
        reach: '94.2K', trendReach: '▲ +24.5%', engaged: '11.8K', trendEngaged: '▲ +18.2%',
        visits: '7,840', trendVisits: '▲ +22.0%', clicks: '3,450', trendClicks: '▲ +28.4%',
        replies: '2,410', trendReplies: '▲ +19.5%', dmsToday: '110', trendDmsToday: '▲ +8.2%',
        activeRules: '6 Active', trendRules: '● 100% Uptime', leads: '740', trendLeads: '▲ +34.2%',
        reachSub: 'Fashion lookbook reach vs profile saves over the last 7 days.',
        legReach: '94.2K', legAct: '7.84K',
        reachSvg: createDualLineChartSvg({ reachPoints: [32, 45, 58, 62, 74, 85, 94.2], activityPoints: [2.8, 3.9, 4.8, 5.2, 6.4, 7.1, 7.84], xLabels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], yTop: '100K', yBottom: '0' }),
        funnel: { s1Num: '3,840', s1Pct: '100%', s1Fill: '100%', s2Num: '2,920', s2Pct: '76.0%', s2Fill: '76.0%', s3Num: '1,680', s3Pct: '43.8%', s3Fill: '43.8%', s4Num: '740', s4Pct: '19.3%', s4Fill: '19.3%', rate: '19.3% Total Conv' },
        demographics: { total: '94.2K', nonFollowers: '71% (66.8K)', followers: '29% (27.4K)', us: '52% (49.0K)', in: '14% (13.2K)', gb: '22% (20.7K)' }
      },
      '14 Days': {
        followers: '184K', following: '420', views: '178,000', comments: '7,450',
        totalReplies: '4,620', sentToday: '160', activeRulesFlat: '4', capturedLeadsFlat: '1,380',
        reach: '182.4K', trendReach: '▲ +26.8%', engaged: '22.4K', trendEngaged: '▲ +17.5%',
        visits: '15,200', trendVisits: '▲ +24.1%', clicks: '6,800', trendClicks: '▲ +29.0%',
        replies: '4,620', trendReplies: '▲ +21.4%', dmsToday: '210', trendDmsToday: '▲ +9.1%',
        activeRules: '6 Active', trendRules: '● 100% Uptime', leads: '1,480', trendLeads: '▲ +38.5%',
        reachSub: 'Fashion lookbook reach vs profile saves over the last 14 days.',
        legReach: '182.4K', legAct: '15.2K',
        reachSvg: createDualLineChartSvg({ reachPoints: [60, 85, 110, 125, 150, 168, 182.4], activityPoints: [5.2, 7.1, 9.4, 10.8, 12.6, 14.1, 15.2], xLabels: ['Day 2', 'Day 4', 'Day 6', 'Day 8', 'Day 10', 'Day 12', 'Day 14'], yTop: '200K', yBottom: '0' }),
        funnel: { s1Num: '7,450', s1Pct: '100%', s1Fill: '100%', s2Num: '5,680', s2Pct: '76.2%', s2Fill: '76.2%', s3Num: '3,290', s3Pct: '44.2%', s3Fill: '44.2%', s4Num: '1,480', s4Pct: '19.9%', s4Fill: '19.9%', rate: '19.9% Total Conv' },
        demographics: { total: '182.4K', nonFollowers: '72% (131.3K)', followers: '28% (51.1K)', us: '53% (96.7K)', in: '13% (23.7K)', gb: '23% (42.0K)' }
      },
      '30 Days': {
        followers: '184K', following: '420', views: '342,000', comments: '14,200',
        totalReplies: '8,450', sentToday: '320', activeRulesFlat: '4', capturedLeadsFlat: '2,890',
        reach: '348.5K', trendReach: '▲ +28.4%', engaged: '42.1K', trendEngaged: '▲ +19.2%',
        visits: '28,400', trendVisits: '▲ +25.8%', clicks: '12,800', trendClicks: '▲ +32.4%',
        replies: '8,450', trendReplies: '▲ +22.0%', dmsToday: '410', trendDmsToday: '▲ +11.2%',
        activeRules: '6 Active', trendRules: '● 100% Uptime', leads: '2,890', trendLeads: '▲ +42.1%',
        reachSub: 'Fashion lookbook reach vs profile saves over the last 30 days.',
        legReach: '348.5K', legAct: '28.4K',
        reachSvg: createDualLineChartSvg({ reachPoints: [120, 160, 210, 240, 290, 320, 348.5], activityPoints: [8.2, 11.5, 14.8, 18.2, 22.4, 25.1, 28.4], xLabels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'], yTop: '380K', yBottom: '0' }),
        funnel: { s1Num: '14,200', s1Pct: '100%', s1Fill: '100%', s2Num: '10,800', s2Pct: '76.1%', s2Fill: '76.1%', s3Num: '6,400', s3Pct: '45.1%', s3Fill: '45.1%', s4Num: '2,890', s4Pct: '20.3%', s4Fill: '20.3%', rate: '20.3% Total Conv' },
        demographics: { total: '348.5K', nonFollowers: '72% (250.9K)', followers: '28% (97.6K)', us: '54% (188.2K)', in: '12% (41.8K)', gb: '22% (76.7K)' }
      },
      '60 Days': {
        followers: '184K', following: '420', views: '685,000', comments: '28,100',
        totalReplies: '16,900', sentToday: '480', activeRulesFlat: '5', capturedLeadsFlat: '5,840',
        reach: '692.0K', trendReach: '▲ +34.2%', engaged: '84.0K', trendEngaged: '▲ +24.1%',
        visits: '56,200', trendVisits: '▲ +30.2%', clicks: '25,400', trendClicks: '▲ +36.8%',
        replies: '16,900', trendReplies: '▲ +26.4%', dmsToday: '620', trendDmsToday: '▲ +14.5%',
        activeRules: '6 Active', trendRules: '● 100% Uptime', leads: '5,840', trendLeads: '▲ +48.0%',
        reachSub: 'Fashion lookbook reach vs profile saves over the last 60 days.',
        legReach: '692.0K', legAct: '56.2K',
        reachSvg: createDualLineChartSvg({ reachPoints: [240, 320, 420, 490, 580, 640, 692], activityPoints: [18, 24, 32, 38, 46, 52, 56.2], xLabels: ['Day 1', 'Day 10', 'Day 20', 'Day 30', 'Day 40', 'Day 50', 'Day 60'], yTop: '750K', yBottom: '0' }),
        funnel: { s1Num: '28,100', s1Pct: '100%', s1Fill: '100%', s2Num: '21,400', s2Pct: '76.2%', s2Fill: '76.2%', s3Num: '12,800', s3Pct: '45.6%', s3Fill: '45.6%', s4Num: '5,840', s4Pct: '20.8%', s4Fill: '20.8%', rate: '20.8% Total Conv' },
        demographics: { total: '692.0K', nonFollowers: '74% (512.1K)', followers: '26% (179.9K)', us: '55% (380.6K)', in: '11% (76.1K)', gb: '24% (166.1K)' }
      },
      '90 Days': {
        followers: '184K', following: '420', views: '1,050,000', comments: '42,800',
        totalReplies: '25,400', sentToday: '640', activeRulesFlat: '5', capturedLeadsFlat: '8,920',
        reach: '1.04M', trendReach: '▲ +39.5%', engaged: '128.0K', trendEngaged: '▲ +28.0%',
        visits: '84,000', trendVisits: '▲ +34.5%', clicks: '38,200', trendClicks: '▲ +41.0%',
        replies: '25,400', trendReplies: '▲ +30.2%', dmsToday: '890', trendDmsToday: '▲ +16.8%',
        activeRules: '6 Active', trendRules: '● 100% Uptime', leads: '8,920', trendLeads: '▲ +54.2%',
        reachSub: 'Fashion lookbook reach vs profile saves over the last 90 days.',
        legReach: '1.04M', legAct: '84.0K',
        reachSvg: createDualLineChartSvg({ reachPoints: [350, 480, 620, 740, 860, 960, 1040], activityPoints: [28, 38, 50, 59, 69, 78, 84], xLabels: ['Day 1', 'Day 15', 'Day 30', 'Day 45', 'Day 60', 'Day 75', 'Day 90'], yTop: '1.2M', yBottom: '0' }),
        funnel: { s1Num: '42,800', s1Pct: '100%', s1Fill: '100%', s2Num: '32,500', s2Pct: '75.9%', s2Fill: '75.9%', s3Num: '19,200', s3Pct: '44.9%', s3Fill: '44.9%', s4Num: '8,920', s4Pct: '20.8%', s4Fill: '20.8%', rate: '20.8% Total Conv' },
        demographics: { total: '1.04M', nonFollowers: '75% (780.0K)', followers: '25% (260.0K)', us: '56% (582.4K)', in: '10% (104.0K)', gb: '25% (260.0K)' }
      }
    },
    store: [
      {
        id: 'prod-s1',
        title: 'Summer 2026 Capsule Wardrobe & Lookbook',
        price: '₹799',
        oldPrice: '₹1,499',
        desc: 'Over 45 curated high-street & designer outfit pairings, direct shopping links with discount codes, and color coordination styling guides.',
        cta: 'Get Lookbook',
        rating: '4.9 (184 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-s2',
        title: 'Moody Warm Lightroom Mobile Presets (10-Pack)',
        price: '₹399',
        oldPrice: '₹899',
        desc: 'One-click aesthetic photo filters designed for golden hour lighting, café moments, and street style photography. Compatible with free Lightroom mobile app.',
        cta: 'Download Presets',
        rating: '5.0 (312 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-s3',
        title: '1-on-1 Personal Styling Consultation',
        price: '₹3,499',
        oldPrice: '₹5,999',
        desc: 'Private 45-minute virtual wardrobe audit, personalized moodboard for your body type, and custom event outfit sourcing.',
        cta: 'Book Consultation',
        rating: '5.0 (42 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-s4',
        title: 'Free Daily Outfit Checklist & Zara Dupes Guide',
        price: 'FREE',
        oldPrice: '₹299',
        desc: 'Free downloadable mini-guide featuring 15 luxury designer clothing dupes from high street brands under ₹2,000.',
        cta: 'Get Free Guide',
        rating: '4.8 (520 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80'
        ]
      }
    ],
    rules: [
      {
        id: 'rule-s-outfit',
        name: 'Reel OOTD Links Auto-DM',
        ruleSub: 'Reel OOTD Links Auto-DM',
        thumbImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
        type: 'reel',
        typeName: 'Reels & Live',
        keywords: ['OUTFIT', 'LINKS'],
        target: 'REELS',
        targetType: 'REELS',
        active: true,
        sentCount: 8420,
        successRate: '99.4%',
        response: 'Hey gorgeous {first_name}! Here are all the direct product links to today’s reel outfit: {link} Enjoy shopping! ✨',
        attachLink: true,
        linkUrl: 'https://renderreply.com/sarah/ootd-links',
        linkTitle: 'Shop Today’s Reel Outfit',
        commentReply: true,
        commentReplyText: 'Sent all outfit links directly to your DMs babe! 💕'
      },
      {
        id: 'rule-s-lookbook',
        name: 'Summer Lookbook Download',
        ruleSub: 'Summer Lookbook Download',
        thumbImg: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
        type: 'post',
        typeName: 'Post Comments',
        keywords: ['LOOKBOOK'],
        target: 'POST',
        targetType: 'POST',
        active: true,
        sentCount: 4120,
        successRate: '98.9%',
        response: 'Hi {first_name}! Here is the link to download my complete Summer 2026 Capsule Lookbook: {link}',
        attachLink: true,
        linkUrl: 'https://renderreply.com/sarah/lookbook',
        linkTitle: 'Summer 2026 Lookbook PDF',
        commentReply: false,
        commentReplyText: ''
      },
      {
        id: 'rule-s-preset',
        name: 'Free Preset Sample Auto-DM',
        ruleSub: 'Free Preset Sample Auto-DM',
        thumbImg: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
        type: 'dm',
        typeName: 'Direct Messages',
        keywords: ['PRESET'],
        target: 'DIRECT_MESSAGES',
        targetType: 'DIRECT_MESSAGES',
        active: true,
        sentCount: 3210,
        successRate: '99.1%',
        response: 'Hey {first_name}! Here is your free Lightroom mobile aesthetic preset DNG file: {link} Can’t wait to see your edits!',
        attachLink: true,
        linkUrl: 'https://renderreply.com/sarah/free-preset',
        linkTitle: 'Download Free Preset',
        commentReply: false,
        commentReplyText: ''
      }
    ],
    inbox: {
      jessica: {
        name: 'Jessica Taylor',
        handle: '@jess_style',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        followers: '64.5K Followers',
        source: 'Reel Comment: "#OUTFIT"',
        status: 'attention',
        botActive: true,
        triggerTitle: 'Triggered by Reel: "Fall Blazer & Linen Pants Styling" (Keyword: "#OUTFIT")',
        messages: [
          { type: 'divider', text: 'TODAY, 11:30 AM' },
          { type: 'user', text: 'Where did you get the oversized beige trench coat from? Love it!', time: '11:30 AM', context: 'Commented "#OUTFIT" on Reel #412' },
          { type: 'bot', text: 'Hey Jessica! The beige trench coat is from Mango (on sale right now) and pants are Zara! Direct links here: https://renderreply.com/sarah/ootd-links', time: '11:30 AM', flow: 'OOTD Auto-DM Flow', hasCard: true }
        ]
      },
      chloe: {
        name: 'Chloe Dupont',
        handle: '@chloe.mode',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        followers: '190K Followers',
        source: 'Reel Comment: "#LOOKBOOK"',
        status: 'bot',
        botActive: true,
        triggerTitle: 'Triggered by Post: "Paris Fashion Week Moodboard"',
        messages: [
          { type: 'divider', text: 'TODAY, 10:15 AM' },
          { type: 'user', text: 'LOOKBOOK please!', time: '10:15 AM', context: 'Commented "LOOKBOOK"' },
          { type: 'bot', text: 'Bonjour Chloe! Here is your private link to the Summer & Paris Lookbook: https://renderreply.com/sarah/lookbook ✨', time: '10:15 AM', flow: 'Lookbook Automated Delivery', hasCard: false }
        ]
      },
      maya: {
        name: 'Maya Lin',
        handle: '@maya_aesthetics',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
        followers: '42K Followers',
        source: 'DM Keyword: "PRESET"',
        status: 'resolved',
        botActive: true,
        triggerTitle: 'Triggered by DM Keyword "PRESET"',
        messages: [
          { type: 'divider', text: 'YESTERDAY' },
          { type: 'user', text: 'PRESET', time: '05:40 PM', context: 'Direct message' },
          { type: 'bot', text: 'Hey Maya! Here is your free golden preset pack: https://renderreply.com/sarah/free-preset', time: '05:40 PM', flow: 'Preset Auto Delivery', hasCard: false },
          { type: 'user', text: 'Thank you Sarah, my photos look stunning with this!', time: '06:10 PM' }
        ]
      }
    },
    leads: [
      {
        id: 'lead-s1',
        handle: '@jess_style',
        name: 'Jessica Taylor',
        avatar: 'JT',
        email: 'jess.taylor@gmail.com',
        phone: '+1 (555) 948-2910',
        keyword: '#OUTFIT',
        campaign: 'outfit',
        status: 'Email Captured',
        statusClass: 'email',
        sourceTitle: 'Fall Blazer & Linen Pants Styling Reel',
        sourceThumb: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=80&q=80',
        time: '1m ago',
        timestamp: 'Today, 11:30 AM',
        commentText: 'Where did you get the oversized trench coat? #OUTFIT',
        botReplyText: 'Hey Jessica! Here are all links: https://renderreply.com/sarah/ootd-links',
        ruleName: 'Reel OOTD Links Auto-DM'
      },
      {
        id: 'lead-s2',
        handle: '@chloe.mode',
        name: 'Chloe Dupont',
        avatar: 'CD',
        email: 'chloe.dupont@vogue-paris.fr',
        phone: '+33 6 12 34 56 78',
        keyword: 'LOOKBOOK',
        campaign: 'lookbook',
        status: 'DM Delivered',
        statusClass: '',
        sourceTitle: 'Paris Fashion Week Capsule Moodboard',
        sourceThumb: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=80&q=80',
        time: '8m ago',
        timestamp: 'Today, 10:15 AM',
        commentText: 'LOOKBOOK please!',
        botReplyText: 'Bonjour Chloe! Here is your lookbook link: https://renderreply.com/sarah/lookbook',
        ruleName: 'Summer Lookbook Download'
      },
      {
        id: 'lead-s3',
        handle: '@maya_aesthetics',
        name: 'Maya Lin',
        avatar: 'ML',
        email: 'maya.lin@nyu.edu',
        phone: '+1 (555) 392-1849',
        keyword: 'PRESET',
        campaign: 'preset',
        status: 'Converted',
        statusClass: 'email',
        sourceTitle: 'Golden Hour Lightroom Mobile Presets Pack',
        sourceThumb: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=80&q=80',
        time: '15m ago',
        timestamp: 'Today, 09:40 AM',
        commentText: 'PRESET',
        botReplyText: 'Hey Maya! Here is your free preset: https://renderreply.com/sarah/free-preset',
        ruleName: 'Free Preset Sample Auto-DM'
      }
    ],
    payments: {
      totalBalance: 385400,
      availableBalance: 312000,
      pendingBalance: 73400,
      payout: {
        upiId: 'sarahstyle@okhdfcbank',
        holderName: 'Sarah Jenkins',
        bankName: 'HDFC Bank',
        accountNumber: '50100481928371',
        ifsc: 'HDFC0000411',
        primaryChannel: 'UPI'
      },
      transactions: [
        { id: '79201948192831', date: 'Oct 24, 2026 11:45 AM', type: 'Order Sale', amount: 34990, status: 'Cleared', customer: 'vip.client@styling.com', channel: 'Direct UPI', fee: 1049, gst: 189, net: 33752 },
        { id: '79201948192828', date: 'Oct 23, 2026 04:20 PM', type: 'Order Sale', amount: 7990, status: 'Cleared', customer: 'emma.fashion@gmail.com', channel: 'Direct UPI', fee: 239, gst: 43, net: 7708 },
        { id: '79201948192820', date: 'Oct 22, 2026 09:10 AM', type: 'Order Sale', amount: 3990, status: 'Cleared', customer: 'lookbook.buyer@nyu.edu', channel: 'Direct UPI', fee: 119, gst: 21, net: 3850 },
        { id: '89102471928410', date: 'Oct 20, 2026 03:00 PM', type: 'Withdrawal', amount: -150000, status: 'Cleared', customer: 'Payout to sarahstyle@okhdfcbank', channel: 'Direct UPI', fee: 0, gst: 0, net: -150000 }
      ]
    },
    biolink: {
      title: 'Sarah Jenkins | Fashion & Daily Style 🌸',
      bio: 'Shop my daily outfits, download my signature presets, and book private styling.',
      links: [
        { label: 'Shop Today’s Reel Outfits ✨', url: 'https://renderreply.com/sarah/ootd', color: 'accent' },
        { label: 'Summer 2026 Lookbook PDF', url: 'https://renderreply.com/sarah/lookbook', color: 'slate' },
        { label: 'Moody Lightroom Presets (10-Pack)', url: 'https://renderreply.com/sarah/presets', color: 'emerald' },
        { label: 'Book 1-on-1 Personal Styling', url: 'https://renderreply.com/sarah/styling', color: 'amber' }
      ],
      video1: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video2: '',
      theme: 'rose-gold'
    }
  },

  // =========================================================================
  // USER 3: Alex Rivera (Fitness & Nutrition Coach)
  // =========================================================================
  'acc-alex': {
    id: 'acc-alex',
    profile: {
      name: 'Alex Rivera (Fit Coach)',
      email: 'alex.fitness@rivera-fit.io',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
      bio: 'Certified Strength Coach & High-Performance Nutritionist 🏋️‍♂️ 1000+ Body Transformations.',
      insta: '@alex_riverafit',
      yt: 'youtube.com/@alexriverafit',
      tw: '@alexriverafit',
      initials: 'AR',
      badge: 'Fitness & Health Coach',
      role: 'Head Coach'
    },
    dashboard: {
      '7 Days': {
        followers: '92.4K', following: '210', views: '48,200', comments: '1,840',
        totalReplies: '1,120', sentToday: '48', activeRulesFlat: '4', capturedLeadsFlat: '380',
        reach: '52.4K', trendReach: '▲ +18.2%', engaged: '6.8K', trendEngaged: '▲ +12.4%',
        visits: '4,450', trendVisits: '▲ +16.0%', clicks: '1,920', trendClicks: '▲ +21.5%',
        replies: '1,120', trendReplies: '▲ +14.8%', dmsToday: '64', trendDmsToday: '▲ +6.5%',
        activeRules: '4 Active', trendRules: '● 100% Uptime', leads: '380', trendLeads: '▲ +28.4%',
        reachSub: 'Workout reels reach vs program clicks over the last 7 days.',
        legReach: '52.4K', legAct: '4.45K',
        reachSvg: createDualLineChartSvg({ reachPoints: [18, 25, 32, 38, 42, 48, 52.4], activityPoints: [1.5, 2.1, 2.8, 3.2, 3.8, 4.1, 4.45], xLabels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], yTop: '60K', yBottom: '0' }),
        funnel: { s1Num: '1,840', s1Pct: '100%', s1Fill: '100%', s2Num: '1,320', s2Pct: '71.7%', s2Fill: '71.7%', s3Num: '760', s3Pct: '41.3%', s3Fill: '41.3%', s4Num: '380', s4Pct: '20.6%', s4Fill: '20.6%', rate: '20.6% Total Conv' },
        demographics: { total: '52.4K', nonFollowers: '66% (34.6K)', followers: '34% (17.8K)', us: '60% (31.4K)', in: '15% (7.9K)', gb: '16% (8.4K)' }
      },
      '14 Days': {
        followers: '92.4K', following: '210', views: '98,000', comments: '3,620',
        totalReplies: '2,240', sentToday: '96', activeRulesFlat: '4', capturedLeadsFlat: '740',
        reach: '104.0K', trendReach: '▲ +20.1%', engaged: '13.4K', trendEngaged: '▲ +13.8%',
        visits: '8,900', trendVisits: '▲ +18.2%', clicks: '3,840', trendClicks: '▲ +24.0%',
        replies: '2,240', trendReplies: '▲ +16.0%', dmsToday: '120', trendDmsToday: '▲ +7.8%',
        activeRules: '4 Active', trendRules: '● 100% Uptime', leads: '740', trendLeads: '▲ +31.2%',
        reachSub: 'Workout reels reach vs program clicks over the last 14 days.',
        legReach: '104.0K', legAct: '8.9K',
        reachSvg: createDualLineChartSvg({ reachPoints: [35, 48, 62, 74, 85, 96, 104], activityPoints: [3.1, 4.2, 5.5, 6.4, 7.4, 8.2, 8.9], xLabels: ['Day 2', 'Day 4', 'Day 6', 'Day 8', 'Day 10', 'Day 12', 'Day 14'], yTop: '120K', yBottom: '0' }),
        funnel: { s1Num: '3,620', s1Pct: '100%', s1Fill: '100%', s2Num: '2,590', s2Pct: '71.5%', s2Fill: '71.5%', s3Num: '1,490', s3Pct: '41.2%', s3Fill: '41.2%', s4Num: '740', s4Pct: '20.4%', s4Fill: '20.4%', rate: '20.4% Total Conv' },
        demographics: { total: '104.0K', nonFollowers: '67% (69.7K)', followers: '33% (34.3K)', us: '61% (63.4K)', in: '14% (14.6K)', gb: '15% (15.6K)' }
      },
      '30 Days': {
        followers: '92.4K', following: '210', views: '184,000', comments: '6,840',
        totalReplies: '4,210', sentToday: '180', activeRulesFlat: '4', capturedLeadsFlat: '1,420',
        reach: '189.4K', trendReach: '▲ +22.1%', engaged: '24.8K', trendEngaged: '▲ +14.5%',
        visits: '16,400', trendVisits: '▲ +20.4%', clicks: '7,200', trendClicks: '▲ +27.2%',
        replies: '4,210', trendReplies: '▲ +17.8%', dmsToday: '240', trendDmsToday: '▲ +8.9%',
        activeRules: '4 Active', trendRules: '● 100% Uptime', leads: '1,420', trendLeads: '▲ +35.8%',
        reachSub: 'Workout reels reach vs program clicks over the last 30 days.',
        legReach: '189.4K', legAct: '16.4K',
        reachSvg: createDualLineChartSvg({ reachPoints: [65, 88, 110, 135, 155, 172, 189.4], activityPoints: [4.2, 6.1, 8.4, 10.5, 12.8, 14.6, 16.4], xLabels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'], yTop: '200K', yBottom: '0' }),
        funnel: { s1Num: '6,840', s1Pct: '100%', s1Fill: '100%', s2Num: '4,920', s2Pct: '71.9%', s2Fill: '71.9%', s3Num: '2,840', s3Pct: '41.5%', s3Fill: '41.5%', s4Num: '1,420', s4Pct: '20.8%', s4Fill: '20.8%', rate: '20.8% Total Conv' },
        demographics: { total: '189.4K', nonFollowers: '68% (128.8K)', followers: '32% (60.6K)', us: '62% (117.4K)', in: '14% (26.5K)', gb: '14% (26.5K)' }
      },
      '60 Days': {
        followers: '92.4K', following: '210', views: '372,000', comments: '13,900',
        totalReplies: '8,540', sentToday: '280', activeRulesFlat: '4', capturedLeadsFlat: '2,890',
        reach: '382.0K', trendReach: '▲ +26.4%', engaged: '49.0K', trendEngaged: '▲ +18.0%',
        visits: '33,000', trendVisits: '▲ +24.8%', clicks: '14,800', trendClicks: '▲ +32.0%',
        replies: '8,540', trendReplies: '▲ +21.5%', dmsToday: '380', trendDmsToday: '▲ +11.4%',
        activeRules: '4 Active', trendRules: '● 100% Uptime', leads: '2,890', trendLeads: '▲ +41.5%',
        reachSub: 'Workout reels reach vs program clicks over the last 60 days.',
        legReach: '382.0K', legAct: '33.0K',
        reachSvg: createDualLineChartSvg({ reachPoints: [130, 180, 230, 275, 315, 350, 382], activityPoints: [9, 13, 17, 21, 26, 30, 33], xLabels: ['Day 1', 'Day 10', 'Day 20', 'Day 30', 'Day 40', 'Day 50', 'Day 60'], yTop: '400K', yBottom: '0' }),
        funnel: { s1Num: '13,900', s1Pct: '100%', s1Fill: '100%', s2Num: '10,000', s2Pct: '71.9%', s2Fill: '71.9%', s3Num: '5,800', s3Pct: '41.7%', s3Fill: '41.7%', s4Num: '2,890', s4Pct: '20.8%', s4Fill: '20.8%', rate: '20.8% Total Conv' },
        demographics: { total: '382.0K', nonFollowers: '69% (263.6K)', followers: '31% (118.4K)', us: '63% (240.7K)', in: '13% (49.7K)', gb: '14% (53.5K)' }
      },
      '90 Days': {
        followers: '92.4K', following: '210', views: '580,000', comments: '21,400',
        totalReplies: '13,200', sentToday: '380', activeRulesFlat: '4', capturedLeadsFlat: '4,450',
        reach: '592.0K', trendReach: '▲ +31.0%', engaged: '76.0K', trendEngaged: '▲ +22.4%',
        visits: '51,000', trendVisits: '▲ +28.9%', clicks: '22,900', trendClicks: '▲ +36.5%',
        replies: '13,200', trendReplies: '▲ +25.8%', dmsToday: '520', trendDmsToday: '▲ +14.2%',
        activeRules: '4 Active', trendRules: '● 100% Uptime', leads: '4,450', trendLeads: '▲ +49.0%',
        reachSub: 'Workout reels reach vs program clicks over the last 90 days.',
        legReach: '592.0K', legAct: '51.0K',
        reachSvg: createDualLineChartSvg({ reachPoints: [200, 280, 360, 430, 495, 550, 592], activityPoints: [14, 20, 27, 33, 40, 47, 51], xLabels: ['Day 1', 'Day 15', 'Day 30', 'Day 45', 'Day 60', 'Day 75', 'Day 90'], yTop: '650K', yBottom: '0' }),
        funnel: { s1Num: '21,400', s1Pct: '100%', s1Fill: '100%', s2Num: '15,400', s2Pct: '72.0%', s2Fill: '72.0%', s3Num: '8,900', s3Pct: '41.6%', s3Fill: '41.6%', s4Num: '4,450', s4Pct: '20.8%', s4Fill: '20.8%', rate: '20.8% Total Conv' },
        demographics: { total: '592.0K', nonFollowers: '70% (414.4K)', followers: '30% (177.6K)', us: '64% (378.9K)', in: '12% (71.0K)', gb: '14% (82.9K)' }
      }
    },
    store: [
      {
        id: 'prod-a1',
        title: '12-Week Lean Muscle Transformation Blueprint',
        price: '₹1,999',
        oldPrice: '₹3,999',
        desc: 'Complete progressive overload workout regime, macro targets, video exercise breakdowns, and weekly check-in templates for rapid body recomposition.',
        cta: 'Join Program',
        rating: '5.0 (98 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-a2',
        title: 'Custom Macro & Nutrition Meal Planner',
        price: '₹999',
        oldPrice: '₹1,899',
        desc: 'Personalized calorie and macro calculation spreadsheet with 60 high-protein recipes, grocery shopping lists, and supplement guide.',
        cta: 'Get Meal Plan',
        rating: '4.9 (145 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-a3',
        title: '1-on-1 Monthly VIP Online Coaching',
        price: '₹9,999',
        oldPrice: '₹14,999',
        desc: 'Dedicated private WhatsApp coaching, custom workout programming updated weekly, form review videos, and bi-weekly Zoom consultations.',
        cta: 'Apply for Coaching',
        rating: '5.0 (24 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-a4',
        title: 'Free 5-Day Shred Workout PDF',
        price: 'FREE',
        oldPrice: '₹499',
        desc: '5 high-intensity gym routines to kickstart fat loss and build shoulder & core definition.',
        cta: 'Download PDF',
        rating: '4.9 (680 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
        ]
      }
    ],
    rules: [
      {
        id: 'rule-a-workout',
        name: 'Free 5-Day Shred Workout PDF',
        ruleSub: 'Free 5-Day Shred Workout PDF',
        thumbImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
        type: 'reel',
        typeName: 'Reels & Live',
        keywords: ['WORKOUT', 'SHRED'],
        target: 'REELS',
        targetType: 'REELS',
        active: true,
        sentCount: 5410,
        successRate: '99.5%',
        response: 'Let’s get after it {first_name}! 💥 Here is your free 5-Day Shred Workout Program PDF: {link} Save it to your phone and crush your next workout!',
        attachLink: true,
        linkUrl: 'https://renderreply.com/alex/shred-program.pdf',
        linkTitle: 'Free 5-Day Shred Workout PDF',
        commentReply: true,
        commentReplyText: 'Sent the 5-day workout plan directly to your DMs brother! Check messages 👊'
      },
      {
        id: 'rule-a-diet',
        name: 'Macro Calculator & Nutrition Guide',
        ruleSub: 'Macro Calculator & Nutrition Guide',
        thumbImg: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
        type: 'post',
        typeName: 'Post Comments',
        keywords: ['DIET', 'MACROS'],
        target: 'POST',
        targetType: 'POST',
        active: true,
        sentCount: 3820,
        successRate: '98.8%',
        response: 'Hey {first_name}! Here is the link to access the High-Protein Meal Planner and Macro Calculator: {link}',
        attachLink: true,
        linkUrl: 'https://renderreply.com/alex/macros-guide',
        linkTitle: 'Macro Calculator & Meal Plan',
        commentReply: false,
        commentReplyText: ''
      },
      {
        id: 'rule-a-coach',
        name: 'VIP 1-on-1 Coaching Application',
        ruleSub: 'VIP 1-on-1 Coaching Application',
        thumbImg: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
        type: 'dm',
        typeName: 'Direct Messages',
        keywords: ['COACHING'],
        target: 'DIRECT_MESSAGES',
        targetType: 'DIRECT_MESSAGES',
        active: true,
        sentCount: 1240,
        successRate: '99.2%',
        response: 'Hey {first_name}! Ready to transform your physique? Fill out our 2-minute VIP Coaching application here: {link} I review every application personally.',
        attachLink: true,
        linkUrl: 'https://renderreply.com/alex/apply',
        linkTitle: 'Apply for VIP Coaching',
        commentReply: false,
        commentReplyText: ''
      }
    ],
    inbox: {
      david: {
        name: 'David Miller',
        handle: '@david_lifts',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        followers: '32K Followers',
        source: 'Reel Comment: "#WORKOUT"',
        status: 'attention',
        botActive: true,
        triggerTitle: 'Triggered by Reel: "3 Chest Exercises to Build Upper Pecs" (Keyword: "#WORKOUT")',
        messages: [
          { type: 'divider', text: 'TODAY, 09:20 AM' },
          { type: 'user', text: 'WORKOUT! Can you send the PDF?', time: '09:20 AM', context: 'Commented on chest reel' },
          { type: 'bot', text: 'Hey David! Here is the free 5-Day Shred Workout PDF: https://renderreply.com/alex/shred-program.pdf Let’s get those gains!', time: '09:20 AM', flow: 'Fitness Lead Magnet Flow', hasCard: true }
        ]
      },
      ryan: {
        name: 'Ryan Chen',
        handle: '@ryan_fitlife',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        followers: '78K Followers',
        source: 'Reel Comment: "#DIET"',
        status: 'bot',
        botActive: true,
        triggerTitle: 'Triggered by Reel: "What I Eat in a Day for 180g Protein"',
        messages: [
          { type: 'divider', text: 'TODAY, 08:15 AM' },
          { type: 'user', text: 'DIET info please!', time: '08:15 AM', context: 'Commented "#DIET"' },
          { type: 'bot', text: 'Hey Ryan! Here is your custom macro calculator and 60-recipe meal guide: https://renderreply.com/alex/macros-guide', time: '08:15 AM', flow: 'Nutrition Automation Flow', hasCard: false }
        ]
      },
      brody: {
        name: 'Marcus Brody',
        handle: '@brody_fitness',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
        followers: '110K Followers',
        source: 'DM Keyword: "#COACHING"',
        status: 'resolved',
        botActive: true,
        triggerTitle: 'VIP Coaching Inquiry',
        messages: [
          { type: 'divider', text: 'YESTERDAY' },
          { type: 'user', text: 'COACHING', time: '06:12 PM', context: 'Direct message' },
          { type: 'bot', text: 'Hey Marcus! Fill out our VIP coaching application: https://renderreply.com/alex/apply', time: '06:12 PM', flow: 'Coaching Funnel', hasCard: false },
          { type: 'user', text: 'Submitted application! Looking forward to working with you.', time: '06:30 PM' }
        ]
      }
    },
    leads: [
      {
        id: 'lead-a1',
        handle: '@david_lifts',
        name: 'David Miller',
        avatar: 'DM',
        email: 'david.miller@techcorp.com',
        phone: '+1 (555) 345-6789',
        keyword: '#WORKOUT',
        campaign: 'workout',
        status: 'Email Captured',
        statusClass: 'email',
        sourceTitle: '3 Chest Exercises to Build Upper Pecs Reel',
        sourceThumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=80',
        time: '4m ago',
        timestamp: 'Today, 09:20 AM',
        commentText: 'WORKOUT! Can you send the PDF?',
        botReplyText: 'Hey David! Here is your PDF: https://renderreply.com/alex/shred-program.pdf',
        ruleName: 'Free 5-Day Shred Workout PDF'
      },
      {
        id: 'lead-a2',
        handle: '@ryan_fitlife',
        name: 'Ryan Chen',
        avatar: 'RC',
        email: 'ryan.chen@berkeley.edu',
        phone: '+1 (555) 912-4820',
        keyword: 'DIET',
        campaign: 'diet',
        status: 'DM Delivered',
        statusClass: '',
        sourceTitle: 'What I Eat in a Day for 180g Protein Post',
        sourceThumb: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=80&q=80',
        time: '18m ago',
        timestamp: 'Today, 08:15 AM',
        commentText: 'DIET info please!',
        botReplyText: 'Hey Ryan! Here is the nutrition link: https://renderreply.com/alex/macros-guide',
        ruleName: 'Macro Calculator & Nutrition Guide'
      }
    ],
    payments: {
      totalBalance: 412500,
      availableBalance: 345000,
      pendingBalance: 67500,
      payout: {
        upiId: 'alexriverafit@okhdfcbank',
        holderName: 'Alex Rivera',
        bankName: 'HDFC Bank',
        accountNumber: '50100998811234',
        ifsc: 'HDFC0000892',
        primaryChannel: 'UPI'
      },
      transactions: [
        { id: '88401948192019', date: 'Oct 24, 2026 09:30 AM', type: 'Order Sale', amount: 99990, status: 'Cleared', customer: 'marcus.brody@gymshark.com', channel: 'Direct UPI', fee: 2999, gst: 540, net: 96451 },
        { id: '88401948192015', date: 'Oct 23, 2026 02:10 PM', type: 'Order Sale', amount: 19990, status: 'Cleared', customer: 'david.miller@techcorp.com', channel: 'Direct UPI', fee: 599, gst: 108, net: 19283 },
        { id: '88401948192008', date: 'Oct 22, 2026 04:45 PM', type: 'Order Sale', amount: 9990, status: 'Cleared', customer: 'ryan.chen@berkeley.edu', channel: 'Direct UPI', fee: 299, gst: 54, net: 9637 },
        { id: '89102471928001', date: 'Oct 20, 2026 01:15 PM', type: 'Withdrawal', amount: -200000, status: 'Cleared', customer: 'Payout to alexriverafit@okhdfcbank', channel: 'Direct UPI', fee: 0, gst: 0, net: -200000 }
      ]
    },
    biolink: {
      title: 'Alex Rivera | Elite Strength & Nutrition 💥',
      bio: 'Transform your body with science-backed training programs and personalized coaching.',
      links: [
        { label: 'Join 12-Week Transformation Challenge 🏋️', url: 'https://renderreply.com/alex/12-weeks', color: 'accent' },
        { label: 'Apply for 1-on-1 VIP Online Coaching', url: 'https://renderreply.com/alex/apply', color: 'slate' },
        { label: 'Free 5-Day Shred Workout PDF', url: 'https://renderreply.com/alex/shred-pdf', color: 'emerald' },
        { label: 'Calculate Your Daily Macros Free', url: 'https://renderreply.com/alex/macros', color: 'amber' }
      ],
      video1: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video2: '',
      theme: 'midnight-emerald'
    }
  },

  // =========================================================================
  // USER 4: RenderReply Agency Pro (Multi-Client Enterprise Agency)
  // =========================================================================
  'acc-agency': {
    id: 'acc-agency',
    profile: {
      name: 'RenderReply Agency Pro',
      email: 'agency@renderreply.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      bio: 'Enterprise Instagram Growth & DM Automation Infrastructure for Brands & Agencies 🚀 Managing 25+ creators.',
      insta: '@renderagency',
      yt: 'youtube.com/@renderagency',
      tw: '@renderagency',
      initials: 'RA',
      badge: 'Enterprise Agency Tier',
      role: 'Agency Admin'
    },
    dashboard: {
      '7 Days': {
        followers: '540K', following: '85', views: '480,000', comments: '18,400',
        totalReplies: '11,200', sentToday: '480', activeRulesFlat: '12', capturedLeadsFlat: '3,840',
        reach: '390.0K', trendReach: '▲ +38.2%', engaged: '48.2K', trendEngaged: '▲ +24.5%',
        visits: '26,400', trendVisits: '▲ +32.0%', clicks: '12,900', trendClicks: '▲ +38.4%',
        replies: '11,200', trendReplies: '▲ +28.5%', dmsToday: '480', trendDmsToday: '▲ +14.2%',
        activeRules: '12 Active', trendRules: '● 100% Uptime', leads: '3,840', trendLeads: '▲ +48.0%',
        reachSub: 'Combined multi-client reach vs lead conversions over the last 7 days.',
        legReach: '390.0K', legAct: '26.4K',
        reachSvg: createDualLineChartSvg({ reachPoints: [120, 170, 220, 270, 310, 355, 390], activityPoints: [8.5, 12.1, 15.8, 19.4, 22.1, 24.8, 26.4], xLabels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], yTop: '450K', yBottom: '0' }),
        funnel: { s1Num: '18,400', s1Pct: '100%', s1Fill: '100%', s2Num: '12,900', s2Pct: '70.1%', s2Fill: '70.1%', s3Num: '7,600', s3Pct: '41.3%', s3Fill: '41.3%', s4Num: '3,840', s4Pct: '20.9%', s4Fill: '20.9%', rate: '20.9% Total Conv' },
        demographics: { total: '390.0K', nonFollowers: '76% (296.4K)', followers: '24% (93.6K)', us: '46% (179.4K)', in: '22% (85.8K)', gb: '18% (70.2K)' }
      },
      '14 Days': {
        followers: '540K', following: '85', views: '920,000', comments: '35,600',
        totalReplies: '22,400', sentToday: '940', activeRulesFlat: '12', capturedLeadsFlat: '7,480',
        reach: '760.0K', trendReach: '▲ +42.0%', engaged: '96.0K', trendEngaged: '▲ +26.8%',
        visits: '52,000', trendVisits: '▲ +36.4%', clicks: '25,400', trendClicks: '▲ +42.0%',
        replies: '22,400', trendReplies: '▲ +32.0%', dmsToday: '940', trendDmsToday: '▲ +16.0%',
        activeRules: '12 Active', trendRules: '● 100% Uptime', leads: '7,480', trendLeads: '▲ +51.2%',
        reachSub: 'Combined multi-client reach vs lead conversions over the last 14 days.',
        legReach: '760.0K', legAct: '52.0K',
        reachSvg: createDualLineChartSvg({ reachPoints: [240, 340, 440, 530, 620, 700, 760], activityPoints: [16, 24, 31, 38, 44, 49, 52], xLabels: ['Day 2', 'Day 4', 'Day 6', 'Day 8', 'Day 10', 'Day 12', 'Day 14'], yTop: '850K', yBottom: '0' }),
        funnel: { s1Num: '35,600', s1Pct: '100%', s1Fill: '100%', s2Num: '25,100', s2Pct: '70.5%', s2Fill: '70.5%', s3Num: '14,800', s3Pct: '41.6%', s3Fill: '41.6%', s4Num: '7,480', s4Pct: '21.0%', s4Fill: '21.0%', rate: '21.0% Total Conv' },
        demographics: { total: '760.0K', nonFollowers: '77% (585.2K)', followers: '23% (174.8K)', us: '47% (357.2K)', in: '21% (159.6K)', gb: '18% (136.8K)' }
      },
      '30 Days': {
        followers: '540K', following: '85', views: '1,840,000', comments: '68,400',
        totalReplies: '42,900', sentToday: '1,840', activeRulesFlat: '12', capturedLeadsFlat: '14,850',
        reach: '1.42M', trendReach: '▲ +45.2%', engaged: '184.2K', trendEngaged: '▲ +28.4%',
        visits: '98,400', trendVisits: '▲ +41.5%', clicks: '48,200', trendClicks: '▲ +46.8%',
        replies: '42,900', trendReplies: '▲ +35.2%', dmsToday: '1,840', trendDmsToday: '▲ +18.4%',
        activeRules: '12 Active', trendRules: '● 100% Uptime', leads: '14,850', trendLeads: '▲ +54.2%',
        reachSub: 'Combined multi-client reach vs lead conversions over the last 30 days.',
        legReach: '1.42M', legAct: '98.4K',
        reachSvg: createDualLineChartSvg({ reachPoints: [480, 620, 810, 950, 1140, 1290, 1420], activityPoints: [32, 45, 58, 71, 84, 91, 98.4], xLabels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'], yTop: '1.6M', yBottom: '0' }),
        funnel: { s1Num: '68,400', s1Pct: '100%', s1Fill: '100%', s2Num: '48,200', s2Pct: '70.5%', s2Fill: '70.5%', s3Num: '28,400', s3Pct: '41.5%', s3Fill: '41.5%', s4Num: '14,850', s4Pct: '21.7%', s4Fill: '21.7%', rate: '21.7% Total Conv' },
        demographics: { total: '1.42M', nonFollowers: '78% (1.11M)', followers: '22% (312K)', us: '48% (681.6K)', in: '20% (284.0K)', gb: '19% (269.8K)' }
      },
      '60 Days': {
        followers: '540K', following: '85', views: '3,750,000', comments: '138,000',
        totalReplies: '86,500', sentToday: '2,900', activeRulesFlat: '12', capturedLeadsFlat: '29,800',
        reach: '2.85M', trendReach: '▲ +52.0%', engaged: '372.0K', trendEngaged: '▲ +34.0%',
        visits: '198,000', trendVisits: '▲ +48.0%', clicks: '98,000', trendClicks: '▲ +54.0%',
        replies: '86,500', trendReplies: '▲ +42.0%', dmsToday: '2,900', trendDmsToday: '▲ +22.0%',
        activeRules: '12 Active', trendRules: '● 100% Uptime', leads: '29,800', trendLeads: '▲ +62.0%',
        reachSub: 'Combined multi-client reach vs lead conversions over the last 60 days.',
        legReach: '2.85M', legAct: '198K',
        reachSvg: createDualLineChartSvg({ reachPoints: [960, 1280, 1640, 1980, 2320, 2620, 2850], activityPoints: [65, 88, 118, 142, 168, 185, 198], xLabels: ['Day 1', 'Day 10', 'Day 20', 'Day 30', 'Day 40', 'Day 50', 'Day 60'], yTop: '3.2M', yBottom: '0' }),
        funnel: { s1Num: '138,000', s1Pct: '100%', s1Fill: '100%', s2Num: '98,000', s2Pct: '71.0%', s2Fill: '71.0%', s3Num: '58,000', s3Pct: '42.0%', s3Fill: '42.0%', s4Num: '29,800', s4Pct: '21.6%', s4Fill: '21.6%', rate: '21.6% Total Conv' },
        demographics: { total: '2.85M', nonFollowers: '79% (2.25M)', followers: '21% (598K)', us: '49% (1.40M)', in: '19% (541.5K)', gb: '20% (570.0K)' }
      },
      '90 Days': {
        followers: '540K', following: '85', views: '5,800,000', comments: '214,000',
        totalReplies: '134,000', sentToday: '4,100', activeRulesFlat: '12', capturedLeadsFlat: '46,200',
        reach: '4.42M', trendReach: '▲ +59.0%', engaged: '580.0K', trendEngaged: '▲ +39.0%',
        visits: '310,000', trendVisits: '▲ +55.0%', clicks: '154,000', trendClicks: '▲ +62.0%',
        replies: '134,000', trendReplies: '▲ +48.0%', dmsToday: '4,100', trendDmsToday: '▲ +26.0%',
        activeRules: '12 Active', trendRules: '● 100% Uptime', leads: '46,200', trendLeads: '▲ +71.0%',
        reachSub: 'Combined multi-client reach vs lead conversions over the last 90 days.',
        legReach: '4.42M', legAct: '310K',
        reachSvg: createDualLineChartSvg({ reachPoints: [1450, 1980, 2540, 3100, 3620, 4080, 4420], activityPoints: [98, 138, 182, 224, 265, 290, 310], xLabels: ['Day 1', 'Day 15', 'Day 30', 'Day 45', 'Day 60', 'Day 75', 'Day 90'], yTop: '5.0M', yBottom: '0' }),
        funnel: { s1Num: '214,000', s1Pct: '100%', s1Fill: '100%', s2Num: '152,000', s2Pct: '71.0%', s2Fill: '71.0%', s3Num: '90,000', s3Pct: '42.1%', s3Fill: '42.1%', s4Num: '46,200', s4Pct: '21.6%', s4Fill: '21.6%', rate: '21.6% Total Conv' },
        demographics: { total: '4.42M', nonFollowers: '80% (3.54M)', followers: '20% (884K)', us: '50% (2.21M)', in: '18% (795.6K)', gb: '20% (884.0K)' }
      }
    },
    store: [
      {
        id: 'prod-ag1',
        title: 'Agency Whitelabel Multi-Client License',
        price: '₹24,999',
        oldPrice: '₹49,999',
        desc: 'Deploy unlimited client Instagram accounts with custom domain branding, high-speed webhook relays, and multi-user team seats.',
        cta: 'Get Agency License',
        rating: '5.0 (46 agency partners)',
        photos: [
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-ag2',
        title: 'Enterprise Instagram Funnel Playbook 2026',
        price: '₹4,999',
        oldPrice: '₹9,999',
        desc: '120-page blueprint detailing SOPs, DM sales scripts, and conversion rate optimization benchmarks for 7-figure creator brands.',
        cta: 'Download Playbook',
        rating: '5.0 (82 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-ag3',
        title: 'High-Ticket Client Acquisition DM Scripts',
        price: '₹2,499',
        oldPrice: '₹4,999',
        desc: 'Tested outbound & inbound conversation frameworks to close $3,000–$10,000 agency retainers inside Instagram DMs.',
        cta: 'Access Scripts',
        rating: '4.9 (110 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80'
        ]
      },
      {
        id: 'prod-ag4',
        title: 'Agency Automation Demo & Starter Template Pack',
        price: 'FREE',
        oldPrice: '₹1,999',
        desc: 'Interactive demo bot schema and 5 starter automation flows ready to deploy for your first agency client.',
        cta: 'Free Demo Access',
        rating: '5.0 (340 reviews)',
        photos: [
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80'
        ]
      }
    ],
    rules: [
      {
        id: 'rule-ag-scale',
        name: 'Agency Multi-Client Scaling System',
        ruleSub: 'Agency Multi-Client Scaling System',
        thumbImg: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
        type: 'post',
        typeName: 'Post Comments',
        keywords: ['SCALE', 'AGENCY'],
        target: 'POST',
        targetType: 'POST',
        active: true,
        sentCount: 18420,
        successRate: '99.8%',
        response: 'Welcome {first_name}! Here is the complete RenderReply Agency Scaling infrastructure and demo access: {link}',
        attachLink: true,
        linkUrl: 'https://renderreply.com/agency/scale',
        linkTitle: 'Agency Scaling Portal',
        commentReply: true,
        commentReplyText: 'Check your DMs for the full agency breakdown! 🚀'
      },
      {
        id: 'rule-ag-demo',
        name: 'Live Interactive Demo Bot',
        ruleSub: 'Live Interactive Demo Bot',
        thumbImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        type: 'dm',
        typeName: 'Direct Messages',
        keywords: ['DEMO'],
        target: 'DIRECT_MESSAGES',
        targetType: 'DIRECT_MESSAGES',
        active: true,
        sentCount: 12400,
        successRate: '99.1%',
        response: 'Hey {first_name}! You are testing our live automated enterprise relay. Here is your interactive client demo environment: {link}',
        attachLink: true,
        linkUrl: 'https://renderreply.com/agency/live-demo',
        linkTitle: 'Launch Interactive Demo',
        commentReply: false,
        commentReplyText: ''
      },
      {
        id: 'rule-ag-audit',
        name: 'Free 7-Figure Account DM Audit',
        ruleSub: 'Free 7-Figure Account DM Audit',
        thumbImg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
        type: 'reel',
        typeName: 'Reels & Live',
        keywords: ['AUDIT'],
        target: 'REELS',
        targetType: 'REELS',
        active: true,
        sentCount: 6120,
        successRate: '98.6%',
        response: 'Hey {first_name}! Book your agency’s complimentary 30-minute Instagram funnel audit: {link}',
        attachLink: true,
        linkUrl: 'https://renderreply.com/agency/book-audit',
        linkTitle: 'Schedule Funnel Audit',
        commentReply: false,
        commentReplyText: ''
      }
    ],
    inbox: {
      daniel: {
        name: 'Daniel Vance',
        handle: '@vance_media',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        followers: '280K Followers',
        source: 'Inquiry: Agency Whitelabel 10-Seat Tier',
        status: 'attention',
        botActive: true,
        triggerTitle: 'Triggered by Reel: "How We Scale 20+ Creators to $50k/mo" (Keyword: "#SCALE")',
        messages: [
          { type: 'divider', text: 'TODAY, 02:00 PM' },
          { type: 'user', text: 'SCALE! We have 14 clients and want to onboard them all to RenderReply this week. Can we speak with your partner lead?', time: '02:00 PM', context: 'Agency Lead' },
          { type: 'bot', text: 'Hey Daniel! Absolutely! Here is direct access to our Agency Partner Portal and priority booking link: https://renderreply.com/agency/scale', time: '02:00 PM', flow: 'Enterprise Inbound Flow', hasCard: true }
        ]
      },
      sophie: {
        name: 'Sophie Laurent',
        handle: '@sophie_growth',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        followers: '150K Followers',
        source: 'Reel Trigger: "#DEMO"',
        status: 'bot',
        botActive: true,
        triggerTitle: 'Triggered by DM Keyword "DEMO"',
        messages: [
          { type: 'divider', text: 'TODAY, 01:10 PM' },
          { type: 'user', text: 'DEMO', time: '01:10 PM', context: 'Demo Bot Keyword' },
          { type: 'bot', text: 'Hey Sophie! Launching your custom client sandbox now: https://renderreply.com/agency/live-demo', time: '01:10 PM', flow: 'Sandbox Generator', hasCard: false }
        ]
      },
      kevin: {
        name: 'Kevin Ortiz',
        handle: '@kevin_ecom',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        followers: '410K Followers',
        source: 'Whitelabel Contract: Signed',
        status: 'resolved',
        botActive: false,
        triggerTitle: 'Enterprise Whitelabel Partner',
        messages: [
          { type: 'divider', text: 'YESTERDAY' },
          { type: 'user', text: 'Contract signed and invoice paid for the annual 25-seat whitelabel tier!', time: '04:15 PM' },
          { type: 'human', text: 'Welcome aboard Kevin! Your dedicated Slack channel and API tokens are live. Let’s crush it!', time: '04:20 PM' }
        ]
      }
    },
    leads: [
      {
        id: 'lead-ag1',
        handle: '@vance_media',
        name: 'Daniel Vance',
        avatar: 'DV',
        email: 'daniel@vancemedia.agency',
        phone: '+1 (555) 892-1049',
        keyword: '#SCALE',
        campaign: 'scale',
        status: 'Email Captured',
        statusClass: 'email',
        sourceTitle: 'How We Scale 20+ Creators to $50k/mo Reel',
        sourceThumb: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=80&q=80',
        time: '2m ago',
        timestamp: 'Today, 02:00 PM',
        commentText: 'SCALE! We have 14 clients and want to onboard them all.',
        botReplyText: 'Hey Daniel! Here is the partner portal link: https://renderreply.com/agency/scale',
        ruleName: 'Agency Multi-Client Scaling System'
      },
      {
        id: 'lead-ag2',
        handle: '@sophie_growth',
        name: 'Sophie Laurent',
        avatar: 'SL',
        email: 'sophie@elevateagency.co',
        phone: '+33 6 98 76 54 32',
        keyword: 'DEMO',
        campaign: 'demo',
        status: 'DM Delivered',
        statusClass: '',
        sourceTitle: 'Live Interactive Interactive Demo Bot',
        sourceThumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=80&q=80',
        time: '10m ago',
        timestamp: 'Today, 01:10 PM',
        commentText: 'DEMO',
        botReplyText: 'Hey Sophie! Here is your demo link: https://renderreply.com/agency/live-demo',
        ruleName: 'Live Interactive Demo Bot'
      }
    ],
    payments: {
      totalBalance: 842000,
      availableBalance: 695000,
      pendingBalance: 147000,
      payout: {
        upiId: 'renderagency@icici',
        holderName: 'RenderReply Agency Pro',
        bankName: 'ICICI Bank',
        accountNumber: '001928471629',
        ifsc: 'ICIC0000019',
        primaryChannel: 'Direct Bank'
      },
      transactions: [
        { id: '99201948192801', date: 'Oct 24, 2026 01:45 PM', type: 'Order Sale', amount: 249990, status: 'Cleared', customer: 'kevin@apexbrandgroup.com', channel: 'Bank NEFT', fee: 0, gst: 44998, net: 249990 },
        { id: '99201948192795', date: 'Oct 23, 2026 11:15 AM', type: 'Order Sale', amount: 49990, status: 'Cleared', customer: 'daniel@vancemedia.agency', channel: 'Direct UPI', fee: 1499, gst: 270, net: 48221 },
        { id: '99201948192780', date: 'Oct 21, 2026 03:30 PM', type: 'Order Sale', amount: 24990, status: 'Cleared', customer: 'sophie@elevateagency.co', channel: 'Direct UPI', fee: 749, gst: 135, net: 24106 },
        { id: '89102471928999', date: 'Oct 19, 2026 10:00 AM', type: 'Withdrawal', amount: -400000, status: 'Cleared', customer: 'Payout to ICICI Bank ••••1629', channel: 'Bank IMPS', fee: 0, gst: 0, net: -400000 }
      ]
    },
    biolink: {
      title: 'RenderReply Agency Pro | Enterprise Automations 🚀',
      bio: 'Automating high-converting Instagram DM funnels for top creators, founders & 7-figure agencies.',
      links: [
        { label: 'Book Agency Whitelabel Demo 🚀', url: 'https://renderreply.com/agency/demo', color: 'accent' },
        { label: 'Download 2026 Funnel Playbook PDF', url: 'https://renderreply.com/agency/playbook', color: 'slate' },
        { label: 'Apply for Agency Partner Program', url: 'https://renderreply.com/agency/apply', color: 'emerald' },
        { label: 'Client Onboarding Portal', url: 'https://renderreply.com/agency/login', color: 'amber' }
      ],
      video1: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video2: '',
      theme: 'royal-indigo'
    }
  }
};

module.exports = { USER_ACCOUNTS_DATABASE, createDualLineChartSvg };
