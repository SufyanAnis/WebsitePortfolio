"use client";

import { motion } from "motion/react";
import type { ServiceIconKey } from "@/lib/site-config";

/**
 * Service icons — 10 custom SVGs, one per discipline. All share
 * a 32×32 viewbox + 1.4-stroke aesthetic so they read as a set.
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

function Web({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      <rect x="3" y="6" width="26" height="20" rx="2" />
      <line x1="3" y1="11" x2="29" y2="11" />
      <circle cx="6.5" cy="8.5" r="0.7" fill="currentColor" />
      <circle cx="9" cy="8.5" r="0.7" fill="currentColor" />
      <motion.path
        d="M 9 18 L 14 18 L 14 22 L 20 22"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }}
        transition={{
          duration: 3,
          repeat: active ? Infinity : 0,
          times: [0, 0.4, 0.7, 1],
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}

function Mobile({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      <rect x="10" y="3" width="12" height="26" rx="2" />
      <line x1="14" y1="6.5" x2="18" y2="6.5" />
      <motion.g
        animate={active ? { y: [0, -4, 0] } : { y: 0 }}
        transition={{
          duration: 2.6,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <line x1="12" y1="11" x2="20" y2="11" />
        <line x1="12" y1="14" x2="17" y2="14" />
        <line x1="12" y1="17" x2="20" y2="17" />
        <line x1="12" y1="20" x2="18" y2="20" />
      </motion.g>
    </motion.svg>
  );
}

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

/**
 * SAP — three stacked data planes with status dots. Suggests
 * structured enterprise data rows in a system landscape.
 */
function Sap({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      {[6, 14, 22].map((y, i) => (
        <g key={y}>
          <rect x="4" y={y} width="24" height="5" rx="1" />
          <motion.circle
            cx="7"
            cy={y + 2.5}
            r="0.9"
            fill="currentColor"
            animate={
              active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.7 }
            }
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
    </motion.svg>
  );
}

/**
 * Jira — three kanban columns + a ticket that hops left → right.
 */
function Jira({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      {[4, 13, 22].map((x) => (
        <rect key={x} x={x} y="6" width="6" height="20" rx="1" />
      ))}
      <motion.rect
        y="10"
        width="4"
        height="3"
        rx="0.5"
        fill="currentColor"
        strokeWidth="0"
        initial={{ x: 5 }}
        animate={active ? { x: [5, 14, 23, 5] } : { x: 5 }}
        transition={{
          duration: 4.2,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
          times: [0, 0.33, 0.66, 1],
        }}
      />
    </motion.svg>
  );
}

/**
 * AGI — 8-node 3-layer net. Nodes pulse asynchronously.
 */
function Agi({ active }: IconProps) {
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

/**
 * CI/CD — circular pipeline. A traveling dot orbits the loop to
 * suggest continuous delivery.
 */
function CiCd({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      <circle cx="16" cy="16" r="11" strokeOpacity={0.45} />
      <path d="M 16 5 L 19 7.5 L 16 10" />
      <path d="M 16 27 L 13 24.5 L 16 22" />
      <motion.g
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 4.5,
          repeat: active ? Infinity : 0,
          ease: "linear",
        }}
        style={{ transformOrigin: "16px 16px" }}
      >
        <circle cx="16" cy="5" r="1.8" fill="currentColor" />
      </motion.g>
      <text
        x="16"
        y="19"
        textAnchor="middle"
        fontSize="6"
        fontFamily="var(--font-syne)"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        CI
      </text>
    </motion.svg>
  );
}

/**
 * Apigee — gateway hub with 4 spokes terminating in endpoint
 * nodes. Endpoint nodes pulse out from the center one at a time.
 */
function Apigee({ active }: IconProps) {
  const endpoints: [number, number][] = [
    [16, 4],
    [28, 16],
    [16, 28],
    [4, 16],
  ];
  return (
    <motion.svg {...ICON_PROPS}>
      <circle cx="16" cy="16" r="4.5" />
      {endpoints.map(([x, y], i) => (
        <g key={i}>
          <line x1="16" y1="16" x2={x} y2={y} strokeOpacity={0.4} />
          <motion.circle
            cx={x}
            cy={y}
            r="1.8"
            fill="currentColor"
            animate={
              active
                ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }
                : { scale: 1, opacity: 0.8 }
            }
            transition={{
              duration: 2.4,
              delay: i * 0.4,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        </g>
      ))}
      <circle cx="16" cy="16" r="1.3" fill="currentColor" />
    </motion.svg>
  );
}

/**
 * Marketing — megaphone with broadcast lines that pulse out.
 */
function Marketing({ active }: IconProps) {
  return (
    <motion.svg {...ICON_PROPS}>
      <path d="M 4 14 L 18 8 L 18 24 L 4 18 Z" />
      <line x1="4" y1="14" x2="4" y2="18" />
      <rect x="8" y="18" width="4" height="6" rx="1" />
      {[
        { y1: 11, y2: 11 },
        { y1: 16, y2: 16 },
        { y1: 21, y2: 21 },
      ].map((line, i) => (
        <motion.line
          key={i}
          x1="22"
          y1={line.y1}
          x2="28"
          y2={line.y2}
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: [0, 1, 0] } : { pathLength: 0.6 }}
          transition={{
            duration: 1.8,
            delay: i * 0.25,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
  );
}

/**
 * Social Media — three accounts orbiting, connection lines pulse.
 */
function Social({ active }: IconProps) {
  const nodes: [number, number][] = [
    [8, 10],
    [24, 10],
    [16, 24],
  ];
  return (
    <motion.svg {...ICON_PROPS}>
      {nodes.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3.2"
          animate={
            active
              ? { scale: [1, 1.08, 1] }
              : { scale: 1 }
          }
          transition={{
            duration: 2.2,
            delay: i * 0.3,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {[
        { x1: 11, y1: 10, x2: 21, y2: 10 },
        { x1: 10, y1: 13, x2: 14, y2: 22 },
        { x1: 22, y1: 13, x2: 18, y2: 22 },
      ].map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          strokeOpacity={0.5}
          initial={{ pathLength: 0 }}
          animate={
            active ? { pathLength: [0, 1, 0] } : { pathLength: 0.7 }
          }
          transition={{
            duration: 2.2,
            delay: i * 0.4,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={`dot-${i}`}
          cx={cx}
          cy={cy}
          r="0.8"
          fill="currentColor"
        />
      ))}
    </motion.svg>
  );
}

const REGISTRY: Record<ServiceIconKey, (p: IconProps) => React.ReactElement> = {
  web: Web,
  mobile: Mobile,
  design: Design,
  sap: Sap,
  jira: Jira,
  agi: Agi,
  cicd: CiCd,
  apigee: Apigee,
  marketing: Marketing,
  social: Social,
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
