"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "motion/react";
import { useEffect, useRef } from "react";
import { easings } from "@/lib/motion-config";

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
 * Counter — animates a number from 0 to `to` when it scrolls into view.
 * Uses motion's animate() driver with our outExpo easing. Reduced-
 * motion users see the final value instantly.
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
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const formatted = useTransform(count, (v) =>
    v.toFixed(decimals)
  );

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, {
      duration,
      ease: easings.outExpo,
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{formatted}</motion.span>
      {suffix}
    </span>
  );
}
