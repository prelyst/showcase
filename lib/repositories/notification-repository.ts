import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';

export async function getNotificationsForUser(userId: string) {
  if (!prisma) {
    return [];
  }

  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
}

export async function createNotification(input: {
  userId: string;
  type: string;
  actorName?: string | null;
  actorHandle?: string | null;
  actorAvatar?: string | null;
  message: string;
  metadata?: Prisma.InputJsonValue | null;
}) {
  if (!prisma) {
    return null;
  }

  return prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      actorName: input.actorName ?? null,
      actorHandle: input.actorHandle ?? null,
      actorAvatar: input.actorAvatar ?? null,
      message: input.message,
      metadata: input.metadata ?? undefined,
    },
  });
}

export async function markNotificationRead(notificationId: string, userId: string) {
  if (!prisma) {
    return null;
  }

  return prisma.notification.update({
    where: { id: notificationId },
    data: {
      readAt: new Date(),
    },
  });
}

export async function markAllNotificationsRead(userId: string) {
  if (!prisma) {
    return { count: 0 };
  }

  return prisma.notification.updateMany({
    where: {
      userId,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });
}
