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
 * Rhythm: scene → hairline band → rule grid → index → spatial scene →
 * lifted band → framed scene. No two adjacent sections share a ground or a
 * layout archetype.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <ProjectsPreview />
      <Process />
      <WhyAstra />
      <CTA />
    </>
  );
}
