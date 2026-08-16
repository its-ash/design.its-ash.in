# Luxury / Editorial Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Luxury / Editorial** style. Follow every rule below without exception. The deliverable must express Luxury's visual identity — elegance through restraint, exquisite typography hierarchy, generous negative space, slow cinematic motion, intentional asymmetry, layered subtle depth — merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling.
- **Luxury Exception:** Shadows in this style are extremely subtle and soft (never harsh). Grayscale image filters with ultra-slow color reveals (1500-2000ms) are a signature — enforce via CSS classes. Border-radius is strictly 0px everywhere.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Sophisticated Monochrome):**
  - `--primary: #1A1A1A` (Rich Charcoal — primary text, sharp borders; not pure black)
  - `--secondary: #D4AF37` (Metallic Gold — hover states, underlines, focus indicators, small decorative elements; use sparingly, never for large areas)
  - `--bg-primary: #F9F8F6` (Warm Alabaster — not pure white; feels like expensive paper/linen)
  - `--bg-secondary: #EBE5DE` (Pale Taupe — subtle surface elevation, disabled states, alternate backgrounds)
  - `--text-primary: #1A1A1A` (Rich Charcoal)
  - `--text-secondary: #6C6863` (Warm Grey — secondary text, captions, metadata)
  - `--text-success: #2D7D4F` (Muted green for success)
  - `--text-error: #8B2D2D` (Muted red for errors)
  - `--border-default: rgba(26,26,26,0.15)` (subtle dividers at 10-20% opacity)
  - `--border-strong: #1A1A1A` (full opacity for strong borders)
  - `--border-error: #8B2D2D`
  - `--border-success: #2D7D4F`
- **Contrast Pairing:** Alabaster backgrounds pair with charcoal text. Dark sections (charcoal bg) pair with alabaster text and muted text at 60-80% opacity. Gold accent pairs with charcoal or white text depending on context.
- **Border Radius & Shadows:**
  - `--radius-sm: 0px` `--radius-md: 0px` `--radius-lg: 0px` — strictly rectangular, no rounded corners anywhere.
  - `--shadow-sm: 0 2px 8px rgba(0,0,0,0.02)` (cards — barely visible)
  - `--shadow-md: 0 4px 24px rgba(0,0,0,0.08)` (feature images)
  - `--shadow-lg: 0 8px 32px rgba(0,0,0,0.12)` (hero images, hover deepening)
  - Inner borders: `inset 0 0 0 1px rgba(0,0,0,0.04)` for subtle framing
- **Spacing & Transitions:**
  - `--spacing-gap: 3rem` (generous breathing room)
  - `--transition-fast: 500ms` `--transition-normal: 700ms` (slow, deliberate, cinematic)
  - `--transition-image: 1500ms` to `2000ms` (ultra-slow image reveals)
  - `--ease-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth luxury feel)
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- Dark mode is achieved via section inversion (charcoal sections with alabaster text). Define tokens under `@media (prefers-color-scheme: dark)` and/or `.dark`:
  - `--bg-primary: #1A1A1A` `--bg-secondary: #2A2A2A`
  - `--text-primary: #F9F8F6` `--text-secondary: #9C9893`
  - `--primary: #F9F8F6` (inverted) `--secondary: #D4AF37` (gold maintains)
  - `--border-default: rgba(249,248,246,0.15)` `--border-strong: #F9F8F6`
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
- **Asymmetric Composition:** Avoid 50/50 splits. Use 7/5, 4/4/4, or offset column starts (`col-start-2`, `col-start-6`). Bottom-left alignment for primary content. Deliberate empty space.
- Container: `max-w-[1600px]`. Padding: `px-8` mobile, `px-16` desktop. Section padding: `py-24` to `py-32` (massive vertical space).

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS with `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.editorial-heading`, `.overline`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Heading Font:** Load **Playfair Display** from Google Fonts (high-contrast serif, elegant, editorial). Weights: Regular (400), Light (300), Italic (400). For headlines, large quotes, emphasis.
- **Body Font:** Load **Inter** from Google Fonts (humanist sans, clean, modern, legible). Weights: Light (300), Regular (400), Medium (500). For body text, labels, UI.
- Bind to `--font-heading: 'Playfair Display', serif` and `--font-base: 'Inter', sans-serif`.
- **Type Scale (Dramatic):** Hero `text-6xl` to `text-9xl` with `leading-[0.9]`. Section `text-5xl` to `text-7xl`. Subsection `text-3xl` to `text-4xl`. Body `text-base` to `text-lg` with `leading-relaxed` (1.625). Overlines/labels `text-xs` uppercase `tracking-[0.25em]` to `tracking-[0.3em]`. Micro-text `text-[10px]`.
- **Icons:** Use Google Material Symbols/Icons with thin strokes (1-2px), sparingly. **Forbidden:** raw inline SVGs or local icon files. Icons are functional, not decorative.

