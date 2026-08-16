# Vaporwave / Outrun Design System — Coding Prompt

## Design Philosophy

**"Digital Nostalgia meets Neon Future — A synthetic reality drenched in retro-futuristic excess."**

A bold celebration of 1980s retro-futurism, vaporwave aesthetics, and early computer graphics. The design transports users to a synthetic digital dimension where neon lights pierce through infinite grids, CRT scanlines distort reality, and every interaction feels like commanding a vintage terminal from the year 2088.

### Core Aesthetic DNA

**Visual Language:** High-contrast maximalism with unapologetic neon saturation. Nothing is subtle. Every element glows, transforms, or pulses with digital energy. The design rejects minimalism in favor of dense, layered visual effects that create depth through overlapping gradients, glows, scanlines, and perspective distortions.

**Emotional Tone:** Nostalgic yet futuristic. Simultaneously retro (80s arcade cabinets, VHS tapes, early Windows UIs) and forward-looking (cyberpunk cityscapes, holographic interfaces, digital utopias). The mood is dreamy, synthetic, slightly surreal.

**Design Pillars:**
1. **The Infinite Grid**: Perspective-transformed wireframe grids receding toward the horizon — iconic outrun highway feeling
2. **Neon Glow Supremacy**: Hot magenta, electric cyan, and sunset orange with aggressive drop shadows and box shadows that make elements appear to emit light
3. **CRT Scanlines & Distortion**: Global overlay of horizontal scanlines and subtle RGB chromatic aberration mimicking old CRT monitors
4. **Terminal/Command-Line Interfaces**: Text prefixed with `>` symbols, monospace fonts, window chrome with colored dots, status bars
5. **Geometric Transformation**: Skewed containers, rotated icons, perspective grids — elements are rarely perfectly aligned
6. **Gradient Mania**: Multi-stop gradients everywhere — text fills, backgrounds, borders, glows. Especially the iconic sunset gradient (yellow → orange → pink → purple)

### Interaction Philosophy

**Hover States Are Theatrical:** Buttons don't just change color — they un-skew, explode with glow, scale up, and invert colors. Icons rotate. Cards lift off the page. Every interaction is a micro-event.

**The "Anti-Patterns" (What This Is NOT):**
- Not Flat: Aggressive use of shadows, glows, gradients, and depth
- Not Minimalist: Dense with effects, borders, patterns, and overlays
- Not Corporate: Playful, artistic, experimental
- Not Muted: Colors are 100% saturated; contrasts are extreme

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS

Keep all styling strictly inside a dedicated CSS file (`style.css`):

* **No Inline CSS:** Explicitly forbid the use of the `style="..."` attribute in HTML. **Exception:** Perspective grid transforms (e.g., `transform: perspective(500px) rotateX(60deg)`) must be defined as CSS classes (`.perspective-grid`) referencing CSS variables, not inline styles.
* **Class/ID Selectors Only:** Require all design properties, layout rules, and states to be targeted via class or ID selectors.
* **Minimal HTML Modifications:** HTML structure must remain clean, semantic, and agnostic of visual styling so that changing the site's look requires modifying only the CSS file, not the markup.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens

Store all visual tokens inside `:root` (and theme classes) using CSS variables. Merge the Vaporwave palette with the required token set:

* **Colors:**
  - `--primary: #FF00FF` (Hot Magenta — primary CTAs, highlights, avatars, feature icons, accent borders)
  - `--secondary: #00FFFF` (Electric Cyan — links, focus rings, secondary borders, hover states, card title glows)
  - `--bg-primary: #090014` (Near-black with purple tint — the infinite digital void)
  - `--bg-secondary: rgba(26, 16, 60, 0.8)` (Semi-transparent deep purple — glass panels with backdrop blur)
  - `--text-primary: #E0E0E0` (Light silver-gray — readable yet retro)
  - `--text-secondary: rgba(224, 224, 224, 0.7)` (dimmed body text)
  - `--text-success: #00FF00` (neon green success)
  - `--text-error: #FF3333` (bright red error)
  - `--border-default: #2D1B4E` (Muted dark purple — non-interactive borders/dividers)
  - `--border-error: #FF3333`
  - `--border-success: #00FF00`
  - `--tertiary: #FF9900` (Sunset Orange — special highlights, "sun" gradients)
  - `--card: #1a103c` (deep purple card background)
  - `--ring: #00FFFF` (focus rings — cyan)
