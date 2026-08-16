# Coding Prompt: Serif / Business Design System Implementation

You are tasked with building a complete web UI in the **Serif / Business** design style—an editorial, timeless aesthetic that draws inspiration from the finest editorial publications, literary magazines, and luxury brand identities. This design system believes the highest form of design is one that elevates content through refined typography, considered spacing, and deliberate simplicity.

**Vibe**: Editorial, Timeless, Warm, Refined. Like opening a beautifully designed hardcover book or a premium architecture magazine. The pages breathe. The typography has room to speak. Nothing screams for attention because everything has been placed with intention.

**Emotional Keywords**: Timeless, Warm, Sophisticated, Literary, Confident. True elegance comes from restraint, not embellishment. This design is secure enough to be quiet.

**What This Design Is NOT**: Not cold or stark (despite being minimal). Not trendy or ephemeral. Not decorative or ornate. Not corporate or generic. Not loud or aggressive.

**The DNA of This Style**:

1. **The Signature Serif**: Playfair Display is the cornerstone. High contrast between thick and thin strokes, elegant ball terminals, classical proportions. Appears in all major headlines, large display numbers, pull quotes, logo wordmark. Serif typefaces carry associations with tradition, trustworthiness, and intellectual depth.

2. **The Warm Palette**: Essentially monochromatic with a single warm accent. Ivory backgrounds, rich black text, warm gray secondary, burnished gold accent (inspired by gold leaf in illuminated manuscripts, gilded edges of fine books, brass details in luxury interiors).

3. **The Rule Line System**: Thin horizontal rules (1px lines) are defining elements—section dividers, card borders (top accent lines), underline effects, table separators. Inspired by editorial layouts where fine lines create structure and rhythm without visual weight.

4. **Small Caps & Tracking**: Small caps used extensively for section labels, meta information, supporting text, navigation items. Combined with generous letter-spacing (0.1em - 0.15em), creating a refined, sophisticated, distinctly editorial look.

5. **Generous Whitespace**: This design breathes. Large section padding, narrow content max-width, relaxed line heights. Whitespace is an active design element.

6. **Asymmetric Balance**: While overall aesthetic is classical, layouts embrace asymmetric compositions. Hero centered with offset decorative elements, benefits with uneven column splits (1.3fr / 0.7fr), cards with thin top border creating visual weight.

**Differentiation: Minimalism With Soul**: The serif typeface is the key differentiator. It brings visual interest without decoration, warmth without color, character without complexity, timelessness without being dated. This is minimalism with a point of view.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML.
- **Exception**: Rule lines and decorative dividers may be applied via CSS pseudo-elements on existing elements without new HTML nodes.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (Monochrome With Warmth):
```css
:root {
  --bg-primary: #FAFAF8;
  --bg-secondary: #F5F3F0;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --muted: #F5F3F0;
  --border-default: #E8E4DF;
  --border-error: #B8860B;
  --border-success: #B8860B;
  --primary: #B8860B;
  --secondary: #D4A84B;
  --accent-foreground: #FFFFFF;
  --text-success: #B8860B;
  --text-error: #B8860B;
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
  --font-display: "Playfair Display", Georgia, serif;
  --font-base: "Source Sans 3", system-ui, sans-serif;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(26,26,26,0.04);
  --shadow-md: 0 4px 12px rgba(26,26,26,0.06);
  --shadow-lg: 0 8px 24px rgba(26,26,26,0.08);
  --shadow-accent: 0 4px 12px rgba(184,134,11,0.15);
  --spacing-gap: 2rem;
  --transition-fast: 200ms ease-out;
  --transition-normal: 200ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
}
```

**Contrast Pairing Rules**: Light backgrounds (ivory `#FAFAF8`, muted `#F5F3F0`, white `#FFFFFF`) pair with dark text (rich black `#1A1A1A`). Gold accent backgrounds (`#B8860B`) pair with white text. Warm gray (`#6B6B6B`) on ivory: meets WCAG AA for secondary. Use `#fefefe` instead of `#ffffff` where a near-white is needed.

