import { getSessionCookie } from 'better-auth/cookies';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { api } from '@/trpc/server';
import { EmptySpace } from './_components/empty-space';
import { SpaceList } from './_components/space-list';
import { VerifyTip } from './_components/verify-tip';
import { getSession } from './actions/account';

export default async function Page() {
  const spaces = await prisma.space.findMany();

  return (
    <div className="flex flex-1 flex-col">
      <VerifyTip />
      {/* { !spaces.length && <EmptySpace /> } */}
      {/* <EmptySpace /> */}
      <SpaceList spaces={spaces} />
    </div>
  );
}