* **Gradient Combinations:**
  - `--gradient-sunset: linear-gradient(to right, #FF9900, #FF00FF, #00FFFF)` (signature vaporwave gradient for text fills)
  - `--gradient-glow: linear-gradient(to bottom, #FF9900, #FF00FF)` (floating "sun" background element)
  - `--gradient-accent-bar: linear-gradient(to right, #FF00FF, #00FFFF)` (sharp gradient for top borders/accent lines)
* **Contrast Pairing:** Dark purple-black background (`#090014`) pairs with light silver-gray text (`#E0E0E0`). Magenta/cyan fills pair with black or white text depending on luminance. Glass panels (`rgba(26,16,60,0.8)`) pair with `--text-primary`.
* **Light Mode Background:** Vaporwave is dark-mode-only by design. **Exception to mandatory light mode:** The Vaporwave aesthetic is inherently dark — neon glows require a dark void. If a light mode is forced, use `#fefefe` background with dark neon text, but this breaks the aesthetic intent. Dark mode is the default and primary mode.
* **Border Radius & Shadows:**
  - `--radius-sm: 0px` (Aggressively geometric and angular — `rounded-none` is primary)
  - `--radius-md: 0px`
  - `--radius-lg: 0px` (Occasional `rounded-full` for dots/circles only)
  - `--shadow-sm: 0 0 10px #FF00FF` (magenta glow)
  - `--shadow-md: 0 0 20px #FF00FF` (intense magenta glow)
  - `--shadow-lg: 0 0 50px rgba(0, 255, 255, 0.2)` (large area cyan glow)
  - `--shadow-cyan: 0 0 20px rgba(0, 255, 255, 0.2)` (cyan container glow)
  - `--shadow-cyan-input: 0 0 15px #00FFFF` (cyan input glow on focus)
  - `--shadow-accent-lg: 0 8px 24px rgba(0, 82, 255, 0.35)` (featured elements)
* **Spacing & Transitions:**
  - `--spacing-gap: 2rem` (32px — gap-8 for grids)
  - `--transition-fast: 200ms` (fast, unnatural, digital)
  - `--transition-normal: 300ms`
  - `--ease-standard: linear` (no organic easing curves — mechanical, retro-digital)
* **Elevation/Stacking:**
  - `--z-dropdown: 100`
  - `--z-modal: 1000`
  - `--z-toast: 2000`
  - `--z-grid: 0` (background perspective grid)
  - `--z-scanlines: 50` (global CRT scanline overlay — fixed)
* **Typography Tokens:**
  - `--font-heading: 'Orbitron', sans-serif` (weights: 400, 500, 700, 900 — geometric, wide, futuristic)
  - `--font-base: 'Share Tech Mono', monospace` (weight: 400 — technical, terminal-like, fixed-width)
  - `--font-mono: var(--font-base)`
* **Text Effects:**
  - `--text-glow-heading: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))` (white text glow)
  - `--text-glow-magenta: drop-shadow(0 0 30px rgba(255, 0, 255, 0.6))` (gradient text glow)
  - `--text-glow-cyan: drop-shadow(0 0 5px rgba(0, 255, 255, 0.8))` (card title glow)

### 1.3 Mandatory Dark Mode Support

Vaporwave is inherently a dark-mode design. The default theme IS dark mode.

* **Implementation:** The `:root` tokens are already dark. Define a `.light` class for the inverted (optional) light scheme if needed:
  - `.light { --bg-primary: #fefefe; --text-primary: #090014; --bg-secondary: rgba(240, 220, 255, 0.8); --border-default: #4B0082; }`
* **Theme Switching:** Background and text CSS variables switch seamlessly without requiring HTML restructuring.
* **Persistence:** User theme choice persists via `localStorage`, falling back to `prefers-color-scheme` on first visit; require a visible toggle control with correct `aria-pressed`/`aria-label` state.

### 1.4 Flexbox Layout & Mobile-First Alignment

Build layout structures using Flexbox (`display: flex`):

