import { ArticleStatusType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { unstable_cache } from 'next/cache';
import { NodeApi } from 'platejs';
import { z } from 'zod';

import { db } from '@/lib/prisma';
import {
  createRateLimitMiddleware,
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';
import {
  ArticleOptionalDefaultsSchema,
  ArticlePartialSchema,
  ArticleSchema,
} from '@prisma-generated/zod';
import { spaceRouter } from './space';

const MAX_TITLE_LENGTH = 256;
const MAX_CONTENT_LENGTH = 1_000_000; // 1MB of text
const MAX_ICON_LENGTH = 100;

export const articleRouter = createTRPCRouter({
  archive: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.article.update({
        data: {
          status: ArticleStatusType.ARCHIVED,
        },
        where: {
          id: input.id,
          authorId: ctx.userId,
        },
      });
    }),

  findOne: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const article = await ctx.db.article.findUnique({
        select: {
          id: true,
          parentId: true,
          coverImage: true,
          title: true,
          updatedAt: true,
          content: true,
          status: true,
        },
        where: {
          id: input,
        },
      });

      return article;
    }),
  create: protectedProcedure
    .use(createRateLimitMiddleware)
    .input(ArticleOptionalDefaultsSchema)
    .mutation(async ({ ctx, input }) => {
      const { spaceId: spaceFlag, ...rest } = input;
      const space = await spaceRouter.createCaller(ctx).findOne(spaceFlag);
      if (!space) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '空间不存在',
        });
      }

      const content = input.content;

      const finalContent = content
        ? NodeApi.string({
            children: content,
            type: 'root',
          })
        : '';

      if (finalContent.length > MAX_CONTENT_LENGTH) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `内容过长，最大长度为${MAX_CONTENT_LENGTH}个字符`,
        });
      }
      return ctx.db.article.create({
        data: {
          ...rest,
          content: rest.content as any,
          spaceId: space.id,
        },
      });
    }),
  update: protectedProcedure
    .input(ArticlePartialSchema)
    .mutation(async ({ ctx, input }) => {
      const space = await spaceRouter.createCaller(ctx).findOne(input.spaceId!);
      if (!space) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '空间不存在',
        });
      }
      const content = input.content
        ? NodeApi.string({
            children: input.content as any,
            type: 'root',
          })
        : undefined;

      if (content && content.length > MAX_CONTENT_LENGTH) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `内容过长，最大长度为${MAX_CONTENT_LENGTH}个字符`,
        });
      }

      await ctx.db.article.update({
        data: {
          content: input.content as any,
          coverImage: input.coverImage,
          title: input.title,
          permissionType: input.permissionType,
          status: input.status,
          type: input.type,
        },
        where: {
          id: input.id as string,
          authorId: ctx.userId,
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

  list: protectedProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).optional(),
        parentDocumentId: z.string().optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit, parentDocumentId, search } = input;

      const articles = await ctx.db.article.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          updatedAt: 'desc',
        },
        select: {
          id: true,
          coverImage: true,
          createdAt: true,
          title: true,
          updatedAt: true,
          spaceId: true,
        },
        take: limit ? limit + 1 : undefined,
        where: {
          status: ArticleStatusType.PUBLISHED,
          parentId: parentDocumentId ?? null,
          authorId: ctx.userId,
          ...(search
            ? {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
            : {}),
        },
      });

      let nextCursor: typeof cursor | undefined;

      if (limit && articles.length > limit) {
        const nextItem = articles.pop();
        nextCursor = nextItem!.id;
      }

      return {
        articles: articles,
        nextCursor,
      };
    }),
});
