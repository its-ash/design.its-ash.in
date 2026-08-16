import { THEMES } from './utils/themes';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Design Prompt',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0f172a' },
        { name: 'author', content: 'Design Prompt' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://design-prompt.example.com/' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap' },
      ],
    },
  },
  site: {
    url: 'https://design-prompt.example.com',
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
    sitemap: 'https://design-prompt.example.com/sitemap.xml',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
});