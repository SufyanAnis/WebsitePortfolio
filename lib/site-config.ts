/**
 * Single source of truth for site content.
 * Swap placeholders (marked `// TODO: replace with real handle`) when
 * the user provides their actual data.
 */

export const siteConfig = {
  brand: {
    name: "Swift Labs",
    tagline: "Digital products, engineered.",
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
   * 10 real disciplines — the studio's actual service mix.
   * Cards 9 and 10 render at double-width on lg+ so the trailing
   * row balances visually in a 4-column grid.
   */
  services: [
    {
      id: "01",
      iconKey: "web" as const,
      title: "Website Development",
      description:
        "Marketing sites, dashboards, headless storefronts. Type-safe, performant, shipped on Vercel.",
      tags: ["Next.js", "TypeScript", "Headless CMS", "E-commerce"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "02",
      iconKey: "mobile" as const,
      title: "Mobile Development",
      description:
        "Cross-platform apps that feel native. From MVP to App Store and Play Store, end to end.",
      tags: ["React Native", "Flutter", "iOS", "Android"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "03",
      iconKey: "design" as const,
      title: "UI / UX Design",
      description:
        "Interfaces that earn trust on the first scroll. Research-backed, system-driven, beautifully resolved.",
      tags: ["Figma", "Design Systems", "Prototyping", "Research"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "04",
      iconKey: "sap" as const,
      title: "SAP ABAP",
      description:
        "Enterprise SAP development. Custom modules, reports, and workflows wired into your S/4HANA landscape.",
      tags: ["S/4HANA", "ABAP OO", "BAPI / BAdI", "Fiori"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "05",
      iconKey: "jira" as const,
      title: "Jira Implementation",
      description:
        "Atlassian rollouts your team actually uses. Workflows, automations, governance, and training built in.",
      tags: ["Jira", "Confluence", "Automations", "Migration"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "06",
      iconKey: "agi" as const,
      title: "AGI Integration",
      description:
        "Production AI agents wired into your stack. Multi-model, evidence-backed, audit-ready.",
      tags: ["OpenAI", "Anthropic", "RAG", "Agents"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "07",
      iconKey: "cicd" as const,
      title: "CI / CD",
      description:
        "Pipelines that ship every commit safely. Local dev to prod, gated by automated quality checks.",
      tags: ["GitHub Actions", "Docker", "Kubernetes", "GitOps"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "08",
      iconKey: "apigee" as const,
      title: "Apigee API Integration",
      description:
        "API gateways, policies, rate limits, and analytics. Apigee end-to-end with full observability.",
      tags: ["Apigee", "OAuth2", "Mediation", "Analytics"],
      span: "lg:col-span-1" as const,
    },
    {
      id: "09",
      iconKey: "marketing" as const,
      title: "Marketing",
      description:
        "Performance marketing wired to outcomes. SEO, paid acquisition, lifecycle — instrumented and iterated weekly.",
      tags: ["SEO", "Google Ads", "Email", "CRO"],
      span: "lg:col-span-2" as const,
    },
    {
      id: "10",
      iconKey: "social" as const,
      title: "Social Media Handling",
      description:
        "Full-service social: strategy, content, community, paid. A consistent brand voice across every channel.",
      tags: ["Strategy", "Content", "Community", "Paid Social"],
      span: "lg:col-span-2" as const,
    },
  ],

  /**
   * Hero stat strip — animated counters on view. Values are
   * intentionally varied (not round) so the strip reads like
   * a real agency dashboard, not a marketing template.
   */
  stats: [
    { value: 142, suffix: "+", label: "Projects shipped", decimals: 0 },
    { value: 47, suffix: "+", label: "Active clients", decimals: 0 },
    { value: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
    { value: 12, suffix: "h", label: "Avg response", decimals: 0 },
  ],

  /**
   * Portfolio bento — 9 case studies. The featured card runs a
   * live kanban animation; every other card uses a real photo
   * (tailored Pollinations prompt per case) with a kind badge
   * and dark gradient overlay so they read as editorial work
   * cards rather than stock-photo wallpaper.
   *
   * Span values target a 12-column grid; rows balance to 12.
   */
  portfolio: [
    {
      slug: "enterprise-pm",
      kind: "featured-kanban" as const,
      title: "Enterprise PM System",
      client: "Confidential SaaS · US",
      blurb:
        "A drop-in project-management workspace for distributed engineering teams.",
      tags: ["Next.js", "Postgres", "Realtime"],
      span: "col-span-12 lg:col-span-7 row-span-2",
      image: "",
    },
    {
      slug: "shopify-headless",
      kind: "shopify" as const,
      title: "Shopify Headless Build",
      client: "DTC Skincare · IE",
      blurb:
        "Headless Hydrogen storefront with sub-1s LCP, full motion and live cart.",
      tags: ["Shopify", "Hydrogen", "Edge"],
      span: "col-span-12 sm:col-span-6 lg:col-span-5",
      image:
        "https://image.pollinations.ai/prompt/Editorial%20product%20photography%20premium%20amber%20glass%20skincare%20bottles%20arranged%20on%20dark%20marble%20surface%20moody%20studio%20lighting%20magazine%20quality?width=1200&height=800&seed=11&nologo=true",
    },
    {
      slug: "lms-platform",
      kind: "lms" as const,
      title: "Adaptive LMS Platform",
      client: "EdTech · AU",
      blurb:
        "Personalised learning paths driven by an evaluator agent and weekly retros.",
      tags: ["Next.js", "OpenAI", "Stripe"],
      span: "col-span-12 sm:col-span-6 lg:col-span-5",
      image:
        "https://image.pollinations.ai/prompt/Modern%20minimalist%20online%20learning%20workspace%20laptop%20screen%20glowing%20interface%20dark%20wooden%20desk%20notebook%20cinematic?width=1200&height=800&seed=22&nologo=true",
    },
    {
      slug: "fintech-portal",
      kind: "fintech" as const,
      title: "Fintech Onboarding",
      client: "Regulated Fintech · US",
      blurb: "KYC-aware onboarding cutting drop-off by 41 %.",
      tags: ["KYC", "Stripe", "Audit"],
      span: "col-span-12 sm:col-span-6 lg:col-span-4",
      image:
        "https://image.pollinations.ai/prompt/Hands%20holding%20smartphone%20displaying%20sleek%20banking%20app%20dark%20navy%20gradient%20minimalist%20premium%20fintech%20photography?width=1200&height=800&seed=33&nologo=true",
    },
    {
      slug: "ai-copilot",
      kind: "aichat" as const,
      title: "AI Financial Copilot",
      client: "Wealth Platform · US",
      blurb:
        "Conversational analytics over six years of transaction history with audit logs.",
      tags: ["RAG", "Anthropic", "Vector DB"],
      span: "col-span-12 lg:col-span-8",
      image:
        "https://image.pollinations.ai/prompt/Abstract%20glowing%20neural%20network%20visualization%20cinematic%20blue%20particles%20dark%20gradient%20technology%20artificial%20intelligence%20concept?width=1600&height=900&seed=44&nologo=true",
    },
    {
      slug: "shopify-plus",
      kind: "shopify" as const,
      title: "Multi-Store Shopify Plus",
      client: "Retail Group · AU",
      blurb:
        "Eight regional Shopify Plus storefronts on one Hydrogen monorepo with shared design tokens.",
      tags: ["Shopify Plus", "Monorepo", "Hydrogen"],
      span: "col-span-12 sm:col-span-6 lg:col-span-7",
      image:
        "https://image.pollinations.ai/prompt/Modern%20flagship%20retail%20boutique%20interior%20warm%20pendant%20lighting%20dark%20moody%20atmospheric%20premium%20brand%20store%20wide%20angle?width=1600&height=900&seed=55&nologo=true",
    },
    {
      slug: "jira-rollout",
      kind: "jira" as const,
      title: "Jira Rollout · 400 Seats",
      client: "Logistics · IE",
      blurb:
        "Greenfield Jira + Confluence rollout with custom workflows and SSO across 12 teams.",
      tags: ["Jira", "Confluence", "SSO"],
      span: "col-span-12 sm:col-span-6 lg:col-span-5",
      image:
        "https://image.pollinations.ai/prompt/Modern%20technology%20team%20sprint%20planning%20whiteboard%20sticky%20notes%20kanban%20board%20dark%20moody%20office%20cinematic?width=1200&height=800&seed=66&nologo=true",
    },
    {
      slug: "rightnow-crm",
      kind: "rightnow" as const,
      title: "RightNow Application",
      client: "Telecom · US",
      blurb:
        "Oracle RightNow customisation + handoff workflows wired into the agent desktop.",
      tags: ["Oracle", "RightNow", "Workflows"],
      span: "col-span-12 sm:col-span-6 lg:col-span-5",
      image:
        "https://image.pollinations.ai/prompt/Professional%20customer%20service%20agent%20wearing%20headset%20multiple%20monitors%20dark%20modern%20workstation%20ambient%20lighting%20cinematic?width=1200&height=800&seed=77&nologo=true",
    },
    {
      slug: "apigee-gateway",
      kind: "apigee" as const,
      title: "Apigee API Gateway",
      client: "Banking · US",
      blurb:
        "End-to-end Apigee mediation, rate-limit policies, and observability for 14 partner APIs.",
      tags: ["Apigee", "OAuth2", "Analytics"],
      span: "col-span-12 sm:col-span-6 lg:col-span-7",
      image:
        "https://image.pollinations.ai/prompt/Abstract%20futuristic%20API%20network%20technology%20glowing%20connection%20lines%20nodes%20dark%20gradient%20cyber%20infrastructure?width=1600&height=900&seed=88&nologo=true",
    },
  ],

  /**
   * Social + contact. All currently placeholders — user will replace.
   */
  contact: {
    // TODO: replace with real address
    email: "hello@swiftlabs.dev",
    // Display + linked location for footer
    city: "Karachi, Pakistan",
  },

  socials: [
    // TODO: replace placeholder href values once user confirms handles
    {
      key: "whatsapp",
      label: "WhatsApp",
      handle: "+92 300 0000000",
      href: "https://wa.me/923000000000",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      handle: "swift-labs",
      href: "https://linkedin.com/company/swift-labs",
    },
    {
      key: "instagram",
      label: "Instagram",
      handle: "@swiftlabs",
      href: "https://instagram.com/swiftlabs",
    },
    {
      key: "x",
      label: "X",
      handle: "@swiftlabs",
      href: "https://x.com/swiftlabs",
    },
    {
      key: "github",
      label: "GitHub",
      handle: "swift-labs",
      href: "https://github.com/swift-labs",
    },
    {
      key: "dribbble",
      label: "Dribbble",
      handle: "swiftlabs",
      href: "https://dribbble.com/swiftlabs",
    },
    {
      key: "behance",
      label: "Behance",
      handle: "swiftlabs",
      href: "https://behance.net/swiftlabs",
    },
    {
      key: "youtube",
      label: "YouTube",
      handle: "@swiftlabs",
      href: "https://youtube.com/@swiftlabs",
    },
  ],

  nav: [
    { label: "Work", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  /**
   * Process — pinned horizontal scroll. 5 frames.
   */
  process: [
    {
      id: "01",
      title: "Discovery",
      blurb:
        "We learn your business before we recommend anything. Calls, audits, customer interviews.",
      bullets: [
        "Stakeholder + customer interviews",
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
        "Hiring + skills gap recommendations",
      ],
    },
    {
      id: "03",
      title: "Design",
      blurb:
        "Systems before screens. Tokens, components, motion principles — then the product.",
      bullets: [
        "Design tokens + Figma libraries",
        "Lo-fi wireframes through hi-fi flows",
        "Motion + interaction principles",
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
        "Trunk-based dev + CI on every PR",
        "Observability built in, not bolted on",
        "Production-ready from sprint one",
      ],
    },
    {
      id: "05",
      title: "Launch",
      blurb:
        "Soft launch, monitor, ramp, optimise. You own the codebase and the operational handbook.",
      bullets: [
        "Soft launch with feature flags",
        "On-call rotation for two weeks",
        "Runbook + retro before handover",
        "Growth instrumentation from day zero",
      ],
    },
  ],

  /**
   * AI showcase — canned response sequence shown after the user
   * submits any prompt. Used by the Typewriter primitive.
   */
  testimonials: [
    {
      quote:
        "Swift Labs replaced our six-person agency with three engineers and shipped twice as fast. Their AI strategy alone paid for the engagement in a quarter.",
      name: "Daniel R.",
      role: "VP Engineering",
      company: "Series-B SaaS",
      country: "US",
      initials: "DR",
    },
    {
      quote:
        "The team's design polish is the closest I've seen to Linear or Vercel — coming from a Karachi studio that quotes a fraction of the bill.",
      name: "Aoife K.",
      role: "Founder",
      company: "Healthcare Startup",
      country: "IE",
      initials: "AK",
    },
    {
      quote:
        "They led the discovery, designed the system, shipped the build, and stuck around for two weeks of on-call. No agency we'd worked with had ever done all four.",
      name: "Marcus L.",
      role: "CTO",
      company: "E-commerce Brand",
      country: "AU",
      initials: "ML",
    },
    {
      quote:
        "The AI copilot they built reads our six years of transaction history and answers compliance questions in seconds. Audit logs included. Our legal team approved it without changes.",
      name: "Priya S.",
      role: "Head of Product",
      company: "Wealth Platform",
      country: "US",
      initials: "PS",
    },
    {
      quote:
        "They pushed back on three features we thought we needed and saved us six weeks of build. Honest engineering is rarer than good engineering, and they delivered both.",
      name: "Tom B.",
      role: "Founder & CEO",
      company: "Fintech",
      country: "IE",
      initials: "TB",
    },
    {
      quote:
        "Fastest mobile MVP we've ever shipped. Twelve weeks from a single Figma frame to two-store launch with crash-free 99.9 % from week one.",
      name: "Jordan H.",
      role: "Product Lead",
      company: "Consumer App",
      country: "AU",
      initials: "JH",
    },
  ],

  pricing: [
    {
      tier: "Starter",
      price: 999,
      priceLabel: "$999",
      cadence: "per project",
      blurb: "A single focused engagement. Perfect for a landing page or a contained MVP.",
      features: [
        "1 senior engineer + designer",
        "2-week scoped sprint",
        "Source code + tokens",
        "Vercel deployment",
        "30-day bug warranty",
      ],
      cta: "Start small",
      featured: false,
    },
    {
      tier: "Growth",
      price: 3499,
      priceLabel: "$3,499",
      cadence: "per month",
      blurb: "Our standard engagement. A dedicated pod for fast-moving product teams.",
      features: [
        "Dedicated 3-person pod",
        "Weekly demos, biweekly retros",
        "Design + engineering + AI",
        "Observability + on-call",
        "Quarterly strategy review",
        "Slack-shared workspace",
      ],
      cta: "Get going",
      featured: true,
      badge: "Most popular",
    },
    {
      tier: "Enterprise",
      price: 0,
      priceLabel: "Custom",
      cadence: "scoped to fit",
      blurb: "Multi-team programs and platform-level work. MSA + SOWs.",
      features: [
        "Multi-pod, multi-discipline",
        "Embedded with your team",
        "Compliance + DPA support",
        "24/7 incident response",
        "Quarterly business reviews",
        "Bring-your-own auditors",
      ],
      cta: "Talk to us",
      featured: false,
    },
  ],

  faq: [
    {
      q: "How long does a typical project take?",
      a: "Landing pages: 2–4 weeks. Mobile or web MVPs: 8–14 weeks. Multi-platform programs: 3–9 months. Every engagement starts with a fixed-fee discovery sprint so the bigger timelines have a tight scope and a real budget behind them.",
    },
    {
      q: "How does payment work?",
      a: "We invoice every two weeks against a signed SOW. Wire, ACH, and Stripe accepted. We do not require upfront deposits for engagements above $20k once an MSA is in place — your accounts team should appreciate the trail.",
    },
    {
      q: "How do you communicate during a build?",
      a: "Shared Slack workspace + Linear board + weekly Loom demos. Every Friday we ship a short video summarizing what we built, what changed, and what's coming next. Calendar-bookable if you'd rather see it live.",
    },
    {
      q: "Who owns the code, the design, and the AI agents?",
      a: "You do, in full, the moment we ship. We retain the right to reference the work in case studies and Awwwards submissions unless you've asked us not to. Nothing is locked behind our infrastructure — your repos, your accounts, your tokens.",
    },
    {
      q: "What does support look like after launch?",
      a: "Every Growth engagement includes two weeks of post-launch on-call. After that we offer 4-hour, 8-hour, or 24-hour response SLAs as separate retainers. Or you take it from there — we'll have shipped a runbook that an in-house team can pick up cleanly.",
    },
    {
      q: "What if we're not satisfied?",
      a: "We're a small studio — we lose more from a bad reference than we gain from one wrong sprint. If a sprint misses what you expected, we re-do the work at our cost. We've not had to invoke that clause in years, but it's there and it's real.",
    },
  ],

  aiShowcase: {
    placeholder: "Try: Analyze our Q3 revenue and surface the three biggest risks",
    sequence: [
      { kind: "status" as const, text: "Connecting to data sources…" },
      {
        kind: "status" as const,
        text: "Analyzing 4,287 records across 12 dimensions…",
      },
      { kind: "status" as const, text: "Cross-referencing with industry benchmarks…" },
      { kind: "status" as const, text: "Generating insights…" },
      {
        kind: "result" as const,
        title: "Q3 — three highest-impact risks",
        rows: [
          { label: "Churn concentrated in mid-market tier", value: "+42%", trend: "up" as const },
          { label: "Pipeline coverage Q4", value: "0.9x", trend: "down" as const },
          { label: "Time-to-onboard creeping", value: "11.4d", trend: "up" as const },
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
} as const;

export type ServiceIconKey = (typeof siteConfig.services)[number]["iconKey"];
