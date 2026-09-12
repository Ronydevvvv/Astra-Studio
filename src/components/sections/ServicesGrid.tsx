import { services, servicesHome } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Six disciplines as a numbered index — no cards, no icons.
 *
 * The icons this section used to carry (a gauge for "Performance", a
 * magnifier for "SEO") are the stock vocabulary of every service grid
 * ever shipped; they illustrate the word directly beneath them and add
 * nothing a reader did not already have. Removing them leaves the two
 * things that actually differ between the six: the name and the
 * sentence.
 *
 * Two columns on desktop, one on mobile, split by a single vertical
 * rule — the rule is the layout, which is why there is no border on
 * the items themselves.
 */
export function ServicesGrid() {
  return (
    <section className="border-t border-[var(--hairline)] bg-ink py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          index="02"
          label={servicesHome.eyebrow}
          title={
            <>
              <span className="block">{servicesHome.title[0]}</span>
              <span className="block text-mist">{servicesHome.title[1]}</span>
            </>
          }
          link={servicesHome.link}
        />

        <ul className="mt-16 grid gap-x-20 lg:mt-24 lg:grid-cols-2">
          {services.map((service, i) => (
            <li
              key={service.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 70}ms` }}
              /* The divider is drawn on the item's top edge so the two
                 columns stay aligned regardless of how the six split. */
              className="border-t border-[var(--hairline)] py-8 first:border-t-0 lg:py-10 lg:[&:nth-child(2)]:border-t-0"
            >
              <div className="flex items-baseline gap-6">
                <span className="t-mono w-6 shrink-0 text-slate-dim">
                  {service.index}
                </span>
                <div className="min-w-0">
                  <h3 className="t-h3">{service.title}</h3>
                  <p className="t-body mt-3 max-w-[42ch] text-mist">
                    {service.short}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
