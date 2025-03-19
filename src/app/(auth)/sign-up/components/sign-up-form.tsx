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
import { useRouter } from "next/navigation";
import { InputOTP } from "@/components/ui/input-otp";
import { InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader } from "lucide-react";
type SignUpFormProps = HTMLAttributes<HTMLDivElement>

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const router = useRouter();
  const [getOTPLoading, setGetOTPLoading] = useState(false);
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

  async function onSendOTP() {
    const data = form.getValues();
    setGetOTPLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: data.email}),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      toast.success("验证码已发送!", {
        description: "请检查你的邮箱",
      });
      setCountdown(30);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "服务器异常";
      toast.error(errorMessage);
    } finally {
      setGetOTPLoading(false);
    }
  }

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
      setIsVerifying(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      setCountdown(0);
      toast.success("验证成功");
      router.push("/");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "服务器异常";
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    console.log(form.getValues("email"));
    if (!form.getValues("email")) return;
    setCountdown(0);
    form.setValue("otp", "");
    await onSendOTP();
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='otp'
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" loading={isVerifying} className="mt-4">
                {isVerifying && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                注册
              </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
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