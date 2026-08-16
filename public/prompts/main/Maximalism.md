# Maximalism / Dopamine Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Maximalism / Dopamine** style. Follow every rule below without exception. The deliverable must express Maximalism's visual identity — MORE IS MORE, sensory overload, visual abundance, unapologetic excess, clashing colors, layered patterns, multi-layered shadows, bouncy motion — merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling.
- **Maximalism Exception:** Multi-layered colored shadows (glow + hard stacked), pattern-on-pattern layering (2-3 minimum per section), and text shadow stacks are signatures — enforce via CSS classes. This style is deliberately excessive; if it feels visually overwhelming in a joyful way, it's correct.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Dark Mode Foundation):**
  - `--primary: #FF3AF2` (Hot magenta — electric energy)
  - `--secondary: #00F5D4` (Electric cyan/teal — digital glow)
  - `--accent: #FFE600` (Screaming yellow — attention grabber)
  - `--quaternary: #FF6B35` (Electric orange — warmth chaos)
  - `--quinary: #7B2FFF` (Vivid purple — mystical depth)
  - `--bg-primary: #0D0D1A` (Deep cosmic purple-black — the void)
  - `--bg-secondary: #2D1B4E` (Dark purple — semi-transparent containers)
  - `--text-primary: #FFFFFF` (Pure white — maximum contrast, 19.5:1 on dark)
  - `--text-secondary: rgba(255,255,255,0.8)` (slightly muted)
  - `--text-success: #00F5D4` (cyan for success)
  - `--text-error: #FF3AF2` (magenta for errors)
  - `--border-default: #FF3AF2` (Hot magenta — default border color, borders clash with backgrounds)
  - `--border-error: #FF6B35`
  - `--border-success: #00F5D4`
- **The Five Accent Colors:** Always have 5 distinct accents. Section rotation: each major section cycles through the 5 accents (index % 5). Repeated elements in grids rotate colors using same modulo. No matching — borders clash with backgrounds.
- **Contrast Pairing:** Dark cosmic backgrounds pair with white text. Dark accent text (pure black `#0D0D1A`) on light accents (yellow, light cyan). White text on dark accents (magenta, purple, cyan). Accent colors only for decorative text/labels — never body text.
- **Border Radius & Shadows:**
  - `--radius-sm: 0px` (sharp accent, use sparingly) `--radius-md: 16px` (containers) `--radius-lg: 24px` (cards) `--radius-full: 9999px` (buttons, pills)
  - Mixed radii on different corners for asymmetry.
  - **Glow Shadows (soft, luminous):**
    - `--shadow-glow-sm: 0 0 20px rgba(255,58,242,0.5), 0 0 40px rgba(0,245,212,0.3)`
    - `--shadow-glow-lg: 0 0 40px rgba(255,58,242,0.6), 0 0 80px rgba(255,230,0,0.4), 0 0 120px rgba(123,47,255,0.3)`
  - **Hard Shadows (offset, flat, stacked):**
    - `--shadow-hard-2: 8px 8px 0 #FFE600, 16px 16px 0 #FF3AF2`
    - `--shadow-hard-3: 12px 12px 0 #00F5D4, 24px 24px 0 #FF3AF2, 36px 36px 0 #FFE600`
  - Each layer doubles offset. Colors rotate through accents. Hover: increase offsets by 2-4px.
