# Engagement Invitation — Comprehensive Testing Plan

## Overview
This plan validates all 90 improvements across visual design, UX/accessibility, content quality, and code performance. Execute tests in the order listed below, grouped by category.

---

## Phase 1: Visual Design & Typography (Tasks 1-26)

### Typography & Spacing (Checks 1-10)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 1 | Cover names scale correctly across devices (mobile 1.35rem–2.1rem, desktop 1.55–3.2rem) | Open DevTools; resize to 375px, 768px, 1200px; inspect .cover-name-en | [ ] |
| 2 | Subtitle spacing (.cover-sub margin-top) breathes properly on all breakpoints | Resize; compare visual breathing between mobile/tablet/desktop | [ ] |
| 3 | Detail pill labels (.52rem mobile, .64rem desktop) are readable | Compare pill text size on 375px and 1200px | [ ] |
| 4 | Letter-spacing on .lbl is fluid (max(.2em, 2px)) and doesn't overlap | Check at 3 breakpoints: 375px, 768px, 1200px | [ ] |
| 5 | Muhurtham date numerals have proper spacing (6rem+ with clamp) | Inspect .muhu-big font-size and letter-spacing | [ ] |
| 6 | Closing prose line-height prevents crowding on mobile | Measure line-height on 375px screen; visually inspect readability | [ ] |
| 7 | Paragraph margins (.wel-kn/wel-en) are clamp(0.8rem, 2vh, 1.3rem) | Inspect margin-bottom on 375px, 768px, 1440px | [ ] |
| 8 | Font-family CSS variables are used everywhere (no hardcoded font names) | Grep for sans-serif/serif in CSS; all should be var(--ff-*) | [ ] |
| 9 | Tagline "A Coastal Promise Begins" or similar is prominent on page 2 | Visual inspection of page 2 cover area | [ ] |
| 10 | Closing prose reads warmly ("With your blessings and presence...") | Read aloud; check emotional tone | [ ] |

