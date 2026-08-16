# Coding Prompt: High-Fidelity Claymorphism Design System Implementation

You are tasked with building a complete web UI in the **High-Fidelity Claymorphism** design style. This design system is not merely a "soft UI"—it is a high-fidelity simulation of a tangible, physical world constructed from premium digital clay. Every element should evoke the sensation of holding a high-end, matte-finish vinyl toy or a soft, air-filled silicone object. It rejects the flatness of modern minimalism in favor of volume, weight, and tactility.

**The "High-Fidelity" Difference**: Unlike early 2020s "Neumorphism" (which felt like extruded plastic) or basic "Claymorphism" (which often feels like flat vector art), High-Fidelity Claymorphism relies on complex, multi-layered lighting simulation using 4-layer shadow stacks. It renders objects that feel dense, substantial, and interactive—not hollow decorations.

**The Sensory Vibe**:
- **Playful & Optimistic**: The interface radiates joy through "candy store" colors (vivid violets, hot pinks, sky blues, emerald greens, amber oranges) and bouncy, organic motion. It feels safe, welcoming, and unpretentious—like a premium toy store display.
- **Tactile & Responsive**: Elements don't just change color when interacted with—they physically react with exaggerated realism. Buttons actively "squish" (scale-[0.92] + shadow-clayPressed) and compress under the cursor. Cards lift and float towards the user. Every interaction provides satisfying visual feedback.
- **Friendly & Safe**: There are zero sharp corners in this universe. Every edge is aggressively rounded (rounded-[20px] minimum, up to rounded-[60px] for large containers), subconsciously signaling safety and approachability.
- **Premium Craft**: Despite playfulness, maintains quality through consistent border radii, precise shadow layering, harmonious color relationships, and smooth micro-interactions.

**The "Clay" Physics Engine**:
1. **Convexity (The Bulge)**: Primary interactive elements bulge OUT with `shadow-clayButton` or `shadow-clayCard`. They capture light on top-left edge and cast soft colored shadows below, creating floating illusion.
2. **Concavity (The Press)**: Secondary surfaces (Input fields, Active button states, FAQ panels when open) are pressed INTO the clay surface with `shadow-clayPressed`. Internal shadows on top edge, catch light on bottom lip.
3. **Buoyancy (The Float)**: The interface exists in zero-gravity with high air resistance. Background blobs drift slowly (8-12s animations). Cards hover effortlessly. Nothing feels statically stuck—everything breathes and moves subtly.
4. **Micro-Physics**: Hover states lift elements upward (`hover:-translate-y-1` to `-translate-y-2`) while enhancing shadows. Active/pressed states compress downward with reduced shadows.

---

## 1. STRICT ARCHITECTURE & CSS RULES

### 1.1 CSS-First Architecture & Zero Inline CSS
- **No inline CSS**: The `style="..."` attribute is FORBIDDEN in HTML.
- **Class/ID Selectors Only**: All styling via class or ID selectors in `style.css`.
- **Minimal HTML Modifications**: Clean, semantic, agnostic HTML.
- **Exception**: Background blobs may be applied via a fixed container with CSS pseudo-elements or a single dedicated `<div>` for blob container. Prefer CSS-only approach where possible.

### 1.2 CSS Variables & Theme Tokens
Store ALL visual tokens in `:root`:

