# Playful Geometric Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Playful Geometric** style. Follow every rule below without exception. The deliverable must express Playful Geometric's visual identity — stable grid with wild decoration, primitive shapes, hard shadows, pattern fills, bouncy motion — merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling. Changing the site's look requires modifying only CSS, not markup.
- **Geometric Exception:** Hard offset shadows (no blur, solid color) are a signature of this style and MUST be defined in CSS classes — never inline. Example: `box-shadow: 4px 4px 0px 0px #1E293B;`.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Light Mode):**
  - `--primary: #8B5CF6` (Vivid Violet — primary brand/action)
  - `--secondary: #F472B6` (Hot Pink — playful pop)
  - `--accent: #FBBF24` (Amber/Yellow — optimism)
  - `--quaternary: #34D399` (Emerald/Mint — freshness)
  - `--bg-primary: #FFFDF5` (Warm cream/off-white — paper feel, not pure white)
  - `--bg-secondary: #F1F5F9` (Slate 100 — muted surfaces)
  - `--text-primary: #1E293B` (Slate 800 — softer than black)
  - `--text-secondary: #64748B` (Slate 500 — muted text)
  - `--text-success: #34D399`
  - `--text-error: #EF4444`
  - `--border-default: #E2E8F0` (Slate 200)
  - `--border-strong: #1E293B` (Slate 800 — chunky dark borders)
  - `--border-error: #EF4444`
  - `--border-success: #34D399`
- **Contrast Pairing:** Light backgrounds pair with dark text. Dark/accent backgrounds pair with white text.
- **Border Radius & Shadows:**
  - `--radius-sm: 8px` `--radius-md: 16px` `--radius-lg: 24px` `--radius-full: 9999px`
  - Special "blob" radius: `border-radius: 16px 16px 16px 0;` (speech bubble) or `border-radius: 9999px 9999px 0 0;` (arch)
  - `--shadow-sm: 4px 4px 0px 0px #1E293B` (hard, no blur)
  - `--shadow-md: 6px 6px 0px 0px #1E293B` (hover lift)
  - `--shadow-lg: 8px 8px 0px 0px #E2E8F0` (soft hard shadow) or `8px 8px 0px 0px #F472B6` (pink for featured)
- **Spacing & Transitions:**
  - `--spacing-gap: 1.5rem`
  - `--transition-fast: 200ms` `--transition-normal: 300ms`
  - `--ease-standard: cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot/bounciness)
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- Define dark mode tokens under `@media (prefers-color-scheme: dark)` and/or `.dark`:
  - `--bg-primary: #1E293B` `--bg-secondary: #0F172A`
  - `--text-primary: #FFFDF5` `--text-secondary: #94A3B8`
  - `--primary: #A78BFA` `--secondary: #F9A8D4` `--accent: #FCD34D` `--quaternary: #6EE7B7`
  - `--border-default: #334155` `--border-strong: #FFFDF5`
- Hard shadows in dark mode use `--text-primary` or `--bg-secondary` as shadow color to maintain visibility.
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
- Container: `max-w-6xl`. Generous spacing (`py-24`). 12-column grid logic grouped into big blocks (6/6 or 4/4/4).

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS with `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.sticker-card`, `.candy-btn`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Headings Font:** Load **Outfit** from Google Fonts (geometric sans, rounded, friendly). Weights: Bold (700), ExtraBold (800).
- **Body Font:** Load **Plus Jakarta Sans** from Google Fonts (legible, geometric-humanist). Weights: Regular (400), Medium (500).
- Bind to `--font-base: 'Plus Jakarta Sans', system-ui, sans-serif` and `--font-heading: 'Outfit', system-ui, sans-serif`.
- **Icons:** Use Google Material Symbols/Icons. **Forbidden:** raw inline SVGs or local icon files.
- Type scale ratio: 1.25 (Major Third) — melodic and harmonious.

---

## 2. PLAYFUL GEOMETRIC VISUAL IDENTITY (Mandatory)

### 2.1 Visual Signatures
- **Primitive Shapes:** Circles, triangles, squares, pill shapes, squiggles as background elements, masks, or icons.
- **Hard Shadows:** Offset drop shadow with **zero blur** — sticker/cut-out paper feel. Mandatory on buttons and cards.
- **Pattern Fills:** Polka dots, grid lines, diagonal stripes to fill shapes or backgrounds.
- **Varied Radii:** Mix fully rounded corners with sharp ones for "leaf" shapes or asymmetric blobs.

### 2.2 Textures & Patterns
- **Dot Grid:** Background of small dots in strict formation.
- **Squiggles:** SVG paths (referenced via CSS, not inline in HTML) as section dividers or heading underlines.
- **Confetti:** Small shapes (triangles, circles) absolutely positioned behind content blocks.
- **Patterns in CSS:** Define via `background-image` with `radial-gradient` or `repeating-linear-gradient` — never inline.

