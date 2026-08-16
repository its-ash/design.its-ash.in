# Linear / Modern Dark Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Linear / Modern Dark** style. Follow every rule below without exception. The deliverable must express this style's visual identity — precision, depth, fluidity, layered ambient lighting, animated gradient blobs, mouse-tracking spotlights, multi-layer shadows, expo-out micro-interactions — merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling.
- **Modern Dark Exception:** Multi-layer background system (4 stacked gradients + noise + grid), animated gradient blobs, mouse-tracking spotlights, and multi-layer shadows are signatures — enforce via CSS classes. Near-blacks (#050506, never pure #000000). Off-white text (#EDEDEF, never pure #FFFFFF).

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Deep Space with Ambient Light):**
  - `--primary: #5E6AD2` (Indigo — primary interactive color, buttons, links, glows)
  - `--secondary: #6872D9` (Accent bright — hover state for primary)
  - `--bg-primary: #050506` (Primary page canvas — near-black, not pure black)
  - `--bg-secondary: #0a0a0c` (Elevated surfaces, mock interfaces)
  - `--bg-deep: #020203` (Absolute darkest — footer, deepest layers)
  - `--text-primary: #EDEDEF` (Primary text — bright but not pure white)
  - `--text-secondary: #8A8F98` (Body text, descriptions, metadata)
  - `--text-muted: rgba(255,255,255,0.60)` (Tertiary text, placeholders)
  - `--text-success: #34D399`
  - `--text-error: #F87171`
  - `--border-default: rgba(255,255,255,0.06)` (Subtle hairline borders)
  - `--border-hover: rgba(255,255,255,0.10)` (Border on hover)
  - `--border-accent: rgba(94,106,210,0.30)` (Accent-tinted for emphasis)
  - `--border-error: rgba(248,113,113,0.30)`
  - `--border-success: rgba(52,211,153,0.30)`
- **Surface Tokens:** `--surface: rgba(255,255,255,0.05)` (card backgrounds). `--surface-hover: rgba(255,255,255,0.08)`.
- **Accent Glow:** `--accent-glow: rgba(94,106,210,0.3)` (glow effects, ambient lighting).
- **Contrast Pairing:** Near-black backgrounds pair with off-white text. Accent (indigo) pairs with white text. Muted text (`#8A8F98`) for descriptions. Never pure black or pure white.
- **Border Radius & Shadows:**
  - `--radius-sm: 8px` (buttons, inputs) `--radius-md: 12px` (icon containers) `--radius-lg: 16px` (cards, containers, large containers) `--radius-full: 9999px` (badges, pills)
  - **Multi-Layer Shadow Formula:**
    - `--shadow-card: 0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)`
    - `--shadow-card-hover: 0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.1)`
    - `--shadow-accent: 0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)` (CTA glow)
    - `--shadow-inner: inset 0 1px 0 0 rgba(255,255,255,0.1)` (top edge highlight)
- **Spacing & Transitions:**
  - `--spacing-gap: 1.5rem`
  - `--transition-fast: 200ms` `--transition-normal: 300ms`
  - `--ease-standard: cubic-bezier(0.16, 1, 0.3, 1)` (expo-out — swift and decisive, never bouncy)
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- This style is dark-mode-native. Define a light mode variant under `@media (prefers-color-scheme: light)` and/or `.light`:
  - `--bg-primary: #FAFAFA` `--bg-secondary: #F0F0F2` `--bg-deep: #E5E5E7`
  - `--text-primary: #1A1A1C` `--text-secondary: #6B6B72` `--text-muted: rgba(0,0,0,0.60)`
  - `--primary: #5E6AD2` (maintains) `--surface: rgba(0,0,0,0.03)` `--surface-hover: rgba(0,0,0,0.05)`
  - `--border-default: rgba(0,0,0,0.08)` `--border-hover: rgba(0,0,0,0.12)`
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
- **Asymmetric Bento Grids:** Feature grids should NOT be uniform. 6-column base on desktop. Mix `col-span-2`, `col-span-3`, `col-span-4`. Variable row heights (`auto-rows-[180px]`). One "hero" card spanning 4 columns and 2 rows.
- Section padding: `py-24` to `py-32`. Card padding: `p-6` to `p-8`. Element gaps: `gap-4` to `gap-8`.

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS with `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.glass-card`, `.spotlight`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Font:** Load **Inter** or **Geist Sans** from Google Fonts. Weights: 300–700. Semibold (600) for headings.
- Bind to `--font-base: 'Inter', system-ui, sans-serif`.
- **Type Scale & Weights:** Display `text-7xl` to `text-8xl` semibold `tracking-[-0.03em]`. H1 `text-5xl` to `text-6xl` semibold `tracking-tight`. H2 `text-3xl` to `text-4xl` semibold. H3 `text-xl` to `text-2xl` semibold. Body Large `text-lg` to `text-xl` normal. Body `text-sm` to `text-base` normal. Label `text-xs` mono `tracking-widest`.
- **Gradient Text:** Headlines use gradient fills: `linear-gradient(to bottom, white, rgba(255,255,255,0.7))` with `background-clip: text; color: transparent;`. Accent gradient: `linear-gradient(to right, #5E6AD2, indigo-400, #5E6AD2)` animated shimmer.
- **Line Heights:** Headlines `leading-tight` or `leading-none`. Body `leading-relaxed`.
- **Icons:** Use Google Material Symbols/Icons. **Forbidden:** raw inline SVGs or local icon files.

