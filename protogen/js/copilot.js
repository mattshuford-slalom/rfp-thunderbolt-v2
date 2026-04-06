/* ============================================================
   COPILOT — panel rendering, chat logic, suggestions,
              voice dictation, and AI reply generation
   ============================================================ */

function convKey() { return S.view === 'client' ? 'c' + S.cid : 'general'; }

function getConv() {
  const k = convKey();
  if (!S.convs[k]) {
    const c = D.clients.find(x => x.id === S.cid);
    S.convs[k] = [{ r: 'sys', t: c ? `Loaded context for ${c.name}. Ask anything about this client.` : 'Ask anything.' }];
  }
  return S.convs[k];
}

function getSuggestions() {
  const c    = S.view === 'client' ? D.clients.find(x => x.id === S.cid) : null;
  const fn   = c ? c.co : '';
  const conv = getConv();
  const asked = new Set(conv.filter(m => m.r === 'usr').map(m => m.t.toLowerCase()));
  const alreadyAsked = (...patterns) => [...asked].some(t => patterns.some(p => new RegExp(p).test(t)));
  let pool = [];

  if (c) {
    const hasAskedWhy     = alreadyAsked('why','trigger','signal','reason','rec');
    const hasAskedProduct = alreadyAsked('product','hold','have','own','currently');
    const hasAskedOpener  = alreadyAsked('opener','start','begin','call','reach','say','script');
    const hasAskedTP      = alreadyAsked('talk','point','discuss','cover','agenda');
    const hasAskedProp    = alreadyAsked('propensity','likelihood','score','chance');
    const hasAskedRev     = alreadyAsked('revenue','size','emp','employ');
    const hasAskedContact = alreadyAsked('contact','last','when','touch','outreach');
    const hasAskedHealth  = alreadyAsked('health','risk','status','churn');
    const hasAskedWallet  = alreadyAsked('wallet','share','penetrat','miss');
    const hasAskedLog     = alreadyAsked('log','outcome','convert','after','next step');

    const progressive = [
      !hasAskedWhy     && `Why was this recommendation triggered?`,
      !hasAskedProduct && `What products does ${fn} currently hold?`,
      !hasAskedOpener  && `What's the best call opener for ${fn}?`,
      !hasAskedTP      && `What are the top talking points?`,
      !hasAskedProp    && `How strong is ${fn}'s propensity score?`,
      !hasAskedWallet  && `What is ${fn}'s wallet share?`,
      !hasAskedRev     && `What's ${fn}'s revenue and team size?`,
      !hasAskedContact && `When was ${fn} last contacted?`,
      !hasAskedHealth  && `How healthy is this account?`,
      !hasAskedLog     && `How should I log an outcome after this call?`,
    ].filter(Boolean);

    if (asked.size === 0) {
      const tabStarters = {
        rec:  [`Why was this recommendation triggered?`, `What's the best call opener for ${fn}?`, `What are the top talking points?`],
        ctx:  [`Summarize ${fn}'s background`, `How healthy is this account?`, `What products is ${fn} missing?`],
        port: [`What is ${fn}'s wallet share?`, `What's the next best product to introduce?`, `How does their mix compare to peers?`],
        log:  [`How should I log a conversion?`, `What do I do if they declined?`, `What's the best follow-up after this call?`],
      };
      pool = tabStarters[S.tab] || tabStarters.rec;
    } else {
      pool = progressive;
    }

    const lastAst = [...conv].reverse().find(m => m.r === 'ast');
    if (lastAst) {
      const r    = lastAst.t.toLowerCase();
      const fups = [];
      if (/trigger|signal|wire|intent|browse|payroll up|cd matur/.test(r) && !hasAskedOpener)  fups.push(`What's the best call opener for ${fn}?`);
      if (/opener|say|reach out/.test(r) && !hasAskedTP)                                        fups.push(`What are the top talking points?`);
      if (/talking point|discuss/.test(r) && !hasAskedLog)                                      fups.push(`How should I log an outcome after this call?`);
      if (/product|hold|missing|cross/.test(r) && !hasAskedWallet)                              fups.push(`What is ${fn}'s wallet share?`);
      if (/wallet|share|penetrat/.test(r))                                                       fups.push(`What's the next best product to introduce?`);
      if (/propensity|%/.test(r) && !hasAskedWhy)                                               fups.push(`Why was this recommendation triggered?`);
      if (/revenue|employee|industry/.test(r) && !hasAskedProduct)                              fups.push(`What products does ${fn} currently hold?`);
      if (/last contact|days ago|overdue|threshold/.test(r))                                     fups.push(`What's the best outreach approach right now?`);
      if (/at.risk|declining|overdue/.test(r) && !hasAskedOpener)                               fups.push(`What's the best call opener for ${fn}?`);
      if (/dismissed|declined/.test(r))                                                          fups.push(`What's the best follow-up after a dismissal?`);
      if (fups.length) pool = [...fups, ...pool.filter(s => !fups.includes(s))];
    }
  } else if (S.view === 'book') {
    pool = [
      `Who hasn't been contacted in 30+ days?`,
      'Which clients are at risk of churning?',
      'Who has the highest propensity score today?',
      'Which clients have an open recommendation?',
      'Which Tier I clients need attention?',
      'Who should I prioritize this week?',
      `How many clients are in my book?`,
      'What is my portfolio coverage rate?',
    ];
  } else if (S.view === 'activity') {
    pool = [
      'How many conversions have I logged this month?',
      'Which recommendations were dismissed?',
      'What outcomes are still pending?',
      'What were my most recent wins?',
      'Which clients still need a follow-up?',
    ];
  } else {
    pool = [
      'Who should I call first today?',
      'Which clients have a CD maturing soon?',
      'Are any nudges overdue?',
      'What is my portfolio coverage rate?',
      'Who has the highest propensity score today?',
      'Which clients are at risk?',
      `What's on my outreach list today?`,
    ];
  }
  return pool.filter(s => !asked.has(s.toLowerCase())).slice(0, 6);
}

