/* ============================================================
   APP — modals, email drafts, outcome logging, and init
   ============================================================ */

/* ── MODALS ──────────────────────────────────────────────── */
function openModal(type, cid) {
  const c       = D.clients.find(x => x.id === cid) || D.clients[0];
  const overlay = document.getElementById('overlay');
  const modal   = document.getElementById('modal');
  overlay.classList.remove('off');

  if (type === 'call') {
    const tps = TPS[c.id] || ['Review product holdings.', 'Discuss financial needs.', 'Identify cross-sell opportunities.'];
    modal.innerHTML = `
      <div class="mhd"><span class="mttl">📞 Call prep — ${esc(c.name)}</span><button class="mx" onclick="closeModal()">✕</button></div>
      <div class="mbody">
        <div class="msec"><div class="mlbl">Opener</div><div class="mval hi">${OPENER[c.id] || '"Hi, checking in to see how we can support your business."'}</div></div>
        <div class="msec"><div class="mlbl">Client context</div><div class="mval">${esc(c.notes)}</div></div>
        <div class="msec"><div class="mlbl">Talking points</div><div class="mval">${tps.map((t, i) => `${i + 1}. ${t}`).join('<br>')}</div></div>
      </div>
      <div class="mfooter">
        <button class="btn" onclick="closeModal()">Close</button>
        <button class="btn pri" onclick="showLogModal(${c.id})">Mark as called</button>
      </div>`;
  } else if (type === 'email') {
    window._emailDraftVariant        = window._emailDraftVariant || {};
    window._emailDraftVariant[c.id]  = 0;
    const draft = genEmailDraft(c, 0);
    modal.innerHTML = `
      <div class="mhd"><span class="mttl">✉️ Draft email — ${esc(c.name)}</span><button class="mx" onclick="closeModal()">✕</button></div>
      <div class="mbody">
        <div class="msec"><div class="mlbl">To</div><div class="mval">${esc(c.name)} · ${esc(c.co)}</div></div>
        <div class="msec"><div class="mlbl">Subject</div><input class="ftextarea" id="email-subj" style="margin-top:4px;padding:7px 10px;resize:none;height:auto" value="${esc(draft.subj)}"></div>
        <div class="msec"><div class="mlbl">Draft body (editable)</div><textarea class="ftextarea" id="email-body" rows="9" style="margin-top:4px">${draft.body}</textarea></div>
      </div>
      <div class="mfooter">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn" onclick="redraftEmail(${c.id})">↻ Re-draft</button>
        <button class="btn" onclick="closeModal();showToast('✉️ Email draft saved')">Save draft</button>
        <button class="btn pri" onclick="sendEmailAndLog(${c.id})">Send email</button>
      </div>`;
  }
}

