import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Work from '../components/portfolio/Work';
import SEO from '../components/SEO';
import PhotographySection from '../components/portfolio/PhotographySection';
import { portfolioProjects } from '../data/projects';

export default function WorkPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryProject = searchParams.get('project');

  useEffect(() => {
    if (!slug && queryProject) {
      const matched = portfolioProjects.find((p) => p.slug === queryProject);
      if (matched) {
        navigate(`/work/${matched.slug}`, { replace: true });
      }
    }
  }, [slug, queryProject, navigate]);

  const activeSlug = slug || queryProject || '';
  const activeProject = portfolioProjects.find((p) => p.slug === activeSlug) ?? null;

  const workCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://amitabhroy.bd/work#collection',
    name: 'Architecture & Urban Design Case Studies | Amitabh Chondro Roy',
    url: 'https://amitabhroy.bd/work',
    description:
      'Selected architectural, urban planning, and climate-responsive design case studies, visual identity systems, and architectural photography in Bangladesh.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: portfolioProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://amitabhroy.bd/work/${project.slug}`,
        name: project.title,
      })),
    },
  };

  const projectSchema = activeProject
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `https://amitabhroy.bd/work/${activeProject.slug}#project`,
        name: activeProject.title,
        headline: activeProject.title,
        description: activeProject.overview,
        url: `https://amitabhroy.bd/work/${activeProject.slug}`,
        image: `https://amitabhroy.bd${activeProject.image}`,
        dateCreated: activeProject.year.slice(0, 4),
        spatialCoverage: {
          '@type': 'Place',
          name: activeProject.location,
        },
        genre: activeProject.categories,
        keywords: activeProject.tags.join(', '),
        creator: {
          '@type': 'Person',
          '@id': 'https://amitabhroy.bd/#person',
          name: 'Amitabh Chondro Roy',
        },
      }
    : null;

  return (
    <div className="pt-20 bg-paper">
      {activeProject ? (
        <SEO
          title={`${activeProject.title} — Case Study`}
          description={activeProject.overview}
          path={`/work/${activeProject.slug}`}
          image={activeProject.image}
          imageAlt={activeProject.imageAlt}
          type="article"
          keywords={`${activeProject.title}, ${activeProject.tags.join(', ')}, ${activeProject.location}, Amitabh Chondro Roy`}
          jsonLd={projectSchema ?? undefined}
        />
      ) : (
        <SEO
          title="Architecture & Urban Design Case Studies"
          description="Selected architectural, urban planning, and climate-responsive design case studies, visual identity systems, and architectural photography in Bangladesh."
          path="/work"
          jsonLd={workCollectionSchema}
        />
      )}
      <Work activeProject={activeProject} />
      {!activeProject && <PhotographySection />}
    </div>
  );
}
