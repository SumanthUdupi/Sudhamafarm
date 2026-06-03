# Handoff: Sumanth & Vindhya — Engagement Invitation ("Udupi Temple Glow")

## Overview
A single-page, bilingual (Kannada + English) South Indian engagement invitation for **Sumanth Udupi & Vindhya Udupa**, ceremony **12 July 2026, Nagoor, Udupi, Karnataka**. The experience is a slow, cinematic vertical scroll paced as a six-act short film — invocation → divine blessing → invitation → the date → the way to the venue → benediction. The aesthetic is "devotion rendered with the precision of a design system": brass-and-kumkum temple warmth over an invisible 8-pt grid, with a hidden "reveal the grid" designer easter-egg.

The couple are UI/UX designers — the craft itself is the gift. Hold a high bar on type, motion physics, and grid discipline.

## About the Design Files
The files in `ui_reference/` are **design references written in HTML/CSS/React-via-Babel** — prototypes showing intended look and behavior, **not production code to ship directly**. The task is to **recreate these designs in the target codebase's environment** using its established patterns (React/Next, Vue, Astro, SwiftUI, plain semantic HTML, etc.). The original source product is plain `index.html + style.css + app.js` (framework-free) — and for a one-page ceremonial invite that remains an excellent, long-lived choice. If you have no existing environment, **plain semantic HTML + one CSS file + a small deferred JS file is the recommended target** (matches the SDD's architecture and performance budget). The `.jsx` references use Babel-in-the-browser purely for prototyping convenience; do not carry that into production.