---

## 2. LUXURY / EDITORIAL VISUAL IDENTITY (Mandatory)

### 2.1 Visual Signatures
- **Grayscale Image Treatment:** All images default to `grayscale` filter. Ultra-slow (1500-2000ms) transition to full color on hover. Combined with subtle scale (`group-hover:scale-105`) and shadow deepening. Applied to hero, features, blog, testimonial avatars.
- **Visible Grid Lines:** Fixed vertical lines (4 total) spanning viewport height at 12-column grid boundaries, `w-px`, `--border-default` opacity, `pointer-events: none`. Creates architectural editorial magazine feel.
- **Paper Noise:** Subtle SVG noise texture overlay across entire page at 2% opacity, fixed position, `pointer-events: none`. Mimics expensive paper grain.
- **Vertical Text Labels:** CSS `writing-mode: vertical-rl` for decorative side labels ("Editorial / Vol. 01"). Absolute positioned on image edges. Uppercase, wide tracking. Hidden on mobile, visible desktop.
- **Drop Caps:** Large initial letter (`float-left`, Playfair Display, `7xl`, `leading-[0.8]`, `mr-3`) for introductory paragraphs. Classic editorial feel.
- **Mixed Italic Headlines:** Alternate regular and italic styling within headlines for "spoken" cadence. Gold color on italic words. Examples: "Curated *Excellence*".

