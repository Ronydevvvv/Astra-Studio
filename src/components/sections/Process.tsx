import Image from "next/image";
import { process, processIntro } from "@/lib/content";
import { Starfield } from "@/components/ui/Starfield";

/**
 * ONE SCENE, FOUR FIGURES.
 *
 * The four characters were cut from a single source strip at an identical
 * 724px height, so rendering them at one CSS height reproduces their original
 * relative scale and shared ground line for free. That is what makes them
 * read as one composition rather than four stickers — no card, no frame, no
 * panel around any of them.
 *
 * The connecting line runs BEHIND the figures at their foot line and draws
 * itself left-to-right when the section enters the viewport, using the same
 * `data-reveal` observer as the rest of the page (`--reveal-delay` staggers
 * each figure after it).
 */
export function Process() {
  return (
    <section
      id="processus"
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
    >
      <div className="pointer-events-none absolute inset-0">
        <Starfield className="opacity-60" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div data-reveal>
          <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
            <span aria-hidden="true" className="h-px w-8 bg-violet-500/70" />
            {processIntro.eyebrow}
          </p>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em]">
            <span className="block">{processIntro.title[0]}</span>
            <span className="block text-violet-400">
              {processIntro.title[1]}
            </span>
          </h2>
        </div>

        {/* ---------------- desktop: horizontal scene ---------------- */}
        <div className="relative mt-24 hidden lg:block">
          {/* The rule sits at the figures' foot line and is drawn by the
              reveal observer. It is behind them (-z-0 under the figures'
              relative stacking) so it reads as ground, not as a divider. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[248px] h-px overflow-hidden"
          >
            <span
              data-reveal
              className="draw-x block h-px bg-[linear-gradient(90deg,transparent,rgba(124,58,245,0.55)_12%,rgba(124,58,245,0.55)_88%,transparent)]"
            />
          </div>

          <ol className="relative grid grid-cols-4 gap-x-6">
            {process.map((step, i) => (
              <li
                key={step.index}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 140}ms` }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Identical CSS height across all four — this is what
                    reproduces the source strip's relative scale. */}
                <div className="relative flex h-[260px] items-end justify-center">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={step.width}
                    height={step.height}
                    sizes="(max-width: 1280px) 22vw, 260px"
                    className="animate-float h-[240px] w-auto transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1.5"
                    style={{ animationDelay: `${i * 900}ms` }}
                  />
                </div>

                {/* Node on the line. */}
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-[-5px] block size-2.5 rounded-full border border-violet-400/70 bg-void transition-colors duration-500 group-hover:bg-violet-500"
                />

                <span className="mt-7 font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
                  {step.index}
                </span>
                <h3 className="mt-3 text-[1.375rem] font-medium tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3.5 max-w-[15rem] text-[0.875rem] leading-[1.7] text-mist">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ---------------- mobile: vertical timeline ---------------- */}
        <ol className="relative mt-16 lg:hidden">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[46px] top-6 w-px bg-[linear-gradient(180deg,transparent,rgba(124,58,245,0.4)_10%,rgba(124,58,245,0.4)_90%,transparent)]"
          />
          {process.map((step, i) => (
            <li
              key={step.index}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              className="relative flex gap-6 [&+&]:mt-14"
            >
              <div className="relative z-10 flex w-[92px] shrink-0 justify-center">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 size-[86px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(80,15,217,0.3),transparent_70%)]"
                />
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  sizes="92px"
                  className="relative h-[92px] w-auto"
                />
              </div>

              <div className="min-w-0 pt-1">
                <span className="font-display text-[0.6875rem] tracking-[0.2em] text-violet-400">
                  {step.index}
                </span>
                <h3 className="mt-2 text-[1.25rem] font-medium tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.7] text-mist">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
