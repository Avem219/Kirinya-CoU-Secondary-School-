// DEV-ONLY ADAPTER — see user-store.ts for the full rationale. Replace with
// a PrismaAuditRepository backed by the `AuditLog` model once a database is
// connected. Entries never include passwords, tokens, or raw session
// identifiers — only what/who/when/target/result.

import { randomUUID } from "crypto";
import type { AuditLogEntry, AuditRepository } from "@/lib/repositories/types";

const entries: AuditLogEntry[] = [];
const MAX_IN_MEMORY_ENTRIES = 500;

export const devAuditRepository: AuditRepository = {
  async record(entry) {
    entries.unshift({ ...entry, id: randomUUID(), createdAt: new Date() });
    if (entries.length > MAX_IN_MEMORY_ENTRIES) entries.length = MAX_IN_MEMORY_ENTRIES;
  },

  async list(limit = 50) {
    return entries.slice(0, limit);
  },
};