---

## 2. LINEAR / MODERN DARK VISUAL IDENTITY (Mandatory)

### 2.1 Layered Ambient Lighting (Background System)
The background is never flat. It's a composition of multiple layers:
- **Layer 1 — Base Gradient:** `radial-gradient(ellipse at top, #0a0a0f 0%, #050506 50%, #020203 100%)` — vertical depth.
- **Layer 2 — Noise Texture:** SVG noise at `opacity: 0.015` — tactile quality, prevents banding.
- **Layer 3 — Animated Gradient Blobs:** Large (900-1400px), heavily blurred (`blur-[150px]`) shapes create ambient light pools:
  - Primary blob: Top-center, 900×1400px, accent at 25% opacity.
  - Secondary blob: Left side, 600×800px, purple/pink mix at 15% opacity.
  - Tertiary blob: Right side, 500×700px, indigo/blue mix at 12% opacity.
  - Bottom accent: pulsing animation, accent at 10% opacity.
  - Animation: `float` keyframe (translateY 0→-20px, rotate 0→1deg, 8-10s ease-in-out infinite).
- **Layer 4 — Grid Overlay:** 64px grid pattern at `opacity: 0.02` — technical precision.

### 2.2 Mouse-Tracking Spotlights
- Interactive surfaces respond to cursor position with radial gradient glows (300px diameter, accent at 15% opacity).
- Opacity transitions on hover. Creates "magical" interaction feel.

### 2.3 Motion — Precision Micro-Interactions
- All animations 200-300ms with expo-out easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Movements are tiny (4-8px max). Scale changes subtle (0.98-1.02). Nothing bounces or overshoots.
- Hover: minimal movement (`y: -4px` to `-8px`), border brightens, glow increases, subtle scale.
- Entrance: Fade up (`opacity: 0→1`, `y: 24px→0`), scale in (`opacity: 0→1`, `scale: 0.95→1`), stagger children (0.08s delay).
- Scroll-triggered: viewport threshold 15-20%, once: true.
- Parallax (hero): opacity fades 1→0 over first 50% scroll, scale 1→0.95, y position 0→100px.
- Respect `prefers-reduced-motion`.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component
- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum 44×44px. `border-radius: var(--radius-sm)` (8px). Inset shadow instead of border.
- **Primary:** Solid `--primary` background, white text. Multi-layer shadow with accent glow: `--shadow-accent`. Hover: slightly brighter (`--secondary`), increased glow. Active: `scale-[0.98]`, reduced shadow. Shine effect: pseudo-element gradient sweep on hover.
- **Secondary:** Background `--surface` (rgba(255,255,255,0.05)), `--text-primary` text, inset shadow only. Hover: `--surface-hover`, subtle outer glow.
- **Ghost:** Transparent bg, muted foreground text. Hover: `--surface`, text brightens.
- **Hover:** `cursor: pointer`. Border brightens, glow increases. 200-300ms expo-out.
- **Focus:** `outline: 2px solid var(--primary); outline-offset: 2px;` (ring with accent at 50% opacity, offset matches bg).
- **Active/Pressed:** `transform: scale(0.98)` (subtle).
- **Loading:** Disables interactions, prevents double-clicks, CSS spinner. Dimensions must not distort.
- **Disabled:** `opacity: 0.5; cursor: not-allowed;`
- **Success/Error:** Temporary feedback via `--text-success` / `--text-error` glow.

