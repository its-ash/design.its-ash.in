# Coding Prompt: Corporate Trust Design System Implementation

You are tasked with building a complete web UI in the **Corporate Trust** design style—the modern enterprise SaaS aesthetic. Professional yet approachable, sophisticated yet friendly. It draws inspiration from tech unicorns and high-growth startups that have successfully humanized the corporate experience. The design rejects the cold, sterile formality of traditional corporate websites in favor of a warm, confident, and inviting presence.

**Core Principles**:
- **Trustworthy Yet Vibrant**: Establishes credibility through clean structure and professional typography while maintaining visual energy through vibrant gradients and colorful accents.
- **Dimensional Depth**: Uses isometric perspectives, soft colored shadows, and subtle 3D transforms to create visual interest and break free from flat design.
- **Refined Elegance**: Every element is polished with attention to micro-interactions, smooth transitions, and sophisticated hover states.
- **Purposeful Gradients**: Indigo-to-violet gradients serve as the visual signature, used strategically in headlines, buttons, and decorative elements.
- **Professional Polish**: Generous white space, consistent spacing rhythms, and crisp typography create a premium, enterprise-ready feel.

**Keywords**: Trustworthy, Vibrant, Polished, Dimensional, Modern, Approachable, Enterprise-Ready, Elegant.

**Visual DNA**:
1. **Colored Shadows**: Soft shadows with blue/purple tints instead of neutral grays.
2. **Isometric Elements**: Subtle 3D transforms (rotate-x, rotate-y) on decorative cards and visualizations.
3. **Gradient Text**: Strategic use of gradient text for emphasis in headlines.
4. **Soft Blobs**: Large, blurred gradient orbs in the background for atmospheric depth.
5. **Elevated Cards**: White cards that lift on hover with enhanced shadows.
6. **Dual-Tone Palette**: Indigo (primary) + Violet (secondary) creating a cohesive gradient spectrum.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML.
- **Exception**: Background blur orbs may be applied via a fixed container with CSS. Isometric transforms may be applied via CSS classes on existing elements.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (Light Mode):
```css
:root {
  --bg-primary: #F8FAFC;
  --bg-secondary: #FFFFFF;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --muted: #F1F5F9;
  --border-default: #E2E8F0;
  --border-error: #EF4444;
  --border-success: #10B981;
  --primary: #4F46E5;
  --secondary: #7C3AED;
  --accent-foreground: #FFFFFF;
  --text-success: #10B981;
  --text-error: #EF4444;
  --font-heading: "Plus Jakarta Sans", sans-serif;
  --font-body: "Plus Jakarta Sans", sans-serif;
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-base: "Plus Jakarta Sans", sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-card-default: 0 4px 20px -2px rgba(79, 70, 229, 0.1);
  --shadow-card-hover: 0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1);
  --shadow-button: 0 4px 14px 0 rgba(79, 70, 229, 0.3);
  --shadow-glow: 0 0 20px rgba(79, 70, 229, 0.5);
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --spacing-gap: 2rem;
  --transition-fast: 200ms ease-out;
  --transition-normal: 500ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
  --gradient-primary: linear-gradient(to right, #4F46E5, #7C3AED);
  --gradient-text: linear-gradient(to right, #4F46E5, #7C3AED);
  --gradient-bg: linear-gradient(to right, #E0E7FF, #EDE9FE);
  --gradient-cta-dark: linear-gradient(to right, #312E81, #1E1B4B);
}
```

**Contrast Pairing Rules**: Light backgrounds (`#F8FAFC`, `#FFFFFF`, muted `#F1F5F9`) pair with dark text (slate 900 `#0F172A`). Indigo/violet gradient backgrounds pair with white text. White on indigo 900 (`#312E81`): AAA compliant. Slate 900 on slate 50: AAA compliant. Use `#fefefe` instead of `#ffffff` where a near-white is needed.

