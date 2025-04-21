import { useSession } from '@/lib/auth-client';

export const useUserId = () => {
  const { data } = useSession();

  return data?.user.id;
};
