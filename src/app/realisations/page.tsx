import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { CTA } from "@/components/sections/CTA";
import { projectsIntro } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Réalisations",
  description:
    "Les projets menés par ASTRA Studio : direction artistique, développement et mise en ligne. Chaque réalisation est conduite de bout en bout par le studio.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow={projectsIntro.eyebrow}
        title={projectsIntro.title}
        lead={projectsIntro.lead}
      />
      <ProjectsList />
      <CTA />
    </>
  );
}
