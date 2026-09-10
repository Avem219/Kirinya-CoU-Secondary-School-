import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";
import type { Crumb } from "@/components/ui/breadcrumbs";

export function StudentLifeSectionPage({
  title,
  description,
  crumbLabel,
  emptyTitle,
  emptyDescription,
}: {
  title: string;
  description: string;
  crumbLabel: string;
  emptyTitle: string;
  emptyDescription: string;
}) {
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Student Life", href: "/student-life" },
    { label: crumbLabel },
  ];

  return (
    <>
      <PageHero eyebrow="Student Life" title={title} description={description} crumbs={crumbs} />
      <ContentSection>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </ContentSection>
    </>
  );
}
