# Coding Prompt: Crypto / Bitcoin DeFi Design System Implementation

You are tasked with building a complete web UI in the **Crypto / Bitcoin DeFi** design style—a sophisticated fusion of precision engineering, cryptographic trust, and digital gold. This is not generic dark mode; it is a deep cosmic void where data structures glow with the warmth of Bitcoin orange and the brilliance of digital gold.

**Core Design Principles**:
1. **Luminescent Energy**: Light emanates from interactive elements themselves. Bitcoin orange glows, golden highlights shimmer, and data points pulse with life against the true void background. Shadows are colored (orange/gold tints), not just black.
2. **Mathematical Precision**: Everything follows strict geometric rules. Ultra-thin 1px borders define boundaries, monospace fonts display data with technical accuracy, and grids provide the underlying structure of the blockchain aesthetic.
3. **Layered Depth**: Create three-dimensional space through transparency stacking (glass morphism), colored glow shadows, and backdrop blur effects. Elements float in Z-space without heavy skeuomorphism—it's digital depth, not physical.
4. **Textured Void**: Backgrounds are never flat. Subtle grid patterns (representing blockchain networks), radial gradient blurs (representing energy fields), and noise textures bring the void to life. The darkness breathes.
5. **Trust Through Design**: High contrast, clear hierarchy, and technical precision communicate security and reliability. The aesthetic says "your assets are safe here."

**The vibe is Secure, Technical, and Valuable**. This is digital gold—it should feel premium, cutting-edge, and engineered to perfection. Think Bitcoin mining rigs humming in the darkness, glowing with orange heat.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML.
- **Exception**: Grid patterns, radial gradient blurs, and noise textures may be applied via CSS pseudo-elements on `body::before`/`body::after` without new HTML nodes.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (Dark Mode Only - True Void + Bitcoin Fire):
```css
:root {
  --bg-primary: #030304;
  --bg-secondary: #0F1115;
  --text-primary: #FFFFFF;
  --text-secondary: #94A3B8;
  --muted: #94A3B8;
  --border-default: #1E293B;
  --border-error: #FF3366;
  --border-success: #FFD600;
  --primary: #F7931A;
  --secondary: #EA580C;
  --tertiary: #FFD600;
  --accent-foreground: #030304;
  --text-success: #FFD600;
  --text-error: #FF3366;
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-display: "Space Grotesk", sans-serif;
  --font-base: "Inter", sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-orange-glow: 0 0 20px -5px rgba(234,88,12,0.5);
  --shadow-orange-glow-lg: 0 0 30px -5px rgba(247,147,26,0.6);
  --shadow-gold-glow: 0 0 20px rgba(255,214,0,0.3);
  --shadow-card-elevation: 0 0 50px -10px rgba(247,147,26,0.1);
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.3);
  --spacing-gap: 2rem;
  --transition-fast: 200ms ease-out;
  --transition-normal: 300ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
  --gradient-primary: linear-gradient(to right, #EA580C, #F7931A);
  --gradient-gold: linear-gradient(to right, #F7931A, #FFD600);
}
```

**Contrast Pairing Rules**: White (`#FFFFFF`) on true void (`#030304`): maximum contrast. Stardust (`#94A3B8`) on void: sufficient for secondary text. Bitcoin orange (`#F7931A`) on void: excellent for accents/headings. Digital gold (`#FFD600`) for highlights. Use `#fefefe` instead of `#ffffff` where a near-white is needed for backgrounds in light mode.

