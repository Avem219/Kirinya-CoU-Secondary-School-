// ============================================================================
// PREPARED, NOT ACTIVE.
//
// This file implements UserRepository (src/lib/repositories/types.ts)
// against `prisma.user`, matching the `User` model in prisma/schema.prisma
// field-for-field. It is NOT imported by src/lib/repositories/index.ts and
// therefore has zero effect on the running application today.
//
// IMPORTANT CAVEAT: because `@prisma/client` is currently ungenerated, its
// `PrismaClient` type resolves to `any` (see src/lib/prisma.ts). That means
// this file currently type-checks successfully NOT because it is verified
// correct against the real schema, but because `any` suppresses all type
// checking on every `prisma.user.*` call below. This is the opposite of
// Prisma's normal guarantee, so do not treat a clean `npm run build` as
// proof this file is correct.
//
// ACTIVATION STEPS (see docs/database.md):
//   1. Run `npx prisma generate` successfully (requires network access this
//      sandbox does not have).
//   2. Re-run `npx tsc --noEmit` and fix any errors this file now surfaces —
//      that re-check is only meaningful once the client is generated.
//   3. In src/lib/repositories/index.ts, replace the `devUserRepository`
//      import/export with this file's `prismaUserRepository`.
// ============================================================================

import { prisma } from "@/lib/prisma";
import type { UserRepository, UserRecord } from "@/lib/repositories/types";
import type { Role } from "@/lib/permissions";

export const prismaUserRepository: UserRepository = {
  async findByEmail(email) {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    return user as UserRecord | null;
  },

  async findById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user as UserRecord | null;
  },

  async listAll() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
    return users as UserRecord[];
  },

  async updateLastLogin(id) {
    await prisma.user.update({ where: { id }, data: { lastLoginAt: new Date() } });
  },

  async setActive(id, isActive) {
    await prisma.user.update({ where: { id }, data: { isActive } });
  },

  async setRole(id, role: Role) {
    await prisma.user.update({ where: { id }, data: { role } });
  },

  async countByRole(role) {
    return prisma.user.count({ where: { role, isActive: true } });
  },
};
