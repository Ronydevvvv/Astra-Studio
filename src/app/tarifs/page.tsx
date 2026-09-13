import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Pricing } from "@/components/sections/Pricing";
import { Call } from "@/components/sections/Call";
import { pricing } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tarifs",
  description:
    "Des offres claires, pas de formule toute faite. Chaque proposition est construite selon vos objectifs et le travail réellement nécessaire.",
  path: "/tarifs",
});

export default function TarifsPage() {
  return (
    <>
      <PageHero
        label={pricing.eyebrow}
        title={pricing.title}
        lead={pricing.lead}
      />
      <Pricing />
      <Call />
    </>
  );
}
