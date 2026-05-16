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

export const feedPosts: FeedPost[] = [
  {
    id: 'feed-1',
    avatar: { initials: 'EK', className: 'bg-[#F5E5D3] text-[#B8541F]' },
    author: 'Elena Kowalski',
    handle: '@elenakowalski',
    time: '2h',
    body: 'Spent the morning reading through my old design files from 2019. The through-line I missed at the time is obvious now: I was solving the wrong problem.',
    hashtags: ['#design', '#reflection'],
    socials: [platforms.x, platforms.linkedin, platforms.bluesky],
    stats: { likes: '127', comments: '18', reposts: '34' },
  },
  {
    id: 'feed-2',
    avatar: { initials: 'JT', className: 'bg-[#E5E8D4] text-[#5A6B3A]' },
    author: 'James Tam',
    handle: '@jtam',
    time: '4h',
    body: "New track's up. It's been two years since I felt okay about a song leaving my laptop. This one left quickly and I didn't want to stop it.",
    media: 'Audio · 3:42',
    socials: [platforms.youtube, platforms.threads],
    stats: { likes: '84', comments: '12', reposts: '8' },
  },
  {
    id: 'feed-3',
    avatar: { initials: 'PR', className: 'bg-[#DCD4E8] text-[#5A4A78]' },
    author: 'Priya Rajan',
    handle: '@priya.writes',
    time: '6h',
    body: 'An underrated kind of privilege: being able to post less.',
    hashtags: ['#creator'],
    socials: [platforms.x, platforms.bluesky, platforms.threads],
    stats: { likes: '312', comments: '47', reposts: '89' },
  },
  {
    id: 'feed-4',
    avatar: { initials: 'DW', className: 'bg-[#D4E3E8] text-[#3A5A6B]' },
    author: 'David Wen',
    handle: '@dwen',
    time: '11h',
    body: "Three-day experiment: I only posted the things I wrote in a notebook first. My engagement went down. My satisfaction with what I posted went up. I'm keeping it.",
    socials: [platforms.x, platforms.linkedin],
    stats: { likes: '156', comments: '31', reposts: '22' },
  },
];

export const trendingTopics: TrendingTopic[] = [
  { rank: '01 · Craft', tag: '#slow-publishing', count: '1.2k posts today', delta: '↗ 42% this hour' },
  { rank: '02 · Tech', tag: '#no-algorithm', count: '847 posts today', delta: '↗ 28% this hour' },
  { rank: '03 · Writing', tag: '#morning-pages', count: '611 posts today', delta: '↗ 19% this hour' },
  { rank: '04 · Music', tag: '#first-takes', count: '403 posts today', delta: '↗ 14% this hour' },
];

export const creatorSuggestions: CreatorSuggestion[] = [
  {
    id: 'creator-1',
    avatar: { initials: 'SO', className: 'bg-[#F5E5D3] text-[#B8541F]' },
    name: 'Sam Okonkwo',
    handle: '@samo',
    bio: 'Writer',
    following: false,
  },
  {
    id: 'creator-2',
    avatar: { initials: 'LV', className: 'bg-[#E5E8D4] text-[#5A6B3A]' },
    name: 'Lena Volkov',
    handle: '@lvolkov',
    bio: 'Designer',
    following: true,
  },
  {
    id: 'creator-3',
    avatar: { initials: 'HF', className: 'bg-[#F4DCDC] text-[#A0381F]' },
    name: 'Hana Fujiwara',
    handle: '@hanafuji',
    bio: 'Musician',
    following: false,
  },
];

export const featuredCreators: CreatorSuggestion[] = [
  {
    id: 'featured-1',
    avatar: { initials: 'EK', className: 'bg-[#F5E5D3] text-[#B8541F]' },
    name: 'Elena Kowalski',
    handle: '@elenakowalski',
    bio: 'Designer thinking about quiet tools and durable interfaces.',
    following: false,
  },
  {
    id: 'featured-2',
    avatar: { initials: 'JT', className: 'bg-[#E5E8D4] text-[#5A6B3A]' },
    name: 'James Tam',
    handle: '@jtam',
    bio: 'Musician. Ambient and acoustic. Slow releases.',
    following: false,
  },
  {
    id: 'featured-3',
    avatar: { initials: 'PR', className: 'bg-[#DCD4E8] text-[#5A4A78]' },
    name: 'Priya Rajan',
    handle: '@priya.writes',
    bio: 'Essays on creative practice. Newsletter on substack.',
    following: true,
  },
  {
    id: 'featured-4',
    avatar: { initials: 'DW', className: 'bg-[#D4E3E8] text-[#3A5A6B]' },
    name: 'David Wen',
    handle: '@dwen',
    bio: 'Writer, builder. Exploring the space between tools and craft.',
    following: false,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 'notif-1',
    avatar: { initials: 'EK', className: 'bg-[#F5E5D3] text-[#B8541F]' },
    title: 'Elena Kowalski liked your post',
    detail: '"The thing I keep coming back to: most social platforms reward volume…"',
    time: '2h',
    unread: true,
  },
  {
    id: 'notif-2',
    avatar: { initials: 'PR', className: 'bg-[#DCD4E8] text-[#5A4A78]' },
    title: 'Priya Rajan started following you',
    detail: 'Essays on creative practice. Newsletter on substack.',
    time: '5h',
    unread: true,
  },
  {
    id: 'notif-3',
    avatar: { initials: 'JT', className: 'bg-[#E5E8D4] text-[#5A6B3A]' },
    title: 'James Tam replied to your comment',
    detail: '"Agreed — the default-on behavior is the whole point."',
    time: '8h',
    unread: true,
  },
  {
    id: 'notif-4',
    avatar: { initials: 'DW', className: 'bg-[#D4E3E8] text-[#3A5A6B]' },
    title: 'David Wen reposted your post',
    detail: '"An underrated kind of privilege: being able to post less."',
    time: '1d',
    unread: false,
  },
  {
    id: 'notif-5',
    avatar: { initials: 'HF', className: 'bg-[#F4DCDC] text-[#A0381F]' },
    title: 'Hana Fujiwara mentioned you',
    detail: '"…learning a lot from how @mayarivera thinks about intention in publishing."',
    time: '2d',
    unread: false,
  },
];

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

