import sharp from 'sharp';

const assets = new URL('../public/', import.meta.url);
// Bake the existing noise filter once instead of rasterizing it on every visit.
const grain = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
await sharp(Buffer.from(grain)).png().toFile(new URL('images/grain.png', assets).pathname);
await sharp(new URL('favicon.png', assets).pathname)
  .resize(32, 32).png().toFile(new URL('favicon-32.png', assets).pathname);

for (const width of [540, 768]) {
  await sharp(new URL('images/shipping-rules-tester/scenario-builder.webp', assets).pathname)
    .resize({ width }).webp({ quality: 82 })
    .toFile(new URL(`images/shipping-rules-tester/scenario-builder-${width}.webp`, assets).pathname);
}