function genEmailDraft(c, variant) {
  const fn         = c.name.split(' ')[0];
  const tpVariants = TPS_EMAIL_VARIANTS[c.id];
  const tp         = tpVariants
    ? tpVariants[variant % 3]
    : (TPS[c.id] || ['Review your current banking relationship and explore ways we can add more value.'])[0];
  const subjMap = {
    1: ['Quick check-in — account activity and next steps', 'A note from your Truist RM — worth a quick read', 'Something caught my attention on your account'],
    2: ['Following up on equipment financing proposal', 'Equipment financing — still on the table when you\'re ready', 'Circling back on the financing opportunity we discussed'],
    3: ['Supporting your business growth — let\'s talk', 'Your growth is showing — I\'d love to connect', 'Let\'s talk about where Truist can support you next'],
    4: ['Your CD is maturing soon — options to consider', 'CD renewal coming up — a few thoughts from your RM', 'Before your CD matures, let\'s talk options'],
    5: ['Reaching out about your financing needs', 'You were searching — let\'s find the right fit', 'Helping you find the right path to funding'],
  };
  const subjOpts = subjMap[c.id] || ['Checking in — how can we help?', 'A quick note from your Truist RM', 'Staying connected — a few ideas for your business'];
  const subj     = subjOpts[variant % subjOpts.length];
  let body;
  if (variant % 3 === 0) {
    body = `Hi ${fn},\n\nI hope you're doing well. I wanted to reach out personally — I noticed some recent activity and want to make sure we're supporting you in the best way possible.\n\n${tp}\n\nI'd love to schedule a quick call at your convenience. Just reply to this email or call me directly.\n\nBest,\nJordan Williams\nRelationship Manager, Truist Bank`;
  } else if (variant % 3 === 1) {
    body = `Hi ${fn},\n\nI'm reaching out because something on your account stood out to me, and I wanted to make sure you're aware of an opportunity that could be a great fit right now.\n\n${tp}\n\nIf you have 15 minutes this week, I'd love to walk you through it. Feel free to reply here or give me a call.\n\nWarm regards,\nJordan Williams\nRelationship Manager, Truist Bank`;
  } else {
    body = `Hi ${fn},\n\nThank you for your continued trust in Truist — it's a relationship I genuinely value. I wanted to follow up with something specific to your business that I think could make a real difference.\n\n${tp}\n\nWhenever works best for you, I'm happy to connect — whether by phone, email, or in person.\n\nThank you,\nJordan Williams\nRelationship Manager, Truist Bank`;
  }
  return { subj, body };
}

function redraftEmail(cid) {
  const c = D.clients.find(x => x.id === cid) || D.clients[0];
  window._emailDraftVariant        = window._emailDraftVariant || {};
  window._emailDraftVariant[cid]   = ((window._emailDraftVariant[cid] || 0) + 1) % 3;
  const draft = genEmailDraft(c, window._emailDraftVariant[cid]);
  document.getElementById('email-subj').value = draft.subj;
  document.getElementById('email-body').value = draft.body;
  showToast('✏️ Re-drafted');
}

function closeModal() { document.getElementById('overlay').classList.add('off'); }

function viewOutcomeModal(cid) {
  const c    = D.clients.find(x => x.id === cid) || D.clients[0];
  const info = S.completedIds[cid];
  if (!info) return;
  const outLabels = { c: 'Converted', p: 'Pending', d: 'Dismissed' };
  const chipClass = info.out === 'c' ? 'done-chip' : info.out === 'p' ? 'done-chip pend' : 'done-chip dism';
  const modal     = document.getElementById('modal');
  const overlay   = document.getElementById('overlay');
  overlay.classList.remove('off');
  modal.innerHTML = `
    <div class="mhd"><span class="mttl">📋 Outcome — ${esc(c.co)}</span><button class="mx" onclick="closeModal()">✕</button></div>
    <div class="mbody">
      <div class="msec">
        <div class="mlbl">Outcome</div>
        <span class="${chipClass}" style="display:inline-block;margin-top:2px">✓ ${outLabels[info.out] || 'Logged'}</span>
      </div>
      <div class="msec">
        <div class="mlbl">Contact method</div>
        <div style="font-size:14px;color:var(--tx);margin-top:2px">${esc(info.method || '—')}</div>
      </div>
      <div class="msec">
        <div class="mlbl">Notes</div>
        <div style="font-size:14px;color:var(--tx2);margin-top:2px;white-space:pre-wrap">${info.notes ? esc(info.notes) : '<span style="color:var(--tx3)">No notes recorded</span>'}</div>
      </div>
      <div class="msec">
        <div class="mlbl">Logged</div>
        <div style="font-size:14px;color:var(--tx2);margin-top:2px">${esc(info.ts || 'Today')}</div>
      </div>
    </div>
    <div class="mfooter">
      <button class="btn" onclick="showLogModal(${cid}, null, S.completedIds[${cid}])">Edit outcome</button>
      <button class="btn pri" onclick="closeModal()">Done</button>
    </div>`;
}

