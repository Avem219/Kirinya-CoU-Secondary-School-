// Centralized permission system.
//
// This is the single source of truth for "who can do what." Server actions
// and route handlers MUST call `can()` (or `requirePermission()` from
// src/lib/auth/guards.ts) before performing a privileged operation — never
// infer permission from the UI having hidden a button.
//
// Role hierarchy (least → most privilege): CONTRIBUTOR < EDITOR < ADMIN <
// SUPER_ADMIN. Permissions are additive per role, not automatically
// inherited, so every permission a role should have is listed explicitly —
// this makes the matrix auditable at a glance instead of relying on
// "assume higher roles can do everything."

export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "CONTRIBUTOR";

export type Permission =
  | "dashboard.view"
  | "news.create"
  | "news.update"
  | "news.publish"
  | "news.delete"
  | "events.create"
  | "events.update"
  | "events.publish"
  | "events.delete"
  | "gallery.manage"
  | "elibrary.manage"
  | "staff.manage"
  | "academics.manage"
  | "admissions.manage"
  | "announcements.manage"
  | "messages.view"
  | "messages.manage"
  | "media.upload"
  | "media.delete"
  | "settings.manage"
  | "users.view"
  | "users.manage"
  | "auditlog.view";

const rolePermissions: Record<Role, Permission[]> = {
  CONTRIBUTOR: [
    "dashboard.view",
    "news.create",
    "news.update",
    "events.create",
    "events.update",
    "media.upload",
  ],
  EDITOR: [
    "dashboard.view",
    "news.create",
    "news.update",
    "news.publish",
    "events.create",
    "events.update",
    "events.publish",
    "gallery.manage",
    "elibrary.manage",
    "announcements.manage",
    "media.upload",
    "messages.view",
  ],
  ADMIN: [
    "dashboard.view",
    "news.create",
    "news.update",
    "news.publish",
    "news.delete",
    "events.create",
    "events.update",
    "events.publish",
    "events.delete",
    "gallery.manage",
    "elibrary.manage",
    "staff.manage",
    "academics.manage",
    "admissions.manage",
    "announcements.manage",
    "messages.view",
    "messages.manage",
    "media.upload",
    "media.delete",
    "users.view",
  ],
  SUPER_ADMIN: [
    "dashboard.view",
    "news.create",
    "news.update",
    "news.publish",
    "news.delete",
    "events.create",
    "events.update",
    "events.publish",
    "events.delete",
    "gallery.manage",
    "elibrary.manage",
    "staff.manage",
    "academics.manage",
    "admissions.manage",
    "announcements.manage",
    "messages.view",
    "messages.manage",
    "media.upload",
    "media.delete",
    "settings.manage",
    "users.view",
    "users.manage",
    "auditlog.view",
  ],
};

export type AuthorizableUser = { role: Role; isActive: boolean };

/**
 * Pure, synchronous, dependency-free permission check. Deactivated accounts
 * (isActive === false) can never pass a permission check even if their role
 * would otherwise allow it — this is what lets an admin suspend a user
 * without deleting their account.
 */
export function can(user: AuthorizableUser | null | undefined, permission: Permission): boolean {
  if (!user || !user.isActive) return false;
  return rolePermissions[user.role].includes(permission);
}

export function permissionsForRole(role: Role): Permission[] {
  return rolePermissions[role];
}
