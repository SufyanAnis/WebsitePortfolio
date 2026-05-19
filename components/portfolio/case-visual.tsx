"use client";

/**
 * CaseVisual — designed SVG mockups, one per case-study type.
 *
 * Per QA report recommendation: real product screenshots or
 * branded typographic cards beat AI-generated photography for
 * credibility. The Enterprise PM live kanban remains the gold-
 * standard template; the other cases each get a tailored
 * product-surface mockup (browser chrome, dashboard, chat UI,
 * static kanban, CRM desktop, API gateway).
 *
 * No external requests, no third-party image hosts, fully
 * static at render time.
 */

export type CaseKind =
  | "shopify"
  | "shopify-plus"
  | "lms"
  | "fintech"
  | "aichat"
  | "jira"
  | "rightnow"
  | "apigee";

const COMMON = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 400 300",
  preserveAspectRatio: "xMidYMid slice",
} as const;

/** Reusable browser/window chrome bar. */
function WindowChrome({ url }: { url: string }) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="28" fill="#0e0e0e" />
      <line x1="0" y1="28" x2="400" y2="28" stroke="rgba(255,255,255,0.06)" />
      {[10, 22, 34].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy="14"
          r="3"
          fill="rgba(255,255,255,0.12)"
        />
      ))}
      <rect
        x="80"
        y="8"
        width="240"
        height="12"
        rx="6"
        fill="rgba(255,255,255,0.04)"
      />
      <text
        x="92"
        y="17"
        fontSize="7"
        fill="rgba(255,255,255,0.45)"
        fontFamily="var(--font-body)"
      >
        {url}
      </text>
    </g>
  );
}

function ShopifyMockup() {
  return (
    <svg {...COMMON}>
      <rect width="400" height="300" fill="#101113" />
      <WindowChrome url="shop.studio-yara.com/all" />
      <text
        x="20"
        y="58"
        fontSize="11"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-display)"
      >
        STUDIO YARA
      </text>
      {["Shop", "Routines", "Journal", "Cart"].map((l, i) => (
        <text
          key={l}
          x={240 + i * 38}
          y="58"
          fontSize="7"
          fill="rgba(255,255,255,0.55)"
          fontFamily="var(--font-body)"
        >
          {l}
        </text>
      ))}
      <line x1="20" y1="72" x2="380" y2="72" stroke="rgba(255,255,255,0.08)" />
      <defs>
        <linearGradient id="shp-0" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9d5b5" />
          <stop offset="100%" stopColor="#7a5a3e" />
        </linearGradient>
        <linearGradient id="shp-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b9e3" />
          <stop offset="100%" stopColor="#5a4a8b" />
        </linearGradient>
        <linearGradient id="shp-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b5d8e9" />
          <stop offset="100%" stopColor="#3e6a7a" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((c) => {
        const x = 20 + c * 124;
        return (
          <g key={c}>
            <rect
              x={x}
              y="86"
              width="116"
              height="120"
              rx="6"
              fill={`url(#shp-${c})`}
            />
            <rect
              x={x}
              y="212"
              width="80"
              height="6"
              rx="2"
              fill="rgba(255,255,255,0.18)"
            />
            <rect
              x={x}
              y="224"
              width="38"
              height="6"
              rx="2"
              fill="rgba(255,255,255,0.10)"
            />
            <text
              x={x + 90}
              y="230"
              fontSize="8"
              fontWeight="600"
              fill="#fff"
              textAnchor="end"
              fontFamily="var(--font-display)"
            >
              ${(48 + c * 12).toFixed(0)}
            </text>
          </g>
        );
      })}
      <rect x="20" y="258" width="80" height="20" rx="10" fill="#1a6bff" />
      <text
        x="60"
        y="271"
        fontSize="7"
        fontWeight="600"
        fill="#fff"
        textAnchor="middle"
        fontFamily="var(--font-body)"
      >
        ADD TO BAG
      </text>
    </svg>
  );
}

/**
 * ShopifyPlusMockup — multi-region admin view. Distinct from the
 * consumer storefront (ShopifyMockup) so the two Shopify-tagged
 * case studies don't render with the same visual.
 */
