❧   ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ   ❧
SOFTWARE DESIGN DOCUMENT

Sumanth & Vindhya
The Engagement Experience
An Immersive, Cinematic Build Specification
where the craft is the proof

12 JULY 2026   ·   NAGOOR, UDUPI
// implements: BRD v1.0   ·   target: public/invitation   ·   sdd_version: 1.0

Contents



01  Design Philosophy    the soul

This document is itself a design artifact. The couple are leading UI/UX designers; a specification written for them must demonstrate the standard it describes, not merely assert it. Every choice below is justified by intent — nothing is decorative by accident.
THE GOVERNING PRINCIPLE
“Devotion rendered with the precision of a design system.”
The warmth of a Udupi temple — brass lamps, sandalwood, kumkum, the hush before a muhurtham — expressed through an invisible scaffolding of grids, optical type, and motion physics. The viewer feels the temple. A designer who inspects it finds Figma.
Five Design Tenets
#
Tenet
What It Means In Practice
1
Restraint over spectacle
Motion is slow, weighted, intentional. Nothing bounces. Devotion is dignified.
2
Optical, not metric
Type sizes and alignments are tuned to the eye, not the ruler — true to luxury typesetting.
3
Grid as hidden architecture
An 8-pt system governs everything; it is felt as order, revealable as a designer easter-egg.
4
Bilingual parity
Kannada and English are co-equal citizens, never one as a subtitle to the other.
5
Performance is a feature
Cinematic ≠ heavy. Every effect is GPU-cheap and degrades gracefully.
02  System Architecture    how it&apos;s built

A deliberately minimal, framework-free architecture — the most performant and longest-lived choice for a single ceremonial page. Three files, one source of truth for style, progressive enhancement throughout.
MODULE MAP
public/invitation/
index.html      → semantic structure + inline critical CSS (above-fold)
style.css       → design tokens (:root) + full component styles
app.js          → IntersectionObserver reveals, parallax, grid toggle,
                  petal system, reduced-motion guard  (deferred)
/assets/        → inline SVG only — woodwork, mandapa, deity glyphs
 
Rendering strategy:
  1. Inline critical CSS  → first paint with zero blocking requests
  2. Fonts: preconnect + display=swap (FOUT, never FOIT)
  3. JS deferred          → never blocks parse
  4. Map iframe lazy      → loads only when scrolled near
Layer Model
Layer
Responsibility
Technique
Foundation
Tokens, reset, type scale
CSS custom properties on :root
Layout
8-pt grid, section rhythm
CSS Grid + clamp() fluid spacing
Surface
Cards, frames, dividers
Layered gradients + inline SVG
Motion
Reveals, parallax, ambient
IntersectionObserver + rAF + CSS keyframes
Delight
Grid toggle, coordinate HUD
Opt-in class toggle, GPU transforms
03  Design Tokens    single source of truth

The entire visual system compiles from one :root block. Re-skin the invitation by editing values here — nothing else. This is the implementation contract for the BRD’s “Udupi Temple Glow.”
:root  /* color · type · space · motion */
/* ── Udupi Temple Glow ───────────────────── */
--kumkum:#800020;  --kumkum-dk:#5C0015;  --kumkum-dp:#3A000D;
--marigold:#EAA221; --marigold-lt:#FFC30B;
--sandalwood:#F4E7C7; --sand-lt:#FDF6E9; --ivory:#FFFDF5;
--brass:#D4AF37; --brass-dk:#C5A059;
--ink:#2A1510; --ink-md:#5C3317;
 
/* ── Type (3-voice system) ───────────────── */
--ff-display:&apos;Cinzel&apos;,serif;       /* names, titles      */
--ff-edit:&apos;Playfair Display&apos;,serif;/* poetic, italic     */
--ff-kn:&apos;Noto Sans Kannada&apos;,sans;  /* devotional script  */
--ff-body:&apos;Lato&apos;,system-ui,sans;   /* logistics          */
--ff-mono:&apos;JetBrains Mono&apos;,ui-monospace; /* designer wink */
 
