'use client';
import { LucideFingerprint } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import github from '@/assets/svg/logo/github.svg';
import google from '@/assets/svg/logo/google.svg';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export function FormFooter() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const router = useRouter();
  const socialSignIn = async (provider: 'github' | 'google') => {
    if (provider === 'github') {
      setGithubLoading(true);
    } else {
      setGoogleLoading(true);
    }
    await authClient.signIn.social({
      provider,
      fetchOptions: {
        timeout: 20000,
      },
    });
    if (provider === 'github') {
      setGithubLoading(false);
    } else {
      setGoogleLoading(false);
    }
  };

  const passkeySignIn = async () => {
    setPasskeyLoading(true);
    const { error } = await authClient.signIn.passkey();
    setPasskeyLoading(false);
    if (!error) {
      router.push('/');
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="outline"
        className="w-full"
        type="button"
        loading={passkeyLoading}
        onClick={passkeySignIn}
      >
        <LucideFingerprint className="size-5" /> 使用 Passkey 登录
      </Button>
      <Button
        variant="outline"
        className="w-full"
        type="button"
        loading={googleLoading}
        onClick={() => socialSignIn('google')}
      >
        <Image src={google} alt="google" className="size-5" /> Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        type="button"
        loading={githubLoading}
        onClick={() => socialSignIn('github')}
      >
        <Image src={github} alt="github" className="size-5" /> GitHub
      </Button>
    </div>
  );
}
