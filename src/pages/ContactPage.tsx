import Contact from '../components/portfolio/Contact';
import SEO from '../components/SEO';

export default function ContactPage() {
  return (
    <div className="pt-20 bg-paper">
      <SEO
        title="Get in Touch"
        description="Contact Amitabh Chondro Roy for architectural consultations, graduate research collaborations, studio roles, or sustainable design projects."
        path="/contact"
      />
      <Contact />
    </div>
  );
}
