'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { Card } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: '请输入邮箱地址' })
      .email('请输入正确的邮箱地址')
      .describe('请输入你的邮箱地址'),
    confirmPassword: z
      .string({ required_error: '请确认密码' })
      .email('请输入正确的邮箱地址')
      .describe('请确认你的邮箱地址'),
  })
  .refine((data) => data.confirmPassword !== data.newPassword, {
    path: ['confirmPassword'],
    message: '两次密码不一致',
  });

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [isPending, startTransition] = useTransition();

  if (!token) {
    return (
      <Card className="p-6">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="flex items-center justify-between text-2xl font-semibold tracking-tight">
            重置密码
            <span className="text-muted-foreground text-right text-sm">
              <Link
                href="/sign-in"
                className="hover:text-primary underline underline-offset-4"
              >
                返回登录
              </Link>
            </span>
          </h1>

          <p className="text-muted-foreground my-10 text-center text-sm">
            无效的token
          </p>
        </div>
      </Card>
    );
  }

  const handleSubmit = async ({
    newPassword,
  }: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      const res = await authClient.resetPassword({
        newPassword,
        token,
      });
      if (res.error) {
        toast.error(res.error.message);
      }
    });
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="flex items-center justify-between text-2xl font-semibold tracking-tight">
          设置新密码
          <span className="text-muted-foreground text-right text-sm">
            <Link
              href="/sign-in"
              className="hover:text-primary underline underline-offset-4"
            >
              返回登录
            </Link>
          </span>
        </h1>
      </div>
      <AutoForm formSchema={resetPasswordSchema} onSubmit={handleSubmit}>
        <AutoFormSubmit loading={isPending} className="w-full!">
          提交
        </AutoFormSubmit>
      </AutoForm>
    </Card>
  );
}