/* ── 8-pt spacing scale ──────────────────── */
--s1:.5rem; --s2:1rem; --s3:1.5rem; --s4:2.5rem; --s5:4rem;
 
/* ── Fluid type (modular 1.25, no JS) ────── */
--t-name:clamp(2.8rem,11vw,6rem);
--t-h2:clamp(1.3rem,3.8vw,1.95rem);
--t-body:clamp(1rem,2.4vw,1.1rem);
 
/* ── Motion ──────────────────────────────── */
--ease:cubic-bezier(0.16,1,0.3,1); /* expo-out, weighted */
--ease-soft:cubic-bezier(0.65,0,0.35,1);
--dur-fast:200ms; --dur-mid:400ms; --dur-slow:680ms;
 
/* ── Geometry ────────────────────────────── */
--r-card:16px; --r-pill:50px;
--frame:5px;       /* mandapa border weight              */
--hair:1px;        /* brass hairline rules               */
WHY THESE TOKENS
Two easing curves only — --ease for entrances (weighted, settling), --ease-soft for ambient loops. A constrained motion vocabulary is what reads as “designed.”
Fluid clamp() type means zero resize listeners and zero layout thrash — the page is liquid from 320 px to desktop.
04  Typographic System    the voice

Typography carries the entire brand here — there is no logo. The pairing is engineered for small screens: high x-height body for legibility, engraved display for ceremony, a monospace counter-voice for the designer signature.
Role
Face
Size (mobile→desktop)
Tracking
Couple names
Cinzel 700
44 → 96 px
+0.04em
Section title
Cinzel 600
21 → 31 px
+0.10em
Shloka (Kannada)
Noto Sans Kannada
17 → 21 px
line 2.1
Poetic line
Playfair italic
14 → 17 px
+0.02em
Logistics body
Lato 400
16 → 18 px
line 1.7
Coordinate HUD
JetBrains Mono
11 → 13 px
+0.06em
Optical Refinements (the luxury layer)
Hanging punctuation & true quotes (“ ” ‘ ’ — never straight) on all English copy.
Kannada line-height set to 2.1 — the script needs vertical air that Latin defaults strangle.
Letter-spacing scales inversely with size — tight on display, open on small caps labels.
text-wrap: balance on headings so multi-line titles never orphan a single word.
05  Layout & The 8-Point Grid    hidden architecture

Every vertical measure — padding, gaps, card heights — is a multiple of 8. This is invisible to a guest and unmistakable to a designer. It is also the substrate for the signature “reveal the grid” feature.
Grid contract
.section { padding-block: clamp(2.2rem, 8vw, 4rem); }  /* ÷8 */
.inner   { max-width: 840px; margin-inline: auto;
           padding-inline: clamp(.95rem, 4vw, 1.6rem); }
.detail-grid { display:grid;
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  gap: var(--s3); }            /* snaps to 8-pt rhythm */
 
/* zero horizontal overflow — enforced globally */
html,body { overflow-x:clip; max-width:100vw; }
DESIGNER EASTER-EGG — “Reveal The Grid”
A 28×28 px brass pin, fixed bottom-left. Tap it and a baseline grid + column guides fade in over the entire page — exactly how the couple inspect their own artboards in Figma.
Implementation: a single body.grid-on class paints a repeating-linear-gradient overlay (8px baseline) + a max-width column guide. Pure CSS, no reflow, GPU-composited, off by default, hidden from screen readers.
// the toggle — 9 lines, no dependencies
const pin = document.querySelector(&apos;.grid-pin&apos;);
pin.addEventListener(&apos;click&apos;, () => {
  document.body.classList.toggle(&apos;grid-on&apos;);
  pin.setAttribute(&apos;aria-pressed&apos;,
    document.body.classList.contains(&apos;grid-on&apos;));
});
/* CSS */
.grid-on::after{content:&apos;&apos;;position:fixed;inset:0;z-index:9500;
  pointer-events:none;background:
    repeating-linear-gradient(transparent 0 7px,rgba(212,175,55,.18) 7px 8px);}
