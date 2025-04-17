import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
 
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/unauthorised", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: [
        '/((?!api|_next/static|_next/image|sign-in|sign-up|unauthorised|server-error|bad-request|not-found|forbidden|favicon.ico|robots.txt|images|$).*)',
    ]
};