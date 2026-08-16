# Minimalist Monochrome Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Minimalist Monochrome** style. Follow every rule below without exception. The deliverable must express Minimalist Monochrome's visual identity — reduction to essence, pure black & white, serif typography as hero, oversized type scale, line-based visual system, sharp geometric precision, dramatic negative space, inversion for emphasis — merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling.
- **Monochrome Exception:** This style has ZERO drop shadows, ZERO border-radius (0px everywhere — non-negotiable), and ZERO accent colors. Depth is created through color inversion (black/white swap), border weight variation, scale contrast, and negative space. Enforce this in CSS classes. Layered textures (horizontal lines, grid, noise) are REQUIRED to prevent flat design.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Strictly Monochrome):**
  - `--primary: #000000` (Pure black — IS the accent, used for all text, borders, structural elements)
  - `--secondary: #FFFFFF` (Pure white — for inversion and contrast panels)
  - `--bg-primary: #fefefe` (near-white canvas, never pure #ffffff — but for this style, use true #FFFFFF as the design system specifies; architecture rule for #fefefe is overridden by explicit monochrome exception)
  - `--bg-secondary: #F5F5F5` (Off-white for subtle backgrounds)
  - `--text-primary: #000000` (Pure black)
  - `--text-secondary: #525252` (Dark gray for secondary text — gray reserved only for secondary text and borders)
  - `--text-success: #000000` (monochrome — use border weight/icon for success, not color)
  - `--text-error: #000000` (monochrome — use border weight/icon for error, not color)
  - `--border-default: #000000` (Black borders)
  - `--border-light: #E5E5E5` (Light gray for subtle dividers)
  - `--border-error: #000000`
  - `--border-success: #000000`
- **Rule:** No other colors. Ever. The palette is absolute. Success/error states use border weight changes, icons, and text — never color.
- **Contrast Pairing:** White backgrounds pair with black text. Black (inverted) backgrounds pair with white text. No other combinations.
- **Border Radius & Shadows:**
  - `--radius-sm: 0px` `--radius-md: 0px` `--radius-lg: 0px` — ALL VALUES 0px. No exceptions. Every element has sharp 90-degree corners. Non-negotiable.
  - `--shadow-sm: none` `--shadow-md: none` — ZERO drop shadows. Depth through inversion, border weight, scale, negative space.
- **Borders & Lines:**
  - `--border-hairline: 1px solid #E5E5E5` (subtle dividers)
  - `--border-thin: 1px solid #000000` (standard borders)
  - `--border-medium: 2px solid #000000` (emphasis)
  - `--border-thick: 4px solid #000000` (heavy rules, section dividers)
  - `--border-ultra: 8px solid #000000` (maximum impact)
- **Spacing & Transitions:**
  - `--spacing-gap: 2rem`
  - `--transition-fast: 0ms` `--transition-normal: 100ms` (minimal and instant — 0-100ms maximum)
  - `--ease-standard: linear` (binary, sharp on/off states, not gradual)
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- Dark mode is achieved via color inversion (black bg, white text). Define under `@media (prefers-color-scheme: dark)` and/or `.dark`:
  - `--bg-primary: #000000` `--bg-secondary: #0A0A0A`
  - `--text-primary: #FFFFFF` `--text-secondary: #A3A3A3`
  - `--primary: #FFFFFF` (inverted) `--secondary: #000000`
  - `--border-default: #FFFFFF` `--border-light: #2A2A2A`
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling. Maintain sharp corners and black/white palette on mobile — don't default to generic mobile patterns.
- Container: `max-w-6xl` (72rem / 1152px). `px-6 md:px-8 lg:px-12`. Section spacing: `py-24 md:py-32 lg:py-40` (massive vertical space). Thick horizontal rules (4px or 8px black) between ALL major sections.
- 12-column base grid for flexibility. Strong alignment to vertical rhythm.

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS with `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.inverted-card`, `.editorial-quote`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Display/Headlines Font:** Load **Playfair Display** from Google Fonts (elegant, high-contrast serif with beautiful italics). For headlines, large quotes, emphasis.
- **Body Font:** Load **Source Serif 4** from Google Fonts (highly readable serif for long-form text).
- **Mono/Labels Font:** Load **JetBrains Mono** from Google Fonts (for dates, metadata, technical details).
- Bind to `--font-heading: 'Playfair Display', Georgia, serif`, `--font-base: 'Source Serif 4', Georgia, serif`, `--font-mono: 'JetBrains Mono', monospace`.
- **Type Scale (Dramatic range):** xs 0.75rem, sm 0.875rem, base 1rem, lg 1.125rem, xl 1.25rem, 2xl 1.5rem, 3xl 2rem, 4xl 2.5rem, 5xl 3.5rem, 6xl 4.5rem, 7xl 6rem, 8xl 8rem, 9xl 10rem.
- **Tracking & Leading:** Headlines `tracking-tight` (-0.025em) or `tracking-tighter` (-0.05em). Body `tracking-normal`. Labels `tracking-widest` (0.1em). Line heights: `leading-none` (1) for display, `leading-relaxed` (1.625) for body.
- **Icons:** Use Google Material Symbols/Icons with thin strokes (strokeWidth 1 or 1.5). **Forbidden:** raw inline SVGs. Color always black (#000000). Inside circles with black stroke, white fill. Size consistent 20px or 24px. Icons are functional, not decorative.

---

## 2. MINIMALIST MONOCHROME VISUAL IDENTITY (Mandatory)

### 2.1 Textures & Patterns (REQUIRED — Prevent Flat Design)
- **Primary Pattern: Horizontal Lines (Global)**
  ```css
  background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px);
  background-size: 100% 4px;
  opacity: 0.015;
  ```
- **Secondary Pattern: Grid (for editorial sections)**
  ```css
  background-image: linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.015;
  ```
- **Diagonal Lines (for process/timeline sections)**
  ```css
  background-image: repeating-linear-gradient(45deg, transparent, transparent 40px, #00000008 40px, #00000008 42px);
  opacity: 0.01;
  ```
- **Noise Texture (global, paper-like quality):** SVG fractal noise at 0.02 opacity.
- **Inverted Section Textures:** For dark backgrounds (Stats, Final CTA), use white-based textures (vertical lines, radial gradients) at 0.03-0.05 opacity.

### 2.2 Visual Signatures
- **Pure Black & White:** No grays for primary elements. True black (#000000) and true white (#FFFFFF). Gray reserved only for secondary text (#525252) and subtle borders (#E5E5E5).
- **Serif Typography as Hero:** Playfair Display headlines dominate. Words become graphic elements. Single words can fill entire viewport widths.
- **Oversized Type Scale:** 8xl, 9xl, and custom larger sizes. Headlines are 3-5x larger than body (not 1.5-2x).
- **Line-Based Visual System:** Hairlines, thick rules, borders, underlines, strikethroughs. Lines create structure without mass.
- **Sharp Geometric Precision:** Zero border radius. Perfect 90-degree corners. Precise alignments. Bauhaus meets editorial print.
- **Dramatic Negative Space:** Whitespace is active. Generous margins and padding make black elements more impactful.
- **Inversion for Emphasis:** Black background, white text to highlight important elements. Creates drama without breaking monochrome.

### 2.3 Motion — Minimal and Instant
- Favors stillness and instant state changes. Animation is: **Instant** (0-100ms max), **Binary** (sharp on/off, not gradual), **Purposeful** (only for state changes).
- **Hover Effects:** Cards/features: full color inversion (bg, text, borders) with 100ms transition. Buttons: color inversion with `transition-none` for instant feedback. Blog images: border thickens (2px→4px), image scales 105% and removes grayscale (300ms). Links: underline appearance (instant). Testimonials: quote mark opacity increases, bottom border thickens.
- Respect `prefers-reduced-motion` — keep instant transitions, they're already minimal.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component
- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum 44×44px. Height `h-12` (48px) with generous padding `px-8 py-4`. Rectangular, 0px border-radius. Uppercase, `tracking-widest`, `font-medium`, `text-sm`. Consider small arrow (→) for CTAs.
- **Primary:** Background `#000000`, text `#FFFFFF`, no border. Hover: invert to white bg, black text, black border. `transition-none` (instant).
- **Secondary/Outline:** Transparent bg, `#000000` text, `2px solid #000000` border. Hover: fill black, text white.
- **Ghost:** Transparent bg, `#000000` text, no border. Text decoration: underline on hover. Looks like a text link.
- **Hover:** `cursor: pointer`. Instant color inversion.
- **Focus:** `outline: 3px solid #000000; outline-offset: 3px;` (thick, high-contrast — use `focus-visible` to prevent mouse click outlines).
- **Active/Pressed:** `transform: scale(0.97)` (subtle).
- **Loading:** Disables interactions, CSS spinner (black/white border technique). Dimensions must not distort.
- **Disabled:** `opacity: 0.5; pointer-events: none; cursor: not-allowed;`
- **Success/Error:** Use border weight changes (2px→4px) and icons (Google Material Symbols), not color. Checkmark for success, X for error. `aria-live` for feedback.

### 3.2 Card Component
- **Standard Card:** Background `#FFFFFF`, `1px solid #000000` border, padding `p-6` or `p-8`. No shadow, no radius.
- **Inverted Card (emphasis):** Background `#000000`, text `#FFFFFF`, no border. Use sparingly for highlighted content.
- **Borderless Card:** No border, no background. Content separated by generous whitespace. Use horizontal rules above/below if needed.
- **Hover:** Full color inversion (bg, text, borders) with 100ms transition. Blog images: border thickens (2px→4px), image scales 105% and removes grayscale (300ms). Testimonials: quote mark opacity increases, bottom border thickens.
- **Focus-within:** Highlight borders when child receives focus.
- **Loading (Skeleton):** Shimmer animation in CSS (black/white, no shadow).
- **Empty State:** Google Material Icon (thin stroke, black) + guidance text.

### 3.3 Form & Input Requirements
- **States:** Empty, Focused (border thickens), Filled, Valid (border thickens + checkmark icon), Invalid (border thickens + X icon + error text), Disabled, Read-only.
- **Normal:** Background `#FFFFFF`. Border `2px solid #000000` (bottom only, or full). No radius. Placeholder `#525252` italic.
- **Focus:** Border thickens from 2px to 4px. No colored focus ring — just border change. `outline: none`.
- **Structure:** Flex container with label, input, dedicated error feedback container (`aria-live`).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all CSS animated (instant/binary transitions, 0-100ms, no gradual fades).
- **UX:** Centered flex (`align-items: center`), backdrop overlay (solid black or white semi-opaque — no blur), Google Material Icon close button (thin stroke), keyboard focus trapping, close via `Esc` or overlay clicks. Sharp corners, `border-2` or `border-4`.

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing, no horizontal overflow. Rows to columns on small viewports. Reduce oversized headlines (9xl→5xl on mobile). Stack columns. Borders become full-width horizontal rules. Generous vertical spacing maintained. Monochrome drama must survive on mobile.
- **Smooth Animations:** `transition: var(--transition-normal)` (100ms max) on state changes. Instant/binary. Respect `prefers-reduced-motion` — transitions already minimal.
- **Accessibility (a11y):** Pure black on white 21:1 (AAA). Focus states: 3px solid `#000000` outline with 3px offset (use `focus-visible`). Inputs: border thickens 2px→4px. Links: border appears/thickens. All interactive elements 44×44px minimum touch targets. Skip links visible, black button at top. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback. Never rely on color alone (there is none — use border weight, icons, text).
- **Mandatory Visual Feedback:** Every click/hover/submission triggers visible state change (color inversion, border thickening, underline, scale).
- **Destructive Actions:** `.btn-danger` visually distinct in both themes (inverted card style — black bg, white text, thick border, or inverted to white bg, black text with ultra border).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond a single deferred entry-point.
- **Naming Convention:** One consistent convention (BEM or fixed utility set) — never mix.
- **No Unrequested Placeholders:** No lorem ipsum where real copy is supplied.
- **Bold Choices to Implement (Non-Negotiable):**
  - Oversized hero typography (at least one word 8xl or larger, 9xl on desktop)
  - Hero decorative elements (thick rule with small bordered square for visual punctuation)
  - Inverted stats section (black bg, white text, subtle vertical line texture)
  - No accent colors — black IS the accent
  - Heavy horizontal rules (4px black lines between ALL major sections)
  - Editorial pull quotes (testimonials as large italic serif with oversized quotation marks)
  - Sharp everything (zero border-radius across all elements)
  - Instant interactions (100ms transitions maximum, mostly instant)
  - Typography as graphics (headlines that function as visual elements)
  - Layered textures (multiple subtle patterns for depth — NOT flat design)
  - Boxed drop cap (first paragraph has bordered box drop cap)
  - Elevated pricing tier (highlighted tier extends vertically on desktop)
  - Hover inversions (feature cards and pricing tiers invert on hover)
  - Image borders thicken on hover (blog images 2px→4px with scale + grayscale removal)

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes.
- **CSS Scope:** Classes only for existing elements.
- **No Behavioral JS:** No JS for validation/popups — ask the user instead.
- **Clarify Before Assuming:** If a style change requires new markup, stop and ask.
- **Monochrome Exception:** Textures, patterns, and noise overlays are achievable via CSS `::before`/`::after` pseudo-elements and background gradients — do NOT add new HTML elements. Color inversion, border weight changes, and grayscale filters are all CSS-only. If existing markup uses colored accents or rounded corners, override them to `none`/`0px` in CSS — do not remove HTML elements.