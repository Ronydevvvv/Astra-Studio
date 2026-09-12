import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { Process } from "@/components/sections/Process";
import { WhyAstra } from "@/components/sections/WhyAstra";
import { CTA } from "@/components/sections/CTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Création de sites web sur mesure",
  description:
    "ASTRA Studio conçoit et développe des sites web sur mesure : direction artistique dédiée, code performant et accompagnement après la mise en ligne.",
  path: "/",
});

/**
 * A shop window, not the whole site.
 *
 * Each block is a doorway to its own page, carrying only what is needed to
 * decide whether to walk through. Detail lives on the inner pages — that is
 * the point of splitting them out, and the reason this page stays short.
 *
 * Order: the work comes before the offer. A studio that leads with a list of
 * services is describing itself; one that leads with what it built is showing
 * you. Sections are numbered 01–04 in their own headings, so moving one here
 * means moving its number with it.
 *
 * Ground alternates void → ink → void → ink → void, and the two large
 * typographic moments (03 Pourquoi, and the close) sit on the void so they
 * read as the page speaking rather than another panel.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProjectsPreview />
      <ServicesGrid />
      <WhyAstra />
      <Process />
      <CTA />
    </>
  );
}
