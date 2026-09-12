import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "solid" | "line" | "text";

/**
 * Squared, not pilled; hairlined, not shadowed.
 *
 * The previous buttons were rounded-full with a coloured drop shadow
 * (`0 14px 40px -12px rgba(124,58,245,.7)`) — the single most template-
 * looking element on the page, because that exact treatment ships in
 * every landing-page kit. A button on a studio site should read as a
 * piece of set type with a box around it.
 *
 * Hover moves one property only: the fill, or the rule. Nothing scales,
 * nothing glows, nothing translates.
 */
const base =
  "group/btn inline-flex items-center justify-center gap-3 " +
  "font-display text-[0.75rem] font-medium uppercase tracking-[0.12em] " +
  "transition-colors duration-300 [transition-timing-function:var(--ease-soft)]";

const variants: Record<Variant, string> = {
  solid: "bg-chalk px-7 py-4 text-void hover:bg-white",
  line: "border border-[var(--hairline-strong)] px-7 py-4 text-chalk hover:border-chalk",
  text: "text-chalk",
};

type Props = {
  variant?: Variant;
  withArrow?: boolean;
} & ComponentProps<typeof Link>;

export function Button({
  variant = "solid",
  withArrow = false,
  className = "",
  children,
  ...props
}: Props) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      {withArrow && <Arrow />}
    </Link>
  );
}

/**
 * Secondary action: a label with a rule under it and an arrow that steps
 * once on hover. No ring, no circle, no fill — it should be legible as
 * "the other option", not compete with the primary.
 */
export function ArrowLink({
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`link-underline group/btn inline-flex items-center gap-3 font-display text-[0.75rem] font-medium uppercase tracking-[0.12em] text-mist transition-colors duration-300 hover:text-chalk ${className}`}
      {...props}
    >
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

/** 14px, 1px stroke, steps 3px right on hover. That is the whole gesture. */
function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className="size-3.5 shrink-0 transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover/btn:translate-x-[3px]"
    >
      <path d="M1 7h12M8 2.5 12.5 7 8 11.5" />
    </svg>
  );
}
