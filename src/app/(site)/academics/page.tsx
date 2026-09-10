import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui/page-hero";
import { ContentSection, CTASection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academic life at Kirinya C.O.U.S.S — curriculum, subjects, departments, and academic resources.",
};

// Structured, CMS-ready sections. No subject list, department roster, or
// examination statistic is published here until verified — see
// docs/current-site-audit.md (Academics page content was not fetched from
// the current site and must be audited before publication).
const sections = [
  {
    title: "Curriculum",
    description:
      "Subjects, syllabi, and curriculum information will be managed here through the Academics CMS module.",
  },
  {
    title: "Departments",
    description:
      "Academic departments and heads of department will be listed here once staff records are verified.",
  },
  {
    title: "Examinations",
    description:
      "UNEB examination information and officially approved results will be published here, subject to appropriate consent.",
  },
  {
    title: "Academic Achievements",
    description:
      "Verified academic milestones and achievements will be featured here as they are confirmed.",
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Academic Life at Kirinya"
        description="Kirinya C.O.U.S.S pairs a Uganda National Curriculum education with strong discipline, leadership development, and practical skills."
        crumbs={[{ label: "Home", href: "/" }, { label: "Academics" }]}
      />

      <ContentSection>
        <SectionHeading
          eyebrow="Structure"
          title="Curriculum, departments and results"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-xl border border-ink/10 p-6">
              <h3 className="font-serif text-lg font-semibold">{section.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{section.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection tone="muted">
        <SectionHeading eyebrow="Downloadable Resources" title="Academic resources" />
        <div className="mt-8">
          <EmptyState
            title="No academic resources published yet"
            description="Subject notes, past papers, and other academic materials will be searchable in the E-Library once added with the correct usage rights."
          />
        </div>
      </ContentSection>

      <CTASection
        title="Have a question about academics?"
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Visit the E-Library", href: "/e-library" }}
      />
    </>
  );
}
