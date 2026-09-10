// Single wiring point: every server action / route handler imports
// repositories from HERE, never directly from lib/dev-store or a Prisma
// client. When a database becomes available:
//
//   1. Run `npx prisma generate` successfully (see docs/database.md).
//   2. Re-run `npx tsc --noEmit` — the prepared files in
//      `src/lib/repositories/prisma/*.ts` currently type-check only because
//      the ungenerated `@prisma/client` stub types everything as `any`; this
//      re-check is the first real verification of their correctness.
//   3. Change the four imports/exports below from `@/lib/dev-store/*` to
//      `@/lib/repositories/prisma/*` (e.g. `devUserRepository` →
//      `prismaUserRepository`). No other file needs to change.
//
// This is the intended seam described in docs/database.md. The prepared
// Prisma files are NOT imported here yet — doing so before generation would
// crash at runtime (`PrismaClient` stub throws on construction).

import { devUserRepository } from "@/lib/dev-store/user-store";
import { devSessionRepository } from "@/lib/dev-store/session-store";
import { devAuditRepository } from "@/lib/dev-store/audit-store";
import { devContactMessageRepository } from "@/lib/dev-store/contact-message-store";

export const userRepository = devUserRepository;
export const sessionRepository = devSessionRepository;
export const auditRepository = devAuditRepository;
export const contactMessageRepository = devContactMessageRepository;
