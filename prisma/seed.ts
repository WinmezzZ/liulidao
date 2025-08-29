import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma.ts';

export default async function main() {
  prisma.user.create({
    data: {
      id: nanoid(),
      name: 'liulidao',
      email: 'liulidao@example.com',
    },
  });
}

main();
