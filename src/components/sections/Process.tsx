import Image from "next/image";
import { process, processIntro } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The signature, handled quietly.
 *
 * The four figures were cut from one source strip at an identical 724px
 * height, so a single CSS height reproduces their original relative
 * scale and shared ground line for free — that is what makes them read
 * as one plate rather than four stickers.
 *
 * What has been removed, and why: the starfield behind them, the violet
 * connecting line, the ringed nodes on that line, the radial glow under
 * each mobile figure, and the permanent float. Together those turned a
 * genuine illustration set into a game HUD. What is left is the artwork,
 * a neutral ground rule, and set type — the figures now carry the
 * personality on their own, which is the only way they read as art
 * direction rather than decoration.
 */
export function Process() {
  return (
    <section
      id="processus"
      className="border-t border-[var(--hairline)] bg-ink py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <SectionHeading
          index="04"
          label={processIntro.eyebrow}
          title={
            <>
              <span className="block">{processIntro.title[0]}</span>
              <span className="block text-mist">{processIntro.title[1]}</span>
            </>
          }
        />

        {/* ---------------- desktop: one plate, four figures ---------------- */}
        <div className="relative mt-24 hidden lg:block">
          {/* Ground rule at the figures' foot line. Neutral, and drawn by the
              page's one reveal observer rather than its own animation. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[208px] h-px overflow-hidden"
          >
            <span
              data-reveal
              className="draw-x block h-px bg-[var(--hairline-strong)]"
            />
          </div>

          <ol className="relative grid grid-cols-4 gap-x-10">
            {process.map((step, i) => (
              <li
                key={step.index}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${120 + i * 110}ms` }}
                className="group relative"
              >
                <div className="flex h-[208px] items-end">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={step.width}
                    height={step.height}
                    sizes="(max-width: 1280px) 22vw, 220px"
                    /* Held slightly back so the figures sit in the page
                       instead of on top of it; they come fully forward on
                       hover, which is the section's only interaction. */
                    className="h-[192px] w-auto opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="pt-8">
                  <span className="t-mono text-slate-dim">{step.index}</span>
                  <h3 className="t-h3 mt-4">{step.title}</h3>
                  <p className="t-body mt-3 max-w-[22ch] text-mist">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ---------------- mobile: ruled list ---------------- */}
        <ol className="mt-14 lg:hidden">
          {process.map((step, i) => (
            <li
              key={step.index}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="flex items-start gap-6 border-t border-[var(--hairline)] py-7"
            >
              <Image
                src={step.image}
                alt={step.alt}
                width={step.width}
                height={step.height}
                sizes="72px"
                className="h-[72px] w-auto shrink-0 opacity-80"
              />
              <div className="min-w-0 pt-1">
                <span className="t-mono text-slate-dim">{step.index}</span>
                <h3 className="t-h3 mt-3">{step.title}</h3>
                <p className="t-body mt-2.5 text-mist">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
