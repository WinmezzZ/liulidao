import { redirect, unauthorized } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import prisma from '@/lib/prisma';
import { EmptySpace } from './_components/empty-space';
import { VerifyTip } from './_components/verify-tip';

export default async function Page() {
  const session = await authClient.getSession();
  console.log('session', session);
  if (!session?.data) {
    unauthorized();
  }
  const spaces = await prisma.space.findMany();

  if (spaces.length) {
    const firstSpace = spaces[0];
    const url = firstSpace.slug ? `/${firstSpace.slug}` : `/${firstSpace.id}`;
    redirect(url);
  }

  return (
    <div className="flex flex-1 flex-col">
      <VerifyTip />
      {/* { !spaces.length && <EmptySpace /> } */}
      <EmptySpace />
    </div>
  );
}
