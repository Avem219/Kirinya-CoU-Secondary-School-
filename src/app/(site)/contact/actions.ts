"use server";

// Integration point for contact form submissions.
//
// This does NOT currently persist anything: there is no database connection
// available in this environment (see docs/database.md). Once Prisma is
// connected, this action should:
//   1. Validate input server-side (zod or equivalent) — mirrored below.
//   2. Rate-limit by IP.
//   3. Insert a ContactMessage row.
//   4. Optionally notify the school office by email.
//
// The client-side form treats this as an untrusted network call and shows a
// real loading/error/success state around it — it does not assume success.

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // No database is connected in this environment — this is the explicit
  // integration boundary. Do not report success as if the message was
  // stored; report the real, current limitation instead.
  return {
    status: "error",
    message:
      "The contact form isn't connected to a database yet, so this message could not be saved. Please call or email the school directly for now.",
  };
}
