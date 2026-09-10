import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaUploader } from "@/components/admin/media-uploader";

export const metadata: Metadata = { title: "Media Library" };

export default async function AdminMediaPage() {
  await requirePagePermission("media.upload");

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description="Upload and manage images and documents with rights/consent metadata."
      />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <EmptyState
          title="No media assets yet"
          description="Uploaded assets — with alt text, caption, source, and license/consent status — will be listed here once object storage and a database are connected."
        />
        <div className="rounded-xl border border-ink/10 bg-white/40 p-6">
          <h2 className="font-serif text-lg font-semibold">Try the validator</h2>
          <p className="mt-1 text-xs text-ink/50">
            This performs real server-side validation (MIME allowlist, size
            limit, magic-byte signature check, filename sanitization) — it
            just doesn&rsquo;t persist the file, since no storage backend is
            configured yet.
          </p>
          <div className="mt-4">
            <MediaUploader />
          </div>
        </div>
      </div>
    </div>
  );
}
