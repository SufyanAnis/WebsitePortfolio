"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { ScrollReveal, revealChild } from "@/components/animations/scroll-reveal";
import { SplitText } from "@/components/animations/split-text";
import { LiveKanban } from "@/components/portfolio/live-kanban";
import { CaseVisual, type CaseKind } from "@/components/portfolio/case-visual";
import { siteConfig } from "@/lib/site-config";

/**
 * Portfolio — asymmetric bento. Featured card runs a live kanban;
 * other cards use designed SVG mockups of the product surface.
 *
 * Per QA report: "View case study" CTAs were removed because no
 * detail pages exist. The card visual, client tag, blurb, and
 * tag stack carry the story on hover.
 */
export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
    >
      <div className="mx-auto max-w-[var(--container-full)]">
        <div className="mb-16 flex flex-col gap-6 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <span className="text-micro text-[var(--color-tertiary)]">
              Selected work
            </span>
            <h2 className="text-display-l max-w-[14ch]">
              <SplitText text={"Recent\nbuilds."} />
            </h2>
          </div>
          <p className="text-body-l max-w-[420px] text-[var(--color-secondary)]">
            A handful of recent client builds across SaaS, fintech,
            e-commerce, and AI. More on request; some still live behind NDA.
          </p>
        </div>

        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-12 gap-4">
            {siteConfig.portfolio.map((item) => {
              const isFeatured = item.kind === "featured-kanban";
              const cardInner = (
                <CardChrome
                  title={item.title}
                  client={item.client}
                  blurb={item.blurb}
                  tags={[...item.tags]}
                >
                  {isFeatured ? (
                    <div className="absolute inset-0 flex flex-col p-5">
                      <div className="mb-4 flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-micro text-[var(--color-tertiary)]">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-[var(--color-tertiary)]/70">
                            Animated UI preview
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
                            Preview
                          </span>
                        </span>
                      </div>
                      <div className="min-h-0 flex-1">
                        <LiveKanban />
                      </div>
                    </div>
                  ) : (
                    /* SVG product-surface mockups. These are
                       tailored per case-kind (Jira board, Shopify
                       storefront, fintech KYC form, etc.) so the
                       thumbnail actually represents the work.
                       The prior raster swap to /case-studies/*.jpg
                       was reverted because those were
                       AI-generated stock photos with no relation
                       to the real engagements (e.g. perfume
                       bottles for Shopify Headless, post-its for
                       a Jira rollout). */
                    <CaseVisual kind={item.kind as CaseKind} />
                  )}
                </CardChrome>
              );

              return (
                <motion.div
                  key={item.slug}
                  variants={revealChild}
                  className={`${item.span} min-h-[320px]`}
                >
                  {isFeatured ? cardInner : <TiltCard>{cardInner}</TiltCard>}
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/** Cursor-driven 3D tilt for non-featured cards. */
function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 150, damping: 18 });
  const springRy = useSpring(ry, { stiffness: 150, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(dx * 8);
    rx.set(-dy * 8);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: springRx,
        rotateY: springRy,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className="relative h-full w-full"
    >
      {children}
    </motion.div>
  );
}

interface CardChromeProps {
  title: string;
  client: string;
  blurb: string;
  tags: string[];
  children: ReactNode;
}

/**
 * Hover overlay carries the metadata (client, blurb, tags). No
 * "View case study" CTA because there are no detail pages to
 * link to. The card itself tells the story.
 */
function CardChrome({ title, client, blurb, tags, children }: CardChromeProps) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] transition-colors duration-300 hover:border-[var(--color-accent)]/35">
      {children}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-3 bg-gradient-to-t from-[var(--color-base)]/95 via-[var(--color-base)]/60 to-transparent p-6 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
        <div className="flex flex-col gap-1">
          <span className="text-caption text-[var(--color-tertiary)]">
            {client}
          </span>
          <h3 className="text-heading text-[var(--color-primary)]">{title}</h3>
          <p className="text-body text-[var(--color-secondary)] max-w-[40ch]">
            {blurb}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-base)]/60 px-2.5 py-0.5 text-[11px] text-[var(--color-tertiary)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
