# Coding Prompt: Minimalist Dark Design System Implementation

You are tasked with building a complete web UI in the **Minimalist Dark** design style. This style creates visual interest not through color saturation or complex patterns, but through carefully orchestrated layers of darkness. Multiple shades of slate and charcoal stack upon each other, with warm amber accents that glow like embers in the night. The design breathes—generous "darkspace" gives every element room to exist.

**Emotional Keywords**: Atmospheric, Sophisticated, Calm, Premium, Nocturnal, Refined, Spacious, Warm-cool contrast, Ethereal, Grounded.

This is the visual language of:
- Premium dark mode applications (Linear, Raycast, Arc)
- High-end developer tools (Vercel, Railway)
- Luxury tech products at night
- A beautifully designed app you'd use at 2am
- The quiet confidence of well-crafted software

The design feels like working in a perfectly lit room at night—everything is visible, nothing strains the eyes, and there's a sense of calm focus.

**What This Design Is NOT**:
- NOT pure black (uses rich slate tones instead)
- NOT harsh or high contrast
- NOT colorful or vibrant
- NOT cold or sterile
- NOT flat or shadowless
- NOT similar to Minimalist Modern (no blue gradients, no rounded-lg everywhere)
- NOT similar to Minimalist Monochrome (has color accent, softer edges, not editorial)

