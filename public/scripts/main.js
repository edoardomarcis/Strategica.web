/* ── Hamburger menu ───────────────────────────────────────────────────── */
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');
if (hamburger && mobileNav) {
  const toggle = open => {
    hamburger.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileNav.setAttribute('aria-hidden', !open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => toggle(!hamburger.classList.contains('open')));

  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => toggle(false))
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(false);
  });
}

/* ── Annotazioni e tavole: si disegnano quando entrano nel viewport ─────── */
const drawOnView = (els, threshold, delay) => {
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('drawn'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold });
  els.forEach(el => obs.observe(el));
};

drawOnView(document.querySelectorAll('.mark'), 0.6, 300);
drawOnView(document.querySelectorAll('.iceberg-svg, .venn-svg'), 0.3, 200);
