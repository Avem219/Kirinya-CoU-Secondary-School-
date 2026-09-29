import { prismaUserRepository } from "@/lib/repositories/prisma/user-repository";
import { prismaSessionRepository } from "@/lib/repositories/prisma/session-repository";
import { prismaAuditRepository } from "@/lib/repositories/prisma/audit-repository";
import { prismaContactMessageRepository } from "@/lib/repositories/prisma/contact-message-repository";

export const userRepository = prismaUserRepository;
export const sessionRepository = prismaSessionRepository;
export const auditRepository = prismaAuditRepository;
export const contactMessageRepository = prismaContactMessageRepository;
