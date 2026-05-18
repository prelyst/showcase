import { Platform, PostStatus, PublishLaneStatus } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';
import { executePublishJob } from '@/lib/publish/executor';
import { CreateDraftPostInput, UpdateDraftPostInput, UpdatePostTargetsInput } from '@/lib/validators/post';

export async function createDraftPost(input: CreateDraftPostInput, authorId: string) {
  if (!prisma) {
    return null;
  }

  return prisma.post.create({
    data: {
      authorId,
      profileId: input.profileId,
      content: input.content,
      status: 'DRAFT',
    },
    include: {
      targets: true,
    },
  });
}

export async function updateDraftPost(input: UpdateDraftPostInput) {
  if (!prisma) {
    return null;
  }

  return prisma.post.update({
    where: { id: input.postId },
    data: {
      content: input.content,
    },
  });
}

export async function updatePostTargets(input: UpdatePostTargetsInput) {
  if (!prisma) {
    return [];
  }

  const client = prisma;

  return client.$transaction(
    input.targets.map((target) =>
      client.postPlatformTarget.upsert({
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
  if (!prisma) {
    return [];
  }

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

export async function getLatestDraftForProfile(profileId: string) {
  if (!prisma) {
    return null;
  }

  return prisma.post.findFirst({
    where: {
      profileId,
      status: 'DRAFT',
    },
    orderBy: { updatedAt: 'desc' },
    include: {
      targets: true,
    },
  });
}

export async function publishPost(postId: string) {
  if (!prisma) {
    return null;
  }

  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      status: PostStatus.PUBLISHING,
      publishedAt: new Date(),
    },
    include: {
      targets: true,
    },
  });

  const enabledTargets = post.targets.filter((target) => target.enabled);

  const publishJob = await prisma.publishJob.create({
    data: {
      postId: post.id,
      status: PostStatus.PUBLISHING,
      executionStatus: 'queued',
      totalLanes: enabledTargets.length,
      completedLanes: 0,
      failedLanes: 0,
      startedAt: new Date(),
      laneResults: {
        create: enabledTargets.map((target) => ({
          platform: target.platform,
          status: PublishLaneStatus.PENDING,
          attemptCount: 0,
          retryable: target.platform !== Platform.SHOWCASE,
        })),
      },
    },
    include: {
      laneResults: true,
    },
  });

  return executePublishJob(publishJob.id);
}
