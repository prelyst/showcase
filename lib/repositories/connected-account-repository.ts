import { prisma } from '@/lib/db/prisma';

export async function getConnectedAccountsForUser(userId: string) {
  if (!prisma) {
    return [];
  }

  return prisma.connectedAccount.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  });
}
