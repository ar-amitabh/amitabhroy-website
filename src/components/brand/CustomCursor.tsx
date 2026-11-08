import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isViewTarget, setIsViewTarget] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const viewTargetRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const media = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const updateMedia = () => setEnabled(media.matches);
    updateMedia();
    media.addEventListener('change', updateMedia);
    return () => media.removeEventListener('change', updateMedia);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const nextIsView = Boolean(target?.closest?.('[data-cursor="view"]'));
      if (nextIsView !== viewTargetRef.current) {
        viewTargetRef.current = nextIsView;
        setIsViewTarget(nextIsView);
      }
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
      const el = cursorRef.current;
      if (el) {
        const size = nextIsView ? 72 : 10;
        el.style.transform = `translate3d(${event.clientX - size / 2}px, ${event.clientY - size / 2}px, 0)`;
      }
    };

    const onPointerLeave = () => {
      visibleRef.current = false;
      viewTargetRef.current = false;
      setIsVisible(false);
      setIsViewTarget(false);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = isViewTarget ? 72 : 10;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate3d(-100px, -100px, 0)',
      }}
      className={`pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full bg-forest text-paper transition-[width,height,opacity] duration-200 ease-out will-change-transform ${
        !isVisible ? 'opacity-0' : isViewTarget ? 'opacity-95 shadow-subtle' : 'opacity-75'
      }`}
    >
      {isViewTarget && (
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper">
          View
        </span>
      )}
    </div>
  );
}
