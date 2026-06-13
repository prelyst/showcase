import { PlatformChip } from '@/lib/types/showcase';

// Platform brand chips (official platform colors) + compose defaults.
// All user-facing list data is now loaded from the database via lib/server/showcase-data.ts.
export const platforms: Record<string, PlatformChip> = {
  showcase: { key: 'showcase', label: 'Showcase', short: 'S', tone: 'bg-accent text-white' },
  x: { key: 'x', label: 'X', short: 'X', tone: 'bg-ink text-white' },
  threads: { key: 'threads', label: 'Threads', short: '@', tone: 'bg-ink text-white' },
  facebook: { key: 'facebook', label: 'Facebook', short: 'f', tone: 'bg-[#1877F2] text-white' },
  instagram: { key: 'instagram', label: 'Instagram', short: 'IG', tone: 'bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] text-white' },
  youtube: { key: 'youtube', label: 'YouTube', short: '▶', tone: 'bg-[#FF0033] text-white' },
};

export const composeTools = [
  { label: 'Image', icon: 'image' },
  { label: 'Video', icon: 'video' },
  { label: 'Link', icon: 'link' },
  { label: 'Hashtag', icon: 'hashtag' },
] as const;

export const publishTargets = [
  { platform: platforms.showcase, selected: true },
  { platform: platforms.x, selected: true },
  { platform: platforms.threads, selected: true },
  { platform: platforms.facebook, selected: false },
  { platform: platforms.instagram, selected: false },
  { platform: platforms.youtube, selected: false },
];
