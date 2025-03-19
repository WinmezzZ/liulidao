import { revalidatePath } from "next/cache";
import { verifyVerificationCode } from "@/app/(auth)/actions/email-verification-code";
import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        email: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return new Response("用户不存在", {
        status: 400,
      });
    }

    const isValid = await verifyVerificationCode({ id: user.id, email: body.email }, body.code);

    if (!isValid) {
      return new Response("无效验证码或已过期", {
        status: 400,
      });
    }

    if (!user.emailVerified) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    }
    revalidatePath("/", "layout");
    return new Response(null, {
      status: 200,
    });
  } catch {
    return new Response("服务器错误", {
      status: 500,
    });
  }
};
