import { prisma } from '@/lib/db/prisma';

export async function getProfileBySlug(slug: string) {
  return prisma.profile.findUnique({
    where: { slug },
    include: {
      user: true,
      posts: {
        orderBy: { createdAt: 'desc' },
        take: 12,
      },
    },
  });
}

export async function getProfileByUserId(userId: string) {
  return prisma.profile.findUnique({
    where: { userId },
    include: {
      user: true,
    },
  });
}
