import { ConnectedAccountStatus } from '@prisma/client';

import { platforms } from '@/lib/mock/showcase';
import { createDraftPost, getLatestDraftForProfile, updatePostTargets } from '@/lib/repositories/post-repository';
import { getOAuthProviderByPlatform, isOAuthProviderConfigured } from '@/lib/oauth/providers';
import { getCurrentUserId } from '@/lib/server/auth';
import { getShowcaseSessionData } from '@/lib/server/showcase-session';
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
  const { currentUser, profile, posts } = await getShowcaseSessionData();

  if (!currentUser) {
    return {
      displayName: 'Guest',
      slug: 'guest',
      bio: 'Sign in to create your Showcase profile.',
      location: null,
      website: null,
      isPublic: true,
      initials: '?',
      stats: [],
      posts: [],
    };
  }

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

  return {
    displayName: profile.displayName,
    slug: profile.slug,
    bio: profile.bio ?? 'No bio yet.',
    location: profile.location,
    website: profile.website,
    isPublic: profile.isPublic,
    initials: currentUser.initials,
    stats: [
      { label: 'Followers', value: '0' },
      { label: 'Posts', value: String(posts.length) },
      { label: 'Following', value: '0' },
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
      : [],
  };
}

export async function getNotificationsPageData(): Promise<NotificationItem[]> {
  const { currentUser, notifications: rows } = await getShowcaseSessionData();

  if (!currentUser) {
    return [];
  }

  if (!rows.length) {
    return [];
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
  const { currentUser, connectedAccounts: accounts, settings } = await getShowcaseSessionData();

  if (!currentUser) {
    return {
      connectedPlatforms: [],
      preferenceRows: [],
    };
  }

  const connectedPlatforms: ConnectionItem[] = accounts.length
    ? accounts.map((account) => {
        const provider = getOAuthProviderByPlatform(account.platform);
        const isConfigured = provider ? isOAuthProviderConfigured(provider) : account.platform === 'SHOWCASE';
        const status = account.status === ConnectedAccountStatus.ACTIVE
          ? ('Active' as const)
          : account.status === ConnectedAccountStatus.ERROR
            ? ('Error' as const)
            : isConfigured
              ? ('Inactive' as const)
              : ('Setup required' as const);

        return {
          platform: platforms[account.platform.toLowerCase()],
          handle: account.accountHandle,
          status,
          action: account.status === 'ACTIVE' ? ('Disconnect' as const) : ('Connect' as const),
          actionHref: account.status === 'ACTIVE' ? undefined : provider ? `/auth/oauth/${provider.key}/start` : undefined,
          detail: account.errorMessage ?? (!isConfigured && provider ? `${provider.label} OAuth env vars are missing.` : undefined),
        };
      })
    : [];

  const preferenceRows: PreferenceItem[] = settings
    ? [
        { label: 'Default to all platforms', description: 'New posts auto-select all connected platforms.', enabled: settings.defaultAllPlatforms },
        { label: 'Show "published via Showcase" footer', description: 'Adds a small credit line on cross-posted content. Creator tier removes it.', enabled: settings.showShowcaseFooter },
        { label: 'Web push notifications', description: 'Real-time alerts for likes, comments, follows.', enabled: settings.webPushNotifications },
        { label: 'Daily digest email', description: 'One email each morning summarizing yesterday.', enabled: settings.dailyDigestEmail },
      ]
    : [];

  return {
    connectedPlatforms,
    preferenceRows,
  };
}

export async function getComposePageData() {
  const { currentUser, profile } = await getShowcaseSessionData();

  if (!currentUser) {
    return {
      draftId: null,
      authorName: 'Guest',
      authorHandle: '@guest',
      authorInitials: '?',
      content: 'Sign in to start composing on Showcase.',
      selectedTargets: ['showcase'],
    };
  }

  const userId = currentUser.id;

  if (!profile) {
    return {
      draftId: null,
      authorName: currentUser.displayName,
      authorHandle: `@${currentUser.username}`,
      authorInitials: currentUser.initials,
      content: 'Tell your first story on Showcase.',
      selectedTargets: ['showcase'],
    };
  }

  const draft = await getLatestDraftForProfile(profile.id);

  return {
    draftId: draft?.id ?? null,
    authorName: profile.displayName,
    authorHandle: `@${profile.slug}`,
    authorInitials: currentUser.initials,
    content: draft?.content ?? '',
    selectedTargets: draft?.targets.filter((target) => target.enabled).map((target) => target.platform.toLowerCase()) ?? ['showcase'],
  };
}

export async function getFeedPageData(): Promise<{
  posts: FeedPost[];
  trending: TrendingTopic[];
  suggestions: CreatorSuggestion[];
}> {
  const { currentUser, profile, posts } = await getShowcaseSessionData();

  if (!currentUser) {
    return {
      posts: [],
      trending: [],
      suggestions: [],
    };
  }

  const userId = currentUser.id;

  if (!profile) {
    return {
      posts: [],
      trending: [],
      suggestions: [],
    };
  }

  const mappedPosts: FeedPost[] = posts.length
    ? posts.slice(0, 8).map((post, index) => {
        const latestJob = post.publishJobs[0];
        const publishedCount = latestJob?.laneResults.filter((lane) => lane.status === 'PUBLISHED').length ?? 0;
        const totalCount = latestJob?.laneResults.length ?? post.targets.filter((target) => target.enabled).length;

        return {
          id: post.id,
          avatar: { initials: currentUser.initials, className: 'bg-[#F5E5D3] text-[#B8541F]' },
          author: profile.displayName,
          handle: `@${profile.slug}`,
          time: formatRelativeDate(post.createdAt),
          body: post.content,
          hashtags: latestJob?.failedLanes ? [`#${publishedCount}of${Math.max(totalCount, 1)}-lanes`] : undefined,
          socials: post.targets.filter((target) => target.enabled).map((target) => platforms[target.platform.toLowerCase()]).filter(Boolean),
          stats: {
            likes: String(Math.max(12, 96 - index * 7)),
            comments: String(Math.max(3, 24 - index * 2)),
            reposts: String(Math.max(1, 18 - index * 2)),
          },
        };
      })
    : [];

  return {
    posts: mappedPosts,
    trending: [],
    suggestions: [],
  };
}

export async function getDiscoverPageData(): Promise<{
  trending: TrendingTopic[];
  creators: CreatorSuggestion[];
}> {
  const { currentUser, connectedAccounts: accounts } = await getShowcaseSessionData();

  if (!currentUser) {
    return {
      trending: [],
      creators: [],
    };
  }

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
    : [];

  return {
    trending: [],
    creators,
  };
}

export async function getMonitorPageData(): Promise<MonitorData> {
  const { currentUser, profile, posts } = await getShowcaseSessionData();

  if (!currentUser) {
    return {
      heroBody: '"Sign in to monitor your published posts."',
      heroMeta: 'Unauthenticated view',
      progressLabel: '0 / 1',
      progressWidth: '12%',
      summary: 'Sign in to track your delivery lanes',
      lanes: [],
    };
  }

  const userId = currentUser.id;

  if (!profile) {
    return {
      heroBody: '"Your publishing monitor will light up as soon as you save and publish a post."',
      heroMeta: 'No active jobs yet',
      progressLabel: '0 / 1',
      progressWidth: '12%',
      summary: '0 failed · 0 in flight',
      lanes: [],
    };
  }

  const latest = posts[0];

  if (!latest) {
    return {
      heroBody: '"Your publishing monitor will light up as soon as you save and publish a post."',
      heroMeta: 'No active jobs yet',
      progressLabel: '0 / 1',
      progressWidth: '12%',
      summary: '0 failed · 0 in flight',
      lanes: [],
    };
  }

  const latestJob = latest.publishJobs[0];

  const lanes = latestJob?.laneResults.length
    ? latestJob.laneResults.map((lane) => ({
        id: lane.id,
        platform: platforms[lane.platform.toLowerCase()],
        detail:
          lane.externalUrl ||
          lane.providerMessage ||
          lane.errorMessage ||
          `${lane.platform.toLowerCase()} lane ${lane.status.toLowerCase()}`,
        status:
          lane.status === 'PUBLISHED'
            ? ('Published' as const)
            : lane.status === 'FAILED'
              ? ('Failed' as const)
              : lane.status === 'PENDING'
                ? ('Queued' as const)
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
              : lane.status === 'PENDING'
                ? 'bg-[#E8E3D4] text-[#6F685B]'
                : 'bg-[#F4E8C8] text-[#A67C1E]',
        attempts: lane.attemptCount,
        retryNote: lane.nextRetryAt
          ? `Retry scheduled · ${formatRelativeDate(lane.nextRetryAt)}`
          : lane.attemptCount > 1
            ? `Recovered after ${lane.attemptCount} attempts`
            : undefined,
      }))
    : [];

  const publishedCount = lanes.filter((lane) => lane.status === 'Published').length;
  const failedCount = lanes.filter((lane) => lane.status === 'Failed').length;
  const queuedCount = lanes.filter((lane) => lane.status === 'Queued' || lane.status === 'Uploading').length;
  const progress = lanes.length ? `${Math.max(12, Math.round((publishedCount / lanes.length) * 100))}%` : '12%';

  return {
    heroBody: `"${latest.content.slice(0, 140)}${latest.content.length > 140 ? '…' : ''}"`,
    heroMeta: `${latestJob ? latestJob.executionStatus.replaceAll('_', ' ') : latest.status.toLowerCase()} · ${formatRelativeDate(latest.updatedAt)}`,
    progressLabel: `${publishedCount} / ${Math.max(lanes.length, 1)}`,
    progressWidth: progress,
    summary: `${failedCount} failed · ${queuedCount} in flight`,
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