### 1.3 Mandatory Dark Mode Support
Corporate Trust is inherently light. You MUST implement a dark mode variant:
- **Dark Mode (Enterprise Night)**: Under `@media (prefers-color-scheme: dark)` and/or `.dark` class. `--bg-primary: #0F172A` (slate 900), `--bg-secondary: #1E293B` (slate 800), `--text-primary: #F8FAFC`, `--text-secondary: #94A3B8`, `--muted: #1E293B`, `--border-default: #334155`. Indigo/violet remain vibrant, slightly brightened for dark contrast. Colored shadows intensified.
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Professional toggle (sun/moon Google Material Symbol in indigo-bordered rounded container).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-first: design begins at 375px width, progressively enhances.
- **Responsive Breakpoints**: sm 640px, md 768px, lg 1024px, xl 1280px.
- **Grid Strategy**: Hero two-column `lg:grid-cols-2` (text-first). Features alternating zig-zag with `lg:flex-row` and `lg:flex-row-reverse`. Pricing three-column `md:grid-cols-3` (center emphasis). Stats four-column `md:grid-cols-4`.
- **Text Width Constraints**: `max-w-xl` or `max-w-2xl` on paragraphs (60-75 character lines).
- No horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.gradient-text`, `.blur-orb`, `.isometric-card`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Font Family**: `"Plus Jakarta Sans", sans-serif` (Google Font). Geometric sans-serif with friendly rounded terminals that perfectly balances professional authority with modern approachability. Clean letterforms ensure excellent readability while maintaining visual warmth.
- **Scaling**: Major Third (1.250) scale provides substantial hierarchy without overwhelming.
- **Font Weights**: Display/Headings ExtraBold (800) for hero headlines, Bold (700) for section headings. Subheadings SemiBold (600) for card titles and emphasis. Body Text Regular (400) for paragraphs, Medium (500) for navigation and labels.
- **Line Heights**: Headlines 1.1 (tight tracking for impact). Body Text 1.6-1.7 (relaxed for readability).
- **Letter Spacing**: Tight tracking (-0.02em) on large headlines for modern polish.
- **Responsive Type Scale**: Mobile text-2xl to text-4xl for h1. Desktop text-4xl to text-6xl for h1. Progressive scaling ensures legibility.
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs. Default stroke 2px. Size h-4 w-4 (inline) to h-6 w-6 (featured). Rounded joins for friendliness.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements
**Primary**: Gradient background (Indigo to Violet). `rounded-full` or `rounded-lg`. White text. Slight shadow (`shadow-button`). Transition: Lift (`-translate-y-0.5`) and increase shadow on hover.
- **Default**: Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min 44x44px. Background: `gradient-primary`. Text: White, medium weight, slightly tracked. Shadow: `shadow-button`.
- **Hover**: `-translate-y-0.5` + enhanced shadow. `cursor: pointer`.
- **Focus**: `focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`.
- **Active**: Returns to base position. Subtle press.
- **Loading**: Disabled, CSS indigo spinner, no dimension distortion.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success` (emerald) or `--text-error` (red).

**Secondary**: White background, border `#E2E8F0`, text slate 700. Hover: `bg-slate-50` and darker border.
**Ghost**: No background/border. Text: muted→foreground on hover.
**Danger Button**: Red (`#EF4444`) for destructive. Distinct in both themes. Never use indigo/violet for destructive.

### 2.2 Card Component Requirements
**Base**: White background, `rounded-xl` (12px), `border border-slate-100`, soft colored shadow (`shadow-card-default`). Flex (`align-items: center; justify-content: center; gap: 0.5rem`).
- **Default**: White surface, subtle border, soft indigo-tinted shadow.
- **Hover**: Slight lift (`-translate-y-1`) + increased shadow intensity (`shadow-card-hover`). Smooth `duration-200` transition for professional polish.
- **Focus-within**: Highlights when child receives focus.
- **Loading (Skeleton)**: Shimmer animation (indigo-tinted) to prevent layout jumps.
- **Empty State**: Google Material Symbol in `bg-indigo-50 text-indigo-600` container + guidance text.
- **Feature Cards**: May feature an icon in a soft-colored circle (`bg-indigo-50 text-indigo-600`).
- **Pricing Highlight**: Center card uses `md:scale-105` with special ring styling.

### 2.3 Form & Input Requirements
**Style**: `bg-white`, `border-slate-200`, `rounded-lg` (8px).
- **Default**: White background, subtle border.
- **Focused**: `ring-2 ring-indigo-500 ring-offset-1` and `border-indigo-500`. Indigo focus ring.
- **Filled**: Maintain styling.
- **Valid**: Success border (emerald `#10B981`) + checkmark Google Material Symbol.
- **Invalid**: Error border (red `#EF4444`) + error icon + red text.
- **Disabled**: `opacity: 0.5`, `cursor: not-allowed`.
- **Read-only**: Slightly darker background, no focus ring.
- **Label**: `text-sm font-semibold text-slate-700`.
- **Structure**: Flex container with label, input, error feedback container.

