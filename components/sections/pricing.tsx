"use client";

import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";
import { useRef } from "react";
import { SplitText } from "@/components/animations/split-text";
import { Counter } from "@/components/animations/counter";
import { Button } from "@/components/ui/button";
import { ScrollReveal, revealChild } from "@/components/animations/scroll-reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * Pricing — 3 cards, featured tier elevated and ringed with a
 * conic-gradient glow that rotates slowly. Each tier's price
 * counts up from 0 on scroll-in via the shared Counter primitive.
 */
export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-5%" });

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
    >
      <div className="mx-auto max-w-[var(--container-full)]">
        <div className="mb-16 flex flex-col gap-6 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <span className="text-micro text-[var(--color-tertiary)]">
              Pricing
            </span>
            <h2 className="text-display-m max-w-[16ch]">
              <SplitText text={"Pricing built\nfor outcomes."} />
            </h2>
          </div>
          <p className="text-body-l max-w-[440px] text-[var(--color-secondary)]">
            Three engagement shapes. Every project starts with a fixed-fee
            discovery sprint, so even the open-ended ones land with a real
            budget behind them.
          </p>
        </div>

        <ScrollReveal stagger={0.1}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {siteConfig.pricing.map((tier) => (
              <PricingCard key={tier.tier} tier={tier} active={inView} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  active,
}: {
  tier: (typeof siteConfig.pricing)[number];
  active: boolean;
}) {
  const featured = tier.featured;
  return (
    <motion.div
      variants={revealChild}
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-colors duration-300 lg:p-8 ${
        featured
          ? "border-[var(--color-accent)]/40 bg-[var(--color-elevated)] lg:-translate-y-4"
          : "border-[var(--color-border-subtle)] bg-[var(--color-elevated)] hover:border-[var(--color-accent)]/30"
      }`}
    >
      {featured && (
        <>
          {/* Glowing accent border */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(26,107,255,0.5) 80deg, transparent 160deg, transparent 240deg, rgba(26,107,255,0.5) 320deg, transparent 360deg)",
              mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              WebkitMask:
                "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
            animate={active ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 8,
              repeat: active ? Infinity : 0,
              ease: "linear",
            }}
          />
          {/* Badge */}
          <span className="absolute right-6 top-6 rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            {tier.badge}
          </span>
        </>
      )}

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-micro text-[var(--color-tertiary)]">
            {tier.tier}
          </span>
          <div className="flex items-baseline gap-2 font-display font-extrabold tracking-tight text-[var(--color-primary)]">
            {tier.price > 0 ? (
              <span className="text-[44px] leading-none lg:text-[52px]">
                <Counter to={tier.price} prefix="$" duration={1.6} />
              </span>
            ) : (
              <span className="text-[44px] leading-none lg:text-[52px]">
                {tier.priceLabel}
              </span>
            )}
            <span className="text-[12px] font-medium text-[var(--color-tertiary)]">
              {tier.cadence}
            </span>
          </div>
          <p className="text-body text-[var(--color-secondary)]">
            {tier.blurb}
          </p>
        </div>

        <ul className="flex flex-col gap-3 border-t border-[var(--color-border-subtle)] pt-6">
          {tier.features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.4,
                delay: 0.2 + i * 0.05,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex items-start gap-3 text-body text-[var(--color-secondary)]"
            >
              <span
                className={`mt-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full ${
                  featured
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-base)] text-[var(--color-accent)] border border-[var(--color-border-subtle)]"
                }`}
              >
                <Check size={10} strokeWidth={3} />
              </span>
              <span>{f}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="relative mt-8">
        <Button
          href="#contact"
          variant={featured ? "primary" : "outline"}
          icon="arrow"
          magnetic={false}
          size="md"
          className="w-full justify-center"
        >
          {tier.cta}
        </Button>
      </div>
    </motion.div>
  );
}
