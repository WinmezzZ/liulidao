import { ipAddress } from '@vercel/functions';
import { type NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { pathMatcher } from './util';

export async function middleware(request: NextRequest) {
  const match = pathMatcher('/api', request.nextUrl.pathname);
  if (!match) return NextResponse.next();
  const ip = ipAddress(request) || '127.0.0.1';
  const { allowed, reset } = await checkRateLimit(
    `${request.nextUrl.pathname}:${ip}`
  );

  if (!allowed) {
    return new NextResponse(`访问太频繁，请${reset}秒后重试`, {
      status: 429,
      headers: { 'Retry-After': reset.toString() },
    });
  }

  return NextResponse.next();
}
