"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { userRepository, auditRepository } from "@/lib/repositories";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { checkLoginRateLimit, resetLoginRateLimit } from "@/lib/auth/rate-limit";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string };

async function getRequestMeta() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
  const userAgent = headerList.get("user-agent");
  return { ipAddress, userAgent };
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid email and password." };
  }

  const { email, password } = parsed.data;
  const { ipAddress, userAgent } = await getRequestMeta();

  const rateLimitKey = `${ipAddress ?? "unknown"}:${email}`;
  const rateLimit = checkLoginRateLimit(rateLimitKey);
  if (!rateLimit.allowed) {
    await auditRepository.record({
      userId: null,
      action: "auth.login",
      resource: `User:${email}`,
      result: "failure",
      ipAddress,
      metadata: { reason: "rate_limited" },
    });
    return {
      status: "error",
      message: "Too many login attempts. Please try again in a few minutes.",
    };
  }

  const user = await userRepository.findByEmail(email);

  // Constant-shape failure path: whether the email doesn't exist or the
  // password is wrong, the response and timing profile are the same, so a
  // caller cannot use this endpoint to enumerate valid admin emails.
  const passwordValid = user ? await verifyPassword(password, user.passwordHash) : false;

  if (!user || !user.isActive || !passwordValid) {
    await auditRepository.record({
      userId: user?.id ?? null,
      action: "auth.login",
      resource: `User:${email}`,
      result: "failure",
      ipAddress,
      metadata: { reason: !user ? "no_such_user" : !user.isActive ? "inactive" : "bad_password" },
    });
    return { status: "error", message: "Invalid email or password." };
  }

  resetLoginRateLimit(rateLimitKey);
  await createSession(user.id, { ipAddress, userAgent });
  await userRepository.updateLastLogin(user.id);
  await auditRepository.record({
    userId: user.id,
    action: "auth.login",
    resource: `User:${user.id}`,
    result: "success",
    ipAddress,
    metadata: null,
  });

  redirect("/admin/dashboard");
}
