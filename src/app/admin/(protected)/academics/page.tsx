import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Academics" };

export default async function AdminAcademicsPage() {
  await requirePagePermission("academics.manage");
  return (
    <div>
      <AdminPageHeader title="Academics" description="Manage subjects, departments and programmes." />
      <EmptyState
        title="No academic records yet"
        description="Subjects, departments, and programmes will be manageable here once verified content and the database are available."
      />
    </div>
  );
}
