# Coding Prompt: Cyberpunk / Glitch Design System Implementation

You are tasked with building a complete web UI in the **Cyberpunk / Glitch** design style. "High-Tech, Low-Life." The aesthetic is a digital dystopia colliding with a high-tech noir reality. It captures the tension between advanced technology and societal decay—a world of underground hackers, neon-drenched megacities, and corrupted data streams. This isn't a clean, utopian future; it's gritty, imperfect, and palpably dangerous. Every pixel should feel like it's being rendered on a malfunctioning CRT monitor in a rain-soaked Tokyo alley or a rogue terminal in a subterranean bunker.

**The Vibe**: Dangerous, electric, rebellious, and aggressively futuristic-retro. Draws heavily from 80s sci-fi (Blade Runner, Akira) and hacker culture (The Matrix, Ghost in the Shell). The interface should feel alive and volatile—buzzing with digital energy, glitching with data corruption, and pulsing with raw power. It's not just a website; it's a hacked feed, a forbidden interface, a window into the sprawl.

**The Tactile Experience**:
- **Imperfect Technology**: Embrace the artifacts of analog-to-digital conversion. Scanlines, chromatic aberration (RGB splitting), and signal noise are not bugs; they are features. The UI should feel like it's struggling to contain the data it displays.
- **The Void vs. The Light**: The background isn't just dark; it's a void. Against this absolute blackness, neon light (cyan, magenta, acid green) doesn't just color elements—it illuminates them. Light sources should feel physical, casting glows and shadows that define the hierarchy.
- **Industrial Brutalism**: Shapes are hard, angular, and utilitarian. Chamfered corners (45-degree cuts) replace friendly rounded rectangles. Borders are technical and precise, resembling blueprints or HUD schematics rather than decorative frames.

**Visual Signatures**:
- **Chromatic Aberration**: RGB color splitting on text and elements (red/cyan offset shadows) to simulate lens distortion or signal interference.
- **Scanlines**: Subtle horizontal line overlays mimicking the refresh rate of old CRT monitors.
- **Glitch Effects**: Intentional "corruption" via clip-path animations, skewed transforms, and flickering text.
- **Neon Glow**: Text and borders that literally glow with intense, multi-layered box-shadow/text-shadow stacking.
- **Corner Cuts**: Chamfered/clipped corners on cards and buttons creating a militaristic, tech-panel aesthetic.
- **Circuit Patterns**: Decorative backgrounds resembling PCB traces or data highways.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML.
- **Exception**: Scanline overlays, grid/circuit patterns, and noise textures may be applied via CSS pseudo-elements on `body::before`/`body::after` without new HTML nodes.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (Dark Mode - Mandatory):
```css
:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --text-primary: #e0e0e0;
  --text-secondary: #6b7280;
  --muted: #1c1c2e;
  --border-default: #2a2a3a;
  --border-error: #ff3366;
  --border-success: #00ff88;
  --primary: #00ff88;
  --secondary: #ff00ff;
  --tertiary: #00d4ff;
  --accent-foreground: #0a0a0f;
  --text-success: #00ff88;
  --text-error: #ff3366;
  --font-heading: "Orbitron", "Share Tech Mono", monospace;
  --font-body: "JetBrains Mono", "Fira Code", "Consolas", monospace;
  --font-display: "Orbitron", monospace;
  --font-base: "JetBrains Mono", monospace;
  --radius-sm: 0px;
  --radius-md: 2px;
  --radius-lg: 4px;
  --shadow-neon: 0 0 5px #00ff88, 0 0 10px #00ff8840;
  --shadow-neon-sm: 0 0 3px #00ff88, 0 0 6px #00ff8830;
  --shadow-neon-lg: 0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830;
  --shadow-neon-secondary: 0 0 5px #ff00ff, 0 0 20px #ff00ff60;
  --shadow-neon-tertiary: 0 0 5px #00d4ff, 0 0 20px #00d4ff60;
  --spacing-gap: 2rem;
  --transition-fast: 100ms steps(4);
  --transition-normal: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
}
```

**Contrast Pairing Rules**: Light text (`#e0e0e0`) on void black (`#0a0a0f`): excellent contrast. Neon green (`#00ff88`) on void: ~7.5:1 (excellent). Muted (`#6b7280`) on void: sufficient for secondary. Neon colors on dark backgrounds. Use `#fefefe` instead of `#ffffff` where a near-white is needed for light mode.

