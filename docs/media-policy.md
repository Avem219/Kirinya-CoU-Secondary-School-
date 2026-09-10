# Media Policy

## Source of images and files

The current live site (kirinyacouss.sc.ug) contains real school
photography. This project does **not** scrape or republish those files:
they were only ever referenced by filename during the content audit (see
`docs/current-site-audit.md`), never downloaded or copied into this
repository. Every gallery/hero image slot in the public site currently
renders a placeholder (a plain background block) specifically so that no
unauthorized image ever appears to be "real" content.

Real photography for this rebuild must come **directly from the school**,
with explicit confirmation that the school holds the rights to use and
publish it (or the photographer's/subject's consent, where applicable).

## Required metadata per asset

The `MediaAsset` Prisma model (`prisma/schema.prisma`) captures this at the
data layer:

- `source` — e.g. "School-provided", "Photographer: Jane Doe"
- `licenseNote` — the rights/permission status; required before an asset
  can be considered eligible for public display
- `altText`, `caption` — accessibility and attribution

No admin UI should allow publishing a `MediaAsset` to the public site
without `licenseNote` being set.

## Consent for people in photos/results

Photos or names of current students (including prefects, sports team
members, and UACE results) require appropriate consent before publication,
per standard school data-protection practice. This project does not invent
or publish any such content without that verification — see the
"pending verification" states on `/student-life/prefects`,
`/about/team`, and the homepage's UACE-results callout in
`docs/current-site-audit.md`.

## Storage backend status

**No object storage is currently configured.** The upload validation
endpoint (`src/app/api/admin/media/upload/route.ts`) performs real
server-side validation (MIME allowlist, size limits, magic-byte signature
checking, filename sanitization — see `docs/security.md`) but explicitly
does not persist files, because:

1. There is no S3-compatible bucket or credentials configured in this
   environment.
2. Writing arbitrary uploads to the application container's local disk
   would not survive a restart and would misrepresent itself as durable
   storage.

Before `/admin/media` can be used for real, configure an object storage
provider and the corresponding `STORAGE_*` variables in `.env.example`,
then implement the actual write step in the upload route (validation stays
as-is).
