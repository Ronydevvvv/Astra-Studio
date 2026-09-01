import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LegalBody } from "@/components/sections/LegalBody";
import { legal } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Gestion des cookies",
    description:
      "Les traceurs déposés par le site ASTRA Studio et la manière de les gérer.",
    path: "/cookies",
  }),
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  const { eyebrow, title, intro, sections } = legal.cookies;
  return (
    <>
      <PageHero eyebrow={eyebrow} title={[title]} />
      <LegalBody intro={intro} sections={sections} />
    </>
  );
}
