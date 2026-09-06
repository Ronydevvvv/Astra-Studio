import Image from "next/image";
import Link from "next/link";
import { projects, projectsHome } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

/**
 * Home teaser — an index with real proof attached, not a bare table of
 * contents. The full case studies still live at /realisations (this list
 * stays a summary), but a row that only reveals a monogram on hover reads
 * as three lines of names on a mostly empty section — nothing here says
 * "real work" until a visitor happens to hover. A small, always-visible
 * thumbnail of the real project fixes that without turning this into the
 * full gallery /realisations already is.
 */
export function ProjectsPreview() {
  return (
    <section className="py-28 md:py-36 lg:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div data-reveal>
            <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
              <span aria-hidden="true" className="h-px w-8 bg-violet-500/70" />
              {projectsHome.eyebrow}
            </p>
            <h2 className="mt-8 text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em]">
              <span className="block">{projectsHome.title[0]}</span>
              <span className="block text-violet-400">
                {projectsHome.title[1]}
              </span>
            </h2>
          </div>

          <Link
            href={projectsHome.link.href}
            className="group/all inline-flex items-center gap-2.5 pb-3 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk transition-colors duration-500 hover:text-violet-300"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <span className="link-wipe">{projectsHome.link.label}</span>
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/all:translate-x-1"
            />
          </Link>
        </div>

        <ul className="mt-16 border-t border-white/[0.09] lg:mt-20">
          {projects.map((project, i) => (
            <li
              key={project.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <Link
                href={`/realisations/${project.slug}`}
                className="group flex flex-col gap-3 border-b border-white/[0.09] py-8 transition-colors duration-500 hover:bg-white/[0.015] sm:flex-row sm:items-baseline sm:gap-8 lg:py-10"
              >
                <span className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400 sm:w-12 sm:shrink-0">
                  {project.index}
                </span>

                {/* A real thumbnail, always visible — the moment this list
                    is on screen it already looks like proof of work, not a
                    table of contents waiting for a hover to prove itself.
                    Sized larger than TrustBar's own thumbnails: TrustBar is
                    the quick proof right under the hero, this index is the
                    closer, more editorial look further down the page — it
                    needs to read as its own moment, not a smaller repeat. */}
                <span className="relative hidden h-20 w-32 shrink-0 overflow-hidden rounded-sm border border-white/[0.09] sm:block">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/25 to-violet-800/10 font-display text-[0.9375rem] font-medium text-violet-200">
                      {project.name.charAt(0)}
                    </span>
                  )}
                </span>

                <span className="min-w-0 flex-1 text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-tight tracking-[-0.03em] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5">
                  {project.name}
                </span>

                <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-slate-dim sm:w-44 sm:shrink-0">
                  {project.category}
                </span>

                <Icon
                  name="arrow"
                  className="hidden size-4 shrink-0 text-slate-dim transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-violet-300 sm:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
