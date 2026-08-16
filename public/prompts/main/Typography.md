# Bold Typography Design System — Coding Prompt

## Design Philosophy

Bold Typography is **poster design translated to web**. Typography isn't decoration — it's the entire visual language. Every design decision serves the type: color exists to create contrast, space exists to frame letterforms, and interaction exists to reveal typographic details.

### Core Principles

1. **Type as Hero**: Headlines aren't just labels — they're the visual centerpiece. A well-set 80pt headline is more compelling than any stock photo.
2. **Extreme Scale Contrast**: The gap between headline and body creates drama. Think 6:1 or greater ratio between H1 and paragraph text.
3. **Deliberate Negative Space**: White (or black) space isn't empty — it's the frame around your type. Generous margins make headlines feel intentional.
4. **Strict Hierarchy**: Every element has a clear rank. No two elements compete for attention. The eye flows: headline → subhead → body → action.
5. **Restrained Palette**: Black, white, and one accent (vermillion `#FF3D00`). Let the type shapes do the work.

**The Vibe:** Confident. Editorial. Deliberate. This isn't friendly SaaS — it's a design manifesto. The page feels like a gallery exhibition or luxury magazine spread.

**Visual Signatures:**
- Massive headlines that make you scroll
- Tight letter-spacing on display text (`-0.04em` to `-0.06em`)
- Wide letter-spacing on labels (`0.1em` to `0.2em`)
- Text that bleeds to edge on mobile
- Underlines as the primary interactive affordance
- No rounded corners — sharp edges match sharp typography

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS

Keep all styling strictly inside a dedicated CSS file (`style.css`):

* **No Inline CSS:** Explicitly forbid the use of the `style="..."` attribute in HTML.
* **Class/ID Selectors Only:** Require all design properties, layout rules, and states to be targeted via class or ID selectors.
* **Minimal HTML Modifications:** HTML structure must remain clean, semantic, and agnostic of visual styling so that changing the site's look requires modifying only the CSS file, not the markup.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens

Store all visual tokens inside `:root` (and theme classes) using CSS variables. Merge the Bold Typography dark palette with the required token set:

* **Colors (Dark Mode Default):**
  - `--primary: #FF3D00` (Vermillion — warm, urgent, visible accent)
  - `--secondary: #FAFAFA` (Warm white — secondary/accent foreground)
  - `--bg-primary: #0A0A0A` (Near-black, not pure black)
  - `--bg-secondary: #1A1A1A` (Subtle surface elevation / muted)
  - `--text-primary: #FAFAFA` (Warm white)
  - `--text-secondary: #737373` (Secondary text — WCAG AA on dark)
  - `--text-success: #16a34a`
  - `--text-error: #FF3D00` (same as primary accent for errors)
  - `--border-default: #262626` (Barely-there dividers)
  - `--border-error: #FF3D00`
  - `--border-success: #16a34a`
  - `--card: #0F0F0F` (Slight elevation from background)
  - `--ring: #FF3D00` (Focus states match accent)
* **Contrast Pairing:** Near-black background (`#0A0A0A`) pairs with warm white text (`#FAFAFA`) — 18.1:1 ratio. Muted foreground (`#737373`) on background = 5.3:1 (AA). Accent (`#FF3D00`) on background = 5.4:1 (AA for large text). Accent used sparingly — headlines, key CTAs, and underlines only.
* **Light Mode Background:** Use `#fefefe` instead of `#ffffff` for light mode. Light mode tokens:
  - `--bg-primary: #fefefe`
  - `--bg-secondary: #F2F2F2`
  - `--text-primary: #0A0A0A`
  - `--text-secondary: #555555`
  - `--border-default: #E5E5E5`
  - `--primary: #FF3D00` (stays the same)
* **Border Radius & Shadows:**
  - `--radius-sm: 0px` (No border-radius anywhere — sharp edges only)
  - `--radius-md: 0px`
  - `--radius-lg: 0px`
  - `--shadow-sm: none` (No traditional shadows — depth comes from layered type)
  - `--shadow-md: none`
  - `--shadow-lg: none`
