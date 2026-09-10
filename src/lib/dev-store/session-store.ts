// DEV-ONLY ADAPTER — see user-store.ts for the full rationale. Session
// records live in a process-local Map and are lost on restart. Replace with
// a PrismaSessionRepository backed by the `Session` model in
// prisma/schema.prisma once a database is connected.

import { randomUUID } from "crypto";
import type { SessionRecord, SessionRepository } from "@/lib/repositories/types";

const sessions = new Map<string, SessionRecord>(); // keyed by tokenHash

export const devSessionRepository: SessionRepository = {
  async create(input) {
    const record: SessionRecord = { ...input, id: randomUUID(), createdAt: new Date() };
    sessions.set(record.tokenHash, record);
    return record;
  },

  async findByTokenHash(tokenHash) {
    const record = sessions.get(tokenHash);
    if (!record) return null;
    if (record.expiresAt.getTime() < Date.now()) {
      sessions.delete(tokenHash);
      return null;
    }
    return record;
  },

  async deleteByTokenHash(tokenHash) {
    sessions.delete(tokenHash);
  },

  async deleteAllForUser(userId) {
    for (const [key, record] of sessions.entries()) {
      if (record.userId === userId) sessions.delete(key);
    }
  },
};