**Color Tokens** (The "Candy Shop" Palette):
```css
:root {
  --bg-primary: #F4F1FA;
  --bg-secondary: #EFEBF5;
  --text-primary: #332F3A;
  --text-secondary: #635F69;
  --muted: #635F69;
  --border-default: rgba(139, 92, 246, 0.1);
  --border-error: #DB2777;
  --border-success: #10B981;
  --primary: #7C3AED;
  --secondary: #DB2777;
  --tertiary: #0EA5E9;
  --accent-foreground: #FFFFFF;
  --text-success: #10B981;
  --text-error: #DB2777;
  --font-heading: "Nunito", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --font-display: "Nunito", sans-serif;
  --font-base: "DM Sans", sans-serif;
  --radius-sm: 16px;
  --radius-md: 20px;
  --radius-lg: 32px;
  --shadow-clay-surface: 30px 30px 60px #cdc6d9, -30px -30px 60px #ffffff, inset 10px 10px 20px rgba(139,92,246,0.05), inset -10px -10px 20px rgba(255,255,255,0.8);
  --shadow-clay-card: 16px 16px 32px rgba(160,150,180,0.2), -10px -10px 24px rgba(255,255,255,0.9), inset 6px 6px 12px rgba(139,92,246,0.03), inset -6px -6px 12px rgba(255,255,255,1);
  --shadow-clay-button: 12px 12px 24px rgba(139,92,246,0.3), -8px -8px 16px rgba(255,255,255,0.4), inset 4px 4px 8px rgba(255,255,255,0.4), inset -4px -4px 8px rgba(0,0,0,0.1);
  --shadow-clay-pressed: inset 10px 10px 20px #d9d4e3, inset -10px -10px 20px #ffffff;
  --shadow-sm: 0 4px 6px -1px rgba(51,47,58,0.05);
  --shadow-md: 0 10px 15px -3px rgba(51,47,58,0.05);
  --spacing-gap: 2rem;
  --transition-fast: 200ms ease-out;
  --transition-normal: 500ms ease-out;
  --ease-standard: ease-out;
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-toast: 1100;
  --gradient-primary: linear-gradient(to bottom right, #A78BFA, #7C3AED);
}
```

**Contrast Pairing Rules**: Light backgrounds (`#F4F1FA`, `#FFFFFF`, `#EFEBF5`) pair with dark text (soft charcoal `#332F3A`). Dark/colored backgrounds (violet gradient, pink, blue) pair with white text. Muted (`#635F69`) on light: crucial for readability. Use `#fefefe` instead of `#ffffff` where a near-white is needed.

### 1.3 Mandatory Dark Mode Support
Claymorphism is inherently light and airy. You MUST implement a dark mode variant:
- **Dark Mode (Midnight Clay)**: Under `@media (prefers-color-scheme: dark)` and/or `.dark` class. `--bg-primary: #2A2532` (deep lavender-black), `--bg-secondary: #352F40`, `--text-primary: #F4F1FA` (light lavender), `--text-secondary: #9B95A8`, `--border-default: rgba(167,139,250,0.15)`. Accent colors remain vibrant but slightly brightened. Shadows adjusted: outer shadows use darker tints, highlights use lighter tints.
- **Theme Switching**: Via `localStorage`, fallback to `prefers-color-scheme`. Visible toggle with `aria-pressed`/`aria-label`. Playful toggle (sun/moon Google Material Symbol in violet clay circle).
- **No HTML Restructuring**: Pure CSS variable swaps.

### 1.4 Flexbox Layout & Mobile-First Alignment
- Every flex container defaults to `align-items: center` unless explicitly justified.
- Mobile-responsive: rows → columns on small viewports.
- **Masonry / Bento Grid**: Don't use uniform grids. Mix `col-span-1` with `col-span-2` or `row-span-2` cards.
- **Overlapping Elements**: Allow elements to break containers (e.g., "Popular" badge floating above pricing card). Use negative margins.
- No horizontal scrolling.

### 1.5 Framework: Tailwind CSS (or Custom CSS with @layer/@apply)
- Utility classes map to CSS variables or reusable names: `.btn`, `.card`, `.input-group`, `.clay-button`, `.clay-card`, `.clay-pressed`, `.icon-orb`, `.floating-blob`.

