import { requireUser } from "@/lib/auth/guards";
import { can } from "@/lib/permissions";
import { adminNav } from "@/lib/admin-nav";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authoritative check — not the middleware's coarse cookie-presence test.
  // If this resolves, `user` is a real, active account.
  const user = await requireUser();

  // The sidebar only shows links the user can actually use. This is a
  // convenience, not a security boundary — every page below independently
  // calls requirePagePermission() for its own route.
  const visibleNav = adminNav.filter((item) => can(user, item.permission));

  return (
    <AdminShell
      navItems={visibleNav}
      user={{ name: user.name, email: user.email, role: user.role }}
    >
      {children}
    </AdminShell>
  );
}
