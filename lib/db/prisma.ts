import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function canInitializePrisma() {
  const databaseUrl = process.env.DATABASE_URL;

  return Boolean(databaseUrl && !databaseUrl.includes('postgres:postgres@localhost:5432/showcase'));
}

export const prisma = canInitializePrisma()
  ? (global.__prisma ?? new PrismaClient())
  : (null as PrismaClient | null);

if (process.env.NODE_ENV !== 'production' && prisma) {
  global.__prisma = prisma;
}
