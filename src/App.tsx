import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from './components/portfolio/Header';
import Footer from './components/portfolio/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const AdminStudioPage = lazy(() => import('./pages/AdminStudioPage'));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = decodeURIComponent(hash.slice(1));
      // Lazy routes mount after the first frame, so keep looking for the target
      // instead of scrolling once into an empty page.
      let frame = 0;
      let raf = 0;
      const scrollToSection = () => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        if (frame++ < 90) raf = requestAnimationFrame(scrollToSection);
      };
      raf = requestAnimationFrame(scrollToSection);
      return () => cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  return null;
}

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#040816] text-[#F9FAFB]">
      {!isAdminRoute && <Header />}
      <main id="main-content">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#22C55E] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#040816]"
        >
          Skip to content
        </a>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#22C55E]"></div>
          </div>
        }>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/research" element={<ResearchPage />} />
              {/* Retired standalone pages: keep old links working. */}
              <Route path="/photography" element={<Navigate to="/work#photography" replace />} />
              <Route path="/cv" element={<Navigate to="/about#cv" replace />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:slug" element={<BlogArticlePage />} />
              <Route path="/admin" element={<AdminStudioPage />} />
              <Route path="/admin/*" element={<AdminStudioPage />} />
            </Routes>
          </motion.div>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}

export default App;
