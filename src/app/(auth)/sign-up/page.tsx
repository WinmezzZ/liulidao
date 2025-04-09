import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { SignUpForm } from './components/sign-up-form';

export default function SignUp() {
  return (
    <Card className="p-6">
      <div className="mb-2 flex flex-col space-y-2 text-left">
        <h1 className="text-lg font-semibold tracking-tight">注册</h1>
        <p className="text-muted-foreground text-sm">
          已有账号？{' '}
          <Link
            href="/sign-in"
            className="hover:text-primary underline underline-offset-4"
          >
            去登录
          </Link>
        </p>
      </div>
      <SignUpForm />
    </Card>
  );
}
