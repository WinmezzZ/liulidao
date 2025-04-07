"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import prisma from "@/lib/prisma";
import { useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { checkEmailExist } from "./action";
import Link from "next/link";

const forgetPasswordSchema = z.object({
    email: z.string({ required_error: "请输入邮箱地址" }).email("请输入正确的邮箱地址").describe("请输入你的邮箱地址"),        
});

export default function ForgetPasswordPage() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async ({ email }: z.infer<typeof forgetPasswordSchema>) => {
        startTransition(async () => {
          const isExist = await checkEmailExist(email);
          if (!isExist) {
           toast.error("邮箱不存在");
          } else {
              await authClient.forgetPassword({
              email,
              redirectTo: "/reset-password",
            });
          }
        });
      };

    return <Card className='p-6'>
    <div className='flex flex-col space-y-2 text-left'>
      <h1 className='text-2xl font-semibold tracking-tight'>忘记密码</h1>
         
          <p className='text-sm text-muted-foreground text-right'>
            <Link
              href='/sign-in'
              className='underline underline-offset-4 hover:text-primary'
            >
              返回登录
            </Link>
          </p>
      <p className='text-sm text-muted-foreground'>
        提交后，我们会发送一封重置密码邮件到你的邮箱。
      </p>
    </div>
    <AutoForm formSchema={forgetPasswordSchema} onSubmit={handleSubmit}>
        <AutoFormSubmit className="w-full" loading={isPending}>提交</AutoFormSubmit>
    </AutoForm>
  </Card>
    
    ;
}