'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/app/actions/account';
import { db } from '@/lib/prisma';
import { type User } from '@prisma-generated/prisma';

export async function setAppearance(
  data: Partial<Pick<User, 'theme' | 'font'>>
) {
  const session = await getSession();
  if (!session) {
    return;
  }
  await db.user.update({
    where: {
      id: session.user.id,
    },
    data,
  });
  revalidatePath('/settings/appearance');
}
