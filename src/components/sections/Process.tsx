import Image from "next/image";
import { process, processIntro } from "@/lib/content";
import { Starfield } from "@/components/ui/Starfield";
import { ScrollTrack } from "@/components/ui/ScrollTrack";

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
        <ScrollTrack steps={process.length} className="relative mt-24 hidden lg:block">
          {/* The rule sits at the figures' foot line, behind them, and its
              fill now tracks actual scroll position via --progress rather
              than drawing once on enter — the section becomes something you
              travel through instead of a fade-in. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[248px] h-px overflow-hidden bg-white/[0.06]"
          >
            <span
              className="block h-px origin-left bg-[linear-gradient(90deg,rgba(124,58,245,0.9),rgba(154,107,255,0.9))]"
              style={{ transform: "scaleX(var(--progress, 0))" }}
            />
          </div>

          <ol className="relative grid grid-cols-4 gap-x-6">
            {process.map((step, i) => (
              <li
                key={step.index}
                data-step
                className="group relative flex flex-col items-center text-center opacity-80 grayscale-[0.35] transition-[opacity,filter] duration-700 [transition-timing-function:var(--ease-out-expo)] data-[active]:opacity-100 data-[active]:grayscale-0"
              >
                {/* A light that only exists behind the current step — the
                    scene has one spotlight that moves from figure to
                    figure as you scroll, instead of four static columns
                    with no sense of "here is where we are now". */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[70px] size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/0 opacity-0 blur-2xl transition-[opacity,background-color] duration-700 group-data-[active]:bg-violet-600/25 group-data-[active]:opacity-100"
                />

                {/* Identical CSS height across all four — this is what
                    reproduces the source strip's relative scale. */}
                <div className="relative flex h-[260px] items-end justify-center">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={step.width}
                    height={step.height}
                    sizes="(max-width: 1280px) 22vw, 260px"
                    className="animate-float relative h-[240px] w-auto scale-95 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1.5 group-data-[active]:scale-100"
                    style={{ animationDelay: `${i * 900}ms` }}
                  />
                </div>

                {/* Node on the line — fills solid once its step is reached. */}
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-[-5px] block size-2.5 rounded-full border border-violet-400/70 bg-void transition-colors duration-500 group-hover:bg-violet-500 group-data-[active]:bg-violet-400 group-data-[active]:shadow-[0_0_12px_2px_rgba(154,107,255,0.6)]"
                />

                <span className="relative mt-7 font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
                  {step.index}
                </span>
                {/* The active step's title steps up in scale and color —
                    "here is the one you should be reading right now",
                    not identical typographic weight across all four. */}
                <h3 className="relative mt-3 text-[1.375rem] font-medium tracking-[-0.02em] transition-[color,transform] duration-500 [transition-timing-function:var(--ease-out-expo)] group-data-[active]:scale-[1.08] group-data-[active]:text-violet-200">
                  {step.title}
                </h3>
                <p className="relative mt-3.5 max-w-[15rem] text-[0.875rem] leading-[1.7] text-mist">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </ScrollTrack>

        {/* ---------------- mobile: vertical timeline ---------------- */}
        <ScrollTrack steps={process.length} className="relative mt-16 lg:hidden">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[46px] top-6 w-px overflow-hidden bg-white/[0.06]"
          >
            <span
              className="block w-px origin-top bg-[linear-gradient(180deg,rgba(124,58,245,0.9),rgba(154,107,255,0.9))]"
              style={{ height: "100%", transform: "scaleY(var(--progress, 0))" }}
            />
          </span>
          <ol className="relative">
          {process.map((step) => (
            <li
              key={step.index}
              data-step
              className="group relative flex gap-6 opacity-80 transition-opacity duration-700 [transition-timing-function:var(--ease-out-expo)] data-[active]:opacity-100 [&+&]:mt-14"
            >
              <div className="relative z-10 flex w-[92px] shrink-0 justify-center">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 size-[86px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(80,15,217,0.16),transparent_70%)] transition-[background-color] duration-700 group-data-[active]:bg-[radial-gradient(circle,rgba(154,107,255,0.4),transparent_70%)]"
                />
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  sizes="92px"
                  className="relative h-[92px] w-auto transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-data-[active]:scale-105"
                />
              </div>

              <div className="min-w-0 pt-1">
                <span className="font-display text-[0.6875rem] tracking-[0.2em] text-violet-400">
                  {step.index}
                </span>
                <h3 className="mt-2 text-[1.25rem] font-medium tracking-[-0.02em] transition-colors duration-500 group-data-[active]:text-violet-200">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.7] text-mist">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
          </ol>
        </ScrollTrack>
      </div>
    </section>
  );
}
