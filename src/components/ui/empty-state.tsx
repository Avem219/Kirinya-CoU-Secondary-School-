export function EmptyState({
  title,
  description,
  icon = "◇",
}: {
  title: string;
  description: string;
  icon?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/20 bg-ink/[0.02] px-6 py-14 text-center">
      <span aria-hidden className="text-2xl text-forest/60">
        {icon}
      </span>
      <p className="mt-4 font-serif text-lg font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">{description}</p>
    </div>
  );
}
