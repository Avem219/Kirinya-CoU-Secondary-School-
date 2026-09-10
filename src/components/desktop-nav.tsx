"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/navigation";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-6 text-sm font-medium">
        {primaryNav.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-1 border-b-2 py-2 transition ${
                  isActive
                    ? "border-gold text-ink"
                    : "border-transparent text-ink/80 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
              {item.children && (
                <ul className="invisible absolute left-0 top-full min-w-56 rounded-md border border-ink/10 bg-parchment p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded px-3 py-2 text-sm text-ink/80 hover:bg-ink/5 hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
