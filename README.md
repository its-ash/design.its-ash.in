# Design Prompt

A single-page **Nuxt 3** website showcasing **30 production-ready web UI design themes** with their AI design prompts.

Live demo: **<https://design.its-ash.in>**

## Features

- **Card sidebar** — each theme appears as a live thumbnail card (scaled-down iframe preview) with its name; clicking loads the full interactive preview in the right pane.
- **Live iframe preview** — the selected theme's `index.html` renders in a sandboxed iframe on the right with a reload control.
- **Prompt viewer** — the top-bar **Prompt** button fetches the selected theme's markdown prompt from `/prompts/main/<Theme>.md`, renders it, and offers a **copy-to-clipboard** button.
- **Black + gold dark theme** — modern glassmorphism UI with 8px border radius globally.
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
npm run generate # static site → .output/public/
npm run preview  # preview the production build
npm run deploy   # generate static site into docs/ (commit & push to deploy)
```

## VS Code tasks (`.vscode/tasks.json`)

| Label    | Command          | Purpose                              |
| -------- | ---------------- | ------------------------------------ |
| `run`    | `npm run dev`    | Start the dev server                 |
| `deploy` | `npm run deploy` | Generate static site into `docs/`    |

Press `Cmd/Ctrl + Shift + B` to pick a task from the list.

## Deploy (GitHub Pages from `docs/`)

The static site is generated into a committed `docs/` folder on the `main` branch, and GitHub Pages serves from `/docs`.

1. Enable Pages: **Repo Settings → Pages → Source: `main` branch → `/docs` folder**.
2. Run the **deploy** task (or `npm run deploy`) — this runs `nuxt generate`, preserves `docs/CNAME`, removes the old `docs/` contents, and copies `.output/public` into `docs/`.
3. Commit & push the updated `docs/` folder to `main`.

The site is configured for the custom domain `design.its-ash.in` (`app.baseURL: '/'`). The `docs/CNAME` file is preserved across regenerations.

## Structure

```
nuxt.config.ts            # SEO config: head, sitemap, robots, site metadata, prerender
pages/index.vue           # main two-pane UI (card sidebar + iframe preview) + prompt modal
utils/themes.ts           # theme list (source of truth)
server/api/themes.get.ts  # /api/themes endpoint
assets/css/tailwind.css   # Tailwind + custom components
assets/css/main.css       # global 8px radius + black/gold theme overrides
layouts/default.vue       # shell layout
app.vue                   # root
public/                   # static themes + prompts + favicon + og-image + robots
.vscode/tasks.json        # run + deploy tasks
docs/                    # generated static site (committed, served by GitHub Pages)
```

🤖