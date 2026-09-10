import type { Metadata } from "next";
import { StudentLifeSectionPage } from "@/components/student-life-section-page";

export const metadata: Metadata = {
  title: "School Uniform",
  description: "Official school uniform guidance for Kirinya C.O.U.S.S.",
};

export default function UniformPage() {
  return (
    <StudentLifeSectionPage
      title="School Uniform"
      description="The current site references official uniform guidance, but the specific requirements have not yet been verified for this rebuild."
      crumbLabel="School Uniform"
      emptyTitle="Uniform guidance pending verification"
      emptyDescription="Once confirmed with the school, uniform requirements — including where to purchase items — will be published here."
    />
  );
}
