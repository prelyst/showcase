import { PlatformChip } from '@/lib/types/showcase';

// Platform brand chips (official platform colors) + compose defaults.
// All user-facing list data is now loaded from the database via lib/server/showcase-data.ts.
export const platforms: Record<string, PlatformChip> = {
  showcase: { key: 'showcase', label: 'Showcase', short: 'S', tone: 'bg-accent text-white' },
  x: { key: 'x', label: 'X', short: 'X', tone: 'bg-ink text-white' },
  linkedin: { key: 'linkedin', label: 'LinkedIn', short: 'in', tone: 'bg-[#0A66C2] text-white' },
  bluesky: { key: 'bluesky', label: 'Bluesky', short: 'B', tone: 'bg-[#1185FE] text-white' },
  reddit: { key: 'reddit', label: 'Reddit', short: 'r', tone: 'bg-[#FF4500] text-white' },
  youtube: { key: 'youtube', label: 'YouTube', short: '▶', tone: 'bg-[#FF0033] text-white' },
  threads: { key: 'threads', label: 'Threads', short: '@', tone: 'bg-ink text-white' },
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
  { platform: platforms.linkedin, selected: true },
  { platform: platforms.bluesky, selected: true },
  { platform: platforms.reddit, selected: false },
  { platform: platforms.threads, selected: false },
];
