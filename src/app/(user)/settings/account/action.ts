'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const getUserAccounts = async (id: string) => {
  const accounts = await prisma.account.findMany({
    where: {
      userId: id,
    },
  });
  return accounts;
};

export const setPassword = async (password: string) => {
  const res = await auth.api.setPassword({
    headers: await headers(),
    body: {
      newPassword: password,
    },
  });
  return res;
};
