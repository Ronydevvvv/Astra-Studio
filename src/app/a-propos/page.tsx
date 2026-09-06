import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Approach } from "@/components/sections/Approach";
import { WhyAstra } from "@/components/sections/WhyAstra";
import { CTA } from "@/components/sections/CTA";
import { Icon } from "@/components/ui/Icon";
import { about } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "À propos",
  description:
    "ASTRA n'est pas une agence qui fabrique des pages. Comprendre, concevoir, construire, faire évoluer : notre manière de mener un projet web.",
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} lead={about.lead} />

      {/* Why, then vision — two short claims answering two different
          questions ("why does this studio exist" vs "what should a site
          do"), each its own quiet beat with a section number so the page
          reads as a sequence rather than a title dropped above the method.
          Still not a card, not a heading+paragraph pattern repeated three
          times: a wide pull-quote line per beat. */}
      <section className="px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-x-16 gap-y-16 border-t border-white/[0.09] py-16 md:py-20 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-20">
            <span
              className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400 lg:pt-1"
              data-reveal
            >
              01
            </span>
            <div data-reveal>
              <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                {about.why.eyebrow}
              </p>
              {/* The one claim on this page that answers the question the
                  brief keeps insisting on ("pourquoi ASTRA existe") — it
                  reads at a genuinely bigger scale than the beat that
                  follows it, not the same size as every other pull-quote. */}
              <p className="mt-6 max-w-3xl text-[clamp(1.625rem,3.4vw,2.5rem)] font-medium leading-[1.3] tracking-[-0.02em] text-chalk">
                {about.why.body}
              </p>
            </div>
          </div>

          <div className="grid gap-x-16 gap-y-16 border-t border-white/[0.09] py-14 md:py-16 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-20">
            <span
              className="font-display text-[0.75rem] tracking-[0.2em] text-violet-400 lg:pt-1"
              data-reveal
            >
              02
            </span>
            <div data-reveal>
              <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
                {about.vision.eyebrow}
              </p>
              <p className="mt-6 max-w-3xl text-[clamp(1.25rem,2.6vw,1.75rem)] font-medium leading-[1.4] tracking-[-0.015em] text-chalk">
                {about.vision.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The masthead already carries the page title and lead, so the
          method section drops its own. */}
      <Approach heading={false} />

      <WhyAstra />

      {/* Portfolio link — a real doorway to the proof, not a rehash of the
          project list itself (that already lives at /realisations). */}
      <section className="px-6 py-24 md:px-10 md:py-32 xl:px-16">
        <Link
          href={about.portfolioLink.cta.href}
          className="group mx-auto flex max-w-[1440px] flex-wrap items-baseline justify-between gap-6 border-t border-white/[0.09] py-10 transition-colors duration-500 hover:bg-white/[0.015]"
          data-reveal
        >
          <div>
            <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-slate-dim">
              {about.portfolioLink.eyebrow}
            </p>
            <span className="mt-4 block text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.03em] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5">
              {about.portfolioLink.title}
            </span>
          </div>
          <span className="inline-flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-chalk">
            {about.portfolioLink.cta.label}
            <Icon name="arrow" className="size-4 text-violet-400 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      <CTA />
    </>
  );
}
