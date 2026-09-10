import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Staff" };

export default async function AdminStaffPage() {
  await requirePagePermission("staff.manage");
  return (
    <div>
      <AdminPageHeader title="Staff" description="Manage the staff directory and leadership profiles." />
      <EmptyState
        title="No staff records yet"
        description="Verified staff records will be manageable here — no staff member is invented on the public site or here until confirmed."
      />
    </div>
  );
}
