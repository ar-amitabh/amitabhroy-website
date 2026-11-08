import Contact from '../components/portfolio/Contact';
import SEO from '../components/SEO';

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://amitabhroy.bd/contact#contact',
  name: 'Contact Amitabh Chondro Roy — Architecture & Research Collaborations',
  url: 'https://amitabhroy.bd/contact',
  description:
    'Contact Amitabh Chondro Roy for architectural consultations, graduate research collaborations, studio roles, or sustainable design projects in Bangladesh.',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://amitabhroy.bd/#person',
    name: 'Amitabh Chondro Roy',
    email: 'mailto:arc.mit07@gmail.com',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20 bg-paper">
      <SEO
        title="Contact for Architecture & Research Collaborations"
        description="Contact Amitabh Chondro Roy for architectural consultations, graduate research collaborations, studio roles, or sustainable design projects in Bangladesh."
        path="/contact"
        jsonLd={contactPageSchema}
      />
      <Contact />
    </div>
  );
}
