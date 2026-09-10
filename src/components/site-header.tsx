import Link from "next/link";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-parchment/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo is CMS-managed (SiteSetting.logoUrl); placeholder mark shown until asset is provided */}
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-serif font-semibold text-parchment"
          >
            KC
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold tracking-tight">
              Kirinya C.O.U.S.S
            </span>
            <span className="text-xs text-muted">Light for Life</span>
          </span>
        </Link>

        <DesktopNav />

        <Link
          href="/admissions"
          className="hidden shrink-0 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition hover:brightness-95 sm:inline-flex"
        >
          Apply Online
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
