import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui/page-hero";
import { ContentSection, CTASection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "How to apply to Kirinya Church of Uganda Secondary School. Applications are currently processed through the school's online application form.",
};

const steps = [
  {
    title: "Submit an application",
    description:
      "Start by submitting the school's online application form using the Apply Online link below.",
  },
  {
    title: "Await confirmation",
    description:
      "The school will review submitted applications. Detailed timelines are pending confirmation.",
  },
  {
    title: "Complete enrollment",
    description:
      "Once accepted, admitted students complete the school's enrollment process. Specific requirements are pending confirmation.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Join Kirinya C.O.U.S.S"
        description="Applications to Kirinya C.O.U.S.S are currently processed through the school's online application form."
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />

      <ContentSection>
        <SectionHeading eyebrow="How to Apply" title="The application process" />
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-ink/10 p-6">
              <span className="font-serif text-2xl font-semibold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <a
            href={siteConfig.applyOnlineUrl.value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-gold px-8 py-3 text-sm font-semibold text-ink transition hover:brightness-95"
          >
            {siteConfig.applyOnlineUrl.label} →
          </a>
          <p className="mt-3 text-xs text-ink/50">
            Opens the school&rsquo;s external application form. This link is
            centrally configured (Site Settings) so it can be swapped for an
            in-house application flow without changing this page.
          </p>
        </div>
      </ContentSection>

      <ContentSection tone="muted">
        <SectionHeading eyebrow="Requirements" title="What you'll need" />
        <div className="mt-8">
          <EmptyState
            title="Admissions requirements pending verification"
            description="Specific entry requirements, required documents, and fee information have not yet been confirmed for this rebuild and are not invented here. They will be published once verified by the school."
          />
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeading eyebrow="Important Dates" title="Key admissions dates" />
        <div className="mt-8">
          <EmptyState
            title="No dates published yet"
            description="Term dates and application deadlines will appear here once confirmed through the CMS."
          />
        </div>
      </ContentSection>

      <ContentSection tone="muted">
        <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
        <div className="mt-8">
          <EmptyState
            title="FAQs coming soon"
            description="Common admissions questions and answers will be added here as they are confirmed with the school office."
          />
        </div>
      </ContentSection>

      <CTASection
        title="Have a question before you apply?"
        description="Reach out and the school office will be glad to help."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
