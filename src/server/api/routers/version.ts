import { omit } from 'lodash-es';
import { NodeApi } from 'platejs';
import { z } from 'zod';

import {
  createRateLimitMiddleware,
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';

const versionMutations = {
  createVersion: protectedProcedure
    .use(createRateLimitMiddleware)
    .input(
      z.object({
        articleId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const article = await ctx.db.article.findUniqueOrThrow({
        select: {
          content: true,
          title: true,
        },
        where: {
          id: input.articleId,
          authorId: ctx.userId,
        },
      });

      return await ctx.db.articleVersion.create({
        data: {
          content: article.content as any,
          articleId: input.articleId,
          title: article.title,
          authorId: ctx.userId,
        },
        select: { id: true },
      });
    }),

  deleteVersion: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.articleVersion.delete({
        where: {
          id: input.id,
          authorId: ctx.userId,
        },
      });
    }),

  restoreVersion: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const version = await ctx.db.articleVersion.findUniqueOrThrow({
        select: {
          content: true,
          articleId: true,
          title: true,
        },
        where: {
          id: input.id,
        },
      });

      const content = version.content
        ? NodeApi.string({ children: version.content as any, type: 'root' })
        : '';

      return await ctx.db.article.update({
        data: {
          content,
          title: version.title,
        },
        where: {
          id: version.articleId,
          authorId: ctx.userId,
        },
      });
    }),
};

export const versionRouter = createTRPCRouter({
  ...versionMutations,
  articleVersion: protectedProcedure
    .input(
      z.object({
        articleVersionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const version = await ctx.db.articleVersion.findUniqueOrThrow({
        select: {
          id: true,
          content: true,
          createdAt: true,
          articleId: true,
          title: true,
          author: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        where: {
          id: input.articleVersionId,
        },
      });

      return {
        ...omit(version, 'author'),
        userId: version.author.id,
        username: version.author.username,
      };
    }),

  articleVersions: protectedProcedure
    .input(
      z.object({
        articleId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const versions = await ctx.db.articleVersion.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          title: true,
          author: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
        },
        where: {
          articleId: input.articleId,
        },
      });

      return {
        versions: versions.map((version) => ({
          ...omit(version, 'author'),
          image: version.author.image,
          userId: version.author.id,
          username: version.author.username,
        })),
      };
    }),
});
