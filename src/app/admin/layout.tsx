import type { Metadata } from "next";
import "../globals.css";

// This is a SEPARATE root layout from src/app/(site)/layout.tsx (Next.js
// "multiple root layouts" pattern). The admin application is an internal
// operational tool, not a page of the public marketing site, so it does not
// render SiteHeader/SiteFooter and is excluded from search indexing.
export const metadata: Metadata = {
  title: { default: "Kirinya C.O.U.S.S Admin", template: "%s | Kirinya C.O.U.S.S Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-parchment text-ink">{children}</body>
    </html>
  );
}
