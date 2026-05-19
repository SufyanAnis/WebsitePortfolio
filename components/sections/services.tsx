"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ScrollReveal, revealChild } from "@/components/animations/scroll-reveal";
import { SplitText } from "@/components/animations/split-text";
import { ServiceIcon } from "@/components/icons/service-icons";
import { siteConfig } from "@/lib/site-config";

/**
 * Services — five disciplines in an asymmetric 4-col bento. Each
 * card lists its sub-disciplines as tag pills so the studio can
 * keep specialist depth visible without the section reading as
 * "we will take any work."
 *
 * Icon animations are gated by section in-view to free the main
 * thread when the user is elsewhere on the page.
 */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const iconsActive = useInView(ref, { margin: "-5%" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
    >
      <div className="mx-auto max-w-[var(--container-full)]">
        <div className="mb-16 flex flex-col gap-6 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <span className="text-micro text-[var(--color-tertiary)]">
              What we build
            </span>
            <h2 className="text-display-m max-w-[16ch]">
              <SplitText text={"Six disciplines.\nOne studio."} />
            </h2>
          </div>
          <p className="text-body-l max-w-[460px] text-[var(--color-secondary)]">
            Product engineering, design, AI integration, enterprise systems,
            and the platform plus growth work that ties them together. One
            team, no handoffs.
          </p>
        </div>

        {/* ScrollReveal IS the grid. Don't wrap a plain <div> inside
            and give the motion wrapper `display: contents` — that
            removes its layout box, IntersectionObserver can't observe
            it, `whileInView` never fires, and the cards stay locked
            at opacity 0. */}
        <ScrollReveal
          stagger={0.08}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {siteConfig.services.map((s) => (
            <motion.article
              key={s.id}
              variants={revealChild}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-6 transition-colors duration-300 hover:border-[var(--color-accent)]/40 ${s.span}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, rgba(26,107,255,0.10), transparent 60%)",
                }}
              />

              <div className="relative flex items-start justify-between">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-base)] text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  <ServiceIcon name={s.iconKey} active={iconsActive} />
                </span>
                <span className="font-display text-[2.5rem] font-semibold leading-none text-[var(--color-tertiary)]/40 transition-colors duration-300 group-hover:text-[var(--color-tertiary)]">
                  {s.id}
                </span>
              </div>

              <div className="relative mt-6 flex flex-col gap-3">
                <h3 className="text-heading">{s.title}</h3>
                <p className="text-body text-[var(--color-secondary)]">
                  {s.description}
                </p>
              </div>

              <div className="relative mt-6 flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-base)]/60 px-2.5 py-0.5 text-[11px] text-[var(--color-tertiary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