`spec/SDD_build_spec.md` is the **canonical build specification** (the couple's own Software Design Document). Where this README and the SDD agree, follow them; the SDD has the deepest rationale for every decision.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, ornament, and motion are all specified to build grade below and in the token file. Recreate pixel-faithfully using the codebase's libraries, then verify against the references.

> ⚠️ **Build state note:** `ui_reference/GlowInvite.jsx` and `Ornaments.jsx` are a **partial in-progress recreation** captured mid-refactor — they still contain the *old baseline* (five deities, emoji icons, a "Send Your Blessings" CTA, hover-based states). **Do not copy those patterns.** This README + the SDD's "Design Improvements Ledger" (§14) are the source of truth. The corrected `styles.css` in `ui_reference/` *does* reflect the elevated design (twin kuladevatas, press states, 100dvh, grid toggle, signature). The `design_system/preview/*.html` cards are individually final and review-approved.

---

## Canonical facts (single source — never let these drift)
| Field | Value |
|---|---|
| Groom | Sumanth Udupi · ಚಿ\|\| ಸುಮಂತ್ ಉಡುಪಿ |
| Bride | Vindhya Udupa · ಚಿ\|\| ಸೌ\|\| ವಿಂಧ್ಯ ಉಡುಪ |
| Occasion | Engagement / ನಿಶ್ಚಿತಾರ್ಥ (ring ceremony) |
| Date | **12 July 2026** (one canonical value — the old build had a 2025/2026 conflict; kill it) |
| Venue | Sri Krishna Lalitha Kala Mandira · ಶ್ರೀ ಕೃಷ್ಣ ಲಲಿತಾ ಕಲಾ ಮಂದಿರ, Nagoor, Udupi, Karnataka |
| Groom's deity | **Vishnu** — emblem: Sudarshana **Chakra** |
| Bride's deity | **Karthikeya (Skanda)** — emblem: **Vel** (lance) |

---

## Screens / Views — the six acts (one continuous scroll)

All acts share: `max-width: 840px` centered inner column, `padding-inline: clamp(.95rem, 4vw, 1.6rem)`, vertical section padding `clamp(2.2rem, 8vw, 4rem)`. Sections are separated by full-width SVG **wave dividers** that morph the background color from one act to the next.

### Act I — The Threshold (Hero)
- **Purpose:** the held breath before ceremony.
- **Layout:** full-bleed `min-height: 100dvh` (NOT 100vh — prevents mobile-chrome jump), safe-area padded, centered column.
- **Background:** layered — two radial brass glows (`rgba(212,175,55,.22)` @22%/28%, `.16` @78%/72%) over a diagonal kumkum gradient `linear-gradient(165deg, #3A000D 0%, #5C0015 30%, #800020 62%, #9A2030 100%)`; plus a 40px carved-wood lattice via crossed `repeating-linear-gradient` at 4% brass.
- **Components (top→bottom):** marigold garland SVG · invocation `❧ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ❧` (Noto Kannada, marigold-lt, tracking .28em) · the two names (Cinzel 700, sandalwood, `clamp(2.8rem,11vw,6rem)`) split by an italic Playfair brass ampersand · tagline `— A Sacred Union Begins —` (Playfair italic, marigold) · pill badge `✦ 12th JULY · NAGOOR, UDUPI ✦` (Cinzel, 1.5px brass border, `rgba(0,0,0,.22)` fill) · second garland · breathing scroll-cue at bottom.
- **Motion:** names **engrave** on load — `@keyframes engrave` animates `letter-spacing .28em→.04em` + `blur(5px)→0` + fade, 1100ms expo-out, second name delayed 170ms; ampersand fades up 110ms later. 22 SVG **petals** drift down on randomized 7–17s loops. Scroll cue bobs 10px on a 2.4s loop.

### Act II — The Divine Blessing (ಕುಲದೇವತಾ)
- **Purpose:** the families' guardian deities preside.
- **Background:** sandalwood-lt with a top radial brass glow + 45° lattice at 2.5%.
- **Components:**
  - **Twin Kuladevata row** — exactly **two** glyphs, balanced left/right with a brass `ॐ`/`✦` separator between: **Chakra (Vishnu, groom)** left, **Vel (Karthikeya, bride)** right. Each is a ~1KB inline SVG, `color: var(--kumkum)`, `clamp(42px,10vw,60px)`, with a small-caps side label ("Groom · Sumanth"), Cinzel deity name, and Kannada name. Entrance: rise + fade, right side staggered +120ms. **No spin, no gimmick.**
  - **Shloka card** — cream-gradient panel, 1.5px brass border, radius 16px, `box-shadow: 0 8px 50px rgba(212,175,55,.18), 0 2px 12px rgba(128,0,32,.08), inset 0 0 90px rgba(244,231,199,.5)`. Crown of the two emblems flanking a kumkum `ॐ`; Kannada couplet invoking Vishnu & Karthikeya; English gloss below a brass hairline. Four ✦ corner gems (hidden < 480px). Ambient 4s radial glow-pulse.

### Act III — The Invitation (ನಿಶ್ಚಿತಾರ್ಥ)
- **Purpose:** two families become one circle.
- **Components:** section title + rule · **invitation block** (white card, 4px kumkum left-border, radius `0 12px 12px 0`) with bilingual copy — Kannada leads (line-height 2.15), English is a *lyrical paraphrase* not a flat translation · **two family blocks** ("Groom's Family / Udupi Family / ಉಡುಪಿ ಕುಟುಂಬ" and the bride's) that slide in from opposite edges and meet at a central brass ❦ — a literal union in motion (separator hidden < 480px).

### Act IV — The Muhurtham (ಶುಭ ಮುಹೂರ್ತ)
- **Purpose:** the moment fixed in time.
- **Background:** sandalwood→sandalwood-lt vertical.
- **Components:**
  - **Date feature card** — dark kumkum gradient `linear-gradient(150deg, #5C0015, #800020 55%, #A3293C)`, radius 20px, `box-shadow: 0 12px 60px rgba(128,0,32,.38), 0 0 0 1px rgba(212,175,55,.2)`, two radial gold highlights, and a diagonal **shimmer** sweep (`@keyframes shimmer`, 5s loop, 2s delay). Holds: Kannada label · oversized **"12"** (Cinzel 700, brass, `clamp(4rem,18vw,8.5rem)`, **scale .72→1 pop reveal**) · `JULY · 2026` · brass hairline · venue (Cinzel + Kannada + locality) · italic prose line.
  - **Detail grid** — `repeat(auto-fit, minmax(160px,1fr))` (forced 2-col ≤480px). Four white cards, radius 14px, **3px kumkum top-border**. **Each uses a crafted inline-SVG icon (NOT emoji):** calendar (Date), kalasha/sunrise (Ceremony), map-pin (Venue), ring (Occasion) — `color: var(--kumkum)`, 26px, brass accent dot. Cinzel value + Playfair-italic Kannada sub.

### Act V — The Path to Nagoor (ನಾಗೂರಿಗೆ ಸ್ವಾಗತ)
- **Purpose:** come, be with us.
- **Components:** title + rule · **map** in a brass "mandapa" frame (3px brass border + inset `rgba(244,231,199,.45)` double-frame, radius 16px) — Google Maps iframe `loading="lazy"` (loads only near-view) with a kumkum caption bar naming the venue · **RSVP block**: heading + one **"Get Directions"** CTA (filled kumkum→brass pill, primary). **Per the couple's direction, do NOT include a "Send Your Blessings" button** — a single Get Directions action only.

### Act VI — Eternal Blessing (ಶುಭಮಸ್ತು)
- **Purpose:** the film closes on a blessing.
- **Background:** `linear-gradient(170deg, #5C0015, #3A000D)`.
- **Components:** brass twin-kuladevata row (Chakra + Vel, brass-tinted) · closing Kannada couplet (marigold, line-height 2.15) · italic English benediction (max-width 580px) · the names once more in brass Cinzel · date line · **designer signature footer**: an italic craft line + a monospace build-stamp (JetBrains Mono) e.g. `// udupi-temple-glow · sdd v1.0 · built with devotion`.

---

## Interactions & Behavior
- **Scroll reveal:** `IntersectionObserver` @ threshold 0.12, `rootMargin: '0px 0px -40px 0px'`; adds `.visible`, then **unobserves** (fire once). Reveal = `translateY(40px)→0` + fade, 680–850ms expo-out. Stagger siblings ~100ms. The "12" uses a scale-pop variant.
- **Scroll progress bar:** fixed top, width = scroll%, `linear-gradient(90deg, kumkum, brass, marigold)`.
- **Hero parallax:** glow layer `translateY(scroll × 0.35)`, rAF-throttled, transform-only.
- **Reveal-the-grid easter-egg:** a 38px brass pin fixed bottom-left. Tap → toggle `body.grid-on` → a fixed overlay paints an **8px baseline grid** (`repeating-linear-gradient(transparent 0 7px, rgba(212,175,55,.16) 7px 8px)`) + an 840px **column guide**, and a **coordinate HUD** (monospace, e.g. `act 02/06 · y 1234 · grid 8pt`) fades in next to the pin. Pure CSS overlay, GPU-composited, `aria-pressed` on the pin, `aria-hidden` overlay, off by default.
- **Touch-honest states (critical):** the invite lives in WhatsApp threads — **press, not hover.** All lift/glow effects are wrapped in `@media (hover: hover)`; buttons & cards use `:active { transform: scale(.97) }` / small translate. `-webkit-tap-highlight-color: transparent`. Every touch target ≥ 44×44px, CTAs capped at 320px width in the lower thumb-zone.
- **Motion golden rule:** animate **only `transform` and `opacity`** — never layout properties. Guarantees 60fps on mid-range Android over cellular.
- **Accessibility:** semantic landmarks + ordered headings; Kannada runs marked `lang="kn"`; decorative SVG `aria-hidden`; `prefers-reduced-motion` snaps reveals to final state and suppresses petals/shimmer; `focus-visible` rings on all interactive elements; target Lighthouse a11y ≥ 95.

## State Management
Minimal — this is largely presentational:
- `gridOn: boolean` — easter-egg overlay toggle (+ HUD visibility).
- `scrollProgress / scrollY` — drives the progress bar, parallax, and HUD readout (rAF-throttled, not React state if perf-sensitive).
- IntersectionObserver-driven `.visible` flags per section (DOM class, no central store needed).
- No data fetching. The map is a static iframe; CTAs are plain links (Maps deep-link for Get Directions).

## Design Tokens
Full set in `design_system/colors_and_type.css` (`:root`). Highlights:

**Color — "Glow" (primary palette)**
```
--kumkum:#800020  --kumkum-dark:#5C0015  --kumkum-deep:#3A000D  --kumkum-warm:#9A2030
--marigold:#EAA221  --marigold-lt:#FFC30B
--brass:#D4AF37  --brass-dark:#C5A059
--sandalwood:#F4E7C7  --sandalwood-lt:#FDF6E9  --ivory:#FFFDF5
--ink:#2A1510  --ink-md:#5C3317
```
There are **no cool colors** — even neutrals are warm browns. A second muted **"Folio"** palette (burgundy/paper) exists for an optional keepsake variant; see the token file.

**Spacing — 8-pt scale**
`--s1:.5rem  --s2:1rem  --s3:1.5rem  --s4:2.5rem  --s5:4rem`. Every vertical measure is a multiple of 8.

**Typography (4 voices + mono wink)**
```
--ff-display: 'Cinzel', serif            → names, titles, the "12"
--ff-serif:   'Playfair Display', serif  → italic English prose, ampersand
--ff-kannada: 'Noto Sans Kannada'        → all Kannada (line-height 2.1 — non-negotiable)
--ff-body:    'Lato'                      → labels, UI, footnotes
--ff-mono:    'JetBrains Mono'            → designer signature + coordinate HUD
```
Fluid sizes via `clamp()` (names `clamp(2.8rem,11vw,6rem)`, h2 `clamp(1.3rem,3.8vw,1.95rem)`, body `clamp(1rem,2.4vw,1.1rem)`). **Optical refinements:** smart/curly quotes only (never straight); `text-wrap: balance` on headings; letter-spacing scales inversely with size.

**Motion**
```
--ease:cubic-bezier(0.16,1,0.3,1)   /* entrances, weighted settle */
--ease-soft:cubic-bezier(0.65,0,0.35,1) /* ambient loops */
--dur-fast:200ms --dur-mid:400ms --dur-slow:680ms
```
Two easing curves only — that constraint is what reads as "designed."

**Geometry / elevation**
```
--r-card:16px  --r-feature:20px  --r-soft:14px  --r-pill:50px
--frame:5px (mandapa border)  --hair:1px (brass rules)
shadows are ALWAYS warm-tinted — gold rgba(212,175,55,…) for glow, kumkum rgba(128,0,32,…) for depth; never neutral black.
```

## Assets
All ornament is **procedural inline SVG or CSS — zero bitmaps** (page-weight budget < 350KB, LCP < 2s on 4G). Files in `assets/`:
- `deity-chakra.svg`, `deity-vel.svg` — the **two** kuladevata emblems you need (also `-trishul`, `-murali`, `-gada` exist from the old 5-deity build; **ignore those three**).
- `kolam-corner.svg` — rangoli corner, mirror via `transform` into all four hero corners.
- `garland.svg` — marigold torana strand (hero top & bottom).
- `temple-watermark.svg` — gopuram silhouette (faint ~5.5% watermark, optional folio cover).
- `icons/` — duplicate set + `scroll-cue.svg`.
Deity/temple SVGs use `currentColor` for the body so you can tint via CSS (kumkum on light, brass on dark). The crafted **detail-grid icons** (calendar/kalasha/map-pin/ring) are inline in `design_system/preview/comp-detail-cards.html` — lift them from there.
**Fonts:** all four families + JetBrains Mono are free Google Fonts; `preconnect` + `display=swap` (FOUT, never FOIT). No licensing concerns.

## Files in this bundle
```
design_handoff_engagement_invitation/
├── README.md                       ← you are here (self-sufficient)
├── spec/
│   └── SDD_build_spec.md           ← canonical Software Design Document (deepest rationale)
├── design_system/
│   ├── colors_and_type.css         ← :root tokens + .t-* type specimens (lift verbatim)
│   ├── DESIGN_SYSTEM.md            ← full brand: content voice, visual foundations, iconography
│   └── preview/                    ← 19 review-approved spec cards (colors, type, components, detail-icons)
├── ui_reference/
│   ├── styles.css                  ← elevated styles (twin deities, press, 100dvh, grid) — GOOD reference
│   ├── GlowInvite.jsx              ← ⚠️ PARTIAL old-baseline structure — use for section order only, NOT patterns
│   └── Ornaments.jsx               ← ⚠️ PARTIAL — deity SVG geometry is reusable; ignore the 5-deity row
└── assets/                         ← inline SVG ornaments & emblems
```

## Recommended build order (mirrors SDD §15)
1. **Foundation** — drop `colors_and_type.css` `:root` into your token layer; reset; type scale; 8-pt grid contract.
2. **Structure** — semantic HTML, six `<section data-act>` landmarks, all copy in place (canonical facts above).
3. **Surface** — cards, mandapa frames, SVG ornament, the two kuladevata emblems, crafted detail icons.
4. **Motion** — IntersectionObserver reveals (unobserve-once), rAF parallax, petals, shimmer; honor reduced-motion.
5. **Delight** — grid toggle + coordinate HUD + signature footer.
6. **Harden** — a11y pass (Lighthouse ≥ 95), perf budget, real-device QA (iOS notch/home-bar via `env(safe-area-inset-*)`, Android cellular fps).