### 2.2 Motion — Slow & Cinematic
- All motion feels deliberate, slow, and expensive. Nothing snaps or jumps.
- **Timing:** Button interactions `500ms`. Color transitions `700ms`. Image effects `1500ms`-`2000ms`. Background transitions `700ms`.
- **Easing:** `ease-out` or `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Never `ease-in-out` or `ease-in` (too mechanical).
- **Hover Effects:** Delay feels intentional. Multiple effects layer (scale + color + grayscale). Text changes faster (300ms), backgrounds slower.
- Respect `prefers-reduced-motion`.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component
- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum 44×44px. Height: `h-12` (48px) default, `h-14` large, `h-10` small. Generous horizontal padding (`px-8` to `px-10`). Rectangular, 0px border-radius. Uppercase, `text-xs`, `tracking-[0.2em]`, medium weight.
- **Primary:** Dark background (`--primary`), white text. Hover: gold layer (`--secondary`) slides in from left using `translate-x` transform. Requires layered `<span>` structure with z-index. Initial: `translate-x: -100%` (off-screen). Hover: `translate-x: 0`. Duration `500ms` with luxury easing. Text stays white above gold layer. Shadow deepens on hover.
- **Secondary:** Transparent bg, thin border (`1px solid --primary`), dark text. Hover: bg fills to dark, text inverts to white. `duration-500`.
- **Link:** Text with underline on hover, no bg/border. Dark text, gold on hover optional.
- **Hover:** Visual shift with `cursor: pointer`. Slow, deliberate.
- **Focus:** Minimal: `outline: 1px solid --primary; outline-offset: 2px;` or gold border change.
- **Active/Pressed:** `transform: scale(0.98)` (subtle).
- **Loading:** Disables interactions, prevents double-clicks, CSS spinner. Dimensions must not distort.
- **Disabled:** `opacity: 0.5; pointer-events: none;`
- **Success/Error:** Temporary feedback via `--text-success` / `--text-error` (muted tones).

### 3.2 Card Component
- **Default:** Transparent or subtle background. Definition via single top border (`border-t`) at 1px `--primary`. Generous padding (`p-8` mobile, `p-12` desktop). No border-radius.
- **Featured Cards:** Thicker top border (`border-t-4`) with gold color (`--secondary`) to indicate importance (pricing tiers, special features).
- **Image Cards:** Image in grayscale with slow color reveal on hover. Specific aspect ratios: `aspect-[3/4]` features, `aspect-[4/5]` blog. Combine image scale with parent card hover using `group`.
- **Hover:** Subtle background shift (`hover:bg-[#F9F8F6]/50` — barely visible). Shadow deepens. For testimonials: left border changes to gold, padding increases, avatar gains color.
- **Focus-within:** Highlight borders when child receives focus.
- **Loading (Skeleton):** Shimmer animation in CSS (subtle, no harsh shadow).
- **Empty State:** Google Material Icon (thin stroke) + guidance text.

### 3.3 Form & Input Requirements
- **States:** Empty, Focused (gold border), Filled, Valid (success border), Invalid (error border, red text, error icon), Disabled, Read-only.
- **Normal:** Bottom border only (`border-b`), no other borders. Transparent bg. `--primary` color. Height `h-12`. Minimal horizontal padding.
- **Focus:** Border changes to gold (`--secondary`). No ring or glow — minimal. `outline: none`.
- **Typography:** Input text Inter `text-sm` dark. Placeholder Playfair Display italic, warm grey (`--text-secondary`).
- **Structure:** Flex container with label, input (underline only), dedicated error feedback container (`aria-live`).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all CSS animated (slow, cinematic, 500-700ms transitions, no blur).
- **UX:** Centered flex (`align-items: center`), backdrop overlay (semi-opaque flat — no heavy blur), Google Material Icon close button (thin stroke), keyboard focus trapping, close via `Esc` or overlay clicks. Sharp corners, single border definition.

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing, no horizontal overflow. Rows to columns on small viewports. Maintain core aesthetic on mobile (grayscale images, gold accents, slow animations) — don't default to generic mobile patterns.
- **Smooth Animations:** `transition: var(--transition-normal)` (700ms) on state changes. Image transitions 1500-2000ms. Respect `prefers-reduced-motion` — reduce to 0ms or simpler transitions, keep color changes, remove transforms/scales.
- **Accessibility (a11y):** Charcoal on Alabaster 12.6:1 (AAA). Warm Grey on Alabaster 4.8:1 (AA). Gold on Charcoal 5.2:1 (AA). Never rely on color alone. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback.
- **Mandatory Visual Feedback:** Every click/hover/submission triggers visible state change (gold slide, shadow deepen, grayscale reveal, border change) — slow and deliberate.
- **Destructive Actions:** `.btn-danger` visually distinct in both themes (muted red bg, white text).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond a single deferred entry-point.
- **Naming Convention:** One consistent convention (BEM or fixed utility set) — never mix.
- **No Unrequested Placeholders:** No lorem ipsum where real copy is supplied.
- **Bold Choices to Implement:**
  - Vertical text labels via CSS `writing-mode: vertical-rl` on image edges
  - Drop caps on introductory paragraphs (Playfair Display, 7xl, float-left)
  - Mixed italic headlines with gold color on italic words
  - Grayscale image transitions (1500-2000ms to full color on hover)
  - Visible grid lines (4 fixed vertical lines at column boundaries)
  - Gold sliding animation on primary button hover
  - Decorative horizontal lines (`h-px w-8 md:w-12`) before labels
  - Extreme type scale (text-9xl hero vs text-xs labels)
  - Layered subtle shadows (deepening on hover, never harsh)
  - Testimonial interactions (gold left border, grayscale-to-color avatar, stars scale up)
  - Paper noise texture overlay at 2% opacity
  - Section alternation (light alabaster ↔ dark charcoal) for rhythm

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes.
- **CSS Scope:** Classes only for existing elements.
- **No Behavioral JS:** No JS for validation/popups — ask the user instead.
- **Clarify Before Assuming:** If a style change requires new markup (e.g., layered spans for gold button slide), stop and ask.
- **Luxury Exception:** Vertical text labels, grid lines, paper noise, and decorative horizontal lines are achievable via CSS `::before`/`::after` and `writing-mode` on existing elements — do NOT add new HTML elements. Grayscale filter and slow transitions are CSS-only.