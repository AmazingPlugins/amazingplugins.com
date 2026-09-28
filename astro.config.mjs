// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import matter from 'gray-matter';

const blogDirectory = new URL('./src/content/blog/', import.meta.url);
const blogLastModified = new Map(
  readdirSync(blogDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data } = matter(readFileSync(new URL(file, blogDirectory), 'utf8'));
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      const date = new Date(data.updatedDate ?? data.pubDate);
      if (Number.isNaN(date.valueOf())) throw new Error(`Missing valid article date: ${file}`);
      return [`/blog/${slug}/`, date];
    }),
);

export default defineConfig({
  site: 'https://amazingplugins.com',
  trailingSlash: 'always',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  // Cache shared navigation/footer scripts without delaying the first HTML paint.
  vite: { build: { assetsInlineLimit: 0 } },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    partytown({ config: { forward: ['dataLayer.push', 'gtag'] } }),
    sitemap({
      serialize(item) {
        const url = item.url.endsWith('/') ? item.url : `${item.url}/`;
        const articleDate = blogLastModified.get(new URL(url).pathname);
        return {
          ...item,
          url,
          ...(articleDate ? { lastmod: articleDate } : {}),
        };
      },
    }),
  ],
});
