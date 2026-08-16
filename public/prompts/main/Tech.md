# Minimalist Modern (Tech) Design System — Coding Prompt

## Design Philosophy

### Core Principle

**Clarity through structure, character through bold detail.** This design system embraces modern web layouts and dynamic interactions while honoring minimalist foundations. It operates on a fundamental tension: restraint in quantity, confidence in execution. Every element that appears has earned its place — but those elements are executed with deliberate flair and precision.

Whitespace is a precision instrument for directing attention. Motion is communication. Color is concentrated into a single, electrifying accent that commands the eye wherever it appears.

### The Visual Vibe

**Professional yet design-forward. Confident and artistic. Refined but alive.**

The intersection of a high-tech SaaS product's precision with a creative agency's bold portfolio sensibility.

**Emotional Keywords:** Confident, Sophisticated, Alive, Premium, Contemporary.

### The DNA of This Style

1. **The Signature Gradient:** The Electric Blue gradient (`#0052FF` → `#4D7CFF`) is the heartbeat. Appears on primary buttons, text highlights, icon container backgrounds, featured card border strokes, testimonial accent bars, trend indicators, CTAs, and pricing highlights.
2. **Inverted Contrast Sections:** Strategic sections flip the color scheme — deep slate `foreground` as background with light text. Creates dramatic visual rhythm.
3. **Animated Depth & Living Elements:** Pulsing indicators, floating cards, rotating decorative rings, hover responses, entrance animations.
4. **Sophisticated Dual-Font Typography:** Calistoga (display, warm/characterful serif) paired with Inter (UI/body, clean/legible). Monospace accents (JetBrains Mono).
5. **Texture Over Flatness:** Dot patterns at 2-3% opacity, radial glows, layered shadows, gradient overlays.
6. **Asymmetry & Visual Tension:** Asymmetric grids (`1.1fr / 0.9fr`), offset testimonials, elevated pricing tiers, asymmetric border radii.
7. **The Section Label System:** Consistent badge pattern with pill shape, animated dot, uppercase monospace text.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS

Keep all styling strictly inside a dedicated CSS file (`style.css`):

* **No Inline CSS:** Explicitly forbid the use of the `style="..."` attribute in HTML.
* **Class/ID Selectors Only:** Require all design properties, layout rules, and states to be targeted via class or ID selectors.
* **Minimal HTML Modifications:** HTML structure must remain clean, semantic, and agnostic of visual styling so that changing the site's look requires modifying only the CSS file, not the markup.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens

Store all visual tokens inside `:root` (and theme classes) using CSS variables. Merge the Minimalist Modern palette with the required token set:

