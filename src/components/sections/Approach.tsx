import Image from "next/image";
import { about } from "@/lib/content";

/**
 * The one section that carries the lightbulb astronaut.
 *
 * Image left, editorial right, and a lot of empty space — the character is
 * the argument here ("a good idea is not enough"), not decoration, which is
 * why it appears on this page and nowhere else.
 *
 * The asset was re-keyed by scripts/repair-assets.mjs: its studio background
 * is gone and the detached fragments left by the first key are removed, while
 * the bulb's radiating strokes — legitimately separate components — are kept.
 */
export function Approach({ heading = true }: { heading?: boolean }) {
  return (
    <section
      id="a-propos"
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
    >
      <div className="glow left-[-12%] top-[18%] size-[34rem] bg-violet-700/[0.14]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
          {/* --- character --- */}
          <div className="relative" data-reveal>
            <div className="animate-float mx-auto max-w-[380px] lg:max-w-none">
              <Image
                src="/assets/idea-astronaut.webp"
                alt="Astronaute ASTRA tenant une ampoule allumée au bout du doigt"
                width={888}
                height={1214}
                sizes="(max-width: 1024px) 60vw, 34vw"
                className="h-auto w-full"
              />
            </div>
          </div>

          {/* --- editorial --- */}
          <div>
            {heading && (
              <div data-reveal>
                <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-violet-500/70"
                  />
                  {about.eyebrow}
                </p>
                <h2 className="mt-8 text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.038em]">
                  <span className="block">{about.title[0]}</span>
                  <span className="block text-mist">{about.title[1]}</span>
                </h2>
              </div>
            )}

            {heading && (
              <p
                className="mt-8 max-w-xl text-[1.0625rem] leading-[1.8] text-mist"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
              >
                {about.lead}
              </p>
            )}

            <ol className={heading ? "mt-14" : ""}>
              {about.blocks.map((block, i) => (
                <li
                  key={block.title}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
                  className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 border-t border-white/[0.09] py-7"
                >
                  <span className="font-display text-[0.75rem] tracking-[0.2em] text-slate-dim transition-colors duration-500 group-hover:text-violet-300">
                    {block.index}
                  </span>
                  <div>
                    <h3 className="text-[1.125rem] font-medium tracking-[-0.015em]">
                      {block.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.75] text-mist">
                      {block.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