function getCtxLabel() {
  if (S.view === 'client') {
    const c = D.clients.find(x => x.id === S.cid);
    return c ? `Context: ${c.name} · ${c.co}` : 'Context: Client workspace';
  }
  return 'Context: General · No client selected';
}

function formatCardText(s) {
  const c = S.view === 'client' ? D.clients.find(x => x.id === S.cid) : null;
  if (!c) return esc(s);
  const fn = c.name.split(' ')[0];
  let html = esc(s);
  [c.name, c.co, fn].forEach(name => {
    if (name && name.length > 3 && s.includes(name))
      html = html.replace(esc(name), `<span class="cp-card-link">${esc(name)}</span>`);
  });
  return html;
}

function clearConv() {
  const k = convKey();
  const c = S.view === 'client' ? D.clients.find(x => x.id === S.cid) : null;
  S.convs[k] = [{ r: 'sys', t: c ? `Loaded context for ${c.name}. Ask anything about this client.` : 'Ask anything.' }];
  S.suggMore = false;
  renderCopilot();
}

function toggleMoreSuggs() {
  S.suggMore = !S.suggMore;
  refreshSuggestions();
}

function refreshSuggestions() {
  const el = document.getElementById('cp-sugg');
  if (!el) return;
  const conv        = getConv();
  const hasMessages = conv.some(m => m.r === 'usr');
  const all         = getSuggestions();
  const visible     = all.slice(0, S.suggMore ? 6 : 3);
  const canShowMore = all.length > 3;
  el.innerHTML = visible.map(s =>
    `<button class="cp-card" data-q="${esc(s)}" onclick="useSuggestion(this.dataset.q)">${formatCardText(s)}</button>`
  ).join('') + (canShowMore && !hasMessages
    ? `<button class="cp-see-more" onclick="toggleMoreSuggs()">${S.suggMore ? 'See less ∧' : 'See more ∨'}</button>`
    : '');
}

function renderCopilot() {
  const el = document.getElementById('copilot');
  if (!S.copOpen) { el.className = 'cp-panel off'; el.innerHTML = ''; return; }
  el.className = 'cp-panel';
  const conv        = getConv();
  const hasMessages = conv.some(m => m.r === 'usr');
  const ctx         = getCtxLabel();
  const all         = getSuggestions();
  const visible     = all.slice(0, S.suggMore ? 6 : 3);
  const canShowMore = all.length > 3;

  const cardsHTML = showSeeMore => `<div class="cp-cards" id="cp-sugg">
    ${visible.map(s => `<button class="cp-card" data-q="${esc(s)}" onclick="useSuggestion(this.dataset.q)">${formatCardText(s)}</button>`).join('')}
    ${showSeeMore && canShowMore ? `<button class="cp-see-more" onclick="toggleMoreSuggs()">${S.suggMore ? 'See less ∧' : 'See more ∨'}</button>` : ''}
  </div>`;

  const inputHTML = `<div class="cp-in-area">
    <div class="cp-in-wrap">
      <textarea class="cp-in" id="cp-in" placeholder="Message Copilot" rows="1"></textarea>
      <div class="cp-in-toolbar">
        <button class="cp-in-plus" title="New chat" onclick="clearConv()">+</button>
        <button class="cp-btn" id="cp-mic-btn" onclick="toggleDictation()" title="Speak to Copilot">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </button>
      </div>
    </div>
  </div>`;

  el.innerHTML = `
    <div class="cp-hd">
      <div class="cp-hd-l">
        <img src="microsoft_copilot-logo_brandlogos.net_zaqzr.png" style="width:20px;height:20px;flex-shrink:0">
        <span class="cp-ttl">Copilot</span>
      </div>
      <div class="cp-hd-r">
        ${hasMessages ? `<button class="cp-icon-btn" title="New chat" onclick="clearConv()">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8A5 5 0 1 1 8 3"/><polyline points="11,1 13.5,3.5 11,6"/></svg>
        </button>` : ''}
        <button class="cp-x" onclick="toggleCop()">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>
        </button>
      </div>
    </div>
    <div class="cp-ctx">${esc(ctx)}</div>
    ${hasMessages ? `
      <div class="cp-msgs" id="cp-msgs">
        ${conv.filter(m => m.r !== 'sys').map(m => `<div class="msg ${m.r === 'usr' ? 'usr' : 'ast'}">${m.t}</div>`).join('')}
      </div>
      ${cardsHTML(false)}
      ${inputHTML}
    ` : `
      <div class="cp-empty"><div class="cp-ask">${(() => {
        const h = new Date().getHours();
        const g = h < 12 ? 'Good morning,' : h < 17 ? 'Good afternoon,' : 'Good evening,';
        const fn = D.rm.name.split(' ')[0];
        return `${g} ${fn}.<br>How can I help?`;
      })()}</div></div>
      ${inputHTML}
      ${cardsHTML(true)}
    `}`;

  const inp = document.getElementById('cp-in');
  if (inp) {
    inp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendCopilot(); } };
    inp.oninput   = function () { this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 120) + 'px'; };
  }
  if (hasMessages) scrollCop();
}

