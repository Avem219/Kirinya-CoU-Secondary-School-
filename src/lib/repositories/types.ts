// Repository interfaces.
//
// Application code (server actions, route handlers) depends on these
// interfaces, never directly on Prisma or on the in-memory dev store. This
// is what lets src/lib/repositories/index.ts swap in a real
// PrismaUserRepository etc. later without any calling code changing.
//
// See docs/architecture.md § "Database boundary" for the full rationale.

import type { Role } from "@/lib/permissions";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
};

export interface UserRepository {
  findByEmail(email: string): Promise<UserRecord | null>;
  findById(id: string): Promise<UserRecord | null>;
  listAll(): Promise<UserRecord[]>;
  updateLastLogin(id: string): Promise<void>;
  setActive(id: string, isActive: boolean): Promise<void>;
  setRole(id: string, role: Role): Promise<void>;
  countByRole(role: Role): Promise<number>;
}

export type SessionRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: Date;
  expiresAt: Date;
};

export interface SessionRepository {
  create(input: Omit<SessionRecord, "id" | "createdAt">): Promise<SessionRecord>;
  findByTokenHash(tokenHash: string): Promise<SessionRecord | null>;
  deleteByTokenHash(tokenHash: string): Promise<void>;
  deleteAllForUser(userId: string): Promise<void>;
}

export type AuditLogEntry = {
  id: string;
  userId: string | null;
  action: string;
  resource: string;
  result: "success" | "failure";
  ipAddress: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
};

export interface AuditRepository {
  record(
    entry: Omit<AuditLogEntry, "id" | "createdAt">
  ): Promise<void>;
  list(limit?: number): Promise<AuditLogEntry[]>;
}

export type ContactMessageRecord = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  ipAddress: string | null;
  createdAt: Date;
};

export interface ContactMessageRepository {
  create(
    input: Omit<ContactMessageRecord, "id" | "createdAt" | "isRead" | "isArchived">
  ): Promise<ContactMessageRecord>;
  list(): Promise<ContactMessageRecord[]>;
  markRead(id: string, isRead: boolean): Promise<void>;
  archive(id: string, isArchived: boolean): Promise<void>;
}
