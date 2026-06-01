/* ════════════════════════════════════════════════════════════
   Sumanth & Vindhya · Flip-Book Engine · 5 pages
   ─────────────────────────────────────────────────────────
   Animation contract:
   • Pages: opacity controlled by inline styles during flip,
     then by .is-active CSS rule (no transition). JS owns
     the flip; CSS owns the content-reveal keyframes.
   • Children: base opacity:0 in CSS → invisible during flip.
     Keyframes fire only on .is-active pages, driven by CSS.
   • Cleanup order: add/remove .is-active BEFORE clearing
     inline styles so browser batches both in one paint tick —
     no intermediate opacity:0 frame, no flash.
   ════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var TOTAL   = 5;
  var cur     = 0;
  var busy    = false;
  var touchSX = 0;
  var touchSY = 0;

  var pages   = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var dots    = Array.prototype.slice.call(document.querySelectorAll('.ndot'));
  var count   = document.getElementById('n-count');
  var tpPrev  = document.getElementById('tp-prev');
  var tpNext  = document.getElementById('tp-next');
  var naPrev  = document.getElementById('na-prev');
  var naNext  = document.getElementById('na-next');
  var openBtn = document.getElementById('open-folio');
  var book    = document.getElementById('book');

  /* ── Flip ──────────────────────────────────────────────────
     Phase 1 (double rAF): set inline styles → drive animation.
     Phase 2 (setTimeout): add/remove .is-active → THEN clear
     inline styles.  All in one JS tick → one paint → no flash.
  ────────────────────────────────────────────────────────── */
  function goTo(idx, dir) {
    if (busy || idx === cur || idx < 0 || idx >= TOTAL) return;
    busy = true;

    var from = pages[cur];
    var to   = pages[idx];
    var inX  = dir > 0 ? '72px' : '-72px';
    var outX = dir > 0 ? '-72px' : '72px';
    var T    = 'transform 500ms cubic-bezier(0.77,0,0.175,1),opacity 500ms ease';

    /* Phase 1a: snap incoming page to off-screen, no transition */
    to.style.cssText = [
      'opacity:0',
      'transform:translate3d(' + inX + ',0,0)',
      'transition:none',
      'pointer-events:none',
      'z-index:2'
    ].join(';');
    from.style.zIndex = '1';

    /* Phase 1b: double rAF ensures the snaped position is painted
       before we re-enable transitions, so the browser doesn't merge
       the snap + slide into a single frame and skip the animation. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {

        /* Drive exit on from-page */
        from.style.transition = T;
        from.style.transform  = 'translate3d(' + outX + ',0,0)';
        from.style.opacity    = '0';

        /* Drive entry on to-page */
        to.style.transition = T;
        to.style.transform  = 'translate3d(0,0,0)';
        to.style.opacity    = '1';

        /* Phase 2: after animation completes, swap state cleanly.
           CRITICAL ORDER:
           (a) swap classes  → CSS gives correct opacity:0/1 immediately
           (b) clear styles  → inline styles removed; CSS value is
                               already correct, no intermediate frame
           Both happen in the same synchronous JS block → one paint.   */
        setTimeout(function () {

          /* (a) Class swap first */
          from.classList.remove('is-active');
          to.classList.add('is-active');

          /* (b) Clear inline styles — CSS state now matches */
          from.style.cssText = '';
          to.style.cssText   = '';

          cur = idx;
          syncUI();
          busy = false;

        }, 515); /* ≥ transition duration (500ms) + 1 frame buffer */
      });
    });
  }

  function goNext() { goTo(cur + 1, +1); }
  function goPrev() { goTo(cur - 1, -1); }

  function syncUI() {
    dots.forEach(function (d, i) {
      var on = (i === cur);
      d.classList.toggle('on', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (count) count.textContent = (cur + 1) + ' / ' + TOTAL;
    naPrev.disabled = tpPrev.disabled = (cur === 0);
    naNext.disabled = tpNext.disabled = (cur === TOTAL - 1);
  }

  /* ── Book parallax tilt (desktop pointer only) ──────────── */
  var tiltX = 0, tiltY = 0, tiltTX = 0, tiltTY = 0;

  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.addEventListener('pointermove', function (e) {
      var r  = book.getBoundingClientRect();
      tiltTX = ((e.clientX - r.left  - r.width  / 2) / (r.width  / 2)) *  3.5;
      tiltTY = ((e.clientY - r.top   - r.height / 2) / (r.height / 2)) * -2.5;
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

  /* ── Event wiring ─────────────────────────────────────── */
  tpPrev.addEventListener('click', goPrev);
  tpNext.addEventListener('click', goNext);
  naPrev.addEventListener('click', goPrev);
  naNext.addEventListener('click', goNext);
  if (openBtn) openBtn.addEventListener('click', function () { goTo(1, +1); });

  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      var t = parseInt(d.getAttribute('data-pg'), 10);
      goTo(t, t > cur ? +1 : -1);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
  });

  /* Touch swipe */
  book.addEventListener('touchstart', function (e) {
    touchSX = e.touches[0].clientX;
    touchSY = e.touches[0].clientY;
  }, { passive: true });

  book.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchSX;
    var dy = e.changedTouches[0].clientY - touchSY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 38) {
      if (dx < 0) goNext(); else goPrev();
    }
  }, { passive: true });

  /* ── Ambient motes ─────────────────────────────────────── */
  (function () {
    var stage  = document.getElementById('stage');
    var colors = ['rgba(234,162,33,.9)','rgba(212,175,55,.85)','rgba(255,195,11,.75)','rgba(114,47,55,.65)','rgba(244,231,199,.55)'];
    for (var i = 0; i < 20; i++) {
      var m  = document.createElement('div');
      var sz = 1.5 + Math.random() * 4;
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

  /* ── Grid easter-egg ──────────────────────────────────── */
  var pin = document.getElementById('grid-pin');
  if (pin) {
    pin.addEventListener('click', function () {
      var on = document.body.classList.toggle('grid-on');
      pin.classList.toggle('on', on);
      pin.setAttribute('aria-pressed', String(on));
    });
  }

  /* ── Init ─────────────────────────────────────────────── */
  syncUI();

}());
