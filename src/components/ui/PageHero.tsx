import { Lines } from "@/components/ui/Lines";

/**
 * Masthead for every page except the home page.
 *
 * Deliberately not a second hero: no figure, no full viewport, no scroll
 * cue. Those belong to the landing page alone — repeating them across six
 * inner pages is how a site turns into six competing covers.
 *
 * What it does share is the type treatment: the title is set at display
 * scale and rises line by line, so arriving on /services feels like the
 * same document continuing rather than a different template loading. The
 * closing rule gives the masthead a bottom edge so the content below
 * starts somewhere instead of drifting up into the title.
 */
export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  /** One rendered line per entry; lines after the first are set back. */
  title: string[];
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="pt-[var(--nav-h)]">
      <div className="shell pb-20 pt-24 md:pb-28 md:pt-36 lg:pt-44">
        <div data-reveal>
          <p className="eyebrow">{label}</p>
          <Lines
            as="h1"
            lines={title}
            mutedFrom={1}
            stagger={100}
            className="t-display mt-10 max-w-[16ch] md:mt-14"
          />
        </div>

        {lead && (
          <p
            className="t-lead mt-12 max-w-[48ch] text-mist md:mt-16"
            data-reveal
            style={{ ["--reveal-delay" as string]: "280ms" }}
          >
            {lead}
          </p>
        )}

        {children}
      </div>

      <div className="shell">
        <div
          data-reveal
          className="rule-draw h-px w-full bg-[var(--hairline)]"
        />
      </div>
    </section>
  );
}
