"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { Icon } from "./Icon";

/** A very small magnetic pull — a few pixels, not the exaggerated version
 * that feels like it's fighting the cursor. Skipped entirely under
 * prefers-reduced-motion, which globals.css also zeroes the transition for. */
function magnetic(e: MouseEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const r = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
  const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
  e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
}

function resetMagnetic(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = "";
}

type Variant = "primary" | "outline" | "quiet" | "ghost";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium " +
  "transition-[transform,color,border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-out-expo)] " +
  "active:scale-[0.98] whitespace-nowrap";

const variants: Record<Variant, string> = {
  // Solid violet. The inset highlight keeps it from reading as a flat blob.
  primary:
    "bg-violet-500 text-white px-7 py-3.5 text-[0.8125rem] uppercase tracking-[0.1em] " +
    "shadow-[0_0_0_1px_rgba(255,255,255,0.10)_inset,0_14px_40px_-12px_rgba(124,58,245,0.7)] " +
    "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset,0_20px_54px_-12px_rgba(124,58,245,0.95)]",
  // Outlined. A violet panel wipes up from the bottom on hover rather than
  // the whole background switching colour — quieter, and it reads as crafted.
  quiet:
    "border border-white/20 text-chalk px-6 py-3 text-[0.75rem] uppercase tracking-[0.12em] " +
    "hover:border-violet-400/70",
  outline:
    "border border-[var(--hairline-strong)] text-chalk px-7 py-3.5 text-[0.8125rem] uppercase tracking-[0.1em] " +
    "hover:border-white/30",
  ghost: "text-mist px-1 py-1 hover:text-chalk",
};

/** Variants whose hover state is a rising violet fill behind the label. */
const sweeps: Partial<Record<Variant, string>> = {
  quiet: "bg-violet-500",
  outline: "bg-white/[0.07]",
};

type Props = {
  variant?: Variant;
  withArrow?: boolean;
} & ComponentProps<typeof Link>;

export function Button({
  variant = "primary",
  withArrow = false,
  className = "",
  children,
  ...props
}: Props) {
  const sweep = sweeps[variant];

  return (
    <Link
      className={`${base} ${variants[variant]} ${className}`}
      onMouseMove={magnetic}
      onMouseLeave={resetMagnetic}
      {...props}
    >
      {sweep && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/btn:scale-y-100 ${sweep}`}
        />
      )}
      <span className="relative">{children}</span>
      {withArrow && (
        <Icon
          name="arrow"
          className="relative size-[1.15em] shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/btn:translate-x-1"
        />
      )}
    </Link>
  );
}

/**
 * Secondary action drawn as a ringed arrow next to a label, from the hero
 * reference. Deliberately not a pill: two pills side by side compete, and the
 * eye should land on the primary action first.
 */
export function ArrowLink({
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group/al inline-flex items-center gap-4 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk transition-colors duration-500 hover:text-violet-300 ${className}`}
      {...props}
    >
      <span className="relative grid size-11 place-items-center rounded-full border border-white/20 transition-colors duration-500 group-hover/al:border-violet-400/70">
        <span
          aria-hidden="true"
          className="absolute inset-0 scale-0 rounded-full bg-violet-500/15 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/al:scale-100"
        />
        <Icon
          name="arrow"
          className="relative size-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/al:translate-x-0.5"
        />
      </span>
      {children}
    </Link>
  );
}
