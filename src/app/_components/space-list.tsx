'use client';

import { type Space } from '@prisma/client';
import Link from 'next/link';
import { api } from '@/trpc/client';

interface SpaceListProps {
  spaces: Space[];
}

export function SpaceList(props: SpaceListProps) {
  const { data: spaces } = api.space.list.useQuery(undefined, {
    initialData: props.spaces,
  });
  return (
    <div className="flex flex-col gap-4">
      <ul>
        {spaces.map((space) => (
          <li key={space.id} className="flex items-center gap-2">
            <Link href={`/spaces/${space.id}`}>{space.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