* **Spacing & Transitions:**
  - `--spacing-gap: 1.5rem`
  - `--transition-fast: 150ms` (micro-interactions — buttons, underlines)
  - `--transition-normal: 200ms` (standard transitions — FAQ accordion, colors)
  - `--ease-standard: cubic-bezier(0.25, 0, 0, 1)` (fast-out, crisp stop)
* **Elevation/Stacking:**
  - `--z-dropdown: 100`
  - `--z-modal: 1000`
  - `--z-toast: 2000`
* **Typography Tokens:**
  - `--font-base: 'Inter Tight', 'Inter', system-ui, sans-serif` (headlines — tighter default spacing)
  - `--font-display: 'Playfair Display', Georgia, serif` (pull quotes and testimonials only — elegant contrast)
  - `--font-mono: 'JetBrains Mono', 'Fira Code', monospace` (labels, stats, technical details)
  - `--font-heading: var(--font-base)`
* **Type Scale:**
  - `--text-xs: 0.75rem` (12px — fine print)
  - `--text-sm: 0.875rem` (14px — captions)
  - `--text-base: 1rem` (16px — body)
  - `--text-lg: 1.125rem` (18px — lead paragraphs)
  - `--text-xl: 1.25rem` (20px — subheads)
  - `--text-2xl: 1.5rem` (24px — section intros)
  - `--text-3xl: 2rem` (32px — H3)
  - `--text-4xl: 2.5rem` (40px — H2)
  - `--text-5xl: 3.5rem` (56px — H1 mobile)
  - `--text-6xl: 4.5rem` (72px — H1 tablet)
  - `--text-7xl: 6rem` (96px — H1 desktop)
  - `--text-8xl: 8rem` (128px — Hero statement)
  - `--text-9xl: 10rem` (160px — Decorative numbers)
* **Tracking:**
  - `--tracking-tighter: -0.06em` (display headlines)
  - `--tracking-tight: -0.04em` (large headings)
  - `--tracking-normal: -0.01em` (body — slightly tightened)
  - `--tracking-wide: 0.05em` (small labels)
  - `--tracking-wider: 0.1em` (all-caps labels)
  - `--tracking-widest: 0.2em` (sparse emphasis)
* **Line Heights:**
  - `--leading-none: 1` (single-line headlines)
  - `--leading-tight: 1.1` (multi-line headlines)
  - `--leading-snug: 1.25` (subheads)
  - `--leading-normal: 1.6` (body text)
  - `--leading-relaxed: 1.75` (long-form reading)

### 1.3 Mandatory Dark Mode Support

Bold Typography defaults to dark mode. Light mode must also be defined:

* **Implementation:** Define light mode color tokens under `@media (prefers-color-scheme: light)` and/or a `.light` class selector (tokens listed in 1.2). Dark mode is the `:root` default.
* **Theme Switching:** Background and text CSS variables switch seamlessly without requiring HTML restructuring. The accent vermillion (`#FF3D00`) stays consistent across both themes.
* **Persistence:** User theme choice persists via `localStorage`, falling back to `prefers-color-scheme` on first visit; require a visible toggle control with correct `aria-pressed`/`aria-label` state.

### 1.4 Flexbox Layout & Mobile-First Alignment

Build layout structures using Flexbox (`display: flex`):

* **Default Alignment Rule:** Every flex container **must default to `align-items: center`** unless there is an explicitly justified exception.
* **Mobile-Friendly First:** All flex layouts must be mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
* **Asymmetric Grids:** 7/5 or 8/4 splits instead of 6/6. Staggered alignment — elements don't always align top. Text columns: `max-w-2xl` for readability, headlines can span full width.
* **Container:** `max-width: 1200px` (`max-w-5xl`), padding: 24px mobile → 48px tablet → 64px desktop.
* **Section Spacing:** `py-20` (80px — tight), `py-28` (112px — standard), `py-40` (160px — hero/CTA sections).

### 1.5 Framework Default & Tailwind CSS Integration

