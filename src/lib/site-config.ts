// Central, single-source site configuration.
//
// In production this record is replaced by a `SiteSetting` read from Prisma
// (see prisma/schema.prisma — model SiteSetting). Every page in this app
// should import values from here rather than hard-coding contact details,
// the admissions link, or social handles — so that once the CMS/database is
// connected, only this file's data source changes, not every page that
// consumes it.
//
// `verified: false` fields are rendered behind a "pending verification" UI
// state anywhere they're used — see components/ui/empty-state.tsx.

export type SiteConfig = {
  schoolName: string;
  abbreviation: string;
  motto: string;
  location: { label: string; verified: boolean };
  phonePrimary: { value: string; verified: boolean };
  email: { value: string | null; verified: boolean };
  applyOnlineUrl: { value: string; verified: boolean; label: string };
  social: {
    facebook: { value: string | null; verified: boolean };
    twitter: { value: string | null; verified: boolean };
    youtube: { value: string | null; verified: boolean };
  };
  mapEmbedUrl: { value: string | null; verified: boolean };
};

export const siteConfig: SiteConfig = {
  schoolName: "Kirinya Church of Uganda Secondary School",
  abbreviation: "Kirinya C.O.U.S.S",
  motto: "Light for Life",
  location: { label: "Bweyogerere-Kirinya, Uganda", verified: true },
  // Published on the current site's Contact Us / footer content.
  phonePrimary: { value: "+256 702 916 915", verified: true },
  // The current site's email is rendered via a Cloudflare obfuscation script
  // that could not be resolved from a static fetch. Do not invent one.
  email: { value: null, verified: false },
  // Published external Google Form the current site links to for applications.
  applyOnlineUrl: {
    value: "https://forms.gle/unf98aNHKCN5NXP19",
    verified: true,
    label: "Apply Online",
  },
  social: {
    facebook: { value: null, verified: false },
    twitter: { value: null, verified: false },
    youtube: { value: null, verified: false },
  },
  mapEmbedUrl: { value: null, verified: false },
};
