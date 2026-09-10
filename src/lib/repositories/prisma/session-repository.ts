// PREPARED, NOT ACTIVE — see user-repository.ts in this directory for the
// full explanation (ungenerated-client `any` caveat + activation steps).
// Implements SessionRepository against the `Session` model.

import { prisma } from "@/lib/prisma";
import type { SessionRepository, SessionRecord } from "@/lib/repositories/types";

export const prismaSessionRepository: SessionRepository = {
  async create(input) {
    const session = await prisma.session.create({ data: input });
    return session as SessionRecord;
  },

  async findByTokenHash(tokenHash) {
    const session = await prisma.session.findUnique({ where: { tokenHash } });
    if (!session) return null;
    if (session.expiresAt.getTime() < Date.now()) {
      // Lazily clean up expired sessions rather than requiring a cron job.
      await prisma.session.delete({ where: { tokenHash } }).catch(() => undefined);
      return null;
    }
    return session as SessionRecord;
  },

  async deleteByTokenHash(tokenHash) {
    await prisma.session.deleteMany({ where: { tokenHash } });
  },

  async deleteAllForUser(userId) {
    await prisma.session.deleteMany({ where: { userId } });
  },
};
