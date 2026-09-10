import type { Metadata } from "next";
import { StudentLifeSectionPage } from "@/components/student-life-section-page";

export const metadata: Metadata = {
  title: "Clubs & Societies",
  description: "Co-curricular clubs and societies at Kirinya C.O.U.S.S.",
};

export default function ClubsPage() {
  return (
    <StudentLifeSectionPage
      title="Clubs & Societies"
      description="The current site references a Clubs and Societies programme, but the specific list of active clubs has not yet been verified for this rebuild."
      crumbLabel="Clubs & Societies"
      emptyTitle="Club listing pending verification"
      emptyDescription="Once the school confirms its current clubs and societies, each will appear here with a description, patron, and how students can join — managed through the CMS."
    />
  );
}