- **Spacing & Transitions:**
  - `--spacing-gap: 1.5rem`
  - `--transition-fast: 200ms` `--transition-normal: 300ms` `--transition-slow: 500ms`
  - `--ease-standard: ease-out` `--ease-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55)` (overshoot)
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- This style is dark-mode-native. Define a light mode variant under `@media (prefers-color-scheme: light)` and/or `.light`:
  - `--bg-primary: #FFFDF5` (warm cream) `--bg-secondary: #F0E6FF`
  - `--text-primary: #0D0D1A` `--text-secondary: rgba(13,13,26,0.8)`
  - Accents remain vibrant but slightly adjusted for light bg contrast.
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling. **Critical:** Do NOT simplify to "clean minimalism" on mobile — keep the chaos, just stack it vertically. Maintain pattern density (reduce to 1-2 patterns, not zero), accent colors, borders, rotation, offset effects.
- Container: `max-w-7xl` (1280px). Full bleed for hero. Narrow content `max-w-3xl`. **Broken Grid:** Never perfect symmetry — variable columns, `col-span-2` mixed with `col-span-1`, vertical offset (`translate-y-8` on alternating items), varying heights, gap variance.

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS with `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.pattern-dots`, `.pattern-stripes`, `.shadow-multi`, `.animate-float`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Headings Font:** Load **Outfit** (bold, geometric, 700-900) or **Unbounded** from Google Fonts.
- **Body Font:** Load **DM Sans** (clean, readable in chaos, 400-700) from Google Fonts.
- **Display/Accent Font:** Load **Bangers** or **Bungee** (comic energy, use sparingly for special callouts) from Google Fonts.
- Bind to `--font-heading: 'Outfit', sans-serif`, `--font-base: 'DM Sans', sans-serif`, `--font-display: 'Bangers', cursive`.
- **Type Scale (Aggressive):** Hero `text-7xl` to `text-9xl` (72-128px). Section `text-5xl` to `text-7xl`. Subheading `text-2xl` to `text-3xl`. Body `text-lg` to `text-xl`. Small `text-sm` to `text-base`.
- **Type Styling:** Headlines 800-900 weight, body 400-500, labels 700. Headlines `tracking-tight`/`tracking-tighter`, labels `tracking-widest`. Headlines `leading-none`/`leading-tight` (0.9-1.1), body `leading-relaxed` (1.625). Uppercase for headlines, labels, buttons. Mixed weights within same headline for emphasis.
- **Text Shadow System (CRITICAL — Always Use):**
  - Single: `text-shadow: 2px 2px 0px #7B2FFF`
  - Double: `text-shadow: 2px 2px 0px #7B2FFF, 4px 4px 0px #FF3AF2`
  - Triple: `text-shadow: 2px 2px 0px #7B2FFF, 4px 4px 0px #FF3AF2, 6px 6px 0px #00F5D4`
  - Mega: `text-shadow: 4px 4px 0px #7B2FFF, 8px 8px 0px #FF3AF2, 12px 12px 0px #00F5D4`
- **Gradient Text:** 20-30% of headlines. `linear-gradient(90deg, #FF3AF2, #00F5D4, #FFE600, #FF3AF2)`, `background-size: 200-300%`, animated `background-position`, `background-clip: text`, `-webkit-text-fill-color: transparent`.
- **Icons:** Use Google Material Symbols/Icons. **Forbidden:** raw inline SVGs. Stroke width thick (`2.5px`-`3px`). Colors always accent, never muted. Wrapped in colored shapes with `border-4`. Can rotate, bounce, pulse on hover.

---

## 2. MAXIMALISM VISUAL IDENTITY (Mandatory)

### 2.1 Pattern-on-Pattern Layering (MANDATORY)
- Every section must have at least 2 overlapping patterns minimum.
- **Pattern Types:**
  1. **Dot Grid:** `radial-gradient(circle, #FF3AF2 1px, transparent 1px); background-size: 20px 20px;`
  2. **Diagonal Stripes:** `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,230,0,0.08) 10px, rgba(255,230,0,0.08) 20px);`
  3. **Checkerboard:** `conic-gradient(from 90deg at 1px 1px, transparent 90deg, rgba(0,245,212,0.05) 0); background-size: 40px 40px;`
  4. **Gradient Mesh:** Multiple `radial-gradient` overlaps at different positions, 0.1-0.2 opacity.
- **Layering Strategy:** Global base 2 fixed patterns (dots + stripes) on entire page. Section-specific 1-2 unique patterns. Use `::before`/`::after` with `pointer-events: none`. `mix-blend-mode: overlay` or `screen`. Opacity 0.05-0.3 per pattern.

