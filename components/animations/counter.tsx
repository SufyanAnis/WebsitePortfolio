interface CounterProps {
  to: number;
  /** Decimal places for the rendered number */
  decimals?: number;
  className?: string;
  /** Prefix string (e.g. "$") */
  prefix?: string;
  /** Suffix string (e.g. "+" or "hr") */
  suffix?: string;
  /** @deprecated kept for prop-compat with the previous animated counter */
  duration?: number;
}

/**
 * Counter — renders the final value directly.
 *
 * The previous version animated from 0 to `to`, but the count-up
 * meant the SSR HTML always shipped with "0" and only became the
 * real number after JS hydration. The QA reviewer (and any crawler,
 * any user on a slow connection, anyone whose JS hadn't run yet)
 * saw the hero scorecard as "0+ projects, 0+ clients, 0.0/5, 0h" —
 * the worst possible first impression.
 *
 * The fix is simple and reliable: render the final value at SSR.
 * Always. No animation, no IntersectionObserver dependency, no
 * setTimeout safety net needed. The page already has plenty of
 * motion; the stats are a credibility signal, not eye candy.
 */
export function Counter({
  to,
  decimals = 0,
  className,
  prefix = "",
  suffix = "",
}: CounterProps) {
  return (
    <span className={className}>
      {prefix}
      {to.toFixed(decimals)}
      {suffix}
    </span>
  );
}
