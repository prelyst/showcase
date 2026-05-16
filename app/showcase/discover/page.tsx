import { ShowcaseShell } from '@/components/showcase-shell';
import { CreatorCard, TrendingCard } from '@/components/showcase-ui';
import { featuredCreators, trendingTopics } from '@/lib/mock/showcase';

export default function DiscoverPage() {
  return (
    <ShowcaseShell title="Discover" active="/showcase/discover">
      <div className="max-w-[1100px]">
        <div className="mb-7 rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4] p-7">
          <input
            type="text"
            placeholder="Search posts, creators, hashtags…"
            className="w-full rounded-[10px] border border-[#D9D3C4] bg-[#F4F1EA] px-[18px] py-[14px] text-[15px] text-[#1A1814] outline-none placeholder:text-[#85806F]"
          />
        </div>

        <div className="mb-4 flex items-end justify-between">
          <div className="font-serif text-[22px] tracking-[-0.01em] text-[#1A1814]">
            Trending <em className="italic text-[#B8541F]">hashtags</em>
          </div>
          <button className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#85806F]">View all →</button>
        </div>
        <div className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-4">
          {trendingTopics.map((topic) => (
            <TrendingCard key={topic.tag} topic={topic} />
          ))}
        </div>

        <div className="mb-4 mt-8 flex items-end justify-between">
          <div className="font-serif text-[22px] tracking-[-0.01em] text-[#1A1814]">
            Featured <em className="italic text-[#B8541F]">creators</em>
          </div>
          <button className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#85806F]">View all →</button>
        </div>
        <div className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-4">
          {featuredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}
