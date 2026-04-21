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
var REVIEW_MAX = 2;

function slideReviews(dir) {
  reviewIdx = Math.max(0, Math.min(REVIEW_MAX, reviewIdx + dir));
  updateReviewSlider();
}

function goToReview(idx) {
  reviewIdx = Math.max(0, Math.min(REVIEW_MAX, idx));
  updateReviewSlider();
}

function updateReviewSlider() {
  var track = document.getElementById('reviews-track');
  if (!track || !track.children.length) return;
  var gap = 20;
  var cardW = track.children[0].getBoundingClientRect().width + gap;
  track.style.transform = 'translateX(-' + (reviewIdx * cardW) + 'px)';
  document.querySelectorAll('.slider-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === reviewIdx);
  });
}

window.addEventListener('resize', function() {
  reviewIdx = 0;
  updateReviewSlider();
}, { passive: true });

/* ─── Nav scroll shadow ──────────────────────────────────── */
window.addEventListener('scroll', function() {
  var nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ─── Init ───────────────────────────────────────────────── */
go('home');
