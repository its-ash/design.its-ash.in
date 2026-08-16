# Material You (Material Design 3) Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Material You (MD3)** style. Follow every rule below without exception. The deliverable must express Material You's visual identity — personal, adaptive, spirited, tonal surfaces, organic shapes, pill buttons, state layers, rich micro-interactions — merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling.
- **Material You Exception:** Organic blur shapes, state layer overlays (opacity-based), and tonal surface system are signatures — enforce via CSS classes. Never use pure white for backgrounds; always use tinted Surface color.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Light Mode — Purple/Violet seed #6750A4):**
  - `--primary: #6750A4` (Rich purple — seed color)
  - `--secondary: #E8DEF8` (Light lavender tint — secondary container)
  - `--bg-primary: #fefefe` (Slightly warm off-white Surface — never pure #ffffff; use #FFFBFE)
  - `--bg-secondary: #F3EDF7` (Surface Container — subtle tinted surface, one step darker)
  - `--bg-muted: #E7E0EC` (Surface Container Low — inputs, recessed surfaces)
  - `--text-primary: #1C1B1F` (On Surface — near-black with warmth)
  - `--text-secondary: #49454F` (On Surface Variant — secondary text, icons)
  - `--text-success: #2E7D32`
  - `--text-error: #B3261E`
  - `--tertiary: #7D5260` (Complementary mauve/dusty rose — FABs, accents)
  - `--border-default: #79747E` (Outline — medium gray)
  - `--border-error: #B3261E`
  - `--border-success: #2E7D32`
- **Contrast Pairing:** Tinted surfaces pair with On Surface text. Primary/tertiary backgrounds pair with white text. Never use pure white for backgrounds.
- **Border Radius & Shadows:**
  - `--radius-sm: 8px` (chips) `--radius-md: 12px` (small cards) `--radius-lg: 16px` (default cards) `--radius-xl: 24px` (prominent cards) `--radius-2xl: 28px` (dialogs) `--radius-3xl: 32px` to `48px` (hero sections) `--radius-full: 9999px` (buttons, chips, badges, FABs)
  - `--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)` (elevation 1 — cards at rest)
  - `--shadow-md: 0 4px 12px rgba(0,0,0,0.08)` (elevation 2 — hover)
  - `--shadow-lg: 0 8px 24px rgba(0,0,0,0.12)` (elevation 3 — FABs, major sections)
  - Soft, diffuse shadows. Near-black with low opacity (5-15%).
- **Spacing & Transitions:**
  - `--spacing-gap: 1.5rem`
  - `--transition-fast: 200ms` `--transition-normal: 300ms`
  - `--ease-standard: cubic-bezier(0.2, 0, 0, 1)` (Material You signature easing — "Emphasized Decelerate")
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- Define dark mode tokens under `@media (prefers-color-scheme: dark)` and/or `.dark`:
  - `--bg-primary: #1C1B1F` `--bg-secondary: #211F26`
  - `--text-primary: #E6E1E5` `--text-secondary: #CAC4D0`
  - `--primary: #D0BCFF` `--secondary: #332D41` `--tertiary: #E8DEF8`
  - `--border-default: #938F99`
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
- Container: `max-w-7xl` with responsive padding. Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Gap: `gap-6` (24px) or `gap-8` (32px). Generous whitespace encouraged.

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS with `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.pill-btn`, `.fab`, `.tonal-surface`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Font:** Load **Roboto** from Google Fonts (canonical Material Design typeface). Weights: 400 (Regular), 500 (Medium), 700 (Bold). Medium (500) as default for headings (friendly, approachable). Regular (400) for body.
- Bind to `--font-base: 'Roboto', sans-serif`.
- **Type Scale (MD3):** Display Large 3.5rem/56px. Headline Large 3rem/48px. Headline Medium 2rem/32px. Title Large 1.5rem/24px. Body Large 1.25rem/20px. Body Medium 1rem/16px. Label Medium 0.875rem/14px. Label Small 0.75rem/12px.
- **Letter Spacing:** Headings normal to tight (0 to -0.01em). Body normal. Labels slightly wide (0.01em).
- **Line Height:** Display/Headlines 1.2-1.3. Body 1.5-1.6. Compact UI 1.4.
- **Icons:** Use Google Material Symbols/Icons. **Forbidden:** raw inline SVGs or local icon files.

---

## 2. MATERIAL YOU VISUAL IDENTITY (Mandatory)

### 2.1 Tonal Surface System
- NEVER use pure white for backgrounds — always use tinted Surface color (`--bg-primary: #FFFBFE`).
- Layer surfaces for depth: Background → Surface Container (`--bg-secondary`) → Surface Container Low (`--bg-muted`).
- Color difference is subtle but creates depth without heavy shadows.

### 2.2 Organic Blur Shapes (Signature)
- Large circular or pill-shaped divs with heavy blur (`blur-3xl`, 64px+).
- Use primary, secondary, tertiary colors at 10-30% opacity.
- Layer multiple shapes in major sections (Hero, Benefits, Final CTA).
- Combine with radial gradients for atmospheric depth.
- Position partially off-canvas with transforms (`-translate-x-1/4`, `translate-y-1/3`).
- Creates atmospheric, dynamic backgrounds that feel alive.

### 2.3 State Layer System (Key Concept)
- Instead of changing base color, overlay a semi-transparent layer:
  - **Solid Color Elements (buttons with bg):** Hover: base color at 90% (`bg-primary/90`). Active: 80% (`bg-primary/80`).
  - **Transparent Elements (ghost/text buttons):** Hover: primary at 10% (`bg-primary/10`). Active: 5% (`bg-primary/5`).
- Smooth `cubic-bezier(0.2, 0, 0, 1)` easing. Enhanced with scale transforms, shadow elevations, glow effects.

### 2.4 Motion — Smooth & Confident
- Easing: `cubic-bezier(0.2, 0, 0, 1)` — smooth, confident, neither robotic nor bouncy.
- Duration: Micro-interactions 200ms. Standard transitions 300ms. Large surfaces 400-500ms. Never exceed 500ms for UI transitions.
- Scale on press: `active:scale-95` for tactile feedback. Hover lift: subtle `translate-y` (1-2px) + shadow increase.
- Entrance: Fade + slight scale or slide. Exit: faster than entrance (200ms vs 300ms).
- Respect `prefers-reduced-motion`.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component
- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum 44×44px. ALL buttons `rounded-full` (pill-shaped) — except FABs which are `rounded-2xl`. Heights: Small `h-9` (36px), Default `h-10` (40px), Large `h-12` (48px). Horizontal padding generous (`px-6` to `px-8`).
- **Filled (Primary):** Background `--primary`, white text. No shadow at rest, `--shadow-md` on hover. State layer: `bg-primary/90` hover, `/80` active. `active:scale-95`.
- **Tonal (Secondary):** Background `--secondary` (secondary container), `--text-primary` text. State layer similar.
- **Outlined:** Transparent bg, `1px solid --border-default`, `--primary` text. State layer: `bg-primary/5` on hover.
- **Text/Ghost:** Transparent bg, `--primary` text. State layer: `bg-primary/10` on hover.
- **FAB:** Background `--tertiary`, white text. `rounded-2xl` (28px) or `rounded-full`. `--shadow-md` at rest, `--shadow-lg` on hover. Size 56×56px.
- **Hover:** State layer overlay + `cursor: pointer`. Smooth 300ms easing.
- **Focus:** `outline: 2px solid var(--primary); outline-offset: 2px;`
- **Active/Pressed:** `transform: scale(0.95)` (tactile press feedback).
- **Loading:** Disables interactions, prevents double-clicks, CSS spinner. Dimensions must not distort.
- **Disabled:** `opacity: 0.5; cursor: not-allowed; pointer-events: none;`
- **Success/Error:** Temporary feedback via `--text-success` / `--text-error` state layers.

### 3.2 Card Component
- **Default:** Background `--bg-secondary` (Surface Container — never pure white). `border-radius: var(--radius-xl)` (24px, Large). No border by default — tonal background for separation. `--shadow-sm` at rest. Generous padding (`p-6` to `p-8`).
- **Hover:** `--shadow-md` + `hover:scale-[1.02]` for interactive cards. 300ms with standard easing. Group pattern for coordinated animations.
- **Nested Cards:** Lighter backgrounds or transparent with borders. On colored container: `bg-white/10` with `border-white/10`.
- **Special Containers:** Hero sections `rounded-[48px]` with surface container bg. Glass-morphism: `bg-white/10 backdrop-blur-sm border border-white/10`.
- **Focus-within:** Highlight borders when child receives focus.
- **Loading (Skeleton):** Shimmer animation in CSS to prevent layout jumps.
- **Empty State:** Google Material Icon + guidance text.

### 3.3 Form & Input Requirements (Material 3 Filled Text Field)
- **States:** Empty, Focused (primary border), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
- **Normal:** Top corners rounded (`rounded-t-lg` / 12px), bottom corners square. Bottom border: `2px solid --border-default`. Background `--bg-muted` (Surface Container Low). Height `h-14` (56px).
- **Focus:** Bottom border changes to `--primary`. 200ms color transition. No outline ring — border serves as indicator.
- **Label:** Placeholder uses `--text-primary` at 50% opacity.
- **Structure:** Flex container with label, input (filled text field style), dedicated error feedback container (`aria-live`).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all CSS animated (smooth 400-500ms, Material You easing, no harsh transitions).
- **UX:** Centered flex (`align-items: center`), backdrop overlay (semi-opaque flat or subtle blur), Google Material Icon close button, keyboard focus trapping, close via `Esc` or overlay clicks. `border-radius: var(--radius-2xl)` (28px). Tonal surface background.

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing, no horizontal overflow. Rows to columns on small viewports. Border radius scales down on mobile (48px → 24px). Padding reduces proportionally.
- **Smooth Animations:** `transition: var(--transition-normal)` (300ms) with `cubic-bezier(0.2, 0, 0, 1)` easing. Respect `prefers-reduced-motion` — reduce/remove scale transforms, translate animations. Keep color transitions.
- **Accessibility (a11y):** Text on Surface 4.5:1 minimum. Text on Primary AAA (white). Outline 3:1 against surfaces. Never rely on color alone. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback. Decorative blur shapes `aria-hidden="true"`. Icon-only buttons need accessible labels.
- **Mandatory Visual Feedback:** Every click/hover/submission triggers visible state change (state layer overlay, shadow elevation, scale on press, glow).
- **Destructive Actions:** `.btn-danger` visually distinct in both themes (error color bg, white text).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond a single deferred entry-point.
- **Naming Convention:** One consistent convention (BEM or fixed utility set) — never mix.
- **No Unrequested Placeholders:** No lorem ipsum where real copy is supplied.
- **Bold Choices to Implement:**
  - Organic blur shapes with layering (multiple `blur-3xl` shapes in primary/secondary/tertiary at 10-30% opacity, positioned off-canvas)
  - Tonal surface system with shadow progression (`shadow-sm` rest → `shadow-md` hover → `shadow-lg` important)
  - Pill-shaped buttons with `active:scale-95` tactile feedback
  - Large organic border radii (32px-48px for hero, 24px for cards)
  - State layer interaction model (opacity overlays, not color shifts)
  - Asymmetric elevation for featured pricing tier (`md:-translate-y-4` + `ring-2 ring-primary`)
  - Rich micro-interactions (image zoom `group-hover:scale-105`, card `hover:scale-[1.02]`, glow reveal on hover, translate-x on list items)
  - Radial gradients for subtle color washes in backgrounds
  - Glass-morphism cards where appropriate (`backdrop-blur-sm` with `bg-white/10`)

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes.
- **CSS Scope:** Classes only for existing elements.
- **No Behavioral JS:** No JS for validation/popups — ask the user instead.
- **Clarify Before Assuming:** If a style change requires new markup, stop and ask.
- **Material You Exception:** Organic blur shapes and background decorations are achievable via CSS `::before`/`::after` pseudo-elements with `blur` filter — do NOT add new HTML elements. State layers are CSS opacity overlays on existing elements.