import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

/** Static params so every project detail page is prerendered. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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
 * The `study` block is optional and unset for every current entry, because no
 * project has been delivered yet. Rather than print empty headings, the page
 * renders what it actually has — the brief, the services, the category — and
 * says plainly that the full study follows the delivery. Fill `study` in
 * content.ts and the objective / direction / approach / outcome sections and
 * the gallery appear on their own.
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
      <PageHero eyebrow={project.category} title={[project.name]}>
        <dl className="mt-14 grid max-w-3xl gap-x-12 gap-y-8 border-t border-white/[0.09] pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              Année
            </dt>
            <dd className="mt-3 text-[0.9375rem] text-mist">{project.year}</dd>
          </div>
          <div>
            <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              Catégorie
            </dt>
            <dd className="mt-3 text-[0.9375rem] text-mist">
              {project.category}
            </dd>
          </div>
          <div>
            <dt className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              Services
            </dt>
            <dd className="mt-3 text-[0.9375rem] leading-[1.7] text-mist">
              {project.services.join(", ")}
            </dd>
          </div>
        </dl>
      </PageHero>

      {/* --- lead visual --- */}
      {project.image && (
        <section className="px-6 md:px-10 xl:px-16">
          <div
            className="relative mx-auto aspect-[16/9] max-w-[1440px] overflow-hidden rounded-sm"
            data-reveal
          >
            <Image
              src={project.image}
              alt={`Aperçu du site ${project.name}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

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

              {study?.gallery && study.gallery.length > 0 && (
                <div className="mt-16 grid gap-6 sm:grid-cols-2" data-reveal>
                  {study.gallery.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-sm"
                    >
                      <Image
                        src={src}
                        alt={`${project.name} — visuel du projet`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p
              className="mt-20 max-w-2xl border-l-2 border-violet-500/50 py-1 pl-6 text-[0.9375rem] leading-[1.8] text-mist lg:mt-24"
              data-reveal
            >
              L&apos;étude de cas complète — objectif, direction artistique,
              déroulé et résultat — est publiée après la livraison du projet.
            </p>
          )}
        </div>
      </section>

      {/* --- next --- */}
      {projects.length > 1 && (
        <section className="pb-24 md:pb-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
            <Link
              href={`/realisations/${next.slug}`}
              className="group flex flex-wrap items-baseline justify-between gap-6 border-t border-white/[0.09] py-10 transition-colors duration-500 hover:bg-white/[0.015]"
            >
              <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                Projet suivant
              </span>
              <span className="flex items-center gap-4 text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.03em] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5">
                {next.name}
                <Icon name="arrow" className="size-5 text-violet-400" />
              </span>
            </Link>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
