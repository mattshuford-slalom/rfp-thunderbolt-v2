/* ============================================================
   VIEWS — render orchestrator and all view/component renderers
   ============================================================ */

/* ── RENDER ORCHESTRATOR ────────────────────────────────── */
function render() {
  renderTopbar();
  renderSidebar();
  renderMain();
  renderCopilot();
}

/* ── TOPBAR ─────────────────────────────────────────────── */
function renderTopbar() {
  document.getElementById('topbar').innerHTML = `
    <a class="tb-logo" href="#/dashboard"><img src="images.jpg" alt="Truist" style="height:40px;width:auto;object-fit:contain;flex-shrink:0"/><div class="tb-logo-text"><span class="tb-brand">THUNDERBOLT</span><span class="tb-sub">Small Business RM Portal</span></div></a>
    <div class="tb-spacer"></div>
    <span class="tb-date">${D.day}</span>
    <button class="tb-cop ${S.copOpen ? 'on' : ''}" onclick="toggleCop()"><img src="microsoft_copilot-logo_brandlogos.net_zaqzr.png" style="width:16px;height:16px;vertical-align:middle;margin-right:2px">Copilot</button>
    <div style="display:flex;align-items:center;gap:10px">
      <div class="tb-av-info"><span class="tb-av-name">${D.rm.name}</span><span class="tb-av-role">Relationship Manager</span></div>
      <div class="tb-av">${D.rm.initials}</div>
    </div>`;
}

/* ── SIDEBAR ────────────────────────────────────────────── */
function renderSidebar() {
  const av = S.view;
  document.getElementById('sidebar').innerHTML = `
    <a class="sb-ic ${av === 'dashboard' ? 'on' : ''}" href="#/dashboard" title="Tasks">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>
      Tasks
    </a>
    <a class="sb-ic ${av === 'book' ? 'on' : ''}" href="#/book" title="Clients">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="5" height="12" rx="1"/><rect x="9" y="2" width="5" height="7" rx="1"/><rect x="9" y="11" width="5" height="3" rx="1"/></svg>
      Clients
    </a>
    <div class="sb-div"></div>
    <a class="sb-ic ${av === 'activity' ? 'on' : ''}" href="#/activity" title="Activity">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,12 5,8 8,10 11,5 14,7"/></svg>
      Activity
    </a>`;
}

/* ── MAIN ───────────────────────────────────────────────── */
function renderMain() {
  const el = document.getElementById('main');
  if (S.view === 'dashboard')   el.innerHTML = vDashboard();
  else if (S.view === 'client') { el.innerHTML = vClient(); el.scrollTop = 0; }
  else if (S.view === 'book')   el.innerHTML = vBook();
  else if (S.view === 'activity') el.innerHTML = vActivity();
  const bs = document.getElementById('book-s');
  if (bs) bs.oninput = e => { S.bsearch = e.target.value; refreshBook(); };
  const as = document.getElementById('act-s');
  if (as) as.oninput = e => { S.asearch = e.target.value; refreshActivity(); };
}

/* ============================================================
   VIEW: DASHBOARD
   ============================================================ */
function vDashboard() {
  const allRec   = D.clients.filter(c => c.rec).slice(0, 8);
  const active    = allRec.filter(c => !S.completedIds[c.id]);
  const completed = allRec.filter(c =>  S.completedIds[c.id]);
  const completedSection = `
    <div class="completed-hd"><span class="completed-lbl">Completed</span>${completed.length ? `<span class="completed-ct">${completed.length}</span>` : ''}</div>
    <div style="padding:14px">${completed.length
      ? `<div class="card-grid">${completed.map(c => completedCardHTML(c, S.completedIds[c.id])).join('')}</div>`
      : `<div class="empty" style="padding:18px 0"><div class="empty-txt" style="color:var(--tx3);font-size:13px">No completed outreach yet — outcomes logged here after saving</div></div>`
    }</div>`;
  return `<div class="content">
    <div class="lcard">
      <div class="lcard-hd"><span class="lcard-lbl">Today's outreach list</span><span class="lcard-ct">${active.length} clients</span></div>
      <div style="padding:14px">${active.length
        ? `<div class="card-grid">${active.map(c => cardHTML(c)).join('')}</div>`
        : `<div class="empty"><div class="empty-ic">✅</div><div class="empty-txt">All outreach for today is complete</div></div>`
      }</div>
      ${completedSection}
    </div>
  </div>`;
}

