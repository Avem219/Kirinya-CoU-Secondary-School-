# Security Model

## Authentication
- Passwords hashed with bcrypt (`bcryptjs`, 12 rounds) — see
  `src/lib/auth/password.ts`. Never stored or logged in plaintext.
- Sessions are opaque random tokens; only a SHA-256 hash is persisted. The
  raw token lives solely in an `httpOnly`, `sameSite=lax` cookie, `secure`
  in production. See `src/lib/auth/session.ts`.
- Login failure responses are identical (message and general shape) whether
  the email doesn't exist, the account is deactivated, or the password is
  wrong — prevents user enumeration via the login form.
- Basic in-memory rate limiting on login attempts (5 per 15 minutes per
  IP+email) — see `src/lib/auth/rate-limit.ts`. **Documented limitation**:
  this is process-local and won't share state across multiple server
  instances; a multi-instance deployment needs a shared store (Redis, or
  the hosting platform's built-in rate limiting).

## Authorization
- Centralized, typed permission matrix (`src/lib/permissions.ts`) —
  see `docs/architecture.md` for the full rationale.
- Every admin page calls `requireUser()`/`requirePagePermission()`; every
  server action calls `requireActionPermission()`. The Edge proxy
  (`src/proxy.ts`) only performs a coarse cookie-presence check and is
  explicitly documented as not being the authority.
- Deactivated accounts are rejected independently at both the session layer
  and the permission layer.
- Deactivating a user immediately deletes all of their active sessions
  (`sessionRepository.deleteAllForUser`) — a revoked admin can't keep using
  an already-open tab.
- The last active Super Admin account cannot be demoted or deactivated
  (`src/app/admin/(protected)/users/actions.ts`), preventing an admin from
  accidentally locking everyone out of `/admin/settings` and `/admin/users`.

## Input validation
- `zod` schemas validate all form/server-action input server-side (login,
  news draft, contact form). Client-side `required`/`type` attributes are
  UX only.

## File uploads
- `src/lib/media/validate-upload.ts` never trusts the client-declared MIME
  type alone: it checks the file's actual leading bytes (magic numbers)
  against an allowlist, checks the extension matches, and enforces a size
  ceiling per type.
- Filenames are sanitized (`sanitizeFilename`) to strip path separators,
  `..` segments, and null bytes before they could ever be used to build a
  storage path — preventing path traversal.
- The upload API route (`src/app/api/admin/media/upload/route.ts`)
  performs real validation but does not write files to disk: no object
  storage backend is configured in this environment, and writing arbitrary
  uploads to the app container's local filesystem would be both non-durable
  and a bigger attack surface than declining to store them. See
  `docs/media-policy.md`.

## Audit logging
- `AuditRepository` records who/what/when/target/result for: login success
  and failure (including reason — rate-limited, no such user, inactive,
  bad password — for operator debugging, without ever logging the
  submitted password), logout, role changes, activation/deactivation, and
  content action attempts.
- No passwords, raw session tokens, or full request bodies are ever written
  to an audit entry.

## Known limitations in this environment
- No CSRF token framework is added on top of Next.js server actions —
  Next.js's built-in Server Actions already include origin-checking
  protection against CSRF for same-origin form submissions; this has not
  been independently re-verified with a dedicated test in this session.
- Rate limiting and audit logs are in-memory (see `docs/database.md`) —
  fine for a single instance, not for a horizontally-scaled deployment.
- No automated dependency/vulnerability scanning was run beyond `npm audit`
  during this session (see below).

## `npm audit` note
Installing `vitest` for the test suite pulled in some deprecated
transitive dependencies flagged by `npm audit` (dev-only, not shipped in
the production bundle). Run `npm audit` after any dependency changes and
address findings before deploying.
