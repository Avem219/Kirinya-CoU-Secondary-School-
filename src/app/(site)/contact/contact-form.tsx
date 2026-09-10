"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Full name <span aria-hidden className="text-forest">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email address <span aria-hidden className="text-forest">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-ink">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Message <span aria-hidden className="text-forest">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div role="status" aria-live="polite">
        {state.status === "success" && (
          <p className="rounded-lg bg-forest/10 px-4 py-3 text-sm font-medium text-forest">
            Thank you — your message has been sent.
          </p>
        )}
        {state.status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {state.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
