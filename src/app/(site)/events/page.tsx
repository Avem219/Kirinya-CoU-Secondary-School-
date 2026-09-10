import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { EmptyState } from "@/components/ui/empty-state";
import { EventCard } from "@/components/cards/event-card";
import { getUpcomingEvents } from "@/lib/dev-data";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and important dates at Kirinya C.O.U.S.S.",
};

export default async function EventsPage() {
  // In production: split into upcoming (startTime >= now) and past
  // (startTime < now) queries against Event, ordered by startTime.
  const events = await getUpcomingEvents();

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="School Events"
        description="Confirmed events and important dates from Kirinya C.O.U.S.S."
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <ContentSection>
        <SectionHeading eyebrow="Upcoming" title="Upcoming events" />
        <div className="mt-8">
          {events.length === 0 ? (
            <EmptyState
              title="No upcoming events published"
              description="Confirmed school events will be listed here as they're added through the CMS. No event dates are invented in the meantime."
            />
          ) : (
            <ul className="space-y-4">
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </ul>
          )}
        </div>
      </ContentSection>

      <ContentSection tone="muted">
        <SectionHeading eyebrow="Archive" title="Past events" />
        <div className="mt-8">
          <EmptyState
            title="Past events archive coming soon"
            description="A record of past school events will be available here once the CMS has published history."
          />
        </div>
      </ContentSection>
    </>
  );
}