function scrollCop() { const m = document.getElementById('cp-msgs'); if (m) m.scrollTop = m.scrollHeight; }
function toggleCop() { S.copOpen = !S.copOpen; renderTopbar(); renderCopilot(); }

/* ── VOICE DICTATION ────────────────────────────────────── */
let _recognition = null;
let _dictating   = false;

function toggleDictation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showToast('⚠ Speech recognition not supported in this browser'); return; }
  if (_dictating && _recognition) { _recognition.stop(); return; }
  _recognition = new SpeechRecognition();
  _recognition.lang            = 'en-US';
  _recognition.interimResults  = true;
  _recognition.continuous      = false;
  const btn = document.getElementById('cp-mic-btn');
  const inp = document.getElementById('cp-in');
  _dictating = true;
  if (btn) btn.classList.add('listening');
  if (inp) inp.placeholder = 'Listening…';
  _recognition.onresult = e => {
    let final = '', interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) final   += e.results[i][0].transcript;
      else                       interim += e.results[i][0].transcript;
    }
    if (inp) inp.value = final || interim;
    if (inp) { inp.style.height = 'auto'; inp.style.height = Math.min(inp.scrollHeight, 120) + 'px'; }
  };
  _recognition.onend = () => {
    _dictating = false;
    if (btn) btn.classList.remove('listening');
    if (inp) inp.placeholder = 'Message Copilot';
    const val = inp ? inp.value.trim() : '';
    if (val) sendCopilot();
  };
  _recognition.onerror = e => {
    _dictating = false;
    if (btn) btn.classList.remove('listening');
    if (inp) inp.placeholder = 'Message Copilot';
    if (e.error !== 'no-speech' && e.error !== 'aborted') showToast('⚠ Mic error: ' + e.error);
  };
  _recognition.start();
}

function useSuggestion(txt) {
  const inp = document.getElementById('cp-in');
  if (!inp || !txt) return;
  inp.value = txt;
  sendCopilot();
}

function sendCopilot() {
  const inp = document.getElementById('cp-in');
  const txt = inp?.value?.trim();
  if (!txt) return;
  inp.value = '';
  inp.style.height = '';
  const conv = getConv();
  conv.push({ r: 'usr', t: esc(txt) });
  S.suggMore = false;
  renderCopilot();
  const msgs = document.getElementById('cp-msgs');
  if (msgs) {
    const t = document.createElement('div');
    t.className = 'msg typ'; t.id = 'cp-typ'; t.textContent = '· · ·';
    msgs.appendChild(t); scrollCop();
  }
  setTimeout(() => {
    conv.push({ r: 'ast', t: copilotReply(txt) });
    const msgsEl = document.getElementById('cp-msgs');
    if (msgsEl) {
      msgsEl.innerHTML = conv.filter(m => m.r !== 'sys').map(m => `<div class="msg ${m.r === 'usr' ? 'usr' : 'ast'}">${m.t}</div>`).join('');
      scrollCop();
    } else { renderCopilot(); }
    refreshSuggestions();
  }, 800 + Math.random() * 600);
}

