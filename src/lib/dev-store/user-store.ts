// ============================================================================
// DEV-ONLY ADAPTER — NOT PRODUCTION STORAGE
//
// This module keeps user records in a process-local Map. It exists solely
// because this environment cannot reach a Postgres database or the Prisma
// engine binaries (see docs/database.md), and authentication cannot be
// demonstrated or tested at all without *some* user store.
//
// Data here is LOST on every server restart and is NOT shared across
// serverless instances. It must be replaced with a real
// `PrismaUserRepository` (implementing the same `UserRepository` interface
// from src/lib/repositories/types.ts) before this ever runs against real
// users — see docs/database.md for the exact migration steps.
// ============================================================================

import { randomUUID } from "crypto";
import { hashPassword } from "@/lib/auth/password";
import type { UserRecord, UserRepository } from "@/lib/repositories/types";
import type { Role } from "@/lib/permissions";

const users = new Map<string, UserRecord>();
let seeded = false;

async function ensureSeeded() {
  if (seeded) return;
  seeded = true;

  const email = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!email || !password) {
    // No bootstrap credentials configured — this is a valid, safe state
    // (e.g. in CI, or before an operator has set them up). No account
    // exists, so login will correctly fail rather than falling back to any
    // default credential.
    return;
  }

  const id = randomUUID();
  users.set(id, {
    id,
    name: "Super Admin",
    email: email.toLowerCase(),
    passwordHash: await hashPassword(password),
    role: "SUPER_ADMIN",
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
  });
}

export const devUserRepository: UserRepository = {
  async findByEmail(email) {
    await ensureSeeded();
    const target = email.toLowerCase();
    for (const user of users.values()) {
      if (user.email === target) return user;
    }
    return null;
  },

  async findById(id) {
    await ensureSeeded();
    return users.get(id) ?? null;
  },

  async listAll() {
    await ensureSeeded();
    return Array.from(users.values());
  },

  async updateLastLogin(id) {
    const user = users.get(id);
    if (user) user.lastLoginAt = new Date();
  },

  async setActive(id, isActive) {
    const user = users.get(id);
    if (user) user.isActive = isActive;
  },

  async setRole(id, role: Role) {
    const user = users.get(id);
    if (user) user.role = role;
  },

  async countByRole(role) {
    await ensureSeeded();
    return Array.from(users.values()).filter((u) => u.role === role && u.isActive).length;
  },
};
