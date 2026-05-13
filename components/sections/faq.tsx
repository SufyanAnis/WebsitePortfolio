"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SplitText } from "@/components/animations/split-text";
import { siteConfig } from "@/lib/site-config";

/**
 * FAQ — custom accordion (no shadcn install dependency). Smooth
 * height animation on open/close, plus icon rotates to X. Open
 * item gains an accent left border.
 *
 * One open at a time keeps the section vertically calm.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
    >
      <div className="mx-auto grid max-w-[var(--container-full)] grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-micro text-[var(--color-tertiary)]">
            FAQ
          </span>
          <h2 className="text-display-m max-w-[12ch]">
            <SplitText text={"Frequently\nasked."} />
          </h2>
          <p className="text-body-l max-w-[360px] text-[var(--color-secondary)]">
            Six of the questions we get every week. Email anything that's not
            here and you'll have an answer within 48 hours.
          </p>
        </div>

        <ul className="flex flex-col">
          {siteConfig.faq.map((item, i) => (
            <FaqRow
              key={item.q}
              q={item.q}
              a={item.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

interface RowProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqRow({ q, a, isOpen, onToggle }: RowProps) {
  return (
    <li
      className={`border-b border-[var(--color-border-subtle)] transition-colors duration-300 ${
        isOpen ? "border-l-2 border-l-[var(--color-accent)]" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-2 py-6 text-left text-heading transition-colors hover:text-[var(--color-primary)] lg:px-6"
      >
        <span className="text-[18px] font-medium text-[var(--color-primary)] lg:text-[20px]">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="shrink-0 text-[var(--color-tertiary)]"
        >
          <Plus size={20} strokeWidth={1.6} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="px-2 pb-6 pr-12 text-body-l text-[var(--color-secondary)] lg:px-6">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
