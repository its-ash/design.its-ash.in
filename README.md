# Design Prompt

A single-page **Nuxt 3** website showcasing **30 production-ready web UI design themes** with their AI design prompts.

## Features

- **Two-pane layout** — theme list on the left, live iframe preview on the right.
- **Prompt viewer** — top-bar "Prompt" button fetches the selected theme's markdown prompt from `/prompts/main/<Theme>.md`, renders it, and offers a **copy-to-clipboard** button.
- **Full SEO support**
  - Dynamic `<title>`, meta description, keywords, canonical link per theme
  - Open Graph + Twitter Card tags
  - JSON-LD structured data (`WebSite` + `ItemList` of 30 `CreativeWork` themes)
  - Auto-generated `sitemap.xml` with all 30 theme URLs
  - `robots.txt` with sitemap reference
  - `og-image` SVG
  - SSR (server-side rendering) for crawlable content

## Theme folders

```
public/
  theme/        # 30 theme folders (Academia, Cyberpunk, …) each with index.html / style.css / script.js
  prompts/main/ # 30 matching design prompt markdown files
```

The left sidebar lists every folder under `public/theme/`. Clicking a theme loads `/theme/<Name>/index.html` in the right-pane iframe.

## Scripts

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:3000
npm run build    # production build → .output/
npm run preview  # preview the production build
```

## Structure

```
nuxt.config.ts          # SEO config: head, sitemap, robots, site metadata
pages/index.vue         # main two-pane UI + prompt modal
utils/themes.ts         # theme list (source of truth)
server/api/themes.get.ts# /api/themes endpoint
assets/css/tailwind.css  # Tailwind + custom components
layouts/default.vue      # shell layout
app.vue                  # root
public/                  # static themes + prompts + favicon + og-image + robots
```

🤖