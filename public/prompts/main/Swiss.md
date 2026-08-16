# Swiss International (International Typographic Style) — Coding Prompt

## Design Philosophy

**The International Typographic Style (Swiss Style)** is not merely a visual trend; it is a philosophy of objective communication born in 1950s Switzerland. It rejects personal expression and subjectivity in favor of universal clarity, mathematical precision, and logical structure.

**Core Tenets:**

1. **Objectivity over Subjectivity**: The design must recede to let the content speak. Every visual decision must be justifiable by the content's needs. Personal ornamentation is eliminated in favor of functional communication.
2. **The Grid as Law**: The grid is the absolute authority. It is not a guideline; it is the visible skeleton of the information. Avoid static center-alignment in favor of **asymmetrical organization** to create dynamic visual rhythm and tension. Grid patterns are made visible through subtle background textures.
3. **Typography is the Interface**: Type is not just for reading; it is the primary structural and graphical element. Grotesque sans-serif typefaces (Inter, Helvetica) are neutral vessels for meaning. Scale, weight, and position are the only tools needed to create hierarchy.
4. **Active Negative Space**: White space is an active structural element that defines boundaries, gives weight to massive typography, and creates breathing room.
5. **Layered Texture & Depth**: While maintaining flatness (no shadows or 3D effects), visual depth is achieved through **subtle pattern overlays**: grid lines (24px), dot matrices (16px), diagonal stripes, and noise textures.
6. **Universal Intelligibility**: The design should be understood instantly — clean, legible, and undeniably modern.

**The Vibe:**
- **Intellectual & Architectural**: Like a well-engineered building, museum exhibition, or transit map — functional, safe, and efficient.
- **Structured yet Organic**: Subtle texture patterns provide warmth and visual interest — like fine paper grain or screen printing texture.
- **Brutally Precise**: No gradients to hide bad layout. Depth comes from pattern, not shadow. Flat yet rich, stark yet nuanced.
- **Timeless**: By avoiding ephemeral trends, the design aims for permanence.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS

Keep all styling strictly inside a dedicated CSS file (`style.css`):

* **No Inline CSS:** Explicitly forbid the use of the `style="..."` attribute in HTML.
* **Class/ID Selectors Only:** Require all design properties, layout rules, and states to be targeted via class or ID selectors.
* **Minimal HTML Modifications:** HTML structure must remain clean, semantic, and agnostic of visual styling so that changing the site's look requires modifying only the CSS file, not the markup.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens

Store all visual tokens inside `:root` (and theme classes) using CSS variables. Merge the Swiss palette with the required token set:

