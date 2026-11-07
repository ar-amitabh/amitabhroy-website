import { useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  beforeLabel: string;
  beforeAlt: string;
  afterImage: string;
  afterLabel: string;
  afterAlt: string;
  caption?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  beforeLabel,
  beforeAlt,
  afterImage,
  afterLabel,
  afterAlt,
  caption,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(95, Math.max(5, Math.round(raw))));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(5, p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(95, p + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(10);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(90);
    }
  };

  return (
    <figure className="my-12">
      <div
        ref={containerRef}
        onPointerDown={(e) => {
          draggingRef.current = true;
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current) return;
          updateFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerLeave={() => {
          draggingRef.current = false;
        }}
        className="render-image-wrap relative aspect-[16/9] w-full select-none overflow-hidden border border-stone bg-paper-raised"
      >
        {/* After (Full width base layer) */}
        <img
          src={afterImage}
          alt={afterAlt}
          width={1536}
          height={864}
          loading="lazy"
          className="h-full w-full object-cover"
          draggable={false}
        />

        {/* Before (Clipped overlay layer) */}
        <div
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          className="absolute inset-0 overflow-hidden"
        >
          <img
            src={beforeImage}
            alt={beforeAlt}
            width={1536}
            height={864}
            loading="lazy"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="type-label pointer-events-none absolute left-4 top-4 rounded-pill border border-stone bg-paper/90 px-3 py-1 text-graphite">
          {beforeLabel}
        </span>
        <span className="type-label pointer-events-none absolute right-4 top-4 rounded-pill border border-stone bg-paper/90 px-3 py-1 text-graphite">
          {afterLabel}
        </span>

        {/* Divider line + Keyboard-accessible handle */}
        <div
          style={{ left: `${position}%` }}
          className=" absolute inset-y-0 w-px -translate-x-1/2 bg-paper"
        >
          <button
            type="button"
            role="slider"
            aria-label="Compare spatial masterplan and courtyard experience"
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={position}
            onKeyDown={handleKeyDown}
            className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-stone bg-paper text-graphite shadow-subtle transition-transform hover:scale-105"
          >
            <MoveHorizontal size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {caption && (
        <figcaption className="type-label mt-3 flex flex-wrap items-center justify-between gap-2 text-graphite-soft">
          <span>{caption}</span>
          <span>Drag or use ← → arrow keys to compare</span>
        </figcaption>
      )}
    </figure>
  );
}
