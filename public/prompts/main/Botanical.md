# Coding Prompt: Botanical / Organic Serif Design System Implementation

You are tasked with building a complete web UI in the **Botanical / Organic Serif** design style. This style is a digital ode to nature—it breathes, flows, and grounds itself in organic beauty. It is soft, sophisticated, and deeply intentional, rejecting the rigid, hyper-digital sharpness of modern tech aesthetics in favor of warmth, tactility, and natural imperfection.

**Vibe**: Peaceful, curated, artisanal, high-end wellness, sustainable luxury, botanical elegance. Like a botanical garden, the earthy warmth of a ceramics studio, and the refined elegance of editorial design. It whispers rather than shouts. Every element feels hand-touched, sun-warmed, and naturally crafted.

**Fundamental Principles**:
- **Organic Softness**: Hard angles are purposefully rare. Every corner is rounded, every shape flows like water-smoothed stones or unfurling leaves. The arch radius on images creates iconic architectural moments.
- **Typographic Elegance**: Typography is the protagonist—Playfair Display's high-contrast strokes command attention while maintaining grace. Italics add a handwritten, personal touch.
- **Earthbound Palette**: Every color derives from nature—forest floors, clay pottery, sage gardens, terracotta tiles. No artificial brights. Muted, sophisticated, grounded.
- **Tactile Texture**: The subtle paper grain overlay is non-negotiable—it transforms cold digital pixels into warm, touchable surfaces.
- **Breathing Space**: Whitespace is sacred. Generous vertical padding, cards float with ample gaps, every element has room to exist without crowding.
- **Intentional Movement**: Animations are slow, graceful, and fluid—like plants swaying in breeze. Nothing snaps or jerks.
- **Staggered Rhythm**: Breaking the grid creates natural, organic flow. Every second feature card translates vertically. Images rotate subtly. The design breathes asymmetry within structure.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML.
- **Exception**: The paper grain texture overlay may be applied via CSS pseudo-element on `body::before` without new HTML nodes. Prefer this approach.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (Earthy & Muted Light Mode):
```css
:root {
  --bg-primary: #F9F8F4;
  --bg-secondary: #FFFFFF;
  --text-primary: #2D3A31;
  --text-secondary: #6B7B6F;
  --muted: #DCCFC2;
  --border-default: #E6E2DA;
  --border-error: #C27B66;
  --border-success: #8C9A84;
  --primary: #8C9A84;
  --secondary: #C27B66;
  --accent-foreground: #FFFFFF;
  --text-success: #8C9A84;
  --text-error: #C27B66;
  --font-heading: "Playfair Display", serif;
  --font-body: "Source Sans 3", sans-serif;
  --font-display: "Playfair Display", serif;
  --font-base: "Source Sans 3", sans-serif;
  --radius-sm: 12px;
  --radius-md: 24px;
  --radius-lg: 40px;
  --shadow-sm: 0 4px 6px -1px rgba(45, 58, 49, 0.05);
  --shadow-md: 0 10px 15px -3px rgba(45, 58, 49, 0.05);
  --shadow-lg: 0 20px 40px -10px rgba(45, 58, 49, 0.05);
  --shadow-xl: 0 25px 50px -12px rgba(45, 58, 49, 0.15);
  --spacing-gap: 2rem;
  --transition-fast: 300ms ease-out;
  --transition-normal: 500ms ease-out;
  --transition-slow: 700ms ease-out;
  --transition-dramatic: 1000ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
}
```

**Contrast Pairing Rules**: Light backgrounds (`#F9F8F4`, `#FFFFFF`, soft clay `#DCCFC2`) pair with dark text (forest green `#2D3A31`). Dark/colored backgrounds (forest green, terracotta) pair with white text. Sage/terracotta backgrounds pair with white text. Use `#fefefe` instead of `#ffffff` where a near-white is needed.