function completedCardHTML(c, info) {
  const outLabels = { c: 'Converted', p: 'Pending', d: 'Dismissed' };
  const chipClass = info.out === 'c' ? 'done-chip' : info.out === 'p' ? 'done-chip pend' : 'done-chip dism';
  const outLabel  = outLabels[info.out] || 'Logged';
  const hcls   = c.health === 'r' ? ' h-r' : c.health === 'a' ? ' h-a' : '';
  const recCls = c.rec ? ` rec-${c.rec === 'propensity' ? 'prop' : c.rec}` : '';
  return `<div class="ocard done${hcls}${recCls}" onclick="go('/client/${c.id}')">
    <div class="ocard-co">${esc(c.co)}</div>
    <div class="ocard-pill-row">${badge(c.rec)}<span class="ocard-time">${esc(c.rt || '')}</span></div>
    <div class="done-row"><span class="${chipClass}">✓ ${outLabel}</span><span class="done-ts">${info.ts || 'Today'}</span></div>
    <div class="act-row" onclick="event.stopPropagation()" style="margin-top:8px">
      <button class="btn pri" style="font-size:13px;padding:6px 14px" onclick="viewOutcomeModal(${c.id})">View Outcome</button>
    </div>
  </div>`;
}

function rowHTML(c) {
  const ml     = (c.health === 'r' || c.health === 'a') ? '8px' : '14px';
  const stripe = c.health === 'r' ? '<div class="ns r"></div>' : c.health === 'a' ? '<div class="ns a"></div>' : '';
  return `<div class="crow" onclick="go('/client/${c.id}')">
    ${stripe}
    <div class="cav" style="margin-left:${ml}">${c.ini}</div>
    <div class="cbody"><div class="cname">${esc(c.name)}</div><div class="ctrig">${esc(c.trig || c.co)}</div></div>
    <div class="cr-r">${badge(c.rec)}<span class="ctime">${c.rt || ''}</span></div>
    <span class="chev">›</span>
  </div>`;
}

function cardHTML(c) {
  const hcls   = c.health === 'r' ? ' h-r' : c.health === 'a' ? ' h-a' : '';
  const recCls = c.rec ? ` rec-${c.rec === 'propensity' ? 'prop' : c.rec}` : '';
  const why    = WHY[c.id]    || genWhy(c);
  return `<div class="ocard${hcls}${recCls}" onclick="go('/client/${c.id}')">
    <div class="ocard-co">${esc(c.co)}</div>
    <div class="ocard-pill-row">${badge(c.rec)}<span class="ocard-time">${esc(c.rt || '')}</span></div>
    <div class="sblock"><div class="sbtitle">Why now</div><div class="sbbody">${why}</div></div>
    <div class="act-row" onclick="event.stopPropagation()">
      <button class="btn pri" onclick="openModal('call',${c.id})">Call now</button>
      <button class="btn" onclick="openModal('email',${c.id})">Draft email</button>
    </div>
  </div>`;
}

function badge(t) {
  if (!t) return '';
  const cls = { nudge: 'b-nudge', propensity: 'b-prop', rules: 'b-rules', rt: 'b-rt' };
  const lbl = { nudge: 'Nudge',   propensity: 'Offer',  rules: 'Referral', rt: 'Advice' };
  return `<span class="badge ${cls[t]}">${lbl[t]}</span>`;
}

/* ============================================================
   VIEW: CLIENT WORKSPACE
   ============================================================ */
