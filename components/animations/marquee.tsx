"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type ReactNode, Children, useRef } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop */
  duration?: number;
  /** Direction: 1 = right→left, -1 = left→right */
  direction?: 1 | -1;
  className?: string;
}

/**
 * Marquee — infinite horizontal scroll. Pauses entirely when its
 * wrapper is scrolled out of view (perf).
 *
 * Children are duplicated once internally for a seamless loop.
 */
export function Marquee({
  children,
  duration = 40,
  direction = 1,
  className,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px" });
  const items = Children.toArray(children);

  if (reduced) {
    return (
      <div ref={ref} className={`flex gap-12 ${className ?? ""}`}>
        {items}
      </div>
    );
  }

  const animateX =
    direction === 1 ? ["0%", "-100%"] : ["-100%", "0%"];

  return (
    <div
      ref={ref}
      className={`group flex overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className="flex shrink-0 gap-12 pr-12"
        animate={inView ? { x: animateX } : { x: 0 }}
        transition={{
          duration,
          repeat: inView ? Infinity : 0,
          ease: "linear",
        }}
      >
        {items}
        {items}
      </motion.div>
      <motion.div
        aria-hidden
        className="flex shrink-0 gap-12 pr-12"
        animate={inView ? { x: animateX } : { x: 0 }}
        transition={{
          duration,
          repeat: inView ? Infinity : 0,
          ease: "linear",
        }}
      >
        {items}
        {items}
      </motion.div>
    </div>
  );
}
