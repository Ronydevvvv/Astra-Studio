import Image from "next/image";
import { hero } from "@/lib/content";
import { Button, ArrowLink } from "@/components/ui/Button";
import { Starfield } from "@/components/ui/Starfield";
import { MouseParallax } from "@/components/ui/MouseParallax";
import { Icon } from "@/components/ui/Icon";

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

        {/* Descent arc: the same orbital line vocabulary as the scene on the
            right, but here it comes down to meet the page — a trajectory
            completing rather than a hard cut into the next section. The dot
            at its base is exactly where TrustBar's own glow picks it up. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 hidden h-14 w-full opacity-70 md:block"
        >
          <path
            d="M0 0 Q100 60 200 0"
            fill="none"
            stroke="url(#descent-grad)"
            strokeWidth="0.6"
            strokeDasharray="0.5 2.2"
          />
          <defs>
            <linearGradient id="descent-grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#9a6bff" stopOpacity="0" />
              <stop offset="50%" stopColor="#9a6bff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9a6bff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 hidden size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_14px_3px_rgba(154,107,255,0.7)] md:block"
        />
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
        <MouseParallax
          className="relative -mx-6 mt-2 md:-mx-10 lg:mx-0 lg:-mr-[9%] lg:mt-0 xl:-mr-[13%]"
        >
          <div>
            {/* Entry choreography for the scene: orbit first (it's the
                backdrop geometry), then the badges left-to-right, then the
                astronaut last — a small build rather than the whole scene
                appearing as one flat block. Each stage gets its OWN outer
                wrapper for the rise animation: astra-rise also animates
                `transform` (translateY), so it cannot share an element with
                the parallax `transform` below it without re-creating the
                exact bug just fixed on the badges — the entrance animation
                would win the property forever via fill-mode `both`. */}
            {/* Positioning wrapper carries no transform of its own — same
                fix as the badges below. It previously shared an element
                with the entry animation, which (a) hijacked the containing
                block for the centering translate and (b) its OWN inline
                `transform` for parallax silently replaced the Tailwind
                `-translate-x-1/2 -translate-y-1/2` centering utility outright
                (inline transform overwrites the whole property, it doesn't
                merge with a utility class), so the ellipse likely wasn't
                even centered. The centering offset is now folded into the
                one inline transform string instead of split across two
                sources of truth. Parallax amplitude cut from ±6px to ±2px —
                depth, not cursor-chasing. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden size-[124%] opacity-[0.35] lg:block"
            >
              <div style={rise(240)}>
                {/* Orbital geometry, drawn behind the character — a continuation
                    of the artwork's own orbit line, not a decorative ring added
                    on top. Rotates on its own; the mouse only nudges depth. */}
                <svg
                  viewBox="0 0 100 100"
                  className="size-full"
                  style={{
                    transform:
                      "translate3d(calc(-50% + var(--px,0) * -2px), calc(-50% + var(--py,0) * -2px), 0)",
                  }}
                >
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="46"
                    ry="30"
                    fill="none"
                    stroke="url(#orbit-grad)"
                    strokeWidth="0.25"
                    strokeDasharray="0.6 2.4"
                    className="animate-[spin_140s_linear_infinite]"
                    style={{ transformOrigin: "50% 50%" }}
                  />
                  <defs>
                    <linearGradient id="orbit-grad">
                      <stop offset="0%" stopColor="#9a6bff" stopOpacity="0" />
                      <stop offset="50%" stopColor="#9a6bff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#9a6bff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Floating UI debris — a code window and a design chip, both
                real interface fragments (not abstract shapes) so they read
                as "this studio's tools", not confetti. Independent float
                timings keep them from moving in lockstep.

                Parallax offset and the autonomous float live on TWO nested
                elements, not one: a CSS animation "owns" the transform
                property for the whole time it runs, so a `transform` set on
                the same element as `animate-float` was silently discarded —
                the mouse-parallax on these badges never actually moved.
                Splitting them into an outer (parallax) / inner (float)
                pair lets both compose instead of one erasing the other. */}
            {/* Positioning (absolute + top/right %) lives on the OUTERMOST
                element, which owns no transform of its own — CSS gives any
                element with an active transform a new containing block for
                absolutely-positioned descendants, so nesting the % position
                inside the rise/parallax wrappers (both transformed) silently
                repositioned these badges against a tiny auto-sized box
                instead of the real scene, and they collided. Parallax
                amplitude is also cut to a fraction of its previous value —
                depth cue, not a cursor-follow effect. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 top-[10%] hidden sm:block lg:left-[2%]"
            >
              <div style={rise(320)}>
                <div
                  style={{
                    transform:
                      "translate3d(calc(var(--px,0) * 3px), calc(var(--py,0) * 2px), 0)",
                  }}
                >
                  <div
                    className="animate-float-slow w-40 rounded-lg border border-white/10 bg-[#0b0e22]/80 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
                    style={{ animationDelay: "-3s" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-white/15" />
                      <span className="size-1.5 rounded-full bg-white/15" />
                      <span className="size-1.5 rounded-full bg-white/15" />
                    </div>
                    <div className="mt-2.5 space-y-1.5">
                      <span className="block h-1 w-4/5 rounded-full bg-violet-400/50" />
                      <span className="block h-1 w-3/5 rounded-full bg-white/15" />
                      <span className="block h-1 w-full rounded-full bg-white/10" />
                      <span className="block h-1 w-2/5 rounded-full bg-violet-400/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[14%] top-[-5%] hidden sm:block lg:right-[27%] lg:top-[-4%]"
            >
              <div style={rise(360)}>
                <div
                  style={{
                    transform:
                      "translate3d(calc(var(--px,0) * -3px), calc(var(--py,0) * -3px), 0)",
                  }}
                >
                  <div
                    className="animate-float flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0b0e22]/80 px-3.5 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
                    style={{ animationDelay: "-1.4s" }}
                  >
                    <Icon name="design" className="size-4 text-violet-300" />
                    <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-mist">
                      Direction artistique
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[11%] right-0 hidden md:block lg:right-[7%]"
            >
              <div style={rise(400)}>
                <div
                  style={{
                    transform:
                      "translate3d(calc(var(--px,0) * 3px), calc(var(--py,0) * -2px), 0)",
                  }}
                >
                  <div
                    className="animate-float flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0b0e22]/80 px-3.5 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
                    style={{ animationDelay: "-5s" }}
                  >
                    <Icon name="code" className="size-4 text-violet-300" />
                    <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-mist">
                      Code sur mesure
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* The astronaut stays almost put — even the ±4px used before
                read as "the image is dragging behind my cursor" once the
                mouse moved with any speed, exactly the effect being removed.
                At ±1.5px the character is effectively stable; what little
                depth the scene has now comes from the orbit and badges
                around it, not from the subject itself. */}
            <div style={rise(440)}>
              <div
                className="[will-change:transform]"
                style={{
                  transform:
                    "translate3d(calc(var(--px,0) * 1.5px), calc(var(--py,0) * 1px), 0)",
                }}
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
          </div>
        </MouseParallax>
      </div>
    </section>
  );
}
