import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LegalBody } from "@/components/sections/LegalBody";
import { legal } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Politique de confidentialité",
    description:
      "Comment ASTRA Studio traite les données transmises via le formulaire de contact, et quels sont vos droits.",
    path: "/politique-confidentialite",
  }),
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  const { eyebrow, title, intro, sections } = legal.privacy;
  return (
    <>
      <PageHero eyebrow={eyebrow} title={[title]} />
      <LegalBody intro={intro} sections={sections} />
    </>
  );
}
