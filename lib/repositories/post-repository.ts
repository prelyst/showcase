import { Platform, Prisma } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';
import { CreateDraftPostInput, UpdateDraftPostInput, UpdatePostTargetsInput } from '@/lib/validators/post';

export async function createDraftPost(input: CreateDraftPostInput, authorId: string) {
  return prisma.post.create({
    data: {
      authorId,
      profileId: input.profileId,
      content: input.content,
      status: 'DRAFT',
    },
  });
}

export async function updateDraftPost(input: UpdateDraftPostInput) {
  return prisma.post.update({
    where: { id: input.postId },
    data: {
      content: input.content,
    },
  });
}

export async function updatePostTargets(input: UpdatePostTargetsInput) {
  return prisma.$transaction(
    input.targets.map((target) =>
      prisma.postPlatformTarget.upsert({
        where: {
          postId_platform: {
            postId: input.postId,
            platform: target.platform as Platform,
          },
        },
        create: {
          postId: input.postId,
          platform: target.platform as Platform,
          enabled: target.enabled,
        },
        update: {
          enabled: target.enabled,
        },
      })
    )
  );
}

export async function getPostsForProfile(profileId: string) {
  return prisma.post.findMany({
    where: { profileId },
    orderBy: { createdAt: 'desc' },
    include: {
      targets: true,
      publishJobs: {
        include: {
          laneResults: true,
        },
      },
    },
  });
}
