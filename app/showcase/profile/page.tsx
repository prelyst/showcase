import { ShowcaseShell } from '@/components/showcase-shell';
import { Avatar, PlatformBadge, ProfilePostCard } from '@/components/showcase-ui';
import { platforms, profileFilters } from '@/lib/mock/showcase';
import { getProfilePageData } from '@/lib/server/showcase-data';

export default async function ProfilePage() {
  const profile = await getProfilePageData();
  return (
    <ShowcaseShell title="Profile" subtitle={`showcase.app/@${profile.slug}`} active="/showcase/profile">
      <div className="max-w-[1100px]">
        <div className="mb-6 grid gap-7 rounded-[20px] border border-[#D9D3C4] bg-[#FBF9F4] p-9 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <Avatar avatar={{ initials: profile.initials, className: 'bg-[#F5E5D3] text-[#B8541F]' }} size="lg" />
          <div>
            <div className="mb-1 font-serif text-[34px] tracking-[-0.02em] text-[#1A1814]">{profile.displayName}</div>
            <div className="mb-3 font-mono text-[13px] text-[#85806F]">showcase.app/@{profile.slug}</div>
            <div className="mb-[14px] max-w-[460px] text-[15px] leading-[1.5] text-[#4A453C]">{profile.bio}</div>
            <div className="flex items-center gap-[6px]">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">Also on</span>
              {[platforms.x, platforms.linkedin, platforms.bluesky, platforms.reddit, platforms.threads].map((platform) => (
                <PlatformBadge key={platform.key} platform={platform} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 text-right max-lg:text-left">
            <div className="flex gap-6 max-lg:flex-wrap lg:justify-end">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-[22px] tracking-[-0.02em] text-[#1A1814]">{stat.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {profileFilters.map((filter, index) => (
            <button key={filter.label} className={`flex items-center gap-[6px] rounded-full border px-[14px] py-[7px] text-[13px] font-medium whitespace-nowrap ${index === 0 ? 'border-[#1A1814] bg-[#1A1814] text-[#F4F1EA]' : 'border-[#D9D3C4] bg-[#FBF9F4] text-[#4A453C]'}`}>
              {filter.label}
              <span className="font-mono text-[11px] opacity-60">{filter.count}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {profile.posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}
