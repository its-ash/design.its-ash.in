# Flat Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Flat Design** style. Follow every rule below without exception. The deliverable must express Flat Design's visual identity—zero artificial depth, bold color blocks, geometric purity, typography as interface—merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling. Changing the site's look requires modifying only CSS, not markup.
- **Flat Design Exception:** Flat Design forbids drop shadows, bevels, gradients on elements, and blur. Enforce this in CSS classes—do NOT use `box-shadow` on any element. Visual interest comes from color blocks, scale, and typography only.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Light Mode):**
  - `--primary: #3B82F6` (Blue 500 — action color)
  - `--secondary: #10B981` (Emerald 500 — supporting accent)
  - `--accent: #F59E0B` (Amber 500 — highlights/badges)
  - `--bg-primary: #fefefe` (near-white canvas, never pure #ffffff)
  - `--bg-secondary: #F3F4F6` (Gray 100 — muted blocks)
  - `--text-primary: #111827` (Gray 900 — high-contrast text)
  - `--text-secondary: #4B5563` (Gray 600 — secondary text)
  - `--text-success: #10B981`
  - `--text-error: #EF4444`
  - `--border-default: #E5E7EB` (Gray 200 — used sparingly)
  - `--border-error: #EF4444`
  - `--border-success: #10B981`
- **Contrast Pairing:** Light backgrounds (`--bg-primary`, `--bg-secondary`) pair with dark text (`--text-primary`). Dark/accent background sections (Blue, Emerald, Amber, dark gray) pair with white text.
- **Border Radius & Shadows:**
  - `--radius-sm: 4px` `--radius-md: 6px` `--radius-lg: 8px`
  - `--shadow-sm: none` `--shadow-md: none` — Flat Design uses NO shadows. Keep variables for architecture compliance but set to `none`.
- **Spacing & Transitions:**
  - `--spacing-gap: 1.5rem`
  - `--transition-fast: 200ms` `--transition-normal: 300ms` `--ease-standard: cubic-bezier(0.4,0,0.2,1)`
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- Define dark mode tokens under `@media (prefers-color-scheme: dark)` and/or a `.dark` class:
  - `--bg-primary: #0F172A` (slate-900)
  - `--bg-secondary: #1E293B` (slate-800)
  - `--text-primary: #F9FAFB` `--text-secondary: #9CA3AF`
  - `--primary: #60A5FA` `--secondary: #34D399` `--accent: #FBBF24`
  - `--border-default: #334155`
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme` on first visit.
- A visible toggle control with correct `aria-pressed`/`aria-label` states must exist.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- All flex layouts are mobile-responsive (rows convert to columns on small viewports).
- Prevent horizontal scrolling — fluid sizing, no fixed widths that overflow.

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS driven by `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`.
- Flat Design-specific reusable classes: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.color-block`, `.feature-card`, `.stat-number`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Text Font:** Load **Outfit** from Google Fonts via `<link>` or `@import`; bind to `--font-base: 'Outfit', sans-serif`.
- **Headings:** Bold (700) or Extra Bold (800), tight letter-spacing (`-0.02em`). Large, graphic, poster-like.
- **Body:** Regular (400), readable spacing.
- **Labels/Buttons:** Medium (500) or SemiBold (600), uppercase, `tracking-wider`.
- **Icons:** Use Google Material Symbols/Icons. **Forbidden:** raw inline SVGs or local icon files.
- **Icon Treatment:** Often placed inside a solid colored circle (white circle with colored icon). Circle size `h-14 w-14` or `h-16 w-16`. Icons scale on hover (`group-hover:scale-110`).

---

## 2. FLAT DESIGN VISUAL IDENTITY (Mandatory)

### 2.1 Zero Artificial Depth
- The Z-axis does not exist. No drop shadows, no bevels, no realistic gradients on elements, no textures, no blur/backdrop-blur.
- Visual hierarchy is created through scale, color contrast, and strategic layering of flat shapes.

### 2.2 Color as Structure
- Bold background colors define sections and grouping — not lines or shadows.
- Color transitions are sharp, never blurred or gradual.
- **Section rotation:** White → Gray 100 → Bold accent (Primary Blue, Emerald, Amber) → Dark gray. Treat each section like a flat graphic poster with bold color blocking.

### 2.3 Geometric Purity
- Rectangles, circles, and squares dominate. Rounded corners are consistent and moderate (`--radius-md` or `--radius-lg`).
- No organic blobs or complex shapes.
- **Background decoration:** Large geometric shapes (circles, rotated squares) with low opacity positioned absolutely for visual interest — poster design.

### 2.4 Motion — Snappy & Direct
- `transition: all var(--transition-fast)` for most interactions. `var(--transition-normal)` for larger transforms.
- Hover feedback through **scale transforms** (`hover:scale-105` buttons, `hover:scale-[1.02]` cards), **color shifts** (darkening/lightening), **color fills** (outline buttons filling), and **icon scaling** (`group-hover:scale-110`).
- Respect `prefers-reduced-motion`.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component
Style all states via CSS classes:

- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum touch target 44×44px. Primary height `h-14` to `h-16`. `border-radius: var(--radius-md)`. No shadow.
- **Primary:** Solid `--primary` background, white text. Hover: `hover:scale-105`, background darkens (`hover:bg-blue-600`). No shadow.
- **Secondary:** Solid `--bg-secondary` background, dark text. Hover: `hover:bg-gray-200`, scale effect.
- **Outline:** `border-4` solid color (not border-2 — bolder), text matches border color, transparent bg. Hover: fill effect (`hover:bg-[color] hover:text-white`).
- **Hover:** Visual shift via brightness/color change with `cursor: pointer`. Scale transform.
- **Focus:** Distinct focus ring using CSS variables: `outline: 2px solid var(--primary); outline-offset: 2px;` (high-contrast ring since no shadows exist).
- **Active/Pressed:** `transform: scale(0.97)`.
- **Loading:** Disables interactions, prevents double-clicks, renders a CSS spinner (border technique, flat — no shadow). Button dimensions must not distort.
- **Disabled:** `opacity: 0.5; filter: grayscale(1); cursor: not-allowed;`
- **Success/Error:** Temporary feedback states driven by `--text-success` / `--text-error` background tints. Text remains readable.

### 3.2 Card Component
- **Default:** Flexible flexbox layout, solid background color (white on gray page, or soft color tints like `bg-blue-50`, `bg-green-50` for features). No shadow. No border (color blocks define edges). Generous padding (`p-6` or `p-8`). `border-radius: var(--radius-lg)`.
- **Hover:** Scale transform `hover:scale-[1.02]` (subtle). For colored backgrounds, intensify color (`hover:bg-[color]-100`). Icons within cards: `group-hover:scale-110`.
- **Focus-within:** Highlight borders when a child link/button receives focus (use `--primary` border).
- **Loading (Skeleton):** Shimmer animation defined in CSS (flat, no shadow) to prevent layout jumps.
- **Empty State:** Structured fallback with a Google Material Icon and clear guidance text.

### 3.3 Form & Input Requirements
- **States:** Empty, Focused (outline ring), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
- **Normal:** `--bg-secondary` (Gray 100) background, no border, `--text-primary` text, `border-radius: var(--radius-md)`.
- **Focus:** White background, `border-2` solid `--primary`. No focus glow — just the hard border. Distinct ring via CSS variables.
- **Structure:** Flex container wrapping a label, input field, and dedicated error feedback container.
- **Error Feedback:** `aria-live` region for dynamic feedback, red text, error icon (Google Material Symbol).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all animated via CSS transitions (flat, no shadow depth; use color/opacity).
- **UX Features:** Centered flex container (`align-items: center`), backdrop overlay (solid or semi-opaque flat color — no blur), Google Material Icon close button, keyboard focus trapping, close via `Esc` or overlay clicks.

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing, responsive breakpoints, no horizontal overflow. Rows to columns on small viewports.
- **Smooth Animations:** `transition: var(--transition-normal)` on state changes. Respect `prefers-reduced-motion`.
- **Accessibility (a11y):** Sufficient contrast in both light and dark modes. Never rely solely on color to communicate state. Semantic HTML5 elements, correct ARIA roles/labels, logical DOM/focus order, full keyboard operability, `aria-live` for dynamic feedback (form errors, toasts, loading).
- **Mandatory Visual Feedback:** Every click, hover, or submission triggers a visible state change (scale, color shift, fill).
- **Destructive Actions:** `.btn-danger` must be visually distinct in both light and dark themes (red background, white text).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, and `script.js`. No inline `<script>` blocks beyond a single deferred entry-point reference.
- **Naming Convention:** Enforce one consistent class-naming convention (BEM or a fixed utility set) across the entire deliverable — never mix conventions.
- **No Unrequested Placeholders:** Lorem ipsum is prohibited where real copy/labels are supplied. Placeholders allowed only where content is genuinely unspecified.
- **Bold Choices to Implement (The "Bold Factor"):**
  - Large decorative geometric shapes in hero background (circles, rotated squares with low opacity)
  - Vibrant full-section color blocks (Blue hero, Emerald benefits, Amber CTA, Dark gray How It Works & Footer)
  - Dramatic scale effects on pricing cards (popular tier larger, scales more)
  - Multi-color stat numbers (each stat uses a different accent color)
  - Abstract geometric compositions (overlapping shapes in hero illustration and benefits section)
  - Pronounced hover states (scale, color intensification, fills)
  - Bold typography with tight leading and strong weight contrast
  - Thick borders (`border-4` on outline buttons, `border-2` on FAQ items)
  - Visual interest without depth — achieved through color contrast, geometric layering, and scale, never shadows or gradients

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

When the request targets existing markup rather than a from-scratch build:

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes. Work only within the existing element/class structure.
- **CSS Scope:** Define CSS classes only for elements that already exist — never invent classes for absent elements.
- **No Behavioral JS:** Do not write JavaScript for form validation, popups/modals, or utility/helper functions. Ask the user how they want it handled instead.
- **Clarify Before Assuming:** If a requested style change requires adding markup (e.g., a missing wrapper or icon element), stop and ask the user — never silently insert new HTML.
- **Flat Design Exception:** If existing markup uses shadows or gradients, override them to `none` in CSS — do not remove HTML elements to eliminate them.