import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

/**
 * Generated from the same route list and project data the site itself
 * renders from — a URL only appears here if a real page serves it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/realisations",
    "/tarifs",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
    "/cookies",
  ];

  const projectRoutes = projects.map((p) => `/realisations/${p.slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
  }));
}
