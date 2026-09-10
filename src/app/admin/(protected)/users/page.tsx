import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { userRepository } from "@/lib/repositories";
import { updateUserRoleForm, toggleUserActiveForm } from "./actions";
import type { Role } from "@/lib/permissions";

export const metadata: Metadata = { title: "Users" };

const roles: Role[] = ["SUPER_ADMIN", "ADMIN", "EDITOR", "CONTRIBUTOR"];

export default async function AdminUsersPage() {
  const currentUser = await requirePagePermission("users.view");
  const users = await userRepository.listAll();
  const canManage = currentUser.role === "SUPER_ADMIN"; // users.manage is SUPER_ADMIN-only in the permission matrix

  return (
    <div>
      <AdminPageHeader
        title="Users"
        description="Administrator, editor, and contributor accounts. Stored in an in-memory dev store — see docs/database.md."
      />

      {users.length === 0 ? (
        <EmptyState
          title="No user accounts configured"
          description="Set ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD in your environment to seed a Super Admin account for local development."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white/40">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Login</th>
                {canManage && <th className="px-4 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-ink/70">{u.email}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        u.isActive ? "bg-forest/10 text-forest" : "bg-ink/10 text-ink/50"
                      }`}
                    >
                      {u.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink/50">
                    {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("en-UG") : "Never"}
                  </td>
                  {canManage && (
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <form action={updateUserRoleForm} className="flex items-center gap-1">
                          <input type="hidden" name="userId" value={u.id} />
                          <select
                            name="role"
                            defaultValue={u.role}
                            className="rounded border border-ink/15 px-2 py-1 text-xs"
                          >
                            {roles.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="rounded border border-ink/15 px-2 py-1 text-xs hover:bg-ink/5"
                          >
                            Save
                          </button>
                        </form>
                        <form action={toggleUserActiveForm}>
                          <input type="hidden" name="userId" value={u.id} />
                          <input type="hidden" name="isActive" value={(!u.isActive).toString()} />
                          <button
                            type="submit"
                            className="rounded border border-ink/15 px-2 py-1 text-xs hover:bg-ink/5"
                          >
                            {u.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </form>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!canManage && (
        <p className="mt-4 text-xs text-ink/50">
          Your role can view users but not modify roles or status —
          that requires Super Admin.
        </p>
      )}
    </div>
  );
}
