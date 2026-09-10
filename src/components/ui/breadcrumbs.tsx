import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({
  items,
  variant = "light",
}: {
  items: Crumb[];
  variant?: "light" | "dark";
}) {
  const mutedClass = variant === "dark" ? "text-parchment/60" : "text-ink/50";
  const linkClass =
    variant === "dark"
      ? "text-parchment/80 hover:text-parchment"
      : "text-ink/70 hover:text-ink";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={mutedClass}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden className={mutedClass}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
