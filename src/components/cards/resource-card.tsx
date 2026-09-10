import type { ResourceSummary } from "@/lib/content-types";

const typeLabels: Record<ResourceSummary["resourceType"], string> = {
  DOCUMENT: "Document",
  PAST_PAPER: "Past Paper",
  NOTES: "Notes",
  EXTERNAL_LINK: "External Link",
  VIDEO: "Video",
  OTHER: "Resource",
};

export function ResourceCard({ resource }: { resource: ResourceSummary }) {
  const href = resource.fileUrl ?? resource.externalUrl ?? "#";

  return (
    <li className="flex items-start justify-between gap-4 rounded-xl border border-ink/10 p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          {typeLabels[resource.resourceType]}
          {resource.subject ? ` · ${resource.subject}` : ""}
          {resource.level ? ` · ${resource.level}` : ""}
        </p>
        <h3 className="mt-1 font-serif font-semibold">{resource.title}</h3>
        {resource.description && (
          <p className="mt-1 text-sm text-ink/60">{resource.description}</p>
        )}
      </div>
      <a
        href={href}
        className="shrink-0 rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
      >
        {resource.resourceType === "EXTERNAL_LINK" ? "Visit" : "View"}
      </a>
    </li>
  );
}