### 3.2 Card Component
- **Default:** Background `linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`. Border: `1px solid --border-default` (6% white opacity). `border-radius: var(--radius-lg)` (16px). Inner glow line: 1px gradient at top edge. Multi-layer shadow (`--shadow-card`). Optional mouse-tracking spotlight effect.
- **Variants:** `default` (standard glass), `glass` (more translucent with `backdrop-blur`), `gradient` (subtle accent gradient overlay).
- **Hover:** Border brightens to `--border-hover`, shadow upgrades to `--shadow-card-hover` (with accent glow at 10%), subtle `translate-y: -4px`. 200-300ms expo-out.
- **Border Gradients on Hover:** Animated gradient borders that fade in: `linear-gradient(to bottom, rgba(94,106,210,0.3), transparent)` with mask-composite technique.
- **Focus-within:** Highlight borders when child receives focus.
- **Loading (Skeleton):** Shimmer animation in CSS with subtle glow.
- **Empty State:** Google Material Icon + guidance text.

### 3.3 Form & Input Requirements
- **States:** Empty, Focused (accent border + glow ring), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
- **Normal:** Background `--bg-secondary` (#0a0a0c). Border `1px solid --border-default` (10% white). `border-radius: var(--radius-sm)` (8px). Text `--text-primary`. Placeholder `rgba(255,255,255,0.40)`.
- **Focus:** Border `--primary` with accent glow ring: `box-shadow: 0 0 0 2px rgba(94,106,210,0.3)`. 200ms.
- **Structure:** Flex container with label, input, dedicated error feedback container (`aria-live`).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all CSS animated (expo-out 200-300ms, fade + scale, backdrop blur).
- **UX:** Centered flex (`align-items: center`), backdrop overlay (semi-opaque `--bg-primary` with `backdrop-blur-xl`), Google Material Icon close button, keyboard focus trapping, close via `Esc` or overlay clicks. Card style: glass effect with multi-layer shadow. Mobile menu: animated slide-down with opacity + y transform (200ms).

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing, no horizontal overflow. Rows to columns on small viewports. Section padding scales: `py-16` mobile → `py-24` tablet → `py-32` desktop. Bento grids: single column mobile, full asymmetric desktop.
- **Smooth Animations:** `transition: var(--transition-normal)` (300ms) with expo-out easing. Respect `prefers-reduced-motion` — provide fallbacks for parallax and floating animations, essential interactions work without animation.
- **Accessibility (a11y):** Primary text on dark ~15:1 (✓). Muted text on dark ~6:1 (✓). Accent on dark 4.5:1 minimum for interactive. Always visible focus rings using accent color, ring-offset matches background. Don't rely solely on accent color for meaning — use icons, labels, position. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback.
- **Mandatory Visual Feedback:** Every click/hover/submission triggers visible state change (border brightens, glow increases, subtle scale, shadow upgrade).
- **Destructive Actions:** `.btn-danger` visually distinct in both themes (error red bg, white text, red glow shadow).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond a single deferred entry-point.
- **Naming Convention:** One consistent convention (BEM or fixed utility set) — never mix.
- **No Unrequested Placeholders:** No lorem ipsum where real copy is supplied.
- **Bold Choices to Implement:**
  - Animated ambient blobs (multiple layered, floating gradient shapes, 8-10s float animation)
  - Mouse-tracking spotlights on interactive surfaces (radial gradient follows cursor, 300px, 15% opacity)
  - Gradient typography (vertical white→semi-transparent, animated accent gradient with shimmer)
  - Multi-layer shadows on every elevated surface (border highlight + soft diffuse + ambient darkness + optional accent glow)
  - Parallax/scroll effects on hero (fade, scale, translate on scroll)
  - Precision micro-interactions (200-300ms expo-out, 4-8px movements, 0.98-1.02 scale, never bouncy)
  - Asymmetric bento grids (varying spans, variable heights, one hero card)
  - Subtle hairline borders (6-10% white opacity, nearly invisible, brighten on hover)
  - Noise texture overlay at 0.015 opacity
  - Grid overlay at 0.02 opacity (64px pattern)
  - Border gradients on hover (animated, fade in, mask-composite technique)
  - Inner highlight on buttons/elevated surfaces (`inset 0 1px 0 0 rgba(255,255,255,0.1)`)

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes.
- **CSS Scope:** Classes only for existing elements.
- **No Behavioral JS:** No JS for validation/popups — ask the user instead.
- **Clarify Before Assuming:** If a style change requires new markup, stop and ask.
- **Modern Dark Exception:** Animated blobs, noise texture, grid overlay, and mouse-tracking spotlights are achievable via CSS `::before`/`::after` pseudo-elements and background gradients — do NOT add new HTML elements. Multi-layer shadows and border gradients are CSS-only. Mouse-tracking spotlight requires JS for cursor tracking — if existing markup cannot support it, ask the user.