import {
  ConnectionItem,
  ComposeTool,
  CreatorSuggestion,
  FeedPost,
  NotificationItem,
  PlatformChip,
  PreferenceItem,
  ProfileFilter,
  ProfilePost,
  ProfileStat,
  PublishLane,
  TrendingTopic,
} from '@/lib/types/showcase';

export const platforms: Record<string, PlatformChip> = {
  showcase: { key: 'showcase', label: 'Showcase', short: 'S', tone: 'bg-[#B8541F] text-[#F4F1EA]' },
  x: { key: 'x', label: 'X', short: 'X', tone: 'bg-[#1A1814] text-[#FBF9F4]' },
  linkedin: { key: 'linkedin', label: 'LinkedIn', short: 'in', tone: 'bg-[#0A66C2] text-white' },
  bluesky: { key: 'bluesky', label: 'Bluesky', short: 'B', tone: 'bg-[#1185FE] text-white' },
  reddit: { key: 'reddit', label: 'Reddit', short: 'r', tone: 'bg-[#FF4500] text-white' },
  youtube: { key: 'youtube', label: 'YouTube', short: '▶', tone: 'bg-[#FF0033] text-white' },
  threads: { key: 'threads', label: 'Threads', short: '@', tone: 'bg-[#1A1814] text-[#FBF9F4]' },
};

export const feedPosts: FeedPost[] = [];

export const trendingTopics: TrendingTopic[] = [];

export const creatorSuggestions: CreatorSuggestion[] = [];

export const featuredCreators: CreatorSuggestion[] = [];

export const notifications: NotificationItem[] = [];

export const composeTools: ComposeTool[] = [
  { label: 'Image', icon: 'image' },
  { label: 'Video', icon: 'video' },
  { label: 'Link', icon: 'link' },
  { label: 'Hashtag', icon: 'hashtag' },
];

export const publishTargets = [
  { platform: platforms.showcase, selected: true },
  { platform: platforms.x, selected: true },
  { platform: platforms.linkedin, selected: true },
  { platform: platforms.bluesky, selected: true },
  { platform: platforms.reddit, selected: false },
  { platform: platforms.threads, selected: false },
];

export const monitorLanes: PublishLane[] = [];

export const profileFilters: ProfileFilter[] = [
  { label: 'All', count: '0' },
  { label: 'Showcase', count: '0' },
  { label: 'X', count: '0' },
  { label: 'LinkedIn', count: '0' },
  { label: 'Bluesky', count: '0' },
  { label: 'Reddit', count: '0' },
  { label: 'Threads', count: '0' },
];

export const profileStats: ProfileStat[] = [];

export const profilePosts: ProfilePost[] = [];

export const connectedAccounts: ConnectionItem[] = [
  { platform: platforms.x, handle: 'Not connected', status: 'Inactive', action: 'Connect' },
  { platform: platforms.linkedin, handle: 'Not connected', status: 'Inactive', action: 'Connect' },
  { platform: platforms.bluesky, handle: 'Not connected', status: 'Inactive', action: 'Connect' },
  { platform: platforms.reddit, handle: 'Not connected', status: 'Inactive', action: 'Connect' },
  { platform: platforms.youtube, handle: 'Not connected', status: 'Inactive', action: 'Connect' },
  { platform: platforms.threads, handle: 'Not connected', status: 'Inactive', action: 'Connect' },
];

export const preferences: PreferenceItem[] = [
  { label: 'Default to all platforms', description: 'New posts auto-select all connected platforms.', enabled: true },
  { label: 'Show "published via Showcase" footer', description: 'Adds a small credit line on cross-posted content. Creator tier removes it.', enabled: true },
  { label: 'Web push notifications', description: 'Real-time alerts for likes, comments, follows.', enabled: false },
  { label: 'Daily digest email', description: 'One email each morning summarizing yesterday.', enabled: true },
];
