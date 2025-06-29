import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { middleware as authorize } from './middlewares/authorize';
import { middleware as rateLimit } from './middlewares/rate-limit';

export async function middleware(req: NextRequest) {
  req.headers.set('x-pathname', req.nextUrl.pathname);
  const middlewares = [rateLimit, authorize];

  for (const middleware of middlewares) {
    const result = await middleware(req);
    if (
      result &&
      result instanceof NextResponse &&
      result !== NextResponse.next()
    ) {
      return result;
    }
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
    '/((?!_next/static|_next/image|static|.*\\.).*)',
  ],
  runtime: 'nodejs',
};
