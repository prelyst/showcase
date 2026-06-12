import { PendingActionButton } from '@/components/pending-action-button';
import { ShowcaseShell } from '@/components/showcase-shell';
import { Avatar, EmptyState, PlatformBadge, ProfilePostCard } from '@/components/showcase-ui';
import { platforms } from '@/lib/mock/showcase';
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
        <div className="mb-6 grid gap-7 rounded-[20px] border border-border bg-card p-9 shadow-card lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <Avatar avatar={{ initials: profile.initials, className: 'bg-accent-tint text-accent' }} size="lg" />
          <div>
            <div className="mb-1 font-serif text-[34px] tracking-[-0.02em] text-ink">{profile.displayName}</div>
            <div className="mb-3 font-mono text-[13px] text-muted">showcase.app/@{profile.slug}</div>
            <div className="mb-[14px] max-w-[460px] text-[15px] leading-[1.5] text-subtle">{profile.bio}</div>
            <div className="flex items-center gap-[6px]">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-muted">Also on</span>
              {[platforms.x, platforms.linkedin, platforms.bluesky, platforms.reddit, platforms.threads].map((platform) => (
                <PlatformBadge key={platform.key} platform={platform} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 text-right max-lg:text-left">
            <div className="flex gap-6 max-lg:flex-wrap lg:justify-end">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-[22px] tracking-[-0.02em] text-ink">{stat.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-6 xl:grid-cols-[1.1fr_380px]">
          <div>
            {saved ? <div className="mb-4 rounded-[12px] border border-border bg-surface px-4 py-3 text-[13px] text-subtle">Profile updated.</div> : null}
            {errorMessage ? <div className="mb-4 rounded-[12px] border border-danger-tint bg-accent-tint px-4 py-3 text-[13px] text-danger">{errorMessage}</div> : null}

            <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
              {profile.filters.map((filter, index) => (
                <button key={filter.label} className={`flex items-center gap-[6px] rounded-full border px-[14px] py-[7px] text-[13px] font-medium whitespace-nowrap transition ${index === 0 ? 'border-ink bg-ink text-white' : 'border-border bg-card text-subtle hover:border-muted'}`}>
                  {filter.label}
                  <span className="font-mono text-[11px] opacity-60">{filter.count}</span>
                </button>
              ))}
            </div>

            {profile.posts.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {profile.posts.map((post) => (
                  <ProfilePostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No posts on your archive yet."
                hint="Everything you publish keeps a clean home here, at your single profile URL."
                cta={{ label: 'Write your first post', href: '/showcase/compose' }}
              />
            )}
          </div>

          <aside className="rounded-[20px] border border-border bg-card p-6">
            <div className="mb-5">
              <div className="mb-1 font-serif text-[24px] tracking-[-0.02em] text-ink">Edit profile</div>
              <div className="text-[13px] leading-[1.5] text-subtle">Update how your identity appears across Showcase.</div>
            </div>

            <form action={updateProfileAction} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Display name</label>
                <input id="displayName" name="displayName" defaultValue={profile.displayName} className="w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none focus:border-accent" />
              </div>

              <div>
                <label htmlFor="slug" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Profile slug</label>
                <input id="slug" name="slug" defaultValue={profile.slug} className="w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none focus:border-accent" />
              </div>

              <div>
                <label htmlFor="bio" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Bio</label>
                <textarea id="bio" name="bio" defaultValue={profile.bio} className="min-h-[110px] w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none focus:border-accent" />
              </div>

              <div>
                <label htmlFor="location" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Location</label>
                <input id="location" name="location" defaultValue={profile.location || ''} className="w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none focus:border-accent" />
              </div>

              <div>
                <label htmlFor="website" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Website</label>
                <input id="website" name="website" defaultValue={profile.website || ''} className="w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none focus:border-accent" />
              </div>

              <div>
                <label htmlFor="isPublic" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Visibility</label>
                <select id="isPublic" name="isPublic" defaultValue={profile.isPublic ? 'true' : 'false'} className="w-full rounded-[12px] border border-border bg-card px-4 py-[14px] text-[15px] text-ink outline-none focus:border-accent">
                  <option value="true">Public profile</option>
                  <option value="false">Private profile</option>
                </select>
              </div>

              <PendingActionButton
                idle="Save profile"
                pending="Saving profile..."
                className="inline-flex w-full items-center justify-center rounded-[12px] bg-ink px-5 py-[14px] text-[15px] font-medium text-white transition hover:bg-accent"
              />
            </form>
          </aside>
        </div>
      </div>
    </ShowcaseShell>
  );
}
