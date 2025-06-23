'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function UnauthorizedError() {
  const router = useRouter();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">401</h1>
        <span className="font-medium">未登录</span>
        <p className="text-muted-foreground text-center">
          请先登录后尝试访问此资源。
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            返回
          </Button>
          <Link href="/sign-in" replace>
            <Button>去登录</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
