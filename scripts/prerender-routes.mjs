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

const SECTION_LABELS = {
  about: 'About',
  work: 'Work & Case Studies',
  research: 'Research & Publications',
  blogs: 'Journal',
  contact: 'Contact',
};

function buildBreadcrumbSchema(routePath, routeTitle) {
  const segments = routePath.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      ...segments.map((seg, idx) => {
        const isLast = idx === segments.length - 1;
        const itemPath = `/${segments.slice(0, idx + 1).join('/')}`;
        const label = isLast
          ? routeTitle.replace(/\s*\|\s*Amitabh Chondro Roy.*$/i, '')
          : SECTION_LABELS[seg] || seg;
        return {
          '@type': 'ListItem',
          position: idx + 2,
          name: label,
          item: `${SITE_URL}${itemPath}`,
        };
      }),
    ],
  };
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

  const breadcrumbSchema = buildBreadcrumbSchema(route.path, route.title);
  const schemas = [];
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  if (Array.isArray(route.jsonLd)) {
    schemas.push(...route.jsonLd);
  } else if (route.jsonLd) {
    schemas.push(route.jsonLd);
  }

  const extraHead = [
    `    <meta name="description" content="${escapeHtml(route.description)}" data-rh="true" />`,
    `    <link rel="canonical" href="${escapeHtml(fullUrl)}" data-rh="true" />`,
    `    <meta property="og:url" content="${escapeHtml(fullUrl)}" data-rh="true" />`,
    route.keywords
      ? `    <meta name="keywords" content="${escapeHtml(route.keywords)}" data-rh="true" />`
      : '',
    ...schemas.map(
      (schema) => `    <script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    ),
  ]
    .filter(Boolean)
    .join('\n');

  html = html.replace('</head>', `${extraHead}\n  </head>`);

  if (route.noscriptHtml) {
    html = html.replace(
      /<noscript>\s*<div[\s\S]*?<\/div>\s*<\/noscript>/i,
      `<noscript>\n      <div style="max-width:48rem;margin:4rem auto;padding:0 1.5rem;font-family:Georgia,serif;color:#343638;background:#F6F4EF;line-height:1.7">\n${route.noscriptHtml}\n      </div>\n    </noscript>`,
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
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  journalPosts.push({
    slug,
    title: data.title || slug,
    seoTitle: data.seotitle || data.title || slug,
    subtitle: data.subtitle || '',
    description: data.description || data.subtitle || '',
    keywords: data.keywords || '',
    category: data.category || 'Architecture & Urban Planning',
    date: data.date || '2026-11-07',
    image: data.image || '/og-image.jpg',
    imageAlt: data.imagealt || data.title || '',
    wordCount,
    body,
  });
}

// 2. Define portfolio case studies for pre-rendering
const caseStudies = [
  {
    slug: 'rangpur-hi-tech-park',
    title: 'Human-Centered Hi-Tech Park, Rangpur',
    year: '2021',
    location: 'Khalishakuri, Rangpur',
    categories: ['Architecture', 'Landscape', 'Research'],
    tags: ['Workplace Architecture', 'Biophilic Design', 'Thesis Research'],
    image: '/hi-tech-park-rangpur-biophilic-architecture.jpg',
    imageAlt:
      'Aerial architectural rendering of the proposed Rangpur Hi-Tech Park organized around a central planted courtyard and water retention pond',
    overview:
      'An 8.59-acre technology campus proposal in northern Bangladesh that replaces the conventional deep-plan glass office tower with four narrower, climate-responsive building blocks arranged around a shaded central courtyard (uthon) and rainwater retention pond.',
  },
  {
    slug: '500-bed-hospital-design',
    title: '500-Bed Tertiary Teaching Hospital',
    year: '2020',
    location: 'Northern Bangladesh',
    categories: ['Architecture', 'Landscape'],
    tags: ['Healthcare', 'Healing Spaces', 'Passive Cooling'],
    image: '/hospital-design-500-bed-healing-spaces.jpg',
    imageAlt:
      'Architectural rendering of the 500-bed hospital showing stepped healing gardens, shaded ward facades and clear emergency access',
    overview:
      'A 500-bed healthcare facility designed around patient recovery, clear clinical circulation and climate-responsive ward orientation. Daylit inpatient wings look onto quiet healing gardens while separating emergency, outpatient and diagnostic flows.',
  },
  {
    slug: 'sundar-bari-climate-housing',
    title: 'Sundar Bari: Climate-Resilient Rural Homestead',
    year: '2020',
    location: 'Coastal & Floodplain Bangladesh',
    categories: ['Competitions', 'Architecture', 'Landscape'],
    tags: ['Competition', 'Climate Housing', 'Vernacular Intelligence'],
    image: '/sundar-bari-climate-housing-competition.jpg',
    imageAlt:
      'Perspective of the Sundar Bari climate-resilient housing design featuring raised plinth, deep verandahs and local bamboo-brick construction',
    overview:
      'A competition entry reimagining the rural Bangladeshi homestead for flood-prone and monsoon-intensive regions. The scheme combines an elevated, erosion-resistant plinth with breathable walls, deep verandahs and a productive domestic courtyard.',
  },
  {
    slug: 'renewal-of-public-realm-dinajpur',
    title: 'Renewal of the Historic Public Realm, Dinajpur',
    year: '2018',
    location: 'Dinajpur, Bangladesh',
    categories: ['Urban Planning', 'Landscape'],
    tags: ['Urban Design', 'Heritage Conservation', 'Public Realm'],
    image: '/dinajpur-public-realm-urban-design.jpg',
    imageAlt:
      'Urban design perspective of Dinajpur public realm showing shaded pedestrian promenade, heritage edge and civic gathering plaza',
    overview:
      'An urban regeneration proposal in Dinajpur that reclaims encroached civic edges for pedestrians, linking historic landmarks through shaded walkways, permeable paving, street trees and inclusive public gathering spaces.',
  },
  {
    slug: 'hstu-residential-complex',
    title: 'HSTU Campus Residential Complex',
    year: '2019',
    location: 'Dinajpur, Bangladesh',
    categories: ['Architecture', 'Landscape'],
    tags: ['Housing', 'Courtyard Living', 'Passive Ventilation'],
    image: '/hstu-residential-complex-courtyard-living.jpg',
    imageAlt:
      'Architectural rendering of the HSTU residential complex organized around shaded community courtyards and pedestrian greenways',
    overview:
      'A multi-family university housing scheme at HSTU that balances household privacy with shared community life through staggered courtyard blocks, cross-ventilated apartments and car-free planted pedestrian greens.',
  },
  {
    slug: 'skf-commercial-office-visualization',
    title: 'SK+F Commercial Workplace Visualization',
    year: '2019',
    location: 'Dhaka, Bangladesh',
    categories: ['Architecture'],
    tags: ['Workplace', 'Professional Practice', 'Spatial Visualization'],
    image: '/skf-office-commercial-3d-rendering.jpg',
    imageAlt:
      'Interior architectural visualization of the SK+F office showing warm timber baffles, daylight integration and collaborative work zones',
    overview:
      'Architectural visualization and material study completed during professional internship at Sthapotik in Dhaka, exploring warm acoustic timber ceilings, balanced task lighting and collaborative workplace zoning.',
  },
];

// 3. Define static routes to pre-render
const routes = [
  {
    path: '/',
    outFile: 'index.html',
    title: 'Home',
    description:
      'Amitabh Chondro Roy (Amitabh Roy) is an architect and urban planning professional in Bangladesh, exploring human-centred, climate-responsive architecture and sustainable urban development.',
    image: '/og-image.jpg',
    type: 'profile',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      dateModified: '2026-11-08T00:00:00+06:00',
      mainEntity: {
        '@id': `${SITE_URL}/#person`,
      },
    },
  },
  {
    path: '/about',
    outFile: 'about/index.html',
    title: 'About Amitabh Chondro Roy (Amitabh Roy) | Architect',
    description:
      'Learn about Amitabh Chondro Roy (Amitabh Roy) — architect and urban planning professional focused on healthier, climate-responsive, and sustainable spaces through human-centered design.',
    image: '/amitabh-chondro-roy-architect-portrait.jpg',
    noscriptHtml: `<h1>About Amitabh Chondro Roy (Amitabh Roy)</h1><p>Designing with evidence, climate, and human wellbeing in view. Architect (IAB Associate Member AR-260) and urban-planning researcher based in Bangladesh.</p>`,
  },
  {
    path: '/work',
    outFile: 'work/index.html',
    title: 'Architecture & Urban Design Case Studies',
    description:
      'Selected architectural, urban planning, and climate-responsive design case studies, visual identity systems, and architectural photography in Bangladesh.',
    image: '/og-image.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/work#collection`,
      name: 'Architecture & Urban Design Case Studies | Amitabh Chondro Roy',
      url: `${SITE_URL}/work`,
      description:
        'Selected architectural, urban planning, and climate-responsive design case studies, visual identity systems, and architectural photography in Bangladesh.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: caseStudies.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/work/${p.slug}`,
          name: p.title,
        })),
      },
    },
    noscriptHtml: `<h1>Architecture &amp; Urban Design Case Studies — Amitabh Chondro Roy</h1><ul>${caseStudies
      .map(
        (p) =>
          `<li><a href="/work/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.overview)}</li>`,
      )
      .join('')}</ul>`,
  },
  {
    path: '/research',
    outFile: 'research/index.html',
    title: 'Workplace Wellbeing & Climate-Responsive Design Research',
    description:
      'Research in human-centered, climate-responsive and sustainable architecture, including a 30-respondent workplace well-being study at Rangpur Hi-Tech Park and its design outcomes.',
    image: '/research-rangpur-hitech-park-conceptual-visual.jpg',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        '@id': `${SITE_URL}/research#thesis`,
        headline:
          'Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech Park',
        name: 'Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech Park',
        description:
          'Empirical B.Arch thesis study evaluating indoor environmental quality (IEQ), passive cooling, and human-centered workplace architecture for 30 IT/ITES professionals in Bangladesh.',
        datePublished: '2021-12-01',
        dateModified: '2026-11-06',
        inLanguage: 'en-US',
        url: `${SITE_URL}/research`,
        sameAs: 'https://doi.org/10.5281/zenodo.23915357',
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'DOI',
          value: '10.5281/zenodo.23915357',
        },
        image: `${SITE_URL}/research-rangpur-hitech-park-conceptual-visual.jpg`,
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
        publisher: {
          '@type': 'CollegeOrUniversity',
          name: 'Hajee Mohammad Danesh Science and Technology University (HSTU)',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': `${SITE_URL}/research#dataset`,
        name: 'Rangpur Hi-Tech Park Employee Workplace Wellbeing & IEQ Survey Dataset (n = 30)',
        description:
          'Structured questionnaire dataset of 30 IT/ITES professionals across 9 firms in Bangladesh measuring 6 workplace environmental dimensions (baseline mean IEQ 3.12/5.00 vs. proposed 4.07/5.00, +30.4% improvement).',
        url: `${SITE_URL}/research#field-evidence`,
        sameAs: 'https://doi.org/10.5281/zenodo.23915357',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        isAccessibleForFree: true,
        creator: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: SITE_NAME,
        },
      },
    ],
    noscriptHtml: `<h1>Workplace Wellbeing &amp; Climate-Responsive Design Research — Amitabh Chondro Roy</h1><p>Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech Park (Zenodo DOI: 10.5281/zenodo.23915357, ORCID: 0009-0004-6847-0225).</p>`,
  },
  {
    path: '/blogs',
    outFile: 'blogs/index.html',
    title: 'Architecture, Climate & Urban Design Journal',
    description:
      'Long-form essays and field notes on human-centered architecture, passive cooling strategies, courtyard systems, and workplace wellbeing in Bangladesh.',
    image: '/og-image.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/blogs#blog`,
      name: 'Architecture, Climate & Urban Design Journal | Amitabh Chondro Roy',
      url: `${SITE_URL}/blogs`,
      inLanguage: 'en-US',
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
      },
      blogPost: journalPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${SITE_URL}/blogs/${post.slug}`,
        datePublished: post.date,
        description: post.description,
      })),
    },
    noscriptHtml: `<h1>Architecture, Climate &amp; Urban Design Journal — Ideas shaped by place</h1><ul>${journalPosts
      .map(
        (p) =>
          `<li><a href="/blogs/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`,
      )
      .join('')}</ul>`,
  },
  {
    path: '/contact',
    outFile: 'contact/index.html',
    title: 'Contact for Architecture & Research Collaborations',
    description:
      'Contact Amitabh Chondro Roy for architectural consultations, graduate research collaborations, studio roles, or sustainable design projects in Bangladesh.',
    image: '/og-image.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#contact`,
      name: 'Contact Amitabh Chondro Roy — Architecture & Research Collaborations',
      url: `${SITE_URL}/contact`,
      mainEntity: {
        '@id': `${SITE_URL}/#person`,
      },
    },
    noscriptHtml: `<h1>Contact Amitabh Chondro Roy</h1><p>Email: <a href="mailto:arc.mit07@gmail.com">arc.mit07@gmail.com</a></p>`,
  },
];

