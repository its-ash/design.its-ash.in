# Coding Prompt: Academia / Classical Design System Implementation

You are tasked with building a complete web UI in the **Academia / Classical** design style. This is a scholarly, prestigious aesthetic that channels centuries-old university libraries, Victorian study halls, and Renaissance manuscripts. Every element must feel like it belongs in a prestigious institution—combining rich material references (aged parchment, dark mahogany wood, polished brass hardware, crimson leather bindings) with traditional typographic excellence and measured ornamentation.

**Vibe**: Scholarly, Prestigious, Warm, Timeless, Dignified, Intellectual, Distinguished.

This is NOT a modern dark theme with serif fonts. It is a complete transformation into a physical library environment where every interaction feels like turning pages in a leather-bound tome, where brass fixtures catch the light, and where centuries of knowledge create an atmosphere of gravitas and trust.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All design properties, layout rules, and states must be targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: HTML structure must remain clean, semantic, and agnostic of visual styling so that changing the site's look requires modifying only the CSS file, not the markup.
- **Exception**: The paper-grain texture overlay and vignette overlay may be applied via CSS pseudo-elements on `body::before` / `body::after` without adding new HTML nodes. Prefer the CSS-only approach.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root` using CSS variables. The following tokens are MANDATORY:

**Color Tokens** (Academia Library at Night palette):
```css
:root {
  --bg-primary: #1C1714;
  --bg-secondary: #251E19;
  --foreground: #E8DFD4;
  --text-primary: #E8DFD4;
  --text-secondary: #9C8B7A;
  --muted: #3D332B;
  --border-default: #4A3F35;
  --border-error: #8B2635;
  --border-success: #C9A962;
  --primary: #C9A962;
  --secondary: #8B2635;
  --accent-foreground: #1C1714;
  --text-success: #C9A962;
  --text-error: #8B2635;
  --font-heading: "Cormorant Garamond", serif;
  --font-body: "Crimson Pro", serif;
  --font-display: "Cinzel", serif;
  --font-base: "Crimson Pro", serif;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 40% 40% 0 0 / 20% 20% 0 0;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.2);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.3);
  --shadow-engraved: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3);
  --shadow-wax-seal: inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.4);
  --shadow-brass-glow: 0 4px 12px rgba(201,169,98,0.3);
  --spacing-gap: 2rem;
  --transition-fast: 150ms ease-out;
  --transition-normal: 300ms ease-out;
  --transition-deliberate: 500ms ease-out;
  --transition-dramatic: 700ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
  --brass-gradient: linear-gradient(180deg, #D4B872 0%, #C9A962 50%, #B8953F 100%);
  --vignette: radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(28,23,20,0.4) 100%);
}
```

**Contrast Pairing Rules**: Light backgrounds (parchment `#E8DFD4`) pair with dark text (mahogany `#1C1714`). Dark backgrounds (mahogany, aged oak) pair with light text (parchment). Brass backgrounds pair with dark mahogany text. Maintain 8.5:1 contrast for parchment on mahogany, minimum 4.5:1 for muted text. Use `#fefefe` instead of `#ffffff` where a near-white is needed.

