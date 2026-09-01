import Image from "next/image";
import Link from "next/link";
import { projects, projectStatusLabel, type Project } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { MouseParallax } from "@/components/ui/MouseParallax";

/**
 * Case studies. The layout follows the CONTENT, it does not compensate for it.
 *
 * `image` drives the composition, not just the picture:
 *
 *   without → copy-led, the visual column is a zone marked by two rules;
 *   with    → the image becomes the subject, takes the larger half, and gains
 *             parallax plus a hover that offsets the title.
 *
 * A filled panel — however dark — reads as an empty grey box, which is the one
 * thing a portfolio with no photographs cannot afford. Two hairlines fading
 * from the corner state the reserved area the way a crop mark does.
 */
export function ProjectEntry({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  const hasImage = Boolean(project.image);
  const href = `/realisations/${project.slug}`;

  return (
    <article className="group border-t border-white/[0.09] pt-8">
      {/* The status rides the rule next to the year. A visitor must be able
          to tell delivered work from a creative direction at a glance —
          leaving that ambiguous is the one claim they can catch. */}
      <div className="flex items-baseline justify-between gap-6">
        <span className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
          {project.index}
        </span>
        <span className="flex items-baseline gap-4 font-display text-[0.75rem] tracking-[0.2em] text-slate-dim">
          <span
            className={
              project.status === "delivered" ? "text-violet-300" : undefined
            }
          >
            {projectStatusLabel[project.status]}
          </span>
          <span aria-hidden="true" className="text-white/15">
            /
          </span>
          {project.year}
        </span>
      </div>

      <div
        className={`mt-10 grid gap-x-16 gap-y-10 lg:items-center ${
          hasImage
            ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
            : "lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]"
        }`}
      >
        <div
          className={
            hasImage ? (flip ? "lg:order-1" : "lg:order-2") : "lg:order-1"
          }
        >
          <p className="text-[0.75rem] uppercase tracking-[0.16em] text-slate-dim">
            {project.category}
          </p>

          <h3
            className={`mt-4 font-medium leading-[1.03] tracking-[-0.035em] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] ${
              hasImage
                ? "text-[clamp(2rem,3.6vw,3.25rem)] group-hover:translate-x-1.5"
                : "text-[clamp(2.25rem,4.2vw,3.75rem)]"
            }`}
          >
            {project.name}
          </h3>

          <p className="mt-6 max-w-xl text-[1rem] leading-[1.8] text-mist">
            {project.body}
          </p>

          <div className="mt-10">
            <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim/70">
              Services réalisés
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-2">
              {project.services.map((s, j) => (
                <li key={s} className="flex items-center gap-3.5">
                  {j > 0 && (
                    <span aria-hidden="true" className="h-3 w-px bg-white/15" />
                  )}
                  <span className="text-[0.875rem] text-mist">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={href}
            className="mt-11 inline-flex items-center gap-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk transition-colors duration-500 hover:text-violet-300"
          >
            <span className="link-wipe">Voir le projet</span>
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
            />
          </Link>
        </div>

        {hasImage ? (
          <MouseParallax
            className={`relative ${flip ? "lg:order-2" : "lg:order-1"}`}
          >
            <Link
              href={href}
              aria-label={`${project.name} — voir le projet`}
              className="relative block aspect-[4/3] overflow-hidden rounded-sm"
            >
              <div
                className="absolute inset-[-3%]"
                style={{
                  transform:
                    "translate3d(calc(var(--px,0) * 8px), calc(var(--py,0) * 6px), 0)",
                }}
              >
                <Image
                  src={project.image as string}
                  alt={`Aperçu du site ${project.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
              </div>

              <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-void/70 via-transparent to-transparent pb-7 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <span className="inline-flex translate-y-2 items-center gap-2.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-chalk transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-0">
                  Voir le projet
                  <Icon name="arrow" className="size-4" />
                </span>
              </span>
            </Link>
          </MouseParallax>
        ) : (
          <div
            aria-hidden="true"
            className="relative hidden aspect-[4/3] lg:order-2 lg:block"
          >
            <span className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-white/[0.14] to-transparent" />
            <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-white/[0.14] to-transparent" />
            <span className="absolute left-0 top-0 h-px w-14 bg-violet-500/60" />
          </div>
        )}
      </div>
    </article>
  );
}

export function ProjectsList() {
  return (
    <section className="py-24 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            data-reveal
            className={i > 0 ? "mt-24 lg:mt-32" : ""}
          >
            <ProjectEntry project={project} flip={i % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}
