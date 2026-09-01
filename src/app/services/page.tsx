import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { CTA } from "@/components/sections/CTA";
import { servicesPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services web",
  description:
    "Design, développement, performance, responsive, SEO et accompagnement : les six domaines couverts par ASTRA Studio, et ce que chacun recouvre concrètement.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        lead={servicesPage.lead}
      />
      <ServicesDetail />
      <CTA />
    </>
  );
}
