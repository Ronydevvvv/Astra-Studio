import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { StudioNote } from "@/components/sections/StudioNote";
import { Call } from "@/components/sections/Call";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Studio créatif & digital",
  description:
    "ASTRA est un studio digital indépendant. Direction artistique, identité visuelle, web design et développement, menés de bout en bout.",
  path: "/",
});

/**
 * Six blocks, and each one is allowed to take a screen.
 *
 * The previous homepage carried seven sections plus a trust rail and a
 * four-step process — enough content that nothing on it could be large.
 * This one says less and gives what remains the room to register:
 *
 *   open → position → work → capability → studio → close
 *
 * Nothing repeats a layout. The hero and the two statements are pure
 * type; the work and services blocks are ruled indexes; the studio block
 * is the only two-column composition. A visitor scrolling quickly still
 * sees four distinct shapes rather than four variations of a card grid.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <WorkIndex />
      <ServicesIndex />
      <StudioNote />
      <Call />
    </>
  );
}
