import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Pause, Play } from 'lucide-react';

const TITLE_TEXT = 'ARCHITECT & URBAN PLANNING RESEARCHER';
const NAME_TEXT = 'Amitabh Chondro Roy';
const SUBTITLE_TEXT =
  'Human-centred, climate-responsive and sustainable design — informed by architecture, urban planning and research.';

function renderTypedSlice(text: string, count: number, showCursor: boolean, cursorClassName: string) {
  const typed = text.slice(0, count);
  const untyped = text.slice(count);

  return (
    <>
      <span aria-hidden="true">
        <span>{typed}</span>
        {showCursor && (
          <span
            className={`inline-block w-[2px] h-[0.9em] align-middle ml-0.5 animate-pulse ${cursorClassName}`}
          />
        )}
        <span className="opacity-0 select-none">{untyped}</span>
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

export default function HeroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  const [titleCount, setTitleCount] = useState(reduceMotion ? TITLE_TEXT.length : 0);
  const [nameCount, setNameCount] = useState(reduceMotion ? NAME_TEXT.length : 0);
  const [subtitleCount, setSubtitleCount] = useState(reduceMotion ? SUBTITLE_TEXT.length : 0);
  const [activeStage, setActiveStage] = useState<'title' | 'name' | 'subtitle' | 'done'>(
    reduceMotion ? 'done' : 'title'
  );

  useEffect(() => {
    if (reduceMotion) {
      setTitleCount(TITLE_TEXT.length);
      setNameCount(NAME_TEXT.length);
      setSubtitleCount(SUBTITLE_TEXT.length);
      setActiveStage('done');
      return;
    }

    let timeoutId: number;
    let cancelled = false;

    const startDelay = window.setTimeout(() => {
      let tIdx = 0;
      let nIdx = 0;
      let sIdx = 0;

      const stepTitle = () => {
        if (cancelled) return;
        tIdx += 1;
        setTitleCount(tIdx);
        if (tIdx < TITLE_TEXT.length) {
          timeoutId = window.setTimeout(stepTitle, 24);
        } else {
          setActiveStage('name');
          timeoutId = window.setTimeout(stepName, 140);
        }
      };

      const stepName = () => {
        if (cancelled) return;
        nIdx += 1;
        setNameCount(nIdx);
        if (nIdx < NAME_TEXT.length) {
          timeoutId = window.setTimeout(stepName, 48);
        } else {
          setActiveStage('subtitle');
          timeoutId = window.setTimeout(stepSubtitle, 180);
        }
      };

      const stepSubtitle = () => {
        if (cancelled) return;
        sIdx += 2; // Type 2 characters per tick so the full subtitle completes smoothly in ~1.2s
        setSubtitleCount(Math.min(sIdx, SUBTITLE_TEXT.length));
        if (sIdx < SUBTITLE_TEXT.length) {
          timeoutId = window.setTimeout(stepSubtitle, 22);
        } else {
          setActiveStage('done');
        }
      };

      stepTitle();
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(startDelay);
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <section id="home" className="relative pt-20">
      {/* Full-bleed architectural video hero container */}
      <div className="relative min-h-[84vh] lg:min-h-[88vh] w-full overflow-hidden border-b border-stone bg-[#1E2021] flex flex-col justify-between">
        {/* Background Color-Corrected Video */}
        <video
          ref={videoRef}
          src="/hero-courtyard.mp4"
          poster="/hero-courtyard-poster.jpg"
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center scale-[1.01]"
        />

        {/* Warm Editorial Scrim Overlays for WCAG AA/AAA Text Legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1A1C1D]/85 via-[#1A1C1D]/55 to-[#1A1C1D]/25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1C1D]/90 via-[#1A1C1D]/25 to-[#1A1C1D]/40"
        />

        {/* Top subtle location & coordinate bar */}
        <div className="relative z-10 brand-container w-full pt-8 sm:pt-10 flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-pill border border-[#F6F4EF]/20 bg-[#1E2021]/55 backdrop-blur-sm px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#F6F4EF]/90">
            <span className="h-2 w-2 rounded-full bg-[#A3B09C]" aria-hidden="true" />
            Bangladesh · Architecture, Urban Planning &amp; Research
          </span>
          <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-[#F6F4EF]/75">
            25.7439° N, 89.2752° E · Rangpur Hi-Tech Park Study
          </span>
        </div>

        {/* Center / Lower-Left Hero Typography with Sequential Typewriter Effect */}
        <div className="relative z-10 brand-container w-full my-auto py-12 lg:py-16">
          <div className="max-w-4xl">
            {/* 1. Title / Role with Typewriter */}
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-[#DCC7BC] mb-4">
              {renderTypedSlice(
                TITLE_TEXT,
                titleCount,
                activeStage === 'title',
                'bg-[#DCC7BC]'
              )}
            </p>

            {/* 2. Name in Display XL Instrument Serif with Typewriter */}
            <h1 className="type-display-xl text-[#F6F4EF] drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
              {renderTypedSlice(
                NAME_TEXT,
                nameCount,
                activeStage === 'name',
                'bg-[#D39A84]'
              )}
            </h1>

            {/* 3. Subtitle with Typewriter */}
            <p className="mt-6 max-w-2xl font-sans text-lg sm:text-xl lg:text-[22px] leading-[1.6] text-[#F6F4EF]/90 font-normal">
              {renderTypedSlice(
                SUBTITLE_TEXT,
                subtitleCount,
                activeStage === 'subtitle' || activeStage === 'done',
                'bg-[#A3B09C]'
              )}
            </p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/work"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-pill bg-[#627363] px-7 py-3.5 font-sans text-[15px] font-medium text-[#F6F4EF] transition-all hover:bg-[#4F5E50]"
              >
                Explore Selected Work
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
              <a
                href="/cv/Amitabh_Chondro_Roy_Academic_CV.pdf"
                download="Amitabh_Chondro_Roy_Academic_CV.pdf"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-pill border border-[#F6F4EF]/40 bg-[#1E2021]/50 backdrop-blur-sm px-7 py-3.5 font-sans text-[15px] font-medium text-[#F6F4EF] transition-all hover:border-[#F6F4EF] hover:bg-[#F6F4EF]/15"
              >
                <Download size={16} strokeWidth={1.75} />
                Download CV
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Caption Bar + Video Pause/Play Control + Scroll Cue */}
        <div className="relative z-10 border-t border-[#F6F4EF]/15 bg-[#1A1C1D]/70 backdrop-blur-md">
          <div className="brand-container py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#F6F4EF]/80">
              <span className="text-[#DCC7BC]">01 / Featured Film</span>
              <span aria-hidden="true">·</span>
              <span>Human-Centered Work Environment, Rangpur Hi-Tech Park</span>
              <span aria-hidden="true" className="hidden md:inline">·</span>
              <span className="hidden md:inline text-[#F6F4EF]/65">Shaded Biophilic Courtyard &amp; Water Plaza</span>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <button
                type="button"
                onClick={toggleVideo}
                aria-label={isPaused ? 'Play background video' : 'Pause background video'}
                className="inline-flex items-center gap-1.5 rounded-pill border border-[#F6F4EF]/25 bg-[#1E2021]/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#F6F4EF]/85 transition-colors hover:border-[#F6F4EF]/60 hover:text-[#F6F4EF]"
              >
                {isPaused ? (
                  <>
                    <Play size={11} aria-hidden="true" />
                    Play Film
                  </>
                ) : (
                  <>
                    <Pause size={11} aria-hidden="true" />
                    Pause Film
                  </>
                )}
              </button>

              <a
                href="#selected-work"
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#F6F4EF]/80 transition-colors hover:text-[#F6F4EF]"
              >
                Scroll
                <ArrowDown size={13} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
