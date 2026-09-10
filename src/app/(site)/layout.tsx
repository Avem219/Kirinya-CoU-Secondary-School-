import type { Metadata } from "next";
import "../globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL("https://kirinyacouss.sc.ug"),
  title: {
    default: "Kirinya C.O.U.S.S — Light for Life",
    template: "%s | Kirinya C.O.U.S.S",
  },
  description:
    "Kirinya Church of Uganda Secondary School (Kirinya C.O.U.S.S), Bweyogerere-Kirinya — a government-aided institution founded in 2009 by the Church of Uganda, Namirembe Diocese, guided by the motto \"Light for Life.\"",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Kirinya C.O.U.S.S — Light for Life",
    description:
      "A government-aided Church of Uganda secondary school in Bweyogerere-Kirinya, committed to academic excellence, discipline, and Christian values.",
    url: "https://kirinyacouss.sc.ug",
    siteName: "Kirinya C.O.U.S.S",
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirinya C.O.U.S.S — Light for Life",
    description:
      "A government-aided Church of Uganda secondary school in Bweyogerere-Kirinya.",
  },
};

// Organization structured data — every field here is either a verified fact
// (docs/current-site-audit.md) or intentionally omitted. In particular:
// `sameAs` (social profile URLs) is left out entirely rather than guessed,
// since the current site's social icons were never resolved to real handle
// URLs — see siteConfig.social.*.verified === false.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.schoolName,
  alternateName: siteConfig.abbreviation,
  slogan: siteConfig.motto,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.label,
    addressCountry: "UG",
  },
  telephone: siteConfig.phonePrimary.value,
  url: "https://kirinyacouss.sc.ug",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-parchment text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
