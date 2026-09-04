import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

/**
 * Generated from the same route list and project data the site itself
 * renders from — a URL only appears here if a real page serves it.
 *
 * The three legal pages are deliberately excluded: each sets
 * `robots: { index: false }` in its own metadata (they're utility pages,
 * not content worth ranking), and listing a noindex URL in the sitemap is a
 * contradictory signal to search engines — the sitemap should only ever
 * promise pages Google is actually being asked to index.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/realisations",
    "/tarifs",
    "/a-propos",
    "/contact",
  ];

  const projectRoutes = projects.map((p) => `/realisations/${p.slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
  }));
}
