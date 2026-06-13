import { ConnectedAccount, ConnectedAccountStatus, Platform, PostStatus, PublishLaneStatus } from '@prisma/client';

import { getConnectedAccountsForUser, upsertOAuthConnectedAccount } from '@/lib/repositories/connected-account-repository';
import { getOAuthProviderByPlatform } from '@/lib/oauth/providers';
import { refreshOAuthToken } from '@/lib/oauth/token-client';
import { postToLinkedIn } from '@/lib/publish/adapters/linkedin';
import { postToThreads } from '@/lib/publish/adapters/threads';
import { postToX } from '@/lib/publish/adapters/x';
import { prisma } from '@/lib/db/prisma';

function getLaneSuccessUrl(platform: Platform, postId: string) {
  const key = platform.toLowerCase();
  return `https://${key}.showcase.local/p/${postId}`;
}

/** Returns a usable access token for the account, refreshing it if near expiry. */
async function getValidAccessToken(account: ConnectedAccount) {
  if (!account.accessToken) {
    throw new Error(`${account.platform} is not connected for this account.`);
  }

  const provider = getOAuthProviderByPlatform(account.platform);
  const expiresSoon = account.tokenExpiresAt ? account.tokenExpiresAt.getTime() - Date.now() < 60_000 : false;

  if (expiresSoon && account.refreshToken && provider) {
    const refreshed = await refreshOAuthToken(provider, account.refreshToken);
    await upsertOAuthConnectedAccount({
      userId: account.userId,
      platform: account.platform,
      accountHandle: account.accountHandle,
      accountName: account.accountName,
      externalId: account.externalId,
      status: ConnectedAccountStatus.ACTIVE,
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken,
      tokenExpiresAt: refreshed.tokenExpiresAt,
      scopes: refreshed.scopes,
      errorMessage: null,
    });
    return refreshed.accessToken;
  }

  return account.accessToken;
}

/**
 * Delivers one lane to its platform. Returns the real external URL/id on
 * success, or throws so the caller can mark the lane failed.
 */
async function deliverLane(
  platform: Platform,
  account: ConnectedAccount | undefined,
  text: string,
  postId: string,
): Promise<{ externalUrl: string; externalId: string; message: string }> {
  if (platform === Platform.SHOWCASE) {
    return { externalUrl: getLaneSuccessUrl(platform, postId), externalId: `showcase-${postId}`, message: 'Published directly inside Showcase.' };
  }

  if (platform === Platform.YOUTUBE) {
    throw new Error('Video publishing is not available yet in the current worker.');
  }

  if (!account) {
    throw new Error(`${platform} is not connected for this account.`);
  }

  if (platform === Platform.X) {
    const accessToken = await getValidAccessToken(account);
    const result = await postToX(accessToken, text, account.accountHandle);
    return { externalUrl: result.url, externalId: result.id, message: 'Published to X.' };
  }

  if (platform === Platform.LINKEDIN) {
    if (!account.externalId) {
      throw new Error('LinkedIn member id missing — reconnect LinkedIn to enable publishing.');
    }
    const accessToken = await getValidAccessToken(account);
    const result = await postToLinkedIn(accessToken, text, account.externalId);
    return { externalUrl: result.url, externalId: result.id, message: 'Published to LinkedIn.' };
  }

  if (platform === Platform.THREADS) {
    if (!account.externalId) {
      throw new Error('Threads user id missing — reconnect Threads to enable publishing.');
    }
    const accessToken = await getValidAccessToken(account);
    const result = await postToThreads(accessToken, text, account.externalId);
    return { externalUrl: result.url, externalId: result.id, message: 'Published to Threads.' };
  }

  // No live adapter yet for this platform — simulated delivery (demo only).
  return { externalUrl: getLaneSuccessUrl(platform, postId), externalId: `${platform.toLowerCase()}-${postId}`, message: 'Simulated provider delivery (no live adapter yet).' };
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
  const accountsByPlatform = new Map(
    connectedAccounts.filter((account) => account.status === ConnectedAccountStatus.ACTIVE).map((account) => [account.platform, account]),
  );
  const text = job.post.content;

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

    await prisma.publishLaneResult.update({
      where: { id: lane.id },
      data: {
        status: PublishLaneStatus.UPLOADING,
        attemptCount: current.attemptCount + 1,
        lastAttemptAt: new Date(),
        startedAt: current.startedAt ?? new Date(),
        providerMessage: 'Dispatching to provider worker.',
      },
    });

    try {
      const result = await deliverLane(lane.platform, accountsByPlatform.get(lane.platform), text, job.postId);

      await prisma.publishLaneResult.update({
        where: { id: lane.id },
        data: {
          status: PublishLaneStatus.PUBLISHED,
          externalUrl: result.externalUrl,
          externalId: result.externalId,
          errorMessage: null,
          providerMessage: result.message,
          retryable: false,
          finishedAt: new Date(),
        },
      });
    } catch (error) {
      // Do not auto-retry real deliveries — a retry could double-post.
      await prisma.publishLaneResult.update({
        where: { id: lane.id },
        data: {
          status: PublishLaneStatus.FAILED,
          errorMessage: error instanceof Error ? error.message : 'Lane delivery failed.',
          providerMessage: 'Lane failed permanently.',
          retryable: false,
          nextRetryAt: null,
          finishedAt: new Date(),
        },
      });
    }
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
