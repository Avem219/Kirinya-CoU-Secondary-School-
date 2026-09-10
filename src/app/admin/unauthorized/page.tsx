import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Access Denied | Kirinya C.O.U.S.S Admin",
  robots: { index: false, follow: false },
};

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-parchment px-4 text-center">
      <p className="font-serif text-5xl font-semibold text-ink/20">403</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-ink">Access Denied</h1>
      <p className="mt-2 max-w-sm text-sm text-ink/60">
        Your account doesn&rsquo;t have permission to view this page. If you
        believe this is a mistake, contact a Super Admin.
      </p>
      <Link
        href="/admin/dashboard"
        className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-parchment"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