function sendEmailAndLog(cid) {
  showToast('\u2709\ufe0f Email sent');
  showLogModal(cid, 'Email');
}

function showLogModal(cid, defaultMethod, prefill) {
  const c      = D.clients.find(x => x.id === cid) || D.clients[0];
  const modal  = document.getElementById('modal');
  let logOut   = prefill ? prefill.out : null;
  if (prefill && prefill.out) window.logOutM = prefill.out;

  const renderModal = () => {
    modal.innerHTML = `
      <div class="mhd"><span class="mttl">📋 Log outcome — ${esc(c.name)}</span><button class="mx" onclick="closeModal()">✕</button></div>
      <div class="mbody">
        <div class="msec">
          <div class="mlbl">Outcome</div>
          <div class="radio-grp" id="log-modal-chips" style="margin-top:6px">
            <div class="rchip${logOut === 'c' ? ' s-conv' : ''}" data-v="c">✓ Converted</div>
            <div class="rchip${logOut === 'p' ? ' s-pend' : ''}" data-v="p">~ Still pending</div>
            <div class="rchip${logOut === 'd' ? ' s-dism' : ''}" data-v="d">— Dismissed</div>
          </div>
        </div>
        <div class="msec">
          <div class="mlbl">Contact method</div>
          <select class="fselect" id="mlog-method" style="margin-top:6px"><option>Phone call</option><option>Email</option><option>In-person meeting</option><option>Video call</option></select>
        </div>
        <div class="msec">
          <div class="mlbl">Notes</div>
          <textarea class="ftextarea" id="mlog-notes" rows="4" placeholder="What happened? Any follow-up needed?" style="margin-top:6px"></textarea>
        </div>
      </div>
      <div class="mfooter">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn pri" onclick="submitLogModal(${c.id})">Save outcome</button>
      </div>`;

    const chips = modal.querySelectorAll('.radio-grp .rchip');
    const vals  = ['c', 'p', 'd'];
    chips.forEach((el, i) => {
      el.onclick = () => {
        logOutM = vals[i];
        chips.forEach((ch, j) => {
          ch.className = 'rchip' + (j === i ? (vals[i] === 'c' ? ' s-conv' : vals[i] === 'p' ? ' s-pend' : ' s-dism') : '');
        });
      };
    });
  };

  renderModal();

  const methodToSet = defaultMethod || (prefill && prefill.method);
  if (methodToSet) {
    const sel = modal.querySelector('#mlog-method');
    if (sel) Array.from(sel.options).forEach(o => { o.selected = o.value === methodToSet; });
  }
  if (prefill && prefill.notes) {
    const ta = modal.querySelector('#mlog-notes');
    if (ta) ta.value = prefill.notes;
  }
}

window.logOutM = null;

function submitLogModal(cid) {
  if (!window.logOutM) { showToast('⚠ Please select an outcome'); return; }
  const c      = D.clients.find(x => x.id === cid) || D.clients[0];
  const notes  = document.getElementById('mlog-notes')?.value?.trim() || '';
  const method = document.getElementById('mlog-method')?.value || 'Phone call';
  const lbls   = { c: 'Converted', p: 'Pending', d: 'Dismissed' };
  const now    = new Date();
  const mm     = String(now.getMonth() + 1).padStart(2, '0');
  const dd     = String(now.getDate()).padStart(2, '0');
  const yy     = String(now.getFullYear()).slice(-2);
  D.activity.unshift({ id: Date.now(), cn: c.name, desc: notes || 'No additional notes', out: window.logOutM, time: `${mm}/${dd}/${yy}`, rec: c.rec || null, method });
  S.completedIds[cid] = { out: window.logOutM, method, ts: 'Today', notes: notes || '' };
  window.logOutM = null;
  closeModal();
  showToast('✓ Outcome logged successfully');
  go('/dashboard');
}

/* ── INIT ────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now    = new Date();
  D.day = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  route();
});
