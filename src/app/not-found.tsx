import type { Metadata } from "next";
import Image from "next/image";
import { Starfield } from "@/components/ui/Starfield";
import { Button, ArrowLink } from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Page introuvable`,
};

/**
 * The default Next.js 404 is a plain text page — the one screen every other
 * route on the site dresses in the ASTRA identity, this one didn't. Reuses
 * the idea-astronaut asset: someone adrift with no bearings is exactly what
 * "page introuvable" means, so no new artwork was needed to earn the joke.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 md:px-10 xl:px-16">
      <div className="pointer-events-none absolute inset-0">
        <Starfield />
        <div className="glow left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 bg-violet-700/[0.16]" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-y-4 py-24 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-x-16 lg:py-0">
        <div className="order-2 lg:order-1">
          <span className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400">
            ERREUR 404
          </span>
          <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Cette page
            <br />
            s&apos;est perdue
            <br />
            <span className="text-violet-400">dans l&apos;espace.</span>
          </h1>
          <p className="mt-8 max-w-md text-[1.0625rem] leading-[1.75] text-mist">
            L&apos;adresse n&apos;existe pas ou plus. Repartez d&apos;un point
            fixe — l&apos;accueil, ou l&apos;une des pages ci-dessous.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button href="/" withArrow>
              Retour à l&apos;accueil
            </Button>
            <ArrowLink href="/realisations">Voir nos réalisations</ArrowLink>
          </div>
        </div>

        <div className="animate-float order-1 mx-auto w-full max-w-[280px] lg:order-2 lg:max-w-none">
          <Image
            src="/assets/idea-astronaut.webp"
            alt="Astronaute ASTRA flottant seul, sans repère"
            width={888}
            height={1214}
            priority
            sizes="(max-width: 1024px) 60vw, 34vw"
            className="h-auto w-full opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
