import { ConnectedAccountStatus, Platform } from '@prisma/client';

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

export async function upsertConnectedAccount(input: {
  userId: string;
  platform: Platform;
  accountHandle: string;
  accountName?: string | null;
  status: ConnectedAccountStatus;
}) {
  if (!prisma) {
    return null;
  }

  return prisma.connectedAccount.upsert({
    where: {
      userId_platform: {
        userId: input.userId,
        platform: input.platform,
      },
    },
    create: {
      userId: input.userId,
      platform: input.platform,
      accountHandle: input.accountHandle,
      accountName: input.accountName ?? null,
      status: input.status,
    },
    update: {
      accountHandle: input.accountHandle,
      accountName: input.accountName ?? null,
      status: input.status,
    },
  });
}
