import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectStatusLabel, services, type IconName } from "@/lib/content";
import { CTA } from "@/components/sections/CTA";
import { Icon } from "@/components/ui/Icon";
import { ProjectMockup } from "@/components/ui/ProjectMockup";
import { ServiceVisual } from "@/components/ui/ServiceVisual";
import { Starfield } from "@/components/ui/Starfield";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

/** Static params so every project detail page is prerendered. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/**
 * Loosely maps one of THIS project's own services (real data, e.g.
 * "Développement Shopify") to the closest icon in the six-service catalog
 * (e.g. "code" from "Développement") purely for visual variety — it never
 * invents a service the project doesn't list, only picks a matching glyph
 * for one that's already there.
 */
function matchIcon(label: string): IconName | null {
  const l = label.toLowerCase();
  return services.find((s) => l.includes(s.title.toLowerCase()))?.icon ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return pageMetadata({
    title: project.name,
    description: project.body,
    path: `/realisations/${project.slug}`,
  });
}

/**
 * Case-study page.
 *
 * The `study` block is optional per project: when it's set (all three
 * current entries have one), the full narrative — context, objective,
 * direction, build, outcome, gallery — renders below. When a future project
 * is added without one yet, the page falls back to what it actually has —
 * the brief, the services, the category — rather than printing empty
 * headings, and says plainly that the full study follows.
 */
