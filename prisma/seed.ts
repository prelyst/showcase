import { ConnectedAccountStatus, Platform, PostStatus } from '@prisma/client';

import { DEMO_PROFILE_SLUG, DEMO_USER_ID } from '@/lib/constants/demo-user';
import { prisma } from '@/lib/db/prisma';

async function main() {
  if (!prisma) {
    throw new Error('Prisma is not enabled. Set SHOWCASE_ENABLE_DB=true and provide a working DATABASE_URL before seeding.');
  }

  const user = await prisma.user.upsert({
    where: { email: 'maya@showcase.app' },
    update: {
      name: 'Maya Rivera',
      username: 'mayarivera',
    },
    create: {
      id: DEMO_USER_ID,
      email: 'maya@showcase.app',
      name: 'Maya Rivera',
      username: 'mayarivera',
      image: null,
    },
  });

  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      displayName: 'Maya Rivera',
      slug: DEMO_PROFILE_SLUG,
      bio: 'Writer thinking about the quiet web. Books forthcoming. Slow is a feature.',
      location: 'Chennai',
      website: 'https://showcase.app/@mayarivera',
      isPublic: true,
    },
    create: {
      userId: user.id,
      displayName: 'Maya Rivera',
      slug: DEMO_PROFILE_SLUG,
      bio: 'Writer thinking about the quiet web. Books forthcoming. Slow is a feature.',
      location: 'Chennai',
      website: 'https://showcase.app/@mayarivera',
      isPublic: true,
    },
  });

  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: {
      defaultAllPlatforms: true,
      showShowcaseFooter: true,
      webPushNotifications: false,
      dailyDigestEmail: true,
    },
    create: {
      userId: user.id,
      defaultAllPlatforms: true,
      showShowcaseFooter: true,
      webPushNotifications: false,
      dailyDigestEmail: true,
    },
  });

  const connectedAccounts = [
    { platform: Platform.X, accountHandle: '@mayarivera', accountName: 'Maya Rivera', status: ConnectedAccountStatus.ACTIVE },
    { platform: Platform.LINKEDIN, accountHandle: 'maya-rivera-writer', accountName: 'Maya Rivera', status: ConnectedAccountStatus.ACTIVE },
    { platform: Platform.BLUESKY, accountHandle: 'mayarivera.bsky.social', accountName: 'Maya Rivera', status: ConnectedAccountStatus.ACTIVE },
    { platform: Platform.REDDIT, accountHandle: 'u/mayarivera', accountName: 'Maya Rivera', status: ConnectedAccountStatus.ACTIVE },
    { platform: Platform.YOUTUBE, accountHandle: 'Not connected', accountName: 'YouTube', status: ConnectedAccountStatus.INACTIVE },
    { platform: Platform.THREADS, accountHandle: 'Not connected', accountName: 'Threads', status: ConnectedAccountStatus.INACTIVE },
  ];

  for (const account of connectedAccounts) {
    await prisma.connectedAccount.upsert({
      where: {
        userId_platform: {
          userId: user.id,
          platform: account.platform,
        },
      },
      update: account,
      create: {
        userId: user.id,
        ...account,
      },
    });
  }

  const notifications = [
    {
      id: 'notif-seed-1',
      type: 'like',
      actorName: 'Elena Kowalski',
      actorHandle: '@elenakowalski',
      message: 'Elena Kowalski liked your post',
      metadata: { detail: '"The thing I keep coming back to: most social platforms reward volume…"' },
      readAt: null,
    },
    {
      id: 'notif-seed-2',
      type: 'follow',
      actorName: 'Priya Rajan',
      actorHandle: '@priya.writes',
      message: 'Priya Rajan started following you',
      metadata: { detail: 'Essays on creative practice. Newsletter on substack.' },
      readAt: null,
    },
    {
      id: 'notif-seed-3',
      type: 'reply',
      actorName: 'James Tam',
      actorHandle: '@jtam',
      message: 'James Tam replied to your comment',
      metadata: { detail: '"Agreed — the default-on behavior is the whole point."' },
      readAt: new Date(),
    },
  ];

  for (const notification of notifications) {
    await prisma.notification.upsert({
      where: { id: notification.id },
      update: {
        ...notification,
        userId: user.id,
      },
      create: {
        ...notification,
        userId: user.id,
      },
    });
  }

  const draft = await prisma.post.upsert({
    where: { id: 'post-seed-draft-1' },
    update: {
      content:
        'The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. Showcase is built on a simple bet — that when you only post things you meant to say, the feed quietly gets better. #building',
      status: PostStatus.DRAFT,
      profileId: profile.id,
      authorId: user.id,
    },
    create: {
      id: 'post-seed-draft-1',
      authorId: user.id,
      profileId: profile.id,
      content:
        'The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. Showcase is built on a simple bet — that when you only post things you meant to say, the feed quietly gets better. #building',
      status: PostStatus.DRAFT,
      visibility: 'public',
    },
  });

  const targetStates = [
    { platform: Platform.SHOWCASE, enabled: true },
    { platform: Platform.X, enabled: true },
    { platform: Platform.LINKEDIN, enabled: true },
    { platform: Platform.BLUESKY, enabled: true },
    { platform: Platform.REDDIT, enabled: false },
    { platform: Platform.YOUTUBE, enabled: false },
    { platform: Platform.THREADS, enabled: false },
  ];

  for (const target of targetStates) {
    await prisma.postPlatformTarget.upsert({
      where: {
        postId_platform: {
          postId: draft.id,
          platform: target.platform,
        },
      },
      update: target,
      create: {
        postId: draft.id,
        ...target,
      },
    });
  }

  console.log('Seeded Showcase demo data');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
  });
