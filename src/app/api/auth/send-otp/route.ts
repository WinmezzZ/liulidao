import { generateEmailVerificationCode } from "@/app/(auth)/actions/email-verification-code";
import { sendOTP } from "@/app/(auth)/actions/send-email";
import prisma from "@/lib/prisma";
import { SignInModel } from "@/types/auth";

export const POST = async (req: Request) => {
  try {
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

    const code = await generateEmailVerificationCode(user.id, body.email);

    await sendOTP({
      toMail: body.email,
      code,
      userName: user.name?.split(" ")[0] || "",
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    return Response.json({ ok: false, message: error.message }, { status: 500 });
  }
};
