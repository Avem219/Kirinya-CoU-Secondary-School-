"use client";

import { useState } from "react";

type Result = { status: "idle" } | { status: "loading" } | { status: "done"; message: string; isError: boolean };

export function MediaUploader() {
  const [result, setResult] = useState<Result>({ status: "idle" });

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setResult({ status: "loading" });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData });
      const data = await res.json();
      setResult({ status: "done", message: data.error ?? "Uploaded.", isError: !res.ok });
    } catch {
      setResult({ status: "done", message: "Network error while uploading.", isError: true });
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div>
      <label htmlFor="media-upload" className="block text-xs font-medium text-ink">
        Upload a file (JPEG, PNG, WEBP, or PDF — max 10MB images / 25MB PDFs)
      </label>
      <input
        id="media-upload"
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        onChange={handleChange}
        className="mt-2 block w-full text-sm"
      />
      <div role="status" aria-live="polite" className="mt-3">
        {result.status === "loading" && <p className="text-xs text-ink/50">Validating…</p>}
        {result.status === "done" && (
          <p
            className={`rounded-lg px-3 py-2 text-xs font-medium ${
              result.isError ? "bg-amber-50 text-amber-900" : "bg-forest/10 text-forest"
            }`}
          >
            {result.message}
          </p>
        )}
      </div>
    </div>
  );
}
