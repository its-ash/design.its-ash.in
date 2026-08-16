# Sketch (Hand-Drawn) Design System — Coding Prompt

## Design Philosophy

The Hand-Drawn design style celebrates authentic imperfection and human touch in a digital world. It rejects the clinical precision of modern UI design in favor of organic, playful irregularity that evokes sketches on paper, sticky notes on a wall, and napkin diagrams from a brainstorming session.

**Core Principles:**
- **No Straight Lines**: Every border, shape, and container uses irregular border-radius values to create wobbly, hand-drawn edges that reject geometric perfection
- **Authentic Texture**: Paper grain, dot patterns, and subtle background textures simulate physical media (notebook paper, post-its, sketch pads)
- **Playful Rotation**: Elements are deliberately tilted using small rotation transforms (-2deg to 2deg) to break rigid grid alignment and create casual energy
- **Hard Offset Shadows**: Reject soft blur shadows entirely. Use solid, offset box-shadows (4px 4px 0px) to create a cut-paper, layered collage aesthetic
- **Handwritten Typography**: Use exclusively handwritten or marker-style fonts (Kalam, Patrick Hand) that feel human and approachable, never corporate or sterile
- **Scribbled Decoration**: Dashed lines, hand-drawn arrows, tape effects, thumbtacks, and irregular shapes reinforce the sketched aesthetic
- **Limited Color Palette**: Pencil blacks, paper whites, correction marker red, and post-it yellow for bold but cohesive simplicity
- **Intentional Messiness**: Embrace overlap, asymmetry, and visual "mistakes" that make the design feel spontaneous and creative

**Emotional Intent:**
This style should feel approachable, creative, human-centered, and fun. It lowers barriers and invites interaction by appearing unfinished and work-in-progress, making users feel like collaborators rather than consumers. Perfect for creative tools, brainstorming platforms, educational content, or any product that wants to emphasize human creativity over corporate polish.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS

Keep all styling strictly inside a dedicated CSS file (`style.css`):

* **No Inline CSS:** Explicitly forbid the use of the `style="..."` attribute in HTML. **Exception:** Wobbly border-radius values (e.g., `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;`) must be defined as CSS classes using CSS variables (`--wobbly`, `--wobbly-md`) rather than inline styles. Store reusable radius values as CSS variables and apply via class selectors.
* **Class/ID Selectors Only:** Require all design properties, layout rules, and states to be targeted via class or ID selectors.
* **Minimal HTML Modifications:** HTML structure must remain clean, semantic, and agnostic of visual styling so that changing the site's look requires modifying only the CSS file, not the markup.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens

Store all visual tokens inside `:root` (and theme classes) using CSS variables. Merge the hand-drawn palette with the required token set:

