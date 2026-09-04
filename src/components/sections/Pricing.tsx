import { pricing, process, processIntro } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Starfield } from "@/components/ui/Starfield";

/**
 * Three offers as full-width editorial rows, not a three-column grid.
 *
 * A row gives the offer name the scale of a heading and lets the inclusions
 * sit beside it instead of stacking into a feature checklist — the single
 * most template-looking pattern on the web. No cards, no badges, no pills:
 * inclusions are hairline-ruled entries.
 *
 * PRICES ARE UNSET. `from === "—"` renders a dashed rule, which reads as a
 * field left blank; an invented figure would read as a quote.
 */
export function Pricing() {
  return (
    <section className="relative overflow-hidden pb-28 md:pb-36 lg:pb-44">
      <Starfield className="pointer-events-none opacity-30" />
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="border-t border-white/[0.09]">
          {pricing.offers.map((offer, i) => (
            <article
              key={offer.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className={`group relative border-b border-white/[0.09] py-10 transition-[background-color,box-shadow,transform] duration-500 [transition-timing-function:var(--ease-out-expo)] hover:z-10 hover:-translate-y-1 hover:bg-white/[0.025] hover:shadow-[0_30px_70px_-40px_rgba(124,58,245,0.5)] lg:py-14 ${
                offer.recommended
                  ? "bg-gradient-to-r from-violet-500/[0.06] via-transparent to-transparent"
                  : ""
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-[-1px] h-px origin-left bg-gradient-to-r from-violet-500 via-violet-500/40 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100 ${
                  offer.recommended ? "scale-x-100" : "scale-x-0"
                }`}
              />
              {offer.recommended && (
                <span
                  aria-hidden="true"
                  className="glow left-1/4 top-0 size-64 bg-violet-600/[0.1]"
                />
              )}

              <div className="relative grid gap-y-8 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-start lg:gap-x-12">
                <span className="font-display text-[0.75rem] tracking-[0.2em] text-slate-dim lg:pt-3">
                  {offer.index}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-none tracking-[-0.035em] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                      {offer.name}
                    </h2>
                    {offer.recommended && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-violet-300">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/70" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-violet-400" />
                        </span>
                        Recommandé
                      </span>
                    )}
                  </div>

                  <p className="mt-5 flex items-baseline gap-3">
                    <span className="text-[0.75rem] uppercase tracking-[0.14em] text-slate-dim">
                      À partir de
                    </span>
                    <span className="font-display text-[1.875rem] font-medium leading-none tracking-[-0.04em] text-violet-400">
                      {offer.from}
                    </span>
                  </p>

                  <p className="mt-4 max-w-[16rem] text-[0.8125rem] italic leading-[1.6] text-slate-dim">
                    {offer.audience}
                  </p>
                </div>

                <div>
                  <p className="max-w-md text-[0.9375rem] leading-[1.75] text-mist">
                    {offer.pitch}
                  </p>

                  <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
                    {offer.includes.map((item) => (
                      <li
                        key={item}
                        className="border-t border-white/[0.07] py-2.5 text-[0.8125rem] text-slate-dim transition-colors duration-500 group-hover:text-mist"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  href="/contact"
                  variant={offer.recommended ? "primary" : "quiet"}
                  withArrow
                  className="justify-self-start lg:mt-2 lg:justify-self-end"
                >
                  Demander un devis
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p
          className="mt-8 max-w-xl text-[0.8125rem] leading-[1.7] text-slate-dim"
          data-reveal
        >
          {pricing.note}
        </p>

        {/* --- how it works: the same four steps as the home page, so
            "here's how we work" is one consistent claim across the site
            rather than a second, slightly different version invented for
            this page. Reassurance right before the money question, not
            after. --- */}
        <div className="mt-24 lg:mt-32" data-reveal>
          <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
            {processIntro.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Comment se déroule un projet.
          </h2>
          <ol className="mt-10 grid gap-x-8 gap-y-10 border-t border-white/[0.09] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <li key={step.index}>
                <span className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
                  {step.index}
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-medium tracking-[-0.015em]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.7] text-mist">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* --- bespoke --- */}
        <div
          className="relative mt-24 overflow-hidden rounded-md border border-white/[0.09] p-8 md:p-12 lg:mt-32 lg:p-16"
          data-reveal
        >
          <div className="glow left-[85%] top-0 size-72 -translate-x-1/2 bg-violet-600/[0.18]" />
          <div className="relative grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <h2 className="text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.035em]">
                {pricing.custom.title}
              </h2>
              <p className="mt-6 font-display text-[1.5rem] font-medium tracking-[-0.03em] text-violet-400">
                {pricing.custom.price}
              </p>
            </div>
            <div>
              <p className="max-w-md text-[0.9375rem] leading-[1.75] text-mist">
                {pricing.custom.body}
              </p>
              <Button
                href={pricing.custom.cta.href}
                withArrow
                className="mt-8"
              >
                {pricing.custom.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
