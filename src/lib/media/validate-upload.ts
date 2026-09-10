// Upload validation logic, deliberately pure and framework-free so it can be
// unit tested without spinning up Next.js (see src/lib/media/__tests__).
//
// Security notes:
// - We never trust the client-supplied MIME type alone — `sniffedType` is
//   derived from the file's actual leading bytes (magic numbers) and must
//   agree with the declared type.
// - Filenames are sanitized to remove path separators, ".." segments, and
//   null bytes, preventing path traversal if a filename is ever used to
//   build a storage path.
// - This module only validates. It does not write files anywhere — see
//   src/app/api/admin/media/upload/route.ts for why.

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_DOCUMENT_BYTES = 25 * 1024 * 1024; // 25 MB

const ALLOWED_TYPES = {
  "image/jpeg": { extensions: [".jpg", ".jpeg"], maxBytes: MAX_IMAGE_BYTES, magic: [0xff, 0xd8, 0xff] },
  "image/png": { extensions: [".png"], maxBytes: MAX_IMAGE_BYTES, magic: [0x89, 0x50, 0x4e, 0x47] },
  "image/webp": { extensions: [".webp"], maxBytes: MAX_IMAGE_BYTES, magic: [0x52, 0x49, 0x46, 0x46] },
  "application/pdf": { extensions: [".pdf"], maxBytes: MAX_DOCUMENT_BYTES, magic: [0x25, 0x50, 0x44, 0x46] },
} as const;

export type AllowedMimeType = keyof typeof ALLOWED_TYPES;

export type UploadValidationInput = {
  filename: string;
  declaredMimeType: string;
  sizeBytes: number;
  /** First ~16 bytes of the file, for magic-number verification. */
  headerBytes: Uint8Array;
};

export type UploadValidationResult =
  | { valid: true; sanitizedFilename: string }
  | { valid: false; errors: string[] };

export function sanitizeFilename(name: string): string {
  return name
    .replace(/\0/g, "")
    .replace(/[/\\]/g, "_")
    .replace(/\.\./g, "_")
    .trim()
    .slice(0, 200) || "upload";
}

function matchesMagic(header: Uint8Array, magic: readonly number[]): boolean {
  if (header.length < magic.length) return false;
  return magic.every((byte, i) => header[i] === byte);
}

export function validateUpload(input: UploadValidationInput): UploadValidationResult {
  const errors: string[] = [];

  const declared = input.declaredMimeType as AllowedMimeType;
  const spec = ALLOWED_TYPES[declared];

  if (!spec) {
    return {
      valid: false,
      errors: [
        `File type "${input.declaredMimeType}" is not allowed. Allowed types: ${Object.keys(
          ALLOWED_TYPES
        ).join(", ")}.`,
      ],
    };
  }

  const sanitizedFilename = sanitizeFilename(input.filename);
  const hasAllowedExtension = spec.extensions.some((ext) =>
    sanitizedFilename.toLowerCase().endsWith(ext)
  );
  if (!hasAllowedExtension) {
    errors.push(`File extension does not match declared type "${declared}".`);
  }

  if (input.sizeBytes <= 0) {
    errors.push("File is empty.");
  }
  if (input.sizeBytes > spec.maxBytes) {
    errors.push(`File exceeds the ${spec.maxBytes / (1024 * 1024)}MB limit for this type.`);
  }

  if (!matchesMagic(input.headerBytes, spec.magic)) {
    errors.push(
      "File content does not match its declared type (failed signature check) — the declared MIME type cannot be trusted on its own."
    );
  }

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true, sanitizedFilename };
}
