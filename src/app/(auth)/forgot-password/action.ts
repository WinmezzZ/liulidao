'use server';

import prisma from '@/lib/prisma';

export const checkEmailExist = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email } });
  return !!user;
};
