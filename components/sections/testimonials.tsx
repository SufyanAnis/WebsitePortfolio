"use client";

import { motion } from "motion/react";
import { GripHorizontal } from "lucide-react";
import { useRef } from "react";
import { SplitText } from "@/components/animations/split-text";
import { siteConfig } from "@/lib/site-config";

/**
 * Capabilities — formerly Testimonials. Per QA report v1, the
 * fabricated testimonials section was undermining credibility.
 * Reframed as forward-looking capability statements ("What we
 * deliver") rather than unverifiable third-party praise.
 *
 * Per QA report v2 #15, the previous draggable-only implementation
 * was inaccessible to keyboard and screen-reader users. This pass
 * swaps the framer-motion drag carousel for a native horizontal
 * scroll container with scroll-snap and a custom keyboard handler
 * that scrolls one card per arrow keypress. Native scroll gives us
 * touch swipe, mouse wheel (shift+wheel), and screen reader
 * navigation for free.
 */
export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const el = scrollerRef.current;
    if (!el) return;
    // Each card is 320 px wide on mobile, 360 px on lg, with a 20 px
    // gap. Scrolling by the first card's width keeps the step
    // visually predictable across breakpoints.
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const step = firstCard ? firstCard.offsetWidth + 20 : 340;
    el.scrollBy({ left: e.key === "ArrowRight" ? step : -step, behavior: "smooth" });
  }

  return (
    <section className="relative py-32 lg:py-44" aria-label="Six commitments">
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
            <GripHorizontal size={14} aria-hidden />
            Drag, swipe, or use arrow keys
          </span>
        </div>
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Six commitments, horizontally scrollable"
        onKeyDown={onKeyDown}
        className="mask-edge-x flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 lg:gap-5 lg:px-12"
        style={{ scrollbarWidth: "none" }}
        data-cursor="drag"
      >
        {siteConfig.capabilities.map((c, i) => (
          <CapabilityCard key={c.headline} index={i} {...c} />
        ))}
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
      data-card
      className="flex w-[300px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-6 lg:w-[340px]"
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
