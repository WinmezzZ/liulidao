'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export default function Component() {
  const [totpCode, setTotpCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
      setError('验证码必须是6位数字');
      return;
    }
    authClient.twoFactor
      .verifyTotp({
        code: totpCode,
      })
      .then((res) => {
        if (res.data?.token) {
          setSuccess(true);
          setError('');
        } else {
          setError('验证码错误');
        }
      });
  };

  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>TOTP 验证</CardTitle>
          <CardDescription>输入你的6位TOTP验证码</CardDescription>
        </CardHeader>
        <CardContent>
          {!success ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="totp">TOTP 验证码</Label>
                <Input
                  id="totp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="请输入6位验证码"
                  required
                />
              </div>
              {error && (
                <div className="mt-2 flex items-center text-red-500">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <Button type="submit" className="mt-4 w-full">
                验证
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <p className="text-lg font-semibold">验证成功</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-muted-foreground gap-2 text-sm">
          <Link href="/two-factor/otp">
            <Button variant="link" size="sm">
              切换到邮箱验证
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
