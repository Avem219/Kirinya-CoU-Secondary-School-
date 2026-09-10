import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui/page-hero";
import { ContentSection, CTASection } from "@/components/ui/content-section";
import { ContactCard } from "@/components/cards/contact-card";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kirinya C.O.U.S.S in Bweyogerere-Kirinya.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="We'd love to hear from you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <ContentSection>
        <div className="grid gap-4 sm:grid-cols-3">
          <ContactCard label="Location" value={siteConfig.location.label} />
          <ContactCard
            label="Phone"
            value={siteConfig.phonePrimary.value}
            href={`tel:${siteConfig.phonePrimary.value.replace(/\s+/g, "")}`}
          />
          <ContactCard
            label="Email"
            value="Pending verification"
            pending
          />
        </div>
      </ContentSection>

      <ContentSection tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Send a Message" title="Contact form" />
            <p className="mt-3 text-sm text-ink/60">
              This form is not yet connected to a database in this
              environment, so submissions cannot be stored until that
              integration is complete — please call the school directly in
              the meantime.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Find Us" title="Location" />
            <div
              aria-hidden
              className="mt-4 flex aspect-video items-center justify-center rounded-xl border border-dashed border-ink/20 bg-ink/[0.02] text-sm text-ink/40"
            >
              Map embed pending — location confirmed as Bweyogerere-Kirinya
            </div>
          </div>
        </div>
      </ContentSection>

      <CTASection
        title="Ready to apply?"
        primary={{ label: "Admissions", href: "/admissions" }}
      />
    </>
  );
}
