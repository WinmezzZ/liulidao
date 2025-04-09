'use server';

import { type z } from 'zod';
import prisma from '@/lib/prisma';
import { createSpaceSchema } from '../schemas/space';

export async function createSpace(data: z.infer<typeof createSpaceSchema>) {
  try {
    const { name, slug, description } = createSpaceSchema.parse(data);
    await prisma.space.create({
      data: {
        name,
        description,
        slug,
      },
    });

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err as string,
    };
  }
}
