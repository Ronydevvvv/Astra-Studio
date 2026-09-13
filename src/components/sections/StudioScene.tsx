import Image from "next/image";
import { about, studio } from "@/lib/content";
import { ScrollShift } from "@/components/ui/ScrollShift";

/**
 * The one place on the site where the astronaut is the subject.
 *
 * It is still small. The figure occupies roughly a fifth of a very tall,
 * very dark frame, held at a third of its brightness and desaturated,
 * with a vignette closing the edges into the page ground. What you should
 * read is the emptiness around it — the figure is the scale reference
 * that makes the frame feel large, not the thing being displayed.
 *
 * A caveat worth recording: the source is a bright, saturated 3D cartoon
 * render, which is not the cinematic photography this composition is
 * built for. Heavy grading is a mitigation, not a substitute — the frame
 * will only fully work once a real editorial image replaces it (tracked
 * in `pending`).
 */
export function StudioScene() {
  return (
    <section className="air-md">
      <div className="shell">
        {/* The vastness is the section's own emptiness, not a zoomed-out
            bitmap. Zooming out of this source only brings the laptop and
            the panels back into frame — so instead the figure keeps the
            tight 3:4 crop derived from the artwork's luminance (x 25–50%,
            y 9–83% of the source) and is simply placed small, low and
            left of centre in a tall dark band. */}
        <div
          className="relative flex min-h-[60svh] items-end justify-center py-24 md:min-h-[72svh]"
          data-reveal
        >
          <ScrollShift
            distance={60}
            className="w-[38%] max-w-[260px] sm:w-[22%] lg:w-[13%]"
          >
            <div className="relative aspect-[3/4] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_52%,transparent_86%)]">
              <Image
                src="/assets/hero-astronaut.webp"
                alt="Un astronaute seul dans une étendue sombre — la signature visuelle d'ASTRA Studio"
                fill
                sizes="(max-width: 640px) 38vw, (max-width: 1024px) 22vw, 13vw"
                className="scale-[1.47] object-cover object-[29%_25%] opacity-50 contrast-[1.12] grayscale-[0.4]"
              />
            </div>
          </ScrollShift>
        </div>

        {/* --- the studio's own words, under the frame --- */}
        <div className="mt-24 grid gap-x-24 gap-y-12 lg:mt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div data-reveal>
            {about.blocks.slice(0, 2).map((block) => (
              <Block key={block.index} {...block} />
            ))}
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: "140ms" }}>
            {about.blocks.slice(2).map((block) => (
              <Block key={block.index} {...block} />
            ))}
          </div>
        </div>

        {/* --- figures --- */}
        <dl className="mt-32 grid gap-x-12 gap-y-12 sm:grid-cols-3 lg:mt-44">
          {studio.figures.map((figure, i) => (
            <div
              key={figure.label}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              className="border-t border-[var(--hairline)] pt-7"
            >
              <dt className="sr-only">{figure.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(3rem,5vw,4.5rem)] leading-none tracking-[-0.04em]">
                  {figure.value}
                </span>
                <span className="eyebrow mt-5 block max-w-[20ch]">
                  {figure.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Block({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border-t border-[var(--hairline)] py-8 [&+&]:mt-0">
      <div className="flex items-baseline gap-8">
        <span className="eyebrow shrink-0">{index}</span>
        <div className="min-w-0">
          <h2 className="t-title">{title}</h2>
          <p className="t-body mt-4 max-w-[46ch] text-mist">{body}</p>
        </div>
      </div>
    </div>
  );
}
