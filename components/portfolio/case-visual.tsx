"use client";

import Image from "next/image";

/**
 * CaseVisual — photo-based case study card.
 *
 * Renders a tailored photograph (via Next.js image optimization)
 * with a dark gradient overlay for legibility and a small kind
 * badge in the top-left ("E-COMMERCE", "FINTECH", etc.) plus a
 * pulsing "LIVE" status pill on the top-right.
 *
 * Photos are served from Pollinations AI with deterministic
 * seeds — every visitor sees the same image for each case so
 * the brand stays consistent. When real screenshots are
 * available they can be swapped in by changing the `image`
 * field in site-config.
 */

export type CaseKind =
  | "shopify"
  | "lms"
  | "fintech"
  | "aichat"
  | "jira"
  | "rightnow"
  | "apigee";

const KIND_LABEL: Record<CaseKind, string> = {
  shopify: "E-Commerce",
  lms: "Education",
  fintech: "Fintech",
  aichat: "AI",
  jira: "Internal Tools",
  rightnow: "CRM",
  apigee: "API",
};

interface CaseVisualProps {
  kind: CaseKind;
  image: string;
  alt: string;
}

export function CaseVisual({ kind, image, alt }: CaseVisualProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
        unoptimized
      />

      {/* Tint to land photos consistently in the dark theme */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.15) 45%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Kind badge — top-left */}
      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/40 px-2.5 py-1 backdrop-blur-md">
        <span className="size-1 rounded-full bg-[var(--color-accent)]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          {KIND_LABEL[kind]}
        </span>
      </div>

      {/* Live status — top-right */}
      <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/40 px-2.5 py-1 backdrop-blur-md">
        <span className="relative inline-flex">
          <span className="size-1.5 rounded-full bg-[var(--color-success)]" />
          <span
            aria-hidden
            className="absolute inset-0 size-1.5 animate-ping rounded-full bg-[var(--color-success)] opacity-60"
          />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          Live
        </span>
      </div>
    </div>
  );
}