### 1.3 Mandatory Dark Mode Support
Botanical is inherently light and airy. You MUST implement a dark mode variant:
- **Dark Mode (Moonlit Garden)**: Under `@media (prefers-color-scheme: dark)` and/or `.dark` class. `--bg-primary: #1A2420` (deep forest green-black), `--bg-secondary: #242F2A`, `--text-primary: #E8E4DC` (warm cream), `--text-secondary: #9CA89E`, `--muted: #2D3A31`, `--border-default: #3A4A40`. Sage/terracotta slightly brightened for dark contrast. Shadows adjusted to dark green tints `rgba(0,0,0,0.15)`.
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Organic toggle (sun/moon Google Material Symbol in sage-bordered circle).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-first: graceful adaptation maintaining organic character.
- **Grid Breakpoints**: Features `grid-cols-1` → `md:grid-cols-3`. Stats `grid-cols-2` → `md:grid-cols-4`. Blog/Testimonials `grid-cols-1` → `md:grid-cols-3`. Pricing `grid-cols-1` → `lg:grid-cols-3`.
- **Typography Scaling**: Headlines reduce from `text-8xl` to `text-5xl` on mobile. Body remains `text-lg` with adjusted line-height.
- **Spacing Adjustments**: `py-32` → `py-16` on mobile, `gap-16` → `gap-12`, padding `p-8` → `p-4`.
- **Touch Targets**: Min 44px height (`h-12`, `h-14`).
- **Staggered Cards**: `translate-y-12` offset only at `md:` breakpoint and above.
- No horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.arch-image`, `.blob-image`, `.staggered-card`, `.vine-divider`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Headings**: `"Playfair Display", serif` (Google Font). Transitional serif, high contrast strokes. Weight 600/700. **Italicize key words for emphasis** (MANDATORY).
- **Body**: `"Source Sans 3", sans-serif` (Google Font). Clean humanist sans-serif. Weight 400/500.
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs. Thin stroke (weight 1.5 equivalent). Color: Deep Forest Green or Sage.
- **Type Scale**: Hero text-5xl to text-8xl (Playfair). Section text-4xl to text-5xl. Card text-xl to text-2xl. Body text-base to text-lg, relaxed line-height. Labels uppercase, `tracking-widest`, text-sm.
- **Italic Emphasis** (MANDATORY): Frequently use *Italic* variant of Playfair Display for single words within bold headlines. Adds handwritten, personal touch.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
Buttons are pill-shaped, organic, soft. Typography uppercase with wide tracking.

**Primary Button**:
- **Default**: Pill-shaped (`rounded-full`). Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min 44px (h-12). Background: Deep Forest Green (`#2D3A31`). Text: White. Typography: uppercase, `tracking-widest`, text-sm.
- **Hover**: Lightens slightly or shifts to Terracotta (`#C27B66`). `cursor: pointer`. `bg-opacity-90` subtle darkening, `duration-300`.
- **Focus**: Soft Sage Green ring (`ring-[#8C9A84]`) with 2px width and offset. No harsh blue rings.
- **Active**: `transform: scale(0.97)` subtle press.
- **Loading**: Disabled, CSS sage spinner, no dimension distortion.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success` (sage) or `--text-error` (terracotta).

**Secondary Button**: Transparent, Sage Green border (1px), sage text. Hover: fill with soft clay bg.
**Ghost Button**: No background/border. Text: muted→foreground on hover. Underline appears sage on hover (offset 4px).
**Danger Button**: Terracotta (`#C27B66`) border/text. Hover: terracotta bg. Distinct in both themes. Never use sage for destructive.

### 2.2 Card Component Requirements
Cards are soft, floating, organic containers with generous rounded corners.

