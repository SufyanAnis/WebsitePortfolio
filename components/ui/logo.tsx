"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Logo — "Swift ⌁ Labs" wordmark where the ⌁ is a custom lightning
 * bolt SVG. On hover, the bolt rotates 45° and gains an accent glow.
 */
export function Logo({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <a href="#hero" className={`group inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="text-heading tracking-tight">Swift</span>
      <motion.svg
        viewBox="0 0 24 32"
        className="h-5 w-auto text-[var(--color-accent)]"
        initial={{ rotate: 0, filter: "drop-shadow(0 0 0 transparent)" }}
        whileHover={
          reduced
            ? undefined
            : {
                rotate: 45,
                filter:
                  "drop-shadow(0 0 8px rgba(26,107,255,0.65)) drop-shadow(0 0 16px rgba(26,107,255,0.4))",
              }
        }
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        aria-hidden="true"
      >
        <path
          d="M14 0 L2 18 L10 18 L10 32 L22 14 L14 14 Z"
          fill="currentColor"
        />
      </motion.svg>
      <span className="text-heading tracking-tight">Labs</span>
    </a>
  );
}
