# Kinetic Typography Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Kinetic Typography** style. Follow every rule below without exception. The deliverable must express Kinetic Typography's visual identity — typography as structure, relentless motion, aggressive scale, brutalist flatness, acid yellow accents — merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling.
- **Kinetic Exception:** This style is completely flat — NO drop shadows, NO border-radius above 2px, NO gradients on backgrounds. Depth is created through color layering and massive background numbers, never shadows. Enforce this in CSS classes.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Dark Mode Foundation):**
  - `--primary: #DFE104` (Acid yellow/lime — high energy, used sparingly but boldly)
  - `--secondary: #27272A` (Zinc 800 — dark gray for secondary surfaces)
  - `--bg-primary: #09090B` (Rich black, not pure black — softer on eyes)
  - `--bg-secondary: #27272A` (Dark gray for muted surfaces)
  - `--text-primary: #FAFAFA` (Off-white, not pure white — less harsh)
  - `--text-secondary: #A1A1AA` (Zinc 400 — body text and descriptions)
  - `--text-success: #DFE104` (Acid yellow for success highlights)
  - `--text-error: #EF4444` (Red for errors)
  - `--border-default: #3F3F46` (Zinc 700 — subtle structural lines)
  - `--border-error: #EF4444`
  - `--border-success: #DFE104`
- **Contrast Pairing:** Dark backgrounds (`--bg-primary`) pair with off-white text (`--text-primary`). Acid yellow accent pairs with pure black text. Never use mid-range grays — stay at contrast extremes.
- **Border Radius & Shadows:**
  - `--radius-sm: 2px` `--radius-md: 0px` `--radius-lg: 0px` (sharp corners are essential)
  - `--shadow-sm: none` `--shadow-md: none` — completely flat, NO drop shadows.
- **Spacing & Transitions:**
  - `--spacing-gap: 2rem`
  - `--transition-fast: 200ms` `--transition-normal: 300ms` `--ease-standard: ease-in-out`
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- This style is dark-mode-native. Define a light mode variant under `@media (prefers-color-scheme: light)` and/or `.light`:
  - `--bg-primary: #FAFAFA` `--bg-secondary: #E4E4E7`
  - `--text-primary: #09090B` `--text-secondary: #52525B`
  - `--primary: #C4C40B` (slightly darker acid yellow for light bg contrast)
  - `--border-default: #D4D4D8`
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
- Container: `max-w-[95vw]` — push to the edges. Never use conservative `max-w-7xl`. Full bleed for marquees. `max-w-2xl` for long-form text.

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS with `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.marquee`, `.massive-number`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Primary Font:** Load **Space Grotesk** from Google Fonts (strong geometric shapes, excellent at large sizes). Fallback: Inter. Weights: 300–700.
- Bind to `--font-base: 'Space Grotesk', sans-serif`.
- **Type Scale (Aggressive):**
  - Hero/Display: `clamp(3rem, 12vw, 14rem)` (fluid viewport-based scaling)
  - Section headings: `text-5xl md:text-7xl lg:text-8xl` or `clamp(2.5rem, 8vw, 6rem)`
  - Card titles: `text-2xl md:text-3xl lg:text-6xl`
  - Body: `text-lg md:text-xl lg:text-2xl` (18–24px, larger than typical)
  - Massive numbers (decorative): `text-[6rem] md:text-[8rem]` to `text-[8rem] md:text-[12rem]`
- **Type Treatment:** ALL display text (headings, buttons, labels) uppercase. Body text stays normal case. `tracking-tighter` on large display, `tracking-wide`/`tracking-widest` on small labels. `leading-[0.8]` or `leading-none` for display headlines. Bold (700) for headings/buttons, Medium (500) for body.
- **Icons:** Use Google Material Symbols/Icons. **Forbidden:** raw inline SVGs or local icon files.

---

## 2. KINETIC TYPOGRAPHY VISUAL IDENTITY (Mandatory)

### 2.1 Signature Elements
- **Infinite Marquees:** Marquees that never stop moving. No gradient edges — raw edges are part of the aesthetic. Fast (speed 60-100) for stats, slower (speed 30-50) for testimonials. Linear easing.
- **Viewport-Responsive Typography:** Using `clamp()` for fluid scaling. At least one headline uses viewport-width units (10vw+).
- **Massive Background Numbers:** Oversized numbers (8rem-12rem) in muted tones (`--bg-secondary`) as decorative graphic shapes — `aria-hidden="true"`.
- **Hard Color Inversions:** Cards/sections completely flip color scheme on hover (black → yellow background, white → black text). Clean transitions, not gradual.
- **Sharp 2px Borders:** `border-2` with 0px border-radius. Brutalist geometry. `gap-px` grid dividers for connected card systems.

### 2.2 Texture & Overlay
- **Noise Texture:** SVG-based `feTurbulence` filter (baseFrequency 0.8, numOctaves 4). Fixed position, full viewport, `opacity: 0.03`, `mix-blend-overlay`. Adds subtle poster texture.
- **Backgrounds:** Solid colors only — no gradients. Acid yellow for full-section backgrounds (stats marquee, footer). Muted for card hover backgrounds.

