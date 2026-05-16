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
