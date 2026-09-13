import Link from "next/link";
import { studio } from "@/lib/content";
import { Lines } from "@/components/ui/Lines";

/**
 * The studio's own voice, and the page's only set of figures.
 *
 * The figures are deliberately not a project counter. This repository
 * holds two entries — one still in preparation, one a creative direction
 * rather than commissioned work — so a "15+ projets" number would be the
 * one claim on the site a prospect could immediately disprove. What is
 * printed instead is true and, as a differentiator, harder to copy: one
 * independent studio, nothing templated, one person from brief to code.
 *
 * No astronaut here. It appears twice on the whole site — small in the
 * home hero and once on /a-propos — which is what keeps it a signature
 * rather than a motif.
 */
export function StudioNote() {
  return (
    <section className="air-md border-t border-[var(--hairline)]">
      <div className="shell">
        <div className="grid gap-x-24 gap-y-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div data-reveal>
            <p className="eyebrow">{studio.eyebrow}</p>
            <Lines
              as="h2"
              lines={studio.title}
              mutedFrom={2}
              stagger={100}
              className="t-display mt-8 max-w-[16ch]"
            />
          </div>

          <div
            className="lg:pt-[calc(1.5rem+2vw)]"
            data-reveal
            style={{ ["--reveal-delay" as string]: "160ms" }}
          >
            {studio.body.map((p) => (
              <p key={p} className="t-lead max-w-[44ch] text-mist [&+&]:mt-6">
                {p}
              </p>
            ))}

            <Link
              href={studio.link.href}
              className="underline-draw eyebrow mt-12 inline-block text-chalk"
            >
              {studio.link.label}
            </Link>
          </div>
        </div>

        {/* --- figures --- */}
        <dl className="mt-32 grid gap-x-12 gap-y-12 sm:grid-cols-3 lg:mt-44">
          {studio.figures.map((figure, i) => (
            <div
              key={figure.label}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              className="border-t border-[var(--hairline)] pt-7"
            >
              <dt className="sr-only">{figure.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(3rem,5vw,4.5rem)] font-normal leading-none tracking-[-0.04em]">
                  {figure.value}
                </span>
                <span className="eyebrow mt-5 block max-w-[20ch]">
                  {figure.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
