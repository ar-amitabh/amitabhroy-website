import About from '../components/portfolio/About';
import Experience from '../components/portfolio/Experience';
import FiverrReviews from '../components/portfolio/FiverrReviews';
import CVSection from '../components/portfolio/CVSection';
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <div className="pt-20 bg-paper">
      <SEO
        title="About Amitabh Chondro Roy (Amitabh Roy) | Architect"
        description="Learn about Amitabh Chondro Roy (Amitabh Roy) — architect and urban planning professional focused on healthier, climate-responsive, and sustainable spaces through human-centered design."
        path="/about"
      />
      <h1 className="sr-only">About Amitabh Chondro Roy (Amitabh Roy)</h1>
      <About />
      <CVSection />
      <Experience />
      <FiverrReviews />
    </div>
  );
}
