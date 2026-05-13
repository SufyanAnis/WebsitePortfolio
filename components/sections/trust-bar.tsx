"use client";

import { Marquee } from "@/components/animations/marquee";
import { siteConfig } from "@/lib/site-config";

/**
 * TrustBar — two rows of the trust stack scrolling in opposite
 * directions. Each "logo" is rendered as styled type at 40 %
 * opacity, ramping to 100 % on hover. Edge mask fades to bg.
 *
 * The marquee duplicates its children internally; we just hand it
 * the list and a duration.
 */
export function TrustBar() {
  const a = siteConfig.trustStack.slice(0, 8);
  const b = siteConfig.trustStack.slice(8);

  return (
    <section
      className="relative isolate py-20 lg:py-28"
      aria-label="Trusted tech stack"
    >
      <div className="mx-auto mb-10 max-w-[var(--container-full)] px-6 lg:px-12">
        <span className="text-micro text-[var(--color-tertiary)]">
          Trusted tech stack
        </span>
      </div>

      <div className="mask-edge-x flex flex-col gap-6">
        <Marquee duration={48} direction={1}>
          {a.map((name) => (
            <LogoMark key={name} name={name} />
          ))}
        </Marquee>
        <Marquee duration={56} direction={-1}>
          {b.map((name) => (
            <LogoMark key={name} name={name} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/**
 * LogoMark — typographic logo placeholder. White, semi-transparent,
 * widens to full opacity on hover. Real SVG logos can replace this
 * later without touching the marquee.
 */
function LogoMark({ name }: { name: string }) {
  return (
    <span className="text-display-m text-[var(--color-primary)] opacity-40 transition-opacity duration-300 hover:opacity-100">
      {name}
    </span>
  );
}
