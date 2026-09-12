import Image from "next/image";
import { hero } from "@/lib/content";
import { Button, ArrowLink } from "@/components/ui/Button";
import { ScrollShift } from "@/components/ui/ScrollShift";

/** Entry choreography — the page sets itself, top to bottom, ~70ms apart. */
const rise = (delay: number) => ({
  animation: `astra-in 0.8s var(--ease-out-expo) ${delay}ms both`,
});

/**
 * A masthead, not a slide.
 *
 * The previous hero was a two-column "text next to a picture" with a
 * starfield, a violet glow and a permanently floating illustration —
 * three decorative layers doing the work the composition should do.
 *
 * What replaces them:
 *
 *   - the headline is the largest thing on the page by a wide margin and
 *     is set against the left margin, so the eye has one entry point;
 *   - the astronaut is cropped by the right edge of the viewport and sits
 *     BEHIND the type at reduced contrast. Overlapping the two is what
 *     makes it one composition rather than two panels side by side;
 *   - a rule and a meta rail close the frame at the bottom, the way a
 *     masthead closes a cover. The disciplines live there — small — which
 *     is the only place the page needs to list them.
 *
 * No starfield, no glow, no float. The only motion is the entrance and a
 * 40px drift on the image as the page scrolls past it.
 */
export function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[max(560px,88svh)] flex-col justify-end overflow-hidden pt-[var(--nav-h)]"
    >
      {/* ---------------- the image, cropped by the viewport ---------------- */}
      {/* Bleeds off the right edge and is masked into the ground on its left
          and bottom, so there is no rectangle and no visible cut line. It is
          aria-hidden: the headline already says what the page is, and a
          decorative crop of an illustration adds nothing to a screen reader. */}
      {/* The source artwork carries baked-in English UI copy on its right
          third ("We create digital experiences that convert", a "Design /
          Composants / Styles" panel, a code window). That is fake marketing
          text inside the illustration, in the wrong language, and it cannot
          be edited out of the asset here — so the crop excludes it: the
          frame is zoomed onto the figure and anchored left of centre, which
          pushes those panels outside the visible window at every width. */}
      <div
        aria-hidden="true"
        /* Below lg the band is a top-right corner presence with a capped
           height; from lg it becomes the full-height right column of the
           composition. */
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[58%] w-[74%] select-none overflow-hidden sm:h-[64%] sm:w-[60%] lg:inset-y-0 lg:h-auto lg:w-[60%] xl:w-[56%]"
        style={rise(120)}
      >
        <ScrollShift distance={40} className="h-full">
          <div className="relative h-full [mask-image:linear-gradient(to_right,transparent_0%,#000_46%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_42%)]">
            <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_52%,transparent_88%)] lg:[mask-image:linear-gradient(to_bottom,#000_58%,transparent_94%)]">
              {/* Held far back below lg. Narrow viewports have no column to
                  put the figure beside, so it can only sit *under* the
                  headline — at full strength that is a giant astronaut behind
                  the type, which is the composition this rebuild exists to
                  avoid. At 0.3 it reads as atmosphere and the type keeps a
                  near-black ground. */}
              <Image
                src="/assets/hero-astronaut.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 72vw, 60vw"
                className="scale-[1.45] object-cover object-[31%_40%] opacity-30 lg:scale-[1.5] lg:object-[27%_46%] lg:opacity-[0.55]"
              />
            </div>
          </div>
        </ScrollShift>
      </div>

      {/* ---------------- the type ---------------- */}
      <div className="shell relative z-10 pb-10 pt-20 md:pt-28">
        <p className="t-mono text-slate-dim" style={rise(60)}>
          {hero.kicker}
        </p>

        <h1 className="t-display mt-8 max-w-[16ch]" style={rise(140)}>
          {hero.titleLines.map((line, i) => (
            <span key={i} className="block">
              {line.map((chunk, j) =>
                chunk.accent ? (
                  /* The one coloured word on the homepage. It carries the
                     whole position — conçus vs. assemblés — so it is the
                     only place the signature is spent here. */
                  <span key={j} className="text-signal-soft">
                    {chunk.t}
                  </span>
                ) : (
                  <span key={j}>{chunk.t}</span>
                )
              )}
            </span>
          ))}
        </h1>

        <div
          className="mt-12 grid gap-x-16 gap-y-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          style={rise(240)}
        >
          <p className="t-lead max-w-[46ch] text-mist">{hero.lead}</p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={hero.primaryCta.href} withArrow>
              {hero.primaryCta.label}
            </Button>
            <ArrowLink href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </ArrowLink>
          </div>
        </div>
      </div>

      {/* ---------------- masthead rail ---------------- */}
      <div className="shell relative z-10 pb-8" style={rise(340)}>
        <div className="h-px w-full bg-[var(--hairline)]" />
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-5 md:gap-x-14">
          {hero.signature.map((word) => (
            <li key={word} className="t-mono text-slate-dim">
              {word}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
