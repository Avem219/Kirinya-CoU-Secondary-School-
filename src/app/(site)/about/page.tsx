import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui/page-hero";
import { ContentSection, CTASection } from "@/components/ui/content-section";

export const metadata: Metadata = {
  title: "About Kirinya C.O.U.S.S",
  description:
    "Kirinya Church of Uganda Secondary School — founded 2009 by the Church of Uganda, Namirembe Diocese. Our identity, vision, mission and core values.",
};

const values = [
  "Team work",
  "Selfless service and Humility",
  "Godliness and upholding Biblical family values",
  "Integrity and Respect for all",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kirinya"
        title="Light for Life"
        description="A government-aided Church of Uganda secondary school in Bweyogerere-Kirinya, founded in 2009 by the Church of Uganda, Namirembe Diocese."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <ContentSection>
        <SectionHeading eyebrow="Our Identity" title="Rooted in faith, open to all" />
        <p className="mt-6 max-w-3xl leading-relaxed text-ink/80">
          Kirinya C.O.U.S.S welcomes students of different faiths, tribes, and
          nationalities, while grounding school life in Christian values,
          discipline, and character. Alongside academics, the school
          emphasises leadership, sports, Music, Dance and Drama, and
          practical skills subjects.
        </p>
      </ContentSection>

      <ContentSection tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Vision" title="Where we're headed" />
            <p className="mt-4 font-serif text-xl leading-relaxed text-ink">
              &ldquo;To bring up academically excellent young people with
              Christian values.&rdquo;
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Mission" title="Why we exist" />
            <p className="mt-4 font-serif text-xl leading-relaxed text-ink">
              &ldquo;To continue producing Holistic Professionals with
              Christian values in the country.&rdquo;
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Core Values" title="What guides us every day" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <li
              key={value}
              className="rounded-xl border border-ink/10 p-5 font-medium text-ink/80"
            >
              {value}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection tone="muted">
        <SectionHeading eyebrow="Explore Further" title="More about Kirinya" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Link
            href="/about/background"
            className="rounded-xl border border-ink/10 p-6 transition hover:border-forest/40"
          >
            <h3 className="font-serif text-lg font-semibold">Our History</h3>
            <p className="mt-2 text-sm text-ink/60">
              From two students in 2009 to a growing government-aided school.
            </p>
          </Link>
          <Link
            href="/about/headteacher"
            className="rounded-xl border border-ink/10 p-6 transition hover:border-forest/40"
          >
            <h3 className="font-serif text-lg font-semibold">
              Headteacher&rsquo;s Message
            </h3>
            <p className="mt-2 text-sm text-ink/60">
              A word from school leadership.
            </p>
          </Link>
          <Link
            href="/about/team"
            className="rounded-xl border border-ink/10 p-6 transition hover:border-forest/40"
          >
            <h3 className="font-serif text-lg font-semibold">Our Team</h3>
            <p className="mt-2 text-sm text-ink/60">
              The people who lead and teach at Kirinya.
            </p>
          </Link>
        </div>
      </ContentSection>

      <CTASection
        title="Ready to learn more?"
        description="Get in touch or begin the admissions process."
        primary={{ label: "Admissions", href: "/admissions" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
