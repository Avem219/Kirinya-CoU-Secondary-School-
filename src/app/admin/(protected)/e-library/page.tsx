import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "E-Library" };

export default async function AdminELibraryPage() {
  await requirePagePermission("elibrary.manage");
  return (
    <div>
      <AdminPageHeader title="E-Library" description="Manage downloadable learning resources." />
      <EmptyState
        title="No resources yet"
        description="Resources — with subject, level, type, and usage rights — will be manageable here once the database is connected. No copyrighted material is uploaded without authorization."
      />
    </div>
  );
}
