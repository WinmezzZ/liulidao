'use server';

import prisma from '@/lib/prisma';

export const getUserAccounts = async (id: string) => {
  const accounts = await prisma.account.findMany({
    where: {
      userId: id,
    },
  });
  return accounts;
};
