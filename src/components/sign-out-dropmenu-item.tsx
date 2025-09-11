'use client';

import { Loader, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { DropdownMenuItem } from './ui/dropdown-menu';

export function SignOutDropMenuItem() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async (e: React.MouseEvent) => {
    if (isPending) return;

    e.preventDefault();

    startTransition(async () => {
      await authClient.signOut();
      router.push('/sign-in');
    });
  };

  return (
    <Link href="/sign-in" onClick={handleSignOut}>
      <DropdownMenuItem>
        {isPending ? <Loader className="animate-spin" /> : <LogOut />}
        退出登录
      </DropdownMenuItem>
    </Link>
  );
}
