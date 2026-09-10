import type { Metadata } from "next";
import { StudentLifeSectionPage } from "@/components/student-life-section-page";

export const metadata: Metadata = {
  title: "Prefects & Council",
  description: "The prefectorial body and student council at Kirinya C.O.U.S.S.",
};

export default function PrefectsPage() {
  return (
    <StudentLifeSectionPage
      title="Prefects & Council Body"
      description="The current site references a Prefectorial Body as part of school leadership, but individual prefect names and portfolios have not yet been verified for this rebuild, and require consent before publication."
      crumbLabel="Prefects & Council"
      emptyTitle="Prefectorial body pending verification"
      emptyDescription="Once confirmed and authorized, current prefects and their portfolios will be listed here."
    />
  );
}
