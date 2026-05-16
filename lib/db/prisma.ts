import { PrismaClient } from '@prisma/client';

import { isDatabaseEnabled } from '@/lib/server/runtime';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma = isDatabaseEnabled()
  ? (global.__prisma ?? new PrismaClient())
  : (null as PrismaClient | null);

if (process.env.NODE_ENV !== 'production' && prisma) {
  global.__prisma = prisma;
}