### 1.6 Typography & Icons (Google Fonts Mandatory)
- **Headings**: `"Nunito", sans-serif` (Google Font). Rounded terminals complement soft clay aesthetic. Weights: 700/800/900. Apply to all headings, stat numbers, emphasis text.
- **Body**: `"DM Sans", sans-serif` (Google Font). Geometric, clean, readable. Weights: 400/500/700.
- **Icons**: Google Material Symbols/Icons. FORBIDDEN: raw inline SVGs.
- **Hierarchy** (Mobile-First with Progressive Enhancement):
  - Hero: `text-5xl sm:text-6xl md:text-7xl lg:text-8xl`, font-black (900), `tracking-tight`, leading 1.1. Nunito.
  - Section Titles: `text-3xl sm:text-4xl md:text-5xl`, extrabold (800) or black. Nunito.
  - Card Titles: `text-xl` to `text-2xl` (hero cards `text-3xl`), bold (700) to extrabold. Nunito.
  - Body Text: `text-base` to `text-lg`, medium (500), `leading-relaxed`. DM Sans.
  - Small Text: `text-sm` to `text-xs`, medium to bold. Labels, metadata, uppercase `tracking-wide`.
- **Best Practices**: Always pair Nunito headings with DM Sans body. Use `font-black` (900) for maximum impact on large headings/numbers. Ensure `leading-relaxed` (1.625) for body, `leading-[1.1]` for tight display. Limit line length 60-75 chars with `max-w-2xl` to `max-w-3xl`. Use `tracking-tight` on large headings, `tracking-wide`/`tracking-widest` on small caps/labels.

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements (The Clay Button)
**Base Shape**: `rounded-[20px]` with chunky height (`h-14` default, `h-16` for lg).
**Base Styles**: `inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200`. Flex (`align-items: center; justify-content: center; gap: 0.5rem`). Min 44x44px.

**Variants**:
- **Primary/Default**: `bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-clayButton`.
- **Secondary**: `bg-white text-clay-foreground shadow-clayButton`.
- **Outline**: `border-2 border-clay-accent/20 bg-transparent text-clay-accent hover:border-clay-accent hover:bg-clay-accent/5`.
- **Ghost**: `text-clay-foreground hover:bg-clay-accent/10 hover:text-clay-accent`.

**Interactive States**:
- **Default**: Bulges OUT with `shadow-clayButton` (4-layer shadow with colored drop + top-left highlight + inner rim + bottom shading).
- **Hover**: `hover:-translate-y-1` (lift up 4px) + Enhanced shadow (stronger glow).
- **Focus**: `focus-visible:ring-4 focus-visible:ring-clay-accent/30 focus-visible:ring-offset-2`.
- **Active/Pressed**: `active:scale-[0.92] active:shadow-clayPressed` (pronounced squish effect—compresses with inset shadows simulating physical depression). Duration fast (200ms) for immediate feedback.
- **Loading**: Disables interactions, prevents double-clicks, renders CSS spinner (violet) or animated Google Material Symbol without distorting button dimensions.
- **Disabled**: `opacity: 0.5`, greyscale, `cursor: not-allowed`.
- **Success/Error**: Via `--text-success` (emerald) or `--text-error` (hot pink).

**Sizing**: `sm` (h-11), `default` (h-14), `lg` (h-16).
**Danger Button**: Hot pink (`#DB2777`) gradient. Distinct in both themes. Never use violet for destructive.

### 2.2 Card Component Requirements (The Universal Card)
**Base Styles**: `relative overflow-hidden rounded-[32px] bg-clay-cardBg p-8 text-clay-foreground shadow-clayCard backdrop-blur-xl`.
**Structure**: Outer wrapper handles positioning, overflow, shadows. Inner Content Wrapper: `<div class="relative z-10 flex h-full flex-col">{children}</div>` to support absolute positioned decorative elements.

**Interactive States**:
- **Default**: `shadow-clayCard` (4-layer shadow: soft purple-gray drop + strong top-left highlight + inner colored bounce light + inner rim light).
- **Hover**: `hover:-translate-y-2 hover:shadow-[enhanced]` (lifted with stronger shadow). `transition-all duration-500` (smooth, premium feel).
- **Focus-within**: Highlights when child receives focus.
- **Loading (Skeleton)**: Shimmer animation (clay-tinted) to prevent layout jumps.
- **Empty State**: Google Material Symbol (e.g., `search_off` or `inventory_2`) in a clay icon orb + clear guidance text.

