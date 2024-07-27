import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('Authorization')?.value;

  if (!token) {
    // If there's no token, redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Verify the token
    await jose.jwtVerify(token, secret, {
      algorithms: ['HS512'],
    });

    // If token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification failed:', error);

    // If token verification fails, redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Define the paths where the middleware should run
export const config = {
  matcher: ['/admin/:path*'], // Add more paths as needed
};