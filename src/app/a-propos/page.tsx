import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Approach } from "@/components/sections/Approach";
import { CTA } from "@/components/sections/CTA";
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
      {/* The masthead carries the title and lead, so the section drops both. */}
      <Approach heading={false} />
      <CTA />
    </>
  );
}
