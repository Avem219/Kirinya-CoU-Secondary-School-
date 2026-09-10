import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Sign In | Kirinya C.O.U.S.S",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-parchment/10 bg-parchment p-8 shadow-2xl">
        <div className="text-center">
          <span
            aria-hidden
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-sm font-serif font-semibold text-parchment"
          >
            KC
          </span>
          <h1 className="mt-4 font-serif text-xl font-semibold text-ink">
            Kirinya C.O.U.S.S Admin
          </h1>
          <p className="mt-1 text-sm text-ink/60">Sign in to manage the platform</p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
