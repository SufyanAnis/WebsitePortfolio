"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic";
import { siteConfig } from "@/lib/site-config";

/**
 * Nav — fixed top. Transparent at the top of the page, gains a
 * backdrop blur + dark glass background after 50 px of scroll.
 * Each nav link is magnetic (8 px max displacement) with an
 * animated underline that scales from the left on hover.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
    >
      <motion.div
        className="absolute inset-0 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "blur(0px)",
          WebkitBackdropFilter: scrolled
            ? "blur(20px) saturate(140%)"
            : "blur(0px)",
        }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-border-default), transparent)",
          opacity: borderOpacity,
        }}
      />

      <div className="relative mx-auto flex max-w-[var(--container-full)] items-center justify-between px-6 py-4 lg:px-10">
        <Magnetic strength={4}>
          <Logo />
        </Magnetic>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Magnetic key={item.href} strength={5}>
              <a
                href={item.href}
                className="group relative inline-flex items-center text-[14px] font-medium text-[var(--color-secondary)] transition-colors duration-200 hover:text-[var(--color-primary)]"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-primary)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
                />
              </a>
            </Magnetic>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="#contact"
            size="sm"
            variant="primary"
            icon="arrow"
            magnetic={!reduced}
          >
            Start a project
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