function vClient() {
  const c  = D.clients.find(x => x.id === S.cid) || D.clients[0];
  const sd = lbl => `<div class="sec-div"><span class="sec-div-lbl">${lbl}</span><span class="sec-div-line"></span></div>`;
  return `
    <div class="ch">
      <div class="chav">${c.ini}</div>
      <div>
        <div class="chname">${esc(c.name)} — ${esc(c.co)}</div>
        <div class="chsub">${c.loc} · Client since ${c.since}</div>
        <div class="chbadges">${c.rec ? badge(c.rec) : ''}${c.prop >= 55 ? `<span class="badge b-prop">${c.prop}% propensity</span>` : ''}</div>
      </div>
    </div>
    <div class="tcont" id="tcont">
      ${sd('Recommendation')}${tRec(c)}
      ${sd('Log Outcome')}${tLog(c)}
      ${sd('Portfolio Position')}${tPort(c)}
      ${sd('Client Context')}${tCtx(c)}
    </div>`;
}

function switchTab(t) {
  S.tab = t;
  document.querySelectorAll('.tab').forEach(el => el.classList.toggle('on', el.getAttribute('onclick').includes("'" + t + "'")));
  const c = D.clients.find(x => x.id === S.cid);
  document.getElementById('tcont').innerHTML = tabContent(c);
  const as = document.getElementById('act-s');
  if (as) as.oninput = e => { S.asearch = e.target.value; refreshActivity(); };
}

function tabContent(c) {
  if (S.tab === 'rec')  return tRec(c);
  if (S.tab === 'ctx')  return tCtx(c);
  if (S.tab === 'port') return tPort(c);
  if (S.tab === 'log')  return tLog(c);
  return '';
}

/* ── RECOMMENDATION TAB ─────────────────────────────────── */
function tRec(c) {
  const why    = WHY[c.id]    || genWhy(c);
  const opener = OPENER[c.id] || genOpener(c);
  const tps    = TPS[c.id]    || genTPs(c);
  return `
    <div class="two-col">
      <div class="sblock"><div class="sbtitle">Why now</div><div class="sbbody">${why}</div></div>
      <div class="sblock"><div class="sbtitle">Copilot brief</div><div class="sbbody"><strong>Opener:</strong> ${opener}</div></div>
    </div>
    <div class="sblock">
      <div class="sbtitle">Talking points</div>
      <div class="tp-list">${tps.map((tp, i) => `<div class="tp-item"><span class="tp-n">${i + 1}.</span><span>${tp}</span></div>`).join('')}</div>
    </div>
    <div class="act-row">
      <button class="btn pri" onclick="openModal('call',${c.id})">Call now</button>
      <button class="btn" onclick="openModal('email',${c.id})">Draft email</button>
    </div>`;
}

function genWhy(c) {
  const templates = {
    nudge: [
      `<strong>${c.lcd} days since last RM contact</strong> — propensity at ${c.prop}% suggests high receptivity. Re-engagement window is open now.`,
      `<strong>No outreach logged in ${c.lcd} days</strong> — last interaction indicated interest in expanding the relationship. Competitor risk is elevated.`,
      `<strong>Contact gap of ${c.lcd} days with normal account activity</strong> — client is active but unengaged. Optimal moment to reconnect.`,
      `<strong>${c.lcd}-day contact lapse</strong> — ${c.prop}% propensity score is the highest in the past 90 days for this account.`,
    ],
    propensity: [
      `<strong>Transaction patterns indicate readiness for a new product conversation</strong> — ${c.prop}% propensity, top quartile for ${esc(c.ind)}.`,
      `<strong>Revenue at ${esc(c.rev)} with only ${c.prods.length} active product(s)</strong> — significant wallet share uncaptured. ${c.prop}% propensity confirmed.`,
      `<strong>Under-penetrated vs. comparable ${esc(c.ind)} clients at ${esc(c.rev)}</strong> — peer benchmark shows ${c.prods.length + 2} products typical for this profile.`,
      `<strong>Current mix of ${c.prods.slice(0, 2).map(p => esc(p)).join(' and ')} leaves cross-sell opportunity open</strong> — ${c.prop}% propensity score based on spending patterns.`,
    ],
    rules: [
      `<strong>Account meets threshold for treasury services</strong> — ${esc(c.ind)} profile at ${esc(c.rev)} revenue qualifies. No outreach initiated yet.`,
      `<strong>CD or term product nearing maturity with no renewal outreach logged</strong> — rate-sensitive client, window is closing.`,
      `<strong>${esc(c.co)} holds ${c.prods.length} product(s) vs. ${c.prods.length + 2} typical for comparable ${esc(c.ind)} clients</strong> — product gap warrants a conversation.`,
      `<strong>BLOC utilization above 70%</strong> — may indicate need for a limit increase or supplemental credit line. Good time to check in.`,
    ],
    rt: [
      `<strong>Browsed financing options on truist.com within the last 24 hours</strong> — high-intent signal. Best window to reach out is now.`,
      `<strong>Wire transfer above average velocity received this morning</strong> — possible liquidity event or contract close. Cash management conversation is timely.`,
      `<strong>Application started but not completed on truist.com</strong> — active need indicated. ${c.prop}% propensity confirms product fit.`,
      `<strong>Large ACH payment received today</strong> — possible contract close or capital infusion. Opportunity to introduce sweep or treasury tools.`,
    ],
  };
  const pool = templates[c.rec] || templates.nudge;
  return pool[c.id % pool.length];
}

