import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { StudioScene } from "@/components/sections/StudioScene";
import { Call } from "@/components/sections/Call";
import { about } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "À propos",
  description:
    "ASTRA est un studio digital indépendant. Direction artistique, design et développement, menés par la même personne du premier croquis à la mise en ligne.",
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <>
      <PageHero label={about.eyebrow} title={about.title} lead={about.lead} />
      <StudioScene />
      <Call />
    </>
  );
}
