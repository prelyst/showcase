import Link from 'next/link';
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

export function EmptyState({
  title,
  hint,
  cta,
  compact = false,
}: {
  title: string;
  hint?: string;
  cta?: { label: string; href: string };
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[18px] border border-dashed border-track bg-card text-center shadow-card ${
        compact ? 'px-5 py-8' : 'px-8 py-14'
      }`}
    >
      <span className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-accent-tint font-serif text-[22px] italic text-accent shadow-[0_0_0_6px_rgba(184,84,31,0.07)]">
        ·
      </span>
      <div className={`font-serif italic text-ink ${compact ? 'text-[17px]' : 'text-[20px]'}`}>{title}</div>
      {hint ? <div className="mt-[6px] max-w-[280px] text-[13px] leading-[1.5] text-muted">{hint}</div> : null}
      {cta ? (
        <Link
          href={cta.href}
          className="mt-4 inline-flex items-center gap-1 rounded-full bg-accent px-[18px] py-[10px] text-[13px] font-medium text-white shadow-[0_8px_18px_-10px_rgba(184,84,31,0.8)] transition hover:-translate-y-px hover:bg-accent-deep"
        >
          {cta.label} <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}

export function Avatar({ avatar, size = 'md' }: { avatar: AvatarTone; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-10 w-10 text-[14px]',
    md: 'h-12 w-12 text-[14px]',
    lg: 'h-[88px] w-[88px] text-[34px] font-serif',
  };

  return <div className={`grid place-items-center rounded-full border border-border font-semibold ${sizes[size]} ${avatar.className}`}>{avatar.initials}</div>;
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
    <button className={`rounded-full px-[14px] py-[6px] text-[12px] font-medium transition ${following ? 'border border-border bg-surface text-ink hover:border-accent/50' : 'bg-accent text-white shadow-[0_6px_14px_-8px_rgba(184,84,31,0.8)] hover:-translate-y-px hover:bg-accent-deep'}`}>
      {following ? 'Following' : 'Follow'}
    </button>
  );
}

export function FeedPostCard({ post }: { post: FeedPost }) {
  return (
    <article className="group -mx-3 grid grid-cols-[48px_1fr] gap-4 rounded-[16px] border border-transparent px-3 py-6 transition duration-300 hover:border-border hover:bg-card hover:shadow-card">
      <Avatar avatar={post.avatar} />
      <div>
        <div className="mb-[6px] flex flex-wrap items-baseline gap-2">
          <span className="text-[15px] font-semibold text-ink">{post.author}</span>
          <span className="font-mono text-[12px] text-muted">{post.handle}</span>
          <span className="text-[13px] text-muted">· {post.time}</span>
        </div>
        <div className="mb-[14px] font-serif text-[19px] leading-[1.55] text-ink">
          {post.body}{' '}
          {post.hashtags?.map((tag) => (
            <span key={tag} className="font-medium italic text-accent">
              {tag}{' '}
            </span>
          ))}
        </div>

        {post.media ? (
          <div className="mb-[14px] rounded-[12px] border border-border bg-panel px-8 py-11 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
            {post.media}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2 text-[#85806F]">
            <span
              className={`h-[6px] w-[6px] rounded-full ${
                post.delivery.total > 0 && post.delivery.published >= post.delivery.total
                  ? 'bg-[#5A6B3A]'
                  : post.delivery.published > 0
                    ? 'bg-[#B8541F]'
                    : 'bg-track'
              }`}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.05em]">{post.delivery.label}</span>
          </div>
          {post.socials.length ? (
            <div className="flex items-center gap-1">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">Also on</span>
              {post.socials.map((platform) => (
                <PlatformBadge key={platform.key} platform={platform} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function TrendingCard({ topic, compact = false }: { topic: TrendingTopic; compact?: boolean }) {
  return compact ? (
    <div className="border-b border-divider py-[10px] last:border-b-0">
      <div className="font-mono text-[10px] tracking-[0.05em] text-[#85806F]">{topic.rank}</div>
      <div className="font-serif text-[17px] font-medium italic text-[#B8541F]">{topic.tag}</div>
      <div className="text-[12px] text-[#85806F]">{topic.count}</div>
    </div>
  ) : (
    <div className="group relative overflow-hidden rounded-[14px] border border-border bg-card p-[18px] shadow-card transition duration-300 hover:-translate-y-[3px] hover:border-accent hover:shadow-lift">
      <span className="pointer-events-none absolute -right-3 -top-4 font-serif text-[64px] font-semibold italic leading-none text-accent/[0.08] transition group-hover:text-accent/[0.16]">
        {topic.rank}
      </span>
      <div className="relative mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">Trending</div>
      <div className="relative mb-[6px] font-serif text-[23px] font-medium italic text-accent">{topic.tag}</div>
      <div className="relative mb-2 text-[13px] text-subtle">{topic.count}</div>
      {topic.delta ? <div className="relative font-mono text-[11px] text-sage">{topic.delta}</div> : null}
    </div>
  );
}

export function CreatorCard({ creator, compact = false }: { creator: CreatorSuggestion; compact?: boolean }) {
  return compact ? (
    <div className="flex items-center gap-[10px] border-b border-divider py-[10px] last:border-b-0">
      <Avatar avatar={creator.avatar} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-medium text-[#1A1814]">{creator.name}</div>
        <div className="font-mono text-[11px] text-[#85806F]">{creator.handle} · {creator.bio}</div>
      </div>
      <FollowButton following={creator.following} />
    </div>
  ) : (
    <div className="flex items-center gap-3 rounded-[14px] border border-border bg-card p-[18px] shadow-card transition duration-300 hover:-translate-y-[3px] hover:border-accent/40 hover:shadow-lift">
      <Avatar avatar={creator.avatar} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-medium text-ink">{creator.name}</div>
        <div className="mb-[6px] font-mono text-[11px] text-muted">{creator.handle}</div>
        <div className="line-clamp-2 text-[12px] leading-[1.4] text-subtle">{creator.bio}</div>
      </div>
      <FollowButton following={creator.following} />
    </div>
  );
}

export function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <div className={`grid grid-cols-[44px_1fr_auto] gap-4 border-b border-divider px-[18px] py-[14px] last:border-b-0 ${item.unread ? 'bg-[#F5E5D3]' : ''}`}>
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
    <button aria-label={tool.label} className="grid h-[34px] w-[34px] place-items-center rounded-[8px] hover:bg-panel hover:text-[#1A1814]">
      {icon}
    </button>
  );
}

export function PublishTargetChip({ platform, selected }: { platform: PlatformChip; selected: boolean }) {
  return (
    <div
      className={`flex items-center gap-[6px] rounded-full border px-[10px] py-[6px] text-[12px] font-medium ${
        selected ? 'border-[#1A1814] bg-[#1A1814] text-white' : 'border-border bg-card text-[#1A1814]'
      }`}
    >
      <PlatformBadge platform={platform} />
      <span>{platform.label}</span>
    </div>
  );
}

export function PublishLaneRow({ lane }: { lane: PublishLane }) {
  return (
    <div className="grid items-center gap-4 border-b border-divider px-6 py-[18px] md:grid-cols-[36px_1fr_auto_auto] last:border-b-0">
      <PlatformBadge platform={lane.platform} large />
      <div>
        <div className="text-[14px] font-medium text-[#1A1814]">{lane.platform.label}</div>
        <div className={`mt-[2px] font-mono text-[11px] ${lane.status === 'Failed' ? 'text-[#A0381F]' : 'text-[#85806F]'}`}>{lane.detail}</div>
        {lane.retryNote ? <div className="mt-[4px] text-[11px] text-[#85806F]">{lane.retryNote}</div> : null}
      </div>
      <span className={`rounded-full px-[10px] py-1 font-mono text-[10px] uppercase tracking-[0.05em] ${lane.pillTone}`}>{lane.status}</span>
      <span className="font-mono text-[11px] text-[#85806F] md:text-right">{lane.elapsed}</span>
    </div>
  );
}

export function ProfilePostCard({ post }: { post: ProfilePost }) {
  return (
    <article className="group rounded-[16px] border border-border bg-card p-[22px] shadow-card transition duration-300 hover:-translate-y-[3px] hover:border-accent/40 hover:shadow-lift">
      <div className="mb-3 flex items-center gap-2">
        <PlatformBadge platform={{ key: 'showcase', label: 'Showcase', short: 'S', tone: 'bg-accent text-white' }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-muted">{post.label}</span>
        <span className="ml-auto font-mono text-[10px] text-muted">{post.relativeTime ? `${post.time} · ${post.relativeTime}` : post.time}</span>
      </div>
      <div className="mb-[14px] font-serif text-[16px] leading-[1.55] text-ink">{post.body}</div>
      <div className="flex gap-4 border-t border-divider pt-3 font-mono text-[11px] text-muted">
        {post.stats.map((stat) => (
          <span key={stat}>{stat}</span>
        ))}
      </div>
    </article>
  );
}

export function ConnectionRow({ item }: { item: ConnectionItem }) {
  return (
    <div className="grid items-center gap-4 border-b border-divider px-6 py-4 md:grid-cols-[36px_1fr_auto_auto] last:border-b-0">
      <PlatformBadge platform={item.platform} large />
      <div>
        <div className="text-[14px] font-medium text-[#1A1814]">{item.platform.label}</div>
        <div className="font-mono text-[11px] text-[#85806F]">{item.handle}</div>
      </div>
      <span className={`font-mono text-[10px] uppercase tracking-[0.05em] ${item.status === 'Active' ? 'text-[#5A6B3A]' : 'text-[#85806F]'}`}>{item.status}</span>
      <button className={`rounded-[10px] px-3 py-[6px] text-[12px] font-medium ${item.action === 'Connect' ? 'bg-[#B8541F] text-white' : 'border border-border text-[#4A453C]'}`}>{item.action}</button>
    </div>
  );
}

export function PreferenceRow({ item }: { item: PreferenceItem }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-divider px-6 py-4 last:border-b-0">
      <div>
        <div className="mb-[2px] text-[14px] font-medium text-[#1A1814]">{item.label}</div>
        <div className="text-[12px] text-[#85806F]">{item.description}</div>
      </div>
      <div className={`relative h-[22px] w-10 rounded-full ${item.enabled ? 'bg-[#B8541F]' : 'bg-track'}`}>
        <div className={`absolute bottom-[3px] h-4 w-4 rounded-full bg-white shadow ${item.enabled ? 'left-[21px]' : 'left-[3px]'}`} />
      </div>
    </div>
  );
}

export function SectionCard({ title, subtitle, children }: { title: ReactNode; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <section className="rise-in overflow-hidden rounded-[18px] border border-border bg-card shadow-card">
      <div className="border-b border-divider bg-panel/50 px-6 py-5">
        <div className="mb-1 font-serif text-[21px] tracking-[-0.01em] text-ink">{title}</div>
        {subtitle ? <div className="text-[13px] text-subtle">{subtitle}</div> : null}
      </div>
      {children}
    </section>
  );
}
