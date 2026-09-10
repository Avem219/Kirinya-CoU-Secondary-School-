"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { requireActionPermission, AuthenticationError, AuthorizationError } from "@/lib/auth/guards";
import { auditRepository } from "@/lib/repositories";

const draftSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(200),
  excerpt: z.string().trim().max(300).optional(),
});

export type NewsDraftState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "blocked"; message: string };

export async function createNewsDraft(
  _prevState: NewsDraftState,
  formData: FormData
): Promise<NewsDraftState> {
  // 1. Authentication + permission check — server-authoritative, not
  //    inferred from the form having rendered at all.
  let user;
  try {
    user = await requireActionPermission("news.create");
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { status: "error", message: "Your session has expired. Please sign in again." };
    }
    if (error instanceof AuthorizationError) {
      return { status: "error", message: "You do not have permission to create news drafts." };
    }
    throw error;
  }

  // 2. Input validation
  const parsed = draftSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt") ?? undefined,
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  // 3. Operation — intentionally NOT performed. There is no database
  //    connection in this environment (see docs/database.md), so we do not
  //    fabricate a successful save. A real PrismaNewsRepository.create()
  //    call belongs exactly here.
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

  // 4. Audit logging — recorded even though the underlying save didn't
  //    happen, because the *attempt* (who tried to create what) is itself
  //    useful operational history once this ships with a real database.
  await auditRepository.record({
    userId: user.id,
    action: "news.create_attempt",
    resource: `NewsArticle:${parsed.data.title}`,
    result: "failure",
    ipAddress,
    metadata: { reason: "no_database_connected" },
  });

  return {
    status: "blocked",
    message:
      "Validated and authorized successfully — but no database is connected, so this draft could not be saved. Connect DATABASE_URL to enable real persistence.",
  };
}
