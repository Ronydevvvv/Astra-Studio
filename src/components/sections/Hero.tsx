import Image from "next/image";
import { hero } from "@/lib/content";
import { Lines } from "@/components/ui/Lines";
import { ScrollShift } from "@/components/ui/ScrollShift";

/**
 * A full-height opening that is almost entirely empty.
 *
 * The headline is the only loud thing on the screen and it is set against
 * the left margin at up to 150px. Everything else — the label above it,
 * the sentence below, the scroll cue — is small, grey and far away from
 * it. That distance is the composition; there is nothing else in here.
 *
 * THE ASTRONAUT IS DELIBERATELY TINY. It sits in the upper right at a
 * fraction of the viewport, dimmed to a third and pushed behind a
 * vignette, so it reads as a figure lost in a large dark frame rather
 * than as an illustration placed on a page. The source artwork is a
 * bright 3D render carrying baked-in English UI copy on its right side;
 * cropping hard into the figure and holding the exposure right down is
 * what turns it into a silhouette instead of a sticker.
 */
export function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[var(--nav-h)]"
    >
      {/* --- the figure, small and far --- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[13%] -z-10 w-[38%] max-w-[300px] select-none sm:right-[10%] sm:w-[22%] lg:right-[13%] lg:top-[15%] lg:w-[15%]"
      >
        {/* The asset is a genuine cut-out (VP8X alpha), so there is no
            rectangle to hide and no vignette needed — transparent pixels
            simply show the page ground. The crop exists only to keep the
            artwork's OTHER objects (laptop, panels, planets, and the
            baked-in English UI copy they carry) out of frame, leaving the
            figure alone in the dark. */}
        <ScrollShift distance={70}>
          {/* Crop derived from the artwork's own alpha and luminance, not
              guessed: the figure occupies x 25–50% and y 9–83% of the
              source — a 1:2 portrait. A square frame cannot hold that
              without also catching the laptop at x>50%, which is why this
              frame is 3:4 and the numbers below are what they are.

              overflow-hidden is load-bearing: `scale` grows the rendered
              box past the container, so without the clip the crop stops
              being a crop and the whole scene spills out. */}
          {/* The bottom fade does two jobs: it removes the laptop keys the
              crop still catches below the figure's knees, and it lets the
              figure emerge from the dark rather than sit in a box. */}
          <div className="relative aspect-[3/4] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_52%,transparent_86%)]">
            <Image
              src="/assets/hero-astronaut.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 26vw, 18vw"
              className="scale-[1.47] object-cover object-[29%_25%] opacity-45 contrast-[1.12] grayscale-[0.4]"
            />
          </div>
        </ScrollShift>
      </div>

      {/* --- type --- */}
      <div className="shell relative flex flex-1 flex-col justify-center py-24">
        <div data-reveal>
          <p className="eyebrow">{hero.kicker}</p>

          <Lines
            as="h1"
            lines={hero.title}
            mutedFrom={hero.titleMutedFrom}
            stagger={110}
            className="t-hero mt-10 md:mt-14"
          />
        </div>

        <p
          className="t-lead mt-14 max-w-[34ch] text-mist md:mt-20"
          data-reveal
          style={{ ["--reveal-delay" as string]: "420ms" }}
        >
          {hero.lead}
        </p>
      </div>

      {/* --- scroll cue --- */}
      <div
        className="shell relative pb-10"
        data-reveal
        style={{ ["--reveal-delay" as string]: "700ms" }}
      >
        <a
          href="#suite"
          className="group inline-flex items-center gap-4 text-dim transition-colors duration-500 hover:text-chalk"
        >
          <span className="eyebrow">{hero.scroll}</span>
          <svg
            viewBox="0 0 12 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
            className="h-5 w-3 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-1.5"
          >
            <path d="M6 0v20M1 15l5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