function ShopifyPlusMockup() {
  const stores: {
    code: string;
    slug: string;
    rev: string;
    trend: number;
    accent: string;
  }[] = [
    { code: "US", slug: "yara.com", rev: "$42.1k", trend: 0.88, accent: "#1a6bff" },
    { code: "UK", slug: "yara.co.uk", rev: "$18.4k", trend: 0.61, accent: "#8b5cf6" },
    { code: "DE", slug: "yara.de", rev: "$12.7k", trend: 0.72, accent: "#10b981" },
    { code: "FR", slug: "yara.fr", rev: "$9.2k", trend: 0.48, accent: "#f5a623" },
    { code: "AU", slug: "yara.com.au", rev: "$22.6k", trend: 0.83, accent: "#1a6bff" },
    { code: "JP", slug: "yara.jp", rev: "$15.8k", trend: 0.66, accent: "#ef4444" },
    { code: "NL", slug: "yara.nl", rev: "$5.1k", trend: 0.34, accent: "#10b981" },
    { code: "CA", slug: "yara.ca", rev: "$8.9k", trend: 0.55, accent: "#8b5cf6" },
  ];
  return (
    <svg {...COMMON}>
      <rect width="400" height="300" fill="#0c0f14" />
      <WindowChrome url="admin.shopify-plus.com/network" />
      <text
        x="20"
        y="50"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-display)"
      >
        Store network · 8 regions
      </text>
      <text
        x="20"
        y="64"
        fontSize="7"
        fill="rgba(255,255,255,0.5)"
        fontFamily="var(--font-body)"
      >
        Today · $134.8k · 1,847 orders · 99.97% uptime
      </text>
      {stores.map((s, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 20 + col * 92;
        const y = 84 + row * 100;
        return (
          <g key={s.code}>
            <rect
              x={x}
              y={y}
              width="80"
              height="86"
              rx="4"
              fill="rgba(255,255,255,0.025)"
              stroke="rgba(255,255,255,0.08)"
            />
            {/* Region badge */}
            <rect
              x={x + 6}
              y={y + 6}
              width="22"
              height="11"
              rx="2"
              fill={s.accent}
              fillOpacity={0.2}
              stroke={s.accent}
              strokeOpacity={0.5}
            />
            <text
              x={x + 17}
              y={y + 14}
              fontSize="6"
              fontWeight="700"
              textAnchor="middle"
              fill={s.accent}
              fontFamily="var(--font-body)"
            >
              {s.code}
            </text>
            {/* Live status dot */}
            <circle cx={x + 72} cy={y + 12} r="1.8" fill="#00c97a" />
            {/* Revenue */}
            <text
              x={x + 6}
              y={y + 36}
              fontSize="10"
              fontWeight="700"
              fill="#fff"
              fontFamily="var(--font-display)"
            >
              {s.rev}
            </text>
            <text
              x={x + 6}
              y={y + 46}
              fontSize="5"
              fill="rgba(255,255,255,0.4)"
              fontFamily="var(--font-body)"
              letterSpacing="0.5"
            >
              REVENUE TODAY
            </text>
            {/* Trend bar */}
            <rect
              x={x + 6}
              y={y + 58}
              width="68"
              height="2"
              rx="1"
              fill="rgba(255,255,255,0.08)"
            />
            <rect
              x={x + 6}
              y={y + 58}
              width={s.trend * 68}
              height="2"
              rx="1"
              fill={s.accent}
            />
            {/* Slug */}
            <text
              x={x + 6}
              y={y + 76}
              fontSize="5.5"
              fill="rgba(255,255,255,0.5)"
              fontFamily="var(--font-body)"
            >
              {s.slug}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LmsMockup() {
  return (
    <svg {...COMMON}>
      <rect width="400" height="300" fill="#0f1118" />
      <WindowChrome url="learn.adaptly.app/path" />
      <text
        x="20"
        y="58"
        fontSize="11"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-display)"
      >
        Your learning path
      </text>
      <text
        x="20"
        y="72"
        fontSize="7"
        fill="rgba(255,255,255,0.5)"
        fontFamily="var(--font-body)"
      >
        12 of 24 modules · adaptive
      </text>
      {[
        { title: "ML Foundations", progress: 100, hue: "#10b981" },
        { title: "Vector Embeddings", progress: 72, hue: "#3b82f6" },
        { title: "Agent Architecture", progress: 28, hue: "#8b5cf6" },
        { title: "Eval & Telemetry", progress: 0, hue: "rgba(255,255,255,0.2)" },
      ].map((c, i) => {
        const y = 92 + i * 44;
        return (
          <g key={c.title}>
            <rect
              x="20"
              y={y}
              width="360"
              height="32"
              rx="6"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.06)"
            />
            <circle
              cx="36"
              cy={y + 16}
              r="6"
              fill={c.hue}
              fillOpacity={c.progress > 0 ? 1 : 0.3}
            />
            <text
              x="50"
              y={y + 14}
              fontSize="8"
              fontWeight="600"
              fill="#fff"
              fontFamily="var(--font-body)"
            >
              {c.title}
            </text>
            <text
              x="50"
              y={y + 24}
              fontSize="6"
              fill="rgba(255,255,255,0.4)"
              fontFamily="var(--font-body)"
            >
              {c.progress}% complete
            </text>
            <rect
              x="240"
              y={y + 14}
              width="120"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.08)"
            />
            <rect
              x="240"
              y={y + 14}
              width={(c.progress / 100) * 120}
              height="3"
              rx="1.5"
              fill={c.hue}
            />
          </g>
        );
      })}
    </svg>
  );
}

function FintechMockup() {
  return (
    <svg {...COMMON}>
      <rect width="400" height="300" fill="#0c0e14" />
      <WindowChrome url="onboard.regulus.app" />
      <text
        x="20"
        y="58"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-display)"
      >
        REGULUS
      </text>
      <text
        x="20"
        y="74"
        fontSize="7"
        fill="rgba(255,255,255,0.5)"
        fontFamily="var(--font-body)"
      >
        Step 3 of 5, Identity
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={300 + i * 14}
          cy="60"
          r="3"
          fill={i <= 2 ? "#1a6bff" : "rgba(255,255,255,0.12)"}
        />
      ))}
      {["Full legal name", "Date of birth", "Country of residence"].map(
        (label, i) => (
          <g key={label}>
            <text
              x="20"
              y={104 + i * 56}
              fontSize="6"
              fill="rgba(255,255,255,0.4)"
              fontFamily="var(--font-body)"
            >
              {label.toUpperCase()}
            </text>
            <rect
              x="20"
              y={110 + i * 56}
              width="360"
              height="28"
              rx="4"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.08)"
            />
            <rect
              x="32"
              y={122 + i * 56}
              width={[140, 80, 120][i]}
              height="5"
              rx="1.5"
              fill="rgba(255,255,255,0.55)"
            />
          </g>
        )
      )}
      <rect x="20" y="262" width="100" height="22" rx="11" fill="#1a6bff" />
      <text
        x="70"
        y="277"
        fontSize="8"
        fontWeight="600"
        fill="#fff"
        textAnchor="middle"
        fontFamily="var(--font-body)"
      >
        Continue
      </text>
    </svg>
  );
}

