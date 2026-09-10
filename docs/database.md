# Database Integration

## Current state

This project's Prisma schema (`prisma/schema.prisma`) is complete and
hand-validated, but `npx prisma generate` has never successfully run in the
environment this was built in: that sandbox's network allowlist does not
include `binaries.prisma.sh`, which Prisma needs to download its query
engine binary. There is also no reachable Postgres instance.

Because of that, five repositories currently have **dev-only, in-memory**
implementations instead of real database backing:

| Interface (`src/lib/repositories/types.ts`) | Dev adapter (`src/lib/dev-store/`) | Prisma model |
|---|---|---|
| `UserRepository` | `user-store.ts` | `User` |
| `SessionRepository` | `session-store.ts` | `Session` |
| `AuditRepository` | `audit-store.ts` | `AuditLog` |
| `ContactMessageRepository` | `contact-message-store.ts` | `ContactMessage` |

**These adapters lose all data on every server restart** and do not share
state across multiple server instances. They exist only so authentication
and RBAC could be built and tested as real, working code rather than
theoretical scaffolding. Every dev-store file has a large comment block
saying exactly this.

## Local Database Setup

**These commands have not been successfully executed anywhere in this
project's history — confirmed again in Phase 3 (see "Phase 3 findings"
below).** They are documented here so they're ready to run the moment a
real PostgreSQL database and normal (unrestricted) network access are
available.

```bash
# 1. Set a real connection string in .env.local
#    DATABASE_URL="postgresql://user:password@host:5432/kirinya"

# 2. Generate the Prisma Client from prisma/schema.prisma
npx prisma generate

# 3. Create and apply the initial migration
npx prisma migrate dev --name init

# 4. (Optional) inspect the schema visually
npx prisma studio
```

If step 2 or 3 fails, it is almost always one of: `DATABASE_URL` unset or
malformed, the Postgres server unreachable/not running, or (in a sandboxed
environment like the one this project was built in) no network access to
Prisma's engine binary host. Do not assume success — check the command's
actual exit code and output.

### Phase 3 findings (reconfirmed)

Re-tested in this environment before attempting any repository work:

- No `.env`/`.env.local` file exists in this sandbox, and `DATABASE_URL` is
  unset in the shell — there is no PostgreSQL instance to connect to here.
- `npx prisma validate` — a schema-only command that shouldn't need a live
  database — still fails, because this Prisma version fetches its query
  engine binary from `binaries.prisma.sh` even to parse the schema. Exact
  error: `Failed to fetch sha256 checksum at
  https://binaries.prisma.sh/.../libquery_engine.so.node.gz.sha256 - 403
  Forbidden`.
- Setting `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1` (Prisma's documented
  offline-environment workaround) does not help: it skips the checksum
  step but the actual binary fetch then fails identically —
  `Failed to fetch the engine file at
  https://binaries.prisma.sh/.../libquery_engine.so.node.gz - 403
  Forbidden`.
- Root cause: this sandbox's network egress allowlist does not include
  `binaries.prisma.sh` (or any Postgres host), and is not configurable from
  inside a session. This is an infrastructure boundary, not a code or
  schema problem — nothing in `prisma/schema.prisma` or the application
  code caused it, and nothing here should be changed to "fix" it.
- **Conclusion**: Phase 3 (real Prisma Client generation, migrations, and
  swapping the dev-store repositories for Prisma-backed ones) cannot be
  performed inside this environment. It needs to run somewhere with normal
  internet access — a developer's machine, a CI runner, or a deployment
  host — following the exact steps above and in "Connecting a real
  database" below.

### Phase 4 — prepared Prisma repository adapters (not active)

`src/lib/prisma.ts` and `src/lib/repositories/prisma/*.ts` now contain real,
schema-matched implementations of every repository interface (User,
Session, Audit, ContactMessage). **They are not imported by
`src/lib/repositories/index.ts` and have zero effect on the running
application.**

Critical caveat, confirmed by direct testing in this environment: because
`@prisma/client` is ungenerated, its `PrismaClient` type currently resolves
to literal `any` (verified by inspecting
`node_modules/.prisma/client/default.d.ts` — `export declare type
PrismaClient = any`). This means:

- These files type-check successfully today, but **not because they are
  verified correct** — `any` disables type checking on every
  `prisma.user.*`/`prisma.session.*`/etc. call. A clean `npm run build` is
  not evidence these files are right.
- If any of them were imported and executed today, `new PrismaClient()`
  would throw immediately: `'@prisma/client did not initialize yet. Please
  run "prisma generate"'` (verified by inspecting the generated stub's
  `default.js`).

**Activation steps** (once `npx prisma generate` succeeds — see "Local
Database Setup" above):
1. Re-run `npx tsc --noEmit` — this is the first *meaningful* type-check of
   these files, since `PrismaClient` will now be a real, schema-aware type.
2. Fix anything it surfaces.
3. In `src/lib/repositories/index.ts`, change the four imports from
   `@/lib/dev-store/*` to `@/lib/repositories/prisma/*`. No other file
   changes.

## Connecting a real database

1. Provision a Postgres database and set `DATABASE_URL` (see `.env.example`).
2. In an environment with normal internet access (this one could not reach
   `binaries.prisma.sh` — a plain laptop or CI runner will be fine):
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```
3. `src/lib/prisma.ts` (singleton `PrismaClient`) and the four adapters in
   `src/lib/repositories/prisma/*.ts` (User/Session/Audit/ContactMessage)
   **already exist** — see "Phase 4" above for their current status and the
   type-safety caveat that applies until step 1 succeeds.
4. Follow the three "Activation steps" above to wire them in.
5. Seed a real Super Admin (e.g. a `prisma/seed.ts` script using
   `hashPassword()` from `src/lib/auth/password.ts`) and retire
   `ADMIN_BOOTSTRAP_EMAIL`/`ADMIN_BOOTSTRAP_PASSWORD`.
6. Repeat the same repository pattern for content (`NewsRepository`,
   `EventRepository`, etc.) as those admin sections are built out — see
   `src/app/admin/(protected)/news/actions.ts` for the reference shape a
   real create/update/publish action should follow.

## What was NOT done

- No database operation anywhere in this codebase pretends to succeed. The
  News draft form, the media upload route, and the public contact form all
  explicitly report that persistence is unavailable rather than returning a
  fake success state.
- Content CRUD (News/Events/Gallery/E-Library/Staff/Academics/Admissions)
  has permission-gated admin pages and, for News, a full reference
  implementation of the create flow — but full CRUD for every content type
  was not built out, since it would be untestable without a real database
  and would duplicate the same pattern many times. Building it out is
  mechanical once step 5 above is done.