### 2.4 Modal / Popup Requirements
**States** (all animated via CSS transitions, refined and professional):
- **Opening**: Fade in backdrop + scale up content from 0.95 to 1.0 over 200ms (smooth, professional).
- **Open**: Centered flex container (`align-items: center`), backdrop overlay with slate tint + blur. Content in a `rounded-xl` white card with `shadow-card-hover`.
- **Loading**: Indigo CSS spinner inside modal content area.
- **Success/Error**: Temporary feedback with emerald or red accents.
- **Closing**: Reverse of opening animation over 200ms.

**UX Features**:
- Backdrop overlay: semi-transparent slate with subtle blur.
- Close button: Google Material Symbol (`close`) in an indigo-bordered rounded container, top-right of modal.
- Keyboard focus trapping: focus remains within modal while open.
- Support closing via `Esc` key or overlay click.
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` pointing to modal title.

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

### 3.1 Isometric Depth & 3D Transforms (MANDATORY)
- **Hero Card**: `perspective-[2000px]` parent with `rotate-x-[5deg] rotate-y-[-12deg]` child creates subtle isometric effect.
- **Hover Transforms**: `hover:rotate-x-[2deg] hover:rotate-y-[-8deg]` — Subtle 3D movement on interaction.
- **Feature Cards**: Alternating `rotate-y-[6deg]` and `rotate-y-[-6deg]` based on layout position.
- **Benefit Visualization**: `rotate-x-6 rotate-y-12 transform` on gradient container for dramatic depth.

### 3.2 Strategic Gradient Usage (MANDATORY)
- **Split Headlines**: First 3 words in standard color, remaining words in gradient for visual hierarchy.
- **Gradient Buttons**: Full background gradient with hover lift (`-translate-y-0.5`).
- **Badge Elements**: NEW badge with solid indigo background inside gradient-ringed container.
- **Final CTA**: White button on dark gradient background creates dramatic contrast.

### 3.3 Colored Shadows (MANDATORY)
Soft shadows with blue/purple tints instead of neutral grays:
- Default Card Shadow: `0 4px 20px -2px rgba(79, 70, 229, 0.1)` — Soft blue-tinted base elevation.
- Hover Card Shadow: `0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1)` — Multi-layer depth.
- Button Shadow: `0 4px 14px 0 rgba(79, 70, 229, 0.3)` — Strong presence for primary CTAs.
- Glow Effects: Numbered badges use `shadow-[0_0_20px_rgba(79,70,229,0.5)]` for ethereal glow.

### 3.4 Atmospheric Background Elements (MANDATORY)
- **Blur Orbs**: Large (400-600px) circular gradients with heavy blur positioned absolutely.
- **Layered Positioning**: Multiple blobs at different z-indexes create depth.
- **Subtle Animation**: `animate-pulse duration-[4000ms]` on floating cards for gentle movement.

### 3.5 Elevated Card System (MANDATORY)
- **Default State**: Soft colored shadow with subtle border.
- **Hover State**: Lift effect (`-translate-y-1`) combined with enhanced shadow.
- **Transition**: Smooth `duration-200` for professional polish.
- **Pricing Highlight**: Center card uses `md:scale-105` with special ring styling.

### 3.6 Micro-Interactions (MANDATORY)
- **Arrow Icons**: `transition-transform group-hover:translate-x-1` for directional feedback.
- **Image Zoom**: `group-hover:scale-105` on blog images with overlay fade-in.
- **Chevron Rotation**: `group-open:rotate-180` for FAQ accordions.
- **Button Lift**: Subtle upward movement on hover reinforces clickability.

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Mobile-First Philosophy**: Design begins at 375px width, progressively enhances.
- **Touch Targets**: Minimum 44x44px for all interactive elements (buttons, links).
- **Typography Scaling**: Headlines reduce from `text-6xl` (desktop) to `text-4xl` (mobile). Body text maintains readability at `text-base` with responsive line heights.
- **Layout Adaptations**: Two-column layouts stack to single column on mobile. Navigation collapses to essential items (login hidden on mobile). Pricing cards stack vertically with equal width. Footer columns stack progressively (4 col → 2 col → 1 col).
- **Spacing Compression**: Padding and margins reduce proportionally on smaller screens.
- **Image Optimization**: Aspect ratios maintained, sizes adapt to container width.
- **Horizontal Scrolling**: Never required; all content fits viewport width.
- **Visual Hierarchy Preserved**: Even on mobile, clear distinction between heading levels maintained.
- **Container**: `max-w-7xl` (1280px). Padding `px-4 sm:px-6`.
- **Vertical Rhythm**: Mobile `py-16` (64px), Tablet `sm:py-20` (80px), Desktop `lg:py-24` (96px).

### 4.2 Animation & Transitions
- **Philosophy**: "Refined Motion" — Smooth, professional, never jarring.
- **Base Transition**: `transition-all duration-200` for general interactive elements.
- **Long Transitions**: `duration-500` for image zooms and complex animations.
- **Hover Effects**: Cards combine `hover:-translate-y-1` with shadow enhancement. Buttons `hover:-translate-y-0.5` for subtle lift. Icons `transition-transform group-hover:translate-x-1` for directional cues.
- **Easing**: Default `ease-out` for natural deceleration.
- **Pulse Animation**: `animate-pulse duration-[4000ms]` on decorative floating elements for gentle breathing effect.
- **State Changes**: Smooth color transitions on links and buttons reinforce interactivity.
- **Respect `prefers-reduced-motion`**: Disable all animations.

### 4.3 Accessibility (a11y)
- **Color Contrast**: All text meets WCAG AA standards. Slate 900 on Slate 50: AAA. White on Indigo 900: AAA. Link colors tested for 4.5:1 minimum ratio.
- Never rely on color alone. Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**: Visible ring on all interactive elements: `focus-visible:ring-2 focus-visible:ring-indigo-500`. Ring offset for clarity: `focus-visible:ring-offset-2`. Never remove focus indicators.
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3). Native `<button>` elements. `<nav>` for navigation, `<footer>` for footer. Details/summary for FAQ accordions.
- **Image Alt Text**: Descriptive alternatives for all images.
- **Interactive States**: Hover (visual feedback on all clickable elements). Active (subtle state change on click). Disabled (reduced opacity with `pointer-events-none`).
- **Motion Preferences**: Consider `prefers-reduced-motion` for users sensitive to animation.
- **Screen Reader Support**: Proper ARIA labels where semantic HTML insufficient.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Cards lift with shadow enhancement. Buttons lift with shadow increase. Arrow icons translate right on group hover. Images zoom on group hover. Chevron icons rotate on accordion open.

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Red (`#EF4444`) for destructive actions. Never use indigo/violet for destructive.

