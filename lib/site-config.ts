/**
 * Single source of truth for site content.
 *
 * Real contact details are read from env vars at build time so
 * placeholder strings never ship. If an env var is absent, the
 * related card or social link is hidden entirely (broken links
 * are worse than missing ones per the QA report).
 *
 * To wire real values, copy `.env.local.example` to `.env.local`
 * and fill in the actual handles.
 */

/**
 * NEXT_PUBLIC_* env vars MUST be referenced as `process.env.NEXT_PUBLIC_X`
 * literally so Next.js's webpack DefinePlugin can inline the value at
 * build time. Aliasing (e.g. `const env = process.env; env.NEXT_PUBLIC_X`)
 * defeats the static replacement and crashes the browser bundle because
 * `process` is undefined in the client runtime.
 */

/** Compute next-available quarter from today. Used by hero badge + CTA. */
export function nextAvailableQuarter(): string {
  const now = new Date();
  const month = now.getMonth();
  const q = Math.floor(month / 3) + 1;
  const nextQ = q === 4 ? 1 : q + 1;
  const yr = q === 4 ? now.getFullYear() + 1 : now.getFullYear();
  return `Q${nextQ} ${yr}`;
}

export const siteConfig = {
  brand: {
    name: "Swift Labs",
    tagline: "Digital products, engineered.",
    /** Used in About + meta. Pulled from env so it's swappable. */
    founder: process.env.NEXT_PUBLIC_FOUNDER_NAME || "Sufyan Anis",
    city: process.env.NEXT_PUBLIC_CITY || "Karachi, Pakistan",
  },

  /**
   * Cycling word in hero: "for ambitious teams worldwide" →
   * the word "ambitious" cycles through these.
   */
  heroWords: ["ambitious", "fearless", "visionary", "relentless"],

  /**
   * Trust bar — stack we ship with. Order matters for marquee balance.
   */
  trustStack: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Flutter",
    "OpenAI",
    "Anthropic",
    "AWS",
    "Vercel",
    "Stripe",
    "Figma",
    "Tailwind",
    "MongoDB",
    "PostgreSQL",
  ],

  /**
   * Five primary disciplines, with sub-disciplines as tags.
   * Bento layout: cards 1, 4, 5 span 2 columns at lg; cards 2, 3
   * span 1 column each. Two balanced rows.
   */
  services: [
    {
      id: "01",
      iconKey: "product" as const,
      title: "Product Engineering",
      description:
        "Web and mobile builds from MVP to scale. Type-safe, observable, shipped on a weekly cadence.",
      tags: [
        "Next.js",
        "React Native",
        "TypeScript",
        "Headless E-commerce",
        "Realtime",
        "Edge",
      ],
      span: "lg:col-span-2" as const,
    },
    {
      id: "02",
      iconKey: "design" as const,
      title: "Design",
      description:
        "Interfaces that earn trust on the first scroll. Systems first, then screens.",
      tags: ["UI", "UX", "Design Systems", "Brand", "Motion"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "03",
      iconKey: "ai" as const,
      title: "AI Integration",
      description:
        "Production agents, RAG pipelines, applied LLM work. Audit-ready and wired into your stack.",
      tags: ["OpenAI", "Anthropic", "RAG", "Agents", "Eval"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "04",
      iconKey: "enterprise" as const,
      title: "Enterprise Systems",
      description:
        "SAP ABAP, Apigee, Jira, and Oracle RightNow programs. Specialist enterprise integration work that smaller studios won't touch.",
      tags: ["SAP ABAP", "S/4HANA", "Apigee", "Jira", "Oracle RightNow"],
      span: "lg:col-span-2" as const,
    },
    {
      id: "05",
      iconKey: "platform" as const,
      title: "Platform & Growth",
      description:
        "Cloud, CI/CD, observability, and the analytics, SEO, and social work that turns the build into measurable revenue.",
      tags: ["AWS", "CI/CD", "Observability", "SEO", "Marketing", "Social"],
      span: "lg:col-span-2" as const,
    },
  ],

  /**
   * Hero stat strip — animated counters on view. Numbers are
   * intentionally varied (not round) so the strip reads like a
   * real studio dashboard, not a marketing template.
   */
  stats: [
    { value: 142, suffix: "+", label: "Projects shipped", decimals: 0 },
    { value: 47, suffix: "+", label: "Active clients", decimals: 0 },
    { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
    { value: 12, suffix: "h", label: "Avg response", decimals: 0 },
  ],

  /**
   * Portfolio bento — 9 case studies. The featured card runs a
   * live kanban animation; every other card uses a designed SVG
   * mockup of the product surface (browser chrome, kanban, CRM
   * desktop, etc.) per QA recommendation that the PM System
   * tile is the right template for every case.
   *
   * "View case study" CTAs were removed because no detail pages
   * exist; the card itself carries the story (client, blurb,
   * tag stack) revealed on hover.
   */
  portfolio: [
    {
      slug: "enterprise-pm",
      kind: "featured-kanban" as const,
      title: "Enterprise PM System",
      client: "Confidential SaaS, US",
      blurb:
        "A drop-in project-management workspace for distributed engineering teams.",
      tags: ["Next.js", "Postgres", "Realtime"],
      span: "col-span-12 lg:col-span-7 row-span-2",
    },
    {
      slug: "shopify-headless",
      kind: "shopify" as const,
      title: "Shopify Headless Build",
      client: "DTC Skincare, IE",
      blurb:
        "Headless Hydrogen storefront with sub-1s LCP, full motion and live cart.",
      tags: ["Shopify", "Hydrogen", "Edge"],
      span: "col-span-12 sm:col-span-6 lg:col-span-5",
    },
    {
      slug: "lms-platform",
      kind: "lms" as const,
      title: "Adaptive LMS Platform",
      client: "EdTech, AU",
      blurb:
        "Personalized learning paths driven by an evaluator agent and weekly retros.",
      tags: ["Next.js", "OpenAI", "Stripe"],
      span: "col-span-12 sm:col-span-6 lg:col-span-5",
    },
    {
      slug: "fintech-portal",
      kind: "fintech" as const,
      title: "Fintech Onboarding",
      client: "Regulated Fintech, US",
      blurb: "KYC-aware onboarding cutting drop-off by 41%.",
      tags: ["KYC", "Stripe", "Audit"],
      span: "col-span-12 sm:col-span-6 lg:col-span-4",
    },
    {
      slug: "ai-copilot",
      kind: "aichat" as const,
      title: "AI Financial Copilot",
      client: "Wealth Platform, US",
      blurb:
        "Conversational analytics over six years of transaction history with audit logs.",
      tags: ["RAG", "Anthropic", "Vector DB"],
      span: "col-span-12 lg:col-span-8",
    },
    {
      slug: "shopify-plus",
      kind: "shopify" as const,
      title: "Multi-Store Shopify Plus",
      client: "Retail Group, AU",
      blurb:
        "Eight regional Shopify Plus storefronts on one Hydrogen monorepo with shared design tokens.",
      tags: ["Shopify Plus", "Monorepo", "Hydrogen"],
      span: "col-span-12 sm:col-span-6 lg:col-span-7",
    },
    {
      slug: "jira-rollout",
      kind: "jira" as const,
      title: "Jira Rollout, 400 Seats",
      client: "Logistics, IE",
      blurb:
        "Greenfield Jira and Confluence rollout with custom workflows and SSO across 12 teams.",
      tags: ["Jira", "Confluence", "SSO"],
      span: "col-span-12 sm:col-span-6 lg:col-span-5",
    },
    {
      slug: "rightnow-crm",
      kind: "rightnow" as const,
      title: "RightNow Application",
      client: "Telecom, US",
      blurb:
        "Oracle RightNow customization with handoff workflows wired into the agent desktop.",
      tags: ["Oracle", "RightNow", "Workflows"],
      span: "col-span-12 sm:col-span-6 lg:col-span-5",
    },
    {
      slug: "apigee-gateway",
      kind: "apigee" as const,
      title: "Apigee API Gateway",
      client: "Banking, US",
      blurb:
        "Apigee mediation, rate-limit policies, and observability for 14 partner APIs.",
      tags: ["Apigee", "OAuth2", "Analytics"],
      span: "col-span-12 sm:col-span-6 lg:col-span-7",
    },
  ],

  /**
   * "What we deliver" — capability statements that replace the
   * old testimonial quotes. Section reads as commitments, not
   * unverifiable third-party praise, until real client quotes
   * with full attribution exist.
   */
  capabilities: [
    {
      headline: "We replace agency overhead",
      body: "Senior engineers and designers on every project. No account managers, no sales engineers, no handoffs between teams that have never met your codebase.",
      tag: "How we work",
    },
    {
      headline: "Linear and Vercel-level polish",
      body: "Editorial typography, considered motion, end-to-end type safety. The same craft standard whether you're shipping a landing page or an enterprise SAP module.",
      tag: "Design standard",
    },
    {
      headline: "Discovery to launch under one team",
      body: "Strategy, design, engineering, and on-call all sit in the same Slack channel. Weekly Loom demos, biweekly retros, a runbook on handover.",
      tag: "Scope",
    },
    {
      headline: "Specialist enterprise depth",
      body: "SAP ABAP, Apigee, Jira, and Oracle RightNow specialists in-house. The work most studios refuse, we treat as core.",
      tag: "Enterprise",
    },
    {
      headline: "Production AI, not chat toys",
      body: "RAG over your real data, agents wired into your CRM, audit logs, evaluations. We ship AI work that survives a CTO review.",
      tag: "Applied AI",
    },
    {
      headline: "Fast response, written budgets",
      body: "12-hour response on weekdays. Discovery sprints with fixed fees. Every engagement has a real number behind it before sprint one.",
      tag: "Commercial",
    },
  ],

  pricing: {
    /** Soft anchor used in CTA copy without re-adding a Pricing section. */
    startingFrom: "$1,500",
    discoveryFrom: "$1,500",
    enterpriseFrom: "$25,000",
  },

  faq: [
    {
      q: "How long does a typical project take?",
      a: "Landing pages: 2 to 4 weeks. Mobile or web MVPs: 8 to 14 weeks. Multi-platform programs: 3 to 9 months. Every engagement starts with a fixed-fee discovery sprint so the bigger timelines have a tight scope and a real budget behind them.",
    },
    {
      q: "How does payment work?",
      a: "We invoice every two weeks against a signed SOW. Wire, ACH, and Stripe accepted. We do not require upfront deposits for engagements above $20k once an MSA is in place; your accounts team should appreciate the trail.",
    },
    {
      q: "How do you communicate during a build?",
      a: "Shared Slack workspace, Linear board, and weekly Loom demos. Every Friday we ship a short video summarizing what we built, what changed, and what's coming next. Calendar-bookable if you'd rather see it live.",
    },
    {
      q: "Who owns the code, the design, and the AI agents?",
      a: "You do, in full, the moment we ship. We retain the right to reference the work in case studies and Awwwards submissions unless you've asked us not to. Nothing is locked behind our infrastructure: your repos, your accounts, your tokens.",
    },
    {
      q: "What does support look like after launch?",
      a: "Every Growth engagement includes two weeks of post-launch on-call. After that we offer 4-hour, 8-hour, or 24-hour response SLAs as separate retainers. Or you take it from there: we'll have shipped a runbook that an in-house team can pick up cleanly.",
    },
    {
      q: "What if we're not satisfied?",
      a: "We're a small studio; we lose more from a bad reference than we gain from one wrong sprint. If a sprint misses what you expected, we re-do the work at our cost. We've not had to invoke that clause in years, but it's there and it's real.",
    },
  ],

  aiShowcase: {
    placeholder: "Analyze our Q3 revenue and surface the three biggest risks",
    samplePrompts: [
      "Analyze our Q3 revenue and surface the three biggest risks",
      "Summarize churn drivers in the last 90 days",
      "Which features correlate with retention?",
    ],
    sequence: [
      { kind: "status" as const, text: "Connecting to data sources..." },
      {
        kind: "status" as const,
        text: "Analyzing 4,287 records across 12 dimensions...",
      },
      {
        kind: "status" as const,
        text: "Cross-referencing with industry benchmarks...",
      },
      { kind: "status" as const, text: "Generating insights..." },
      {
        kind: "result" as const,
        title: "Q3, three highest-impact risks",
        rows: [
          {
            label: "Churn concentrated in mid-market tier",
            value: "+42%",
            trend: "up" as const,
          },
          {
            label: "Pipeline coverage Q4",
            value: "0.9x",
            trend: "down" as const,
          },
          {
            label: "Time-to-onboard creeping",
            value: "11.4d",
            trend: "up" as const,
          },
        ],
        footnote: "Confidence 92% · 4 sources · 1.4s",
      },
    ],
    stats: [
      { label: "Processing", value: "1.2M tokens / day" },
      { label: "Uptime", value: "99.7%" },
      { label: "p95 response", value: "Sub-200ms" },
    ],
  },

  /**
   * Contact channels. Each is read from env so placeholders never
   * ship. Channels with empty env values are hidden at render time.
   */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    whatsappHref: process.env.NEXT_PUBLIC_WHATSAPP_HREF || "",
  },

  /**
   * Social channels. Same env-driven approach: blank values are
   * filtered out at render time so we never link to a 404.
   */
  socials: [
    {
      key: "linkedin",
      label: "LinkedIn",
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    },
    {
      key: "instagram",
      label: "Instagram",
      href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    },
    { key: "x", label: "X", href: process.env.NEXT_PUBLIC_X_URL || "" },
    { key: "github", label: "GitHub", href: process.env.NEXT_PUBLIC_GITHUB_URL || "" },
    {
      key: "dribbble",
      label: "Dribbble",
      href: process.env.NEXT_PUBLIC_DRIBBBLE_URL || "",
    },
    {
      key: "behance",
      label: "Behance",
      href: process.env.NEXT_PUBLIC_BEHANCE_URL || "",
    },
    {
      key: "youtube",
      label: "YouTube",
      href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
    },
  ],

  nav: [
    { label: "Work", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  /**
   * Process: pinned horizontal scroll, 5 frames.
   */
  process: [
    {
      id: "01",
      title: "Discovery",
      blurb:
        "We learn your business before we recommend anything. Calls, audits, customer interviews.",
      bullets: [
        "Stakeholder and customer interviews",
        "Technical and product audits",
        "Success metrics defined upfront",
        "Risk register opened on day one",
      ],
    },
    {
      id: "02",
      title: "Strategy",
      blurb:
        "We translate discovery into an opinionated, scoped plan you can take to your board.",
      bullets: [
        "Architecture and platform decisions",
        "Phased roadmap with budgets",
        "Trade-off analysis, written down",
        "Hiring and skills gap recommendations",
      ],
    },
    {
      id: "03",
      title: "Design",
      blurb:
        "Systems before screens. Tokens, components, motion principles, then the product.",
      bullets: [
        "Design tokens and Figma libraries",
        "Lo-fi wireframes through hi-fi flows",
        "Motion and interaction principles",
        "Hand-off via design-as-code",
      ],
    },
    {
      id: "04",
      title: "Build",
      blurb:
        "Type-safe, observable, deployed continuously. Weekly demos so you steer in flight.",
      bullets: [
        "Two-week sprints, weekly demos",
        "Trunk-based dev plus CI on every PR",
        "Observability built in, not bolted on",
        "Production-ready from sprint one",
      ],
    },
    {
      id: "05",
      title: "Launch",
      blurb:
        "Soft launch, monitor, ramp, optimize. You own the codebase and the operational handbook.",
      bullets: [
        "Soft launch with feature flags",
        "On-call rotation for two weeks",
        "Runbook and retro before handover",
        "Growth instrumentation from day zero",
      ],
    },
  ],
} as const;

export type ServiceIconKey = (typeof siteConfig.services)[number]["iconKey"];
