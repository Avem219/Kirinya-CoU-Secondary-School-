import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Kirinya C.O.U.S.S website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />
      <ContentSection>
        <div className="mx-auto max-w-3xl">
          <p className="text-ink/70">
            This page will set out the terms for using the Kirinya C.O.U.S.S
            website — including acceptable use, intellectual property for
            published content and media, and disclaimers. The current site
            does not publish terms of use, so no specific terms text is
            invented here.
          </p>
          <div className="mt-8">
            <EmptyState
              title="Terms pending"
              description="School-approved terms of use will be published here once drafted and confirmed."
            />
          </div>
        </div>
      </ContentSection>
    </>
  );
}
