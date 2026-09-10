// Typed interfaces mirroring the Prisma models in prisma/schema.prisma.
//
// These types are the contract between UI components and content, so that
// when Prisma is connected, repositories can return these exact shapes and
// no component needs to change. NO SAMPLE CONTENT LIVES IN THIS FILE.
//
// See src/lib/dev-data.ts for the (empty, explicitly-labelled) development
// fallback used only until the CMS is wired up.

export type ContentStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "SCHEDULED"
  | "PUBLISHED"
  | "ARCHIVED";

export interface NewsArticleSummary {
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImageUrl: string | null;
  categoryName: string | null;
  publishedAt: string | null; // ISO date
  isFeatured: boolean;
}

export interface NewsArticleDetail extends NewsArticleSummary {
  bodyHtml: string;
  authorName: string | null;
}

export interface EventSummary {
  slug: string;
  title: string;
  description: string | null;
  startTime: string; // ISO datetime
  endTime: string | null;
  location: string | null;
  registrationUrl: string | null;
}

export interface GalleryAlbumSummary {
  slug: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  imageCount: number;
}

export interface StaffMemberSummary {
  id: string;
  name: string;
  position: string;
  photoUrl: string | null;
  biography: string | null;
  isLeadership: boolean;
}

export interface ResourceSummary {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  level: string | null;
  resourceType: "DOCUMENT" | "PAST_PAPER" | "NOTES" | "EXTERNAL_LINK" | "VIDEO" | "OTHER";
  externalUrl: string | null;
  fileUrl: string | null;
}
