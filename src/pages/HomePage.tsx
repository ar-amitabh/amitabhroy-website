import Hero from '../components/portfolio/Hero';
import ValuePillars from '../components/portfolio/ValuePillars';
import SEO from '../components/SEO';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="Amitabh Chondro Roy is an architect and urban planning professional in Bangladesh, exploring human-centred, climate-responsive architecture and sustainable urban development."
        path="/"
        profilePage
      />
      <Hero />
      <ValuePillars />
    </>
  );
}