06  Motion Design    the cinema

Motion is where craft becomes visceral. The brief asks for cinematic and immersive — delivered through a disciplined choreography, not a fireworks display. Three motion classes, one timeline philosophy: enter slow, settle, rest.
Motion Inventory
Effect
Trigger
Spec
Cost
Scroll reveal
IntersectionObserver @0.12
translateY(40→0) + fade, 680ms --ease, staggered 100ms
compositor-only
Hero parallax
scroll (rAF-throttled)
glow layer translateY × 0.35
transform only
Petal drift
ambient loop
22 SVG petals, randomized dur 7–17s
will-change:transform
Name engrave
load
letter-spacing + text-shadow bloom, 900ms
one-shot
“12” muhurtham
reveal
scale(.7→1) + brass glow pulse
transform+opacity
Shimmer sweep
date card loop
diagonal light, 5s ease-in-out infinite
translateX
THE GOLDEN RULE OF THIS BUILD
Animate only transform and opacity. Never animate layout properties (width, top, margin). This is the single discipline that guarantees a sustained 60 fps on a mid-range Android over cellular.
// reveal observer — unobserve after fire (cheap)
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add(&apos;visible&apos;);
      io.unobserve(e.target);   // fire once, then release
    }
  });
},{threshold:.12, rootMargin:&apos;0px 0px -40px 0px&apos;});
ACCESSIBILITY — NON-NEGOTIABLE
@media (prefers-reduced-motion: reduce)
*,*::before,*::after{
  animation-duration:.01ms!important;
  animation-iteration-count:1!important;
  transition-duration:.01ms!important;
}
/* reveals snap to final state; petals + shimmer suppressed */
07  The Cinematic Journey    scene by scene

Six acts. The page is paced like a short film — a held breath, an invocation, a rising warmth, the reveal of the date, the way to the temple, and a benediction. Each act has an entrance choreography and an emotional beat.
ACT I  The Threshold   ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ
Choreography  Deep kumkum gradient, carved-wood lattice texture. Invocation fades up first. Names engrave letter-by-letter. Marigold garland SVG draws on. Petals begin to drift. Scroll cue breathes.
Emotional beat  Reverence — the hush before ceremony.
ACT II  The Divine Blessing   ಕುಲದೇವತಾ
Choreography  Two Kuladevata glyphs (Vishnu’s Chakra · Karthikeya’s Vel) rise with 120ms stagger from a brass divider line. Shloka card glows in with a soft radial pulse.
Emotional beat  Protection — the families’ deities preside.
ACT III  The Invitation   ನಿಶ್ಚಿತಾರ್ಥ
Choreography  Bilingual copy reveals line-by-line. The two family blocks slide in from opposite edges and meet at a brass ❦ — a literal union in motion.
Emotional beat  Welcome — two families become one circle.
ACT IV  The Muhurtham   ಶುಭ ಮುಹೂರ್ತ
Choreography  Oversized “12” scales in with a glow bloom. Detail chips snap onto the 8-pt grid. Crafted SVG icons replace all emoji. Shimmer sweeps the date card on a 5s loop.
Emotional beat  Anticipation — the moment is fixed in time.
ACT V  The Path to Nagoor   ನಾಗೂರಿಗೆ ಸ್ವಾಗತ
Choreography  Lazy-loaded map framed in a brass mandapa border. Two thumb-width CTAs: ‘Send Blessings’ (WhatsApp deep-link) and ‘Get Directions’ (Maps).
Emotional beat  Invitation to arrive — come, be with us.
ACT VI  Eternal Blessing   ಶುಭಮಸ್ತು
Choreography  Brass deity glyph row, closing Kannada couplet, the couple’s names once more, and the designer signature footer with a monospace build-stamp.
Emotional beat  Benediction — the film closes on a blessing.
08  Component Specifications    the pieces

