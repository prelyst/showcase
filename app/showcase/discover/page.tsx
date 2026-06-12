import { ShowcaseShell } from '@/components/showcase-shell';
import { CreatorCard, EmptyState, TrendingCard } from '@/components/showcase-ui';
import { getDiscoverPageData } from '@/lib/server/showcase-data';

export default async function DiscoverPage() {
  const { trending, creators } = await getDiscoverPageData();

  return (
    <ShowcaseShell title="Discover" active="/showcase/discover">
      <div className="max-w-[1100px]">
        <div className="mb-7 rounded-[16px] border border-border bg-card p-7">
          <input
            type="text"
            placeholder="Search posts, creators, hashtags…"
            className="w-full rounded-[10px] border border-border bg-surface px-[18px] py-[14px] text-[15px] text-ink outline-none placeholder:text-muted"
          />
        </div>

        <div className="mb-4 flex items-end justify-between">
          <div className="font-serif text-[22px] tracking-[-0.01em] text-ink">
            Trending <em className="italic text-accent">hashtags</em>
          </div>
          <button className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted">View all →</button>
        </div>
        {trending.length ? (
          <div className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-4">
            {trending.map((topic) => (
              <TrendingCard key={topic.tag} topic={topic} />
            ))}
          </div>
        ) : (
          <EmptyState compact title="No trending hashtags yet." hint="Hashtags from published posts across Showcase will rank here." />
        )}

        <div className="mb-4 mt-8 flex items-end justify-between">
          <div className="font-serif text-[22px] tracking-[-0.01em] text-ink">
            Featured <em className="italic text-accent">creators</em>
          </div>
          <button className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted">View all →</button>
        </div>
        {creators.length ? (
          <div className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-4">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        ) : (
          <EmptyState compact title="No public creators yet." hint="As people make their Showcase profiles public, they’ll appear here." />
        )}
      </div>
    </ShowcaseShell>
  );
}
