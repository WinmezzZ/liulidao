import { useParams } from 'next/navigation';
import { useTRPC } from '@/trpc/client';

export const useSpace = () => {
  const trpc = useTRPC();
  const spaceFlag = useParams().spaceId as string;
  const space = trpc.space.findOne.getData(spaceFlag);
  console.log('space', space);
  return space;
};