* **Default Alignment Rule:** Every flex container **must default to `align-items: center`** unless there is an explicitly justified exception.
* **Mobile-Friendly First:** All flex layouts must be mobile-responsive. Stack to single column on mobile (`grid-cols-1`). Scale down headings by 1-2 sizes. Full-width CTA buttons in hero, stacked vertically. Maintain neon borders and grid backgrounds on all screen sizes — non-negotiable. Prevent horizontal scrolling.
* **Container Width:** `max-w-7xl` for main content, `max-w-6xl` for pricing, `max-w-4xl` for FAQ/Final CTA, `max-w-5xl` for hero.
* **Grid Usage:** Features: `grid-cols-1 md:grid-cols-3`. Stats: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. Blog: `grid-cols-1 md:grid-cols-3`. Benefits: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Pricing: `grid-cols-1 md:grid-cols-3`.
* **Z-Index Layering:** 1. Background grid (fixed, `z-0`) 2. Floating sun gradient (fixed) 3. Section backgrounds 4. Content (`z-10`) 5. Scanline overlay (fixed, `z-50`).

### 1.5 Framework Default & Tailwind CSS Integration

Use Tailwind CSS (or clean custom CSS driven by Tailwind's `@layer` / `@apply` directives). All utility classes must map back to CSS variables or generic reusable class names (`.btn`, `.card`, `.input-group`, `.terminal-window`, `.perspective-grid`, `.scanline-overlay`, `.gradient-text`).

### 1.6 Typography & Icons (Google Fonts Mandatory)

* **Text:** Include Google Font `<link>` tags for `Orbitron` (weights: 400, 500, 700, 900) and `Share Tech Mono` (weight: 400). Bind `--font-heading` to Orbitron, `--font-base` to Share Tech Mono.
* **Type Scale:**
  - Hero Headlines: `text-5xl` to `text-9xl` (80px-128px) with responsive scaling. Split across multiple lines for drama. Use `bg-clip-text text-transparent` with `--gradient-sunset` for gradient text fill.
  - Section Headings: `text-3xl` to `text-6xl`. Always bold/black weight. All-caps preferred.
  - Card/Component Titles: `text-2xl` (24px). Cyan color with `--text-glow-cyan`.
  - Body Text: `text-lg` to `text-xl`. Generous line-height for readability.
  - UI Labels/Buttons: `text-sm` to `text-lg`, all-caps, wide tracking (`tracking-wider`, `tracking-widest`).
* **Icons:** Use Google Material Symbols/Icons. Explicitly forbid raw inline SVGs. Color: always the primary terminal color (magenta or cyan). Style: pixelated/low-fi if possible, strict `stroke-width: 2`.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements

Style all states via CSS classes:

* **Default (Primary):** Flex layout (`display: flex; align-items: center; justify-content: center; gap: 0.5rem;`). Minimum touch target of 44x44px (`h-12` default, `h-9` sm, `h-14` lg). Skewed container: `transform: skewX(-12deg)`. Border: `2px solid var(--secondary)` (cyan). Background: transparent. Text: `var(--secondary)` (cyan). No border radius (0px). Uppercase, tracking-wider, `var(--font-base)`. Inner content is counter-skewed: `transform: skewX(12deg)`.
* **Hover:** Un-skews (`skewX(0)`), background fills with `var(--secondary)` (cyan), text becomes black (inverted), `box-shadow: 0 0 20px var(--secondary)` (explosive glow). Cursor: `pointer`.
* **Focus:** Distinct focus ring using CSS variables (`outline: 2px solid var(--ring); outline-offset: 2px;`) for keyboard navigation.
* **Active/Pressed:** Click transform feedback (`transform: scale(0.97)`).
* **Loading:** Disables interactions, prevents double-clicks, and renders a CSS spinner (neon rotating ring) without distorting button dimensions.
* **Disabled:** Reduced opacity (`opacity: 0.5`), greyscale, and `cursor: not-allowed`.
* **Success/Error:** Temporary feedback state styles driven by `--text-success` or `--text-error`.
* **Secondary Button:** Skewed (`skewX(-12deg)`). Border: `2px solid var(--primary)` (magenta). Background: `var(--primary)`. Text: white. On hover: un-skews, `scale(1.05)`, `opacity: 0.8`.
* **Outline Button:** Border: `2px solid var(--primary)`. Background: transparent. Text: `var(--primary)`. On hover: background fills `var(--primary)`, text becomes white.
* **Ghost Button:** Text: `var(--text-primary)`. No border. On hover: `background: rgba(0,255,255,0.1)`, text: `var(--secondary)`.
* **Danger Variant:** `.btn-danger` uses `--text-error` fill with black text; visually distinct in both themes.

### 2.2 Card Component Requirements

* **Default (Standard Card):** Border: `1px solid rgba(255, 0, 255, 0.3)`. Top border: `2px solid var(--secondary)` (cyan laser accent). Background: `rgba(26, 16, 60, 0.8)` with `backdrop-filter: blur(8px)` (glass-morphism). No border radius (0px). Padding: `p-6`. Card title: `var(--font-heading)`, semibold, `text-2xl`, `var(--secondary)` (cyan), `drop-shadow: var(--text-glow-cyan)`. Card description: `var(--font-base)`, `var(--text-secondary)`, `text-sm`.
* **Hover:** Translate upward (`translate-y(-2px)`), increase shadow (glow amplification — 2-3x base glow). Cursor: `pointer` if interactive.
* **Focus-within:** Highlights card borders (brighten to full `var(--secondary)` or `var(--primary)`) when a child link/button receives focus.
* **Loading (Skeleton):** Shimmer animation styling defined in CSS to prevent layout jumps. Neon glow pulse skeleton.
* **Empty State:** Structured fallback layout featuring a Google Icon and clear guidance text in monospaced font with `>` prompt prefix.
* **Terminal Window Container:** Outer border: `2px solid var(--secondary)`. Background: `rgba(0, 0, 0, 0.8)`. `box-shadow: var(--shadow-cyan)`. Title bar: `background: rgba(0,255,255,0.1)`, `border-bottom: 1px solid var(--secondary)`, `px-4 py-2`. Window control dots: three circles (magenta, cyan, orange).
* **File Explorer Window:** Container: `border: 2px solid rgba(224,224,224,0.2)`, `background: rgba(26,16,60,0.9)`, `backdrop-filter: blur(8px)`. Title bar: `background: rgba(224,224,224,0.1)`, `border-bottom: 2px solid rgba(224,224,224,0.2)`. Status bar: `border-top: 2px solid rgba(224,224,224,0.2)`, `background: var(--bg-primary)`, `color: rgba(224,224,224,0.5)`, `text-xs`.

### 2.3 Form & Input Requirements

* **States:** Empty, Focused (border to `var(--secondary)` cyan, `box-shadow: var(--shadow-cyan-input)`, `outline: none`), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
* **Structure:** Flex container wrapping a label, input field, and dedicated error feedback container.
* **Style (Terminal-Style Input):** Underline only: `border-bottom: 2px solid var(--primary)`. Background: black. Text: `var(--secondary)` (cyan), `var(--font-base)`, `text-lg`. Padding: `px-3 py-2`. Placeholder: `rgba(255, 0, 255, 0.5)`. Focus: `border-color: var(--secondary)`, `box-shadow: var(--shadow-cyan-input)`, `outline: none`.

### 2.4 Modal / Popup Requirements

* **States:** Opening, Open, Loading, Success/Error, Closing (all animated via CSS transitions — snappy, mechanical, retro-digital like a CRT warming up).
* **UX Features:** Centered flex container (`align-items: center`), backdrop overlay (with scanlines and chromatic aberration), Google Icon close button, keyboard focus trapping, and support for closing via `Esc` or overlay clicks.
* **Styling:** Terminal window chrome — 2px neon borders, glass-morphism background, no radius, aggressive glow shadows. Title bar with colored dots.

---

## 3. CORE UX & MICRO-INTERACTION RULES

* **Responsive by Default:** Fluid sizing and responsive breakpoints without horizontal overflow. Mobile: scale down headings by 1-2 sizes. Stack to single column. Full-width CTA buttons in hero, stacked vertically. Timeline: left-aligned with offset instead of alternating. Maintain neon borders (essential to vibe). Slightly reduce glow intensity on mobile. Keep perspective grids but simplify. Touch targets: minimum 44px (`h-12` and `h-14`). Tablet: 2 columns before 3/4. Show full navigation on tablets.
* **Smooth Animations:** CSS transitions on all state changes (`transition: all var(--transition-fast) var(--ease-standard)`, `transition: all var(--transition-normal)`), respecting `prefers-reduced-motion`. Philosophy: Snappy, mechanical, retro-digital. `duration-200 ease-linear` — fast, unnatural, digital. No organic easing curves.
* **Hover Transformations:**
  - Buttons: Un-skew, fill with color, invert text, explode glow (2-3x intensity)
  - Cards: Translate upward (`-translate-y-2`), increase shadow
  - Icons: Rotate 45° or scale
  - Links: Add underline, change color, add glow
* **Continuous Animations:**
  - Trust indicator: `animate-pulse` for attention
  - Terminal cursor: blinking effect
  - Icons: `animate-pulse` on placeholders
* **Accessibility (a11y):** High contrast inherent (neon on dark). Never rely solely on color to communicate state — use text labels, icons, and borders. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback. Ensure neon text on dark backgrounds meets AA contrast requirements. `--text-primary` (#E0E0E0) on `--bg-primary` (#090014) exceeds AA. Reduce glow intensity if it affects readability.
* **Mandatory Visual Feedback:** Every user click, hover, or submission must trigger a visible state change (un-skew, glow explosion, color inversion, scale). Every interaction is a micro-event — theatrical and dramatic.
* **Destructive Actions:** `.btn-danger` must be visually distinct in both themes — red neon glow with `--text-error`.

---

## 4. DELIVERABLE & OUTPUT FORMAT

* **File Structure:** Separate `index.html`, `style.css`, and `script.js` files. No inline `<script>` blocks beyond a single deferred entry-point reference.
* **Naming Convention:** Enforce one consistent class-naming convention (BEM or fixed utility set) across the entire deliverable — never mix conventions.
* **No Unrequested Placeholders:** Prohibit lorem-ipsum-only submissions where the user supplied real copy/labels; placeholders are allowed only where content was genuinely left unspecified.

---

## 5. EDIT MODE — MODIFYING AN EXISTING UI

When the request targets existing markup/code rather than a from-scratch build:

* **No New Elements:** Never introduce new HTML tags, components, or DOM nodes. Work only within the existing element/class structure.
* **CSS Scope:** Define CSS classes only for elements that already exist in the project's markup — never invent classes for elements that aren't there. Perspective grid transforms must be applied via CSS classes, not inline styles.
* **No Behavioral JS:** Do not write JavaScript for form validation, popups/modals, or utility/helper functions. When such logic is requested, ask the user how they want it handled instead of generating it.
* **Clarify Before Assuming:** If a requested style change cannot be achieved without adding markup, stop and ask the user.

---

## 6. BOLD CHOICES (NON-NEGOTIABLE SIGNATURES)

1. **Aggressive Skewing:** Buttons and badges use `transform: skewX(-12deg)`, creating dynamic diagonal shapes that un-skew on hover for a kinetic morphing effect. Inner content is counter-skewed (`skewX(12deg)`).
2. **Global CRT Scanlines:** Fixed overlay across entire viewport with `linear-gradient(rgba(18,16,20,0) 50%, rgba(0,0,0,0.25) 50%)` at `100% 4px` background-size. `pointer-events: none`, `z-index: var(--z-scanlines)`.
3. **RGB Chromatic Aberration:** Subtle `linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))` overlay.
4. **Perspective Grid Backgrounds:** Multiple sections use CSS perspective transforms: `background-image: linear-gradient(transparent 95%, #FF00FF 95%), linear-gradient(90deg, transparent 95%, #FF00FF 95%); background-size: 40px 40px; transform: perspective(500px) rotateX(60deg) translateY(-100px) scale(2); mask-image: linear-gradient(to bottom, transparent, black);` — the iconic receding grid effect.
5. **Gradient Text Fills:** Hero headlines use multi-stop gradient backgrounds clipped to text (`background: var(--gradient-sunset); -webkit-background-clip: text; background-clip: text; color: transparent;`).
6. **Rotating Icon Containers:** Feature icons sit inside `rotate(45deg)` diamond containers that spin to `rotate(90deg)` on hover.
7. **Dual-Border Patterns:** Cards combine a bright cyan top border (`border-top: 2px solid var(--secondary)`) with subtle pink side borders for layered neon tube aesthetic.
8. **Terminal/Window Chrome:** Multiple UI patterns mimic vintage OS interfaces — window title bars with colored dots (magenta, cyan, orange), file explorer layouts, command prompts.
9. **Massive Blurred Sun:** Giant gradient orb in background (`600px` diameter with `blur(100px)`, `background: var(--gradient-glow)`, `opacity: 0.2`) creates atmospheric depth.
10. **Glowing Hover Amplification:** Interactive elements don't just highlight — they explode with 2-3x glow intensity and trigger color inversions.
11. **Zero Radius:** `0px` border radius is primary. Aggressively geometric and angular. Occasional `border-radius: 9999px` for dots/circles only.
12. **Neon Glow Shadows:** Everything emits light. Shadows are colored glows, not dark drops. `box-shadow: 0 0 10px #FF00FF` standard, `0 0 20px` intense, `0 0 50px` large area.

🤖