### 1.3 Mandatory Dark Mode Support
Serif/Business is inherently light, editorial. You MUST implement a dark mode variant:
- **Dark Mode (Midnight Library)**: Under `@media (prefers-color-scheme: dark)` and/or `.dark` class. `--bg-primary: #1A1A1A` (rich black), `--bg-secondary: #242424`, `--text-primary: #FAFAF8` (ivory), `--text-secondary: #9B9B9B`, `--muted: #242424`, `--border-default: #383838`, `--primary: #D4A84B` (lighter gold for dark contrast), `--secondary: #B8860B`. Shadows adjusted to dark tints `rgba(0,0,0,0.3)`.
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Refined toggle (sun/moon Google Material Symbol in gold-bordered circle with thin stroke).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive: rows → columns on small viewports.
- **Asymmetric Compositions**: Hero centered with offset decorative elements. Benefits uneven column splits (`grid-cols-[1.3fr_0.7fr]`). Cards with thin top border creating visual weight.
- No horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.rule-line`, `.small-caps`, `.accent-top`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Display/Headlines**: `"Playfair Display", Georgia, serif` — elegant high-contrast serif. The signature of this design.
- **Body/UI**: `"Source Sans 3", system-ui, sans-serif` — clean, highly readable sans-serif.
- **Monospace**: `"IBM Plex Mono", monospace` — for labels and small caps.
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs.
- **Type Scale**: Hero 7xl→4.5rem, Playfair, Normal, `-0.02em`, leading 1.1, centered. Section 4xl→2.5rem, Playfair, Normal, `-0.01em`, leading 1.2. Card xl→1.25rem, Playfair, Semibold, leading 1.3. Body base→lg, Source Sans 3, Normal, `0.01em`, leading 1.75 (very relaxed). Labels xs (12px), IBM Plex Mono, Medium, `0.15em`, UPPERCASE small caps. Navigation sm, Source Sans 3, Medium, `0.05em`.
- **Small Caps Pattern** (MANDATORY):
```css
.small-caps {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```
Used extensively for: section labels, meta information, supporting text, navigation items.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
Buttons are refined, elegant, with subtle tactile feedback. Refined transitions (200ms).

**Primary Button**:
- **Default**: Background: gold (`#B8860B`). Text: White, medium weight, slightly tracked. Radius: `rounded-md` (6px). Shadow: very subtle, accent-tinted (`shadow-sm`). Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min height 44px mobile. `touch-manipulation`.
- **Hover**: Color shifts to `#D4A84B`, shadow enhances to `shadow-accent`, subtle lift (`-translate-y-0.5`). `cursor: pointer`.
- **Focus**: `ring-2 ring-[var(--primary)] ring-offset-2`.
- **Active**: Returns to base position (`translate-y-0`).
- **Loading**: Disabled, CSS gold spinner, no dimension distortion.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success`/`--text-error` (gold for both—restrained palette. Pair with distinct icons to differentiate: checkmark for success, warning for error).

**Secondary/Outline Button**: Transparent, `1px` border in `foreground` color (strong contrast), `foreground` text. Hover: fill with `muted` bg, border/text shift to gold. Smooth color transitions.
**Ghost Button**: No bg/border. Text: `muted-foreground` → `foreground` on hover. Underline appears gold on hover (offset 4px).
**Danger Button**: Gold border/text (restrained palette). Hover: gold bg with white text. Distinct in both themes through thickness and iconography (warning symbol) rather than red/green.

### 2.2 Card Component Requirements
Cards are refined surfaces with thin borders and optional top accent lines. Very subtle shadows—this isn't about depth, it's about refinement.

**Standard Card**:
- Background: white (`#FFFFFF`). Border: `1px` in `#E8E4DF` (warm gray). Radius: `rounded-lg` (8px). Shadow: `shadow-sm` (very subtle).
- Top accent: Optional `2px` gold border on top edge (when `accentTop` class used).
- **Default**: Flexbox, thin warm gray borders, `--bg-secondary`.

**Hover Effects** (when `hoverEffect` class used):
- Shadow increases to `shadow-md`.
- Border shifts to `border-hover` (slightly darker warm gray).
- Background subtle tint to `muted/30` (30% opacity).
- **No translate/lift** — maintains elegant restraint. Smooth `200ms` transition.

**Focus-within**: Gold border tint when child receives focus.
**Loading (Skeleton)**: Gold-tinted shimmer.
**Empty State**: Google Material Symbol (`search_off` or `inbox`) + guidance text in warm gray.
**Rule Lines** (Critical for Style Identity): Thin horizontal rules as section dividers. Top border accent on cards (1px accent). Decorative rule under headlines.

### 2.3 Form & Input Requirements
**Structure**: Background white. Border `1px` in `#E8E4DF`. Radius `rounded-lg` (8px). Height h-11 (44px). Label: `text-sm font-semibold`, warm gray.
**States**: Empty (default), Focused (`ring-2 ring-[var(--primary)] ring-offset-1` and `border-[var(--primary)]`—gold focus ring), Filled, Valid (gold border + checkmark icon), Invalid (gold border + error icon + gold text—restrained palette. Use distinct icons: warning for error, checkmark for success), Disabled (opacity 0.5), Read-only.
**Form Structure**: Flex container with label (small caps style, IBM Plex Mono), input, error feedback container.

### 2.4 Modal / Popup Requirements
**States** (refined and elegant): Opening (fade + scale 0.97→1.0, 200ms), Open (centered flex, ivory backdrop tint, `rounded-lg` card with thin warm gray border + very subtle shadow, optional 2px gold top accent), Loading (gold spinner), Success/Error (gold accents), Closing (reverse, 200ms).
**UX**: Backdrop (semi-transparent ivory + very subtle blur), close button (Google Material Symbol `close` in gold-bordered circle with thin stroke), keyboard focus trapping, Esc/overlay close, `aria-modal="true"`, `role="dialog"`, `aria-labelledby` (title in Playfair Display).

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

### 3.1 The Signature Serif (MANDATORY)
Playfair Display for ALL major headlines, large display numbers, pull quotes, logo wordmark. The cornerstone of the design. High contrast between thick and thin strokes, elegant ball terminals, classical proportions immediately establish editorial gravitas.

### 3.2 The Warm Palette (MANDATORY)
Essentially monochromatic with single warm accent. Ivory (`#FAFAF8`), rich black (`#1A1A1A`), warm gray (`#6B6B6B`), burnished gold (`#B8860B`). Gold used sparingly for emphasis—inspired by gold leaf, gilded edges, brass details.

### 3.3 The Rule Line System (MANDATORY)
Thin horizontal rules (1px lines) as defining elements: section dividers, card borders (top accent lines), underline effects, table separators. Always in warm gray (`#E8E4DF`). Create structure and rhythm without visual weight.

### 3.4 Small Caps & Tracking (MANDATORY)
Small caps for section labels, meta information, supporting text, navigation items. Combined with generous letter-spacing (0.1em - 0.15em). Implemented via IBM Plex Mono with uppercase transform.

### 3.5 Generous Whitespace (MANDATORY)
This design breathes. Section padding `py-32` to `py-44`. Content max-width `max-w-5xl` (narrower for reading comfort). Line height for body 1.75 (very relaxed). Whitespace is an active design element.

### 3.6 Asymmetric Balance (MANDATORY)
While overall aesthetic is classical, layouts must embrace asymmetric compositions:
- Hero: Centered but with offset decorative elements
- Benefits: Uneven column splits (`grid-cols-[1.3fr_0.7fr]`)
- Cards: Thin top border creates visual weight at top

Prevents design from feeling static or predictable while maintaining elegance.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Container Width**: `max-w-5xl` (64rem) for narrower, more readable content columns.
- **Section Spacing**: Large vertical padding (`py-32` to `py-44`) creates paced, contemplative scrolling.
- **Component Density**: Generous internal padding (p-8 to p-10) on cards.
- **Grid Gaps**: `gap-8` to `gap-12` between grid items.
- **Layout Patterns**: Hero centered, narrow container, stacked elements. Features 3-column with generous gaps. Benefits asymmetric 2-column (`grid-cols-[1.3fr_0.7fr]`). Thin rule lines create visual structure.
- No horizontal overflow.

### 4.2 Smooth Animations
- **Philosophy**: Refined transitions (200ms). Subtle, elegant, never dramatic or jarring.
- **Hover Effects**: Cards—shadow increases, border shifts, background subtle tint. No translate/lift (maintains elegant restraint). Buttons—subtle lift on primary adds tactile feedback while maintaining elegance. Smooth `200ms` transition.
- **Respect `prefers-reduced-motion`**: Disable all animations.

### 4.3 Accessibility (a11y)
- **Contrast**: Rich black (`#1A1A1A`) on ivory (`#FAFAF8`): excellent (exceeds AAA). Warm gray (`#6B6B6B`) on ivory: meets AA for secondary. Gold (`#B8860B`) on ivory: sufficient for accents and large text.
- Never rely on color alone (critical for this style—success and error both use gold. Use distinct icons: checkmark for success, warning for error).
- Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**: Visible ring on all interactive elements: `focus-visible:ring-2 focus-visible:ring-[var(--primary)]`. Ring offset for clarity: `focus-visible:ring-offset-2`. Never remove focus indicators.
- **Touch Targets**: Min 44x44px.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Cards: shadow increases, border shifts, background tints. Buttons: subtle lift, color shift, shadow enhancement. Links: underline appears/thickens in gold. All transitions refined at 200ms.

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Since this style uses restrained monochrome-with-gold palette, destructive actions use gold border/text with warning Google Material Symbol (`warning`) to differentiate from success (checkmark icon). Never rely on color alone—always pair with distinct iconography.

---

## 5. LAYOUT & SPACING

- **Section Spacing**: Large vertical padding (`py-32` to `py-44`) creates paced, contemplative scrolling.
- **Container Width**: `max-w-5xl` (64rem) for narrower, more readable content columns.
- **Component Density**: Generous internal padding (p-8 to p-10) on cards.
- **Grid Gaps**: `gap-8` to `gap-12` between grid items.
- **Layout Patterns**: Hero centered, narrow container, stacked elements. Features 3-column with generous gaps. Benefits asymmetric 2-column (`grid-cols-[1.3fr_0.7fr]`). Thin rule lines create visual structure.

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Thin, refined strokes. Size 16-24px. Color: Gold (`#B8860B`) for accent icons. Warm gray (`#6B6B6B`) for secondary.
- Containers: Simple, unadorned containers or floating freely. No heavy boxes—elegance is in restraint.

---

## 7. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Playfair Display (400, 500, 600, 700, italic), Source Sans 3 (400, 500, 600), IBM Plex Mono (500).
- Google Material Symbols: Material Symbols Outlined.

---

## 8. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Rule lines, dividers, and top accent borders may be applied via CSS pseudo-elements on existing elements.