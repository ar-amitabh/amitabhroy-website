import { Download, ExternalLink, FileText, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const cvPath = '/cv/Amitabh_Chondro_Roy_Academic_CV.pdf';

const focusAreas = [
  'Climate-responsive architecture & passive cooling',
  'Human-centred and evidence-based workplace design',
  'Environmental and spatial GIS analysis',
  'Biophilic urbanism and sustainable cities',
];

const highlights = [
  {
    title: 'Academic foundation',
    text: 'Bachelor of Architecture from Hajee Mohammad Danesh Science and Technology University (HSTU), with a thesis on human-centred work environments for Rangpur Hi-Tech Park.',
  },
  {
    title: 'Research direction',
    text: 'Investigating how daylight, natural ventilation, courtyard proportions, and biophilic environments influence occupant wellbeing and spatial experience.',
  },
  {
    title: 'Professional practice',
    text: 'Architect at Abode Engineers (Bogra, 2022–Present), former Intern Architect at Sthapotik (Dhaka), and visual identity designer for 70+ international clients.',
  },
];

export default function CVSection() {
  return (
    <section
      id="cv"
      className="brand-section scroll-mt-24 border-b border-stone bg-paper-raised text-graphite"
    >
      <div className="brand-container">
        {/* Section 8.6: CV and Downloads with file size and update date */}
        <div className="mb-12 grid gap-6 border-b border-stone pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="type-label mb-3 text-forest-deep">
              CV &amp; Downloads · 2 Pages · PDF (142 KB) · Updated October 2026
            </p>
            <h2 className="type-h2 text-graphite">
              Education, research &amp; academic <span className="accent-italic">record</span>.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-graphite-soft">
              A concise overview of academic preparation, research publications, and recent
              distinctions in urbanism and sustainable construction management.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={cvPath}
              download="Amitabh_Chondro_Roy_Academic_CV.pdf"
              className="btn-primary"
            >
              <Download size={16} strokeWidth={1.5} />
              Download CV (142 KB)
            </a>
            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <ExternalLink size={16} strokeWidth={1.5} />
              Open PDF
            </a>
          </div>
        </div>

        {/* Academic Milestones */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-card border border-stone bg-paper p-6">
            <p className="type-label text-forest-deep">Academic Distinction · 2026</p>
            <h3 className="mt-2 font-serif text-2xl text-graphite">
              Diploma of High Achievement in Urbanism
            </h3>
            <p className="mt-2 text-sm text-graphite-soft">
              Open Doors Master’s Track Programme
            </p>
          </div>
          <div className="rounded-card border border-stone bg-paper p-6">
            <p className="type-label text-forest-deep">Executive Certification · 2026</p>
            <h3 className="mt-2 font-serif text-2xl text-graphite">
              Sustainable Construction Management
            </h3>
            <p className="mt-2 text-sm text-graphite-soft">
              University of Maryland via edX (CMAN-4)
            </p>
          </div>
          <div className="rounded-card border border-stone bg-paper p-6">
            <p className="type-label text-terracotta-deep">Graduate Admission · 2026/27</p>
            <h3 className="mt-2 font-serif text-2xl text-graphite">
              MSc Urban &amp; Regional Planning
            </h3>
            <p className="mt-2 text-sm text-graphite-soft">
              Admitted to Politecnico di Torino; unable to enroll following visa refusal.
            </p>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-label mb-3 text-forest-deep">Research Profile</p>
            <p className="max-w-[65ch] text-base leading-[1.7] text-graphite-soft">
              My academic interests examine how daylight, natural ventilation, open space, and
              biophilic environments influence wellbeing and spatial experience. I extend these
              questions from the building scale to healthy cities, climate-adaptive planning, and
              sustainable urban development in South Asian contexts.
            </p>

            <p className="type-label mb-4 mt-10 text-forest-deep">Selected Highlights</p>
            <div className="space-y-6">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="border-l border-forest pl-5">
                  <h3 className="font-serif text-2xl text-graphite">{highlight.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-graphite-soft">
                    {highlight.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-8 border-t border-stone pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <p className="type-label mb-4 text-forest-deep">Research Interests</p>
              <ul className="space-y-2.5 text-sm text-graphite-soft">
                {focusAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="type-label mb-4 text-forest-deep">Academic &amp; Professional Links</p>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:arc.mit07@gmail.com"
                  className="flex items-center gap-3 text-graphite-soft transition-colors hover:text-graphite"
                >
                  <Mail size={16} strokeWidth={1.5} className="text-forest" />
                  arc.mit07@gmail.com
                </a>
                <a
                  href="https://orcid.org/0009-0004-6847-0225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-graphite-soft transition-colors hover:text-graphite"
                >
                  <ExternalLink size={16} strokeWidth={1.5} className="text-forest" />
                  ORCID: 0009-0004-6847-0225
                </a>
                <a
                  href="https://www.researchgate.net/profile/Amitabh-Chondro-Roy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-graphite-soft transition-colors hover:text-graphite"
                >
                  <ExternalLink size={16} strokeWidth={1.5} className="text-forest" />
                  ResearchGate Profile
                </a>
                <a
                  href="https://doi.org/10.5281/zenodo.23915357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-graphite-soft transition-colors hover:text-graphite"
                >
                  <FileText size={16} strokeWidth={1.5} className="text-forest" />
                  Zenodo DOI: 10.5281/zenodo.23915357
                </a>
                <a
                  href="https://linkedin.com/in/aramitabh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-graphite-soft transition-colors hover:text-graphite"
                >
                  <Linkedin size={16} strokeWidth={1.5} className="text-forest" />
                  linkedin.com/in/aramitabh
                </a>
              </div>
            </div>

            <div className="rounded-card border border-stone bg-paper p-5">
              <p className="type-label text-graphite-soft">Full Portfolio Request</p>
              <p className="mt-2 text-sm leading-relaxed text-graphite-soft">
                Need high-resolution architectural drawings or full studio sheets?
              </p>
              <Link to="/contact" className="link-underline mt-3 text-xs">
                Request full portfolio PDF
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
