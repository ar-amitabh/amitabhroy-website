#!/usr/bin/env node
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Usage: npm run journal:new -- "The title of the story"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[^\w\s-]/g, '')
  .trim()
  .replace(/[\s_]+/g, '-')
  .replace(/-+/g, '-');

const date = new Date().toISOString().slice(0, 10);
const directory = path.join('src', 'content', 'journal');
const file = path.join(directory, `${date}-${slug}.md`);

try {
  await access(file);
  console.error(`Already exists: ${file}`);
  process.exit(1);
} catch {
  // The file does not exist yet, which is what we want.
}

await mkdir(directory, { recursive: true });
await writeFile(
  file,
  `---
title: "${title.replace(/"/g, '\\"')}"
subtitle: ""
date: ${date}
slug: ${slug}
image: ""
imageAlt: ""
draft: true
---

Write the story here. Standard Markdown works: headings, paragraphs, **bold**,
*italic*, [links](https://example.com), lists, blockquotes and images.

When the story is ready, change \`draft: true\` to \`draft: false\`, then run
\`npm run build\` and upload the contents of \`dist/\`.
`,
  'utf8',
);

console.log(`Created ${file}`);
console.log('Edit it, set draft: false when ready, then run npm run build.');
