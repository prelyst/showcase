import { ShowcaseShell } from '@/components/showcase-shell';
import { CreatorCard, EmptyState, FeedPostCard, TrendingCard } from '@/components/showcase-ui';
import { getFeedPageData } from '@/lib/server/showcase-data';

export default async function FeedPage() {
  const { posts, trending, suggestions } = await getFeedPageData();

  return (
    <ShowcaseShell title={<><span>Feed </span><em className="font-light italic text-accent">/ following</em></>} active="/showcase/feed">
      <div className="grid max-w-[1100px] gap-10 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-6 flex border-b border-border">
            {['Following', 'For you', 'Quiet hours'].map((tab, index) => (
              <button
                key={tab}
                className={`-mb-px border-b-2 px-[18px] py-3 text-[14px] font-medium ${index === 0 ? 'border-accent text-ink' : 'border-transparent text-muted'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {posts.length ? (
              posts.map((post) => <FeedPostCard key={post.id} post={post} />)
            ) : (
              <EmptyState
                title="Your feed is quiet — for now."
                hint="Posts you publish and creators you follow will collect here, lane by lane."
                cta={{ label: 'Compose a post', href: '/showcase/compose' }}
              />
            )}
          </div>
        </div>

        <aside>
          <div className="mb-5 rounded-[14px] border border-border bg-card p-5">
            <div className="mb-[14px] flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              <span>Trending</span>
              <span className="text-accent">↗</span>
            </div>
            <div>
              {trending.length ? (
                trending.map((topic) => <TrendingCard key={topic.tag} topic={topic} compact />)
              ) : (
                <p className="py-2 text-[13px] leading-[1.5] text-muted">No hashtags yet — add #tags to your posts and they’ll surface here.</p>
              )}
            </div>
          </div>

          <div className="mb-5 rounded-[14px] border border-border bg-card p-5">
            <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Who to follow</div>
            {suggestions.length ? (
              suggestions.map((creator) => <CreatorCard key={creator.id} creator={creator} compact />)
            ) : (
              <p className="py-2 text-[13px] leading-[1.5] text-muted">No public creators to suggest yet.</p>
            )}
          </div>
        </aside>
      </div>
    </ShowcaseShell>
  );
}
