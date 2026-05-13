"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * LenisProvider — smooth scroll + GSAP ScrollTrigger bridge.
 *
 * Why the bridge?
 *   Lenis virtualizes the browser's scroll, while ScrollTrigger
 *   listens to native scroll events. Without integration,
 *   ScrollTrigger fires on raw scrollY (correct value, but
 *   out-of-sync with Lenis's lerped visual position), which makes
 *   pinned sections jitter or unpin a frame too late.
 *
 *   Standard fix (per Lenis + GSAP docs):
 *     1. Subscribe ScrollTrigger.update to Lenis's scroll event.
 *     2. Drive Lenis's RAF from gsap.ticker (so they share frames).
 *     3. Disable GSAP's lag smoothing (Lenis already smooths).
 *
 * Reduced-motion users still skip Lenis entirely so the OS
 * accessibility setting is honored.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      infinite: false,
    });

    function onLenisScroll() {
      ScrollTrigger.update();
    }
    lenis.on("scroll", onLenisScroll);

    function tick(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Only tear down our own bridges — let other components own
      // the lifecycle of the ScrollTriggers they create. Killing
      // them globally here would wipe pinned sections (e.g. the
      // Process horizontal scroll) when Lenis remounts on HMR.
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
