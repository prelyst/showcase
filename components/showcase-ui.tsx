import { ReactNode } from 'react';

import {
  AvatarTone,
  ComposeTool,
  ConnectionItem,
  CreatorSuggestion,
  FeedPost,
  NotificationItem,
  PlatformChip,
  PreferenceItem,
  ProfilePost,
  PublishLane,
  TrendingTopic,
} from '@/lib/types/showcase';

export function Avatar({ avatar, size = 'md' }: { avatar: AvatarTone; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-10 w-10 text-[14px]',
    md: 'h-12 w-12 text-[14px]',
    lg: 'h-[88px] w-[88px] text-[34px] font-serif',
  };

  return <div className={`grid place-items-center rounded-full border border-[#D9D3C4] font-semibold ${sizes[size]} ${avatar.className}`}>{avatar.initials}</div>;
}

export function PlatformBadge({ platform, large = false }: { platform: PlatformChip; large?: boolean }) {
  return (
    <div className={`grid place-items-center rounded-[4px] font-mono font-bold ${large ? 'h-7 w-7 text-[13px] rounded-[7px]' : 'h-4 w-4 text-[8px]'} ${platform.tone}`}>
      {platform.short}
    </div>
  );
}

export function FollowButton({ following }: { following: boolean }) {
  return (
    <button className={`rounded-full px-3 py-[6px] text-[12px] font-medium ${following ? 'border border-[#D9D3C4] text-[#1A1814]' : 'bg-[#1A1814] text-[#F4F1EA]'}`}>
      {following ? 'Following' : 'Follow'}
    </button>
  );
}

