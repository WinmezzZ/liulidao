"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { z } from "zod";

const resetPasswordSchema = z.object({
  newPassword: z.string({ required_error: "请输入邮箱地址" }).email("请输入正确的邮箱地址").describe("请输入你的邮箱地址"),
    confirmPassword: z.string({ required_error: "请确认密码" }).email("请输入正确的邮箱地址").describe("请确认你的邮箱地址"),
}).refine((data) => data.confirmPassword !== data.newPassword, { path: ["confirmPassword"], message: "两次密码不一致" });

export default function ResetPasswordPage() {
  const token = useSearchParams().get("token");
  const [isPending, startTransition] = useTransition();

    if (!token) {
      return <div>无效的token</div>;
    }
  

    const handleSubmit = async ({ newPassword }: z.infer<typeof resetPasswordSchema>) => {
      startTransition(async () => {
        authClient.resetPassword({
          newPassword,
          token
        });
      });
    };

    return <Card className='p-6'>
    <div className='flex flex-col space-y-2 text-left'>
      <h1 className='text-2xl font-semibold tracking-tight'>设置新密码</h1>
    </div>
    <AutoForm formSchema={resetPasswordSchema} onSubmit={handleSubmit} >
        <AutoFormSubmit loading={isPending} className="w-full!">提交</AutoFormSubmit>
    </AutoForm>
  </Card>
    
    ;
}