function AiChatMockup() {
  return (
    <svg {...COMMON}>
      <rect width="400" height="300" fill="#0c0e16" />
      <WindowChrome url="copilot.wealth-x.com" />
      <rect
        x="20"
        y="48"
        width="220"
        height="56"
        rx="10"
        fill="rgba(26,107,255,0.10)"
        stroke="rgba(26,107,255,0.30)"
      />
      <rect x="32" y="62" width="180" height="5" rx="2" fill="rgba(255,255,255,0.7)" />
      <rect x="32" y="74" width="150" height="5" rx="2" fill="rgba(255,255,255,0.5)" />
      <rect x="32" y="86" width="100" height="5" rx="2" fill="rgba(255,255,255,0.3)" />

      <rect
        x="160"
        y="118"
        width="220"
        height="36"
        rx="10"
        fill="rgba(255,255,255,0.06)"
      />
      <rect x="172" y="130" width="180" height="5" rx="2" fill="rgba(255,255,255,0.7)" />
      <rect x="172" y="142" width="120" height="5" rx="2" fill="rgba(255,255,255,0.5)" />

      <rect
        x="20"
        y="170"
        width="360"
        height="80"
        rx="8"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.08)"
      />
      <text
        x="32"
        y="188"
        fontSize="6"
        fill="rgba(255,255,255,0.4)"
        fontFamily="var(--font-body)"
      >
        PORTFOLIO SUMMARY · 6Y
      </text>
      <path
        d="M 32 230 L 60 220 L 88 224 L 116 210 L 144 215 L 172 198 L 200 205 L 228 188 L 256 192 L 284 178 L 312 182 L 340 168 L 368 172"
        fill="none"
        stroke="#00c97a"
        strokeWidth="1.5"
      />
      <text
        x="368"
        y="200"
        fontSize="8"
        fontWeight="700"
        fill="#00c97a"
        textAnchor="end"
        fontFamily="var(--font-display)"
      >
        +24.8%
      </text>

      <rect
        x="20"
        y="264"
        width="360"
        height="24"
        rx="12"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.10)"
      />
      <text
        x="32"
        y="279"
        fontSize="7"
        fill="rgba(255,255,255,0.35)"
        fontFamily="var(--font-body)"
      >
        Ask anything about your portfolio...
      </text>
    </svg>
  );
}