### 2.2 Floating Decorative Shapes
- Scattered shapes (stars, sparkles, circles, squares) and emoji throughout layout.
- Absolute positioned with specific coordinates. Variable sizes (`h-6 w-6` to `h-24 w-24`).
- Filled with accent colors, often animated (float, wiggle, spin-slow, bounce-subtle).
- 5-10 shapes per full-height section minimum.

### 2.3 Massive Background Typography
- Oversized text behind content, partially visible, bleeding off edges.
- `text-[12rem]` to `text-[20rem]`. `opacity-20`, semi-transparent accent or muted.
- Absolute, centered with transform, or bleeding from edge. Single impactful word (WOW, YES, GO).

### 2.4 Motion — Bouncy & Playful
- Nothing static or stiff. 30-40% of elements have continuous animation.
- **Keyframe Animations:** Float (6s), float-reverse (5s), pulse-glow (2s), gradient-shift (4s), spin-slow (20s), wiggle (1s), bounce-subtle (2s).
- Hover: Always combine 2-3 changes (scale 102-110% + color shift + shadow increase). 300ms most, 200ms small.
- Active: scale 95-98%, shadow reduction, slight translate in shadow direction.
- Respect `prefers-reduced-motion` — disable keyframe animations, reduce transitions to 150ms, maintain visual styles.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component
- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum 44×44px. Heights: `h-14 px-10` default, `h-16 px-12` large. `border-radius: var(--radius-full)` (pill). `font-black uppercase tracking-widest`.
- **Primary:** Background gradient across 3 accents `linear-gradient(to right, #FF3AF2, #7B2FFF, #00F5D4)`. Border: `4px solid #FFE600` (clashing yellow). Shadow: combine glow + hard stacked. Hover: scale 110%, intensify shadow (opacity +0.2), shift gradient position. Active: scale 95%, reduce shadow.
- **Secondary:** Transparent bg, `border-4 border-dashed` in accent color. Hover: fill with solid accent, border solid, scale 105%.
- **Outline:** Semi-transparent `bg-secondary/50`, `border-4` in accent, hard stacked shadow (8px/8px + 16px/16px). Hover: translate by negative shadow offset, increase depth. Active: translate to zero, remove shadow.
- **Ghost:** Underline with gradient. Hover: reveal pattern or light fill, scale 105%.
- **Hover:** `cursor: pointer`. Scale + color + shadow combined.
- **Focus:** Double ring system: `outline: 4px solid var(--primary); outline-offset: 4px;` (contrasting accent colors, total 8px minimum). Never rely on color alone — include outline style change.
- **Active/Pressed:** `transform: scale(0.95)`.
- **Loading:** Disables interactions, CSS spinner. Dimensions must not distort.
- **Disabled:** `opacity: 0.5; cursor: not-allowed;` Remove hover/active. Maintain border visibility, reduce saturation.
- **Success/Error:** Temporary feedback via `--text-success` / `--text-error` with glow.

### 3.2 Card Component
- **Default:** Background semi-transparent `bg-secondary/80` with `backdrop-blur-sm`. `border-4` in accent color (rotate per card). `border-radius: var(--radius-lg)` (24px). Hard stacked shadow (8px/8px + 16px/16px in two colors). Generous padding (`p-8` to `p-12`).
- **Asymmetry:** `clip-path` to cut one corner, slight rotation (`rotate-1` or `rotate-2`), offset position (negative margins).
- **Hover:** Rotate more (`hover:rotate-2`), scale `hover:scale-[1.02]`, shadow shift (increase offset 2-4px, add third color). 300ms `ease-out`.
- **Internal Structure:** Header `border-b-4 border-dashed` in different accent. Title: text shadow, uppercase, font-black, `text-2xl`. Description: `text-white/80`.
- **Pattern Overlay:** Add pattern as background or `::before`, opacity 0.1-0.2. Rotate pattern type per card.
- **Focus-within:** Highlight borders when child receives focus.
- **Loading (Skeleton):** Shimmer animation in CSS with glow.
- **Empty State:** Google Material Icon (in colored shape container) + guidance text.

