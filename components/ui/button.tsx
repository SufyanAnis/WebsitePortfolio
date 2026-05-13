"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/animations/magnetic";

type Variant = "primary" | "ghost" | "outline";

interface ButtonProps extends Omit<HTMLMotionProps<"a">, "children"> {
  variant?: Variant;
  icon?: "arrow" | "play" | "none";
  magnetic?: boolean;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

/**
 * Button — link-styled. Variants:
 *   primary  filled accent with conic-gradient animated border
 *   ghost    minimal text + underline reveal on hover
 *   outline  border-only with subtle hover fill
 *
 * The `magnetic` flag wraps the button in our <Magnetic> with spring
 * lag. Arrow icon slides + rotates on hover.
 */
export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      icon = "arrow",
      magnetic = true,
      size = "md",
      className,
      children,
      ...rest
    },
    ref
  ) {
    const reduced = useReducedMotion();

    const base =
      "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors duration-200 focus-visible:outline-none";

    const sizing = {
      sm: "h-10 px-5 text-[13px]",
      md: "h-12 px-6 text-[14px]",
      lg: "h-14 px-8 text-[15px]",
    }[size];

    const variants: Record<Variant, string> = {
      primary:
        "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-glow)] active:scale-[0.97]",
      ghost:
        "bg-transparent text-[var(--color-primary)] hover:bg-white/5",
      outline:
        "bg-transparent text-[var(--color-primary)] border border-[var(--color-border-default)] hover:bg-white/5",
    };

    const iconNode =
      icon === "arrow" ? (
        <motion.span
          className="inline-flex"
          initial={{ x: 0, rotate: 0 }}
          whileHover={
            reduced ? undefined : { x: 2, rotate: 45 }
          }
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          aria-hidden
        >
          <ArrowUpRight size={16} strokeWidth={2} />
        </motion.span>
      ) : icon === "play" ? (
        <Play size={14} strokeWidth={2} aria-hidden />
      ) : null;

    const inner = (
      <motion.a
        ref={ref}
        className={cn(base, sizing, variants[variant], className)}
        whileHover={reduced ? undefined : { y: -1 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        {...rest}
      >
        {variant === "primary" && !reduced ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.18) inset, 0 12px 40px -8px rgba(26,107,255,0.55)",
            }}
          />
        ) : null}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          {iconNode}
        </span>
      </motion.a>
    );

    return magnetic && !reduced ? (
      <Magnetic strength={6}>
        <span className="group inline-block">{inner}</span>
      </Magnetic>
    ) : (
      <span className="group inline-block">{inner}</span>
    );
  }
);