function JiraMockup() {
  const cols = ["TO DO", "IN PROGRESS", "REVIEW", "DONE"] as const;
  const tickets: { col: number; id: string; w: number; pri: string }[] = [
    { col: 0, id: "LOG-410", w: 70, pri: "#ef4444" },
    { col: 0, id: "LOG-411", w: 56, pri: "#f5a623" },
    { col: 0, id: "LOG-414", w: 62, pri: "#00c97a" },
    { col: 1, id: "LOG-402", w: 50, pri: "#ef4444" },
    { col: 1, id: "LOG-408", w: 62, pri: "#f5a623" },
    { col: 2, id: "LOG-398", w: 70, pri: "#ef4444" },
    { col: 3, id: "LOG-385", w: 52, pri: "#00c97a" },
    { col: 3, id: "LOG-389", w: 60, pri: "#f5a623" },
  ];
  return (
    <svg {...COMMON}>
      <rect width="400" height="300" fill="#0d0f14" />
      <WindowChrome url="logistix.atlassian.net/jira/board/LOG" />
      <text
        x="20"
        y="58"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-display)"
      >
        LOG · Sprint 14
      </text>
      {cols.map((col, ci) => {
        const x = 20 + ci * 94;
        return (
          <g key={col}>
            <rect
              x={x}
              y="76"
              width="88"
              height="200"
              rx="4"
              fill="rgba(255,255,255,0.025)"
              stroke="rgba(255,255,255,0.07)"
            />
            <text
              x={x + 8}
              y="92"
              fontSize="6"
              fontWeight="600"
              fill="rgba(255,255,255,0.55)"
              fontFamily="var(--font-body)"
              letterSpacing="0.5"
            >
              {col}
            </text>
            <text
              x={x + 80}
              y="92"
              fontSize="6"
              fill="rgba(255,255,255,0.35)"
              textAnchor="end"
              fontFamily="var(--font-body)"
            >
              {tickets.filter((t) => t.col === ci).length}
            </text>
            {tickets
              .filter((t) => t.col === ci)
              .map((t, ti) => (
                <g key={t.id}>
                  <rect
                    x={x + 6}
                    y={102 + ti * 38}
                    width="76"
                    height="32"
                    rx="3"
                    fill="rgba(255,255,255,0.04)"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <circle
                    cx={x + 12}
                    cy={110 + ti * 38}
                    r="1.5"
                    fill={t.pri}
                  />
                  <text
                    x={x + 17}
                    y={112 + ti * 38}
                    fontSize="5"
                    fontFamily="var(--font-body)"
                    fill="rgba(255,255,255,0.45)"
                  >
                    {t.id}
                  </text>
                  <rect
                    x={x + 12}
                    y={117 + ti * 38}
                    width={t.w}
                    height="3"
                    rx="1"
                    fill="rgba(255,255,255,0.4)"
                  />
                  <rect
                    x={x + 12}
                    y={123 + ti * 38}
                    width={t.w * 0.7}
                    height="3"
                    rx="1"
                    fill="rgba(255,255,255,0.2)"
                  />
                </g>
              ))}
          </g>
        );
      })}
    </svg>
  );
}

