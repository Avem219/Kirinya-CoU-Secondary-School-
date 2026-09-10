import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  { label: "Published Articles" },
  { label: "Drafts" },
  { label: "Upcoming Events" },
  { label: "Media Assets" },
  { label: "Unread Messages" },
  { label: "Published Resources" },
];

export default async function AdminDashboardPage() {
  const user = await requirePagePermission("dashboard.view");

  return (
    <div>
      <AdminPageHeader
        title={`Welcome, ${user.name.split(" ")[0]}`}
        description="Platform overview"
      />

      <div className="rounded-xl border border-dashed border-ink/20 bg-ink/[0.02] px-6 py-4 text-sm text-ink/60">
        No database is connected in this environment, so live statistics
        cannot be shown. Connect <code className="rounded bg-ink/5 px-1">DATABASE_URL</code> and
        run <code className="rounded bg-ink/5 px-1">npx prisma generate &amp;&amp; npx prisma migrate dev</code> to
        display real counts here — see docs/database.md.
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-ink/10 bg-white/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              {stat.label}
            </p>
            <p className="mt-2 font-serif text-3xl font-semibold text-ink/30">—</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink">Recent Activity</h2>
        <p className="mt-2 text-sm text-ink/60">
          Recent administrative activity (logins, publishes, edits) is
          recorded in the audit log for this session — see{" "}
          <a href="/admin/audit-logs" className="font-medium text-forest underline">
            Audit Log
          </a>
          . It resets when the server restarts until a database is connected.
        </p>
      </div>
    </div>
  );
}
