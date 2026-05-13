"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";

/**
 * CustomCursor — desktop-only. Tracks the mouse with two
 * primitives:
 *
 *   - An 8 px white dot that follows the cursor with stiff spring
 *     (near-instant) for accurate pointing.
 *   - A 36 px ring that lags behind with a softer spring for the
 *     liquid lag effect.
 *
 * Hover targets:
 *   - [data-cursor="link"] / a / button → dot scales 4x, ring fades
 *   - [data-cursor="drag"] → both turn into a "drag" label hint
 *
 * Touch + low-spec + reduced-motion users: cursor is not rendered
 * at all, and the html element keeps native cursors.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState<"link" | "drag" | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 1200, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 50, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.45 });

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
    );
    function update() {
      const ok = mq.matches;
      setEnabled(ok);
      document.documentElement.classList.toggle("cursor-ready", ok);
    }
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      // Find hover target — walk up looking for data-cursor or
      // an interactive element. Cheap, runs on each pointer move
      // but uses native closest() lookups.
      const target = e.target as Element | null;
      if (!target) {
        setHovered(null);
        return;
      }
      const dragTarget = target.closest('[data-cursor="drag"]');
      if (dragTarget) {
        setHovered("drag");
        return;
      }
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="link"], input, textarea, select'
      );
      setHovered(interactive ? "link" : null);
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[1000] -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovered === "drag" ? 80 : 36,
          height: 36,
          opacity: hovered === "link" ? 0 : 1,
          borderRadius: 999,
        }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          className="size-full rounded-full border border-[var(--color-primary)]"
          animate={{ opacity: hovered === "link" ? 0 : 0.7 }}
          transition={{ duration: 0.2 }}
        />
        {hovered === "drag" && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-primary)]">
            ← drag →
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[1001] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]"
        style={{ x: dotX, y: dotY }}
        animate={{
          width: hovered === "link" ? 32 : 6,
          height: hovered === "link" ? 32 : 6,
          opacity: hovered === "link" ? 0.85 : 1,
          mixBlendMode: hovered === "link" ? "difference" : "normal",
        }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      />
    </>
  );
}
