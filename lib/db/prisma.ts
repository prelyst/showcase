import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function getPrismaConnectionString() {
  return process.env.DATABASE_URL || process.env.DIRECT_URL || '';
}

function createPrismaClient() {
  const connectionString = getPrismaConnectionString();

  if (!connectionString) {
    return null;
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

export const prisma = process.env.SHOWCASE_ENABLE_DB === 'true'
  ? (global.__prisma ?? createPrismaClient())
  : null;

if (process.env.NODE_ENV !== 'production' && prisma) {
  global.__prisma = prisma;
}
