// Theme toggle
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  const iconMoon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const iconSun = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const applyIcon = () => { t.innerHTML = d === 'dark' ? iconSun : iconMoon; t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode'); };
  if (t) {
    applyIcon();
    t.addEventListener('click', () => { d = d === 'dark' ? 'light' : 'dark'; r.setAttribute('data-theme', d); applyIcon(); });
  }
})();

// Sticky header scroll state
(function () {
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile menu
(function () {
  const btn = document.querySelector('.menu-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const open = document.body.classList.toggle('mobile-menu-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.primary-nav a').forEach(a => a.addEventListener('click', () => {
    document.body.classList.remove('mobile-menu-open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.section, .research-card, .project-card, .pub, .course-list li').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
})();
