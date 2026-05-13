"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { easings } from "@/lib/motion-config";

interface SplitTextProps {
  text: string;
  delay?: number;
  charStagger?: number;
  lineStagger?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  /** Trigger immediately (true) or wait for in-view */
  immediate?: boolean;
  /** Override the as-rendered element. Defaults to span. */
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

/**
 * SplitText — our free SplitText alternative.
 *
 * Splits multi-line text on "\n", then per-character, and reveals each
 * char with blur(20px → 0), y(60 → 0), opacity(0 → 1). Honors reduced-
 * motion (renders text instantly with no animation).
 *
 * Per-line overflow: hidden so characters slide up from below the
 * baseline cleanly. Whitespace-preserving via &nbsp; substitution.
 */
export function SplitText({
  text,
  delay = 0,
  charStagger = 0.03,
  lineStagger = 0.12,
  duration = 1.2,
  className,
  style,
  immediate = false,
  as = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  const shouldAnimate = (immediate || inView) && !reduced;

  const lines = text.split("\n");
  const Wrapper = motion[as] as typeof motion.span;

  return (
    <Wrapper ref={ref as never} className={className} style={style}>
      {lines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          style={{
            display: "block",
            overflow: "hidden",
            paddingBottom: "0.1em",
          }}
        >
          {[...line].map((char, charIdx) => (
            <motion.span
              key={charIdx}
              style={{
                display: "inline-block",
                willChange: "transform, filter, opacity",
              }}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={
                shouldAnimate
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : reduced
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 60, filter: "blur(20px)" }
              }
              transition={{
                duration,
                ease: easings.outExpo,
                delay:
                  delay + lineIdx * lineStagger + charIdx * charStagger,
              }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </span>
      ))}
    </Wrapper>
  );
}
