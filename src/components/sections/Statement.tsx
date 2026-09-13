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
          mutedFrom={2}
          stagger={110}
          className="t-display max-w-[15ch]"
        />

        <p className="t-lead mt-16 max-w-[38ch] text-mist md:mt-24 lg:ml-[42%]">
          {statement.body}
        </p>
      </div>
    </section>
  );
}
