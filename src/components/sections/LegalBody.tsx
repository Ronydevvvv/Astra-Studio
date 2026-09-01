import type { LegalSection } from "@/lib/content";

/**
 * Shared body for the three legal pages.
 *
 * Every unset value reads "à renseigner" in the copy itself rather than as a
 * plausible-looking placeholder — a fake SIRET or address that ships by
 * accident is a legal problem, not a cosmetic one. The intro states that the
 * document is a template so nobody mistakes it for a reviewed text.
 */
export function LegalBody({
  intro,
  sections,
}: {
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="pb-28 md:pb-36 lg:pb-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-start">
          {/* Sticky index — a legal page is scanned, not read start to end. */}
          <nav
            aria-label="Sommaire"
            className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)]"
          >
            <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              Sommaire
            </p>
            <ol className="mt-6 space-y-3">
              {sections.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-display text-[0.6875rem] tracking-[0.16em] text-violet-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#s-${i + 1}`}
                    className="text-[0.9375rem] text-mist transition-colors duration-300 hover:text-chalk"
                  >
                    <span className="link-wipe">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            <p
              className="border-l-2 border-violet-500/50 py-1 pl-6 text-[0.9375rem] leading-[1.8] text-mist"
              data-reveal
            >
              {intro}
            </p>

            {sections.map((s, i) => (
              <section
                key={s.title}
                id={`s-${i + 1}`}
                data-reveal
                className="mt-16 scroll-mt-32 border-t border-white/[0.09] pt-8"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[0.6875rem] tracking-[0.16em] text-violet-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[1.5rem] font-medium tracking-[-0.025em]">
                    {s.title}
                  </h2>
                </div>

                <div className="mt-6 space-y-4">
                  {s.body.map((p) => (
                    <p
                      key={p}
                      className="max-w-2xl text-[0.9375rem] leading-[1.85] text-mist"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
