import type { EventSummary } from "@/lib/content-types";

export function EventCard({ event }: { event: EventSummary }) {
  const start = new Date(event.startTime);
  const day = start.toLocaleDateString("en-UG", { day: "2-digit" });
  const month = start.toLocaleDateString("en-UG", { month: "short" });
  const time = start.toLocaleTimeString("en-UG", { hour: "numeric", minute: "2-digit" });

  return (
    <li className="flex gap-5 rounded-xl border border-ink/10 p-6">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-ink text-parchment">
        <span className="text-lg font-bold leading-none">{day}</span>
        <span className="text-xs uppercase tracking-wide">{month}</span>
      </div>
      <div>
        <h3 className="font-serif text-lg font-semibold">{event.title}</h3>
        <p className="mt-1 text-sm text-ink/60">
          {time}
          {event.location ? ` · ${event.location}` : ""}
        </p>
        {event.description && (
          <p className="mt-2 text-sm text-ink/70">{event.description}</p>
        )}
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            className="mt-3 inline-block text-sm font-semibold text-forest underline underline-offset-4"
          >
            Register →
          </a>
        )}
      </div>
    </li>
  );
}
