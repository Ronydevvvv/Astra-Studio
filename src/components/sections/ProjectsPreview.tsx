import Image from "next/image";
import Link from "next/link";
import { projects, projectsHome, projectStatusLabel } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/lib/content";

/**
 * A real portfolio moment, not a three-line index.
 *
 * The previous version was an editorial title followed by three thin rows —
 * correct information, but nothing here said "look at this work" until a
 * visitor read the small print. This is the home page's one chance to prove
 * the studio can build things before asking for a click through to the full
 * portfolio, so the lead project gets a genuinely large stage (image,
 * status, real body copy) and the other two share a second row rather than
 * repeating the same treatment three times.
 */
function StatusBadge({ status }: { status: Project["status"] }) {
  const isLive = status === "delivered";
  const isBuilt = status === "built";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] backdrop-blur-sm ${
        isLive
          ? "border-violet-400/40 bg-[#04050f]/70 text-violet-200"
          : isBuilt
            ? "border-white/[0.16] bg-[#04050f]/70 text-mist"
            : "border-white/[0.12] bg-[#04050f]/70 text-slate-dim"
      }`}
    >
      {isLive && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-violet-400" />
        </span>
      )}
      {isBuilt && <Icon name="check" className="size-3 shrink-0" />}
      {projectStatusLabel[status]}
    </span>
  );
}

export function ProjectsPreview() {
  const [lead, ...rest] = projects;

  return (
    <section className="py-28 md:py-36 lg:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div data-reveal className="max-w-2xl">
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
            <p
              className="mt-6 max-w-md text-[1.0625rem] leading-[1.75] text-mist"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              Trois univers, trois façons différentes de résoudre un problème
              réel — un projet livré, un projet réalisé, une pièce
              conceptuelle assumée comme telle.
            </p>
          </div>

          <Button
            href={projectsHome.link.href}
            variant="quiet"
            withArrow
            className="shrink-0"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            {projectsHome.link.label}
          </Button>
        </div>

        {/* --- the lead project: a real stage, not a row --- */}
        {lead && (
          <Link
            href={`/realisations/${lead.slug}`}
            className="group mt-16 block lg:mt-20"
            data-reveal
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-white/[0.08] sm:aspect-[16/9] lg:aspect-[21/9]">
              {lead.image && (
                <Image
                  src={lead.image}
                  alt={`Aperçu du site ${lead.name}`}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#04050f] via-[#04050f]/15 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(154,107,255,0.14),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2.5 sm:left-8 sm:top-8">
                <StatusBadge status={lead.status} />
                <span className="rounded-full border border-white/[0.14] bg-[#04050f]/70 px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-mist backdrop-blur-sm">
                  {lead.category}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                <div>
                  <h3 className="text-[clamp(2rem,5.5vw,4.25rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em] text-chalk transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5">
                    {lead.name}
                  </h3>
                  <p className="mt-3 hidden max-w-md text-[0.9375rem] leading-[1.7] text-mist sm:block">
                    {lead.body}
                  </p>
                </div>
                <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-white/25 backdrop-blur-sm transition-colors duration-500 group-hover:border-violet-400/70">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 scale-0 rounded-full bg-violet-500/20 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-100"
                  />
                  <Icon
                    name="arrow"
                    className="relative size-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* --- the other two, side by side — smaller stage, same honesty --- */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((project, i) => (
            <Link
              key={project.slug}
              href={`/realisations/${project.slug}`}
              className="group block"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/[0.08]">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`Aperçu du site ${project.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#04050f] via-[#04050f]/10 to-transparent"
                />
                <div className="absolute left-4 top-4">
                  <StatusBadge status={project.status} />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
                  <div>
                    <span className="block text-[0.625rem] uppercase tracking-[0.16em] text-mist">
                      {project.category}
                    </span>
                    <h3 className="mt-1.5 text-[1.375rem] font-medium tracking-[-0.02em] text-chalk transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                      {project.name}
                    </h3>
                  </div>
                  <Icon
                    name="arrow"
                    className="mb-1 size-4 shrink-0 text-mist transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-violet-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
