# Industrial Skeuomorphism Design System — Complete Coding Prompt

You are an expert frontend engineer. Build a complete, production-ready UI in the **Industrial Skeuomorphism** style. Follow every rule below without exception. The deliverable must express Industrial Skeuomorphism's visual identity — tactile precision, mechanical authenticity, neumorphic dual shadows, manufacturing details, material honesty — merged with the mandatory architectural framework.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No Inline CSS:** The `style="..."` attribute is forbidden in HTML.
- **Class/ID Selectors Only:** All design properties, layout rules, and states are targeted via class or ID selectors in `style.css`.
- **Minimal HTML Modifications:** HTML must remain clean, semantic, and agnostic of visual styling.
- **Industrial Exception:** Neumorphic dual shadows (dark bottom-right + light top-left) and manufacturing details (corner screws via radial gradients, vent slots, LED indicators) are the signature of this style and MUST be defined in CSS classes — never inline. Inset/pressed shadows on active states are critical.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens
Store all visual tokens in `:root` (and theme classes) using CSS variables:

- **Colors (Industrial Palette — Light Mode):**
  - `--primary: #ff4757` (Safety Orange/Braun Red — interactive triggers, alerts, LEDs; use sparingly)
  - `--secondary: #2d3436` (Charcoal — dark technical panels)
  - `--bg-primary: #e0e5ec` (Cool mid-tone industrial grey — chassis, Level 0)
  - `--bg-secondary: #f0f2f5` (Slightly lighter raised panel surface)
  - `--bg-muted: #d1d9e6` (Darker grey — recessed areas, input fields, grooves)
  - `--text-primary: #2d3436` (Dark charcoal ink, softer than pure black)
  - `--text-secondary: #4a5568` (Darker slate grey — labels, metadata)
  - `--text-success: #22c55e` (Green — online/active LEDs)
  - `--text-error: #ff4757`
  - `--border-default: #babecc` (Neumorphic shadow color)
  - `--border-light: #ffffff` (Neumorphic highlight color)
  - `--border-dark: #a3b1c6` (Deep shadow for prominent borders)
  - `--border-error: #ff4757`
  - `--border-success: #22c55e`
- **Contrast Pairing:** Light chassis backgrounds pair with dark charcoal text. Dark technical panels (charcoal) pair with white/graded text. Accent (safety orange) pairs with white text.
- **Border Radius & Shadows:**
  - `--radius-sm: 4px` `--radius-md: 8px` `--radius-lg: 16px` `--radius-xl: 24px` `--radius-2xl: 30px` `--radius-full: 9999px`
  - Curves are soft/organic — mimicking injection-molded plastic, not sharp machined metal.
  - **Neumorphic Shadow System (Core Visual Signature):**
    - `--shadow-card: 8px 8px 16px #babecc, -8px -8px 16px #ffffff` (base lift)
    - `--shadow-floating: 12px 12px 24px #babecc, -12px -12px 24px #ffffff, inset 1px 1px 0 rgba(255,255,255,0.5)` (high elevation)
    - `--shadow-pressed: inset 6px 6px 12px #babecc, inset -6px -6px 12px #ffffff` (active state — shadow reverses)
    - `--shadow-recessed: inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff` (inputs, screens, grooves)
    - `--shadow-sharp: 4px 4px 8px rgba(0,0,0,0.15), -1px -1px 1px rgba(255,255,255,0.8)` (mechanical edge)
    - `--shadow-glow: 0 0 10px 2px rgba(255,71,87,0.6)` (LED/status indicator glow; green variant: `rgba(34,197,94,1)`)
- **Spacing & Transitions:**
  - `--spacing-gap: 1.5rem`
  - `--transition-fast: 150ms` `--transition-normal: 300ms`
  - `--ease-standard: cubic-bezier(0.175, 0.885, 0.32, 1.275)` (mechanical spring with subtle bounce)
- **Elevation/Stacking:** `--z-dropdown: 1000` `--z-modal: 1100` `--z-toast: 1200`

