import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSection } from "@/components/ui/content-section";
import { getEventBySlug } from "@/lib/dev-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return { title: event.title, description: event.description ?? undefined };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const start = new Date(event.startTime);

  return (
    <>
      <PageHero
        eyebrow="Event"
        title={event.title}
        description={start.toLocaleString("en-UG", { dateStyle: "full", timeStyle: "short" })}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />
      <ContentSection>
        <div className="mx-auto max-w-3xl space-y-4">
          {event.location && <p className="text-ink/70">Location: {event.location}</p>}
          {event.description && <p className="text-ink/80">{event.description}</p>}
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              className="inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink"
            >
              Register →
            </a>
          )}
        </div>
      </ContentSection>
    </>
  );
}
