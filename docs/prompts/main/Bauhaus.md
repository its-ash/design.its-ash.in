# Coding Prompt: Bauhaus Design System Implementation

You are tasked with building a complete web UI in the **Bauhaus** design style. This style embodies the revolutionary principle "form follows function" while celebrating pure geometric beauty and primary color theory. This is constructivist modernism—every element is deliberately composed from circles, squares, and triangles.

**Vibe**: Constructivist, Geometric, Modernist, Artistic-yet-Functional, Bold, Architectural.

**Core Concept**: The interface is not merely a layout—it is a geometric composition. Every section is constructed rather than designed. Think of the page as a Bauhaus poster brought to life: shapes overlap, borders are thick and deliberate, colors are pure primaries (Red `#D02020`, Blue `#1040C0`, Yellow `#F0C020`), and everything is grounded by stark black (`#121212`) and clean white.

**Key Characteristics**:
- **Geometric Purity**: All decorative elements derive from circles, squares, triangles.
- **Hard Shadows**: 4px and 8px offset shadows (never soft/blurred) create depth through layering.
- **Color Blocking**: Entire sections use solid primary colors as backgrounds.
- **Thick Borders**: 2px and 4px black borders define every major element.
- **Asymmetric Balance**: Grids used but intentionally broken with overlapping elements.
- **Constructivist Typography**: Massive uppercase headlines (text-6xl to text-8xl) with tight tracking.
- **Functional Honesty**: No gradients, no subtle effects—everything is direct and declarative.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML.
- **Exception**: Geometric decorative shapes (circle, square, triangle accents) may be applied via CSS pseudo-elements on existing elements without new HTML nodes.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (Bauhaus Primaries + Black/White):
```css
:root {
  --bg-primary: #F0F0F0;
  --bg-secondary: #FFFFFF;
  --text-primary: #121212;
  --text-secondary: #121212;
  --muted: #E0E0E0;
  --border-default: #121212;
  --border-error: #D02020;
  --border-success: #1040C0;
  --primary: #D02020;
  --secondary: #1040C0;
  --tertiary: #F0C020;
  --accent-foreground: #FFFFFF;
  --text-success: #1040C0;
  --text-error: #D02020;
  --font-heading: "Outfit", sans-serif;
  --font-body: "Outfit", sans-serif;
  --font-display: "Outfit", sans-serif;
  --font-base: "Outfit", sans-serif;
  --radius-sm: 0px;
  --radius-md: 9999px;
  --radius-lg: 0px;
  --shadow-sm: 3px 3px 0px 0px #121212;
  --shadow-md: 4px 4px 0px 0px #121212;
  --shadow-lg: 8px 8px 0px 0px #121212;
  --spacing-gap: 2rem;
  --transition-fast: 200ms ease-out;
  --transition-normal: 300ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
}
```

**Contrast Pairing Rules**: Light backgrounds (`#F0F0F0`, `#FFFFFF`, yellow `#F0C020`) pair with black text (`#121212`). Dark/colored backgrounds (red, blue, black `#121212`) pair with white text (`#FFFFFF`). Borders always black (`#121212`). Use `#fefefe` instead of `#ffffff` where a near-white is needed.