### 1.3 Mandatory Dark Mode Support
- Define dark mode tokens under `@media (prefers-color-scheme: dark)` and/or `.dark`:
  - `--bg-primary: #2d3436` (charcoal chassis) `--bg-secondary: #3d4548`
  - `--bg-muted: #1e2425` (deeper recessed)
  - `--text-primary: #e0e5ec` `--text-secondary: #a8b2d1`
  - `--primary: #ff4757` (accent maintains brand consistency)
  - `--border-default: #1a1d1e` `--border-light: #4a5256`
- Neumorphic shadows in dark mode adjust: dark shadow uses deeper charcoal, light highlight uses lifted grey (not pure white).
- Theme switching persists via `localStorage`, falls back to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
- Container: `max-w-[72rem]` (1152px). `px-6` mobile, `px-12` desktop. Section spacing `space-y-24` (96px).
- Hero is asymmetric (60/40 split desktop, stacked mobile). Alternate left/right image placement. Testimonial cards have intentional slight rotation (±1deg).

### 1.5 Framework Default & Tailwind CSS Integration
- Use Tailwind CSS (or custom CSS with `@layer` / `@apply`).
- Utility classes map to CSS variables or reusable class names: `.btn`, `.card`, `.input-group`, `.module`, `.key-btn`, `.led`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Primary Font:** Load **Inter** from Google Fonts (humanist sans, excellent legibility). Weights: 400/500/600/700/800. For body, headings, UI labels.
- **Technical/Monospace Font:** Load **JetBrains Mono** or **Roboto Mono** from Google Fonts. Weights: 400/500. For: all numeric displays (stats, pricing, dates), technical labels/badges, uppercase metadata ("SYSTEM OPERATIONAL", "LOG #123"), input fields (terminal/data entry aesthetic).
- Bind to `--font-base: 'Inter', sans-serif` and `--font-mono: 'JetBrains Mono', monospace`.
- **Hierarchy:** Hero headings 5xl–7xl, weight 800, tight tracking (-0.03em), white text-shadow for embossed effect (`drop-shadow-[0_1px_1px_#ffffff]`). Labels: xs–sm, weight 700, uppercase, wide tracking, monospace — "stamped/printed label" appearance.
- **Icons:** Use Google Material Symbols/Icons. **Forbidden:** raw inline SVGs or local icon files. Stroke width 1.5px standard, 2–4px for bold emphasis. Icon housing: recessed circular divs with `--shadow-floating`.

---

## 2. INDUSTRIAL SKEUOMORPHISM VISUAL IDENTITY (Mandatory)

### 2.1 The Physics Engine
- **Consistent Light Source:** All lighting from top-left at 45 degrees. Highlights on top/left edges, shadows on bottom/right. Deviation breaks the illusion.
- **Material Conservation:** Elements don't magically appear — they slide from behind panels, lights turn on, drawers open. Animations respect causality.
- **Elevation Hierarchy:** Level -1 (recessed: inputs, screens, slots — inner shadows), Level 0 (chassis base), Level +1 (panels: cards, modules — dual shadows), Level +2 (floating controls: buttons, knobs — enhanced shadows, optional glow for active states).
- **Interaction Physics:** Active states reverse shadow direction (pressed = inner shadows). Hover states increase elevation. Transitions use mechanical easing with subtle bounce.

### 2.2 Textures & Patterns
- **Noise Overlay:** SVG-based fractal noise at 20–30% opacity with `mix-blend-overlay` — simulates micro-texture of matte plastic. Applied to page background.
- **Carbon Fiber Pattern:** External texture at 10–20% opacity on tech-heavy sections (device bezels, dark panels). `mix-blend-overlay` or `multiply`.
- **Scanlines (CRT):** `linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%); background-size: 100% 4px;` on digital display elements.
- **Grid Patterns (Blueprint):** `linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px); background-size: 40px 40px; opacity: 0.1;` for technical sections.
- **Radial Gradients:** Subtle white/transparent gradients top-left to reinforce lighting direction.

