import { Download, ExternalLink, FileText, Mail, Linkedin } from 'lucide-react';

const cvPath = '/cv/Amitabh_Chondro_Roy_Academic_CV.pdf';

const focusAreas = [
  'Climate-responsive architecture',
  'Human-centred and evidence-based design',
  'Environmental and spatial analysis',
  'Biophilic urbanism and sustainable cities',
];

const highlights = [
  {
    title: 'Academic foundation',
    text: 'Bachelor of Architecture from Hajee Mohammad Danesh Science and Technology University, with a thesis on human-centred work environments.',
  },
  {
    title: 'Research direction',
    text: 'Investigating how daylight, natural ventilation, open space, and biophilic environments influence wellbeing and spatial experience.',
  },
  {
    title: 'Professional experience',
    text: 'Experience across architectural design, environmental strategies, visualisation, urban projects, and interdisciplinary collaboration.',
  },
];

export default function CVSection() {
  return (
    <section id="cv" className="scroll-mt-24 bg-[#040816] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-5 border-b border-gray-800 pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold text-[#22C55E]">Academic CV · Updated October 2026</p>
            <h2 className="text-3xl font-bold text-[#F9FAFB] sm:text-4xl">Education, research & recognition</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-[#9CA3AF]">
              A concise overview of my academic preparation, research direction, and recent distinction in urbanism.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href={cvPath} download="Amitabh_Chondro_Roy_Academic_CV.pdf" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#22C55E] px-5 py-3 font-semibold text-[#040816] transition-colors hover:bg-[#16A34A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]">
              <Download size={18} /> Download CV
            </a>
            <a href={cvPath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 px-5 py-3 font-semibold text-[#F9FAFB] transition-colors hover:border-[#22C55E] hover:text-[#22C55E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]">
              <ExternalLink size={17} /> View PDF
            </a>
          </div>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="border-l-2 border-[#22C55E] bg-[#0B1120] px-5 py-4">
            <p className="text-sm text-[#9CA3AF]">Academic distinction · 2026</p>
            <p className="mt-1 font-semibold text-[#F9FAFB]">Diploma of High Achievement in Urbanism</p>
            <p className="mt-1 text-sm text-[#22C55E]">Open Doors Master’s Track Programme</p>
          </div>
          <div className="border-l-2 border-[#0EA5E9] bg-[#0B1120] px-5 py-4">
            <p className="text-sm text-[#9CA3AF]">Recent certification · 2026</p>
            <p className="mt-1 font-semibold text-[#F9FAFB]">Sustainable Construction Management</p>
            <p className="mt-1 text-sm text-[#0EA5E9]">University of Maryland via edX</p>
          </div>
          <div className="border-l-2 border-[#F97316] bg-[#0B1120] px-5 py-4">
            <p className="text-sm text-[#9CA3AF]">Graduate admission · 2026/27</p>
            <p className="mt-1 font-semibold text-[#F9FAFB]">MSc Urban &amp; Regional Planning</p>
            <p className="mt-1 text-sm text-[#F97316]">Admitted to Politecnico di Torino; unable to enroll following visa refusal.</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-[#F9FAFB]">Research profile</h3>
            <p className="max-w-3xl leading-7 text-[#9CA3AF]">
              My academic interests examine how daylight, natural ventilation, open space, and biophilic environments influence wellbeing and spatial experience. I extend these questions from the building scale to healthy cities, climate-adaptive planning, and sustainable urban development in South Asian contexts.
            </p>
            <h3 className="mb-4 mt-8 text-xl font-semibold text-[#F9FAFB]">Selected highlights</h3>
            <div className="space-y-5">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="border-l-2 border-[#22C55E]/60 pl-4">
                  <h4 className="font-semibold text-[#22C55E]">{highlight.title}</h4>
                  <p className="mt-1 leading-relaxed text-[#9CA3AF]">{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-7 border-t border-gray-800 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-[#F9FAFB]">Research interests</h3>
              <ul className="space-y-2 text-[#9CA3AF]">
                {focusAreas.map((area) => <li key={area}>{area}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-[#F9FAFB]">Professional contact</h3>
              <a href="mailto:arc.mit07@gmail.com" className="mb-3 flex items-center gap-3 text-[#9CA3AF] transition-colors hover:text-[#22C55E]"><Mail size={18} className="text-[#22C55E]" /> arc.mit07@gmail.com</a>
              <a href="https://linkedin.com/in/aramitabh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#9CA3AF] transition-colors hover:text-[#22C55E]"><Linkedin size={18} className="text-[#22C55E]" /> linkedin.com/in/aramitabh</a>
            </div>
            <a href={cvPath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#22C55E] hover:underline"><FileText size={17} /> Open the full two-page CV</a>
          </aside>
        </div>
      </div>
    </section>
  );
}
