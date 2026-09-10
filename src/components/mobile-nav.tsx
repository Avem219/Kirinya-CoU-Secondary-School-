"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Close on route change. Adjusting state during render (rather than in an
  // effect) is the recommended React pattern for "reset state when a prop
  // changes" and avoids an extra cascading render.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (isOpen) setIsOpen(false);
  }

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  // Escape to close + return focus to the trigger; basic focus trap
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        openButtonRef.current?.focus();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Move focus into the panel when it opens
    const firstLink = dialogRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink/10 lg:hidden"
      >
        <span aria-hidden className="text-lg">
          {isOpen ? "✕" : "☰"}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/60"
            onClick={() => setIsOpen(false)}
          />
          <div
            id={panelId}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-parchment p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-semibold">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink/10"
              >
                <span aria-hidden>✕</span>
              </button>
            </div>

            <nav aria-label="Primary" className="mt-6">
              <ul className="space-y-1">
                {primaryNav.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`block rounded-md px-3 py-2 font-medium ${
                          isActive ? "bg-ink text-parchment" : "text-ink hover:bg-ink/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <ul className="ml-3 mt-1 space-y-1 border-l border-ink/10 pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-md px-3 py-2 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink"
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

            <Link
              href="/admissions"
              className="mt-6 block rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-ink"
            >
              Apply Online
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
