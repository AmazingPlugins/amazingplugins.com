// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://amazingplugins.com',
  trailingSlash: 'always',
  output: 'static',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url === '/') return item;
        return {
          ...item,
          url: item.url.endsWith('/') ? item.url : `${item.url}/`,
        };
      },
    }),
  ],
});
