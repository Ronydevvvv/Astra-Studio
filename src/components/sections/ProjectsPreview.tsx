import Link from "next/link";
import { projects, projectsHome, projectStatusLabel } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The work, set as an index.
 *
 * There are no project screenshots in this repository yet — both entries
 * are text-led on purpose (see `projects` in content.ts). A gallery of
 * placeholder plates would be the single most dishonest thing on the
 * site, so the presentation is built to be strong WITHOUT imagery:
 * the project name is set at near-display scale and carries the row,
 * the metadata sits in fixed columns beside it, and the status is
 * stated plainly rather than implied.
 *
 * When a real image lands, the row has a natural place for it — the
 * layout is already a full-width band, not a card that would have to
 * be rebuilt.
 */
export function ProjectsPreview() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          index="01"
          label={projectsHome.eyebrow}
          title={
            <>
              <span className="block">{projectsHome.title[0]}</span>
              <span className="block text-mist">{projectsHome.title[1]}</span>
            </>
          }
          link={projectsHome.link}
        />

        <ul className="mt-16 border-t border-[var(--hairline)] lg:mt-24">
          {projects.map((project, i) => (
            <li
              key={project.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <Link
                href={`/realisations/${project.slug}`}
                className="group grid grid-cols-1 items-baseline gap-x-10 gap-y-4 border-b border-[var(--hairline)] py-10 lg:grid-cols-[3rem_minmax(0,1fr)_14rem_9rem] lg:py-14"
              >
                <span className="t-mono text-slate-dim">{project.index}</span>

                <h3 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2">
                  {project.name}
                </h3>

                <p className="t-mono text-mist">{project.category}</p>

                <p className="t-mono text-slate-dim lg:text-right">
                  {projectStatusLabel[project.status]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
