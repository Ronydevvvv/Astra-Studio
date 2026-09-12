/**
 * Masthead for every page except the home page.
 *
 * Deliberately NOT a second version of the home hero: no character, no
 * scene. Those belong to the landing page alone — repeating them on six
 * inner pages is how a site turns into a gallery of illustrations.
 *
 * The starfield and the violet ambient glow that used to sit behind this
 * are gone. What is left is the page's own ground, a label, and type at
 * one step below the home display size — the inner pages should feel
 * like the same document at a lower volume, not like six more covers.
 *
 * The closing rule is what actually does the work the glow was pretending
 * to do: it gives the masthead a bottom edge, so the content below starts
 * somewhere rather than drifting up into the title.
 */
export function PageHero({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  /** Rendered one line per entry; lines after the first are set back. */
  title: string[];
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="pt-[var(--nav-h)]">
      <div className="shell pb-14 pt-16 md:pt-24 lg:pb-20">
        <p className="label">{label}</p>

        <h1 className="t-h2 mt-7 max-w-[18ch] text-[clamp(2.25rem,5.5vw,4.25rem)]">
          {title.map((line, i) => (
            <span key={line} className={`block ${i > 0 ? "text-mist" : ""}`}>
              {line}
            </span>
          ))}
        </h1>

        {lead && <p className="t-lead mt-8 max-w-[52ch] text-mist">{lead}</p>}

        {children}
      </div>
      <div className="shell">
        <div className="h-px w-full bg-[var(--hairline)]" />
      </div>
    </section>
  );
}
