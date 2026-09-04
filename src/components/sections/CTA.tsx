import Image from "next/image";
import { cta } from "@/lib/content";
import { Button, ArrowLink } from "@/components/ui/Button";
import { Starfield } from "@/components/ui/Starfield";
import { MouseParallax } from "@/components/ui/MouseParallax";

/**
 * The supplied space banner is scenery: decorative (`alt=""`), behind a veil,
 * and carrying no text of its own. Every word and control on top is real HTML.
 *
 * Its composition — astronaut far left, rocket far right, empty middle — is
 * why the copy is centred: it lands in the negative space the artwork already
 * leaves, instead of fighting the illustration for room.
 */
export function CTA() {
  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <MouseParallax className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-white/[0.09] bg-ink">
        {/* --- scenery --- */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Scaled slightly beyond the frame so the parallax shift can never
              expose an edge of the artwork. */}
          <div
            className="absolute inset-[-4%]"
            style={{
              transform:
                "translate3d(calc(var(--px,0) * -14px), calc(var(--py,0) * -10px), 0)",
            }}
          >
            <Image
              src="/assets/space-banner.webp"
              alt=""
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="animate-float-slow object-cover object-center opacity-90"
            />
          </div>

          {/* A second star layer over the artwork, drifting the other way —
              cheap depth, and it keeps the frame subtly alive. */}
          <div
            style={{
              transform:
                "translate3d(calc(var(--px,0) * 22px), calc(var(--py,0) * 16px), 0)",
            }}
          >
            <Starfield className="opacity-70" />
          </div>

          {/* Veil: holds contrast under the copy and pulls the artwork's
              edges back toward the page colour. */}
          <div className="absolute inset-0 bg-[radial-gradient(65%_75%_at_50%_50%,rgba(4,5,15,0.84),rgba(4,5,15,0.42))]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,15,0.35),transparent_35%,transparent_65%,rgba(4,5,15,0.5))]" />
        </div>

        {/* --- content --- */}
        <div className="relative flex flex-col items-center px-6 py-24 text-center md:py-32 lg:py-40">
          <h2
            className="max-w-2xl text-[clamp(2.25rem,5vw,3.875rem)] font-medium leading-[1.04] tracking-[-0.04em]"
            data-reveal
          >
            {cta.title[0]}
            <br />
            <span className="text-violet-400">{cta.title[1]}</span>
          </h2>

          <p
            className="mt-7 max-w-lg text-[1.0625rem] leading-[1.75] text-mist"
            data-reveal
            style={{ ["--reveal-delay" as string]: "90ms" }}
          >
            {cta.lead}
          </p>

          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5"
            data-reveal
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            <Button href={cta.primary.href} withArrow>
              {cta.primary.label}
            </Button>
            <ArrowLink href={cta.secondary.href}>{cta.secondary.label}</ArrowLink>
          </div>
        </div>
      </MouseParallax>
    </section>
  );
}