**Structure**: Background white (`#FFFFFF`) or soft clay (`#F2F0EB`). Border: none or very subtle stone (`#E6E2DA`) at 1px. Shape: `rounded-3xl` (24px) or `rounded-[40px]`. Padding: generous (`p-8` to `p-10`).
**Default**: Flexbox, very subtle borders, `--bg-secondary`.
**Hover**: Slight lift (`-translate-y-1`) + bloom of soft shadow (`shadow-md` to `shadow-lg`). Smooth `duration-500`.
**Focus-within**: Sage border tint when child receives focus.
**Loading (Skeleton)**: Sage-tinted shimmer.
**Empty State**: Google Material Symbol (`eco` or `search_off`) in soft pale sage circle + guidance text.
**Staggered Card Pattern** (MANDATORY): `translate-y-12` on every second card in row at `md:` breakpoint and above.

### 2.3 Form & Input Requirements
**Structure**: Underlined only (border-bottom) or pill-shaped (`rounded-full`) with light background (`#F2F0EB`). Height h-12 (48px). No background boxes for underlined style.
**States**: Empty (default), Focused (soft sage border transition, `ring-2 ring-[#8C9A84]` offset, no harsh blue), Filled, Valid (sage border + checkmark icon), Invalid (terracotta border + error icon + terracotta text), Disabled (opacity 0.5), Read-only.
**Label Pattern**: Uppercase, text-sm, sage green for active. Above input or floating label.
**Structure**: Flex container with label, input, error feedback container.

### 2.4 Modal / Popup Requirements
**States** (slow and graceful): Opening (fade + scale 0.95→1.0, 500ms), Open (centered flex, warm alabaster backdrop + `backdrop-blur-sm`, `rounded-3xl` card with subtle stone border), Loading (sage spinner), Success/Error (sage/terracotta accents), Closing (reverse, 500ms).
**UX**: Backdrop (semi-transparent warm alabaster + blur), close button (Google Material Symbol `close` in soft pale sage circle), keyboard focus trapping, Esc/overlay close, `aria-modal="true"`, `role="dialog"`, `aria-labelledby`.

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

### 3.1 Arch Imagery (MANDATORY)
Use CSS `clip-path` or `border-radius` to turn rectangular images into **Arches** (Roman arch shape) or **Organic Blobs**. Arch: `border-radius: 50% 50% 0 0 / 30% 30% 0 0` or `rounded-t-full`. Organic Blob: irregular border-radius for natural flowing shapes.

### 3.2 Paper Grain Texture (CRITICAL - NON-NEGOTIABLE)
Subtle SVG noise overlay mandatory on main background. Fixed full-screen overlay, `opacity-[0.015]`, SVG fractal noise filter. The defining element that transforms design from flat digital to warm, tactile, paper-like. Without it, the design loses its soul. Apply via CSS pseudo-element on `body::before`.

### 3.3 Overlapping Typography (MANDATORY)
Allow big serif headlines to slightly overlap images or background shapes. Creates editorial dynamism.

### 3.4 Decorative Lines (MANDATORY)
Fine 1px lines that curve or meander to connect sections, mimicking vines or roots. Organic dividers replace straight horizontal rules.

### 3.5 Italic Emphasis (MANDATORY)
Frequently use *Italic* variant of Playfair Display for single words within bold headlines. Fundamental to editorial, hand-touched aesthetic.

### 3.6 Staggered Grid (MANDATORY)
Break the grid. `translate-y-12` on every second card creates "staggered" natural look. Organic flow within structure.

### 3.7 Soft, Diffused Shadows (MANDATORY)
No harsh dark drops. All shadows very soft, diffused, forest green tints:
- Default: `0 4px 6px -1px rgba(45, 58, 49, 0.05)`
- Medium: `0 10px 15px -3px rgba(45, 58, 49, 0.05)`
- Large: `0 20px 40px -10px rgba(45, 58, 49, 0.05)`
- Extra Large: `0 25px 50px -12px rgba(45, 58, 49, 0.15)`

