import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Kirinya C.O.U.S.S website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <ContentSection>
        <div className="mx-auto max-w-3xl">
          <p className="text-ink/70">
            This page will describe how Kirinya C.O.U.S.S collects, uses, and
            protects personal information submitted through this website
            (for example, via the contact form). The current site does not
            publish a privacy policy, so no specific policy text is invented
            here.
          </p>
          <div className="mt-8">
            <EmptyState
              title="Policy text pending"
              description="A school-approved privacy policy — covering data collected via forms, cookies/analytics if used, and how to request data deletion — will be published here once drafted and confirmed by the school."
            />
          </div>
        </div>
      </ContentSection>
    </>
  );
}
