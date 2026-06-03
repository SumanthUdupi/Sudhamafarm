/* ════════════════════════════════════════════════════════════
   Sumanth & Vindhya · Engagement Invitation · Main App
   ════════════════════════════════════════════════════════════ */

import { PAGES } from './config.js';
import { PageFlip } from './pageFlip.js';

(function () {
  'use strict';

  /* Detect reduced motion preference */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('no-animation');
  }

  const book = document.getElementById('book');
  const openBtn = document.getElementById('open-folio');
  const swipePrompt = document.getElementById('swipe-prompt');
  let prevPage = 0;
  let hasSeenSwipePrompt = false;

  /* Initialize page flip controller */
  const flipper = new PageFlip({
    container: book,
    totalPages: PAGES.TOTAL,
    onPageChange: (idx) => {
      prevPage = idx;
      // Hide swipe prompt when user leaves page 0
      if (idx !== 0 && swipePrompt && swipePrompt.classList.contains('show')) {
        swipePrompt.classList.remove('show');
        swipePrompt.classList.add('hide');
      }
    }
  });

  /* Open invitation from cover */
  if (openBtn) {
    openBtn.addEventListener('click', function () {
      flipper.goTo(1, +1);
    });
  }

  /* ── Book parallax tilt (desktop pointer only, respects reduced motion) ──────── */
  let tiltX = 0, tiltY = 0, tiltTX = 0, tiltTY = 0;

  if (!prefersReducedMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.addEventListener('pointermove', function (e) {
      const r = book.getBoundingClientRect();
      tiltTX = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 3.5;
      tiltTY = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -2.5;
    }, { passive: true });
    document.addEventListener('pointerleave', function () { tiltTX = 0; tiltTY = 0; });

    (function lerpTilt() {
      tiltX += (tiltTX - tiltX) * 0.07;
      tiltY += (tiltTY - tiltY) * 0.07;
      if (Math.abs(tiltX) > 0.01 || Math.abs(tiltY) > 0.01) {
        book.style.transform = 'perspective(1200px) rotateY(' + tiltX.toFixed(3) + 'deg) rotateX(' + tiltY.toFixed(3) + 'deg)';
      }
      requestAnimationFrame(lerpTilt);
    }());
  }

  /* ── Swipe prompt on first load (mobile only) ────────────────── */
  if (swipePrompt && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    setTimeout(() => {
      if (!hasSeenSwipePrompt && flipper.current === 0) {
        swipePrompt.classList.add('show');
        hasSeenSwipePrompt = true;
      }
    }, 1200);
  }

  /* ── Ambient motes ─────────────────────────────────────── */
  const stage = document.getElementById('stage');
  const colors = ['rgba(234,162,33,.9)','rgba(212,175,55,.85)','rgba(255,195,11,.75)','rgba(114,47,55,.65)','rgba(244,231,199,.55)'];
  for (let i = 0; i < 20; i++) {
    const m = document.createElement('div');
    const sz = 1.5 + Math.random() * 4;
    m.className = 'mote';
    m.style.cssText = [
      'width:'  + sz + 'px', 'height:' + sz + 'px',
      'left:'   + (Math.random() * 100) + '%',
      'top:'    + (10 + Math.random() * 75) + '%',
      'background:' + colors[Math.floor(Math.random() * colors.length)],
      '--d:' + (9 + Math.random() * 12) + 's',
      '--dl:' + (Math.random() * 10) + 's',
      '--op:' + (.02 + Math.random() * .05).toFixed(3)
    ].join(';');
    stage.appendChild(m);
  }

}());
