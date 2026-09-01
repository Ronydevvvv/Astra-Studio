import { pricing } from "@/lib/content";
import { Button } from "@/components/ui/Button";

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
    <section className="pb-28 md:pb-36 lg:pb-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="border-t border-white/[0.09]">
          {pricing.offers.map((offer, i) => (
            <article
              key={offer.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="group relative border-b border-white/[0.09] py-10 transition-colors duration-500 hover:bg-white/[0.015] lg:py-14"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-gradient-to-r from-violet-500 via-violet-500/40 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
              />

              <div className="grid gap-y-8 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-start lg:gap-x-12">
                <span className="font-display text-[0.75rem] tracking-[0.2em] text-slate-dim lg:pt-3">
                  {offer.index}
                </span>

                <div>
                  <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-none tracking-[-0.035em] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                    {offer.name}
                  </h2>

                  <p className="mt-5 flex items-baseline gap-3">
                    <span className="text-[0.75rem] uppercase tracking-[0.14em] text-slate-dim">
                      À partir de
                    </span>
                    <span className="font-display text-[1.875rem] font-medium leading-none tracking-[-0.04em] text-violet-400">
                      {offer.from}
                    </span>
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
                  variant="quiet"
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

        {/* --- bespoke --- */}
        <div
          className="mt-24 border-t border-white/[0.09] pt-14 lg:mt-32"
          data-reveal
        >
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
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
