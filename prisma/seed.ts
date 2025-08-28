import prisma from '@/lib/prisma.ts';

export default async function main() {
  prisma.user.create({
    data: {
      name: 'liulidao',
      email: 'liulidao@example.com',
    },
  });

  prisma.article.create({
    data: {
      title: 'hello world',
      content: 'hello world',
    },
  });
}

main();
