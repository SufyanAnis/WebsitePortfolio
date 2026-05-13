"use client";

import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { ScrollReveal, revealChild } from "@/components/animations/scroll-reveal";
import { SplitText } from "@/components/animations/split-text";
import { ServiceIcon } from "@/components/icons/service-icons";
import { siteConfig } from "@/lib/site-config";

/**
 * Services — 4×2 grid of 8 cards. Each card has a numeric id, an
 * animated icon, title, description, and tag pills. On hover the
 * card lifts 8 px, the border picks up an accent tint, and a
 * "Learn more →" label slides in from the bottom edge.
 *
 * Icon animations are gated by the section's in-view state — they
 * pause entirely when the user scrolls away, freeing the main
 * thread for whatever section is now visible.
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
              <SplitText text={"Ten disciplines.\nOne studio."} />
            </h2>
          </div>
          <p className="text-body-l max-w-[460px] text-[var(--color-secondary)]">
            From product design to SAP and Apigee — design, engineering, AI,
            and growth rolling forward as one team without handoffs.
          </p>
        </div>

        <ScrollReveal stagger={0.08} className="contents">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.services.map((s) => (
              <motion.article
                key={s.id}
                variants={revealChild}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-6 transition-colors duration-300 hover:border-[var(--color-accent)]/40 ${s.span}`}
              >
                {/* Accent tint glow on hover */}
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
                  <span
                    className="font-display text-[2.5rem] font-semibold leading-none text-[var(--color-tertiary)]/40 transition-colors duration-300 group-hover:text-[var(--color-tertiary)]"
                  >
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

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 bottom-3 flex translate-y-4 items-center gap-1.5 text-[12px] font-medium text-[var(--color-accent)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Learn more
                  <ArrowUpRight size={13} />
                </div>
              </motion.article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
