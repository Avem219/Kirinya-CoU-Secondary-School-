import type { Permission } from "@/lib/permissions";

export type AdminNavItem = {
  label: string;
  href: string;
  permission: Permission;
};

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", permission: "dashboard.view" },
  { label: "News", href: "/admin/news", permission: "news.create" },
  { label: "Events", href: "/admin/events", permission: "events.create" },
  { label: "Gallery", href: "/admin/gallery", permission: "gallery.manage" },
  { label: "E-Library", href: "/admin/e-library", permission: "elibrary.manage" },
  { label: "Staff", href: "/admin/staff", permission: "staff.manage" },
  { label: "Academics", href: "/admin/academics", permission: "academics.manage" },
  { label: "Admissions", href: "/admin/admissions", permission: "admissions.manage" },
  { label: "Messages", href: "/admin/messages", permission: "messages.view" },
  { label: "Media Library", href: "/admin/media", permission: "media.upload" },
  { label: "Users", href: "/admin/users", permission: "users.view" },
  { label: "Settings", href: "/admin/settings", permission: "settings.manage" },
  { label: "Audit Log", href: "/admin/audit-logs", permission: "auditlog.view" },
];