### 2.3 Manufacturing Details (Signature Elements — Never Omit)
- **Corner Screws:** CSS radial gradients simulate screw indentations at exactly 12px from edges:
  ```css
  background: radial-gradient(circle at 12px 12px, rgba(0,0,0,0.15) 2px, transparent 3px),
              radial-gradient(circle at calc(100% - 12px) 12px, rgba(0,0,0,0.15) 2px, transparent 3px),
              radial-gradient(circle at 12px calc(100% - 12px), rgba(0,0,0,0.15) 2px, transparent 3px),
              radial-gradient(circle at calc(100% - 12px) calc(100% - 12px), rgba(0,0,0,0.15) 2px, transparent 3px);
  ```
- **Vent Slots:** Vertical pill-shaped divs (1px width, 24px height) in top-right corner with inset shadows. Place 3 in a row with `gap-1`.
- **LED Status Indicators:** Small circular divs (8–12px) with solid color fill, `animate-pulse`, glow shadow `0 0 10px rgba(color,1)`. Pair with monospace label ("SYSTEM OPERATIONAL", "PWR", "ONLINE").
- **Physical Connectors/Pipes:** Horizontal cylindrical pipe connecting step nodes: `h-3 w-full rounded-full bg-[#d1d9e6] shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]`. Hidden on mobile.
- **Push Pins & Hanging Holes:** Testimonials: red circular push-pin at top center. Pricing cards: circular hole at top with inner shadow (punched metal).

### 2.4 Motion — Mechanical Spring Physics
- Easing: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — subtle overshoot/bounce.
- Fast interactions: `duration-150` to `duration-200`. Smooth: `duration-300`. Image/scale: `duration-500`.
- **Key Micro-interactions:** Button press (`active:translate-y-[2px]` + shadow inversion, 150ms), card hover (`-translate-y-1` elevation + shadow upgrade, 300ms), icon hover (`group-hover:scale-110` + `group-hover:rotate-12`, 200ms), image hover (grayscale→color, 500ms), LED pulse (`animate-pulse`).
- Respect `prefers-reduced-motion`.

---

## 3. COMPONENT DESIGN SPECIFICATIONS

### 3.1 Button Component ("Physical Keys")
- **Default:** `display: flex; align-items: center; justify-content: center; gap: 0.5rem;`. Minimum 44×44px (48px min on mobile). Uppercase, wide tracking (0.05em), weight 700.
- **Primary (Accent):** Background `#ff4757`, white text, `border: 1px solid rgba(255,255,255,0.2)` (rim). Shadow: `4px 4px 8px rgba(166,50,60,0.4), -4px -4px 8px rgba(255,100,110,0.4)` (neumorphic red-tinted). `border-radius: var(--radius-lg)`.
- **Secondary (Chassis):** Background matches chassis (`#e0e5ec`), dark text, `--shadow-card`. Hover darkens text to accent color.
- **Ghost (Flat Label):** No background. Text muted. Hover applies muted background + recessed shadow.
- **Hover:** Slight brightness increase (`brightness-110`) or text color change. Shadow remains.
- **Active (Pressed) — CRITICAL:** `translate-y-[2px]` (moves down 2px). Shadow inverts to `inset 6px 6px 12px #babecc, inset -6px -6px 12px #ffffff`. Transition 150ms for immediate tactile feedback.
- **Focus:** Accent-colored ring with offset: `outline: 2px solid var(--primary); outline-offset: 2px;`
- **Loading:** Disables interactions, prevents double-clicks, CSS spinner (border technique, 1s linear). Dimensions must not distort.
- **Disabled:** `opacity: 0.5; filter: grayscale(1); cursor: not-allowed;`
- **Success/Error:** Temporary feedback via `--text-success` / `--text-error` glow states.

