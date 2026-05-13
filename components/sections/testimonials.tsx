"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star, GripHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/animations/split-text";
import { siteConfig } from "@/lib/site-config";

/**
 * Testimonials — horizontal draggable carousel.
 *
 * Drag uses Framer Motion's `drag="x"` with constraints computed
 * from scrollWidth − viewportWidth, plus a small elastic overshoot
 * for the bounce-back feel.  Momentum is on by default.
 *
 * Reduced-motion users see a static scrollable row (browser
 * overflow-x: auto). No layout shift between modes.
 */
export function Testimonials() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState({ left: 0, right: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    function measure() {
      if (!wrapRef.current || !trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const wrapWidth = wrapRef.current.clientWidth;
      setConstraint({ left: Math.min(0, wrapWidth - trackWidth), right: 0 });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[var(--container-full)] px-6 lg:px-12">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <span className="text-micro text-[var(--color-tertiary)]">
              In their words
            </span>
            <h2 className="text-display-m max-w-[16ch]">
              <SplitText text={"What clients\nactually say."} />
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 text-caption text-[var(--color-tertiary)]">
            <GripHorizontal size={14} />
            Drag to scrub
          </span>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative mask-edge-x overflow-hidden"
        data-cursor="drag"
      >
        <motion.div
          ref={trackRef}
          className="flex cursor-grab gap-4 px-6 pb-2 lg:px-12 lg:gap-5"
          drag={reduced ? false : "x"}
          dragConstraints={constraint}
          dragElastic={0.06}
          dragTransition={{ bounceStiffness: 220, bounceDamping: 26 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {siteConfig.testimonials.map((t, i) => (
            <TestimonialCard key={t.name} index={i} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface CardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  country: string;
  initials: string;
  index: number;
}

const AVATAR_GRADIENTS = [
  ["#1a6bff", "#0ea5e9"],
  ["#8b5cf6", "#3b82f6"],
  ["#22d3ee", "#1a6bff"],
  ["#f97316", "#f5a623"],
  ["#10b981", "#22d3ee"],
  ["#ec4899", "#8b5cf6"],
];

function TestimonialCard({
  quote,
  name,
  role,
  company,
  country,
  initials,
  index,
}: CardProps) {
  const grad = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  return (
    <motion.figure
      className="flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-6 lg:w-[340px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div className="flex flex-col gap-5">
        <div
          className="flex gap-0.5 text-[var(--color-warning)]"
          aria-label="5 out of 5 stars"
        >
          {Array.from({ length: 5 }).map((_, s) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.3,
                delay: 0.2 + s * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <Star size={13} fill="currentColor" strokeWidth={0} />
            </motion.span>
          ))}
        </div>
        <blockquote className="text-body italic font-light text-[var(--color-secondary)]">
          “{quote}”
        </blockquote>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-border-subtle)] pt-5">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
          style={{
            background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
          }}
          aria-hidden
        >
          {initials}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[13px] font-medium text-[var(--color-primary)]">
            {name}
          </span>
          <span className="truncate text-[11px] text-[var(--color-tertiary)]">
            {role} · {company}
          </span>
        </div>
        <span className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-base)] px-1.5 py-0.5 text-[10px] font-medium tracking-[0.15em] text-[var(--color-tertiary)]">
          {country}
        </span>
      </div>
    </motion.figure>
  );
}
