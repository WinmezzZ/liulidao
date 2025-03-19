import { generateEmailVerificationCode } from "@/app/(auth)/actions/email-verification-code";
import { sendOTP } from "@/app/(auth)/actions/send-email";
import prisma from "@/lib/prisma";
import { SignInModel } from "@/types/auth";

export const POST = async (req: Request) => {
  const body = (await req.json()) as SignInModel;

  const user = await prisma.user.upsert({
    where: {
      email: body.email,
    },
    update: {},
    create: {
      email: body.email,
      emailVerified: null,
    },
  });

  const otp = await generateEmailVerificationCode(user.id, body.email);

  const res = await sendOTP({
    toMail: body.email,
    code: otp,
    userName: user.name?.split(" ")[0] || "",
  });

  console.log("res", res);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
  });
};
