import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ar_theme');
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('ar_theme', next);
    } catch {
      // Ignore storage errors
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Research', href: '/research' },
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) =>
    location.pathname === href || (href === '/blogs' && location.pathname.startsWith('/blogs/'));

  const isHeroTransparent = location.pathname === '/' && !isScrolled && !isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color,color,box-shadow] duration-300 ${
          isHeroTransparent
            ? 'border-transparent bg-transparent text-[#F6F4EF]'
            : 'border-stone bg-paper/95 backdrop-blur-md text-graphite shadow-sm'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-5 lg:px-16">
          <div className="flex h-20 items-center justify-between">
            {/* Section 5: Wordmark + Monogram */}
            <Link
              to="/"
              className={`group inline-flex items-center gap-3 transition-colors ${
                isHeroTransparent ? 'text-[#F6F4EF]' : 'text-graphite'
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 items-center justify-center rounded-full border font-serif text-sm transition-colors ${
                  isHeroTransparent
                    ? 'border-[#A3B09C] text-[#F6F4EF] group-hover:bg-[#627363] group-hover:text-[#F6F4EF]'
                    : 'border-forest text-graphite group-hover:bg-forest group-hover:text-paper'
                }`}
              >
                AR
              </span>
              <span
                className={`font-serif text-[20px] tracking-normal lg:text-[24px] ${
                  isHeroTransparent ? 'text-[#F6F4EF]' : 'text-graphite'
                }`}
              >
                Amitabh Chondro Roy
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <nav aria-label="Main navigation" className="flex items-center gap-7">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`relative py-1 font-sans text-[15px] font-medium transition-colors ${
                        isHeroTransparent
                          ? active
                            ? 'border-b border-[#A3B09C] text-[#F6F4EF]'
                            : 'text-[#F6F4EF]/85 hover:text-[#F6F4EF]'
                          : active
                            ? 'border-b border-forest text-graphite'
                            : 'text-graphite-soft hover:text-graphite'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to Night theme' : 'Switch to Paper theme'}
                title={theme === 'light' ? 'Switch to Night theme' : 'Switch to Paper theme'}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                  isHeroTransparent
                    ? 'border-[#F6F4EF]/35 bg-[#1E2021]/35 text-[#F6F4EF] backdrop-blur-sm hover:border-[#F6F4EF]'
                    : 'border-stone bg-paper-raised text-graphite hover:border-graphite'
                }`}
              >
                {theme === 'light' ? (
                  <Moon size={17} strokeWidth={1.5} />
                ) : (
                  <Sun size={17} strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to Night theme' : 'Switch to Paper theme'}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${
                  isHeroTransparent
                    ? 'border-[#F6F4EF]/35 bg-[#1E2021]/35 text-[#F6F4EF] backdrop-blur-sm'
                    : 'border-stone bg-paper-raised text-graphite'
                }`}
              >
                {theme === 'light' ? (
                  <Moon size={17} strokeWidth={1.5} />
                ) : (
                  <Sun size={17} strokeWidth={1.5} />
                )}
              </button>
              <button
                type="button"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${
                  isHeroTransparent
                    ? 'border-[#F6F4EF]/35 bg-[#1E2021]/35 text-[#F6F4EF] backdrop-blur-sm'
                    : 'border-stone bg-paper-raised text-graphite'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Section 9 & 10.3 #7: Full-screen mobile overlay menu with clip-path reveal and 60ms link stagger */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-6 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col space-y-4">
              {navLinks.map((link, index) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`inline-block font-serif text-4xl leading-tight ${
                        active ? 'border-b border-forest text-graphite' : 'text-graphite-soft hover:text-graphite'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="border-t border-stone pt-6">
              <p className="type-label text-graphite-soft">Architecture, urban planning and sustainable design.</p>
              <a
                href="mailto:arc.mit07@gmail.com"
                className="mt-2 inline-block font-sans text-sm font-medium text-forest-deep"
              >
                arc.mit07@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
