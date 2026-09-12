import Image from "next/image";
import Link from "next/link";
import { projects, projectStatusLabel, type Project } from "@/lib/content";
import { ArrowLink } from "@/components/ui/Button";

/**
 * Case studies. The layout follows the CONTENT, it does not compensate
 * for it.
 *
 * `image` drives the composition, not just the picture:
 *
 *   without → copy-led; the project gets the full measure and the type
 *             is set larger, because there is nothing to balance it
 *             against and a half-empty row is worse than a wide one;
 *   with    → the image becomes the subject and takes the larger half.
 *
 * The previous version filled the imageless half with two fading
 * hairlines and a violet tick — a crop-mark motif standing in for a
 * photograph. It is removed: marking out the space a missing image would
 * occupy draws attention to the gap rather than closing it.
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
    <article className="group border-t border-[var(--hairline)] pt-8">
      {/* Status rides the rule next to the year. A visitor must be able to
          tell delivered work from a creative direction at a glance —
          leaving that ambiguous is the one claim they can catch. */}
      <div className="flex items-baseline justify-between gap-6">
        <span className="t-mono text-slate-dim">{project.index}</span>
        <span className="t-mono flex items-baseline gap-4 text-slate-dim">
          <span className={project.status === "delivered" ? "text-chalk" : undefined}>
            {projectStatusLabel[project.status]}
          </span>
          <span aria-hidden="true" className="text-white/15">
            /
          </span>
          {project.year}
        </span>
      </div>

      <div
        className={`mt-10 grid gap-x-16 gap-y-10 ${
          hasImage ? "lg:grid-cols-2 lg:items-center" : ""
        }`}
      >
        <div className={hasImage && !flip ? "lg:order-2" : "lg:order-1"}>
          <p className="t-mono text-slate-dim">{project.category}</p>

          <h3
            className={`mt-5 font-medium leading-[1.03] tracking-[-0.035em] ${
              hasImage
                ? "text-[clamp(2rem,3.6vw,3rem)]"
                : "text-[clamp(2.25rem,4.6vw,3.75rem)]"
            }`}
          >
            {project.name}
          </h3>

          <p className="t-lead mt-6 max-w-[56ch] text-mist">{project.body}</p>

          <div className="mt-10">
            <p className="t-mono text-slate-dim">Services</p>
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

          <ArrowLink href={href} className="mt-11">
            Voir le projet
          </ArrowLink>
        </div>

        {hasImage && (
          <Link
            href={href}
            aria-label={`${project.name} — voir le projet`}
            className={`relative block aspect-[4/3] overflow-hidden ${
              flip ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <Image
              src={project.image as string}
              alt={`Aperçu du site ${project.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.02]"
            />
          </Link>
        )}
      </div>
    </article>
  );
}

export function ProjectsList() {
  return (
    <section className="py-20 md:py-24 lg:py-32">
      <div className="shell">
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
