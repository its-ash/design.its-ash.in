# Coding Prompt: Art Deco Design System Implementation

You are tasked with building a complete web UI in the **Art Deco** design style—the visual embodiment of the Roaring Twenties. This aesthetic captures opulence, mathematical precision, and architectural grandeur. It celebrates luxury through geometry rather than organic forms, creating a aesthetic that feels both timeless and theatrical.

**Vibe**: "The Great Gatsby" meets Fritz Lang's "Metropolis"—champagne towers in skyscraper ballrooms, chrome elevator grilles, sunburst marquees, and zigzag moderne facades. It feels expensive, confident, and timeless.

**Core Principles**:
- **Geometry as Decoration**: Triangles, chevrons, trapezoids, stepped pyramids (ziggurats), sunbursts, fan motifs dominate. Visual rhythm through repetition.
- **Contrast as Drama**: Extreme tonal contrast. Deep obsidian blacks against radiant metallic golds. No muddy middle ground.
- **Symmetry and Balance**: Central axes and bilateral symmetry. Ceremonial symmetry.
- **Verticality and Aspiration**: Upward movement inspired by skyscrapers. Vertical lines, tall narrow proportions.
- **Material Luxury**: Polished brass, etched glass, lacquered wood, terrazzo floors. Metallic sheens, subtle glows, layered shadows.
- **Theatricality**: Dramatic transitions. Hover states glow. Headings demand attention with all-caps, wide tracking, imposing scale.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML. Changing look requires modifying only CSS.
- **Exception**: Diagonal crosshatch background pattern and noise overlay may be applied via CSS pseudo-elements on `body::before`/`body::after` without new HTML nodes.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (Dark Luxury Palette):
```css
:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #141414;
  --text-primary: #F2F0E4;
  --text-secondary: #888888;
  --muted: #888888;
  --border-default: rgba(212, 175, 55, 0.3);
  --border-error: #FF3366;
  --border-success: #D4AF37;
  --primary: #D4AF37;
  --secondary: #1E3D59;
  --accent-foreground: #0A0A0A;
  --text-success: #D4AF37;
  --text-error: #FF3366;
  --font-heading: "Marcellus", serif;
  --font-body: "Josefin Sans", sans-serif;
  --font-display: "Marcellus", serif;
  --font-base: "Josefin Sans", sans-serif;
  --radius-sm: 0px;
  --radius-md: 2px;
  --radius-lg: 0px;
  --shadow-sm: 0 0 15px rgba(212, 175, 55, 0.2);
  --shadow-md: 0 0 20px rgba(212, 175, 55, 0.4);
  --shadow-gold-glow: 0 0 15px rgba(212, 175, 55, 0.2);
  --spacing-gap: 2rem;
  --transition-fast: 300ms ease-out;
  --transition-normal: 500ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
  --gold-gradient: linear-gradient(135deg, #F2E8C4 0%, #D4AF37 50%, #B8941F 100%);
  --metallic-sheen: linear-gradient(90deg, #B8941F 0%, #D4AF37 50%, #F2E8C4 100%);
}
```

**Contrast Pairing Rules**: Gold text (`#D4AF37`) on obsidian black (`#0A0A0A`): ~7:1 (WCAG AA). Champagne cream (`#F2F0E4`) for body text. Gold for accents/headings/borders, NOT long-form body text. Muted (`#888888`) on black: ~4.5:1. Use `#fefefe` instead of `#ffffff` where a near-white is needed.

### 1.3 Mandatory Dark Mode Support
Art Deco is inherently dark luxury. You MUST implement a light mode variant:
- **Light Mode (Ivory Deco)**: Define under `@media (prefers-color-scheme: light)` and/or `.light` class. Warm ivory background (`#FAF8F0`, use `#fefefe` where needed), rich black text, deeper gold (`#B8941F`) for contrast.
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Gold-styled toggle (sun/moon Google Material Symbol in gold-bordered square with stepped corners).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive: rows → columns on small viewports. No horizontal scrolling.
- **Symmetrical Layouts**: Art Deco favors central axes and bilateral symmetry. Even column counts.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.deco-corner`, `.stepped-corner`, `.rotated-diamond`, `.double-frame`, `.sunburst`, `.deco-divider`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Headings**: `"Marcellus", serif` (or "Italiana"). Classic Roman structures with Art Deco flair.
- **Body**: `"Josefin Sans", sans-serif`. Geometric, vintage, readable.
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs.
- **Type Scale**: H1 text-6xl to text-7xl uppercase `tracking-widest` (0.2em). H2 text-4xl to text-5xl uppercase `tracking-widest`. H3 text-2xl to text-3xl uppercase. Body text-lg `leading-relaxed`. Labels text-xs to text-sm uppercase `tracking-[0.2em]`.
- **All-Caps Display Typography with Extreme Tracking** (MANDATORY): Headings uppercase with `tracking-widest` (0.2em). Fundamental to the style's voice.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
Buttons are architectural elements, not soft pills. Sharp corners, minimum 48px height.

**Default Variant**:
- **Default**: Transparent background, gold border (2px), gold text. Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min 44x44px.
- **Hover**: Gold background, black text, intensified glow (`shadow-[0_0_20px_rgba(212,175,55,0.4)]`), `cursor: pointer`.
- **Focus**: `ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-black`.
- **Active**: `transform: scale(0.97)`.
- **Loading**: Disabled, CSS gold spinner, no dimension distortion.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success` (gold) or `--text-error` (red-pink).