### 2.3 Motion — Constant & Snappy
- Marquees scroll endlessly (never pause on hover).
- Scroll-triggered scale/opacity transforms (hero parallax: scale 1.0→1.2, opacity 1.0→0 over first 20% of scroll).
- Sticky scroll cards: `sticky top-32` — cards stack and overlap as user scrolls.
- Hover: scale `1.05` (buttons), color floods (cards), horizontal translate (benefit titles `translate-x-8`), opacity reveals (descriptions `opacity-0` → `opacity-100`). Duration `300ms`.
- Active: buttons `scale-95`. Respect `prefers-reduced-motion`.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component
- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum 44×44px. Heights: default 56px (`h-14`), small 40px (`h-10`), large 80px (`h-20`). Horizontal padding 2x height. Sharp corners (`rounded-none`). Uppercase, `tracking-tighter`, weight 700.
- **Primary (Accent):** Background `--primary` (acid yellow), text black. Hover: `scale-105`. Active: `scale-95`. `transition-all`.
- **Outline:** `border: 2px solid #3F3F46`, transparent bg, off-white text. Hover: full fill with off-white bg, text inverts to black. Hard transition (instant color flip).
- **Ghost:** No border, no bg, off-white text. Hover: text changes to `--primary`.
- **Hover:** Visual shift with `cursor: pointer`. Scale transform.
- **Focus:** Visible focus ring in accent color: `outline: 2px solid var(--primary); outline-offset: 2px;`
- **Active/Pressed:** `transform: scale(0.95)`.
- **Loading:** Disables interactions, prevents double-clicks, CSS spinner. Dimensions must not distort.
- **Disabled:** `opacity: 0.5; cursor: not-allowed; pointer-events: none;`
- **Success/Error:** Temporary feedback via `--text-success` / `--text-error`.

### 3.2 Card Component
- **Default:** `border: 2px solid #3F3F46`, background `--bg-primary` (#09090B), large even padding (`p-8` or `p-12`), no border-radius (sharp corners). No shadow.
- **Hover:** Background floods with `--primary` (acid yellow), border changes to accent, all text inverts to black. `duration-300`. Group classes coordinate text color changes.
- **Content Hierarchy:** Large title (`text-3xl`) in `--text-primary` → black on hover. Description in `--text-secondary` → black with reduced opacity on hover. Decorative numbers in `--bg-secondary` → black on hover.
- **Sticky Card Pattern:** `sticky top-32` — cards stack and overlap on scroll.
- **Focus-within:** Highlight borders when child receives focus.
- **Loading (Skeleton):** Shimmer animation in CSS (flat, no shadow).
- **Empty State:** Google Material Icon + guidance text.

### 3.3 Form & Input Requirements
- **States:** Empty, Focused (border color change), Filled, Valid (success border), Invalid (error border, red text, error icon), Disabled, Read-only.
- **Normal:** Extra tall (`h-24` / 96px). Bottom border only (`border-b-2`), `--border-default` color. Transparent bg. Extra large text (`text-4xl`), bold, uppercase, tight tracking. Minimal horizontal padding.
- **Focus:** Border-bottom changes to `--primary` (acid yellow). No outline ring — border serves as focus indicator. Instant color change.
- **Placeholder:** `--bg-secondary` color (very subtle), same size/style as input, uppercase.
- **Structure:** Flex container with label (small, uppercase, `tracking-wide`, above input), input, dedicated error feedback container (`aria-live`).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all CSS animated (snappy transitions, color flips, no blur).
- **UX:** Centered flex (`align-items: center`), backdrop overlay (solid `--bg-primary` semi-opaque — no blur), Google Material Icon close button, keyboard focus trapping, close via `Esc` or overlay clicks. Sharp corners, `border-2`.

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing via `clamp()`, no horizontal overflow. Single column mobile, multi-column desktop. Marquees persist at all breakpoints.
- **Smooth Animations:** `transition: var(--transition-normal)` on state changes. Respect `prefers-reduced-motion` — disable marquees, provide static fallback.
- **Accessibility (a11y):** Off-white on rich black ~15:1 (AAA). Acid yellow on black ~12:1 (AAA). Never rely on color alone. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback. Decorative background numbers `aria-hidden="true"`.
- **Mandatory Visual Feedback:** Every click/hover/submission triggers visible state change (scale, color flood, translate, opacity reveal).
- **Destructive Actions:** `.btn-danger` visually distinct in both themes (red bg, white text).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond a single deferred entry-point.
- **Naming Convention:** One consistent convention (BEM or fixed utility set) — never mix.
- **No Unrequested Placeholders:** No lorem ipsum where real copy is supplied.
- **Bold Choices to Implement:**
  - At least one headline using viewport-width units (10vw+)
  - At least two infinite scrolling marquees (one fast stats, one slower testimonials), no gradient edges
  - Massive background numbers (8rem-12rem) in muted tones as decorative graphic shapes
  - Hard color inversions on card hover (black → yellow, white → black)
  - Uppercase display treatment on ALL headings, buttons, labels
  - Aggressive scale hierarchy (8-10x difference between largest and smallest text)
  - Sharp 2px borders, 0px border-radius, no shadows
  - Hero parallax (scale 1.0→1.2, opacity 1.0→0 on scroll)
  - Sticky scroll cards (`sticky top-32`)
  - Noise texture overlay at 0.03 opacity

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes.
- **CSS Scope:** Classes only for existing elements.
- **No Behavioral JS:** No JS for validation/popups — ask the user instead.
- **Clarify Before Assuming:** If a style change requires new markup, stop and ask.
- **Kinetic Exception:** Marquees and scroll-triggered animations require JS — if existing markup cannot support them without new elements, ask the user. Decorative background numbers and noise texture are achievable via CSS `::before`/`::after` — do NOT add new HTML elements.