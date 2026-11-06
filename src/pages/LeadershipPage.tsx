import Leadership from '../components/portfolio/Leadership';
import Awards from '../components/portfolio/Awards';
import MediaCoverage from '../components/portfolio/MediaCoverage';
import Volunteering from '../components/portfolio/Volunteering';
import SEO from '../components/SEO';

export default function LeadershipPage() {
  return (
    <div className="pt-16">
      <SEO
        title="Leadership & Community Impact"
        description="Explore my leadership journey in architecture, community initiatives, awards, media coverage, and volunteering efforts in sustainable design and urban development."
        path="/leadership"
      />
      <Leadership />
      <Awards />
      <MediaCoverage />
      <Volunteering />
    </div>
  );
}
