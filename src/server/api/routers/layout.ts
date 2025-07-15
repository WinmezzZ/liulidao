import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const layoutRouter = createTRPCRouter({
  app: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const authUser = ctx.session.user!;

    const { ...currentUser } = await ctx.db.user.findUniqueOrThrow({
      select: {
        name: true,
        image: true,
      },
      where: {
        id: userId,
      },
    });

    return {
      currentUser: {
        ...currentUser,
        firstName: currentUser.name?.split(' ')[0] ?? 'You',
        ...authUser,
      },
    };
  }),
});
