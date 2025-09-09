import { env } from '@/env';
import { PrismaClient } from '@prisma-generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

export default prisma;

export const db = prisma;

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
