"use client";

import { motion, useReducedMotion } from "motion/react";
import { GripHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/animations/split-text";
import { siteConfig } from "@/lib/site-config";

/**
 * Capabilities — formerly Testimonials. Per QA report, the
 * fabricated testimonials section was undermining credibility.
 * Reframed as forward-looking capability statements ("What we
 * deliver") rather than unverifiable third-party praise.
 *
 * Layout is the same draggable horizontal carousel so the visual
 * rhythm of the page is preserved.
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
              What we deliver
            </span>
            <h2 className="text-display-m max-w-[18ch]">
              <SplitText text={"Six commitments\nbehind every project."} />
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
          className="flex cursor-grab gap-4 px-6 pb-2 lg:gap-5 lg:px-12"
          drag={reduced ? false : "x"}
          dragConstraints={constraint}
          dragElastic={0.06}
          dragTransition={{ bounceStiffness: 220, bounceDamping: 26 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {siteConfig.capabilities.map((c, i) => (
            <CapabilityCard key={c.headline} index={i} {...c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface CapabilityCardProps {
  headline: string;
  body: string;
  tag: string;
  index: number;
}

function CapabilityCard({
  headline,
  body,
  tag,
  index,
}: CapabilityCardProps) {
  return (
    <motion.article
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
        <span className="inline-flex w-fit items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-base)]/60 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
          {tag}
        </span>
        <h3 className="text-heading">{headline}</h3>
        <p className="text-body text-[var(--color-secondary)]">{body}</p>
      </div>
    </motion.article>
  );
}