export const monitorLanes: PublishLane[] = [
  { id: 'lane-1', platform: platforms.showcase, detail: 'showcase.app/@mayarivera/p/8k2j', status: 'Published', elapsed: '0.3s', pillTone: 'bg-[#E5E8D4] text-[#5A6B3A]' },
  { id: 'lane-2', platform: platforms.x, detail: 'x.com/mayarivera/status/183...', status: 'Published', elapsed: '1.2s', pillTone: 'bg-[#E5E8D4] text-[#5A6B3A]' },
  { id: 'lane-3', platform: platforms.linkedin, detail: 'linkedin.com/posts/mayarivera-act...', status: 'Published', elapsed: '2.1s', pillTone: 'bg-[#E5E8D4] text-[#5A6B3A]' },
  { id: 'lane-4', platform: platforms.bluesky, detail: 'bsky.app/profile/mayarivera....', status: 'Published', elapsed: '0.8s', pillTone: 'bg-[#E5E8D4] text-[#5A6B3A]' },
  { id: 'lane-5', platform: platforms.reddit, detail: 'Uploading · polling in 3s…', status: 'Uploading', elapsed: '3.4s', pillTone: 'bg-[#F4E8C8] text-[#A67C1E]' },
  { id: 'lane-6', platform: platforms.youtube, detail: 'Video exceeds 60s Shorts cap. Trim or deselect YouTube.', status: 'Failed', elapsed: '—', pillTone: 'bg-[#F2DCD1] text-[#A0381F]' },
];

export const profileFilters: ProfileFilter[] = [
  { label: 'All', count: '184' },
  { label: 'Showcase', count: '184' },
  { label: 'X', count: '172' },
  { label: 'LinkedIn', count: '48' },
  { label: 'Bluesky', count: '168' },
  { label: 'Reddit', count: '22' },
  { label: 'Threads', count: '91' },
];

export const profileStats: ProfileStat[] = [
  { value: '2,847', label: 'Followers' },
  { value: '184', label: 'Posts' },
  { value: '312', label: 'Following' },
];

export const profilePosts: ProfilePost[] = [
  { id: 'profile-1', label: 'Published to 5 platforms', time: 'Apr 21', body: 'The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention.', stats: ['312 likes', '47 comments', '89 reposts'] },
  { id: 'profile-2', label: 'Published to 3 platforms', time: 'Apr 19', body: "An essay I've been sitting on for eight months is finally going out tomorrow. It's about why I left Twitter in 2022 and why I'm back, on different terms.", stats: ['184 likes', '23 comments', '31 reposts'] },
  { id: 'profile-3', label: 'Published to 6 platforms', time: 'Apr 17', body: "Book progress: chapter 4 done. It took me three weeks longer than I hoped. I'm learning that writing about slowness requires permission to be slow.", stats: ['521 likes', '78 comments', '142 reposts'] },
  { id: 'profile-4', label: 'Published to 4 platforms', time: 'Apr 14', body: "A principle I keep testing: the platforms that make you post more are not the ones that make you better. Look at who's quiet and productive.", stats: ['267 likes', '41 comments', '58 reposts'] },
  { id: 'profile-5', label: 'Published to 3 platforms', time: 'Apr 11', body: 'Draft notebook entry: "The internet does not need more content. It needs more thinking." I may or may not publish this proper. But the feeling is real.', stats: ['142 likes', '19 comments', '28 reposts'] },
  { id: 'profile-6', label: 'Published to 5 platforms', time: 'Apr 8', body: 'I gave a talk yesterday to a group of designers about restraint as a creative value. Slides are below. The Q&A was better than the talk.', stats: ['398 likes', '55 comments', '76 reposts'] },
];

export const connectedAccounts: ConnectionItem[] = [
  { platform: platforms.x, handle: '@mayarivera · connected 12 days ago', status: 'Active', action: 'Disconnect' },
  { platform: platforms.linkedin, handle: 'maya-rivera-writer · connected 12 days ago', status: 'Active', action: 'Disconnect' },
  { platform: platforms.bluesky, handle: 'mayarivera.bsky.social · connected 10 days ago', status: 'Active', action: 'Disconnect' },
  { platform: platforms.reddit, handle: 'u/mayarivera · connected 5 days ago', status: 'Active', action: 'Disconnect' },
  { platform: platforms.youtube, handle: 'Not connected', status: 'Inactive', action: 'Connect' },
  { platform: platforms.threads, handle: 'Not connected', status: 'Inactive', action: 'Connect' },
];

export const preferences: PreferenceItem[] = [
  { label: 'Default to all platforms', description: 'New posts auto-select all connected platforms.', enabled: true },
  { label: 'Show "published via Showcase" footer', description: 'Adds a small credit line on cross-posted content. Creator tier removes it.', enabled: true },
  { label: 'Web push notifications', description: 'Real-time alerts for likes, comments, follows.', enabled: false },
  { label: 'Daily digest email', description: 'One email each morning summarizing yesterday.', enabled: true },
];
