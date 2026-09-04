import Image from "next/image";
import Link from "next/link";
import { projects, projectStatusLabel, type Project } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { ProjectMockup } from "@/components/ui/ProjectMockup";

/**
 * Editorial case-study rows, not a hover-dependent list.
 *
 * The previous version kept every visual hidden behind a desktop-only hover
 * (a sticky preview) and a plain text row — on first paint, three lines of
 * names on a mostly empty page. Every project now carries its own real
 * image at full size, alternating sides, so the section reads as proof of
 * work the moment it enters the viewport rather than after an interaction
 * a touch device can't even perform.
 */
function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/[0.07]">
        <Image
          src={project.image}
          alt={`Aperçu du site ${project.name}`}
          fill
          sizes="(max-width: 1024px) 100vw, 42rem"
          className="object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
        {/* A discrete light sweep on hover — the "premium, not just a
            bigger picture" cue asked for in the brief, kept subtle enough
            not to fight the photo itself. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(154,107,255,0.16),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      </div>
    );
  }
  return (
    <div className="rounded-md border border-white/[0.07] p-6">
      <ProjectMockup name={project.name} category={project.category} />
    </div>
  );
}

/**
 * Three distinct visual tiers, not a binary live/not-live — "built" (real
 * work, not yet published) and "creative" (an ASTRA concept, no client) look
 * different from each other on purpose. Collapsing them into the same dim
 * badge would flatten exactly the honesty distinction content.ts encodes:
 * Terralec is finished work; Mistral Pizza never had a client at all.
 */
function StatusBadge({ status }: { status: Project["status"] }) {
  const isLive = status === "delivered";
  const isBuilt = status === "built";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.6875rem] uppercase tracking-[0.16em] ${
        isLive
          ? "border-violet-400/40 bg-violet-500/10 text-violet-300"
          : isBuilt
            ? "border-violet-300/25 bg-transparent text-violet-200/90"
            : "border-white/[0.12] bg-white/[0.02] text-slate-dim"
      }`}
    >
      {isLive && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-violet-400" />
        </span>
      )}
      {isBuilt && (
        <Icon name="check" className="size-3 shrink-0 text-violet-300" />
      )}
      {projectStatusLabel[status]}
    </span>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <li
      className="group border-t border-white/[0.09] py-16 first:border-t-0 md:py-20"
      data-reveal
    >
      <Link
        href={`/realisations/${project.slug}`}
        className="grid gap-x-14 gap-y-10 lg:grid-cols-2 lg:items-center"
      >
        <div className={flip ? "lg:order-2" : "lg:order-1"}>
          <ProjectVisual project={project} />
        </div>

        <div className={flip ? "lg:order-1" : "lg:order-2"}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
              {project.index}
            </span>
            <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-slate-dim">
              {project.category}
            </span>
            <StatusBadge status={project.status} />
          </div>

          <h3 className="mt-5 text-[clamp(2.75rem,6.4vw,5.25rem)] font-medium uppercase leading-[0.9] tracking-[-0.035em] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-violet-300">
            {project.name.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h3>

          <p className="mt-7 max-w-lg text-[0.9375rem] leading-[1.8] text-mist">
            {project.body}
          </p>

          <ul className="mt-6 flex flex-wrap items-center gap-x-3.5 gap-y-2">
            {project.services.map((s, j) => (
              <li key={s} className="flex items-center gap-3.5">
                {j > 0 && (
                  <span aria-hidden="true" className="h-3 w-px bg-white/15" />
                )}
                <span className="text-[0.875rem] text-mist">{s}</span>
              </li>
            ))}
          </ul>

          {/* Same markup as the shared ArrowLink (ring, then label, same
              hover fill) — the whole card is already the link, so ArrowLink
              itself can't be nested here, but the visual language must be
              identical rather than a close-but-different reimplementation. */}
          <span className="mt-8 inline-flex items-center gap-4 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk transition-colors duration-500 group-hover:text-violet-300">
            <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-violet-400/70">
              <span
                aria-hidden="true"
                className="absolute inset-0 scale-0 rounded-full bg-violet-500/15 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-100"
              />
              <Icon
                name="arrow"
                className="relative size-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5"
              />
            </span>
            Voir le projet
          </span>
        </div>
      </Link>
    </li>
  );
}

export function ProjectsList() {
  return (
    <section className="py-14 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <ul>
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} flip={i % 2 === 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
