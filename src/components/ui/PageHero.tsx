import { Starfield } from "@/components/ui/Starfield";

/**
 * Masthead for every page except the home page.
 *
 * Deliberately NOT a second version of the home hero: no character, no
 * parallax, no scene. Those belong to the landing page alone — repeating them
 * on six inner pages is how a site turns into a gallery of illustrations.
 * What carries the identity here is the type, the rule and one low ambient
 * light, which is the same vocabulary at a quieter volume.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  /** Rendered one line per entry. The last line takes the violet accent. */
  title: string[];
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-[var(--nav-h)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Starfield className="opacity-70" />
        <div className="glow left-[-14%] top-[-10%] size-[32rem] bg-violet-700/[0.13] lg:size-[42rem]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-20 md:px-10 lg:pb-28 lg:pt-28 xl:px-16">
        <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
          <span aria-hidden="true" className="h-px w-8 bg-violet-500/70" />
          {eyebrow}
        </p>

        <h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.042em]">
          {title.map((line, i) => (
            <span
              key={line}
              className={`block ${i === title.length - 1 && title.length > 1 ? "text-violet-400" : ""}`}
            >
              {line}
            </span>
          ))}
        </h1>

        {lead && (
          <p className="mt-8 max-w-xl text-[1.0625rem] leading-[1.75] text-mist">
            {lead}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
