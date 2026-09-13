import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { Call } from "@/components/sections/Call";
import { projectsIntro } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Réalisations",
  description:
    "Les projets menés par ASTRA Studio, conduits de bout en bout : direction artistique, design, développement et mise en ligne.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        label={projectsIntro.eyebrow}
        title={projectsIntro.title}
        lead={projectsIntro.lead}
      />
      {/* The masthead already carries the title, so the index drops its own. */}
      <div className="pt-20 md:pt-28">
        <WorkIndex heading={false} />
      </div>
      <Call />
    </>
  );
}
