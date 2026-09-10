import { randomBytes, createHash } from "crypto";
import { cookies } from "next/headers";
import { sessionRepository, userRepository } from "@/lib/repositories";
import type { UserRecord } from "@/lib/repositories/types";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

export { SESSION_COOKIE_NAME };
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8; // 8 hours

function hashToken(token: string): string {
  // Only the hash is ever persisted — the raw token lives solely in the
  // user's httpOnly cookie, so a leaked database (or in-memory dump) cannot
  // be replayed as a valid session.
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(
  userId: string,
  meta: { userAgent: string | null; ipAddress: string | null }
): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await sessionRepository.create({
    userId,
    tokenHash: hashToken(token),
    userAgent: meta.userAgent,
    ipAddress: meta.ipAddress,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    await sessionRepository.deleteByTokenHash(hashToken(token));
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Reads the session cookie, validates it against the session store, and
 * returns the associated user — or null if there is no session, it has
 * expired, or the account has since been deactivated. Deactivated accounts
 * are rejected here (not just in `can()`) so a suspended admin's existing
 * session stops working immediately, not just future permission checks.
 */
export async function getCurrentUser(): Promise<UserRecord | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await sessionRepository.findByTokenHash(hashToken(token));
  if (!session) return null;

  const user = await userRepository.findById(session.userId);
  if (!user || !user.isActive) return null;

  return user;
}
