"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  /** Maximum displacement in px at the edge of the trigger box */
  strength?: number;
  /** Distance multiplier — larger zones grab the cursor from further away */
  range?: number;
  className?: string;
}

/**
 * Magnetic — wraps a child so it tracks the cursor with spring physics.
 *
 * The displacement is proportional to cursor distance from the element
 * center, scaled by `strength`. Spring snap-back on leave. Reduced-
 * motion users get no displacement (children render statically).
 */
export function Magnetic({
  children,
  strength = 8,
  range = 1,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(dx * strength * range);
    y.set(dy * strength * range);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
