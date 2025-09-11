import { getSessionCookie } from 'better-auth/cookies';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const redirectTo = request.nextUrl.pathname + request.nextUrl.search;
    return NextResponse.redirect(
      new URL(`/sign-in?redirectTo=${redirectTo}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static (static files)
     * - .* (all path includes dot)
     */
    '/((?!api|_next/static|_next/image|sign-in|sign-up|unauthorised|server-error|bad-request|not-found|forbidden|two-factor|reset-password|forgot-password|.*\\..*).*)',
    // '/((?!_next/static|_next/image|static|.*\\.).*)',
  ],
  runtime: 'nodejs',
};
