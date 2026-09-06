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
          /* Performance is the one spread that breaks the alternating
             two-column pattern on purpose: a speed graph read at half a
             column's width is a squint, not a demonstration, and six
             identical spreads in a row is its own kind of template. Full
             width, chart underneath the copy instead of beside it — the
             other five keep the alternating format. */
          const isWide = service.slug === "performance";

          return (
            <article
              key={service.slug}
              id={service.slug}
              data-reveal
              className="group scroll-mt-32 border-t border-white/[0.09] pt-10 [&+&]:mt-20 lg:[&+&]:mt-28"
            >
              {isWide ? (
                <div>
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
                      {service.index}
                    </span>
                    <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.035em]">
                      {service.title}
                    </h2>
                  </div>
                  <div className="mt-8 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
                    <p className="max-w-xl text-[1.0625rem] leading-[1.8] text-mist">
                      {service.body}
                    </p>
                    <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
                      {service.deliverables.map((d) => (
                        <li key={d} className="text-[0.9375rem] text-mist">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* The graph gets the width it actually needs to be read
                      as a real measurement, not a decoration. */}
                  <div className="relative mt-10 overflow-hidden rounded-md border border-white/[0.07] bg-white/[0.015] px-6 py-8 sm:px-10">
                    <span
                      aria-hidden="true"
                      className="glow left-1/2 top-0 size-64 -translate-x-1/2 bg-violet-600/[0.08]"
                    />
                    <div className="relative [&_svg]:h-24 sm:[&_svg]:h-32">
                      <ServiceVisual icon={service.icon} />
                    </div>
                  </div>
                </div>
              ) : (
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

                  {/* A real surface, not a small icon plopped in a box —
                      the watermark index number and a soft glow give the
                      visual half of the spread enough weight to hold its
                      own against the headline opposite it, instead of
                      reading as a thin afterthought under a big title. */}
                  <div className="relative mt-8 flex min-h-[9.5rem] items-center overflow-hidden rounded-md border border-white/[0.07] bg-white/[0.015] px-6">
                    <span
                      aria-hidden="true"
                      className="glow left-full top-0 size-40 -translate-x-1/2 bg-violet-600/[0.1]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[6rem] font-medium leading-none text-white/[0.03]"
                    >
                      {service.index}
                    </span>
                    <div className="relative w-full">
                      <ServiceVisual icon={service.icon} />
                    </div>
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
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
