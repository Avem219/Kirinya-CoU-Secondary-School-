import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";
import { StaffCard } from "@/components/cards/staff-card";
import { getStaffDirectory } from "@/lib/dev-data";

export const metadata: Metadata = {
  title: "Our Team",
  description: "The leadership and teaching staff of Kirinya C.O.U.S.S.",
};

export default async function TeamPage() {
  const staff = await getStaffDirectory();

  return (
    <>
      <PageHero
        eyebrow="About Kirinya"
        title="Our Team"
        description="The people who lead and teach at Kirinya C.O.U.S.S."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Our Team" },
        ]}
      />

      <ContentSection>
        <SectionHeading eyebrow="Staff Directory" title="Meet the team" />
        <div className="mt-10">
          {staff.length === 0 ? (
            <EmptyState
              title="Staff directory coming soon"
              description="The official staff directory — names, positions, departments, and (where authorized) photos — will appear here once verified records are added through the admin CMS. No staff members are listed until confirmed by the school."
            />
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {staff.map((member) => (
                <StaffCard key={member.id} staff={member} />
              ))}
            </ul>
          )}
        </div>
      </ContentSection>
    </>
  );
}
