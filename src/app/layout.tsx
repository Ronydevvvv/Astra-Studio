import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { RevealController } from "@/components/ui/RevealController";
import { PageTransition } from "@/components/ui/PageTransition";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

/* Two cuts of the same family: Inter Tight for display (tighter apertures at
   large sizes), Inter for text. Both self-hosted by next/font — no render
   blocking request to Google, and no layout shift on swap. */
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Per-page metadata is built by lib/seo.ts and already carries the full
 * title, so no `template` here — it would append the studio name twice.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ASTRA Studio — Création de sites web sur mesure",
  description:
    "Agence de création de sites web. Design UI/UX, développement sur mesure, refonte, performance et accompagnement digital.",
};

export const viewport: Viewport = {
  themeColor: "#04050f",
  colorScheme: "dark",
};

/**
 * Deliberately minimal: only fields the site can actually vouch for
 * (name, url, description). No address, phone, logo or sameAs — those
 * are still null in content.ts and structured data must never assert
 * more than what is real.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Agence de création de sites web. Design UI/UX, développement sur mesure, refonte, performance et accompagnement digital.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${interTight.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* Targets the landmark, not a section id — the home page's #accueil
            does not exist on the other eight routes. */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-violet-500 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Aller au contenu
        </a>

        <ScrollProgress />
        <RevealController />

        <Navbar />
        <main id="contenu">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
