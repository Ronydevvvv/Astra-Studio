import { why } from "@/lib/content";

/**
 * The page's one large statement.
 *
 * Everything else on the homepage is an index — rows, numbers, columns.
 * This section breaks that rhythm once, on purpose: the headline is set
 * near display scale with nothing beside it, and the three points sit
 * underneath in a plain three-column row. A page needs one moment where
 * the type is simply allowed to be large, and this is the argument that
 * earns it.
 *
 * No ground change, no glow, no watermark numerals. The break is the
 * scale and the empty space around it.
 */
export function WhyAstra() {
  return (
    <section
      aria-label={why.eyebrow}
      className="border-t border-[var(--hairline)] py-24 md:py-32 lg:py-44"
    >
      <div className="shell">
        <p className="label" data-reveal>
          <span className="text-slate-dim/60">03</span>
          {why.eyebrow}
        </p>

        <h2
          className="t-display mt-10 max-w-[15ch]"
          data-reveal
          style={{ ["--reveal-delay" as string]: "60ms" }}
        >
          <span className="block">{why.title[0]}</span>
          <span className="block text-mist">{why.title[1]}</span>
        </h2>

        <ol className="mt-20 grid gap-x-16 gap-y-12 lg:mt-28 lg:grid-cols-3">
          {why.points.map((point, i) => (
            <li
              key={point.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="border-t border-[var(--hairline)] pt-6"
            >
              <span className="t-mono text-slate-dim">{point.index}</span>
              <h3 className="t-h3 mt-5">{point.title}</h3>
              <p className="t-body mt-4 max-w-[40ch] text-mist">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
