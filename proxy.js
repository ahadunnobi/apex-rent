import { NextResponse } from "next/server";

/** Only these routes require login — car details (/cars/:id) stays public */
const PRIVATE_PATHS = ["/add-car", "/my-bookings", "/my-cars", "/edit-car"];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const isPrivate = PRIVATE_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (!isPrivate) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token.sig")?.value;

  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-car",
    "/add-car/:path*",
    "/my-bookings",
    "/my-bookings/:path*",
    "/my-cars",
    "/my-cars/:path*",
    "/edit-car/:path*",
  ],
};
