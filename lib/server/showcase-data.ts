import { connectedAccounts, creatorSuggestions, featuredCreators, feedPosts, monitorLanes, notifications as mockNotifications, platforms, preferences as mockPreferences, profilePosts as mockProfilePosts, profileStats as mockProfileStats, trendingTopics } from '@/lib/mock/showcase';
import { getConnectedAccountsForUser } from '@/lib/repositories/connected-account-repository';
import { getNotificationsForUser } from '@/lib/repositories/notification-repository';
import { createDraftPost, getLatestDraftForProfile, getPostsForProfile, updatePostTargets } from '@/lib/repositories/post-repository';
import { getProfileByUserId } from '@/lib/repositories/profile-repository';
import { getUserSettings } from '@/lib/repositories/settings-repository';
import { getCurrentUserId } from '@/lib/server/auth';
import { getCurrentUserView } from '@/lib/server/current-user';
import { ConnectionItem, CreatorSuggestion, FeedPost, MonitorData, NotificationItem, PreferenceItem, ProfilePost, ProfileStat, TrendingTopic } from '@/lib/types/showcase';

export async function getProfilePageData(): Promise<{
  displayName: string;
  slug: string;
  bio: string;
  location?: string | null;
  website?: string | null;
  isPublic: boolean;
  initials: string;
  stats: ProfileStat[];
  posts: ProfilePost[];
}> {
  const currentUser = await getCurrentUserView();
  const userId = currentUser.id;

  if (!userId) {
    return {
      displayName: currentUser.displayName,
      slug: currentUser.slug,
      bio: currentUser.bio,
      location: null,
      website: currentUser.website,
      isPublic: true,
      initials: currentUser.initials,
      stats: mockProfileStats,
      posts: mockProfilePosts,
    };
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return {
      displayName: currentUser.displayName,
      slug: currentUser.slug,
      bio: currentUser.bio,
      location: null,
      website: currentUser.website,
      isPublic: true,
      initials: currentUser.initials,
      stats: [
        { label: 'Followers', value: '0' },
        { label: 'Posts', value: '0' },
        { label: 'Following', value: '0' },
      ],
      posts: [],
    };
  }

  const posts = await getPostsForProfile(profile.id);

  return {
    displayName: profile.displayName,
    slug: profile.slug,
    bio: profile.bio ?? 'No bio yet.',
    location: profile.location,
    website: profile.website,
    isPublic: profile.isPublic,
    initials: currentUser.initials,
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
          relativeTime: formatRelativeDate(post.createdAt),
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
  const currentUser = await getCurrentUserView();
  const userId = currentUser.id;

  if (!userId) {
    return {
      draftId: null,
      authorName: currentUser.displayName,
      authorHandle: `@${currentUser.username}`,
      authorInitials: currentUser.initials,
      content:
        'The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. Showcase is built on a simple bet — that when you only post things you meant to say, the feed quietly gets better. #building',
      selectedTargets: ['showcase', 'x', 'linkedin', 'bluesky'],
    };
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return {
      draftId: null,
      authorName: currentUser.displayName,
      authorHandle: `@${currentUser.username}`,
      authorInitials: currentUser.initials,
      content:
        'Tell your first story on Showcase.',
      selectedTargets: ['showcase'],
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
    draftId: draft?.id ?? null,
    authorName: profile.displayName,
    authorHandle: `@${profile.slug}`,
    authorInitials: currentUser.initials,
    content: draft?.content ?? '',
    selectedTargets: draft?.targets.filter((target) => target.enabled).map((target) => target.platform.toLowerCase()) ?? ['showcase', 'x', 'linkedin', 'bluesky'],
  };
}

export async function getFeedPageData(): Promise<{
  posts: FeedPost[];
  trending: TrendingTopic[];
  suggestions: CreatorSuggestion[];
}> {
  const currentUser = await getCurrentUserView();
  const userId = currentUser.id;

  if (!userId) {
    return {
      posts: feedPosts,
      trending: trendingTopics,
      suggestions: creatorSuggestions,
    };
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return {
      posts: feedPosts,
      trending: trendingTopics,
      suggestions: creatorSuggestions,
    };
  }

  const posts = await getPostsForProfile(profile.id);

  const mappedPosts: FeedPost[] = posts.length
    ? posts.slice(0, 8).map((post, index) => ({
        id: post.id,
        avatar: { initials: currentUser.initials, className: 'bg-[#F5E5D3] text-[#B8541F]' },
        author: profile.displayName,
        handle: `@${profile.slug}`,
        time: formatRelativeDate(post.createdAt),
        body: post.content,
        socials: post.targets.filter((target) => target.enabled).map((target) => platforms[target.platform.toLowerCase()]).filter(Boolean),
        stats: {
          likes: String(Math.max(12, 96 - index * 7)),
          comments: String(Math.max(3, 24 - index * 2)),
          reposts: String(Math.max(1, 18 - index * 2)),
        },
      }))
    : feedPosts;

  return {
    posts: mappedPosts,
    trending: trendingTopics,
    suggestions: creatorSuggestions,
  };
}

export async function getDiscoverPageData(): Promise<{
  trending: TrendingTopic[];
  creators: CreatorSuggestion[];
}> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      trending: trendingTopics,
      creators: featuredCreators,
    };
  }

  const accounts = await getConnectedAccountsForUser(userId);

  const creators: CreatorSuggestion[] = accounts.length
    ? accounts.slice(0, 6).map((account, index) => ({
        id: account.id,
        avatar: {
          initials: account.accountName?.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() || account.accountHandle.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase() || 'SC',
          className: index % 2 === 0 ? 'bg-[#F5E5D3] text-[#B8541F]' : 'bg-[#E5E8D4] text-[#5A6B3A]',
        },
        name: account.accountName || account.accountHandle.replace(/^@/, '') || account.platform,
        handle: account.accountHandle.startsWith('@') ? account.accountHandle : `@${account.accountHandle}`,
        bio: `${account.platform} account · ${account.status === 'ACTIVE' ? 'connected and ready to publish' : 'inactive connection'}`,
        following: account.status === 'ACTIVE',
      }))
    : featuredCreators;

  return {
    trending: trendingTopics,
    creators,
  };
}