function RightNowMockup() {
  return (
    <svg {...COMMON}>
      <rect width="400" height="300" fill="#0f0b08" />
      <WindowChrome url="agent.telco-rn.com/case/4421" />
      <rect x="0" y="28" width="80" height="272" fill="rgba(255,255,255,0.025)" />
      {["Queue", "Cases", "Knowledge", "Contacts", "Reports"].map((l, i) => (
        <g key={l}>
          <circle
            cx="12"
            cy={56 + i * 26}
            r="3"
            fill={i === 1 ? "#f5a623" : "rgba(255,255,255,0.3)"}
          />
          <text
            x="20"
            y={59 + i * 26}
            fontSize="7"
            fill={i === 1 ? "#fff" : "rgba(255,255,255,0.45)"}
            fontFamily="var(--font-body)"
          >
            {l}
          </text>
        </g>
      ))}
      <text
        x="96"
        y="56"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-display)"
      >
        Case #4421
      </text>
      <text
        x="96"
        y="70"
        fontSize="7"
        fill="rgba(245,166,35,0.85)"
        fontFamily="var(--font-body)"
      >
        ESCALATED · 4h 22m open
      </text>
      {[
        { label: "Customer", value: "M. Bouchard" },
        { label: "Account", value: "Telco-ENT-441" },
        { label: "Tier", value: "Platinum" },
        { label: "Last contact", value: "Today, 14:08" },
      ].map((f, i) => (
        <g key={f.label}>
          <text
            x="96"
            y={100 + i * 24}
            fontSize="6"
            fill="rgba(255,255,255,0.4)"
            fontFamily="var(--font-body)"
          >
            {f.label.toUpperCase()}
          </text>
          <text
            x="200"
            y={100 + i * 24}
            fontSize="7"
            fontWeight="500"
            fill="#fff"
            fontFamily="var(--font-body)"
          >
            {f.value}
          </text>
        </g>
      ))}
      <rect x="96" y="208" width="80" height="22" rx="11" fill="#f5a623" />
      <text
        x="136"
        y="223"
        fontSize="8"
        fontWeight="600"
        fill="#0f0b08"
        textAnchor="middle"
        fontFamily="var(--font-body)"
      >
        Resolve
      </text>
      <rect
        x="184"
        y="208"
        width="80"
        height="22"
        rx="11"
        stroke="rgba(255,255,255,0.18)"
        fill="transparent"
      />
      <text
        x="224"
        y="223"
        fontSize="8"
        fontWeight="500"
        fill="rgba(255,255,255,0.85)"
        textAnchor="middle"
        fontFamily="var(--font-body)"
      >
        Escalate
      </text>
      <line
        x1="96"
        y1="252"
        x2="380"
        y2="252"
        stroke="rgba(255,255,255,0.08)"
      />
      <text
        x="96"
        y="270"
        fontSize="6"
        fill="rgba(255,255,255,0.4)"
        fontFamily="var(--font-body)"
      >
        TIMELINE
      </text>
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={120 + i * 70}
          cy="282"
          r="2"
          fill={i === 0 ? "#f5a623" : "rgba(255,255,255,0.3)"}
        />
      ))}
    </svg>
  );
}

function ApigeeMockup() {
  const partners = [
    "/identity",
    "/payments",
    "/risk",
    "/loyalty",
    "/notify",
    "/audit",
  ];
  return (
    <svg {...COMMON}>
      <rect width="400" height="300" fill="#0a0d18" />
      <WindowChrome url="apigee.bank.io/dashboard" />
      <text
        x="20"
        y="58"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-display)"
      >
        API Gateway · 14 active
      </text>
      <text
        x="20"
        y="72"
        fontSize="7"
        fill="rgba(255,255,255,0.4)"
        fontFamily="var(--font-body)"
      >
        99.97 % uptime · last 30 days
      </text>
      <circle
        cx="200"
        cy="180"
        r="32"
        fill="rgba(26,107,255,0.10)"
        stroke="#1a6bff"
      />
      <circle cx="200" cy="180" r="3" fill="#1a6bff" />
      <text
        x="200"
        y="198"
        fontSize="7"
        fontWeight="700"
        fill="#fff"
        textAnchor="middle"
        fontFamily="var(--font-display)"
      >
        GATEWAY
      </text>
      {partners.map((p, i) => {
        const angle = -Math.PI + (Math.PI / 5) * i;
        const x = 200 + Math.cos(angle) * 130;
        const y = 180 + Math.sin(angle) * 80;
        return (
          <g key={p}>
            <line
              x1="200"
              y1="180"
              x2={x}
              y2={y}
              stroke="rgba(26,107,255,0.3)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
            <rect
              x={x - 28}
              y={y - 9}
              width="56"
              height="18"
              rx="4"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.10)"
            />
            <text
              x={x}
              y={y + 3}
              fontSize="6"
              fontFamily="var(--font-body)"
              fill="rgba(255,255,255,0.7)"
              textAnchor="middle"
            >
              {p}
            </text>
          </g>
        );
      })}
      <text
        x="20"
        y="282"
        fontSize="6"
        fill="rgba(255,255,255,0.4)"
        fontFamily="var(--font-body)"
      >
        12.4M REQ/DAY · p95 84ms · 0.02% 5xx
      </text>
    </svg>
  );
}

const REGISTRY: Record<CaseKind, () => React.ReactElement> = {
  shopify: ShopifyMockup,
  "shopify-plus": ShopifyPlusMockup,
  lms: LmsMockup,
  fintech: FintechMockup,
  aichat: AiChatMockup,
  jira: JiraMockup,
  rightnow: RightNowMockup,
  apigee: ApigeeMockup,
};

export function CaseVisual({ kind }: { kind: CaseKind }) {
  const Component = REGISTRY[kind];
  return (
    /* aria-hidden: these are decorative product surface mockups.
       Screen readers should announce the case study via the parent
       card's title/blurb, not the mockup's decorative microcopy
       (URLs, ticket IDs, $48.00, +24.8% etc). Per QA #20. */
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Component />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(10,10,10,0.7))",
        }}
      />
    </div>
  );
}
