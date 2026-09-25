// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

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
    partytown({ config: { forward: ['dataLayer.push'] } }),
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
