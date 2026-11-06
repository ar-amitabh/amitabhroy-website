# Amitabh Chondro Roy — website source

React 18 + TypeScript + Vite 5 + Tailwind CSS 3 + Framer Motion + react-router 7.
This is the source project behind the current design (hero "Designing
Architecture That Heals", nav Home / About / Work / Research / Contact).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # writes dist/
npm run preview    # serves dist/
npm run typecheck  # tsc --noEmit
```

`npm run build` output in `dist/` is what you upload to `public_html`.

## Routes

| Path | Page |
|---|---|
| `/` | HomePage — Hero + ValuePillars |
| `/about` | AboutPage — CVSection, About, Experience, FiverrReviews |
| `/work` | WorkPage — Work, PhotographySection |
| `/research` | ResearchPage — thesis survey dashboard + project context |
| `/photography` | 301 → `/work#photography` (retired; gallery lives in WorkPage) |
| `/cv` | 301 → `/about#cv` (retired; CV lives in AboutPage) |
| `/contact` | ContactPage (Web3Forms) |
| `/blogs` | BlogsPage (Markdown posts compiled at build time) |
| `/blogs/:slug` | BlogArticlePage (Markdown) |
| `/admin`, `/admin/*` | redirect → `/blogs` (the CMS was retired) |

## Where things live

```
src/
  App.tsx                 router + layout, routes are lazy() imported
  main.tsx                HelmetProvider + createRoot
  index.css               Tailwind layers, Inter @font-face, Quill dark theme
  components/SEO.tsx      per-route title, description, canonical, OG, JSON-LD
  components/portfolio/   page sections (Hero, Header, Footer, Work, ...)
  components/research/    /research dashboard: KPI strip, SVG charts, Table 5.1
  data/thesisSurvey.ts    thesis survey figures (single source of truth)
  data/thesisFigures.ts   Chapter 5 design-outcome renders and captions
  data/photography.ts     Work-page gallery list (title, category, alt, sizes)
  data/journal.ts         loads and sorts posts from src/content/journal/
  content/journal/        journal posts as Markdown (see content/JOURNAL.md)
  pages/                  one component per route
  lib/markdown.ts         small, escaping Markdown renderer
  lib/frontmatter.ts      parses the journal frontmatter block
  lib/contact.ts          Web3Forms submission
  lib/validation.ts       contact form schema
public/                   static files copied verbatim into dist/
  .htaccess               SPA rewrites, retired-page 301s, caching, CSP
  fonts/inter-latin.woff2 Inter variable, self-hosted (CSP blocks Google Fonts)
  photography/gallery/     responsive WebP photographs (640 / 1024 / 1536)
  research/figures/        Chapter 5 render WebP set (640 / 1024 / 1536)
  cv/                     the downloadable CV PDF
```

## Environment

`.env` (never committed publicly, but Vite inlines the value into the bundle):

```
VITE_WEB3FORMS_ACCESS_KEY=...
```

Create the key at https://web3forms.com (it is public by design and safe to
ship). The key only authorises form submissions to the portfolio inbox. Without
it, the contact form falls back to opening the visitor's mail app.

There is no database, no auth service and no server to keep alive. Journal posts
are files in `src/content/journal/` and are compiled into the build.

## Editing content

- Hero headline/copy: `src/components/portfolio/Hero.tsx`
- Navigation: `Header.tsx` → `navLinks` array
- Projects: `Work.tsx` (`featuredProject`, `projects`)
- Photography gallery: `src/data/photography.ts` → `galleryPhotos`; images in
  `public/photography/gallery/`
- Thesis dashboard: `src/data/thesisSurvey.ts` — all survey figures live there;
  the components only format them
- Chapter 5 renders: `src/data/thesisFigures.ts` → `spatialFigures`; images in
  `public/research/figures/`
- New responsive images: `node scripts/optimize-photo.cjs "<file>" <slug>
  [outDir] [quality]` writes the 640 / 1024 / 1536 WebP set and prints the
  data entry to paste in
- CV text: `pages/AboutPage.tsx` → `CVSection.tsx` (the standalone CV page was
  removed; `/cv` redirects to `/about#cv`)
- Journal posts: `src/content/journal/*.md`; create one with
  `npm run journal:new -- "Title"`. The format is documented in
  `src/content/JOURNAL.md`.

## Design decisions worth keeping

1. **No static canonical/description in `index.html`.** `SEO.tsx` owns them.
   A static copy makes every route canonicalise to `/`.
2. **`title.includes(siteName)` guard in `SEO.tsx`.** Without it every page
   renders "... | Amitabh Chondro Roy | Amitabh Chondro Roy".
3. **Self-hosted Inter.** The Hostinger CSP is `style-src 'self'`, so the
   Google Fonts import silently failed.
4. **`overflow-x: clip` on html/body.** Framer Motion animates cards from
   `x: -30` / `x: 30`; without clipping that is a 14 px horizontal scrollbar on
   phones.
5. **The journal is build-time, not a database.** Posts are Markdown files
   compiled into the bundle. This is why there is no CMS chunk, no auth client
   and no service that can pause or be deleted. Do not reintroduce a runtime
   fetch for `/blogs` without a clear reason.
6. **`Layout` owns the single `<main id="main-content">`.** Pages must not
   render their own `<main>`; axe flags duplicate main landmarks otherwise.
7. **Green buttons use dark labels.** `text-white` on `#22C55E` is 2.4:1 and
   fails WCAG AA; `text-[#040816]` is ~9:1.
8. **Headings must not skip levels.** Section eyebrows that precede h3 cards
   are h2s ("Featured Project", "Selected Work").
9. **The research charts are hand-built SVG/CSS, not Chart.js.** That keeps the
   CSP clean and adds no chart runtime to the bundle. Every value is also
   printed as text and repeated in a screen-reader table. Do not swap in a CDN
   chart library — the deployed CSP blocks it.

## Deploy

```bash
npm run build
# upload the CONTENTS of dist/ to public_html
```

Keep `.htaccess` in sync when you change the canonical host: it must match
`siteUrl` in `SEO.tsx` and the URLs in `public/sitemap.xml`.
