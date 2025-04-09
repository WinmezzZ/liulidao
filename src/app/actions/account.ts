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