* **Colors:**
  - `--primary: #FF3000` (Swiss Red — the only signal color, used for CTAs, critical emphasis, section number prefixes)
  - `--secondary: #000000` (Pure Black — secondary structural color)
  - `--bg-primary: #fefefe` (Light mode uses #fefefe instead of #ffffff per architectural rules; Swiss design uses pure white canvas — use `#fefefe` to comply)
  - `--bg-secondary: #F2F2F2` (Light Gray — muted secondary background for rhythm)
  - `--text-primary: #000000` (Pure Black — text is absolute)
  - `--text-secondary: #555555` (Medium gray for secondary text)
  - `--text-success: #2d8659` (functional success)
  - `--text-error: #FF3000` (Swiss Red for errors)
  - `--border-default: #000000` (Pure Black — structure is visible)
  - `--border-error: #FF3000`
  - `--border-success: #2d8659`
* **Contrast Pairing:** Light background (`#fefefe`) pairs with pure black text (`#000000`). Swiss Red (`#FF3000`) used only as signal/accent — pairs with white text on red fills. Dark mode inverts: black background with white text.
* **Light Mode Background:** Use `#fefefe` instead of `#ffffff`.
* **Border Radius & Shadows:**
  - `--radius-sm: 0px` (Strictly rectangular — no rounded corners)
  - `--radius-md: 0px`
  - `--radius-lg: 0px`
  - `--shadow-sm: none` (No drop shadows — flatness maintained)
  - `--shadow-md: none`
  - `--shadow-lg: 0 0 0 8px rgba(255, 48, 0, 0.1)` (subtle ring shadow for accent circles only)
* **Spacing & Transitions:**
  - `--spacing-gap: 1.5rem` (generous gaps)
  - `--transition-fast: 150ms` (snappy, mechanical)
  - `--transition-normal: 200ms`
  - `--ease-standard: ease-out`
* **Elevation/Stacking:**
  - `--z-dropdown: 100`
  - `--z-modal: 1000`
  - `--z-toast: 2000`
* **Typography Tokens:**
  - `--font-base: 'Inter', system-ui, sans-serif` (Google Font — closest to Helvetica/Akzidenz-Grotesk)
  - `--font-heading: var(--font-base)`

### 1.3 Mandatory Dark Mode Support

Dark Mode must always be defined. For Swiss style, dark mode inverts the monochrome palette:

* **Implementation:** Define dark mode color tokens under `@media (prefers-color-scheme: dark)` and/or a `.dark` class selector:
  - `--bg-primary: #0a0a0a` (near-black)
  - `--bg-secondary: #1a1a1a` (elevated surface)
  - `--text-primary: #fefefe` (inverted to white)
  - `--text-secondary: #aaaaaa`
  - `--border-default: #fefefe` (white borders on dark)
  - `--primary: #FF3000` (Swiss Red stays the same)
* **Theme Switching:** Background and text CSS variables switch seamlessly without requiring HTML restructuring.
* **Persistence:** User theme choice persists via `localStorage`, falling back to `prefers-color-scheme` on first visit; require a visible toggle control with correct `aria-pressed`/`aria-label` state.

### 1.4 Flexbox Layout & Mobile-First Alignment

Build layout structures using Flexbox (`display: flex`):

* **Default Alignment Rule:** Every flex container **must default to `align-items: center`** unless there is an explicitly justified exception. Swiss style often uses asymmetrical alignment — override `align-items: flex-start` where left alignment is intentional.
* **Mobile-Friendly First:** All flex layouts must be mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
* **The Grid as Law:** The grid should often be **visible** using thick borders (`border-2` or `border-4`) on elements. Use asymmetric column ratios (8:4, 7:5, 5:7) to create dynamic tension. Strict left alignment for text.
* **Separators:** Use horizontal and vertical lines (CSS borders) to divide sections.
* **Active Negative Space:** Generous padding (`p-8`, `p-12`, `p-24`) and asymmetric layouts create breathing room and visual tension.

### 1.5 Framework Default & Tailwind CSS Integration

Use Tailwind CSS (or clean custom CSS driven by Tailwind's `@layer` / `@apply` directives). All utility classes must map back to CSS variables or generic reusable class names (`.btn`, `.card`, `.input-group`, `.swiss-grid-pattern`, `.swiss-dots`, `.swiss-diagonal`, `.swiss-noise`).

### 1.6 Typography & Icons (Google Fonts Mandatory)

* **Text:** Include Google Font `<link>` tags for `Inter` (weights: 400, 500, 700, 900). Bind to `--font-base`.
* **Typography Style:** **UPPERCASE** for almost all headings and labels. Heavy use of **Black (900)** and **Bold (700)** for headings. **Regular (400)** or **Medium (500)** for body. Tracking: tight (`tracking-tighter`) for large headlines, widest (`tracking-widest`) for small labels. Extreme scale contrast — headlines should be massive (`text-7xl` to `text-9xl`+).
* **Icons:** Use Google Material Symbols/Icons. Explicitly forbid raw inline SVGs. Treat icons as functional symbols with stroke width matching typography. Often enclosed in geometric shapes (squares/circles).

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements

Style all states via CSS classes:

* **Default:** Flex layout (`display: flex; align-items: center; justify-content: center; gap: 0.5rem;`). Minimum touch target of 44x44px. Shape: Strictly rectangular (`border-radius: 0px`). Solid Black background with White text (Primary). White background with Black border (Secondary). Typography: Uppercase, bold, tracking-wide.
* **Hover:** Invert colors (Black → White, White → Black) or switch to Swiss Red (`--primary: #FF3000`). Instant background color change, no scale transforms. Cursor: `pointer`.
* **Focus:** Distinct focus ring using CSS variables (`outline: 2px solid var(--primary); outline-offset: 2px;`) for keyboard navigation. High-contrast 2px ring in red.
* **Active/Pressed:** Click transform feedback (`transform: scale(0.97)`).
* **Loading:** Disables interactions, prevents double-clicks, and renders a CSS spinner (geometric, mechanical rotation) without distorting button dimensions.
* **Disabled:** Reduced opacity (`opacity: 0.5`), greyscale, and `cursor: not-allowed`.
* **Success/Error:** Temporary feedback state styles driven by `--text-success` or `--text-error`.
* **Danger Variant:** `.btn-danger` uses Swiss Red (`--primary`) fill; visually distinct in both light and dark themes.

### 2.2 Card Component Requirements

* **Default:** Flexible Flexbox layout, defined by thick borders (`border: 2px solid var(--border-default)`). Background: White or Muted Gray (`--bg-secondary: #F2F2F2`). Generous and uniform padding (`p-8`, `p-12`). No border radius (0px). No shadows.
* **Hover:** Entire card background changes color (e.g., to Swiss Red or Black) with text color inversion. Full color inversions — never subtle fades.
* **Focus-within:** Highlights card borders when a child link/button receives focus.
* **Loading (Skeleton):** Shimmer animation styling defined in CSS to prevent layout jumps. Use geometric placeholder blocks.
* **Empty State:** Structured fallback layout featuring a Google Icon and clear guidance text.

### 2.3 Form & Input Requirements

* **States:** Empty, Focused (sharp border color change to Swiss Red — no glow rings), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
* **Structure:** Flex container wrapping a label, input field, and dedicated error feedback container.
* **Style:** Underlined (`border-b`) or solid rectangular box with thick border (`border-2`). No border radius (0px). Sharp change in border color to `--primary` on focus. No glow rings.

### 2.4 Modal / Popup Requirements

* **States:** Opening, Open, Loading, Success/Error, Closing (all animated via CSS transitions — instant, mechanical, snappy).
* **UX Features:** Centered flex container (`align-items: center`), backdrop overlay, Google Icon close button, keyboard focus trapping, and support for closing via `Esc` or overlay clicks.
* **Styling:** Strictly rectangular, thick black borders, no shadows. Uppercase typography.

---

## 3. CORE UX & MICRO-INTERACTION RULES

* **Responsive by Default:** Fluid sizing and responsive breakpoints without horizontal overflow. Typography scales down but remains bold: `text-6xl` for hero on mobile, scaling to `text-[10rem]` on desktop. Single column on mobile, asymmetric grids on desktop. Borders remain 4px thick (never thin out). CTAs become full-width on mobile (`h-16`).
* **Smooth Animations:** CSS transitions on all state changes (`transition: var(--transition-fast)`, `transition: var(--transition-normal)`), respecting `prefers-reduced-motion`. Movement is instant, mechanical, snappy, precise. No elastic or spring animations.
* **Micro-interactions:**
  - Navigation Links: Vertical slide animation with color change (text slides up, red replacement slides in from below)
  - Stats Cards: Scale transform on numbers (1.0 → 1.05), rotating plus icons (0° → 90°), background color snap (black → red)
  - Feature Cards: Color inversion on hover (white → accent red), arrow rotation (-45° → 0°)
  - FAQ Cards: Rotating plus icons, full background color inversion (white → red)
  - Buttons: Instant background color changes, no scale transforms
* **Accessibility (a11y):** Black/White/Red scheme naturally offers ultra-high contrast (21:1). Ensure red text on white meets AA standards. Never rely solely on color to communicate state. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback. High-contrast 2px ring in red for focus.
* **Mandatory Visual Feedback:** Every user click, hover, or submission must trigger a visible state change (color inversion, scale, rotation). Swiss style is bold and immediate — always indicate interactivity through color, scale, or position changes.
* **Destructive Actions:** `.btn-danger` must be visually distinct in both themes.

---

## 4. DELIVERABLE & OUTPUT FORMAT

* **File Structure:** Separate `index.html`, `style.css`, and `script.js` files. No inline `<script>` blocks beyond a single deferred entry-point reference.
* **Naming Convention:** Enforce one consistent class-naming convention (BEM or fixed utility set) across the entire deliverable — never mix conventions.
* **No Unrequested Placeholders:** Prohibit lorem-ipsum-only submissions where the user supplied real copy/labels; placeholders are allowed only where content was genuinely left unspecified.

---

## 5. EDIT MODE — MODIFYING AN EXISTING UI

When the request targets existing markup/code rather than a from-scratch build:

* **No New Elements:** Never introduce new HTML tags, components, or DOM nodes. Work only within the existing element/class structure.
* **CSS Scope:** Define CSS classes only for elements that already exist in the project's markup — never invent classes for elements that aren't there.
* **No Behavioral JS:** Do not write JavaScript for form validation, popups/modals, or utility/helper functions. When such logic is requested, ask the user how they want it handled instead of generating it.
* **Clarify Before Assuming:** If a requested style change cannot be achieved without adding markup, stop and ask the user.

---

## 6. BOLD CHOICES (NON-NEGOTIABLE SIGNATURES)

1. **Massive Responsive Typography:** Headlines scale from `text-6xl` (mobile) to `text-[10rem]` (desktop). Let words be images.
2. **Visible Structure:** The layout grid is made tangible through thick 4px black borders defining sections, visible grid patterns (24px) on backgrounds, and asymmetric column ratios (8:4, 7:5, 5:7).
3. **Numbered Section Labels:** Every major section has a prefix (01. System, 02. Method, 03. Advantages, 04. Journal) in red accent with uppercase tracking.
4. **Layered Geometric Compositions:** Hero features abstract Bauhaus-style composition with overlapping shapes. Product detail uses 2×2 grid of geometric elements with different texture patterns.
5. **Pattern-Based Texture:** Four distinct CSS patterns — grid (24px, 3% opacity), dots (16px, 4% opacity), diagonal (10px spacing, 2% opacity), noise (1.5% opacity via SVG filter). Applied strategically to create depth without shadows. Never applied to pure black backgrounds or red accent areas.
6. **Bold Interaction States:** Full color inversions (not just opacity fades), rotating icons (plus signs spin 90°), scale transforms on hover, vertical slide animations in navigation.
7. **Functional Color System:** Red (`#FF3000`) is used only for primary CTAs, hover states as visual feedback, section number prefixes — never as decorative fill.
8. **Active Negative Space:** Generous padding (`p-12`, `p-24`) and asymmetric layouts create breathing room and visual tension.
9. **Zero Radius:** Strictly `0px` border radius everywhere. No rounded corners.
10. **Zero Shadows:** No drop shadows. Depth comes from pattern overlays, not elevation.

🤖