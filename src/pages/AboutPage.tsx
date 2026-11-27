import About from '../components/portfolio/About';
import Experience from '../components/portfolio/Experience';
import FiverrReviews from '../components/portfolio/FiverrReviews';
import CVSection from '../components/portfolio/CVSection';
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <div className="pt-20 bg-paper">
      <SEO
        title="About Amitabh Chondro Roy | Architect & Urban Planning Researcher"
        description="About Amitabh Chondro Roy, B.Arch (HSTU) and IAB AR-260 architect researching healthy cities, climate-responsive architecture, and urban planning in Bangladesh."
        path="/about"
      />
      <About />
      <CVSection />
      <Experience />
      <FiverrReviews />
    </div>
  );
}
