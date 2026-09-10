import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Gallery" };

export default async function AdminGalleryPage() {
  await requirePagePermission("gallery.manage");
  return (
    <div>
      <AdminPageHeader title="Gallery" description="Manage photo albums and images." />
      <EmptyState
        title="No albums yet"
        description="Albums and images (with captions, credits, and rights status) will be manageable here once the Media Library and database are connected."
      />
    </div>
  );
}
