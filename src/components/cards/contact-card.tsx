export function ContactCard({
  label,
  value,
  href,
  pending,
}: {
  label: string;
  value: string;
  href?: string;
  pending?: boolean;
}) {
  return (
    <div className="rounded-xl border border-ink/10 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</p>
      {pending ? (
        <p className="mt-2 text-sm italic text-ink/40">{value}</p>
      ) : href ? (
        <a href={href} className="mt-2 block font-serif text-lg font-semibold text-ink hover:text-forest">
          {value}
        </a>
      ) : (
        <p className="mt-2 font-serif text-lg font-semibold">{value}</p>
      )}
    </div>
  );
}
