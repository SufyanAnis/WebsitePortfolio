"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface CounterProps {
  to: number;
  duration?: number;
  /** Decimal places for the rendered number */
  decimals?: number;
  className?: string;
  /** Prefix string (e.g. "$") */
  prefix?: string;
  /** Suffix string (e.g. "+" or "h") */
  suffix?: string;
}

/**
 * Counter — counts from 0 → `to` when the element enters the
 * viewport, then stays at the final value.
 *
 * Resilience matters here more than animation purity: the QA
 * report flagged this widget as the most damaging bug on the
 * page (stats rendered as 0 in production). Two safety nets
 * are now in place:
 *
 *   1. A 1.5 s setTimeout fallback — even if `useInView` never
 *      fires for any reason (margin miscalculation, browser
 *      bug, layout shift), the final value is committed.
 *   2. The render path is plain React state, not a motion-value
 *      subscription — eliminates the framework-specific failure
 *      mode where motion.span doesn't re-render on value
 *      changes in some builds.
 */
export function Counter({
  to,
  duration = 1.6,
  decimals = 0,
  className,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reduced motion: jump to final value, no animation.
    if (reduced) {
      setValue(to);
      return;
    }

    // Safety fallback: commit the final value after 1.5 s
    // regardless of viewport status. If the animation runs first,
    // we clear this in the cleanup.
    const safety = window.setTimeout(() => setValue(to), 1500);

    if (!inView) {
      return () => window.clearTimeout(safety);
    }
    window.clearTimeout(safety);

    // outExpo ease, hand-rolled to avoid relying on the motion
    // value subscription path.
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(eased * to);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
    };
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
