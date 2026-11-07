import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://amitabhroy.bd';
const SITE_NAME = 'Amitabh Chondro Roy';
const DIST_DIR = path.resolve('dist');
const JOURNAL_DIR = path.resolve('src/content/journal');

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n?/g, '\n');
  if (!normalized.startsWith('---\n')) return { data: {}, body: normalized };
  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) return { data: {}, body: normalized };

  const block = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  const data = {};

  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colon = trimmed.indexOf(':');
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim().toLowerCase();
    let value = trimmed.slice(colon + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, body };
}

function markdownToSimpleHtml(markdown) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('|')) continue;
    if (line.startsWith('### ')) {
      out.push(`<h3>${escapeHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      out.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      out.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
    } else if (line === '---') {
      out.push('<hr />');
    } else {
      const cleaned = line
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1');
      out.push(`<p>${escapeHtml(cleaned)}</p>`);
    }
  }
  return out.join('\n');
}

function buildRouteHtml(template, route) {
  const fullTitle =
    route.title === 'Home'
      ? 'Amitabh Chondro Roy | Architect & Urban Planning Professional'
      : route.title.includes(SITE_NAME)
        ? route.title
        : `${route.title} | ${SITE_NAME}`;
  const fullUrl = `${SITE_URL}${route.path}`;
  const imageUrl = route.image?.startsWith('http')
    ? route.image
    : `${SITE_URL}${route.image || '/og-image.jpg'}`;
  const ogType = route.type || 'website';

  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title data-rh="true">${escapeHtml(fullTitle)}</title>`,
  );

  // Replace static OG and Twitter tags in template with route-specific data-rh="true" tags
  html = html
    .replace(
      /<meta property="og:type"[^>]*>/i,
      `<meta property="og:type" content="${escapeHtml(ogType)}" data-rh="true" />`,
    )
    .replace(
      /<meta property="og:title"[^>]*>/i,
      `<meta property="og:title" content="${escapeHtml(fullTitle)}" data-rh="true" />`,
    )
    .replace(
      /<meta property="og:description"[^>]*>/i,
      `<meta property="og:description" content="${escapeHtml(route.description)}" data-rh="true" />`,
    )
    .replace(
      /<meta property="og:image" content="[^"]*"[^>]*>/i,
      `<meta property="og:image" content="${escapeHtml(imageUrl)}" data-rh="true" />`,
    )
    .replace(
      /<meta property="og:image:alt"[^>]*>/i,
      `<meta property="og:image:alt" content="${escapeHtml(route.imageAlt || fullTitle)}" data-rh="true" />`,
    )
    .replace(
      /<meta name="twitter:title"[^>]*>/i,
      `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" data-rh="true" />`,
    )
    .replace(
      /<meta name="twitter:description"[^>]*>/i,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" data-rh="true" />`,
    )
    .replace(
      /<meta name="twitter:image"[^>]*>/i,
      `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" data-rh="true" />`,
    );

  const extraHead = [
    `    <meta name="description" content="${escapeHtml(route.description)}" data-rh="true" />`,
    `    <link rel="canonical" href="${escapeHtml(fullUrl)}" data-rh="true" />`,
    `    <meta property="og:url" content="${escapeHtml(fullUrl)}" data-rh="true" />`,
    route.keywords
      ? `    <meta name="keywords" content="${escapeHtml(route.keywords)}" data-rh="true" />`
      : '',
    route.jsonLd
      ? `    <script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  html = html.replace('</head>', `${extraHead}\n  </head>`);

  if (route.noscriptHtml) {
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/i,
      `<noscript>\n      <div style="max-width:48rem;margin:4rem auto;padding:0 1.5rem;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#F9FAFB;background:#040816;line-height:1.7">\n${route.noscriptHtml}\n      </div>\n    </noscript>`,
    );
  }

  return html;
}

const baseTemplate = await readFile(path.join(DIST_DIR, 'index.html'), 'utf8');

// 1. Load all journal posts
const mdFiles = (await readdir(JOURNAL_DIR)).filter((f) => f.endsWith('.md'));
const journalPosts = [];

for (const file of mdFiles) {
  const raw = await readFile(path.join(JOURNAL_DIR, file), 'utf8');
  const { data, body } = parseFrontmatter(raw);
  if (data.draft === 'true' || data.published === 'false') continue;
  const slug = data.slug || file.replace(/\.md$/i, '');
  journalPosts.push({
    slug,
    title: data.title || slug,
    seoTitle: data.seotitle || data.title || slug,
    subtitle: data.subtitle || '',
    description: data.description || data.subtitle || '',
    keywords: data.keywords || '',
    category: data.category || '',
    date: data.date || '2026-11-07',
    image: data.image || '/og-image.jpg',
    imageAlt: data.imagealt || data.title || '',
    body,
  });
}

// 2. Define static routes to pre-render
const routes = [
  {
    path: '/',
    outFile: 'index.html',
    title: 'Home',
    description:
      'Amitabh Chondro Roy (Amitabh Roy) is an architect and urban planning professional in Bangladesh, exploring human-centred, climate-responsive architecture and sustainable urban development.',
    image: '/og-image.jpg',
  },
  {
    path: '/about',
    outFile: 'about/index.html',
    title: 'About Amitabh Chondro Roy (Amitabh Roy) | Architect',
    description:
      'Learn about Amitabh Chondro Roy (Amitabh Roy) — architect and urban planning professional focused on healthier, climate-responsive, and sustainable spaces through human-centered design.',
    image: '/amitabh-chondro-roy-architect-portrait.jpg',
    noscriptHtml: `<h1>About Amitabh Chondro Roy (Amitabh Roy)</h1><p>Designing with evidence, climate, and human wellbeing in view. Architect and urban-planning researcher based in Bangladesh.</p>`,
  },
  {
    path: '/work',
    outFile: 'work/index.html',
    title: 'Architectural Works',
    description:
      'Architectural, urban design and visual communication projects, plus a photography gallery of architecture, urban life, landscape and nature in Bangladesh.',
    image: '/og-image.jpg',
    noscriptHtml: `<h1>Architectural Works — Amitabh Chondro Roy</h1><p>Selected architecture, urban design, visual communication projects, and architectural photography in Bangladesh.</p>`,
  },
  {
    path: '/research',
    outFile: 'research/index.html',
    title: 'Research | Amitabh Chondro Roy',
    description:
      'Research in human-centered, climate-responsive and sustainable architecture, including a 30-respondent workplace well-being study at Rangpur Hi-Tech Park and its design outcomes.',
    image: '/research-rangpur-hitech-park-conceptual-visual.jpg',
    noscriptHtml: `<h1>Research — Amitabh Chondro Roy</h1><p>Human-Centered Work Environment for Rangpur Hi-Tech Park (Zenodo DOI: 10.5281/zenodo.23915357, ORCID: 0009-0004-6847-0225).</p>`,
  },
  {
    path: '/blogs',
    outFile: 'blogs/index.html',
    title: 'Journal',
    description: 'Notes on architecture, place, climate, and the everyday life of buildings.',
    image: '/og-image.jpg',
    noscriptHtml: `<h1>Journal — Ideas shaped by place</h1><ul>${journalPosts
      .map(
        (p) =>
          `<li><a href="/blogs/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`,
      )
      .join('')}</ul>`,
  },
  {
    path: '/contact',
    outFile: 'contact/index.html',
    title: 'Contact',
    description:
      'Get in touch with Amitabh Chondro Roy (Amitabh Roy) for architectural design, urban planning research, and sustainable design collaborations.',
    image: '/og-image.jpg',
    noscriptHtml: `<h1>Contact Amitabh Chondro Roy</h1><p>Email: <a href="mailto:arc.mit07@gmail.com">arc.mit07@gmail.com</a></p>`,
  },
];

// 3. Add individual blog post routes
for (const post of journalPosts) {
  const postPath = `/blogs/${post.slug}`;
  const coverUrl = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
  routes.push({
    path: postPath,
    outFile: `blogs/${post.slug}/index.html`,
    title: post.seoTitle,
    description: post.description,
    keywords: post.keywords,
    image: post.image,
    imageAlt: post.imageAlt,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: coverUrl,
      mainEntityOfPage: `${SITE_URL}${postPath}`,
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        alternateName: 'Amitabh Roy',
        url: `${SITE_URL}/`,
      },
      publisher: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
      },
    },
    noscriptHtml: `<article><h1>${escapeHtml(post.title)}</h1>${post.subtitle ? `<p><em>${escapeHtml(post.subtitle)}</em></p>` : ''}<p>By Amitabh Chondro Roy · ${escapeHtml(post.date)}</p>${markdownToSimpleHtml(post.body)}</article>`,
  });
}

for (const route of routes) {
  const targetPath = path.join(DIST_DIR, route.outFile);
  await mkdir(path.dirname(targetPath), { recursive: true });
  const rendered = buildRouteHtml(baseTemplate, route);
  await writeFile(targetPath, rendered, 'utf8');
}

console.log(`Pre-rendered ${routes.length} static HTML routes into dist/`);
