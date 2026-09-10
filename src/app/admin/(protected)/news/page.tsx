import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { can } from "@/lib/permissions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { NewsDraftForm } from "./news-draft-form";

export const metadata: Metadata = { title: "News" };

export default async function AdminNewsPage() {
  const user = await requirePagePermission("news.create");

  return (
    <div>
      <AdminPageHeader
        title="News"
        description="Manage news articles. Draft → Review → Publish, gated by role."
      />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <EmptyState
            title="No articles yet"
            description="Once a database is connected, articles created here will be listed with status, category and publish date. Nothing is invented in the meantime."
          />
        </div>

        <div className="rounded-xl border border-ink/10 bg-white/40 p-6">
          <h2 className="font-serif text-lg font-semibold">New Draft</h2>
          <p className="mt-1 text-xs text-ink/50">
            Demonstrates the full pipeline: server-side validation →
            permission check → (blocked — no database) → audit log entry.
            This is a real, working form; only the final persistence step is
            unavailable in this environment.
          </p>
          <div className="mt-4">
            <NewsDraftForm />
          </div>
          {!can(user, "news.publish") && (
            <p className="mt-4 rounded-lg bg-forest/10 px-3 py-2 text-xs text-forest">
              Your role ({user.role}) can create and edit drafts but cannot
              publish them — an Editor or Admin will need to review and
              publish this article.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
