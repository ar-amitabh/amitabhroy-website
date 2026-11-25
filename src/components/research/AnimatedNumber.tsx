import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up once, the first time the number scrolls into view. Falls back to
 * the final value immediately when the visitor prefers reduced motion.
 */
export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1100,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || reduceMotion || hasAnimated.current) return;
    hasAnimated.current = true;

    let frame = 0;
    const startValue = value * 0.75;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(startValue + (value - startValue) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
