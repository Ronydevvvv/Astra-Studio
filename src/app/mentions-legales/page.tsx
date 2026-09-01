import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LegalBody } from "@/components/sections/LegalBody";
import { legal } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Mentions légales",
    description:
      "Informations légales relatives à l'éditeur et à l'hébergeur du site ASTRA Studio.",
    path: "/mentions-legales",
  }),
  /* A template awaiting real identification details should not be indexed. */
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  const { eyebrow, title, intro, sections } = legal.notice;
  return (
    <>
      <PageHero eyebrow={eyebrow} title={[title]} />
      <LegalBody intro={intro} sections={sections} />
    </>
  );
}
