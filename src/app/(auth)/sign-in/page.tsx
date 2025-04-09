import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { UserAuthForm } from './components/sign-in-form';

export default function SignIn() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-2xl font-semibold tracking-tight">登录</h1>

        <p className="text-muted-foreground text-sm">
          没有账号？{' '}
          <Link
            href="/sign-up"
            className="hover:text-primary underline underline-offset-4"
          >
            去注册
          </Link>
        </p>
      </div>
      <UserAuthForm />
    </Card>
  );
}
