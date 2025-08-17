// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // we’ll sync localStorage token into cookies

  const publicPaths = ["/signin", "/signup", "/home"];

  // If user is on a public path → allow
  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If no token → redirect to signin
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)", // match all routes except assets
  ],
};
