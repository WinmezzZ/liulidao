"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function sendVerificationEmail() {
    const session = await auth.api.getSession({
        headers: await headers(),
        query: {
            disableCookieCache: true
        }
    });
    if (!session?.user.email) return {
        error: "用户未登录"
    };
  await auth.api.sendVerificationEmail({
    headers: await headers(),
    body: {
      email: session.user.email,
      callbackURL: "/"
    }
  });
}