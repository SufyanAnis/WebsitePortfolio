import type { Transition, Variants } from "motion/react";

/**
 * Easing tokens shared with globals.css.
 * Framer Motion accepts cubic-bezier arrays directly.
 */
export const easings = {
  outExpo: [0.23, 1, 0.32, 1] as const,
  inOutExpo: [0.85, 0, 0.15, 1] as const,
  drawer: [0.32, 0.72, 0, 1] as const,
};

/**
 * Standard durations (seconds).
 */
export const durations = {
  feedback: 0.2,
  reveal: 0.8,
  cinematic: 1.4,
} as const;

/**
 * Default transition for section reveals.
 */
export const revealTransition: Transition = {
  duration: durations.reveal,
  ease: easings.outExpo,
};

/**
 * Default spring used for magnetic hovers + cursor lag.
 */
export const magneticSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.5,
};

/**
 * Fade-in-up — primary section reveal pattern.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};

/**
 * Stagger container — children appear in sequence.
 */
export const staggerContainer = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

/**
 * Character-level reveal — our free SplitText alternative.
 * Used by <SplitText /> in /components/animations.
 */
export const charReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(20px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: easings.outExpo,
    },
  },
};
