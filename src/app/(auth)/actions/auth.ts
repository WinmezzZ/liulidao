"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { signInSchema, signUpSchema } from "../schema";
import { flattenValidationErrors } from "next-safe-action";


export const signIn = actionClient
  .schema(signInSchema, {
    handleValidationErrorsShape: async ve => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: data }) => {
    const existingUser = await prisma.user.findFirst({ where: { email: data.email } });
    if (!existingUser) {
      return {
        success: false,
        error: "用户名或密码错误",
      };
    }

    return {
      success: true,
      data: existingUser,
    };
  });

export const signUp = actionClient
  .schema(signUpSchema, {
    handleValidationErrorsShape: async ve => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: data }) => {
    const existingUser = await prisma.user.findFirst({ where: { email: data.email } });

    if (existingUser) {
      return {
        error: "邮箱已被使用",
      };
    }

    const newUser = await prisma.user.create({
      data,
    });

    return {
      success: true,
      data: newUser,
    };
  });