function genOpener(c) {
  const fn = esc(c.co.split(' ')[0]);
  const openers = [
    `"Hi, I was reviewing your account and noticed some activity I wanted to follow up on — do you have a few minutes this week?"`,
    `"${fn}, I've been keeping an eye on your account and think there's a timely opportunity worth a quick conversation."`,
    `"I wanted to reach out personally — I noticed some signals in your account that I think are worth discussing."`,
    `"Hi, I'm calling because our system flagged your account for a time-sensitive conversation — happy to walk you through what we're seeing."`,
    `"${fn}, based on your recent activity, I think we have a product that could be a strong fit. Mind if I take 5 minutes to explain?"`,
    `"I was going through my book this morning and your account stood out — wanted to make sure we're supporting you in the right ways."`,
  ];
  return openers[c.id % openers.length];
}

function genTPs(c) {
  const allTPs = [
    `Review current product mix — ${c.prods.length} active product(s) vs. ${c.prods.length + 2} typical for ${esc(c.ind)} clients at ${esc(c.rev)}.`,
    `Explore treasury management fit given current revenue trajectory and employee headcount (${c.emp}).`,
    `Discuss business line of credit to support operational flexibility and working capital.`,
    `Introduce sweep account options to optimize idle cash between billing cycles.`,
    `Review CD or savings laddering strategy to improve liquidity without sacrificing yield.`,
    `Ask about upcoming capital needs — equipment, expansion, or hiring — to position lending products early.`,
    `Highlight Merchant Services if retail/service volume is growing — fee savings opportunity.`,
    `Discuss payroll integration if headcount is above 10 — simplify ops and deepen relationship.`,
    `Identify referral potential — clients in ${esc(c.ind)} often have strong professional networks.`,
    `Ask about personal banking relationship — Premier referral opportunity if deposits exceed threshold.`,
  ];
  const i = c.id % allTPs.length;
  return [allTPs[i], allTPs[(i + 3) % allTPs.length], allTPs[(i + 6) % allTPs.length]];
}

/* ── CONTEXT TAB ────────────────────────────────────────── */
function tCtx(c) {
  return `<div class="cgrid">
    <div class="citem"><div class="ckey">Industry</div><div class="cval">${c.ind}</div></div>
    <div class="citem"><div class="ckey">Annual Revenue</div><div class="cval">${c.rev}</div></div>
    <div class="citem"><div class="ckey">Employees</div><div class="cval">${c.emp}</div></div>
    <div class="citem"><div class="ckey">Location</div><div class="cval">${c.loc}</div></div>
    <div class="citem"><div class="ckey">Client Since</div><div class="cval">${c.since}</div></div>
    <div class="citem"><div class="ckey">Tier</div><div class="cval">${c.tier}</div></div>
    <div class="citem" style="grid-column:span 2"><div class="ckey">RM Notes</div><div class="cval sm">${esc(c.notes)}</div></div>
  </div>`;
}