**Solid Variant**: Gold background, black text. Hover: lighter gold (`#F2E8C4`).
**Outline Variant**: Thin gold border (1px), transparent. Hover: midnight blue fill (`#1E3D59`).
**Ghost Variant**: No border. Hover: `accent/10` background, gold text.
**Timing**: 300-500ms (theatrical). Glow increases on hover. NO rounded corners.
**Danger Button**: Red-pink (`#FF3366`) border/text. Hover: red-pink bg. Distinct in both themes.

### 2.2 Card Component Requirements
Cards are framed exhibits—miniature architectural facades.

**Structure**: Background `#141414`, border full 1px gold at 30% opacity (→100% on hover), radius 0px (sharp), corner decorations (L-shaped brackets), padding p-8.
**Stepped Corner Decorations** (MANDATORY): L-shaped border elements at opposite corners. Absolute positioning, 2-4px borders on two sides only. Opacity 50% → 100% on hover.
**Default**: Flexbox, subtle gold borders at 30%, `--bg-secondary`.
**Hover**: Lift `-translate-y-2` (500ms). Border opacity 30% → 100%. Corner decorations 50% → 100% opacity.
**Focus-within**: Border highlights when child receives focus.
**Loading (Skeleton)**: Gold-tinted shimmer animation.
**Empty State**: Google Material Symbol (`inventory_2` or `search_off`) + guidance text in Pewter.
**Internal Hierarchy**: CardHeader p-6 with bottom border separator at 20% gold. CardTitle display font, gold, 2xl, uppercase, wide tracking. CardDescription body font, muted gray, normal case. CardContent p-6.

### 2.3 Form & Input Requirements
Inputs embrace minimalism—no background boxes, just refined underlines.

**Structure**: Transparent background, bottom border only (2px solid gold `#D4AF37`), no side/top borders. Height h-12 (48px). Padding `px-3 py-2`. Font: Josefin Sans. Text: champagne cream. Placeholder: muted gray.
**States**: Empty (default underline), Focused (border brightens to `#F2E8C4`, bottom shadow `shadow-[0_4px_10px_rgba(212,175,55,0.2)]`, no ring—only enhanced underline), Filled, Valid (lighter gold border + checkmark icon), Invalid (red-pink border + error icon + red text), Disabled (opacity 0.5), Read-only.
**Label Pattern**: Uppercase, small (xs/sm), gold for active state. Above input or floating label.
**Structure**: Flex container with label, input, error feedback container.

### 2.4 Modal / Popup Requirements
**States** (theatrical/mechanical): Opening (fade + scale 0.95→1.0, 500ms), Open (centered flex, obsidian backdrop + blur, gold-bordered content with stepped corners + double-frame), Loading (gold spinner), Success/Error (gold/red-pink accents), Closing (reverse, 500ms).
**UX**: Backdrop (semi-transparent obsidian + blur), close button (Google Material Symbol `close` in gold-bordered square—NOT circle), keyboard focus trapping, Esc/overlay close, `aria-modal="true"`, `role="dialog"`, `aria-labelledby`.

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

### 3.1 Stepped Corners (MANDATORY)
Ziggurat-style cuts on cards/containers via CSS `clip-path` or pseudo-elements.

### 3.2 Rotated Diamonds (MANDATORY)
Icons/avatars inside 45° rotated squares (`rotate-45`). Content counter-rotates (`-rotate-45`) to remain upright.

### 3.3 Sunburst Radials (MANDATORY)
`radial-gradient` with gold at 10-20% opacity emanating from focal points (especially hero).

