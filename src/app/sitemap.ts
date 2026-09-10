import type { MetadataRoute } from "next";

// Only lists statically-known public routes for now. The dynamic detail
// routes (/news/[slug], /events/[slug], /gallery/[album]) are intentionally
// omitted: there is no published content behind them yet (see
// src/lib/dev-data.ts), and a sitemap entry that resolves to a 404 is worse
// than omitting it. Once a database is connected, extend this function to
// also map over published NewsArticle/Event/GalleryAlbum records.
const SITE_URL = "https://kirinyacouss.sc.ug";

const staticRoutes = [
  "",
  "/about",
  "/about/background",
  "/about/headteacher",
  "/about/team",
  "/academics",
  "/student-life",
  "/student-life/clubs",
  "/student-life/uniform",
  "/student-life/sports-houses",
  "/student-life/prefects",
  "/e-library",
  "/news",
  "/events",
  "/gallery",
  "/admissions",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
