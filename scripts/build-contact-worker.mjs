import { copyFile, writeFile } from 'node:fs/promises';
// Pages deploy uploads dist/client. Include the server-only handler in its
// reserved Worker entry point; it is not served as a public JavaScript asset.
await copyFile('server/contact-worker.js', 'dist/client/_worker.js');
await writeFile('dist/client/_routes.json', JSON.stringify({
  version: 1, include: ['/api/contact', '/api/contact/*'], exclude: [],
}, null, 2) + '\n');
