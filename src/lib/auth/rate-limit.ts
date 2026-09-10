// Basic brute-force protection for the login endpoint.
//
// LIMITATION: this is a process-local in-memory counter. It works correctly
// for a single server instance (including this sandbox and a simple VPS
// deploy) but does NOT share state across multiple instances/regions. A
// multi-instance production deployment should replace this with a shared
// store (e.g. Redis, or the hosting platform's built-in rate limiting) —
// see docs/security.md.

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function checkLoginRateLimit(key: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function resetLoginRateLimit(key: string): void {
  buckets.delete(key);
}
