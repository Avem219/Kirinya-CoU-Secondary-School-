import type { StaffMemberSummary } from "@/lib/content-types";

export function StaffCard({ staff }: { staff: StaffMemberSummary }) {
  return (
    <li className="rounded-xl border border-ink/10 p-6 text-center">
      <div
        aria-hidden
        className="mx-auto aspect-square w-24 rounded-full bg-ink/10 bg-cover bg-center"
        style={staff.photoUrl ? { backgroundImage: `url(${staff.photoUrl})` } : undefined}
      />
      <h3 className="mt-4 font-serif font-semibold">{staff.name}</h3>
      <p className="text-sm text-forest">{staff.position}</p>
      {staff.biography && (
        <p className="mt-2 text-sm text-ink/60">{staff.biography}</p>
      )}
    </li>
  );
}
