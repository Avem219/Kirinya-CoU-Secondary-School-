"use server";

import { revalidatePath } from "next/cache";
import { requireActionPermission } from "@/lib/auth/guards";
import { userRepository, auditRepository, sessionRepository } from "@/lib/repositories";
import type { Role } from "@/lib/permissions";

export type UserActionState = { status: "idle" } | { status: "error"; message: string } | { status: "success" };

async function assertNotLastActiveSuperAdmin(targetId: string, nextRole?: Role, nextActive?: boolean) {
  const target = await userRepository.findById(targetId);
  if (!target) throw new Error("User not found.");

  const isDemotingOrDeactivatingSuperAdmin =
    target.role === "SUPER_ADMIN" &&
    ((nextRole && nextRole !== "SUPER_ADMIN") || nextActive === false);

  if (isDemotingOrDeactivatingSuperAdmin) {
    const activeSuperAdmins = await userRepository.countByRole("SUPER_ADMIN");
    if (activeSuperAdmins <= 1) {
      throw new Error(
        "This is the last active Super Admin account. Promote another account to Super Admin before changing this one."
      );
    }
  }
}

export async function updateUserRole(
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  return applyRoleChange(formData);
}

export async function updateUserRoleForm(formData: FormData): Promise<void> {
  await applyRoleChange(formData);
  revalidatePath("/admin/users");
}

async function applyRoleChange(formData: FormData): Promise<UserActionState> {
  const actor = await requireActionPermission("users.manage");
  const targetId = String(formData.get("userId") ?? "");
  const nextRole = String(formData.get("role") ?? "") as Role;

  if (!["SUPER_ADMIN", "ADMIN", "EDITOR", "CONTRIBUTOR"].includes(nextRole)) {
    return { status: "error", message: "Invalid role." };
  }

  try {
    await assertNotLastActiveSuperAdmin(targetId, nextRole, undefined);
  } catch (err) {
    return { status: "error", message: (err as Error).message };
  }

  await userRepository.setRole(targetId, nextRole);
  await auditRepository.record({
    userId: actor.id,
    action: "user.role_change",
    resource: `User:${targetId}`,
    result: "success",
    ipAddress: null,
    metadata: { newRole: nextRole },
  });

  revalidatePath("/admin/users");
  return { status: "success" };
}

export async function toggleUserActive(
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  return applyActiveToggle(formData);
}

export async function toggleUserActiveForm(formData: FormData): Promise<void> {
  await applyActiveToggle(formData);
  revalidatePath("/admin/users");
}

async function applyActiveToggle(formData: FormData): Promise<UserActionState> {
  const actor = await requireActionPermission("users.manage");
  const targetId = String(formData.get("userId") ?? "");
  const nextActive = formData.get("isActive") === "true";

  try {
    await assertNotLastActiveSuperAdmin(targetId, undefined, nextActive);
  } catch (err) {
    return { status: "error", message: (err as Error).message };
  }

  await userRepository.setActive(targetId, nextActive);
  if (!nextActive) {
    // Immediately invalidate any existing sessions for a deactivated account.
    await sessionRepository.deleteAllForUser(targetId);
  }
  await auditRepository.record({
    userId: actor.id,
    action: "user.status_change",
    resource: `User:${targetId}`,
    result: "success",
    ipAddress: null,
    metadata: { isActive: nextActive },
  });

  revalidatePath("/admin/users");
  return { status: "success" };
}
