"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SplitText } from "@/components/animations/split-text";
import { Counter } from "@/components/animations/counter";
import { Button } from "@/components/ui/button";
import { siteConfig, nextAvailableQuarter } from "@/lib/site-config";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

const HEADLINE = [
  "We engineer",
  "digital products",
  "for ",
  "teams worldwide.",
] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  // Compute quarter on client only to avoid SSR/CSR text mismatch
  // if the build clock and the user's clock are on opposite sides
  // of a quarter boundary.
  const [availability, setAvailability] = useState<string>("");
  const cyclingWords = siteConfig.heroWords;

  useEffect(() => {
    setAvailability(nextAvailableQuarter());
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setWordIdx((i) => (i + 1) % cyclingWords.length);
    }, 2800);
    return () => clearInterval(t);
  }, [reduced, cyclingWords.length]);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-12 pt-28 lg:px-12 lg:pb-20 lg:pt-32"
    >
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, rgba(26,107,255,0.12), transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(59,130,246,0.06), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
          }}
        />
        {isDesktop && !reduced ? (
          <div className="absolute inset-0">
            <HeroScene />
          </div>
        ) : null}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-base))",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[var(--container-full)] flex-col gap-8 lg:gap-10">
        {/* Availability badge with dynamically computed quarter */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          className="text-micro inline-flex items-center gap-2 self-start rounded-full border border-[var(--color-border-default)] bg-[var(--color-glass)] px-4 py-2 backdrop-blur-md"
        >
          <span className="relative inline-flex">
            <span className="size-1.5 rounded-full bg-[var(--color-success)]" />
            <span
              aria-hidden
              className="absolute inset-0 size-1.5 animate-ping rounded-full bg-[var(--color-success)] opacity-60"
            />
          </span>
          {availability
            ? `Available for ${availability} projects`
            : "Now booking new projects"}
        </motion.span>

        <h1 className="text-display-xl">
          <span className="block">
            <SplitText text={HEADLINE[0]} immediate delay={0.3} />
          </span>
          <span className="block">
            <SplitText text={HEADLINE[1]} immediate delay={0.45} />
          </span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.95 }}
          >
            <span className="inline-flex flex-wrap items-baseline gap-x-[0.22em] gap-y-0">
              <span>for</span>
              <CyclingWord
                words={cyclingWords as unknown as string[]}
                index={wordIdx}
                reduced={!!reduced}
              />
            </span>
          </motion.span>
          <span className="block">
            <SplitText text={HEADLINE[3]} immediate delay={1.25} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 1.6 }}
          className="flex max-w-[600px] flex-col gap-6"
        >
          <p className="text-body-l text-[var(--color-secondary)]">
            Led by {siteConfig.brand.founder}, with a tight network of
            senior engineers and designers who join per engagement. Web,
            mobile, and AI products for teams that take quality seriously.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#contact" variant="primary" icon="arrow">
              Start a project
            </Button>
            <Button href="#portfolio" variant="ghost" icon="play">
              See our work
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 1.9 }}
          className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[var(--color-border-subtle)] pt-8 sm:grid-cols-4"
        >
          {siteConfig.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <span className="text-display-m text-[var(--color-primary)]">
                <Counter
                  to={s.value}
                  decimals={s.decimals}
                  suffix={s.suffix}
                />
              </span>
              <span className="text-caption text-[var(--color-tertiary)]">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator: animated line only, no "Scroll" label
          per QA report (vocabulary read as dated). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.div
            className="absolute inset-x-0 top-0 h-full bg-white"
            initial={{ y: "-100%" }}
            animate={reduced ? undefined : { y: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
}

interface CyclingWordProps {
  words: string[];
  index: number;
  reduced: boolean;
}

function CyclingWord({ words, index, reduced }: CyclingWordProps) {
  const longest = words.reduce((a, b) => (a.length > b.length ? a : b));
  return (
    <span
      className="relative inline-grid text-[var(--color-accent)] align-baseline"
      style={{
        gridTemplateAreas: '"stack"',
        overflow: "hidden",
        paddingBottom: "0.08em",
      }}
    >
      <span aria-hidden className="invisible" style={{ gridArea: "stack" }}>
        {longest}
      </span>
      <span className="relative inline-block" style={{ gridArea: "stack" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={
              reduced
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: "0.35em", filter: "blur(10px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: "-0.35em", filter: "blur(10px)" }
            }
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="inline-block"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
