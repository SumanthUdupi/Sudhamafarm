# Sumanth & Vindhya Engagement Invitation

A responsive, accessible flip-book invitation with dynamic page navigation, parallax effects, and bilingual Kannada/English content.

## Features

- **5-page flip-book** — Cover, Invitation, Muhurtham, Venue, Closing
- **Responsive design** — Mobile-first, scales to desktop
- **Accessibility** — WCAG AA color contrast, keyboard navigation, screen reader support
- **Bilingual** — Kannada and English with proper typography
- **Dynamic effects** — Page transitions, parallax tilt, animated motes, asset preloading
- **SVG-only assets** — No raster images, single design system

## Performance Budget

| Resource | Limit | Status |
|----------|-------|--------|
| HTML | 15 KB | ✓ |
| CSS | 50 KB | ✓ |
| JavaScript | 8 KB | ✓ |
| Assets (SVGs) | 15 KB | ✓ |
| **Total** | **88 KB** | ✓ |

Monitor with:
```bash
wc -c public/invitation/*.html public/invitation/*.css public/invitation/*.js
```

## Core Web Vitals

- **LCP** (Largest Contentful Paint) — Cover image < 1.5s
- **INP** (Interaction to Next Paint) — Page flip < 100ms
- **CLS** (Cumulative Layout Shift) — Aspect-ratio locking prevents jank

## Optimization Techniques

- **ES6 modules** — Tree-shakeable, one CSS + JS bundle
- **CSS tokens** — Single design system, no duplication
- **SVG-only** — No responsive image variants
- **Deferred JavaScript** — Modules load after DOM paint
- **Mote animation** — GPU-accelerated on devices with hover support
- **Reduced motion** — Respects `prefers-reduced-motion`

## Files

```
public/invitation/
├── index.html          # Main document
├── app.js              # Page flip logic (ES6 module)
├── pageFlip.js         # Reusable PageFlip class
├── config.js           # Page configuration constants
├── style.css           # Single stylesheet with design tokens
├── .gitignore          # Build artifacts, env files
├── ASSETS.md           # SVG asset strategy
└── README.md           # This file
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+ (iOS 14+)
- Older browsers: graceful degradation (no parallax, animations still work)

## Accessibility

- **Color contrast** — 5.8:1 minimum (WCAG AA)
- **Focus indicators** — 2px brass outline on all buttons
- **Keyboard nav** — Arrow keys, Tab to focus
- **Screen readers** — Semantic HTML, `aria-selected` on nav dots
- **Reduced motion** — Disables transitions on `prefers-reduced-motion: reduce`

## Development

Edit `index.html` and `style.css` directly. Changes are live.

Optional: use `app.js` to customize page flip behavior via the `PageFlip` class.

## Deployment

No build step required. Copy `public/invitation/` to your server and serve `index.html`.

For database integration (Frappe Server Script):
- Replace font URLs with relative paths or CDN
- Ensure styles load before script execution
- Use `frappe.response` to return page content