### 1.3 Mandatory Dark Mode Support
Cyberpunk is inherently dark mode (mandatory). However, you MUST implement a light mode variant:
- **Light Mode (Daylight Hacker)**: Under `@media (prefers-color-scheme: light)` and/or `.light` class. `--bg-primary: #f0f0f0` (light gray, use `#fefefe` where needed), `--bg-secondary: #ffffff`, `--text-primary: #0a0a0f` (near-black), `--text-secondary: #4b5563`, `--border-default: #d1d5db`. Neon colors remain but may need darkening for contrast on light backgrounds. Scanlines at lower opacity. Shadows use neon glows but adjusted for light background.
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Glitchy toggle (sun/moon Google Material Symbol in neon-bordered chamfered container).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-first: single column → grids on larger screens.
- **Max-Width**: `max-w-7xl` for main content, full-bleed sections with contained inner content.
- **Asymmetry Requirements**: Hero 60/40 split minimum. At least one section with overlapping elements (negative margins). Use `rotate-1` or `skew-y-1` transforms on section containers. Stagger card heights in grid where content allows.
- **Grid Patterns**: Features `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `-skew-y-1` on container. Pricing `grid-cols-1 md:grid-cols-3` with middle card scaled up. Stats horizontal flex with `divide-x divide-border`.
- **Spacing**: 8px base grid. Generous padding (`py-24` to `py-32` for sections). Dense internal component spacing.
- No horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.cyber-chamfer`, `.cyber-chamfer-sm`, `.cyber-glitch`, `.neon-glow`, `.neon-glow-sm`, `.neon-glow-lg`, `.scanlines`, `.circuit-grid`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Headings**: `"Orbitron", "Share Tech Mono", monospace` — Geometric, futuristic, robotic.
- **Body**: `"JetBrains Mono", "Fira Code", "Consolas", monospace` — Clean monospace for terminal feel.
- **Accent/Labels**: `"Share Tech Mono", monospace` — For UI labels, timestamps, badges.
- **Scale & Styling**: H1 `text-6xl` to `text-8xl`, font-black, uppercase, `tracking-widest`. H2 `text-4xl` to `text-5xl`, font-bold, uppercase, `tracking-wide`. H3 `text-xl` to `text-2xl`, font-semibold, uppercase. Body `text-base`, font-normal, `tracking-wide`, `leading-relaxed`. Code/Labels `text-sm`, font-mono, uppercase, `tracking-[0.2em]`.
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs. Stroke width 1.5px (thin, technical feel). Size h-5 w-5 or h-6 w-6. Color: Inherit from text (usually accent or foreground). Style: Add subtle glow on hover via `filter: drop-shadow(0 0 4px currentColor)`. Place icons inside bordered squares/hexagons with glow effect.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
All buttons use monospace font, uppercase text, wider letter spacing, `transition: all` for smooth effects, 2px accent focus ring. Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min 44x44px.

**Default Variant**:
- **Default**: Background transparent. Border 2px solid accent (`#00ff88`). Text: accent color. Clip-path: `.cyber-chamfer-sm` (smaller chamfer).
- **Hover**: Background fills with accent, text becomes background color, neon glow shadow. `cursor: pointer`.
- **Focus**: 2px accent focus ring + glow effect matching neon aesthetic.
- **Active**: `transform: scale(0.97)`.
- **Loading**: Disabled, CSS neon spinner, no dimension distortion.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success` (neon green) or `--text-error` (red-pink).

**Secondary Variant**: Border 2px solid `#ff00ff` (magenta). Text: magenta. Hover: fills with magenta, neon-secondary glow.
**Outline Variant**: Border 1px solid `#2a2a3a`. Background transparent. Hover: border becomes accent, text becomes accent, neon glow appears.
**Ghost Variant**: No border. Hover: background `accent/10` opacity, text becomes accent.
**Glitch Variant** (CTAs): Background solid accent (`#00ff88`). Text: background color (high contrast). Uses `.cyber-glitch` class for chromatic aberration effect. Hover: brightness increases (`filter: brightness(1.1)`).

**Chamfered Corner Pattern** (MANDATORY):
```css
clip-path: polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px));
```

**Danger Button**: Red-pink (`#ff3366`) border/text. Hover: red-pink bg with neon glow. Distinct in both themes. Never use neon green for destructive.

### 2.2 Card Component Requirements
Cards are angular, militaristic containers with chamfered corners and neon glow.

**Default Card Variant**:
- Background `#12121a` (card). Border 1px solid `#2a2a3a`. Clip-path: chamfered corners via `.cyber-chamfer` class. Transition: all 300ms. Flex (`align-items: center; justify-content: center; gap: 0.5rem`).
- **Default**: Card background, subtle border.
- **Hover**: `translateY(-1px)`, border becomes accent, neon glow appears (if `hoverEffect` prop/class). `cursor: pointer`.
- **Focus-within**: Highlights when child receives focus.
- **Loading (Skeleton)**: Neon-tinted glitchy shimmer animation.
- **Empty State**: Google Material Symbol in bordered square with glow + guidance text in muted gray.

