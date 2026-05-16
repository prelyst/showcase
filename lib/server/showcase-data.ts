import { connectedAccounts, notifications as mockNotifications, platforms, preferences as mockPreferences, profilePosts as mockProfilePosts, profileStats as mockProfileStats } from '@/lib/mock/showcase';
import { getConnectedAccountsForUser } from '@/lib/repositories/connected-account-repository';
import { getNotificationsForUser } from '@/lib/repositories/notification-repository';
import { createDraftPost, getLatestDraftForProfile, getPostsForProfile, updatePostTargets } from '@/lib/repositories/post-repository';
import { getProfileByUserId } from '@/lib/repositories/profile-repository';
import { getUserSettings } from '@/lib/repositories/settings-repository';
import { getCurrentUserId } from '@/lib/server/auth';
import { ConnectionItem, NotificationItem, PreferenceItem, ProfilePost, ProfileStat } from '@/lib/types/showcase';

export async function getProfilePageData(): Promise<{
  displayName: string;
  slug: string;
  bio: string;
  website?: string | null;
  stats: ProfileStat[];
  posts: ProfilePost[];
}> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      displayName: 'Maya Rivera',
      slug: 'mayarivera',
      bio: 'Writer thinking about the quiet web. Books forthcoming. Slow is a feature.',
      stats: mockProfileStats,
      posts: mockProfilePosts,
    };
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return {
      displayName: 'Maya Rivera',
      slug: 'mayarivera',
      bio: 'Writer thinking about the quiet web. Books forthcoming. Slow is a feature.',
      stats: mockProfileStats,
      posts: mockProfilePosts,
    };
  }

  const posts = await getPostsForProfile(profile.id);

  return {
    displayName: profile.displayName,
    slug: profile.slug,
    bio: profile.bio ?? 'No bio yet.',
    website: profile.website,
    stats: [
      { label: 'Followers', value: '2,847' },
      { label: 'Posts', value: String(posts.length) },
      { label: 'Following', value: '312' },
    ],
    posts: posts.length
      ? posts.slice(0, 12).map((post, index) => ({
          id: post.id,
          label: `Published to ${Math.max(post.targets.filter((target) => target.enabled).length, 1)} platforms`,
          time: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(post.createdAt),
          body: post.content,
          stats: [
            `${312 - index * 18} likes`,
            `${47 - Math.min(index * 4, 28)} comments`,
            `${89 - Math.min(index * 6, 54)} reposts`,
          ],
        }))
      : mockProfilePosts,
  };
}

export async function getNotificationsPageData(): Promise<NotificationItem[]> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return mockNotifications;
  }

  const rows = await getNotificationsForUser(userId);

  if (!rows.length) {
    return mockNotifications;
  }

  return rows.map((item, index) => ({
    id: item.id,
    avatar: {
      initials: item.actorName?.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() || 'SC',
      className: index % 2 === 0 ? 'bg-[#F5E5D3] text-[#B8541F]' : 'bg-[#E5E8D4] text-[#5A6B3A]',
    },
    title: item.message,
    detail: typeof item.metadata === 'object' && item.metadata && 'detail' in item.metadata ? String(item.metadata.detail) : item.actorHandle || 'New activity in Showcase.',
    time: formatRelativeDate(item.createdAt),
    unread: !item.readAt,
  }));
}

export async function getSettingsPageData(): Promise<{
  connectedPlatforms: ConnectionItem[];
  preferenceRows: PreferenceItem[];
}> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      connectedPlatforms: connectedAccounts,
      preferenceRows: mockPreferences,
    };
  }

  const [accounts, settings] = await Promise.all([
    getConnectedAccountsForUser(userId),
    getUserSettings(userId),
  ]);

  const connectedPlatforms: ConnectionItem[] = accounts.length
    ? accounts.map((account) => ({
        platform: platforms[account.platform.toLowerCase()],
        handle: account.accountHandle,
        status: account.status === 'ACTIVE' ? ('Active' as const) : ('Inactive' as const),
        action: account.status === 'ACTIVE' ? ('Disconnect' as const) : ('Connect' as const),
      }))
    : connectedAccounts;

  const preferenceRows: PreferenceItem[] = settings
    ? [
        { label: 'Default to all platforms', description: 'New posts auto-select all connected platforms.', enabled: settings.defaultAllPlatforms },
        { label: 'Show "published via Showcase" footer', description: 'Adds a small credit line on cross-posted content. Creator tier removes it.', enabled: settings.showShowcaseFooter },
        { label: 'Web push notifications', description: 'Real-time alerts for likes, comments, follows.', enabled: settings.webPushNotifications },
        { label: 'Daily digest email', description: 'One email each morning summarizing yesterday.', enabled: settings.dailyDigestEmail },
      ]
    : mockPreferences;

  return {
    connectedPlatforms,
    preferenceRows,
  };
}

export async function getComposePageData() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      authorName: 'Maya Rivera',
      authorHandle: '@mayarivera',
      content:
        'The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. Showcase is built on a simple bet — that when you only post things you meant to say, the feed quietly gets better. #building',
      selectedTargets: ['showcase', 'x', 'linkedin', 'bluesky'],
    };
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return {
      authorName: 'Maya Rivera',
      authorHandle: '@mayarivera',
      content:
        'The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. Showcase is built on a simple bet — that when you only post things you meant to say, the feed quietly gets better. #building',
      selectedTargets: ['showcase', 'x', 'linkedin', 'bluesky'],
    };
  }

  let draft = await getLatestDraftForProfile(profile.id);

  if (!draft) {
    const createdDraft = await createDraftPost(
      {
        profileId: profile.id,
        content:
          'The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. Showcase is built on a simple bet — that when you only post things you meant to say, the feed quietly gets better. #building',
      },
      userId,
    );

    if (createdDraft) {
      await updatePostTargets({
        postId: createdDraft.id,
        targets: [
          { platform: 'SHOWCASE', enabled: true },
          { platform: 'X', enabled: true },
          { platform: 'LINKEDIN', enabled: true },
          { platform: 'BLUESKY', enabled: true },
          { platform: 'REDDIT', enabled: false },
          { platform: 'YOUTUBE', enabled: false },
          { platform: 'THREADS', enabled: false },
        ],
      });

      draft = await getLatestDraftForProfile(profile.id);
    }
  }

  return {
    authorName: profile.displayName,
    authorHandle: `@${profile.slug}`,
    content: draft?.content ?? '',
    selectedTargets: draft?.targets.filter((target) => target.enabled).map((target) => target.platform.toLowerCase()) ?? ['showcase', 'x', 'linkedin', 'bluesky'],
  };
}

function formatRelativeDate(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  return `${Math.round(diffHours / 24)}d`;
}
