"use client";

import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Calendar,
  Check,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/animations/split-text";
import { Magnetic } from "@/components/animations/magnetic";
import { siteConfig, nextAvailableQuarter } from "@/lib/site-config";

/**
 * CTA — full-viewport closing section.
 *
 * Now ships with a structured intake form (per QA recommendation):
 * name, company, email, project type, budget, timeline. Cold-
 * draft email is no longer the only way in.
 *
 * Contact channel cards are conditionally rendered: each card is
 * shown only when its corresponding env var has a value. Nothing
 * fake ships if a channel isn't wired yet.
 */
export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-5%" });
  // Client-only quarter computation to avoid hydration mismatch.
  const [availability, setAvailability] = useState<string>("");
  useEffect(() => {
    setAvailability(nextAvailableQuarter());
  }, []);

  const cards = [
    siteConfig.contact.email
      ? {
          label: "Email",
          value: siteConfig.contact.email,
          href: `mailto:${siteConfig.contact.email}`,
          icon: Mail,
        }
      : null,
    siteConfig.contact.whatsapp && siteConfig.contact.whatsappHref
      ? {
          label: "WhatsApp",
          value: siteConfig.contact.whatsapp,
          href: siteConfig.contact.whatsappHref,
          icon: MessageCircle,
        }
      : null,
    siteConfig.contact.calendly
      ? {
          label: "Calendly",
          value: "Book a 30-minute intro",
          href: siteConfig.contact.calendly,
          icon: Calendar,
        }
      : null,
  ].filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-32 lg:px-12"
    >
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

      <div className="flex w-full flex-col items-center gap-12 text-center">
        <span className="text-micro text-[var(--color-tertiary)]">
          Let's talk
        </span>

        <h2 className="text-display-l max-w-[14ch] lg:text-display-xl">
          <SplitText text={"Let's build\nsomething\nextraordinary."} />
        </h2>

        <p className="text-body-l max-w-[600px] text-[var(--color-secondary)]">
          Discovery sprints start at {siteConfig.pricing.discoveryFrom}.{" "}
          {availability
            ? `The next opening is ${availability}.`
            : "Open for new projects."}{" "}
          Send a short brief below and you'll have a written reply within 12
          hours on weekdays.
        </p>

        {cards.length > 0 && (
          <div className="grid w-full max-w-[820px] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
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
        )}

        <ContactForm />
      </div>
    </section>
  );
}

/**
 * Structured contact intake form — name, company, email, project
 * type, budget band, timeline, message.
 *
 * The submit handler currently shows a success state on the
 * client only. Wire up to /api/lead in Phase 8 (Vercel
 * serverless function that forwards to your inbox or a CRM).
 */
function ContactForm() {
  const [state, setState] = useState<{
    submitting: boolean;
    sent: boolean;
    error: string | null;
  }>({ submitting: false, sent: false, error: null });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      projectType: String(fd.get("projectType") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      timeline: String(fd.get("timeline") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    if (!payload.email.includes("@") || !payload.name.trim()) {
      setState({
        submitting: false,
        sent: false,
        error: "Please enter your name and a valid email.",
      });
      return;
    }
    setState({ submitting: true, sent: false, error: null });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        setState({
          submitting: false,
          sent: false,
          error: data.error ?? "Could not send right now. Please email directly.",
        });
        return;
      }
      setState({ submitting: false, sent: true, error: null });
    } catch {
      setState({
        submitting: false,
        sent: false,
        error: "Network error. Please try again or email directly.",
      });
    }
  }

  if (state.sent) {
    return (
      <div className="flex w-full max-w-[640px] flex-col items-center gap-3 rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-base)]/60 p-8 backdrop-blur-md">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
          <Check size={18} />
        </span>
        <h3 className="text-heading text-[var(--color-primary)]">
          Brief received.
        </h3>
        <p className="text-body text-[var(--color-secondary)]">
          You'll have a written reply within 12 hours on weekdays.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid w-full max-w-[760px] grid-cols-1 gap-3 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-glass)] p-5 text-left backdrop-blur-md sm:p-6 md:grid-cols-2"
    >
      <Field
        name="name"
        label="Your name"
        placeholder="Sara Chen"
        required
      />
      <Field
        name="company"
        label="Company"
        placeholder="Acme Inc."
      />
      <Field
        name="email"
        type="email"
        label="Email"
        placeholder="you@company.com"
        required
      />
      <Select
        name="projectType"
        label="Project type"
        options={[
          "Web build",
          "Mobile app",
          "AI integration",
          "Enterprise (SAP / Apigee / Jira)",
          "Design system",
          "Other",
        ]}
      />
      <Select
        name="budget"
        label="Budget range"
        options={[
          "Under $10k",
          "$10k – $25k",
          "$25k – $75k",
          "$75k – $200k",
          "$200k+",
        ]}
      />
      <Select
        name="timeline"
        label="Timeline"
        options={[
          "Within 2 weeks",
          "1 – 2 months",
          "2 – 6 months",
          "6+ months",
          "Exploring",
        ]}
      />
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
          Tell us about the project
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="A paragraph or two on the goal, the constraints, anything we should know..."
          className="resize-none rounded-xl border border-[var(--color-border-default)] bg-[var(--color-base)]/60 px-4 py-3 text-[14px] text-[var(--color-primary)] placeholder:text-[var(--color-tertiary)] focus:border-[var(--color-accent)]/50 focus:outline-none"
        />
      </div>

      {state.error && (
        <p className="text-[12px] text-red-400 md:col-span-2">{state.error}</p>
      )}

      <div className="flex flex-col items-stretch gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[var(--color-tertiary)]">
            Your details stay private. No newsletters, ever.
          </span>
          <span className="text-[11px] text-[var(--color-tertiary)]/80">
            Written reply within 12 hours on weekdays.
          </span>
        </div>
        <button
          type="submit"
          disabled={state.submitting}
          className="inline-flex items-center justify-center gap-2 self-stretch rounded-full bg-[var(--color-accent)] px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {state.submitting ? "Sending..." : "Send brief"}
          <ArrowRight size={15} />
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-base)]/60 px-4 py-3 text-[14px] text-[var(--color-primary)] placeholder:text-[var(--color-tertiary)] focus:border-[var(--color-accent)]/50 focus:outline-none"
      />
    </div>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-tertiary)]">
        {label}
      </label>
      <select
        name={name}
        className="appearance-none rounded-xl border border-[var(--color-border-default)] bg-[var(--color-base)]/60 px-4 py-3 text-[14px] text-[var(--color-primary)] focus:border-[var(--color-accent)]/50 focus:outline-none"
      >
        <option value="">Pick one</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