export async function getMonitorPageData(): Promise<MonitorData> {
  const currentUser = await getCurrentUserView();
  const userId = currentUser.id;

  if (!userId) {
    return {
      heroBody: '"Shipping something quiet today. A better feed, by construction."',
      heroMeta: 'Published just now',
      progressLabel: '4 / 6',
      progressWidth: '66%',
      lanes: monitorLanes,
    };
  }

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return {
      heroBody: '"Your publishing monitor will light up as soon as you save and publish a post."',
      heroMeta: 'No active jobs yet',
      progressLabel: '0 / 1',
      progressWidth: '12%',
      lanes: monitorLanes,
    };
  }

  const posts = await getPostsForProfile(profile.id);
  const latest = posts[0];

  if (!latest) {
    return {
      heroBody: '"Your publishing monitor will light up as soon as you save and publish a post."',
      heroMeta: 'No active jobs yet',
      progressLabel: '0 / 1',
      progressWidth: '12%',
      lanes: monitorLanes,
    };
  }

  const latestJob = latest.publishJobs[0];

  const lanes = latestJob?.laneResults.length
    ? latestJob.laneResults.map((lane) => ({
        id: lane.id,
        platform: platforms[lane.platform.toLowerCase()],
        detail:
          lane.externalUrl ||
          lane.errorMessage ||
          `${lane.platform.toLowerCase()} lane ${lane.status.toLowerCase()}`,
        status:
          lane.status === 'PUBLISHED'
            ? ('Published' as const)
            : lane.status === 'FAILED'
              ? ('Failed' as const)
              : ('Uploading' as const),
        elapsed: lane.finishedAt && lane.startedAt
          ? `${Math.max(1, Math.round((lane.finishedAt.getTime() - lane.startedAt.getTime()) / 1000))}s`
          : lane.startedAt
            ? `${Math.max(1, Math.round((Date.now() - lane.startedAt.getTime()) / 1000))}s`
            : '—',
        pillTone:
          lane.status === 'PUBLISHED'
            ? 'bg-[#E5E8D4] text-[#5A6B3A]'
            : lane.status === 'FAILED'
              ? 'bg-[#F2DCD1] text-[#A0381F]'
              : 'bg-[#F4E8C8] text-[#A67C1E]',
      }))
    : monitorLanes;

  const publishedCount = lanes.filter((lane) => lane.status === 'Published').length;
  const progress = lanes.length ? `${Math.max(12, Math.round((publishedCount / lanes.length) * 100))}%` : '12%';

  return {
    heroBody: `"${latest.content.slice(0, 140)}${latest.content.length > 140 ? '…' : ''}"`,
    heroMeta: `${latestJob ? latestJob.status.toLowerCase() : latest.status.toLowerCase()} · ${formatRelativeDate(latest.updatedAt)}`,
    progressLabel: `${publishedCount} / ${Math.max(lanes.length, 1)}`,
    progressWidth: progress,
    lanes,
  };
}

function formatRelativeDate(date: Date) {
  const diffMs = Math.max(0, Date.now() - date.getTime());
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }

  const diffHours = Math.max(1, Math.floor(diffMinutes / 60));

  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  return `${Math.max(1, Math.floor(diffHours / 24))}d`;
}
