import { NextResponse, type NextRequest } from "next/server";
import { requireActionPermission, AuthenticationError, AuthorizationError } from "@/lib/auth/guards";
import { validateUpload } from "@/lib/media/validate-upload";
import { auditRepository } from "@/lib/repositories";

// This route performs REAL server-side validation on uploaded files
// (permission check, size limit, MIME allowlist, magic-byte signature
// verification, filename sanitization). It deliberately does NOT write the
// file anywhere: no object storage (S3/R2/etc.) or database is configured
// in this environment, and writing arbitrary uploads to the container's
// local disk would (a) not survive a restart, and (b) misrepresent this as
// durable storage. See docs/media-policy.md for the intended production
// storage adapter.
export async function POST(request: NextRequest) {
  let user;
  try {
    user = await requireActionPermission("media.upload");
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    if (error instanceof AuthorizationError) {
      return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    }
    throw error;
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const headerBytes = new Uint8Array(arrayBuffer.slice(0, 16));

  const result = validateUpload({
    filename: file.name,
    declaredMimeType: file.type,
    sizeBytes: file.size,
    headerBytes,
  });

  if (!result.valid) {
    await auditRepository.record({
      userId: user.id,
      action: "media.upload_attempt",
      resource: `MediaAsset:${file.name}`,
      result: "failure",
      ipAddress: null,
      metadata: { reason: "validation_failed", errors: result.errors },
    });
    return NextResponse.json({ error: "Validation failed.", details: result.errors }, { status: 422 });
  }

  await auditRepository.record({
    userId: user.id,
    action: "media.upload_attempt",
    resource: `MediaAsset:${result.sanitizedFilename}`,
    result: "failure",
    ipAddress: null,
    metadata: { reason: "no_storage_backend_configured" },
  });

  return NextResponse.json(
    {
      validated: true,
      sanitizedFilename: result.sanitizedFilename,
      error:
        "File passed validation, but no storage backend (e.g. S3-compatible object storage) is configured in this environment, so it was not saved. See docs/media-policy.md.",
    },
    { status: 501 }
  );
}
