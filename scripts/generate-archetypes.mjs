#!/usr/bin/env node
/**
 * Generates the per-type preview pages under public/theme/<Name>/<type>/index.html.
 *
 * Each generated page is assembled from:
 *   - the theme's own <head> (fonts, style.css link) — extracted verbatim,
 *   - the theme's own navbar — extracted verbatim,
 *   - a shared archetype body (scripts/archetypes/<type>.html),
 *   - the theme's own footer, popups, toast container, back-to-top and script.js — extracted verbatim.
 *
 * The archetype bodies only use the class vocabulary shared by all 30 themes, and include
 * every element id that the themes' script.js files reference unguarded
 * (#slider/#sliderTrack/#sliderDots, the #contactForm field/error ids, [data-count] stats),
 * so each theme's untouched script.js keeps working on every generated page.
 *
 * Usage: node scripts/generate-archetypes.mjs
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const THEME_DIR = join(ROOT, 'public', 'theme');
const TPL_DIR = join(ROOT, 'scripts', 'archetypes');

const TYPES = [
  { dir: 'content', title: 'The Nexus Journal' },
  { dir: 'commerce', title: 'Nexus Shop' },
  { dir: 'community', title: 'Nexus Community' },
  { dir: 'apps', title: 'Nexus Console' },
  { dir: 'specialized', title: 'Nexus Trust' },
];

function extract(html, startRe, endMarker, label, themeName) {
  const start = html.search(startRe);
  if (start === -1) throw new Error(`[${themeName}] could not find start of ${label}`);
  const end = html.indexOf(endMarker, start);
  if (end === -1) throw new Error(`[${themeName}] could not find end of ${label}`);
  return html.slice(start, end + endMarker.length);
}

const templates = Object.fromEntries(
  TYPES.map((t) => [t.dir, readFileSync(join(TPL_DIR, `${t.dir}.html`), 'utf8')]),
);

const themes = readdirSync(THEME_DIR).filter((n) => {
  try {
    return statSync(join(THEME_DIR, n, 'index.html')).isFile();
  } catch {
    return false;
  }
});

const failures = [];
let written = 0;

for (const theme of themes) {
  let html;
  try {
    html = readFileSync(join(THEME_DIR, theme, 'index.html'), 'utf8');
    const headRaw = extract(html, /<head>/i, '</head>', '<head>', theme);
    const bodyTag = html.match(/<body[^>]*>/i)?.[0];
    if (!bodyTag) throw new Error(`[${theme}] could not find <body> tag`);
    const navbar = extract(html, /<header[^>]*class="[^"]*navbar/i, '</header>', 'navbar', theme);
    const tailRaw = extract(html, /<footer[^>]*class="[^"]*footer/i, '</body>', 'footer..</body>', theme);

    // Match the theme's Material Symbols variant: the body templates are written
    // with `material-symbols-outlined`; themes like Neumorphism or Tech use the
    // Rounded variant (different CSS class AND different Google font stylesheet).
    const iconClass = html.match(/material-symbols-(outlined|rounded|sharp)/)?.[0] ?? 'material-symbols-outlined';
    const iconFamily = 'Material+Symbols+' + iconClass.split('-')[2].replace(/^./, (c) => c.toUpperCase());
    const iconLink = `<link href="https://fonts.googleapis.com/css2?family=${iconFamily}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">`;

    for (const type of TYPES) {
      const head = headRaw
        .replace(/<title>[^<]*<\/title>/i, `<title>${type.title} — ${theme} Theme</title>`)
        .replace(/(href=")(style\.css")/g, '$1../$2')
        .replace('</head>', (headRaw.includes(iconFamily) ? '' : iconLink + '\n') + '<link rel="stylesheet" href="/theme/_shared/archetypes.css">\n<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n</head>');
      const tail = tailRaw.replace(/(src=")(script\.js")/g, '$1../$2');
      const body = templates[type.dir].trim().replaceAll('material-symbols-outlined', iconClass);
      const page = `<!DOCTYPE html>
<html lang="en">
${head}
${bodyTag}

${navbar}

${body}

${tail}
</html>
`;
      const outDir = join(THEME_DIR, theme, type.dir);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), page);
      written++;
    }
  } catch (e) {
    failures.push(e.message);
  }
}

console.log(`Generated ${written} pages across ${themes.length} themes.`);
if (failures.length) {
  console.error(`FAILED for ${failures.length} theme(s):`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
