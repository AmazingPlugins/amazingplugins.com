import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
console.log('argv[1]:', process.argv[1]);
console.log('__filename:', __filename);
console.log('match:', process.argv[1] === __filename);
