// Static fallback navigation, mirroring the verified information architecture
// of the current site. In production this is sourced from the NavigationItem
// table via /admin/pages so editors can add/reorder items without a deploy.

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Background Information", href: "/about/background" },
      { label: "Headteacher's Message", href: "/about/headteacher" },
      { label: "Our Team", href: "/about/team" },
    ],
  },
  { label: "Academics", href: "/academics" },
  {
    label: "Student Life",
    href: "/student-life",
    children: [
      { label: "Clubs & Societies", href: "/student-life/clubs" },
      { label: "School Uniform", href: "/student-life/uniform" },
      { label: "Sports Houses", href: "/student-life/sports-houses" },
      { label: "Prefects & Council", href: "/student-life/prefects" },
    ],
  },
  { label: "E-Library", href: "/e-library" },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