### 2.3 Motion — Bouncy & Elastic
- Hover: `transition: all var(--transition-normal) var(--ease-standard)` (overshoot/bounciness).
- Entrance: Elements **pop** in (scale 0→1 with bounce), not just fade.
- Wiggle: Keyframe `rotate: 0deg → 3deg → -3deg → 0deg` on hover for icons.
- Marquee: Infinite scrolling text for logos/keywords.
- Respect `prefers-reduced-motion`.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component
- **Primary ("Candy Button"):** Background `--primary` (#8B5CF6), white text, font-weight 700, `border-radius: var(--radius-full)` (pill), `border: 2px solid #1E293B` (dark border), `box-shadow: 4px 4px 0px #1E293B` (hard shadow). Hover: `translate-x: -2px; translate-y: -2px; box-shadow: 6px 6px 0px #1E293B;`. Active: `translate-x: 2px; translate-y: 2px; box-shadow: 2px 2px 0px #1E293B;`. Icon: arrow with circular white background inside button.
- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum 44×44px.
- **Secondary:** Transparent bg, `--text-primary` text, `border: 2px solid #1E293B`, pill radius, no shadow. Hover: fills with `--accent` (yellow).
- **Hover:** Visual shift with `cursor: pointer`. Bouncy transition.
- **Focus:** Distinct focus ring via CSS variables: `outline: 2px solid var(--primary); outline-offset: 2px;`
- **Active/Pressed:** `transform: scale(0.97)` plus shadow shrink.
- **Loading:** Disables interactions, prevents double-clicks, CSS spinner. Dimensions must not distort.
- **Disabled:** `opacity: 0.5; filter: grayscale(1); cursor: not-allowed;`
- **Success/Error:** Temporary feedback via `--text-success` / `--text-error` background tints.

### 3.2 Card Component ("Sticker Card")
- **Default:** White background, `border: 2px solid #1E293B`, `border-radius: var(--radius-lg)`, `box-shadow: 8px 8px 0px #E2E8F0` (soft hard shadow) or `8px 8px 0px #F472B6` (pink for featured). Flexible flexbox layout.
- **Hover:** Rotate `-1deg`, scale `1.02` (wiggle effect). Shadow can intensify.
- **Title:** Bold Outfit font.
- **Icon:** Floating circle div with centered Google Material Icon, sitting half-in/half-out of top border.
- **Focus-within:** Highlight borders when child link/button receives focus.
- **Loading (Skeleton):** Shimmer animation in CSS to prevent layout jumps.
- **Empty State:** Google Material Icon + guidance text.

### 3.3 Form & Input Requirements
- **States:** Empty, Focused (ring + hard color shadow), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
- **Normal:** White background, `border: 2px solid #CBD5E1`, `border-radius: var(--radius-lg)`, `--text-primary` text.
- **Focus:** Border `--primary`, `box-shadow: 4px 4px 0px var(--primary)` (hard color shadow on focus). No glow — hard shadow is the feedback.
- **Label:** Bold, uppercase, small `tracking-wide`.
- **Structure:** Flex container with label, input, dedicated error feedback container (`aria-live`).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all CSS animated (bounce/pop transitions, no blur).
- **UX:** Centered flex (`align-items: center`), backdrop overlay (solid or semi-opaque flat color), Google Material Icon close button, keyboard focus trapping, close via `Esc` or overlay clicks. Card style: sticker card with hard shadow.

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing, no horizontal overflow. Rows to columns on small viewports.
- **Smooth Animations:** `transition: var(--transition-normal)` with bouncy easing. Respect `prefers-reduced-motion`.
- **Accessibility (a11y):** Sufficient contrast in light/dark. Never rely on color alone. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback.
- **Mandatory Visual Feedback:** Every click/hover/submission triggers visible state change (scale, rotate, color fill, shadow shift).
- **Destructive Actions:** `.btn-danger` visually distinct in both themes (red bg, white text, hard shadow).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond a single deferred entry-point.
- **Naming Convention:** One consistent convention (BEM or fixed utility set) — never mix.
- **No Unrequested Placeholders:** No lorem ipsum where real copy is supplied.
- **Unique Section Layouts to Implement:**
  - **Hero:** Text left, image right. Massive yellow circle behind text. Dotted pattern behind image. Image has "blob" mask (CSS `clip-path` or border-radius manipulation).
  - **Features:** Grid of 3. Each card connected by dashed divider in background. Alternating header colors (Violet, Pink, Yellow).
  - **Pricing:** Middle card scaled up (1.1) with massive yellow star badge "MOST POPULAR" rotated 15deg.

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes.
- **CSS Scope:** Classes only for existing elements.
- **No Behavioral JS:** No JS for validation/popups — ask the user instead.
- **Clarify Before Assuming:** If a style change requires new markup, stop and ask.
- **Geometric Exception:** If existing markup lacks decorative shape elements (circles, squiggles, confetti), those are background decorations achievable via CSS `::before`/`::after` pseudo-elements — do NOT add new HTML elements for them. Use CSS-only decoration.