---

## 5. LAYOUT & SPACING

- **Container**: `max-w-7xl` (1280px). Padding `px-4 sm:px-6`.
- **Vertical Rhythm**: Mobile `py-16` (64px), Tablet `sm:py-20` (80px), Desktop `lg:py-24` (96px).
- **Section Spacing**: Generous white space between sections creates breathing room.
- **Grid Strategy**: Hero two-column `lg:grid-cols-2` (text-first). Features alternating zig-zag. Pricing three-column `md:grid-cols-3` (center emphasis). Stats four-column `md:grid-cols-4`.
- **Text Width Constraints**: `max-w-xl` or `max-w-2xl` on paragraphs (60-75 character lines).

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- Default stroke 2px. Size h-4 w-4 (inline) to h-6 w-6 (featured). Rounded joins for friendliness.
- **Color Treatment**: Badge icons in `text-indigo-600` on `bg-indigo-100` container. Navigation icons inherit text color, transition on hover. Social icons `text-slate-400 hover:text-indigo-400`.
- **Icon Containers**: Small badges `h-12 w-12 rounded-xl` with soft background. Large features `h-14 w-14 rounded-xl`. Circular `rounded-full` for avatars or status indicators.
- **Accessibility**: Icons decorative with proper text alternatives or hidden from screen readers when paired with text.

---

## 7. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Plus Jakarta Sans (400, 500, 600, 700, 800).
- Google Material Symbols: Material Symbols Outlined.

---

## 8. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Background blur orbs and isometric transforms may be applied via CSS on existing elements.