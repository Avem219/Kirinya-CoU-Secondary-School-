import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";

export const metadata: Metadata = {
  title: "Student Life",
  description:
    "Life beyond the classroom at Kirinya C.O.U.S.S — clubs and societies, school uniform, sports houses, and the prefects' body.",
};

const sections = [
  {
    title: "Clubs & Societies",
    href: "/student-life/clubs",
    description: "Co-curricular clubs that develop leadership, creativity and skill.",
  },
  {
    title: "School Uniform",
    href: "/student-life/uniform",
    description: "Guidance on the official Kirinya C.O.U.S.S school uniform.",
  },
  {
    title: "Sports Houses",
    href: "/student-life/sports-houses",
    description: "The house system that channels school spirit and healthy competition.",
  },
  {
    title: "Prefects & Council",
    href: "/student-life/prefects",
    description: "The student leadership body representing the school community.",
  },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        eyebrow="Student Life"
        title="Life Beyond the Classroom"
        description="Kirinya C.O.U.S.S emphasises leadership, sports, Music, Dance and Drama, and practical skills alongside academics."
        crumbs={[{ label: "Home", href: "/" }, { label: "Student Life" }]}
      />

      <ContentSection>
        <SectionHeading eyebrow="Explore" title="Student life at Kirinya" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-xl border border-ink/10 p-6 transition hover:border-forest/40"
            >
              <h3 className="font-serif text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{s.description}</p>
            </Link>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
