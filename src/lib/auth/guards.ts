import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { can, type Permission } from "@/lib/permissions";
import type { UserRecord } from "@/lib/repositories/types";

/**
 * Use in a page/layout component. Redirects to /admin/login if there is no
 * valid session. This is the server-side check — middleware (see
 * src/middleware.ts) provides a fast redirect for the common case, but this
 * function is the actual authority: middleware alone is never sufficient,
 * since it cannot see application-level permission logic.
 */
export async function requireUser(): Promise<UserRecord> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

/**
 * Use in a page/layout/server action. Redirects to /admin/unauthorized if
 * the current user lacks the given permission. Every privileged mutation
 * must call this (or the throwing variant below) — never gate on the UI
 * alone.
 */
export async function requirePagePermission(permission: Permission): Promise<UserRecord> {
  const user = await requireUser();
  if (!can(user, permission)) redirect("/admin/unauthorized");
  return user;
}

export class AuthorizationError extends Error {
  constructor(message = "You do not have permission to perform this action.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class AuthenticationError extends Error {
  constructor(message = "You must be signed in to perform this action.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

/**
 * Use inside a server action (which cannot redirect mid-mutation the way a
 * page load can). Throws instead, so the caller's try/catch can surface a
 * clean error state in the UI rather than a stack trace.
 */
export async function requireActionPermission(permission: Permission): Promise<UserRecord> {
  const user = await getCurrentUser();
  if (!user) throw new AuthenticationError();
  if (!can(user, permission)) throw new AuthorizationError();
  return user;
}
