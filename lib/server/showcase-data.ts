import { ConnectedAccountStatus, Platform } from '@prisma/client';

import { platforms } from '@/lib/mock/showcase';
import { getEnabledTargetCountsForProfile, getLatestDraftForProfile } from '@/lib/repositories/post-repository';
import { getPublicProfiles } from '@/lib/repositories/profile-repository';
import { getOAuthProviderByPlatform, isOAuthProviderConfigured } from '@/lib/oauth/providers';
import { getShowcaseSessionData } from '@/lib/server/showcase-session';
import { AvatarTone, ConnectionItem, CreatorSuggestion, FeedPost, MonitorData, NotificationItem, PreferenceItem, ProfileFilter, ProfilePost, ProfileStat, TrendingTopic } from '@/lib/types/showcase';

const FILTER_PLATFORMS: { label: string; platform: Platform }[] = [
  { label: 'Showcase', platform: Platform.SHOWCASE },
  { label: 'X', platform: Platform.X },
  { label: 'LinkedIn', platform: Platform.LINKEDIN },
  { label: 'Bluesky', platform: Platform.BLUESKY },
  { label: 'Reddit', platform: Platform.REDDIT },
  { label: 'Threads', platform: Platform.THREADS },
];

/** Real per-platform post counts from enabled publish targets. */
function buildProfileFilters(total: number, counts: Map<Platform, number>): ProfileFilter[] {
  return [
    { label: 'All', count: String(total) },
    ...FILTER_PLATFORMS.map(({ label, platform }) => ({ label, count: String(counts.get(platform) ?? 0) })),
  ];
}

const EMPTY_FILTERS = buildProfileFilters(0, new Map());

/** Two-tone avatar palette used consistently across surfaces. */
function avatarTone(seed: string, initials: string): AvatarTone {
  const code = seed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const className = code % 2 === 0 ? 'bg-accent-tint text-accent' : 'bg-sage-tint text-sage';
  return { initials: initials.toUpperCase() || 'SC', className };
}

function initialsFrom(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** Real trending: count #hashtags that actually appear in the given post bodies. */
function aggregateTrending(contents: string[]): TrendingTopic[] {
  const counts = new Map<string, number>();

  for (const content of contents) {
    const matches = content.match(/#[\p{L}\p{N}_]+/gu) ?? [];
    const seen = new Set<string>();
    for (const raw of matches) {
      const tag = raw.toLowerCase();
      if (seen.has(tag)) continue; // count once per post
      seen.add(tag);
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag, count], index) => ({
      rank: String(index + 1).padStart(2, '0'),
      tag,
      count: `${count} ${count === 1 ? 'post' : 'posts'}`,
    }));
}

export async function getProfilePageData(): Promise<{
  displayName: string;
  slug: string;
  bio: string;
  location?: string | null;
  website?: string | null;
  isPublic: boolean;
  initials: string;
  stats: ProfileStat[];
  filters: ProfileFilter[];
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
      filters: EMPTY_FILTERS,
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
        { label: 'Posts', value: '0' },
        { label: 'Published', value: '0' },
        { label: 'Drafts', value: '0' },
      ],
      filters: EMPTY_FILTERS,
      posts: [],
    };
  }

  const publishedCount = posts.filter((post) => post.status === 'PUBLISHED').length;
  const draftCount = posts.filter((post) => post.status === 'DRAFT').length;
  const targetCounts = await getEnabledTargetCountsForProfile(profile.id);

  return {
    displayName: profile.displayName,
    slug: profile.slug,
    bio: profile.bio ?? 'No bio yet.',
    location: profile.location,
    website: profile.website,
    isPublic: profile.isPublic,
    initials: currentUser.initials,
    filters: buildProfileFilters(posts.length, targetCounts),
    // Real counts derived from the user's own posts — no follower/engagement fiction.
    stats: [
      { label: 'Posts', value: String(posts.length) },
      { label: 'Published', value: String(publishedCount) },
      { label: 'Drafts', value: String(draftCount) },
    ],
    posts: posts.length
      ? posts.slice(0, 12).map((post) => {
          const delivery = deliveryFor(post);
          return {
            id: post.id,
            label: `${delivery.total} ${delivery.total === 1 ? 'platform' : 'platforms'}`,
            time: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(post.createdAt),
            relativeTime: formatRelativeDate(post.createdAt),
            body: post.content,
            // Real signals: post status + actual lane delivery, not invented engagement.
            stats: [statusLabel(post.status), `${delivery.published}/${delivery.total} delivered`],
          };
        })
      : [],
  };
}

