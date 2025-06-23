import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';
import { pathMatcher } from './util';

export async function middleware(request: NextRequest) {
  const match = pathMatcher(
    '/((?!api|_next/static|_next/image|sign-in|sign-up|unauthorised|server-error|bad-request|not-found|forbidden|two-factor|reset-password|forgot-password|.*\\..*).*)',
    request.nextUrl.pathname
  );
  if (!match) return NextResponse.next();
  const sessionCookie = getSessionCookie(request);

  console.log('sessionCookie', sessionCookie);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}