### 3.2 Card Component ("Bolted Modules")
- **Default:** Background chassis (`#e0e5ec`), `--shadow-card` (neumorphic dual shadow), `border-radius: var(--radius-lg)` (16px). Flexible flexbox layout. Optional `elevated` prop increases shadow to `--shadow-floating`.
- **Manufacturing Details:** Corner screws (radial gradients), vent slots (pill divs with inset shadows) — never omit.
- **Hover:** Cards lift: `hover:-translate-y-1` with shadow transition to `--shadow-floating` (300ms ease-out). Group child icons rotate/scale.
- **Focus-within:** Highlight borders when child link/button receives focus.
- **Loading (Skeleton):** Shimmer animation in CSS to prevent layout jumps.
- **Empty State:** Google Material Icon (in recessed circular housing) + guidance text.

### 3.3 Form & Input Requirements ("Data Slots")
- **States:** Empty, Focused (glow), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
- **Normal:** Recessed well: `--shadow-recessed` (inset shadow), no visible border (depth via shadow alone), background matches chassis, `border-radius: var(--radius-md)`, monospace font. Placeholder: muted text at 50% opacity. Min height 56px, generous padding (24px horizontal).
- **Focus:** Accent-colored glow: `box-shadow: var(--shadow-recessed), 0 0 0 2px var(--primary);` — simulates LED backlight activating.
- **Structure:** Flex container with label (monospace, uppercase, "stamped"), input, dedicated error feedback container (`aria-live`).

### 3.4 Modal / Popup Requirements
- **States:** Opening, Open, Loading, Success/Error, Closing — all CSS animated (mechanical spring easing, shadow transitions).
- **UX:** Centered flex (`align-items: center`), backdrop overlay (semi-opaque flat — no heavy blur), Google Material Icon close button (in neumorphic housing), keyboard focus trapping, close via `Esc` or overlay clicks. Card style: bolted module with corner screws.

---

## 4. CORE UX & MICRO-INTERACTION RULES

- **Responsive by Default:** Fluid sizing, no horizontal overflow. Rows to columns on small viewports. Physical metaphor persists across breakpoints.
- **Smooth Animations:** Mechanical spring easing. Respect `prefers-reduced-motion`.
- **Accessibility (a11y):** Sufficient contrast in light/dark. Never rely on color alone (LED glow pairs with label text). Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback.
- **Mandatory Visual Feedback:** Every click/hover/submission triggers visible state change (shadow inversion, elevation, glow, grayscale→color).
- **Destructive Actions:** `.btn-danger` visually distinct in both themes (safety orange/red bg, white text, red-tinted neumorphic shadow).

---

## 5. DELIVERABLES & OUTPUT FORMAT

- **File Structure:** Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond a single deferred entry-point.
- **Naming Convention:** One consistent convention (BEM or fixed utility set) — never mix.
- **No Unrequested Placeholders:** No lorem ipsum where real copy is supplied.
- **Signature Elements to Implement:**
  - Hero "Device" visualization: 3D device mockup in CSS (outer bezel with carbon fiber, inner screen with scanlines, hardware buttons, power LED, abstract dashboard with glowing elements).
  - LED status indicators on navbar, hero badge, footer, device visualization — always paired with monospace labels.
  - Physical connectors/pipes in "How It Works" (hidden on mobile).
  - Grayscale-to-color image treatment on blog/testimonial images (`grayscale` → `group-hover:grayscale-0`, 500ms).
  - Screw heads and vent slots on all cards consistently.

---

## 6. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements:** Never introduce new HTML tags, components, or DOM nodes.
- **CSS Scope:** Classes only for existing elements.
- **No Behavioral JS:** No JS for validation/popups — ask the user instead.
- **Clarify Before Assuming:** If a style change requires new markup, stop and ask.
- **Industrial Exception:** Manufacturing details (corner screws, vent slots, LEDs) are achievable via CSS `::before`/`::after` pseudo-elements and background gradients on existing elements — do NOT add new HTML elements for them. Use CSS-only decoration.