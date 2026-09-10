// Development data source.
//
// IMPORTANT: these arrays are intentionally empty. No verified news
// articles, events, gallery albums, staff records, or E-Library resources
// exist yet in this repository — see docs/current-site-audit.md. Rather than
// invent plausible-sounding school news or staff, every list-driven section
// of the public site reads from these functions and renders an EmptyState
// when they come back empty.
//
// When Prisma is connected, replace the bodies of these functions with real
// queries (e.g. `prisma.newsArticle.findMany({ where: { status: "PUBLISHED" } })`)
// — the return types already match src/lib/content-types.ts, so no
// consuming component needs to change.

import type {
  NewsArticleSummary,
  NewsArticleDetail,
  EventSummary,
  GalleryAlbumSummary,
  StaffMemberSummary,
  ResourceSummary,
} from "./content-types";

export async function getFeaturedNews(): Promise<NewsArticleSummary[]> {
  return [];
}

export async function getNewsArticleBySlug(
  slug: string
): Promise<NewsArticleDetail | null> {
  // Will become: prisma.newsArticle.findUnique({ where: { slug, status: "PUBLISHED" } })
  void slug;
  return null;
}

export async function getEventBySlug(slug: string): Promise<EventSummary | null> {
  void slug;
  return null;
}

export async function getGalleryAlbumBySlug(
  slug: string
): Promise<(GalleryAlbumSummary & { images: { url: string; caption: string | null }[] }) | null> {
  void slug;
  return null;
}

export async function getUpcomingEvents(): Promise<EventSummary[]> {
  return [];
}

export async function getGalleryAlbums(): Promise<GalleryAlbumSummary[]> {
  return [];
}

export async function getLeadershipStaff(): Promise<StaffMemberSummary[]> {
  return [];
}

export async function getStaffDirectory(): Promise<StaffMemberSummary[]> {
  return [];
}

export async function getPublishedResources(): Promise<ResourceSummary[]> {
  return [];
}
