import { prisma } from '@/lib/db/prisma';

export async function isProfileSlugTaken(slug: string, excludeUserId?: string) {
  if (!prisma) {
    return false;
  }

  const existing = await prisma.profile.findUnique({
    where: { slug },
    select: { userId: true },
  });

  if (!existing) {
    return false;
  }

  return excludeUserId ? existing.userId !== excludeUserId : true;
}

export async function createProfile(input: {
  userId: string;
  displayName: string;
  slug: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  isPublic?: boolean;
}) {
  if (!prisma) {
    return null;
  }

  return prisma.profile.create({
    data: {
      userId: input.userId,
      displayName: input.displayName,
      slug: input.slug,
      bio: input.bio ?? null,
      location: input.location ?? null,
      website: input.website ?? null,
      isPublic: input.isPublic ?? true,
    },
    include: {
      user: true,
    },
  });
}

export async function getProfileBySlug(slug: string) {
  if (!prisma) {
    return null;
  }

  return prisma.profile.findUnique({
    where: { slug },
    include: {
      user: true,
      posts: {
        orderBy: { createdAt: 'desc' },
        take: 12,
        include: {
          targets: true,
        },
      },
    },
  });
}

export async function getPublicProfiles(excludeUserId?: string, limit = 6) {
  if (!prisma) {
    return [];
  }

  return prisma.profile.findMany({
    where: {
      isPublic: true,
      ...(excludeUserId ? { userId: { not: excludeUserId } } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      displayName: true,
      slug: true,
      bio: true,
    },
  });
}

export async function getProfileByUserId(userId: string) {
  if (!prisma) {
    return null;
  }

  return prisma.profile.findUnique({
    where: { userId },
    include: {
      user: true,
    },
  });
}

export async function updateProfileByUserId(userId: string, data: {
  displayName: string;
  slug: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  isPublic: boolean;
}) {
  if (!prisma) {
    return null;
  }

  return prisma.profile.update({
    where: { userId },
    data: {
      displayName: data.displayName,
      slug: data.slug,
      bio: data.bio ?? null,
      location: data.location ?? null,
      website: data.website ?? null,
      isPublic: data.isPublic,
    },
    include: {
      user: true,
    },
  });
}
