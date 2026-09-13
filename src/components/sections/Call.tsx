import Link from "next/link";
import { call } from "@/lib/content";
import { Lines } from "@/components/ui/Lines";

/**
 * The close. Type on the page ground, one action, nothing else.
 *
 * It takes a full screen because ending quietly on a large sentence is
 * what makes the two appearances of the astronaut above read as
 * deliberate. A card, a boxed panel or a second button here would undo
 * that in one stroke.
 *
 * The action is a link styled as a rule with a stepping arrow, not a
 * filled pill — the page has no other filled element, and introducing one
 * at the very end would make it the loudest thing on the site.
 */
export function Call() {
  return (
    <section className="air-lg border-t border-[var(--hairline)]">
      <div className="shell" data-reveal>
        <Lines
          as="h2"
          lines={call.title}
          mutedFrom={1}
          stagger={110}
          className="t-display max-w-[15ch]"
        />

        <div className="mt-16 flex flex-col gap-12 md:mt-24 md:flex-row md:items-end md:justify-between md:gap-24">
          <p className="t-lead max-w-[40ch] text-mist">{call.lead}</p>

          <Link
            href={call.cta.href}
            className="group inline-flex shrink-0 items-center gap-6 border-b border-[var(--hairline-strong)] pb-4 transition-colors duration-500 hover:border-chalk"
          >
            <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] tracking-[-0.02em]">
              {call.cta.label}
            </span>
            <svg
              viewBox="0 0 22 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
              className="h-3 w-5 shrink-0 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2"
            >
              <path d="M0 6h20M15 1l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
