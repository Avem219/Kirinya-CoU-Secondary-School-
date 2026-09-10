import Link from "next/link";
import type { GalleryAlbumSummary } from "@/lib/content-types";

export function GalleryCard({ album }: { album: GalleryAlbumSummary }) {
  return (
    <li className="group overflow-hidden rounded-xl border border-ink/10">
      <Link href={`/gallery/${album.slug}`}>
        <div
          aria-hidden
          className="aspect-[4/3] bg-ink/10 bg-cover bg-center transition group-hover:scale-[1.02]"
          style={
            album.coverImageUrl
              ? { backgroundImage: `url(${album.coverImageUrl})` }
              : undefined
          }
        />
        <div className="p-4">
          <h3 className="font-serif font-semibold group-hover:underline">{album.title}</h3>
          <p className="mt-1 text-xs text-ink/50">
            {album.imageCount} {album.imageCount === 1 ? "photo" : "photos"}
          </p>
        </div>
      </Link>
    </li>
  );
}
