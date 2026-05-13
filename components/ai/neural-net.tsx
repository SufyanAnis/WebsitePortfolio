"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useMemo } from "react";

/**
 * NeuralNet — three-layer SVG visualization (input → hidden → output)
 * with traveling-light packets along the connections and pulsing
 * nodes. Activates in waves on scroll into view.
 *
 * Layout:
 *   - Input layer:  4 nodes (left, y-distributed)
 *   - Hidden layer: 6 nodes (middle)
 *   - Output layer: 4 nodes (right)
 *   - All-to-all connections between adjacent layers.
 *
 * Connection animation uses strokeDashoffset on a dashed stroke —
 * cheap, GPU-accelerated, and renders the "packet" visual cleanly.
 */

const VB = 320;

function distribute(count: number) {
  // Evenly distribute count points across the viewbox height with
  // top + bottom padding so nodes don't touch the edge.
  const pad = 40;
  const span = VB - 2 * pad;
  return Array.from({ length: count }, (_, i) =>
    count === 1 ? VB / 2 : pad + (span * i) / (count - 1)
  );
}

export function NeuralNet() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const reduced = useReducedMotion();

  const layers = useMemo(
    () => ({
      input: { x: 50, ys: distribute(4) },
      hidden: { x: 160, ys: distribute(6) },
      output: { x: 270, ys: distribute(4) },
    }),
    []
  );

  const connections = useMemo(() => {
    const all: { x1: number; y1: number; x2: number; y2: number; key: string }[] =
      [];
    layers.input.ys.forEach((y1, i) =>
      layers.hidden.ys.forEach((y2, j) =>
        all.push({
          x1: layers.input.x,
          y1,
          x2: layers.hidden.x,
          y2,
          key: `i${i}-h${j}`,
        })
      )
    );
    layers.hidden.ys.forEach((y1, i) =>
      layers.output.ys.forEach((y2, j) =>
        all.push({
          x1: layers.hidden.x,
          y1,
          x2: layers.output.x,
          y2,
          key: `h${i}-o${j}`,
        })
      )
    );
    return all;
  }, [layers]);

  const allNodes = useMemo(
    () => [
      ...layers.input.ys.map((y, i) => ({
        x: layers.input.x,
        y,
        key: `i${i}`,
        layer: 0,
      })),
      ...layers.hidden.ys.map((y, i) => ({
        x: layers.hidden.x,
        y,
        key: `h${i}`,
        layer: 1,
      })),
      ...layers.output.ys.map((y, i) => ({
        x: layers.output.x,
        y,
        key: `o${i}`,
        layer: 2,
      })),
    ],
    [layers]
  );

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VB} ${VB}`}
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connection lines */}
      <g
        stroke="#3b82f6"
        strokeWidth={0.7}
        strokeLinecap="round"
        strokeOpacity={0.18}
      >
        {connections.map((c) => (
          <line key={c.key} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} />
        ))}
      </g>

      {/* Traveling packets — every connection gets a periodic pulse
          via strokeDashoffset. We stagger by hashing the key. */}
      <g
        stroke="#60a5fa"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeDasharray="6 200"
      >
        {connections.map((c, i) => {
          const len = Math.hypot(c.x2 - c.x1, c.y2 - c.y1);
          const delay = (i * 0.07) % 4;
          return (
            <motion.line
              key={`p-${c.key}`}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              initial={{ strokeDashoffset: len }}
              animate={
                inView && !reduced
                  ? { strokeDashoffset: [len, -200] }
                  : undefined
              }
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay,
                ease: "linear",
              }}
            />
          );
        })}
      </g>

      {/* Node halos */}
      <g>
        {allNodes.map((n, i) => (
          <motion.circle
            key={`halo-${n.key}`}
            cx={n.x}
            cy={n.y}
            r={10}
            fill="url(#nodeGlow)"
            initial={{ opacity: 0 }}
            animate={
              inView && !reduced
                ? { opacity: [0.15, 0.6, 0.15] }
                : { opacity: 0.2 }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>

      {/* Node cores */}
      <g>
        {allNodes.map((n, i) => (
          <motion.circle
            key={`core-${n.key}`}
            cx={n.x}
            cy={n.y}
            r={3.4}
            fill="#ffffff"
            initial={{ scale: 0 }}
            animate={
              inView
                ? { scale: 1, opacity: reduced ? 1 : [0.7, 1, 0.7] }
                : { scale: 0 }
            }
            transition={{
              scale: { duration: 0.5, delay: 0.05 * i, ease: [0.23, 1, 0.32, 1] },
              opacity: {
                duration: 2,
                repeat: Infinity,
                delay: 0.2 * i,
                ease: "easeInOut",
              },
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
      </g>
    </svg>
  );
}
