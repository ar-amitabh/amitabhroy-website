import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isViewTarget, setIsViewTarget] = useState(false);

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
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      const viewEl = target?.closest?.('[data-cursor="view"]');
      setIsViewTarget(Boolean(viewEl));
    };

    const onPointerLeave = () => {
      setPosition({ x: -100, y: -100 });
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
      aria-hidden="true"
      style={{
        transform: `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0)`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={`pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full bg-forest text-paper transition-[width,height,opacity] duration-200 ease-out ${
        position.x < 0 ? 'opacity-0' : isViewTarget ? 'opacity-95 shadow-subtle' : 'opacity-75'
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
