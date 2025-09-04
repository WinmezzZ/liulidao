'use client';

import { useTransition } from 'react';
import { clientRevalidatePath } from '@/action/revalidate';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export default function RevokeButton({ token }: { token: string }) {
  const [isPending, startTransition] = useTransition();

  const handleRevoke = async () => {
    startTransition(async () => {
      const { error } = await authClient.revokeSession({
        token,
      });
      if (!error) {
        clientRevalidatePath('/settings/device-session');
      }
    });
  };

  return (
    <Button
      loading={isPending}
      className="w-20"
      variant="secondary"
      onClick={handleRevoke}
    >
      下线
    </Button>
  );
}
