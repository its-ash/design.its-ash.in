# Website-Type Archetypes

Each theme now ships six previews: the original marketing landing page at
`/theme/<Name>/index.html`, plus five generated archetype pages at
`/theme/<Name>/<type>/index.html` (`content`, `commerce`, `community`, `apps`, `specialized`).

The archetype pages are assembled by `npm run archetypes`
(`scripts/generate-archetypes.mjs`) from the shared body templates in
`scripts/archetypes/*.html`, sandwiched between each theme's own extracted
`<head>`, navbar, footer, popups, and `script.js`.

## The markup contract

Any regenerated or hand-authored archetype page MUST:

1. Use only the class vocabulary shared by all 30 themes (navbar, section, card,
   table, tabs, accordion, timeline, progress, alert, tag, badge, price, stat,
   form-card, slider, footer, popup, toast) plus the layout-only helpers in
   `/theme/_shared/archetypes.css` (`arch-*`: splits, main+aside, grids, rows,
   prose measure, avatars, fine print — no colors, fonts, or radii).
   Do NOT use `.hero`, `hero-stats`, `feature-card`/`features-grid`,
   `pricing-card`/`pricing-grid`, `testimonial`, or `cta-banner` — those are the
   marketing archetype's signature and staying off them is what keeps the
   archetypes visually distinct. Reusing `hero-title`, `hero-subtitle`, `badge`,
   `price`, and `stat` as standalone typography is encouraged.
   Exclusive components (one archetype each): tabs → content; cart table with
   tfoot totals → commerce; poll + accepted answer → community; KPI stat cards +
   audit table → apps; login card + timeline + accordion + fine print → specialized.
2. Include the elements every theme's `script.js` references unguarded:
   - `#slider`, `#sliderTrack` (with `.slide` children), `#sliderDots`
   - `#contactForm` with fields `#cName #cEmail #cPhone #cSubject #cMessage #cTerms`,
     errors `#errName #errEmail #errPhone #errSubject #errMessage #errTerms`, and `#formSuccess`
   - `[data-count]` stat counters (use `99` for percentage stats)
   - `#navbar`, `#backTop`, `#toastContainer` (supplied by the extracted navbar/footer)
3. Forbid inline `style="..."` except `progress-bar` widths, matching the base theme.
4. Keep section ids `hero`, `features`, `contact` (the wrapper div carries
   id `slider`) so the shared navbar anchors resolve; `pricing` exists only on
   the marketing pages.

The per-type files in this folder describe the content archetype each template
expresses, for regenerating any single theme × type cell bespoke via the AI
prompt pipeline (`/prompts/main/<Theme>.md` + one of these files).
