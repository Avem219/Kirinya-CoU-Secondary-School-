"use client";

import { useActionState } from "react";
import { createNewsDraft, type NewsDraftState } from "./actions";

const initialState: NewsDraftState = { status: "idle" };

export function NewsDraftForm() {
  const [state, formAction, isPending] = useActionState(createNewsDraft, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-xs font-medium text-ink">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />
      </div>
      <div>
        <label htmlFor="excerpt" className="block text-xs font-medium text-ink">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        />
      </div>

      <div role="status" aria-live="polite">
        {state.status === "error" && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-800">
            {state.message}
          </p>
        )}
        {state.status === "blocked" && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
            {state.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-ink px-4 py-2 text-xs font-semibold text-parchment disabled:opacity-60"
      >
        {isPending ? "Saving…" : "Save Draft"}
      </button>
    </form>
  );
}
