import { z } from 'zod';

import { UpdateUserSchema } from '@/schema/user';
import {
  createRateLimitMiddleware,
  createTRPCRouter,
  publicProcedure,
} from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  info: publicProcedure
    .use(createRateLimitMiddleware)
    .input(
      z
        .object({ id: z.string().optional(), username: z.string().optional() })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const currentUser = ctx.session?.user.id;
      const user = await ctx.db.user.findFirst({
        where: {
          id: input?.id ? input.id : input?.username ? undefined : currentUser,
          name: input?.username,
        },
      });

      return user;
    }),
  update: publicProcedure
    .use(createRateLimitMiddleware)
    .input(UpdateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          id: ctx.userId,
        },
        data: input,
      });

      return user;
    }),
});