Each reusable surface, specified to build-grade. Mobile values first.
The Shloka Card
Property
Value
Surface
linear-gradient(145deg, sand-lt, ivory) + inset glow
Border
1.5px brass, radius 16px
Ambient
radial glow pulse, 4s --ease-soft loop
Corners
four ✦ gems (hidden < 480px to reduce clutter)
Shadow
0 8px 50px rgba(brass,.18) — soft brass lift
Detail Chips (Date · Time · Venue · Occasion)
Crafted inline-SVG icons (calendar, kalasha, map-pin, ring) — replacing the current emoji set for cross-platform crispness.
2-column grid on phones, auto-fit to 4 across on desktop; 3px kumkum top-border accent.
Lift on press, not hover — @media(hover:none) neutralizes hover states for touch honesty.
CTA Buttons
Button
Style
Behaviour
Send Blessings
Filled, kumkum→brass gradient, pill, brass border
Light-sweep on press; WhatsApp deep-link
Get Directions
Ghost, kumkum outline, pill
Fills kumkum on press; Maps link
TOUCH TARGETS
All interactive elements ≥ 44×44px, full-width capped at 320px on phones, positioned in the lower thumb-zone. -webkit-tap-highlight-color removed; custom press state instead.
09  Divine Integration    two kuladevatas

Corrected from the current five-deity build to exactly two, per the BRD. Each is a hand-built inline SVG (~1 KB), brass-stroked, crisp at any DPI, weightless on the network.
Side
Deity
Emblem
Geometry
Groom · Sumanth
Vishnu  

Sudarshana Chakra
8-spoke radial, dashed inner ring
Bride · Vindhya
Karthikeya  

Vel (lance)
Diamond tip, peacock-eye base ring
DESIGN RATIONALE
Twin glyphs balanced left and right on the blessing scene — a visual metaphor for the union of two lineages. Entrance is a quiet 120ms stagger; no spin, no gimmick. Devotional restraint is the point.
<!-- Vel emblem — bride&apos;s side, ~0.9KB -->
<svg viewBox=&apos;0 0 48 48&apos; fill=&apos;none&apos; aria-hidden=&apos;true&apos;>
  <line x1=&apos;24&apos; y1=&apos;10&apos; x2=&apos;24&apos; y2=&apos;44&apos; stroke=&apos;var(--kumkum)&apos;
        stroke-width=&apos;2.4&apos;/>
  <polygon points=&apos;24,4 28,14 24,20 20,14&apos; fill=&apos;var(--kumkum)&apos;/>
  <circle cx=&apos;24&apos; cy=&apos;40&apos; r=&apos;4&apos; stroke=&apos;var(--brass)&apos; fill=&apos;none&apos;/>
</svg>
10  Heritage Texture & Ornament    the temple skin

Authentic Udupi atmosphere without a single heavy bitmap — all ornament is procedural SVG or CSS, keeping the page under budget.
Mandapa frame: a fixed 5px brass border with inset kumkum + brass-glow shadow, evoking a carved temple doorway around the whole viewport.
Kolam corners: inline-SVG rangoli motifs in each hero corner, mirrored via transform — zero extra requests.
Carved-wood lattice: repeating-linear-gradient at 4% opacity behind the hero — texture you feel before you see.
Marigold garlands: SVG torana strands top and bottom of the hero, drawn on at load.
Film grain: an SVG feTurbulence noise layer at ~4% multiply — the subtle warmth that makes screens feel like paper.
PLACEHOLDER STRATEGY
Where final woodwork artwork is pending, the build ships labelled SVG placeholders with the exact viewBox and aspect locked — so dropping in the couple’s chosen carvings later is a one-line swap, no layout change.
11  Performance Engineering    cinematic ≠ heavy

