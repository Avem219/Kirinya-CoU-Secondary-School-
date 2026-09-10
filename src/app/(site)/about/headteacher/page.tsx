import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Headteacher's Message",
  description: "A message from the Headteacher of Kirinya C.O.U.S.S.",
};

export default function HeadteacherPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kirinya"
        title="Headteacher's Message"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Headteacher's Message" },
        ]}
      />

      <ContentSection>
        <div className="mx-auto max-w-3xl">
          <EmptyState
            title="Official message pending publication"
            description="The full, current Headteacher's message has not yet been verified for this rebuild. Once the school confirms the text (and, where authorized, a portrait), it will appear here through the CMS — no message, photograph, or signature is fabricated in the meantime."
          />
          <p className="mt-6 text-center text-sm text-ink/60">
            Verified leadership history: Mrs. Simunyu Berna served as the
            school&apos;s first Headteacher from its founding in 2009, and
            Rev. Mugwanga Luvumu David became Headteacher in 2015.
          </p>
        </div>
      </ContentSection>
    </>
  );
}