* **Colors:**
  - `--primary: #ff4d4d` (Red Correction Marker — accent/CTA)
  - `--secondary: #2d5da1` (Blue Ballpoint Pen — secondary accent)
  - `--bg-primary: #fefefe` (Light mode uses #fefefe instead of #ffffff; Sketch uses warm paper `#fdfbf7` mapped here)
  - `--bg-secondary: #e5e0d8` (Old Paper / Erased Pencil — muted surface)
  - `--text-primary: #2d2d2d` (Soft Pencil Black — never pure black)
  - `--text-secondary: #2d2d2d` at 40% opacity (muted placeholder text)
  - `--text-success: #2d8659` (Hand-drawn green check)
  - `--text-error: #ff4d4d` (same as primary red for errors)
  - `--border-default: #2d2d2d` (Pencil Lead)
  - `--border-error: #ff4d4d`
  - `--border-success: #2d8659`
  - `--postit-yellow: #fff9c4` (Post-it sticky-note background)
* **Contrast Pairing:** Light paper backgrounds (`--bg-primary: #fdfbf7`) pair with dark pencil text (`--text-primary: #2d2d2d`). Post-it yellow (`--postit-yellow`) pairs with `--text-primary`. Accent red fills pair with white text.
* **Light Mode Background:** Use `#fefefe` as the base; map warm paper `#fdfbf7` to `--bg-primary`.
* **Border Radius & Shadows:**
  - `--radius-sm: 255px 15px 225px 15px / 15px 225px 15px 255px` (wobbly)
  - `--radius-md: 15px 225px 15px 255px / 225px 15px 255px 15px` (wobbly-md, reversed)
  - `--radius-lg: 255px 15px 225px 15px / 15px 225px 15px 255px` (wobbly large)
  - `--shadow-sm: 3px 3px 0px 0px rgba(45, 45, 45, 0.1)` (subtle depth)
  - `--shadow-md: 4px 4px 0px 0px #2d2d2d` (standard hard offset — no blur)
  - `--shadow-lg: 8px 8px 0px 0px #2d2d2d` (emphasized hard offset)
  - `--shadow-hover: 2px 2px 0px 0px #2d2d2d` (reduced offset on hover for "lifting" effect)
* **Spacing & Transitions:**
  - `--spacing-gap: 0.5rem` (8px) base gap; use `2rem` (32px) for grid gaps
  - `--transition-fast: 100ms` (fast and snappy for jiggle)
  - `--transition-normal: 200ms`
  - `--ease-standard: ease-out`
* **Elevation/Stacking:**
  - `--z-dropdown: 100`
  - `--z-modal: 1000`
  - `--z-toast: 2000`
* **Paper Texture (CSS variable pattern):**
  - `--paper-texture: radial-gradient(#e5e0d8 1px, transparent 1px)` with `background-size: 24px 24px` — applied to body background
* **Typography Tokens:**
  - `--font-heading: 'Kalam', cursive` (wght 700 — thick felt-tip marker)
  - `--font-body: 'Patrick Hand', cursive` (wght 400 — legible handwritten)
  - `--font-base: var(--font-body)`

### 1.3 Mandatory Dark Mode Support

Dark Mode must always be defined. For Sketch style, dark mode transforms the paper aesthetic into a "dark sketchbook / chalkboard" feel:

* **Implementation:** Define dark mode color tokens under `@media (prefers-color-scheme: dark)` and/or a `.dark` class selector:
  - `--bg-primary: #1a1a1a` (dark sketchbook)
  - `--bg-secondary: #2d2d2d` (old paper dark)
  - `--text-primary: #fdfbf7` (chalk white)
  - `--text-secondary: rgba(253, 251, 247, 0.4)`
  - `--border-default: #fdfbf7` (chalk lines)
  - `--primary: #ff4d4d` (stays red)
  - `--secondary: #4d7cd1` (brighter blue for dark)
  - `--postit-yellow: #4a4a3a` (muted dark post-it)
  - `--paper-texture: radial-gradient(rgba(253,251,247,0.05) 1px, transparent 1px)`
* **Theme Switching:** Background and text CSS variables switch seamlessly without requiring HTML restructuring.
* **Persistence:** User theme choice persists via `localStorage`, falling back to `prefers-color-scheme` on first visit; require a visible toggle control with correct `aria-pressed`/`aria-label` state.

### 1.4 Flexbox Layout & Mobile-First Alignment

Build layout structures using Flexbox (`display: flex`):

* **Default Alignment Rule:** Every flex container **must default to `align-items: center`** unless there is an explicitly justified exception.
* **Mobile-Friendly First:** All flex layouts must be mobile-responsive out of the box (converting rows to columns on smaller viewports). Prevent horizontal scrolling.
* **Rotation on Elements:** Apply small rotations (`rotate-1`, `-rotate-2`) to cards, images, and decorative elements via CSS classes (not inline styles). On mobile, reduce rotation slightly (`-rotate-1` instead of `-rotate-2`).
* **Overlap & Layering:** Overlapping avatar circles with negative margin (`-space-x-4`), decorative elements positioned absolutely outside parent bounds, speech bubble tails extending beyond card borders.
* **Grid System:** Use responsive grid (`grid-cols-1 md:grid-cols-2`, `md:grid-cols-3`) with generous gap (`gap-8`). Max-width containers (`max-w-5xl`, `max-w-3xl`) for focused content.

### 1.5 Framework Default & Tailwind CSS Integration

Use Tailwind CSS (or clean custom CSS driven by Tailwind's `@layer` / `@apply` directives). All utility classes must map back to CSS variables or generic reusable class names (`.btn`, `.card`, `.input-group`, `.postit`, `.tape`, `.tack`).

### 1.6 Typography & Icons (Google Fonts Mandatory)

* **Text:** Include Google Font `<link>` tags for `Kalam` (weights: 700) and `Patrick Hand` (weight: 400). Bind `--font-heading` to Kalam and `--font-base` / `--font-body` to Patrick Hand.
* **Icons:** Use Google Material Symbols/Icons. Explicitly forbid raw inline SVGs or local icon files. Style icons with `stroke-width` equivalent to 2.5–3, enclosed in rough circles for key icons.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements

Style all states via CSS classes:

* **Default:** Flex layout (`display: flex; align-items: center; justify-content: center; gap: 0.5rem;`). Minimum touch target of 44x44px (use `h-12` / 48px). Shape: irregular wobbly oval using `border-radius: var(--radius-sm)`. Background: white (`--bg-primary`), `border: 3px solid var(--border-default)`, text: `var(--text-primary)`. Hard offset shadow: `box-shadow: var(--shadow-md)`. Font: `var(--font-body)`.
* **Hover:** Background fills with accent red `var(--primary)`, text turns white. Shadow reduces to `var(--shadow-hover)`. Subtle translate: `translate(2px, 2px)`. Cursor: `pointer`.
* **Focus:** Distinct focus ring using CSS variables (`outline: 2px solid var(--secondary); outline-offset: 2px;`) for keyboard navigation.
* **Active/Pressed:** Shadow disappears completely (button "presses flat"). Translate increases: `translate(4px, 4px)`.
* **Loading:** Disables interactions, prevents double-clicks, and renders a CSS spinner (dashed circle with rotation animation) without distorting button dimensions. Overlay with semi-transparent `--bg-secondary`.
* **Disabled:** Reduced opacity (`opacity: 0.5`), greyscale, and `cursor: not-allowed`.
* **Success/Error:** Temporary feedback state styles driven by `--text-success` or `--text-error` border/shadow.
* **Secondary Variant:** Uses muted background `var(--bg-secondary)`, hovers to blue `var(--secondary)` with white text.
* **Danger Variant:** `.btn-danger` uses `--text-error` border and fills with `--text-error` on hover; visually distinct in both light and dark themes.

### 2.2 Card Component Requirements

* **Default:** Flexible Flexbox layout, styled with wobbly black borders (`border: 2px solid var(--border-default)`) and `border-radius: var(--radius-md)`. Background: `var(--bg-primary)`. Shadow: `var(--shadow-sm)` for subtle depth.
* **Hover:** Elevation/transform: `transform: translateY(-2px) rotate(1deg)` (slight jiggle/lift). Shadow offset increases. Cards rotate slightly (`rotate-1` or `-rotate-1`).
* **Focus-within:** Highlights card borders (border color shifts to `--secondary`) when a child link/button receives focus.
* **Loading (Skeleton):** Shimmer animation styling defined in CSS to prevent layout jumps. Use dashed border skeleton.
* **Empty State:** Structured fallback layout featuring a Google Icon and clear guidance text in handwritten font.
* **Decoration Options (CSS classes):**
  - `.decoration-tape`: Translucent gray bar positioned at top center with slight rotation (pseudo-element)
  - `.decoration-tack`: Red circular thumbtack at top center (pseudo-element)
  - `.postit`: Post-it yellow background `var(--postit-yellow)` for feature cards
  - `.speech-bubble`: Speech bubble style for testimonials with geometric tail using border-based triangle

### 2.3 Form & Input Requirements

* **States:** Empty, Focused (blue border ring), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
* **Structure:** Flex container wrapping a label, input field, and dedicated error feedback container.
* **Style:** Full box with wobbly borders (`border: 2px solid var(--border-default)`, `border-radius: var(--radius-sm)`). Font: `var(--font-body)` for authentic hand-written feel. Background: white with placeholder text in `var(--text-secondary)`.
* **Focus State:** Border changes to `var(--secondary)` (blue ballpoint). Ring effect: `box-shadow: 0 0 0 2px rgba(45, 93, 161, 0.2)`. No standard outline, maintains wobbly aesthetic.

### 2.4 Modal / Popup Requirements

* **States:** Opening, Open, Loading, Success/Error, Closing (all animated via CSS transitions).
* **UX Features:** Centered flex container (`align-items: center`), backdrop overlay (semi-transparent paper texture), Google Icon close button, keyboard focus trapping, and support for closing via `Esc` or overlay clicks.
* **Styling:** Wobbly border radius, hard offset shadow, handwritten font. Backdrop: blurred paper texture.

---

## 3. CORE UX & MICRO-INTERACTION RULES

* **Responsive by Default:** Fluid sizing and responsive breakpoints without horizontal overflow. Typography scaling: headings `text-4xl md:text-5xl` to `text-5xl md:text-6xl`; body `text-lg md:text-xl`; buttons `text-lg md:text-2xl`. All grids collapse to single column on mobile, expand to 2-3 columns on `md:` breakpoint.
* **Hide Decorative Elements on Mobile:** Hand-drawn arrow near CTA (`hidden md:block`), bouncing decorative circle (`hidden md:block`), squiggly connecting line (`hidden md:block`), dashed circle on pricing card (`hidden md:block`).
* **Smooth Animations:** CSS transitions on all state changes (`transition: var(--transition-fast)` for jiggle/hover; `transition: var(--transition-normal)` for color changes), respecting `prefers-reduced-motion`. Hover: "Jiggle" effect (`transform: rotate(1deg)` or `rotate(-2deg)`).
* **Accessibility (a11y):** Sufficient contrast in both Light and Dark modes. Never rely solely on color to communicate state. Require semantic HTML5 elements, correct ARIA roles/labels on custom widgets, logical DOM/focus order, full keyboard operability, and `aria-live` regions for dynamic feedback (form errors, toasts, loading states).
* **Mandatory Visual Feedback:** Every user click, hover, or submission must trigger a visible state change (jiggle, lift, shadow shift, color fill).
* **Destructive Actions:** `.btn-danger` must be visually distinct in both light and dark themes.
* **Touch-Friendly Targets:** Buttons minimum `h-12` (48px). Adequate spacing between interactive elements with `gap-8`.

---

## 4. DELIVERABLE & OUTPUT FORMAT

* **File Structure:** Separate `index.html`, `style.css`, and `script.js` files. No inline `<script>` blocks beyond a single deferred entry-point reference.
* **Naming Convention:** Enforce one consistent class-naming convention (BEM or a fixed utility set) across the entire deliverable — never mix conventions.
* **No Unrequested Placeholders:** Prohibit lorem-ipsum-only submissions where the user supplied real copy/labels; placeholders are allowed only where content was genuinely left unspecified.

---

## 5. EDIT MODE — MODIFYING AN EXISTING UI

When the request targets existing markup/code rather than a from-scratch build:

* **No New Elements:** Never introduce new HTML tags, components, or DOM nodes. Work only within the existing element/class structure.
* **CSS Scope:** Define CSS classes only for elements that already exist in the project's markup — never invent classes for elements that aren't there. Wobbly radius values must be applied via CSS classes referencing `var(--radius-sm)` / `var(--radius-md)`, never via inline `style` attributes.
* **No Behavioral JS:** Do not write JavaScript for form validation, popups/modals, or utility/helper functions. When such logic is requested, ask the user how they want it handled instead of generating it.
* **Clarify Before Assuming:** If a requested style change cannot be achieved without adding markup (e.g., a missing wrapper or icon element), stop and ask the user what they want instead of silently inserting new HTML.

---

## 6. BOLD CHOICES (NON-NEGOTIABLE SIGNATURES)

1. **NO STRAIGHT LINES:** Every container, button, card, and frame uses irregular border-radius values — never standard rounded classes. Wobbly radius via CSS variables.
2. **Hard Offset Shadows:** No blur shadows. `4px 4px 0px 0px #2d2d2d` standard, `8px 8px` emphasized, `2px 2px` hover.
3. **Paper Texture Background:** Body uses `radial-gradient(#e5e0d8 1px, transparent 1px)` at `24px 24px` intervals.
4. **Hand-Drawn Decorations:** Tape strips (translucent gray pseudo-elements), thumbtack pins (colored circles), dashed circle overlays, speech bubble geometric tails, squiggly connecting lines.
5. **Playful Typography Treatments:** Rotating exclamation marks, wavy underline decorations on nav links, drop-cap first letters, post-it sticky-note tags.
6. **Interactive Personality:** Buttons "press flat" by eliminating shadow on active. Cards rotate slightly on hover. Blog cards increase shadow offset on hover for "lift" effect.
7. **Handwritten Fonts Only:** Kalam for headings, Patrick Hand for body — never corporate sans-serif.
8. **Generous Whitespace:** Consistent section padding (`py-20`), generous grid gaps (`gap-8`), max-width containers (`max-w-5xl`).

🤖