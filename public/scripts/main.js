/* ── Hamburger menu ───────────────────────────────────────────────────── */
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');
if (hamburger && mobileNav) {
  const toggle = open => {
    hamburger.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileNav.setAttribute('aria-hidden', !open);
  };

  hamburger.addEventListener('click', () => toggle(!hamburger.classList.contains('open')));

  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => toggle(false))
  );

  document.addEventListener('click', e => {
    if (mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      toggle(false);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(false);
  });
}

/* ── Cursor glow — context-aware, throttled with rAF ─────────────────── */
const glow = document.getElementById('glow');
if (glow) {
  const DARK_SECTIONS  = ['.problem', '.why', '.cs-hero', '.cs-team', '.blog-hero'];
  const TERRA_SECTIONS = ['.target-band'];
  let rafPending = false;
  let pendingX = 0, pendingY = 0;
  let lastState = '';

  function applyGlow() {
    glow.style.left = pendingX + 'px';
    glow.style.top  = pendingY + 'px';
    glow.style.visibility = 'hidden';
    const el = document.elementFromPoint(pendingX, pendingY);
    glow.style.visibility = '';
    rafPending = false;
    if (!el) return;
    const inDark  = DARK_SECTIONS.some(sel  => el.closest(sel));
    const inTerra = TERRA_SECTIONS.some(sel => el.closest(sel));
    const state = inTerra ? 'terra' : inDark ? 'dark' : 'light';
    if (state === lastState) return;
    glow.classList.remove('glow--dark', 'glow--terra', 'glow--light');
    glow.classList.add('glow--' + state);
    lastState = state;
  }

  window.addEventListener('mousemove', e => {
    pendingX = e.clientX;
    pendingY = e.clientY;
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(applyGlow);
    }
  }, { passive: true });
}

/* ── Annotation marks — single batched observer ───────────────────────── */
const markEls = document.querySelectorAll('.mark');
if (markEls.length) {
  const markObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('drawn'), 300);
        markObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  markEls.forEach(m => markObs.observe(m));
}

/* ── GSAP animations — only when GSAP is loaded (home + chi-siamo) ───── */
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  /* Quote card — mouse parallax */
  const qcard = document.getElementById('qcard');
  if (qcard) {
    qcard.addEventListener('mousemove', e => {
      const r = qcard.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      qcard.style.transform = `rotate(-0.3deg) perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(12px)`;
      qcard.style.transition = 'transform .1s ease-out';
    });
    qcard.addEventListener('mouseleave', () => {
      qcard.style.transform = 'rotate(-1.8deg) perspective(1200px)';
      qcard.style.transition = 'transform .7s cubic-bezier(0.23,1,0.32,1)';
    });
  }

  /* Hero entrance */
  if (document.querySelector('.hero-eyebrow')) {
    gsap.timeline({ delay: 0.1 })
      .to('.hero-eyebrow',  { opacity: 1, duration: .55, ease: 'power2.out' })
      .to('.hero-headline', { opacity: 1, y: 0, duration: .9,  ease: 'power3.out' }, '-=0.3')
      .to('.hero-body',     { opacity: 1, y: 0, duration: .7,  ease: 'power2.out' }, '-=0.45')
      .to('.hero-actions',  { opacity: 1, y: 0, duration: .6,  ease: 'power2.out' }, '-=0.4')
      .to(qcard,            { opacity: 1, y: 0, duration: .9,  ease: 'power3.out' }, '-=0.55');
  }

  /* Scroll reveals — g-fade / g-l / g-r */
  gsap.utils.toArray('.g-fade, .g-l, .g-r').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, y: 0,
      duration: .88, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 83%', toggleActions: 'play none none none' }
    });
  });

  /* Metrics stagger */
  gsap.utils.toArray('.metric-item').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: .75, ease: 'power3.out', delay: i * .12,
      scrollTrigger: { trigger: '.metrics-band', start: 'top 82%', toggleActions: 'play none none none' }
    });
  });

  /* Steps stagger */
  gsap.utils.toArray('.step-card').forEach((c, i) => {
    gsap.to(c, {
      opacity: 1, y: 0, duration: .75, ease: 'power3.out', delay: i * .1,
      scrollTrigger: { trigger: '.steps-bento', start: 'top 80%', toggleActions: 'play none none none' }
    });
  });

  /* Service cards stagger */
  gsap.utils.toArray('.service-card').forEach((c, i) => {
    gsap.to(c, {
      opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: i * .13,
      scrollTrigger: { trigger: '.services-grid', start: 'top 82%', toggleActions: 'play none none none' }
    });
  });

  /* Iceberg draw */
  const icebergEl = document.getElementById('iceberg');
  if (icebergEl) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setTimeout(() => icebergEl.classList.add('drawn'), 200);
    }, { threshold: 0.3 }).observe(icebergEl);
  }

  /* Step cards — ghost → dark on click/keyboard */
  document.querySelectorAll('.step-card').forEach(card => {
    const activate = () => {
      const isActive = card.classList.contains('active');
      document.querySelectorAll('.step-card').forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        card.classList.add('active');
        card.setAttribute('aria-expanded', 'true');
      }
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });

  /* Service icon ovals — draw on scroll */
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length) {
    const serviceObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Array.from(serviceCards).indexOf(e.target);
          setTimeout(() => e.target.classList.add('in-view'), 400 + idx * 180);
        }
      });
    }, { threshold: 0.4 });
    serviceCards.forEach(c => serviceObs.observe(c));
  }
}
