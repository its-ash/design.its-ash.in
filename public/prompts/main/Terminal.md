# Terminal CLI Design System — Coding Prompt

## Design Philosophy

The **Terminal CLI** aesthetic pays homage to the raw power of the command line. It strips away the "user interface" layers to reveal the "system" underneath. It is **brutally functional, high-contrast, and authentically retro**. It feels like hacking into a mainframe or configuring a server.

The vibe is **Cyber-Industrial, Hacker, and System-Level**. It is not "Matrix" rain (too cliché); it is a clean, usable ZSH/BASH shell environment.

**Key visual signatures:**
- **Monospace Supremacy**: Every single character, from the largest headline to the smallest footer link, is monospaced.
- **The Cursor**: The blinking block or underscore cursor `_` is the heartbeat of the interface.
- **Shell Metaphors**: Prompt characters (`>`, `$`, `~`), command flags (`--help`), and status codes (`[OK]`, `[ERR]`).
- **Scanlines (Subtle)**: A very faint CRT scanline effect for depth without ruining readability.
- **ASCII Art**: Use ASCII art for logos or key graphic elements.
- **Typewriter Effect**: Headlines appear character-by-character.
- **Raw Data Visualization**: Stats use progress bars `[||||||||||.....]` instead of pie charts.

---

## 1. STRICT RULES & ARCHITECTURE TO ENFORCE

### 1.1 CSS-First Architecture & Zero Inline CSS

Keep all styling strictly inside a dedicated CSS file (`style.css`):

* **No Inline CSS:** Explicitly forbid the use of the `style="..."` attribute in HTML.
* **Class/ID Selectors Only:** Require all design properties, layout rules, and states to be targeted via class or ID selectors.
* **Minimal HTML Modifications:** HTML structure must remain clean, semantic, and agnostic of visual styling so that changing the site's look requires modifying only the CSS file, not the markup.

### 1.2 CSS Variables (`var(--...)`) & Theme Tokens

Store all visual tokens inside `:root` (and theme classes) using CSS variables. Merge the Terminal CLI palette with the required token set:

* **Colors:**
  - `--primary: #33ff00` (Bright Neon Green — classic terminal phosphor)
  - `--secondary: #ffb000` (Amber/Orange — warnings, accents)
  - `--bg-primary: #0a0a0a` (Deep black — not pure OLED black, allows for scanlines)
  - `--bg-secondary: #1f521f` (Dimmed green — borders/inactive text, elevated surfaces)
  - `--text-primary: #33ff00` (Bright Neon Green — foreground matches primary)
  - `--text-secondary: #1f521f` (Dimmed green — secondary/muted text)
  - `--text-success: #33ff00` (same as primary)
  - `--text-error: #ff3333` (Bright Red)
  - `--border-default: #1f521f` (Dimmed green border)
  - `--border-error: #ff3333`
  - `--border-success: #33ff00`
* **Contrast Pairing:** Deep black background (`#0a0a0a`) pairs with bright green text (`#33ff00`) — exceeds AA requirements. Error red (`#ff3333`) pairs with black. Amber (`#ffb000`) pairs with black for secondary accent.
* **Light Mode Background:** Terminal is dark-mode-only by design. **Exception to mandatory light mode:** The Terminal style is inherently dark — dark mode is the default and only mode. Light mode is not applicable to this aesthetic. If a light mode is forced, invert to green-on-white with `--bg-primary: #fefefe` and `--text-primary: #003300`, but this breaks the aesthetic intent.
* **Border Radius & Shadows:**
  - `--radius-sm: 0px` (Absolutely no rounded corners)
  - `--radius-md: 0px`
  - `--radius-lg: 0px`
  - `--shadow-sm: none` (No drop shadows)
  - `--shadow-md: none`
  - `--shadow-lg: none`
* **Spacing & Transitions:**
  - `--spacing-gap: 1rem`
  - `--transition-fast: 100ms`
  - `--transition-normal: 200ms`
  - `--ease-standard: linear`
* **Elevation/Stacking:**
  - `--z-dropdown: 100`
  - `--z-modal: 1000`
  - `--z-toast: 2000`
* **Typography Tokens:**
  - `--font-base: 'JetBrains Mono', 'Fira Code', monospace` (Google Fonts)
  - `--font-heading: var(--font-base)`
* **Text Glow (Phosphor Persistence):**
  - `--text-glow: 0 0 5px rgba(51, 255, 0, 0.5)` (subtle glow on primary text)