* **Colors:**
  - `--primary: #0052FF` (Electric Blue — primary action color, CTAs, links, highlights)
  - `--secondary: #4D7CFF` (Gradient endpoint — used with `--primary` for gradient effects)
  - `--bg-primary: #fefefe` (Light mode uses #fefefe; Minimalist Modern uses #FAFAFA — map `#FAFAFA` to `--bg-primary`, use `#fefefe` for pure white needs)
  - `--bg-secondary: #F1F5F9` (Slate-100 — muted surfaces, card backgrounds, subtle fills)
  - `--text-primary: #0F172A` (Slate-900 — deep slate, not pure black; also used as inverted section backgrounds)
  - `--text-secondary: #64748B` (Slate-500 — secondary text, descriptions, metadata)
  - `--text-success: #16a34a` (green-600)
  - `--text-error: #dc2626` (red-600)
  - `--border-default: #E2E8F0` (Slate-200 — subtle structural borders)
  - `--border-error: #dc2626`
  - `--border-success: #16a34a`
  - `--card: #FFFFFF` (elevated surfaces, pure white for maximum lift)
  - `--ring: #0052FF` (focus rings, matches primary accent)
* **Gradient Signature:**
  - `--gradient-primary: linear-gradient(to right, #0052FF, #4D7CFF)`
  - `--gradient-diagonal: linear-gradient(135deg, #0052FF, #4D7CFF)`
* **Contrast Pairing:** Warm off-white backgrounds (`#FAFAFA`) pair with deep slate text (`#0F172A`). Inverted sections use near-white text on deep slate. Accent gradient pairs with white text.
* **Light Mode Background:** Use `#fefefe` instead of `#ffffff` where pure white is needed; `#FAFAFA` for primary canvas.
* **Border Radius & Shadows:**
  - `--radius-sm: 8px` (rounded-lg)
  - `--radius-md: 12px` (rounded-xl — default for cards)
  - `--radius-lg: 16px` (rounded-2xl — large cards)
  - `--shadow-sm: 0 1px 3px rgba(0,0,0,0.06)` (subtle lift)
  - `--shadow-md: 0 4px 6px rgba(0,0,0,0.07)` (standard cards)
  - `--shadow-lg: 0 10px 15px rgba(0,0,0,0.08)` (elevated cards)
  - `--shadow-xl: 0 20px 25px rgba(0,0,0,0.1)` (hero elements)
  - `--shadow-accent: 0 4px 14px rgba(0,82,255,0.25)` (accent-tinted lift)
  - `--shadow-accent-lg: 0 8px 24px rgba(0,82,255,0.35)` (featured elements)
* **Spacing & Transitions:**
  - `--spacing-gap: 1.25rem` to `2rem` (gap-5 to gap-8 for grids)
  - `--transition-fast: 200ms` (standard transitions)
  - `--transition-normal: 300ms` (hover lifts)
  - `--ease-standard: ease-out`
* **Elevation/Stacking:**
  - `--z-dropdown: 100`
  - `--z-modal: 1000`
  - `--z-toast: 2000`
* **Typography Tokens:**
  - `--font-display: 'Calistoga', Georgia, serif` (warm, characterful serif — headlines only)
  - `--font-base: 'Inter', system-ui, sans-serif` (clean sans-serif — body, UI)
  - `--font-mono: 'JetBrains Mono', monospace` (section labels, badges, technical callouts)
  - `--font-heading: var(--font-display)`

### 1.3 Mandatory Dark Mode Support

Dark Mode must always be defined. For Minimalist Modern, dark mode shifts the warm off-white canvas to deep slate:

* **Implementation:** Define dark mode color tokens under `@media (prefers-color-scheme: dark)` and/or a `.dark` class selector:
  - `--bg-primary: #0F172A` (deep slate becomes background)
  - `--bg-secondary: #1E293B` (elevated surface)
  - `--text-primary: #FAFAFA` (inverted to near-white)
  - `--text-secondary: #94A3B8` (slate-400)
  - `--border-default: rgba(255,255,255,0.1)`
  - `--card: #1E293B`
  - `--primary: #0052FF` (stays the same)
  - `--secondary: #4D7CFF` (stays the same)
* **Theme Switching:** Background and text CSS variables switch seamlessly without requiring HTML restructuring.
* **Persistence:** User theme choice persists via `localStorage`, falling back to `prefers-color-scheme` on first visit; require a visible toggle control with correct `aria-pressed`/`aria-label` state.

### 1.4 Flexbox Layout & Mobile-First Alignment

Build layout structures using Flexbox (`display: flex`):

* **Default Alignment Rule:** Every flex container **must default to `align-items: center`** unless there is an explicitly justified exception.
* **Mobile-Friendly First:** All flex layouts must be mobile-responsive (rows to columns on small viewports). Prevent horizontal scrolling.
* **Asymmetry Patterns:** Hero: `grid-cols-[1.1fr_0.9fr]` (left-heavy for text dominance). Benefits: `grid-cols-[1.2fr_0.8fr]`. Use negative margins and overlapping elements to create Z-depth.
* **Section Spacing:** Large vertical padding (`py-28` to `py-44`) creates calm, paced scrolling. Container width: `max-w-6xl` (72rem). Grid gaps: `gap-5` to `gap-8`.

### 1.5 Framework Default & Tailwind CSS Integration

Use Tailwind CSS (or clean custom CSS driven by Tailwind's `@layer` / `@apply` directives). All utility classes must map back to CSS variables or generic reusable class names (`.btn`, `.card`, `.input-group`, `.section-label`, `.gradient-text`, `.featured-card`).

### 1.6 Typography & Icons (Google Fonts Mandatory)

* **Text:** Include Google Font `<link>` tags for `Inter` (weights: 400, 500, 600, 700), `Calistoga` (default weight), and `JetBrains Mono` (weights: 400, 500). Bind `--font-display` to Calistoga, `--font-base` to Inter, `--font-mono` to JetBrains Mono.
* **Type Scale:**
  - Hero Headline: `5xl` → `5.25rem`, Calistoga, tight leading (1.05), last word gets gradient text treatment
  - Section Headlines: `3xl` → `3.25rem`, Calistoga, leading 1.15
  - Card Titles: `lg` → `2xl`, Inter, Semibold (600), tight tracking
  - Body Text: `base` → `lg`, Inter, Normal (400), relaxed line-height (1.625-1.75)
  - Section Labels: `xs` (12px), JetBrains Mono, UPPERCASE, tracking `0.15em`
* **Icons:** Use Google Material Symbols/Icons. Explicitly forbid raw inline SVGs. Icons should be subtle, supporting content.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements

Style all states via CSS classes:

* **Default:** Flex layout (`display: flex; align-items: center; justify-content: center; gap: 0.5rem;`). Minimum touch target of 44x44px (`h-12` to `h-14`). Primary: Background gradient (`var(--gradient-primary)`), white text, medium weight. Border-radius: `var(--radius-md)` (12px). Shadow: `var(--shadow-sm)`.
* **Hover:** Lifts up (`-translate-y-0.5`), `var(--shadow-accent-lg)`, brightness increase (`brightness-110`), arrow icon translates right. Cursor: `pointer`.
* **Focus:** Distinct focus ring using CSS variables (`outline: 2px solid var(--ring); outline-offset: 2px;`) for keyboard navigation.
* **Active/Pressed:** Slight scale down (`scale(0.98)`) for tactile feedback.
* **Loading:** Disables interactions, prevents double-clicks, and renders a CSS spinner without distorting button dimensions.
* **Disabled:** Reduced opacity (`opacity: 0.5`), greyscale, and `cursor: not-allowed`.
* **Success/Error:** Temporary feedback state styles driven by `--text-success` or `--text-error`.
* **Secondary/Outline:** Transparent background → `--bg-secondary` on hover. Border: `1px solid var(--border-default)`. Text: `--text-primary`. Hover: border shifts to `--primary` at 30% opacity, shadow appears.
* **Ghost:** No background or border. Text: `--text-secondary` → `--text-primary` on hover.
* **Danger Variant:** `.btn-danger` uses `--text-error` fill; visually distinct in both themes.
* **Animation:** All buttons have `transition: all var(--transition-fast) var(--ease-standard)`.

### 2.2 Card Component Requirements

* **Default:** Flexible Flexbox layout. Background: `var(--card)` (white). Border: `1px solid var(--border-default)`. Border-radius: `var(--radius-md)` (12px) or `var(--radius-lg)` (16px). Shadow: `var(--shadow-md)`. Padding: `p-6` to `p-10`.
* **Hover:** Shadow deepens (`var(--shadow-xl)`). Gradient overlay fades in: `linear-gradient(to bottom right, rgba(0,82,255,0.03), transparent)`. Optional icon scale: `group-hover: scale(1.1)`.
* **Focus-within:** Highlights card borders when a child link/button receives focus.
* **Loading (Skeleton):** Shimmer animation styling defined in CSS to prevent layout jumps.
* **Empty State:** Structured fallback layout featuring a Google Icon and clear guidance text.
* **Featured Card (Gradient Border):** Use 2px gradient stroke via nested divs:
  ```css
  .featured-card { background: var(--gradient-primary); padding: 2px; border-radius: var(--radius-md); }
  .featured-card > .inner { background: var(--card); border-radius: calc(var(--radius-md) - 2px); }
  ```

### 2.3 Form & Input Requirements

* **States:** Empty, Focused (ring), Filled, Valid (success border/icon), Invalid (error border, red text, error icon), Disabled, Read-only.
* **Structure:** Flex container wrapping a label, input field, and dedicated error feedback container.
* **Style:** Height: `h-12` to `h-14`. Border: `1px solid var(--border-default)`. Border-radius: `var(--radius-sm)` or `var(--radius-md)`. Background: Transparent or subtle `--bg-secondary` at 10%. Focus: `box-shadow: 0 0 0 2px var(--ring), 0 0 0 4px var(--bg-primary)` (ring with offset). Placeholder: `--text-secondary` at 50%.

### 2.4 Modal / Popup Requirements

* **States:** Opening, Open, Loading, Success/Error, Closing (all animated via CSS transitions).
* **UX Features:** Centered flex container (`align-items: center`), backdrop overlay, Google Icon close button, keyboard focus trapping, and support for closing via `Esc` or overlay clicks.
* **Styling:** Border-radius: `var(--radius-md)`, shadow: `var(--shadow-xl)`, gradient accents on header.

---

## 3. CORE UX & MICRO-INTERACTION RULES

* **Responsive by Default:** Fluid sizing and responsive breakpoints without horizontal overflow. Hero: single column on mobile, hide abstract graphic on small screens. Stats: 2 columns mobile → 4 columns desktop. Features: 1 → 2 (md) → 3 (lg). Reduce headline sizes: `text-[2.75rem]` mobile → `text-6xl` → `text-[5.25rem]` desktop. Maintain generous section padding (`py-28` → `py-44`). Hide decorative elements on mobile (`hidden lg:block`). Button heights: `h-12` to `h-14` (44px-56px touch targets).
* **Smooth Animations:** CSS transitions on all state changes (`transition: all var(--transition-fast) var(--ease-standard)`, `transition: all var(--transition-normal)`), respecting `prefers-reduced-motion`. Motion Philosophy: Smooth, confident, purposeful. Entrance: `duration-700` with stagger (0.1s delay between children). Hover lifts: `duration-300`. Button active: `duration-200` with scale down.
* **Continuous Animations:** Rotating ring: `60s` linear infinite. Floating cards: `4-5s` ease-in-out infinite y-axis bobbing (±10px). Pulsing dot: `2s` infinite scale/opacity pulse.
* **Accessibility (a11y):** All text meets WCAG AA. `--primary` (#0052FF) on white passes at 4.5:1+. Inverted sections use near-white text on deep slate. Never rely solely on color. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback. Visible focus rings using `ring-2 ring-[var(--ring)] ring-offset-2`.
* **Mandatory Visual Feedback:** Every user click, hover, or submission must trigger a visible state change (lift, shadow, color shift, scale). Buttons have `active:scale(0.98)` for tactile feedback.
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

1. **Gradient Text Highlights:** Key words in headlines use the signature gradient as text color via `background-clip: text`.
2. **Inverted Sections:** At least one section uses `bg-[var(--text-primary)] text-[var(--bg-primary)]` with dot pattern texture for dramatic contrast.
3. **Animated Hero Graphic:** Abstract generative composition with rotating outer ring (60s), floating cards (4-5s staggered y animations, ±10px), geometric shapes, decorative dot grid (3x3), corner accent block.
4. **Gradient Icon Backgrounds:** Feature icons use full gradient backgrounds rather than translucent fills.
5. **Gradient Border Effects:** Highlighted elements (pricing tiers, featured cards) use the 2px gradient stroke technique.
6. **Section Labels (Badges):** Consistent pill badge with animated/pulsing dot, uppercase monospace text, wide letter-spacing at the start of every major section.
7. **Pulsing Indicators:** Animated dots in badges using scale/opacity keyframes.
8. **Arrow Connectors:** Timeline steps connected by small accent-colored circular badges with arrow icons.
9. **Large Decorative Elements:** Quote marks at 120px, step numbers at `text-4xl`, trend arrows in badges.
10. **Textures:** Dot patterns at 2-3% opacity on dark sections, radial glows (blur 150px) at 3-6% opacity at section corners, gradient overlays in hero backgrounds.

🤖