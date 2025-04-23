import { TRPCError } from '@trpc/server';
import { unstable_cache } from 'next/cache';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { ArticleUncheckedCreateInputSchema } from '@prisma-generated/zod';
import { spaceRouter } from './space';

export const articleRouter = createTRPCRouter({
  findOne: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const space = await ctx.db.article.findFirst({
        where: {
          id: input,
        },
      });

      return space;
    }),
  create: protectedProcedure
    .input(ArticleUncheckedCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { spaceId: spaceFlag, ...rest } = input;
      const space = await spaceRouter.createCaller(ctx).findOne(spaceFlag);
      if (!space) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '空间不存在',
        });
      }
      return ctx.db.article.create({
        data: {
          ...rest,
          spaceId: space.id,
        },
      });
    }),
  spaceArticleList: protectedProcedure
    .input(z.object({ spaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      const getArticles = unstable_cache(
        async () => {
          return ctx.db.article.findMany();
        },
        [input.spaceId],
        { tags: ['articles'] }
      );
      return getArticles();
    }),
});
