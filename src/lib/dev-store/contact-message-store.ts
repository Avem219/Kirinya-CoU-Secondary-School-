// DEV-ONLY ADAPTER — see user-store.ts for the full rationale. Replace with
// a PrismaContactMessageRepository backed by the `ContactMessage` model once
// a database is connected.
//
// NOTE: this adapter is intentionally NOT wired into the public contact
// form (src/app/contact/actions.ts) — that form still reports honestly that
// no database is connected. Faking message persistence here, even to an
// in-memory store, would misrepresent the contact form's real state to
// visitors, which is a stricter bar than the auth bootstrap use case above.
// This adapter exists only so /admin/messages can be built and reviewed
// against a real interface ahead of the database connection.

import { randomUUID } from "crypto";
import type { ContactMessageRecord, ContactMessageRepository } from "@/lib/repositories/types";

const messages: ContactMessageRecord[] = [];

export const devContactMessageRepository: ContactMessageRepository = {
  async create(input) {
    const record: ContactMessageRecord = {
      ...input,
      id: randomUUID(),
      isRead: false,
      isArchived: false,
      createdAt: new Date(),
    };
    messages.unshift(record);
    return record;
  },

  async list() {
    return messages;
  },

  async markRead(id, isRead) {
    const record = messages.find((m) => m.id === id);
    if (record) record.isRead = isRead;
  },

  async archive(id, isArchived) {
    const record = messages.find((m) => m.id === id);
    if (record) record.isArchived = isArchived;
  },
};