/* ── PORTFOLIO TAB ──────────────────────────────────────── */
function pbal(cid, prod) {
  const n = ((cid * 31 + prod.charCodeAt(0)) * 1664525 + 1013904223) >>> 0;
  return (n % 800) + 100;
}
const PSTATUS = {
  CD: 'Matures 28d', Treasury: 'Full suite', Payroll: 'Processing',
  BLOC: 'Active', LOC: 'Active', Checking: 'Primary',
  Card: 'Active', 'Merchant Services': 'Active', 'Business Savings': 'Active',
};
function tPort(c) {
  const topMissing = rankMissingProds(c).slice(0, 3);
  const prodMeta = {
    Treasury: 'cash management suite', Payroll: 'automated payroll', BLOC: 'revolving credit',
    LOC: 'revolving credit', CD: 'fixed-term deposit', Card: 'cash back rewards',
    'Merchant Services': 'payment acceptance', 'Business Savings': 'money market', Checking: 'primary checking',
  };
  return `
    <div class="sblock">
      <div class="sbtitle">Current products (${c.prods.length})</div>
      ${c.prods.map(p => `
        <div class="pi">
          <div><div class="pi-name">${PROD_NAMES[p] || p}</div><div class="pi-meta">$${pbal(c.id, p)}K · ${prodMeta[p] || 'active'}</div></div>
          <div class="pi-badge">${PSTATUS[p] || 'Active'}</div>
        </div>`).join('')}
    </div>
    <div class="sblock">
      <div class="sbtitle">Opportunities</div>
      <div class="sbbody">Based on ${esc(c.co)}'s profile (${c.ind} · ${c.rev} · ${c.emp} employees), top cross-sell opportunities:<br><strong>${topMissing.map(p => PROD_NAMES[p] || p).join(', ')}</strong>.<br><br>${c.prop}% propensity score — comparable ${c.ind} firms hold ${c.prods.length + 2} products on average.</div>
    </div>`;
}

/* ── LOG OUTCOME TAB ────────────────────────────────────── */
function tLog(c) {
  const sel = S.logOut;
  return `<div style="display:flex;flex-direction:column;gap:14px">
    <div class="form-row">
      <div class="form-lbl">Outcome</div>
      <div class="radio-grp">
        <div class="rchip ${sel === 'c' ? 's-conv' : ''}" onclick="setOut('c')">✓ Converted</div>
        <div class="rchip ${sel === 'p' ? 's-pend' : ''}" onclick="setOut('p')">~ Still pending</div>
        <div class="rchip ${sel === 'd' ? 's-dism' : ''}" onclick="setOut('d')">— Dismissed</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-lbl">Contact method</div>
      <select class="fselect" id="log-method"><option>Phone call</option><option>Email</option><option>In-person meeting</option><option>Video call</option></select>
    </div>
    <div class="form-row">
      <div class="form-lbl">Notes</div>
      <textarea class="ftextarea" id="log-notes" rows="4" placeholder="What happened? Any follow-up needed?"></textarea>
    </div>
    <div class="act-row">
      <button class="btn pri" onclick="submitLog()">Save outcome</button>
      <button class="btn" onclick="switchTab('rec')">Cancel</button>
    </div>
  </div>`;
}

function setOut(o) {
  S.logOut = o;
  document.querySelectorAll('.rchip').forEach(el => {
    const clicked = el.getAttribute('onclick').includes("'" + o + "'");
    el.className = 'rchip' + (clicked ? (o === 'c' ? ' s-conv' : o === 'p' ? ' s-pend' : ' s-dism') : '');
  });
}

