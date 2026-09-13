import { pricing } from "@/lib/content";
import { Button } from "@/components/ui/Button";

/**
 * Three offers as full-width editorial rows, not a three-column grid.
 *
 * A row gives the offer name the scale of a heading and lets the
 * inclusions sit beside it instead of stacking into a feature checklist
 * — the single most template-looking pattern on the web. No cards, no
 * badges, no "most popular" ribbon.
 *
 * The price is set in the same weight and colour as the offer name
 * rather than in the accent: a figure printed in the brand colour is a
 * sales device, and these prices are starting points the studio would
 * rather discuss than advertise (see `pricing.note`).
 */
export function Pricing() {
  return (
    <section className="pb-24 md:pb-32 lg:pb-40">
      <div className="shell">
        <div className="mt-16 border-t border-[var(--hairline)] lg:mt-20">
          {pricing.offers.map((offer, i) => (
            <article
              key={offer.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="group border-b border-[var(--hairline)] py-10 lg:py-14"
            >
              <div className="grid gap-y-8 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.1fr)_auto] lg:items-start lg:gap-x-12">
                <span className="eyebrow text-dim lg:pt-3">
                  {offer.index}
                </span>

                <div>
                  <h2 className="text-[clamp(1.75rem,3vw,2.375rem)] font-medium leading-none tracking-[-0.035em]">
                    {offer.name}
                  </h2>

                  <p className="mt-6 flex items-baseline gap-3">
                    <span className="eyebrow text-dim">À partir de</span>
                    <span className="font-display text-[1.75rem] font-medium leading-none tracking-[-0.04em]">
                      {offer.from}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="t-body max-w-md text-mist">{offer.pitch}</p>

                  <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
                    {offer.includes.map((item) => (
                      <li
                        key={item}
                        className="border-t border-[var(--hairline)] py-2.5 text-[0.8125rem] text-dim"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  href="/contact"
                  variant="line"
                  className="justify-self-start px-5 py-3 lg:mt-2 lg:justify-self-end"
                >
                  Demander un devis
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-[52ch] text-[0.8125rem] leading-[1.7] text-dim" data-reveal>
          {pricing.note}
        </p>

        {/* --- bespoke --- */}
        <div className="mt-24 border-t border-[var(--hairline)] pt-14 lg:mt-32" data-reveal>
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <h2 className="t-display max-w-[18ch]">{pricing.custom.title}</h2>
              <p className="eyebrow mt-7 text-dim">
                {"Sur devis"}
              </p>
            </div>
            <div>
              <p className="t-body max-w-md text-mist">{pricing.custom.body}</p>
              <Button href={pricing.custom.cta.href} withArrow className="mt-8">
                {pricing.custom.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
