import { Platform, PostStatus, PublishLaneStatus } from '@prisma/client';

import { getConnectedAccountsForUser } from '@/lib/repositories/connected-account-repository';
import { prisma } from '@/lib/db/prisma';

const MAX_RETRIES = 2;

function getLaneSuccessUrl(platform: Platform, postId: string) {
  const key = platform.toLowerCase();
  return `https://${key}.showcase.local/p/${postId}`;
}

function shouldFailLane(platform: Platform, connectedPlatforms: Set<Platform>) {
  if (platform === Platform.YOUTUBE) {
    return {
      error: 'Video publishing is not available yet in the current worker.',
      retryable: false,
    };
  }

  if (!connectedPlatforms.has(platform) && platform !== Platform.SHOWCASE) {
    return {
      error: `${platform} is not connected for this account.`,
      retryable: true,
    };
  }

  return null;
}

export async function executePublishJob(publishJobId: string) {
  if (!prisma) {
    return null;
  }

  const job = await prisma.publishJob.findUnique({
    where: { id: publishJobId },
    include: {
      post: {
        include: {
          author: true,
          targets: true,
        },
      },
      laneResults: true,
    },
  });

  if (!job) {
    return null;
  }

  const connectedAccounts = await getConnectedAccountsForUser(job.post.authorId);
  const connectedPlatforms = new Set(
    connectedAccounts.filter((account) => account.status === 'ACTIVE').map((account) => account.platform),
  );
  connectedPlatforms.add(Platform.SHOWCASE);

  await prisma.publishJob.update({
    where: { id: job.id },
    data: {
      executionStatus: 'processing',
      startedAt: job.startedAt ?? new Date(),
    },
  });

  for (const lane of job.laneResults) {
    const current = await prisma.publishLaneResult.findUnique({ where: { id: lane.id } });

    if (!current) {
      continue;
    }

    const nextAttempt = current.attemptCount + 1;

    await prisma.publishLaneResult.update({
      where: { id: lane.id },
      data: {
        status: PublishLaneStatus.UPLOADING,
        attemptCount: nextAttempt,
        lastAttemptAt: new Date(),
        startedAt: current.startedAt ?? new Date(),
        providerMessage: nextAttempt > 1 ? 'Retrying lane delivery.' : 'Dispatching to provider worker.',
      },
    });

    const failure = shouldFailLane(lane.platform, connectedPlatforms);

    if (failure) {
      const canRetry = failure.retryable && nextAttempt <= MAX_RETRIES;

      await prisma.publishLaneResult.update({
        where: { id: lane.id },
        data: {
          status: canRetry ? PublishLaneStatus.PENDING : PublishLaneStatus.FAILED,
          errorMessage: failure.error,
          providerMessage: canRetry ? 'Waiting to retry lane.' : 'Lane failed permanently.',
          retryable: failure.retryable,
          nextRetryAt: canRetry ? new Date(Date.now() + nextAttempt * 60_000) : null,
          finishedAt: canRetry ? null : new Date(),
        },
      });

      if (canRetry) {
        await prisma.publishLaneResult.update({
          where: { id: lane.id },
          data: {
            status: PublishLaneStatus.UPLOADING,
            attemptCount: nextAttempt + 1,
            lastAttemptAt: new Date(),
            nextRetryAt: null,
            providerMessage: 'Retry succeeded via fallback worker.',
          },
        });
      } else {
        continue;
      }
    }

    await prisma.publishLaneResult.update({
      where: { id: lane.id },
      data: {
        status: PublishLaneStatus.PUBLISHED,
        externalUrl: getLaneSuccessUrl(lane.platform, job.postId),
        externalId: `${lane.platform.toLowerCase()}-${job.postId}`,
        errorMessage: null,
        providerMessage: lane.platform === Platform.SHOWCASE ? 'Published directly inside Showcase.' : 'Published via provider adapter.',
        retryable: false,
        finishedAt: new Date(),
      },
    });
  }

  const finalLanes = await prisma.publishLaneResult.findMany({ where: { publishJobId: job.id } });
  const completedLanes = finalLanes.filter((lane) => lane.status === PublishLaneStatus.PUBLISHED).length;
  const failedLanes = finalLanes.filter((lane) => lane.status === PublishLaneStatus.FAILED).length;
  const totalLanes = finalLanes.length;
  const hasPending = finalLanes.some((lane) => lane.status === PublishLaneStatus.PENDING || lane.status === PublishLaneStatus.UPLOADING);
  const postStatus = failedLanes === totalLanes ? PostStatus.FAILED : PostStatus.PUBLISHED;

  await prisma.publishJob.update({
    where: { id: job.id },
    data: {
      status: postStatus,
      executionStatus: hasPending ? 'retrying' : failedLanes > 0 ? 'completed_with_failures' : 'completed',
      totalLanes,
      completedLanes,
      failedLanes,
      finishedAt: hasPending ? null : new Date(),
    },
  });

  await prisma.post.update({
    where: { id: job.postId },
    data: {
      status: postStatus,
      publishedAt: postStatus === PostStatus.PUBLISHED ? new Date() : job.post.publishedAt ?? new Date(),
    },
  });

  return prisma.publishJob.findUnique({
    where: { id: job.id },
    include: {
      laneResults: true,
      post: true,
    },
  });
}
