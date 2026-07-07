import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://strategica.it',
  integrations: [
    sitemap({
      // /admin è il pannello CMS: fuori dalla sitemap
      filter: (page) => !page.includes('/admin'),
    }),
  ],
});
