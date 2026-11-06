import { copyFile } from 'node:fs/promises';

await copyFile('README-DEPLOY.txt', 'dist/README-DEPLOY.txt');
console.log('Copied README-DEPLOY.txt into dist/');
