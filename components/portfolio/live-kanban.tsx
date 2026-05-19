"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Priority = "low" | "med" | "high";
interface Ticket {
  id: string;
  title: string;
  priority: Priority;
}

const COLUMNS = ["Backlog", "In Progress", "Review", "Shipped"] as const;
type Column = (typeof COLUMNS)[number];

const PRIORITY_COLOR: Record<Priority, string> = {
  low: "var(--color-success)",
  med: "var(--color-warning)",
  high: "#ef4444",
};

const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  med: "Med",
  high: "High",
};

const INITIAL: Record<Column, Ticket[]> = {
  Backlog: [
    { id: "SWL-118", title: "Settings dashboard", priority: "med" },
    { id: "SWL-121", title: "Stripe refund webhooks", priority: "high" },
    { id: "SWL-124", title: "Localize marketing (DE)", priority: "low" },
  ],
  "In Progress": [
    { id: "SWL-112", title: "Presence cursors", priority: "high" },
    { id: "SWL-115", title: "Org audit log", priority: "med" },
  ],
  Review: [
    { id: "SWL-108", title: "Postgres 16 + RLS", priority: "high" },
  ],
  Shipped: [
    { id: "SWL-099", title: "Slack notifications", priority: "med" },
    { id: "SWL-101", title: "SAML SSO", priority: "high" },
  ],
};

/**
 * LiveKanban — mini Jira-style board with auto-migrating tickets.
 *
 * Layout:
 *   - 4 equal-width columns with `grid-cols-4`. Headers are
 *     anchored to the column top via `flex flex-col`.
 *   - Each column has a min-height tied to the column count so
 *     short columns don't collapse and look broken.
 *   - Tickets use `layoutId` so Framer Motion animates the
 *     migration smoothly across column boundaries.
 *
 * Performance:
 *   - Migration timer is gated by `useInView` — it stops when the
 *     section is scrolled off-screen.
 */
export function LiveKanban() {
  const [board, setBoard] = useState(INITIAL);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10%" });

  useEffect(() => {
    if (reduced || !inView) return;
    const tick = setInterval(() => {
      setBoard((prev) => {
        for (let i = 0; i < COLUMNS.length - 1; i++) {
          const from = COLUMNS[i];
          const to = COLUMNS[i + 1];
          if (prev[from].length > 0) {
            const [moving, ...rest] = prev[from];
            const next = { ...prev };
            next[from] = rest;
            next[to] = [moving, ...prev[to]];
            if (next.Shipped.length > 4) {
              next.Shipped = next.Shipped.slice(0, 4);
            }
            if (i === COLUMNS.length - 2 && next.Shipped.length === 4) {
              const recycled = {
                ...next.Shipped[3],
                id:
                  "SWL-" +
                  String(125 + Math.floor(Math.random() * 30)).padStart(3, "0"),
              };
              next.Shipped = next.Shipped.slice(0, 3);
              next.Backlog = [...next.Backlog, recycled];
            }
            return next;
          }
        }
        return prev;
      });
    }, 3600);
    return () => clearInterval(tick);
  }, [reduced, inView]);

  return (
    <div ref={ref} className="grid h-full grid-cols-4 gap-2">
      {COLUMNS.map((col) => (
        <div
          key={col}
          className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-base)]"
        >
          {/* Column header */}
          <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-2.5 py-2">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
              {col}
            </span>
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-[var(--color-elevated)] text-[9px] tabular-nums text-[var(--color-tertiary)]">
              {board[col].length}
            </span>
          </div>

          {/* Tickets */}
          <motion.div
            layout
            className="flex flex-1 flex-col gap-1.5 overflow-hidden p-1.5"
          >
            <AnimatePresence initial={false}>
              {board[col].map((ticket) => (
                <motion.div
                  key={ticket.id}
                  layout
                  layoutId={ticket.id}
                  initial={{ opacity: 0, scale: 0.96, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tabular-nums text-[var(--color-tertiary)]">
                      {ticket.id}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-[8px] uppercase tracking-wider"
                      style={{ color: PRIORITY_COLOR[ticket.priority] }}
                    >
                      <span
                        className="size-1 rounded-full"
                        style={{ background: PRIORITY_COLOR[ticket.priority] }}
                      />
                      {PRIORITY_LABEL[ticket.priority]}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[var(--color-secondary)]">
                    {ticket.title}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
