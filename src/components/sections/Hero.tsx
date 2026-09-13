import Image from "next/image";
import { hero } from "@/lib/content";
import { Lines } from "@/components/ui/Lines";
import { ScrollShift } from "@/components/ui/ScrollShift";

/**
 * A cover, built on three anchors rather than one centred block.
 *
 * The previous hero centred a single lump of type in a full viewport, so
 * the emptiness sat evenly above and below it and read as missing content.
 * Here the screen is pinned at the top (label / mark), the upper-middle
 * (headline) and the bottom (lead / scroll) — the void is BETWEEN composed
 * elements, which is the difference between space and absence.
 *
 * The figure is no longer an object in a corner. It runs as a tall band on
 * the right grid column, from beneath the header to the foot of the
 * section, and the headline's last line is allowed to cross into it. That
 * overlap is the whole point: two planes interlocking read as one
 * composition, two planes side by side read as a picture next to text.
 *
 * Diagonal tension: headline top-left, scroll cue bottom-right, lead
 * bottom-left. Nothing is centred, and the right column is occupied all
 * the way down instead of emptying out below the figure.
 */
export function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[92svh] flex-col overflow-hidden pt-[var(--nav-h)]"
    >
      {/* ---------------- the figure, as a column ---------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[52%] select-none sm:w-[38%] lg:w-[26%] xl:w-[24%]"
      >
        <ScrollShift distance={90} className="h-full">
          {/* Crop geometry comes from the artwork's own alpha and
              luminance, not from estimation: the figure occupies x 25–50%
              and y 9–83% of the source, and the laptop it sits above
              spans x 45–85%, y 55–95%.

              Those two boxes overlap, so no horizontal crop that still
              holds the figure can exclude the laptop. The bottom fade is
              what removes it — and it leaves the figure dissolving into
              the dark rather than ending on a cut.

              overflow-hidden is load-bearing: `scale` grows the rendered
              box past the container, so without the clip the crop stops
              being a crop. */}
          <div className="relative h-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_42%)]">
            {/* `grain` belongs on the element carrying the vertical fade,
                not on the wrapper: on the wrapper its ::after is clipped
                horizontally but not vertically, so the noise runs past
                where the image dissolves and lights a faint rectangle at
                the foot of the band. */}
            <div className="grain absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_52%,transparent_80%)]">
              <Image
                src="/assets/hero-astronaut.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 52vw, (max-width: 1024px) 38vw, 26vw"
                className="scale-[1.2] object-cover object-[32%_30%] opacity-[0.16] contrast-[1.12] grayscale-[0.45] sm:opacity-[0.24] lg:opacity-[0.34]"
              />
            </div>
          </div>
        </ScrollShift>
      </div>

      {/* The grid line the figure's column starts on. It is structure made
          visible, not ornament — remove the band and this rule has no
          reason to exist, which is the test it has to pass. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[26%] -z-10 hidden w-px bg-[linear-gradient(to_bottom,transparent,var(--hairline)_22%,var(--hairline)_70%,transparent)] lg:block xl:right-[24%]"
      />

      {/* ---------------- top: label and mark ---------------- */}
      {/* Padded to the grid line rather than to the page edge, so the mark
          lands ON the structure instead of floating over the figure. */}
      <div className="shell relative pt-10 md:pt-14 lg:pr-[calc(26%+var(--gutter))] xl:pr-[calc(24%+var(--gutter))]" data-reveal>
        <div className="flex items-baseline justify-between gap-8">
          <p className="eyebrow">{hero.kicker}</p>
          <p className="eyebrow hidden items-baseline gap-3 sm:flex">
            <span>{hero.mark.index}</span>
            <span className="text-dim/70" aria-hidden="true">
              —
            </span>
            <span>{hero.mark.label}</span>
          </p>
        </div>
      </div>

      {/* ---------------- headline ---------------- */}
      {/* mt-auto pushes it off the top anchor; the bottom rail then pins
          the other end, so the remaining height falls as one deliberate
          gap rather than two equal ones. */}
      <div className="shell relative z-10 mt-auto pb-16 pt-24 md:pb-24">
        {/* The reveal flag sits on a wrapper, not on Lines: the line
            animation is driven by `[data-reveal] .line > span`, so the
            attribute has to be on an ancestor element in the DOM. */}
        <div data-reveal>
          <Lines
            as="h1"
            lines={hero.title}
            mutedFrom={hero.titleMutedFrom}
            stagger={110}
            className="t-hero max-w-[13ch]"
          />
        </div>
      </div>

      {/* ---------------- bottom rail ---------------- */}
      <div className="shell relative z-10 pb-10 md:pb-14">
        <div
          data-reveal
          className="rule-draw h-px w-full bg-[var(--hairline)]"
          style={{ ["--reveal-delay" as string]: "500ms" }}
        />

        {/* The rule above runs the full width — it ties the type column to
            the figure band. The content below stops at the grid line, so
            the scroll cue stays on the dark ground and remains legible. */}
        <div
          className="flex flex-col gap-8 pt-7 md:flex-row md:items-start md:justify-between md:gap-16 lg:pr-[calc(26%+var(--gutter))] xl:pr-[calc(24%+var(--gutter))]"
          data-reveal
          style={{ ["--reveal-delay" as string]: "620ms" }}
        >
          <p className="t-lead max-w-[38ch] text-mist">{hero.lead}</p>

          {/* Opposite corner to the headline. An anchor, not a button:
              the page has no filled controls, and a pill here would be
              the loudest thing on the first screen. */}
          <a
            href="#suite"
            className="group inline-flex shrink-0 items-center gap-4 self-start text-dim transition-colors duration-500 hover:text-chalk md:self-auto"
          >
            <span className="eyebrow">{hero.scroll}</span>
            <svg
              viewBox="0 0 12 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
              className="h-6 w-3 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-2"
            >
              <path d="M6 0v23M1 18l5 5 5-5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
