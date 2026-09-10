import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { getGalleryAlbumBySlug } from "@/lib/dev-data";

type Props = { params: Promise<{ album: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { album: slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) return { title: "Album Not Found" };
  return { title: album.title, description: album.description ?? undefined };
}

export default async function GalleryAlbumPage({ params }: Props) {
  const { album: slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) notFound();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={album.title}
        description={album.description ?? undefined}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
          { label: album.title },
        ]}
      />
      <ContentSection>
        {/*
          Masonry/lightbox behavior (keyboard-navigable, with captions and
          credits) is implemented once real images exist. The grid below is
          the structural placeholder for that component.
        */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {album.images.map((image, i) => (
            <figure key={i} className="overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt={image.caption ?? ""} className="h-full w-full object-cover" />
              {image.caption && (
                <figcaption className="mt-1 text-xs text-ink/60">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
