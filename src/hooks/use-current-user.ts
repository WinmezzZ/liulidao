'use client';

import { useQuery } from '@tanstack/react-query';

import { useSession } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';

export const useCurrentUser = () => {
  const session = useSession();
  const { data, ...rest } = useQuery({
    ...useTRPC().layout.app.queryOptions(),
    enabled: !!session,
  });

  return { ...data?.currentUser, ...rest };
};
