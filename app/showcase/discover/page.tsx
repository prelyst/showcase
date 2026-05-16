import { ShowcaseShell } from '@/components/showcase-shell';

const hashtags = [
  ['01 · Craft', '#slow-publishing', '1,247 posts today', '↗ 42% this hour'],
  ['02 · Tech', '#no-algorithm', '847 posts today', '↗ 28% this hour'],
  ['03 · Writing', '#morning-pages', '611 posts today', '↗ 19% this hour'],
  ['04 · Music', '#first-takes', '403 posts today', '↗ 14% this hour'],
] as const;

const creators = [
  ['EK', 'bg-[#F5E5D3] text-[#B8541F]', 'Elena Kowalski', '@elenakowalski', 'Designer thinking about quiet tools and durable interfaces.', 'Follow'],
  ['JT', 'bg-[#E5E8D4] text-[#5A6B3A]', 'James Tam', '@jtam', 'Musician. Ambient and acoustic. Slow releases.', 'Follow'],
  ['PR', 'bg-[#DCD4E8] text-[#5A4A78]', 'Priya Rajan', '@priya.writes', 'Essays on creative practice. Newsletter on substack.', 'Following'],
  ['DW', 'bg-[#D4E3E8] text-[#3A5A6B]', 'David Wen', '@dwen', 'Writer, builder. Exploring the space between tools and craft.', 'Follow'],
] as const;

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
          {hashtags.map(([rank, tag, count, delta]) => (
            <div key={tag} className="rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] p-[18px] transition hover:-translate-y-px hover:border-[#B8541F]">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">{rank}</div>
              <div className="mb-[6px] font-serif text-[22px] font-medium italic text-[#B8541F]">{tag}</div>
              <div className="mb-2 text-[13px] text-[#4A453C]">{count}</div>
              <div className="font-mono text-[11px] text-[#5A6B3A]">{delta}</div>
            </div>
          ))}
        </div>

        <div className="mb-4 mt-8 flex items-end justify-between">
          <div className="font-serif text-[22px] tracking-[-0.01em] text-[#1A1814]">
            Featured <em className="italic text-[#B8541F]">creators</em>
          </div>
          <button className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#85806F]">View all →</button>
        </div>
        <div className="grid gap-[14px] md:grid-cols-2 xl:grid-cols-4">
          {creators.map(([initials, tone, name, handle, bio, button]) => (
            <div key={name} className="flex items-center gap-3 rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] p-[18px]">
              <div className={`grid h-11 w-11 place-items-center rounded-full border border-[#D9D3C4] text-[14px] font-semibold ${tone}`}>{initials}</div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium text-[#1A1814]">{name}</div>
                <div className="mb-[6px] font-mono text-[11px] text-[#85806F]">{handle}</div>
                <div className="line-clamp-2 text-[12px] leading-[1.4] text-[#4A453C]">{bio}</div>
              </div>
              <button className={`rounded-full px-3 py-[6px] text-[12px] font-medium ${button === 'Following' ? 'border border-[#D9D3C4] text-[#1A1814]' : 'bg-[#1A1814] text-[#F4F1EA]'}`}>
                {button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}
