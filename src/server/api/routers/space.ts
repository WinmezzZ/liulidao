import { TRPCError } from '@trpc/server';
import { unstable_cache } from 'next/cache';
import { z } from 'zod';

import { createSpaceSchema } from '@/schema/space';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';

export const spaceRouter = createTRPCRouter({
  findOne: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const space = await ctx.db.space.findFirst({
        where: {
          OR: [{ slug: input }, { id: input }],
        },
      });

      return space;
    }),
  spaces: protectedProcedure
    .input(z.object({ spaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      const spaceList = await ctx.db.space.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        select: {},
        where: {
          OR: [{ id: input.spaceId }, { slug: input.spaceId }],
        },
      });

      return spaceList;
    }),
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  create: protectedProcedure
    .input(createSpaceSchema)
    .mutation(async ({ ctx, input }) => {
      const connectUser = { connect: { id: ctx.session.user.id } };
      const existSlug =
        input.slug &&
        (await ctx.db.space.findFirst({
          where: {
            slug: input.slug,
          },
        }));
      if (existSlug) {
        throw new TRPCError({ code: 'CONFLICT', message: '路径标识已存在' });
      }
      return ctx.db.space.create({
        data: {
          name: input.name,
          description: input.description,
          slug: input.slug,
          owner: connectUser,
          createdBy: connectUser,
        },
      });
    }),

  list: protectedProcedure.query(async ({ ctx, input }) => {
    const getSpaces = unstable_cache(
      async () => {
        return ctx.db.space.findMany();
      },
      ['spaces-all'],
      { tags: ['spaces'] }
    );

    return getSpaces();
  }),

  articleList: protectedProcedure
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

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
