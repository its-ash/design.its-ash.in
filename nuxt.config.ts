import { THEMES } from './utils/themes';

const SITE_URL = 'https://design.its-ash.in';
const PAGES_BRANCH = 'gh-pages';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404.html', '/sitemap.xml', '/robots.txt', ...THEMES.map((t) => `/?theme=${t.id}`)],
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Design Prompt',
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-QCC01TNY0G',
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QCC01TNY0G');`,
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'author', content: 'Design Prompt' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: `${SITE_URL}/` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap' },
      ],
    },
  },
  site: {
    url: SITE_URL,
    name: 'Design Prompt',
    description: 'A curated gallery of 30 production-ready web UI design themes — Academia, Cyberpunk, Swiss, Vaporwave and more — each with a detailed AI design prompt.',
    defaultLocale: 'en',
  },
  sitemap: {
    autoLastmod: true,
    urls: () => THEMES.map((t) => `/?theme=${t.id}`),
  },
  robots: {
    allow: '/',
    sitemap: `${SITE_URL}/sitemap.xml`,
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
});