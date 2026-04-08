gsap.registerPlugin(ScrollTrigger);

/* ── Cursor glow — context-aware ─────────────────────────────────────── */
const glow = document.getElementById('glow');
const DARK_SECTIONS  = ['.problem', '.why'];
const TERRA_SECTIONS = ['.target-band'];

function getGlowState(x, y) {
  // Temporarily hide glow so elementFromPoint doesn't hit it
  glow.style.visibility = 'hidden';
  const el = document.elementFromPoint(x, y);
  glow.style.visibility = '';
  if (!el) return 'light';
  const inDark  = DARK_SECTIONS.some(sel  => el.closest(sel));
  const inTerra = TERRA_SECTIONS.some(sel => el.closest(sel));
  if (inTerra) return 'terra';
  if (inDark)  return 'dark';
  return 'light';
}

let lastState = '';
window.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
  const state = getGlowState(e.clientX, e.clientY);
  if (state !== lastState) {
    glow.classList.remove('glow--dark', 'glow--terra', 'glow--light');
    glow.classList.add('glow--' + state);
    lastState = state;
  }
});

/* ── Quote card — mouse parallax ──────────────────────────────────────── */
const qcard = document.getElementById('qcard');
qcard.addEventListener('mousemove', e => {
  const r = qcard.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  - 0.5;
  const y = (e.clientY - r.top)  / r.height - 0.5;
  qcard.style.transform = `rotate(-0.3deg) perspective(1200px) rotateY(${x*10}deg) rotateX(${-y*8}deg) translateZ(12px)`;
  qcard.style.transition = 'transform .1s ease-out';
});
qcard.addEventListener('mouseleave', () => {
  qcard.style.transform = 'rotate(-1.8deg) perspective(1200px)';
  qcard.style.transition = 'transform .7s cubic-bezier(0.23,1,0.32,1)';
});

/* ── Hero entrance ────────────────────────────────────────────────────── */
gsap.timeline({ delay: 0.1 })
  .to('.hero-eyebrow', { opacity:1, duration:.55, ease:'power2.out' })
  .to('.hero-headline',{ opacity:1, y:0, duration:.9, ease:'power3.out' }, '-=0.3')
  .to('.hero-body',    { opacity:1, y:0, duration:.7, ease:'power2.out' }, '-=0.45')
  .to('.hero-actions', { opacity:1, y:0, duration:.6, ease:'power2.out' }, '-=0.4')
  .to(qcard,           { opacity:1, y:0, duration:.9, ease:'power3.out' }, '-=0.55');

/* ── Scroll reveals ───────────────────────────────────────────────────── */
gsap.utils.toArray('.g-fade, .g-l, .g-r').forEach(el => {
  const isL = el.classList.contains('g-l');
  const isR = el.classList.contains('g-r');
  gsap.to(el, {
    opacity: 1,
    x: 0, y: 0,
    duration: .88, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 83%', toggleActions: 'play none none none' }
  });
});

/* ── Metrics stagger ─────────────────────────────────────────────────── */
gsap.utils.toArray('.metric-item').forEach((el, i) => {
  gsap.to(el, { opacity:1, y:0, duration:.75, ease:'power3.out', delay: i*.12,
    scrollTrigger: { trigger:'.metrics-band', start:'top 82%', toggleActions:'play none none none' }
  });
});

/* ── Steps stagger ────────────────────────────────────────────────────── */
gsap.utils.toArray('.step-card').forEach((c, i) => {
  gsap.to(c, { opacity:1, y:0, duration:.75, ease:'power3.out', delay: i*.1,
    scrollTrigger: { trigger:'.steps-bento', start:'top 80%', toggleActions:'play none none none' }
  });
});

/* ── Service cards stagger ────────────────────────────────────────────── */
gsap.utils.toArray('.service-card').forEach((c, i) => {
  gsap.to(c, { opacity:1, y:0, duration:.8, ease:'power3.out', delay: i*.13,
    scrollTrigger: { trigger:'.services-grid', start:'top 82%', toggleActions:'play none none none' }
  });
});

/* ── Iceberg draw animation ───────────────────────────────────────────── */
const icebergEl = document.getElementById('iceberg');
if (icebergEl) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => icebergEl.classList.add('drawn'), 200);
    }
  }, { threshold: 0.3 }).observe(icebergEl);
}

/* ── Annotation marks ─────────────────────────────────────────────────── */
document.querySelectorAll('.mark').forEach(el => {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) setTimeout(() => el.classList.add('drawn'), 300);
  }, { threshold: 0.6 }).observe(el);
});

/* ── Service icon ovals — draw on scroll ──────────────────────────────── */
const serviceObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in-view'), 400 + Array.from(document.querySelectorAll('.service-card')).indexOf(e.target) * 180);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.service-card').forEach(c => serviceObs.observe(c));
</script>
