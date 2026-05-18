"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Play,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { SplitText } from "@/components/animations/split-text";
import { Typewriter } from "@/components/animations/typewriter";
import { NeuralNet } from "@/components/ai/neural-net";
import { siteConfig } from "@/lib/site-config";

/**
 * AiShowcase — split-screen demo.
 *
 * Per QA report: section was flagged as decorative. It's actually
 * interactive (typewriter on submit) but the affordance was easy
 * to miss. Fix: prominent "Try a sample" button row above the
 * input + a "Run" pill style on the submit button so the
 * interactivity is unmissable.
 */
export function AiShowcase() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const [submitted, setSubmitted] = useState(false);
  const [doneStatus, setDoneStatus] = useState(false);
  const [prompt, setPrompt] = useState("");

  const config = siteConfig.aiShowcase;
  const statusLines = config.sequence.filter((s) => s.kind === "status");
  const result = config.sequence.find((s) => s.kind === "result");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    setDoneStatus(false);
  }

  function handleReset() {
    setSubmitted(false);
    setDoneStatus(false);
    setPrompt("");
  }

  function handleSample(sample: string) {
    setPrompt(sample);
    setSubmitted(true);
    setDoneStatus(false);
  }

  return (
    <section
      id="ai-showcase"
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-elevated)] px-6 py-32 lg:px-12 lg:py-44"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.6]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(26,107,255,0.08), transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[var(--container-full)] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* LEFT: prompt + typewriter response */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-micro text-[var(--color-tertiary)]">
              AI that works
            </span>
            <h2 className="text-display-m max-w-[16ch]">
              <SplitText text={"Try our analysis\nagent yourself."} />
            </h2>
            <p className="text-body-l max-w-[520px] text-[var(--color-secondary)]">
              Production agents wired into your stack, not chat toys. Ask one
              a question below and watch it think, evidence its answer, and
              show its sources.
            </p>
          </div>

          {/* Sample prompt buttons — make interactivity obvious */}
          {!submitted && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
                <Play size={11} fill="currentColor" />
                Try a sample
              </span>
              {config.samplePrompts.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleSample(sample)}
                  className="rounded-full border border-[var(--color-border-default)] bg-[var(--color-base)]/60 px-3 py-1.5 text-[11px] text-[var(--color-secondary)] backdrop-blur-md transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-primary)]"
                >
                  {sample.length > 38 ? sample.slice(0, 36) + "..." : sample}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-base)]/70 p-5 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <Sparkles
                size={16}
                className="shrink-0 text-[var(--color-accent)]"
              />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={config.placeholder}
                disabled={submitted}
                className="flex-1 bg-transparent text-body text-[var(--color-primary)] placeholder:text-[var(--color-tertiary)] focus:outline-none disabled:opacity-50"
              />
              {submitted ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-caption text-[var(--color-tertiary)] transition-colors hover:text-[var(--color-primary)]"
                >
                  Reset
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-3.5 py-1.5 text-[12px] font-medium text-white transition-transform hover:scale-[1.04] active:scale-[0.96]"
                >
                  Run
                  <ArrowUpRight size={13} />
                </button>
              )}
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 flex flex-col gap-3 border-t border-[var(--color-border-subtle)] pt-5 font-mono">
                    <Typewriter
                      lines={statusLines.map((s) => s.text)}
                      onComplete={() => setDoneStatus(true)}
                    />
                    {doneStatus && result && <ResultBlock result={result} />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-[11px] text-[var(--color-tertiary)]">
            Sample agent. Real engagements ship with audit logs, evaluations,
            and your own data sources.
          </p>
        </div>

        {/* RIGHT: neural network + floating stat cards */}
        <div className="relative flex aspect-square w-full max-w-[560px] items-center justify-center justify-self-center">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(26,107,255,0.15), transparent 60%)",
            }}
          />
          <div className="relative h-full w-full">
            <NeuralNet />
            {config.stats.map((s, i) => {
              const positions: Array<{
                top: string;
                left?: string;
                right?: string;
              }> = [
                { top: "4%", right: "2%" },
                { top: "44%", left: "2%" },
                { top: "82%", right: "6%" },
              ];
              const pos = positions[i];
              return (
                <motion.div
                  key={s.label}
                  className="absolute rounded-xl border border-[var(--color-border-default)] bg-[var(--color-base)]/85 px-3.5 py-2.5 backdrop-blur-md"
                  style={pos}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 12, scale: 0.95 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + i * 0.18,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <motion.div
                    animate={reduced ? undefined : { y: [0, -3, 0] }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
                      {s.label}
                    </div>
                    <div className="mt-1 font-display text-[14px] font-semibold text-[var(--color-primary)]">
                      {s.value}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ResultBlockProps {
  result: Extract<
    (typeof siteConfig.aiShowcase.sequence)[number],
    { kind: "result" }
  >;
}

function ResultBlock({ result }: ResultBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="mt-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated)]/80 p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-caption font-medium text-[var(--color-primary)]">
          {result.title}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] text-[var(--color-success)]">
          <span className="size-1.5 rounded-full bg-[var(--color-success)]" />
          Complete
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {result.rows.map((row, i) => {
          const TrendIcon = row.trend === "up" ? TrendingUp : TrendingDown;
          const trendColor =
            row.trend === "up"
              ? "var(--color-warning)"
              : "var(--color-success)";
          return (
            <motion.li
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.12,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex items-center justify-between gap-4 border-b border-[var(--color-border-subtle)]/50 pb-2 last:border-0 last:pb-0"
            >
              <span className="text-[12px] text-[var(--color-secondary)]">
                {row.label}
              </span>
              <span
                className="inline-flex items-center gap-1.5 font-mono text-[13px] tabular-nums"
                style={{ color: trendColor }}
              >
                <TrendIcon size={12} />
                {row.value}
              </span>
            </motion.li>
          );
        })}
      </ul>
      <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
        {result.footnote}
      </p>
    </motion.div>
  );
}
