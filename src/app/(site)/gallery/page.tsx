import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";
import { GalleryCard } from "@/components/cards/gallery-card";
import { getGalleryAlbums } from "@/lib/dev-data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo albums from Kirinya C.O.U.S.S.",
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Photo Gallery"
        description="A visual record of life at Kirinya C.O.U.S.S."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <ContentSection>
        <p className="mb-8 max-w-2xl text-sm text-ink/60">
          The current site contains real school photography, but those files
          have not been re-authorized for republication on this rebuild — see
          docs/media-policy.md. No images are scraped or reused here without
          the school&rsquo;s explicit consent and credit.
        </p>
        {albums.length === 0 ? (
          <EmptyState
            title="Gallery pending authorized photography"
            description="Photo albums will appear here — each with captions, photographer credit, and rights information — once the school supplies and authorizes images through the media library."
          />
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {albums.map((album) => (
              <GalleryCard key={album.slug} album={album} />
            ))}
          </ul>
        )}
      </ContentSection>
    </>
  );
}
