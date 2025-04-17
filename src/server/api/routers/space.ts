import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createSpaceSchema } from "@/schema/space";
import { TRPCError } from "@trpc/server";

export const spaceRouter = createTRPCRouter({
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
      const connectUser = { connect: { id: ctx.session.user.id } }
      const existSlug = await ctx.db.space.findFirst({
        where: {
          slug: input.slug,
        },
      })
      if (existSlug) {
        throw new TRPCError({ code: "CONFLICT", message: "路径标识已存在"   });
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
    const post = await ctx.db.space.findMany({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
