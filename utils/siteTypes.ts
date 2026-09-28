import type { ThemeInfo } from './themes';

export interface SiteTypeInfo {
  id: string;
  name: string;
  tagline: string;
  /** Subdirectory under /theme/<Name>/ holding this archetype, or null for the root marketing page. */
  dir: string | null;
}

export const SITE_TYPES: SiteTypeInfo[] = [
  { id: 'content', name: 'Content', tagline: 'Blogs, news, documentation, knowledge bases', dir: 'content' },
  { id: 'marketing', name: 'Marketing', tagline: 'Landing pages, corporate sites, portfolios, campaign sites', dir: null },
  { id: 'commerce', name: 'Commerce', tagline: 'E-commerce, marketplaces, booking, classifieds', dir: 'commerce' },
  { id: 'community', name: 'Community', tagline: 'Social networks, forums, Q&A, review platforms', dir: 'community' },
  { id: 'apps', name: 'Web App', tagline: 'SaaS, dashboards, customer portals, admin panels, CRMs', dir: 'apps' },
  { id: 'specialized', name: 'Specialized', tagline: 'Banking, healthcare, LMS, gaming, government, real estate', dir: 'specialized' },
];

export const DEFAULT_SITE_TYPE_ID = 'marketing';

export function previewPathFor(theme: ThemeInfo, type: SiteTypeInfo): string {
  if (!type.dir) return theme.previewPath;
  return `/theme/${encodeURIComponent(theme.name)}/${type.dir}/index.html`;
}
