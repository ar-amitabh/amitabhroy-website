import Work from '../components/portfolio/Work';
import SEO from '../components/SEO';
import PhotographySection from '../components/portfolio/PhotographySection';

export default function WorkPage() {
  return (
    <div className="pt-20 bg-paper">
      <SEO
        title="Architectural Works"
        description="Architectural, urban design and visual communication projects, plus a photography gallery of architecture, urban life, landscape and nature in Bangladesh."
        path="/work"
      />
      <Work />
      <PhotographySection />
    </div>
  );
}
