import { z } from 'zod';

import {
  createRateLimitMiddleware,
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  info: protectedProcedure
    .use(createRateLimitMiddleware('user.info', 10, '1 m'))
    .input(z.object({ id: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const currentUser = ctx.session.user.id;
      const user = await ctx.db.user.findFirst({
        where: {
          id: input ? input.id : currentUser,
        },
      });

      return user;
    }),
});