* **CRT Scanline Overlay:**
  - `--scanline-bg: linear-gradient(rgba(18,16,20,0) 50%, rgba(0,0,0,0.25) 50%)` with `background-size: 100% 4px` — applied as fixed `pointer-events: none` overlay

### 1.3 Mandatory Dark Mode Support

Terminal CLI is inherently a dark-mode design. The default theme IS dark mode.

* **Implementation:** The `:root` tokens are already dark. Define a `.light` class for the inverted (optional) light scheme if needed:
  - `.light { --bg-primary: #fefefe; --text-primary: #003300; --bg-secondary: #e0e0d0; --border-default: #006600; }`
* **Theme Switching:** Background and text CSS variables switch seamlessly without requiring HTML restructuring.
* **Persistence:** User theme choice persists via `localStorage`, falling back to `prefers-color-scheme` on first visit; require a visible toggle control with correct `aria-pressed`/`aria-label` state.

### 1.4 Flexbox Layout & Mobile-First Alignment

Build layout structures using Flexbox (`display: flex`):

* **Default Alignment Rule:** Every flex container **must default to `align-items: center`** unless there is an explicitly justified exception.
* **Mobile-Friendly First:** All flex layouts must be mobile-responsive. Terminal "windows" stack vertically on mobile. Text size remains legible — monospaced fonts can be wide, so watch for overflow. Wrap long lines with a `\` indicator. Prevent horizontal scrolling.
* **Strict Grid:** Content is aligned to a rigid character grid. Layout feels like `tmux` or `vim` splits. Use ASCII characters for dividers: `----------------` or `================` or `//`.

### 1.5 Framework Default & Tailwind CSS Integration