### 3.3 Form & Input Requirements
- **States:** Empty, Focused (double ring + glow), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
- **Normal:** Semi-transparent `bg-secondary/50` with `backdrop-blur-sm`. `border-4` in accent color (thick, colored). `border-radius: var(--radius-full)` for single-line, `var(--radius-md)` for textareas. Generous padding (`px-6 py-4`). `text-lg font-bold text-white`. Placeholder `text-white/40`.
- **Focus:** Border color shifts to different accent. Inner glow: `box-shadow: 0 0 20px rgba(color,0.5)`. Double ring: `outline: 4px solid var(--primary); outline-offset: 4px;`. Background intensifies (less transparent). 300ms transition.
- **Labels:** Display font, accent color, small rotation `rotate-1`. Can pulse/glow on focus.
- **Structure:** Flex container with label, input, dedicated error feedback container (`aria-live`).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all CSS animated (bouncy/playful transitions, glow effects, no boring fades).
- **UX:** Centered flex (`align-items: center`), backdrop overlay (semi-opaque dark with subtle pattern — no heavy blur), Google Material Icon close button (in colored shape), keyboard focus trapping, close via `Esc` or overlay clicks. Card style with hard stacked shadow, `border-4`, rotation.

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing, no horizontal overflow. Rows to columns on small viewports. Maintain pattern density, accent colors, borders, rotation on mobile — don't simplify to minimalism.
- **Smooth Animations:** `transition: var(--transition-normal)` with bouncy easing. Respect `prefers-reduced-motion` — disable keyframe animations, reduce transitions to 150ms, maintain visual styles.
- **Accessibility (a11y):** White on dark 19.5:1 (AAA). Accent colors only for decorative text — never body text or critical info. Double ring system for focus (8px minimum total thickness). Never rely on color alone — include structural change (`outline-dashed`). Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback. Decorative shapes/emoji `aria-hidden="true"`.
- **Mandatory Visual Feedback:** Every click/hover/submission triggers visible state change (scale + rotate + shadow change combined — joyful and exaggerated).
- **Destructive Actions:** `.btn-danger` visually distinct in both themes (error orange bg, white text, glow shadow).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond a single deferred entry-point.
- **Naming Convention:** One consistent convention (BEM or fixed utility set) — never mix.
- **No Unrequested Placeholders:** No lorem ipsum where real copy is supplied.
- **Bold Choices to Implement:**
  - Systematic color rotation through 5 accents (index % 5 per section and grid item)
  - Clashing border colors (never match background — magenta bg → yellow border)
  - Multi-layered shadows (2-3 layers minimum, glow + hard, different accent colors per layer)
  - Pattern-on-pattern layering (2-3 per section, dot grid + stripes + mesh)
  - Floating decorative shapes (5-10 per section, various sizes, animated)
  - Massive background typography (`text-[12rem]` to `text-[20rem]`, opacity 20%, bleeding off edges)
  - Text shadow stacks on all headlines (triple or mega stack)
  - Animated gradient text on 20-30% of headlines
  - Asymmetric element positioning (`translate-y-8` alternating, `rotate-1`/`rotate-2`, negative margins, overlap)
  - Mixed border styles within sections (solid + dashed + dotted, 2-3 different)
  - Emoji as decorative elements (1-2 per major section, `text-6xl` to `text-7xl`, animated)
  - Broken grid (variable columns, varying heights, gap variance)

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes.
- **CSS Scope:** Classes only for existing elements.
- **No Behavioral JS:** No JS for validation/popups — ask the user instead.
- **Clarify Before Assuming:** If a style change requires new markup, stop and ask.
- **Maximalism Exception:** Floating shapes, patterns, massive background text, and decorative emoji are achievable via CSS `::before`/`::after` pseudo-elements and background gradients — do NOT add new HTML elements for decorations. Text shadows, gradient text, multi-layered shadows are all CSS-only.