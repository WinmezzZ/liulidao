import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  info: protectedProcedure
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
