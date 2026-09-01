import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Pricing } from "@/components/sections/Pricing";
import { pricing } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tarifs",
  description:
    "Site vitrine, site sur mesure ou e-commerce : les trois formes que prennent la plupart des projets ASTRA Studio, et ce que chacune comprend.",
  path: "/tarifs",
});

export default function TarifsPage() {
  return (
    <>
      <PageHero
        eyebrow={pricing.eyebrow}
        title={pricing.title}
        lead={pricing.lead}
      />
      <Pricing />
    </>
  );
}
