"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

interface TypewriterProps {
  lines: string[];
  /** ms per character */
  speed?: number;
  /** ms pause between completed lines */
  pauseBetween?: number;
  /** Fires when every line is fully typed */
  onComplete?: () => void;
  className?: string;
}

/**
 * Typewriter — types each line character-by-character, with a
 * pause between lines, and fires onComplete when done. Completed
 * lines stay on-screen so the effect reads like a console log.
 *
 * Reduced-motion users see all lines instantly.
 */
export function Typewriter({
  lines,
  speed = 28,
  pauseBetween = 450,
  onComplete,
  className,
}: TypewriterProps) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState<string[]>([]);
  const [active, setActive] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setDone([]);
    setActive("");
    setActiveIdx(0);
  }, [lines]);

  useEffect(() => {
    if (activeIdx >= lines.length) {
      onComplete?.();
      return;
    }
    if (reduced) {
      setDone(lines);
      setActiveIdx(lines.length);
      return;
    }

    const target = lines[activeIdx];
    let i = 0;
    const tick = setInterval(() => {
      i++;
      setActive(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(tick);
        setTimeout(() => {
          setDone((prev) => [...prev, target]);
          setActive("");
          setActiveIdx((idx) => idx + 1);
        }, pauseBetween);
      }
    }, speed);

    return () => clearInterval(tick);
  }, [activeIdx, lines, speed, pauseBetween, reduced, onComplete]);

  const allDone = activeIdx >= lines.length;

  return (
    <div className={className}>
      {done.map((line, i) => (
        <p
          key={i}
          className="text-body text-[var(--color-secondary)]"
        >
          <span className="mr-2 text-[var(--color-accent)]">›</span>
          {line}
        </p>
      ))}
      {!allDone && (
        <p className="text-body text-[var(--color-primary)]">
          <span className="mr-2 text-[var(--color-accent)]">›</span>
          {active}
          <motion.span
            className="ml-0.5 inline-block w-[0.45em] align-baseline"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          >
            ▍
          </motion.span>
        </p>
      )}
    </div>
  );
}
