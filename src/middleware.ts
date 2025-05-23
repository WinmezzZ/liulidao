import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/unauthorised', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|sign-in|sign-up|unauthorised|server-error|bad-request|not-found|forbidden|two-factor|reset-password|forgot-password|favicon.ico|robots.txt|images|$).*)',
  ],
};
