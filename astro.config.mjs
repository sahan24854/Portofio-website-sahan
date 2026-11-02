// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import markdownBasePath from './scripts/markdown-base-path.mjs';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://sahan24854.github.io',
  base,
  markdown: { processor: satteri({ hastPlugins: [markdownBasePath(base)] }) },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
