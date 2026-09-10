import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Events" };

export default async function AdminEventsPage() {
  await requirePagePermission("events.create");
  return (
    <div>
      <AdminPageHeader title="Events" description="Manage school events and important dates." />
      <EmptyState
        title="No events yet"
        description="The create/edit form follows the same pattern as News (see /admin/news) — validated, authorized, and audit-logged, pending a database connection to persist records."
      />
    </div>
  );
}