**The DNA of Minimalist Dark**:
1. **Layered Slate Palette**: Not pure black—rich slate tones (#0A0A0F as deepest, #12121A as card backgrounds, #1A1A24 as elevated surfaces). Each layer subtly different, creating depth through darkness itself.
2. **Warm Amber Accent**: A single warm accent color (#F59E0B / amber-500) creates beautiful contrast against cool dark tones. Used sparingly for interactive elements, highlights, and focal points. The warmth prevents the design from feeling cold.
3. **Ambient Glow Effects**: Soft, blurred glows behind key elements create atmospheric depth. Not harsh drop shadows—think ambient light bleeding through darkness. Applied to buttons on hover, hero badges, testimonial accent lines, and decorative orbs. The glows are subtle but critical to the atmospheric quality—they create that "light in the darkness" feeling.
4. **Glass-Effect Cards**: Cards use semi-transparent backgrounds with subtle backdrop blur. Border opacity is low (10-15%). Creates a layered, floating effect without harsh edges.
5. **Geometric Sans Typography**: Space Grotesk for display, Inter for body. Clean, geometric letterforms that feel modern and technical. Strong hierarchy through size and weight, not color variation.
6. **Generous Breathing Room**: Extremely spacious layouts. Large section padding. Content doesn't crowd—it floats in space. This breathing room is essential to the premium feel.
7. **Subtle Borders**: Borders exist but are very subtle—usually 1px at 10-20% opacity. They define edges without drawing attention. No thick, heavy borders.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML.
- **Exception**: Subtle noise overlay and ambient orbs may be applied via CSS pseudo-elements on `body::before`/`body::after` without new HTML nodes.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (Dark Slate + Amber):
```css
:root {
  --bg-primary: #0A0A0F;
  --bg-secondary: #12121A;
  --text-primary: #FAFAFA;
  --text-secondary: #71717A;
  --muted: #1A1A24;
  --border-default: rgba(255, 255, 255, 0.08);
  --border-error: #EF4444;
  --border-success: #F59E0B;
  --primary: #F59E0B;
  --secondary: #FBBF24;
  --accent-foreground: #0A0A0F;
  --text-success: #F59E0B;
  --text-error: #EF4444;
  --font-heading: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-base: "Inter", system-ui, sans-serif;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.4);
  --shadow-glow-sm: 0 0 20px rgba(245, 158, 11, 0.15);
  --shadow-glow-md: 0 0 40px rgba(245, 158, 11, 0.2);
  --shadow-glow-lg: 0 0 60px rgba(245, 158, 11, 0.25);
  --shadow-border-glow: 0 0 0 1px rgba(245, 158, 11, 0.3), 0 0 20px rgba(245, 158, 11, 0.15);
  --spacing-gap: 2rem;
  --transition-fast: 200ms ease-out;
  --transition-normal: 300ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
}
```

**Contrast Pairing Rules**: Near-white text (`#FAFAFA`) on deep slate (`#0A0A0F`): 18.4:1 ratio (exceeds AAA). Muted text (`#71717A`) on background: 4.9:1 (meets AA). Amber accent (`#F59E0B`) readable on both dark and light contexts. Dark text (`#0A0A0F`) on amber: excellent contrast. Use `#fefefe` instead of `#ffffff` where a near-white is needed for light mode.

### 1.3 Mandatory Dark Mode Support
Minimalist Dark is inherently dark. You MUST implement a light mode variant:
- **Light Mode (Daylight Minimal)**: Under `@media (prefers-color-scheme: light)` and/or `.light` class. `--bg-primary: #FAFAFA` (near-white, use `#fefefe` where needed), `--bg-secondary: #FFFFFF`, `--text-primary: #0A0A0F` (deep slate), `--text-secondary: #71717A`, `--muted: #F4F4F5`, `--border-default: rgba(0, 0, 0, 0.08)`. Amber remains `#F59E0B` but may darken slightly for contrast. Glows adjusted to darker tints. Shadows use lighter values.
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Minimalist toggle (sun/moon Google Material Symbol in amber-bordered rounded container with subtle glow).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive: maintain dark palette and warm accent—no compromises on aesthetic. Scale typography smoothly (`text-4xl sm:text-5xl md:text-6xl lg:text-7xl`). Stack columns vertically (`lg:grid-cols-2` for two-column layouts). Reduce ambient glow orb sizes for performance (but keep them!). Generous vertical spacing maintained (`py-24 md:py-32 lg:py-40`). Touch targets: minimum 44px height (buttons h-11 or h-12). Navigation hidden on mobile (`hidden md:flex`), hamburger menu implied. All hover states also work as active states on touch devices. Glass effects maintained (backdrop-blur is performant on modern mobile).
- **Key Principle**: The atmospheric quality must survive on mobile. This isn't a "mobile-simplified" version—it's the same premium experience, just adapted to screen size.
- No horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.glass-card`, `.ambient-orb`, `.glow-effect`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Display/Headlines**: `"Space Grotesk", system-ui, sans-serif` — Geometric, technical, distinctive.
- **Body**: `"Inter", system-ui, sans-serif` — Clean, highly readable.
- **Mono**: `"JetBrains Mono", monospace` — For code, labels, metadata.
- **Type Scale**: xs 0.75rem (12px), sm 0.875rem (14px), base 1rem (16px), lg 1.125rem (18px), xl 1.25rem (20px), 2xl 1.5rem (24px), 3xl 2rem (32px), 4xl 2.5rem (40px), 5xl 3.5rem (56px), 6xl 4.5rem (72px), 7xl 6rem (96px).
- **Tracking**: Headlines `tracking-tight` (-0.025em). Body `tracking-normal` (0). Labels/Mono `tracking-wide` (0.025em).
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs. Style: Clean, thin strokes. Size 20px. StrokeWidth 1.5. Color: `text-zinc-400` (muted) or `text-amber-500` (active/accent). Icons should be subtle, not attention-grabbing—they support content, not dominate.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
**Primary Button**:
- **Default**: Background `#F59E0B` (amber). Text `#0A0A0F` (dark). Border: none. Radius `rounded-lg` (12px). Padding `px-6 py-3` (h-11 default). Font: `font-medium`, no uppercase. Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min 44px.
- **Hover**: `brightness-110`, `shadow-[0_0_20px_rgba(245,158,11,0.4)]`. `cursor: pointer`.
- **Focus**: `focus-visible:ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--background)]`.
- **Active**: `scale-[0.98]` (subtle press effect).
- **Loading**: Disabled, CSS amber spinner, no dimension distortion.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success` (amber) or `--text-error` (red).
- **Transition**: `all 200ms ease-out`.

**Secondary/Outline Button**: Background transparent. Text `#FAFAFA`. Border `1px solid rgba(255,255,255,0.15)`. Hover: `bg-white/5`, `border-white/25`. Active: `scale-[0.98]`.
**Ghost Button**: Background transparent. Text `#FAFAFA`. Border none. Hover: `bg-white/5`. Active: `scale-[0.98]`.
**Danger Button**: Red (`#EF4444`) for destructive. Distinct in both themes. Never use amber for destructive.

### 2.2 Card Component Requirements (Glass Effect)
**Standard Card**:
- Background: `rgba(26, 26, 36, 0.6)`. Backdrop-filter: `blur(8px)`. Border: `1px solid rgba(255, 255, 255, 0.08)`. Border-radius: `12px`. Transition: `all 300ms ease-out`. Flex (`align-items: center; justify-content: center; gap: 0.5rem`).
- **Default**: Semi-transparent glass, subtle border.
- **Hover** (when interactive): `border-color: rgba(255, 255, 255, 0.15)`. Background: `rgba(26, 26, 36, 0.8)`. `transform: scale(1.02)`. `box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3)`.
- **Focus-within**: Highlights when child receives focus.
- **Loading (Skeleton)**: Subtle shimmer (amber-tinted at very low opacity) to prevent layout jumps.
- **Empty State**: Google Material Symbol (e.g., `search_off` or `inbox`) in subtle amber-tinted container + guidance text in `#71717A`.

**Highlighted Card** (e.g., featured pricing tier):
- Same as standard plus: `border: 1px solid rgba(245, 158, 11, 0.2)`. `box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.2), 0 0 30px rgba(245, 158, 11, 0.15)`. On desktop, can also use `scale(1.05)` and `translate-y` for emphasis.

### 2.3 Form & Input Requirements
- Background: `rgba(26, 26, 36, 0.6)`. Backdrop-filter: `blur(8px)`. Border: `1px solid rgba(255,255,255,0.08)`. Radius: `rounded-lg`. Height: h-11 (44px for proper touch target). Text: `#FAFAFA`. Placeholder: `#71717A`.
- **States**: Empty (default), Focused (`border-amber-500/50`, `ring-2 ring-amber-500/20`, `shadow-[0_0_20px_rgba(245,158,11,0.1)]`), Filled, Valid (amber border + checkmark icon), Invalid (red border + error icon + red text), Disabled (opacity 0.5), Read-only.
- **Transition**: `all 200ms`.
- **Structure**: Flex container with label, input, error feedback container.

### 2.4 Modal / Popup Requirements
**States** (all animated via CSS transitions, smooth and subtle):
- **Opening**: Fade in backdrop + scale up content from 0.97 to 1.0 over 200-300ms (smooth, subtle).
- **Open**: Centered flex container (`align-items: center`), backdrop overlay with deep slate tint + blur. Content in a `rounded-lg` glass card with subtle border and ambient glow.
- **Loading**: Amber CSS spinner inside modal content area.
- **Success/Error**: Temporary feedback with amber or red accents.
- **Closing**: Reverse of opening animation over 200-300ms.

**UX Features**:
- Backdrop overlay: semi-transparent deep slate with `backdrop-blur-sm`.
- Close button: Google Material Symbol (`close`) in a subtle amber-tinted circle, top-right of modal.
- Keyboard focus trapping: focus remains within modal while open.
- Support closing via `Esc` key or overlay click.
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` pointing to modal title (in Space Grotesk).

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

**Bold Choices (Non-Negotiable)**:

### 3.1 Layered Darkness (MANDATORY)
At least 3 distinct dark tones visible: `#0A0A0F` → `#12121A` → `#1A1A24`. Each layer subtly different, creating depth through darkness itself.

### 3.2 Warm Amber Accent (MANDATORY)
No cold blues—`#F59E0B` amber creates the signature warmth. Used sparingly for interactive elements, highlights, focal points. The warmth prevents the design from feeling cold.

### 3.3 Ambient Glow Effects (MANDATORY)
- Hero badge: subtle glow + pulsing dot.
- Buttons on hover: `0_0_20px` glow at 0.4 opacity.
- Testimonial accent lines: soft glow.
- Background ambient orbs: massive blur (100-150px).

### 3.4 Glass-Effect Cards (MANDATORY)
Semi-transparent (0.6 opacity) with backdrop blur (8px). Creates layered, floating effect without harsh edges.

### 3.5 Generous Spacing (MANDATORY)
`py-24 md:py-32 lg:py-40` sections feel spacious, not cramped. Content floats in space.

### 3.6 Subtle Borders (MANDATORY)
`rgba(255,255,255,0.08)` — just 8% opacity, never harsh. Define edges without drawing attention. No thick, heavy borders.

### 3.7 Geometric Typography (MANDATORY)
Space Grotesk for headlines, Inter for body, JetBrains Mono for labels. Strong hierarchy through size and weight, not color variation.

### 3.8 Atmospheric Background (MANDATORY)
Fixed ambient orbs + subtle noise texture (0.015 opacity).

**Ambient Orbs** (decorative background elements):
- Large blurred circles with amber glow.
- Very low opacity (0.02-0.04).
- Positioned strategically (top center, bottom right as fixed backgrounds).
- Blur values: 100px-150px for soft, diffused light.
- Responsive: Smaller dimensions on mobile for performance (h-[400px] on mobile vs h-[600px] on desktop).

**Subtle Noise Overlay**:
```css
background-image: url("data:image/svg+xml,...noise...");
opacity: 0.02;
```

**Radial Gradient Ambience** (for section backgrounds):
```css
background: radial-gradient(ellipse at top, rgba(245, 158, 11, 0.03) 0%, transparent 50%);
```

### 3.9 Micro-Interactions (MANDATORY)
- Cards scale up on hover (1.02).
- Buttons scale down on active (0.98).
- Smooth FAQ accordion with height + opacity transitions.
- All focus states use amber accent.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Container**: `max-w-6xl` (72rem). Padding `px-6 md:px-8 lg:px-12`.
- **Section Spacing**: `py-24 md:py-32 lg:py-40` (very generous—let the dark space breathe).
- **Grid System**: Prefer simple grids: 2-col, 3-col. Gap: `gap-6` or `gap-8`. Items don't need to touch—floating in space is fine.
- No horizontal scrolling.

### 4.2 Smooth Animations
- **Motion Philosophy**: Smooth and subtle with delightful micro-interactions.
- **Transitions**: 200-300ms, `ease-out` (cards use 300ms for smoother feel).
- **Hover effects**: Cards—subtle scale (`scale-[1.02]`), border brightening, glow increase. Buttons—glow increase (shadow intensity up to 0.4), brightness boost. Links—color shift to accent on focus-visible.
- **Active states**: Buttons have subtle press effect (`scale-[0.98]`).
- **Animations**: Hero badge pulse dot (`animate-pulse` with glow). FAQ accordion smooth height transition (`max-h` with opacity fade).
- **No**: Bouncy animations, dramatic transforms.
- **Yes**: Gentle fades, soft glows, smooth state changes, subtle scales.
- **Respect `prefers-reduced-motion`**: Disable all animations.

### 4.3 Accessibility (a11y)
- **Contrast**: Primary text (`#FAFAFA`) on background (`#0A0A0F`): 18.4:1 ratio (exceeds AAA). Muted text (`#71717A`) on background: 4.9:1 (meets AA). Amber accent readable on both dark and light contexts.
- Never rely on color alone. Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**: All interactive elements have clear, accessible focus states using `focus-visible`:
  - **Buttons**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]`.
  - **Links**: `focus-visible:text-[var(--accent)] focus-visible:outline-none`.
  - **Inputs**: `focus:border-[var(--accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20`.
  - The amber accent color is used consistently for all focus indicators, maintaining brand coherence while ensuring visibility. Never remove focus indicators.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Cards: subtle scale, border brightening, glow increase. Buttons: glow increase, brightness boost. Links: color shift to accent. FAQ accordion: smooth height + opacity transitions. Hero badge: pulsing dot with glow.

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Red (`#EF4444`) for destructive actions. Never use amber for destructive.

---

## 5. WHAT SUCCESS LOOKS LIKE

A successfully implemented Minimalist Dark design should feel like:
- Using Linear or Raycast at night.
- A premium developer tool's marketing site.
- Software designed for focus and calm.
- Warm light glowing in a dark room.

It should NOT feel like:
- A generic dark theme with colors inverted.
- Harsh or high-contrast.
- Cold or unwelcoming.
- A copy of Minimalist Modern with dark colors.
- Just "dark mode"—it should have its own personality.

---

## 6. LAYOUT & SPACING

- **Container**: `max-w-6xl` (72rem). Padding `px-6 md:px-8 lg:px-12`.
- **Section Spacing**: `py-24 md:py-32 lg:py-40` (very generous).
- **Grid System**: Simple grids: 2-col, 3-col. Gap: `gap-6` or `gap-8`. Items can float in space.

---

## 7. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Clean, thin strokes. Size 20px. StrokeWidth 1.5. Color: `text-zinc-400` (muted) or `text-amber-500` (active/accent).
- Icons should be subtle, not attention-grabbing. They support content, not dominate.

---

## 8. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Space Grotesk, Inter, JetBrains Mono.
- Google Material Symbols: Material Symbols Outlined.

---

## 9. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Noise overlay, ambient orbs, and radial gradient ambience may be applied via CSS pseudo-elements on existing elements.