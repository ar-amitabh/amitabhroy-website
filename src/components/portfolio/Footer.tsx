import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const academicLinks = [
    { label: 'ORCID · 0009-0004-6847-0225', href: 'https://orcid.org/0009-0004-6847-0225' },
    { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Amitabh-Chondro-Roy' },
    { label: 'Zenodo DOI · 10.5281/zenodo.23915357', href: 'https://doi.org/10.5281/zenodo.23915357' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/aramitabh' },
    { label: 'GitHub', href: 'https://github.com/ar-amitabh' },
  ];

  const pageLinks = [
    { label: 'Home', to: '/' },
    { label: 'Work', to: '/work' },
    { label: 'Research', to: '/research' },
    { label: 'About & CV', to: '/about' },
    { label: 'Journal', to: '/blogs' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="border-t border-stone bg-[#343638] text-[#F6F4EF]">
      <div className="brand-container py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 border-b border-[#5A5D5F]/50 pb-14 lg:grid-cols-12">
          {/* Brand identity column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8FA591] font-serif text-lg text-[#F6F4EF]"
              >
                AR
              </span>
              <span className="font-serif text-3xl text-[#F6F4EF] sm:text-4xl">
                Amitabh Chondro Roy
              </span>
            </div>
            <p className="mt-4 max-w-md font-sans text-base text-[#C7C4BD]">
              Architecture, urban planning and sustainable design.
            </p>
            <p className="mt-2 max-w-lg font-sans text-sm leading-relaxed text-[#C7C4BD]/85">
              Human-centred, climate-responsive and sustainable design, informed by architecture,
              urban planning and research. Based in Bogra, Bangladesh.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="mailto:arc.mit07@gmail.com"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-[#C7C4BD]/40 px-5 py-2.5 font-sans text-sm font-medium text-[#F6F4EF] transition-colors hover:border-[#8FA591] hover:bg-[#8FA591]/15"
              >
                <Mail size={16} strokeWidth={1.5} />
                arc.mit07@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/aramitabh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-[#C7C4BD]/40 px-5 py-2.5 font-sans text-sm font-medium text-[#F6F4EF] transition-colors hover:border-[#8FA591] hover:bg-[#8FA591]/15"
              >
                <Linkedin size={16} strokeWidth={1.5} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Sitemap links */}
          <div className="lg:col-span-3">
            <p className="type-label mb-4 text-[#A3B09C]">Sitemap</p>
            <ul className="space-y-2.5">
              {pageLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-sans text-sm text-[#C7C4BD] transition-colors hover:text-[#F6F4EF]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic & research profiles */}
          <div className="lg:col-span-3">
            <p className="type-label mb-4 text-[#A3B09C]">Research &amp; Identity</p>
            <ul className="space-y-2.5">
              {academicLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-sm text-[#C7C4BD] transition-colors hover:text-[#F6F4EF]"
                  >
                    {item.label}
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#C7C4BD]">
            © {new Date().getFullYear()} Amitabh Chondro Roy · Bogra, Bangladesh
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-[#C7C4BD] transition-colors hover:text-[#F6F4EF]"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C7C4BD]/40">
              <ArrowUp size={14} strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
