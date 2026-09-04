import { services } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { ServiceVisual } from "@/components/ui/ServiceVisual";

/**
 * One numbered spread per service, alternating side.
 *
 * The brief asked for alternating text/visual blocks, but there are no real
 * assets for these six subjects and inventing illustrations would put six
 * decorative images on a page that is meant to explain how the studio works.
 * The alternation is kept — it is what stops six sections reading as a list —
 * and the visual half is carried by the service's own icon at display size
 * plus its deliverables, which is real information rather than filler.
 */
export function ServicesDetail() {
  return (
    <section className="pb-28 md:pb-36 lg:pb-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        {services.map((service, i) => {
          const flip = i % 2 === 1;

          return (
            <article
              key={service.slug}
              id={service.slug}
              data-reveal
              className="group scroll-mt-32 border-t border-white/[0.09] pt-10 [&+&]:mt-20 lg:[&+&]:mt-28"
            >
              <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start">
                {/* --- copy --- */}
                <div className={flip ? "lg:order-2" : "lg:order-1"}>
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
                      {service.index}
                    </span>
                    <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.035em]">
                      {service.title}
                    </h2>
                  </div>

                  <p className="mt-8 max-w-xl text-[1.0625rem] leading-[1.8] text-mist">
                    {service.body}
                  </p>
                </div>

                {/* --- deliverables --- */}
                <div className={flip ? "lg:order-1" : "lg:order-2"}>
                  <div className="flex items-center gap-5">
                    <Icon
                      name={service.icon}
                      className="size-9 shrink-0 text-violet-400/80 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1"
                    />
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent"
                    />
                  </div>

                  <div className="mt-8 rounded-md border border-white/[0.07] bg-white/[0.015] px-5 py-6">
                    <ServiceVisual icon={service.icon} />
                  </div>

                  <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim/70">
                    Ce que nous faisons
                  </p>

                  <ul className="mt-5">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="border-b border-white/[0.07] py-3 text-[0.9375rem] text-mist last:border-b-0"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