**Terminal Variant** (variant="terminal"):
- Background `#0a0a0f` instead of card. Border 1px solid border. Automatic decorative header bar with traffic light dots (red/yellow/green). Content padding-top to accommodate header. Clip-path: chamfered corners. Used for: Blog cards, FAQ items, some pricing tiers.

**Holographic Variant** (variant="holographic"):
- Background `#1c1c2e` at 30% opacity. Border 1px solid accent at 30% opacity. Box-shadow: neon glow. Backdrop-filter: blur for glassmorphic effect. Corner accents: 4 small border corners at card edges using absolute positioning. Used for: Product details card, hero HUD panels.

### 2.3 Form & Input Requirements
- Wrapper: relative positioning for prefix icon. Prefix: ">" symbol in accent color, absolute positioned left.
- Background `#12121a` (input). Border 1px solid `#2a2a3a`. Clip-path: `.cyber-chamfer-sm`. Text: monospace, accent color. Padding-left: 8 (to accommodate prefix). Placeholder: mutedForeground, styled as terminal prompt.
- **States**: Empty (default), Focused (border becomes accent, neon glow shadow, outline removed), Filled, Valid (neon green border + checkmark icon), Invalid (red-pink border + error icon + red text), Disabled (opacity 0.5), Read-only.
- **Structure**: Flex container with label (monospace, uppercase, `tracking-[0.2em]`), input, error feedback container.

### 2.4 Modal / Popup Requirements
**States** (all animated via CSS transitions, sharp and digital):
- **Opening**: Fade in backdrop + scale up content from 0.95 to 1.0 over 150ms (sharp, digital feel. Or for more digital feel: `transition: all 100ms steps(4)`).
- **Open**: Centered flex container (`align-items: center`), backdrop overlay with void tint + scanlines. Content in a chamfered card with neon glow border.
- **Loading**: Neon green CSS spinner inside modal content area.
- **Success/Error**: Temporary feedback with neon green or red-pink accents.
- **Closing**: Reverse of opening animation over 150ms.

**UX Features**:
- Backdrop overlay: semi-transparent void with scanline overlay.
- Close button: Google Material Symbol (`close`) in a neon-bordered chamfered square, top-right of modal.
- Keyboard focus trapping: focus remains within modal while open.
- Support closing via `Esc` key or overlay click.
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` pointing to modal title (in Orbitron).

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

**MANDATORY BOLD CHOICES**:

### 3.1 Glitched Headlines (MANDATORY)
Hero h1 MUST have chromatic aberration text-shadow AND a CSS animation that occasionally "glitches" (random skew/translate flicker).

**Chromatic Aberration** (via CSS animation on `.cyber-glitch`):
Implemented via `::before` and `::after` pseudo-elements with:
- `text-shadow: -1px 0 #ff00ff` (magenta left)
- `text-shadow: -1px 0 #00d4ff` (cyan right)
- clip-path animations for glitch effect

**Glitch Keyframe**:
```css
@keyframes glitch { 0%, 100% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(2px, -2px); } 60% { transform: translate(-1px, -1px); } 80% { transform: translate(1px, 1px); } }
```

### 3.2 Scanline Overlay (MANDATORY)
The entire page has a subtle scanline overlay (via `::after` on body or main):
```css
background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);
pointer-events: none;
```

### 3.3 Terminal Aesthetic (MANDATORY)
At least one section must feel like a terminal (monospace, > prefixes, blinking cursor animations).

**Blink cursor**:
```css
@keyframes blink { 50% { opacity: 0; } }
```

### 3.4 Neon Borders That Actually Glow (MANDATORY)
Not just colored borders—stacked box-shadows creating real glow effect:
```css
--shadow-neon: 0 0 5px #00ff88, 0 0 10px #00ff8840;
--shadow-neon-lg: 0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830;
```

### 3.5 Corner Cuts (MANDATORY)
Cards use clip-path for chamfered/cut corners, not rounded corners:
```css
clip-path: polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px));
```

### 3.6 Animated Elements (MANDATORY)
- Blinking cursors (`animation: blink 1s step-end infinite`)
- Subtle hover glitch effects
- Gradient border animations (hue rotation)

### 3.7 Circuit/Grid Background (MANDATORY)
Visible tech-pattern in at least one section background:
```css
background-image: linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px);
background-size: 50px 50px;
```

### 3.8 Typing/Typewriter Effect
Consider on subtitle or at least style as if mid-type (trailing cursor).

