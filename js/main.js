document.addEventListener('DOMContentLoaded', function() {
  initNav();
  initScrollReveal();
  initScrollProgress();
  initMenuToggle();
  setActiveNav();
  initForms();
});

function initNav() {
  var nav = document.querySelector('.nav-wrapper');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.pageYOffset > 50);
  });
}

function initScrollReveal() {
  var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
  var opts = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 };
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, opts);
  els.forEach(function(el) { obs.observe(el); });
}

function initScrollProgress() {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? window.pageYOffset / h : 0) + ')';
  });
}

function initMenuToggle() {
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
    if (!links.classList.contains('active')) links.querySelectorAll('.nav-dropdown.open').forEach(function(d) { d.classList.remove('open'); });
  });
  links.querySelectorAll('a:not(.dropdown-trigger)').forEach(function(a) {
    a.addEventListener('click', function() { toggle.classList.remove('active'); links.classList.remove('active'); links.querySelectorAll('.nav-dropdown.open').forEach(function(d) { d.classList.remove('open'); }); });
  });
  document.querySelectorAll('.dropdown-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        trigger.closest('.nav-dropdown').classList.toggle('open');
      }
    });
  });
}

function setActiveNav() {
  var page = (window.location.pathname.split('/').pop() || '').toLowerCase() || 'index.html';
  var isHome = !page || page === 'index.html';
  var isHome2 = page === 'home2.html';
  document.querySelectorAll('.nav-links > li > a:not(.dropdown-trigger), .nav-dropdown .dropdown-menu a').forEach(function(a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    var match = href === page || (isHome && (href === 'index.html' || href === '/')) || (isHome2 && href === 'home2.html');
    a.classList.toggle('active', match);
  });
  var trigger = document.querySelector('.dropdown-trigger');
  if (trigger) trigger.classList.toggle('active', isHome || isHome2);
}

function initForms() {
  document.querySelectorAll('form').forEach(function(f) {
    f.addEventListener('submit', function(e) { e.preventDefault(); alert('Thanks! (Demo)'); });
  });
}
