"use client";

import { motion, useInView } from "motion/react";
import { ArrowRight, Mail, MessageCircle, Calendar } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { SplitText } from "@/components/animations/split-text";
import { Magnetic } from "@/components/animations/magnetic";
import { siteConfig } from "@/lib/site-config";

/**
 * CTA — full-viewport closing section.
 *
 * Background is a CSS animated mesh gradient (NOT a Three.js shader
 * — too expensive given the user's perf budget). Three layered
 * radial gradients drift independently with simple keyframe motion
 * for a slow, shifting feel.
 *
 * Three contact cards (Email / WhatsApp / Calendly) with magnetic
 * hover, plus a single email input below for lead capture.
 */
export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-5%" });
  const whatsapp = siteConfig.socials.find((s) => s.key === "whatsapp");

  const cards = [
    {
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: Mail,
    },
    {
      label: "WhatsApp",
      value: whatsapp?.handle ?? "+92 300 0000000",
      href: whatsapp?.href ?? "#",
      icon: MessageCircle,
    },
    {
      label: "Calendly",
      value: "Book a 30-minute intro",
      href: "https://cal.com/swift-labs",
      icon: Calendar,
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-32 lg:px-12"
    >
      {/* Background — animated mesh gradient via three layered
          radial gradients. Each keyframe shifts position over a
          long cycle for slow, ambient motion. */}
      <div className="absolute inset-0 -z-10 bg-[var(--color-base)]">
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(26,107,255,0.20), transparent 50%)",
          }}
          animate={
            inView
              ? { x: ["0%", "10%", "-5%", "0%"], y: ["0%", "8%", "-4%", "0%"] }
              : { x: 0, y: 0 }
          }
          transition={{
            duration: 24,
            repeat: inView ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 70%, rgba(59,130,246,0.15), transparent 55%)",
          }}
          animate={
            inView
              ? { x: ["0%", "-6%", "4%", "0%"], y: ["0%", "-5%", "6%", "0%"] }
              : { x: 0, y: 0 }
          }
          transition={{
            duration: 30,
            repeat: inView ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 100%, rgba(34,211,238,0.10), transparent 55%)",
          }}
          animate={inView ? { y: ["0%", "-8%", "0%"] } : { y: 0 }}
          transition={{
            duration: 18,
            repeat: inView ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
        {/* Faint grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-12 text-center">
        <span className="text-micro text-[var(--color-tertiary)]">
          Let's talk
        </span>

        <h2 className="text-display-l max-w-[14ch] lg:text-display-xl">
          <SplitText text={"Let's build\nsomething\nextraordinary."} />
        </h2>

        <p className="text-body-l max-w-[540px] text-[var(--color-secondary)]">
          We take on a handful of projects each quarter. The next opening is
          Q3. If your idea needs engineering, design, and AI in the same
          room, start a conversation below.
        </p>

        {/* Contact cards */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 max-w-[820px]">
          {cards.map((c) => (
            <Magnetic key={c.label} strength={5}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group block w-full rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-glass)] p-5 text-left backdrop-blur-md transition-colors duration-300 hover:border-[var(--color-accent)]/40"
                data-cursor="link"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <c.icon size={15} />
                  </span>
                  <motion.span
                    className="text-[var(--color-tertiary)] transition-colors group-hover:text-[var(--color-primary)]"
                    initial={{ x: -2, opacity: 0.4 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </div>
                <div className="mt-4 text-micro text-[var(--color-tertiary)]">
                  {c.label}
                </div>
                <div className="mt-1 text-[14px] font-medium text-[var(--color-primary)]">
                  {c.value}
                </div>
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Email capture */}
        <EmailCapture />
      </div>
    </section>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
    // Real impl would POST to /api/lead. Phase 8 work.
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[440px] items-center gap-2 rounded-full border border-[var(--color-border-default)] bg-[var(--color-glass)] p-1.5 backdrop-blur-md"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={submitted ? "Got it — we'll be in touch." : "you@company.com"}
        disabled={submitted}
        className="flex-1 bg-transparent px-4 py-2 text-[14px] text-[var(--color-primary)] placeholder:text-[var(--color-tertiary)] focus:outline-none disabled:text-[var(--color-success)]"
      />
      <button
        type="submit"
        disabled={submitted}
        className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white transition-transform hover:scale-[1.04] active:scale-[0.96] disabled:opacity-60"
        aria-label="Subscribe"
      >
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
