"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminNavItem } from "@/lib/admin-nav";
import { logout } from "@/app/admin/logout-action";

export function AdminShell({
  navItems,
  user,
  children,
}: {
  navItems: AdminNavItem[];
  user: { name: string; email: string; role: string };
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const sidebarContent = (
    <nav aria-label="Admin" className="flex h-full flex-col">
      <div className="px-5 py-6">
        <p className="font-serif text-sm font-semibold tracking-tight text-parchment">
          Kirinya C.O.U.S.S
        </p>
        <p className="text-xs text-parchment/50">Admin</p>
      </div>
      <ul className="flex-1 space-y-0.5 overflow-y-auto px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsSidebarOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-parchment/10 text-parchment"
                    : "text-parchment/60 hover:bg-parchment/5 hover:text-parchment"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 bg-ink lg:block">{sidebarContent}</aside>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/60"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-ink shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink/10 bg-parchment px-4 py-3 sm:px-6">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink/10 lg:hidden"
          >
            <span aria-hidden>☰</span>
          </button>

          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium leading-tight">{user.name}</p>
              <p className="text-xs leading-tight text-ink/50">
                {user.email} · <span className="font-semibold">{user.role}</span>
              </p>
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold text-ink hover:bg-ink/5"
              >
                Log out
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 bg-parchment/60 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
