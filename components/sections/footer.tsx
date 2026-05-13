"use client";

import { motion } from "motion/react";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site-config";

/**
 * Footer — three-column layout with brand + socials, services
 * list, and a company list. Bottom row carries the copyright
 * and the "Built with care in Karachi ⌁" line. The bolt at the
 * end is the same animated SVG from the Logo (hover rotates it).
 */
export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border-subtle)] bg-[var(--color-elevated)] px-6 py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[var(--container-full)]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-20">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="text-body max-w-[36ch] text-[var(--color-secondary)]">
              A studio of engineers and designers shipping web, mobile, and AI
              products for ambitious teams worldwide.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-base)] px-3 py-1.5 text-[11px] font-medium tracking-wide text-[var(--color-tertiary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-primary)]"
                  data-cursor="link"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div className="flex flex-col gap-4">
            <span className="text-micro text-[var(--color-tertiary)]">
              Services
            </span>
            <ul className="flex flex-col gap-2">
              {siteConfig.services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-body text-[var(--color-secondary)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="flex flex-col gap-4">
            <span className="text-micro text-[var(--color-tertiary)]">
              Company
            </span>
            <ul className="flex flex-col gap-2">
              {[
                { label: "About", href: "#hero" },
                { label: "Work", href: "#portfolio" },
                { label: "Process", href: "#process" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-body text-[var(--color-secondary)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-[var(--color-border-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-caption text-[var(--color-tertiary)]">
            © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
          </span>
          <span className="text-caption inline-flex items-center gap-1 text-[var(--color-tertiary)]">
            Built with care in {siteConfig.contact.city}
            <motion.svg
              viewBox="0 0 24 32"
              className="h-3 w-auto text-[var(--color-accent)]"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              aria-hidden="true"
            >
              <path
                d="M14 0 L2 18 L10 18 L10 32 L22 14 L14 14 Z"
                fill="currentColor"
              />
            </motion.svg>
          </span>
        </div>
      </div>
    </footer>
  );
}
