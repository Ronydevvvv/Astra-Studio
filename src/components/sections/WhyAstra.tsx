import { why } from "@/lib/content";

/**
 * Replaces the old positioning band, which said things any agency could say.
 *
 * These three are specific enough to be falsifiable — who you talk to, when
 * you pay, who owns the code — which is what separates a claim from a slogan.
 * Numbered rules, no cards, no icons: the section is meant to be read, and
 * anything decorative here would compete with the sentence.
 *
 * It is also the page's one lighter ground, so the scroll changes register
 * once between the Hero and the CTA rather than running as unbroken black.
 */
export function WhyAstra() {
  return (
    <section
      aria-label={why.eyebrow}
      className="relative overflow-hidden border-y border-white/[0.07] bg-[#0c0e1f] py-28 md:py-36 lg:py-44"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(124,58,245,0.5),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(110%_85%_at_0%_0%,rgba(80,15,217,0.15),transparent_58%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div data-reveal>
          <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
            <span aria-hidden="true" className="h-px w-8 bg-violet-500/70" />
            {why.eyebrow}
          </p>
          <h2 className="mt-8 text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em]">
            <span className="block">{why.title[0]}</span>
            <span className="block text-violet-400">{why.title[1]}</span>
          </h2>
        </div>

        <ol className="mt-20 grid gap-x-14 gap-y-12 lg:mt-28 lg:grid-cols-3">
          {why.points.map((point, i) => (
            <li
              key={point.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              className="group relative overflow-hidden border-t border-white/[0.09] pt-7"
            >
              {/* The rule itself draws in on hover, in the same violet
                  gradient used across the site's other progress lines —
                  a still section gets one small confirmation of life
                  without adding an icon or a card the brief deliberately
                  avoids here. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-gradient-to-r from-violet-500 via-violet-500/50 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
              />
              {/* A watermark numeral, the same device used on Services and
                  À propos — real typographic weight behind the point
                  instead of a small caption-sized index. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 top-2 select-none font-display text-[5.5rem] font-medium leading-none text-white/[0.025]"
              >
                {point.index}
              </span>
              <span className="relative font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
                {point.index}
              </span>
              <h3 className="relative mt-5 text-[1.375rem] font-medium leading-tight tracking-[-0.025em]">
                {point.title}
              </h3>
              <p className="relative mt-4 max-w-sm text-[0.9375rem] leading-[1.75] text-mist">
                {point.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
