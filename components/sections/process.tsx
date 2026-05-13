"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/animations/split-text";
import { siteConfig } from "@/lib/site-config";

/**
 * Process — pinned horizontal scroll.
 *
 * Five frames laid out in a horizontal track. The section pins to
 * the viewport while the user scrolls vertically; ScrollTrigger
 * translates the track in lock-step. Linear ease (`scrub: 1`) so
 * the scroll wheel feels direct.
 *
 * `invalidateOnRefresh: true` recomputes the pin distance on
 * resize so layout changes don't leave the section orphaned at
 * the wrong scrollY.
 *
 * Reduced-motion users and < lg viewports get a vertical stack
 * instead — pinned scroll is unfriendly to touch + a11y.
 */
export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const [enablePin, setEnablePin] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnablePin(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enablePin || reduced) return;
    if (!sectionRef.current || !pinRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: pinRef.current!,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    }, section);

    return () => ctx.revert();
  }, [enablePin, reduced]);

  const frames = siteConfig.process;

  // Reduced-motion / mobile: vertical stack.
  if (!enablePin || reduced) {
    return (
      <section
        id="process"
        className="relative px-6 py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[var(--container-full)]">
          <div className="mb-16 flex flex-col gap-6">
            <span className="text-micro text-[var(--color-tertiary)]">
              Our process
            </span>
            <h2 className="text-display-m max-w-[16ch]">
              <SplitText text={"From discovery\nto launch."} />
            </h2>
          </div>
          <div className="flex flex-col gap-12">
            {frames.map((f, i) => (
              <ProcessFrame key={f.id} frame={f} index={i} stacked />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-[var(--color-base)]"
      aria-label="Our process"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Header bar — section caption + progress dots */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-12 pt-10">
          <div className="flex flex-col gap-3">
            <span className="text-micro text-[var(--color-tertiary)]">
              Our process
            </span>
            <h2 className="text-heading">From discovery to launch.</h2>
          </div>
          <ProgressDots progress={progress} count={frames.length} />
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${frames.length * 100}vw` }}
        >
          {frames.map((f, i) => {
            const activeIdx = Math.min(
              frames.length - 1,
              Math.floor(progress * frames.length)
            );
            return (
              <ProcessFrame
                key={f.id}
                frame={f}
                index={i}
                active={i === activeIdx}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface FrameProps {
  frame: (typeof siteConfig.process)[number];
  index: number;
  stacked?: boolean;
  /**
   * Whether this frame's background animation should run. Only
   * the currently-visible frame is active in pinned mode; the
   * other 4 stay static.
   */
  active?: boolean;
}

function ProcessFrame({
  frame,
  index,
  stacked = false,
  active = true,
}: FrameProps) {
  return (
    <div
      className={
        stacked
          ? "grid grid-cols-1 gap-8 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-8 lg:grid-cols-[280px_1fr] lg:gap-16 lg:p-12"
          : "flex h-full w-screen shrink-0 items-center px-12"
      }
    >
      {!stacked && <FrameBackground index={index} active={active} />}

      <div
        className={
          stacked
            ? "contents"
            : "relative mx-auto grid w-full max-w-[var(--container-wide)] grid-cols-2 items-center gap-16"
        }
      >
        {/* Left: massive numeric */}
        <div className="relative flex items-center">
          <span
            className="font-display font-extrabold leading-none text-[var(--color-accent)]"
            style={{
              fontSize: stacked
                ? "clamp(72px, 16vw, 140px)"
                : "clamp(120px, 18vw, 220px)",
              letterSpacing: "-0.04em",
            }}
          >
            {frame.id}
          </span>
        </div>

        {/* Right: title + blurb + bullets */}
        <div className="flex flex-col gap-5">
          <h3 className="text-display-m">{frame.title}</h3>
          <p className="text-body-l max-w-[44ch] text-[var(--color-secondary)]">
            {frame.blurb}
          </p>
          <ul className="mt-2 flex flex-col gap-3">
            {frame.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-body text-[var(--color-secondary)]"
              >
                <span className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * FrameBackground — a different abstract SVG per step. Each one
 * idles with a slow loop; none compete with the headline number.
 * Only renders animations when this frame is the active one in
 * the pinned scroll (others stay frozen to save CPU).
 */
function FrameBackground({
  index,
  active,
}: {
  index: number;
  active: boolean;
}) {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-[0.22]"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {index === 0 && (
        <g className="text-[var(--color-accent)]">
          {[120, 240, 360, 480, 600].map((r, i) => (
            <motion.circle
              key={r}
              cx="200"
              cy="400"
              r={r}
              strokeOpacity={0.18}
              initial={{ scale: 0.96, opacity: 0.1 }}
              animate={
                active
                  ? { scale: [0.96, 1, 0.96], opacity: [0.1, 0.4, 0.1] }
                  : { scale: 1, opacity: 0.25 }
              }
              transition={{
                duration: 6,
                delay: i * 0.6,
                repeat: active ? Infinity : 0,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "200px 400px" }}
            />
          ))}
        </g>
      )}
      {index === 1 && (
        <g className="text-[var(--color-accent)]">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={i}
              x1="100"
              y1={120 + i * 60}
              x2="1100"
              y2={120 + i * 60}
              strokeOpacity={0.15}
              initial={{ pathLength: 0 }}
              animate={
                active ? { pathLength: [0, 1, 1, 0] } : { pathLength: 0.6 }
              }
              transition={{
                duration: 7,
                delay: i * 0.15,
                repeat: active ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      )}
      {index === 2 && (
        <g className="text-[var(--color-accent)]">
          <motion.path
            d="M 100 600 Q 300 100, 600 400 T 1100 200"
            strokeOpacity={0.4}
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }}
            transition={{
              duration: 5,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M 100 200 Q 400 700, 800 300 T 1100 600"
            strokeOpacity={0.2}
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }}
            transition={{
              duration: 6,
              delay: 0.6,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </g>
      )}
      {index === 3 && (
        <g className="text-[var(--color-accent)]">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.rect
              key={i}
              x={120 + (i % 3) * 200}
              y={200 + Math.floor(i / 3) * 200}
              width="160"
              height="160"
              strokeOpacity={0.25}
              initial={{ rotate: 0, opacity: 0 }}
              animate={
                active
                  ? { rotate: [0, 6, 0], opacity: [0, 0.6, 0] }
                  : { rotate: 0, opacity: 0.3 }
              }
              transition={{
                duration: 8,
                delay: i * 0.3,
                repeat: active ? Infinity : 0,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: `${120 + (i % 3) * 200 + 80}px ${
                  200 + Math.floor(i / 3) * 200 + 80
                }px`,
              }}
            />
          ))}
        </g>
      )}
      {index === 4 && (
        <g className="text-[var(--color-accent)]">
          <motion.path
            d="M 100 700 Q 600 500, 1100 100"
            strokeOpacity={0.5}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 5,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          {active &&
            [0.1, 0.3, 0.5, 0.7, 0.9].map((t, i) => (
              <motion.circle
                key={i}
                r="6"
                fill="currentColor"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 5,
                  delay: t * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M 100 700 Q 600 500, 1100 100"
                />
              </motion.circle>
            ))}
        </g>
      )}
    </svg>
  );
}

/**
 * ProgressDots — 5 dots that fill from left to right as ScrollTrigger
 * reports progress. Active dot is fully opaque + slightly wider.
 */
function ProgressDots({ progress, count }: { progress: number; count: number }) {
  const activeIdx = Math.min(count - 1, Math.floor(progress * count));
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => {
        const active = i <= activeIdx;
        return (
          <motion.span
            key={i}
            animate={{
              width: i === activeIdx ? 24 : 6,
              opacity: active ? 1 : 0.3,
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="h-1.5 rounded-full bg-[var(--color-primary)]"
          />
        );
      })}
    </div>
  );
}
