'use server';

import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { db } from '@/lib/prisma';

// export const getSpace = (slug: string) =>
//   unstable_cache(
//     async () => {
//       const space = await db.space.findFirst({
//         where: {
//           OR: [{ slug }, { id: slug }],
//         },
//       });
//       return space;
//     },
//     ['space', slug],
//     { revalidate: 60 }
//   )();

export const getSpace = async (slug: string) => {
  'use cache';
  cacheTag('space', slug);
  const space = await db.space.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
    },
  });
  return space;
};