**Decorations**: Use absolute positioned panels with negative margins (`-bottom-8 -left-8 -right-8`) to create "peeking" UI elements emerging from card bottoms.

**Variants**:
- Glass effect: `bg-white/60` to `bg-white/80`
- Solid: `bg-white`
- Feature hero card: `md:col-span-2 md:row-span-2` with larger internal padding

### 2.3 Form & Input Requirements (The Recessed Input)
**Base Shape**: `rounded-2xl` with generous height `h-16`.
**Base Styles**: `flex w-full border-0 bg-[#EFEBF5] px-6 py-4 text-clay-foreground text-lg shadow-clayPressed`.

**States**:
- **Default**: Recessed with `shadow-clayPressed` (inset shadows—pressed INTO the clay surface). Internal shadows on top edge, catches light on bottom lip.
- **Focused**: `focus:bg-white focus:ring-4 focus:ring-clay-accent/20` (transforms to raised white surface).
- **Filled**: Maintain styling.
- **Valid**: Success border (emerald `#10B981`) with small checkmark Google Material Symbol.
- **Invalid**: Error border (hot pink `#DB2777`) + error icon + pink-toned error text.
- **Disabled**: `opacity: 0.5`, `cursor: not-allowed`.
- **Read-only**: Slightly darker background, no focus state.
- **Placeholder**: `placeholder:text-clay-muted`.
- **Accessibility**: `transition-all duration-200` for smooth state changes.

**Structure**: Flex container wrapping a label (Nunito, bold), input field, and dedicated error feedback container.

### 2.4 Modal / Popup Requirements
**States** (all animated via CSS transitions, smooth and premium):
- **Opening**: Fade in backdrop + scale up content from 0.92 to 1.0 over 500ms (premium feel).
- **Open**: Centered flex container (`align-items: center`), backdrop overlay with lavender tint + blur. Content in a `rounded-[32px]` clay card with `shadow-clayCard`.
- **Loading**: Violet CSS spinner inside modal content area.
- **Success/Error**: Temporary feedback with emerald or hot pink accents.
- **Closing**: Reverse of opening animation over 500ms.