### 3.9 RGB Shift/Chromatic Pulse (MANDATORY)
```css
@keyframes rgbShift { 0%, 100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00d4ff; } 50% { text-shadow: 2px 0 #ff00ff, -2px 0 #00d4ff; } }
```

### 3.10 Noise Texture
Apply subtle CSS noise filter or SVG noise overlay at 5-10% opacity.

### 3.11 Gradient Mesh
Radial gradients of accent colors at very low opacity in corners.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Mobile Adaptations** (Mobile-first):
  - **Typography Scaling**: Hero h1 `text-5xl` (mobile) → `text-7xl` (md) → `text-8xl` (lg). Subheadline `text-base` → `text-lg` → `text-xl`. Section headings `text-4xl` → `text-5xl`. Maintain uppercase and tracking at all sizes.
  - **Layout Changes**: Navigation: Hide nav links on < lg, show abbreviated CTA text on < sm. Stats: 2x2 grid with borders only on top 2 items (mobile) → 4-column with vertical borders (desktop). All feature/blog/testimonial grids: Single column → 2-column (md) → 3-column (lg). Pricing: Stack vertically → 3-column grid, highlighted card scale only on md+. Hero HUD: Hidden on mobile (lg:block). Footer: Stack to single column → 4-column grid.
  - **Maintained Elements**: Scanline overlay (full page). Chamfered corners on all cards. Neon glow effects (may reduce intensity on mobile for performance). Grid/circuit backgrounds. Monospace typography. Terminal aesthetic (>, $, prefixes). Dark color scheme.
  - **Touch Targets**: Minimum 44px height for all interactive elements. Adequate spacing between tappable items. FAQ accordions with full-width click area.
- No horizontal scrolling.

### 4.2 Smooth Animations
- **Motion Feel**: Sharp, digital, slightly mechanical. Quick snaps rather than smooth eases.
- **Transitions**: `transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)` or for more digital feel: `transition: all 100ms steps(4)`.
- **Keyframe Animations**: Blink cursor, glitch effect, scanline scroll, RGB shift/chromatic pulse (all as specified above).
- **Respect `prefers-reduced-motion`**: Disable glitch animations, keep static chromatic aberration.

### 4.3 Accessibility (a11y)
- **Contrast**: All text meets WCAG AA (accent green on dark bg = ~7.5:1 ratio - excellent).
- Never rely on color alone. Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**:
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-accent
focus-visible:ring-offset-2
focus-visible:ring-offset-background
```
Plus add glow effect matching the neon aesthetic.
- **Reduced Motion**: Respect `prefers-reduced-motion` - disable glitch animations, keep static chromatic aberration.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Buttons fill with neon glow on hover. Cards lift with border glow. Links shift to accent color. Glitch effects flicker on interactive elements. Scanlines remain constant. Cursors blink in terminal sections.

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Red-pink (`#ff3366`) border/text, red-pink hover bg with neon glow. Never use neon green for destructive.

---

## 5. LAYOUT & SPACING

- **Max-Width**: `max-w-7xl` for main content, full-bleed sections with contained inner content.
- **Grid Patterns**: Features `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `-skew-y-1` on container. Pricing `grid-cols-1 md:grid-cols-3` with middle card scaled up. Stats horizontal flex with `divide-x divide-border`.
- **Spacing**: 8px base grid. Generous padding (`py-24` to `py-32` for sections). Dense internal component spacing.
- **Asymmetry Requirements**: Hero 60/40 split minimum. At least one section with overlapping elements (negative margins). Use `rotate-1` or `skew-y-1` transforms on section containers. Stagger card heights in grid where content allows.

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Stroke width 1.5px (thin, technical feel). Size h-5 w-5 or h-6 w-6. Color: Inherit from text (usually accent or foreground).
- Style: Add subtle glow on hover via `filter: drop-shadow(0 0 4px currentColor)`.
- Icon Containers: Place icons inside bordered squares/hexagons with glow effect.

---

## 7. IMPLEMENTATION NOTES

- Use Tailwind arbitrary values `[...]` extensively for custom shadows and clip-paths.
- CSS variables for colors enable easy theming.
- Scanlines implemented via CSS, not images.
- Glitch animations should be subtle and infrequent (not distracting).
- Test glow effects on different screens (can look washed out on low contrast displays).
- Consider GPU performance with multiple box-shadows—use `will-change: transform` sparingly.

---

## 8. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Orbitron, Share Tech Mono, JetBrains Mono.
- Google Material Symbols: Material Symbols Outlined.

---

## 9. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Scanline overlays, grid/circuit patterns, noise textures, and chamfered corner effects may be applied via CSS pseudo-elements and clip-path on existing elements.