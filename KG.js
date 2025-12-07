// Simple carousel script: auto-advance, dots, prev/next
(function(){
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  let index = 0;
  let timer = null;
  const INTERVAL = 4500; // ms

  function show(i){
    if(i < 0) i = slides.length - 1;
    if(i >= slides.length) i = 0;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    index = i;
  }

  function next(){ show(index + 1) }
  function prev(){ show(index - 1) }

  // attach events
  nextBtn.addEventListener('click', () => { next(); resetTimer(); });
  prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
  dots.forEach(d => d.addEventListener('click', e => {
    const i = parseInt(e.currentTarget.dataset.index, 10);
    show(i);
    resetTimer();
  }));

  function startTimer(){
    timer = setInterval(next, INTERVAL);
  }
  function resetTimer(){
    clearInterval(timer);
    startTimer();
  }

  // keyboard support
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') { prev(); resetTimer(); }
    if(e.key === 'ArrowRight') { next(); resetTimer(); }
  });

  // init
  if(slides.length){
    show(0);
    startTimer();
  }
})();
// Small optional JS helpers for the Our Divisions section.
// - Adds basic keyboard focus outline to buttons for accessibility.
// - This file is optional; you can remove it if you don't need extra behavior.

document.addEventListener('DOMContentLoaded', () => {
  // Add focus-visible class for keyboard users
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.body.classList.add('od-focus-visible');
  });

  // Remove class when mouse is used (so focus rings don't show on click)
  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('od-focus-visible');
  });

  // Simple enhancement: ensure images have loading="lazy" for performance if supported
  const imgs = document.querySelectorAll('.od-img');
  imgs.forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });
});

// Small helpers for About page (optional):
// - sets loading="lazy" on images
// - toggles a body class for keyboard focus outlines
document.addEventListener('DOMContentLoaded', () => {
  // lazy load images for performance
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });

  // keyboard focus outline toggle
  function enableFocusByKey() { document.body.classList.add('focus-by-key'); }
  function disableFocusByMouse() { document.body.classList.remove('focus-by-key'); }

  document.addEventListener('keydown', (e) => { if (e.key === 'Tab') enableFocusByKey(); });
  document.addEventListener('mousedown', disableFocusByMouse);
});

// testmonies
// kng-tsm carousel script (small, dependency-free)
// Usage: include this script after the testimonial HTML fragment
(function () {
  const root = document.getElementById('kng-tsm');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('.kng-tsm-slide'));
  const dots = Array.from(root.querySelectorAll('.kng-tsm-dot'));
  const prevBtn = root.querySelector('.kng-tsm-nav-prev');
  const nextBtn = root.querySelector('.kng-tsm-nav-next');

  let current = 0;
  let timer = null;
  const INTERVAL = 5000;

  function show(i) {
    if (i < 0) i = slides.length - 1;
    if (i >= slides.length) i = 0;
    slides.forEach((s, idx) => {
      const hidden = idx !== i;
      s.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    });
    dots.forEach((d, idx) => {
      const sel = idx === i;
      d.setAttribute('aria-selected', sel ? 'true' : 'false');
    });
    current = i;
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startTimer() {
    stopTimer();
    timer = setInterval(next, INTERVAL);
  }
  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // attach events
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startTimer(); });

  dots.forEach(d => {
    d.addEventListener('click', (e) => {
      const i = Number(e.currentTarget.dataset.kngTsmDot ?? e.currentTarget.getAttribute('data-kng-tsm-dot'));
      show(i);
      startTimer();
    });
  });

  // keyboard support
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); startTimer(); }
    if (e.key === 'ArrowRight') { next(); startTimer(); }
  });

  // pause on hover
  root.addEventListener('mouseenter', stopTimer);
  root.addEventListener('mouseleave', startTimer);

  // init
  show(0);
  startTimer();
})();

