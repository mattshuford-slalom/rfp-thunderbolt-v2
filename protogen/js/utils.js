/* ============================================================
   UTILS — shared helpers used across all modules
   ============================================================ */

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function re(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function rebind() {
  const bs = document.getElementById('book-s');
  if (bs) bs.oninput = e => { S.bsearch = e.target.value; refreshBook(); };
  const as = document.getElementById('act-s');
  if (as) as.oninput = e => { S.asearch = e.target.value; refreshActivity(); };
}

let _toastT;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast';
  clearTimeout(_toastT);
  _toastT = setTimeout(() => { t.className = 'toast off'; }, 3200);
}