export function FeedPostCard({ post }: { post: FeedPost }) {
  return (
    <article className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#E8E3D4] py-6 last:border-b-0">
      <Avatar avatar={post.avatar} />
      <div>
        <div className="mb-[6px] flex flex-wrap items-baseline gap-2">
          <span className="text-[15px] font-medium text-[#1A1814]">{post.author}</span>
          <span className="font-mono text-[12px] text-[#85806F]">{post.handle}</span>
          <span className="text-[13px] text-[#85806F]">· {post.time}</span>
        </div>
        <div className="mb-[14px] font-serif text-[18px] leading-[1.5] text-[#1A1814]">
          {post.body}{' '}
          {post.hashtags?.map((tag) => (
            <span key={tag} className="font-medium italic text-[#B8541F]">
              {tag}{' '}
            </span>
          ))}
        </div>

        {post.media ? (
          <div className="mb-[14px] rounded-[12px] border border-[#D9D3C4] bg-[#EDE8DD] px-8 py-11 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
            {post.media}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-5">
          <div className="flex gap-6 text-[13px] text-[#85806F]">
            <span>♥ {post.stats.likes}</span>
            <span>💬 {post.stats.comments}</span>
            <span>↻ {post.stats.reposts}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">Also on</span>
            {post.socials.map((platform) => (
              <PlatformBadge key={platform.key} platform={platform} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function TrendingCard({ topic, compact = false }: { topic: TrendingTopic; compact?: boolean }) {
  return compact ? (
    <div className="border-b border-[#E8E3D4] py-[10px] last:border-b-0">
      <div className="font-mono text-[10px] tracking-[0.05em] text-[#85806F]">{topic.rank}</div>
      <div className="font-serif text-[17px] font-medium italic text-[#B8541F]">{topic.tag}</div>
      <div className="text-[12px] text-[#85806F]">{topic.count}</div>
    </div>
  ) : (
    <div className="rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] p-[18px] transition hover:-translate-y-px hover:border-[#B8541F]">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">{topic.rank}</div>
      <div className="mb-[6px] font-serif text-[22px] font-medium italic text-[#B8541F]">{topic.tag}</div>
      <div className="mb-2 text-[13px] text-[#4A453C]">{topic.count}</div>
      {topic.delta ? <div className="font-mono text-[11px] text-[#5A6B3A]">{topic.delta}</div> : null}
    </div>
  );
}

export function CreatorCard({ creator, compact = false }: { creator: CreatorSuggestion; compact?: boolean }) {
  return compact ? (
    <div className="flex items-center gap-[10px] border-b border-[#E8E3D4] py-[10px] last:border-b-0">
      <Avatar avatar={creator.avatar} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-medium text-[#1A1814]">{creator.name}</div>
        <div className="font-mono text-[11px] text-[#85806F]">{creator.handle} · {creator.bio}</div>
      </div>
      <FollowButton following={creator.following} />
    </div>
  ) : (
    <div className="flex items-center gap-3 rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] p-[18px]">
      <Avatar avatar={creator.avatar} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-medium text-[#1A1814]">{creator.name}</div>
        <div className="mb-[6px] font-mono text-[11px] text-[#85806F]">{creator.handle}</div>
        <div className="line-clamp-2 text-[12px] leading-[1.4] text-[#4A453C]">{creator.bio}</div>
      </div>
      <FollowButton following={creator.following} />
    </div>
  );
}

export function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <div className={`grid grid-cols-[44px_1fr_auto] gap-4 border-b border-[#E8E3D4] px-[18px] py-[14px] last:border-b-0 ${item.unread ? 'bg-[#F5E5D3]' : ''}`}>
      <Avatar avatar={item.avatar} size="sm" />
      <div>
        <div className="text-[14px] font-medium text-[#1A1814]">{item.title}</div>
        <div className="mt-1 text-[13px] leading-[1.45] text-[#4A453C] italic">{item.detail}</div>
      </div>
      <div className="font-mono text-[11px] text-[#85806F]">{item.time}</div>
    </div>
  );
}

export function ComposeToolButton({ tool }: { tool: ComposeTool }) {
  const icon = {
    image: <span>🖼</span>,
    video: <span>▶</span>,
    link: <span>🔗</span>,
    hashtag: <span>#</span>,
  }[tool.icon];

  return (
    <button aria-label={tool.label} className="grid h-[34px] w-[34px] place-items-center rounded-[8px] hover:bg-[#EDE8DD] hover:text-[#1A1814]">
      {icon}
    </button>
  );
}

export function PublishTargetChip({ platform, selected }: { platform: PlatformChip; selected: boolean }) {
  return (
    <div
      className={`flex items-center gap-[6px] rounded-full border px-[10px] py-[6px] text-[12px] font-medium ${
        selected ? 'border-[#1A1814] bg-[#1A1814] text-[#F4F1EA]' : 'border-[#D9D3C4] bg-[#FBF9F4] text-[#1A1814]'
      }`}
    >
      <PlatformBadge platform={platform} />
      <span>{platform.label}</span>
    </div>
  );
}

export function PublishLaneRow({ lane }: { lane: PublishLane }) {
  return (
    <div className="grid items-center gap-4 border-b border-[#E8E3D4] px-6 py-[18px] md:grid-cols-[36px_1fr_auto_auto] last:border-b-0">
      <PlatformBadge platform={lane.platform} large />
      <div>
        <div className="text-[14px] font-medium text-[#1A1814]">{lane.platform.label}</div>
        <div className={`mt-[2px] font-mono text-[11px] ${lane.status === 'Failed' ? 'text-[#A0381F]' : 'text-[#85806F]'}`}>{lane.detail}</div>
      </div>
      <span className={`rounded-full px-[10px] py-1 font-mono text-[10px] uppercase tracking-[0.05em] ${lane.pillTone}`}>{lane.status}</span>
      <span className="font-mono text-[11px] text-[#85806F] md:text-right">{lane.elapsed}</span>
    </div>
  );
}

export function ProfilePostCard({ post }: { post: ProfilePost }) {
  return (
    <article className="rounded-[14px] border border-[#D9D3C4] bg-[#FBF9F4] p-[22px] transition hover:-translate-y-px hover:border-[#85806F]">
      <div className="mb-3 flex items-center gap-2">
        <PlatformBadge platform={{ key: 'showcase', label: 'Showcase', short: 'S', tone: 'bg-[#B8541F] text-[#F4F1EA]' }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">{post.label}</span>
        <span className="ml-auto font-mono text-[10px] text-[#85806F]">{post.time}</span>
      </div>
      <div className="mb-[14px] font-serif text-[15px] leading-[1.5] text-[#1A1814]">{post.body}</div>
      <div className="flex gap-4 font-mono text-[11px] text-[#85806F]">
        {post.stats.map((stat) => (
          <span key={stat}>{stat}</span>
        ))}
      </div>
    </article>
  );
}

export function ConnectionRow({ item }: { item: ConnectionItem }) {
  return (
    <div className="grid items-center gap-4 border-b border-[#E8E3D4] px-6 py-4 md:grid-cols-[36px_1fr_auto_auto] last:border-b-0">
      <PlatformBadge platform={item.platform} large />
      <div>
        <div className="text-[14px] font-medium text-[#1A1814]">{item.platform.label}</div>
        <div className="font-mono text-[11px] text-[#85806F]">{item.handle}</div>
      </div>
      <span className={`font-mono text-[10px] uppercase tracking-[0.05em] ${item.status === 'Active' ? 'text-[#5A6B3A]' : 'text-[#85806F]'}`}>{item.status}</span>
      <button className={`rounded-[10px] px-3 py-[6px] text-[12px] font-medium ${item.action === 'Connect' ? 'bg-[#B8541F] text-[#F4F1EA]' : 'border border-[#D9D3C4] text-[#4A453C]'}`}>{item.action}</button>
    </div>
  );
}

export function PreferenceRow({ item }: { item: PreferenceItem }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#E8E3D4] px-6 py-4 last:border-b-0">
      <div>
        <div className="mb-[2px] text-[14px] font-medium text-[#1A1814]">{item.label}</div>
        <div className="text-[12px] text-[#85806F]">{item.description}</div>
      </div>
      <div className={`relative h-[22px] w-10 rounded-full ${item.enabled ? 'bg-[#B8541F]' : 'bg-[#D9D3C4]'}`}>
        <div className={`absolute bottom-[3px] h-4 w-4 rounded-full bg-white shadow ${item.enabled ? 'left-[21px]' : 'left-[3px]'}`} />
      </div>
    </div>
  );
}

export function SectionCard({ title, subtitle, children }: { title: ReactNode; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
      <div className="border-b border-[#E8E3D4] px-6 py-5">
        <div className="mb-1 font-serif text-[20px] tracking-[-0.01em] text-[#1A1814]">{title}</div>
        {subtitle ? <div className="text-[13px] text-[#85806F]">{subtitle}</div> : null}
      </div>
      {children}
    </section>
  );
}
