import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  keywords?: string;
  profilePage?: boolean;
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  path,
  image = '/og-image.jpg',
  type = 'website',
  keywords,
  profilePage = false,
  noindex = false,
}: SEOProps) {
  const siteName = 'Amitabh Chondro Roy';
  const fullTitle = title === 'Home'
    ? 'Amitabh Chondro Roy | Architect & Urban Planning Professional'
    : title.includes(siteName) ? title : `${title} | ${siteName}`;
  const siteUrl = 'https://amitabhroy.bd';
  const fullUrl = `${siteUrl}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const profileStructuredData = profilePage ? {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'dateModified': '2026-10-04T00:00:00+06:00',
    'mainEntity': {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      'name': siteName,
      'url': siteUrl,
      'image': imageUrl,
      'jobTitle': ['Architect', 'Urban Planning Professional'],
      'description': 'Architect and emerging urban-planning researcher focused on human-centred design, climate-responsive architecture, environmental analysis, and sustainable urban development.',
      'knowsAbout': [
        'Architecture',
        'Urban and regional planning',
        'Human-centred design',
        'Climate-responsive architecture',
        'Sustainable urban development',
        'Environmental analysis',
      ],
      'sameAs': ['https://linkedin.com/in/aramitabh'],
    },
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content={profilePage ? 'profile' : type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="Amitabh Chondro Roy, architect and urban planning professional" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="canonical" href={fullUrl} />
      <meta name="keywords" content={keywords ?? 'architect, urban planning, sustainable design, climate-responsive architecture, Bangladesh, Amitabh Chondro Roy'} />
      <meta name="author" content={siteName} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="language" content="English" />
      {profileStructuredData && (
        <script type="application/ld+json">{JSON.stringify(profileStructuredData)}</script>
      )}
    </Helmet>
  );
}
