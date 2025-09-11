'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export const setPassword = async (password: string) => {
  const res = await auth.api.setPassword({
    headers: await headers(),
    body: {
      newPassword: password,
    },
  });
  return res.status;
};

export const getSession = async (
  query?: Parameters<typeof auth.api.getSession>[0]['query']
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
    query,
  });
  return session;
};

export const getUserId = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return null;
  return session.user.id;
};

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
