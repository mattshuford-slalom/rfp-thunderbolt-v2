/* ============================================================
   STATE — application state object and client-side router
   ============================================================ */

const S = {
  view: 'dashboard',
  cid: null,
  tab: 'rec',
  copOpen: true,
  bsearch: '',
  bfilter: 'all',
  asearch: '',
  afilter: 'all',
  logOut: null,
  completedIds: {},
  suggMore: false,
  convs: {
    general: [{ r: 'sys', t: "Ask anything about your book, clients, or today's recommendations." }],
  },
};

function route() {
  const h = (location.hash || '#/dashboard').replace('#', '');
  if (!h || h === '/' || h === '/dashboard') { S.view = 'dashboard'; S.cid = null; }
  else if (h.startsWith('/client/')) { S.view = 'client'; S.cid = parseInt(h.split('/')[2]) || 1; S.tab = 'rec'; S.logOut = null; }
  else if (h === '/book')     { S.view = 'book'; }
  else if (h === '/activity') { S.view = 'activity'; }
  render();
}

function go(path) { location.hash = path; route(); }
function goClient() { go(S.cid ? '/client/' + S.cid : '/client/1'); }

window.addEventListener('hashchange', route);
