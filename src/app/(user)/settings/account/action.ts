"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { updatePasswordSchema } from "./schema";
import { z } from "zod";

export const updatePassword = async ({ password }: z.infer<typeof updatePasswordSchema>) => {
  console.log("password", password);
    const { data: session, error } = await authClient.getSession();
  console.log("session", session);
  console.log("error", error);
  // if (error) {
  //   return {
  //     error: error.message,
  //   };
  // }
  // const userId = session?.user.id;
  // if (!userId) {
  //   return {
  //     error: "用户未找到",
  //   };
  // }
  // console.log(session.user);
  // const ctx = await auth.$context;
  //   const hash = await ctx.password.hash(password);
  //   await ctx.internalAdapter.updatePassword(userId, hash);
  //   return {
  //     success: true,
  //   };
};