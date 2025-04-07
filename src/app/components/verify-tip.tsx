"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useRef, useState, useTransition } from "react";

export function VerifyTip() {
  const session = useSession();
  const [hasSended, setHasSended] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState(60);
  const [isPending, startTransition] = useTransition();

  const startTimer = () => {
    timer.current = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
  };

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timer.current!);
      timer.current = null;
      setHasSended(false);
    }
  }, [seconds]);  

  if (!session?.data?.user?.email) return null;

  if (session?.data?.user.emailVerified) return null;

  const sendVerificationEmail = () => {
    startTransition(async () => {
      const res = await authClient.sendVerificationEmail({
        email: session.data!.user.email,
        callbackURL: "/"
      });
      if (res.data) {
        setHasSended(true);
        startTimer();
      }
    });
  };
  
  return <Alert className="py-1  bg-gray-100">
    <AlertDescription className="flex items-center gap-4">
      { hasSended ? <p>验证邮件已发送至{session.data!.user.email}，请查收邮箱</p> : <p>你的邮箱还未验证，请先验证邮箱</p> }
      <Button className="h-6" variant="outline" onClick={sendVerificationEmail} size="sm" disabled={hasSended || isPending} loading={isPending}>{hasSended ? `${seconds}秒后重新发送` : "发送验证邮件"}</Button>
    </AlertDescription>
</Alert>; 
}