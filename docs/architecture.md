# Architecture

## Layout structure — two root layouts

Next.js's "multiple root layouts" pattern is used deliberately:

- `src/app/(site)/layout.tsx` — root layout for the public marketing site
  (SiteHeader/SiteFooter, public metadata, `metadataBase` pointing at the
  production domain). Every public route (`/`, `/about`, `/news`, …) lives
  inside this route group.
- `src/app/admin/layout.tsx` — an entirely separate root layout for
  `/admin/*`. No public header/footer, `robots: noindex`. This is a real
  fix from an earlier session, not a stylistic choice: without it, every
  admin page would render wrapped in the public site's marketing chrome.

Within `/admin`, there's a further split:
- `src/app/admin/login/page.tsx`, `src/app/admin/unauthorized/page.tsx` —
  unauthenticated pages, rendered directly under the admin root layout.
- `src/app/admin/(protected)/*` — everything requiring a session. The
  `(protected)/layout.tsx` calls `requireUser()` and renders the
  `AdminShell` (sidebar/topbar) around its children.

## Authentication

Cookie-based sessions, not a third-party auth framework — chosen because
the existing Prisma schema already models `User`/`Role` directly, and
pulling in a framework like NextAuth would mean either duplicating that
schema under a different shape or fighting its adapter model. The
implementation is intentionally small:

- **Passwords**: `bcryptjs` (pure JS, no native bindings) — see
  `src/lib/auth/password.ts`. 12 salt rounds. Never logged, never returned
  to the client, never stored in a `Session` record.
- **Sessions**: a cryptographically random 32-byte token is generated on
  login (`src/lib/auth/session.ts`). Only `sha256(token)` is persisted (in
  the `Session` Prisma model / dev store) — the raw token exists solely in
  an `httpOnly`, `secure` (in production), `sameSite=lax` cookie. A leaked
  database dump cannot be replayed as a session.
- **Session lifetime**: 8 hours, enforced both by cookie expiry and by
  `expiresAt` on the server-side record (belt and suspenders — a modified
  client cookie can't extend a session past what the server issued).
- **Deactivated accounts**: rejected at both `getCurrentUser()` (kills the
  session immediately) and `can()` (blocks any specific permission) — two
  independent enforcement points.

## Authorization — centralized permissions

`src/lib/permissions.ts` is the single source of truth for "who can do
what." It's a pure, synchronous function (`can(user, permission)`) with an
explicit per-role permission list — nothing is inherited implicitly from a
"lower" role, so the matrix is auditable by reading top to bottom rather
than reasoning about a hierarchy.

Three enforcement helpers build on it (`src/lib/auth/guards.ts`):
- `requireUser()` — page-level, redirects to `/admin/login`.
- `requirePagePermission(permission)` — page-level, redirects to
  `/admin/unauthorized`.
- `requireActionPermission(permission)` — server-action-level, throws
  (`AuthenticationError` / `AuthorizationError`) instead of redirecting,
  since a mutation can't redirect mid-flight the way a page load can.

**Every** admin page and server action in this codebase calls one of these
before doing anything privileged. The admin sidebar (`AdminShell`) also
filters visible links by `can()`, but that's UX only — removing a link from
the sidebar doesn't and shouldn't be relied on to block the route.

`src/proxy.ts` (Next.js 16's renamed `middleware.ts` convention) adds a
coarse, fast redirect for requests with no session cookie at all. It
deliberately cannot do more than that (no DB/crypto access is guaranteed in
the Edge runtime), and the code comments say so explicitly — it is not the
security boundary, `requireUser()`/`requirePagePermission()` are.

## Database boundary — repositories

Nothing in `src/app` talks to Prisma or to the in-memory dev store
directly. Everything goes through interfaces in
`src/lib/repositories/types.ts` (`UserRepository`, `SessionRepository`,
`AuditRepository`, `ContactMessageRepository`), wired to a concrete
implementation in exactly one place: `src/lib/repositories/index.ts`.

Today that file points at the dev in-memory adapters in
`src/lib/dev-store/*.ts` — see `docs/database.md` for why, and for the
exact steps to swap in Prisma-backed implementations later. No other file
needs to change when that swap happens.

Real Prisma-backed implementations of all four interfaces already exist in
`src/lib/repositories/prisma/*.ts` (plus a singleton client in
`src/lib/prisma.ts`), but are **not imported by `index.ts`** — they can't
be meaningfully verified until `npx prisma generate` succeeds (see
`docs/database.md` for the exact reason: the ungenerated client currently
types everything as `any`, so these files compiling is not evidence they
work).

## Content workflow

`ContentStatus` (`DRAFT → IN_REVIEW → SCHEDULED → PUBLISHED → ARCHIVED`) is
modeled in the Prisma schema for `Page`/`NewsArticle`/`Event`. The
permission matrix encodes who can move content through that pipeline:
`CONTRIBUTOR` can create/update but not publish; `EDITOR` and above can
publish. `src/app/admin/(protected)/news/` is the reference implementation
of this pattern (validate → authorize → operate → audit-log) — the same
shape should be repeated for Events, Gallery, E-Library, etc. once a
database is connected.
