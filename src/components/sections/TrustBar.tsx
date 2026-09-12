import { trust } from "@/lib/content";

/**
 * A rail, not a section.
 *
 * There are two entries and one of them is a creative direction rather
 * than commissioned work. A full-width "ILS NOUS FONT CONFIANCE" band
 * with logo slots around two names is a section announcing that it has
 * nothing to show — the honest form at this size is one quiet line that
 * names them and says exactly what each one was.
 *
 * It grows into something larger the day there are more entries; until
 * then it takes the space it has earned.
 */
export function TrustBar() {
  return (
    <section aria-label={trust.eyebrow} className="border-y border-[var(--hairline)]">
      <div className="shell flex flex-col gap-x-16 gap-y-5 py-7 md:flex-row md:items-center">
        <p className="t-mono shrink-0 text-slate-dim">{trust.eyebrow}</p>

        <ul className="flex flex-col gap-x-12 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
          {trust.entries.map((entry) => (
            <li key={entry.name} className="flex items-baseline gap-3">
              <span className="text-[0.9375rem] text-chalk">{entry.name}</span>
              <span className="t-mono text-slate-dim">
                {trust.labels[entry.relation]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
