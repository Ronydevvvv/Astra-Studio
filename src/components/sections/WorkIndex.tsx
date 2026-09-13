import Link from "next/link";
import Image from "next/image";
import { projects, projectsHome, projectStatusLabel } from "@/lib/content";
import { Lines } from "@/components/ui/Lines";

/**
 * The work, given the most room on the page.
 *
 * THERE ARE NO PROJECT IMAGES IN THIS REPOSITORY. Both entries are
 * text-led by necessity (see `projects` in content.ts), so the layout is
 * built to be strong without photography: the project name is set at
 * display scale and carries the block on its own, with the metadata
 * placed as a small column beside it.
 *
 * `image` drives the composition rather than merely filling a slot —
 * the day a real screenshot lands, the entry gains a full-width plate
 * that opens from a clip and settles from 1.04 to 1, and the type steps
 * back to make room. Nothing needs rebuilding for that to happen.
 */
export function WorkIndex({ heading = true }: { heading?: boolean }) {
  return (
    <section className={heading ? "air-md" : "pb-24 md:pb-32"}>
      <div className="shell">
        {heading && (
          <div
            className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8"
            data-reveal
          >
            <div>
              <p className="eyebrow">{projectsHome.eyebrow}</p>
              <Lines
                as="h2"
                lines={projectsHome.title}
                mutedFrom={1}
                className="t-display mt-8 max-w-[14ch]"
              />
            </div>

            <Link
              href={projectsHome.link.href}
              className="underline-draw eyebrow text-mist transition-colors duration-500 hover:text-chalk"
            >
              {projectsHome.link.label}
            </Link>
          </div>
        )}

        <div className={heading ? "mt-24 lg:mt-40" : ""}>
          {projects.map((project, i) => (
            <article
              key={project.slug}
              data-reveal
              className={i > 0 ? "mt-32 lg:mt-48" : ""}
            >
              <Link href={`/realisations/${project.slug}`} className="group block">
                {/* --- meta rail --- */}
                <div className="flex items-baseline justify-between gap-6 border-t border-[var(--hairline)] pt-6">
                  <span className="eyebrow">{project.index}</span>
                  <span className="eyebrow">
                    {projectStatusLabel[project.status]}
                  </span>
                </div>

                {/* --- name --- */}
                <h3 className="t-display mt-12 transition-transform duration-1000 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-3 md:mt-16">
                  {project.name}
                </h3>

                {/* --- plate, only when a real image exists --- */}
                {project.image && (
                  <div className="plate mt-14 aspect-[16/9] w-full md:mt-20">
                    <Image
                      src={project.image}
                      alt={`Aperçu du site ${project.name}`}
                      width={1920}
                      height={1080}
                      sizes="100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* --- copy --- */}
                <div className="mt-12 grid gap-x-20 gap-y-8 md:mt-16 lg:grid-cols-[minmax(0,1fr)_18rem]">
                  <p className="t-lead max-w-[46ch] text-mist">{project.body}</p>

                  <dl className="text-[0.9375rem]">
                    <dt className="eyebrow">{project.category}</dt>
                    <dd className="mt-4 space-y-1.5 text-dim">
                      {project.services.map((s) => (
                        <span key={s} className="block">
                          {s}
                        </span>
                      ))}
                    </dd>
                  </dl>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
