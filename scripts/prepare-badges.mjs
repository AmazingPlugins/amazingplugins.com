// Refresh local badge artwork without exposing visitors to third-party cookies.
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
const { footerBadges } = await import('../src/data/footer-badges.mjs');
const directory = new URL('../public/images/badges/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const badge of footerBadges) {
  const response = await fetch(badge.source);
  if (!response.ok) throw new Error(`${badge.name}: ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());
  await sharp(input).resize({ width: 360, height: 96, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90 }).toFile(new URL(`${badge.id}.webp`, directory).pathname);
  console.log(badge.name);
}
