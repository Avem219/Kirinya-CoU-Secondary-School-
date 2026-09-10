import { describe, it, expect } from "vitest";
import { can } from "@/lib/permissions";

describe("can() — role-based permission checks", () => {
  it("denies all permissions when user is null or undefined", () => {
    expect(can(null, "dashboard.view")).toBe(false);
    expect(can(undefined, "dashboard.view")).toBe(false);
  });

  it("denies every permission for a deactivated account, regardless of role", () => {
    const deactivatedSuperAdmin = { role: "SUPER_ADMIN" as const, isActive: false };
    expect(can(deactivatedSuperAdmin, "dashboard.view")).toBe(false);
    expect(can(deactivatedSuperAdmin, "settings.manage")).toBe(false);
    expect(can(deactivatedSuperAdmin, "users.manage")).toBe(false);
  });

  it("CONTRIBUTOR can create/update but not publish news", () => {
    const contributor = { role: "CONTRIBUTOR" as const, isActive: true };
    expect(can(contributor, "news.create")).toBe(true);
    expect(can(contributor, "news.update")).toBe(true);
    expect(can(contributor, "news.publish")).toBe(false);
    expect(can(contributor, "news.delete")).toBe(false);
  });

  it("EDITOR can publish news/events but cannot manage users or settings", () => {
    const editor = { role: "EDITOR" as const, isActive: true };
    expect(can(editor, "news.publish")).toBe(true);
    expect(can(editor, "events.publish")).toBe(true);
    expect(can(editor, "users.manage")).toBe(false);
    expect(can(editor, "settings.manage")).toBe(false);
    expect(can(editor, "auditlog.view")).toBe(false);
  });

  it("ADMIN can manage most content and view users, but cannot manage settings or users or view audit logs", () => {
    const admin = { role: "ADMIN" as const, isActive: true };
    expect(can(admin, "news.delete")).toBe(true);
    expect(can(admin, "staff.manage")).toBe(true);
    expect(can(admin, "users.view")).toBe(true);
    expect(can(admin, "users.manage")).toBe(false);
    expect(can(admin, "settings.manage")).toBe(false);
    expect(can(admin, "auditlog.view")).toBe(false);
  });

  it("SUPER_ADMIN has every defined permission", () => {
    const superAdmin = { role: "SUPER_ADMIN" as const, isActive: true };
    const allPermissions: Parameters<typeof can>[1][] = [
      "dashboard.view",
      "news.create",
      "news.publish",
      "news.delete",
      "events.publish",
      "gallery.manage",
      "elibrary.manage",
      "staff.manage",
      "academics.manage",
      "admissions.manage",
      "announcements.manage",
      "messages.manage",
      "media.delete",
      "settings.manage",
      "users.manage",
      "auditlog.view",
    ];
    for (const permission of allPermissions) {
      expect(can(superAdmin, permission)).toBe(true);
    }
  });
});
