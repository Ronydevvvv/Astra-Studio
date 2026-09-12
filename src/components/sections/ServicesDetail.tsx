import { services } from "@/lib/content";
import { ArrowLink } from "@/components/ui/Button";

/**
 * One numbered spread per service.
 *
 * There are no real assets for these six subjects, and inventing
 * illustrations would put six decorative images on a page meant to
 * explain how the studio works. The previous version filled the visual
 * half with the service's own icon blown up to display size inside a
 * bordered, glowing panel with a watermark numeral behind it — four
 * devices to dress one pictogram.
 *
 * Instead the spread is genuinely two-column: the argument on the left
 * at reading measure, the deliverables on the right as a ruled list.
 * Both halves are information, so neither needs decorating.
 */
export function ServicesDetail() {
  return (
    <section className="pb-24 md:pb-32 lg:pb-40">
      <div className="shell">
        {services.map((service) => (
          <article
            key={service.slug}
            id={service.slug}
            data-reveal
            className="scroll-mt-32 border-t border-[var(--hairline)] pt-10 [&+&]:mt-20 lg:[&+&]:mt-24"
          >
            <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start">
              {/* --- argument --- */}
              <div>
                <div className="flex items-baseline gap-6">
                  <span className="t-mono text-slate-dim">{service.index}</span>
                  <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.035em]">
                    {service.title}
                  </h2>
                </div>

                <p className="t-lead mt-8 max-w-[54ch] text-mist">
                  {service.body}
                </p>

                <ArrowLink href="/contact" className="mt-10">
                  Discuter de ce chantier
                </ArrowLink>
              </div>

              {/* --- deliverables --- */}
              <div className="lg:pt-2">
                <p className="t-mono text-slate-dim">Ce que nous faisons</p>
                <ul className="mt-5">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="border-b border-[var(--hairline)] py-3 text-[0.9375rem] text-mist last:border-b-0"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