function submitLog() {
  if (!S.logOut) { showToast('⚠ Please select an outcome'); return; }
  const c      = D.clients.find(x => x.id === S.cid);
  const notes  = document.getElementById('log-notes')?.value?.trim() || '';
  const method = document.getElementById('log-method')?.value || 'Phone call';
  const lbls   = { c: 'Converted', p: 'Pending', d: 'Dismissed' };
  D.activity.unshift({ id: Date.now(), cn: c.name, desc: `Outcome logged: ${lbls[S.logOut]} · ${notes || 'No additional notes'}`, out: S.logOut, time: 'Just now', method });
  S.completedIds[S.cid] = { out: S.logOut, method, ts: 'Today', notes: notes || '' };
  S.logOut = null;
  showToast('✓ Outcome logged successfully');
  go('/dashboard');
}

/* ============================================================
   VIEW: MY BOOK
   ============================================================ */
function vBook() {
  const nc = D.clients.filter(c => c.lcd >= 30).length;
  return `<div class="content">
    <div class="stat-row">
      <div class="stat-box"><div class="stat-n">${D.clients.length}</div><div class="stat-l">Total clients</div></div>
      <div class="stat-box is-ok"><div class="stat-n ok">68%</div><div class="stat-l">Coverage rate</div></div>
      <div class="stat-box is-warn"><div class="stat-n warn">${nc}</div><div class="stat-l">No contact 30+ days</div></div>
    </div>
    <div class="lcard">
      <div class="sbar">
        <input class="sinput" id="book-s" placeholder="Search clients…" value="${esc(S.bsearch)}"/>
        <span class="fpill ${S.bfilter === 'all'   ? 'on' : ''}" onclick="setBF('all')">All</span>
        <span class="fpill ${S.bfilter === 'nocon' ? 'on' : ''}" onclick="setBF('nocon')">Needs contact</span>
        <span class="fpill ${S.bfilter === 'orec'  ? 'on' : ''}" onclick="setBF('orec')">Open rec</span>
      </div>
      <div class="col-hd">
        <div class="col-l">Client</div>
        <div class="col-l">Health</div>
        <div class="col-l">Last contact</div>
        <div class="col-l">Open rec</div>
        <div class="col-l">Products</div>
      </div>
      <div id="book-rows">${bookRows()}</div>
    </div>
  </div>`;
}

function bookRows() {
  let cs = D.clients;
  if (S.bsearch) { const q = S.bsearch.toLowerCase(); cs = cs.filter(c => c.name.toLowerCase().includes(q) || c.co.toLowerCase().includes(q)); }
  if (S.bfilter === 'risk')  cs = cs.filter(c => c.health === 'r' || c.health === 'a');
  else if (S.bfilter === 'nocon') cs = cs.filter(c => c.lcd >= 28);
  else if (S.bfilter === 'orec')  cs = cs.filter(c => c.rec);
  if (!cs.length) return `<div class="empty"><div class="empty-ic">🔍</div><div class="empty-txt">No clients match your search</div></div>`;
  const rhPill = c => {
    if (c.lcd <= 15) return `<span class="rh-pill rh-ok">Healthy</span>`;
    if (c.lcd <= 30) return `<span class="rh-pill rh-attn">Needs Attention</span>`;
    return `<span class="rh-pill rh-risk">At Risk</span>`;
  };
  return cs.map(c => `
    <div class="bgrow" onclick="go('/client/${c.id}')">
      <div><div class="bgname">${esc(c.name)}</div><div class="bgmeta">${esc(c.co)}</div></div>
      <div>${rhPill(c)}</div>
      <div class="bgmeta">${esc(c.lc)}</div>
      <div>${c.rec ? badge(c.rec) : '<span class="bgmeta">—</span>'}</div>
      <div class="bgmeta">${c.prods.join(', ')}</div>
    </div>`).join('');
}

function setBF(f) {
  S.bfilter = f; S.bsearch = '';
  document.querySelectorAll('.fpill').forEach(el => {
    const pf = el.getAttribute('onclick').match(/setBF\('(\w+)'\)/)?.[1];
    el.classList.toggle('on', pf === f);
  });
  re('book-rows', bookRows()); rebind();
}
function refreshBook() { re('book-rows', bookRows()); }

/* ============================================================
   VIEW: ACTIVITY LOG
   ============================================================ */
