"use client";

import { motion } from "motion/react";
import { SplitText } from "@/components/animations/split-text";
import { siteConfig } from "@/lib/site-config";

/**
 * About — short, honest founder block.
 *
 * Per QA report: anonymity amplifies suspicion. A real name and
 * city does more for trust than any other single change. This
 * section is intentionally brief; replace the body copy via
 * site-config + env vars when ready.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
    >
      <div className="mx-auto grid max-w-[var(--container-full)] grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-micro text-[var(--color-tertiary)]">
            Who you're hiring
          </span>
          <h2 className="text-display-m max-w-[12ch]">
            <SplitText text={"Small\nstudio.\nReal\npeople."} />
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
            <div
              aria-hidden
              className="relative size-24 shrink-0 overflow-hidden rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #1a6bff 0%, #3b82f6 50%, #8b5cf6 100%)",
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center font-display text-[28px] font-extrabold text-white">
                {initialsOf(siteConfig.brand.founder)}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="font-display text-heading text-[var(--color-primary)]">
                  {siteConfig.brand.founder}
                </span>
                <span className="text-caption text-[var(--color-tertiary)]">
                  Founder, engineer · {siteConfig.brand.city}
                </span>
              </div>
              <p className="text-body-l max-w-[58ch] text-[var(--color-secondary)]">
                {siteConfig.brand.name} is led by {siteConfig.brand.founder}{" "}
                from {siteConfig.brand.city}, with a tight network of senior
                engineers and designers who join per engagement. The studio
                takes on a handful of projects each quarter, works end-to-end
                across design, product engineering, AI, and enterprise systems,
                and stays on call for two weeks after every launch.
              </p>
              <p className="text-body max-w-[58ch] text-[var(--color-tertiary)]">
                Specialist depth in SAP ABAP, Apigee, Jira, and Oracle
                RightNow alongside the modern product stack means a single
                team can take an enterprise build from discovery through
                launch without hand-offs to a second vendor.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border-subtle)] pt-8 sm:grid-cols-4">
            {[
              { label: "Pod size", value: "1–3 people" },
              { label: "Engagements / yr", value: "8–12" },
              { label: "Response", value: "12h weekdays" },
              { label: "Time zone overlap", value: "EU + AU" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-display text-[20px] font-semibold text-[var(--color-primary)]">
                  {s.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
