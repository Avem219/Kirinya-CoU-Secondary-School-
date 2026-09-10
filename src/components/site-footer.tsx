import Link from "next/link";
import { primaryNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-ink text-parchment">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-serif text-lg font-semibold">Kirinya C.O.U.S.S</p>
          <p className="mt-1 text-sm text-parchment/70">Light for Life</p>
          <p className="mt-4 max-w-xs text-sm text-parchment/70">
            A government-aided Church of Uganda secondary school in
            Bweyogerere-Kirinya, founded in 2009 by the Church of Uganda,
            Namirembe Diocese.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-parchment/60">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryNav.slice(0, 6).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-parchment/80 hover:text-parchment">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-parchment/60">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-parchment/80">
            <li>{siteConfig.location.label}</li>
            <li>
              <a
                href={`tel:${siteConfig.phonePrimary.value.replace(/\s+/g, "")}`}
                className="hover:text-parchment"
              >
                {siteConfig.phonePrimary.value}
              </a>
            </li>
            <li className="text-parchment/50">
              Email — pending verification (site email is obfuscated on the
              current site; confirm directly with the school office)
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-parchment/60">
            Follow Us
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-parchment/80">
            <li className="text-parchment/50">
              Facebook / X / YouTube — handles shown as icons on the current
              site but not yet resolved to URLs; confirm before linking.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-parchment/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-parchment/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} Kirinya C.O.U.S.S. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-parchment">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-parchment">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
