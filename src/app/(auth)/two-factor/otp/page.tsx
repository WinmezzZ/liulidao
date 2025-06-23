'use client';

import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export default function Component() {
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const { data: session } = authClient.useSession();

  const userEmail = session?.user?.email;

  const requestOTP = async () => {
    await authClient.twoFactor.sendOtp();
    setMessage('验证码已发送至邮箱');
    setIsError(false);
    setIsOtpSent(true);
  };
  const router = useRouter();

  const validateOTP = async () => {
    const res = await authClient.twoFactor.verifyOtp({
      code: otp,
    });
    if (res.data) {
      setMessage('验证码验证成功');
      setIsError(false);
      setIsValidated(true);
      router.push('/');
    } else {
      setIsError(true);
      setMessage('验证码错误');
    }
  };
  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>两步验证</CardTitle>
          <CardDescription>请输入邮箱收到的6位验证码</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {!isOtpSent ? (
              <Button onClick={requestOTP} className="w-full">
                <Mail className="mr-2 h-4 w-4" /> 发送验证码到邮箱
              </Button>
            ) : (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="otp">验证码</Label>
                  <Label className="py-2">
                    请检查邮箱{userEmail}收到的6位验证码
                  </Label>
                  <Input
                    id="otp"
                    placeholder="请输入6位验证码"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    autoFocus
                  />
                </div>
                <Button
                  onClick={validateOTP}
                  disabled={otp.length !== 6 || isValidated}
                >
                  验证
                </Button>
              </>
            )}
          </div>
          {message && (
            <div
              className={`mt-4 flex items-center gap-2 ${
                isError ? 'text-red-500' : 'text-primary'
              }`}
            >
              {isError ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <p className="text-sm">{message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
