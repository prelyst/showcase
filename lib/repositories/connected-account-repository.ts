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
  return upsertOAuthConnectedAccount({
    userId: input.userId,
    platform: input.platform,
    accountHandle: input.accountHandle,
    accountName: input.accountName ?? null,
    status: input.status,
  });
}

export async function upsertOAuthConnectedAccount(input: {
  userId: string;
  platform: Platform;
  accountHandle: string;
  accountName?: string | null;
  externalId?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpiresAt?: Date | null;
  scopes?: string[];
  errorMessage?: string | null;
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
      externalId: input.externalId ?? null,
      accessToken: input.accessToken ?? null,
      refreshToken: input.refreshToken ?? null,
      tokenExpiresAt: input.tokenExpiresAt ?? null,
      scopes: input.scopes ?? [],
      errorMessage: input.errorMessage ?? null,
      status: input.status,
    },
    update: {
      accountHandle: input.accountHandle,
      accountName: input.accountName ?? null,
      externalId: input.externalId ?? null,
      accessToken: input.accessToken ?? null,
      refreshToken: input.refreshToken ?? null,
      tokenExpiresAt: input.tokenExpiresAt ?? null,
      scopes: input.scopes ?? [],
      errorMessage: input.errorMessage ?? null,
      status: input.status,
    },
  });
}

export async function disconnectConnectedAccount(userId: string, platform: Platform) {
  if (!prisma) {
    return null;
  }

  return prisma.connectedAccount.upsert({
    where: {
      userId_platform: {
        userId,
        platform,
      },
    },
    create: {
      userId,
      platform,
      accountHandle: 'Not connected',
      accountName: null,
      externalId: null,
      accessToken: null,
      refreshToken: null,
      tokenExpiresAt: null,
      scopes: [],
      errorMessage: null,
      status: ConnectedAccountStatus.INACTIVE,
    },
    update: {
      accountHandle: 'Not connected',
      accountName: null,
      externalId: null,
      accessToken: null,
      refreshToken: null,
      tokenExpiresAt: null,
      scopes: [],
      errorMessage: null,
      status: ConnectedAccountStatus.INACTIVE,
    },
  });
}
