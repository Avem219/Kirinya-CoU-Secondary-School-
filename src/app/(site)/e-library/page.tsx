import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";
import { ResourceCard } from "@/components/cards/resource-card";
import { getPublishedResources } from "@/lib/dev-data";

export const metadata: Metadata = {
  title: "E-Library",
  description: "Digital learning resources from Kirinya C.O.U.S.S.",
};

export default async function ELibraryPage() {
  // Production: paginated + filterable query against Resource
  // (isPublished = true), with subject/type/category filters and search.
  const resources = await getPublishedResources();

  return (
    <>
      <PageHero
        eyebrow="Digital Resources"
        title="E-Library"
        description="Search and browse learning resources shared by Kirinya C.O.U.S.S."
        crumbs={[{ label: "Home", href: "/" }, { label: "E-Library" }]}
      />

      <ContentSection>
        {/* Search/filter bar — wired up once a real, indexed resource set exists */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="resource-search">
            Search resources
          </label>
          <input
            id="resource-search"
            type="search"
            disabled
            placeholder="Search resources (available once the library has content)"
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:bg-ink/5"
          />
        </div>

        {resources.length === 0 ? (
          <EmptyState
            title="The E-Library is being set up"
            description="No downloadable resources are published yet. The school will add subject notes, past papers, and other materials here — each with title, subject, level, and appropriate usage rights — through the admin CMS. No copyrighted material is uploaded without authorization."
          />
        ) : (
          <ul className="space-y-4">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </ul>
        )}
      </ContentSection>
    </>
  );
}
