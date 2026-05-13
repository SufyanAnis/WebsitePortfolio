"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";
import { easings } from "@/lib/motion-config";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  /** Stagger children */
  stagger?: number;
}

/**
 * ScrollReveal — fade + y-translate on entering viewport.
 * Use for non-text section reveals (cards, stats, images).
 */
export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 24,
  className,
  stagger,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : duration,
        ease: easings.outExpo,
        delay: reduced ? 0 : delay,
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/**
 * Companion child variant — apply via `variants={revealChild}` on
 * direct children of a staggered ScrollReveal container.
 */
export const revealChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.outExpo },
  },
};
