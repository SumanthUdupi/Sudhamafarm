/* ════════════════════════════════════════════════════════════
   Page Flip Controller — Reusable flip-book engine
   ════════════════════════════════════════════════════════════ */

class PageFlip {
  constructor(options) {
    this.container = options.container;
    this.totalPages = options.totalPages;
    this.onPageChange = options.onPageChange || (() => {});
    this.current = 0;
    this.busy = false;

    this.pages = Array.prototype.slice.call(this.container.querySelectorAll('.page'));
    this.dots = Array.prototype.slice.call(document.querySelectorAll('.ndot'));
    this.countEl = document.getElementById('n-count');
    this.navPrev = [document.getElementById('tp-prev'), document.getElementById('na-prev')];
    this.navNext = [document.getElementById('tp-next'), document.getElementById('na-next')];

    this.bindEvents();
    this.syncUI();
  }

  goTo(idx, dir) {
    if (this.busy || idx === this.current || idx < 0 || idx >= this.totalPages) return;
    this.busy = true;

    const from = this.pages[this.current];
    const to = this.pages[idx];
    const inX = dir > 0 ? '72px' : '-72px';
    const outX = dir > 0 ? '-72px' : '72px';
    const T = 'transform 500ms cubic-bezier(0.77,0,0.175,1),opacity 500ms ease';

    to.style.cssText = [
      'opacity:0',
      'transform:translate3d(' + inX + ',0,0)',
      'transition:none',
      'pointer-events:none',
      'z-index:2'
    ].join(';');
    from.style.zIndex = '1';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        from.style.transition = T;
        from.style.transform = 'translate3d(' + outX + ',0,0)';
        from.style.opacity = '0';

        to.style.transition = T;
        to.style.transform = 'translate3d(0,0,0)';
        to.style.opacity = '1';

        setTimeout(() => {
          from.classList.remove('is-active');
          to.classList.add('is-active');

          from.style.cssText = '';
          to.style.cssText = '';

          this.current = idx;
          this.syncUI();
          this.onPageChange(idx);
          this.busy = false;
        }, 515);
      });
    });
  }

  goNext() {
    this.goTo(this.current + 1, +1);
  }

  goPrev() {
    this.goTo(this.current - 1, -1);
  }

  syncUI() {
    this.dots.forEach((d, i) => {
      const on = (i === this.current);
      d.classList.toggle('on', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (this.countEl) this.countEl.textContent = (this.current + 1) + ' / ' + this.totalPages;
    this.navPrev.forEach(btn => btn.disabled = (this.current === 0));
    this.navNext.forEach(btn => btn.disabled = (this.current === this.totalPages - 1));
  }

  bindEvents() {
    this.navPrev.forEach(btn => btn.addEventListener('click', () => this.goPrev()));
    this.navNext.forEach(btn => btn.addEventListener('click', () => this.goNext()));

    document.getElementById('nav')?.addEventListener('click', (e) => {
      if (e.target.classList.contains('ndot')) {
        const t = parseInt(e.target.getAttribute('data-pg'), 10);
        this.goTo(t, t > this.current ? +1 : -1);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') this.goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') this.goPrev();
    });

    const book = this.container;
    let touchSX = 0, touchSY = 0;

    book.addEventListener('touchstart', (e) => {
      touchSX = e.touches[0].clientX;
      touchSY = e.touches[0].clientY;
    }, { passive: true });

    book.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchSX;
      const dy = e.changedTouches[0].clientY - touchSY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 38) {
        // Conditional vibration based on current page and swipe direction
        if (this.current === 0) { // Page 1: vibrate only on right-to-left swipe
          if (dx < 0) {
            navigator.vibrate(40);
            this.goNext();
          }
        } else if (this.current === 4) { // Page 5: vibrate only on left-to-right swipe
          if (dx > 0) {
            navigator.vibrate(40);
            this.goPrev();
          }
        } else { // Other pages: vibrate on any swipe
          navigator.vibrate(40);
          if (dx < 0) this.goNext(); else this.goPrev();
        }
      }
    }, { passive: true });
  }
}

export { PageFlip };
