import Image from "next/image";
import { hero } from "@/lib/content";
import { Button, ArrowLink } from "@/components/ui/Button";
import { Starfield } from "@/components/ui/Starfield";

/** Entry choreography — everything rises on load, ~90ms apart. */
const rise = (delay: number) => ({
  animation: `astra-rise 1s var(--ease-out-expo) ${delay}ms both`,
});

/**
 * ONE SCENE, NOT TEXT-NEXT-TO-A-PICTURE.
 *
 * The artwork's own black sky is keyed out at build time
 * (scripts/key-hero.mjs), so what ships is a genuine cut-out: astronaut,
 * laptop, pencil, panels, planets and the Earth's limb, all with real
 * transparency. That single fact is what removes the collage:
 *
 *   - no mask-image, no radial fade, no gradient ring around the visual —
 *     there is no rectangle left to hide;
 *   - the ONE starfield behind this section runs unbroken beneath the
 *     headline and the astronaut alike, so both sit in the same space;
 *   - the artwork's own orbit line and planets are the scene's geometry.
 *     Nothing decorative is added on top — CSS rings drawn "to look
 *     futuristic" were exactly the artificial layer worth deleting.
 *
 * The composition is deliberately off-centre and allowed to bleed past the
 * right edge and below the fold, so the scene reads as a window onto
 * something larger rather than an illustration parked in a column.
 */
export function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate overflow-hidden pt-[var(--nav-h)]"
    >
      {/* The section's whole atmosphere. It spans the full width — the copy
          is inside the same sky as the character. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Starfield />
        {/* A single low ambient light, off to the left, so the type has
            somewhere to sit. Not a glow around the image. */}
        <div className="glow left-[-18%] top-[10%] size-[34rem] bg-violet-700/[0.13] lg:size-[46rem]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-void" />
      </div>

      {/* No pointer parallax. The scene stays put under the cursor — the
          illustration should be looked at, not nudged. Only the autonomous
          float remains. */}
      <div className="mx-auto grid max-w-[1560px] items-center gap-y-4 px-6 pb-16 pt-12 md:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-0 lg:pb-24 lg:pt-16 xl:px-16">
        {/* ---------------- copy ---------------- */}
        <div className="relative z-20 max-w-xl">
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90"
            style={rise(80)}
          >
            {hero.eyebrow}
          </p>

          <h1
            className="mt-7 text-[clamp(2.75rem,6.6vw,5.25rem)] font-medium leading-[1.0] tracking-[-0.042em]"
            style={rise(160)}
          >
            {hero.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line.map((chunk, j) =>
                  chunk.accent ? (
                    <span key={j} className="text-violet-400">
                      {chunk.t}
                    </span>
                  ) : (
                    <span key={j}>{chunk.t}</span>
                  )
                )}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-md text-[1.0625rem] leading-[1.75] text-mist"
            style={rise(280)}
          >
            {hero.lead}
          </p>

          <div
            className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={rise(380)}
          >
            <Button href={hero.primaryCta.href} withArrow>
              {hero.primaryCta.label}
            </Button>
            <ArrowLink href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </ArrowLink>
          </div>

          {/* Anchors the bottom-left, which on tall desktop viewports ran to
              empty void below the buttons. A rule and three words give the
              corner structure without adding a block — and it stays off
              mobile, where that space does not exist. */}
          <div
            className="mt-16 hidden items-center gap-5 lg:flex"
            style={rise(520)}
          >
            <span
              aria-hidden="true"
              className="h-px w-12 bg-gradient-to-r from-violet-500/70 to-transparent"
            />
            <ul className="flex items-center gap-4">
              {hero.signature.map((word, i) => (
                <li key={word} className="flex items-center gap-4">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="size-[3px] rounded-full bg-violet-500/50"
                    />
                  )}
                  <span className="text-[0.625rem] uppercase tracking-[0.3em] text-slate-dim">
                    {word}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- the scene ---------------- */}
        {/* Negative margins let the laptop and the Earth's limb run past the
            column and off the right edge. A cut-out that stops politely
            inside its grid cell still reads as a picture in a box. */}
        <div
          className="relative -mx-6 mt-2 md:-mx-10 lg:mx-0 lg:-mr-[9%] lg:mt-0 xl:-mr-[13%]"
          style={rise(200)}
        >
          <div className="animate-float">
            <Image
                src="/assets/hero-astronaut.webp"
                alt="Astronaute ASTRA Studio composant une interface web en orbite, entouré d'un ordinateur portable, d'un crayon et d'un écran de design"
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 1024px) 108vw, 62vw"
                /* The one place the source rectangle survives the key: the
                   Earth's limb runs bright all the way to the artwork's
                   bottom edge, so the cut-out ends on a straight lit line.
                   A short dissolve over the last sixth turns that edge into a
                   horizon receding into the page. Nothing else is masked. */
                /* On phones the full 3:2 scene is only ~260px tall and the
                   astronaut becomes a detail. Overscaling and offsetting
                   crops to the character — the section clips the overflow, so
                   the laptop and Earth still enter from the right edge. */
                className="h-auto w-[130%] max-w-none -ml-[11%] [mask-image:linear-gradient(to_bottom,#000_84%,transparent_100%)] sm:w-[120%] sm:-ml-[8%] lg:ml-0 lg:w-full"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
