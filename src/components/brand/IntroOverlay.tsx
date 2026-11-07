import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const SESSION_KEY = 'ar_intro_seen_v1';

export default function IntroOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') return;
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(true);
      const timer = window.setTimeout(() => setVisible(false), 1650);
      return () => window.clearTimeout(timer);
    } catch {
      // Ignore storage access errors
    }
  }, [prefersReducedMotion]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="brand-intro"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.65, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-paper text-graphite"
          aria-label="Introductory animation"
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              className="overflow-visible"
              aria-hidden="true"
            >
              <motion.circle
                cx="36"
                cy="36"
                r="33"
                fill="none"
                stroke="var(--forest)"
                strokeWidth="1.25"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.text
                x="36"
                y="45"
                textAnchor="middle"
                fill="var(--graphite)"
                className="font-serif text-[28px]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                AR
              </motion.text>
            </svg>

            <div className="overflow-hidden py-1">
              <motion.p
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl tracking-[-0.015em] text-graphite sm:text-4xl"
              >
                Amitabh Chondro Roy
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="type-label text-graphite-soft"
              >
                Architecture · Urban Planning · Sustainable Design
              </motion.p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="type-label absolute bottom-8 right-8 rounded-pill border border-stone px-4 py-2 text-graphite-soft transition-colors hover:border-graphite hover:text-graphite"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
