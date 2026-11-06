import Contact from '../components/portfolio/Contact';
import SEO from '../components/SEO';

export default function ContactPage() {
  return (
    <div className="pt-16">
      <SEO
        title="Get in Touch"
        description="Contact me for architectural consultations, design projects, or speaking engagements. I'd love to discuss your vision for sustainable, human-centered spaces."
        path="/contact"
      />
      <Contact />
    </div>
  );
}
