// PREPARED, NOT ACTIVE — see user-repository.ts in this directory for the
// full explanation. Implements ContactMessageRepository against the
// `ContactMessage` model. Once activated, src/app/(site)/contact/actions.ts
// should be updated to call `contactMessageRepository.create(...)` and
// return a genuine success state instead of its current honest
// not-connected message — see docs/database.md.

import { prisma } from "@/lib/prisma";
import type {
  ContactMessageRepository,
  ContactMessageRecord,
} from "@/lib/repositories/types";

export const prismaContactMessageRepository: ContactMessageRepository = {
  async create(input) {
    const message = await prisma.contactMessage.create({ data: input });
    return message as ContactMessageRecord;
  },

  async list() {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return messages as ContactMessageRecord[];
  },

  async markRead(id, isRead) {
    await prisma.contactMessage.update({ where: { id }, data: { isRead } });
  },

  async archive(id, isArchived) {
    await prisma.contactMessage.update({ where: { id }, data: { isArchived } });
  },
};