/* ── AI REPLY ENGINE ────────────────────────────────────── */
function copilotReply(q) {
  q = q.toLowerCase();
  const c    = S.view === 'client' ? D.clients.find(x => x.id === S.cid) : null;
  const conv = getConv();
  const lastAst     = [...conv].reverse().find(m => m.r === 'ast');
  const ALL_PRODS   = ['Treasury','BLOC','LOC','CD','Payroll','Card','Merchant Services','Business Savings'];

  if (c) {
    const missing     = rankMissingProds(c);
    const top3Missing = missing.slice(0, 3);
    const fn          = c.co;

    if (/why|trigger|signal|reason|rec\b|recommend/.test(q)) {
      const why = WHY[c.id] || genWhy(c);
      const recDetail = {
        nudge:      `With ${c.lcd} days since last RM contact and a ${c.prop}% propensity score, the engagement window is open. Top opportunity: <strong>${PROD_NAMES[top3Missing[0]] || top3Missing[0] || 'a new product'}</strong>. Waiting longer increases churn risk.`,
        propensity: `This Offer is driven by a ${c.prop}% model score — ${fn} ranks in the top quartile for ${c.ind} clients at ${c.rev} revenue. Highest-confidence opportunity: <strong>${PROD_NAMES[top3Missing[0]] || top3Missing[0] || 'a new product'}</strong> based on transaction patterns and peer benchmarks.`,
        rules:      `This Referral was triggered by an account rule — a maturing product, utilization threshold, or product gap vs. peers. Best next step: introduce <strong>${PROD_NAMES[top3Missing[0]] || top3Missing[0] || 'a relevant product'}</strong> or connect ${fn} with the appropriate specialist.`,
        rt:         `This Advice alert is based on a live intent signal. Real-time triggers convert at 2–3× the rate of scheduled outreach. Act within the next few hours on <strong>${PROD_NAMES[top3Missing[0]] || top3Missing[0] || 'the identified opportunity'}</strong>.`,
      };
      return `${why}<br><br>${recDetail[c.rec] || ''}`;
    }

    if (/product|hold|have|own|currently/.test(q)) {
      const pctWallet  = Math.round((c.prods.length / ALL_PRODS.length) * 100);
      const heldNames  = c.prods.map(p => PROD_NAMES[p] || p).join(', ');
      const gapNames   = top3Missing.map(p => PROD_NAMES[p] || p).join(', ');
      return `${fn} currently holds <strong>${heldNames}</strong> — ${c.prods.length} of 8 available products (<strong>${pctWallet}% wallet share</strong>). Strongest gaps for a ${c.ind} business at ${c.rev}: <strong>${gapNames}</strong>. Peer benchmarks show similar clients average ${c.prods.length + 2} products.`;
    }

    if (/wallet|share|penetrat|miss/.test(q)) {
      const pctWallet = Math.round((c.prods.length / ALL_PRODS.length) * 100);
      const gapName0  = PROD_NAMES[top3Missing[0]] || top3Missing[0];
      const gapName1  = top3Missing[1] ? (PROD_NAMES[top3Missing[1]] || top3Missing[1]) : null;
      return `${fn}'s wallet share is <strong>${pctWallet}%</strong> (${c.prods.length} of 8 products). Comparable ${c.ind} clients at ${c.rev} typically hold ${c.prods.length + 2} products. The highest-value gaps are <strong>${gapName0}</strong>${gapName1 ? ' and <strong>' + gapName1 + '</strong>' : ''}, based on revenue profile and transaction patterns.`;
    }

    if (/revenue|size|big|large|emp|team|headcount/.test(q)) {
      const peerProds = c.prods.length + 2;
      return `${c.co} generates approximately <strong>${c.rev}</strong> in annual revenue with <strong>${c.emp} employees</strong>. Industry: <strong>${c.ind}</strong>, Location: ${c.loc}, Client since ${c.since}. At this revenue level, comparable ${c.ind} companies typically hold ${peerProds} banking products — ${fn} currently has ${c.prods.length}.`;
    }

    if (/propensity|likelihood|score|chance/.test(q)) {
      const tier = c.prop >= 75 ? 'top decile — act now, this window is narrow'
                 : c.prop >= 60 ? 'top quartile — strong signal, good time to reach out'
                 : c.prop >= 45 ? 'above average for this segment'
                 : 'moderate signal — prioritize after higher-propensity clients';
      return `${fn}'s propensity score is <strong>${c.prop}%</strong> (${tier}). Score is driven by ${c.prods.length} active product(s), transaction velocity over the last 90 days, peer benchmarks for ${c.ind} at ${c.rev} revenue, and ${c.lcd > 0 ? `${c.lcd}-day contact gap` : 'recent RM engagement'}.`;
    }

    if (/contact|last|when|touch|outreach|cadence/.test(q)) {
      const urgency = c.lcd >= 21 ? `This significantly exceeds the 10-day cadence target — immediate outreach required.`
                    : c.lcd >= 10 ? `This is at the coverage threshold. Schedule a touchpoint today to stay current.`
                    : c.lcd >= 5  ? `Getting close to the 10-day cadence target. Plan a contact within the next few days.`
                    : `Coverage looks current.`;
      const recNote = c.rec ? ` There's also an active <strong>${c.rec}</strong> recommendation requiring a follow-up action.` : '';
      return `Last RM contact with ${fn} was <strong>${c.lc}</strong> (${c.lcd} day${c.lcd === 1 ? '' : 's'} ago). ${urgency}${recNote}`;
    }

    if (/note|background|context|tell me about|history|summary|summarize/.test(q)) {
      return `${c.notes}<br><br><strong>Key facts:</strong> ${c.tier} client · ${c.ind} · ${c.rev} revenue · ${c.emp} employees · ${c.loc} · Client since ${c.since}.`;
    }

    if (/suggest|recommend|next|should|opport|cross.?sell/.test(q)) {
      const topPick  = top3Missing[0];
      const fitReason = {
        Treasury:          `a full cash management suite (sweep accounts, payment automation) is well-justified at ${c.rev} in revenue`,
        BLOC:              `a revolving Business Line of Credit up to $250K provides flexible working capital for a ${c.emp}-person ${c.ind} operation`,
        LOC:               `a Small Business Line of Credit up to $100K helps smooth seasonal or operational cash flow gaps common in ${c.ind}`,
        CD:                `a Business Certificate of Deposit locks in a guaranteed fixed return on idle cash — terms from 7 days to 5 years`,
        Payroll:           `Truist Online Payroll automates tax filing and direct deposit for ${c.emp} employees — run payroll in 3 clicks`,
        Card:              `the Business Cash Rewards Card earns cash back on every purchase with no annual fee — ideal for everyday business spending`,
        'Merchant Services': `payment acceptance solutions help capture every transaction for a ${c.ind} business at ${c.rev} in revenue`,
        'Business Savings':  `the Business Money Market earns a competitive APY with check-writing access — best for balances over $5K`,
      };
      const topPickName = PROD_NAMES[topPick] || topPick;
      const top3Names   = top3Missing.map(p => PROD_NAMES[p] || p).join(', ');
      return `Top cross-sell opportunities for ${fn}: <strong>${top3Names}</strong>.<br><br>Best immediate fit: <strong>${topPickName}</strong> — ${fitReason[topPick] || 'well-matched to this profile'}. With a ${c.prop}% propensity score and ${c.rev} revenue, this is a high-confidence recommendation.`;
    }

    if (/opener|start|begin|open|call|reach|say|script|how to approach/.test(q)) {
      const opener = OPENER[c.id] || genOpener(c);
      const tps    = TPS[c.id]    || genTPs(c);
      return `Suggested opener: ${opener}<br><br>Lead with: <em>${tps[0]}</em><br><br>Keep it under 30 seconds — goal is to earn the next 5 minutes.`;
    }

    if (/talk|point|discuss|cover|agenda|prep/.test(q)) {
      const tps = TPS[c.id] || genTPs(c);
      return `Talking points for ${fn}:<br>1. ${tps[0]}<br>2. ${tps[1]}<br>3. ${tps[2]}<br><br>If they push back, acknowledge and pivot to the next point. Log the outcome when you're done.`;
    }

    if (/health|risk|status|churn|at.?risk|danger/.test(q)) {
      const healthMsg = {
        r: `<strong>At-risk.</strong> ${fn} hasn't been contacted in ${c.lcd} days and has an active ${c.rec || 'alert'}. Without immediate outreach, churn probability is elevated. Prioritize this call today.`,
        a: `<strong>Needs attention.</strong> ${fn}'s engagement is declining. Contact within the next 3–5 days is recommended to maintain the relationship and act on the open recommendation.`,
        g: `<strong>Healthy.</strong> ${fn}'s account is in good standing. Maintain the regular 10–14 day check-in cadence and look for cross-sell opportunities — propensity is at ${c.prop}%.`,
        x: `<strong>Inactive / no signal.</strong> ${fn} has no current health indicator. They may be newly onboarded or have low engagement. A check-in call is warranted.`,
      };
      return healthMsg[c.health] || `Health status unavailable for ${fn}.`;
    }

    if (/log|outcome|convert|result|after|next step|follow.?up/.test(q)) {
      return `After speaking with ${fn}, log the outcome using the <strong>Log Outcome</strong> section below:<br><br>• <strong>Converted</strong> — product accepted or meeting confirmed. Note what was agreed.<br>• <strong>Pending</strong> — client is interested but not ready. Set a specific follow-up date.<br>• <strong>Dismissed</strong> — client declined. Note their reason — this improves future propensity scoring and resurfaces them in 30–60 days when signals strengthen.`;
    }

    if (/dismiss|decline|said no|not interest|reject/.test(q)) {
      return `Log as <strong>Dismissed</strong> and capture their reason in the notes field. Common patterns worth noting: "not the right time," "already working with another provider," or budget constraints. The model will resurface ${fn} when new signals emerge — typically in 30–60 days, or sooner if a real-time trigger fires.`;
    }

    if (/peer|benchmark|compar|similar|typical/.test(q)) {
      const peerCount    = c.prods.length + 2;
      const peerGapNames = top3Missing.slice(0, 2).map(p => PROD_NAMES[p] || p).join(' and ');
      return `${c.ind} clients at ${c.rev} revenue typically hold <strong>${peerCount} banking products</strong>. ${fn} has ${c.prods.length} — a gap of ${peerCount - c.prods.length} product(s). The most common missing products for this peer group are <strong>${peerGapNames}</strong>.`;
    }

    if (/approach|method|way|how should i|strategy/.test(q)) {
      const method = c.rec === 'rt'      ? 'Phone call — Advice alerts are live intent signals requiring immediate, personal outreach for highest conversion.'
                   : c.lcd >= 14         ? 'Phone call — re-engagement after a long gap is more effective by voice than email.'
                   : c.rec === 'propensity' ? 'Either phone or email — Offer signals are warm but not urgent. A brief personalized email can open the door.'
                   : c.rec === 'rules'   ? 'Phone call — Referrals are most effective when introduced personally with a warm tone.'
                   : 'Phone call or email based on your prior relationship with this client.';
      return `Recommended outreach method for ${fn}: <strong>${method}</strong><br><br>Best time to reach ${c.ind} businesses is typically mid-morning (9–11am) or early afternoon (1–3pm) on Tuesday–Thursday.`;
    }

    if (/summary|overview|brief|prepare|what do i need|what should i know|sum up|catch me up|quick|full picture|situati|what's (going on|the deal|up with)|help me/.test(q)) {
      const why        = WHY[c.id] || genWhy(c);
      const opener     = OPENER[c.id] || genOpener(c);
      const tps        = TPS[c.id]    || genTPs(c);
      const pctWallet  = Math.round((c.prods.length / ALL_PRODS.length) * 100);
      const urgencyFlag = c.health === 'r' ? '🔴 At-risk — contact today.' : c.health === 'a' ? '🟡 Needs attention soon.' : '🟢 Healthy account.';
      const sumHeld     = c.prods.map(p => PROD_NAMES[p] || p).join(', ');
      const sumTopGap   = PROD_NAMES[top3Missing[0]] || top3Missing[0] || 'fully penetrated';
      return `<strong>${fn} · ${c.co}</strong>${c.rec ? ` · ${c.rec.charAt(0).toUpperCase() + c.rec.slice(1)} rec` : ''}<br><br>${urgencyFlag}<br><br><strong>Why now:</strong> ${why}<br><br><strong>Opener:</strong> ${opener}<br><br><strong>Talking points:</strong><br>1. ${tps[0]}<br>2. ${tps[1]}<br>3. ${tps[2]}<br><br><strong>Portfolio:</strong> ${sumHeld} · ${pctWallet}% wallet share · Top gap: ${sumTopGap}.`;
    }

    if (/urgent|flag|alert|red|concern|risk|worried|problem|issue|anything.*(know|note|aware)/.test(q)) {
      const flags = [];
      if (c.health === 'r')      flags.push(`Account is <strong>at-risk</strong> — ${c.lcd} days without contact.`);
      if (c.health === 'a')      flags.push(`Engagement is <strong>declining</strong> — contact window is narrowing.`);
      if (c.lcd >= 14)           flags.push(`<strong>${c.lcd}-day contact gap</strong> exceeds recommended cadence.`);
      if (c.rec === 'rt')        flags.push(`<strong>Advice alert active</strong> — live intent signal detected. Conversion rate drops sharply after 24 hours.`);
      if (c.rec === 'nudge')     flags.push(`<strong>Nudge triggered</strong> — delay risks losing deal momentum or client trust.`);
      if (c.rec === 'propensity') flags.push(`<strong>Offer queued</strong> — ${c.prop}% model score is near peak. Window won't stay this high indefinitely.`);
      if (c.rec === 'rules')     flags.push(`<strong>Referral triggered</strong> — account rule fired. Client should be connected to the relevant product or specialist soon.`);
      if (c.prods.length === 1)  flags.push(`<strong>Single-product client</strong> — high churn risk if that product is disrupted.`);
      if (c.prop >= 75)          flags.push(`<strong>${c.prop}% propensity</strong> — near-peak signal, won't stay this high indefinitely.`);
      if (!flags.length) flags.push(`No critical flags for ${fn} right now. Account looks stable.`);
      return flags.join('<br>') + (c.rec ? `<br><br>Active rec: <strong>${c.rec}</strong>. ${c.trig || ''}` : '');
    }

    if (/relationship|sentiment|how (are|is|do) (they|we)|feel|trust|happy|satisf|loyal/.test(q)) {
      const sentiment = c.health === 'g' ? 'strong' : c.health === 'a' ? 'cooling' : c.health === 'r' ? 'at risk of souring' : 'unclear';
      return `Relationship with ${fn} appears <strong>${sentiment}</strong>. They've been a client since ${c.since} with ${c.prods.length} active product(s). ${c.notes} Last contact was ${c.lc}${c.rec ? ` — there's an open ${c.rec} recommendation that needs follow-up` : ''}.`;
    }

    if (/industry|sector|space|type of business|what (kind|type) of/.test(q)) {
      const ind0 = PROD_NAMES[top3Missing[0]] || top3Missing[0];
      const ind1 = PROD_NAMES[top3Missing[1]] || top3Missing[1] || 'Business Money Market';
      return `${c.co} operates in <strong>${c.ind}</strong> — ${c.loc}, ${c.emp} employees, ${c.rev} revenue. Typical product mix for ${c.ind} businesses at this revenue tier includes ${c.prods.length + 2} banking products. ${fn} currently holds ${c.prods.length}, with <strong>${ind0}</strong> and <strong>${ind1}</strong> as the strongest gaps for this industry profile.`;
    }

    // Client context fallback
    const why       = WHY[c.id] || genWhy(c);
    const pctWallet = Math.round((c.prods.length / ALL_PRODS.length) * 100);
    const recLine   = c.rec
      ? `Active <strong>${c.rec}</strong> recommendation: ${why}`
      : `No active recommendation — but propensity is at <strong>${c.prop}%</strong>.`;
    const heldNames = c.prods.map(p => PROD_NAMES[p] || p).join(', ');
    const topGap    = PROD_NAMES[top3Missing[0]] || top3Missing[0];
    return `Here's what I know about <strong>${fn}</strong>:<br><br>${recLine}<br><br><strong>Portfolio:</strong> ${heldNames} · ${pctWallet}% wallet share. Top gap: <strong>${topGap}</strong>.<br><strong>Last contact:</strong> ${c.lc} · <strong>Propensity:</strong> ${c.prop}% · <strong>Revenue:</strong> ${c.rev} · <strong>Employees:</strong> ${c.emp}.<br><br>${c.notes}`;
  }

  // ── Non-client context — try to match a mentioned client name ──
  const mentionedClient = D.clients.find(cl => {
    const parts = [cl.name.toLowerCase(), cl.co.toLowerCase(), cl.name.split(' ')[0].toLowerCase()];
    return parts.some(part => part.length > 3 && q.includes(part));
  });
  if (mentionedClient) {
    const mc         = mentionedClient;
    const fn         = mc.name.split(' ')[0];
    const missing2   = ['Treasury','BLOC','LOC','CD','Payroll','Card','Merchant Services','Business Savings'].filter(p => !mc.prods.includes(p));
    const pctWallet2 = Math.round((mc.prods.length / 8) * 100);
    const recLine2   = mc.rec ? `Active <strong>${mc.rec}</strong> rec — ${mc.trig || 'recommendation triggered'}` : `No active recommendation (propensity: ${mc.prop}%)`;
    const healthLabel = { r: '🔴 At-risk', a: '🟡 Needs attention', g: '🟢 Healthy', x: '⚪ No signal' }[mc.health] || '';
    return `<strong>${fn} · ${mc.co}</strong> · ${healthLabel}<br><br>${recLine2}<br><br><strong>Portfolio:</strong> ${mc.prods.join(', ')} · ${pctWallet2}% wallet share. Gaps: ${missing2.slice(0, 3).join(', ')}.<br><strong>Revenue:</strong> ${mc.rev} · <strong>Employees:</strong> ${mc.emp} · <strong>Last contact:</strong> ${mc.lc}<br><br>${mc.notes}`;
  }

  if (/cd|matur/.test(q))
    return `<strong>Harmon Legal Group</strong> has a CD maturing in 28 days with no renewal outreach logged. They're rate-sensitive — reach out before they shop competing rates. Recommendation type: Rules-based. They're on today's outreach list.`;

  if (/nudge|overdue|stall/.test(q))
    return `Two active recommendations require immediate outreach: <strong>Palo Verde Catering</strong> (Offer — $185K deposit, 72% propensity, Business Money Market opportunity) and <strong>Ridgeline Services</strong> (Nudge — equipment financing proposal stalled at 14 days, at risk of going cold). Both need contact today.`;

  if (/coverage|percent|rate/.test(q)) {
    const noContact = D.clients.filter(c => c.lcd >= 30).length;
    return `Portfolio coverage is at <strong>68%</strong>. <strong>${noContact} clients</strong> have had no contact in 30+ days. Meza Group is the highest churn risk at 38 days with a single product. At-risk count: ${D.clients.filter(c => c.health === 'r').length}.`;
  }

  if (/propensity|highest|best score/.test(q))
    return `Top propensity clients today: <strong>Brightwell Inc. (82%)</strong>, Palo Verde Catering (72%), Blue Heron LLC (65%), Palo Verde Health (55%). All four have open recommendations — Brightwell Inc. has the highest score but no active rec, making it an opportunistic call.`;

  if (/priority|who first|start|begin|today|call|morning|plan my/.test(q))
    return `Priority outreach today: <strong>1. Palo Verde Catering</strong> — active Offer, $185K deposit signal, 72% propensity, Business Money Market opportunity. <strong>2. Ridgeline Services</strong> — proposal stalled 14 days, risk of losing deal. <strong>3. Harmon Legal Group</strong> — CD maturing in 28 days, Referral not yet actioned. <strong>4. Blue Heron LLC</strong> — Offer triggered, payroll up 34%.`;

  if (/book|how many|total|all client/.test(q)) {
    const atRisk    = D.clients.filter(c => c.health === 'r').length;
    const needAttn  = D.clients.filter(c => c.health === 'a').length;
    const healthy   = D.clients.filter(c => c.health === 'g').length;
    const openRecs  = D.clients.filter(c => c.rec).length;
    return `Your book has <strong>${D.clients.length} total clients</strong>: ${atRisk} at-risk, ${needAttn} need attention, ${healthy} healthy. <strong>${openRecs} clients</strong> have open recommendations today. Portfolio coverage: 68%.`;
  }

  if (/at.?risk|churn|danger/.test(q))
    return `At-risk clients: <strong>Palo Verde Catering</strong> (Offer active — $185K deposit, cash mgmt opportunity) and <strong>Ridgeline Services</strong> (proposal stalled, 14 days). Both need outreach today. Use the <em>Needs contact</em> filter in Clients view for the full at-risk list — ${D.clients.filter(c => c.lcd >= 28).length} clients have had no contact in 28+ days.`;

  if (/tier i|tier 1|top|premium/.test(q))
    return `Your Tier I clients include Palo Verde Catering, Palo Verde Health, Brightwell Inc., and Meza Group. Tier I accounts should be contacted at least every 7 days. Of these, Meza Group is the most overdue at 38 days.`;

  if (/activity|log|outcome|conversion|win/.test(q)) {
    const conv2 = D.activity.filter(a => a.out === 'c').length;
    const pend  = D.activity.filter(a => a.out === 'p').length;
    const dism  = D.activity.filter(a => a.out === 'd').length;
    return `Activity this period: <strong>${conv2} conversions</strong>, ${pend} pending, ${dism} dismissed. Most recent win: <strong>Brightwell Inc.</strong> — Treasury offer accepted (Offer recommendation). Last pending: <strong>Palo Verde Health</strong> — Advice acted on, terms sheet sent for loan inquiry.`;
  }

  if (/outreach|list|today|dashboard/.test(q))
    return `Today's outreach list has <strong>${D.clients.filter(c => c.rec).slice(0, 8).length} clients</strong>: an Offer for Palo Verde Catering and a Nudge for Ridgeline Services, an Offer for Blue Heron LLC, a Referral alert for Harmon Legal Group, and an Advice alert for Palo Verde Health.`;

  if (/summary|overview|brief|how am i|doing|snapshot|what's (going on|happening|my)|catch me up|morning|help/.test(q)) {
    const atRisk   = D.clients.filter(c => c.health === 'r').length;
    const noContact = D.clients.filter(c => c.lcd >= 30).length;
    const openRecs  = D.clients.filter(c => c.rec).length;
    const conv2     = D.activity.filter(a => a.out === 'c').length;
    return `Here's your snapshot for today:<br><br><strong>Outreach list:</strong> ${openRecs} clients with open recommendations — top priority is <strong>Palo Verde Catering</strong> (Offer, $185K deposit signal, 72% propensity) and <strong>Ridgeline Services</strong> (Nudge, proposal stalling).<br><br><strong>Book health:</strong> ${atRisk} at-risk, ${noContact} with no contact in 30+ days, 68% coverage rate.<br><br><strong>Activity:</strong> ${conv2} conversions logged this month. <strong>Palo Verde Health</strong> and <strong>Irongate Construction</strong> have pending outcomes awaiting follow-up.<br><br><strong>Highest propensity:</strong> Brightwell Inc. (82%), Palo Verde Catering (72%), Blue Heron LLC (65%).`;
  }

  if (/product|treasury|bloc|loc|cd|payroll|card|merchant|saving/.test(q))
    return `Across today's outreach list, the most common product opportunities are: <strong>Treasury</strong> (Brightwell Inc., Blue Heron), <strong>LOC / BLOC</strong> (Ridgeline Services, Palo Verde Health), and <strong>CD renewal</strong> (Harmon Legal Group). Navigate to a client profile to see their specific product gap and wallet share.`;

  if (/recommend|rec\b|suggestion|who (to|should) call|what (rec|action)/.test(q))
    return `Open recommendations today: <strong>Palo Verde Catering</strong> (Offer — cash mgmt, $185K deposit), <strong>Ridgeline Services</strong> (Nudge — stalled proposal), <strong>Blue Heron LLC</strong> (Offer — payroll growth), <strong>Harmon Legal Group</strong> (Referral — CD maturing), <strong>Palo Verde Health</strong> (Advice — web intent). Click any client on the dashboard to see the full brief.`;

  // General fallback
  {
    const atRisk   = D.clients.filter(c => c.health === 'r').length;
    const openRecs  = D.clients.filter(c => c.rec).length;
    const noContact = D.clients.filter(c => c.lcd >= 30).length;
    return `I'm not sure I caught that — here's what's most relevant right now:<br><br>• <strong>${openRecs} open recommendations</strong> on today's outreach list<br>• <strong>${atRisk} at-risk clients</strong> needing immediate contact<br>• <strong>${noContact} clients</strong> with no contact in 30+ days<br>• Top priority: <strong>Palo Verde Catering</strong> (Offer, 72% propensity, $185K deposit) → open their profile for the full brief<br><br>Try asking: "Who should I call first?", "What's my coverage rate?", or name a specific client.`;
  }
}
