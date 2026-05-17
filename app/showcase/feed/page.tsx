import { ShowcaseShell } from '@/components/showcase-shell';
import { CreatorCard, FeedPostCard, TrendingCard } from '@/components/showcase-ui';
import { getFeedPageData } from '@/lib/server/showcase-data';

export default async function FeedPage() {
  const { posts, trending, suggestions } = await getFeedPageData();

  return (
    <ShowcaseShell title={<><span>Feed </span><em className="font-light italic text-[#B8541F]">/ following</em></>} active="/showcase/feed">
      <div className="grid max-w-[1100px] gap-10 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-6 flex border-b border-[#D9D3C4]">
            {['Following', 'For you', 'Quiet hours'].map((tab, index) => (
              <button
                key={tab}
                className={`-mb-px border-b-2 px-[18px] py-3 text-[14px] font-medium ${index === 0 ? 'border-[#B8541F] text-[#1A1814]' : 'border-transparent text-[#85806F]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {posts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <aside>
          <div className="mb-5 rounded-[14px] border border-[#D9D3C4] bg-[#FBF9F4] p-5">
            <div className="mb-[14px] flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
              <span>Trending</span>
              <span className="text-[#B8541F]">↗</span>
            </div>
            <div>
              {trending.map((topic) => (
                <TrendingCard key={topic.tag} topic={topic} compact />
              ))}
            </div>
          </div>

          <div className="mb-5 rounded-[14px] border border-[#D9D3C4] bg-[#FBF9F4] p-5">
            <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Who to follow</div>
            {suggestions.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} compact />
            ))}
          </div>
        </aside>
      </div>
    </ShowcaseShell>
  );
}
