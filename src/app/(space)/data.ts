import { revalidatePath } from 'next/cache';
import { RedirectType } from 'next/navigation';
import { createSpaceSchema } from '@/app/schemas/space';
import prisma from '@/lib/prisma';
import { nextProc, redirect } from '@/server/trpc';

export const createSpace = nextProc
  .input(
    createSpaceSchema.superRefine(async (it, ctx) => {
      const spaces = await prisma.space.findFirst({
        where: {
          name: it.name,
        },
      });
      if (spaces) {
        ctx.addIssue({
          code: 'custom',
          message: '名称已存在',
          path: ['name'],
        });
      }
    })
  )
  .mutation(async (opts) => {
    const space = await prisma.space.create({
      data: opts.input,
    });
    revalidatePath('/');
    return redirect(`/${space.slug || space.id}`, RedirectType.push);
  });
