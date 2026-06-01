# Udupi Temple Glow — Design System

A design language for **bilingual (Kannada + English) South Indian ceremonial invitations**, extracted from the engagement invitation of *Sumanth Udupi & Vindhya Udupa* (12 July 2026 · Nagoor, Udupi, Karnataka). The system is warm, sacred, and celebratory — built on kumkum red, brass gold, and sandalwood cream, with hand-drawn temple iconography and devanagari/Kannada typography sitting comfortably beside classical English serifs.

It is purpose-built for **invitations, ceremony announcements, and keepsake digital cards** rooted in Tulu Nadu / coastal-Karnataka Hindu tradition, but the foundations (palette, type pairing, ornament vocabulary) generalise to any festive, devotional, or wedding-adjacent artifact.

---

## Source material

Everything here is reverse-engineered from a single repository. There is **no separate codebase, brand book, or Figma** — the design language lives entirely in the invitation's HTML/CSS.

- **GitHub:** [`SumanthUdupi/Sudhamafarm`](https://github.com/SumanthUdupi/Sudhamafarm) → `public/invitation/`
  - [`index.html`](https://github.com/SumanthUdupi/Sudhamafarm/blob/main/public/invitation/index.html) — the **long-scroll invitation** ("Glow" surface): hero, divine presence + shloka, muhurtham/date, map + RSVP, closing blessing.
  - [`book.html`](https://github.com/SumanthUdupi/Sudhamafarm/blob/main/public/invitation/book.html) — the **page-flip folio** ("Folio" surface): a 4-page swipeable keepsake book with a softer, papery palette.
  - [`style.css`](https://github.com/SumanthUdupi/Sudhamafarm/blob/main/public/invitation/style.css) — the Glow stylesheet (tokens, sections, reveal animations).
  - [`app.js`](https://github.com/SumanthUdupi/Sudhamafarm/blob/main/public/invitation/app.js) — vanilla JS: scroll progress, parallax, IntersectionObserver reveals, floating petals.

> **For the reader:** explore the repository above to go deeper — the section ordering, copy cadence, and exact animation timings in the source are the ground truth for any new artifact you build in this language.

The repo's name (`Sudhamafarm`) relates to other unrelated work by the author; **only the `public/invitation/` subtree** informs this design system.

---

## Two surfaces, one language

The system ships in **two tuned palettes/treatments** that share fonts, ornaments, and copy voice:

| | **Glow** (`index.html`) | **Folio** (`book.html`) |
|---|---|---|
| Format | Long vertical scroll | 4-page swipe/flip book |
| Mood | Saturated, lit-from-within, jewel-toned | Muted, papery, antique letterpress |
| Primary red | Kumkum `#800020` | Burgundy `#722F37` |
| Base surface | Ivory `#FFFDF5` | Paper `#FDFBF7` |
| Motion | Scroll-reveal, parallax, falling petals | Horizontal page-turn, floating motes |
| Use it for | Hero web invitation, shareable link | Premium keepsake, "open the folio" moment |

Both are documented and recreated in `ui_kits/invitation/`.

---

## CONTENT FUNDAMENTALS

The copy voice is **reverent, warm, and ceremonial** — it speaks the way a traditional printed Indian wedding card does, never like marketing.

**Bilingual, Kannada-first in spirit.** Every meaningful block appears in **both Kannada and English**, Kannada typically leading or given equal weight. The English is not a flat translation — it is a *lyrical paraphrase*. e.g. Kannada announces the families and the *nishchitartha* (betrothal); the English renders it as *"a first tender step in the journey of a lifetime."*

**Honorific prefixes are used.** Names carry traditional Kannada honorifics: **ಚಿ\|\|** (chiranjeevi, for the groom) and **ಚಿ\|\| ಸೌ\|\|** (chiranjeevi saubhagyavati, for the bride). Preserve these — they are not decoration.

**Person & address.** Third-person for the families ("the families of … joyfully invite you"), warm second-person for the guest ("Your presence and blessings are our greatest treasure"). Never first-person singular.

**Casing & tone.**
- English section labels are **UPPERCASE, widely tracked**: `ENGAGEMENT INVITATION`, `GROOM'S FAMILY`.
- Titles are Title Case in Cinzel: *The Divine Presence*, *A Joyful Invitation*, *The Holy Muhurtham*.
- Prose is sentence case, italic Playfair, often broken into hand-set short lines (`<br>`) like printed verse.
- Devotional Sanskrit/Kannada shlokas are set as couplets with `|` and `||` danda marks.

**Vocabulary.** Sacred + sensory + place-rooted. Recurring words: *sacred, auspicious, blessings, union, eternal, muhurtham, kuladevata, marigolds, sandalwood, coastal, temple bells, Tulu Nadu*. Openings invoke **ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ** (Shri Ganeshaya Namaha) and **ॐ**.

**Emoji?** No lifestyle emoji in prose. A *very* small, intentional set of pictographic emoji appears only as quiet category markers on the date/detail cards: 📅 🌅 📍 💍. Everything else "emoji-like" is actually a **typographic glyph** (✦ ❦ ❧) — see Iconography.

**Examples to match the register:**
> *"With hearts overflowing with gratitude, joy, and the fragrance of marigolds…"*
> *"Where the coastal breezes of Udupi carry the fragrance of sandalwood and the whisper of the sea…"*
> *"Two families, one joyful heart — in the warm coastal embrace of Udupi, where temple bells ring with the rhythm of the sea."*

---

## VISUAL FOUNDATIONS

**Palette.** A three-note chord: **kumkum red** (primary, sacred), **brass gold** (metallic accent — every rule, border, gem, and frame), **sandalwood/ivory cream** (warm surfaces). **Marigold** orange is the festive secondary (petals, small labels). The Folio surface desaturates the red to burgundy and the cream to paper. There are **no cool colors at all** — no blues, no greys; even "neutrals" are warm browns (`#2A1510`, `#5C3317`). See `colors_and_type.css`.

**Type.** Four families, each with a fixed job:
- **Cinzel** (engraved Roman caps) — names, section titles, dates, the big numeral. Carries all the "monumental" weight.
- **Playfair Display *italic*** — English prose, subtitles, ampersands. The lyrical voice.
- **Noto Sans Kannada** — all Kannada, set at a generous `line-height: 2`–`2.15` to give stacked glyphs room.
- **Lato** — small-caps labels, UI, footnotes. The quiet utilitarian.
Sizing is fluid `clamp()` throughout (mobile-first, desktop-capped). Names go up to `6rem`; the date numeral up to `8.5rem`.

**Backgrounds.** Layered, never flat. Dark sections (hero, closing, feature cards) stack **radial gold glows** over a **diagonal kumkum gradient** (`165deg, deep→dark→red→warm`). Light sections add faint **repeating-linear-gradient lattices** (a "carved woodwork" / temple-screen texture at ~4% opacity) over cream. The Folio adds an **SVG fractal-noise paper grain** at ~4% via `mix-blend-mode: multiply`. No photography is used anywhere.

**Section transitions.** Sections are separated by **full-width SVG wave dividers** (`preserveAspectRatio="none"`) that morph the background color from one section to the next — deep red → cream → sand → ivory → red.

**Ornament & "frames".** A persistent **fixed gold border frame** rings the whole Glow viewport (`5px brass` + inset kumkum + faint gold). Cards and the map get **double "antique frame" overlays** (an inset translucent-cream border inside the brass border). Hero corners carry **kolam** (rangoli) SVG ornaments; garlands arc above/below the names; corner **✦ gems** mark cards.

**Corner radii.** Soft but not trendy: cards `16px`, the feature date card `20px`, detail cards `14px`, buttons/badges fully pill (`50px`). The folio book uses an asymmetric `3px 12px 12px 3px` to suggest a bound spine.

**Cards.** Two archetypes. (1) *Light shloka/detail cards*: cream gradient fill, `1.5px brass` border, soft gold-tinted shadow + inset cream glow, corner gems. (2) *Dark feature card* (the date): kumkum gradient fill, brass hairline ring, radial gold highlights, an animated diagonal **shimmer** sweep. Detail cards sit on white with a `3px` kumkum **top border** and lift on hover.

**Shadows.** Always warm-tinted, never neutral black: gold (`rgba(212,175,55,…)`) for elevation glow, kumkum (`rgba(128,0,32,…)`) for depth. Combined long+short shadow stacks. Inset cream glow (`inset 0 0 90px rgba(244,231,199,.5)`) gives cards an interior warmth.

**Animation.** Tasteful and continuous, never bouncy.
- *Easing:* `cubic-bezier(0.16,1,0.3,1)` (ease-out-expo) for entrances/lifts; `cubic-bezier(0.77,0,0.175,1)` for folio page-turns.
- *Entrances:* fade-up `translateY(30–40px)` via IntersectionObserver, with `.stagger-1…4` delays (.1–.4s).
- *Ambient:* falling **petals** (Glow) and floating **motes** (Folio); a slow **glow-pulse** on the shloka card; an **om-pulse** text-shadow throb; a periodic card **shimmer**; a bobbing scroll cue.
- *Reduced distance on mobile* (20px) to cut jank. No spring/overshoot anywhere.

**Hover states.** Lift + warm glow. Cards/deities `translateY(-4 to -6px)` + scale + gold drop-shadow. Primary button **inverts** kumkum→brass with a light-sweep streak crossing it. Nav dots scale `1.4×` and fill brass when active. All hover effects are disabled under `@media (hover: none)` for touch.

**Press / active.** No shrink; interactions rely on the hover-invert and a subtle translate. Touch removes transforms entirely.

**Transparency & blur.** Used sparingly — translucent cream/white card fills (`rgba(255,255,255,.52–.93)`), translucent black badge backing (`rgba(0,0,0,.22)`) over the hero gradient. **No backdrop-blur / frosted glass** — the aesthetic is paper and brass, not glass.

**Layout rules.** Mobile-first; the **phone is the primary viewport** (≤480px is "THE PRIMARY TARGET"). Centered single column, `max-width: 840px` inner. Fixed chrome: the border frame, a top **scroll-progress bar** (kumkum→brass→marigold gradient), and right-edge **nav dots** (desktop/tablet only). Respects iOS **safe-area insets**. The Folio locks to a fixed full-viewport book with edge tap-zones and swipe.

**Imagery vibe.** There is **no raster imagery** — the entire visual world is hand-built from SVG (deities, kolam, garlands, temple silhouette) and CSS gradients/textures. If photography is ever added, it should read **warm, golden-hour, sandalwood-and-marigold**, never cool or desaturated.

---

## ICONOGRAPHY

The brand's iconography is **bespoke, hand-drawn SVG in a two-tone "brass-on-kumkum" style** — there is **no icon font, no Lucide/Heroicons, no icon library**. Every glyph is purpose-drawn for this ceremony and lives in `assets/icons/`.

**Pancha-Deva deity attributes (the signature set).** Five divine symbols stand in for five guardian deities. Stroke-and-fill SVGs, `#800020` (kumkum) bodies with `#D4AF37` (brass) accents, drawn on a `48×48` grid:
- `deity-chakra.svg` — Sudarshana Chakra (Vishnu)
- `deity-trishul.svg` — Trishul (Shiva)
- `deity-murali.svg` — Murali / flute (Krishna)
- `deity-vel.svg` — Vel / divine lance (Subrahmanya)
- `deity-gada.svg` — Gada / mace (Hanuman)
A **monochrome brass variant** of this row reappears, smaller, in the closing footer (drawn inline in the source on a dark ground).

**Ornaments.**
- `kolam-corner.svg` — rangoli/kolam corner flourish (brass, ~`100×100`), mirrored into all four corners.
- `garland.svg` — marigold garland arc (marigold + brass dots) framing the names.
- `temple-watermark.svg` — a detailed Udupi-style **gopuram/temple silhouette**, used as a faint (`opacity ~.055`) cover watermark on the folio.
- `scroll-cue.svg` — animated mouse-scroll hint (marigold).

**Typographic glyphs as icons.** The system leans on Unicode **dingbats** as its "small icon set," always in brass/gold:
- `✦` (U+2726) — the universal sparkle/gem; corner accents, badge bookends, name separators.
- `❦` (U+2766) & `❧` (U+2767) — floral hearts / fleurons for rules and dividers.
- `ॐ` (U+0950) — Om, large devotional mark on the shloka card.
- `♪ ♫` — music notes beside Krishna's flute.
- `↗` — directions arrow on the map CTA.

**Pictographic emoji (minimal, intentional).** Only on the date/detail cards as quiet category markers: 📅 (date) · 🌅 (ceremony/morning) · 📍 (venue) · 💍 (occasion). Use this exact set sparingly; do not introduce others.

> **Reuse note:** the deity SVGs use hardcoded kumkum/brass fills. To recolor (e.g. for the brass-on-dark footer treatment), swap `#800020`→`currentColor` or to brass and set `color`/fills accordingly. Never substitute a generic icon-library glyph for a deity attribute — they are religiously specific.

---

## File index

Root foundations:
- **`README.md`** — this file: context, content & visual foundations, iconography.
- **`colors_and_type.css`** — all color tokens (Glow + Folio palettes + semantic roles), type families, motion, radii, shadow tokens, and drop-in `.t-*` type specimen classes.
- **`SKILL.md`** — Agent-Skill front-matter so this system can be used directly in Claude Code.

Assets:
- **`assets/icons/`** — the five deity SVGs, kolam corner, garland, temple watermark, scroll cue.

Previews (populate the **Design System** tab):
- **`preview/`** — small specimen cards: palettes, type scale, ornaments, components, motion.

UI kits (high-fidelity, interactive recreations):
- **`ui_kits/invitation/`** — `index.html` (interactive demo of both Glow scroll + Folio flip surfaces) plus modular JSX components (`Ornaments`, `Hero`, `ShlokaCard`, `MuhurthamCard`, `DetailGrid`, `Buttons`, `FolioBook`, …). See its own `README.md`.

No slide template was provided in the source, so `slides/` is intentionally omitted.
