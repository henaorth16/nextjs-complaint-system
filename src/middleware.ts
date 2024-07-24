'use server';

import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    // Redirect to the login page if the user is not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next(); // Allow the request to continue if authenticated
}

export async function isAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

}

export const config = {
  matcher: "/admins/:path*",
};
  