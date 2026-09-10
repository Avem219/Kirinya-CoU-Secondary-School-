// Singleton PrismaClient for the Next.js dev/hot-reload environment.
//
// STATUS: prepared, NOT currently used anywhere. `npx prisma generate` has
// never succeeded in this project's history (see docs/database.md), so
// `@prisma/client` currently ships only its ungenerated stub — `PrismaClient`
// is literally typed as `any` in that stub (not a real, schema-aware type),
// and its constructor throws `'@prisma/client did not initialize yet. Please
// run "prisma generate"'` the instant it's called.
//
// This file is therefore intentionally NOT imported by anything yet — doing
// so would crash at runtime, not just fail to compile. It exists so that the
// moment `npx prisma generate` succeeds in a real environment, only
// `src/lib/repositories/index.ts` needs to change (to import from
// `src/lib/repositories/prisma/*` instead of `src/lib/dev-store/*`) — this
// file is already correct and needs no edits.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
