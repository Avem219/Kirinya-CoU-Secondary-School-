import type { Metadata } from "next";
import { requirePagePermission } from "@/lib/auth/guards";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  await requirePagePermission("settings.manage");

  const rows: { label: string; value: string; verified: boolean }[] = [
    { label: "School Name", value: siteConfig.schoolName, verified: true },
    { label: "Motto", value: siteConfig.motto, verified: true },
    { label: "Location", value: siteConfig.location.label, verified: siteConfig.location.verified },
    { label: "Phone", value: siteConfig.phonePrimary.value, verified: siteConfig.phonePrimary.verified },
    { label: "Email", value: siteConfig.email.value ?? "Not set", verified: siteConfig.email.verified },
    {
      label: "Apply Online URL",
      value: siteConfig.applyOnlineUrl.value,
      verified: siteConfig.applyOnlineUrl.verified,
    },
    { label: "Facebook", value: siteConfig.social.facebook.value ?? "Not set", verified: false },
    { label: "Twitter/X", value: siteConfig.social.twitter.value ?? "Not set", verified: false },
    { label: "YouTube", value: siteConfig.social.youtube.value ?? "Not set", verified: false },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Current effective values, sourced from src/lib/site-config.ts — the single source of truth used across the public site."
      />

      <div className="rounded-xl border border-dashed border-ink/20 bg-ink/[0.02] px-5 py-3 text-xs text-ink/60">
        This page is currently read-only. Editing here will write to the
        database-backed <code className="rounded bg-ink/5 px-1">SiteSetting</code> model
        once connected, which will then override these static defaults —
        see docs/database.md. No duplicate source of truth is created in the
        meantime.
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white/40">
        <table className="w-full text-left text-sm">
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-ink/5 last:border-0">
                <td className="w-48 px-4 py-3 font-medium text-ink/70">{row.label}</td>
                <td className="px-4 py-3">{row.value}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      row.verified ? "bg-forest/10 text-forest" : "bg-amber-50 text-amber-800"
                    }`}
                  >
                    {row.verified ? "Verified" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
