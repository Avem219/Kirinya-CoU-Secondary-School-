import { describe, it, expect } from "vitest";
import { validateUpload, sanitizeFilename, MAX_IMAGE_BYTES } from "@/lib/media/validate-upload";

const PNG_MAGIC = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = new Uint8Array([0xff, 0xd8, 0xff, 0xe0]);
const FAKE_TEXT = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]); // "hello"

describe("sanitizeFilename", () => {
  it("strips path separators and .. segments to prevent path traversal", () => {
    expect(sanitizeFilename("../../etc/passwd")).not.toContain("..");
    expect(sanitizeFilename("../../etc/passwd")).not.toContain("/");
    expect(sanitizeFilename("a/b\\c")).toBe("a_b_c");
  });

  it("strips null bytes", () => {
    expect(sanitizeFilename("evil\0.png")).not.toContain("\0");
  });

  it("falls back to a default name for an empty/invalid input", () => {
    expect(sanitizeFilename("")).toBe("upload");
  });
});

describe("validateUpload", () => {
  it("accepts a valid PNG with matching extension, size, and magic bytes", () => {
    const result = validateUpload({
      filename: "photo.png",
      declaredMimeType: "image/png",
      sizeBytes: 1024,
      headerBytes: PNG_MAGIC,
    });
    expect(result.valid).toBe(true);
  });

  it("rejects a file whose declared type is not in the allowlist", () => {
    const result = validateUpload({
      filename: "script.exe",
      declaredMimeType: "application/x-msdownload",
      sizeBytes: 1024,
      headerBytes: FAKE_TEXT,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects a file whose content does not match its declared MIME type (spoofed type)", () => {
    // Declares itself as a JPEG but the actual bytes are plain text —
    // this is exactly the case where trusting the client-provided MIME
    // type alone would be a security bug.
    const result = validateUpload({
      filename: "innocent.jpg",
      declaredMimeType: "image/jpeg",
      sizeBytes: 1024,
      headerBytes: FAKE_TEXT,
    });
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.errors.some((e) => e.includes("signature"))).toBe(true);
    }
  });

  it("rejects a file that exceeds the size limit for its type", () => {
    const result = validateUpload({
      filename: "huge.jpg",
      declaredMimeType: "image/jpeg",
      sizeBytes: MAX_IMAGE_BYTES + 1,
      headerBytes: JPEG_MAGIC,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects an empty file", () => {
    const result = validateUpload({
      filename: "empty.png",
      declaredMimeType: "image/png",
      sizeBytes: 0,
      headerBytes: PNG_MAGIC,
    });
    expect(result.valid).toBe(false);
  });

  it("rejects a mismatched extension for the declared type", () => {
    const result = validateUpload({
      filename: "photo.txt",
      declaredMimeType: "image/png",
      sizeBytes: 1024,
      headerBytes: PNG_MAGIC,
    });
    expect(result.valid).toBe(false);
  });
});
