import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { contactMessageRepository } from "@/lib/repositories";

export const metadata: Metadata = { title: "Messages" };

export default async function AdminMessagesPage() {
  await requirePagePermission("messages.view");
  const messages = await contactMessageRepository.list();

  return (
    <div>
      <AdminPageHeader
        title="Contact Messages"
        description="Messages submitted through the public Contact page."
      />

      <div className="mb-6 rounded-xl border border-dashed border-ink/20 bg-ink/[0.02] px-5 py-3 text-xs text-ink/60">
        The public contact form is intentionally not wired to write into this
        list yet — it honestly reports that no database is connected rather
        than silently accepting messages an admin couldn&rsquo;t reliably
        retrieve. This page reads from the same repository interface
        (<code className="rounded bg-ink/5 px-1">ContactMessageRepository</code>) that will
        back it once a real database is connected.
      </div>

      {messages.length === 0 ? (
        <EmptyState
          title="No messages"
          description="Submitted contact messages will appear here, with search, read/archive controls, once the database is connected."
        />
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id} className="rounded-xl border border-ink/10 bg-white/40 p-4">
              <p className="font-medium">{m.name} · {m.email}</p>
              <p className="mt-1 text-sm text-ink/70">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