Use Tailwind CSS (or clean custom CSS driven by Tailwind's `@layer` / `@apply` directives). All utility classes must map back to CSS variables or generic reusable class names (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.card`, `.input-group`, `.underline-link`, `.section-label`).

### 1.6 Typography & Icons (Google Fonts Mandatory)

* **Text:** Include Google Font `<link>` tags for `Inter Tight` (weights: 400, 500, 600, 700), `Playfair Display` (weights: 400, 700), and `JetBrains Mono` (weights: 400, 500). Bind `--font-base` to Inter Tight, `--font-display` to Playfair Display, `--font-mono` to JetBrains Mono.
* **Icons:** Use Google Material Symbols/Icons (or `lucide-react` with `stroke-width: 1.5px`). Explicitly forbid raw inline SVGs. Use sparingly — text labels are preferred. Icons: 16px inline, 18px UI controls, 20px navbar, 24px feature icons. Color: `currentColor` (inherits). Accent icons: explicitly `var(--primary)`. Never filled icons — always outline/stroke style.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements

Style all states via CSS classes:

* **Default (Primary — text-only with animated underline):** Flex layout (`display: flex; align-items: center; justify-content: center; gap: 0.5rem;`). Minimum touch target of 44x44px. No background fill. Text in `var(--primary)` (vermillion). Animated underline: absolute positioned span, `height: 2px`, `background: var(--primary)`. Base state: `scale-x(1)`, on hover: `scale-x(1.1)`. Uppercase, wide tracking (`--tracking-wider: 0.1em`). Font-weight: 600. Padding: `py-2/3/4` based on size, `px-0`. No border radius (0px). Transition: `150ms all`.
* **Secondary/Outline Button:** Border: `1px solid var(--text-primary)`. Text: `var(--text-primary)`. No background fill initially. On hover: `background: var(--text-primary)`, text becomes `var(--bg-primary)` color (full inversion). Sharp corners (0px radius). Padding: `px-6`. Uppercase, `--tracking-wider`.
* **Ghost Button:** No border, no fill. Text: `var(--text-secondary)`. Padding: `px-4`. On hover: text becomes `var(--text-primary)`. Underline appears via `scale-x(0)` to `scale-x(1)` transition. Underline is `1px` (thinner than primary).
* **Hover:** Animated underline scale, text color transition (150ms). Cursor: `pointer`.
* **Focus:** `outline: 2px solid var(--ring); outline-offset: 2px;` — 2px ring in accent, 2px offset. No glow, no fill change. Visible on all interactive elements.
* **Active/Pressed:** `translate-y(1px)` for tactile press feedback. No scale, no glow, no bounce.
* **Loading:** Disables interactions, prevents double-clicks, and renders a CSS spinner (thin line rotation) without distorting button dimensions. `pointer-events: none`, `opacity: 0.5`.
* **Disabled:** `pointer-events: none`, `opacity: 0.5`, `cursor: not-allowed`.
* **Success/Error:** Temporary feedback state styles driven by `--text-success` or `--text-error`.
* **Danger Variant:** `.btn-danger` uses `var(--text-error)` text and underline; visually distinct in both themes. Destructive actions must be visually distinct in both light and dark themes.
* **Animation:** All buttons: `transition: all 150ms var(--ease-standard)`. Fast and decisive — no bouncy easing, no playful delays.

### 2.2 Card Component Requirements

* **Default:** Minimal card usage. Content is primarily separated by generous section padding (`py-20` to `py-40`), full-width horizontal borders (`border-t`/`border-b`), typography scale changes, and background color alternation (`var(--bg-primary)` ↔ `var(--bg-secondary)`). When a "card" is necessary (pricing, testimonials): Border: `1px solid var(--border-default)` (controlled by `bordered` prop). Background: transparent. No radius (0px, sharp corners). No shadow. Padding: `p-6` (mobile) to `p-8` (desktop). Transition on hover: border color to `var(--border-default)` hover state (150ms).
* **Hover:** Border color lightens. Background color change on feature cards (transparent → `var(--bg-secondary)`). No lift, no shadow, no scale.
* **Focus-within:** Highlights card borders when a child link/button receives focus.
* **Loading (Skeleton):** Shimmer animation styling defined in CSS to prevent layout jumps.
* **Empty State:** Structured fallback layout featuring a Google Icon and clear guidance text.
* **Highlighted Card (featured pricing tier):** Border: `2px solid var(--primary)` (overrides default 1px). Small accent badge above content (`background: var(--primary)`, `px-3 py-1`, uppercase mono text). No background change — border is the differentiator.
* **Special Depth Technique:** Add accent top border: `absolute; height: 1px; width: 4rem; background: var(--primary)`. Layered text: duplicate text element offset with `-z-10` and border color. Creates subtle dimensionality without shadows.

### 2.3 Form & Input Requirements

* **States:** Empty, Focused (border color to `var(--primary)`, no ring, no glow, `outline: none`), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled (`cursor: not-allowed`, `opacity: 0.5`), Read-only.
* **Structure:** Flex container wrapping a label, input field, and dedicated error feedback container.
* **Style:** Background: `var(--bg-secondary)` (`#1A1A1A`). Border: `1px solid var(--border-default)`. Border-radius: 0px (`rounded-none`, sharp corners). Height: `h-12` (mobile) to `h-14` (desktop), responsive. Font-size: `1rem` (16px — prevents zoom on iOS). Padding: `px-4`. Text color: `var(--text-primary)`. Placeholder: `var(--text-secondary)`. Focus: `border-color: var(--primary)`, no ring, no glow, `outline: none`. Transition: `colors 150ms`.

### 2.4 Modal / Popup Requirements

* **States:** Opening, Open, Loading, Success/Error, Closing (all animated via CSS transitions — 200ms with ease-out, fast and decisive).
* **UX Features:** Centered flex container (`align-items: center`), backdrop overlay, Google Icon close button, keyboard focus trapping, and support for closing via `Esc` or overlay clicks.
* **Styling:** Sharp corners (0px), thin `1px` borders, no shadows. Typography-driven — large headings, generous whitespace.

---

## 3. CORE UX & MICRO-INTERACTION RULES

* **Responsive by Default:** Fluid sizing and responsive breakpoints without horizontal overflow. Mobile-first typography scaling: Headlines `text-3xl` (mobile) → `text-4xl/5xl` (tablet) → `text-6xl/7xl/8xl` (desktop). Hero headline: `text-4xl` → `text-5xl` → `text-6xl` → `text-7xl` → `text-8xl` (progressive enhancement). Body text: `1rem` (16px) throughout with `md:text-lg` on key sections. Maintain hierarchy ratio at all sizes. Hide decorative overflow elements (large "01", "ACME" text) on mobile. Ensure touch targets are minimum 44x44px (buttons `h-12` on mobile, `h-14` on desktop). Stack email input + button on mobile, side-by-side on tablet+.
* **Smooth Animations:** CSS transitions on all state changes (`transition: all var(--transition-fast)`, `transition: all var(--transition-normal)`), respecting `prefers-reduced-motion`. Motion Philosophy: Fast and decisive. No bouncy easing. No playful delays. Movement is confident and direct. Duration: 150ms (micro-interactions), 200ms (standard transitions), 500ms (image hover effects). Easing: `cubic-bezier(0.25, 0, 0, 1)` — fast-out, crisp stop.
* **Specific Effects:**
  - Link/Button: Underline scale animation (`scale-x(0)` to `scale-x(1)` on hover for ghost, `scale-x(1)` to `scale-x(1.1)` for primary). Text color transition (150ms). Active press: `translate-y(1px)`. No scale, no glow, no bounce.
  - Card hover: Border color lightens. Background color change on feature cards. No lift, no shadow, no scale.
  - Image hover: Scale transform (`scale(1.05)`) over 500ms. Image only, not container. Overflow hidden on container.
  - FAQ accordion: Height auto-animate with opacity fade. 200ms with ease-out. Icons swap (Plus ↔ Minus) instantly.
  - Step number hover: Color transition from border color to accent (fast, 150ms). No movement, pure color change.
* **Page Scroll Animations:** Fade in + slide up (`opacity: 0→1`, `translateY: 20px→0`) over 500ms. Stagger children by 80ms with 100ms delay before first. Viewport trigger: once only, 15% threshold, -50px margin.
* **Accessibility (a11y):** Contrast: `var(--text-primary)` (#FAFAFA) on `var(--bg-primary)` (#0A0A0A) = 18.1:1. `var(--text-secondary)` (#737373) on background = 5.3:1 (AA). `var(--primary)` (#FF3D00) on background = 5.4:1 (AA for large text). Focus: 2px accent outline, 2px offset, no glow, no fill change. Body text minimum 16px. Line-height minimum 1.5 for body. No thin weights below 400. Touch targets minimum 44x44px. Underlines are 2px+ for visibility. Color is never the only indicator. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback.
* **Mandatory Visual Feedback:** Every user click, hover, or submission must trigger a visible state change (underline scale, color transition, border shift).
* **Destructive Actions:** `.btn-danger` must be visually distinct in both themes.

---

## 4. DELIVERABLE & OUTPUT FORMAT

* **File Structure:** Separate `index.html`, `style.css`, and `script.js` files. No inline `<script>` blocks beyond a single deferred entry-point reference.
* **Naming Convention:** Enforce one consistent class-naming convention (BEM or fixed utility set) across the entire deliverable — never mix conventions.
* **No Unrequested Placeholders:** Prohibit lorem-ipsum-only submissions where the user supplied real copy/labels; placeholders are allowed only where content was genuinely left unspecified.

---

## 5. EDIT MODE — MODIFYING AN EXISTING UI

When the request targets existing markup/code rather than a from-scratch build:

* **No New Elements:** Never introduce new HTML tags, components, or DOM nodes. Work only within the existing element/class structure.
* **CSS Scope:** Define CSS classes only for elements that already exist in the project's markup — never invent classes for elements that aren't there.
* **No Behavioral JS:** Do not write JavaScript for form validation, popups/modals, or utility/helper functions. When such logic is requested, ask the user how they want it handled instead of generating it.
* **Clarify Before Assuming:** If a requested style change cannot be achieved without adding markup, stop and ask the user.

---

## 6. BOLD CHOICES (NON-NEGOTIABLE SIGNATURES)

1. **Type as Hero:** Headlines are the visual centerpiece. Massive scale (`text-8xl` to `text-9xl` on desktop). A well-set headline is more compelling than any image.
2. **Extreme Scale Contrast:** 6:1 or greater ratio between H1 and paragraph text. Headlines: `text-5xl` → `text-9xl`. Body: `1rem` — `1.125rem`.
3. **Tight Letter-Spacing on Display:** `-0.04em` to `-0.06em` on large headlines. Wide letter-spacing (`0.1em` to `0.2em`) on all-caps labels.
4. **No Rounded Corners:** `0px` border radius everywhere. Sharp edges match sharp typography.
5. **No Shadows:** Depth comes from layered type, underlines, and dividers — not drop shadows. Decorative oversized numbers/text behind content with low opacity. Text shadow technique: duplicate text offset 1-2px in border color.
6. **Underlines as Primary Interaction:** Animated underline scale (`scale-x(0)` → `scale-x(1)`) is the main interactive affordance. 2-3px accent lines under interactive elements.
7. **Restrained Palette:** Black, white, and one accent (vermillion `#FF3D00`). More colors dilute the typographic impact.
8. **Deliberate Negative Space:** Generous margins make headlines feel intentional. Section padding `py-20` to `py-40`. Max-width `1200px` containers.
9. **Subtle Noise Texture:** Very subtle fractal noise pattern at 1.5% opacity overlays the entire page via inline SVG data URL with `feTurbulence` filter. Adds tactile quality to the dark background.
10. **Accent Bars:** Thin horizontal accent-colored bars (`height: 1px`, `width: 4rem`) as visual anchors on key elements.
11. **Dual-Font System:** Inter Tight for headlines (tighter spacing), Playfair Display for pull quotes/testimonials (elegant contrast), JetBrains Mono for labels/stats/technical details.
12. **Text Bleeds to Edge on Mobile:** Headlines span full width on mobile for dramatic poster effect.

🤖