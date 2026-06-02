# Asset Strategy

## Overview

This invitation uses a **SVG-only** asset strategy with no raster images or responsive variants.

## Asset Types

### SVGs Embedded in HTML
- **Temple watermark** — decorative background element
- **Corner gems** — page decoration
- **Family separator** — ॐ divider (inline SVG or icon font)
- **Deity emblems** — chakra and kula deities (inline or external)
- **Garland** — petal animation (path-based)
- **Directional arrows** — tap hint and navigation (icon font or SVG)

### External SVG Files
All images in `public/invitation/images/` (if any) are SVG files. No PNG, JPEG, or WebP.

## Why SVG Only

1. **Scalability** — Perfect at any device size without responsive variants
2. **File size** — Optimized SVGs are 1–3 KB each
3. **Styling** — Colors and opacity controlled via CSS
4. **Animation** — Path transformations via CSS `@keyframes`
5. **Accessibility** — Semantic `<title>`, `aria-hidden` on decorative elements

## No Responsive Image Strategy

The layout uses:
- **Viewport-relative units** (`vw`, `vh`, `clamp()`) for typography and spacing
- **CSS Grid** with `auto-fit` for detail cards
- **Aspect-ratio locking** (`aspect-ratio: 3/4`) for stable layouts

Result: **One set of SVG assets** works everywhere.

## Performance

- **Total asset payload**: ~15 KB (all SVGs combined, no build step)
- **Optimization**: All SVGs <3 KB, paths simplified to 2 decimal places
- **Caching**: SVGs cache like any static file (no cache-busting needed)

## Adding New Assets

1. Create or export SVG file
2. Simplify paths: use [SVGO](https://jakearchibald.com/svgomg/) or Illustrator's "Save for Web"
3. Embed inline in HTML if <1 KB, or reference as `src="path.svg"`
4. Add `aria-hidden="true"` if purely decorative

## Font Icons

- **Arrow directions** — Cinzel or custom icon font
- **ॐ glyph** — Serif font with OpenType variant, or inline SVG
- No emoji fallbacks; all icons are SVG or font-based
