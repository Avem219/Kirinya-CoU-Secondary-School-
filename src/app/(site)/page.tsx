import Link from "next/link";
import { ContentSection, CTASection } from "@/components/ui/content-section";
import { SectionHeading } from "@/components/ui/page-hero";
import { EmptyState } from "@/components/ui/empty-state";
import { NewsCard } from "@/components/cards/news-card";
import { GalleryCard } from "@/components/cards/gallery-card";
import { getFeaturedNews, getGalleryAlbums, getUpcomingEvents } from "@/lib/dev-data";
import { siteConfig } from "@/lib/site-config";

// All copy below is sourced from the verified audit
// (docs/current-site-audit.md) of https://kirinyacouss.sc.ug. Nothing here
// is invented: unverified items (enrollment counts, the Headteacher's exact
// words, news stories, gallery photos) are rendered as explicit pending/empty
// states rather than plausible-sounding placeholders, per project policy.
// List sections (news/events/gallery) call the same async functions a
// Prisma-backed repository will implement later — see src/lib/dev-data.ts.

const whyKirinya = [
  "Christian Values",
  "Quality Education",
  "Experienced Teachers",
  "Modern Learning Environment",
  "Holistic Student Development",
];

export default async function HomePage() {
  const [news, events, albums] = await Promise.all([
    getFeaturedNews(),
    getUpcomingEvents(),
    getGalleryAlbums(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-ink text-parchment">
        {/*
          Hero imagery is CMS-managed. The current site uses real school
          photography which must be re-supplied/authorized by the school for
          this rebuild rather than hot-linked from the old site — see
          docs/media-policy.md.
        */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-40 sm:px-6 lg:px-8">
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-gold">
            Bweyogerere-Kirinya · Est. 2009
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            Kirinya Church of Uganda Secondary School
          </h1>
          <p className="mt-4 max-w-xl text-lg text-parchment/85">{siteConfig.motto}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full bg-parchment px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-95"
            >
              Discover Kirinya
            </Link>
            <Link
              href="/admissions"
              className="rounded-full border border-parchment/40 px-6 py-3 text-sm font-semibold text-parchment transition hover:bg-parchment/10"
            >
              Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* SCHOOL IDENTITY / INTRO */}
      <ContentSection className="text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold">
            A government-aided school rooted in Christian values
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            Kirinya C.O.U.S.S was established in 2009 by the Church of Uganda,
            Namirembe Diocese, and became a government-aided school under
            Uganda&rsquo;s Universal Secondary Education programme in 2010.
            Guided by the motto &ldquo;{siteConfig.motto},&rdquo; the school
            welcomes students from all faiths, tribes, and nationalities,
            pairing academic excellence with discipline and character.
          </p>
        </div>
      </ContentSection>

      {/* WHY KIRINYA */}
      <ContentSection tone="muted">
        <SectionHeading eyebrow="Why Choose Us" title="Why Kirinya" />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whyKirinya.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-ink/10 bg-parchment p-6 text-sm font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </ContentSection>

      {/* HEADTEACHER */}
      <ContentSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div
            aria-hidden
            className="aspect-square rounded-2xl bg-ink/10"
            /* Headteacher portrait — CMS field, pending school-provided asset */
          />
          <div>
            <SectionHeading
              eyebrow="Leadership"
              title="A Message from the Headteacher"
            />
            <p className="mt-4 text-ink/70">
              The Headteacher&rsquo;s full, current message is pending
              verification for this rebuild and will be published here once
              confirmed — see our verified leadership history in the
              meantime.
            </p>
            <Link
              href="/about/headteacher"
              className="mt-6 inline-block font-semibold text-forest underline underline-offset-4"
            >
              Visit the Headteacher&rsquo;s Message page →
            </Link>
          </div>
        </div>
      </ContentSection>

      {/* SCHOOL AT A GLANCE — placeholder pending reconciled figures */}
      <section className="border-y border-ink/10 bg-ink py-16 text-parchment">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold">
            Kirinya C.O.U.S.S at a Glance
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-parchment/70">
            Enrollment and staffing figures on the current site are
            inconsistent (animated counters show &ldquo;0+&rdquo; while prose
            elsewhere cites 1,269 students and 53 teachers). This block reads
            from a CMS field so the school can confirm and publish one
            authoritative set of numbers rather than have this rebuild guess
            at them.
          </p>
          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {["Students", "Professional Teachers", "Years of Existence"].map(
              (label) => (
                <div key={label}>
                  <dt className="text-sm uppercase tracking-wide text-parchment/60">
                    {label}
                  </dt>
                  <dd className="mt-2 font-serif text-4xl font-semibold text-gold">
                    —
                  </dd>
                </div>
              )
            )}
          </dl>
        </div>
      </section>

      {/* NEWS PREVIEW */}
      <ContentSection>
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl font-semibold">Latest News</h2>
          <Link href="/news" className="text-sm font-semibold text-forest">
            View all news →
          </Link>
        </div>
        <div className="mt-10">
          {news.length === 0 ? (
            <EmptyState
              title="No published news yet"
              description="Verified news articles from the school will appear here once added through the CMS."
            />
          ) : (
            <ul className="grid gap-8 sm:grid-cols-3">
              {news.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </ul>
          )}
        </div>
      </ContentSection>

      {/* EVENTS PREVIEW */}
      <ContentSection tone="muted">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl font-semibold">Upcoming Events</h2>
          <Link href="/events" className="text-sm font-semibold text-forest">
            View all events →
          </Link>
        </div>
        <div className="mt-10">
          {events.length === 0 ? (
            <EmptyState
              title="No upcoming events published"
              description="Confirmed school events — dates, times, and locations — will be listed here as they're added through the CMS."
            />
          ) : (
            <ul className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <li key={event.slug}>{event.title}</li>
              ))}
            </ul>
          )}
        </div>
      </ContentSection>

      {/* GALLERY PREVIEW */}
      <ContentSection>
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-3xl font-semibold">Our Gallery</h2>
          <Link href="/gallery" className="text-sm font-semibold text-forest">
            View gallery →
          </Link>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-ink/60">
          Gallery images are pending re-authorization directly from the
          school — see docs/media-policy.md.
        </p>
        <div className="mt-10">
          {albums.length === 0 ? (
            <EmptyState
              title="Gallery pending authorized photography"
              description="Real school photography, once rights-cleared and supplied by the school, will appear here as albums with captions and credits."
            />
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {albums.map((album) => (
                <GalleryCard key={album.slug} album={album} />
              ))}
            </ul>
          )}
        </div>
      </ContentSection>

      <CTASection
        title="Join Kirinya C.O.U.S.S"
        description="Applications are currently handled through the school's online form. This destination is configured centrally, so it can move to an in-house application flow later without a code change."
        primary={{ label: siteConfig.applyOnlineUrl.label, href: siteConfig.applyOnlineUrl.value, external: true }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
