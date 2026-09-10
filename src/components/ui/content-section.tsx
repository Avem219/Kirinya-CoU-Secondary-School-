import Link from "next/link";
import type { ReactNode } from "react";

export function ContentSection({
  children,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted";
}) {
  return (
    <section
      className={`${
        tone === "muted" ? "bg-forest/5" : ""
      } py-16 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function CTASection({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-t border-ink/10 bg-ink py-16 text-center text-parchment sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{title}</h2>
        {description && <p className="mt-4 text-parchment/75">{description}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={primary.href}
            target={primary.external ? "_blank" : undefined}
            rel={primary.external ? "noopener noreferrer" : undefined}
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-ink transition hover:brightness-95"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="rounded-full border border-parchment/40 px-7 py-3 text-sm font-semibold text-parchment transition hover:bg-parchment/10"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
