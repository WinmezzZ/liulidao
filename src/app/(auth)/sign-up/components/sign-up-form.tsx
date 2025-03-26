"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFooter } from "../../components/form-footer";
import { signUpSchema } from "../../schema";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [countdown]);

  // async function onSendOTP() {
  //   const data = form.getValues();
  //   setGetOTPLoading(true);

  //   try {
  //     const res = await fetch("/api/auth/send-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({email: data.email}),
  //     });

  //     if (!res.ok) {
  //       throw new Error(await res.text());
  //     }
  //     toast.success("验证码已发送!", {
  //       description: "请检查你的邮箱",
  //     });
  //     setCountdown(30);
  //   } catch (error) {
  //     const errorMessage = error instanceof Error ? JSON.parse(error.message).message : "服务器异常";
  //     toast.error(errorMessage);
  //   } finally {
  //     setGetOTPLoading(false);
  //   }
  // }

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
       await signUp.email({
        ...data,
        name: data.username,
        callbackURL: "/dashboard",
								fetchOptions: {
									onResponse: () => {
										setIsVerifying(false);
									},
									onRequest: () => {
										setIsVerifying(true);
									},
									onError: (ctx) => {
										toast.error(ctx.error.message);
									},
									onSuccess: async () => {
										router.push("/");
									},
								},
      });
  }

  // async function handleResend() {
  //   console.log(form.getValues("email"));
  //   if (!form.getValues("email")) return;
  //   setCountdown(0);
  //   form.setValue("code", "");
  //   await onSendOTP();
  // }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
          <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>验证码</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                     <div className="flex-1">
                     <InputOTP
                        maxLength={6}
                        className="flex justify-between"
                        {...field}
                      >
                        <InputOTPGroup className="flex w-full items-center justify-between [&>div]:rounded-md [&>div]:border">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          
                        </InputOTPGroup>
                      </InputOTP>
                     </div>
                      {countdown > 0 ? (
                          <span className="text-sm text-muted-foreground">{countdown}秒后重新发送</span>
                        ) : (
                            <Button type="button"  onClick={handleResend} loading={getOTPLoading}>
                            获取验证码
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      我们发送了一个验证码到你的邮箱，请注意查收。
                    </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>确认密码</FormLabel>
                  <FormControl>
                    <Input type='password'{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" loading={isVerifying} className="mt-4">
                注册
              </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  其他登录方式
                </span>
              </div>
            </div>

            <FormFooter isLoading={isVerifying} />
          </div>
        </form>
      </Form>
    </div>
  );
}