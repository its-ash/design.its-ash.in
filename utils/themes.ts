export interface ThemeInfo {
  id: string;
  name: string;
  slug: string;
  promptFile: string;
  previewPath: string;
}

export const THEMES: ThemeInfo[] = [
  'Academia',
  'Art Deco',
  'Bauhaus',
  'Botanical',
  'Business',
  'Clay',
  'Corporate',
  'Crypto',
  'Cyberpunk',
  'Dark',
  'Flat Design',
  'Geometric',
  'Industrial',
  'Kinetic',
  'Luxury',
  'Material',
  'Maximalism',
  'Modern Dark',
  'Monochrome',
  'Neo-brutalism',
  'Neumorphism',
  'Newsprint',
  'Organic',
  'Retro',
  'Sketch',
  'Swiss',
  'Tech',
  'Terminal',
  'Typography',
  'Vaporwave',
].map((name) => {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return {
    id: slug,
    name,
    slug,
    promptFile: `/prompts/main/${encodeURIComponent(name)}.md`,
    previewPath: `/theme/${encodeURIComponent(name)}/index.html`,
  };
});