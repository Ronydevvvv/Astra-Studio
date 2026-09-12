import Image from "next/image";
import { about } from "@/lib/content";

/**
 * The one section that carries the lightbulb astronaut.
 *
 * The character is the argument here — "une bonne idée ne suffit pas" —
 * not decoration, which is why it appears on this page and nowhere else.
 * It is held at 80% opacity and no longer floats: a figure that bobs
 * continuously reads as a sticker placed on the page, while a still one
 * reads as a plate printed into it.
 *
 * The asset was re-keyed by scripts/repair-assets.mjs: its studio
 * background is gone and the fragments left by the first key are
 * removed, while the bulb's radiating strokes — legitimately separate
 * components — are kept.
 */
export function Approach({ heading = true }: { heading?: boolean }) {
  return (
    <section id="a-propos" className="py-20 md:py-28 lg:py-36">
      <div className="shell">
        <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-start">
          {/* --- character --- */}
          <div data-reveal className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <Image
              src="/assets/idea-astronaut.webp"
              alt="Astronaute ASTRA tenant une ampoule allumée au bout du doigt"
              width={888}
              height={1214}
              sizes="(max-width: 1024px) 60vw, 32vw"
              className="mx-auto h-auto w-full max-w-[320px] opacity-80 lg:max-w-none"
            />
          </div>

          {/* --- editorial --- */}
          <div>
            {heading && (
              <>
                <div data-reveal>
                  <p className="label">{about.eyebrow}</p>
                  <h2 className="t-h2 mt-7 max-w-[20ch]">
                    <span className="block">{about.title[0]}</span>
                    <span className="block text-mist">{about.title[1]}</span>
                  </h2>
                </div>

                <p
                  className="t-lead mt-8 max-w-[52ch] text-mist"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: "90ms" }}
                >
                  {about.lead}
                </p>
              </>
            )}

            <ol className={heading ? "mt-16" : ""}>
              {about.blocks.map((block, i) => (
                <li
                  key={block.title}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-6 border-t border-[var(--hairline)] py-7"
                >
                  <span className="t-mono text-slate-dim">{block.index}</span>
                  <div>
                    <h3 className="t-h3">{block.title}</h3>
                    <p className="t-body mt-3 max-w-[50ch] text-mist">
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