### 1.3 Mandatory Dark Mode Support
Academia is inherently dark (Library at Night). However, you MUST implement theme switching with a light mode variant:
- **Light Mode (Daylight Study)**: Define under `@media (prefers-color-scheme: light)` and/or `.light` class—warm parchment backgrounds (`#F5F0E8`), mahogany text, deeper brass for contrast. Use `#fefefe` instead of pure white.
- **Theme Switching**: Implement via `localStorage`, falling back to `prefers-color-scheme`. Visible toggle with correct `aria-pressed`/`aria-label`. Use a brass-styled toggle (sun/moon Google Material Symbol in brass-bordered circle).
- **No HTML Restructuring**: Theme switching must work purely through CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container must default to `align-items: center` unless explicitly justified otherwise.
- Mobile-responsive: rows convert to columns on smaller viewports. Prevent horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.ornate-frame`, `.arch-top`, `.corner-flourish`, `.wax-seal`, `.ornate-divider`, `.drop-cap`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Headings**: `"Cormorant Garamond", serif` — high-contrast old-style serif. 400-500 weight (avoid heavy weights).
- **Body**: `"Crimson Pro", serif` — book-style serif for extended reading. 400 weight. Italic for emphasis (not bold).
- **Display/Labels**: `"Cinzel", serif` — engraved all-caps. 500-600 weight.
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs.
- **Type Scale**: Display 48-72px, Section 36-48px, Subsection 24-30px, Body 16-18px with `leading-relaxed`, Labels 10-12px uppercase `tracking-[0.2em]` to `tracking-[0.3em]`.
- **Drop Caps** (MANDATORY): Cinzel, 72px, `float-left`, `mr-4`, `leading-[0.8]`, brass color, engraved depth shadow.
- **Roman Numeral Volume System** (MANDATORY): "Volume I", "Volume II" prefixes. Cinzel, uppercase, brass, `tracking-[0.25em]`.
- **Engraved Text Effect** (MANDATORY): `text-shadow: 1px 1px 1px rgba(0,0,0,0.4), -1px -1px 1px rgba(255,255,255,0.1)`.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
Buttons use Cinzel font, uppercase, `tracking-[0.15em]`, small text (text-xs) with generous padding.

**Primary Button** (brass, main actions):
- **Default**: Flex layout (`align-items: center; justify-content: center; gap: 0.5rem`). Min 44x44px (h-12 px-8). Background: brass gradient. Text: dark mahogany. Radius: 4px. Shadow: engraved effect.
- **Hover**: Brightness 110%, brass glow shadow, `cursor: pointer`.
- **Focus**: `ring-2 ring-[#C9A962] ring-offset-2 ring-offset-[#1C1714]`.
- **Active**: Deeper inset shadow, `transform: scale(0.97)`.
- **Loading**: Disabled, CSS brass spinner, no dimension distortion.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Feedback via `--text-success` (brass) or `--text-error` (crimson).

**Secondary Button**: Transparent, `2px solid #C9A962` border, brass text. Hover: transforms to crimson (`border: #8B2635`, `bg: #8B2635`, `text: #E8DFD4`).
**Ghost Button**: No background/border, brass text with hover underline (offset 4px). Hover: brighten to `#D4B872`.
**Sizes**: Default (h-12 px-8), Small (h-10 px-6), Large (h-14 px-10).
**Danger Button**: Crimson border and text. Hover: crimson background. Distinct in both themes.

### 2.2 Card Component Requirements
**Structure**: Background `#251E19`, border `1px solid #4A3F35`, radius 4px, padding p-8 to p-12, position relative.
**Corner Flourish** (MANDATORY): `.corner-flourish` class—brass corner brackets (24px) via pseudo-elements, opacity 0.6 → 1.0 on hover.
**Ornate Frame** (hero/major sections): Large 40px brass corner brackets.
**Hover**: Border → `#C9A962/50`, shadow `0 8px 24px rgba(0,0,0,0.3)`, corner flourish opacity → 1.0. 300ms ease.
**Focus-within**: Brass border tint when child receives focus.
**Loading (Skeleton)**: Brass-tinted shimmer animation.
**Empty State**: Google Material Symbol in circular brass-bordered medallion + guidance text.
**Variants**: Certificate/Ledger (double border, brass accents), Arch-Top Image Cards (arch-top radius + sepia images), Wax Seal Badges (circular crimson badges with star icon).

### 2.3 Form & Input Requirements
**Text Inputs**: Background `#251E19`, border `1px solid #4A3F35`, text `#E8DFD4` (Crimson Pro), placeholder italic serif `#9C8B7A`, h-12, px-4 py-2, radius 4px.
**States**: Empty (default), Focused (brass border + `ring-2 ring-[#C9A962]/30` offset), Filled, Valid (brass border + checkmark icon), Invalid (crimson border + error icon + red text), Disabled (opacity 0.5), Read-only.
**Labels**: Above input, Cinzel, uppercase, small tracking, `#9C8B7A` or brass.
**Structure**: Flex container with label, input, error feedback container.

### 2.4 Modal / Popup Requirements
**States**: Opening (fade + scale 0.95→1.0, 300ms), Open (centered flex, backdrop with aged oak tint + blur, ornate-framed content with corner flourishes), Loading (brass spinner), Success/Error (brass/crimson accents), Closing (reverse animation).
**UX**: Backdrop overlay (semi-transparent dark mahogany + blur), close button (Google Material Symbol `close` in brass-bordered circular medallion), keyboard focus trapping, Esc/overlay close, `aria-modal="true"`, `role="dialog"`, `aria-labelledby`.

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

### 3.1 Arch-Topped Images (MANDATORY)
`border-radius: 40% 40% 0 0 / 20% 20% 0 0` on ALL featured images. Transforms modern imagery into architectural references.

### 3.2 Sepia-to-Color Image Transitions (MANDATORY)
Default: `filter: sepia(0.6) contrast(0.95) brightness(0.9)`. Hover: `filter: sepia(0) contrast(1) brightness(1)`. Transition: 700ms ease-out.

### 3.3 Roman Numeral Volume System (MANDATORY)
"Volume I", "Volume II" prefixes for major sections. Standalone Roman numerals for lists. Cinzel, uppercase, brass, `tracking-[0.25em]`.

### 3.4 Drop Cap Introductions (MANDATORY)
Opening paragraphs feature Cinzel 72px brass drop caps, `float-left`, `mr-4`, `leading-[0.8]`, engraved depth shadow.

### 3.5 Corner Flourishes (MANDATORY)
Hero: 40px brass brackets. Cards: 24px brass brackets. Frames content like certificates.

### 3.6 Ornate Dividers with Glyphs (MANDATORY)
Gradient dividers (transparent → wood grain → brass → wood grain → transparent) with centered decorative character (✶, ❧, ✤, ❦) on background-colored padding.

### 3.7 Wax Seal Badges
Circular crimson badges with radial gradients, inset shadows, centered star Google Material Symbol. For featured items.

### 3.8 Brass Interactive Elements (NON-NEGOTIABLE)
ALL interactive elements use brass (`#C9A962`) or brass gradient.

### 3.9 Engraved Text Effects
Dual text-shadow (dark below, light above) for pressed-metal appearance.

### 3.10 Texture Overlays (MANDATORY)
1. Paper texture: SVG fractal noise, opacity 0.03, fixed, `blend-mode: overlay`.
2. Vignette: radial gradient darkening edges, fixed overlay.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- Mobile (< 768px): Stack columns vertically, min 48px touch targets, simplify flourishes, full-width cards with arch-tops, py-16.
- Tablet (768-1024px): Two-column grids, partial decorative elements, maintain all effects.
- Desktop (> 1024px): Full ornate experience, three-column grids, py-24 to py-32.
- No horizontal overflow. Fluid sizing.

### 4.2 Smooth Animations
- **Philosophy**: Dignified, deliberate, smooth. Nothing snappy/bouncy/playful. Like leather-bound books, brass lamp swings, old page turns.
- **Timing**: Fast 150ms, Standard 300ms, Deliberate 500ms, Dramatic 700ms. All `ease-out`.
- **Transforms**: Hover scale `scale-105` (subtle). Hover lift via shadow (no vertical translate). No rotation except chevrons. No slide-in/out.
- **Respect `prefers-reduced-motion`**: Disable all animations.

### 4.3 Accessibility (a11y)
- Contrast: Parchment/mahogany 8.5:1 (AAA), secondary 4.5:1 (AA), brass/dark 7:1, dark/brass 8:1.
- Never rely on color alone. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback.
- Focus indicators: Always visible 2px brass ring with 2px offset. Never remove. Decorative elements `aria-hidden="true"`.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible state change. Links: brass text + expanded tracking. Cards: brass border tint + shadow lift + flourish opacity. Buttons: brightness/color transform. Images: sepia removal over 700ms + subtle scale.

### 4.5 Destructive Actions
`.btn-danger` visually distinct in both themes. Crimson (`#8B2635`) border/text, crimson hover bg. Never use brass for destructive actions.

---

## 5. LAYOUT & SPACING

- **Spacing Rhythm**: 8px base. Micro 8-16px, Element 16-32px, Section 32-48px, Vertical padding 96-128px (py-24 to py-32).
- **Content Width**: Standard `max-w-6xl` (1152px), Narrow `max-w-4xl` (896px), Full-width `max-w-7xl` (1280px).
- **Grids**: Three-column `grid-cols-1 md:grid-cols-3`, Two-column `grid-cols-1 lg:grid-cols-2`, Four-column `grid-cols-2 md:grid-cols-4`.
- **Asymmetry**: Hero 60/40 or 7/5 splits. Alternate left/right in timeline sections.
- **Section Separators**: Full-width `border-y border-[#4A3F35]` + `bg-[#251E19]/30`. Ornate dividers within sections. 96-128px breathing room.
- **Product Detail Section**: Ornate frame, centered "Proclamation" label with flanking brass lines, large serif headline, ornate divider, multi-paragraph body with drop cap, generous padding, centered max-w-4xl.

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Thin elegant strokes (1.5 weight), 16-24px, brass color for decorative, muted for secondary.
- Containers: Circular/shield-shaped with brass border (`rounded-full border border-[#C9A962]/30 bg-[#1C1714]`, h-12 w-12, centered icon h-5 w-5). Creates "carved medallion" effect.
- Usage: Educational symbols (book, scroll, graduation cap, quill), action icons (chevrons, external link, checkmarks), decorative (stars, quotes).

---

## 7. ANTI-PATTERNS

Do NOT: Use sans-serif fonts. Use bright saturated colors. Use sharp geometric shapes. Overuse decorations. Use modern gradients (except brass). Ignore arch-top pattern. Skip Roman numerals. Use pure black/white. Add playful animations. Forget sepia filters. Use thin borders everywhere. Mix cold/warm tones. Overuse crimson. Insufficiently space. Forget focus states. Mix font usage.

---

## 8. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Cormorant Garamond, Crimson Pro, Cinzel.
- Google Material Symbols: Material Symbols Outlined.

---

## 9. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Texture overlays, arch-top effects, and corner flourishes may be applied via CSS pseudo-elements on existing elements.