import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.wearestrategica.com',
  integrations: [
    sitemap({
      // /admin è il pannello CMS: fuori dalla sitemap
      filter: (page) => !page.includes('/admin'),
    }),
  ],
});
