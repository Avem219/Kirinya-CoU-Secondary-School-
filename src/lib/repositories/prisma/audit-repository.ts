// PREPARED, NOT ACTIVE — see user-repository.ts in this directory for the
// full explanation. Implements AuditRepository against the `AuditLog` model.
// `metadata` is stored as Prisma `Json` — never persist passwords, raw
// session tokens, or other secrets in it (matches the dev-store contract).
//
// Once the real client is generated, tighten `metadata`'s cast to
// `Prisma.InputJsonValue | undefined` (the ungenerated stub's `Prisma`
// namespace doesn't declare that type, so it's deliberately left untyped
// here rather than referencing a type that doesn't exist yet).

import { prisma } from "@/lib/prisma";
import type { AuditRepository, AuditLogEntry } from "@/lib/repositories/types";

export const prismaAuditRepository: AuditRepository = {
  async record(entry) {
    await prisma.auditLog.create({
      data: {
        ...entry,
        metadata: entry.metadata ?? undefined,
      },
    });
  },

  async list(limit = 50) {
    const entries = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return entries as unknown as AuditLogEntry[];
  },
};
