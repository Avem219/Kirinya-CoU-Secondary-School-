import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

// IMPORTANT: this middleware only checks whether a session cookie is
// *present* — it cannot validate the token against the session store or
// check permissions (no database/Node crypto module access is guaranteed in
// the Edge runtime). It exists purely as a fast, low-cost redirect for the
// common "not logged in at all" case, improving UX by avoiding a
// server-rendered round trip just to bounce to /admin/login.
//
// The REAL authorization boundary is `requireUser()` / `requirePagePermission()`
// (src/lib/auth/guards.ts), called at the top of every admin page and server
// action. Do not add any authorization logic here that isn't duplicated
// there — this file is a UX optimization, not a security control.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicAdminRoute =
    pathname === "/admin/login" || pathname === "/admin/unauthorized";

  if (!isPublicAdminRoute) {
    const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);
    if (!hasSessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
