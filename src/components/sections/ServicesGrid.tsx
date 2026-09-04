"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { services, servicesHome } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { ServiceVisual } from "@/components/ui/ServiceVisual";

/** Publishes the pointer position as a percentage on the card itself, so the
 * spotlight is a plain CSS radial-gradient rather than a second JS-driven
 * layer. One handler for all six cards. */
function onCardMove(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty(
    "--mx",
    `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`
  );
  e.currentTarget.style.setProperty(
    "--my",
    `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`
  );
}

/**
 * Home overview: one line per service, scannable in two seconds.
 *
 * The previous version carried a full paragraph per cell and read as
 * technical documentation — six blocks of prose nobody finishes. The detail
 * moved to /services, where a visitor arrives already interested; here each
 * cell is a number, an icon, a title and a single sentence.
 *
 * A plain three-column grid of equal cells would be the template answer, so
 * the cells are separated by rules only — no borders, no boxes — and the
 * accent rule under each is what moves on hover.
 */
export function ServicesGrid() {
  return (
    <section id="services" className="py-28 md:py-36 lg:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div data-reveal>
            <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
              <span aria-hidden="true" className="h-px w-8 bg-violet-500/70" />
              {servicesHome.eyebrow}
            </p>
            <h2 className="mt-8 text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em]">
              <span className="block">{servicesHome.title[0]}</span>
              <span className="block text-violet-400">
                {servicesHome.title[1]}
              </span>
            </h2>
          </div>

          <Link
            href={servicesHome.link.href}
            className="group/all inline-flex items-center gap-2.5 pb-3 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk transition-colors duration-500 hover:text-violet-300"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <span className="link-wipe">{servicesHome.link.label}</span>
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/all:translate-x-1"
            />
          </Link>
        </div>

        <ul className="mt-20 grid border-t border-white/[0.09] sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {services.map((service, i) => (
            /* Vertical rules are computed per index rather than with
               nth-child variants: at two breakpoints the sm and lg rules
               contradict each other on the same cells, and which one wins
               depends on Tailwind's output order. Explicit is safe. */
            <li
              key={service.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}
              className={`group relative border-b border-white/[0.09] ${
                i % 2 === 0 ? "sm:border-r sm:border-white/[0.09]" : ""
              } ${
                i % 3 === 2
                  ? "lg:border-r-0"
                  : "lg:border-r lg:border-white/[0.09]"
              }`}
            >
              <Link
                href={`/services#${service.slug}`}
                onMouseMove={onCardMove}
                className="relative flex h-full flex-col overflow-hidden p-8 transition-colors duration-500 hover:bg-white/[0.018] lg:p-10"
              >
                {/* Light that follows the cursor — subtle, and only where
                    the pointer actually is, rather than a static glow. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(240px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--color-violet-500) 10%, transparent), transparent 70%)",
                  }}
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-gradient-to-r from-violet-500 to-violet-500/0 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
                />

                <div className="relative flex items-center justify-between gap-6">
                  <span className="font-display text-[0.75rem] tracking-[0.16em] text-slate-dim transition-colors duration-500 group-hover:text-violet-300">
                    {service.index}
                  </span>
                  <Icon
                    name={service.icon}
                    className="size-6 text-violet-400/70 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-violet-300"
                  />
                </div>

                <div className="relative mt-10">
                  <ServiceVisual icon={service.icon} />
                </div>

                <h3 className="relative mt-6 text-[1.5rem] font-medium tracking-[-0.025em] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                  {service.title}
                </h3>

                <p className="relative mt-3.5 max-w-xs text-[0.9375rem] leading-[1.7] text-mist transition-colors duration-500 group-hover:text-chalk/90">
                  {service.short}
                </p>

                <Icon
                  name="arrow"
                  className="relative mt-8 size-4 text-slate-dim transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-violet-300"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