// contacts
// Small contact form helper for the kng contact section.
// - basic client-side validation
// - submit handler placeholder (replace with AJAX or form backend URL)

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('kngct-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // simple validation
    const first = form.querySelector('[name="firstName"]');
    const email = form.querySelector('[name="email"]');

    let ok = true;
    [first, email].forEach(field => {
      if (!field || !field.value.trim()) {
        field && field.classList.add('kngct-invalid');
        ok = false;
      } else {
        field && field.classList.remove('kngct-invalid');
      }
    });

    if (!ok) {
      // focus first invalid
      const invalid = form.querySelector('.kngct-invalid');
      invalid && invalid.focus();
      return;
    }

    // collect payload
    const payload = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      service: form.service.value,
      message: form.message.value.trim()
    };

    // TODO: replace with your API endpoint
    // Example: fetch('/api/contact', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    console.log('kngct: submit payload', payload);

    // simple UX
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      }
      form.reset();
      alert('Thanks — your message has been submitted. We will contact you within 24 hours.');
    }, 900);
  });
});

// last box
// Small enhancement for kngcta buttons - keyboard and pointer polish.
// Include this script once (after the HTML fragment or before closing </body>).

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('kngcta');
  if (!root) return;

  // Add 'kbd-focus' class when keyboard navigation is used (for nicer focus outlines)
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('kngcta-kbd-focus');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  // Simple click ripple on buttons (subtle)
  root.querySelectorAll('.kngcta-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // quick scale effect handled in CSS; optionally add small animation here
      btn.animate([{ transform: 'scale(0.98)' }, { transform: 'scale(1)' }], { duration: 160 });
    });
  });
});

//footer
// Tiny footer helper - fills current year. Include once after the fragment.
document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('kngf-year');
  if (el) el.textContent = new Date().getFullYear();
});

// Attach after DOM loaded. Handles smooth scroll (offset by header height)
// and mobile menu toggle. Paste into your global JS files or include after body.

document.addEventListener('DOMContentLoaded', function () {
  const HEADER_SELECTOR = '.kng-topbar';
  const header = document.querySelector(HEADER_SELECTOR);
  const headerHeight = () => header ? header.getBoundingClientRect().height : 0;

  // Smooth scroll handler for links with data-kng-scroll
  function onNavClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return; // external or full url
    const targetId = href.slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    e.preventDefault();

    const offset = headerHeight() + 8; // small extra spacing
    const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });

    // if mobile menu is open, close it
    const mobileMenu = document.getElementById('kng-mobile-menu');
    const hamburger = document.querySelector('.kng-hamburger');
    if (mobileMenu && mobileMenu.classList.contains('kng-open')) {
      mobileMenu.classList.remove('kng-open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('a[data-kng-scroll]').forEach(a => {
    a.addEventListener('click', onNavClick);
  });

  // mobile toggle
  const hamburger = document.querySelector('.kng-hamburger');
  const mobileMenu = document.getElementById('kng-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('kng-open');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Optional: update scroll offset if header height changes (e.g., on responsive)
  window.addEventListener('resize', () => { /* no-op: headerHeight() recalculates on use */ });
});

// Removes the .od-header unless the current page is divisions (fallback for static templates)
// Place this script in your site JS (or include before </body>).

document.addEventListener('DOMContentLoaded', function () {
  const od = document.querySelector('.od-header');
  if (!od) return;

  // Option 1: prefer checking path (if Divisions page lives at /divisions or /divisions.html)
  const path = window.location.pathname.replace(/\/+$/,'').toLowerCase(); // normalized
  const isDivisionsPath = path === '/divisions' || path === '/divisions.html' || path.includes('/divisions');

  // Option 2: or check if there's a #divisions anchor on the page
  const hasDivisionsSection = !!document.getElementById('divisions');

  if (!isDivisionsPath && !hasDivisionsSection) {
    // hide the header if we are not on the divisions page and there is no #divisions target
    od.style.display = 'none';
  }
});