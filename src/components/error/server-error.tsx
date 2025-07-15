'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServerErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean;
  error: Error;
}

export default function ServerError(props: ServerErrorProps) {
  const { className, minimal = false, error } = props;
  const router = useRouter();
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        {!minimal && (
          <h1 className="text-[7rem] leading-tight font-bold">500</h1>
        )}
        <span className="font-medium">服务器错误</span>
        <p className="text-muted-foreground text-center">
          {error.message || '服务器错误，请稍后再试。'}
        </p>
        {!minimal && (
          <div className="mt-6 flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              返回
            </Button>
            <Button onClick={() => router.push('/')}>去首页</Button>
          </div>
        )}
      </div>
    </div>
  );
}
