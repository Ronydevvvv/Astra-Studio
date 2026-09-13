import Link from "next/link";
import { services, servicesHome } from "@/lib/content";
import { Lines } from "@/components/ui/Lines";

/**
 * Six rows, each the height of a gesture rather than a card.
 *
 * A service grid is the most template-looking pattern on the web: three
 * columns, an icon, a title, a sentence, a button. This is the opposite —
 * one full-width rule per discipline, the name set at title scale, the
 * number small and far to the left.
 *
 * The hover is deliberately a single coordinated move: the whole row
 * shifts right, the number fades up to full, and a hairline wipes across
 * underneath. No colour change, no scale, no shadow. All of it is CSS on
 * `group-hover`, so there is no JavaScript behind this section at all.
 */
export function ServicesIndex({
  heading = true,
  linked = true,
}: {
  /** /services already carries the title in its masthead. */
  heading?: boolean;
  /** Rows link to their anchor on /services; on /services itself they
   *  are plain rows, since linking a section to itself is noise. */
  linked?: boolean;
}) {
  return (
    <section className={heading ? "air-md" : "pb-24 md:pb-32"}>
      <div className="shell">
        {heading && (
          <div
            className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8"
            data-reveal
          >
            <div>
              <p className="eyebrow">{servicesHome.eyebrow}</p>
              <Lines
                as="h2"
                lines={servicesHome.title}
                mutedFrom={1}
                className="t-display mt-8 max-w-[13ch]"
              />
            </div>

            <Link
              href={servicesHome.link.href}
              className="underline-draw eyebrow text-mist transition-colors duration-500 hover:text-chalk"
            >
              {servicesHome.link.label}
            </Link>
          </div>
        )}

        <ul className={heading ? "mt-24 lg:mt-36" : ""}>
          {services.map((service, i) => {
            const Row = linked ? Link : "div";
            const rowProps = linked
              ? { href: `/services#${service.slug}` }
              : {};

            return (
              <li
                key={service.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="border-t border-[var(--hairline)] last:border-b"
              >
                <Row
                  {...(rowProps as { href: string })}
                  className="group relative block overflow-hidden py-10 md:py-14"
                >
                  {/* The wipe. Sits behind the row content, scales from the
                      left, and is the only thing that changes brightness. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-chalk/30 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
                  />

                  <div className="flex items-baseline gap-6 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-3 md:gap-12">
                    <span className="eyebrow shrink-0 transition-colors duration-500 group-hover:text-mist">
                      {service.index}
                    </span>

                    <h3 className="t-title min-w-0 flex-1">{service.title}</h3>

                    <p className="hidden max-w-[28ch] text-[0.9375rem] leading-[1.6] text-dim transition-colors duration-500 group-hover:text-mist lg:block">
                      {service.short}
                    </p>
                  </div>
                </Row>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