### 1.3 Mandatory Dark Mode Support
Bauhaus is inherently light, high-contrast. You MUST implement a dark mode variant:
- **Dark Mode (Night Constructivism)**: Under `@media (prefers-color-scheme: dark)` and/or `.dark` class. `--bg-primary: #121212`, `--bg-secondary: #1A1A1A`, `--text-primary: #F0F0F0`, `--border-default: #F0F0F0` (white borders on black—contrast inversion). Primaries remain vibrant. Shadows: white offset (`3px 3px 0px 0px #F0F0F0`).
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Geometric toggle (sun/moon Google Material Symbol in black-bordered square/circle).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-first: single-column → grids on larger screens.
- **Breakpoints**: Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px).
- No horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.geo-circle`, `.geo-square`, `.geo-triangle`, `.hard-shadow-sm`, `.hard-shadow-md`, `.hard-shadow-lg`, `.color-block`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Font**: `"Outfit", sans-serif` (Google Font). Circular letterforms embody Bauhaus. Weights: 400, 500, 700, 900.
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs. Use Circle, Square, Triangle (geometric brand), Check, Quote, ArrowRight, ChevronDown.
- **Type Scale**: Display text-4xl(mobile)→text-6xl(tablet)→text-8xl(desktop), font-black (900), uppercase, `tracking-tighter`. Subheadings text-2xl→text-4xl, font-bold (700), uppercase. Body text-base→text-lg, font-medium (500). Labels font-bold (700), uppercase, `tracking-widest`.
- **Line Height**: Tight for headlines (`leading-[0.9]`), relaxed for body.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
Buttons are architectural elements with hard shadows and physical press feedback.

**Variants**:
- **Primary (Red)**: `bg-[#D02020] text-white border-2 border-black shadow-[4px_4px_0px_0px_black]`
- **Secondary (Blue)**: `bg-[#1040C0] text-white border-2 border-black shadow-[4px_4px_0px_0px_black]`
- **Yellow**: `bg-[#F0C020] text-black border-2 border-black shadow-[4px_4px_0px_0px_black]`
- **Outline**: `bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_black]`
- **Ghost**: `border-none text-black hover:bg-gray-200`

**Structure**:
- **Default**: Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min 44x44px. Shapes: `rounded-none` (square) or `rounded-full` (pill)—use deliberately.
- **Hover**: Slight opacity change (`hover:bg-[color]/90`). `cursor: pointer`.
- **Focus**: 2px offset ring (black on light, white on dark).
- **Active/Pressed**: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`—simulates physical press by removing hard offset shadow.
- **Loading**: Disabled, CSS spinner (black/primary), no dimension distortion.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success` (blue) or `--text-error` (red).
- **Typography**: Uppercase, font-bold, `tracking-wider`.

**Danger Button**: Red (`#D02020`) is already Bauhaus primary. For explicit destructive distinction, use thicker border (4px) + warning Google Material Symbol (`warning`). Distinct in both themes.

### 2.2 Card Component Requirements
Cards are geometric containers with hard shadows and decorative shape accents.

**Base Style**: White background, `border-4 border-black`, `shadow-[8px_8px_0px_0px_black]` (large hard offset).
**Decoration** (MANDATORY): Small geometric shape in top-right corner (8px × 8px):
- Circle: `rounded-full bg-[primary-color]`
- Square: `rounded-none bg-[primary-color]`
- Triangle: CSS `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)`
- Rotate three primary colors across cards.

**Default**: Flexbox, thick black borders, `--bg-secondary`.
**Hover**: Lift (`hover:-translate-y-1` or `hover:-translate-y-2`). Border remains. Shadow remains but card floats.
**Focus-within**: Border thickens or shifts to primary color.
**Loading (Skeleton)**: Black/white geometric shimmer.
**Empty State**: Large geometric Google Material Symbol (circle, square, triangle) + guidance text.
**Content Hierarchy**: Large bold titles, medium body text, generous padding.

### 2.3 Form & Input Requirements
**Structure**: White background, `border-2 border-black` (mobile) / `border-4 border-black` (desktop). Height h-12 (48px). `rounded-none` (square corners—no rounded inputs in Bauhaus).
**States**: Empty (default), Focused (border thickens or shifts to blue `#1040C0`, 2px offset ring), Filled, Valid (blue border + checkmark icon), Invalid (red border + error icon + red text), Disabled (opacity 0.5, muted bg), Read-only.
**Structure**: Flex container with label (uppercase, bold, `tracking-wider`), input, error feedback container.

### 2.4 Modal / Popup Requirements
**States** (mechanical/snappy): Opening (fade + scale 0.95→1.0, 200-300ms), Open (centered flex, off-white backdrop tint, black-bordered card (4px) with large hard offset shadow (8px)), Loading (black/primary spinner), Success/Error (blue/red accents), Closing (reverse, 200-300ms).
**UX**: Backdrop (semi-transparent off-white/black), close button (Google Material Symbol `close` in black-bordered square—sharp corners), keyboard focus trapping, Esc/overlay close, `aria-modal="true"`, `role="dialog"`, `aria-labelledby`.

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

### 3.1 Color Blocking (MANDATORY)
Entire sections use solid primary colors as backgrounds:
- Hero right panel: Blue (`bg-[#1040C0]`)
- Stats section: Yellow (`bg-[#F0C020]`)
- Blog section: Blue (`bg-[#1040C0]`)
- Benefits section: Red (`bg-[#D02020]`)
- Final CTA: Yellow (`bg-[#F0C020]`)
- Footer: Near-black (`bg-[#121212]`)

### 3.2 Geometric Logo (MANDATORY)
Navigation features three geometric shapes (circle, square, triangle) in primary colors forming brand identity.

### 3.3 Geometric Compositions (MANDATORY)
Abstract compositions of overlapping shapes:
- Hero right panel: Overlapping circle, rotated square, centered square with triangle.
- Product Detail: Abstract geometric "face" from circles, squares, diagonal line.
- Final CTA: Large decorative shapes at 50% opacity in corners.

### 3.4 Rotated Elements (MANDATORY)
Deliberate 45° rotation on: Every 3rd shape in repeating patterns. Step numbers in "How It Works" (counter-rotate inner content). Decorative background shapes.

### 3.5 Hard Offset Shadows (MANDATORY)
ALL shadows are hard offset (never soft/blurred):
- Small: `shadow-[3px_3px_0px_0px_black]` or `shadow-[4px_4px_0px_0px_black]`
- Medium: `shadow-[6px_6px_0px_0px_black]`
- Large: `shadow-[8px_8px_0px_0px_black]`

### 3.6 Thick Black Borders (MANDATORY)
Mobile `border-2` (2px), Desktop `border-4` (4px), Navigation `border-b-4`. Border color always black (`#121212`).

### 3.7 Image Treatments (MANDATORY)
Blog images: Alternate `rounded-full`/`rounded-none`, grayscale with `hover:grayscale-0`. Testimonial avatars: `rounded-full` grayscale. All images grayscale by default, color on hover.

### 3.8 Unique Decorations
Small geometric shapes (8px-16px) as corner decorations on cards, using three primary colors in rotation.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Mobile-First**: Single-column → grids on larger screens.
- **Typography Scaling**: All text uses responsive classes (text-4xl sm:text-6xl lg:text-8xl).
- **Border/Shadow Scaling**: Reduce on mobile (border-2 → border-4, shadow-[3px] → shadow-[8px]).
- **Navigation**: Hamburger menu on mobile (< 768px), full nav on desktop.
- **Grid Adaptations**: Stats 1→2(sm)→4(lg). Features 1→2(md)→3(lg). How It Works 1→2(sm)→4(md), hide connecting line on mobile.
- **Container**: `max-w-7xl` (poster-like breadth).
- **Section Padding**: Mobile `py-12 px-4`, Tablet `py-16 px-6`, Desktop `py-24 px-8`.
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px.
- **Section Dividers**: Every section `border-b-4 border-black` (strong horizontal rhythm).

### 4.2 Smooth Animations
- **Feel**: Mechanical, snappy, geometric (no soft organic movement).
- **Duration**: `duration-200` or `duration-300`. Easing: `ease-out`.
- **Interactions**: Button press (translate + remove shadow). Card hover (lift upward). Accordion (chevron rotate + max-height). Icon hover (scale on group). Link hover (color change).
- **Background Patterns**: Static (no animation).
- **Respect `prefers-reduced-motion`**: Disable all animations.

### 4.3 Accessibility (a11y)
- **Contrast**: Black on off-white/white/yellow: excellent. White on red/blue/black: excellent. All meets WCAG AA.
- Never rely on color alone (Bauhaus uses heavy color blocking—ensure text readable on colored backgrounds: white on red/blue, black on yellow).
- Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**: 2px offset ring (black on light, white on dark). Never remove.
- **Touch Targets**: Min 44x44px. Min button height 48px (h-12).
- **Keyboard**: Clear focus. Follows hierarchy. Skip-to-content link.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Buttons physically "press down" (translate + remove shadow). Cards lift. Accordion chevrons rotate. Icons scale on group hover. Links change color.

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Red (`#D02020`) with thicker border (4px) + warning Google Material Symbol (`warning`). Never use blue/yellow for destructive actions.

---

## 5. LAYOUT & SPACING

- **Container**: `max-w-7xl` (poster-like breadth).
- **Section Padding**: Mobile `py-12 px-4`, Tablet `py-16 px-6`, Desktop `py-24 px-8`.
- **Grid Systems**: Stats 1→2→4 with `divide-y`/`divide-x` borders. Features 1→2→3 with 8px gaps. Pricing 1→3 (center elevated on desktop).
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px.
- **Section Dividers**: Every section `border-b-4 border-black`.

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Stroke 2px (default) or 3px (emphasis). Size h-6 w-6 to h-8 w-8. Color: match section accent or white on colored backgrounds.
- Integration: Icons in bordered geometric containers. Features: white bordered box with shadow. Benefits: check icon in yellow circular badge. Stats: numbers in geometric shapes.
- Use geometric Material Symbols (Circle, Square, Triangle) alongside functional icons.

---

## 7. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Outfit (400, 500, 700, 900).
- Google Material Symbols: Material Symbols Outlined.

---

## 8. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Geometric decorative shapes and dot grid patterns may be applied via CSS pseudo-elements on existing elements.