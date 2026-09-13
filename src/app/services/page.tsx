import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { Call } from "@/components/sections/Call";
import { servicesPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Direction artistique, identité visuelle, web design, développement, expérience digitale et accompagnement : les six domaines couverts par ASTRA Studio.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label={servicesPage.eyebrow}
        title={servicesPage.title}
        lead={servicesPage.lead}
      />
      <ServicesDetail />
      <Call />
    </>
  );
}