export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const study = project.study;

  const chapters = study
    ? [
        { title: "Contexte", body: study.context },
        { title: "Objectif", body: study.objective },
        { title: "Direction artistique", body: study.direction },
        { title: "Conception & développement", body: study.build },
        { title: "Résultat", body: study.outcome },
      ]
    : [];

  return (
    <>
      {/* --- case-study hero: a scene, not a text masthead ---
          Deliberately its own composition rather than the shared PageHero:
          a portfolio entry is the one place the site should sell itself
          visually, the same way the home hero does. */}
      <section className="relative isolate overflow-hidden pt-[var(--nav-h)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Starfield className="opacity-70" />
          <div className="glow left-1/2 top-0 size-72 -translate-x-1/2 bg-violet-700/[0.16] md:size-[44rem]" />
        </div>

        <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-16 md:px-10 md:pb-24 lg:pb-28 lg:pt-24 xl:px-16">
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
            data-reveal
          >
            <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
              <span aria-hidden="true" className="h-px w-8 bg-violet-500/70" />
              {project.category}
            </p>
            <span
              aria-hidden="true"
              className="hidden h-1 w-1 rounded-full bg-white/20 sm:block"
            />
            <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              {projectStatusLabel[project.status]} · {project.year}
            </span>
          </div>

          <h1
            className="mt-6 text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.92] tracking-[-0.045em]"
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            {project.name}
          </h1>

          <div
            className="mt-9 flex flex-wrap gap-2.5"
            data-reveal
            style={{ ["--reveal-delay" as string]: "160ms" }}
          >
            {project.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-1.5 text-[0.75rem] text-mist"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- lead visual --- */}
      <section className="px-6 md:px-10 xl:px-16">
        <div className="relative mx-auto max-w-[1200px]" data-reveal>
          {project.image ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
              <Image
                src={project.image}
                alt={`Aperçu du site ${project.name}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <ProjectMockup
                name={project.name}
                category={project.category}
                variant="hero"
                live={project.status === "delivered"}
              />
            </div>
          )}
        </div>
      </section>

      {/* --- brief --- */}
      <section className="py-24 md:py-28 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
          <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <h2
              className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim"
              data-reveal
            >
              Présentation
            </h2>
            <p
              className="max-w-2xl text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.65] tracking-[-0.015em] text-chalk"
              data-reveal
            >
              {project.body}
            </p>
          </div>

          {/* --- context strip: category, ASTRA's role, current status —
              three real facts given equal visual weight, rather than
              leaving the hero chips as the only place this information
              lives. --- */}
          <div
            className="mt-14 grid gap-x-10 gap-y-8 border-t border-white/[0.09] pt-10 sm:grid-cols-3 lg:pl-[calc(8.3333%+2.5rem)]"
            data-reveal
          >
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                Contexte
              </dt>
              <dd className="mt-3 text-[0.9375rem] leading-[1.7] text-mist">
                {project.category}
              </dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                Rôle d&apos;ASTRA
              </dt>
              <dd className="mt-3 text-[0.9375rem] leading-[1.7] text-mist">
                {project.services.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                Statut
              </dt>
              <dd className="mt-3 text-[0.9375rem] leading-[1.7] text-mist">
                {projectStatusLabel[project.status]}
              </dd>
            </div>
          </div>

          {/* --- what was actually done: the project's own services, given
              visual weight instead of sitting only as small chips in the
              hero — real data (project.services), not an invented feature
              list. --- */}
          <div
            className="mt-20 grid gap-x-10 gap-y-12 border-t border-white/[0.09] pt-16 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
            data-reveal
          >
            {project.services.map((s, i) => {
              const icon = matchIcon(s);
              return (
                <div key={s} style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                  <div className="flex items-center gap-3">
                    <Icon name={icon ?? "check"} className="size-5 text-violet-400/80" />
                    <span className="font-display text-[0.6875rem] tracking-[0.16em] text-slate-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.015em]">
                    {s}
                  </h3>
                  {icon && (
                    <div className="mt-5 rounded-md border border-white/[0.07] bg-white/[0.015] px-4 py-5">
                      <ServiceVisual icon={icon} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {chapters.length > 0 ? (
            <div className="mt-24 lg:mt-32">
              {chapters.map((c, i) => (
                <div
                  key={c.title}
                  data-reveal
                  className="grid gap-x-20 gap-y-6 border-t border-white/[0.09] py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-[0.6875rem] tracking-[0.16em] text-violet-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[1.25rem] font-medium tracking-[-0.02em]">
                      {c.title}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-[0.9375rem] leading-[1.85] text-mist">
                    {c.body}
                  </p>
                </div>
              ))}

              {/* --- desktop / mobile, side by side: the responsive claim
                  made in "Conception & développement" shown, not just
                  stated — real captures of the same screen at two widths. --- */}
              {study?.mobileImage && (
                <div
                  className="mt-16 grid grid-cols-[minmax(0,1fr)_minmax(0,12rem)] items-end gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]"
                  data-reveal
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/[0.07]">
                    <Image
                      src={project.image ?? study.gallery?.[0]?.src ?? study.mobileImage}
                      alt={`${project.name} — version desktop`}
                      fill
                      sizes="(max-width: 640px) 70vw, 60vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative aspect-[9/16] overflow-hidden rounded-sm border border-white/[0.07]">
                    <Image
                      src={study.mobileImage}
                      alt={`${project.name} — version mobile`}
                      fill
                      sizes="(max-width: 640px) 30vw, 15rem"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              )}

              {study?.gallery && study.gallery.length > 0 && (
                <div className="mt-16 grid gap-6 sm:grid-cols-2" data-reveal>
                  {study.gallery.map((img, i) => (
                    <div
                      key={img.src}
                      className={
                        i === 0
                          ? "relative aspect-[16/10] overflow-hidden rounded-sm sm:col-span-2"
                          : "relative aspect-[4/3] overflow-hidden rounded-sm"
                      }
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={i === 0 ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* --- demo clip: only rendered when a real one exists (Mistral
                  Pizza's kitchen four). Muted/looped, metadata-only preload
                  so the page doesn't ship the full file to every visitor —
                  it starts downloading once the visitor actually presses
                  play. --- */}
              {study?.video && (
                <div className="mt-16" data-reveal>
                  <video
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={project.image}
                    className="aspect-video w-full rounded-sm border border-white/[0.07] bg-black"
                  >
                    <source src={study.video} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
          ) : (
            <div
              className="mt-20 max-w-2xl rounded-md border border-white/[0.09] bg-white/[0.015] p-8 lg:mt-24"
              data-reveal
            >
              <p className="text-[0.9375rem] leading-[1.8] text-mist">
                L&apos;étude de cas complète est publiée après la livraison du
                projet. Voici ce qu&apos;elle couvrira :
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Contexte", "Direction artistique", "Conception & développement", "Résultat"].map(
                  (label) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 text-[0.875rem] text-slate-dim"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-full border border-white/25"
                      />
                      {label}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* --- next: a real thumbnail rather than a text-only link, so this
          reads as editorial navigation (turn the page) instead of a
          "related links" footer pattern. --- */}
      {projects.length > 1 && (
        <section className="pb-24 md:pb-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
            <Link
              href={`/realisations/${next.slug}`}
              className="group grid gap-8 border-t border-white/[0.09] py-14 transition-colors duration-500 hover:bg-white/[0.015] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:items-center lg:gap-16"
            >
              {next.image && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/[0.07] sm:order-2">
                  <Image
                    src={next.image}
                    alt={`Aperçu du site ${next.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 40rem"
                    className="object-cover transition-transform duration-[1.4s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                </div>
              )}
              <div className="sm:order-1">
                <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                  Projet suivant
                </span>
                <span className="mt-4 flex items-center gap-4 text-[clamp(2rem,5vw,3.5rem)] font-medium uppercase tracking-[-0.035em] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5">
                  {next.name}
                  <Icon name="arrow" className="size-6 shrink-0 text-violet-400" />
                </span>
              </div>
            </Link>
          </div>

          {/* --- conversion: showing the work should end by asking for the
              next one, not just by pointing at another réalisation. --- */}
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
            <p className="max-w-xl border-t border-white/[0.09] pt-10 text-[1.0625rem] leading-[1.7] text-mist">
              Un projet similaire en tête ?
              <span className="text-chalk"> Parlons-en.</span>
            </p>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
