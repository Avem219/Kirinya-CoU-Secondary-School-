import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";

export const metadata: Metadata = {
  title: "Background Information",
  description:
    "The history of Kirinya C.O.U.S.S — founded in 2009 by the Church of Uganda, Namirembe Diocese, and its growth into a government-aided secondary school.",
};

const timeline = [
  {
    year: "2009",
    heading: "The school is founded",
    body: "Kirinya C.O.U.S.S is established by the Church of Uganda, Namirembe Diocese. It opens with 2 students and 8 teachers.",
  },
  {
    year: "2009 (end of year)",
    heading: "Early growth",
    body: "Enrollment grows to 80 students within the first year, despite early infrastructure challenges — limited classroom blocks, no perimeter fence, and no reliable water source.",
  },
  {
    year: "2010",
    heading: "Government-Aided status",
    body: "The school becomes Government-Aided under Uganda's Universal Secondary Education (USE) programme. Mrs. Simunyu Berna serves as the first Headteacher.",
  },
  {
    year: "2015",
    heading: "New leadership, continued growth",
    body: "Rev. Mugwanga Luvumu David becomes Headteacher. At this point the school has grown to approximately 400 students and 38 teachers.",
  },
  {
    year: "Today",
    heading: "Pending verification",
    body: "Current enrollment and staffing figures published on the existing site are inconsistent and have not yet been reconciled with the school. This section will be updated once confirmed.",
    pending: true,
  },
];

export default function BackgroundPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kirinya"
        title="Background Information"
        description="The story of Kirinya C.O.U.S.S, from its founding to today."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Background" },
        ]}
      />

      <ContentSection>
        <SectionHeading eyebrow="Our History" title="A timeline of growth" />
        <ol className="mt-10 space-y-8 border-l border-ink/10 pl-8">
          {timeline.map((item) => (
            <li key={item.year} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full ${
                  item.pending ? "bg-ink/20" : "bg-gold"
                }`}
              />
              <p className="font-serif text-sm font-semibold uppercase tracking-wide text-forest">
                {item.year}
              </p>
              <h3 className="mt-1 font-serif text-lg font-semibold">{item.heading}</h3>
              <p className={`mt-2 max-w-2xl text-ink/70 ${item.pending ? "italic" : ""}`}>
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </ContentSection>
    </>
  );
}
