import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.rewrite(new URL("/home", request.url));
  // }

  return NextResponse.next();
}