**UX Features**:
- Backdrop overlay: semi-transparent lavender with `backdrop-blur-sm`.
- Close button: Google Material Symbol (`close`) in a violet clay circle (raised, `shadow-clayButton`), top-right of modal.
- Keyboard focus trapping: focus remains within modal while open.
- Support closing via `Esc` key or overlay click.
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` pointing to modal title (in Nunito).

---

## 3. SIGNATURE VISUAL ELEMENTS (NON-NEGOTIABLE)

### 3.1 The "Super-Rounded" Rule (MANDATORY)
**Absolute Values Only** (never use `rounded-md` (4px) or `rounded-sm`—too sharp/generic):
- Large Containers/Hero Sections: `rounded-[48px]` to `rounded-[60px]`
- Standard Cards: `rounded-[32px]` (default for most cards)
- Medium Elements (Benefits pills, Blog cards): `rounded-[24px]`
- Buttons & Inputs: `rounded-[20px]` or `rounded-2xl`
- Icon Containers: `rounded-2xl` (16px) for square icons, `rounded-full` for circular
- Small Badges: `rounded-lg` (8px) minimum, `rounded-full` preferred
- Stat Orbs: `rounded-full` (perfect circles)

**Critical Rules**: Maintain consistency—nested image should use 8px less than card radius for visual hierarchy. On mobile, reduce radii slightly (`rounded-[32px] sm:rounded-[40px]`) to maximize screen real estate while maintaining soft aesthetic.

### 3.2 High-Fidelity Shadow Stack (MANDATORY)
4-layer shadow stacks simulating complex lighting:

**1. Deep Clay (Surface)**:
```css
box-shadow: 30px 30px 60px #cdc6d9, -30px -30px 60px #ffffff, inset 10px 10px 20px rgba(139,92,246,0.05), inset -10px -10px 20px rgba(255,255,255,0.8);
```

**2. Clay Card (Floating)**:
```css
box-shadow: 16px 16px 32px rgba(160,150,180,0.2), -10px -10px 24px rgba(255,255,255,0.9), inset 6px 6px 12px rgba(139,92,246,0.03), inset -6px -6px 12px rgba(255,255,255,1);
```

**3. Clay Button (High Convexity)**:
```css
box-shadow: 12px 12px 24px rgba(139,92,246,0.3), -8px -8px 16px rgba(255,255,255,0.4), inset 4px 4px 8px rgba(255,255,255,0.4), inset -4px -4px 8px rgba(0,0,0,0.1);
```

**4. Clay Pressed (Recessed)**:
```css
box-shadow: inset 10px 10px 20px #d9d4e3, inset -10px -10px 20px #ffffff;
```

### 3.3 Floating 3D Blobs (Background) (MANDATORY)
Never use a flat background. Always include 3-4 large, animated blobs.
- Container: Fixed, full-screen, `pointer-events-none`, behind content (`-z-10`), `overflow-hidden`.
- Individual Blobs: `absolute h-[60vh] w-[60vh] rounded-full blur-3xl`.
- Colors: Accent colors with `/10` opacity (e.g., `bg-[#8B5CF6]/10`, `bg-[#EC4899]/10`, `bg-[#0EA5E9]/10`).
- Positioning: Negative margins to bleed off edges (`-top-[10%] -left-[10%]`, `-right-[10%] top-[20%]`).
- Animation: `clay-float` or `clay-float-delayed` with staggered `animation-delay-2000` or `animation-delay-4000`.
- Purpose: Creates ambient colored lighting that shows through glass-morphic cards.

### 3.4 Gradient Strategy (MANDATORY)
- **Primary Buttons**: `bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]` (lighter violet to primary violet). Creates depth, prevents overly dark buttons.
- **Icon Orbs**: `bg-gradient-to-br` from light pastel (400) to saturated hue (600) with varied colors (e.g., `from-blue-400 to-blue-600`, `from-purple-400 to-purple-600`, `from-pink-400 to-pink-600`).
- **Text Highlights**: Multi-stop gradients for hero text: `from-clay-foreground 20%, to-clay-accent 60%, to-clay-accent-alt`. Keep gradient text large (text-5xl+) for readability.
- **Background Blobs**: Semi-transparent accent colors with 10% opacity and blur-3xl for soft ambient lighting.

### 3.5 Split Layouts
Use 50/50 splits for "Product" or "Benefits" sections. One side text, one side Abstract 3D Composition (nested clay shapes, not just an image).

---

## 4. CORE UX & MICRO-INTERACTION RULES

### 4.1 Responsive by Default
- **Container**: `max-w-7xl` for spacious layouts.
- **Spacing**: `gap-8` or `gap-12` between grid items.
- **Section Padding**: `py-24` to `py-32`.
- Mobile-responsive: Bento grids stack vertically, blobs reduce in size for performance, radii may reduce slightly.
- No horizontal scrolling.

### 4.2 Animation System (MANDATORY)
**1. Clay Float**: Zero-gravity drift for background blobs. 8s duration.
```css
@keyframes clay-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
```

**2. Clay Float Delayed**: Alternative with opposite rotation. 10s duration.
```css
@keyframes clay-float-delayed { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
```

**3. Clay Float Slow**: Hero decorative elements orbiting headline. 12s duration.
```css
@keyframes clay-float-slow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(5deg); } }
```

**4. Clay Breathe**: Object inflating/deflating slightly. 6s duration. Used on stat orbs.
```css
@keyframes clay-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
```

**5. Hover Lift** (MANDATORY): Standard interactive elements lift upward on hover:
- Cards: `hover:-translate-y-2` (8px) with enhanced shadow
- Benefits pills: `hover:-translate-y-1` (4px)
- Testimonials: `hover:-translate-y-2` (8px)
- Blog posts: `hover:-translate-y-3` (12px) for dramatic effect
- Buttons: `hover:-translate-y-1` (4px) with shadow enhancement

**6. Active Press** (MANDATORY): Buttons use `active:scale-[0.92]` combined with `active:shadow-clayPressed` to simulate physical squish when clicked. Duration fast (200ms) for immediate feedback.

**7. Scale Transforms**:
- Stat orbs: `hover:scale-110` (10% growth)
- How It Works circles: `group-hover:scale-110` with 300ms duration
- Pricing cards (non-highlighted): `hover:scale-105` (5% subtle growth)
- Featured card in Bento grid: `hover:scale-[1.02]` (minimal growth due to large size)

**8. Animation Delays**: Staggered for visual rhythm: `.animation-delay-2000` (2s), `.animation-delay-4000` (4s).

**9. Reduced Motion** (MANDATORY): Always include `@media (prefers-reduced-motion: reduce)` to disable all animations for accessibility.

### 4.3 Accessibility (a11y)
- **Contrast**: Soft charcoal (`#332F3A`) on lavender-white (`#F4F1FA`): passes WCAG AA. Muted (`#635F69`) on light: crucial for readability—never go lighter.
- Never rely on color alone. Semantic HTML5, ARIA, logical DOM/focus, keyboard operability, `aria-live`.
- **Focus States**: `focus-visible:ring-4 focus-visible:ring-clay-accent/30 focus-visible:ring-offset-2`. Never remove focus indicators.
- **Touch Targets**: Min 44x44px. Buttons h-11 (sm) to h-16 (lg).
- **Keyboard**: Clear focus. Follows hierarchy. Skip-to-content link.

### 4.4 Mandatory Visual Feedback
Every click/hover/submission triggers visible change. Buttons squish (`scale-[0.92]` + inset shadows). Cards lift (`-translate-y-2` + enhanced shadows). Inputs transform from recessed to raised on focus. Background blobs drift continuously. Stat orbs breathe. Everything feels alive and responsive.

### 4.5 Destructive Actions
`.btn-danger` distinct in both themes. Hot pink (`#DB2777`) gradient. Never use violet for destructive actions.

---

## 5. LAYOUT & SPACING

- **Masonry / Bento Grid**: Mix `col-span-1` with `col-span-2` or `row-span-2` cards. Use `hover:scale-[1.02]` on large grid items for tactile feel.
- **Split Layouts**: 50/50 splits. One side text, one side Abstract 3D Composition (nested clay shapes).
- **Overlapping Elements**: Allow elements to break containers (e.g., "Popular" badge floating above pricing card). Use negative margins to pull decorative elements to edges.
- **Container**: `max-w-7xl`.
- **Spacing**: `gap-8` or `gap-12`. `py-24` to `py-32`.

---

## 6. ICONOGRAPHY
- Google Material Symbols/Icons (NO raw inline SVGs).
- **Icon Orbs**: `bg-gradient-to-br` from light pastel to saturated hue. Varied colors for visual interest. Containers: `rounded-2xl` for square icons, `rounded-full` for circular.
- Integration: Icons in clay-raised orbs (shadow-clayButton) or floating freely. Use playful, friendly symbols (`auto_awesome`, `celebration`, `rocket_launch`, `favorite`).

---

## 7. DELIVERABLES & FILE STRUCTURE

- Separate `index.html`, `style.css`, `script.js`. No inline `<script>` beyond single deferred entry-point.
- ONE consistent naming convention (BEM or fixed utility set)—never mix.
- No lorem-ipsum where real copy was supplied.
- Google Fonts: Nunito (700, 800, 900), DM Sans (400, 500, 700).
- Google Material Symbols: Material Symbols Outlined.

---

## 8. EDIT MODE — MODIFYING AN EXISTING UI

- **No New Elements**: Never introduce new HTML tags/components/DOM nodes. Work within existing structure.
- **CSS Scope**: Classes only for existing elements—never invent classes for non-existent elements.
- **No Behavioral JS**: No JS for validation/popups/helpers—ask user instead.
- **Clarify Before Assuming**: If style change needs new markup, stop and ask.
- **Exception**: Background blobs may be applied via a fixed container. Clay shadow effects may be applied via CSS classes on existing elements.