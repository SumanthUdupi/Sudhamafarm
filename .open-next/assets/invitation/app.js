/* ════════════════════════════════════════════════════════════
   Sumanth & Vindhya — Engagement Invitation · app.js
   Vanilla JS: parallax · scroll-reveal · progress · petals
   ════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. Scroll progress bar ──────────────────────────────── */
  const bar = document.getElementById('progress-bar');
  function updateProgress() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100).toFixed(2) + '%';
  }

  /* ── 2. Parallax hero ────────────────────────────────────── */
  const heroParallax = document.getElementById('hero-parallax');
  function updateParallax() {
    if (!heroParallax) return;
    const y = window.scrollY * 0.35;
    heroParallax.style.transform = `translateY(${y}px)`;
  }

  /* ── 3. Nav dots ─────────────────────────────────────────── */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const dots     = Array.from(document.querySelectorAll('.nav-dot'));

  function updateDots() {
    const mid = window.scrollY + window.innerHeight * 0.45;
    let active = 0;
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= mid) active = i;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      sections[i].scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── 4. Scroll-reveal via IntersectionObserver ───────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer  = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));

  /* ── 5. Throttled scroll handler ─────────────────────────── */
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateParallax();
        updateDots();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init

  /* ── 6. Floating petal generator ─────────────────────────── */
  const container = document.querySelector('.petals');
  if (container) {
    const COLORS = [
      'rgba(212,175,55,.65)',
      'rgba(234,162,33,.6)',
      'rgba(255,195,11,.5)',
      'rgba(128,0,32,.45)',
      'rgba(244,231,199,.55)',
    ];
    const COUNT = 22;

    for (let i = 0; i < COUNT; i++) {
      const p    = document.createElement('span');
      const size = 5 + Math.random() * 11;
      p.classList.add('petal');
      p.style.cssText = [
        `--s: ${size}px`,
        `--c: ${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
        `--dur: ${7 + Math.random() * 10}s`,
        `--delay: ${Math.random() * 12}s`,
        `--r0: ${-30 + Math.random() * 60}deg`,
        `--r1: ${180 + Math.random() * 180}deg`,
        `--dx: ${-80 + Math.random() * 160}px`,
        `--op: ${0.35 + Math.random() * 0.45}`,
        `left: ${Math.random() * 100}%`,
      ].join(';');
      container.appendChild(p);
    }
  }

  /* ── 7. Deity icons: subtle entrance stagger ─────────────── */
  document.querySelectorAll('.deity').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .7s ${0.1 * i + 0.2}s ease, transform .7s ${0.1 * i + 0.2}s ease`;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
  });

})();