type PostWithDelivery = {
  status: string;
  targets: { enabled: boolean }[];
  publishJobs: { laneResults: { status: string }[] }[];
};

/** Real delivery numbers from publish lane results, falling back to enabled targets. */
function deliveryFor(post: PostWithDelivery) {
  const latestJob = post.publishJobs[0];
  const enabledTargets = post.targets.filter((target) => target.enabled).length;
  const total = latestJob?.laneResults.length || enabledTargets;
  const published = latestJob?.laneResults.filter((lane) => lane.status === 'PUBLISHED').length ?? 0;
  return { published, total: Math.max(total, 0) };
}

function statusLabel(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
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
      className: index % 2 === 0 ? 'bg-accent-tint text-accent' : 'bg-sage-tint text-sage',
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

  if (!profile) {
    return {
      posts: [],
      trending: [],
      suggestions: [],
    };
  }

  const mappedPosts: FeedPost[] = posts.length
    ? posts.slice(0, 8).map((post) => {
        const delivery = deliveryFor(post);

        return {
          id: post.id,
          avatar: { initials: currentUser.initials, className: 'bg-accent-tint text-accent' },
          author: profile.displayName,
          handle: `@${profile.slug}`,
          time: formatRelativeDate(post.createdAt),
          body: post.content,
          socials: post.targets.filter((target) => target.enabled).map((target) => platforms[target.platform.toLowerCase()]).filter(Boolean),
          // Real publish outcome, not invented likes/comments/reposts.
          delivery: {
            published: delivery.published,
            total: delivery.total,
            label:
              delivery.total === 0
                ? statusLabel(post.status)
                : delivery.published >= delivery.total
                  ? `Published to ${delivery.total} ${delivery.total === 1 ? 'platform' : 'platforms'}`
                  : `${delivery.published}/${delivery.total} lanes delivered`,
          },
        };
      })
    : [];

  // Suggestions and trending are real: actual public profiles + hashtags that appear in real posts.
  const publicProfiles = await getPublicProfiles(currentUser.id, 5);
  const suggestions: CreatorSuggestion[] = publicProfiles.map((row) => {
    const initials = initialsFrom(row.displayName);
    return {
      id: row.id,
      avatar: avatarTone(row.id, initials),
      name: row.displayName,
      handle: `@${row.slug}`,
      bio: row.bio ?? 'Creator on Showcase',
      following: false,
    };
  });

  return {
    posts: mappedPosts,
    trending: aggregateTrending(posts.map((post) => post.content)),
    suggestions,
  };
}

export async function getDiscoverPageData(): Promise<{
  trending: TrendingTopic[];
  creators: CreatorSuggestion[];
}> {
  const { currentUser, posts } = await getShowcaseSessionData();

  if (!currentUser) {
    return {
      trending: [],
      creators: [],
    };
  }

  // Real creators: actual public profiles on Showcase (excluding the current user).
  const publicProfiles = await getPublicProfiles(currentUser.id, 6);
  const creators: CreatorSuggestion[] = publicProfiles.map((row) => {
    const initials = initialsFrom(row.displayName);
    return {
      id: row.id,
      avatar: avatarTone(row.id, initials),
      name: row.displayName,
      handle: `@${row.slug}`,
      bio: row.bio ?? 'Creator on Showcase',
      following: false,
    };
  });

  return {
    trending: aggregateTrending(posts.map((post) => post.content)),
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
            ? 'bg-sage-tint text-sage'
            : lane.status === 'FAILED'
              ? 'bg-danger-tint text-danger'
              : lane.status === 'PENDING'
                ? 'bg-panel text-subtle'
                : 'bg-[#F4E8C8] text-gold',
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