The immersive feel is bought with engineering discipline, not megabytes. Hard budgets, measured against the BRD’s targets.
Budget
Target
How It&apos;s Met
Page weight
< 350 KB
Inline SVG, no bitmaps, subset fonts
LCP (4G)
< 2.0 s
Inline critical CSS, deferred JS
CLS
< 0.05
Aspect-locked media, font display:swap
Frame rate
60 fps
transform/opacity-only animation
JS execution
< 50 ms
rAF throttle, observers unobserve once fired
Map cost
deferred
iframe loading=lazy, below fold
Loading Choreography
// the first 2 seconds, sequenced
0ms    inline critical CSS paints hero shell (kumkum gradient)
~150ms fonts swap in (Cinzel, Kannada) — no invisible-text gap
~300ms deferred app.js boots → observers attach
scroll  reveals fire per-section, map iframe hydrates near-view
12  Responsive Strategy    mobile is the canvas

Designed at 320px first, enhanced upward. The phone is not a constraint — it is the primary stage, since this invite lives in WhatsApp threads.
Breakpoint
Treatment
≤ 360px
Compact deity row, reduced display sizes, single-column families
≤ 480px (primary)
2-col detail grid, full-width CTAs, gems hidden, tightened rhythm
≤ 768px
Tablet padding, family separator hidden
≥ 1100px
Max-width container centers; nav dots appear; richer parallax
iOS / ANDROID HARDENING
Safe-area insets env(safe-area-inset-*) honored for notch and home-bar. 100dvh (not 100vh) so the hero never jumps when mobile chrome collapses. Momentum scrolling preserved; no scroll-trapping.
13  Accessibility & Inclusion    grace for everyone

Semantic landmarks — section, nav, headings in order; the invite is fully navigable by screen reader.
lang attributes — Kannada runs marked lang="kn" so assistive tech pronounces correctly.
Decorative SVG marked aria-hidden; meaningful icons carry titles.
Contrast — body copy meets WCAG AA on all surfaces; brass-on-dark verified.
Reduced-motion + reduced-data respected; focus-visible rings on all interactive elements.
TARGET
Lighthouse Accessibility ≥ 95 · zero critical axe violations.
14  Design Improvements Ledger    current → elevated

Every concrete upgrade from the existing baseline, traced to the principle it serves. This is the gap the build closes.
Current Baseline
Elevated Design
Serves
Emoji detail icons (📅🌅📍💍)
Crafted inline-SVG icon set
Crispness · brand
Five deities, scope drift
Two Kuladevata glyphs, balanced
Accuracy · meaning
Date conflict 2025/2026
Single canonical token, one source
Correctness
Two rival builds (scroll/folio)
Scroll canonical, folio as /folio
Clarity
Generic reveal-on-scroll
Choreographed 6-act timeline
Cinema
No designer identity
Grid toggle + coordinate HUD + signature
The couple&apos;s craft
Flat color usage
Layered gradients + glow + grain
Depth · warmth
Hover-dependent states
Touch-honest press states
Mobile truth
100vh hero
100dvh, safe-area aware
iOS polish
Straight quotes, default leading
Smart quotes, optical Kannada leading
Typographic luxury
15  Implementation Plan    the build path

Sequenced for safe, reviewable delivery into public/invitation once the BRD blueprint is signed off.
Phase
Work
Output
P1 · Foundation
Token block, reset, type scale, grid
style.css :root contract
P2 · Structure
Semantic HTML, 6 acts, copy in place
index.html skeleton
P3 · Surface
Cards, frames, SVG ornament, deities
Visual layer complete
P4 · Motion
Observers, parallax, reveals, petals
app.js choreography
P5 · Delight
Grid toggle, coordinate HUD, signature
Designer layer
P6 · Harden
a11y, perf budget, device QA
Launch-ready build

ಶುಭಮಸ್ತು
May the craft honor the occasion.
// end_of_sdd — ready to synthesize on BRD sign-off