### 3.4 Roman Numerals (MANDATORY)
I, II, III, IV instead of 1, 2, 3, 4 for steps/tiers/lists. Serif display font.

### 3.5 Double-Frame Images (MANDATORY)
Never plain images. Outer gold border + inner thick dark border (frame-within-frame). Grayscale by default, color/gold overlay on hover.

### 3.6 Diagonal Crosshatch Background (MANDATORY)
Repeating diagonal grid at 3-5% opacity. `repeating-linear-gradient` at 45° and -45° with gold lines. Vintage print quality.

### 3.7 Section Dividers with Decorative Lines (MANDATORY)
Horizontal gold lines above/below section headings (`h-px w-24`). Never full-width—measured, balanced accents.

### 3.8 Vertical Divider Lines
Absolute-positioned vertical lines (`w-px h-full`) for column separation/architectural height. Gold at low opacity.

### 3.9 Glow Effects Over Drop Shadows (MANDATORY)
Replace drop shadows with box-shadow glows: `0 0 15px rgba(212,175,55,0.2)`. Simulates neon/backlit signage.

### 3.10 Corner Embellishments (MANDATORY)
Decorative L-brackets at card corners. Absolute positioning, 2-4px borders on two sides only.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Container**: `max-w-6xl` primary, `max-w-7xl` wider grids, `max-w-5xl` hero.
- **Spacing**: Base 8px. Section `py-32` (128px). Card `p-8` (32px). Grid `gap-8` (32px).
- **Grid**: Even column counts. Features 3(lg)/2(md)/1(base). Pricing 3 equal width. Footer 5(lg).
- **Alignment**: Centered axis for hero/headings/CTAs. Alternating left-right in timelines.
- **Negative Space**: Intentional. 32-40px gaps between sections. Stage presence around headings.
- No horizontal overflow.

### 4.2 Smooth Animations
- **Philosophy**: Theatrical and mechanical—elevator doors opening, curtains rising. Nothing bouncy/organic.
- **Timing**: Standard 300ms, Theatrical 500ms. `ease-out` or `ease-in-out`.
- **Hover**: Cards lift (`-translate-y-2`) + border glow intensifies. Buttons: color flip + glow expansion. Links: gold color shift + underline expansion. Images: `scale-105` + overlay.
- **Page Load** (optional): Slide up with fade (`translate-y-8 opacity-0` → `translate-y-0 opacity-100`). Stagger 100ms. Hero sunburst expand.
- **Micro-details**: FAQ chevrons rotate 180°. Icon containers rotate 45°→0° on hover. Gold lines animate width on scroll. Button glows pulse on focus.
- **Respect `prefers-reduced-motion`**: Disable all animations.

### 4.3 Accessibility (a11y)
- **Contrast**: Gold/black ~7:1 (AA). Champagne cream for body. Gold for accents only. Muted/black ~4.5:1.
- Never rely on color alone. Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**: Buttons 2px gold ring + 2px offset. Links: gold underline appears/thickens. Inputs: bottom border glows. Cards: border intensifies. Never remove focus indicators.
- **Touch Targets**: Min button height 48px (h-12). Min 44x44px. FAQ buttons full-width p-6. Min 8px gap between elements.
- **Keyboard**: Clear focus indicators. Focus follows hierarchy. Skip-to-content link.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Cards lift + glow. Buttons flip + glow. Links shift gold + underline. Images scale + overlay.

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Red-pink (`#FF3366`) border/text, red-pink hover bg. Never use gold for destructive actions.

---

## 5. LAYOUT & SPACING

- **Container**: `max-w-6xl` primary, `max-w-7xl` wider grids, `max-w-5xl` hero.
- **Spacing**: Base 8px. Section `py-32` (128px). Card `p-8` (32px). Grid `gap-8` (32px).
- **Grid**: Even counts. Features 3(lg)/2(md)/1. Testimonials 3/2/1. Pricing 3 equal. Benefits 2(md)/1. Footer 5(lg).
- **Alignment**: Centered axis. Alternating left-right timelines.
- **Negative Space**: Intentional 32-40px gaps. Stage presence around headings.

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Thin precise strokes. h-5 w-5 to h-6 w-6. Gold for accents, Pewter for secondary, white on gold.
- Containers: Gold-bordered geometric containers (squares with stepped corners, or rotated diamonds with counter-rotated content).

---

## 7. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Marcellus, Josefin Sans.
- Google Material Symbols: Material Symbols Outlined.

---

## 8. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Decorative effects (corner brackets, dividers, crosshatch, sunbursts) may be applied via CSS pseudo-elements on existing elements.