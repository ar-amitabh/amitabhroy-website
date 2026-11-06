# Journal

Each `.md` file in this folder becomes a post on `/blogs` at build time.

Create one with:

```bash
npm run journal:new -- "The title of the story"
```

Then edit the generated file. `draft: true` keeps it out of the build; change it
to `false` (or remove the line) when the story is ready.

## Frontmatter

```yaml
---
title: "A title"
subtitle: "One sentence that appears under the title."
date: 2026-11-06
slug: a-title
image: /journal/a-title-1536.webp
imageAlt: "Description of the cover image"
draft: false
---
```

- `title` and `date` are required.
- `slug` is optional; it defaults to the file name.
- `image` is optional. Put the file in `public/journal/` and reference it from
  the site root, for example `/journal/a-title-1536.webp`.
- `draft: true` hides the post.

## Body

Standard Markdown works: headings, paragraphs, **bold**, *italic*, links,
images, lists, blockquotes, horizontal rules and fenced code blocks. Raw HTML
is escaped rather than rendered, so paste text, not markup.