### 1.3 Mandatory Dark Mode Support
Crypto is inherently dark mode (True Void). However, you MUST implement a light mode variant:
- **Light Mode (Daylight Ledger)**: Under `@media (prefers-color-scheme: light)` and/or `.light` class. `--bg-primary: #FAFAF8` (warm off-white, use `#fefefe` where needed), `--bg-secondary: #FFFFFF`, `--text-primary: #030304` (near-black), `--text-secondary: #475569`, `--border-default: #E2E8F0`. Bitcoin orange remains `#F7931A` but shadows become darker tints. Grid patterns use light gray lines.
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Technical toggle (sun/moon Google Material Symbol in orange-bordered rounded container).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-first: single column by default, expand to grids on larger screens.
- **Responsive Grids**: Mobile single column. Tablet `md:grid-cols-2` or `md:grid-cols-3`. Desktop keep `md:grid-cols-3` or `lg:grid-cols-4` for features. Pricing always `md:grid-cols-3` for tier comparison.
- No horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.glass-card`, `.glow-button`, `.grid-pattern`, `.orbital-ring`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Headings**: `"Space Grotesk", sans-serif` (Google Font). Geometric grotesque with quirky technical character. Weights: 400, 500, 600, 700. Apply `font-heading` class.
- **Body**: `"Inter", sans-serif` (Google Font). Highly legible sans-serif optimized for screens. Weights: 400, 500, 600. Apply `font-body` class.
- **Mono/Data**: `"JetBrains Mono", monospace` (Google Font). Technical monospace for precision. Weights: 400, 500. Usage: Stats, prices, badges, technical labels, navigation links. Apply `font-mono` class.
- **Scale Philosophy**: Dramatic contrast between display and body. Heroes massive (`text-4xl` → `md:text-7xl`), body comfortable (`text-base` or `text-lg`). Mobile-first scaling.
- **Leading & Tracking**: Tight leading on headings (`leading-tight`), relaxed on body (`leading-relaxed`). Uppercase mono text gets generous tracking (`tracking-wider`, `tracking-widest`).
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs. Default stroke 1.5-2px. Colors: orange (`#F7931A`), gold (`#FFD600`), muted (`#94A3B8`), white.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
Buttons are bold, pill-shaped, and emit colored light. All use `rounded-full` for the signature crypto pill shape.