function vActivity() {
  const conv = D.activity.filter(a => a.out === 'c').length;
  const pend = D.activity.filter(a => a.out === 'p').length;
  return `<div class="content">
    <div class="stat-row">
      <div class="stat-box is-ok"><div class="stat-n ok">${conv}</div><div class="stat-l">Converted this month</div></div>
      <div class="stat-box"><div class="stat-n">${pend}</div><div class="stat-l">Pending outcomes</div></div>
      <div class="stat-box"><div class="stat-n">${D.activity.length}</div><div class="stat-l">Total actions logged</div></div>
    </div>
    <div class="lcard">
      <div class="sbar">
        <input class="sinput" id="act-s" placeholder="Search activity…" value="${esc(S.asearch)}"/>
        <span class="fpill ${S.afilter === 'all' ? 'on' : ''}" onclick="setAF('all')">All</span>
        <span class="fpill ${S.afilter === 'c'   ? 'on' : ''}" onclick="setAF('c')">Converted</span>
        <span class="fpill ${S.afilter === 'p'   ? 'on' : ''}" onclick="setAF('p')">Pending</span>
        <span class="fpill ${S.afilter === 'd'   ? 'on' : ''}" onclick="setAF('d')">Dismissed</span>
      </div>
      <div id="act-rows">${actRows()}</div>
    </div>
  </div>`;
}

function actRows() {
  let acts = [...D.activity];
  if (S.asearch) { const q = S.asearch.toLowerCase(); acts = acts.filter(a => a.cn.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)); }
  if (S.afilter !== 'all') acts = acts.filter(a => a.out === S.afilter);
  acts.sort((a, b) => {
    const p = t => { const [m, d, y] = t.split('/'); return y && m && d ? new Date(`20${y}`, m - 1, d) : new Date(0); };
    return p(b.time) - p(a.time);
  });
  if (!acts.length) return `<div class="empty"><div class="empty-ic">🔍</div><div class="empty-txt">No results match your filter</div></div>`;
  const outLbl  = { c: 'Converted', p: 'Pending',  d: 'Dismissed' };
  const outCls  = { c: 'tl-out-c',  p: 'tl-out-p', d: 'tl-out-d'  };
  const dotCls  = { c: 'o-c',       p: 'o-p',       d: 'o-d'       };
  const dotIc   = { c: '✓',         p: '~',          d: '—'          };
  const methodIc = { 'Phone call': '📞', 'Email': '✉️', 'In-person meeting': '🤝', 'Video call': '💻' };
  return `<div class="tl-wrap">${acts.map((a, i) => {
    const mi         = methodIc[a.method] || '📋';
    const recBadge   = a.rec ? badge(a.rec) : '';
    const client     = D.clients.find(c => c.name === a.cn || c.co === a.cn);
    const clientEl   = client
      ? `<div class="tl-client link" onclick="go('/client/${client.id}')">${esc(a.cn)}</div>`
      : `<div class="tl-client link" onclick="go('/book')">${esc(a.cn)}</div>`;
    return `<div class="tl-item">
      <div class="tl-date">${esc(a.time)}</div>
      <div class="tl-spine">
        <div class="tl-dot ${dotCls[a.out]}">${dotIc[a.out]}</div>
        ${i < acts.length - 1 ? '<div class="tl-line"></div>' : ''}
      </div>
      <div class="tl-card">
        ${clientEl}
        <div class="tl-meta">
          ${recBadge}
          <span class="tl-outcome ${outCls[a.out]}">${outLbl[a.out]}</span>
          <span class="tl-method">${mi} ${esc(a.method || '')}</span>
        </div>
        <div class="tl-notes">${esc(a.desc)}</div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function setAF(f) {
  S.afilter = f; S.asearch = '';
  document.querySelectorAll('.fpill').forEach(el => {
    const pf = el.getAttribute('onclick').match(/setAF\('(\w+)'\)/)?.[1];
    if (pf !== undefined) el.classList.toggle('on', pf === f);
  });
  re('act-rows', actRows()); rebind();
}
function refreshActivity() { re('act-rows', actRows()); }
