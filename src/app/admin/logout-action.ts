"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCurrentUser, destroySession } from "@/lib/auth/session";
import { auditRepository } from "@/lib/repositories";

export async function logout(): Promise<void> {
  const user = await getCurrentUser();
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

  await destroySession();

  if (user) {
    await auditRepository.record({
      userId: user.id,
      action: "auth.logout",
      resource: `User:${user.id}`,
      result: "success",
      ipAddress,
      metadata: null,
    });
  }

  redirect("/admin/login");
}
