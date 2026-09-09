/* ==========================================================================
   RENDERREPLY MULTI-USER DATA ENGINE & CENTRALIZED SYNCHRONIZATION SYSTEM
   ========================================================================== */

// Helper SVG Generator for Dual Line Reach & Activity Chart
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
        <rect class="chart-hover-trigger" data-idx="${i}" data-label="${xLabels[i]}" data-reach="${reachPoints[i]}K" data-act="${activityPoints[i]}K" data-x="${x}" data-reach-y="${reachY[i]}" data-act-y="${actY[i]}" x="${x - (step || 20) / 2}" y="0" width="${step || 40}" height="145" fill="transparent" style="cursor: crosshair;"/>
      `).join('')}
    </svg>
  `;
}

// CENTRALIZED 4-USER SIMULATED ACCOUNTS DATABASE (JSON)
window.USER_ACCOUNTS_DATABASE = {
  "acc-rudra": {
    "id": "acc-rudra",
    "profile": {
      "name": "RudRa RR",
      "email": "rudrateja08@gmail.com",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      "bio": "Welcome to my SuperProfile & RenderReply Store! Building AI automations and fullstack dev guides.",
      "insta": "@render6457",
      "yt": "youtube.com/@rudrateja",
      "tw": "@rudrateja",
      "initials": "R",
      "badge": "Tech & Automation Creator",
      "role": "Admin / Full Access"
    },
    "dashboard": {
      "7 Days": {
        "followers": "48",
        "following": "12",
        "views": "380",
        "comments": "52",
        "totalReplies": "28",
        "sentToday": "6",
        "activeRulesFlat": "3",
        "capturedLeadsFlat": "9",
        "reach": "12.4K",
        "trendReach": "▲ +9.2%",
        "engaged": "1.4K",
        "trendEngaged": "▲ +5.6%",
        "visits": "820",
        "trendVisits": "▲ +12.4%",
        "clicks": "210",
        "trendClicks": "▲ +14.8%",
        "replies": "310",
        "trendReplies": "▲ +8.5%",
        "dmsToday": "18",
        "trendDmsToday": "▲ +4.0%",
        "activeRules": "5 Active",
        "trendRules": "● 100% Uptime",
        "leads": "84",
        "trendLeads": "▲ +18.2%",
        "reachSub": "Instagram reach vs profile activity over the last 7 days.",
        "legReach": "12.4K",
        "legAct": "820",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_stdyd0h02\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">15K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,85.54838709677419 L 81.66666666666666,72.3225806451613 L 127.33333333333333,59.09677419354839 L 173,65.70967741935485 L 218.66666666666666,45.87096774193549 L 264.3333333333333,39.25806451612904 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_stdyd0h02)\"/>\n      <path d=\"M 36,85.54838709677419 L 81.66666666666666,72.3225806451613 L 127.33333333333333,59.09677419354839 L 173,65.70967741935485 L 218.66666666666666,45.87096774193549 L 264.3333333333333,39.25806451612904 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,100 L 81.66666666666666,94 L 127.33333333333333,82 L 173,88 L 218.66666666666666,70 L 264.3333333333333,67 L 310,62.800000000000004\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"85.54838709677419\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"100\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"72.3225806451613\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"94\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"59.09677419354839\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"82\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"65.70967741935485\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"88\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"45.87096774193549\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"70\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"39.25806451612904\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"67\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"62.800000000000004\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 2</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 3</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 4</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 5</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 6</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 7</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"4K\" data-act=\"0.2K\" data-x=\"36\" data-reach-y=\"85.54838709677419\" data-act-y=\"100\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 2\" data-reach=\"6K\" data-act=\"0.3K\" data-x=\"81.66666666666666\" data-reach-y=\"72.3225806451613\" data-act-y=\"94\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 3\" data-reach=\"8K\" data-act=\"0.5K\" data-x=\"127.33333333333333\" data-reach-y=\"59.09677419354839\" data-act-y=\"82\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 4\" data-reach=\"7K\" data-act=\"0.4K\" data-x=\"173\" data-reach-y=\"65.70967741935485\" data-act-y=\"88\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 5\" data-reach=\"10K\" data-act=\"0.7K\" data-x=\"218.66666666666666\" data-reach-y=\"45.87096774193549\" data-act-y=\"70\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 6\" data-reach=\"11K\" data-act=\"0.75K\" data-x=\"264.3333333333333\" data-reach-y=\"39.25806451612904\" data-act-y=\"67\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 7\" data-reach=\"12.4K\" data-act=\"0.82K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"62.800000000000004\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "420",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "310",
          "s2Pct": "73.8%",
          "s2Fill": "73.8%",
          "s3Num": "160",
          "s3Pct": "38.0%",
          "s3Fill": "38.0%",
          "s4Num": "84",
          "s4Pct": "20.0%",
          "s4Fill": "20.0%",
          "rate": "20.0% Total Conv"
        },
        "demographics": {
          "total": "12.4K",
          "nonFollowers": "62% (7.7K)",
          "followers": "38% (4.7K)",
          "us": "40% (5.0K)",
          "in": "30% (3.7K)",
          "gb": "15% (1.9K)"
        }
      },
      "14 Days": {
        "followers": "48",
        "following": "12",
        "views": "740",
        "comments": "110",
        "totalReplies": "58",
        "sentToday": "10",
        "activeRulesFlat": "3",
        "capturedLeadsFlat": "18",
        "reach": "24.8K",
        "trendReach": "▲ +11.5%",
        "engaged": "2.9K",
        "trendEngaged": "▲ +7.2%",
        "visits": "1,680",
        "trendVisits": "▲ +15.1%",
        "clicks": "440",
        "trendClicks": "▲ +18.0%",
        "replies": "620",
        "trendReplies": "▲ +10.2%",
        "dmsToday": "42",
        "trendDmsToday": "▲ +4.8%",
        "activeRules": "5 Active",
        "trendRules": "● 100% Uptime",
        "leads": "172",
        "trendLeads": "▲ +24.5%",
        "reachSub": "Instagram reach vs profile activity over the last 14 days.",
        "legReach": "24.8K",
        "legAct": "1.68K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_1qe0d7s6k\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">30K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,85.54838709677419 L 81.66666666666666,72.3225806451613 L 127.33333333333333,59.09677419354839 L 173,65.70967741935485 L 218.66666666666666,45.87096774193549 L 264.3333333333333,39.25806451612904 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_1qe0d7s6k)\"/>\n      <path d=\"M 36,85.54838709677419 L 81.66666666666666,72.3225806451613 L 127.33333333333333,59.09677419354839 L 173,65.70967741935485 L 218.66666666666666,45.87096774193549 L 264.3333333333333,39.25806451612904 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,94.14285714285714 L 81.66666666666666,87 L 127.33333333333333,76.28571428571428 L 173,79.85714285714286 L 218.66666666666666,62.00000000000001 L 264.3333333333333,58.42857142857142 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"85.54838709677419\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"94.14285714285714\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"72.3225806451613\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"87\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"59.09677419354839\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"76.28571428571428\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"65.70967741935485\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"79.85714285714286\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"45.87096774193549\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"62.00000000000001\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"39.25806451612904\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"58.42857142857142\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 2</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 4</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 6</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 8</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 12</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 14</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 2\" data-reach=\"8K\" data-act=\"0.5K\" data-x=\"36\" data-reach-y=\"85.54838709677419\" data-act-y=\"94.14285714285714\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 4\" data-reach=\"12K\" data-act=\"0.7K\" data-x=\"81.66666666666666\" data-reach-y=\"72.3225806451613\" data-act-y=\"87\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 6\" data-reach=\"16K\" data-act=\"1K\" data-x=\"127.33333333333333\" data-reach-y=\"59.09677419354839\" data-act-y=\"76.28571428571428\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 8\" data-reach=\"14K\" data-act=\"0.9K\" data-x=\"173\" data-reach-y=\"65.70967741935485\" data-act-y=\"79.85714285714286\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 10\" data-reach=\"20K\" data-act=\"1.4K\" data-x=\"218.66666666666666\" data-reach-y=\"45.87096774193549\" data-act-y=\"62.00000000000001\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 12\" data-reach=\"22K\" data-act=\"1.5K\" data-x=\"264.3333333333333\" data-reach-y=\"39.25806451612904\" data-act-y=\"58.42857142857142\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 14\" data-reach=\"24.8K\" data-act=\"1.68K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "890",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "620",
          "s2Pct": "69.6%",
          "s2Fill": "69.6%",
          "s3Num": "310",
          "s3Pct": "34.8%",
          "s3Fill": "34.8%",
          "s4Num": "172",
          "s4Pct": "19.3%",
          "s4Fill": "19.3%",
          "rate": "19.3% Total Conv"
        },
        "demographics": {
          "total": "24.8K",
          "nonFollowers": "63% (15.6K)",
          "followers": "37% (9.2K)",
          "us": "41% (10.2K)",
          "in": "29% (7.2K)",
          "gb": "14% (3.5K)"
        }
      },
      "30 Days": {
        "followers": "48",
        "following": "12",
        "views": "1,240",
        "comments": "184",
        "totalReplies": "96",
        "sentToday": "14",
        "activeRulesFlat": "3",
        "capturedLeadsFlat": "28",
        "reach": "48.2K",
        "trendReach": "▲ +14.2%",
        "engaged": "5.8K",
        "trendEngaged": "▲ +8.4%",
        "visits": "3,410",
        "trendVisits": "▲ +18.0%",
        "clicks": "890",
        "trendClicks": "▲ +22.5%",
        "replies": "1,240",
        "trendReplies": "▲ +12.8%",
        "dmsToday": "86",
        "trendDmsToday": "▲ +5.2%",
        "activeRules": "5 Active",
        "trendRules": "● 100% Uptime",
        "leads": "342",
        "trendLeads": "▲ +31.4%",
        "reachSub": "Instagram reach vs profile activity over the last 30 days.",
        "legReach": "48.2K",
        "legAct": "3.41K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_osmvofx8g\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">50K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,81.37759336099585 L 81.66666666666666,64.36514522821577 L 127.33333333333333,47.35269709543569 L 173,57.560165975103736 L 218.66666666666666,37.14522821576763 L 264.3333333333333,40.547717842323664 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_osmvofx8g)\"/>\n      <path d=\"M 36,81.37759336099585 L 81.66666666666666,64.36514522821577 L 127.33333333333333,47.35269709543569 L 173,57.560165975103736 L 218.66666666666666,37.14522821576763 L 264.3333333333333,40.547717842323664 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,90.88563049853373 L 81.66666666666666,80.32844574780059 L 127.33333333333333,69.77126099706746 L 173,75.04985337243401 L 218.66666666666666,59.21407624633431 L 264.3333333333333,62.733137829912025 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"81.37759336099585\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"90.88563049853373\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"64.36514522821577\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"80.32844574780059\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"47.35269709543569\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"69.77126099706746\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"57.560165975103736\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"75.04985337243401\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"37.14522821576763\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"59.21407624633431\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"40.547717842323664\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"62.733137829912025\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 5</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 15</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 20</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 25</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"18K\" data-act=\"1.2K\" data-x=\"36\" data-reach-y=\"81.37759336099585\" data-act-y=\"90.88563049853373\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 5\" data-reach=\"28K\" data-act=\"1.8K\" data-x=\"81.66666666666666\" data-reach-y=\"64.36514522821577\" data-act-y=\"80.32844574780059\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 10\" data-reach=\"38K\" data-act=\"2.4K\" data-x=\"127.33333333333333\" data-reach-y=\"47.35269709543569\" data-act-y=\"69.77126099706746\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 15\" data-reach=\"32K\" data-act=\"2.1K\" data-x=\"173\" data-reach-y=\"57.560165975103736\" data-act-y=\"75.04985337243401\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 20\" data-reach=\"44K\" data-act=\"3K\" data-x=\"218.66666666666666\" data-reach-y=\"37.14522821576763\" data-act-y=\"59.21407624633431\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 25\" data-reach=\"42K\" data-act=\"2.8K\" data-x=\"264.3333333333333\" data-reach-y=\"40.547717842323664\" data-act-y=\"62.733137829912025\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 30\" data-reach=\"48.2K\" data-act=\"3.41K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "1,850",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "1,240",
          "s2Pct": "67.0%",
          "s2Fill": "67.0%",
          "s3Num": "620",
          "s3Pct": "33.5%",
          "s3Fill": "33.5%",
          "s4Num": "342",
          "s4Pct": "18.5%",
          "s4Fill": "18.5%",
          "rate": "18.5% Total Conv"
        },
        "demographics": {
          "total": "48.2K",
          "nonFollowers": "64% (30.8K)",
          "followers": "36% (17.4K)",
          "us": "42% (20.2K)",
          "in": "28% (13.5K)",
          "gb": "14% (6.7K)"
        }
      },
      "60 Days": {
        "followers": "48",
        "following": "12",
        "views": "2,850",
        "comments": "410",
        "totalReplies": "210",
        "sentToday": "18",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "62",
        "reach": "92.6K",
        "trendReach": "▲ +19.4%",
        "engaged": "11.2K",
        "trendEngaged": "▲ +12.0%",
        "visits": "6,890",
        "trendVisits": "▲ +21.4%",
        "clicks": "1,740",
        "trendClicks": "▲ +26.8%",
        "replies": "2,410",
        "trendReplies": "▲ +16.5%",
        "dmsToday": "140",
        "trendDmsToday": "▲ +6.1%",
        "activeRules": "5 Active",
        "trendRules": "● 100% Uptime",
        "leads": "680",
        "trendLeads": "▲ +35.2%",
        "reachSub": "Instagram reach vs profile activity over the last 60 days.",
        "legReach": "92.6K",
        "legAct": "6.89K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_k8is53afb\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">100K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,81.00647948164146 L 81.66666666666666,67.72354211663065 L 127.33333333333333,51.78401727861771 L 173,57.09719222462203 L 218.66666666666666,41.15766738660906 L 264.3333333333333,36.73002159827213 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_k8is53afb)\"/>\n      <path d=\"M 36,81.00647948164146 L 81.66666666666666,67.72354211663065 L 127.33333333333333,51.78401727861771 L 173,57.09719222462203 L 218.66666666666666,41.15766738660906 L 264.3333333333333,36.73002159827213 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,90.22931785195937 L 81.66666666666666,80.65021770682148 L 127.33333333333333,70.20029027576197 L 173,75.42525399129173 L 218.66666666666666,60.621190130624086 L 264.3333333333333,58.00870827285922 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"81.00647948164146\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"90.22931785195937\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"67.72354211663065\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"80.65021770682148\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"51.78401727861771\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"70.20029027576197\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"57.09719222462203\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"75.42525399129173\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"41.15766738660906\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"60.621190130624086\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.73002159827213\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"58.00870827285922\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 20</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 40</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 50</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 60</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"35K\" data-act=\"2.5K\" data-x=\"36\" data-reach-y=\"81.00647948164146\" data-act-y=\"90.22931785195937\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 10\" data-reach=\"50K\" data-act=\"3.6K\" data-x=\"81.66666666666666\" data-reach-y=\"67.72354211663065\" data-act-y=\"80.65021770682148\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 20\" data-reach=\"68K\" data-act=\"4.8K\" data-x=\"127.33333333333333\" data-reach-y=\"51.78401727861771\" data-act-y=\"70.20029027576197\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 30\" data-reach=\"62K\" data-act=\"4.2K\" data-x=\"173\" data-reach-y=\"57.09719222462203\" data-act-y=\"75.42525399129173\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 40\" data-reach=\"80K\" data-act=\"5.9K\" data-x=\"218.66666666666666\" data-reach-y=\"41.15766738660906\" data-act-y=\"60.621190130624086\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 50\" data-reach=\"85K\" data-act=\"6.2K\" data-x=\"264.3333333333333\" data-reach-y=\"36.73002159827213\" data-act-y=\"58.00870827285922\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 60\" data-reach=\"92.6K\" data-act=\"6.89K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "3,620",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "2,410",
          "s2Pct": "66.5%",
          "s2Fill": "66.5%",
          "s3Num": "1,180",
          "s3Pct": "32.5%",
          "s3Fill": "32.5%",
          "s4Num": "680",
          "s4Pct": "18.7%",
          "s4Fill": "18.7%",
          "rate": "18.7% Total Conv"
        },
        "demographics": {
          "total": "92.6K",
          "nonFollowers": "65% (60.1K)",
          "followers": "35% (32.4K)",
          "us": "43% (39.8K)",
          "in": "27% (25.0K)",
          "gb": "15% (13.8K)"
        }
      },
      "90 Days": {
        "followers": "48",
        "following": "12",
        "views": "4,620",
        "comments": "680",
        "totalReplies": "340",
        "sentToday": "22",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "98",
        "reach": "142.8K",
        "trendReach": "▲ +24.8%",
        "engaged": "18.4K",
        "trendEngaged": "▲ +15.8%",
        "visits": "10,450",
        "trendVisits": "▲ +26.0%",
        "clicks": "2,680",
        "trendClicks": "▲ +31.2%",
        "replies": "3,890",
        "trendReplies": "▲ +21.4%",
        "dmsToday": "190",
        "trendDmsToday": "▲ +7.8%",
        "activeRules": "5 Active",
        "trendRules": "● 100% Uptime",
        "leads": "1,120",
        "trendLeads": "▲ +42.0%",
        "reachSub": "Instagram reach vs profile activity over the last 90 days.",
        "legReach": "142.8K",
        "legAct": "10.45K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_k15va78jw\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">160K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,83.28851540616247 L 81.66666666666666,68.9327731092437 L 127.33333333333333,57.44817927170869 L 173,60.319327731092436 L 218.66666666666666,45.96358543417368 L 264.3333333333333,37.350140056022425 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_k15va78jw)\"/>\n      <path d=\"M 36,83.28851540616247 L 81.66666666666666,68.9327731092437 L 127.33333333333333,57.44817927170869 L 173,60.319327731092436 L 218.66666666666666,45.96358543417368 L 264.3333333333333,37.350140056022425 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,90.18181818181819 L 81.66666666666666,82.14354066985646 L 127.33333333333333,71.23444976076556 L 173,72.95693779904306 L 218.66666666666666,60.89952153110047 L 264.3333333333333,58.028708133971286 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"83.28851540616247\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"90.18181818181819\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"68.9327731092437\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"82.14354066985646\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"57.44817927170869\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"71.23444976076556\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"60.319327731092436\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"72.95693779904306\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"45.96358543417368\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"60.89952153110047\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"37.350140056022425\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"58.028708133971286\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 15</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 45</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 60</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 75</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 90</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"50K\" data-act=\"3.8K\" data-x=\"36\" data-reach-y=\"83.28851540616247\" data-act-y=\"90.18181818181819\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 15\" data-reach=\"75K\" data-act=\"5.2K\" data-x=\"81.66666666666666\" data-reach-y=\"68.9327731092437\" data-act-y=\"82.14354066985646\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 30\" data-reach=\"95K\" data-act=\"7.1K\" data-x=\"127.33333333333333\" data-reach-y=\"57.44817927170869\" data-act-y=\"71.23444976076556\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 45\" data-reach=\"90K\" data-act=\"6.8K\" data-x=\"173\" data-reach-y=\"60.319327731092436\" data-act-y=\"72.95693779904306\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 60\" data-reach=\"115K\" data-act=\"8.9K\" data-x=\"218.66666666666666\" data-reach-y=\"45.96358543417368\" data-act-y=\"60.89952153110047\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 75\" data-reach=\"130K\" data-act=\"9.4K\" data-x=\"264.3333333333333\" data-reach-y=\"37.350140056022425\" data-act-y=\"58.028708133971286\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 90\" data-reach=\"142.8K\" data-act=\"10.45K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "5,840",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "3,890",
          "s2Pct": "66.6%",
          "s2Fill": "66.6%",
          "s3Num": "1,890",
          "s3Pct": "32.3%",
          "s3Fill": "32.3%",
          "s4Num": "1,120",
          "s4Pct": "19.1%",
          "s4Fill": "19.1%",
          "rate": "19.1% Total Conv"
        },
        "demographics": {
          "total": "142.8K",
          "nonFollowers": "66% (94.2K)",
          "followers": "34% (48.5K)",
          "us": "44% (62.8K)",
          "in": "26% (37.1K)",
          "gb": "16% (22.8K)"
        }
      }
    },
    "store": [
      {
        "id": "prod-1",
        "title": "Java Full-Stack Developer Roadmap PDF",
        "price": "₹499",
        "oldPrice": "₹999",
        "desc": "Comprehensive guide from Java core syntax to microservices, Spring Boot, and cloud deployment. Includes architecture diagrams, interview questions, and production checklist.",
        "cta": "Instant Access",
        "rating": "5.0 (64 customer reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-2",
        "title": "1-on-1 Instagram Strategy Session",
        "price": "₹1,499",
        "oldPrice": "₹2,999",
        "desc": "30-minute private call to audit your Instagram DM automation funnel, optimize bio link conversion, and scale high-ticket lead generation.",
        "cta": "Book Session",
        "rating": "4.9 (28 customer reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-3",
        "title": "Instagram Automation Preset Bundle",
        "price": "FREE",
        "oldPrice": "₹499",
        "desc": "Pre-configured comment triggers, DM copy templates, and Bio link presets ready to import directly into your RenderReply dashboard.",
        "cta": "Download Now",
        "rating": "5.0 (112 customer reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ],
    "rules": [
      {
        "id": "rule-pricing",
        "name": "Pricing Plans Template",
        "ruleSub": "Pricing Plans Template",
        "thumbImg": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        "type": "post",
        "typeName": "Post Comments",
        "keywords": [
          "PRICING"
        ],
        "target": "POST",
        "targetType": "POST",
        "active": true,
        "sentCount": 2140,
        "successRate": "99.2%",
        "response": "Hey {first_name}! Thanks for asking about pricing. Here are our official creator plans and checkout link: {link}",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/p/pricing",
        "linkTitle": "Pricing Plans & Checkout",
        "commentReply": false,
        "commentReplyText": ""
      },
      {
        "id": "rule-story",
        "name": "Story Mention Thank You",
        "ruleSub": "Story Mention Thank You",
        "thumbImg": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
        "type": "story",
        "typeName": "Story Mentions",
        "keywords": [
          "STORY_TAG"
        ],
        "target": "STORIES",
        "targetType": "STORIES",
        "active": true,
        "sentCount": 1820,
        "successRate": "98.7%",
        "response": "Thanks for tagging us in your Story, {username}! Here is an exclusive 15% VIP discount code: VIP15. Link: {link}",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/p/vip-pass",
        "linkTitle": "VIP Pass & Discount",
        "commentReply": false,
        "commentReplyText": ""
      },
      {
        "id": "rule-reel",
        "name": "Free Ebook Reel Auto-DM",
        "ruleSub": "Free Ebook Reel Auto-DM",
        "thumbImg": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        "type": "reel",
        "typeName": "Reels & Live",
        "keywords": [
          "GUIDE"
        ],
        "target": "REELS",
        "targetType": "REELS",
        "active": true,
        "sentCount": 932,
        "successRate": "97.9%",
        "response": "Hey {first_name}! Here is the free Creator Automation Ebook you requested: {link}",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/free-guide.pdf",
        "linkTitle": "Free Creator Ebook PDF",
        "commentReply": false,
        "commentReplyText": ""
      }
    ],
    "inbox": {
      "alex": {
        "name": "Alex Mercer",
        "handle": "@alex_creator",
        "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        "followers": "48.2K Followers",
        "source": "Reel Comment: \"PRICING\"",
        "status": "attention",
        "botActive": true,
        "triggerTitle": "Triggered by Reel: \"Build a 7-Figure IG Automation Engine\" (Keyword: \"PRICING\")",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, OCT 24"
          },
          {
            "type": "user",
            "text": "Hey! Can I get the pricing plans for your creator roadmap and preset packs?",
            "time": "02:14 PM",
            "context": "Commented \"PRICING\" on Reel #894"
          },
          {
            "type": "bot",
            "text": "Hey Alex! Here are our membership options, instant downloads, and 1-on-1 strategy sessions:",
            "time": "02:14 PM",
            "flow": "Reel Viral Funnel v2.4",
            "hasCard": true
          }
        ]
      },
      "sarah": {
        "name": "Sarah Miller",
        "handle": "@sarah_m",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        "followers": "120K Followers",
        "source": "Story Mention: \"FREE_CHECKLIST\"",
        "status": "bot",
        "botActive": true,
        "triggerTitle": "Triggered by Story Mention: \"@rudrateja tag on story\"",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, OCT 24"
          },
          {
            "type": "user",
            "text": "Loved your latest story breakdown! Can you send me the free creator checklist you mentioned?",
            "time": "01:10 PM",
            "context": "Mentioned you in Story"
          },
          {
            "type": "bot",
            "text": "Hey Sarah! Thank you so much for the story tag! Here is your exclusive 2026 Instagram Growth Checklist PDF: https://renderreply.com/store/rudrateja/downloads/checklist.pdf",
            "time": "01:10 PM",
            "flow": "Story Mention Auto-Thank You v1.8",
            "hasCard": false
          }
        ]
      },
      "dev": {
        "name": "John Doe",
        "handle": "@dev_johndoe",
        "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
        "followers": "15.4K Followers",
        "source": "DM Keyword: \"JAVA\"",
        "status": "bot",
        "botActive": true,
        "triggerTitle": "Triggered by DM Keyword: \"JAVA\"",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, OCT 24"
          },
          {
            "type": "user",
            "text": "JAVA",
            "time": "11:20 AM",
            "context": "Sent DM keyword \"JAVA\""
          },
          {
            "type": "bot",
            "text": "Hey John! Here is the instant access link to the Java Full Stack Roadmap 2026 PDF: https://renderreply.com/store/rudrateja/downloads/java-roadmap.pdf Happy coding!",
            "time": "11:20 AM",
            "flow": "Full Stack Roadmap Auto-DM",
            "hasCard": false
          }
        ]
      },
      "priya": {
        "name": "Priya S.",
        "handle": "@priya_designs",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        "followers": "89K Followers",
        "source": "Custom Inquiry: Agency License",
        "status": "attention",
        "botActive": false,
        "triggerTitle": "Custom Inquiry: Agency Multi-Account License (Bot Paused)",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, OCT 24"
          },
          {
            "type": "user",
            "text": "Hi Rudra! Can we customize the RenderReply templates for multiple client agencies? Do you have an agency tier?",
            "time": "09:45 AM",
            "context": "Custom DM Inquiry"
          }
        ]
      },
      "vikram": {
        "name": "Vikram P.",
        "handle": "@vikram_tech",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        "followers": "210K Followers",
        "source": "Preset Bundle: Downloaded",
        "status": "resolved",
        "botActive": true,
        "triggerTitle": "Triggered by Reel: \"Instagram Automation Presets 2026\" (Keyword: \"PRESET\")",
        "messages": [
          {
            "type": "divider",
            "text": "YESTERDAY, OCT 23"
          },
          {
            "type": "user",
            "text": "PRESET",
            "time": "04:15 PM",
            "context": "Commented \"PRESET\" on Reel #890"
          },
          {
            "type": "bot",
            "text": "Hey Vikram! Here is your free Instagram Automation Preset Bundle: https://renderreply.com/store/rudrateja/downloads/presets.zip",
            "time": "04:15 PM",
            "flow": "Preset Distribution Flow",
            "hasCard": false
          },
          {
            "type": "user",
            "text": "Thank you so much Rudra! Downloaded presets successfully. They work amazingly well!",
            "time": "04:30 PM",
            "context": "Direct DM"
          },
          {
            "type": "human",
            "text": "Awesome Vikram! Let me know if you need any tweaks for your specific reels setup. Cheers!",
            "time": "04:35 PM"
          }
        ]
      }
    },
    "leads": [
      {
        "id": "lead-1",
        "handle": "@alex_growth",
        "name": "Alex Miller",
        "avatar": "AM",
        "email": "alex.miller@growthagency.io",
        "phone": "+1 (555) 234-8910",
        "keyword": "#GUIDE",
        "campaign": "guide",
        "status": "Email Captured",
        "statusClass": "email",
        "sourceTitle": "10x Instagram Automation Strategy 2026",
        "sourceThumb": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80",
        "time": "2m ago",
        "timestamp": "Today, 2:14 PM",
        "commentText": "Can you send me the #GUIDE for full funnel setup?",
        "botReplyText": "Hey Alex! Here is your complete 10x Automation Blueprint & PDF guide: https://renderreply.com/p/guide",
        "ruleName": "Reel Lead Magnet #GUIDE"
      },
      {
        "id": "lead-2",
        "handle": "@sarah.designs",
        "name": "Sarah K.",
        "avatar": "SK",
        "email": "sarah.k@designstudio.co",
        "phone": "+1 (555) 789-1234",
        "keyword": "PRICING",
        "campaign": "pricing",
        "status": "DM Delivered",
        "statusClass": "",
        "sourceTitle": "How I Make ₹50,000/mo Selling Digital Products",
        "sourceThumb": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80",
        "time": "12m ago",
        "timestamp": "Today, 2:04 PM",
        "commentText": "PRICING details please!",
        "botReplyText": "Hi Sarah! Here is the breakdown of our digital templates & pricing plans: https://renderreply.com/pricing",
        "ruleName": "Pricing Trigger Rule"
      },
      {
        "id": "lead-3",
        "handle": "@marcus_dev",
        "name": "Marcus Vance",
        "avatar": "MV",
        "email": "marcus.vance@techlead.dev",
        "phone": "+44 7911 123456",
        "keyword": "ROADMAP",
        "campaign": "roadmap",
        "status": "Email Captured",
        "statusClass": "email",
        "sourceTitle": "Free Java Fullstack Roadmap 2026 PDF",
        "sourceThumb": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=80&q=80",
        "time": "28m ago",
        "timestamp": "Today, 1:48 PM",
        "commentText": "Sent you ROADMAP on the carousel post",
        "botReplyText": "Awesome Marcus! The Fullstack 2026 Roadmap PDF has been emailed to you and here is the direct link: https://renderreply.com/p/roadmap-pdf",
        "ruleName": "Java Roadmap Lead Magnet"
      },
      {
        "id": "lead-4",
        "handle": "@priya_creates",
        "name": "Priya Sharma",
        "avatar": "PS",
        "email": "priya.sharma@creatorspace.in",
        "phone": "+91 98765 43210",
        "keyword": "LINK",
        "campaign": "story",
        "status": "DM Delivered",
        "statusClass": "",
        "sourceTitle": "Story Automation Blueprint & DM Triggers",
        "sourceThumb": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=80&q=80",
        "time": "1h ago",
        "timestamp": "Today, 1:15 PM",
        "commentText": "LINK",
        "botReplyText": "Hey Priya! Here is the instant link you requested from our story: https://renderreply.com/story-blueprint",
        "ruleName": "Story Reply Automation"
      }
    ],
    "payments": {
      "totalBalance": 124580,
      "availableBalance": 98050,
      "pendingBalance": 26530,
      "payout": {
        "upiId": "rudrateja@okaxis",
        "holderName": "Rudra Teja",
        "bankName": "HDFC Bank",
        "accountNumber": "50100293844892",
        "ifsc": "HDFC0000128",
        "primaryChannel": "UPI"
      },
      "transactions": [
        {
          "id": "67300007547192",
          "date": "Oct 24, 2026 02:15 PM",
          "type": "Order Sale",
          "amount": 98050,
          "status": "Cleared",
          "customer": "rudrateja.order@gmail.com",
          "channel": "Direct UPI",
          "fee": 2941,
          "gst": 529,
          "net": 94580
        },
        {
          "id": "67300007547191",
          "date": "Oct 22, 2026 11:30 AM",
          "type": "Order Sale",
          "amount": 49900,
          "status": "Cleared",
          "customer": "rudrateja.store@gmail.com",
          "channel": "Direct UPI",
          "fee": 1497,
          "gst": 269,
          "net": 48134
        },
        {
          "id": "60380007982004",
          "date": "Oct 23, 2026 06:45 PM",
          "type": "Creator Fund",
          "amount": 26530,
          "status": "Pending",
          "customer": "RenderReply Partner Fund",
          "channel": "System Credit",
          "fee": 0,
          "gst": 0,
          "net": 26530
        },
        {
          "id": "89102471029471",
          "date": "Oct 20, 2026 04:10 PM",
          "type": "Withdrawal",
          "amount": -50000,
          "status": "Cleared",
          "customer": "Payout to rudrateja@okaxis",
          "channel": "Direct UPI",
          "fee": 0,
          "gst": 0,
          "net": -50000
        },
        {
          "id": "67300007547188",
          "date": "Oct 19, 2026 09:20 AM",
          "type": "Order Sale",
          "amount": 14990,
          "status": "Cleared",
          "customer": "rudrateja.client@gmail.com",
          "channel": "Bank IMPS",
          "fee": 449,
          "gst": 80,
          "net": 14461
        },
        {
          "id": "OFFLINE-892401",
          "date": "Oct 18, 2026 05:00 PM",
          "type": "Manual Credit",
          "amount": 5000,
          "status": "Cleared",
          "customer": "Offline Direct Client",
          "channel": "Manual Adjustment",
          "fee": 0,
          "gst": 0,
          "net": 5000
        }
      ]
    },
    "biolink": {
      "title": "RudRa RR | Tech & Fullstack Automation",
      "bio": "Building automated Instagram funnels, open-source Java roadmaps, and creator ecosystems.",
      "links": [
        {
          "label": "Java Fullstack Roadmap 2026 PDF",
          "url": "https://renderreply.com/p/java-roadmap",
          "color": "accent"
        },
        {
          "label": "Book 1-on-1 Automation Audit",
          "url": "https://renderreply.com/book-session",
          "color": "slate"
        },
        {
          "label": "Instagram Automation Presets Pack",
          "url": "https://renderreply.com/presets",
          "color": "emerald"
        }
      ],
      "video1": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "video2": "",
      "theme": "indigo-slate"
    }
  },
  "acc-sarah": {
    "id": "acc-sarah",
    "profile": {
      "name": "Sarah Jenkins",
      "email": "sarah.lifestyle@gmail.com",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
      "bio": "Fashion stylist, lifestyle vlogger & daily aesthetic outfit links ✨ NYC & Paris.",
      "insta": "@sarah_style",
      "yt": "youtube.com/@sarahstyle",
      "tw": "@sarahjenkins",
      "initials": "SJ",
      "badge": "Fashion & Lifestyle",
      "role": "Verified Creator"
    },
    "dashboard": {
      "7 Days": {
        "followers": "184K",
        "following": "420",
        "views": "92,400",
        "comments": "3,840",
        "totalReplies": "2,410",
        "sentToday": "84",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "680",
        "reach": "94.2K",
        "trendReach": "▲ +24.5%",
        "engaged": "11.8K",
        "trendEngaged": "▲ +18.2%",
        "visits": "7,840",
        "trendVisits": "▲ +22.0%",
        "clicks": "3,450",
        "trendClicks": "▲ +28.4%",
        "replies": "2,410",
        "trendReplies": "▲ +19.5%",
        "dmsToday": "110",
        "trendDmsToday": "▲ +8.2%",
        "activeRules": "6 Active",
        "trendRules": "● 100% Uptime",
        "leads": "740",
        "trendLeads": "▲ +34.2%",
        "reachSub": "Fashion lookbook reach vs profile saves over the last 7 days.",
        "legReach": "94.2K",
        "legAct": "7.84K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_zlr8rzx91\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">100K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,84.1443736730361 L 81.66666666666666,72.828025477707 L 127.33333333333333,61.511677282377924 L 173,58.02972399150743 L 218.66666666666666,47.583864118895974 L 264.3333333333333,38.008492569002115 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_zlr8rzx91)\"/>\n      <path d=\"M 36,84.1443736730361 L 81.66666666666666,72.828025477707 L 127.33333333333333,61.511677282377924 L 173,58.02972399150743 L 218.66666666666666,47.583864118895974 L 264.3333333333333,38.008492569002115 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,90.57142857142857 L 81.66666666666666,82.15306122448979 L 127.33333333333333,75.26530612244898 L 173,72.20408163265306 L 218.66666666666666,63.0204081632653 L 264.3333333333333,57.663265306122454 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"84.1443736730361\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"90.57142857142857\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"72.828025477707\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"82.15306122448979\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"61.511677282377924\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"75.26530612244898\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"58.02972399150743\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"72.20408163265306\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"47.583864118895974\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"63.0204081632653\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"38.008492569002115\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"57.663265306122454\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 2</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 3</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 4</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 5</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 6</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 7</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"32K\" data-act=\"2.8K\" data-x=\"36\" data-reach-y=\"84.1443736730361\" data-act-y=\"90.57142857142857\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 2\" data-reach=\"45K\" data-act=\"3.9K\" data-x=\"81.66666666666666\" data-reach-y=\"72.828025477707\" data-act-y=\"82.15306122448979\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 3\" data-reach=\"58K\" data-act=\"4.8K\" data-x=\"127.33333333333333\" data-reach-y=\"61.511677282377924\" data-act-y=\"75.26530612244898\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 4\" data-reach=\"62K\" data-act=\"5.2K\" data-x=\"173\" data-reach-y=\"58.02972399150743\" data-act-y=\"72.20408163265306\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 5\" data-reach=\"74K\" data-act=\"6.4K\" data-x=\"218.66666666666666\" data-reach-y=\"47.583864118895974\" data-act-y=\"63.0204081632653\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 6\" data-reach=\"85K\" data-act=\"7.1K\" data-x=\"264.3333333333333\" data-reach-y=\"38.008492569002115\" data-act-y=\"57.663265306122454\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 7\" data-reach=\"94.2K\" data-act=\"7.84K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "3,840",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "2,920",
          "s2Pct": "76.0%",
          "s2Fill": "76.0%",
          "s3Num": "1,680",
          "s3Pct": "43.8%",
          "s3Fill": "43.8%",
          "s4Num": "740",
          "s4Pct": "19.3%",
          "s4Fill": "19.3%",
          "rate": "19.3% Total Conv"
        },
        "demographics": {
          "total": "94.2K",
          "nonFollowers": "71% (66.8K)",
          "followers": "29% (27.4K)",
          "us": "52% (49.0K)",
          "in": "14% (13.2K)",
          "gb": "22% (20.7K)"
        }
      },
      "14 Days": {
        "followers": "184K",
        "following": "420",
        "views": "178,000",
        "comments": "7,450",
        "totalReplies": "4,620",
        "sentToday": "160",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "1,380",
        "reach": "182.4K",
        "trendReach": "▲ +26.8%",
        "engaged": "22.4K",
        "trendEngaged": "▲ +17.5%",
        "visits": "15,200",
        "trendVisits": "▲ +24.1%",
        "clicks": "6,800",
        "trendClicks": "▲ +29.0%",
        "replies": "4,620",
        "trendReplies": "▲ +21.4%",
        "dmsToday": "210",
        "trendDmsToday": "▲ +9.1%",
        "activeRules": "6 Active",
        "trendRules": "● 100% Uptime",
        "leads": "1,480",
        "trendLeads": "▲ +38.5%",
        "reachSub": "Fashion lookbook reach vs profile saves over the last 14 days.",
        "legReach": "182.4K",
        "legAct": "15.2K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_gx5bm839q\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">200K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,85.02631578947368 L 81.66666666666666,73.78728070175438 L 127.33333333333333,62.548245614035096 L 173,55.804824561403514 L 218.66666666666666,44.56578947368422 L 264.3333333333333,36.473684210526315 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_gx5bm839q)\"/>\n      <path d=\"M 36,85.02631578947368 L 81.66666666666666,73.78728070175438 L 127.33333333333333,62.548245614035096 L 173,55.804824561403514 L 218.66666666666666,44.56578947368422 L 264.3333333333333,36.473684210526315 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,91.47368421052632 L 81.66666666666666,83.97368421052632 L 127.33333333333333,74.89473684210526 L 173,69.36842105263158 L 218.66666666666666,62.26315789473684 L 264.3333333333333,56.34210526315789 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"85.02631578947368\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"91.47368421052632\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"73.78728070175438\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"83.97368421052632\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"62.548245614035096\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"74.89473684210526\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"55.804824561403514\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"69.36842105263158\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"44.56578947368422\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"62.26315789473684\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.473684210526315\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"56.34210526315789\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 2</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 4</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 6</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 8</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 12</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 14</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 2\" data-reach=\"60K\" data-act=\"5.2K\" data-x=\"36\" data-reach-y=\"85.02631578947368\" data-act-y=\"91.47368421052632\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 4\" data-reach=\"85K\" data-act=\"7.1K\" data-x=\"81.66666666666666\" data-reach-y=\"73.78728070175438\" data-act-y=\"83.97368421052632\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 6\" data-reach=\"110K\" data-act=\"9.4K\" data-x=\"127.33333333333333\" data-reach-y=\"62.548245614035096\" data-act-y=\"74.89473684210526\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 8\" data-reach=\"125K\" data-act=\"10.8K\" data-x=\"173\" data-reach-y=\"55.804824561403514\" data-act-y=\"69.36842105263158\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 10\" data-reach=\"150K\" data-act=\"12.6K\" data-x=\"218.66666666666666\" data-reach-y=\"44.56578947368422\" data-act-y=\"62.26315789473684\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 12\" data-reach=\"168K\" data-act=\"14.1K\" data-x=\"264.3333333333333\" data-reach-y=\"36.473684210526315\" data-act-y=\"56.34210526315789\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 14\" data-reach=\"182.4K\" data-act=\"15.2K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "7,450",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "5,680",
          "s2Pct": "76.2%",
          "s2Fill": "76.2%",
          "s3Num": "3,290",
          "s3Pct": "44.2%",
          "s3Fill": "44.2%",
          "s4Num": "1,480",
          "s4Pct": "19.9%",
          "s4Fill": "19.9%",
          "rate": "19.9% Total Conv"
        },
        "demographics": {
          "total": "182.4K",
          "nonFollowers": "72% (131.3K)",
          "followers": "28% (51.1K)",
          "us": "53% (96.7K)",
          "in": "13% (23.7K)",
          "gb": "23% (42.0K)"
        }
      },
      "30 Days": {
        "followers": "184K",
        "following": "420",
        "views": "342,000",
        "comments": "14,200",
        "totalReplies": "8,450",
        "sentToday": "320",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "2,890",
        "reach": "348.5K",
        "trendReach": "▲ +28.4%",
        "engaged": "42.1K",
        "trendEngaged": "▲ +19.2%",
        "visits": "28,400",
        "trendVisits": "▲ +25.8%",
        "clicks": "12,800",
        "trendClicks": "▲ +32.4%",
        "replies": "8,450",
        "trendReplies": "▲ +22.0%",
        "dmsToday": "410",
        "trendDmsToday": "▲ +11.2%",
        "activeRules": "6 Active",
        "trendRules": "● 100% Uptime",
        "leads": "2,890",
        "trendLeads": "▲ +42.1%",
        "reachSub": "Fashion lookbook reach vs profile saves over the last 30 days.",
        "legReach": "348.5K",
        "legAct": "28.4K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_0bcxwrl32\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">380K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,83.76470588235294 L 81.66666666666666,74.35294117647058 L 127.33333333333333,62.58823529411765 L 173,55.52941176470588 L 218.66666666666666,43.76470588235294 L 264.3333333333333,36.705882352941174 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_0bcxwrl32)\"/>\n      <path d=\"M 36,83.76470588235294 L 81.66666666666666,74.35294117647058 L 127.33333333333333,62.58823529411765 L 173,55.52941176470588 L 218.66666666666666,43.76470588235294 L 264.3333333333333,36.705882352941174 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,94.67605633802816 L 81.66666666666666,87.70422535211267 L 127.33333333333333,80.73239436619718 L 173,73.54929577464789 L 218.66666666666666,64.67605633802818 L 264.3333333333333,58.97183098591549 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"83.76470588235294\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"94.67605633802816\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"74.35294117647058\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"87.70422535211267\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"62.58823529411765\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"80.73239436619718\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"55.52941176470588\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"73.54929577464789\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"43.76470588235294\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"64.67605633802818\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.705882352941174\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"58.97183098591549\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 5</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 15</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 20</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 25</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"120K\" data-act=\"8.2K\" data-x=\"36\" data-reach-y=\"83.76470588235294\" data-act-y=\"94.67605633802816\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 5\" data-reach=\"160K\" data-act=\"11.5K\" data-x=\"81.66666666666666\" data-reach-y=\"74.35294117647058\" data-act-y=\"87.70422535211267\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 10\" data-reach=\"210K\" data-act=\"14.8K\" data-x=\"127.33333333333333\" data-reach-y=\"62.58823529411765\" data-act-y=\"80.73239436619718\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 15\" data-reach=\"240K\" data-act=\"18.2K\" data-x=\"173\" data-reach-y=\"55.52941176470588\" data-act-y=\"73.54929577464789\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 20\" data-reach=\"290K\" data-act=\"22.4K\" data-x=\"218.66666666666666\" data-reach-y=\"43.76470588235294\" data-act-y=\"64.67605633802818\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 25\" data-reach=\"320K\" data-act=\"25.1K\" data-x=\"264.3333333333333\" data-reach-y=\"36.705882352941174\" data-act-y=\"58.97183098591549\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 30\" data-reach=\"348.5K\" data-act=\"28.4K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "14,200",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "10,800",
          "s2Pct": "76.1%",
          "s2Fill": "76.1%",
          "s3Num": "6,400",
          "s3Pct": "45.1%",
          "s3Fill": "45.1%",
          "s4Num": "2,890",
          "s4Pct": "20.3%",
          "s4Fill": "20.3%",
          "rate": "20.3% Total Conv"
        },
        "demographics": {
          "total": "348.5K",
          "nonFollowers": "72% (250.9K)",
          "followers": "28% (97.6K)",
          "us": "54% (188.2K)",
          "in": "12% (41.8K)",
          "gb": "22% (76.7K)"
        }
      },
      "60 Days": {
        "followers": "184K",
        "following": "420",
        "views": "685,000",
        "comments": "28,100",
        "totalReplies": "16,900",
        "sentToday": "480",
        "activeRulesFlat": "5",
        "capturedLeadsFlat": "5,840",
        "reach": "692.0K",
        "trendReach": "▲ +34.2%",
        "engaged": "84.0K",
        "trendEngaged": "▲ +24.1%",
        "visits": "56,200",
        "trendVisits": "▲ +30.2%",
        "clicks": "25,400",
        "trendClicks": "▲ +36.8%",
        "replies": "16,900",
        "trendReplies": "▲ +26.4%",
        "dmsToday": "620",
        "trendDmsToday": "▲ +14.5%",
        "activeRules": "6 Active",
        "trendRules": "● 100% Uptime",
        "leads": "5,840",
        "trendLeads": "▲ +48.0%",
        "reachSub": "Fashion lookbook reach vs profile saves over the last 60 days.",
        "legReach": "692.0K",
        "legAct": "56.2K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_r5l1pjrx0\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">750K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,83.5606936416185 L 81.66666666666666,74.08092485549133 L 127.33333333333333,62.23121387283237 L 173,53.9364161849711 L 218.66666666666666,43.27167630057804 L 264.3333333333333,36.161849710982665 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_r5l1pjrx0)\"/>\n      <path d=\"M 36,83.5606936416185 L 81.66666666666666,74.08092485549133 L 127.33333333333333,62.23121387283237 L 173,53.9364161849711 L 218.66666666666666,43.27167630057804 L 264.3333333333333,36.161849710982665 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,92.7829181494662 L 81.66666666666666,86.37722419928826 L 127.33333333333333,77.83629893238435 L 173,71.4306049822064 L 218.66666666666666,62.8896797153025 L 264.3333333333333,56.48398576512456 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"83.5606936416185\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"92.7829181494662\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"74.08092485549133\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"86.37722419928826\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"62.23121387283237\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"77.83629893238435\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"53.9364161849711\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"71.4306049822064\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"43.27167630057804\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"62.8896797153025\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.161849710982665\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"56.48398576512456\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 20</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 40</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 50</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 60</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"240K\" data-act=\"18K\" data-x=\"36\" data-reach-y=\"83.5606936416185\" data-act-y=\"92.7829181494662\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 10\" data-reach=\"320K\" data-act=\"24K\" data-x=\"81.66666666666666\" data-reach-y=\"74.08092485549133\" data-act-y=\"86.37722419928826\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 20\" data-reach=\"420K\" data-act=\"32K\" data-x=\"127.33333333333333\" data-reach-y=\"62.23121387283237\" data-act-y=\"77.83629893238435\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 30\" data-reach=\"490K\" data-act=\"38K\" data-x=\"173\" data-reach-y=\"53.9364161849711\" data-act-y=\"71.4306049822064\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 40\" data-reach=\"580K\" data-act=\"46K\" data-x=\"218.66666666666666\" data-reach-y=\"43.27167630057804\" data-act-y=\"62.8896797153025\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 50\" data-reach=\"640K\" data-act=\"52K\" data-x=\"264.3333333333333\" data-reach-y=\"36.161849710982665\" data-act-y=\"56.48398576512456\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 60\" data-reach=\"692K\" data-act=\"56.2K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "28,100",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "21,400",
          "s2Pct": "76.2%",
          "s2Fill": "76.2%",
          "s3Num": "12,800",
          "s3Pct": "45.6%",
          "s3Fill": "45.6%",
          "s4Num": "5,840",
          "s4Pct": "20.8%",
          "s4Fill": "20.8%",
          "rate": "20.8% Total Conv"
        },
        "demographics": {
          "total": "692.0K",
          "nonFollowers": "74% (512.1K)",
          "followers": "26% (179.9K)",
          "us": "55% (380.6K)",
          "in": "11% (76.1K)",
          "gb": "24% (166.1K)"
        }
      },
      "90 Days": {
        "followers": "184K",
        "following": "420",
        "views": "1,050,000",
        "comments": "42,800",
        "totalReplies": "25,400",
        "sentToday": "640",
        "activeRulesFlat": "5",
        "capturedLeadsFlat": "8,920",
        "reach": "1.04M",
        "trendReach": "▲ +39.5%",
        "engaged": "128.0K",
        "trendEngaged": "▲ +28.0%",
        "visits": "84,000",
        "trendVisits": "▲ +34.5%",
        "clicks": "38,200",
        "trendClicks": "▲ +41.0%",
        "replies": "25,400",
        "trendReplies": "▲ +30.2%",
        "dmsToday": "890",
        "trendDmsToday": "▲ +16.8%",
        "activeRules": "6 Active",
        "trendRules": "● 100% Uptime",
        "leads": "8,920",
        "trendLeads": "▲ +54.2%",
        "reachSub": "Fashion lookbook reach vs profile saves over the last 90 days.",
        "legReach": "1.04M",
        "legAct": "84.0K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_l6rqtw90e\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">1.2M</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,84.40384615384616 L 81.66666666666666,74.15384615384616 L 127.33333333333333,63.11538461538461 L 173,53.65384615384615 L 218.66666666666666,44.19230769230769 L 264.3333333333333,36.30769230769231 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_l6rqtw90e)\"/>\n      <path d=\"M 36,84.40384615384616 L 81.66666666666666,74.15384615384616 L 127.33333333333333,63.11538461538461 L 173,53.65384615384615 L 218.66666666666666,44.19230769230769 L 264.3333333333333,36.30769230769231 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,92 L 81.66666666666666,84.85714285714286 L 127.33333333333333,76.28571428571428 L 173,69.85714285714286 L 218.66666666666666,62.714285714285715 L 264.3333333333333,56.285714285714285 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"84.40384615384616\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"92\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"74.15384615384616\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"84.85714285714286\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"63.11538461538461\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"76.28571428571428\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"53.65384615384615\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"69.85714285714286\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"44.19230769230769\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"62.714285714285715\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.30769230769231\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"56.285714285714285\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 15</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 45</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 60</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 75</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 90</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"350K\" data-act=\"28K\" data-x=\"36\" data-reach-y=\"84.40384615384616\" data-act-y=\"92\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 15\" data-reach=\"480K\" data-act=\"38K\" data-x=\"81.66666666666666\" data-reach-y=\"74.15384615384616\" data-act-y=\"84.85714285714286\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 30\" data-reach=\"620K\" data-act=\"50K\" data-x=\"127.33333333333333\" data-reach-y=\"63.11538461538461\" data-act-y=\"76.28571428571428\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 45\" data-reach=\"740K\" data-act=\"59K\" data-x=\"173\" data-reach-y=\"53.65384615384615\" data-act-y=\"69.85714285714286\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 60\" data-reach=\"860K\" data-act=\"69K\" data-x=\"218.66666666666666\" data-reach-y=\"44.19230769230769\" data-act-y=\"62.714285714285715\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 75\" data-reach=\"960K\" data-act=\"78K\" data-x=\"264.3333333333333\" data-reach-y=\"36.30769230769231\" data-act-y=\"56.285714285714285\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 90\" data-reach=\"1040K\" data-act=\"84K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "42,800",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "32,500",
          "s2Pct": "75.9%",
          "s2Fill": "75.9%",
          "s3Num": "19,200",
          "s3Pct": "44.9%",
          "s3Fill": "44.9%",
          "s4Num": "8,920",
          "s4Pct": "20.8%",
          "s4Fill": "20.8%",
          "rate": "20.8% Total Conv"
        },
        "demographics": {
          "total": "1.04M",
          "nonFollowers": "75% (780.0K)",
          "followers": "25% (260.0K)",
          "us": "56% (582.4K)",
          "in": "10% (104.0K)",
          "gb": "25% (260.0K)"
        }
      }
    },
    "store": [
      {
        "id": "prod-s1",
        "title": "Summer 2026 Capsule Wardrobe & Lookbook",
        "price": "₹799",
        "oldPrice": "₹1,499",
        "desc": "Over 45 curated high-street & designer outfit pairings, direct shopping links with discount codes, and color coordination styling guides.",
        "cta": "Get Lookbook",
        "rating": "4.9 (184 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-s2",
        "title": "Moody Warm Lightroom Mobile Presets (10-Pack)",
        "price": "₹399",
        "oldPrice": "₹899",
        "desc": "One-click aesthetic photo filters designed for golden hour lighting, café moments, and street style photography. Compatible with free Lightroom mobile app.",
        "cta": "Download Presets",
        "rating": "5.0 (312 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-s3",
        "title": "1-on-1 Personal Styling Consultation",
        "price": "₹3,499",
        "oldPrice": "₹5,999",
        "desc": "Private 45-minute virtual wardrobe audit, personalized moodboard for your body type, and custom event outfit sourcing.",
        "cta": "Book Consultation",
        "rating": "5.0 (42 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-s4",
        "title": "Free Daily Outfit Checklist & Zara Dupes Guide",
        "price": "FREE",
        "oldPrice": "₹299",
        "desc": "Free downloadable mini-guide featuring 15 luxury designer clothing dupes from high street brands under ₹2,000.",
        "cta": "Get Free Guide",
        "rating": "4.8 (520 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ],
    "rules": [
      {
        "id": "rule-s-outfit",
        "name": "Reel OOTD Links Auto-DM",
        "ruleSub": "Reel OOTD Links Auto-DM",
        "thumbImg": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
        "type": "reel",
        "typeName": "Reels & Live",
        "keywords": [
          "OUTFIT",
          "LINKS"
        ],
        "target": "REELS",
        "targetType": "REELS",
        "active": true,
        "sentCount": 8420,
        "successRate": "99.4%",
        "response": "Hey gorgeous {first_name}! Here are all the direct product links to today’s reel outfit: {link} Enjoy shopping! ✨",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/sarah/ootd-links",
        "linkTitle": "Shop Today’s Reel Outfit",
        "commentReply": true,
        "commentReplyText": "Sent all outfit links directly to your DMs babe! 💕"
      },
      {
        "id": "rule-s-lookbook",
        "name": "Summer Lookbook Download",
        "ruleSub": "Summer Lookbook Download",
        "thumbImg": "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",
        "type": "post",
        "typeName": "Post Comments",
        "keywords": [
          "LOOKBOOK"
        ],
        "target": "POST",
        "targetType": "POST",
        "active": true,
        "sentCount": 4120,
        "successRate": "98.9%",
        "response": "Hi {first_name}! Here is the link to download my complete Summer 2026 Capsule Lookbook: {link}",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/sarah/lookbook",
        "linkTitle": "Summer 2026 Lookbook PDF",
        "commentReply": false,
        "commentReplyText": ""
      },
      {
        "id": "rule-s-preset",
        "name": "Free Preset Sample Auto-DM",
        "ruleSub": "Free Preset Sample Auto-DM",
        "thumbImg": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
        "type": "dm",
        "typeName": "Direct Messages",
        "keywords": [
          "PRESET"
        ],
        "target": "DIRECT_MESSAGES",
        "targetType": "DIRECT_MESSAGES",
        "active": true,
        "sentCount": 3210,
        "successRate": "99.1%",
        "response": "Hey {first_name}! Here is your free Lightroom mobile aesthetic preset DNG file: {link} Can’t wait to see your edits!",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/sarah/free-preset",
        "linkTitle": "Download Free Preset",
        "commentReply": false,
        "commentReplyText": ""
      }
    ],
    "inbox": {
      "jessica": {
        "name": "Jessica Taylor",
        "handle": "@jess_style",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        "followers": "64.5K Followers",
        "source": "Reel Comment: \"#OUTFIT\"",
        "status": "attention",
        "botActive": true,
        "triggerTitle": "Triggered by Reel: \"Fall Blazer & Linen Pants Styling\" (Keyword: \"#OUTFIT\")",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, 11:30 AM"
          },
          {
            "type": "user",
            "text": "Where did you get the oversized beige trench coat from? Love it!",
            "time": "11:30 AM",
            "context": "Commented \"#OUTFIT\" on Reel #412"
          },
          {
            "type": "bot",
            "text": "Hey Jessica! The beige trench coat is from Mango (on sale right now) and pants are Zara! Direct links here: https://renderreply.com/sarah/ootd-links",
            "time": "11:30 AM",
            "flow": "OOTD Auto-DM Flow",
            "hasCard": true
          }
        ]
      },
      "chloe": {
        "name": "Chloe Dupont",
        "handle": "@chloe.mode",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
        "followers": "190K Followers",
        "source": "Reel Comment: \"#LOOKBOOK\"",
        "status": "bot",
        "botActive": true,
        "triggerTitle": "Triggered by Post: \"Paris Fashion Week Moodboard\"",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, 10:15 AM"
          },
          {
            "type": "user",
            "text": "LOOKBOOK please!",
            "time": "10:15 AM",
            "context": "Commented \"LOOKBOOK\""
          },
          {
            "type": "bot",
            "text": "Bonjour Chloe! Here is your private link to the Summer & Paris Lookbook: https://renderreply.com/sarah/lookbook ✨",
            "time": "10:15 AM",
            "flow": "Lookbook Automated Delivery",
            "hasCard": false
          }
        ]
      },
      "maya": {
        "name": "Maya Lin",
        "handle": "@maya_aesthetics",
        "avatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
        "followers": "42K Followers",
        "source": "DM Keyword: \"PRESET\"",
        "status": "resolved",
        "botActive": true,
        "triggerTitle": "Triggered by DM Keyword \"PRESET\"",
        "messages": [
          {
            "type": "divider",
            "text": "YESTERDAY"
          },
          {
            "type": "user",
            "text": "PRESET",
            "time": "05:40 PM",
            "context": "Direct message"
          },
          {
            "type": "bot",
            "text": "Hey Maya! Here is your free golden preset pack: https://renderreply.com/sarah/free-preset",
            "time": "05:40 PM",
            "flow": "Preset Auto Delivery",
            "hasCard": false
          },
          {
            "type": "user",
            "text": "Thank you Sarah, my photos look stunning with this!",
            "time": "06:10 PM"
          }
        ]
      }
    },
    "leads": [
      {
        "id": "lead-s1",
        "handle": "@jess_style",
        "name": "Jessica Taylor",
        "avatar": "JT",
        "email": "jess.taylor@gmail.com",
        "phone": "+1 (555) 948-2910",
        "keyword": "#OUTFIT",
        "campaign": "outfit",
        "status": "Email Captured",
        "statusClass": "email",
        "sourceTitle": "Fall Blazer & Linen Pants Styling Reel",
        "sourceThumb": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=80&q=80",
        "time": "1m ago",
        "timestamp": "Today, 11:30 AM",
        "commentText": "Where did you get the oversized trench coat? #OUTFIT",
        "botReplyText": "Hey Jessica! Here are all links: https://renderreply.com/sarah/ootd-links",
        "ruleName": "Reel OOTD Links Auto-DM"
      },
      {
        "id": "lead-s2",
        "handle": "@chloe.mode",
        "name": "Chloe Dupont",
        "avatar": "CD",
        "email": "chloe.dupont@vogue-paris.fr",
        "phone": "+33 6 12 34 56 78",
        "keyword": "LOOKBOOK",
        "campaign": "lookbook",
        "status": "DM Delivered",
        "statusClass": "",
        "sourceTitle": "Paris Fashion Week Capsule Moodboard",
        "sourceThumb": "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=80&q=80",
        "time": "8m ago",
        "timestamp": "Today, 10:15 AM",
        "commentText": "LOOKBOOK please!",
        "botReplyText": "Bonjour Chloe! Here is your lookbook link: https://renderreply.com/sarah/lookbook",
        "ruleName": "Summer Lookbook Download"
      },
      {
        "id": "lead-s3",
        "handle": "@maya_aesthetics",
        "name": "Maya Lin",
        "avatar": "ML",
        "email": "maya.lin@nyu.edu",
        "phone": "+1 (555) 392-1849",
        "keyword": "PRESET",
        "campaign": "preset",
        "status": "Converted",
        "statusClass": "email",
        "sourceTitle": "Golden Hour Lightroom Mobile Presets Pack",
        "sourceThumb": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=80&q=80",
        "time": "15m ago",
        "timestamp": "Today, 09:40 AM",
        "commentText": "PRESET",
        "botReplyText": "Hey Maya! Here is your free preset: https://renderreply.com/sarah/free-preset",
        "ruleName": "Free Preset Sample Auto-DM"
      }
    ],
    "payments": {
      "totalBalance": 385400,
      "availableBalance": 312000,
      "pendingBalance": 73400,
      "payout": {
        "upiId": "sarahstyle@okhdfcbank",
        "holderName": "Sarah Jenkins",
        "bankName": "HDFC Bank",
        "accountNumber": "50100481928371",
        "ifsc": "HDFC0000411",
        "primaryChannel": "UPI"
      },
      "transactions": [
        {
          "id": "79201948192831",
          "date": "Oct 24, 2026 11:45 AM",
          "type": "Order Sale",
          "amount": 34990,
          "status": "Cleared",
          "customer": "vip.client@styling.com",
          "channel": "Direct UPI",
          "fee": 1049,
          "gst": 189,
          "net": 33752
        },
        {
          "id": "79201948192828",
          "date": "Oct 23, 2026 04:20 PM",
          "type": "Order Sale",
          "amount": 7990,
          "status": "Cleared",
          "customer": "emma.fashion@gmail.com",
          "channel": "Direct UPI",
          "fee": 239,
          "gst": 43,
          "net": 7708
        },
        {
          "id": "79201948192820",
          "date": "Oct 22, 2026 09:10 AM",
          "type": "Order Sale",
          "amount": 3990,
          "status": "Cleared",
          "customer": "lookbook.buyer@nyu.edu",
          "channel": "Direct UPI",
          "fee": 119,
          "gst": 21,
          "net": 3850
        },
        {
          "id": "89102471928410",
          "date": "Oct 20, 2026 03:00 PM",
          "type": "Withdrawal",
          "amount": -150000,
          "status": "Cleared",
          "customer": "Payout to sarahstyle@okhdfcbank",
          "channel": "Direct UPI",
          "fee": 0,
          "gst": 0,
          "net": -150000
        }
      ]
    },
    "biolink": {
      "title": "Sarah Jenkins | Fashion & Daily Style 🌸",
      "bio": "Shop my daily outfits, download my signature presets, and book private styling.",
      "links": [
        {
          "label": "Shop Today’s Reel Outfits ✨",
          "url": "https://renderreply.com/sarah/ootd",
          "color": "accent"
        },
        {
          "label": "Summer 2026 Lookbook PDF",
          "url": "https://renderreply.com/sarah/lookbook",
          "color": "slate"
        },
        {
          "label": "Moody Lightroom Presets (10-Pack)",
          "url": "https://renderreply.com/sarah/presets",
          "color": "emerald"
        },
        {
          "label": "Book 1-on-1 Personal Styling",
          "url": "https://renderreply.com/sarah/styling",
          "color": "amber"
        }
      ],
      "video1": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "video2": "",
      "theme": "rose-gold"
    }
  },
  "acc-alex": {
    "id": "acc-alex",
    "profile": {
      "name": "Alex Rivera ",
      "email": "alex.fitness@rivera-fit.io",
      "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80",
      "bio": "Certified Strength Coach & High-Performance Nutritionist 🏋️‍♂️ 1000+ Body Transformations.",
      "insta": "@alex_riverafit",
      "yt": "youtube.com/@alexriverafit",
      "tw": "@alexriverafit",
      "initials": "AR",
      "badge": "Fitness & Health Coach",
      "role": "Head Coach"
    },
    "dashboard": {
      "7 Days": {
        "followers": "92.4K",
        "following": "210",
        "views": "48,200",
        "comments": "1,840",
        "totalReplies": "1,120",
        "sentToday": "48",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "380",
        "reach": "52.4K",
        "trendReach": "▲ +18.2%",
        "engaged": "6.8K",
        "trendEngaged": "▲ +12.4%",
        "visits": "4,450",
        "trendVisits": "▲ +16.0%",
        "clicks": "1,920",
        "trendClicks": "▲ +21.5%",
        "replies": "1,120",
        "trendReplies": "▲ +14.8%",
        "dmsToday": "64",
        "trendDmsToday": "▲ +6.5%",
        "activeRules": "4 Active",
        "trendRules": "● 100% Uptime",
        "leads": "380",
        "trendLeads": "▲ +28.4%",
        "reachSub": "Workout reels reach vs program clicks over the last 7 days.",
        "legReach": "52.4K",
        "legAct": "4.45K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_6d0hg8sj8\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">60K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,83.83206106870229 L 81.66666666666666,72.87786259541986 L 127.33333333333333,61.9236641221374 L 173,52.53435114503817 L 218.66666666666666,46.27480916030534 L 264.3333333333333,36.885496183206115 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_6d0hg8sj8)\"/>\n      <path d=\"M 36,83.83206106870229 L 81.66666666666666,72.87786259541986 L 127.33333333333333,61.9236641221374 L 173,52.53435114503817 L 218.66666666666666,46.27480916030534 L 264.3333333333333,36.885496183206115 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,91.7752808988764 L 81.66666666666666,83.68539325842697 L 127.33333333333333,74.24719101123596 L 173,68.85393258426967 L 218.66666666666666,60.764044943820224 L 264.3333333333333,56.71910112359551 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"83.83206106870229\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"91.7752808988764\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"72.87786259541986\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"83.68539325842697\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"61.9236641221374\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"74.24719101123596\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"52.53435114503817\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"68.85393258426967\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"46.27480916030534\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"60.764044943820224\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.885496183206115\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"56.71910112359551\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 2</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 3</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 4</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 5</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 6</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 7</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"18K\" data-act=\"1.5K\" data-x=\"36\" data-reach-y=\"83.83206106870229\" data-act-y=\"91.7752808988764\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 2\" data-reach=\"25K\" data-act=\"2.1K\" data-x=\"81.66666666666666\" data-reach-y=\"72.87786259541986\" data-act-y=\"83.68539325842697\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 3\" data-reach=\"32K\" data-act=\"2.8K\" data-x=\"127.33333333333333\" data-reach-y=\"61.9236641221374\" data-act-y=\"74.24719101123596\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 4\" data-reach=\"38K\" data-act=\"3.2K\" data-x=\"173\" data-reach-y=\"52.53435114503817\" data-act-y=\"68.85393258426967\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 5\" data-reach=\"42K\" data-act=\"3.8K\" data-x=\"218.66666666666666\" data-reach-y=\"46.27480916030534\" data-act-y=\"60.764044943820224\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 6\" data-reach=\"48K\" data-act=\"4.1K\" data-x=\"264.3333333333333\" data-reach-y=\"36.885496183206115\" data-act-y=\"56.71910112359551\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 7\" data-reach=\"52.4K\" data-act=\"4.45K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "1,840",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "1,320",
          "s2Pct": "71.7%",
          "s2Fill": "71.7%",
          "s3Num": "760",
          "s3Pct": "41.3%",
          "s3Fill": "41.3%",
          "s4Num": "380",
          "s4Pct": "20.6%",
          "s4Fill": "20.6%",
          "rate": "20.6% Total Conv"
        },
        "demographics": {
          "total": "52.4K",
          "nonFollowers": "66% (34.6K)",
          "followers": "34% (17.8K)",
          "us": "60% (31.4K)",
          "in": "15% (7.9K)",
          "gb": "16% (8.4K)"
        }
      },
      "14 Days": {
        "followers": "92.4K",
        "following": "210",
        "views": "98,000",
        "comments": "3,620",
        "totalReplies": "2,240",
        "sentToday": "96",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "740",
        "reach": "104.0K",
        "trendReach": "▲ +20.1%",
        "engaged": "13.4K",
        "trendEngaged": "▲ +13.8%",
        "visits": "8,900",
        "trendVisits": "▲ +18.2%",
        "clicks": "3,840",
        "trendClicks": "▲ +24.0%",
        "replies": "2,240",
        "trendReplies": "▲ +16.0%",
        "dmsToday": "120",
        "trendDmsToday": "▲ +7.8%",
        "activeRules": "4 Active",
        "trendRules": "● 100% Uptime",
        "leads": "740",
        "trendLeads": "▲ +31.2%",
        "reachSub": "Workout reels reach vs program clicks over the last 14 days.",
        "legReach": "104.0K",
        "legAct": "8.9K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_u1tfeqhue\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">120K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,84.40384615384616 L 81.66666666666666,74.15384615384616 L 127.33333333333333,63.11538461538461 L 173,53.65384615384615 L 218.66666666666666,44.980769230769226 L 264.3333333333333,36.30769230769231 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_u1tfeqhue)\"/>\n      <path d=\"M 36,84.40384615384616 L 81.66666666666666,74.15384615384616 L 127.33333333333333,63.11538461538461 L 173,53.65384615384615 L 218.66666666666666,44.980769230769226 L 264.3333333333333,36.30769230769231 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,91.10112359550561 L 81.66666666666666,83.68539325842697 L 127.33333333333333,74.92134831460675 L 173,68.85393258426967 L 218.66666666666666,62.1123595505618 L 264.3333333333333,56.71910112359551 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"84.40384615384616\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"91.10112359550561\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"74.15384615384616\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"83.68539325842697\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"63.11538461538461\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"74.92134831460675\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"53.65384615384615\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"68.85393258426967\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"44.980769230769226\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"62.1123595505618\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.30769230769231\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"56.71910112359551\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 2</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 4</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 6</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 8</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 12</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 14</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 2\" data-reach=\"35K\" data-act=\"3.1K\" data-x=\"36\" data-reach-y=\"84.40384615384616\" data-act-y=\"91.10112359550561\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 4\" data-reach=\"48K\" data-act=\"4.2K\" data-x=\"81.66666666666666\" data-reach-y=\"74.15384615384616\" data-act-y=\"83.68539325842697\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 6\" data-reach=\"62K\" data-act=\"5.5K\" data-x=\"127.33333333333333\" data-reach-y=\"63.11538461538461\" data-act-y=\"74.92134831460675\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 8\" data-reach=\"74K\" data-act=\"6.4K\" data-x=\"173\" data-reach-y=\"53.65384615384615\" data-act-y=\"68.85393258426967\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 10\" data-reach=\"85K\" data-act=\"7.4K\" data-x=\"218.66666666666666\" data-reach-y=\"44.980769230769226\" data-act-y=\"62.1123595505618\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 12\" data-reach=\"96K\" data-act=\"8.2K\" data-x=\"264.3333333333333\" data-reach-y=\"36.30769230769231\" data-act-y=\"56.71910112359551\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 14\" data-reach=\"104K\" data-act=\"8.9K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "3,620",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "2,590",
          "s2Pct": "71.5%",
          "s2Fill": "71.5%",
          "s3Num": "1,490",
          "s3Pct": "41.2%",
          "s3Fill": "41.2%",
          "s4Num": "740",
          "s4Pct": "20.4%",
          "s4Fill": "20.4%",
          "rate": "20.4% Total Conv"
        },
        "demographics": {
          "total": "104.0K",
          "nonFollowers": "67% (69.7K)",
          "followers": "33% (34.3K)",
          "us": "61% (63.4K)",
          "in": "14% (14.6K)",
          "gb": "15% (15.6K)"
        }
      },
      "30 Days": {
        "followers": "92.4K",
        "following": "210",
        "views": "184,000",
        "comments": "6,840",
        "totalReplies": "4,210",
        "sentToday": "180",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "1,420",
        "reach": "189.4K",
        "trendReach": "▲ +22.1%",
        "engaged": "24.8K",
        "trendEngaged": "▲ +14.5%",
        "visits": "16,400",
        "trendVisits": "▲ +20.4%",
        "clicks": "7,200",
        "trendClicks": "▲ +27.2%",
        "replies": "4,210",
        "trendReplies": "▲ +17.8%",
        "dmsToday": "240",
        "trendDmsToday": "▲ +8.9%",
        "activeRules": "4 Active",
        "trendRules": "● 100% Uptime",
        "leads": "1,420",
        "trendLeads": "▲ +35.8%",
        "reachSub": "Workout reels reach vs program clicks over the last 30 days.",
        "legReach": "189.4K",
        "legAct": "16.4K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_jl1mh3iau\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">200K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,83.85850052798311 L 81.66666666666666,73.90073917634636 L 127.33333333333333,64.37592397043295 L 173,53.552270327349525 L 218.66666666666666,44.89334741288279 L 264.3333333333333,37.533262935586066 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_jl1mh3iau)\"/>\n      <path d=\"M 36,83.85850052798311 L 81.66666666666666,73.90073917634636 L 127.33333333333333,64.37592397043295 L 173,53.552270327349525 L 218.66666666666666,44.89334741288279 L 264.3333333333333,37.533262935586066 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,96.6341463414634 L 81.66666666666666,89.6829268292683 L 127.33333333333333,81.26829268292683 L 173,73.58536585365854 L 218.66666666666666,65.17073170731706 L 264.3333333333333,58.58536585365854 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"83.85850052798311\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"96.6341463414634\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"73.90073917634636\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"89.6829268292683\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"64.37592397043295\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"81.26829268292683\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"53.552270327349525\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"73.58536585365854\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"44.89334741288279\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"65.17073170731706\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"37.533262935586066\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"58.58536585365854\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 5</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 15</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 20</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 25</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"65K\" data-act=\"4.2K\" data-x=\"36\" data-reach-y=\"83.85850052798311\" data-act-y=\"96.6341463414634\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 5\" data-reach=\"88K\" data-act=\"6.1K\" data-x=\"81.66666666666666\" data-reach-y=\"73.90073917634636\" data-act-y=\"89.6829268292683\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 10\" data-reach=\"110K\" data-act=\"8.4K\" data-x=\"127.33333333333333\" data-reach-y=\"64.37592397043295\" data-act-y=\"81.26829268292683\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 15\" data-reach=\"135K\" data-act=\"10.5K\" data-x=\"173\" data-reach-y=\"53.552270327349525\" data-act-y=\"73.58536585365854\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 20\" data-reach=\"155K\" data-act=\"12.8K\" data-x=\"218.66666666666666\" data-reach-y=\"44.89334741288279\" data-act-y=\"65.17073170731706\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 25\" data-reach=\"172K\" data-act=\"14.6K\" data-x=\"264.3333333333333\" data-reach-y=\"37.533262935586066\" data-act-y=\"58.58536585365854\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 30\" data-reach=\"189.4K\" data-act=\"16.4K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "6,840",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "4,920",
          "s2Pct": "71.9%",
          "s2Fill": "71.9%",
          "s3Num": "2,840",
          "s3Pct": "41.5%",
          "s3Fill": "41.5%",
          "s4Num": "1,420",
          "s4Pct": "20.8%",
          "s4Fill": "20.8%",
          "rate": "20.8% Total Conv"
        },
        "demographics": {
          "total": "189.4K",
          "nonFollowers": "68% (128.8K)",
          "followers": "32% (60.6K)",
          "us": "62% (117.4K)",
          "in": "14% (26.5K)",
          "gb": "14% (26.5K)"
        }
      },
      "60 Days": {
        "followers": "92.4K",
        "following": "210",
        "views": "372,000",
        "comments": "13,900",
        "totalReplies": "8,540",
        "sentToday": "280",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "2,890",
        "reach": "382.0K",
        "trendReach": "▲ +26.4%",
        "engaged": "49.0K",
        "trendEngaged": "▲ +18.0%",
        "visits": "33,000",
        "trendVisits": "▲ +24.8%",
        "clicks": "14,800",
        "trendClicks": "▲ +32.0%",
        "replies": "8,540",
        "trendReplies": "▲ +21.5%",
        "dmsToday": "380",
        "trendDmsToday": "▲ +11.4%",
        "activeRules": "4 Active",
        "trendRules": "● 100% Uptime",
        "leads": "2,890",
        "trendLeads": "▲ +41.5%",
        "reachSub": "Workout reels reach vs program clicks over the last 60 days.",
        "legReach": "382.0K",
        "legAct": "33.0K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_0kz6qfkp5\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">400K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,84.09424083769633 L 81.66666666666666,73.36125654450262 L 127.33333333333333,62.6282722513089 L 173,52.968586387434556 L 218.66666666666666,44.38219895287958 L 264.3333333333333,36.86910994764398 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_0kz6qfkp5)\"/>\n      <path d=\"M 36,84.09424083769633 L 81.66666666666666,73.36125654450262 L 127.33333333333333,62.6282722513089 L 173,52.968586387434556 L 218.66666666666666,44.38219895287958 L 264.3333333333333,36.86910994764398 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,95.63636363636364 L 81.66666666666666,88.36363636363636 L 127.33333333333333,81.0909090909091 L 173,73.81818181818181 L 218.66666666666666,64.72727272727272 L 264.3333333333333,57.45454545454545 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"84.09424083769633\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"95.63636363636364\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"73.36125654450262\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"88.36363636363636\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"62.6282722513089\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"81.0909090909091\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"52.968586387434556\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"73.81818181818181\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"44.38219895287958\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"64.72727272727272\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.86910994764398\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"57.45454545454545\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 20</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 40</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 50</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 60</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"130K\" data-act=\"9K\" data-x=\"36\" data-reach-y=\"84.09424083769633\" data-act-y=\"95.63636363636364\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 10\" data-reach=\"180K\" data-act=\"13K\" data-x=\"81.66666666666666\" data-reach-y=\"73.36125654450262\" data-act-y=\"88.36363636363636\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 20\" data-reach=\"230K\" data-act=\"17K\" data-x=\"127.33333333333333\" data-reach-y=\"62.6282722513089\" data-act-y=\"81.0909090909091\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 30\" data-reach=\"275K\" data-act=\"21K\" data-x=\"173\" data-reach-y=\"52.968586387434556\" data-act-y=\"73.81818181818181\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 40\" data-reach=\"315K\" data-act=\"26K\" data-x=\"218.66666666666666\" data-reach-y=\"44.38219895287958\" data-act-y=\"64.72727272727272\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 50\" data-reach=\"350K\" data-act=\"30K\" data-x=\"264.3333333333333\" data-reach-y=\"36.86910994764398\" data-act-y=\"57.45454545454545\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 60\" data-reach=\"382K\" data-act=\"33K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "13,900",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "10,000",
          "s2Pct": "71.9%",
          "s2Fill": "71.9%",
          "s3Num": "5,800",
          "s3Pct": "41.7%",
          "s3Fill": "41.7%",
          "s4Num": "2,890",
          "s4Pct": "20.8%",
          "s4Fill": "20.8%",
          "rate": "20.8% Total Conv"
        },
        "demographics": {
          "total": "382.0K",
          "nonFollowers": "69% (263.6K)",
          "followers": "31% (118.4K)",
          "us": "63% (240.7K)",
          "in": "13% (49.7K)",
          "gb": "14% (53.5K)"
        }
      },
      "90 Days": {
        "followers": "92.4K",
        "following": "210",
        "views": "580,000",
        "comments": "21,400",
        "totalReplies": "13,200",
        "sentToday": "380",
        "activeRulesFlat": "4",
        "capturedLeadsFlat": "4,450",
        "reach": "592.0K",
        "trendReach": "▲ +31.0%",
        "engaged": "76.0K",
        "trendEngaged": "▲ +22.4%",
        "visits": "51,000",
        "trendVisits": "▲ +28.9%",
        "clicks": "22,900",
        "trendClicks": "▲ +36.5%",
        "replies": "13,200",
        "trendReplies": "▲ +25.8%",
        "dmsToday": "520",
        "trendDmsToday": "▲ +14.2%",
        "activeRules": "4 Active",
        "trendRules": "● 100% Uptime",
        "leads": "4,450",
        "trendLeads": "▲ +49.0%",
        "reachSub": "Workout reels reach vs program clicks over the last 90 days.",
        "legReach": "592.0K",
        "legAct": "51.0K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_5a43mmgga\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">650K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,84.29729729729729 L 81.66666666666666,73.21621621621622 L 127.33333333333333,62.13513513513514 L 173,52.43918918918919 L 218.66666666666666,43.43581081081081 L 264.3333333333333,35.817567567567565 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_5a43mmgga)\"/>\n      <path d=\"M 36,84.29729729729729 L 81.66666666666666,73.21621621621622 L 127.33333333333333,62.13513513513514 L 173,52.43918918918919 L 218.66666666666666,43.43581081081081 L 264.3333333333333,35.817567567567565 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,95.52941176470588 L 81.66666666666666,88.47058823529412 L 127.33333333333333,80.23529411764706 L 173,73.17647058823529 L 218.66666666666666,64.94117647058823 L 264.3333333333333,56.70588235294118 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"84.29729729729729\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"95.52941176470588\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"73.21621621621622\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"88.47058823529412\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"62.13513513513514\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"80.23529411764706\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"52.43918918918919\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"73.17647058823529\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"43.43581081081081\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"64.94117647058823\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"35.817567567567565\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"56.70588235294118\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 15</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 45</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 60</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 75</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 90</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"200K\" data-act=\"14K\" data-x=\"36\" data-reach-y=\"84.29729729729729\" data-act-y=\"95.52941176470588\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 15\" data-reach=\"280K\" data-act=\"20K\" data-x=\"81.66666666666666\" data-reach-y=\"73.21621621621622\" data-act-y=\"88.47058823529412\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 30\" data-reach=\"360K\" data-act=\"27K\" data-x=\"127.33333333333333\" data-reach-y=\"62.13513513513514\" data-act-y=\"80.23529411764706\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 45\" data-reach=\"430K\" data-act=\"33K\" data-x=\"173\" data-reach-y=\"52.43918918918919\" data-act-y=\"73.17647058823529\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 60\" data-reach=\"495K\" data-act=\"40K\" data-x=\"218.66666666666666\" data-reach-y=\"43.43581081081081\" data-act-y=\"64.94117647058823\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 75\" data-reach=\"550K\" data-act=\"47K\" data-x=\"264.3333333333333\" data-reach-y=\"35.817567567567565\" data-act-y=\"56.70588235294118\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 90\" data-reach=\"592K\" data-act=\"51K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "21,400",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "15,400",
          "s2Pct": "72.0%",
          "s2Fill": "72.0%",
          "s3Num": "8,900",
          "s3Pct": "41.6%",
          "s3Fill": "41.6%",
          "s4Num": "4,450",
          "s4Pct": "20.8%",
          "s4Fill": "20.8%",
          "rate": "20.8% Total Conv"
        },
        "demographics": {
          "total": "592.0K",
          "nonFollowers": "70% (414.4K)",
          "followers": "30% (177.6K)",
          "us": "64% (378.9K)",
          "in": "12% (71.0K)",
          "gb": "14% (82.9K)"
        }
      }
    },
    "store": [
      {
        "id": "prod-a1",
        "title": "12-Week Lean Muscle Transformation Blueprint",
        "price": "₹1,999",
        "oldPrice": "₹3,999",
        "desc": "Complete progressive overload workout regime, macro targets, video exercise breakdowns, and weekly check-in templates for rapid body recomposition.",
        "cta": "Join Program",
        "rating": "5.0 (98 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-a2",
        "title": "Custom Macro & Nutrition Meal Planner",
        "price": "₹999",
        "oldPrice": "₹1,899",
        "desc": "Personalized calorie and macro calculation spreadsheet with 60 high-protein recipes, grocery shopping lists, and supplement guide.",
        "cta": "Get Meal Plan",
        "rating": "4.9 (145 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-a3",
        "title": "1-on-1 Monthly VIP Online Coaching",
        "price": "₹9,999",
        "oldPrice": "₹14,999",
        "desc": "Dedicated private WhatsApp coaching, custom workout programming updated weekly, form review videos, and bi-weekly Zoom consultations.",
        "cta": "Apply for Coaching",
        "rating": "5.0 (24 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-a4",
        "title": "Free 5-Day Shred Workout PDF",
        "price": "FREE",
        "oldPrice": "₹499",
        "desc": "5 high-intensity gym routines to kickstart fat loss and build shoulder & core definition.",
        "cta": "Download PDF",
        "rating": "4.9 (680 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ],
    "rules": [
      {
        "id": "rule-a-workout",
        "name": "Free 5-Day Shred Workout PDF",
        "ruleSub": "Free 5-Day Shred Workout PDF",
        "thumbImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        "type": "reel",
        "typeName": "Reels & Live",
        "keywords": [
          "WORKOUT",
          "SHRED"
        ],
        "target": "REELS",
        "targetType": "REELS",
        "active": true,
        "sentCount": 5410,
        "successRate": "99.5%",
        "response": "Let’s get after it {first_name}! 💥 Here is your free 5-Day Shred Workout Program PDF: {link} Save it to your phone and crush your next workout!",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/alex/shred-program.pdf",
        "linkTitle": "Free 5-Day Shred Workout PDF",
        "commentReply": true,
        "commentReplyText": "Sent the 5-day workout plan directly to your DMs brother! Check messages 👊"
      },
      {
        "id": "rule-a-diet",
        "name": "Macro Calculator & Nutrition Guide",
        "ruleSub": "Macro Calculator & Nutrition Guide",
        "thumbImg": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
        "type": "post",
        "typeName": "Post Comments",
        "keywords": [
          "DIET",
          "MACROS"
        ],
        "target": "POST",
        "targetType": "POST",
        "active": true,
        "sentCount": 3820,
        "successRate": "98.8%",
        "response": "Hey {first_name}! Here is the link to access the High-Protein Meal Planner and Macro Calculator: {link}",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/alex/macros-guide",
        "linkTitle": "Macro Calculator & Meal Plan",
        "commentReply": false,
        "commentReplyText": ""
      },
      {
        "id": "rule-a-coach",
        "name": "VIP 1-on-1 Coaching Application",
        "ruleSub": "VIP 1-on-1 Coaching Application",
        "thumbImg": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
        "type": "dm",
        "typeName": "Direct Messages",
        "keywords": [
          "COACHING"
        ],
        "target": "DIRECT_MESSAGES",
        "targetType": "DIRECT_MESSAGES",
        "active": true,
        "sentCount": 1240,
        "successRate": "99.2%",
        "response": "Hey {first_name}! Ready to transform your physique? Fill out our 2-minute VIP Coaching application here: {link} I review every application personally.",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/alex/apply",
        "linkTitle": "Apply for VIP Coaching",
        "commentReply": false,
        "commentReplyText": ""
      }
    ],
    "inbox": {
      "david": {
        "name": "David Miller",
        "handle": "@david_lifts",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        "followers": "32K Followers",
        "source": "Reel Comment: \"#WORKOUT\"",
        "status": "attention",
        "botActive": true,
        "triggerTitle": "Triggered by Reel: \"3 Chest Exercises to Build Upper Pecs\" (Keyword: \"#WORKOUT\")",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, 09:20 AM"
          },
          {
            "type": "user",
            "text": "WORKOUT! Can you send the PDF?",
            "time": "09:20 AM",
            "context": "Commented on chest reel"
          },
          {
            "type": "bot",
            "text": "Hey David! Here is the free 5-Day Shred Workout PDF: https://renderreply.com/alex/shred-program.pdf Let’s get those gains!",
            "time": "09:20 AM",
            "flow": "Fitness Lead Magnet Flow",
            "hasCard": true
          }
        ]
      },
      "ryan": {
        "name": "Ryan Chen",
        "handle": "@ryan_fitlife",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        "followers": "78K Followers",
        "source": "Reel Comment: \"#DIET\"",
        "status": "bot",
        "botActive": true,
        "triggerTitle": "Triggered by Reel: \"What I Eat in a Day for 180g Protein\"",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, 08:15 AM"
          },
          {
            "type": "user",
            "text": "DIET info please!",
            "time": "08:15 AM",
            "context": "Commented \"#DIET\""
          },
          {
            "type": "bot",
            "text": "Hey Ryan! Here is your custom macro calculator and 60-recipe meal guide: https://renderreply.com/alex/macros-guide",
            "time": "08:15 AM",
            "flow": "Nutrition Automation Flow",
            "hasCard": false
          }
        ]
      },
      "brody": {
        "name": "Marcus Brody",
        "handle": "@brody_fitness",
        "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
        "followers": "110K Followers",
        "source": "DM Keyword: \"#COACHING\"",
        "status": "resolved",
        "botActive": true,
        "triggerTitle": "VIP Coaching Inquiry",
        "messages": [
          {
            "type": "divider",
            "text": "YESTERDAY"
          },
          {
            "type": "user",
            "text": "COACHING",
            "time": "06:12 PM",
            "context": "Direct message"
          },
          {
            "type": "bot",
            "text": "Hey Marcus! Fill out our VIP coaching application: https://renderreply.com/alex/apply",
            "time": "06:12 PM",
            "flow": "Coaching Funnel",
            "hasCard": false
          },
          {
            "type": "user",
            "text": "Submitted application! Looking forward to working with you.",
            "time": "06:30 PM"
          }
        ]
      }
    },
    "leads": [
      {
        "id": "lead-a1",
        "handle": "@david_lifts",
        "name": "David Miller",
        "avatar": "DM",
        "email": "david.miller@techcorp.com",
        "phone": "+1 (555) 345-6789",
        "keyword": "#WORKOUT",
        "campaign": "workout",
        "status": "Email Captured",
        "statusClass": "email",
        "sourceTitle": "3 Chest Exercises to Build Upper Pecs Reel",
        "sourceThumb": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=80&q=80",
        "time": "4m ago",
        "timestamp": "Today, 09:20 AM",
        "commentText": "WORKOUT! Can you send the PDF?",
        "botReplyText": "Hey David! Here is your PDF: https://renderreply.com/alex/shred-program.pdf",
        "ruleName": "Free 5-Day Shred Workout PDF"
      },
      {
        "id": "lead-a2",
        "handle": "@ryan_fitlife",
        "name": "Ryan Chen",
        "avatar": "RC",
        "email": "ryan.chen@berkeley.edu",
        "phone": "+1 (555) 912-4820",
        "keyword": "DIET",
        "campaign": "diet",
        "status": "DM Delivered",
        "statusClass": "",
        "sourceTitle": "What I Eat in a Day for 180g Protein Post",
        "sourceThumb": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=80&q=80",
        "time": "18m ago",
        "timestamp": "Today, 08:15 AM",
        "commentText": "DIET info please!",
        "botReplyText": "Hey Ryan! Here is the nutrition link: https://renderreply.com/alex/macros-guide",
        "ruleName": "Macro Calculator & Nutrition Guide"
      }
    ],
    "payments": {
      "totalBalance": 412500,
      "availableBalance": 345000,
      "pendingBalance": 67500,
      "payout": {
        "upiId": "alexriverafit@okhdfcbank",
        "holderName": "Alex Rivera",
        "bankName": "HDFC Bank",
        "accountNumber": "50100998811234",
        "ifsc": "HDFC0000892",
        "primaryChannel": "UPI"
      },
      "transactions": [
        {
          "id": "88401948192019",
          "date": "Oct 24, 2026 09:30 AM",
          "type": "Order Sale",
          "amount": 99990,
          "status": "Cleared",
          "customer": "marcus.brody@gymshark.com",
          "channel": "Direct UPI",
          "fee": 2999,
          "gst": 540,
          "net": 96451
        },
        {
          "id": "88401948192015",
          "date": "Oct 23, 2026 02:10 PM",
          "type": "Order Sale",
          "amount": 19990,
          "status": "Cleared",
          "customer": "david.miller@techcorp.com",
          "channel": "Direct UPI",
          "fee": 599,
          "gst": 108,
          "net": 19283
        },
        {
          "id": "88401948192008",
          "date": "Oct 22, 2026 04:45 PM",
          "type": "Order Sale",
          "amount": 9990,
          "status": "Cleared",
          "customer": "ryan.chen@berkeley.edu",
          "channel": "Direct UPI",
          "fee": 299,
          "gst": 54,
          "net": 9637
        },
        {
          "id": "89102471928001",
          "date": "Oct 20, 2026 01:15 PM",
          "type": "Withdrawal",
          "amount": -200000,
          "status": "Cleared",
          "customer": "Payout to alexriverafit@okhdfcbank",
          "channel": "Direct UPI",
          "fee": 0,
          "gst": 0,
          "net": -200000
        }
      ]
    },
    "biolink": {
      "title": "Alex Rivera | Elite Strength & Nutrition 💥",
      "bio": "Transform your body with science-backed training programs and personalized coaching.",
      "links": [
        {
          "label": "Join 12-Week Transformation Challenge 🏋️",
          "url": "https://renderreply.com/alex/12-weeks",
          "color": "accent"
        },
        {
          "label": "Apply for 1-on-1 VIP Online Coaching",
          "url": "https://renderreply.com/alex/apply",
          "color": "slate"
        },
        {
          "label": "Free 5-Day Shred Workout PDF",
          "url": "https://renderreply.com/alex/shred-pdf",
          "color": "emerald"
        },
        {
          "label": "Calculate Your Daily Macros Free",
          "url": "https://renderreply.com/alex/macros",
          "color": "amber"
        }
      ],
      "video1": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "video2": "",
      "theme": "midnight-emerald"
    }
  },
  "acc-agency": {
    "id": "acc-agency",
    "profile": {
      "name": "RenderReply Agency Pro",
      "email": "agency@renderreply.com",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      "bio": "Enterprise Instagram Growth & DM Automation Infrastructure for Brands & Agencies 🚀 Managing 25+ creators.",
      "insta": "@renderagency",
      "yt": "youtube.com/@renderagency",
      "tw": "@renderagency",
      "initials": "RA",
      "badge": "Enterprise Agency Tier",
      "role": "Agency Admin"
    },
    "dashboard": {
      "7 Days": {
        "followers": "540K",
        "following": "85",
        "views": "480,000",
        "comments": "18,400",
        "totalReplies": "11,200",
        "sentToday": "480",
        "activeRulesFlat": "12",
        "capturedLeadsFlat": "3,840",
        "reach": "390.0K",
        "trendReach": "▲ +38.2%",
        "engaged": "48.2K",
        "trendEngaged": "▲ +24.5%",
        "visits": "26,400",
        "trendVisits": "▲ +32.0%",
        "clicks": "12,900",
        "trendClicks": "▲ +38.4%",
        "replies": "11,200",
        "trendReplies": "▲ +28.5%",
        "dmsToday": "480",
        "trendDmsToday": "▲ +14.2%",
        "activeRules": "12 Active",
        "trendRules": "● 100% Uptime",
        "leads": "3,840",
        "trendLeads": "▲ +48.0%",
        "reachSub": "Combined multi-client reach vs lead conversions over the last 7 days.",
        "legReach": "390.0K",
        "legAct": "26.4K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_6hlta3m3y\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">450K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,86.76923076923077 L 81.66666666666666,76.25641025641025 L 127.33333333333333,65.74358974358975 L 173,55.23076923076923 L 218.66666666666666,46.82051282051282 L 264.3333333333333,37.358974358974365 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_6hlta3m3y)\"/>\n      <path d=\"M 36,86.76923076923077 L 81.66666666666666,76.25641025641025 L 127.33333333333333,65.74358974358975 L 173,55.23076923076923 L 218.66666666666666,46.82051282051282 L 264.3333333333333,37.358974358974365 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,92.68181818181819 L 81.66666666666666,84.5 L 127.33333333333333,76.0909090909091 L 173,67.9090909090909 L 218.66666666666666,61.772727272727266 L 264.3333333333333,55.63636363636363 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"86.76923076923077\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"92.68181818181819\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"76.25641025641025\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"84.5\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"65.74358974358975\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"76.0909090909091\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"55.23076923076923\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"67.9090909090909\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"46.82051282051282\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"61.772727272727266\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"37.358974358974365\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"55.63636363636363\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 2</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 3</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 4</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 5</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 6</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 7</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"120K\" data-act=\"8.5K\" data-x=\"36\" data-reach-y=\"86.76923076923077\" data-act-y=\"92.68181818181819\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 2\" data-reach=\"170K\" data-act=\"12.1K\" data-x=\"81.66666666666666\" data-reach-y=\"76.25641025641025\" data-act-y=\"84.5\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 3\" data-reach=\"220K\" data-act=\"15.8K\" data-x=\"127.33333333333333\" data-reach-y=\"65.74358974358975\" data-act-y=\"76.0909090909091\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 4\" data-reach=\"270K\" data-act=\"19.4K\" data-x=\"173\" data-reach-y=\"55.23076923076923\" data-act-y=\"67.9090909090909\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 5\" data-reach=\"310K\" data-act=\"22.1K\" data-x=\"218.66666666666666\" data-reach-y=\"46.82051282051282\" data-act-y=\"61.772727272727266\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 6\" data-reach=\"355K\" data-act=\"24.8K\" data-x=\"264.3333333333333\" data-reach-y=\"37.358974358974365\" data-act-y=\"55.63636363636363\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 7\" data-reach=\"390K\" data-act=\"26.4K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "18,400",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "12,900",
          "s2Pct": "70.1%",
          "s2Fill": "70.1%",
          "s3Num": "7,600",
          "s3Pct": "41.3%",
          "s3Fill": "41.3%",
          "s4Num": "3,840",
          "s4Pct": "20.9%",
          "s4Fill": "20.9%",
          "rate": "20.9% Total Conv"
        },
        "demographics": {
          "total": "390.0K",
          "nonFollowers": "76% (296.4K)",
          "followers": "24% (93.6K)",
          "us": "46% (179.4K)",
          "in": "22% (85.8K)",
          "gb": "18% (70.2K)"
        }
      },
      "14 Days": {
        "followers": "540K",
        "following": "85",
        "views": "920,000",
        "comments": "35,600",
        "totalReplies": "22,400",
        "sentToday": "940",
        "activeRulesFlat": "12",
        "capturedLeadsFlat": "7,480",
        "reach": "760.0K",
        "trendReach": "▲ +42.0%",
        "engaged": "96.0K",
        "trendEngaged": "▲ +26.8%",
        "visits": "52,000",
        "trendVisits": "▲ +36.4%",
        "clicks": "25,400",
        "trendClicks": "▲ +42.0%",
        "replies": "22,400",
        "trendReplies": "▲ +32.0%",
        "dmsToday": "940",
        "trendDmsToday": "▲ +16.0%",
        "activeRules": "12 Active",
        "trendRules": "● 100% Uptime",
        "leads": "7,480",
        "trendLeads": "▲ +51.2%",
        "reachSub": "Combined multi-client reach vs lead conversions over the last 14 days.",
        "legReach": "760.0K",
        "legAct": "52.0K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_c3f14vfm1\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">850K</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,86.10526315789474 L 81.66666666666666,75.31578947368422 L 127.33333333333333,64.52631578947368 L 173,54.81578947368421 L 218.66666666666666,45.10526315789474 L 264.3333333333333,36.473684210526315 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_c3f14vfm1)\"/>\n      <path d=\"M 36,86.10526315789474 L 81.66666666666666,75.31578947368422 L 127.33333333333333,64.52631578947368 L 173,54.81578947368421 L 218.66666666666666,45.10526315789474 L 264.3333333333333,36.473684210526315 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,93.53846153846153 L 81.66666666666666,84.3076923076923 L 127.33333333333333,76.23076923076923 L 173,68.15384615384616 L 218.66666666666666,61.23076923076923 L 264.3333333333333,55.46153846153846 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"86.10526315789474\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"93.53846153846153\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"75.31578947368422\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"84.3076923076923\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"64.52631578947368\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"76.23076923076923\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"54.81578947368421\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"68.15384615384616\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"45.10526315789474\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"61.23076923076923\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.473684210526315\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"55.46153846153846\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 2</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 4</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 6</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 8</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 12</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 14</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 2\" data-reach=\"240K\" data-act=\"16K\" data-x=\"36\" data-reach-y=\"86.10526315789474\" data-act-y=\"93.53846153846153\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 4\" data-reach=\"340K\" data-act=\"24K\" data-x=\"81.66666666666666\" data-reach-y=\"75.31578947368422\" data-act-y=\"84.3076923076923\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 6\" data-reach=\"440K\" data-act=\"31K\" data-x=\"127.33333333333333\" data-reach-y=\"64.52631578947368\" data-act-y=\"76.23076923076923\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 8\" data-reach=\"530K\" data-act=\"38K\" data-x=\"173\" data-reach-y=\"54.81578947368421\" data-act-y=\"68.15384615384616\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 10\" data-reach=\"620K\" data-act=\"44K\" data-x=\"218.66666666666666\" data-reach-y=\"45.10526315789474\" data-act-y=\"61.23076923076923\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 12\" data-reach=\"700K\" data-act=\"49K\" data-x=\"264.3333333333333\" data-reach-y=\"36.473684210526315\" data-act-y=\"55.46153846153846\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 14\" data-reach=\"760K\" data-act=\"52K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "35,600",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "25,100",
          "s2Pct": "70.5%",
          "s2Fill": "70.5%",
          "s3Num": "14,800",
          "s3Pct": "41.6%",
          "s3Fill": "41.6%",
          "s4Num": "7,480",
          "s4Pct": "21.0%",
          "s4Fill": "21.0%",
          "rate": "21.0% Total Conv"
        },
        "demographics": {
          "total": "760.0K",
          "nonFollowers": "77% (585.2K)",
          "followers": "23% (174.8K)",
          "us": "47% (357.2K)",
          "in": "21% (159.6K)",
          "gb": "18% (136.8K)"
        }
      },
      "30 Days": {
        "followers": "540K",
        "following": "85",
        "views": "1,840,000",
        "comments": "68,400",
        "totalReplies": "42,900",
        "sentToday": "1,840",
        "activeRulesFlat": "12",
        "capturedLeadsFlat": "14,850",
        "reach": "1.42M",
        "trendReach": "▲ +45.2%",
        "engaged": "184.2K",
        "trendEngaged": "▲ +28.4%",
        "visits": "98,400",
        "trendVisits": "▲ +41.5%",
        "clicks": "48,200",
        "trendClicks": "▲ +46.8%",
        "replies": "42,900",
        "trendReplies": "▲ +35.2%",
        "dmsToday": "1,840",
        "trendDmsToday": "▲ +18.4%",
        "activeRules": "12 Active",
        "trendRules": "● 100% Uptime",
        "leads": "14,850",
        "trendLeads": "▲ +54.2%",
        "reachSub": "Combined multi-client reach vs lead conversions over the last 30 days.",
        "legReach": "1.42M",
        "legAct": "98.4K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_krmsf4ws4\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">1.6M</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,84.28169014084507 L 81.66666666666666,76.19718309859155 L 127.33333333333333,65.22535211267606 L 173,57.140845070422536 L 218.66666666666666,46.16901408450704 L 264.3333333333333,37.50704225352112 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_krmsf4ws4)\"/>\n      <path d=\"M 36,84.28169014084507 L 81.66666666666666,76.19718309859155 L 127.33333333333333,65.22535211267606 L 173,57.140845070422536 L 218.66666666666666,46.16901408450704 L 264.3333333333333,37.50704225352112 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,92.48780487804878 L 81.66666666666666,84.5609756097561 L 127.33333333333333,76.63414634146342 L 173,68.70731707317073 L 218.66666666666666,60.78048780487805 L 264.3333333333333,56.51219512195122 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"84.28169014084507\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"92.48780487804878\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"76.19718309859155\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"84.5609756097561\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"65.22535211267606\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"76.63414634146342\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"57.140845070422536\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"68.70731707317073\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"46.16901408450704\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"60.78048780487805\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"37.50704225352112\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"56.51219512195122\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 5</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 15</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 20</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 25</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"480K\" data-act=\"32K\" data-x=\"36\" data-reach-y=\"84.28169014084507\" data-act-y=\"92.48780487804878\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 5\" data-reach=\"620K\" data-act=\"45K\" data-x=\"81.66666666666666\" data-reach-y=\"76.19718309859155\" data-act-y=\"84.5609756097561\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 10\" data-reach=\"810K\" data-act=\"58K\" data-x=\"127.33333333333333\" data-reach-y=\"65.22535211267606\" data-act-y=\"76.63414634146342\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 15\" data-reach=\"950K\" data-act=\"71K\" data-x=\"173\" data-reach-y=\"57.140845070422536\" data-act-y=\"68.70731707317073\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 20\" data-reach=\"1140K\" data-act=\"84K\" data-x=\"218.66666666666666\" data-reach-y=\"46.16901408450704\" data-act-y=\"60.78048780487805\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 25\" data-reach=\"1290K\" data-act=\"91K\" data-x=\"264.3333333333333\" data-reach-y=\"37.50704225352112\" data-act-y=\"56.51219512195122\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 30\" data-reach=\"1420K\" data-act=\"98.4K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "68,400",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "48,200",
          "s2Pct": "70.5%",
          "s2Fill": "70.5%",
          "s3Num": "28,400",
          "s3Pct": "41.5%",
          "s3Fill": "41.5%",
          "s4Num": "14,850",
          "s4Pct": "21.7%",
          "s4Fill": "21.7%",
          "rate": "21.7% Total Conv"
        },
        "demographics": {
          "total": "1.42M",
          "nonFollowers": "78% (1.11M)",
          "followers": "22% (312K)",
          "us": "48% (681.6K)",
          "in": "20% (284.0K)",
          "gb": "19% (269.8K)"
        }
      },
      "60 Days": {
        "followers": "540K",
        "following": "85",
        "views": "3,750,000",
        "comments": "138,000",
        "totalReplies": "86,500",
        "sentToday": "2,900",
        "activeRulesFlat": "12",
        "capturedLeadsFlat": "29,800",
        "reach": "2.85M",
        "trendReach": "▲ +52.0%",
        "engaged": "372.0K",
        "trendEngaged": "▲ +34.0%",
        "visits": "198,000",
        "trendVisits": "▲ +48.0%",
        "clicks": "98,000",
        "trendClicks": "▲ +54.0%",
        "replies": "86,500",
        "trendReplies": "▲ +42.0%",
        "dmsToday": "2,900",
        "trendDmsToday": "▲ +22.0%",
        "activeRules": "12 Active",
        "trendRules": "● 100% Uptime",
        "leads": "29,800",
        "trendLeads": "▲ +62.0%",
        "reachSub": "Combined multi-client reach vs lead conversions over the last 60 days.",
        "legReach": "2.85M",
        "legAct": "198K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_s6wzxygkq\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">3.2M</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,84.37894736842105 L 81.66666666666666,75.1719298245614 L 127.33333333333333,64.8140350877193 L 173,55.031578947368416 L 218.66666666666666,45.24912280701754 L 264.3333333333333,36.61754385964913 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_s6wzxygkq)\"/>\n      <path d=\"M 36,84.37894736842105 L 81.66666666666666,75.1719298245614 L 127.33333333333333,64.8140350877193 L 173,55.031578947368416 L 218.66666666666666,45.24912280701754 L 264.3333333333333,36.61754385964913 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,92.30303030303031 L 81.66666666666666,85.33333333333334 L 127.33333333333333,76.24242424242425 L 173,68.96969696969697 L 218.66666666666666,61.090909090909086 L 264.3333333333333,55.93939393939394 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"84.37894736842105\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"92.30303030303031\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"75.1719298245614\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"85.33333333333334\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"64.8140350877193\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"76.24242424242425\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"55.031578947368416\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"68.96969696969697\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"45.24912280701754\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"61.090909090909086\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.61754385964913\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"55.93939393939394\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 10</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 20</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 40</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 50</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 60</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"960K\" data-act=\"65K\" data-x=\"36\" data-reach-y=\"84.37894736842105\" data-act-y=\"92.30303030303031\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 10\" data-reach=\"1280K\" data-act=\"88K\" data-x=\"81.66666666666666\" data-reach-y=\"75.1719298245614\" data-act-y=\"85.33333333333334\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 20\" data-reach=\"1640K\" data-act=\"118K\" data-x=\"127.33333333333333\" data-reach-y=\"64.8140350877193\" data-act-y=\"76.24242424242425\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 30\" data-reach=\"1980K\" data-act=\"142K\" data-x=\"173\" data-reach-y=\"55.031578947368416\" data-act-y=\"68.96969696969697\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 40\" data-reach=\"2320K\" data-act=\"168K\" data-x=\"218.66666666666666\" data-reach-y=\"45.24912280701754\" data-act-y=\"61.090909090909086\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 50\" data-reach=\"2620K\" data-act=\"185K\" data-x=\"264.3333333333333\" data-reach-y=\"36.61754385964913\" data-act-y=\"55.93939393939394\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 60\" data-reach=\"2850K\" data-act=\"198K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "138,000",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "98,000",
          "s2Pct": "71.0%",
          "s2Fill": "71.0%",
          "s3Num": "58,000",
          "s3Pct": "42.0%",
          "s3Fill": "42.0%",
          "s4Num": "29,800",
          "s4Pct": "21.6%",
          "s4Fill": "21.6%",
          "rate": "21.6% Total Conv"
        },
        "demographics": {
          "total": "2.85M",
          "nonFollowers": "79% (2.25M)",
          "followers": "21% (598K)",
          "us": "49% (1.40M)",
          "in": "19% (541.5K)",
          "gb": "20% (570.0K)"
        }
      },
      "90 Days": {
        "followers": "540K",
        "following": "85",
        "views": "5,800,000",
        "comments": "214,000",
        "totalReplies": "134,000",
        "sentToday": "4,100",
        "activeRulesFlat": "12",
        "capturedLeadsFlat": "46,200",
        "reach": "4.42M",
        "trendReach": "▲ +59.0%",
        "engaged": "580.0K",
        "trendEngaged": "▲ +39.0%",
        "visits": "310,000",
        "trendVisits": "▲ +55.0%",
        "clicks": "154,000",
        "trendClicks": "▲ +62.0%",
        "replies": "134,000",
        "trendReplies": "▲ +48.0%",
        "dmsToday": "4,100",
        "trendDmsToday": "▲ +26.0%",
        "activeRules": "12 Active",
        "trendRules": "● 100% Uptime",
        "leads": "46,200",
        "trendLeads": "▲ +71.0%",
        "reachSub": "Combined multi-client reach vs lead conversions over the last 90 days.",
        "legReach": "4.42M",
        "legAct": "310K",
        "reachSvg": "\n    <svg viewBox=\"0 0 330 145\" class=\"dual-line-chart-svg\" style=\"width: 100%; height: 100%;\">\n      <defs>\n        <linearGradient id=\"reachGrad_zqq3rsync\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#09090b\" stop-opacity=\"0.10\"/>\n          <stop offset=\"100%\" stop-color=\"#09090b\" stop-opacity=\"0.0\"/>\n        </linearGradient>\n      </defs>\n      <line x1=\"32\" y1=\"28\" x2=\"315\" y2=\"28\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"70\" x2=\"315\" y2=\"70\" stroke=\"#f1f5f9\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/>\n      <line x1=\"32\" y1=\"112\" x2=\"315\" y2=\"112\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n      <text x=\"26\" y=\"32\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">5.0M</text>\n      <text x=\"26\" y=\"115\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"700\" fill=\"#71717a\" text-anchor=\"end\">0</text>\n      <path d=\"M 36,85.09954751131221 L 81.66666666666666,75.26696832579185 L 127.33333333333333,64.87782805429865 L 173,54.488687782805435 L 218.66666666666666,44.84162895927602 L 264.3333333333333,36.30769230769231 L 310,30 L 310,112 L 36,112 Z\" fill=\"url(#reachGrad_zqq3rsync)\"/>\n      <path d=\"M 36,85.09954751131221 L 81.66666666666666,75.26696832579185 L 127.33333333333333,64.87782805429865 L 173,54.488687782805435 L 218.66666666666666,44.84162895927602 L 264.3333333333333,36.30769230769231 L 310,30\" fill=\"none\" stroke=\"#09090b\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <path d=\"M 36,93.03225806451613 L 81.66666666666666,85.29032258064515 L 127.33333333333333,76.7741935483871 L 173,68.64516129032259 L 218.66666666666666,60.70967741935484 L 264.3333333333333,55.87096774193549 L 310,52\" fill=\"none\" stroke=\"#71717a\" stroke-width=\"1.8\" stroke-dasharray=\"3 3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-0\" cx=\"36\" cy=\"85.09954751131221\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-0\" cx=\"36\" cy=\"93.03225806451613\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-1\" cx=\"81.66666666666666\" cy=\"75.26696832579185\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-1\" cx=\"81.66666666666666\" cy=\"85.29032258064515\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-2\" cx=\"127.33333333333333\" cy=\"64.87782805429865\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-2\" cx=\"127.33333333333333\" cy=\"76.7741935483871\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-3\" cx=\"173\" cy=\"54.488687782805435\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-3\" cx=\"173\" cy=\"68.64516129032259\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-4\" cx=\"218.66666666666666\" cy=\"44.84162895927602\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-4\" cx=\"218.66666666666666\" cy=\"60.70967741935484\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-5\" cx=\"264.3333333333333\" cy=\"36.30769230769231\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-5\" cx=\"264.3333333333333\" cy=\"55.87096774193549\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n        <circle class=\"chart-point-reach pt-reach-6\" cx=\"310\" cy=\"30\" r=\"3.2\" fill=\"#ffffff\" stroke=\"#09090b\" stroke-width=\"2\"/>\n        <circle class=\"chart-point-act pt-act-6\" cx=\"310\" cy=\"52\" r=\"2.5\" fill=\"#ffffff\" stroke=\"#71717a\" stroke-width=\"1.5\"/>\n      \n      \n        <text x=\"36\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 1</text>\n      \n        <text x=\"81.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 15</text>\n      \n        <text x=\"127.33333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 30</text>\n      \n        <text x=\"173\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 45</text>\n      \n        <text x=\"218.66666666666666\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 60</text>\n      \n        <text x=\"264.3333333333333\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 75</text>\n      \n        <text x=\"310\" y=\"132\" font-family=\"'Inter', sans-serif\" font-size=\"9\" font-weight=\"600\" fill=\"#71717a\" text-anchor=\"middle\">Day 90</text>\n      \n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"0\" data-label=\"Day 1\" data-reach=\"1450K\" data-act=\"98K\" data-x=\"36\" data-reach-y=\"85.09954751131221\" data-act-y=\"93.03225806451613\" x=\"13.166666666666668\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"1\" data-label=\"Day 15\" data-reach=\"1980K\" data-act=\"138K\" data-x=\"81.66666666666666\" data-reach-y=\"75.26696832579185\" data-act-y=\"85.29032258064515\" x=\"58.83333333333333\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"2\" data-label=\"Day 30\" data-reach=\"2540K\" data-act=\"182K\" data-x=\"127.33333333333333\" data-reach-y=\"64.87782805429865\" data-act-y=\"76.7741935483871\" x=\"104.5\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"3\" data-label=\"Day 45\" data-reach=\"3100K\" data-act=\"224K\" data-x=\"173\" data-reach-y=\"54.488687782805435\" data-act-y=\"68.64516129032259\" x=\"150.16666666666666\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"4\" data-label=\"Day 60\" data-reach=\"3620K\" data-act=\"265K\" data-x=\"218.66666666666666\" data-reach-y=\"44.84162895927602\" data-act-y=\"60.70967741935484\" x=\"195.83333333333331\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"5\" data-label=\"Day 75\" data-reach=\"4080K\" data-act=\"290K\" data-x=\"264.3333333333333\" data-reach-y=\"36.30769230769231\" data-act-y=\"55.87096774193549\" x=\"241.49999999999997\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n        <rect class=\"chart-hover-trigger\" data-idx=\"6\" data-label=\"Day 90\" data-reach=\"4420K\" data-act=\"310K\" data-x=\"310\" data-reach-y=\"30\" data-act-y=\"52\" x=\"287.1666666666667\" y=\"0\" width=\"45.666666666666664\" height=\"145\" fill=\"transparent\" style=\"cursor: crosshair;\"/>\n      \n    </svg>\n  ",
        "funnel": {
          "s1Num": "214,000",
          "s1Pct": "100%",
          "s1Fill": "100%",
          "s2Num": "152,000",
          "s2Pct": "71.0%",
          "s2Fill": "71.0%",
          "s3Num": "90,000",
          "s3Pct": "42.1%",
          "s3Fill": "42.1%",
          "s4Num": "46,200",
          "s4Pct": "21.6%",
          "s4Fill": "21.6%",
          "rate": "21.6% Total Conv"
        },
        "demographics": {
          "total": "4.42M",
          "nonFollowers": "80% (3.54M)",
          "followers": "20% (884K)",
          "us": "50% (2.21M)",
          "in": "18% (795.6K)",
          "gb": "20% (884.0K)"
        }
      }
    },
    "store": [
      {
        "id": "prod-ag1",
        "title": "Agency Whitelabel Multi-Client License",
        "price": "₹24,999",
        "oldPrice": "₹49,999",
        "desc": "Deploy unlimited client Instagram accounts with custom domain branding, high-speed webhook relays, and multi-user team seats.",
        "cta": "Get Agency License",
        "rating": "5.0 (46 agency partners)",
        "photos": [
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-ag2",
        "title": "Enterprise Instagram Funnel Playbook 2026",
        "price": "₹4,999",
        "oldPrice": "₹9,999",
        "desc": "120-page blueprint detailing SOPs, DM sales scripts, and conversion rate optimization benchmarks for 7-figure creator brands.",
        "cta": "Download Playbook",
        "rating": "5.0 (82 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-ag3",
        "title": "High-Ticket Client Acquisition DM Scripts",
        "price": "₹2,499",
        "oldPrice": "₹4,999",
        "desc": "Tested outbound & inbound conversation frameworks to close $3,000–$10,000 agency retainers inside Instagram DMs.",
        "cta": "Access Scripts",
        "rating": "4.9 (110 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        "id": "prod-ag4",
        "title": "Agency Automation Demo & Starter Template Pack",
        "price": "FREE",
        "oldPrice": "₹1,999",
        "desc": "Interactive demo bot schema and 5 starter automation flows ready to deploy for your first agency client.",
        "cta": "Free Demo Access",
        "rating": "5.0 (340 reviews)",
        "photos": [
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ],
    "rules": [
      {
        "id": "rule-ag-scale",
        "name": "Agency Multi-Client Scaling System",
        "ruleSub": "Agency Multi-Client Scaling System",
        "thumbImg": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
        "type": "post",
        "typeName": "Post Comments",
        "keywords": [
          "SCALE",
          "AGENCY"
        ],
        "target": "POST",
        "targetType": "POST",
        "active": true,
        "sentCount": 18420,
        "successRate": "99.8%",
        "response": "Welcome {first_name}! Here is the complete RenderReply Agency Scaling infrastructure and demo access: {link}",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/agency/scale",
        "linkTitle": "Agency Scaling Portal",
        "commentReply": true,
        "commentReplyText": "Check your DMs for the full agency breakdown! 🚀"
      },
      {
        "id": "rule-ag-demo",
        "name": "Live Interactive Demo Bot",
        "ruleSub": "Live Interactive Demo Bot",
        "thumbImg": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        "type": "dm",
        "typeName": "Direct Messages",
        "keywords": [
          "DEMO"
        ],
        "target": "DIRECT_MESSAGES",
        "targetType": "DIRECT_MESSAGES",
        "active": true,
        "sentCount": 12400,
        "successRate": "99.1%",
        "response": "Hey {first_name}! You are testing our live automated enterprise relay. Here is your interactive client demo environment: {link}",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/agency/live-demo",
        "linkTitle": "Launch Interactive Demo",
        "commentReply": false,
        "commentReplyText": ""
      },
      {
        "id": "rule-ag-audit",
        "name": "Free 7-Figure Account DM Audit",
        "ruleSub": "Free 7-Figure Account DM Audit",
        "thumbImg": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
        "type": "reel",
        "typeName": "Reels & Live",
        "keywords": [
          "AUDIT"
        ],
        "target": "REELS",
        "targetType": "REELS",
        "active": true,
        "sentCount": 6120,
        "successRate": "98.6%",
        "response": "Hey {first_name}! Book your agency’s complimentary 30-minute Instagram funnel audit: {link}",
        "attachLink": true,
        "linkUrl": "https://renderreply.com/agency/book-audit",
        "linkTitle": "Schedule Funnel Audit",
        "commentReply": false,
        "commentReplyText": ""
      }
    ],
    "inbox": {
      "daniel": {
        "name": "Daniel Vance",
        "handle": "@vance_media",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        "followers": "280K Followers",
        "source": "Inquiry: Agency Whitelabel 10-Seat Tier",
        "status": "attention",
        "botActive": true,
        "triggerTitle": "Triggered by Reel: \"How We Scale 20+ Creators to $50k/mo\" (Keyword: \"#SCALE\")",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, 02:00 PM"
          },
          {
            "type": "user",
            "text": "SCALE! We have 14 clients and want to onboard them all to RenderReply this week. Can we speak with your partner lead?",
            "time": "02:00 PM",
            "context": "Agency Lead"
          },
          {
            "type": "bot",
            "text": "Hey Daniel! Absolutely! Here is direct access to our Agency Partner Portal and priority booking link: https://renderreply.com/agency/scale",
            "time": "02:00 PM",
            "flow": "Enterprise Inbound Flow",
            "hasCard": true
          }
        ]
      },
      "sophie": {
        "name": "Sophie Laurent",
        "handle": "@sophie_growth",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        "followers": "150K Followers",
        "source": "Reel Trigger: \"#DEMO\"",
        "status": "bot",
        "botActive": true,
        "triggerTitle": "Triggered by DM Keyword \"DEMO\"",
        "messages": [
          {
            "type": "divider",
            "text": "TODAY, 01:10 PM"
          },
          {
            "type": "user",
            "text": "DEMO",
            "time": "01:10 PM",
            "context": "Demo Bot Keyword"
          },
          {
            "type": "bot",
            "text": "Hey Sophie! Launching your custom client sandbox now: https://renderreply.com/agency/live-demo",
            "time": "01:10 PM",
            "flow": "Sandbox Generator",
            "hasCard": false
          }
        ]
      },
      "kevin": {
        "name": "Kevin Ortiz",
        "handle": "@kevin_ecom",
        "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
        "followers": "410K Followers",
        "source": "Whitelabel Contract: Signed",
        "status": "resolved",
        "botActive": false,
        "triggerTitle": "Enterprise Whitelabel Partner",
        "messages": [
          {
            "type": "divider",
            "text": "YESTERDAY"
          },
          {
            "type": "user",
            "text": "Contract signed and invoice paid for the annual 25-seat whitelabel tier!",
            "time": "04:15 PM"
          },
          {
            "type": "human",
            "text": "Welcome aboard Kevin! Your dedicated Slack channel and API tokens are live. Let’s crush it!",
            "time": "04:20 PM"
          }
        ]
      }
    },
    "leads": [
      {
        "id": "lead-ag1",
        "handle": "@vance_media",
        "name": "Daniel Vance",
        "avatar": "DV",
        "email": "daniel@vancemedia.agency",
        "phone": "+1 (555) 892-1049",
        "keyword": "#SCALE",
        "campaign": "scale",
        "status": "Email Captured",
        "statusClass": "email",
        "sourceTitle": "How We Scale 20+ Creators to $50k/mo Reel",
        "sourceThumb": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=80&q=80",
        "time": "2m ago",
        "timestamp": "Today, 02:00 PM",
        "commentText": "SCALE! We have 14 clients and want to onboard them all.",
        "botReplyText": "Hey Daniel! Here is the partner portal link: https://renderreply.com/agency/scale",
        "ruleName": "Agency Multi-Client Scaling System"
      },
      {
        "id": "lead-ag2",
        "handle": "@sophie_growth",
        "name": "Sophie Laurent",
        "avatar": "SL",
        "email": "sophie@elevateagency.co",
        "phone": "+33 6 98 76 54 32",
        "keyword": "DEMO",
        "campaign": "demo",
        "status": "DM Delivered",
        "statusClass": "",
        "sourceTitle": "Live Interactive Interactive Demo Bot",
        "sourceThumb": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=80&q=80",
        "time": "10m ago",
        "timestamp": "Today, 01:10 PM",
        "commentText": "DEMO",
        "botReplyText": "Hey Sophie! Here is your demo link: https://renderreply.com/agency/live-demo",
        "ruleName": "Live Interactive Demo Bot"
      }
    ],
    "payments": {
      "totalBalance": 842000,
      "availableBalance": 695000,
      "pendingBalance": 147000,
      "payout": {
        "upiId": "renderagency@icici",
        "holderName": "RenderReply Agency Pro",
        "bankName": "ICICI Bank",
        "accountNumber": "001928471629",
        "ifsc": "ICIC0000019",
        "primaryChannel": "Direct Bank"
      },
      "transactions": [
        {
          "id": "99201948192801",
          "date": "Oct 24, 2026 01:45 PM",
          "type": "Order Sale",
          "amount": 249990,
          "status": "Cleared",
          "customer": "kevin@apexbrandgroup.com",
          "channel": "Bank NEFT",
          "fee": 0,
          "gst": 44998,
          "net": 249990
        },
        {
          "id": "99201948192795",
          "date": "Oct 23, 2026 11:15 AM",
          "type": "Order Sale",
          "amount": 49990,
          "status": "Cleared",
          "customer": "daniel@vancemedia.agency",
          "channel": "Direct UPI",
          "fee": 1499,
          "gst": 270,
          "net": 48221
        },
        {
          "id": "99201948192780",
          "date": "Oct 21, 2026 03:30 PM",
          "type": "Order Sale",
          "amount": 24990,
          "status": "Cleared",
          "customer": "sophie@elevateagency.co",
          "channel": "Direct UPI",
          "fee": 749,
          "gst": 135,
          "net": 24106
        },
        {
          "id": "89102471928999",
          "date": "Oct 19, 2026 10:00 AM",
          "type": "Withdrawal",
          "amount": -400000,
          "status": "Cleared",
          "customer": "Payout to ICICI Bank ••••1629",
          "channel": "Bank IMPS",
          "fee": 0,
          "gst": 0,
          "net": -400000
        }
      ]
    },
    "biolink": {
      "title": "RenderReply Agency Pro | Enterprise Automations 🚀",
      "bio": "Automating high-converting Instagram DM funnels for top creators, founders & 7-figure agencies.",
      "links": [
        {
          "label": "Book Agency Whitelabel Demo 🚀",
          "url": "https://renderreply.com/agency/demo",
          "color": "accent"
        },
        {
          "label": "Download 2026 Funnel Playbook PDF",
          "url": "https://renderreply.com/agency/playbook",
          "color": "slate"
        },
        {
          "label": "Apply for Agency Partner Program",
          "url": "https://renderreply.com/agency/apply",
          "color": "emerald"
        },
        {
          "label": "Client Onboarding Portal",
          "url": "https://renderreply.com/agency/login",
          "color": "amber"
        }
      ],
      "video1": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "video2": "",
      "theme": "royal-indigo"
    }
  }
};

// ACTIVE USER STATE MANAGEMENT (Synced with localStorage)
window.currentActiveUserId = (function () {
  try {
    return localStorage.getItem('renderreply_active_user') || 'acc-rudra';
  } catch (e) {
    return 'acc-rudra';
  }
})();

window.getActiveUserData = function () {
  return window.USER_ACCOUNTS_DATABASE[window.currentActiveUserId] || window.USER_ACCOUNTS_DATABASE['acc-rudra'];
};

window.storeProfileState = window.getActiveUserData().profile;
window.paymentState = window.getActiveUserData().payments;
window.storeProfileDraft = null;

/* ==========================================================================
   GLOBAL USER PROFILE POPUP & MODAL CONTROLLER
   ========================================================================== */
window.toggleUserProfilePopup = function (e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  const popup = document.getElementById('user-profile-popup');
  if (!popup) return;

  const isVisible = popup.classList.contains('active') || popup.style.display === 'block';
  if (isVisible) {
    window.closeUserProfilePopup();
  } else {
    window.openUserProfilePopup();
  }
};

window.openUserProfilePopup = function () {
  const popup = document.getElementById('user-profile-popup');
  const trigger = document.getElementById('sidebar-user-profile-btn');
  if (!popup) return;
  popup.classList.add('active');
  popup.style.display = 'block';
  popup.style.opacity = '1';
  popup.style.visibility = 'visible';
  popup.style.pointerEvents = 'auto';
  popup.setAttribute('aria-hidden', 'false');
  if (trigger) {
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
  }
};

window.closeUserProfilePopup = function () {
  const popup = document.getElementById('user-profile-popup');
  const trigger = document.getElementById('sidebar-user-profile-btn');
  if (!popup) return;
  popup.classList.remove('active');
  popup.style.display = 'none';
  popup.style.opacity = '0';
  popup.style.visibility = 'hidden';
  popup.style.pointerEvents = 'none';
  popup.setAttribute('aria-hidden', 'true');
  if (trigger) {
    trigger.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
  }
};

window.openSwitchAccountModal = function (e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  window.closeUserProfilePopup();
  const modal = document.getElementById('modal-switch-account');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }
};

window.openAccountSettingsView = function (e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  window.closeUserProfilePopup();
  window.closeAccountModal('modal-switch-account');
  window.closeAccountModal('modal-user-settings');
  window.closeAccountModal('modal-user-support');
  window.closeAccountModal('modal-user-signout');

  // Deactivate all sidebar nav items & main tab views
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const tabViews = document.querySelectorAll('.main-wrapper .tab-view');

  navItems.forEach(n => n.classList.remove('active'));
  tabViews.forEach(v => {
    if (v.id === 'settings-view') {
      v.classList.add('active');
    } else {
      v.classList.remove('active');
    }
  });

  const indicator = document.getElementById('sidebar-pill-indicator');
  if (indicator) indicator.style.opacity = '0';

  window.syncSettingsForActiveUser();

  const mainWrap = document.querySelector('.main-wrapper');
  if (mainWrap) mainWrap.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile drawer if on mobile
  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
  }
};

window.openUserSettingsModal = window.openAccountSettingsView;

window.syncSettingsForActiveUser = function () {
  const active = (window.getActiveUserData ? window.getActiveUserData() : null) || {};
  if (!active || !active.profile) return;
  const profile = active.profile;
  const uidKey = (active.id || window.currentActiveUserId || '').toLowerCase();

  // 1. Profile Information
  const fName = document.getElementById('acc-settings-fullname');
  const fEmail = document.getElementById('acc-settings-email');
  const fProvider = document.getElementById('acc-settings-provider');
  const fSupport = document.getElementById('acc-settings-support-id');
  const fUid = document.getElementById('acc-settings-uid');

  if (fName) fName.value = profile.name || 'RudRa RR';
  if (fEmail) fEmail.value = profile.email || 'rudrateja08@gmail.com';

  let providerVal = 'Google Login';
  let supportIdVal = 'RR-SUP-98421';
  let uidVal = 'R3MT1DqCnWYuysMej8IZAw31v583';
  let planNameVal = 'Creator Pro Plan';
  let planDescVal = 'Unlimited Instagram AI automated comment DMs, instant lead capture & custom domain bio link.';
  let planPriceVal = '₹1,499';
  let planBadgeVal = '● Active Creator Pro';
  let renewalVal = 'Next billing date: <strong>Nov 24, 2026</strong>';

  if (uidKey.includes('sarah')) {
    providerVal = 'Google Login (Verified)';
    supportIdVal = 'RR-SUP-41908';
    uidVal = 'S8KJ9PqMnWYsarahMej7BZ2v901';
    planNameVal = 'VIP Influencer Pro Plan';
    planDescVal = 'High-capacity viral DM triggers, automated lookbook distribution & priority inbox AI.';
    planPriceVal = '₹2,999';
    planBadgeVal = '● Active VIP Influencer';
    renewalVal = 'Next billing date: <strong>Nov 28, 2026</strong>';
  } else if (uidKey.includes('alex')) {
    providerVal = 'Google Login';
    supportIdVal = 'RR-SUP-33012';
    uidVal = 'A4LV8KqPnWYalexMej5CR1w874';
    planNameVal = 'Coach & Fitness Creator Plan';
    planDescVal = 'Full coaching funnel automation, automated macro calculator delivery & store integration.';
    planPriceVal = '₹1,999';
    planBadgeVal = '● Active Coach Tier';
    renewalVal = 'Next billing date: <strong>Dec 04, 2026</strong>';
  } else if (uidKey.includes('agency')) {
    providerVal = 'Google Workspace Enterprise SSO';
    supportIdVal = 'RR-SUP-00109';
    uidVal = 'G9AG2XqRnWYagencyMej9EZ9q312';
    planNameVal = 'Enterprise Agency Tier';
    planDescVal = 'Multi-account management (25+ Instagram accounts), dedicated IP webhooks & white-label portal.';
    planPriceVal = '₹9,999';
    planBadgeVal = '● Enterprise Agency';
    renewalVal = 'Next billing date: <strong>Dec 15, 2026</strong>';
  }

  if (fProvider) fProvider.value = providerVal;
  if (fSupport) fSupport.value = supportIdVal;
  if (fUid) fUid.value = uidVal;

  // 2. Billing & Subscription
  const pBadge = document.getElementById('settings-plan-badge');
  const pName = document.getElementById('settings-plan-name');
  const pDesc = document.getElementById('settings-plan-desc');
  const pPrice = document.getElementById('settings-plan-price');
  const pRenewal = document.getElementById('settings-plan-renewal');
  const pMethod = document.getElementById('settings-payment-method');

  if (pBadge) pBadge.textContent = planBadgeVal;
  if (pName) pName.textContent = planNameVal;
  if (pDesc) pDesc.textContent = planDescVal;
  if (pPrice) pPrice.innerHTML = `${planPriceVal}<span class="plan-freq">/month</span>`;
  if (pRenewal) pRenewal.innerHTML = renewalVal;

  if (pMethod && active.payments && active.payments.payout) {
    if (active.payments.payout.upiId) {
      pMethod.textContent = `Direct UPI (${active.payments.payout.upiId})`;
    } else if (active.payments.payout.accountNumber) {
      pMethod.textContent = `${active.payments.payout.bankName} (•••• ${active.payments.payout.accountNumber.slice(-4)})`;
    }
  }

  // 3. Connected Instagram Account
  const iHandle = document.getElementById('settings-insta-handle');
  const iAvatar = document.getElementById('settings-insta-avatar');
  const initial = profile.initials || (profile.name ? profile.name[0] : 'R');

  if (iHandle) iHandle.textContent = profile.insta || '@render6457';
  if (iAvatar) {
    iAvatar.textContent = initial;
    if (uidKey.includes('sarah')) iAvatar.style.background = 'linear-gradient(135deg, #ec4899, #f43f5e)';
    else if (uidKey.includes('alex')) iAvatar.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    else if (uidKey.includes('agency')) iAvatar.style.background = 'linear-gradient(135deg, #06b6d4, #3b82f6)';
    else iAvatar.style.background = 'linear-gradient(135deg, #4f46e5, #7c3aed)';
  }
};

window.openSupportCenterView = function (e, targetSubPanel) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  if (typeof window.closeUserProfilePopup === 'function') window.closeUserProfilePopup();
  if (typeof window.closeAccountModal === 'function') {
    window.closeAccountModal('modal-switch-account');
    window.closeAccountModal('modal-user-settings');
    window.closeAccountModal('modal-user-support');
    window.closeAccountModal('modal-user-signout');
  }

  // Record previous active view if not already on support-view
  const currentActiveView = document.querySelector('.main-wrapper .tab-view.active');
  if (currentActiveView && currentActiveView.id !== 'support-view') {
    window.supportPreviousViewId = currentActiveView.id.replace('-view', '') || 'dashboard';
  }

  // Deactivate all sidebar nav items & tab views
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const tabViews = document.querySelectorAll('.main-wrapper .tab-view');

  navItems.forEach(n => n.classList.remove('active'));
  tabViews.forEach(v => {
    if (v.id === 'support-view') {
      v.classList.add('active');
    } else {
      v.classList.remove('active');
    }
  });

  const indicator = document.getElementById('sidebar-pill-indicator');
  if (indicator) indicator.style.opacity = '0';

  // Switch to specific sub-panel if requested (resources or tickets)
  if (targetSubPanel === 'tickets') {
    window.switchSupportSubPanel('tickets');
  } else {
    window.switchSupportSubPanel('resources');
  }

  // Render tickets list
  if (typeof window.renderSupportTicketsList === 'function') {
    window.renderSupportTicketsList();
  }

  const mainWrap = document.querySelector('.main-wrapper');
  if (mainWrap) mainWrap.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile drawer if on mobile
  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
  }
};

window.openUserSupportModal = window.openSupportCenterView;

window.openUserSignoutModal = function (e) {
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  window.closeUserProfilePopup();
  const modal = document.getElementById('modal-user-signout');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }
};

window.openAccountModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }
};

window.closeAccountModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
  }
};

/* ==========================================================================
   CENTRALIZED REAL-TIME ACCOUNT SWITCHING ENGINE
   ========================================================================== */
window.updateSidebarUserProfileUI = function (userData) {
  const user = userData || (window.getActiveUserData ? window.getActiveUserData() : null);
  if (!user || !user.profile) return;
  const profile = user.profile;
  const initial = profile.initials || (profile.name ? (profile.name.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()) : 'RR');

  // Custom account background gradients
  let bgGradient = 'linear-gradient(135deg, #4f46e5, #7c3aed)';
  const uid = (user.id || window.currentActiveUserId || '').toLowerCase();
  const uname = (profile.name || '').toLowerCase();
  if (uid.includes('sarah') || uname.includes('sarah')) {
    bgGradient = 'linear-gradient(135deg, #ec4899, #f43f5e)';
  } else if (uid.includes('alex') || uname.includes('alex')) {
    bgGradient = 'linear-gradient(135deg, #10b981, #059669)';
  } else if (uid.includes('agency') || uname.includes('agency')) {
    bgGradient = 'linear-gradient(135deg, #06b6d4, #3b82f6)';
  } else {
    bgGradient = 'linear-gradient(135deg, #4f46e5, #7c3aed)';
  }

  // 1. Sidebar User Name & Handle Subtitle
  const sbName = document.getElementById('sidebar-user-name');
  const sbSub = document.getElementById('sidebar-user-sub');
  if (sbName) sbName.textContent = profile.name || 'RudRa RR';
  if (sbSub) sbSub.textContent = profile.insta || profile.badge || '@render6457';

  // 2. Sidebar Avatar
  const sbAvatar = document.getElementById('sidebar-user-avatar');
  if (sbAvatar) {
    sbAvatar.style.background = bgGradient;
    if (profile.avatar) {
      sbAvatar.innerHTML = `
        <img src="${profile.avatar}" alt="${profile.name || 'User'}" class="user-avatar-img" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='block';" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;"/>
        <span class="user-avatar-text" style="display: none; font-weight: 800; font-size: 11.5px; color: #ffffff;">${initial}</span>
      `;
    } else {
      sbAvatar.innerHTML = `<span class="user-avatar-text" style="font-weight: 800; font-size: 11.5px; color: #ffffff;">${initial}</span>`;
    }
  }

  // 3. Mobile Top Bar Avatar
  const mobileAvatar = document.querySelector('.mobile-top-bar .user-avatar');
  if (mobileAvatar) {
    mobileAvatar.style.background = bgGradient;
    if (profile.avatar) {
      mobileAvatar.innerHTML = `
        <img src="${profile.avatar}" alt="${profile.name || 'User'}" class="user-avatar-img" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='block';" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;"/>
        <span class="user-avatar-text" style="display: none; font-weight: 800; font-size: 12px; color: #ffffff;">${initial}</span>
      `;
    } else {
      mobileAvatar.innerHTML = `<span class="user-avatar-text" style="font-weight: 800; font-size: 12px; color: #ffffff;">${initial}</span>`;
    }
  }

  // 4. Popup Header info
  const uppName = document.getElementById('upp-user-name');
  const uppEmail = document.getElementById('upp-user-email');
  if (uppName) uppName.textContent = profile.name || 'RudRa RR';
  if (uppEmail) uppEmail.textContent = profile.email || 'rudrateja08@gmail.com';

  // 5. Sync Social Scheduler Accounts & Chips
  if (typeof window.syncSchedulerAccountsToActiveUser === 'function') {
    try { window.syncSchedulerAccountsToActiveUser(); } catch (e) { }
  }
};

window.switchActiveUserAccount = function (userId) {
  if (!window.USER_ACCOUNTS_DATABASE[userId]) return;
  window.currentActiveUserId = userId;
  try {
    localStorage.setItem('renderreply_active_user', userId);
  } catch (err) { }

  const activeUser = window.getActiveUserData();
  window.storeProfileState = activeUser.profile;
  window.paymentState = activeUser.payments;

  // 1. Update Sidebar & Mobile Header UI
  window.updateSidebarUserProfileUI(activeUser);

  // 2. Update Switch Account Modal Item Badges and States
  document.querySelectorAll('.switch-account-item').forEach(item => {
    const itemId = item.getAttribute('data-account-id');
    const isActive = itemId === userId;
    item.classList.toggle('active', isActive);
  });

  // 4. Update Settings Modal Inputs
  const sName = document.getElementById('settings-user-name');
  const sEmail = document.getElementById('settings-user-email');
  const sBio = document.getElementById('settings-user-bio');
  if (sName) sName.value = activeUser.profile.name;
  if (sEmail) sEmail.value = activeUser.profile.email;
  if (sBio) sBio.value = activeUser.profile.bio;

  // 5. Reactive Module View Synchronizations
  if (typeof window.syncStoreProfileToUI === 'function') {
    try { window.syncStoreProfileToUI(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncDashboardForActiveUser === 'function') {
    try { window.syncDashboardForActiveUser(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncLeadsForActiveUser === 'function') {
    try { window.syncLeadsForActiveUser(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncRulesForActiveUser === 'function') {
    try { window.syncRulesForActiveUser(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncInboxForActiveUser === 'function') {
    try { window.syncInboxForActiveUser(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncStoreProductsForActiveUser === 'function') {
    try { window.syncStoreProductsForActiveUser(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncPaymentsForActiveUser === 'function') {
    try { window.syncPaymentsForActiveUser(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncBioLinkForActiveUser === 'function') {
    try { window.syncBioLinkForActiveUser(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncSettingsForActiveUser === 'function') {
    try { window.syncSettingsForActiveUser(); } catch (e) { console.error(e); }
  }
  if (typeof window.syncSchedulerAccountsToActiveUser === 'function') {
    try { window.syncSchedulerAccountsToActiveUser(); } catch (e) { console.error(e); }
  }

  // 6. User Feedback Toast & Modal Dismissal
  if (typeof showToast === 'function') {
    showToast(`Switched to workspace: ${activeUser.profile.name}`);
  }
  window.closeAccountModal('modal-switch-account');
};

// Global click outside listener for popup
document.addEventListener('click', function (e) {
  const popup = document.getElementById('user-profile-popup');
  const trigger = document.getElementById('sidebar-user-profile-btn');
  if (popup && (popup.classList.contains('active') || popup.style.display === 'block')) {
    if (!popup.contains(e.target) && (!trigger || !trigger.contains(e.target))) {
      window.closeUserProfilePopup();
    }
  }
});


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

window.syncStoreProfileToUI = function (data) {
  const profile = data || (window.getActiveUserData ? window.getActiveUserData().profile : window.storeProfileState);
  if (!profile) return;

  // 1. Dashboard Account Bar Info
  const dashHandle = document.getElementById('dashboard-account-handle');
  const dashAccIcon = document.querySelector('#account-info-container .account-icon');
  const phoneHandle = document.getElementById('phone-display-handle');
  const initial = profile.initials || (profile.name ? profile.name.charAt(0) : 'R');

  if (dashHandle) dashHandle.textContent = profile.insta || '@render6457';
  if (dashAccIcon) dashAccIcon.textContent = initial;
  if (phoneHandle) phoneHandle.textContent = profile.insta || '@render6457';

  // 2. Store Overview summary card
  const nameTxt = document.getElementById('store-display-name-txt');
  const bioTxt = document.getElementById('store-bio-text-txt');
  const avatarImg = document.getElementById('store-avatar-img');

  if (nameTxt) nameTxt.textContent = profile.name || 'RudRa RR';
  if (bioTxt) bioTxt.textContent = profile.bio || '';
  if (avatarImg && profile.avatar) avatarImg.src = profile.avatar;

  renderStoreSocialIcons(profile.insta, profile.yt, profile.tw);

  // 3. Setup form inputs
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

  // 4. Brand Identity Tab (Store Settings)
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
  if (csPrevName) csPrevName.textContent = profile.name || 'RudRa RR';
  if (csPrevAvatar && profile.avatar) csPrevAvatar.src = profile.avatar;

  // 5. Mobile / Phone Previews
  const dspName = document.getElementById('dsp-name-el');
  const dspBio = document.getElementById('dsp-bio-el');
  const dspAvatar = document.getElementById('dsp-avatar-el');

  if (dspName) dspName.textContent = profile.name || 'RudRa RR';
  if (dspBio) dspBio.textContent = profile.bio || '';
  if (dspAvatar && profile.avatar) dspAvatar.src = profile.avatar;

  // 6. Live Storefront Modal Preview
  const spmName = document.getElementById('spm-creator-name');
  const spmBio = document.getElementById('spm-creator-bio');
  const spmAvatar = document.getElementById('spm-avatar-img');

  if (spmName) spmName.textContent = profile.name || 'RudRa RR';
  if (spmBio) spmBio.textContent = profile.bio || '';
  if (spmAvatar && profile.avatar) spmAvatar.src = profile.avatar;

  // 7. Top Navbar / User Profile Header & Dropdown
  const userNameEl = document.querySelector('.user-name');
  const unifiedAvatar = document.getElementById('unified-avatar-el');
  const signoutName = document.getElementById('signout-modal-user-name');
  const signoutEmail = document.getElementById('signout-modal-user-email');

  if (userNameEl) userNameEl.textContent = profile.name || 'RudRa RR';
  if (signoutName) signoutName.textContent = profile.name || 'RudRa RR';
  if (signoutEmail) signoutEmail.textContent = profile.email || 'rudrateja08@gmail.com';
  if (unifiedAvatar && profile.avatar) unifiedAvatar.src = profile.avatar;

  if (typeof window.updateSidebarUserProfileUI === 'function') {
    window.updateSidebarUserProfileUI({ id: window.currentActiveUserId, profile: profile });
  }
};

window.syncStoreProfileLiveFromSetupInputs = function () {
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

  if (tabName === 'inbox') {
    const inboxContainer = document.getElementById('rr-inbox-container');
    if (inboxContainer) {
      inboxContainer.classList.remove('chat-active-mobile');
    }
  }
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
          <rect class="chart-hover-trigger" data-idx="${i}" data-label="${xLabels[i]}" data-reach="${reachPoints[i]}K" data-act="${activityPoints[i]}K" data-x="${x}" data-reach-y="${reachY[i]}" data-act-y="${actY[i]}" x="${x - (step || 20) / 2}" y="0" width="${step || 40}" height="145" fill="transparent" style="cursor: crosshair;"/>
        `).join('')}
      </svg>
    `;
  }

  // COMPREHENSIVE DATA FOR TIME RANGES (4-SECTION SAAS SYSTEM)
  let DASHBOARD_DATA = window.getActiveUserData().dashboard;

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
      const activeProf = (window.getActiveUserData && window.getActiveUserData().profile) || (window.storeProfileState || { initials: 'R', insta: '@render6457', name: 'RudRa RR' });
      const avatarInitial = activeProf.initials || (activeProf.name ? activeProf.name.charAt(0) : 'R');
      const handle = activeProf.insta || '@render6457';

      accountInfoContainer.innerHTML = `
        <div class="account-icon">${avatarInitial}</div>
        <div class="account-details">
          <span class="account-handle" id="dashboard-account-handle">${handle}</span>
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
    const activeProf = (window.getActiveUserData && window.getActiveUserData().profile) || (window.storeProfileState || { insta: '@render6457' });
    isConnected = false;
    updateConnectionUI();
    loadDashboardData(currentRange);
    showToast(`Disconnected account ${activeProf.insta || '@render6457'}`);
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

      if (targetTab === 'inbox') {
        const inboxContainer = document.getElementById('rr-inbox-container');
        if (inboxContainer) {
          inboxContainer.classList.remove('chat-active-mobile');
        }
      }

      if (targetTab === 'automation-rules') {
        setTimeout(() => {
          if (typeof window.updateRulesFilterArrows === 'function') {
            window.updateRulesFilterArrows();
          }
        }, 60);
      }

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
  let CAPTURED_LEADS_DATABASE = (window.getActiveUserData ? window.getActiveUserData().leads : []) || [];
  let currentLeadsCampaign = 'all';
  let currentLeadsStatus = 'all';
  let currentLeadsSearchQuery = '';

  window.getUserCampaignsMeta = function (userId) {
    const uid = (userId || window.currentActiveUserId || '').toLowerCase();
    if (uid.includes('sarah')) {
      return {
        total: "2,890",
        emails: "2,398",
        phones: "492",
        topKeyword: "#OUTFIT",
        topKeywordPct: "58%",
        topKeywordLeads: "1,670 Leads",
        topKeywordSub: "Fall Lookbook & Outfit Reel",
        descriptions: {
          all: "Showing All Reels & Posts Leads for Sarah Jenkins",
          outfit: "Showing leads for Fall Blazer & Linen Pants Styling Reel (Keyword: #OUTFIT)",
          lookbook: "Showing leads for Paris Fashion Week Capsule Moodboard (Keyword: LOOKBOOK)",
          preset: "Showing leads for Lightroom Aesthetic Preset Pack (Keyword: PRESET)",
          paris: "Showing leads for Paris Travel Style Guide (Keyword: PARIS)",
          style: "Showing leads for Daily Capsule Wardrobe Checklist (Keyword: STYLE)"
        },
        shortLabels: {
          all: "All Reels Selected",
          outfit: "Reel: #OUTFIT",
          lookbook: "Reel: LOOKBOOK",
          preset: "Carousel: PRESET",
          paris: "Story: PARIS",
          style: "Reel: STYLE"
        },
        reels: [
          { id: "all", title: "All Reels & Posts", kw: "ALL TRIGGERS", count: "2,890 leads", type: "all" },
          { id: "outfit", title: "Fall Blazer & Linen Pants Styling Reel", kw: "#OUTFIT", count: "1,670 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80" },
          { id: "lookbook", title: "Paris Fashion Week Capsule Moodboard", kw: "LOOKBOOK", count: "680 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=300&q=80" },
          { id: "preset", title: "Lightroom Aesthetic Preset Pack", kw: "PRESET", count: "340 leads", type: "Carousel", thumb: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80" },
          { id: "paris", title: "Paris Travel Style Guide & Hotel Links", kw: "PARIS", count: "120 leads", type: "Story", thumb: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80" },
          { id: "style", title: "Daily Capsule Wardrobe Checklist", kw: "STYLE", count: "80 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80" }
        ]
      };
    } else if (uid.includes('alex')) {
      return {
        total: "1,420",
        emails: "1,178",
        phones: "242",
        topKeyword: "#WORKOUT",
        topKeywordPct: "62%",
        topKeywordLeads: "880 Leads",
        topKeywordSub: "Fat Loss & Hypertrophy Reel",
        descriptions: {
          all: "Showing All Reels & Posts Leads for Alex Rivera",
          workout: "Showing leads for 6-Week Hypertrophy Transformation (Keyword: #WORKOUT)",
          diet: "Showing leads for Custom Macro & Nutrition Guide (Keyword: DIET)",
          coach: "Showing leads for 1-on-1 VIP Fitness Coaching Audit (Keyword: COACH)",
          mealplan: "Showing leads for High-Protein Weekly Meal Prep (Keyword: MEALPLAN)",
          vip: "Showing leads for Private Athletes Mentorship (Keyword: VIP)"
        },
        shortLabels: {
          all: "All Reels Selected",
          workout: "Reel: #WORKOUT",
          diet: "Reel: DIET",
          coach: "Carousel: COACH",
          mealplan: "Story: MEALPLAN",
          vip: "Reel: VIP"
        },
        reels: [
          { id: "all", title: "All Reels & Posts", kw: "ALL TRIGGERS", count: "1,420 leads", type: "all" },
          { id: "workout", title: "6-Week Hypertrophy Transformation", kw: "#WORKOUT", count: "880 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80" },
          { id: "diet", title: "Custom Macro & Nutrition Guide", kw: "DIET", count: "310 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=300&q=80" },
          { id: "coach", title: "1-on-1 VIP Fitness Coaching Audit", kw: "COACH", count: "140 leads", type: "Carousel", thumb: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80" },
          { id: "mealplan", title: "High-Protein Weekly Meal Prep PDF", kw: "MEALPLAN", count: "60 leads", type: "Story", thumb: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80" },
          { id: "vip", title: "Private Athletes Mentorship Access", kw: "VIP", count: "30 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=300&q=80" }
        ]
      };
    } else if (uid.includes('agency')) {
      return {
        total: "14,850",
        emails: "12,325",
        phones: "2,525",
        topKeyword: "#AUDIT",
        topKeywordPct: "64%",
        topKeywordLeads: "9,500 Leads",
        topKeywordSub: "Enterprise Instagram Audit",
        descriptions: {
          all: "Showing All Reels & Posts Leads for RenderReply Agency Pro",
          audit: "Showing leads for Enterprise Instagram Growth & DM Audit (Keyword: #AUDIT)",
          scale: "Showing leads for 7-Figure Agency Automation Framework (Keyword: SCALE)",
          bot: "Showing leads for High-Volume AI Bot Setup (Keyword: BOT)",
          demo: "Showing leads for White-Label Client Portal Live Demo (Keyword: DEMO)",
          pro: "Showing leads for Agency Reseller Tier Package (Keyword: PRO)"
        },
        shortLabels: {
          all: "All Reels Selected",
          audit: "Reel: #AUDIT",
          scale: "Reel: SCALE",
          bot: "Carousel: BOT",
          demo: "Story: DEMO",
          pro: "Reel: PRO"
        },
        reels: [
          { id: "all", title: "All Reels & Posts", kw: "ALL TRIGGERS", count: "14,850 leads", type: "all" },
          { id: "audit", title: "Enterprise Instagram Growth & DM Audit", kw: "#AUDIT", count: "9,500 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80" },
          { id: "scale", title: "7-Figure Agency Automation Framework", kw: "SCALE", count: "3,200 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80" },
          { id: "bot", title: "High-Volume AI Bot Setup for Multi-Brands", kw: "BOT", count: "1,400 leads", type: "Carousel", thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80" },
          { id: "demo", title: "White-Label Client Portal Live Demo", kw: "DEMO", count: "550 leads", type: "Story", thumb: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80" },
          { id: "pro", title: "Agency Reseller Tier Package", kw: "PRO", count: "200 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80" }
        ]
      };
    } else {
      return {
        total: "342",
        emails: "284",
        phones: "58",
        topKeyword: "#GUIDE",
        topKeywordPct: "51%",
        topKeywordLeads: "176 Leads",
        topKeywordSub: "10x IG Automation Reel",
        descriptions: {
          all: "Showing All Reels & Posts Leads for RudRa RR",
          guide: "Showing leads for 10x Instagram Automation Strategy (Keyword: #GUIDE)",
          pricing: "Showing leads for How I Make ₹50K/mo Selling Digital (Keyword: PRICING)",
          roadmap: "Showing leads for Free Java Roadmap 2026 PDF (Keyword: ROADMAP)",
          story: "Showing leads for Story Automation Blueprint (Keyword: LINK)",
          free: "Showing leads for Free Resource Pack Download (Keyword: FREE)"
        },
        shortLabels: {
          all: "All Reels Selected",
          guide: "Reel: #GUIDE",
          pricing: "Reel: PRICING",
          roadmap: "Carousel: ROADMAP",
          story: "Story: LINK",
          free: "Reel: FREE"
        },
        reels: [
          { id: "all", title: "All Reels & Posts", kw: "ALL TRIGGERS", count: "342 leads", type: "all" },
          { id: "guide", title: "10x Instagram Automation Strategy", kw: "#GUIDE", count: "176 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80" },
          { id: "pricing", "title": "How I Make ₹50K/mo Selling Digital", kw: "PRICING", count: "84 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
          { id: "roadmap", "title": "Free Java Roadmap 2026 PDF", kw: "ROADMAP", count: "52 leads", type: "Carousel", thumb: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80" },
          { id: "story", "title": "Story Automation Blueprint", kw: "LINK", count: "20 leads", type: "Story", thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80" },
          { id: "free", "title": "Free Resource Pack Download", kw: "FREE", count: "10 leads", type: "Reel", thumb: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80" }
        ]
      };
    }
  };

  function updateCapturedLeadsHeaderStats(meta) {
    if (!meta) meta = window.getUserCampaignsMeta();
    const countBadge = document.getElementById('leads-live-count-badge');
    const statTotal = document.getElementById('leads-stat-total');
    const statEmails = document.getElementById('leads-stat-emails');
    const statPhones = document.getElementById('leads-stat-phones');
    const topTrend = document.getElementById('leads-top-kw-trend');
    const topVal = document.getElementById('leads-top-kw-val');
    const topSub = document.getElementById('leads-top-kw-sub');

    if (countBadge) countBadge.textContent = meta.total;
    if (statTotal) statTotal.textContent = meta.total;
    if (statEmails) statEmails.textContent = meta.emails;
    if (statPhones) statPhones.textContent = meta.phones;
    if (topTrend) topTrend.textContent = `${meta.topKeyword} (${meta.topKeywordPct})`;
    if (topVal) topVal.textContent = meta.topKeywordLeads;
    if (topSub) topSub.textContent = meta.topKeywordSub;
  }

  function renderLeadsCampaignCards(meta) {
    if (!meta) meta = window.getUserCampaignsMeta();
    const grid = document.getElementById('leads-reels-cards-grid');
    if (!grid) return;

    grid.innerHTML = meta.reels.map(reel => {
      if (reel.type === 'all') {
        return `
          <div class="leads-reel-card all-content-btn ${currentLeadsCampaign === 'all' ? 'active' : ''}" data-campaign="all" title="View all reels leads">
            <div class="leads-btn-icon-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="4"/>
                <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>
              </svg>
            </div>
            <h4 class="leads-reel-title">${reel.title}</h4>
            <div class="leads-reel-stats">
              <span class="leads-reel-kw">${reel.kw}</span>
              <span class="leads-reel-count">${reel.count}</span>
            </div>
          </div>
        `;
      }
      return `
        <div class="leads-reel-card ${currentLeadsCampaign === reel.id ? 'active' : ''}" data-campaign="${reel.id}" title="Click to view leads from this campaign">
          <div class="leads-reel-thumb-wrap">
            <img src="${reel.thumb}" alt="${reel.title}" class="leads-reel-img">
            ${reel.type === 'Reel' ? '<div class="leads-reel-play-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>' : ''}
            <span class="leads-reel-type-badge">${reel.type}</span>
          </div>
          <div class="leads-reel-info">
            <h4 class="leads-reel-title">${reel.title}</h4>
            <div class="leads-reel-stats">
              <span class="leads-reel-kw">${reel.kw}</span>
              <span class="leads-reel-count">${reel.count}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Reattach click listeners on dynamic reel cards
    grid.querySelectorAll('.leads-reel-card').forEach(card => {
      card.addEventListener('click', () => {
        const camp = card.getAttribute('data-campaign') || 'all';
        if (typeof window.selectLeadsCampaign === 'function') {
          window.selectLeadsCampaign(camp, true);
        }
      });
    });
  }

  function renderDashboardRecentLeadsTable() {
    const tbody = document.getElementById('dash-recent-leads-body');
    if (!tbody) return;
    const leads = (window.getActiveUserData ? window.getActiveUserData().leads : []) || [];
    if (leads.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #71717a; padding: 24px;">No recent leads captured yet.</td></tr>`;
      return;
    }
    tbody.innerHTML = leads.slice(0, 5).map((lead) => `
      <tr class="clickable-table-row" data-db-lead-id="${lead.id}" title="Click to inspect lead details & DM conversation">
        <td>
          <div class="lead-user-cell">
            <div class="lead-user-avatar" style="font-weight: 800; font-size: 11px;">${lead.avatar}</div>
            <div class="lead-cell-meta">
              <span class="lead-handle">${lead.handle}</span>
              <span class="lead-name">${lead.name}</span>
            </div>
          </div>
        </td>
        <td class="cell-align-center"><span class="kw-tag">${lead.keyword}</span></td>
        <td class="cell-align-center">
          <span class="lead-status-pill ${lead.statusClass}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align: -1px; margin-right: 3px;"><polyline points="20 6 9 17 4 12"/></svg>
            ${lead.status}
          </span>
        </td>
        <td class="cell-align-right time-text">${lead.time}</td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.clickable-table-row').forEach((row) => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-db-lead-id');
        const activeLeads = (window.getActiveUserData ? window.getActiveUserData().leads : []) || [];
        const found = activeLeads.find(l => l.id === id);
        if (found && typeof inspectCustomLead === 'function') {
          inspectCustomLead(found);
        }
      });
    });
  }

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

  window.selectLeadsCampaign = function (campKey, isTriggeredFromReel = false) {
    currentLeadsCampaign = campKey || 'all';
    const meta = window.getUserCampaignsMeta();

    const reelCards = document.querySelectorAll('#leads-reels-cards-grid .leads-reel-card');
    reelCards.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-campaign') === currentLeadsCampaign);
    });

    const descPill = document.getElementById('leads-active-filter-desc');
    const currentReelLabel = document.getElementById('leads-current-reel-label');
    if (descPill) {
      descPill.textContent = (meta.descriptions && meta.descriptions[currentLeadsCampaign]) || 'Filtered Leads';
    }
    if (currentReelLabel) {
      currentReelLabel.textContent = (meta.shortLabels && meta.shortLabels[currentLeadsCampaign]) || 'Selected Reel';
    }

    skeletonizeCapturedLeads(() => {
      renderCapturedLeadsTable();
    }, 200);

    if (isTriggeredFromReel) {
      showToast(`Filter: ${(meta.descriptions && meta.descriptions[currentLeadsCampaign]) || currentLeadsCampaign}`);
    }
  };

  function initCapturedLeadsTabControls() {
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
          window.syncLeadsForActiveUser();
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
    window.syncLeadsForActiveUser();
  }

  window.renderDashboardRecentLeadsTable = renderDashboardRecentLeadsTable;
  window.renderCapturedLeadsTable = renderCapturedLeadsTable;
  window.updateCapturedLeadsHeaderStats = updateCapturedLeadsHeaderStats;
  window.renderLeadsCampaignCards = renderLeadsCampaignCards;

  window.syncLeadsForActiveUser = function () {
    try {
      CAPTURED_LEADS_DATABASE = (window.getActiveUserData ? window.getActiveUserData().leads : []) || [];
      currentLeadsCampaign = 'all';
      currentLeadsStatus = 'all';
      currentLeadsSearchQuery = '';

      const searchInput = document.getElementById('input-search-leads-tab');
      if (searchInput) searchInput.value = '';

      const statusBtns = document.querySelectorAll('#leads-status-filter-buttons button');
      statusBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-status-filter') === 'all');
      });

      const meta = window.getUserCampaignsMeta();
      updateCapturedLeadsHeaderStats(meta);
      renderLeadsCampaignCards(meta);
      renderCapturedLeadsTable();
      renderDashboardRecentLeadsTable();

      const descPill = document.getElementById('leads-active-filter-desc');
      const currentReelLabel = document.getElementById('leads-current-reel-label');
      if (descPill) descPill.textContent = (meta.descriptions && meta.descriptions['all']) || 'This is All Reels Leads';
      if (currentReelLabel) currentReelLabel.textContent = (meta.shortLabels && meta.shortLabels['all']) || 'All Reels Selected';
    } catch (err) {
      console.error('Leads sync error:', err);
    }
  };

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

  let automationRulesState = window.getActiveUserData().rules;

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
  let inboxThreadsData = window.getActiveUserData().inbox;
  let activeThreadId = Object.keys(inboxThreadsData)[0] || 'alex';

  function renderInboxThreadsList(selectedId) {
    const listContainer = document.getElementById('rr-threads-list');
    if (!listContainer) return;

    const threadKeys = Object.keys(inboxThreadsData);
    if (threadKeys.length === 0) {
      listContainer.innerHTML = '<div style="padding: 24px; text-align: center; color: #94a3b8; font-size: 13px;">No conversations found</div>';
      return;
    }

    const currentId = selectedId || activeThreadId || threadKeys[0];
    activeThreadId = currentId;

    listContainer.innerHTML = threadKeys.map(k => {
      const t = inboxThreadsData[k];
      const isActive = k === currentId;
      const lastMsg = t.messages ? t.messages[t.messages.length - 1] : null;
      const snippet = lastMsg ? lastMsg.text : (t.source || '');
      const timeStr = lastMsg ? (lastMsg.time || 'Today') : 'Today';
      const badgeClass = t.status === 'attention' ? 'action' : (t.status === 'bot' ? 'bot' : 'resolved');
      const badgeText = t.status === 'attention' ? 'Needs Action' : (t.status === 'bot' ? 'Bot Active' : 'Resolved');

      return `
        <div class="rr-clean-thread-item ${isActive ? 'active' : ''}" data-thread-id="${k}" data-status="${t.status}">
          <div class="rr-t-avatar-box">
            <img src="${t.avatar}" alt="${t.name}" class="rr-t-avatar-img">
            <span class="rr-t-ig-icon" title="Instagram Direct">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </span>
          </div>
          <div class="rr-t-details">
            <div class="rr-t-header-row">
              <div class="rr-t-title-group">
                <span class="rr-t-user-name">${t.name}</span>
                <span class="rr-t-user-handle">${t.handle}</span>
              </div>
              <span class="rr-t-timestamp">${timeStr}</span>
            </div>
            <div class="rr-t-snippet">${snippet}</div>
            <div class="rr-t-tags-row">
              <span class="rr-pill-trigger">${t.source || 'Direct DM'}</span>
              <span class="rr-pill-badge ${badgeClass}">${badgeText}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    listContainer.querySelectorAll('.rr-clean-thread-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-thread-id');
        if (id) selectInboxThread(id, true);
      });
    });
  }

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

  function selectInboxThread(threadId, isUserClick = false) {
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

    // On Mobile: enter chat view only when clicked by user
    if (isUserClick) {
      const inboxContainer = document.getElementById('rr-inbox-container');
      if (inboxContainer) {
        inboxContainer.classList.add('chat-active-mobile');
      }
    }
  }

  // Setup Thread Click Handlers
  document.querySelectorAll('.rr-clean-thread-item').forEach(item => {
    item.addEventListener('click', () => {
      const threadId = item.getAttribute('data-thread-id');
      if (threadId) selectInboxThread(threadId, true);
    });
  });

  // Mobile Back Button to Thread List
  const btnInboxMobileBack = document.getElementById('btn-inbox-mobile-back');
  if (btnInboxMobileBack) {
    btnInboxMobileBack.addEventListener('click', () => {
      const inboxContainer = document.getElementById('rr-inbox-container');
      if (inboxContainer) {
        inboxContainer.classList.remove('chat-active-mobile');
      }
    });
  }

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
  let storeProducts = window.getActiveUserData().store;

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
        row.className = 'dsp-prod-row cs-phone-prod-item';
        row.dataset.prodId = prod.id;
        const isFree = prod.price === 'FREE' || prod.price === '$0.00' || prod.price === '0';
        const photo = (prod.photos && prod.photos[0]) ? prod.photos[0] : '';
        const fallbackBg = colors[index % colors.length];

        row.innerHTML = `
          ${photo ? `<div class="cs-phone-prod-img dsp-prod-img"><img src="${photo}" alt="${prod.title}"></div>` : `<div class="cs-phone-prod-img dsp-prod-img" style="background:${fallbackBg};"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>`}
          <div class="cs-phone-prod-info dsp-prod-info">
            <span class="cs-phone-prod-name dsp-prod-name">${prod.title}</span>
          </div>
          <span class="cs-phone-prod-price dsp-prod-price ${isFree ? 'cs-phone-prod-free-badge free' : ''}">${prod.price}</span>
        `;
        dspList.appendChild(row);
      });
      if (typeof window.reapplyLiveStoreStyles === 'function') {
        window.reapplyLiveStoreStyles();
      }
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
      if (typeof window.reapplyLiveStoreStyles === 'function') {
        window.reapplyLiveStoreStyles();
      }
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

  // RULES FILTER ARROW BUTTONS LOGIC
  function initRulesFilterArrowButtons() {
    const strip = document.getElementById('rules-filter-tabs');
    const leftBtn = document.getElementById('btn-rules-scroll-left');
    const rightBtn = document.getElementById('btn-rules-scroll-right');
    if (!strip) return;

    function updateArrows() {
      if (!strip) return;
      if (strip.clientWidth === 0) {
        if (rightBtn) rightBtn.classList.remove('visible');
        if (leftBtn) leftBtn.classList.remove('visible');
        return;
      }
      const maxScroll = strip.scrollWidth - strip.clientWidth;
      if (maxScroll <= 4) {
        if (leftBtn) leftBtn.classList.remove('visible');
        if (rightBtn) rightBtn.classList.remove('visible');
        return;
      }
      if (leftBtn) {
        if (strip.scrollLeft > 10) {
          leftBtn.classList.add('visible');
        } else {
          leftBtn.classList.remove('visible');
        }
      }
      if (rightBtn) {
        if (strip.scrollLeft < maxScroll - 10) {
          rightBtn.classList.add('visible');
        } else {
          rightBtn.classList.remove('visible');
        }
      }
    }
    window.updateRulesFilterArrows = updateArrows;

    if (leftBtn) {
      leftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        strip.scrollBy({ left: -140, behavior: 'smooth' });
        setTimeout(updateArrows, 300);
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        strip.scrollBy({ left: 140, behavior: 'smooth' });
        setTimeout(updateArrows, 300);
      });
    }

    strip.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    setTimeout(updateArrows, 200);
  }

  // STORE SUB-NAV TAB SWITCHER FUNCTION
  window.switchStoreTab = function (tabName, clickedBtn) {
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
  initRulesFilterArrowButtons();

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

  // EXPORT ACTIVE USER SYNC HOOKS FOR APP ENGINE
  window.syncDashboardForActiveUser = function () {
    try {
      DASHBOARD_DATA = window.getActiveUserData().dashboard;
      loadDashboardData(currentRange);
      updateConnectionUI();
      if (typeof window.renderDashboardRecentLeadsTable === 'function') {
        window.renderDashboardRecentLeadsTable();
      }
    } catch (err) { console.error('Dashboard sync error:', err); }
  };

  window.syncRulesForActiveUser = function () {
    try {
      automationRulesState = window.getActiveUserData().rules;
      renderAutomationRules();
      updateAutomationKPIs();
    } catch (err) { console.error('Rules sync error:', err); }
  };

  window.syncInboxForActiveUser = function () {
    try {
      inboxThreadsData = window.getActiveUserData().inbox;
      const firstId = Object.keys(inboxThreadsData)[0] || 'alex';
      renderInboxThreadsList(firstId);
      applyActiveFolderFilter();
      updateInboxFolderCounts();
      selectInboxThread(firstId);
    } catch (err) { console.error('Inbox sync error:', err); }
  };

  window.syncStoreProductsForActiveUser = function () {
    try {
      storeProducts = window.getActiveUserData().store;
      renderStoreProductsAndSyncPreview();
    } catch (err) { console.error('Store sync error:', err); }
  };

  // INITIALIZE ACCOUNT SETTINGS ENGINE & AUTO-SAVE
  initAccountSettingsInteractions();
}

function initAccountSettingsInteractions() {
  // 1. Live Profile Inputs & Auto-Save
  const fName = document.getElementById('acc-settings-fullname');
  const fEmail = document.getElementById('acc-settings-email');
  const statusNote = document.getElementById('settings-autosave-text');

  function flashAutoSaveStatus(msg) {
    if (!statusNote) return;
    statusNote.textContent = msg || 'Profile changes auto-saved!';
    statusNote.style.color = '#10b981';
    statusNote.style.fontWeight = '700';
    clearTimeout(statusNote._timer);
    statusNote._timer = setTimeout(() => {
      if (statusNote) {
        statusNote.textContent = 'Profile changes auto-save active';
        statusNote.style.fontWeight = '600';
      }
    }, 2500);
  }

  if (fName) {
    fName.addEventListener('input', (e) => {
      const active = (window.getActiveUserData ? window.getActiveUserData() : null) || {};
      if (active && active.profile) {
        active.profile.name = e.target.value;
        if (typeof window.updateSidebarUserProfileUI === 'function') {
          window.updateSidebarUserProfileUI(active);
        }
        const spmName = document.getElementById('spm-creator-name');
        if (spmName) spmName.textContent = e.target.value;
        flashAutoSaveStatus(`Profile name saved as "${e.target.value}"`);
      }
    });
  }

  if (fEmail) {
    fEmail.addEventListener('input', (e) => {
      const active = (window.getActiveUserData ? window.getActiveUserData() : null) || {};
      if (active && active.profile) {
        active.profile.email = e.target.value;
        const uppEmail = document.getElementById('upp-user-email');
        if (uppEmail) uppEmail.textContent = e.target.value;
        flashAutoSaveStatus(`Email address updated to "${e.target.value}"`);
      }
    });
  }

  // 2. Copy User UID Button
  const btnCopyUid = document.getElementById('btn-copy-user-uid');
  if (btnCopyUid) {
    btnCopyUid.addEventListener('click', () => {
      const uidInput = document.getElementById('acc-settings-uid');
      const val = uidInput ? uidInput.value : 'R3MT1DqCnWYuysMej8IZAw31v583';
      navigator.clipboard.writeText(val).then(() => {
        btnCopyUid.textContent = 'Copied!';
        btnCopyUid.style.background = '#10b981';
        btnCopyUid.style.color = '#ffffff';
        if (typeof showToast === 'function') showToast(`Copied User UID: ${val}`);
        setTimeout(() => {
          btnCopyUid.textContent = 'Copy';
          btnCopyUid.style.background = '';
          btnCopyUid.style.color = '';
        }, 2000);
      }).catch(() => {
        if (typeof showToast === 'function') showToast(`User UID: ${val}`);
      });
    });
  }

  // 3. API Key & Webhook Copy Buttons
  const btnCopyApiKey = document.getElementById('btn-copy-api-key');
  const btnToggleApiKey = document.getElementById('btn-toggle-api-key');
  const inputApiKey = document.getElementById('acc-settings-api-key');

  if (btnCopyApiKey && inputApiKey) {
    btnCopyApiKey.addEventListener('click', () => {
      navigator.clipboard.writeText(inputApiKey.value).then(() => {
        btnCopyApiKey.textContent = 'Copied!';
        if (typeof showToast === 'function') showToast('Copied Live API Secret Key!');
        setTimeout(() => { btnCopyApiKey.textContent = 'Copy Key'; }, 2000);
      });
    });
  }

  if (btnToggleApiKey && inputApiKey) {
    btnToggleApiKey.addEventListener('click', () => {
      if (inputApiKey.type === 'password') {
        inputApiKey.type = 'text';
        btnToggleApiKey.textContent = 'Hide';
      } else {
        inputApiKey.type = 'password';
        btnToggleApiKey.textContent = 'Show';
      }
    });
  }

  const btnCopyWebhook = document.getElementById('btn-copy-webhook-url');
  const inputWebhook = document.getElementById('acc-settings-webhook-url');
  if (btnCopyWebhook && inputWebhook) {
    btnCopyWebhook.addEventListener('click', () => {
      navigator.clipboard.writeText(inputWebhook.value).then(() => {
        btnCopyWebhook.textContent = 'Copied!';
        if (typeof showToast === 'function') showToast('Copied Instagram Webhook URL endpoint!');
        setTimeout(() => { btnCopyWebhook.textContent = 'Copy URL'; }, 2000);
      });
    });
  }

  // 4. Action Buttons
  const btnChangePlan = document.getElementById('btn-settings-change-plan');
  if (btnChangePlan) {
    btnChangePlan.addEventListener('click', () => {
      if (typeof showToast === 'function') {
        showToast('Your subscription plan is currently Active. Custom upgrades available via billing support.');
      }
    });
  }

  const btnDownloadInvoice = document.getElementById('btn-settings-download-invoice');
  if (btnDownloadInvoice) {
    btnDownloadInvoice.addEventListener('click', () => {
      const active = window.getActiveUserData ? window.getActiveUserData() : {};
      const name = (active && active.profile && active.profile.name) || 'User';
      const csv = `"Invoice ID","Date","Workspace","Amount","Status"\n"INV-2026-8942","Oct 24, 2026","${name}","₹1,499","Paid & Active"`;
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RenderReply_Subscription_Invoice.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (typeof showToast === 'function') showToast('Downloaded recent subscription invoice statement.');
    });
  }

  const btnRefreshToken = document.getElementById('btn-settings-refresh-token');
  if (btnRefreshToken) {
    btnRefreshToken.addEventListener('click', () => {
      btnRefreshToken.textContent = 'Refreshing...';
      setTimeout(() => {
        btnRefreshToken.textContent = 'Refresh Token';
        if (typeof showToast === 'function') {
          showToast('Instagram Meta Graph API Token refreshed & valid for 60 days!');
        }
      }, 500);
    });
  }

  const btnTestWebhook = document.getElementById('btn-settings-test-webhook');
  if (btnTestWebhook) {
    btnTestWebhook.addEventListener('click', () => {
      btnTestWebhook.textContent = 'Pinging...';
      setTimeout(() => {
        btnTestWebhook.textContent = 'Test Webhook';
        if (typeof showToast === 'function') {
          showToast('Webhook test ping successful! Delivered in 42ms (HTTP 200 OK).');
        }
      }, 400);
    });
  }

  // 5. Preferences Toggles
  ['chk-pref-lead-alerts', 'chk-pref-spam-shield', 'chk-pref-auto-like'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        if (typeof showToast === 'function') {
          showToast(`Preference updated: ${el.checked ? 'Enabled' : 'Disabled'}`);
        }
      });
    }
  });

  // Initial populate
  if (typeof window.syncSettingsForActiveUser === 'function') {
    window.syncSettingsForActiveUser();
  }
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
      a.download = `RenderReply_Transactions_${new Date().toISOString().slice(0, 10)}.csv`;
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

  window.syncPaymentsForActiveUser = function () {
    try {
      window.paymentState = window.getActiveUserData().payments;
      updateBalancesUI();
      updatePayoutsUI();
      updateTxnView();
    } catch (err) { console.error('Payments sync error:', err); }
  };
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
          const bgUrl = `url('${evt.target.result}') center / cover no-repeat`;
          window.currentStoreBannerBg = bgUrl;
          if (bannerPreviewGraphic) bannerPreviewGraphic.style.background = bgUrl;
          document.querySelectorAll('.cs-phone-hero, .dsp-hero, #spm-hero-banner').forEach(el => {
            el.style.background = bgUrl;
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
            el.style.backgroundRepeat = 'no-repeat';
          });
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
      if (bg) {
        window.currentStoreBannerBg = bg;
        document.querySelectorAll('.cs-phone-hero, .dsp-hero, #spm-hero-banner').forEach(el => {
          el.style.background = bg;
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
        });
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

  function updateAllProductCardBg(val) {
    if (!val) return;
    window.currentCustomProdBg = val;
    document.querySelectorAll('.cs-phone-prod-item, .dsp-prod-row, .spm-prod-card').forEach(item => {
      item.style.background = val;
    });
  }

  function updateAllProductPriceColor(val) {
    if (!val) return;
    document.querySelectorAll('.cs-phone-prod-price, .dsp-prod-price, .spm-prod-price').forEach(item => {
      if (!item.classList.contains('free')) item.style.color = val;
    });
  }

  function updateAllProductTitleColor(val) {
    if (!val) return;
    document.querySelectorAll('.cs-phone-prod-name, .dsp-prod-name, .spm-prod-title').forEach(item => {
      item.style.color = val;
    });
  }

  if (pickerProdBg) {
    pickerProdBg.addEventListener('input', () => {
      const val = pickerProdBg.value;
      if (txtProdBg) txtProdBg.value = val;
      updateAllProductCardBg(val);
    });
  }
  if (txtProdBg) {
    txtProdBg.addEventListener('input', () => {
      const val = txtProdBg.value;
      if (pickerProdBg && val.startsWith('#') && (val.length === 4 || val.length === 7)) {
        pickerProdBg.value = val;
      }
      updateAllProductCardBg(val);
    });
  }

  if (pickerProdPrice) {
    pickerProdPrice.addEventListener('input', () => {
      const val = pickerProdPrice.value;
      if (txtProdPrice) txtProdPrice.value = val;
      updateAllProductPriceColor(val);
    });
  }
  if (txtProdPrice) {
    txtProdPrice.addEventListener('input', () => {
      const val = txtProdPrice.value;
      if (pickerProdPrice && val.startsWith('#') && (val.length === 4 || val.length === 7)) {
        pickerProdPrice.value = val;
      }
      updateAllProductPriceColor(val);
    });
  }

  if (pickerProdTitle) {
    pickerProdTitle.addEventListener('input', () => {
      const val = pickerProdTitle.value;
      if (txtProdTitle) txtProdTitle.value = val;
      updateAllProductTitleColor(val);
    });
  }
  if (txtProdTitle) {
    txtProdTitle.addEventListener('input', () => {
      const val = txtProdTitle.value;
      if (pickerProdTitle && val.startsWith('#') && (val.length === 4 || val.length === 7)) {
        pickerProdTitle.value = val;
      }
      updateAllProductTitleColor(val);
    });
  }

  if (selectProdShadow) {
    selectProdShadow.addEventListener('change', () => {
      const shadow = selectProdShadow.value;
      document.querySelectorAll('.cs-phone-prod-item, .dsp-prod-row, .spm-prod-card').forEach(item => {
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
    let bannerBg = window.currentStoreBannerBg;
    if (!bannerBg) {
      const customBannerGraphic = document.getElementById('cs-banner-preview-graphic');
      bannerBg = customBannerGraphic?.style?.background;
    }
    if (!bannerBg || bannerBg === 'none' || bannerBg === '') {
      const activeBannerSwatch = document.querySelector('.cs-banner-swatch.active');
      if (activeBannerSwatch) {
        const bannerKey = activeBannerSwatch.getAttribute('data-banner');
        bannerBg = bannerPresetMap[bannerKey] || activeBannerSwatch.style.background;
      }
    }

    if (bannerBg) {
      document.querySelectorAll('.cs-phone-hero, .dsp-hero, #spm-hero-banner').forEach(el => {
        el.style.background = bannerBg;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      });
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
    const activeColorSwatch = document.querySelector('.cs-color-swatch.active, .qc-swatch.active');
    const accentCol = activeColorSwatch?.getAttribute('data-color') || activeColorSwatch?.getAttribute('data-qc-color') || document.getElementById('cs-custom-color-picker')?.value || '#4f46e5';
    if (accentCol) {
      const spmBadge = document.getElementById('spm-verified-badge');
      if (spmBadge) spmBadge.style.background = accentCol;
      document.querySelectorAll('.spm-btn-buy').forEach(btn => {
        btn.style.background = `linear-gradient(135deg, ${accentCol}, #6366f1)`;
      });
    }

    if (window.reapplyLiveStoreStyles) {
      window.reapplyLiveStoreStyles();
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

  window.syncBioLinkForActiveUser = function () {
    try {
      const u = window.getActiveUserData();
      if (u && u.biolink) {
        Object.assign(bioState, u.biolink);
        if (inputTitle) inputTitle.value = bioState.title || '';
        if (inputBio) inputBio.value = bioState.bio || '';
        updateTitleAndBio();
        renderLinks();
        renderVideos();
      }
    } catch (err) { console.error('Bio link sync error:', err); }
  };
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
  if (typeof window.syncLeadsForActiveUser === 'function') {
    window.syncLeadsForActiveUser();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCapturedLeadsPage);
} else {
  initCapturedLeadsPage();
}

/* ==========================================================================
   USER PROFILE POPUP & ACCOUNT MODALS ENGINE
   ========================================================================== */
function initUserProfileDropdownAndModals() {
  const profileTrigger = document.getElementById('sidebar-user-profile-btn');
  const profilePopup = document.getElementById('user-profile-popup');
  const mobileAvatar = document.querySelector('.mobile-top-bar .user-avatar');

  // Account State Management
  window.userAccountState = {
    current: {
      id: 'acc-primary',
      name: 'RudRa RR',
      email: 'rudrateja08@gmail.com',
      avatar: 'R',
      insta: '@render6457'
    },
    accounts: [
      { id: 'acc-primary', name: 'RudRa RR', email: 'rudrateja08@gmail.com', avatar: 'R', insta: '@render6457', active: true },
      { id: 'acc-creator', name: 'Rudra Teja (Creator Hub)', email: 'rudra.creations@gmail.com', avatar: 'RT', insta: '@rudrateja', active: false },
      { id: 'acc-agency', name: 'RenderReply Agency Pro', email: 'agency@renderreply.com', avatar: 'RA', insta: '@renderagency', active: false }
    ]
  };

  // Initialize UI immediately
  if (typeof window.updateSidebarUserProfileUI === 'function') {
    window.updateSidebarUserProfileUI();
  }

  // 1. Toggle Popup Functions (delegate to global controller)
  function toggleProfilePopup(e) {
    if (typeof window.toggleUserProfilePopup === 'function') {
      window.toggleUserProfilePopup(e);
    }
  }

  function openProfilePopup() {
    if (typeof window.openUserProfilePopup === 'function') {
      window.openUserProfilePopup();
    }
  }

  function closeProfilePopup() {
    if (typeof window.closeUserProfilePopup === 'function') {
      window.closeUserProfilePopup();
    }
  }

  if (profileTrigger) {
    profileTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleProfilePopup(e);
      }
    });
  }

  if (mobileAvatar) {
    mobileAvatar.addEventListener('click', toggleProfilePopup);
  }

  // Close Popup on Click Outside
  document.addEventListener('click', (e) => {
    if (profilePopup && profilePopup.classList.contains('active')) {
      if (!profilePopup.contains(e.target) && (!profileTrigger || !profileTrigger.contains(e.target))) {
        closeProfilePopup();
      }
    }
  });

  // Close Popup on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProfilePopup();
      closeModal('modal-switch-account');
      closeModal('modal-user-settings');
      closeModal('modal-user-support');
      closeModal('modal-user-signout');
    }
  });

  // Helper Modal Functions
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      modal.style.pointerEvents = 'auto';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';
    }
  }

  // 2. Switch Account Item Click
  const btnSwitchAccount = document.getElementById('upp-item-switch-account');
  const btnCloseSwitch = document.getElementById('btn-close-switch-modal');
  const btnDoneSwitch = document.getElementById('btn-done-switch-acc');
  const btnShowAddAcc = document.getElementById('btn-show-add-acc');
  const btnCancelAddAcc = document.getElementById('btn-cancel-add-acc');
  const btnOpenInstaLogin = document.getElementById('btn-open-insta-login');
  const addAccBox = document.getElementById('add-account-form-box');

  if (btnSwitchAccount) {
    btnSwitchAccount.addEventListener('click', (e) => {
      e.stopPropagation();
      closeProfilePopup();
      openModal('modal-switch-account');
    });
  }

  if (btnCloseSwitch) btnCloseSwitch.addEventListener('click', () => closeModal('modal-switch-account'));
  if (btnDoneSwitch) btnDoneSwitch.addEventListener('click', () => closeModal('modal-switch-account'));

  if (btnShowAddAcc && addAccBox) {
    btnShowAddAcc.addEventListener('click', () => {
      addAccBox.style.display = 'block';
      btnShowAddAcc.style.display = 'none';
    });
  }

  if (btnCancelAddAcc && addAccBox && btnShowAddAcc) {
    btnCancelAddAcc.addEventListener('click', () => {
      addAccBox.style.display = 'none';
      btnShowAddAcc.style.display = 'inline-flex';
    });
  }

  if (btnOpenInstaLogin) {
    btnOpenInstaLogin.addEventListener('click', () => {
      if (typeof window.openAccountModal === 'function') {
        window.openAccountModal('modal-instagram-auth');
      } else {
        openModal('modal-instagram-auth');
      }
      setTimeout(() => {
        const uInput = document.getElementById('insta-login-username');
        if (uInput) uInput.focus();
      }, 100);
    });
  }

  window.handleInstagramAuthSubmit = function () {
    const userInput = document.getElementById('insta-login-username');
    const passInput = document.getElementById('insta-login-password');
    const submitBtn = document.getElementById('btn-submit-insta-login');
    const btnText = document.getElementById('btn-insta-text');

    if (!userInput) return;
    let rawHandle = userInput.value.trim();
    if (!rawHandle) return;

    let cleanHandle = rawHandle.startsWith('@') ? rawHandle : '@' + rawHandle;
    let cleanName = rawHandle.replace('@', '').replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    if (!cleanName || cleanName.length < 2) cleanName = 'Instagram Creator';

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Connecting...';

    setTimeout(() => {
      const newAccId = 'acc-ig-' + Date.now();
      const newAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

      if (window.USER_ACCOUNTS_DATABASE) {
        window.USER_ACCOUNTS_DATABASE[newAccId] = {
          id: newAccId,
          profile: {
            name: cleanName,
            email: `${rawHandle.replace('@', '').toLowerCase()}@instagram.creator`,
            avatar: newAvatar,
            bio: `Official Instagram creator account for ${cleanHandle}. Automating DMs & Storefront.`,
            insta: cleanHandle,
            yt: `youtube.com/${rawHandle.replace('@', '')}`,
            tw: cleanHandle,
            initials: cleanName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
            badge: 'Instagram Creator',
            role: 'Creator'
          },
          dashboard: {
            '7 Days': { followers: '1.2K', following: '120', views: '8,400', comments: '340', totalReplies: '280', sentToday: '12', activeRulesFlat: '2', leadsFlat: '18' },
            '14 Days': { followers: '2.4K', following: '135', views: '15,600', comments: '680', totalReplies: '540', sentToday: '24', activeRulesFlat: '3', leadsFlat: '36' },
            '30 Days': { followers: '5.8K', following: '150', views: '32,400', comments: '1,420', totalReplies: '1,190', sentToday: '42', activeRulesFlat: '4', leadsFlat: '84' },
            '60 Days': { followers: '11.2K', following: '180', views: '64,000', comments: '2,900', totalReplies: '2,400', sentToday: '68', activeRulesFlat: '5', leadsFlat: '160' },
            '90 Days': { followers: '18.5K', following: '210', views: '98,000', comments: '4,500', totalReplies: '3,800', sentToday: '95', activeRulesFlat: '6', leadsFlat: '250' }
          },
          rules: [],
          leads: [],
          inbox: [],
          storeProducts: [],
          payments: { balance: 0, pending: 0, totalSales: 0, history: [] },
          biolink: { title: cleanName, bio: `Follow my content on Instagram ${cleanHandle}`, links: [], theme: 'modern-dark' }
        };
      }

      const container = document.getElementById('switch-accounts-container');
      if (container) {
        const newItem = document.createElement('div');
        newItem.className = 'switch-account-item';
        newItem.id = 'acc-card-' + newAccId;
        newItem.setAttribute('data-account-id', newAccId);
        newItem.setAttribute('onclick', `window.switchActiveUserAccount('${newAccId}')`);
        newItem.innerHTML = `
          <div class="acc-item-left">
            <div class="acc-avatar-wrapper">
              <img src="${newAvatar}" alt="${cleanName}" class="acc-avatar-img">
              <span class="acc-ig-badge" title="Instagram Connected">
                <svg viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </span>
            </div>
            <div class="acc-item-info">
              <div class="acc-name-row">
                <span class="acc-name-label">${cleanName}</span>
                <span class="acc-active-badge">ACTIVE</span>
              </div>
              <div class="acc-handle-row"><span class="acc-handle-highlight">${cleanHandle}</span></div>
            </div>
          </div>
          <div class="acc-check-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        `;
        container.appendChild(newItem);
      }

      if (typeof window.switchActiveUserAccount === 'function') {
        window.switchActiveUserAccount(newAccId);
      }

      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Log In & Connect';
      if (userInput) userInput.value = '';
      if (passInput) passInput.value = '';

      const aBox = document.getElementById('add-account-form-box');
      const bShow = document.getElementById('btn-show-add-acc');
      if (aBox) aBox.style.display = 'none';
      if (bShow) bShow.style.display = 'inline-flex';

      if (typeof window.closeAccountModal === 'function') {
        window.closeAccountModal('modal-instagram-auth');
        window.closeAccountModal('modal-switch-account');
      }

      if (typeof showToast === 'function') {
        showToast(`Instagram account ${cleanHandle} connected successfully!`);
      }
    }, 700);
  };

  function switchActiveAccount(accountName, accountEmail, accountInsta) {
    window.storeProfileState.name = accountName;
    window.storeProfileState.email = accountEmail;
    if (accountInsta) window.storeProfileState.insta = accountInsta;

    if (typeof window.syncStoreProfileToUI === 'function') {
      window.syncStoreProfileToUI();
    }

    // Update settings inputs if present
    const sName = document.getElementById('settings-user-name');
    const sEmail = document.getElementById('settings-user-email');
    if (sName) sName.value = accountName;
    if (sEmail) sEmail.value = accountEmail;

    if (typeof showToast === 'function') {
      showToast(`Switched account to ${accountName}`);
    }

    closeModal('modal-switch-account');
  }

  // Account List Item Click
  const switchAccContainer = document.getElementById('switch-accounts-container');
  if (switchAccContainer) {
    switchAccContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.switch-account-item');
      if (!item) return;
      const accId = item.getAttribute('data-account-id');
      if (accId && typeof window.switchActiveUserAccount === 'function') {
        window.switchActiveUserAccount(accId);
      }
    });
  }

  // 3. Settings Item Click
  const btnSettings = document.getElementById('upp-item-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings-modal');
  const btnCancelSettings = document.getElementById('btn-cancel-settings');
  const btnSaveSettings = document.getElementById('btn-save-settings');
  const btnJumpStoreSettings = document.getElementById('btn-jump-store-settings');
  const btnRefreshInstaToken = document.getElementById('btn-refresh-insta-token');

  if (btnSettings) {
    btnSettings.addEventListener('click', (e) => {
      e.stopPropagation();
      closeProfilePopup();
      if (typeof window.openAccountSettingsView === 'function') {
        window.openAccountSettingsView(e);
      }
    });
  }

  if (btnCloseSettings) btnCloseSettings.addEventListener('click', () => closeModal('modal-user-settings'));
  if (btnCancelSettings) btnCancelSettings.addEventListener('click', () => closeModal('modal-user-settings'));

  // Settings Tabs Switcher
  const settingsTabs = document.querySelectorAll('.btn-settings-tab');
  settingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-stab');
      settingsTabs.forEach(t => {
        t.style.color = '#64748b';
        t.style.borderBottom = 'none';
        t.style.fontWeight = '600';
      });
      tab.style.color = '#4f46e5';
      tab.style.borderBottom = '2px solid #4f46e5';
      tab.style.fontWeight = '700';

      document.querySelectorAll('.stab-pane').forEach(p => p.style.display = 'none');
      const activePane = document.getElementById(`stab-pane-${target}`);
      if (activePane) activePane.style.display = 'flex';
    });
  });

  if (btnSaveSettings) {
    btnSaveSettings.addEventListener('click', () => {
      const nameVal = document.getElementById('settings-user-name')?.value.trim();
      const emailVal = document.getElementById('settings-user-email')?.value.trim();
      const bioVal = document.getElementById('settings-user-bio')?.value.trim();

      if (nameVal) window.storeProfileState.name = nameVal;
      if (emailVal) window.storeProfileState.email = emailVal;
      if (bioVal) window.storeProfileState.bio = bioVal;

      if (typeof window.syncStoreProfileToUI === 'function') {
        window.syncStoreProfileToUI();
      }
      closeModal('modal-user-settings');
      if (typeof showToast === 'function') showToast('Account & Profile settings saved successfully!');
    });
  }

  if (btnJumpStoreSettings) {
    btnJumpStoreSettings.addEventListener('click', () => {
      closeModal('modal-user-settings');
      if (typeof window.switchMainTab === 'function') {
        window.switchMainTab('creatorstore');
        // Activate store settings subtab
        const storeSettingsBtn = document.querySelector('[data-store-tab="store-settings"]');
        if (storeSettingsBtn) storeSettingsBtn.click();
      }
    });
  }

  if (btnRefreshInstaToken) {
    btnRefreshInstaToken.addEventListener('click', () => {
      btnRefreshInstaToken.textContent = 'Refreshing...';
      setTimeout(() => {
        btnRefreshInstaToken.textContent = 'Token Active (60d)';
        if (typeof showToast === 'function') showToast('Instagram Graph API token successfully renewed for 60 days!');
      }, 700);
    });
  }

  // 4. Support Item Click
  const btnSupport = document.getElementById('upp-item-support');
  const btnCloseSupport = document.getElementById('btn-close-support-modal');
  const btnCloseSupportFooter = document.getElementById('btn-close-support-footer');
  const btnModalCopyEmail = document.getElementById('btn-modal-copy-support-email');
  const btnModalGotoLearn = document.getElementById('btn-modal-goto-learn');

  if (btnSupport) {
    btnSupport.addEventListener('click', (e) => {
      e.stopPropagation();
      closeProfilePopup();
      if (typeof window.openSupportCenterView === 'function') {
        window.openSupportCenterView(e);
      }
    });
  }

  if (btnCloseSupport) btnCloseSupport.addEventListener('click', () => closeModal('modal-user-support'));
  if (btnCloseSupportFooter) btnCloseSupportFooter.addEventListener('click', () => closeModal('modal-user-support'));

  if (btnModalCopyEmail) {
    btnModalCopyEmail.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('support@renderreply.com');
      }
      if (typeof showToast === 'function') showToast('Copied support email: support@renderreply.com');
    });
  }

  if (btnModalGotoLearn) {
    btnModalGotoLearn.addEventListener('click', () => {
      closeModal('modal-user-support');
      if (typeof window.switchMainTab === 'function') {
        window.switchMainTab('learn-help');
      }
    });
  }

  // 5. Sign Out Item Click
  const btnSignOut = document.getElementById('upp-item-signout');
  const btnCloseSignout = document.getElementById('btn-cancel-signout');
  const btnConfirmSignout = document.getElementById('btn-confirm-signout');
  const signedOutBanner = document.getElementById('signed-out-prompt-banner');
  const btnQuickRelogin = document.getElementById('btn-quick-relogin');

  if (btnSignOut) {
    btnSignOut.addEventListener('click', (e) => {
      e.stopPropagation();
      closeProfilePopup();
      openModal('modal-user-signout');
    });
  }

  if (btnCloseSignout) btnCloseSignout.addEventListener('click', () => closeModal('modal-user-signout'));

  if (btnConfirmSignout) {
    btnConfirmSignout.addEventListener('click', () => {
      closeModal('modal-user-signout');
      if (signedOutBanner) signedOutBanner.style.display = 'flex';
      if (typeof showToast === 'function') showToast('You have signed out of RudRa RR.');
    });
  }

  if (btnQuickRelogin) {
    btnQuickRelogin.addEventListener('click', () => {
      if (signedOutBanner) signedOutBanner.style.display = 'none';
      if (typeof showToast === 'function') showToast('Welcome back, RudRa RR!');
    });
  }

  // Initialize Support View Event Listeners
  initSupportCenterEngine();

  // Initial UI sync
  if (typeof window.syncStoreProfileToUI === 'function') {
    window.syncStoreProfileToUI();
  }
}

/* ==========================================================================
   SUPPORT & HELP CENTER ENGINE (MATCHING SCREENSHOT 1 & 2)
   ========================================================================== */

window.supportPreviousViewId = 'dashboard';
window.currentActiveChatTicketId = null;

function initSupportCenterEngine() {
  // 1. Back button
  const btnBack = document.getElementById('btn-support-back');
  if (btnBack) {
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();
      const prev = window.supportPreviousViewId || 'dashboard';
      if (prev === 'settings' && typeof window.openAccountSettingsView === 'function') {
        window.openAccountSettingsView();
      } else if (typeof window.switchMainTab === 'function') {
        window.switchMainTab(prev);
      } else {
        const targetNav = document.querySelector(`.sidebar-nav .nav-item[data-tab="${prev}"]`);
        if (targetNav) targetNav.click();
      }
    });
  }

  // 2. Segmented Pill Tab Switcher
  const btnResources = document.getElementById('tab-btn-help-resources');
  const btnTickets = document.getElementById('tab-btn-support-tickets');

  if (btnResources) {
    btnResources.addEventListener('click', () => window.switchSupportSubPanel('resources'));
  }
  if (btnTickets) {
    btnTickets.addEventListener('click', () => window.switchSupportSubPanel('tickets'));
  }

  // 3. Card 3 "Open Tickets Dashboard ->" button
  const btnGotoTickets = document.getElementById('btn-support-goto-tickets');
  if (btnGotoTickets) {
    btnGotoTickets.addEventListener('click', () => window.switchSupportSubPanel('tickets'));
  }

  // 4. WhatsApp Support Triggers
  const btnChatWa = document.getElementById('btn-support-chat-whatsapp');
  const btnFaqWa = document.getElementById('btn-faq-ask-whatsapp');
  const btnLaunchWa = document.getElementById('btn-launch-whatsapp-direct');

  const openWhatsAppAction = () => {
    window.open('https://wa.me/15550192834?text=Hi%20RenderReply%20Support%2C%20I%20need%20assistance%20with%20my%20Instagram%20automation%20setup.', '_blank');
    if (typeof showToast === 'function') showToast('Connecting to RenderReply WhatsApp Support...');
  };

  if (btnChatWa) btnChatWa.addEventListener('click', openWhatsAppAction);
  if (btnFaqWa) btnFaqWa.addEventListener('click', openWhatsAppAction);
  if (btnLaunchWa) btnLaunchWa.addEventListener('click', openWhatsAppAction);

  // 5. Documentation Cards
  const docGeneral = document.getElementById('doc-card-general');
  const docAutomation = document.getElementById('doc-card-automation');
  const docBilling = document.getElementById('doc-card-billing');
  const docSettings = document.getElementById('doc-card-settings');

  if (docGeneral) docGeneral.addEventListener('click', () => window.openSupportGuide('general'));
  if (docAutomation) docAutomation.addEventListener('click', () => window.openSupportGuide('automation'));
  if (docBilling) docBilling.addEventListener('click', () => window.openSupportGuide('billing'));
  if (docSettings) docSettings.addEventListener('click', () => window.openSupportGuide('settings'));

  // 6. FAQ Accordions
  window.initSupportFAQAccordions();

  // 7. Refresh Tickets Button
  const btnRefreshTickets = document.getElementById('btn-refresh-support-tickets');
  if (btnRefreshTickets) {
    btnRefreshTickets.addEventListener('click', () => {
      const icon = btnRefreshTickets.querySelector('.refresh-icon');
      if (icon) icon.classList.add('spinning');
      window.renderSupportTicketsList();
      setTimeout(() => {
        if (icon) icon.classList.remove('spinning');
        if (typeof showToast === 'function') showToast('Support tickets refreshed.');
      }, 500);
    });
  }

  // 8. Resolve/Reopen button in Chat Modal
  const btnToggleResolve = document.getElementById('btn-toggle-resolve-ticket');
  if (btnToggleResolve) {
    btnToggleResolve.addEventListener('click', () => window.toggleTicketResolvedState());
  }

  // Initial render of tickets
  window.renderSupportTicketsList();
}

window.switchSupportSubPanel = function (panelKey) {
  const btnResources = document.getElementById('tab-btn-help-resources');
  const btnTickets = document.getElementById('tab-btn-support-tickets');
  const panelResources = document.getElementById('support-panel-resources');
  const panelTickets = document.getElementById('support-panel-tickets');

  if (panelKey === 'tickets') {
    if (btnResources) {
      btnResources.classList.remove('active');
      btnResources.setAttribute('aria-selected', 'false');
    }
    if (btnTickets) {
      btnTickets.classList.add('active');
      btnTickets.setAttribute('aria-selected', 'true');
    }
    if (panelResources) panelResources.classList.remove('active');
    if (panelTickets) panelTickets.classList.add('active');
    window.renderSupportTicketsList();
  } else {
    if (btnResources) {
      btnResources.classList.add('active');
      btnResources.setAttribute('aria-selected', 'true');
    }
    if (btnTickets) {
      btnTickets.classList.remove('active');
      btnTickets.setAttribute('aria-selected', 'false');
    }
    if (panelResources) panelResources.classList.add('active');
    if (panelTickets) panelTickets.classList.remove('active');
  }
};

window.initSupportFAQAccordions = function () {
  const faqItems = document.querySelectorAll('.support-faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.support-faq-question');
    if (btn && !btn.dataset.faqInitialized) {
      btn.dataset.faqInitialized = 'true';
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        if (isActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
};

window.getStoredSupportTickets = function () {
  try {
    const raw = localStorage.getItem('renderreply_support_tickets');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading tickets from localStorage', e);
  }
  return [];
};

window.saveStoredSupportTickets = function (tickets) {
  try {
    localStorage.setItem('renderreply_support_tickets', JSON.stringify(tickets));
  } catch (e) {
    console.error('Error saving tickets to localStorage', e);
  }
};

window.renderSupportTicketsList = function () {
  const emptyState = document.getElementById('ticket-empty-state');
  const ticketsListWrap = document.getElementById('support-tickets-list');
  if (!emptyState || !ticketsListWrap) return;

  const tickets = window.getStoredSupportTickets();

  if (!tickets || tickets.length === 0) {
    emptyState.style.display = 'flex';
    ticketsListWrap.style.display = 'none';
    ticketsListWrap.innerHTML = '';
    return;
  }

  emptyState.style.display = 'none';
  ticketsListWrap.style.display = 'flex';

  ticketsListWrap.innerHTML = tickets.map(ticket => {
    const statusClass = ticket.status === 'Resolved' ? 'status-resolved' : (ticket.status === 'In Progress' ? 'status-in-progress' : 'status-open');
    const priorityClass = ticket.priority === 'Urgent' ? 'priority-urgent' : (ticket.priority === 'High' ? 'priority-high' : '');

    return `
      <div class="support-ticket-item" onclick="window.openSupportChatModal('${ticket.id}')">
        <div class="ticket-item-top">
          <span class="ticket-id-tag">#${ticket.id}</span>
          <span class="ticket-status-badge ${statusClass}">${ticket.status || 'Open'}</span>
        </div>
        <h4 class="ticket-item-subject">${ticket.subject || 'Support Request'}</h4>
        <div class="ticket-item-meta-row">
          <div class="ticket-meta-badges">
            <span class="ticket-priority-badge ${priorityClass}">${ticket.priority || 'Medium'}</span>
            <span>${ticket.category || 'General'}</span>
          </div>
          <span>${ticket.createdTimeStr || 'Recently'}</span>
        </div>
      </div>
    `;
  }).join('');
};

window.handleCreateSupportTicket = function (e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  const subjInput = document.getElementById('ticket-input-subject');
  const catSelect = document.getElementById('ticket-select-category');
  const prioSelect = document.getElementById('ticket-select-priority');
  const descTextarea = document.getElementById('ticket-textarea-description');

  if (!subjInput || !descTextarea) return;

  const subject = subjInput.value.trim();
  const category = catSelect ? catSelect.value : 'General Inquiry';
  const priority = prioSelect ? prioSelect.value : 'Medium';
  const description = descTextarea.value.trim();

  if (!subject || !description) {
    if (typeof showToast === 'function') showToast('Please enter both subject and description.');
    return;
  }

  const randNum = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `RR-${randNum}`;
  const now = new Date();
  const timeStr = 'Just now';

  const newTicket = {
    id: ticketId,
    subject: subject,
    category: category,
    priority: priority,
    description: description,
    status: 'Open',
    createdAt: now.toISOString(),
    createdTimeStr: timeStr,
    messages: [
      {
        sender: 'agent',
        senderName: 'Support Bot',
        avatar: 'RR',
        text: `Hello! We have received your ticket #${ticketId} regarding "${subject}". A technical support engineer is reviewing your inquiry.`,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        sender: 'user',
        senderName: 'You',
        avatar: 'RR',
        text: description,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };

  const tickets = window.getStoredSupportTickets();
  tickets.unshift(newTicket);
  window.saveStoredSupportTickets(tickets);

  subjInput.value = '';
  descTextarea.value = '';
  if (prioSelect) prioSelect.value = 'Medium';

  window.renderSupportTicketsList();

  if (typeof showToast === 'function') {
    showToast(`Support Ticket #${ticketId} created!`);
  }

  setTimeout(() => {
    window.openSupportChatModal(ticketId);

    setTimeout(() => {
      window.simulateInitialAgentReply(ticketId, category, subject);
    }, 1400);
  }, 300);
};

window.openSupportChatModal = function (ticketId) {
  window.currentActiveChatTicketId = ticketId;
  const tickets = window.getStoredSupportTickets();
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  const modal = document.getElementById('modal-support-ticket-chat');
  const idEl = document.getElementById('chat-modal-ticket-id');
  const subjEl = document.getElementById('chat-modal-ticket-subject');
  const statusEl = document.getElementById('chat-modal-ticket-status');
  const priorityEl = document.getElementById('chat-modal-ticket-priority');
  const catEl = document.getElementById('chat-modal-category');
  const createdEl = document.getElementById('chat-modal-created-time');
  const btnResolve = document.getElementById('btn-toggle-resolve-ticket');

  if (idEl) idEl.textContent = `#${ticket.id}`;
  if (subjEl) subjEl.textContent = ticket.subject;
  if (catEl) catEl.textContent = ticket.category;
  if (createdEl) createdEl.textContent = ticket.createdTimeStr || 'Today';

  if (statusEl) {
    statusEl.textContent = ticket.status || 'Open';
    statusEl.className = 'ticket-status-badge ' + (ticket.status === 'Resolved' ? 'status-resolved' : (ticket.status === 'In Progress' ? 'status-in-progress' : 'status-open'));
  }

  if (priorityEl) {
    priorityEl.textContent = ticket.priority || 'Medium';
    priorityEl.className = 'ticket-priority-badge ' + (ticket.priority === 'Urgent' ? 'priority-urgent' : (ticket.priority === 'High' ? 'priority-high' : ''));
  }

  if (btnResolve) {
    btnResolve.textContent = ticket.status === 'Resolved' ? 'Reopen Ticket' : 'Mark as Resolved';
  }

  window.renderSupportChatMessages(ticket);

  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }
};

window.closeSupportChatModal = function () {
  const modal = document.getElementById('modal-support-ticket-chat');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
  }
  window.currentActiveChatTicketId = null;
  window.renderSupportTicketsList();
};

window.renderSupportChatMessages = function (ticket) {
  const container = document.getElementById('support-chat-messages-container');
  if (!container || !ticket) return;

  const messages = ticket.messages || [];

  container.innerHTML = messages.map(msg => {
    const isUser = msg.sender === 'user';
    const bubbleClass = isUser ? 'bubble-user' : 'bubble-agent';
    const initial = isUser ? 'RR' : (msg.avatar || 'S');

    return `
      <div class="chat-bubble ${bubbleClass}">
        <div class="chat-bubble-avatar">${initial}</div>
        <div class="chat-bubble-content">
          <div style="font-weight: 700; font-size: 11.5px; margin-bottom: 3px; opacity: 0.85;">${msg.senderName || (isUser ? 'You' : 'Sarah (Support Engineer)')}</div>
          <div>${msg.text}</div>
          <div class="chat-bubble-time">${msg.time || 'Now'}</div>
        </div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
};

window.handleSendChatReply = function (e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (!window.currentActiveChatTicketId) return;

  const input = document.getElementById('input-support-chat-reply');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  const tickets = window.getStoredSupportTickets();
  const ticket = tickets.find(t => t.id === window.currentActiveChatTicketId);
  if (!ticket) return;

  const now = new Date();
  const userMsg = {
    sender: 'user',
    senderName: 'You',
    avatar: 'RR',
    text: text,
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  ticket.messages = ticket.messages || [];
  ticket.messages.push(userMsg);
  if (ticket.status === 'Resolved') ticket.status = 'In Progress';
  window.saveStoredSupportTickets(tickets);

  input.value = '';
  window.renderSupportChatMessages(ticket);

  const typingIndicator = document.getElementById('support-agent-typing-indicator');
  if (typingIndicator) typingIndicator.style.display = 'flex';

  setTimeout(() => {
    if (typingIndicator) typingIndicator.style.display = 'none';
    window.dispatchSmartAgentResponse(ticket.id, text, ticket.category);
  }, 1300);
};

window.dispatchSmartAgentResponse = function (ticketId, userText, category) {
  const tickets = window.getStoredSupportTickets();
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  let responseText = `Thank you for the update! I checked your account telemetry. The Meta API webhooks and automated DM dispatch queues are performing normally with 0% error rate.`;

  const lower = userText.toLowerCase();
  if (lower.includes('token') || lower.includes('api') || lower.includes('meta')) {
    responseText = `I verified your Meta Graph API connection. Your webhook endpoint is responding with HTTP 200 OK. If you recently changed your Instagram password, remember to re-authenticate under Settings > Account.`;
  } else if (lower.includes('billing') || lower.includes('cancel') || lower.includes('invoice') || lower.includes('plan')) {
    responseText = `Your subscription status is active. Invoices are automatically delivered to your billing email on file, and you can switch tiers anytime without interruption.`;
  } else if (lower.includes('rule') || lower.includes('trigger') || lower.includes('dm') || lower.includes('keyword')) {
    responseText = `For keyword triggers, please make sure your Instagram account is set to 'Creator' or 'Business' and that 'Allow Access to Messages' is toggled ON inside Instagram App Settings > Privacy > Messages.`;
  } else if (lower.includes('thank') || lower.includes('resolved') || lower.includes('great') || lower.includes('perfect')) {
    responseText = `You're very welcome! I'm glad we could get that sorted out for you. Let us know if there's anything else you need. Have a wonderful day!`;
  }

  const now = new Date();
  const agentMsg = {
    sender: 'agent',
    senderName: 'Sarah M. (Support Engineer)',
    avatar: 'S',
    text: responseText,
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  ticket.messages.push(agentMsg);
  window.saveStoredSupportTickets(tickets);

  if (window.currentActiveChatTicketId === ticketId) {
    window.renderSupportChatMessages(ticket);
  }
};

window.simulateInitialAgentReply = function (ticketId, category, subject) {
  const tickets = window.getStoredSupportTickets();
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  let reply = `Hi! I'm Sarah from RenderReply Technical Support. I see your request regarding "${subject}". I'm reviewing your setup and will ensure this is resolved right away.`;

  if (category === 'Instagram Automation & API') {
    reply = `Hi! Sarah from Support here. I am inspecting your Instagram Graph API webhook logs. We guarantee real-time delivery under 500ms. I'm checking your account permissions now.`;
  } else if (category === 'Billing & Subscription') {
    reply = `Hello! I'm checking your billing profile details. All payments and invoices are encrypted via Stripe. Let me assist you with your plan options.`;
  }

  const now = new Date();
  ticket.messages.push({
    sender: 'agent',
    senderName: 'Sarah M. (Support Engineer)',
    avatar: 'S',
    text: reply,
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  window.saveStoredSupportTickets(tickets);
  if (window.currentActiveChatTicketId === ticketId) {
    window.renderSupportChatMessages(ticket);
  }
};

window.insertQuickReply = function (text) {
  const input = document.getElementById('input-support-chat-reply');
  if (input) {
    input.value = text;
    input.focus();
  }
};

window.toggleTicketResolvedState = function () {
  if (!window.currentActiveChatTicketId) return;
  const tickets = window.getStoredSupportTickets();
  const ticket = tickets.find(t => t.id === window.currentActiveChatTicketId);
  if (!ticket) return;

  const isResolved = ticket.status === 'Resolved';
  ticket.status = isResolved ? 'Open' : 'Resolved';

  const now = new Date();
  ticket.messages.push({
    sender: 'agent',
    senderName: 'System',
    avatar: '⚙️',
    text: isResolved ? 'Ticket reopened by customer.' : 'Ticket marked as resolved. Thank you for contacting RenderReply Support!',
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  window.saveStoredSupportTickets(tickets);
  window.openSupportChatModal(ticket.id);

  if (typeof showToast === 'function') {
    showToast(`Ticket #${ticket.id} is now ${ticket.status}.`);
  }
};

window.openSupportGuide = function (guideKey) {
  const modal = document.getElementById('modal-support-guide');
  const titleEl = document.getElementById('guide-modal-title');
  const subEl = document.getElementById('guide-modal-subtitle');
  const bodyEl = document.getElementById('guide-modal-body');
  if (!modal || !titleEl || !bodyEl) return;

  const guides = {
    general: {
      title: 'Meta Graph API & Instagram Setup Guide',
      subtitle: 'Step-by-step instructions to integrate your Meta API assets.',
      content: `
        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">1. Connect your Instagram Professional Account</h4>
        <p style="margin-bottom: 14px;">RenderReply uses the official Instagram Graph API OAuth 2.0. Make sure your Instagram account is set to a <strong>Creator</strong> or <strong>Business Account</strong>.</p>
        
        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">2. Required Permissions</h4>
        <ul style="padding-left: 20px; margin-bottom: 14px;">
          <li><code>instagram_manage_messages</code> - Dispatches automated direct messages</li>
          <li><code>instagram_manage_comments</code> - Detects comment triggers and sends instant replies</li>
          <li><code>pages_read_engagement</code> - Analyzes live story mentions and Reel performance</li>
        </ul>

        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">3. Webhook Delivery Verification</h4>
        <p>All webhooks are secured with AES-256 HMAC encryption signatures. Latency across all regions is below <strong>500ms</strong>.</p>
      `
    },
    automation: {
      title: 'Automation Flow & DM Dispatch Guide',
      subtitle: 'Learn how keyword triggers detect comments and dispatch DMs in real time.',
      content: `
        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">How Real-Time Trigger Detection Works</h4>
        <p style="margin-bottom: 14px;">When a user comments on any of your Instagram Reels, Posts, or Stories, our high-speed webhook captures the keyword in under 0.5s.</p>
        
        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Trigger Matching Modes</h4>
        <ul style="padding-left: 20px; margin-bottom: 14px;">
          <li><strong>Exact Match:</strong> Triggers only when the comment matches your exact keyword (e.g. "LINK").</li>
          <li><strong>Fuzzy / Contains:</strong> Triggers if the keyword appears anywhere in the sentence.</li>
          <li><strong>Randomized Reply Delays:</strong> Add 2-5s human-like delays to keep messaging organic.</li>
        </ul>

        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Digital Product Delivery</h4>
        <p>You can attach Bio Link pages or Creator Storefront products directly to any automated DM.</p>
      `
    },
    billing: {
      title: 'Billing, Subscriptions & Invoicing',
      subtitle: 'Manage plans, upgrades, payment methods, and invoices.',
      content: `
        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Available RenderReply Plans</h4>
        <ul style="padding-left: 20px; margin-bottom: 14px;">
          <li><strong>Starter ($29/mo):</strong> 10 Active Rules, 5,000 Automated DMs/mo.</li>
          <li><strong>Pro ($79/mo):</strong> 50 Active Rules, 25,000 Automated DMs/mo, Storefront integration.</li>
          <li><strong>Agency / Enterprise ($199/mo):</strong> Unlimited Rules, Unlimited DMs, Priority Webhooks.</li>
        </ul>

        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">1-Click Upgrades & Cancellation</h4>
        <p>Upgrade or cancel anytime in Account Settings > Billing with zero penalty fees.</p>
      `
    },
    settings: {
      title: 'Settings & Comment Detection Optimization',
      subtitle: 'Fine-tune comment detection sensitivity and inbox workflows.',
      content: `
        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Optimizing Trigger Detection Rates</h4>
        <p style="margin-bottom: 14px;">Ensure "Allow Access to Messages" is enabled inside your Instagram app under Settings > Privacy > Messages.</p>
        
        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Spam Filtering & Blacklists</h4>
        <p style="margin-bottom: 14px;">You can configure negative keyword exclusions to avoid replying to bots or repetitive promo comments.</p>

        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Auto-Save & Real-Time Sync</h4>
        <p>All changes in your automation dashboard auto-save instantly to cloud storage.</p>
      `
    }
  };

  const guide = guides[guideKey] || guides.general;
  titleEl.textContent = guide.title;
  subEl.textContent = guide.subtitle;
  bodyEl.innerHTML = guide.content;

  modal.classList.add('active');
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.pointerEvents = 'auto';
};

window.closeSupportGuideModal = function () {
  const modal = document.getElementById('modal-support-guide');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
  }
};

/* ========================================================================== */
/* REELS UPLOAD & STUDIO FEATURE (REELS CONTROLLER)                           */
/* ========================================================================== */

(function initReelsStudioModule() {
  // STATE
  let currentReelsSubTab = 'gallery';
  let activeReelPreset = 1;
  let isPlaying = true;
  let isMuted = true;
  let currentFilter = 'normal';
  let currentTone = 'viral';
  let activeFramework = 'pas';
  let canvasAnimationId = null;
  let isLiked = false;
  let currentActiveFolder = 'main';
  let currentGalleryViewMode = 'gallery';

  // GALLERY MEDIA DATASET (EMPTY BY DEFAULT - ONLY SHOWS WHAT USER UPLOADS)
  let galleryFolders = [
    { id: 'main', name: 'Main Gallery', count: 0, isDefault: true }
  ];

  let galleryMediaItems = [];

  // SOCIAL ACCOUNTS DATASET (INSTAGRAM STORIES & REELS)
  let socialAccountsList = [
    { id: 'ig-stories-1', platform: 'ig-story', group: 'INSTAGRAM STORIES', name: 'RenderReply Official', handle: '@renderreply', selected: true },
    { id: 'ig-stories-2', platform: 'ig-story', group: 'INSTAGRAM STORIES', name: 'Alex Growth Co', handle: '@alexcreator', selected: false },
    { id: 'reels-1', platform: 'reels', group: 'REELS', name: 'RenderReply Studio', handle: '@renderreply', selected: true },
    { id: 'reels-2', platform: 'reels', group: 'REELS', name: 'Digital Academy', handle: '@digitalacademy', selected: false }
  ];

  // SCHEDULING ACTIVITY LOG
  let schedulingActivityList = [
    {
      id: 'act-1',
      mediaName: 'Digiproducthub (15)',
      platform: 'Instagram Reels',
      time: 'Just now',
      status: 'in-progress',
      statusText: 'In progress • Posting now'
    },
    {
      id: 'act-2',
      mediaName: 'Store Launch Showcase (08)',
      platform: 'Instagram Stories & Reels',
      time: 'Today, 6:30 PM',
      status: 'scheduled',
      statusText: 'Scheduled'
    },
    {
      id: 'act-3',
      mediaName: 'Viral Hook Strategy (30)',
      platform: 'Instagram Reels',
      time: 'Tomorrow, 9:00 AM',
      status: 'scheduled',
      statusText: 'Scheduled'
    }
  ];

  // SAMPLE REELS PRESETS
  const samplePresets = {
    1: {
      title: "Growth Hack ($12K DM Strategy)",
      tag: "🔥 VIRAL HOOK",
      overlayText: "STOP SCROLLING: How I Automated $12K in DMs",
      caption: "Want the complete automated DM blueprint? Comment GROWTH below and I'll send it straight to your DMs! 🚀\n\nStop losing hours answering repetitive questions manually. Use RenderReply smart rules to convert views into revenue 24/7.\n\n#creatoreconomy #dmautomation #growthhacks #digitalproducts #renderreply",
      keyword: "GROWTH",
      template: "tpl-growth",
      audio: "Trending Beat • Phonk Velocity",
      bgGradient: ["#0f172a", "#3b0764", "#0284c7"]
    },
    2: {
      title: "AI Workflow & Tools Review",
      tag: "⚡ NEW STRATEGY",
      overlayText: "TOP 5 AI TOOLS THAT ACTUALLY MAKE MONEY",
      caption: "These 5 AI tools replaced a 4-person creator team for me in 2026. Comment AITOOLS for the complete free resource sheet + links! 💡\n\n#aitools #automation #creators #productivity #marketing",
      keyword: "AITOOLS",
      template: "tpl-custom",
      audio: "Lo-Fi Chill Focus Beats",
      bgGradient: ["#1e1b4b", "#4338ca", "#06b6d4"]
    },
    3: {
      title: "High-Converting Storefront Showcase",
      tag: "💰 $10K CASE STUDY",
      overlayText: "HOW I SELL DIGITAL PRODUCTS ON AUTOPILOT",
      caption: "Stop sending followers to messy link trees. Here's how my RenderReply storefront generated $19,840 this month alone. Comment STORE to get 20% off! 🎟️\n\n#digitalproducts #stanstore #creatorbusiness #passiveincome",
      keyword: "STORE",
      template: "tpl-store",
      audio: "Viral Luxury Ambient Sound",
      bgGradient: ["#14532d", "#065f46", "#10b981"]
    },
    4: {
      title: "Viral Bio Link Setup",
      tag: "👇 COMMENT 'TEMPLATE'",
      overlayText: "THE 1-CLICK BIO LINK PAGE THAT CONVERTS 3X HIGHER",
      caption: "Steal my exact high-converting Bio Link Page template for free! Comment TEMPLATE below and my automated assistant will DM it to you instantly ✨\n\n#biolink #linkinbio #instagramtips #contentcreator",
      keyword: "TEMPLATE",
      template: "tpl-lead",
      audio: "Phonk Velocity (Trending #1)",
      bgGradient: ["#701a75", "#be185d", "#f43f5e"]
    }
  };

  // =========================================================================
  // SUB-TAB NAVIGATION HANDLER
  // =========================================================================
  window.switchReelsSubTab = function (tabName) {
    if (!tabName) return;
    currentReelsSubTab = tabName;

    // Subnav buttons
    const btns = document.querySelectorAll('.reels-subnav-btn');
    btns.forEach(b => {
      if (b.getAttribute('data-reels-tab') === tabName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Sub-panes
    const panes = document.querySelectorAll('.reels-tab-pane, .reels-pane');
    panes.forEach(p => {
      if (p.id === `reels-pane-${tabName}`) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    if (tabName === 'gallery') {
      if (typeof renderGalleryGrid === 'function') renderGalleryGrid();
    } else if (tabName === 'schedule') {
      if (typeof window.syncSchedulerAccountsToActiveUser === 'function') {
        window.syncSchedulerAccountsToActiveUser();
      } else if (typeof window.updateSelectedAccountsCount === 'function') {
        window.updateSelectedAccountsCount();
      }
    } else if (tabName === 'studio') {
      if (typeof startProceduralCanvas === 'function') startProceduralCanvas(activeReelPreset);
    } else if (tabName === 'analytics') {
      if (typeof renderReelsAnalyticsChart === 'function') renderReelsAnalyticsChart();
    }
  };

  // =========================================================================
  // MODAL CONTROLLERS
  // =========================================================================
  window.openReelsModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
      const firstInput = modal.querySelector('input[type="text"], textarea');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 60);
      }
    }
  };

  window.closeReelsModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  };

  // Close modals on backdrop click or Escape key
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('reels-modal-backdrop')) {
      e.target.classList.remove('active');
      e.target.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.reels-modal-backdrop.active').forEach(m => {
        m.classList.remove('active');
        m.style.display = 'none';
      });
    }
  });

  // =========================================================================
  // GALLERY & FOLDER MANAGEMENT
  // =========================================================================
  function renderGalleryFolders() {
    const listEl = document.getElementById('gallery-folder-tree');
    const emptyNote = document.getElementById('gallery-folder-empty-note');
    if (!listEl) return;

    const customFolders = galleryFolders.filter(f => !f.isDefault);

    if (customFolders.length === 0) {
      if (emptyNote) emptyNote.style.display = 'block';
      listEl.innerHTML = '';
    } else {
      if (emptyNote) emptyNote.style.display = 'none';

      let allCount = galleryMediaItems.filter(item => !item.isArchived).length;
      let html = `
        <div class="folder-tree-item ${currentActiveFolder === 'main' ? 'active' : ''}" onclick="window.selectGalleryFolder('main', this)">
          <div class="folder-item-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>All Media</span>
          </div>
          <span class="folder-count-badge">${allCount}</span>
        </div>
      `;

      html += customFolders.map(folder => {
        const count = galleryMediaItems.filter(item => item.folder === folder.id && !item.isArchived).length;
        return `
          <div class="folder-tree-item ${folder.id === currentActiveFolder ? 'active' : ''}" onclick="window.selectGalleryFolder('${folder.id}', this)">
            <div class="folder-item-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              <span>${folder.name}</span>
            </div>
            <div class="folder-item-actions">
              <span class="folder-count-badge">${count}</span>
              <button type="button" class="btn-folder-delete" title="Delete folder" onclick="event.stopPropagation(); window.deleteGalleryFolder('${folder.id}');">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `;
      }).join('');

      listEl.innerHTML = html;
    }
  }

  function renderGalleryGrid(searchQuery = '') {
    const gridEl = document.getElementById('gallery-media-grid');
    const emptyState = document.getElementById('gallery-empty-state');
    if (!gridEl) return;

    let items = galleryMediaItems.filter(item => {
      if (currentGalleryViewMode === 'archive') {
        return !!item.isArchived;
      } else {
        return !item.isArchived;
      }
    });

    if (currentGalleryViewMode !== 'archive' && currentActiveFolder !== 'main') {
      items = items.filter(item => item.folder === currentActiveFolder);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(q) || (item.autoDmKeyword && item.autoDmKeyword.toLowerCase().includes(q)));
    }

    if (items.length === 0) {
      gridEl.style.display = 'none';
      if (emptyState) {
        emptyState.style.display = 'flex';
        const heading = emptyState.querySelector('.empty-heading');
        const sub = emptyState.querySelector('.empty-sub');
        const emptyBtn = document.getElementById('btn-empty-gallery-action');

        if (currentGalleryViewMode === 'archive') {
          if (heading) heading.textContent = 'Your archive is empty!';
          if (sub) sub.textContent = 'Completed and archived reels will appear here when archived from the active gallery.';
          if (emptyBtn) {
            emptyBtn.innerHTML = `<span>← Go to Active Gallery</span>`;
            emptyBtn.onclick = function () { window.toggleGalleryArchive('gallery'); };
          }
        } else if (currentActiveFolder !== 'main') {
          const folderObj = galleryFolders.find(f => f.id === currentActiveFolder);
          const fName = folderObj ? folderObj.name : 'folder';
          if (heading) heading.textContent = `No media in "${fName}"`;
          if (sub) sub.textContent = 'Upload image(s) or video(s) to add media to this folder';
          if (emptyBtn) {
            emptyBtn.innerHTML = `
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <span>Upload</span>
            `;
            emptyBtn.onclick = function () { window.triggerReelFileInput(); };
          }
        } else {
          if (heading) heading.textContent = 'Your gallery is empty!';
          if (sub) sub.textContent = 'Drop images / videos here or click the button';
          if (emptyBtn) {
            emptyBtn.innerHTML = `
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <span>Upload</span>
            `;
            emptyBtn.onclick = function () { window.triggerReelFileInput(); };
          }
        }
      }
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    gridEl.style.display = 'grid';

    gridEl.innerHTML = items.map(media => {
      const isVideo = media.type === 'video' || (media.name && /\.(mp4|mov|webm|mkv)$/i.test(media.name));
      const visualHtml = (isVideo && media.thumbUrl && (media.thumbUrl.startsWith('blob:') || media.thumbUrl.startsWith('data:video') || media.thumbUrl.endsWith('.mp4')))
        ? `<video src="${media.thumbUrl}" class="media-thumb-img" muted playsinline preload="metadata" onloadeddata="try{this.currentTime=0.2}catch(e){}" style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;"></video>`
        : `<img src="${media.thumbUrl || 'goldfish_reel_thumb.jpg'}" alt="${media.name}" class="media-thumb-img" onerror="this.onerror=null; this.src='goldfish_reel_thumb.jpg';">`;

      return `
        <div class="storrito-media-card" id="media-card-${media.id}" onclick="window.openMediaDetailModal('${media.id}')">
          <div class="media-card-thumb-container">
            ${visualHtml}
            ${media.isArchived ? `<div class="media-card-archived-badge" style="position: absolute; top: 8px; left: 8px; background: rgba(15, 23, 42, 0.85); color: #cbd5e1; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; backdrop-filter: blur(4px); display: flex; align-items: center; gap: 4px; z-index: 2;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>Archived</div>` : ''}
            <div class="media-card-select-overlay">
              <input type="checkbox" class="media-card-checkbox" onclick="event.stopPropagation();">
            </div>
            <div class="media-card-camera-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
            <div class="media-card-hover-mask">
              <button type="button" class="btn-storrito-open" onclick="event.stopPropagation(); window.openMediaDetailModal('${media.id}');">Open</button>
            </div>
          </div>
          <div class="media-card-label-bar">
            <span class="media-card-filename" title="${media.name}">${media.name}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // MEDIA DETAIL MODAL & ACTIONS (MATCHING SCREENSHOT)
  // =========================================================================
  let currentSelectedMediaId = null;

  window.openMediaDetailModal = function (mediaId) {
    const media = galleryMediaItems.find(m => m.id === mediaId);
    if (!media) {
      if (typeof window.showToast === 'function') window.showToast('Media not found');
      return;
    }

    currentSelectedMediaId = mediaId;

    // Set Title
    const titleEl = document.getElementById('modal-media-title');
    if (titleEl) titleEl.textContent = media.name;

    // Set Preview (Video or Image)
    const videoEl = document.getElementById('modal-detail-video');
    const imgEl = document.getElementById('modal-detail-img');
    const isVideo = media.type === 'video' || (media.name && /\.(mp4|mov|webm|mkv)$/i.test(media.name));

    if (isVideo && media.thumbUrl && (media.thumbUrl.startsWith('blob:') || media.thumbUrl.startsWith('data:video') || media.thumbUrl.endsWith('.mp4'))) {
      if (videoEl) {
        videoEl.style.display = 'block';
        videoEl.src = media.thumbUrl;
      }
      if (imgEl) imgEl.style.display = 'none';
    } else {
      if (videoEl) {
        videoEl.style.display = 'none';
        try { videoEl.pause(); } catch (e) { }
      }
      if (imgEl) {
        imgEl.style.display = 'block';
        imgEl.src = media.thumbUrl || 'goldfish_reel_thumb.jpg';
      }
    }

    // Set Meta
    const typeEl = document.getElementById('modal-detail-type');
    if (typeEl) typeEl.textContent = isVideo ? '9:16 Video Reel' : '9:16 Story Image';

    const folderEl = document.getElementById('modal-detail-folder');
    if (folderEl) {
      const f = galleryFolders.find(fold => fold.id === media.folder);
      folderEl.textContent = f ? f.name : 'Main Gallery';
    }

    const sizeEl = document.getElementById('modal-detail-size');
    if (sizeEl) sizeEl.textContent = media.size || '14.2 MB';

    const kwBadge = document.getElementById('modal-detail-keyword-badge');
    const kwVal = media.autoDmKeyword || 'GROWTH';
    if (kwBadge) kwBadge.innerHTML = `#${kwVal} <span style="opacity: 0.6; font-size: 10px; margin-left: 2px;">✎</span>`;

    const dmText = document.getElementById('modal-detail-dm-preview');
    if (dmText) dmText.textContent = `Sends DM automatically when followers comment #${kwVal}.`;

    // Dynamic Archive / Unarchive Button
    const archiveBtn = document.getElementById('btn-modal-archive-action');
    if (archiveBtn) {
      if (media.isArchived) {
        archiveBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
          <span>Unarchive</span>
        `;
        archiveBtn.title = "Restore to Gallery";
      } else {
        archiveBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
          <span>Archive</span>
        `;
        archiveBtn.title = "Archive Media";
      }
    }

    window.openReelsModal('modal-media-detail-backdrop');
  };

  // QUICK EDIT COMMENT KEYWORD DIRECTLY FROM PREVIEW MODAL
  window.promptEditMediaKeyword = function () {
    if (!currentSelectedMediaId) return;
    const media = galleryMediaItems.find(m => m.id === currentSelectedMediaId);
    if (!media) return;

    const currentKw = media.autoDmKeyword || 'GROWTH';
    const newKw = prompt('Enter new comment trigger keyword (e.g. LINK, GROWTH, PRICE):', currentKw);
    if (newKw && newKw.trim()) {
      const cleanKw = newKw.trim().toUpperCase().replace(/^#/, '');
      media.autoDmKeyword = cleanKw;

      const kwBadge = document.getElementById('modal-detail-keyword-badge');
      if (kwBadge) kwBadge.innerHTML = `#${cleanKw} <span style="opacity: 0.6; font-size: 10px; margin-left: 2px;">✎</span>`;

      const dmText = document.getElementById('modal-detail-dm-preview');
      if (dmText) dmText.textContent = `Sends DM automatically when followers comment #${cleanKw}.`;

      if (typeof window.showToast === 'function') {
        window.showToast(`Comment trigger updated to #${cleanKw}`);
      }
    }
  };

  window.handleModalPostClick = function () {
    window.closeReelsModal('modal-media-detail-backdrop');
    if (currentSelectedMediaId) {
      window.openMediaInScheduler(currentSelectedMediaId);
    }
  };

  window.handleModalDeleteMedia = function () {
    if (!currentSelectedMediaId) return;
    const media = galleryMediaItems.find(m => m.id === currentSelectedMediaId);
    const mediaName = media ? media.name : 'Media item';

    galleryMediaItems = galleryMediaItems.filter(m => m.id !== currentSelectedMediaId);
    window.closeReelsModal('modal-media-detail-backdrop');
    renderGalleryFolders();
    renderGalleryGrid();

    if (typeof window.showToast === 'function') {
      window.showToast(`Deleted "${mediaName}"`);
    }
  };

  window.handleModalArchiveMedia = function () {
    if (!currentSelectedMediaId) return;
    const media = galleryMediaItems.find(m => m.id === currentSelectedMediaId);
    if (!media) return;
    const mediaName = media.name || 'Media item';

    media.isArchived = !media.isArchived;
    window.closeReelsModal('modal-media-detail-backdrop');
    renderGalleryFolders();
    renderGalleryGrid();

    if (typeof window.showToast === 'function') {
      if (media.isArchived) {
        window.showToast(`Archived "${mediaName}"`);
      } else {
        window.showToast(`Restored "${mediaName}" to Gallery`);
      }
    }
  };

  window.handleModalDuplicateMedia = function () {
    if (!currentSelectedMediaId) return;
    const media = galleryMediaItems.find(m => m.id === currentSelectedMediaId);
    if (!media) return;

    const clone = {
      ...media,
      id: `media-${Date.now()}`,
      name: `${media.name} (Copy)`
    };

    galleryMediaItems.unshift(clone);
    window.closeReelsModal('modal-media-detail-backdrop');
    renderGalleryFolders();
    renderGalleryGrid();

    if (typeof window.showToast === 'function') {
      window.showToast(`Created duplicate: "${clone.name}"`);
    }
  };

  window.handleModalDownloadMedia = function () {
    if (!currentSelectedMediaId) return;
    const media = galleryMediaItems.find(m => m.id === currentSelectedMediaId);
    const mediaName = media ? media.name : 'story_media';

    if (media && media.thumbUrl && (media.thumbUrl.startsWith('blob:') || media.thumbUrl.startsWith('data:'))) {
      const a = document.createElement('a');
      a.href = media.thumbUrl;
      a.download = media.name || 'media_export';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    if (typeof window.showToast === 'function') {
      window.showToast(`Downloading "${mediaName}"...`);
    }
  };

  window.selectGalleryFolder = function (folderId, btn) {
    currentActiveFolder = folderId;
    renderGalleryFolders();
    renderGalleryGrid();
  };

  window.toggleGalleryView = function (mode, btn) {
    currentGalleryViewMode = mode;
    const btns = document.querySelectorAll('.toggle-opt-btn');
    btns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (mode === 'archive') {
      if (typeof window.showToast === 'function') {
        window.showToast('Switched to Archived Reels');
      }
    }
    renderGalleryGrid();
  };

  window.handleGallerySearch = function (query) {
    renderGalleryGrid(query);
  };

  window.openNewFolderPrompt = function () {
    const modal = document.getElementById('modal-new-folder-backdrop');
    if (modal) {
      window.openReelsModal('modal-new-folder-backdrop');
      const input = document.getElementById('input-new-folder-name');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 60);
      }
    } else {
      const name = prompt('Enter a name for your new folder:');
      if (name && name.trim()) {
        window.createNewFolderWithName(name.trim());
      }
    }
  };

  window.createNewFolderWithName = function (name) {
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    const newId = `folder-${Date.now()}`;
    galleryFolders.push({ id: newId, name: cleanName, count: 0 });
    currentActiveFolder = newId;

    renderGalleryFolders();
    renderGalleryGrid();

    if (typeof window.showToast === 'function') {
      window.showToast(`Created folder: "${cleanName}"`);
    }
  };

  window.confirmCreateFolder = function () {
    const input = document.getElementById('input-new-folder-name');
    const name = input ? input.value.trim() : '';
    if (!name) {
      if (typeof window.showToast === 'function') window.showToast('Please enter a folder name');
      return;
    }

    window.createNewFolderWithName(name);
    window.closeReelsModal('modal-new-folder-backdrop');
    if (input) input.value = '';
  };

  window.deleteGalleryFolder = function (folderId) {
    const folder = galleryFolders.find(f => f.id === folderId);
    const folderName = folder ? folder.name : 'folder';
    galleryFolders = galleryFolders.filter(f => f.id !== folderId);
    if (currentActiveFolder === folderId) {
      currentActiveFolder = 'main';
    }
    // Reassign media in this folder to main
    galleryMediaItems.forEach(item => {
      if (item.folder === folderId) item.folder = 'main';
    });

    renderGalleryFolders();
    renderGalleryGrid();

    if (typeof window.showToast === 'function') {
      window.showToast(`Deleted folder: "${folderName}"`);
    }
  };

  window.createEmptyReel = function () {
    const modal = document.getElementById('modal-new-empty-reel-backdrop');
    if (modal) {
      window.openReelsModal('modal-new-empty-reel-backdrop');
      const input = document.getElementById('input-empty-reel-title');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 60);
      }
    } else {
      const title = prompt('Enter a name for your new empty story / reel:', 'Untitled Story');
      if (title && title.trim()) {
        window.createNewEmptyReelWithTitle(title.trim());
      }
    }
  };

  window.createNewEmptyReelWithTitle = function (title) {
    const cleanTitle = title || 'New Empty Story / Reel';
    const newMedia = {
      id: `media-${Date.now()}`,
      name: cleanTitle,
      type: 'video',
      duration: '00:15',
      size: '12.0 MB',
      folder: currentActiveFolder || 'main',
      date: 'Just now',
      autoDmKeyword: 'GROWTH',
      template: 'Growth Toolkit Blueprint',
      color: 'linear-gradient(135deg, #090d16, #7e22ce)',
      thumbIcon: '✨',
      thumbUrl: 'goldfish_reel_thumb.jpg'
    };

    galleryMediaItems.unshift(newMedia);
    renderGalleryFolders();
    renderGalleryGrid();
    window.switchReelsSubTab('studio');

    if (typeof window.showToast === 'function') {
      window.showToast(`Opened "${cleanTitle}" in Story & Reel Studio`);
    }
  };

  window.confirmCreateEmptyReel = function () {
    const titleInput = document.getElementById('input-empty-reel-title');
    const title = titleInput && titleInput.value.trim() ? titleInput.value.trim() : 'New Empty Story / Reel';

    window.closeReelsModal('modal-new-empty-reel-backdrop');
    if (titleInput) titleInput.value = '';
    window.createNewEmptyReelWithTitle(title);
  };

  // TRIGGER FILE INPUT
  window.triggerReelFileInput = function () {
    const fileInput = document.getElementById('reels-file-input');
    if (fileInput) {
      fileInput.click();
    } else {
      window.triggerReelsBatchUpload();
    }
  };

  // HANDLE REAL FILE UPLOAD WITH PROGRESS CHIP
  window.handleReelFileUpload = function (event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const chip = document.getElementById('reels-upload-progress-chip');
    const fill = document.getElementById('upload-chip-fill');
    const statusText = document.getElementById('upload-chip-status');

    if (chip) chip.style.display = 'inline-flex';

    let progress = 15;
    if (fill) fill.style.width = `${progress}%`;
    if (statusText) statusText.textContent = `${file.name} • uploading (${progress}%)`;

    const interval = setInterval(() => {
      progress += 25;
      if (fill) fill.style.width = `${Math.min(progress, 100)}%`;
      if (statusText) statusText.textContent = `${file.name} • processing`;

      if (progress >= 100) {
        clearInterval(interval);

        // Create object URL for preview if image or video
        let previewUrl = 'goldfish_reel_thumb.jpg';
        try {
          if (file.type.startsWith('image') || file.type.startsWith('video')) {
            previewUrl = URL.createObjectURL(file);
          }
        } catch (e) { }

        const nameLower = (file.name || '').toLowerCase();
        const isImage = file.type.startsWith('image') || /\.(jpg|jpeg|png|webp|gif|bmp|tiff|svg)$/i.test(nameLower) || nameLower.includes('screenshot');

        // Create new media card item
        const newMedia = {
          id: `media-${Date.now()}`,
          name: file.name,
          type: isImage ? 'image' : 'video',
          duration: isImage ? 'Photo' : '00:15',
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          folder: currentActiveFolder || 'main',
          date: 'Just now',
          autoDmKeyword: 'GROWTH',
          template: 'Growth Toolkit Blueprint',
          thumbUrl: previewUrl
        };

        currentSelectedMediaId = newMedia.id;
        galleryMediaItems.unshift(newMedia);
        renderGalleryFolders();
        renderGalleryGrid();

        // Also pre-configure scheduler with this uploaded media
        const bannerTitle = document.getElementById('sched-active-title');
        if (bannerTitle) bannerTitle.textContent = newMedia.name;

        const chkStories = document.getElementById('chk-acc-stories');
        const chkReels = document.getElementById('chk-acc-reels');
        const chkPosts = document.getElementById('chk-acc-posts');
        const rowStories = document.getElementById('row-acc-stories');
        const rowReels = document.getElementById('row-acc-reels');
        const rowPosts = document.getElementById('row-acc-posts');

        if (isImage) {
          if (chkPosts) chkPosts.checked = true;
          if (chkReels) chkReels.checked = false;
          if (chkStories) chkStories.checked = false;
          if (rowPosts) rowPosts.classList.add('selected');
          if (rowReels) rowReels.classList.remove('selected');
          if (rowStories) rowStories.classList.remove('selected');
        } else {
          if (chkPosts) chkPosts.checked = false;
          if (chkReels) chkReels.checked = true;
          if (chkStories) chkStories.checked = false;
          if (rowPosts) rowPosts.classList.remove('selected');
          if (rowReels) rowReels.classList.add('selected');
          if (rowStories) rowStories.classList.remove('selected');
        }

        const posterImg = document.getElementById('sched-poster-img');
        const videoEl = document.getElementById('schedule-video-element');
        if (isImage) {
          if (videoEl) {
            videoEl.style.display = 'none';
            try { videoEl.pause(); } catch (e) { }
          }
          if (posterImg) {
            posterImg.style.display = 'block';
            posterImg.src = previewUrl;
          }
        } else {
          if (videoEl) {
            videoEl.style.display = 'block';
            videoEl.src = previewUrl;
          }
          if (posterImg) {
            posterImg.style.display = 'none';
          }
        }

        if (typeof window.updateSelectedAccountsCount === 'function') {
          window.updateSelectedAccountsCount();
        }

        setTimeout(() => {
          if (chip) chip.style.display = 'none';
        }, 1800);

        if (typeof window.showToast === 'function') {
          window.showToast(`Uploaded "${file.name}" to Gallery (${isImage ? 'Post' : 'Reel'})`);
        }
      }
    }, 350);
  };

  // TOGGLE GALLERY / ARCHIVE TABS
  window.toggleGalleryArchive = function (mode, btn) {
    currentGalleryViewMode = mode;
    const tabBtns = document.querySelectorAll('.gallery-center-tab-strip .center-tab-btn');
    tabBtns.forEach(b => b.classList.remove('active'));
    if (btn) {
      btn.classList.add('active');
    } else {
      const targetBtn = document.getElementById(mode === 'archive' ? 'tab-btn-archive' : 'tab-btn-gallery');
      if (targetBtn) targetBtn.classList.add('active');
    }

    const archiveBanner = document.getElementById('archive-info-banner');
    const topCards = document.querySelector('.gallery-top-cards-grid');

    if (mode === 'archive') {
      if (archiveBanner) archiveBanner.style.display = 'flex';
      if (topCards) topCards.style.display = 'none';
      if (typeof window.showToast === 'function') {
        window.showToast('Switched to Archived Reels');
      }
    } else {
      if (archiveBanner) archiveBanner.style.display = 'none';
      if (topCards) topCards.style.display = 'grid';
    }
    renderGalleryGrid();
  };

  // OPEN MEDIA IN SCHEDULER (MATCHING SCREENSHOT)
  window.openMediaInScheduler = function (mediaId) {
    let media = galleryMediaItems.find(m => m.id === mediaId || m.name === mediaId);
    if (!media && typeof currentSelectedMediaId !== 'undefined' && currentSelectedMediaId) {
      media = galleryMediaItems.find(m => m.id === currentSelectedMediaId);
    }
    if (!media && galleryMediaItems.length > 0) {
      media = galleryMediaItems[0];
    }
    if (!media) {
      const bannerTitle = document.getElementById('sched-active-title');
      const activeName = bannerTitle && bannerTitle.textContent ? bannerTitle.textContent.trim() : 'full_page_screenshot.jpeg';
      const isImg = /\.(jpg|jpeg|png|webp|gif|bmp|tiff)$/i.test(activeName) || activeName.toLowerCase().includes('screenshot');
      media = {
        name: activeName,
        type: isImg ? 'image' : 'video',
        autoDmKeyword: 'GROWTH',
        thumbUrl: 'goldfish_reel_thumb.jpg'
      };
    }

    const bannerTitle = document.getElementById('sched-active-title');
    if (bannerTitle) bannerTitle.textContent = media.name;

    const banner = document.getElementById('sched-feedback-banner');
    if (banner) banner.style.display = 'none';

    const postBtn = document.getElementById('btn-post-now-action');
    if (postBtn) {
      postBtn.disabled = false;
      postBtn.textContent = 'Post now';
      postBtn.style.opacity = '1';
    }

    const composeKwInput = document.getElementById('auto-dm-compose-keyword');
    if (composeKwInput) {
      composeKwInput.value = media.autoDmKeyword || 'GROWTH';
    }

    // AUTO-FILL SOCIAL ACCOUNTS & AUTOMATION TARGET BASED ON MEDIA FILE TYPE
    // .mp4, .mov, .webm -> select REEL
    // .jpg, .jpeg, .png, .webp -> select POST
    const nameLower = (media.name || '').toLowerCase();
    const isImageExt = /\.(jpg|jpeg|png|webp|gif|bmp|tiff|svg)$/i.test(nameLower) || nameLower.includes('screenshot');
    const isVideoExt = /\.(mp4|mov|webm|mkv|avi|m4v|3gp)$/i.test(nameLower);

    let isPost = false;
    let isReel = false;
    let isStory = false;

    if (isImageExt || media.type === 'image' || media.type === 'post') {
      isPost = true;
    } else if (isVideoExt || media.type === 'video' || nameLower.includes('reel')) {
      isReel = true;
    } else {
      isPost = true; // default images/posts
    }

    // Update checkboxes and rows
    const chkStories = document.getElementById('chk-acc-stories');
    const chkReels = document.getElementById('chk-acc-reels');
    const chkPosts = document.getElementById('chk-acc-posts');

    if (chkStories) chkStories.checked = isStory;
    if (chkReels) chkReels.checked = isReel;
    if (chkPosts) chkPosts.checked = isPost;

    const rowStories = document.getElementById('row-acc-stories');
    const rowReels = document.getElementById('row-acc-reels');
    const rowPosts = document.getElementById('row-acc-posts');

    if (rowStories) rowStories.classList.toggle('selected', isStory);
    if (rowReels) rowReels.classList.toggle('selected', isReel);
    if (rowPosts) rowPosts.classList.toggle('selected', isPost);

    // TOGGLE VIDEO vs IMAGE IN PREVIEW VIEWPORT
    const posterImg = document.getElementById('sched-poster-img');
    const videoEl = document.getElementById('schedule-video-element');

    if (isPost || isStory || isImageExt) {
      if (videoEl) {
        videoEl.style.display = 'none';
        try { videoEl.pause(); } catch (e) { }
      }
      if (posterImg) {
        posterImg.style.display = 'block';
        posterImg.src = media.thumbUrl || 'goldfish_reel_thumb.jpg';
      }
    } else {
      if (videoEl) {
        videoEl.style.display = 'block';
        if (media.thumbUrl && !media.thumbUrl.startsWith('data:image')) {
          videoEl.src = media.thumbUrl;
        }
      }
      if (posterImg) {
        posterImg.style.display = 'none';
      }
    }

    // Switch to scheduler sub-tab
    window.switchReelsSubTab('schedule');

    if (typeof window.syncSchedulerAccountsToActiveUser === 'function') {
      window.syncSchedulerAccountsToActiveUser();
    } else if (typeof window.updateSelectedAccountsCount === 'function') {
      window.updateSelectedAccountsCount();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window.showToast === 'function') {
      window.showToast(`Opened "${media.name}" in Post Scheduler`);
    }
  };

  // =========================================================================
  // SCHEDULER CANCEL / BACK CONFIRMATION HANDLERS
  // =========================================================================
  window.promptCancelSchedule = function () {
    const modal = document.getElementById('modal-cancel-schedule-confirm');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  };

  window.closeCancelScheduleModal = function () {
    const modal = document.getElementById('modal-cancel-schedule-confirm');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  };

  window.confirmCancelSchedule = function () {
    window.closeCancelScheduleModal();
    window.switchReelsSubTab('gallery');
    if (typeof window.showToast === 'function') {
      window.showToast('Returned to Gallery');
    }
  };

  window.toggleSocialDropdown = function (e) {
    const list = document.getElementById('social-grouped-list');
    if (list) {
      list.style.display = list.style.display === 'none' ? 'block' : 'none';
    }
  };

  // TOGGLE SOCIAL ACCOUNT & AUTO-SYNC AUTOMATION TARGET
  window.toggleSocialAccountSelection = function (platform) {
    const chkStories = document.getElementById('chk-acc-stories');
    const chkReels = document.getElementById('chk-acc-reels');
    const chkPosts = document.getElementById('chk-acc-posts');

    const rowStories = document.getElementById('row-acc-stories');
    const rowReels = document.getElementById('row-acc-reels');
    const rowPosts = document.getElementById('row-acc-posts');

    if (rowStories && chkStories) rowStories.classList.toggle('selected', chkStories.checked);
    if (rowReels && chkReels) rowReels.classList.toggle('selected', chkReels.checked);
    if (rowPosts && chkPosts) rowPosts.classList.toggle('selected', chkPosts.checked);

    window.updateSelectedAccountsCount();
  };

  window.updateSelectedAccountsCount = function () {
    const chkStories = document.getElementById('chk-acc-stories');
    const chkReels = document.getElementById('chk-acc-reels');
    const chkPosts = document.getElementById('chk-acc-posts');

    const isStories = chkStories ? chkStories.checked : false;
    const isReels = chkReels ? chkReels.checked : false;
    const isPosts = chkPosts ? chkPosts.checked : false;

    const count = (isStories ? 1 : 0) + (isReels ? 1 : 0) + (isPosts ? 1 : 0);
    const badge = document.getElementById('selected-accounts-count-badge');
    if (badge) {
      badge.textContent = `${count} selected`;
    }

    // Render chips in search bar with active handle and avatar
    const chipsContainer = document.getElementById('selected-account-chips');
    if (chipsContainer) {
      const activeUser = (typeof window.getActiveUserData === 'function' ? window.getActiveUserData() : null) || {};
      const profile = (activeUser && activeUser.profile) ? activeUser.profile : {};
      const activeHandle = (profile.insta)
        ? profile.insta.replace(/^@/, '')
        : (profile.name ? profile.name.toLowerCase().replace(/[^a-z0-9_]/g, '_') : 'render6457');

      const avatarUrl = profile.avatar || '';
      const avatarStyle = avatarUrl ? `style="background-image: url('${avatarUrl}'); background-size: cover; background-position: center;"` : '';
      const realIgSvg = `<svg class="chip-ig-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><circle cx="12" cy="12" r="4"></circle><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;

      let chipsHtml = '';
      if (isStories) {
        chipsHtml += `
          <div class="sched-account-chip">
            <div class="chip-avatar-img" ${avatarStyle}></div>
            <span class="chip-name">${activeHandle} (Story)</span>
            ${realIgSvg}
            <button type="button" class="chip-close-x" onclick="event.stopPropagation(); document.getElementById('chk-acc-stories').checked = false; window.toggleSocialAccountSelection('stories');">×</button>
          </div>
        `;
      }
      if (isReels) {
        chipsHtml += `
          <div class="sched-account-chip">
            <div class="chip-avatar-img" ${avatarStyle}></div>
            <span class="chip-name">${activeHandle} (Reel)</span>
            ${realIgSvg}
            <button type="button" class="chip-close-x" onclick="event.stopPropagation(); document.getElementById('chk-acc-reels').checked = false; window.toggleSocialAccountSelection('reels');">×</button>
          </div>
        `;
      }
      if (isPosts) {
        chipsHtml += `
          <div class="sched-account-chip">
            <div class="chip-avatar-img" ${avatarStyle}></div>
            <span class="chip-name">${activeHandle} (Post)</span>
            ${realIgSvg}
            <button type="button" class="chip-close-x" onclick="event.stopPropagation(); document.getElementById('chk-acc-posts').checked = false; window.toggleSocialAccountSelection('posts');">×</button>
          </div>
        `;
      }
      if (!chipsHtml) {
        chipsHtml = `<span style="color: #94a3b8; font-size: 13px;">Select accounts...</span>`;
      }
      chipsContainer.innerHTML = chipsHtml;
    }

    // DYNAMICALLY POPULATE "CHOOSE WHERE THIS AUTOMATION SHOULD APPLY"
    const targetSelect = document.getElementById('auto-dm-target-media-type');
    if (targetSelect) {
      const bannerTitle = document.getElementById('sched-active-title');
      const activeName = (bannerTitle ? bannerTitle.textContent : '').toLowerCase();
      const isImg = /\.(jpg|jpeg|png|webp|gif|bmp|tiff|svg)$/i.test(activeName) || activeName.includes('screenshot');
      const isVid = /\.(mp4|mov|webm|mkv|avi|m4v)$/i.test(activeName) || activeName.includes('reel');

      const options = [];
      let defaultVal = 'POST';

      if (count > 1) {
        options.push(`<option value="ALL">ALL SELECTED PLATFORMS (${count})</option>`);
      }
      options.push(`<option value="POST">POST</option>`);
      options.push(`<option value="REEL">REEL</option>`);
      options.push(`<option value="STORY">STORY</option>`);
      if (count <= 1) {
        options.push(`<option value="ALL">ALL MEDIA</option>`);
      }

      if (count > 1) {
        defaultVal = 'ALL';
      } else if (isPosts) {
        defaultVal = 'POST';
      } else if (isReels) {
        defaultVal = 'REEL';
      } else if (isStories) {
        defaultVal = 'STORY';
      } else if (isImg) {
        defaultVal = 'POST';
      } else if (isVid) {
        defaultVal = 'REEL';
      }

      targetSelect.innerHTML = options.join('');
      targetSelect.value = defaultVal;
    }
  };

  // SYNC SCHEDULER SOCIAL ACCOUNTS TO ACTIVE USER
  window.syncSchedulerAccountsToActiveUser = function () {
    const activeUser = (typeof window.getActiveUserData === 'function' ? window.getActiveUserData() : null) || {};
    const profile = (activeUser && activeUser.profile) ? activeUser.profile : {};
    const activeHandle = (profile.insta)
      ? profile.insta.replace(/^@/, '')
      : (profile.name ? profile.name.toLowerCase().replace(/[^a-z0-9_]/g, '_') : 'render6457');
    const avatarUrl = profile.avatar || '';

    document.querySelectorAll('#social-grouped-list .acc-handle-text').forEach(el => {
      el.textContent = activeHandle;
    });

    document.querySelectorAll('#social-grouped-list .acc-globe-avatar').forEach(el => {
      if (avatarUrl) {
        el.style.backgroundImage = `url('${avatarUrl}')`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    });

    if (typeof window.updateSelectedAccountsCount === 'function') {
      window.updateSelectedAccountsCount();
    }
  };

  // EXECUTE POST NOW (EXACT REPLICA OF USER SCREENSHOT)
  window.executePostNow = function () {
    const banner = document.getElementById('sched-feedback-banner');
    const postBtn = document.getElementById('btn-post-now-action');
    const actList = document.getElementById('scheduling-activity-list');
    const cardActivity = document.getElementById('card-scheduling-activity');
    const bannerTitle = document.getElementById('sched-active-title');
    const title = bannerTitle ? bannerTitle.textContent : 'Digiproducthub (15)';

    const activeUser = (typeof window.getActiveUserData === 'function' ? window.getActiveUserData() : null) || {};
    const activeHandle = (activeUser.profile && activeUser.profile.insta)
      ? activeUser.profile.insta
      : '@render6457';

    // Show feedback banner matching screenshot
    if (banner) {
      banner.style.display = 'block';
    }

    // Disable post now button
    if (postBtn) {
      postBtn.disabled = true;
      postBtn.textContent = 'Commands sent';
    }

    // Reveal scheduling activity card if hidden
    if (cardActivity) {
      cardActivity.style.display = 'block';
    }

    // Prepend activity amber card
    if (actList) {
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' ').substring(0, 19);
      const newCard = document.createElement('div');
      newCard.className = 'activity-amber-card';
      newCard.innerHTML = `
        <div class="activity-amber-left">
          <svg class="ig-pink-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <div>
            <div class="activity-name-row">
              <span class="activity-type-label">Instagram Post</span>
              <span class="activity-handle-label">${activeHandle}</span>
            </div>
            <div class="activity-time-label">Scheduled for ${dateStr}</div>
          </div>
        </div>
        <span class="activity-amber-pill">In progress</span>
      `;
      actList.insertBefore(newCard, actList.firstChild);
    }

    if (typeof window.showToast === 'function') {
      window.showToast(`Scheduling commands sent for "${title}"`);
    }
  };

  // =========================================================================
  // NEW AUTO-DM BUILDER LOGIC (MATCHING USER IMAGES 2, 3, 4)
  // =========================================================================
  const AUTO_DM_TEMPLATES = {
    guide: {
      triggerType: 'specific',
      keyword: 'GUIDE',
      publicReply: 'Just sent it to your DMs! ✨',
      dmResponse: 'Thanks for commenting! Here is the link to download your Free E-Book:\nhttps://renderreply.com/download-guide',
      attachProduct: true,
      productName: 'Free Guide Download',
      productDesc: 'Click below to download',
      productUrl: 'https://renderreply.com/guide.pdf',
      followGate: true,
      collectLeads: false
    },
    pricing: {
      triggerType: 'specific',
      keyword: 'PRICING',
      publicReply: 'Sent you our complete pricing tiers! 🚀',
      dmResponse: 'Here are all our pricing options and subscription tiers:\nhttps://renderreply.com/pricing',
      attachProduct: true,
      productName: 'RenderReply Pro Plan',
      productDesc: 'Choose your growth tier',
      productUrl: 'https://renderreply.com/pricing',
      followGate: true,
      collectLeads: false
    },
    audit: {
      triggerType: 'specific',
      keyword: 'AUDIT',
      publicReply: 'Sent you the 1-on-1 strategy call booking link! 📅',
      dmResponse: 'Here is the calendar link for your free 1-on-1 strategy call:\nhttps://renderreply.com/book-audit',
      attachProduct: true,
      productName: '1-on-1 Strategy Call Audit',
      productDesc: 'Book a free 20-min strategy session',
      productUrl: 'https://renderreply.com/book-audit',
      followGate: true,
      collectLeads: true
    },
    checklist: {
      triggerType: 'specific',
      keyword: 'CHECKLIST',
      publicReply: 'Check your inbox for the cheat sheet! 📄',
      dmResponse: 'Here is your free Creator Checklist PDF:\nhttps://renderreply.com/checklist.pdf',
      attachProduct: true,
      productName: 'Free Checklist PDF',
      productDesc: 'Download your cheat sheet',
      productUrl: 'https://renderreply.com/checklist.pdf',
      followGate: true,
      collectLeads: false
    },
    webinar: {
      triggerType: 'specific',
      keyword: 'WEBINAR',
      publicReply: "You're registered! Sent you the masterclass link 🎓",
      dmResponse: 'Here is your VIP ticket for the live training masterclass:\nhttps://renderreply.com/webinar',
      attachProduct: true,
      productName: 'Live Webinar VIP Pass',
      productDesc: 'Join the live training session',
      productUrl: 'https://renderreply.com/webinar',
      followGate: true,
      collectLeads: true
    },
    shop: {
      triggerType: 'specific',
      keyword: 'SHOP',
      publicReply: 'Sent you the store discount link! 🛍️',
      dmResponse: 'Here is your exclusive 20% discount link to our shop:\nhttps://renderreply.com/shop',
      attachProduct: true,
      productName: 'StanStore 20% Off Collection',
      productDesc: 'Shop creator products',
      productUrl: 'https://renderreply.com/shop',
      followGate: true,
      collectLeads: false
    },
    reserve: {
      triggerType: 'specific',
      keyword: 'RESERVE',
      publicReply: 'Sent you the VIP demo reservation! ⚡',
      dmResponse: 'Here is your interactive demo reservation link:\nhttps://renderreply.com/demo',
      attachProduct: true,
      productName: 'VIP Live Demo Pass',
      productDesc: 'Interactive live walkthrough',
      productUrl: 'https://renderreply.com/demo',
      followGate: true,
      collectLeads: true
    }
  };

  window.switchAutoDmBuilderMode = function (mode) {
    const btnCreate = document.getElementById('btn-mode-create-own');
    const btnTpl = document.getElementById('btn-mode-use-template');
    const tplPickerWrap = document.getElementById('auto-dm-template-picker-wrap');

    if (mode === 'template') {
      if (btnTpl) btnTpl.classList.add('active');
      if (btnCreate) btnCreate.classList.remove('active');
      if (tplPickerWrap) tplPickerWrap.style.display = 'block';

      const picker = document.getElementById('auto-dm-template-picker');
      const selectedTplKey = picker ? picker.value : 'guide';
      window.handleTemplatePickerChange(selectedTplKey);
    } else {
      if (btnCreate) btnCreate.classList.add('active');
      if (btnTpl) btnTpl.classList.remove('active');
      if (tplPickerWrap) tplPickerWrap.style.display = 'none';

      // Clear/Reset for custom creation (Image 3)
      window.setAutoDmTriggerType('specific');
      const kwInput = document.getElementById('auto-dm-compose-keyword');
      if (kwInput) kwInput.value = '';

      const pubReply = document.getElementById('auto-dm-public-reply');
      if (pubReply) pubReply.value = '';

      const dmResp = document.getElementById('auto-dm-dm-response');
      if (dmResp) dmResp.value = '';

      const attachToggle = document.getElementById('auto-dm-attach-product-toggle');
      if (attachToggle) {
        attachToggle.checked = false;
        window.toggleAutoDmProductFields(false);
      }

      const followToggle = document.getElementById('auto-dm-follow-gate-toggle');
      if (followToggle) followToggle.checked = false;

      const leadsToggle = document.getElementById('auto-dm-collect-leads-toggle');
      if (leadsToggle) leadsToggle.checked = false;
    }
  };

  window.handleTemplatePickerChange = function (templateKey) {
    const tpl = AUTO_DM_TEMPLATES[templateKey] || AUTO_DM_TEMPLATES.guide;

    window.setAutoDmTriggerType(tpl.triggerType);

    const kwInput = document.getElementById('auto-dm-compose-keyword');
    if (kwInput) kwInput.value = tpl.keyword;

    const pubReply = document.getElementById('auto-dm-public-reply');
    if (pubReply) pubReply.value = tpl.publicReply;

    const dmResp = document.getElementById('auto-dm-dm-response');
    if (dmResp) dmResp.value = tpl.dmResponse;

    const attachToggle = document.getElementById('auto-dm-attach-product-toggle');
    if (attachToggle) {
      attachToggle.checked = !!tpl.attachProduct;
      window.toggleAutoDmProductFields(attachToggle.checked);
    }

    const prodName = document.getElementById('auto-dm-product-name');
    if (prodName) prodName.value = tpl.productName || '';

    const prodDesc = document.getElementById('auto-dm-product-desc');
    if (prodDesc) prodDesc.value = tpl.productDesc || '';

    const prodUrl = document.getElementById('auto-dm-product-url');
    if (prodUrl) prodUrl.value = tpl.productUrl || '';

    const followToggle = document.getElementById('auto-dm-follow-gate-toggle');
    if (followToggle) followToggle.checked = !!tpl.followGate;

    const leadsToggle = document.getElementById('auto-dm-collect-leads-toggle');
    if (leadsToggle) leadsToggle.checked = !!tpl.collectLeads;

    if (typeof window.showToast === 'function') {
      window.showToast(`Loaded template: ${templateKey.toUpperCase()}`);
    }
  };

  window.setAutoDmTriggerType = function (type) {
    const btnSpecific = document.getElementById('trigger-type-btn-specific');
    const btnAny = document.getElementById('trigger-type-btn-any');
    const kwCol = document.getElementById('trigger-keywords-field-col');

    if (type === 'any') {
      if (btnAny) btnAny.classList.add('active');
      if (btnSpecific) btnSpecific.classList.remove('active');
      if (kwCol) {
        kwCol.style.opacity = '0.5';
        kwCol.style.pointerEvents = 'none';
      }
    } else {
      if (btnSpecific) btnSpecific.classList.add('active');
      if (btnAny) btnAny.classList.remove('active');
      if (kwCol) {
        kwCol.style.opacity = '1';
        kwCol.style.pointerEvents = 'auto';
      }
    }
  };

  window.toggleAutoDmProductFields = function (isShown) {
    const box = document.getElementById('auto-dm-product-expanded-box');
    if (box) {
      box.style.display = isShown ? 'flex' : 'none';
    }
  };

  window.confirmAutoDmSelection = function () {
    const targetType = document.getElementById('auto-dm-target-media-type')?.value || 'REEL';
    const formPane = document.getElementById('auto-dm-editor-form-pane');
    if (formPane) {
      formPane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (typeof window.showToast === 'function') {
      window.showToast(`Target set to ${targetType}. Configure responses below.`);
    }
  };

  window.saveCreatedAutomation = function () {
    const kwInput = document.getElementById('auto-dm-compose-keyword');
    const kwVal = (kwInput ? kwInput.value.trim() : '') || 'GROWTH';

    // If an active media item is selected, update it
    if (currentSelectedMediaId) {
      const media = galleryMediaItems.find(m => m.id === currentSelectedMediaId);
      if (media) {
        media.autoDmKeyword = kwVal.replace(/^#/, '').toUpperCase();
      }
    }

    if (typeof window.showToast === 'function') {
      window.showToast(`Automation active on keyword: #${kwVal.replace(/^#/, '').toUpperCase()}`);
    }
  };

  window.handleAutoDmKeywordInput = function (val) {
    // optional live keyword handler
  };

  window.testAutoDmOnCurrentPost = function () {
    const input = document.getElementById('auto-dm-compose-keyword');
    const kw = input ? input.value.replace(/^#+/, '').trim() : 'GROWTH';
    const modal = document.getElementById('modal-reels-test-dm-backdrop');
    if (modal) {
      window.openReelsModal('modal-reels-test-dm-backdrop');
      const simInput = document.getElementById('sim-comment-text');
      if (simInput) simInput.value = `Please send me ${kw}! 🙌`;
    } else {
      if (typeof window.showToast === 'function') {
        window.showToast(`Comment-to-DM simulated successfully for #${kw}`);
      }
    }
  };

  // =========================================================================
  // SAVE AUTO-DM SETTINGS
  // =========================================================================
  window.saveAutoDmSettings = function () {
    const keywordInput = document.getElementById('auto-dm-compose-keyword');
    const templateSelect = document.getElementById('auto-dm-template-select');
    const keyword = keywordInput ? keywordInput.value.replace(/^#+/, '').trim() : '';
    const template = templateSelect ? templateSelect.options[templateSelect.selectedIndex].text : '';
    const btn = document.getElementById('btn-save-auto-dm');

    if (!keyword) {
      if (typeof window.showToast === 'function') {
        window.showToast('Please enter a trigger keyword before saving.');
      }
      return;
    }

    // Animate save button
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="chip-spinner-icon" style="width: 14px; height: 14px; border-width: 2px; border-color: #fff transparent #fff transparent;"></span> <span>Saving...</span>';
    }

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <span>Saved!</span>';
        btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
      }

      if (typeof window.showToast === 'function') {
        window.showToast(`Auto-DM saved! Keyword: #${keyword.toUpperCase()} → ${template}`);
      }

      // Reset button after 2s
      setTimeout(() => {
        if (btn) {
          btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> <span>Save</span>';
          btn.style.background = 'linear-gradient(135deg, #7c3aed, #a855f7)';
        }
      }, 2000);
    }, 600);
  };

  // =========================================================================
  // CREATE DM TEMPLATE MODAL (BLACK & WHITE THEME + TRIGGER MODES)
  // =========================================================================
  window._currentDmTriggerMode = 'custom';

  window.setDmTriggerMode = function (mode) {
    window._currentDmTriggerMode = mode;
    const btnCustom = document.getElementById('trigger-mode-custom');
    const btnEmoji = document.getElementById('trigger-mode-emoji');
    const btnAll = document.getElementById('trigger-mode-all');
    const panelCustom = document.getElementById('trigger-panel-custom');
    const panelEmoji = document.getElementById('trigger-panel-emoji');
    const panelAll = document.getElementById('trigger-panel-all');

    if (btnCustom) btnCustom.classList.toggle('active', mode === 'custom');
    if (btnEmoji) btnEmoji.classList.toggle('active', mode === 'emoji');
    if (btnAll) btnAll.classList.toggle('active', mode === 'all');

    if (panelCustom) panelCustom.style.display = mode === 'custom' ? 'block' : 'none';
    if (panelEmoji) panelEmoji.style.display = mode === 'emoji' ? 'block' : 'none';
    if (panelAll) panelAll.style.display = mode === 'all' ? 'block' : 'none';

    if (mode === 'custom') {
      const input = document.getElementById('new-dm-trigger-word');
      if (input) setTimeout(() => input.focus(), 50);
    } else if (mode === 'emoji') {
      const input = document.getElementById('new-dm-trigger-emoji');
      if (input) setTimeout(() => input.focus(), 50);
    }
  };

  window.selectDmIconEmoji = function (emoji, btn) {
    const input = document.getElementById('new-dm-tpl-emoji');
    if (input) input.value = emoji;
    const container = document.getElementById('dm-icon-emoji-presets');
    if (container) {
      container.querySelectorAll('.dm-bw-emoji-chip').forEach(c => c.classList.remove('active'));
    }
    if (btn) btn.classList.add('active');
  };

  window.selectDmTriggerEmoji = function (emoji, btn) {
    const input = document.getElementById('new-dm-trigger-emoji');
    if (input) input.value = emoji;
    const container = document.getElementById('dm-trigger-emoji-presets');
    if (container) {
      container.querySelectorAll('.dm-bw-emoji-chip').forEach(c => c.classList.remove('active'));
    }
    if (btn) btn.classList.add('active');
  };

  window.setTriggerWordValue = function (word) {
    const input = document.getElementById('new-dm-trigger-word');
    if (input) {
      input.value = word;
      input.focus();
    }
  };

  window.insertTplVar = function (tag) {
    const textarea = document.getElementById('new-dm-tpl-body');
    if (!textarea) return;
    const start = textarea.selectionStart || textarea.value.length;
    const end = textarea.selectionEnd || textarea.value.length;
    const val = textarea.value;
    textarea.value = val.substring(0, start) + tag + val.substring(end);
    textarea.focus();
    const newPos = start + tag.length;
    textarea.setSelectionRange(newPos, newPos);
  };

  window.openCreateDmTemplateModal = function () {
    const modal = document.getElementById('modal-create-dm-template');
    if (modal) {
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);

      // Reset form
      const nameInput = document.getElementById('new-dm-tpl-name');
      const emojiInput = document.getElementById('new-dm-tpl-emoji');
      const triggerWord = document.getElementById('new-dm-trigger-word');
      const triggerEmoji = document.getElementById('new-dm-trigger-emoji');
      const bodyInput = document.getElementById('new-dm-tpl-body');
      const linkInput = document.getElementById('new-dm-tpl-link');

      if (nameInput) nameInput.value = '';
      if (emojiInput) emojiInput.value = '📦';
      if (triggerWord) triggerWord.value = 'GROWTH';
      if (triggerEmoji) triggerEmoji.value = '🔥';
      if (bodyInput) bodyInput.value = 'Hey {first_name}! Here is your free resource: {link}';
      if (linkInput) linkInput.value = '';

      window.setDmTriggerMode('custom');
      if (nameInput) setTimeout(() => nameInput.focus(), 60);
    }
  };

  window.closeCreateDmTemplateModal = function () {
    const modal = document.getElementById('modal-create-dm-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 200);
    }
  };

  window.confirmCreateDmTemplate = function () {
    const name = (document.getElementById('new-dm-tpl-name')?.value || '').trim();
    const emoji = (document.getElementById('new-dm-tpl-emoji')?.value || '📦').trim();
    const body = (document.getElementById('new-dm-tpl-body')?.value || '').trim();
    const link = (document.getElementById('new-dm-tpl-link')?.value || '').trim();
    const mode = window._currentDmTriggerMode || 'custom';

    if (!name) {
      if (typeof window.showToast === 'function') {
        window.showToast('Please enter a Template Name.');
      }
      return;
    }

    let triggerVal = '';
    if (mode === 'custom') {
      triggerVal = (document.getElementById('new-dm-trigger-word')?.value || '').replace(/^#+/, '').trim().toUpperCase();
      if (!triggerVal) {
        if (typeof window.showToast === 'function') {
          window.showToast('Please enter a Custom Trigger Keyword.');
        }
        return;
      }
    } else if (mode === 'emoji') {
      triggerVal = (document.getElementById('new-dm-trigger-emoji')?.value || '').trim();
      if (!triggerVal) {
        if (typeof window.showToast === 'function') {
          window.showToast('Please select or enter a Trigger Keyword.');
        }
        return;
      }
    } else {
      triggerVal = '*'; // All comments
    }

    if (!body) {
      if (typeof window.showToast === 'function') {
        window.showToast('Please enter a DM message body.');
      }
      return;
    }

    // Generate unique value
    const tplValue = 'tpl-custom-' + Date.now();

    // Add to the dropdown
    const select = document.getElementById('auto-dm-template-select');
    if (select) {
      const option = document.createElement('option');
      option.value = tplValue;
      option.textContent = `${emoji} ${name}`;
      option.dataset.body = body;
      option.dataset.link = link;
      option.dataset.triggerMode = mode;
      option.dataset.triggerVal = triggerVal;
      select.appendChild(option);
      select.value = tplValue;
    }

    // Auto update trigger keyword in compose card
    const composeKwInput = document.getElementById('auto-dm-compose-keyword');
    if (composeKwInput) {
      if (mode === 'custom') {
        composeKwInput.value = triggerVal;
      } else if (mode === 'emoji') {
        composeKwInput.value = triggerVal;
      } else {
        composeKwInput.value = 'ALL';
      }
      if (typeof window.handleAutoDmKeywordInput === 'function') {
        window.handleAutoDmKeywordInput(composeKwInput.value);
      }
    }

    window.closeCreateDmTemplateModal();

    if (typeof window.showToast === 'function') {
      const triggerLabel = mode === 'all' ? 'All Comments' : `${triggerVal}`;
      window.showToast(`✅ DM Template "${name}" created! (Trigger: ${triggerLabel})`);
    }
  };

  // =========================================================================
  // DATE & TIME PICKER INITIALIZATION
  // =========================================================================
  function initDateTimePicker() {
    const dtInput = document.getElementById('sched-datetime-display');
    if (!dtInput) return;

    // Set default to current time + 1 hour (rounded to nearest 15 min)
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);

    // Format as YYYY-MM-DDTHH:MM for datetime-local input
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    dtInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;

    // Set min to current time (prevent scheduling in the past)
    const nowMin = new Date();
    const minYear = nowMin.getFullYear();
    const minMonth = String(nowMin.getMonth() + 1).padStart(2, '0');
    const minDay = String(nowMin.getDate()).padStart(2, '0');
    const minHours = String(nowMin.getHours()).padStart(2, '0');
    const minMinutes = String(nowMin.getMinutes()).padStart(2, '0');
    dtInput.min = `${minYear}-${minMonth}-${minDay}T${minHours}:${minMinutes}`;

    // Listen for changes
    dtInput.addEventListener('change', function () {
      const selected = new Date(this.value);
      if (selected < new Date()) {
        if (typeof window.showToast === 'function') {
          window.showToast('Cannot schedule in the past. Adjusted to now.');
        }
        const adjusted = new Date();
        adjusted.setMinutes(adjusted.getMinutes() + 5, 0, 0);
        const aY = adjusted.getFullYear();
        const aM = String(adjusted.getMonth() + 1).padStart(2, '0');
        const aD = String(adjusted.getDate()).padStart(2, '0');
        const aH = String(adjusted.getHours()).padStart(2, '0');
        const aMi = String(adjusted.getMinutes()).padStart(2, '0');
        this.value = `${aY}-${aM}-${aD}T${aH}:${aMi}`;
      }
    });
  }

  // Initialize datetime on load
  setTimeout(initDateTimePicker, 150);

  function renderSchedulingActivityList() {
    const listEl = document.getElementById('scheduling-activity-list');
    if (!listEl) return;

    listEl.innerHTML = schedulingActivityList.map(act => `
      <div class="activity-item-card">
        <div class="activity-main-info">
          <span class="activity-platform-badge">${act.platform}</span>
          <div>
            <div class="activity-title-text">${act.mediaName}</div>
            <div style="font-size: 11.5px; color: #64748b;">${act.time}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="activity-status-pill ${act.status}">
            ${act.status === 'in-progress'
        ? '<span class="chip-spinner-icon" style="width: 10px; height: 10px; border-width: 1.5px;"></span>'
        : '✓'}
            ${act.statusText}
          </span>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // BULK SCHEDULING
  // =========================================================================
  window.downloadBulkTemplate = function () {
    const csvContent = "data:text/csv;charset=utf-8,Media_Filename,Platforms,Caption,Auto_DM_Keyword,Scheduled_Date_Time\n"
      + "product_launch_15s.mp4,Instagram Reels,Automate your sales with RenderReply,GROWTH,2026-09-08 18:30\n"
      + "store_showcase_08s.mp4,Instagram Stories,Get 20% off our creator store,STORE,2026-09-09 12:00\n"
      + "viral_hook_30s.mp4,Instagram Reels|Instagram Stories,3 secrets to viral DMs,BLUEPRINT,2026-09-10 15:45\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "renderreply_bulk_schedule_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (typeof window.showToast === 'function') {
      window.showToast('Downloaded Bulk Schedule CSV Template');
    }
  };

  // =========================================================================
  // PROCEDURAL 9:16 VERTICAL VIDEO CANVAS ENGINE
  // =========================================================================
  function startProceduralCanvas(presetId = 1) {
    const canvas = document.getElementById('reels-procedural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvasAnimationId) {
      cancelAnimationFrame(canvasAnimationId);
    }

    const videoEl = document.getElementById('reels-video-element');
    if (videoEl) {
      videoEl.style.display = 'none';
    }
    canvas.style.display = 'block';

    const preset = samplePresets[presetId] || samplePresets[1];
    let step = 0;

    function renderFrame() {
      if (!isPlaying) {
        canvasAnimationId = requestAnimationFrame(renderFrame);
        return;
      }

      step += 0.02;
      const w = canvas.width;
      const h = canvas.height;

      // Dynamic Gradient Background
      const grad = ctx.createLinearGradient(0, 0, w * 0.8, h);
      grad.addColorStop(0, preset.bgGradient[0] || '#0f172a');
      grad.addColorStop(0.5, preset.bgGradient[1] || '#3b0764');
      grad.addColorStop(1, preset.bgGradient[2] || '#0284c7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Ambient Glowing Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Animated Wave Particles
      for (let i = 0; i < 24; i++) {
        const px = (Math.sin(step + i * 0.6) * 0.5 + 0.5) * w;
        const py = ((step * 40 + i * 28) % h);
        const radius = Math.sin(step + i) * 3 + 4;
        const alpha = Math.sin(step * 0.5 + i) * 0.3 + 0.3;

        ctx.fillStyle = `rgba(192, 132, 252, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Animated Sound Wave in Center
      const waveY = h * 0.52;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 30; x < w - 30; x += 6) {
        const dy = Math.sin(x * 0.05 + step * 3) * 24 * Math.sin((x / w) * Math.PI);
        if (x === 30) ctx.moveTo(x, waveY + dy);
        else ctx.lineTo(x, waveY + dy);
      }
      ctx.stroke();

      // Creator Watermark Badge in Canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.roundRect(w / 2 - 70, h * 0.38, 140, 36, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('RenderReply Live', w / 2, h * 0.38 + 22);

      // Scrubber progress update if simulated
      const scrubber = document.getElementById('reels-scrubber');
      const scrubberFill = document.getElementById('reels-scrubber-fill');
      const timecode = document.getElementById('reels-timecode-display');

      const currentTimeVal = (step * 2) % 30;
      if (scrubber) scrubber.value = currentTimeVal;
      if (scrubberFill) scrubberFill.style.width = `${(currentTimeVal / 30) * 100}%`;
      if (timecode) {
        const secStr = Math.floor(currentTimeVal).toString().padStart(2, '0');
        timecode.textContent = `00:${secStr} / 00:30`;
      }

      canvasAnimationId = requestAnimationFrame(renderFrame);
    }

    renderFrame();
  }

  // PLAYBACK & MEDIA CONTROLLERS
  function updatePlayIcons(playing) {
    const ctrlPlayIcon = document.getElementById('reels-ctrl-play-icon');
    const centerPlayBtn = document.getElementById('reels-play-center-btn');
    if (ctrlPlayIcon) {
      ctrlPlayIcon.innerHTML = playing
        ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
        : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    }
    if (centerPlayBtn) {
      centerPlayBtn.style.opacity = playing ? '0' : '0.9';
    }
  }

  // ACCORDIONS, TRIMMING & SPEED
  window.toggleReelsAccordion = function (headEl) {
    if (!headEl) return;
    const body = headEl.nextElementSibling;
    if (body) {
      body.classList.toggle('open');
    }
  };

  // VISUAL COLOR FILTERS
  window.updateLiveFilterAdjustment = function () {
    const b = document.getElementById('filter-brightness')?.value || 100;
    const c = document.getElementById('filter-contrast')?.value || 100;
    const s = document.getElementById('filter-saturate')?.value || 100;
    const sepia = document.getElementById('filter-sepia')?.value || 0;

    const filterString = `brightness(${b}%) contrast(${c}%) saturate(${s}%) sepia(${sepia}%)`;

    const videoEl = document.getElementById('reels-video-element');
    const canvas = document.getElementById('reels-procedural-canvas');
    if (videoEl) videoEl.style.filter = filterString;
    if (canvas) canvas.style.filter = filterString;
  };

  // ON-SCREEN TEXT OVERLAYS & HOOK BADGES
  window.updateOverlayText = function (val) {
    const preview = document.getElementById('reels-text-content-preview');
    if (preview) {
      preview.textContent = val || 'Your Viral Reel Hook Here';
    }
  };

  // AUDIO SELECTION
  window.selectReelAudio = function (trackId, title, item) {
    const items = document.querySelectorAll('.audio-track-item');
    items.forEach(i => i.classList.remove('active'));
    if (item) item.classList.add('active');

    const soundTitle = document.getElementById('reels-ig-sound-title');
    if (soundTitle) soundTitle.textContent = title;

    if (typeof window.showToast === 'function') {
      window.showToast(`Audio selected: ${title}`);
    }
  };

  // AI CAPTION & HASHTAGS GENERATOR
  const aiCaptionsByTone = {
    viral: "STOP SCROLLING 🚨 If you're not automating your Instagram DMs in 2026, you're missing out on 80% of your warm sales.\n\nComment GROWTH below and my automated system will send you the 3-step setup guide instantly! 🚀\n\n#creatoreconomy #dmautomation #viralreels #growthhacks #renderreply",
    edu: "Here is the exact step-by-step breakdown of how creators automate $10K+ per month using simple comment triggers:\n\n1. Post a high-value Reel\n2. Give a clear 1-word CTA (e.g. 'GROWTH')\n3. Deliver value in DMs within 2 seconds\n\nComment GROWTH for the full checklist! 📚\n\n#socialmediatips #marketingtips #growthstrategy #creators",
    sales: "Ready to turn your followers into paying clients on autopilot? 💰\n\nComment GROWTH below to get instant access to our Creator Launch Toolkit with a special 20% discount code included!\n\n#digitalproducts #creatorbusiness #monetization #onlinebusiness",
    story: "Two months ago I was spending 4 hours every single day copy-pasting the same link in Instagram DMs. Then I turned on RenderReply automation.\n\nComment GROWTH and I'll send you the exact playbook that saved my sanity! ✨\n\n#entrepreneurship #solopreneur #creativelife #automation"
  };

  // PUBLISHING & SCHEDULING MODALS
  window.openReelPublishModal = function (mode = 'publish') {
    const modal = document.getElementById('modal-reels-publish-backdrop');
    if (modal) modal.classList.add('active');
  };

  // COMMENT-TO-DM SIMULATOR
  window.openReelTestDmModal = function (event) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('modal-reels-test-dm-backdrop');
    if (modal) modal.classList.add('active');
  };

  // REELS ANALYTICS CHART
  function renderReelsAnalyticsChart() {
    const container = document.getElementById('reels-analytics-chart');
    if (!container) return;

    const reachPoints = [42, 68, 85, 92, 120, 145, 182];
    const dmPoints = [8, 14, 21, 26, 34, 41, 52];
    const xLabels = ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'];

    const numPoints = xLabels.length;
    const paddingLeft = 36;
    const paddingRight = 480;
    const availableWidth = paddingRight - paddingLeft;
    const step = availableWidth / (numPoints - 1);

    const maxY = 200;
    const chartTop = 20;
    const chartBottom = 150;
    const chartHeight = chartBottom - chartTop;

    function getY(val) {
      return chartBottom - (val / maxY) * chartHeight;
    }

    const reachY = reachPoints.map(getY);
    const dmY = dmPoints.map(getY);

    let pathReach = `M ${paddingLeft} ${reachY[0]}`;
    let pathDm = `M ${paddingLeft} ${dmY[0]}`;

    for (let i = 1; i < numPoints; i++) {
      const x = paddingLeft + i * step;
      pathReach += ` L ${x} ${reachY[i]}`;
      pathDm += ` L ${x} ${dmY[i]}`;
    }

    const areaReach = `${pathReach} L ${paddingLeft + (numPoints - 1) * step} ${chartBottom} L ${paddingLeft} ${chartBottom} Z`;

    container.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 540 190" style="overflow: visible;">
        <defs>
          <linearGradient id="reelReachGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a855f7" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#a855f7" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <line x1="${paddingLeft}" y1="${chartTop}" x2="${paddingRight}" y2="${chartTop}" stroke="#f1f5f9" stroke-width="1"/>
        <line x1="${paddingLeft}" y1="${chartTop + chartHeight * 0.5}" x2="${paddingRight}" y2="${chartTop + chartHeight * 0.5}" stroke="#f1f5f9" stroke-width="1"/>
        <line x1="${paddingLeft}" y1="${chartBottom}" x2="${paddingRight}" y2="${chartBottom}" stroke="#e2e8f0" stroke-width="1"/>

        <path d="${areaReach}" fill="url(#reelReachGrad)" />
        <path d="${pathReach}" fill="none" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
        <path d="${pathDm}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4"/>

        ${reachPoints.map((val, i) => `
          <circle cx="${paddingLeft + i * step}" cy="${reachY[i]}" r="4" fill="#a855f7" stroke="#ffffff" stroke-width="2"/>
        `).join('')}

        ${xLabels.map((lbl, i) => `
          <text x="${paddingLeft + i * step}" y="172" fill="#94a3b8" font-size="10" font-weight="600" text-anchor="middle">${lbl}</text>
        `).join('')}
      </svg>
    `;
  }

  // AI SCRIPT & HOOK STUDIO
  const scriptTemplates = {
    pas: {
      hook: '"If you are still typing manual DMs to every single customer lead in 2026, you are leaving 5 figures on the table every month."',
      cue1: "Visual: Urgent point at camera with bold warning text",
      tag1: "🚨 STOP LOSING DM SALES",
      body: '"Here is the problem: by the time you reply 3 hours later, their buying intent is already cold. When you use RenderReply, your Instagram triggers an instant DM containing your checkout link in under 2 seconds while capturing their verified email."',
      cue2: "Visual: Quick split screen showing fast 2-second automated DM",
      tag2: "⚡ 2-SECOND AUTOPILOT CONVERSION",
      cta: '"Comment \'GROWTH\' below right now and I will send the entire blueprint straight to your DMs for free!"',
      cue3: "Visual: Point down towards the comment box",
      tag3: "👇 COMMENT 'GROWTH' FOR FREE DM"
    },
    tutorial: {
      hook: '"Here is the exact 3-step system that generated $18,450 from Instagram Reels without spending a dime on ads."',
      cue1: "Visual: High energy screen record of notification sales banner",
      tag1: "💰 $18.4K ZERO-AD STRATEGY",
      body: '"Step 1: Pick one core keyword like \'STORE\'. Step 2: Link your digital product or Notion template in RenderReply. Step 3: Turn on randomized AI comment responses to protect your account authority."',
      cue2: "Visual: Step by step walkthrough animation",
      tag2: "🚀 3 ACTIONABLE STEPS",
      cta: '"Comment \'STORE\' below to get the 1-click template bundle sent directly to your inbox!"',
      cue3: "Visual: Double tap screen and point down",
      tag3: "👇 COMMENT 'STORE' TO UNLOCK"
    },
    pov: {
      hook: '"POV: It is 11 PM and you are sleeping while your Instagram Reel is making sales and capturing leads on autopilot."',
      cue1: "Visual: Relaxed creator POV aesthetic with morning coffee",
      tag1: "✨ PASSIVE CREATOR LIFE",
      body: '"I used to burn out replying to hundreds of DMs by hand. Now, one viral Reel + RenderReply automation does 100% of the heavy lifting. My conversion rate tripled in 14 days."',
      cue2: "Visual: Show real-time RenderReply dashboard metrics",
      tag2: "📈 3X HIGHER CONVERSIONS",
      cta: '"Want to steal this setup? Comment \'GROWTH\' below and check your DMs in 5 seconds!"',
      cue3: "Visual: Point towards direct message notification",
      tag3: "👇 COMMENT 'GROWTH' NOW"
    },
    myth: {
      hook: '"Stop believing the myth that you need 100,000 followers to make serious money from Instagram Reels."',
      cue1: "Visual: Screen record of 3,000 follower account making $5K/mo",
      tag1: "❌ MYTH BUSTED",
      body: '"Followers do not pay your rent—conversions do. When you pair a 30-second Reel with an automated keyword trigger, you can turn a 2,000-view Reel into 40 paying customers every single week."',
      cue2: "Visual: Show conversion funnel breakdown",
      tag2: "🎯 TURNING VIEWS INTO BUYERS",
      cta: '"Comment \'BLUEPRINT\' below to get my free micro-creator monetization roadmap!"',
      cue3: "Visual: Point down towards comments",
      tag3: "👇 COMMENT 'BLUEPRINT' FOR ROADMAP"
    }
  };

  window.handleScriptSourceChange = function (val) {
    const customGroup = document.getElementById('script-custom-topic-group');
    if (customGroup) {
      customGroup.style.display = val === 'custom' ? 'block' : 'none';
    }
  };

  window.selectScriptFramework = function (fw, btn) {
    activeFramework = fw;
    const fwBtns = document.querySelectorAll('.fw-pill');
    fwBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  };

  window.generateReelScript = function () {
    const btn = document.getElementById('btn-generate-full-script');
    if (btn) {
      btn.style.opacity = '0.7';
      btn.innerHTML = '<span>⚡ Writing Viral Script...</span>';
    }

    setTimeout(() => {
      const data = scriptTemplates[activeFramework] || scriptTemplates.pas;

      const act1 = document.getElementById('script-act1-text');
      const act2 = document.getElementById('script-act2-text');
      const act3 = document.getElementById('script-act3-text');

      if (act1) act1.textContent = data.hook;
      if (act2) act2.textContent = data.body;
      if (act3) act3.textContent = data.cta;

      if (btn) {
        btn.style.opacity = '1';
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Generate 30-Second Viral Script';
      }

      if (typeof window.showToast === 'function') {
        window.showToast('Generated 30-second viral script');
      }
    }, 400);
  };

  window.loadScriptIntoEditor = function () {
    const data = scriptTemplates[activeFramework] || scriptTemplates.pas;
    const overlayInput = document.getElementById('reels-overlay-text-input');
    const captionTextarea = document.getElementById('reels-caption-textarea');

    if (overlayInput) {
      overlayInput.value = data.tag1.replace(/[^\w\s$]/gi, '').trim() || 'AUTOMATE YOUR SALES';
      window.updateOverlayText(overlayInput.value);
    }

    if (captionTextarea) {
      captionTextarea.value = `${data.hook}\n\n${data.cta}\n\n#creatoreconomy #dmautomation #viralreels #growth`;
      window.updateCaptionPreview(captionTextarea.value);
    }

    window.switchReelsSubTab('studio');

    if (typeof window.showToast === 'function') {
      window.showToast('Loaded script into Studio editor');
    }
  };

  // =========================================================================
  // REELS SUB-TAB NAVIGATION
  // =========================================================================
  window.switchReelsSubTab = function (tabName) {
    const subnavBtns = document.querySelectorAll('.reels-subnav-btn');
    const panes = document.querySelectorAll('.reels-tab-pane');

    subnavBtns.forEach(btn => {
      const target = btn.getAttribute('data-subtab');
      btn.classList.toggle('active', target === tabName);
    });

    panes.forEach(pane => {
      pane.classList.remove('active');
    });

    const activePane = document.getElementById(`reels-pane-${tabName}`);
    if (activePane) {
      activePane.classList.add('active');
    }

    if (tabName !== 'studio') {
      window.stopStudioPlayback();
    } else {
      window.selectStudioLayer('main');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // BLACK & WHITE STUDIO TIMELINE STORY & REEL EDITOR (FULL INTERACTIVE ENGINE)
  // =========================================================================
  let studioIsPlaying = false;
  let studioCurrentTimeMs = 0;
  const studioTotalDurationMs = 14200; // 14.2s as shown in screenshot
  let studioSelectedLayer = 'text';
  let studioZoomPercent = 100;
  let studioTimelineZoom = 1;
  let studioPlaybackTimer = null;
  let studioSnappingEnabled = true;
  let activeTrimmingClip = null;

  // STUDIO LAYERS REGISTRY
  let studioLayers = [
    {
      id: 'bg',
      type: 'bg',
      title: 'Background Layer',
      res: '1080x1920',
      dur: '14.2s',
      startMs: 0,
      endMs: 14200,
      opacity: 100,
      visible: true,
      locked: false,
      animation: 'none'
    },
    {
      id: 'main',
      type: 'main',
      title: 'Main Story Content',
      res: '1080x1920',
      dur: '14.2s',
      startMs: 0,
      endMs: 14200,
      opacity: 100,
      visible: true,
      locked: false,
      animation: 'none'
    },
    {
      id: 'text',
      type: 'text',
      title: 'Text Overlay',
      res: 'Vector 1080p',
      dur: '14.2s',
      startMs: 0,
      endMs: 14200,
      opacity: 100,
      visible: true,
      locked: false,
      animation: 'fadeIn'
    },
    {
      id: 'sticker',
      type: 'sticker',
      title: 'Sticker Layer',
      res: '512x512 SVG',
      dur: '10.0s',
      startMs: 1200,
      endMs: 11200,
      opacity: 100,
      visible: true,
      locked: false,
      animation: 'popIn'
    }
  ];

  function formatTimecode(ms) {
    const totalSeconds = ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const millis = Math.floor(ms % 1000);

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    const mmm = String(millis).padStart(3, '0');

    return `${hh}:${mm}:${ss}.${mmm}`;
  }

  function updateStudioPlayheadVisuals() {
    const needle = document.getElementById('studio-playhead-needle');
    const readout = document.getElementById('studio-timecode-readout');
    const progFill = document.getElementById('studio-story-prog-fill');

    if (readout) {
      readout.textContent = formatTimecode(studioCurrentTimeMs);
    }

    const progressPct = Math.min(Math.max(studioCurrentTimeMs / studioTotalDurationMs, 0), 1);

    if (needle) {
      const trackArea = document.getElementById('studio-timeline-tracks-area');
      const areaWidth = trackArea ? (trackArea.clientWidth - 150) : 400;
      const leftPos = 140 + (progressPct * areaWidth);
      needle.style.left = `${leftPos}px`;
    }

    if (progFill) {
      progFill.style.width = `${Math.round(progressPct * 100)}%`;
    }

    // Check layer time visibility
    studioLayers.forEach(layer => {
      const el = document.querySelector(`[data-layer-id="${layer.id}"]`) || document.getElementById(`studio-${layer.id}-layer`);
      if (el && layer.type !== 'bg' && layer.type !== 'main') {
        if (!layer.visible) {
          el.style.display = 'none';
        } else {
          const isTimeActive = studioCurrentTimeMs >= layer.startMs && studioCurrentTimeMs <= layer.endMs;
          el.style.display = isTimeActive ? '' : 'none';
        }
      }
    });
  }

  window.seekTimelineToEvent = function (e) {
    const trackArea = document.getElementById('studio-timeline-tracks-area');
    if (!trackArea) return;

    const rect = trackArea.getBoundingClientRect();
    const clickX = e.clientX - rect.left - 140; // 140px header offset
    const trackWidth = rect.width - 150;

    if (trackWidth > 0 && clickX >= 0) {
      const pct = Math.min(Math.max(clickX / trackWidth, 0), 1);
      studioCurrentTimeMs = Math.round(pct * studioTotalDurationMs);
      updateStudioPlayheadVisuals();
    }
  };

  window.toggleStudioPlayback = function () {
    const btn = document.getElementById('btn-studio-play-pause');
    const playIcon = document.getElementById('studio-play-icon');
    const bgVideo = document.getElementById('studio-bg-video-element');

    if (studioIsPlaying) {
      // Pause
      studioIsPlaying = false;
      if (studioPlaybackTimer) clearInterval(studioPlaybackTimer);
      if (playIcon) {
        playIcon.innerHTML = '<polygon points="6 4 20 12 6 20 6 4"></polygon>';
      }
      if (bgVideo && !bgVideo.paused) {
        try { bgVideo.pause(); } catch (err) { }
      }
    } else {
      // Play
      studioIsPlaying = true;
      if (playIcon) {
        playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      }
      if (bgVideo && bgVideo.style.display !== 'none') {
        try { bgVideo.play(); } catch (err) { }
      }

      const stepMs = 50;
      studioPlaybackTimer = setInterval(() => {
        studioCurrentTimeMs += stepMs;
        if (studioCurrentTimeMs >= studioTotalDurationMs) {
          studioCurrentTimeMs = 0; // Seamless loop
          if (bgVideo) bgVideo.currentTime = 0;
        }
        updateStudioPlayheadVisuals();
      }, stepMs);
    }
  };

  window.stopStudioPlayback = function () {
    studioIsPlaying = false;
    if (studioPlaybackTimer) clearInterval(studioPlaybackTimer);
    studioCurrentTimeMs = 0;

    const playIcon = document.getElementById('studio-play-icon');
    if (playIcon) {
      playIcon.innerHTML = '<polygon points="6 4 20 12 6 20 6 4"></polygon>';
    }

    const bgVideo = document.getElementById('studio-bg-video-element');
    if (bgVideo) {
      try {
        bgVideo.pause();
        bgVideo.currentTime = 0;
      } catch (err) { }
    }

    updateStudioPlayheadVisuals();
  };

  // DRAWER TOGGLING & TOOL SWITCHING
  window.toggleStudioDrawer = function (forceOpen) {
    const drawer = document.getElementById('studio-tool-drawer');
    if (drawer) {
      if (typeof forceOpen === 'boolean') {
        drawer.classList.toggle('active', forceOpen);
      } else {
        drawer.classList.toggle('active');
      }
    }
  };

  const toolTitles = {
    media: 'Media & Backgrounds',
    sticker: 'Instagram Stickers & Widgets',
    canva: 'Story & Reel Templates',
    templates: 'Story & Reel Templates',
    text: 'Typography & Text Styles',
    ai: 'AI Script & Hook Assistant',
    images: 'Curated Stock Photos',
    gif: 'Animated GIF Stickers',
    emojis: 'Emoji Sticker Picker'
  };

  window.switchStudioTool = function (toolName, btn) {
    document.querySelectorAll('.studio-tool-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    window.toggleStudioDrawer(true);

    const titleEl = document.getElementById('studio-drawer-title');
    if (titleEl && toolTitles[toolName]) {
      titleEl.textContent = toolTitles[toolName];
    }

    document.querySelectorAll('.drawer-content-pane').forEach(pane => pane.classList.remove('active'));
    const targetPane = document.getElementById(`drawer-panel-${toolName}`);
    if (targetPane) targetPane.classList.add('active');

    if (toolName === 'text') {
      window.selectStudioLayer('text');
    } else if (toolName === 'sticker') {
      window.selectStudioLayer('sticker');
    }
  };

  // CANVAS DRAG AND DROP ENGINE
  function initStudioCanvasDragging() {
    const stage = document.getElementById('studio-story-content');
    if (!stage) return;

    let draggingElement = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let elemStartX = 0;
    let elemStartY = 0;

    function onPointerDown(e) {
      const target = e.target.closest('.studio-draggable-item');
      if (!target) return;

      // Don't drag if user is typing text inside contenteditable
      if (e.target.isContentEditable && document.activeElement === e.target) {
        return;
      }

      draggingElement = target;
      const layerId = target.getAttribute('data-layer-id');
      if (layerId) window.selectStudioLayer(layerId);

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      dragStartX = clientX;
      dragStartY = clientY;
      elemStartX = target.offsetLeft;
      elemStartY = target.offsetTop;

      document.addEventListener('mousemove', onPointerMove);
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
      if (!draggingElement) return;
      if (e.preventDefault) e.preventDefault();

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const dx = clientX - dragStartX;
      const dy = clientY - dragStartY;

      let newX = elemStartX + dx;
      let newY = elemStartY + dy;

      // Snapping guide to center if enabled
      if (studioSnappingEnabled) {
        const stageWidth = stage.clientWidth;
        const elemWidth = draggingElement.offsetWidth;
        const centerX = (stageWidth - elemWidth) / 2;
        if (Math.abs(newX - centerX) < 8) {
          newX = centerX;
        }
      }

      draggingElement.style.left = `${Math.max(4, Math.min(newX, stage.clientWidth - draggingElement.offsetWidth - 4))}px`;
      draggingElement.style.top = `${Math.max(10, Math.min(newY, stage.clientHeight - draggingElement.offsetHeight - 10))}px`;
    }

    function onPointerUp() {
      draggingElement = null;
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    }

    stage.addEventListener('mousedown', onPointerDown);
    stage.addEventListener('touchstart', onPointerDown, { passive: false });
  }

  // DYNAMIC ASSET & LAYER INSERTION
  window.triggerStudioBgUpload = function () {
    const input = document.getElementById('studio-bg-file-input');
    if (input) input.click();
  };

  window.handleStudioBgUpload = function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const bgLayer = document.getElementById('studio-bg-layer');
    const bgVideo = document.getElementById('studio-bg-video-element');

    const url = URL.createObjectURL(file);

    if (file.type.startsWith('video')) {
      if (bgVideo) {
        bgVideo.src = url;
        bgVideo.style.display = 'block';
        bgVideo.play();
      }
      if (bgLayer) bgLayer.style.backgroundImage = 'none';
      if (typeof window.showToast === 'function') window.showToast(`Loaded video background: ${file.name}`);
    } else {
      if (bgVideo) {
        bgVideo.style.display = 'none';
        try { bgVideo.pause(); } catch (err) { }
      }
      if (bgLayer) {
        bgLayer.style.backgroundImage = `url(${url})`;
        bgLayer.style.backgroundSize = 'cover';
      }
      if (typeof window.showToast === 'function') window.showToast(`Loaded photo background: ${file.name}`);
    }
  };

  window.setStudioBackground = function (preset) {
    const bgLayer = document.getElementById('studio-bg-layer');
    const bgVideo = document.getElementById('studio-bg-video-element');
    if (bgVideo) {
      bgVideo.style.display = 'none';
      try { bgVideo.pause(); } catch (err) { }
    }
    if (!bgLayer) return;

    bgLayer.style.backgroundImage = '';
    if (preset === 'carbon') {
      bgLayer.style.background = 'linear-gradient(135deg, #181e2b 0%, #0d121c 100%)';
    } else if (preset === 'gold') {
      bgLayer.style.background = 'linear-gradient(135deg, #78350f 0%, #d97706 100%)';
    } else if (preset === 'cyan') {
      bgLayer.style.background = 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)';
    } else if (preset === 'purple') {
      bgLayer.style.background = 'linear-gradient(135deg, #3b0764 0%, #7e22ce 100%)';
    }
    if (typeof window.showToast === 'function') window.showToast(`Applied ${preset} background preset`);
  };

  window.setStudioBgImage = function (url) {
    const bgLayer = document.getElementById('studio-bg-layer');
    const bgVideo = document.getElementById('studio-bg-video-element');
    if (bgVideo) {
      bgVideo.style.display = 'none';
      try { bgVideo.pause(); } catch (err) { }
    }
    if (bgLayer) {
      bgLayer.style.background = `url('${url}') center/cover no-repeat`;
      if (typeof window.showToast === 'function') window.showToast('Updated background with stock photo');
    }
  };

  window.addStudioTextLayer = function (presetType) {
    const container = document.getElementById('studio-dynamic-layers-container');
    if (!container) return;

    const layerId = `text_${Date.now()}`;
    const newDiv = document.createElement('div');
    newDiv.className = 'story-text-layer studio-draggable-item active-layer-box';
    newDiv.setAttribute('data-layer-id', layerId);
    newDiv.style.top = `${120 + (studioLayers.length * 15)}px`;
    newDiv.style.left = '20px';

    let defaultText = 'New Heading';
    if (presetType === 'heading') defaultText = 'VIRAL REEL HEADLINE';
    else if (presetType === 'subheading') defaultText = 'Comment "GROWTH" for blueprint';
    else if (presetType === 'callout') defaultText = '⚡ 2-SECOND AUTOMATION';

    newDiv.innerHTML = `
      <p class="story-message-text" contenteditable="true" spellcheck="false">${defaultText}</p>
      <div class="layer-resize-handle"></div>
    `;

    container.appendChild(newDiv);

    studioLayers.push({
      id: layerId,
      type: 'text',
      title: defaultText.substring(0, 18),
      res: 'Vector 1080p',
      dur: '14.2s',
      startMs: 0,
      endMs: 14200,
      opacity: 100,
      visible: true,
      locked: false,
      animation: 'fadeIn'
    });

    window.selectStudioLayer(layerId);
    if (typeof window.showToast === 'function') window.showToast('Added new text layer to canvas');
  };

  window.addStudioSticker = function (type) {
    const container = document.getElementById('studio-dynamic-layers-container');
    if (!container) return;

    const layerId = `sticker_${Date.now()}`;
    const newDiv = document.createElement('div');
    newDiv.className = 'story-sticker-layer studio-draggable-item active-layer-box';
    newDiv.setAttribute('data-layer-id', layerId);
    newDiv.style.top = '220px';
    newDiv.style.left = '30px';

    let contentHtml = '';
    let title = 'Sticker';

    if (type === 'heart') {
      title = 'Heart Sticker';
      contentHtml = '<svg width="32" height="32" viewBox="0 0 24 24" fill="#f43f5e"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
    } else if (type === 'fire') {
      title = 'Fire Emoji';
      contentHtml = '<span style="font-size: 32px;">🔥</span>';
    } else if (type === 'poll') {
      title = 'Interactive Poll';
      contentHtml = `
        <div style="background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); border: 1.5px solid #ffffff; border-radius: 10px; padding: 8px 12px; text-align: center; color: #fff; width: 140px;">
          <div style="font-size: 11px; font-weight: 800; margin-bottom: 6px;">WANT THIS FREE?</div>
          <div style="display: flex; gap: 4px;">
            <div style="flex: 1; background: #ffffff; color: #000; font-weight: 800; font-size: 10px; padding: 4px 0; border-radius: 6px;">YES!</div>
            <div style="flex: 1; background: rgba(255,255,255,0.2); font-weight: 800; font-size: 10px; padding: 4px 0; border-radius: 6px;">NO</div>
          </div>
        </div>
      `;
    } else if (type === 'question') {
      title = 'Ask Question';
      contentHtml = `
        <div style="background: #ffffff; color: #000; border-radius: 12px; padding: 8px 12px; text-align: center; width: 150px; box-shadow: 0 8px 20px rgba(0,0,0,0.5);">
          <div style="font-size: 11px; font-weight: 800;">Ask me a question</div>
          <div style="margin-top: 4px; background: #f1f5f9; border-radius: 6px; padding: 4px; font-size: 9.5px; color: #64748b;">Type something...</div>
        </div>
      `;
    } else if (type === 'countdown') {
      title = 'Countdown Widget';
      contentHtml = `
        <div style="background: #000; border: 1.5px solid #f59e0b; border-radius: 10px; padding: 6px 12px; text-align: center; color: #f59e0b; font-family: monospace; font-size: 13px; font-weight: 800; width: 130px;">
          ⏱ 02:45:10
        </div>
      `;
    } else if (type === 'verified') {
      title = 'Verified Badge';
      contentHtml = '<svg width="28" height="28" viewBox="0 0 24 24" fill="#38bdf8"><path d="M12 2l2.4 2.8 3.7-.4 1.2 3.5 3.5 1.2-.4 3.7 2.8 2.4-2.8 2.4.4 3.7-3.5 1.2-1.2 3.5-3.7-.4L12 22l-2.4-2.8-3.7.4-1.2-3.5-3.5-1.2.4-3.7L2 12l2.8-2.4-.4-3.7 3.5-1.2 1.2-3.5 3.7.4z"></path><polyline points="9 12 11 14 15 10" fill="none" stroke="#000" stroke-width="2"></polyline></svg>';
    } else {
      title = `${type} Badge`;
      contentHtml = '<span style="font-size: 32px;">✨</span>';
    }

    newDiv.innerHTML = `${contentHtml}<div class="layer-resize-handle"></div>`;
    container.appendChild(newDiv);

    studioLayers.push({
      id: layerId,
      type: 'sticker',
      title: title,
      res: '512x512 SVG',
      dur: '10.0s',
      startMs: 1000,
      endMs: 11000,
      opacity: 100,
      visible: true,
      locked: false,
      animation: 'popIn'
    });

    window.selectStudioLayer(layerId);
    if (typeof window.showToast === 'function') window.showToast(`Added ${title} to canvas`);
  };

  window.addStudioEmoji = function (emoji) {
    const container = document.getElementById('studio-dynamic-layers-container');
    if (!container) return;

    const layerId = `emoji_${Date.now()}`;
    const newDiv = document.createElement('div');
    newDiv.className = 'story-sticker-layer studio-draggable-item active-layer-box';
    newDiv.setAttribute('data-layer-id', layerId);
    newDiv.style.top = '180px';
    newDiv.style.left = '60px';
    newDiv.innerHTML = `<span style="font-size: 38px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));">${emoji}</span><div class="layer-resize-handle"></div>`;

    container.appendChild(newDiv);

    studioLayers.push({
      id: layerId,
      type: 'sticker',
      title: `Emoji (${emoji})`,
      res: 'Vector Emoji',
      dur: '14.2s',
      startMs: 0,
      endMs: 14200,
      opacity: 100,
      visible: true,
      locked: false,
      animation: 'popIn'
    });

    window.selectStudioLayer(layerId);
    if (typeof window.showToast === 'function') window.showToast(`Dropped ${emoji} onto canvas`);
  };

  window.applyStudioTemplate = function (templateId) {
    const textEl = document.getElementById('studio-editable-text');
    if (templateId === 'quote') {
      if (textEl) textEl.innerHTML = '"Stop trading time for money. Build an automated digital system that closes DM leads 24/7."<br><br><span style="font-size: 11px; opacity: 0.8; font-style: italic;">— @rudrateja</span>';
      window.setStudioBackground('carbon');
    } else if (templateId === 'promo') {
      if (textEl) textEl.innerHTML = '⚡ 24-HOUR FLASH SALE<br><br><span style="font-size: 15px; font-weight: 800; color: #f59e0b;">50% OFF ALL PRESETS</span><br><br>Comment "STORE" to claim';
      window.setStudioBackground('gold');
    } else if (templateId === 'tweet') {
      if (textEl) textEl.innerHTML = 'If you are still sending manual DMs to 100 leads a day, you are working as a bot.<br><br>Let RenderReply automate it in 2 seconds.';
      window.setStudioBackground('cyan');
    } else if (templateId === 'podcast') {
      if (textEl) textEl.innerHTML = '🎙 EP. 42: How we built a $100K/mo automation flywheel with zero paid ads.<br><br>👇 Tap link in bio';
      window.setStudioBackground('purple');
    }
    if (typeof window.showToast === 'function') window.showToast('Applied Story Layout Template');
  };

  window.applyAiGeneratedHook = function (hookId) {
    const textEl = document.getElementById('studio-editable-text');
    if (!textEl) return;

    if (hookId === 'hook1') {
      textEl.textContent = '🚨 Stop typing manual DMs to every customer lead in 2026.';
    } else if (hookId === 'hook2') {
      textEl.textContent = '💰 How this 1 Reel generated $18,450 on 100% autopilot.';
    } else if (hookId === 'hook3') {
      textEl.textContent = '✨ POV: Making sales while you sleep with RenderReply.';
    }

    textEl.style.animation = 'none';
    setTimeout(() => {
      textEl.style.animation = 'fadeInPane 0.4s ease';
    }, 10);

    if (typeof window.showToast === 'function') window.showToast('Applied AI Viral Hook to canvas');
  };

  window.updateSelectedTextFont = function (fontFamily) {
    const activeEl = document.querySelector(`.studio-draggable-item.active-layer-box[data-layer-id="${studioSelectedLayer}"]`) || document.getElementById('studio-text-overlay-box');
    if (activeEl) {
      activeEl.style.fontFamily = fontFamily;
    }
  };

  window.setSelectedTextColor = function (color) {
    const activeEl = document.querySelector(`.studio-draggable-item.active-layer-box[data-layer-id="${studioSelectedLayer}"]`) || document.getElementById('studio-text-overlay-box');
    if (activeEl) {
      activeEl.style.color = color;
    }
    document.querySelectorAll('.swatch-circle').forEach(sw => {
      sw.classList.toggle('active', sw.style.backgroundColor === color);
    });
  };

  window.selectStudioLayer = function (layerId) {
    studioSelectedLayer = layerId;
    const layerObj = studioLayers.find(l => l.id === layerId) || studioLayers[1];

    // Highlight on canvas
    document.querySelectorAll('.studio-draggable-item').forEach(el => {
      el.classList.toggle('active-layer-box', el.getAttribute('data-layer-id') === layerId);
    });

    // Highlight right layers card
    document.querySelectorAll('.layer-item-card').forEach(card => card.classList.remove('active-gold', 'selected-layer'));
    const activeCard = document.getElementById(`layer-card-${layerId}`);
    if (activeCard) {
      if (layerId === 'main') activeCard.classList.add('active-gold');
      else activeCard.classList.add('selected-layer');
    }

    // Highlight timeline track
    document.querySelectorAll('.timeline-track-row').forEach(row => row.classList.remove('selected-track'));
    const trackClip = document.getElementById(`timeline-clip-${layerId}`);
    if (trackClip && trackClip.closest('.timeline-track-row')) {
      trackClip.closest('.timeline-track-row').classList.add('selected-track');
    }

    // Update inspector
    const inspTitle = document.getElementById('studio-inspector-title');
    const inspRes = document.getElementById('studio-insp-res');
    const inspDur = document.getElementById('studio-insp-dur');
    const opacityInput = document.getElementById('studio-layer-opacity');
    const opacityBadge = document.getElementById('studio-opacity-badge');
    const animSelect = document.getElementById('studio-layer-animation');

    if (inspTitle) inspTitle.textContent = layerObj.title;
    if (inspRes) inspRes.textContent = layerObj.res;
    if (inspDur) inspDur.textContent = layerObj.dur;
    if (opacityInput) opacityInput.value = layerObj.opacity;
    if (opacityBadge) opacityBadge.textContent = `${layerObj.opacity}%`;
    if (animSelect) animSelect.value = layerObj.animation || 'none';
  };

  window.updateStudioLayerOpacity = function (val) {
    const num = parseInt(val, 10) || 100;
    const layerObj = studioLayers.find(l => l.id === studioSelectedLayer);
    if (layerObj) layerObj.opacity = num;

    const badge = document.getElementById('studio-opacity-badge');
    if (badge) badge.textContent = `${num}%`;

    const el = document.querySelector(`[data-layer-id="${studioSelectedLayer}"]`) || document.getElementById(`studio-${studioSelectedLayer}-layer`) || document.getElementById('studio-story-content');
    if (el) el.style.opacity = num / 100;
  };

  window.setLayerAnimation = function (anim) {
    const layerObj = studioLayers.find(l => l.id === studioSelectedLayer);
    if (layerObj) layerObj.animation = anim;
    if (typeof window.showToast === 'function') window.showToast(`Set animation: ${anim}`);
  };

  window.toggleLayerVisibility = function (layerId) {
    const layerObj = studioLayers.find(l => l.id === layerId);
    if (!layerObj) return;

    layerObj.visible = !layerObj.visible;
    const el = document.querySelector(`[data-layer-id="${layerId}"]`) || document.getElementById(`studio-${layerId}-layer`);
    if (el) el.style.display = layerObj.visible ? '' : 'none';

    if (typeof window.showToast === 'function') {
      window.showToast(`${layerObj.visible ? 'Showed' : 'Hidden'} layer: ${layerObj.title}`);
    }
  };

  window.deleteSelectedStudioTrack = function () {
    if (studioSelectedLayer === 'bg' || studioSelectedLayer === 'main') {
      if (typeof window.showToast === 'function') window.showToast('Main background layer is locked.');
      return;
    }

    const idx = studioLayers.findIndex(l => l.id === studioSelectedLayer);
    if (idx !== -1) {
      const removed = studioLayers.splice(idx, 1)[0];
      const el = document.querySelector(`[data-layer-id="${removed.id}"]`);
      if (el) el.remove();

      const trackRow = document.getElementById(`timeline-clip-${removed.id}`)?.closest('.timeline-track-row');
      if (trackRow) trackRow.remove();

      const layerCard = document.getElementById(`layer-card-${removed.id}`);
      if (layerCard) layerCard.remove();

      window.selectStudioLayer('main');
      if (typeof window.showToast === 'function') window.showToast(`Deleted "${removed.title}"`);
    }
  };

  window.startClipTrim = function (layerId, side, e) {
    e.stopPropagation();
    activeTrimmingClip = { layerId, side, startX: e.clientX };

    function onTrimMove(ev) {
      if (!activeTrimmingClip) return;
      const dx = ev.clientX - activeTrimmingClip.startX;
      const layerObj = studioLayers.find(l => l.id === activeTrimmingClip.layerId);
      if (!layerObj) return;

      const clipEl = document.getElementById(`timeline-clip-${layerObj.id}`);
      if (clipEl) {
        if (activeTrimmingClip.side === 'right') {
          clipEl.style.width = `max(20px, calc(100% + ${dx}px))`;
        }
      }
    }

    function onTrimEnd() {
      activeTrimmingClip = null;
      document.removeEventListener('mousemove', onTrimMove);
      document.removeEventListener('mouseup', onTrimEnd);
      if (typeof window.showToast === 'function') window.showToast('Trimmed clip duration');
    }

    document.addEventListener('mousemove', onTrimMove);
    document.addEventListener('mouseup', onTrimEnd);
  };

  window.saveStudioProject = function () {
    try {
      localStorage.setItem('renderreply_studio_project', JSON.stringify({
        layers: studioLayers,
        currentTime: studioCurrentTimeMs
      }));
    } catch (e) { }

    if (typeof window.showToast === 'function') {
      window.showToast('Studio project draft saved to local storage!');
    }
  };

  window.shareStudioProject = function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://renderreply.com/studio/story-render-948');
    }
    if (typeof window.showToast === 'function') {
      window.showToast('Project share link copied to clipboard!');
    }
  };

  window.splitStudioTrack = function () {
    if (typeof window.showToast === 'function') {
      window.showToast(`Split clip at ${formatTimecode(studioCurrentTimeMs)}`);
    }
  };

  window.undoStudioAction = function () {
    if (typeof window.showToast === 'function') window.showToast('Undo previous action');
  };

  window.redoStudioAction = function () {
    if (typeof window.showToast === 'function') window.showToast('Redo studio action');
  };

  window.zoomTimeline = function (delta) {
    studioTimelineZoom = Math.min(Math.max(studioTimelineZoom + delta * 0.2, 0.6), 2.0);
    const tracksArea = document.getElementById('studio-tracks-list-wrap');
    if (tracksArea) {
      tracksArea.style.minWidth = `${100 * studioTimelineZoom}%`;
    }
    if (typeof window.showToast === 'function') {
      window.showToast(`Timeline Scale: ${Math.round(studioTimelineZoom * 100)}%`);
    }
  };

  window.toggleStudioFullscreen = function () {
    const container = document.querySelector('.studio-editor-viewport-container');
    if (container) {
      if (!document.fullscreenElement) {
        if (container.requestFullscreen) container.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }
  };

  window.adjustCanvasZoom = function (delta) {
    studioZoomPercent = Math.min(Math.max(studioZoomPercent + delta, 60), 160);
    const frame = document.getElementById('story-frame-viewport');
    if (frame) {
      frame.style.transform = `scale(${studioZoomPercent / 100})`;
      frame.style.transformOrigin = 'center center';
    }
    if (typeof window.showToast === 'function') {
      window.showToast(`Canvas Zoom: ${studioZoomPercent}%`);
    }
  };

  window.toggleStudioSnapping = function (enabled) {
    studioSnappingEnabled = enabled;
    if (typeof window.showToast === 'function') {
      window.showToast(enabled ? 'Overlay & Snapping enabled' : 'Snapping disabled');
    }
  };

  window.openConnectAccountModal = function (e) {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    if (typeof window.openSwitchAccountModal === 'function') {
      window.openSwitchAccountModal(e);
    } else {
      const modal = document.getElementById('modal-switch-account');
      if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
      }
    }
  };

  // INITIALIZE STUDIO ON MOUNT
  setTimeout(() => {
    if (typeof renderGalleryFolders === 'function') renderGalleryFolders();
    if (typeof renderGalleryGrid === 'function') renderGalleryGrid();
    if (typeof window.syncSchedulerAccountsToActiveUser === 'function') {
      window.syncSchedulerAccountsToActiveUser();
    } else if (typeof window.updateSelectedAccountsCount === 'function') {
      window.updateSelectedAccountsCount();
    }
    if (typeof initStudioCanvasDragging === 'function') initStudioCanvasDragging();
    if (typeof updateStudioPlayheadVisuals === 'function') updateStudioPlayheadVisuals();
  }, 100);

})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUserProfileDropdownAndModals);
} else {
  initUserProfileDropdownAndModals();
}




