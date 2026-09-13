import { statement } from "@/lib/content";
import { Lines } from "@/components/ui/Lines";

/**
 * A position, not a second hero.
 *
 * The difference is made structurally rather than decoratively: the hero
 * is anchored top and bottom with the type on the left margin, while this
 * block is a two-column spread whose heading hangs off a numbered rule
 * and whose supporting text sits in the opposite column. Same palette,
 * same type, entirely different shape — which is what stops the page
 * reading as a run of identical dark panels.
 *
 * The three steps are an index, not a process diagram. No connecting
 * line, no arrows, no cards: their only job is to name the order the
 * sentence above already implies.
 */
export function Statement() {
  return (
    <section id="suite" className="air-md scroll-mt-[var(--nav-h)]">
      <div className="shell">
        <div className="grid gap-x-20 gap-y-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* --- the claim --- */}
          <div data-reveal>
            <div className="h-px w-full bg-[var(--hairline)]" />
            <p className="eyebrow mt-6">Position</p>

            <Lines
              as="h2"
              lines={statement.title}
              mutedFrom={statement.titleMutedFrom}
              stagger={110}
              className="t-display mt-12 max-w-[16ch] md:mt-16"
            />
          </div>

          {/* --- the method, set against it --- */}
          <div
            className="lg:pt-[18vh]"
            data-reveal
            style={{ ["--reveal-delay" as string]: "220ms" }}
          >
            <p className="t-lead max-w-[40ch] text-mist">{statement.body}</p>

            <ol className="mt-16 md:mt-20">
              {statement.steps.map((step) => (
                <li
                  key={step.index}
                  className="flex items-baseline gap-8 border-t border-[var(--hairline)] py-5"
                >
                  <span className="eyebrow w-6 shrink-0">{step.index}</span>
                  <span className="font-display text-[1.125rem] tracking-[-0.015em]">
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