### 3.8 Blur Effects
Use `backdrop-blur-sm` on overlays (hero quote card) to create depth and layering.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Mobile-First**: Graceful adaptation maintaining organic character.
- **Navigation**: Desktop horizontal nav + Sign In. Mobile hamburger → full-screen overlay with vertical nav.
- **Hero Image**: `aspect-[3/4]` on mobile, `aspect-square` with fixed height on md+.
- **Grid Breakpoints**: Features 1→3(md). Stats 2→4(md). Blog/Testimonials 1→3(md). Pricing 1→3(lg).
- **Typography**: Headlines `text-8xl` → `text-5xl` on mobile. Body `text-lg` with adjusted line-height.
- **Spacing**: `py-32` → `py-16` mobile, `gap-16` → `gap-12`, `p-8` → `p-4`.
- **Touch Targets**: Min 44px (`h-12`, `h-14`).
- **Staggered Cards**: `translate-y-12` only at `md:` and above.
- **Container**: `max-w-7xl` for airiness. Generous whitespace: `gap-12` or `gap-16`. `py-24` or `py-32`.

### 4.2 Smooth Animations
- **Feel**: Slow, graceful, fluid. Like suspended in honey or swaying in gentle breeze. "Eased out" significantly.
- **Durations**: Fast `duration-300` (button hovers, link colors). Standard `duration-500` (card lifts, transforms). Slow/dramatic `duration-700` to `duration-1000` (image scales, hero hover).
- **Hover**: Cards `-translate-y-1` or `-translate-y-2` + shadow intensification. Images `scale-105` with `duration-700` (luxurious). Buttons `bg-opacity-90` subtle darkening, `duration-300`. Blog cards: lift + scale image + arrow `translate-x-1`.
- **Focus States**: Sage green ring (`ring-[#8C9A84]`) 2px + offset.
- **Accordion**: Smooth height transitions `max-h-0` to `max-h-48` + opacity fade.
- **Mobile Menu**: Slide in from top with backdrop.
- **Scroll**: Elements gently fade up and float into place (`opacity-0`→`opacity-100`, `translate-y-4`→`translate-y-0`).
- **Respect `prefers-reduced-motion`**: Disable all animations.

### 4.3 Accessibility (a11y)
- **Contrast**: Forest green (`#2D3A31`) on warm alabaster (`#F9F8F4`): excellent (exceeds AA). Muted sage (`#6B7B6F`) on alabaster: meets AA for secondary.
- Never rely on color alone. Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**: Sage green ring 2px + offset. Never remove.
- **Touch Targets**: Min 44px height.
- **Keyboard**: Clear focus. Follows hierarchy. Skip-to-content link.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Cards lift with shadow bloom. Images scale smoothly. Buttons darken slightly. Links shift color. Accordion chevrons rotate. All transitions slow and graceful (300ms-1000ms).

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Terracotta (`#C27B66`) border/text, terracotta hover bg. Never use sage green for destructive.

---

## 5. LAYOUT & SPACING

- **Container**: `max-w-7xl` for airiness.
- **Whitespace**: Generous. `gap-12` or `gap-16` between grid items. `py-24` or `py-32` between sections.
- **Grid**: Break the grid. `translate-y-12` on every second card for staggered natural look.
- **Layout Patterns**: Hero centered with offset decorative elements. Features 3-column with generous gaps. Asymmetric column splits where appropriate.

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Thin stroke (weight 1.5 equivalent). Size h-5 w-5 to h-6 w-6. Color: Deep Forest Green or Sage.
- Integration: Don't put in heavy boxes. Let them float, or place in soft pale sage circles. Use organic, nature-inspired symbols (`eco`, `spa`, `grass`, `park`).

---

## 7. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Playfair Display (400, 500, 600, 700, italic), Source Sans 3 (400, 500, 600).
- Google Material Symbols: Material Symbols Outlined.

---

## 8. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Paper grain texture, arch image shapes, and vine-like decorative dividers may be applied via CSS pseudo-elements and `clip-path`/`border-radius` on existing elements.