// 4. Add individual case study routes (/work/:slug)
for (const project of caseStudies) {
  const projectPath = `/work/${project.slug}`;
  routes.push({
    path: projectPath,
    outFile: `work/${project.slug}/index.html`,
    title: `${project.title} — Case Study`,
    description: project.overview,
    keywords: `${project.title}, ${project.tags.join(', ')}, ${project.location}, Amitabh Chondro Roy`,
    image: project.image,
    imageAlt: project.imageAlt,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${SITE_URL}${projectPath}#project`,
      name: project.title,
      headline: project.title,
      description: project.overview,
      url: `${SITE_URL}${projectPath}`,
      image: `${SITE_URL}${project.image}`,
      dateCreated: project.year,
      spatialCoverage: {
        '@type': 'Place',
        name: project.location,
      },
      genre: project.categories,
      keywords: project.tags.join(', '),
      creator: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
      },
    },
    noscriptHtml: `<article><h1>${escapeHtml(project.title)}</h1><p>${escapeHtml(project.location)} · ${escapeHtml(project.year)}</p><p>${escapeHtml(project.overview)}</p><p><a href="/work">Back to all case studies</a></p></article>`,
  });
}

// 5. Add individual blog post routes (/blogs/:slug)
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
      inLanguage: 'en-US',
      wordCount: post.wordCount,
      articleSection: post.category,
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
