'use client';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { authClient, useSession } from '@/lib/auth-client';

export function VerifyTip() {
  const session = useSession();
  const [hasSended, setHasSended] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState(60);
  const [isPending, startTransition] = useTransition();
  const email = session.data?.user?.email;
  const emailVerified = session?.data?.user.emailVerified;
  const [verified, setVerified] = useState(emailVerified);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (session.data?.user.emailVerified) {
      setVerified(true);
    }
  }, [session]);

  const connect = useCallback(() => {
    if (!email) return;
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource(
      `/api/email/verified?email=${encodeURIComponent(email)}`
    );
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      if (event.data === 'email-verified') {
        setVerified(true);
        es.close(); // 关闭连接（可选）
      }
    };

    es.onerror = () => {
      console.warn('SSE disconnected, retrying in 5s...');
      es.close();

      if (!verified) {
        reconnectTimer.current = setTimeout(connect, 5000); // 重连
      }
    };
  }, [email, verified]);

  useEffect(() => {
    connect();

    return () => {
      eventSourceRef.current?.close();
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
    };
  }, [connect]);

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
    }
  }, [seconds]);

  if (!email) return null;

  if (verified) return null;

  const sendVerificationEmail = () => {
    startTransition(async () => {
      const res = await authClient.sendVerificationEmail({
        email: session.data!.user.email,
        callbackURL: '/',
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
          <p>验证邮件已发送至{session.data!.user.email}，请查收邮箱</p>
        ) : (
          <p>你的邮箱还未验证，请先验证邮箱</p>
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