**Primary (Default)**:
- **Default**: Background `bg-gradient-to-r from-[#EA580C] to-[#F7931A]`. Text: White, bold, uppercase with `tracking-wider`. Shadow: `shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)]`. Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min height 44px (touch-friendly).
- **Hover**: `scale-105` + intensified shadow `shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)]`. `cursor: pointer`.
- **Focus**: Distinct orange focus ring via CSS variables.
- **Active**: `transform: scale(0.97)`.
- **Loading**: Disabled, CSS orange spinner, no dimension distortion.
- **Disabled**: `opacity: 0.5`, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success` (gold) or `--text-error` (red-pink).

**Outline**: Transparent background. Border `border-2 border-white/20`. Text: White. Hover: `border-white` + `bg-white/10`.
**Ghost**: Transparent, no border. Text: White. Hover: `bg-white/10` + `text-[#F7931A]`.
**Link**: Text `text-[#F7931A]`. Hover: underline.
All buttons include smooth `transition-all` for responsive micro-interactions.
**Danger Button**: Red-pink (`#FF3366`) border/text. Hover: red-pink bg. Distinct in both themes. Never use orange/gold for destructive.

### 2.2 Card Component Requirements (The "Block" Concept)
Cards are elevated surfaces that float above the void, representing blocks in the chain.

**Standard Card**:
- Background: `bg-[#0F1115]` (Dark Matter surface). Border: `border border-white/10` (subtle boundary). Radius: `rounded-2xl` (16px). Padding: `p-8` (generous spacing). Flex (`align-items: center; justify-content: center; gap: 0.5rem`).
- **Default**: Dark Matter surface, subtle white/10 border.
- **Hover**: `hover:-translate-y-1` (lift) + `hover:border-[#F7931A]/50` + `hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)]`. Transition: `transition-all duration-300`.
- **Focus-within**: Highlights when child receives focus.
- **Loading (Skeleton)**: Orange-tinted shimmer animation.
- **Empty State**: Google Material Symbol (e.g., `account_balance_wallet` or `search_off`) in orange-glowing container + guidance text in Stardust.

**Glass Cards** (Floating/Special):
- Background: `bg-black/40` or `bg-white/5`. Backdrop: `backdrop-blur-sm` or `backdrop-blur-lg`. Border: `border border-white/10`. Creates translucent, floating effect.

**Pricing Cards**: Highlighted tier: `scale-105`, `border-[#F7931A]`, elevated z-index, `shadow-[0_0_40px_-10px_rgba(247,147,26,0.15)]`. Others: Lower opacity (`opacity-80`), scale up on hover.

**Card Hierarchy**: Header `p-8 pb-4`. Title `font-heading font-semibold text-2xl`. Description `text-[#94A3B8] text-sm`. Content `p-8 pt-0`. Footer `p-8 pt-0`.

### 2.3 Form & Input Requirements
Minimalist, precise input fields with bottom-border styling for a technical aesthetic.

**Structure**: Background `bg-black/50` (semi-transparent dark). Border: Bottom border only - `border-b-2 border-white/20`. Height h-12 (48px). Padding `px-4 py-2`. Text `text-white text-sm`. Placeholder `placeholder:text-white/30`. Font: Inter.
**States**: Empty (default), Focused (border `focus-visible:border-[#F7931A]`, glow `focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]`, no outline `focus-visible:outline-none`), Filled, Valid (gold border + checkmark icon), Invalid (red-pink border + error icon + red text), Disabled (`disabled:opacity-50 disabled:cursor-not-allowed`), Read-only.
Inputs feel like data entry terminals—clean, precise, and purposeful.
**Structure**: Flex container with label, input, error feedback container.

### 2.4 Modal / Popup Requirements
**States** (all animated via CSS transitions, precise and snappy):
- **Opening**: Fade in backdrop + scale up content from 0.95 to 1.0 over 300ms (precise, like a high-performance trading terminal).
- **Open**: Centered flex container (`align-items: center`), backdrop overlay with void tint + blur. Content in a `rounded-2xl` Dark Matter card with `border-white/10` and orange glow shadow on hover.
- **Loading**: Orange CSS spinner inside modal content area.
- **Success/Error**: Temporary feedback with gold or red-pink accents.
- **Closing**: Reverse of opening animation over 300ms.

**UX Features**:
- Backdrop overlay: semi-transparent void with `backdrop-blur-sm`.
- Close button: Google Material Symbol (`close`) in an orange-bordered rounded container, top-right of modal.
- Keyboard focus trapping: focus remains within modal while open.
- Support closing via `Esc` key or overlay click.
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` pointing to modal title (in Space Grotesk).

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

### 3.1 Gradient Text on Headlines (MANDATORY)
Apply `bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent` to final 1-2 words of hero headlines. Creates instant visual hierarchy and Bitcoin brand association.

### 3.2 Spinning Orbital Rings (MANDATORY)
Hero section features animated 3D-style orb with CSS rotating rings (`animate-[spin_10s_linear_infinite]` and reverse). Floating stat cards bounce around it with staggered delays.

### 3.3 Corner Border Accents (MANDATORY)
"How It Works" cards use decorative corner borders (`border-t border-l` on top-left, `border-r border-b` on bottom-right) in Bitcoin orange, creating a "selected node" effect.

### 3.4 Glowing Animated Badges (MANDATORY)
Pulsing dot badges (`animate-ping`) on trust indicators and status markers. Suggests live network activity.

### 3.5 Background Icon Watermarks (MANDATORY)
Large, rotated, low-opacity icons in feature card backgrounds that reveal on hover (`opacity-20 group-hover:opacity-100`).

### 3.6 Timeline as Blockchain (MANDATORY)
"How It Works" uses a vertical gradient line (orange to transparent) with numbered circular nodes, mimicking a blockchain ledger.

### 3.7 Asymmetric Pricing Scale (MANDATORY)
The popular pricing tier is `scale-105` and elevated, while others are `opacity-80`, creating intentional hierarchy through scale manipulation.

### 3.8 Glass Morphism with Grid Patterns (MANDATORY)
Combine `backdrop-blur` with background grid patterns visible through transparency, creating layered depth.

### 3.9 Colored Shadows Replace Black (MANDATORY)
ALL shadows use orange/gold tints. No pure black shadows exist in this design system.

### 3.10 Grid Pattern (Signature) (MANDATORY)
```css
background-size: 50px 50px;
background-image: linear-gradient(to right, rgba(30, 41, 59, 0.5) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 1px, transparent 1px);
mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
```
Creates a fading grid that disappears toward edges (vignette effect). Used on hero section.

### 3.11 Radial Gradient Blurs (MANDATORY)
Massive, soft color blobs for ambient lighting. Position absolutely, use low opacity (5-10%), apply `blur-[120px]` or `blur-[150px]`. Creates depth and guides eye to focal points.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Container Width**: `max-w-7xl` (1280px) - wide and expansive.
- **Section Padding**: Generous vertical `py-24` (96px).
- **Density**: Spacious approach with `gap-8` (32px) or `gap-12` (48px) between grid items.
- **Section Dividers**: NO hard lines or `<hr>` elements. Sections separate through vertical spacing (`py-24`), alternating backgrounds (`bg-[#030304]` → `bg-[#0F1115]` → `bg-[#030304]`), and subtle top/bottom borders on specific sections.
- **Responsive Grids**: Mobile-first single column. Tablet `md:grid-cols-2` or `md:grid-cols-3`. Desktop `md:grid-cols-3` or `lg:grid-cols-4` for features. Pricing always `md:grid-cols-3`.
- No horizontal scrolling.

### 4.2 Animation & Motion
Motion should feel **precise, snappy, and purposeful**—like a high-performance trading terminal.

**Custom Float Animation** (MANDATORY):
```css
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
.animate-float { animation: float 8s ease-in-out infinite; }
```
Applied to hero 3D orb graphic. Slow, smooth, endless float creates ethereal quality.

**Spinning Orbitals** (MANDATORY): `animate-[spin_10s_linear_infinite]` for outer ring. `animate-[spin_15s_linear_infinite_reverse]` for inner ring (reverse direction).

**Hover Effects**: Cards lift (`hover:-translate-y-1`) + border glows orange. Buttons: `scale-105` + intensified glow shadow. Links: color shift to orange + underline.
**Transitions**: `transition-all duration-300` for smooth micro-interactions.
**Respect `prefers-reduced-motion`**: Disable all animations.

### 4.3 Accessibility (a11y)
- **Contrast**: White (`#FFFFFF`) on true void (`#030304`): maximum contrast. Stardust (`#94A3B8`) on void: sufficient for secondary. Bitcoin orange on void: excellent.
- Never rely on color alone. Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**: Visible ring on all interactive elements using orange accent. Never remove focus indicators.
- **Touch Targets**: Min 44x44px. Min button height 44px (touch-friendly).
- **Keyboard**: Clear focus. Follows hierarchy. Skip-to-content link.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Cards lift + border glows orange. Buttons scale + glow intensifies. Links shift to orange + underline. Orbital rings spin continuously. Stat cards bounce with staggered delays. Pulsing dot badges suggest live network activity.

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Red-pink (`#FF3366`) border/text, red-pink hover bg. Never use orange/gold for destructive.

---

## 5. LAYOUT & SPACING

- **Container Width**: `max-w-7xl` (1280px).
- **Section Padding**: Generous vertical `py-24` (96px).
- **Density**: `gap-8` (32px) or `gap-12` (48px) between grid items.
- **Section Dividers**: NO hard lines. Separate through vertical spacing, alternating backgrounds, subtle borders on specific sections.
- **Responsive Grids**: Mobile single column. Tablet `md:grid-cols-2`/`md:grid-cols-3`. Desktop `lg:grid-cols-4` for features. Pricing always `md:grid-cols-3`.

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Default stroke 1.5-2px for clean, technical lines. Colors: orange (`#F7931A`), gold (`#FFD600`), muted (`#94A3B8`), white.
- **Icon Containers**: Wrap in colored, glowing containers. Example: `bg-[#EA580C]/20 border border-[#EA580C]/50 rounded-lg p-3`. Creates "holographic node" effect. Hover: Add glow shadow `hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]`.
- **Decorative Icons**: Large, watermark-style icons in card backgrounds. High opacity on hover for subtle reveal effect. Example: `opacity-20 group-hover:opacity-100`.

---

## 7. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Space Grotesk (400, 500, 600, 700), Inter (400, 500, 600), JetBrains Mono (400, 500).
- Google Material Symbols: Material Symbols Outlined.

---

## 8. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Grid patterns, radial gradient blurs, and noise textures may be applied via CSS pseudo-elements on existing elements.