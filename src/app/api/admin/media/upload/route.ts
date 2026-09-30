import { NextResponse, type NextRequest } from "next/server";
import {
  requireActionPermission,
  AuthenticationError,
  AuthorizationError,
} from "@/lib/auth/guards";
import { validateUpload } from "@/lib/media/validate-upload";
import { auditRepository } from "@/lib/repositories";
import { supabaseServer } from "@/lib/supabase-server";

const STORAGE_BUCKET = "media";

export async function POST(request: NextRequest) {
  let user;

  try {
    user = await requireActionPermission("media.upload");
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { error: "Not authorized." },
        { status: 403 }
      );
    }

    throw error;
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No file provided." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const headerBytes = new Uint8Array(
    arrayBuffer.slice(0, 16)
  );

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
      metadata: {
        reason: "validation_failed",
        errors: result.errors,
      },
    });

    return NextResponse.json(
      {
        error: "Validation failed.",
        details: result.errors,
      },
      { status: 422 }
    );
  }

  const extension =
    result.sanitizedFilename.includes(".")
      ? result.sanitizedFilename.substring(
          result.sanitizedFilename.lastIndexOf(".")
        )
      : "";

  const storagePath =
    `${user.id}/${crypto.randomUUID()}${extension}`;

  const { error: uploadError } = await supabaseServer.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    await auditRepository.record({
      userId: user.id,
      action: "media.upload_attempt",
      resource: `MediaAsset:${result.sanitizedFilename}`,
      result: "failure",
      ipAddress: null,
      metadata: {
        reason: "storage_upload_failed",
        error: uploadError.message,
      },
    });

    return NextResponse.json(
      {
        error: "File could not be saved.",
        details: uploadError.message,
      },
      { status: 500 }
    );
  }

  await auditRepository.record({
    userId: user.id,
    action: "media.upload",
    resource: `MediaAsset:${result.sanitizedFilename}`,
    result: "success",
    ipAddress: null,
    metadata: {
      storageBucket: STORAGE_BUCKET,
      storagePath,
      mimeType: file.type,
      sizeBytes: file.size,
    },
  });

  return NextResponse.json({
    success: true,
    uploaded: true,
    filename: result.sanitizedFilename,
    storagePath,
    bucket: STORAGE_BUCKET,
  });
}
