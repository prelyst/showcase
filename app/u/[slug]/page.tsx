import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PlatformBadge, ProfilePostCard } from '@/components/showcase-ui';
import { platforms } from '@/lib/mock/showcase';
import { getProfileBySlug } from '@/lib/repositories/profile-repository';

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'SC';
}

export default async function PublicProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile || !profile.isPublic) {
    notFound();
  }

  const initials = getInitials(profile.displayName);

  const posts = profile.posts.map((post, index) => ({
    id: post.id,
    label: `Published to ${Math.max(post.targets?.length || 1, 1)} platforms`,
    time: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(post.createdAt),
    relativeTime: (() => {
      const diffMs = Math.max(0, Date.now() - post.createdAt.getTime());
      const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));
      if (diffMinutes < 60) return `${diffMinutes}m`;
      const diffHours = Math.max(1, Math.floor(diffMinutes / 60));
      if (diffHours < 24) return `${diffHours}h`;
      return `${Math.max(1, Math.floor(diffHours / 24))}d`;
    })(),
    body: post.content,
    stats: [
      `${Math.max(12, 120 - index * 9)} likes`,
      `${Math.max(2, 18 - index * 2)} comments`,
      `${Math.max(1, 14 - index * 2)} reposts`,
    ],
  }));

  return (
    <main className="min-h-screen bg-surface text-ink">
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0.04 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-[2] px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 font-serif text-[22px] tracking-[-0.02em] text-ink">
              <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-accent" />
              Showcase
            </Link>
            <Link href="/showcase/feed" className="rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-subtle transition hover:bg-ink hover:text-white">
              Open app
            </Link>
          </div>

          <section className="mb-7 rounded-[24px] border border-border bg-card p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="grid h-[88px] w-[88px] place-items-center rounded-full border border-border bg-accent-tint font-serif text-[34px] text-accent">
                {initials}
              </div>
              <div>
                <div className="mb-1 font-serif text-[38px] tracking-[-0.03em] text-ink">{profile.displayName}</div>
                <div className="mb-3 font-mono text-[13px] text-muted">showcase.app/u/{profile.slug}</div>
                <div className="max-w-[560px] text-[15px] leading-[1.6] text-subtle">{profile.bio || 'A creator building a quieter publishing archive on Showcase.'}</div>
                <div className="mt-4 flex items-center gap-[6px]">
                  <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-muted">Published via</span>
                  {[platforms.showcase, platforms.x, platforms.threads, platforms.facebook].map((platform) => (
                    <PlatformBadge key={platform.key} platform={platform} />
                  ))}
                </div>
              </div>
              <div className="flex gap-6 max-lg:flex-wrap lg:text-right">
                <div>
                  <div className="font-serif text-[22px] tracking-[-0.02em] text-ink">{profile.posts.length}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-muted">Posts</div>
                </div>
                <div>
                  <div className="font-serif text-[22px] tracking-[-0.02em] text-ink">2,847</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-muted">Followers</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-5 font-serif text-[26px] tracking-[-0.02em] text-ink">
              Archive <em className="italic text-accent">/ intentional posts</em>
            </div>

            {posts.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => (
                  <ProfilePostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-[18px] border border-border bg-card p-8 text-[15px] leading-[1.6] text-subtle">
                No public posts yet.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
