import { statement } from "@/lib/content";
import { Lines } from "@/components/ui/Lines";

/**
 * One sentence, given a whole screen.
 *
 * This section exists to slow the page down after the hero. It carries no
 * link, no image, no list and no button — a reader arrives, reads three
 * lines, and leaves with the studio's position. Anything added here would
 * be something to look at instead of the sentence.
 *
 * The supporting line is set small and indented to the right of the
 * measure, so the two blocks read as statement and footnote rather than as
 * a heading with a subtitle.
 */
export function Statement() {
  return (
    <section id="suite" className="air-lg">
      <div className="shell" data-reveal>
        <Lines
          as="h2"
          lines={statement.title}
          mutedFrom={statement.titleMutedFrom}
          stagger={110}
          className="t-display max-w-[15ch]"
        />

        <div className="mt-20 grid gap-x-24 gap-y-14 md:mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <p className="t-lead max-w-[40ch] text-mist lg:col-start-2">
            {statement.body}
          </p>

          {/* The three steps are an index, not a process diagram: no
              connecting line, no arrows, no cards. Their only job is to
              name the order the sentence above implies. */}
          <ol className="flex flex-wrap gap-x-16 gap-y-6 lg:col-start-2">
            {statement.steps.map((step) => (
              <li key={step.index} className="flex items-baseline gap-3">
                <span className="eyebrow">{step.index}</span>
                <span className="eyebrow text-mist">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