### Color & Contrast (Checks 11-20)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 11 | Gold on dark background: #EAA221, on light: #E8941A | Inspect :root tokens --gold-on-dark, --gold-on-light | [ ] |
| 12 | Pill label (.pill-lbl) has 5.8:1 contrast ratio (#8B5E1A on white) | Use WebAIM contrast checker; enter color and white (#FDFBF7) | [ ] |
| 13 | Brass color (#D4AF37) passes WCAG AA against dark background | Verify contrast in buttons/links; use Chrome DevTools audit | [ ] |
| 14 | Cover badge background (rgba(114,47,55,.14)) is subtle but visible | Visual inspection; should not overwhelm text | [ ] |
| 15 | Closing page gradient (radial + linear blend) mimics candlelight | Zoom in on closing page; check smooth blend at 20% 20% | [ ] |
| 16 | Kumkum gradient includes warm mahogany (#8B2420) at 30% | Inspect .p-muhurtham background gradient stops | [ ] |
| 17 | Brass tokens are consistent across all uses (nav dots, frames, etc.) | Grep for --brass; all should reference same token | [ ] |
| 18 | Ornament opacity scale applied: primary .72, secondary .48, tertiary .24 | Inspect .close-kula-svg, .close-kula-deity opacities | [ ] |
| 19 | Glow opacity tokens: primary .18, secondary .12, tertiary .08 | Inspect --opacity-glow-* tokens; verify in gradients | [ ] |
| 20 | No color accessibility issues flagged by Lighthouse audit | Run Lighthouse → Accessibility; expect score 90+ | [ ] |

### Layout & Spacing (Checks 21-26)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 21 | Hero min-height prevents vertical collapse (max(100dvh - chrome, 480px)) | Test on iPhone 12/14 with/without Safari address bar | [ ] |
| 22 | Detail pills use CSS Grid with aspect-ratio 3/4 (no CLS) | Inspect .muhu-pills grid-template-columns; .pill aspect-ratio | [ ] |
| 23 | Cover badge has elevation (border + background + spacing) | Visual inspection; should feel "lifted" | [ ] |
| 24 | Tap zones constrained properly (bottom: clamp(3.5rem, 10vh, 5rem)) | Inspect .tap-zone; verify doesn't overlap nav | [ ] |
| 25 | Book spine pseudo-element is behind pages (z-index: -1) | Visual test; spine should not peek through pages | [ ] |
| 26 | Overflow-x: hidden on html/body; no horizontal scrollbar | Test on 375px mobile; swipe/drag should not show overflow | [ ] |

---

## Phase 2: Interaction & Accessibility (Tasks 27-45)

### Navigation & Keyboard (Checks 27-35)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 27 | Tab key cycles through: cover button → nav dots → links → back to cover button | Use Tab repeatedly; verify focus order makes sense | [ ] |
| 28 | Arrow keys navigate pages (Left/Right or Up/Down) | Press ↑↓←→; each should advance/go back | [ ] |
| 29 | Cover "Open Invitation" button has keyboard focus & works with Enter | Tab to button; press Enter; page should flip | [ ] |
| 30 | Nav dots are keyboard accessible (Tab to dot, Enter to navigate) | Tab through dots; press Enter on dot 2; should jump to page 2 | [ ] |
| 31 | Map iframe has tabindex=0 and is keyboard focusable | Tab through page 4; focus should reach map | [ ] |
| 32 | "Get Directions" link has :focus-visible outline (2px brass) | Tab to link; outline should appear | [ ] |
| 33 | Disabled nav buttons are grayed out and non-focusable | On page 1, tab through; "Prev" button should be skipped | [ ] |
| 34 | Touch swipe works (left/right to navigate) | On mobile/tablet, swipe left/right; pages flip | [ ] |
| 35 | Screen reader announces page count and nav button states | Use NVDA/JAWS; listen for "page 1 of 5", "previous disabled" | [ ] |

### Focus & Visual Indicators (Checks 36-40)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 36 | All buttons have :focus-visible outline (2px brass, 2px offset) | Tab through; each button shows brass outline | [ ] |
| 37 | Active nav dot has visual indicator: brass border + scale(1.25) | Visually inspect active dot; should stand out | [ ] |
| 38 | Tap hint arrow appears at opacity .25 on touch devices | Open on mobile; swipe hint should be visible | [ ] |
| 39 | Focus outline is visible on all backgrounds (including dark) | Tab through all pages; outline visible on every element | [ ] |
| 40 | Reduced motion mode disables parallax tilt and animations | Enable prefers-reduced-motion in DevTools; tilt should stop | [ ] |

### Semantic HTML & ARIA (Checks 41-45)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 41 | Main element wraps book content (`<main id="book">`) | Inspect HTML; should have <main> tag | [ ] |
| 42 | Nav element wraps navigation (`<nav id="nav">`) | Inspect HTML; should have <nav> tag | [ ] |
| 43 | Decorative SVGs have aria-hidden="true" (watermark, gems, separator) | Grep for aria-hidden; all decorative SVGs tagged | [ ] |
| 44 | Nav dots have aria-selected attribute (true when active) | Inspect dot elements; aria-selected should toggle | [ ] |
| 45 | Noscript fallback displays if JS disabled | Disable JS in DevTools; page should show fallback message | [ ] |

---

## Phase 3: Responsive Design & Performance (Tasks 46-74)

### Responsive Breakpoints (Checks 46-52)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 46 | Ultra-mobile (max-width: 380px) has tighter type scaling | Resize to 360px; check .cover-name-en uses clamp(1.35rem, 5.2vw, 2.1rem) | [ ] |
| 47 | Tablet (768px) layout is properly balanced | Resize to 768px; all elements properly spaced | [ ] |
| 48 | Desktop (1100px+) uses larger max-widths and type | Resize to 1400px; book width should expand to max(80vw, 940px) | [ ] |
| 49 | No landscape-only CSS rules (removed half-implemented @media orientation) | Grep for "orientation: landscape"; should be empty | [ ] |
| 50 | Hero book scales smoothly (no jumps between breakpoints) | Slowly resize from 375px to 1440px; no sudden jumps | [ ] |
| 51 | Detail pill grid uses auto-fit and wraps naturally | Resize to 480px, 768px, 1200px; pill layout should adapt | [ ] |
| 52 | Map iframe scales responsively (width: 100%, height: 100%) | Resize map container; should scale with parent | [ ] |

### Reduced Motion & Accessibility Features (Checks 53-60)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 53 | prefers-reduced-motion: reduce disables all transitions | DevTools → Rendering → prefers-reduced-motion: reduce; no animations | [ ] |
| 54 | .no-animation class added to html when reduced-motion detected | Check DevTools console: document.documentElement.classList | [ ] |
| 55 | Parallax tilt (book 3D effect) disabled on reduced-motion devices | Enable prefers-reduced-motion; pointer move should not rotate book | [ ] |
| 56 | Mote animations disabled on reduced motion | Same test; ambient motes should not float | [ ] |
| 57 | Page flip animation still works on reduced motion (just snappier) | Same test; clicking next button should still flip page (instantly) | [ ] |
| 58 | Font loading doesn't cause FOUT (Flash of Unstyled Text) | Check Network tab; fonts load before text paints | [ ] |
| 59 | No cumulative layout shift (CLS) — aspect-ratio locks pill layouts | Open DevTools → Core Web Vitals; CLS should be near 0 | [ ] |
| 60 | IntersectionObserver features detected and fallback works | Disable IntersectionObserver in DevTools; content still visible | [ ] |

### Performance & Asset Optimization (Checks 61-74)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 61 | HTML file is <15 KB | Run: wc -c public/invitation/index.html | [ ] |
| 62 | CSS file is <50 KB | Run: wc -c public/invitation/style.css | [ ] |
| 63 | JavaScript files are <8 KB (app.js + pageFlip.js + config.js combined) | Run: wc -c public/invitation/{app,pageFlip,config}.js | [ ] |
| 64 | All SVG assets are <3 KB each and total <15 KB | Check SVG file sizes; optimize with SVGO if needed | [ ] |
| 65 | Total uncompressed payload is <88 KB | Sum all files above | [ ] |
| 66 | Fonts load asynchronously (no render-blocking) | Inspect <head> tag; fonts should use @import or async link | [ ] |
| 67 | No unused CSS rules (PurgeCSS check or manual audit) | Use online PurgeCSS tool or grep for unused classes | [ ] |
| 68 | Temple watermark SVG optimized (<3 KB) | Check file size; paths should have 2 decimal precision | [ ] |
| 69 | No render-blocking scripts in head (app.js is deferred) | Inspect <head>; should be <script type="module" defer> or <script type="module"> in body | [ ] |
| 70 | Images error handling works (map iframe fallback) | Inspect onerror attribute; fallback link visible if map fails | [ ] |
| 71 | Console has no errors or warnings | Open DevTools → Console; should be clean | [ ] |
| 72 | Lighthouse Performance score ≥85 | Run Lighthouse → Performance; expect green score | [ ] |
| 73 | Lighthouse Accessibility score ≥90 | Run Lighthouse → Accessibility | [ ] |
| 74 | Lighthouse Best Practices score ≥90 | Run Lighthouse → Best Practices | [ ] |

---

## Phase 4: Content & Copy Quality (Tasks 46-61, repeated in content context)

### Bilingual Content (Checks 75-82)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 75 | Kannada text renders without mojibake (proper Unicode) | Visual inspection; Kannada should read correctly | [ ] |
| 76 | English names have parenthetical Kannada gloss (if implemented) | Check page 1; should show "Sumanth Udupi (ಸುಮಂತ್)" format | [ ] |
| 77 | Kannada romanization note is present (if needed) | Search HTML for "Sumanth = ಸುಮಂತ್" | [ ] |
| 78 | Closing poem in Kannada reads smoothly and evokes emotion | Read aloud or translate; should feel poetic | [ ] |
| 79 | Deity invocation is "ಕುಲದೇವತಾ ಪ್ರಸನ್ನ" (not generic Ganesha) | Grep for "ಕುಲದೇವತಾ ಪ್ರಸನ್ನ" | [ ] |
| 80 | Family labels correctly show "Vadeyaramata Family" in English and Kannada | Inspect page 2; bride's family label | [ ] |
| 81 | Shloka source attribution present (if implemented) | Check muhurtham page; source should be credited | [ ] |
| 82 | Venue punctuation uses proper separator ("Sri Krishna Lalitha Kala Mandira, Nagoor · Udupi") | Grep for venue text; check punctuation | [ ] |

### English Copy Tone (Checks 83-86)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 83 | Opening uses "With Open Hearts" (not generic "Warm Regards") | Search page 1 for greeting text | [ ] |
| 84 | Copy uses "we" and personal emotion (not formal "the families") | Read invitation text; should feel warm and personal | [ ] |
| 85 | Closing blessing reads as "With your blessings and presence, this moment becomes eternal" | Grep for closing prose; check exact wording | [ ] |
| 86 | Tagline conveys coastal/Udupi connection ("A Coastal Promise Begins") | Verify tagline on page 1 | [ ] |

### Functional CTA & Details (Checks 87-90)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 87 | RSVP CTA is clear and accessible (WhatsApp or email link present) | Visual inspection of page 1 or 2; CTA should be prominent | [ ] |
| 88 | Ceremony time explicitly stated (e.g., "9:00 AM IST") | Check detail pills on muhurtham page; time should be visible | [ ] |
| 89 | Map link opens Google Maps (Get Directions) on page 4 | Click "Get Directions"; should open Maps in new tab | [ ] |
| 90 | Hospitality details present (timing, refreshments, etc., if applicable) | Visual inspection of page 4 or closing page | [ ] |

---

## Phase 5: Cross-Browser & Device Testing (Final Phase)

### Desktop Browsers (Checks 91-95)

| Check | Browser | Test | Status |
|-------|---------|------|--------|
| 91 | Chrome 90+ | Open on latest Chrome; all features work | [ ] |
| 92 | Firefox 88+ | Open on latest Firefox; all features work | [ ] |
| 93 | Safari 14+ (macOS) | Open on Safari; WebFont rendering correct | [ ] |
| 94 | Edge 90+ | Open on Edge; parallax tilt works | [ ] |
| 95 | Internet Explorer 11 | Graceful degradation (no animations, but content readable) | [ ] |

### Mobile Browsers (Checks 96-100)

| Check | Device | Test | Status |
|-------|--------|------|--------|
| 96 | iPhone 12 (Safari) | All pages scroll/flip smoothly; fonts readable | [ ] |
| 97 | Android 12+ (Chrome) | Touch interactions work; no jank | [ ] |
| 98 | iPad (Safari, landscape) | Layout doesn't break in landscape | [ ] |
| 99 | iPhone SE (small screen) | 375px breakpoint applies; readable | [ ] |
| 100 | Samsung Galaxy S21 | Large screen (1080p) renders correctly | [ ] |

### Device-Specific Tests (Checks 101-105)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 101 | Touch tap targets are 44×44px minimum (nav arrows, dots) | DevTools mobile emulation; tap zone should be easy to hit | [ ] |
| 102 | Parallax tilt disabled on mobile (pointer:fine not matched) | DevTools mobile; book should not tilt on mousemove | [ ] |
| 103 | Tap hint arrow visible on touch devices (opacity .25) | Mobile device; swipe hint should be visible | [ ] |
| 104 | No horizontal scrollbar on mobile (overflow-x: hidden) | Swipe/drag on mobile; no overflow | [ ] |
| 105 | Screen reader works (Voice Over on iOS, TalkBack on Android) | Use Voice Over; navigation should be announced | [ ] |

---

## Phase 6: Final Verification & Sign-Off

### Code Review (Checks 106-110)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 106 | No console errors or warnings | DevTools → Console; should be clean | [ ] |
| 107 | ES6 modules imported correctly (config.js, pageFlip.js) | Check Network tab; all .js files load with correct MIME type | [ ] |
| 108 | .gitignore excludes build artifacts and env files | Cat .gitignore; includes node_modules, dist, .env, etc. | [ ] |
| 109 | README.md documents purpose, performance budget, and browser support | Read README; all sections present | [ ] |
| 110 | ASSETS.md explains SVG-only strategy and optimization | Read ASSETS.md; clear and concise | [ ] |

### Final Visual Spot Check (Checks 111-115)

| Check | What to Verify | How to Test | Status |
|-------|---|---|---|
| 111 | Cover page is inviting and engaging (visual first impression) | Visual inspection; should feel warm and elegant | [ ] |
| 112 | Page transitions are smooth and satisfying (500ms flip) | Click through pages; animation should feel snappy | [ ] |
| 113 | Colors are cohesive across all pages (brass, gold, burgundy palette) | Visual inspection; no jarring color shifts | [ ] |
| 114 | Typography hierarchy is clear (headings > body > labels) | Visual inspection; easy to skim | [ ] |
| 115 | Closing page feels celebratory and memorable | Visual inspection; should leave a positive lasting impression | [ ] |

---

## Testing Checklist Summary

**Total Checks:** 115

- [ ] Phase 1 (26 checks) — Visual Design & Typography — **Pass: ___ / 26**
- [ ] Phase 2 (19 checks) — Interaction & Accessibility — **Pass: ___ / 19**
- [ ] Phase 3 (29 checks) — Responsive & Performance — **Pass: ___ / 29**
- [ ] Phase 4 (16 checks) — Content & Copy — **Pass: ___ / 16**
- [ ] Phase 5 (15 checks) — Cross-Browser Testing — **Pass: ___ / 15**
- [ ] Phase 6 (10 checks) — Code Review & Final Verification — **Pass: ___ / 10**

**Overall Status:** [ ] Ready for Launch

---

## Notes for Testers

1. **Start with Phase 1** — ensure visual design is correct before deeper testing
2. **Use DevTools liberally** — inspect computed styles, colors, and performance metrics
3. **Test on real devices** — emulation is helpful but doesn't catch all issues (e.g., actual touch latency)
4. **Read all copy aloud** — tone and rhythm are easier to catch when spoken
5. **Log issues as: [Phase] [Check #] [Description]** — helps track and prioritize fixes

---

**Testing Started:** ___________  
**Testing Completed:** ___________  
**Tester Name:** ___________  
**Sign-Off:** ___________
