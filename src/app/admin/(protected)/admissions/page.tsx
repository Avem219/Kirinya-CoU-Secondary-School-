import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Admissions" };

export default async function AdminAdmissionsPage() {
  await requirePagePermission("admissions.manage");
  return (
    <div>
      <AdminPageHeader
        title="Admissions"
        description="Manage the process, requirements, dates and FAQs shown on the public Admissions page."
      />
      <EmptyState
        title="No admissions content saved yet"
        description="This form will edit the AdmissionInformation record and the Apply Online URL (currently centralized in src/lib/site-config.ts) once the database is connected."
      />
    </div>
  );
}
