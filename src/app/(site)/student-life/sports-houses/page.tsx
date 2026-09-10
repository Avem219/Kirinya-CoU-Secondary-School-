import type { Metadata } from "next";
import { StudentLifeSectionPage } from "@/components/student-life-section-page";

export const metadata: Metadata = {
  title: "Sports Houses",
  description: "The sports house system at Kirinya C.O.U.S.S.",
};

export default function SportsHousesPage() {
  return (
    <StudentLifeSectionPage
      title="Sports Houses"
      description="The current site references a house system for sports and competitions, but house names and structure have not yet been verified for this rebuild."
      crumbLabel="Sports Houses"
      emptyTitle="House listing pending verification"
      emptyDescription="Once confirmed, each sports house — its name, colours, and achievements — will be presented here."
    />
  );
}
