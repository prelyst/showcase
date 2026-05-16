import { prisma } from '@/lib/db/prisma';

export async function getUserSettings(userId: string) {
  if (!prisma) {
    return null;
  }

  return prisma.userSettings.findUnique({
    where: { userId },
  });
}

export async function upsertUserSettings(userId: string, data: {
  defaultAllPlatforms: boolean;
  showShowcaseFooter: boolean;
  webPushNotifications: boolean;
  dailyDigestEmail: boolean;
}) {
  if (!prisma) {
    return null;
  }

  return prisma.userSettings.upsert({
    where: { userId },
    create: {
      userId,
      ...data,
    },
    update: data,
  });
}
