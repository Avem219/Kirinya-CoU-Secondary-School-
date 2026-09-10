# Kirinya C.O.U.S.S Digital Platform

A production-track rebuild of the Kirinya Church of Uganda Secondary School
website: a public marketing site plus an authenticated, role-based admin
CMS. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and a
Prisma/PostgreSQL schema.

**Content policy**: nothing in this codebase invents school facts, staff,
statistics, or media. Anything not yet verified from the current live site
is rendered as an explicit "pending verification" or empty state — see
`docs/current-site-audit.md`.

## Status at a glance

- ✅ Public site: all 19 content routes built (see `docs/architecture.md`)
- ✅ Admin authentication, RBAC, and shell: implemented and tested
- ⚠️ Database: schema complete, **not connected** — see `docs/database.md`
- ⚠️ Content CRUD (News/Events/Gallery/etc.): permission-gated admin pages
  exist; full persistence is blocked on the database connection above

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Prisma (schema only,
client not yet generated) · bcryptjs · zod · Vitest

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in ADMIN_BOOTSTRAP_EMAIL/PASSWORD
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the admin CMS (sign in with the
bootstrap credentials you set in `.env.local`).

### Available scripts

```bash
npm run dev      # start the dev server
npm run build    # production build (also runs the TypeScript check)
npm run start    # run a built production server
npm run lint     # ESLint
npm run test     # Vitest unit tests
```

## Environment variables

See `.env.example` for the full, commented list. In short:

| Variable | Required? | Purpose |
|---|---|---|
| `DATABASE_URL` | For Prisma commands | Postgres connection string. Not yet read by application code — see `docs/database.md`. |
| `ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD` | For local admin login | Seeds a Super Admin in the in-memory dev user store. |

## Documentation

- `docs/current-site-audit.md` — verified facts migrated from the live site
- `docs/architecture.md` — layout structure, auth, RBAC, repository pattern
- `docs/database.md` — exact steps to connect a real Postgres database, plus **Local Database Setup**
- `docs/security.md` — security model and known limitations
- `docs/media-policy.md` — image/media rights and consent policy

## Deployment

Not yet deployed anywhere. Before deploying:
1. Connect a real database (`docs/database.md`) — required, since admin
   auth and content currently use non-persistent in-memory stores.
2. Set `DATABASE_URL`, `ADMIN_BOOTSTRAP_EMAIL`/`PASSWORD` (or better, seed a
   real admin and remove the bootstrap vars) in your hosting platform's
   environment configuration — never commit them.
3. Run `npm run build` and deploy the standard Next.js output to any
   Node-compatible host (Vercel, a VPS with `next start`, etc.).
4. Configure object storage for the media library (see `docs/security.md`
   § File uploads) before relying on `/admin/media`.

## Known limitations

- No database connection in the environment this was built in (see
  `docs/database.md` for why and exactly how to fix it).
- Auth, sessions, audit logs, and contact messages currently use
  process-local in-memory stores — functionally correct for demonstrating
  and testing the security logic, but **not durable**, and not shared
  across multiple server instances.
- Full CRUD is only built out for News as a reference implementation;
  Events/Gallery/E-Library/Staff/Academics/Admissions have permission-gated
  admin pages but not full forms yet.
- Rate limiting is in-memory/single-instance (see `docs/security.md`).
- This directory is not currently a Git repository.
