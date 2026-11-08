import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';

const NAME_TEXT = 'Amitabh Chondro Roy';
const TITLE_TEXT = 'ARCHITECT & URBAN PLANNING RESEARCHER';
const SUBTITLE_TEXT =
  'Human-centred, climate-responsive and sustainable design, informed by architecture, urban planning and research.';

type Stage =
  | 'waiting'
  | 'typing-name'
  | 'pause-after-name'
  | 'typing-title'
  | 'pause-after-title'
  | 'typing-subtitle'
  | 'blinking-caret'
  | 'fading-caret'
  | 'done';

/**
 * Renders every character in the DOM from the start so there is zero layout shift
 * and search engines / No-JS visitors have the complete text in the initial HTML.
 * Words are wrapped in `whitespace-nowrap` spans so line breaks are fixed from frame 0,
 * and individual character spans toggle opacity from 0 to 1.
 */
function CharacterStream({
  text,
  revealedCount,
  showCaret,
  caretPhase,
}: {
  text: string;
  revealedCount: number;
  showCaret: boolean;
  caretPhase: 'solid' | 'blinking' | 'fading' | 'hidden';
}) {
  const tokens = text.split(/(\s+)/);
  let globalIndex = 0;

  const caretElement = (
    <span
      aria-hidden="true"
      className={`tw-caret inline-block w-[2px] h-[0.88em] bg-[#A3B09C] align-baseline ml-[2px] -mb-[0.08em] transition-opacity duration-300 ${
        caretPhase === 'blinking'
          ? 'animate-[caretBlink_420ms_steps(2,start)_infinite]'
          : caretPhase === 'fading'
            ? 'opacity-0'
            : 'opacity-100'
      }`}
    />
  );

  return (
    <span aria-hidden="true" className="relative inline">
      {showCaret && revealedCount === 0 && caretElement}
      {tokens.map((token, tokenIdx) => {
        const isSpace = /^\s+$/.test(token);
        const chars = Array.from(token);

        return (
          <span
            key={tokenIdx}
            className={isSpace ? 'inline' : 'inline-block whitespace-nowrap'}
          >
            {chars.map((char, charIdx) => {
              const idx = globalIndex++;
              const isRevealed = idx < revealedCount;
              const isCaretHere = showCaret && revealedCount === idx + 1;

              return (
                <span key={charIdx} className="inline">
                  <span
                    className={`tw-char inline transition-opacity duration-75 ${
                      isRevealed ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                  {isCaretHere && caretElement}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export default function HeroVideoSection() {
  const reduceMotion = useReducedMotion();
  const [imageSettled, setImageSettled] = useState(Boolean(reduceMotion));

  const [nameCount, setNameCount] = useState(reduceMotion ? NAME_TEXT.length : 0);
  const [titleCount, setTitleCount] = useState(reduceMotion ? TITLE_TEXT.length : 0);
  const [subtitleCount, setSubtitleCount] = useState(reduceMotion ? SUBTITLE_TEXT.length : 0);
  const [stage, setStage] = useState<Stage>(reduceMotion ? 'done' : 'waiting');
  const [showButtons, setShowButtons] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (reduceMotion) {
      setImageSettled(true);
      setNameCount(NAME_TEXT.length);
      setTitleCount(TITLE_TEXT.length);
      setSubtitleCount(SUBTITLE_TEXT.length);
      setStage('done');
      setShowButtons(true);
      return;
    }

    const settleId = window.requestAnimationFrame(() => {
      setImageSettled(true);
    });

    const timers: number[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    // 0.5s: caret appears, name types at 55ms/char
    schedule(() => {
      setStage('typing-name');
      let n = 0;

      const typeNextName = () => {
        n += 1;
        setNameCount(n);
        if (n < NAME_TEXT.length) {
          schedule(typeNextName, 32);
        } else {
          // 250ms pause after name
          setStage('pause-after-name');
          schedule(() => {
            setStage('typing-title');
            let t = 0;

            const typeNextTitle = () => {
              t += 1;
              setTitleCount(t);
              if (t < TITLE_TEXT.length) {
                schedule(typeNextTitle, 14);
              } else {
                // 250ms pause after title
                setStage('pause-after-title');
                schedule(() => {
                  setStage('typing-subtitle');
                  let s = 0;

                  const typeNextSubtitle = () => {
                    s += 1;
                    setSubtitleCount(s);
                    if (s < SUBTITLE_TEXT.length) {
                      schedule(typeNextSubtitle, 5);
                    } else {
                      // Caret blinks 3 times (~1260ms) then fades out
                      setStage('blinking-caret');
                      schedule(() => {
                        setStage('fading-caret');
                        schedule(() => {
                          setStage('done');
                          setShowButtons(true);
                        }, 300);
                      }, 600);
                    }
                  };

                  typeNextSubtitle();
                }, 120);
              }
            };

            typeNextTitle();
          }, 120);
        }
      };

      typeNextName();
    }, 150);

    return () => {
      window.cancelAnimationFrame(settleId);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [reduceMotion]);

  const isCaretOnName = stage === 'typing-name' || stage === 'pause-after-name';
  const isCaretOnTitle = stage === 'typing-title' || stage === 'pause-after-title';
  const isCaretOnSubtitle =
    stage === 'typing-subtitle' || stage === 'blinking-caret' || stage === 'fading-caret';

  const caretPhase =
    stage === 'blinking-caret'
      ? 'blinking'
      : stage === 'fading-caret'
        ? 'fading'
        : stage === 'done'
          ? 'hidden'
          : 'solid';

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#1E2021] select-none sm:select-auto"
    >
      <style>{`
        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tw-char, .tw-reveal {
            opacity: 1 !important;
            transform: none !important;
          }
          .tw-caret {
            display: none !important;
          }
        }
      `}</style>

      {/* Full-Screen Architectural Hero Image (WebP with JPG fallback, fetchpriority="high") */}
      <picture className="pointer-events-none absolute inset-0 h-full w-full">
        <source srcSet="/hero-courtyard-poster.webp" type="image/webp" />
        <img
          src="/hero-courtyard-poster.jpg"
          alt="Human-Centered Work Environment at Rangpur Hi-Tech Park — shaded central courtyard, water plaza and planted terraces"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="sync"
          className={`h-full w-full object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            imageSettled ? 'scale-100' : 'scale-[1.04]'
          }`}
        />
      </picture>

      {/* Legibility Gradients (WCAG >= 4.5:1 while keeping building & people clear) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'linear-gradient(to top, rgba(30, 32, 33, 0.68) 0%, rgba(30, 32, 33, 0.38) 30%, rgba(30, 32, 33, 0) 55%)',
            'linear-gradient(to right, rgba(30, 32, 33, 0.42) 0%, rgba(30, 32, 33, 0.14) 45%, rgba(30, 32, 33, 0) 70%)',
            'linear-gradient(to bottom, rgba(30, 32, 33, 0.35) 0%, rgba(30, 32, 33, 0) 16%)',
          ].join(', '),
        }}
      />

      {/* Bottom-left placement on 12-column grid: 20px side margin mobile, 64px desktop, 96px above bottom */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-24 pt-28 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-10">
            {/* 1. Name in Instrument Serif, clamp(3.5rem, 9vw, 9rem), Paper #F6F4EF */}
            <h1
              aria-label={NAME_TEXT}
              className="font-serif font-normal tracking-[-0.02em] text-[#F6F4EF] leading-[0.98]"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
            >
              <CharacterStream
                text={NAME_TEXT}
                revealedCount={nameCount}
                showCaret={isCaretOnName}
                caretPhase={caretPhase}
              />
            </h1>

            {/* 2. Title in DM Mono, uppercase, 0.08em letter spacing, 14px, Paper #F6F4EF */}
            <p
              aria-label={TITLE_TEXT}
              className="mt-4 font-mono text-[14px] uppercase tracking-[0.08em] text-[#F6F4EF]"
            >
              <CharacterStream
                text={TITLE_TEXT}
                revealedCount={titleCount}
                showCaret={isCaretOnTitle}
                caretPhase={caretPhase}
              />
            </p>

            {/* 3. Subtitle in Manrope 400, 18-20px, max-width 560px, Paper #F6F4EF */}
            <p
              aria-label={SUBTITLE_TEXT}
              className="mt-3 max-w-[560px] font-sans font-normal leading-[1.6] text-[#F6F4EF]"
              style={{ fontSize: 'clamp(1.125rem, 1.35vw, 1.25rem)' }}
            >
              <CharacterStream
                text={SUBTITLE_TEXT}
                revealedCount={subtitleCount}
                showCaret={isCaretOnSubtitle}
                caretPhase={caretPhase}
              />
            </p>

            {/* 4. Buttons ("View work" primary & "Download CV" secondary) fade up (350ms) after caret fades */}
            <div
              className={`tw-reveal mt-7 flex flex-wrap items-center gap-4 transition-[opacity,transform] duration-[350ms] ease-out ${
                showButtons
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-3 opacity-0'
              }`}
            >
              <Link
                to="/work"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-pill bg-[#627363] px-7 py-3 font-sans text-[15px] font-medium text-[#F6F4EF] transition-colors hover:bg-[#4F5E50]"
              >
                View work
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <a
                href="/cv/Amitabh_Chondro_Roy_Academic_CV.pdf"
                download="Amitabh_Chondro_Roy_Academic_CV.pdf"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-pill border border-[#F6F4EF]/55 bg-[#1E2021]/35 px-7 py-3 font-sans text-[15px] font-medium text-[#F6F4EF] backdrop-blur-sm transition-colors hover:border-[#F6F4EF] hover:bg-[#F6F4EF]/15"
              >
                <Download size={16} strokeWidth={1.75} aria-hidden="true" />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Small scroll cue at bottom */}
        <a
          href="#selected-work"
          aria-label="Scroll to selected work"
          className={`tw-reveal absolute bottom-7 left-5 lg:left-16 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#F6F4EF]/80 transition-[opacity,transform,color] duration-[350ms] ease-out hover:text-[#F6F4EF] ${
            showButtons ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
          }`}
        >
          <span>Scroll</span>
          <ArrowDown size={13} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
