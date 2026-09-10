import Breadcrumbs, { type Crumb } from "./breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="border-b border-ink/10 bg-ink text-parchment">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {crumbs && <Breadcrumbs items={crumbs} variant="dark" />}
        {eyebrow && (
          <p className="mt-4 font-serif text-sm uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-parchment/80 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="font-serif text-xs uppercase tracking-[0.2em] text-forest">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-ink/70">{description}</p>}
    </div>
  );
}
