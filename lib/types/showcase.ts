export type PlatformKey = 'showcase' | 'x' | 'linkedin' | 'bluesky' | 'reddit' | 'youtube' | 'threads';

export type PlatformChip = {
  key: PlatformKey;
  label: string;
  short: string;
  tone: string;
};

export type AvatarTone = {
  initials: string;
  className: string;
};

export type FeedPost = {
  id: string;
  avatar: AvatarTone;
  author: string;
  handle: string;
  time: string;
  body: string;
  hashtags?: string[];
  media?: string;
  socials: PlatformChip[];
  stats: {
    likes: string;
    comments: string;
    reposts: string;
  };
};

export type TrendingTopic = {
  rank: string;
  tag: string;
  count: string;
  delta?: string;
};

export type CreatorSuggestion = {
  id: string;
  avatar: AvatarTone;
  name: string;
  handle: string;
  bio: string;
  following: boolean;
};

export type NotificationItem = {
  id: string;
  avatar: AvatarTone;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};

export type PublishLane = {
  id: string;
  platform: PlatformChip;
  detail: string;
  status: 'Published' | 'Uploading' | 'Failed';
  elapsed: string;
  pillTone: string;
};

export type MonitorData = {
  heroBody: string;
  heroMeta: string;
  progressLabel: string;
  progressWidth: string;
  lanes: PublishLane[];
};

export type ProfileStat = {
  label: string;
  value: string;
};

export type ProfilePost = {
  id: string;
  label: string;
  time: string;
  body: string;
  stats: string[];
};

export type ProfileFilter = {
  label: string;
  count: string;
};

export type ConnectionItem = {
  platform: PlatformChip;
  handle: string;
  status: 'Active' | 'Inactive';
  action: 'Connect' | 'Disconnect';
};

export type PreferenceItem = {
  label: string;
  description: string;
  enabled: boolean;
};

export type ComposeTool = {
  label: string;
  icon: 'image' | 'video' | 'link' | 'hashtag';
};
