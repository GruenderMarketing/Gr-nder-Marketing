const PAGES = ['home', 'leist', 'ueber', 'blog', 'kontakt'];

/* ─── Navigation ─────────────────────────────────────────── */
function go(id) {
  PAGES.forEach(function(p) {
    var el = document.getElementById('p-' + p);
    if (el) el.classList.toggle('active', p === id);
  });
  document.querySelectorAll('[data-p]').forEach(function(a) {
    a.classList.toggle('cur', a.dataset.p === id);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileMenu();
}

/* ─── Mobile Menu ─────────────────────────────────────────── */
function toggleMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var burger = document.getElementById('nav-burger');
  if (!menu || !burger) return;
  var isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
}

function closeMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var burger = document.getElementById('nav-burger');
  if (!menu || !burger) return;
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-label', 'Menü öffnen');
}

/* ─── Toast ──────────────────────────────────────────────── */
function toast(msg) {
  var t = document.getElementById('toast-el');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(function() { t.classList.remove('show'); }, 3200);
}

/* ─── Sendungsverfolgung ─────────────────────────────────── */
function doTrack(id) {
  var el = document.getElementById(id);
  var v = el ? el.value.trim() : '';
  if (!v) { toast('Bitte Sendungsnummer eingeben.'); return; }
  toast('Sendung wird gesucht ...');
}

/* ─── Galerie Placeholder ────────────────────────────────── */
function gTap(label) {
  toast('Foto: ' + label + ' – hier dein echtes Foto einfügen');
}

/* ─── Google Reviews Slider ──────────────────────────────── */
var reviewIdx = 0;

function getReviewMax() {
  var total = document.querySelectorAll('#reviews-track .review-card').length;
  if (!total) return 0;
  var visible = window.innerWidth <= 860 ? 1 : 3;
  return Math.max(0, total - visible);
}

function rebuildReviewDots() {
  var el = document.getElementById('review-dots');
  if (!el) return;
  var max = getReviewMax();
  el.innerHTML = '';
  for (var i = 0; i <= max; i++) {
    var d = document.createElement('div');
    d.className = 'slider-dot' + (i === reviewIdx ? ' active' : '');
    d.onclick = (function(n) { return function() { goToReview(n); }; })(i);
    el.appendChild(d);
  }
}

function slideReviews(dir) {
  reviewIdx = Math.max(0, Math.min(getReviewMax(), reviewIdx + dir));
  updateReviewSlider();
}

function goToReview(idx) {
  reviewIdx = Math.max(0, Math.min(getReviewMax(), idx));
  updateReviewSlider();
}

function updateReviewSlider() {
  var track = document.getElementById('reviews-track');
  if (!track || !track.children.length) return;
  var gap = 20;
  var cardW = track.children[0].getBoundingClientRect().width + gap;
  track.style.transform = 'translateX(-' + (reviewIdx * cardW) + 'px)';
  document.querySelectorAll('#review-dots .slider-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === reviewIdx);
  });
}

window.addEventListener('resize', function() {
  reviewIdx = 0;
  rebuildReviewDots();
  updateReviewSlider();
}, { passive: true });

/* ─── Nav scroll shadow ──────────────────────────────────── */
window.addEventListener('scroll', function() {
  var nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ─── Init ───────────────────────────────────────────────── */
go('home');
rebuildReviewDots();
