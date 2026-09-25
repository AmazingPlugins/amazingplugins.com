import sharp from 'sharp';

const assets = new URL('../public/', import.meta.url);
await sharp(new URL('favicon.png', assets).pathname)
  .resize(32, 32).png().toFile(new URL('favicon-32.png', assets).pathname);

for (const width of [540, 768]) {
  await sharp(new URL('images/shipping-rules-tester/scenario-builder.webp', assets).pathname)
    .resize({ width }).webp({ quality: 82 })
    .toFile(new URL(`images/shipping-rules-tester/scenario-builder-${width}.webp`, assets).pathname);
}
