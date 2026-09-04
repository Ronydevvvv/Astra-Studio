import Image from "next/image";
import Link from "next/link";
import { projects, projectStatusLabel, trust } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

/**
 * Proof cards, not a logo strip.
 *
 * The previous version was a row of wordmarks with a caption underneath —
 * correct information, but it read as a trust *bar*, the thing this section
 * is explicitly not meant to be. Each entry is now the same real thumbnail,
 * status and category /realisations already uses, sourced from `projects`
 * directly rather than a separate `trust.entries` list — one fact, one
 * place, so a project's real status can never drift between the two
 * sections. The whole card links to the case study: this is a doorway into
 * proof, not a decoration next to the section title.
 */
export function TrustBar() {
  return (
    <section aria-label={trust.eyebrow} className="relative border-b border-white/[0.06]">
      {/* Catches the dot the Hero's descent arc hands off at this exact
          seam — a lit border instead of a flat one, so the cut into this
          section reads as the trajectory landing, not a new box starting. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(154,107,255,0.55)_50%,transparent)]"
      />
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:py-20 xl:px-16">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div>
            <h2 className="text-[0.6875rem] uppercase tracking-[0.2em] text-slate-dim">
              {trust.eyebrow}
            </h2>
            <p className="mt-3 max-w-sm text-[1.0625rem] leading-[1.6] tracking-[-0.01em] text-chalk">
              {trust.lead}
            </p>
          </div>
          <Link
            href="/realisations"
            className="group/all hidden items-center gap-2.5 pb-1 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-mist transition-colors duration-500 hover:text-violet-300 sm:inline-flex"
          >
            <span className="link-wipe">Voir le travail</span>
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/all:translate-x-1"
            />
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/realisations/${project.slug}`}
                className="group/card relative flex h-full flex-col overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.015] transition-colors duration-500 hover:border-violet-400/30 hover:bg-white/[0.03]"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.07]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Aperçu du site ${project.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover/card:scale-[1.06]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/20 to-violet-900/10 font-display text-2xl font-medium text-violet-200/80">
                      {project.name.charAt(0)}
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#04050f] via-transparent to-transparent opacity-70"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-[#04050f]/70 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-mist backdrop-blur-sm">
                    {project.status === "delivered" && (
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/70" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-violet-400" />
                      </span>
                    )}
                    {projectStatusLabel[project.status]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <span className="text-[0.625rem] uppercase tracking-[0.16em] text-slate-dim">
                    {project.category}
                  </span>
                  <span className="mt-1.5 flex items-center justify-between gap-2 font-display text-[1.0625rem] font-medium tracking-[-0.015em] text-chalk transition-colors duration-300 group-hover/card:text-violet-300">
                    {project.name}
                    <Icon
                      name="arrow"
                      className="size-3.5 shrink-0 text-slate-dim transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/card:translate-x-1 group-hover/card:text-violet-300"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
