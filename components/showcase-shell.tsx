import Link from 'next/link';
import { ReactNode } from 'react';

import { signOutAction } from '@/app/auth/sign-in/actions';
import { getUnreadNotificationCount } from '@/lib/repositories/notification-repository';
import { getCurrentUserView } from '@/lib/server/current-user';

const NOTIFICATIONS_HREF = '/showcase/notifications';

const browseNav = [
  {
    href: '/showcase/feed',
    label: 'Feed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
  },
  {
    href: '/showcase/discover',
    label: 'Discover',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    href: '/showcase/notifications',
    label: 'Notifications',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
  },
];

const yoursNav = [
  {
    href: '/showcase/monitor',
    label: 'Publish monitor',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    href: '/showcase/profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    href: '/showcase/settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    ),
  },
];

function UnreadDot({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="relative ml-auto flex h-[9px] w-[9px]" aria-label="Unread notifications" role="status">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
      <span className={`relative inline-flex h-[9px] w-[9px] rounded-full bg-accent ring-2 ${onDark ? 'ring-ink' : 'ring-card'}`} />
    </span>
  );
}

function NavLink({ href, label, icon, active, dot }: { href: string; label: string; icon: ReactNode; active?: boolean; dot?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-[11px] rounded-[9px] px-[11px] py-[9px] text-[14px] font-medium transition ${
        active
          ? 'bg-ink text-white shadow-[0_8px_18px_-10px_rgba(33,28,21,0.65)]'
          : 'text-subtle hover:bg-panel hover:text-ink'
      }`}
    >
      <span className={`grid h-[17px] w-[17px] place-items-center ${active ? 'opacity-100' : 'opacity-70'} [&>svg]:h-[17px] [&>svg]:w-[17px]`}>
        {icon}
      </span>
      <span>{label}</span>
      {dot ? <UnreadDot onDark={active} /> : null}
    </Link>
  );
}

export async function ShowcaseShell({ title, subtitle, active, children, loading = false }: { title: ReactNode; subtitle?: ReactNode; active?: string; children: ReactNode; loading?: boolean }) {
  const { user: currentUser } = await getCurrentUserView();

  if (!currentUser) {
    return null;
  }

  const hasUnread = (await getUnreadNotificationCount(currentUser.id)) > 0;

  return (
    <main className="min-h-screen bg-transparent text-ink">
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.22] mix-blend-multiply"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0.04 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />
      <div className="relative z-[2] grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="hidden h-screen border-r border-border bg-surface/60 px-5 py-7 backdrop-blur-md lg:sticky lg:top-0 lg:flex lg:flex-col">
          <Link href="/" className="group mb-9 flex items-center gap-[10px] px-2 font-serif text-[23px] font-medium tracking-[-0.02em]">
            <span className="h-[12px] w-[12px] rotate-45 rounded-[3px] bg-accent shadow-[0_0_0_4px_rgba(184,84,31,0.14)] transition group-hover:rotate-[135deg]" />
            Showcase
          </Link>

          <div className="mb-6">
            <div className="mb-[10px] px-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-muted">Browse</div>
            <div className="space-y-[2px]">
              {browseNav.map((item) => (
                <NavLink
                  key={item.href}
                  {...item}
                  active={!loading && active === item.href}
                  dot={item.href === NOTIFICATIONS_HREF && hasUnread}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-[10px] px-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-muted">Yours</div>
            <div className="space-y-[2px]">
              {yoursNav.map((item) => (
                <NavLink key={item.href} {...item} active={!loading && active === item.href} />
              ))}
            </div>
          </div>

          <div className="mt-auto border-t border-divider pt-5">
            <div className="flex items-center gap-[10px] rounded-[8px] px-[10px] py-2 hover:bg-panel">
              <div className="grid h-8 w-8 place-items-center rounded-full border border-border bg-accent-tint text-[12px] font-semibold text-accent">
                {currentUser.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium text-ink">{currentUser.displayName}</div>
                <div className="font-mono text-[11px] text-muted">@{currentUser.username}</div>
              </div>
              <form action={signOutAction}>
                <button className="rounded-[8px] border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.05em] text-subtle transition hover:bg-ink hover:text-white">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </aside>

        <div className="min-h-screen">
          <header className="sticky top-0 z-10 border-b border-border bg-surface/70 px-5 py-5 backdrop-blur-[14px] md:px-10">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <Link href="/showcase/feed" className="flex items-center gap-2 font-serif text-[20px] font-medium tracking-[-0.02em]">
                <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-accent" />
                Showcase
              </Link>
              <Link
                href="/showcase/compose"
                prefetch
                className="rounded-[10px] border border-border bg-card px-3 py-2 text-[12px] font-medium text-subtle transition hover:bg-ink hover:text-white"
              >
                Compose
              </Link>
            </div>

            <div className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {[...browseNav, ...yoursNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full border px-3 py-2 text-[12px] font-medium transition ${
                    !loading && active === item.href
                      ? 'border-ink bg-ink text-white'
                      : 'border-border bg-card text-subtle'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-end justify-between gap-5">
              <div>
                <div className="font-serif text-[30px] font-normal leading-[1.1] tracking-[-0.02em] text-ink">{title}</div>
                {subtitle ? <div className="mt-[6px] font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{subtitle}</div> : null}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/showcase/compose"
                  prefetch
                  className="hidden rounded-[10px] border border-border bg-card px-4 py-2 text-[13px] font-medium text-subtle transition hover:bg-ink hover:text-white lg:inline-flex"
                >
                  Compose
                </Link>
              </div>
            </div>
          </header>

          <div className="px-5 py-8 md:px-10 md:py-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
