import { PendingActionButton } from '@/components/pending-action-button';
import { ShowcaseShell } from '@/components/showcase-shell';
import { Avatar, PlatformBadge, ProfilePostCard } from '@/components/showcase-ui';
import { platforms, profileFilters } from '@/lib/mock/showcase';
import { getProfilePageData } from '@/lib/server/showcase-data';
import { updateProfileAction } from './actions';

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
  const profile = await getProfilePageData();
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : null;
  const saved = params.saved === '1';
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

        <div className="mb-6 grid gap-6 xl:grid-cols-[1.1fr_380px]">
          <div>
            {saved ? <div className="mb-4 rounded-[12px] border border-[#D9D3C4] bg-[#F4F1EA] px-4 py-3 text-[13px] text-[#4A453C]">Profile updated.</div> : null}
            {errorMessage ? <div className="mb-4 rounded-[12px] border border-[#F2DCD1] bg-[#FBF1EC] px-4 py-3 text-[13px] text-[#A0381F]">{errorMessage}</div> : null}

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

          <aside className="rounded-[20px] border border-[#D9D3C4] bg-[#FBF9F4] p-6">
            <div className="mb-5">
              <div className="mb-1 font-serif text-[24px] tracking-[-0.02em] text-[#1A1814]">Edit profile</div>
              <div className="text-[13px] leading-[1.5] text-[#4A453C]">Update how your identity appears across Showcase.</div>
            </div>

            <form action={updateProfileAction} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Display name</label>
                <input id="displayName" name="displayName" defaultValue={profile.displayName} className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none focus:border-[#B8541F]" />
              </div>

              <div>
                <label htmlFor="slug" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Profile slug</label>
                <input id="slug" name="slug" defaultValue={profile.slug} className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none focus:border-[#B8541F]" />
              </div>

              <div>
                <label htmlFor="bio" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Bio</label>
                <textarea id="bio" name="bio" defaultValue={profile.bio} className="min-h-[110px] w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none focus:border-[#B8541F]" />
              </div>

              <div>
                <label htmlFor="location" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Location</label>
                <input id="location" name="location" defaultValue={profile.location || ''} className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none focus:border-[#B8541F]" />
              </div>

              <div>
                <label htmlFor="website" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Website</label>
                <input id="website" name="website" defaultValue={profile.website || ''} className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none focus:border-[#B8541F]" />
              </div>

              <div>
                <label htmlFor="isPublic" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Visibility</label>
                <select id="isPublic" name="isPublic" defaultValue={profile.isPublic ? 'true' : 'false'} className="w-full rounded-[12px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[14px] text-[15px] text-[#1A1814] outline-none focus:border-[#B8541F]">
                  <option value="true">Public profile</option>
                  <option value="false">Private profile</option>
                </select>
              </div>

              <PendingActionButton
                idle="Save profile"
                pending="Saving profile..."
                className="inline-flex w-full items-center justify-center rounded-[12px] bg-[#1A1814] px-5 py-[14px] text-[15px] font-medium text-[#F4F1EA] transition hover:bg-[#B8541F]"
              />
            </form>
          </aside>
        </div>
      </div>
    </ShowcaseShell>
  );
}
