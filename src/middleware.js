import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/user-login")) {
    const slug = pathname.split("/").pop();
    return NextResponse.redirect(new URL(`/login?hash=${slug}`, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/user-login/:path*",
};