Use Tailwind CSS (or clean custom CSS driven by Tailwind's `@layer` / `@apply` directives). All utility classes must map back to CSS variables or generic reusable class names (`.btn`, `.card`, `.input-group`, `.terminal-window`, `.prompt`, `.scanline-overlay`).

### 1.6 Typography & Icons (Google Fonts Mandatory)

* **Text:** Include Google Font `<link>` tags for `JetBrains Mono` (weights: 400, 500, 700) or `Fira Code`. Bind to `--font-base`.
* **Typography Style:** **ALL CAPS** for headers. Lowercase for "code" or body text is acceptable, but consistency is key. Strict modular scale — headers snap to grid sizes, never smooth.
* **Icons:** Use Google Material Symbols/Icons. Explicitly forbid raw inline SVGs. Style icons to look pixelated or low-fi if possible, with strict `stroke-width: 2`. Color: always the primary terminal color (`--primary`).

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### 2.1 Button Component Requirements

Style all states via CSS classes:

* **Default:** Flex layout (`display: flex; align-items: center; justify-content: center; gap: 0.5rem;`). Minimum touch target of 44x44px. Structure: Text enclosed in brackets `[ INITIATE ]` or a solid block of color with inverted text. No border radius (0px). Border: `1px solid var(--border-default)`. Font: `var(--font-base)`, uppercase.
* **Hover:** Background fills with `--primary` color, text becomes black (inverted video). Cursor: `pointer`.
* **Focus:** High visibility is inherent (inverted colors). Distinct focus using `outline: 2px solid var(--primary); outline-offset: 2px;` for keyboard navigation. No ring, just inverted video.
* **Active/Pressed:** "Pressed" state shifts text 1px down or blinks rapidly.
* **Loading:** Disables interactions, prevents double-clicks, and renders a CSS spinner (block character rotation: `[|]`, `[/]`, `[-]`, `[\]` animation) without distorting button dimensions.
* **Disabled:** Reduced opacity (`opacity: 0.5`), greyscale (dimmed green), and `cursor: not-allowed`.
* **Success/Error:** Temporary feedback state styles driven by `--text-success` (green `[OK]`) or `--text-error` (red `[ERR]`). Status codes displayed in brackets.
* **Danger Variant:** `.btn-danger` uses `--text-error` fill with black text; visually distinct in both themes.

### 2.2 Card Component Requirements (Windows/Panes)

* **Default:** A black box with `1px solid var(--border-default)` green border. No border radius (0px). No shadows. Flexbox layout.
* **Header (Title Bar):** A "title bar" at the top: `+--- SYSTEM STATUS ---+` or a solid inverted bar (green background, black text). Border-bottom: `1px solid var(--border-default)`.
* **Content:** Padded monospaced text inside. Font: `var(--font-base)`.
* **Hover:** Border color brightens to `--primary` (full bright green). No transform.
* **Focus-within:** Highlights borders (brighter green) when a child link/button receives focus.
* **Loading (Skeleton):** Shimmer animation styled as blinking block characters `[████████░░░░]` to prevent layout jumps.
* **Empty State:** Structured fallback layout featuring a Google Icon and clear guidance text in monospaced font: `$ ERROR: No data found.`

### 2.3 Form & Input Requirements

* **States:** Empty, Focused (blinking cursor block `█`), Filled, Valid (`[OK]` success code), Invalid (`[ERR]` error code, red text), Disabled, Read-only.
* **Structure:** Flex container wrapping a prompt, input field, and dedicated error feedback container.
* **Style:** No box. Just a prompt `user@acme:~$` followed by the input field. Background: transparent. Border: none (underline only, or border-bottom `1px dashed var(--border-default)`). Font: `var(--font-base)`.
* **Cursor:** A blinking block `█` at the caret position (CSS animation).
* **Focus:** No ring, just the blinking cursor. Border-bottom changes to `--primary`.

### 2.4 Modal / Popup Requirements

* **States:** Opening, Open, Loading, Success/Error, Closing (all animated via CSS transitions — typewriter/scanline effects).
* **UX Features:** Centered flex container (`align-items: center`), backdrop overlay (semi-transparent black with scanlines), Google Icon close button styled as `[ X ]`, keyboard focus trapping, and support for closing via `Esc` or overlay clicks.
* **Styling:** Terminal window chrome — title bar with `+--- TITLE ---+` format, 1px green border, no radius, no shadows. Content in monospaced font with text glow.

---

## 3. CORE UX & MICRO-INTERACTION RULES

* **Responsive by Default:** Fluid sizing and responsive breakpoints without horizontal overflow. Terminal "windows" stack vertically on mobile. Text size remains legible — watch for monospace overflow. Wrap long lines with `\` indicator. Maintain strict grid alignment.
* **Smooth Animations:** CSS transitions on all state changes (`transition: var(--transition-fast)`, `transition: var(--transition-normal)`), respecting `prefers-reduced-motion`. Effects: `animate-blink` (standard cursor blinking), glitch (subtle text offsets on hover), typing/typewriter animation for hero text.
* **Accessibility (a11y):** Bright green on black exceeds AA requirements (high contrast inherent). Focus: high visibility is inherent to this style (inverted colors). Never rely solely on color to communicate state — use status codes (`[OK]`, `[ERR]`) and text labels. Semantic HTML5, ARIA roles/labels, logical DOM/focus order, keyboard operability, `aria-live` for dynamic feedback.
* **Mandatory Visual Feedback:** Every user click, hover, or submission must trigger a visible state change (inverted video, blinking, status code). Every interaction should feel like executing a command.
* **Destructive Actions:** `.btn-danger` must display `[ERR]` or `--force` flag indicator; visually distinct with `--text-error` red in both themes.

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

1. **Monospace Supremacy:** Every character — headlines to footer links — is monospaced. No sans-serif or serif anywhere.
2. **The Blinking Cursor:** The `█` or `_` cursor is the heartbeat. Use `animate-blink` CSS animation (1s steps(2) infinite).
3. **Shell Metaphors Everywhere:** Prompt characters (`>`, `$`, `~`), command flags (`--help`, `--force`), status codes (`[OK]`, `[ERR]`, `[404]`), paths (`/usr/local/bin`).
4. **Text Glow (Phosphor Persistence):** `text-shadow: 0 0 5px rgba(51, 255, 0, 0.5)` on all primary text.
5. **CRT Scanline Overlay:** Fixed `pointer-events: none` overlay with `linear-gradient(rgba(18,16,20,0) 50%, rgba(0,0,0,0.25) 50%)` at `100% 4px` background-size.
6. **ASCII Art:** Use ASCII art for logos or key graphic elements (`[ |||| ]` style block graphics).
7. **Typewriter Effect:** Headlines appear character-by-character via CSS `typing-demo` animation.
8. **Raw Data Visualization:** Stats use progress bars `[||||||||||.....]` instead of pie charts. ASCII-based data display.
9. **Terminal Window Chrome:** Cards styled as terminal windows with title bars (`+--- TITLE ---+`), 1px green borders, padded monospaced content.
10. **Zero Radius, Zero Shadows:** Absolutely no rounded corners (0px). No drop shadows. Depth comes from borders and color contrast only.
11. **Glitch Effects:** Occasional subtle text offsets on hover — RGB split or character displacement.

🤖