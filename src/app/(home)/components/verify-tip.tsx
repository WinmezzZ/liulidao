'use client';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { type getSession } from '@/app/actions/account';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

interface VerifyTipProps {
  session: Awaited<ReturnType<typeof getSession>>;
}

export function VerifyTip({ session }: VerifyTipProps) {
  const [hasSended, setHasSended] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState(60);
  const [isPending, startTransition] = useTransition();
  const email = session?.user?.email;
  const emailVerified = session?.user.emailVerified;
  const [verified, setVerified] = useState(emailVerified);
  const eventSourceRef = useRef<EventSource | null>(null);
  let reconnectTimer: NodeJS.Timeout | null = null;

  const connect = useCallback(() => {
    if (!email) return;
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource(
      `/api/email/verified?email=${encodeURIComponent(email)}`
    );
    eventSourceRef.current = es;
    es.onmessage = async (event) => {
      if (event.data === 'email-verified') {
        console.log('email verified');
        setVerified(true);
        es.close(); // 关闭连接
      }
    };

    es.onerror = () => {
      console.warn('SSE disconnected, retrying in 5s...');
      es.close();

      if (!verified) {
        reconnectTimer = setTimeout(connect, 5000); // 重连
      }
    };
  }, [email, verified]);

  useEffect(() => {
    connect();

    return () => {
      eventSourceRef.current?.close();
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    };
  }, [connect, reconnectTimer]);

  const startTimer = () => {
    timer.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  };

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timer.current!);
      timer.current = null;
      setHasSended(false);
      setSeconds(60);
    }
  }, [seconds]);

  if (!email) return null;

  if (verified) return null;

  const sendVerificationEmail = () => {
    startTransition(async () => {
      const res = await authClient.sendVerificationEmail({
        email: session!.user.email,
      });
      if (res.data) {
        setHasSended(true);
        startTimer();
      }
    });
  };

  return (
    <Alert className="bg-gray-100 py-1">
      <AlertDescription className="flex items-center gap-4">
        {hasSended ? (
          <span>验证邮件已发送至{session!.user.email}，请查收邮箱</span>
        ) : (
          <span>你的邮箱还未验证，请先验证邮</span>
        )}
        <Button
          className="h-6"
          variant="outline"
          onClick={sendVerificationEmail}
          size="sm"
          disabled={hasSended || isPending}
          loading={isPending}
        >
          {hasSended ? `${seconds}秒后重新发送` : '发送验证邮件'}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
