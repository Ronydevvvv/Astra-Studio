import type { Metadata } from "next";

/**
 * One place to build page metadata, so title format, canonical, Open Graph
 * and Twitter cards cannot drift apart between routes.
 *
 * NEXT_PUBLIC_SITE_URL should be set to the production origin at deploy time;
 * the localhost fallback keeps canonical URLs valid in development.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "ASTRA Studio";

export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page-specific part; the studio name is appended. */
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${SITE_NAME} — ${title}`;
  const url = new URL(path, SITE_URL).toString();

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
