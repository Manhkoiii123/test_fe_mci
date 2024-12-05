import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const access_token = request.cookies.get("access_token")?.value;
  const regexOnlySlash = /^\/$/;
  if (regexOnlySlash.test(pathname) && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/login") && access_token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [`/`, "/login"],
};
