"use client";

import { motion } from "motion/react";
import type { ServiceIconKey } from "@/lib/site-config";

/**
 * Service icons, one per discipline. All share the same 32×32
 * viewBox and 1.4 stroke aesthetic so they read as a set.
 *
 * Each accepts an `active` prop. When false (section off-screen),
 * the animations halt and the icon falls to a static rest pose
 * to free the main thread.
 */

const ICON_PROPS = {
  width: 28,
  height: 28,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

interface IconProps {
  active: boolean;
}

/** Product Engineering: browser frame overlapping a phone outline. */
function Product({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      {/* Browser */}
      <rect x="2" y="6" width="22" height="16" rx="2" />
      <line x1="2" y1="10" x2="24" y2="10" strokeOpacity={0.5} />
      <circle cx="4.5" cy="8" r="0.6" fill="currentColor" />
      <circle cx="6.5" cy="8" r="0.6" fill="currentColor" />
      <motion.path
        d="M 6 16 L 11 13 L 11 19 L 18 16"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }}
        transition={{
          duration: 3,
          repeat: active ? Infinity : 0,
          times: [0, 0.4, 0.7, 1],
          ease: "easeInOut",
        }}
      />
      {/* Phone, overlapping bottom-right */}
      <rect x="22" y="13" width="8" height="16" rx="1.5" />
      <line x1="24" y1="15" x2="28" y2="15" strokeOpacity={0.4} />
      <motion.g
        animate={active ? { y: [0, -2, 0] } : { y: 0 }}
        transition={{
          duration: 2.4,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <line x1="23.5" y1="18" x2="28.5" y2="18" strokeOpacity={0.5} />
        <line x1="23.5" y1="20.5" x2="27" y2="20.5" strokeOpacity={0.5} />
        <line x1="23.5" y1="23" x2="28.5" y2="23" strokeOpacity={0.5} />
      </motion.g>
    </motion.svg>
  );
}

/** Design: pen tool drawing a curve. */
function Design({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      <motion.path
        d="M 5 24 C 9 12, 14 6, 22 9 L 27 7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2.4,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      <circle cx="5" cy="24" r="1.4" />
      <path d="M 23 5 L 28 10 L 25 13 L 20 8 Z" />
    </motion.svg>
  );
}

/** AI Integration: 3-layer neural net, nodes pulse asynchronously. */
function Ai({ active }: IconProps) {
  const nodes: [number, number][] = [
    [5, 8],
    [5, 16],
    [5, 24],
    [16, 11],
    [16, 21],
    [27, 8],
    [27, 16],
    [27, 24],
  ];
  return (
    <motion.svg {...ICON_PROPS}>
      {nodes.slice(0, 3).flatMap(([x1, y1], i) =>
        nodes.slice(3, 5).map(([x2, y2], j) => (
          <line
            key={`l1-${i}-${j}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeOpacity="0.3"
          />
        ))
      )}
      {nodes.slice(3, 5).flatMap(([x1, y1], i) =>
        nodes.slice(5).map(([x2, y2], j) => (
          <line
            key={`l2-${i}-${j}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeOpacity="0.3"
          />
        ))
      )}
      {nodes.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="1.6"
          fill="currentColor"
          animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.7 }}
          transition={{
            duration: 2,
            repeat: active ? Infinity : 0,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
  );
}

/** Enterprise Systems: stacked data planes plus a routing arc. */
function Enterprise({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      {[5, 13, 21].map((y, i) => (
        <g key={y}>
          <rect x="4" y={y} width="22" height="5" rx="1" />
          <motion.circle
            cx="7"
            cy={y + 2.5}
            r="0.9"
            fill="currentColor"
            animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.7 }}
            transition={{
              duration: 1.8,
              delay: i * 0.25,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <line
            x1="10"
            y1={y + 2.5}
            x2="22"
            y2={y + 2.5}
            strokeOpacity={0.35}
          />
        </g>
      ))}
      <motion.path
        d="M 28 7.5 C 30 13, 30 18, 28 23.5"
        strokeOpacity={0.5}
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: [0, 1, 0] } : { pathLength: 1 }}
        transition={{
          duration: 3,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

/** Platform & Growth: pipeline with an upward growth arrow. */
function Platform({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      <circle cx="16" cy="16" r="11" strokeOpacity={0.45} />
      <path d="M 16 5 L 19 7.5 L 16 10" />
      <path d="M 16 27 L 13 24.5 L 16 22" />
      <motion.g
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 5,
          repeat: active ? Infinity : 0,
          ease: "linear",
        }}
        style={{ transformOrigin: "16px 16px" }}
      >
        <circle cx="16" cy="5" r="1.8" fill="currentColor" />
      </motion.g>
      <motion.path
        d="M 9 19 L 13 16 L 16 18 L 23 12"
        strokeOpacity={0.6}
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

/** Game App Design: controller silhouette with pulsing buttons. */
function Game({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      {/* Controller body — rounded pill with shoulder dips */}
      <path d="M 8 11 Q 4 11 4 16 L 4 22 Q 4 25 7 25 Q 9 25 10 23 L 12 20 L 20 20 L 22 23 Q 23 25 25 25 Q 28 25 28 22 L 28 16 Q 28 11 24 11 Z" />
      {/* D-pad cross (left) */}
      <line x1="8.5" y1="16.5" x2="12.5" y2="16.5" />
      <line x1="10.5" y1="14.5" x2="10.5" y2="18.5" />
      {/* Action buttons (right) — diamond cluster, pulsing */}
      {[
        { cx: 21.5, cy: 14.5, d: 0 },
        { cx: 24, cy: 16.5, d: 0.2 },
        { cx: 21.5, cy: 18.5, d: 0.4 },
        { cx: 19, cy: 16.5, d: 0.6 },
      ].map((b, i) => (
        <motion.circle
          key={i}
          cx={b.cx}
          cy={b.cy}
          r="0.95"
          fill="currentColor"
          animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.7 }}
          transition={{
            duration: 1.8,
            delay: b.d,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
  );
}

const REGISTRY: Record<ServiceIconKey, (p: IconProps) => React.ReactElement> = {
  product: Product,
  design: Design,
  ai: Ai,
  enterprise: Enterprise,
  platform: Platform,
  game: Game,
};

export function ServiceIcon({
  name,
  active,
}: {
  name: ServiceIconKey;
  active: boolean;
}) {
  const Component = REGISTRY[name];
  return <Component active={active} />;
}
