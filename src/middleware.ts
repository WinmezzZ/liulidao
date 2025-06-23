import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { middleware as authorize } from './middlewares/authorize';
import { middleware as rateLimit } from './middlewares/rate-limit';

export async function middleware(req: NextRequest) {
  const middlewares = [rateLimit, authorize];

  for (const mw of middlewares) {
    const result = await mw(req);
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
  matcher: ['/:path*'],
  runtime: 'nodejs',
};
