import { cta } from "@/lib/content";
import { Button } from "@/components/ui/Button";

/**
 * The close: type on the page ground, nothing else.
 *
 * This block used to be a rounded card carrying a space banner, a
 * second starfield over it, a mouse-parallax on both layers, two
 * radial veils to win back contrast, and a slow float — six mechanisms
 * stacked to make one sentence feel important.
 *
 * The sentence is now simply the largest thing on the page, on the same
 * ground as everything else, with one button under it. The astronaut
 * already appears twice above; ending on restraint is what makes those
 * two appearances read as deliberate.
 */
export function CTA() {
  return (
    <section
      id="contact"
      className="border-t border-[var(--hairline)] py-28 md:py-40 lg:py-52"
    >
      <div className="shell">
        <h2 className="t-display max-w-[16ch]" data-reveal>
          <span className="block">{cta.title[0]}</span>
          <span className="block text-mist">{cta.title[1]}</span>
        </h2>

        <div
          className="mt-12 flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between md:gap-20"
          data-reveal
          style={{ ["--reveal-delay" as string]: "90ms" }}
        >
          <p className="t-lead max-w-[44ch] text-mist">{cta.lead}</p>

          <Button href={cta.primary.href} withArrow className="shrink-0">
            {cta.primary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
