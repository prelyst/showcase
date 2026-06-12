import Link from 'next/link';
import { ReactNode } from 'react';

import { signOutAction } from '@/app/auth/sign-in/actions';
import { getCurrentUserView } from '@/lib/server/current-user';

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
    badge: '3',
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

function NavLink({ href, label, icon, active, badge }: { href: string; label: string; icon: ReactNode; active?: boolean; badge?: string }) {
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
      {badge ? (
        <span className="ml-auto rounded-full bg-accent px-[7px] py-[2px] font-mono text-[10px] font-semibold text-white shadow-[0_0_0_3px_rgba(184,84,31,0.16)]">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export async function ShowcaseShell({ title, subtitle, active, children, loading = false }: { title: ReactNode; subtitle?: ReactNode; active?: string; children: ReactNode; loading?: boolean }) {
  const { user: currentUser } = await getCurrentUserView();

  if (!currentUser) {
    return null;
  }

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
        <aside className="hidden h-screen border-r border-border bg-[rgba(250,244,234,0.6)] px-5 py-7 backdrop-blur-md lg:sticky lg:top-0 lg:flex lg:flex-col">
          <Link href="/" className="group mb-9 flex items-center gap-[10px] px-2 font-serif text-[23px] font-medium tracking-[-0.02em]">
            <span className="h-[12px] w-[12px] rotate-45 rounded-[3px] bg-accent shadow-[0_0_0_4px_rgba(184,84,31,0.14)] transition group-hover:rotate-[135deg]" />
            Showcase
          </Link>

          <Link
            href="/showcase/compose"
            prefetch
            className="mb-5 flex items-center justify-center gap-2 rounded-[11px] bg-accent px-[14px] py-[11px] text-[14px] font-medium text-white shadow-[0_8px_20px_-10px_rgba(184,84,31,0.7)] transition hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_12px_26px_-10px_rgba(184,84,31,0.8)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-[14px] w-[14px]">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>New post</span>
          </Link>

          <div className="mb-6">
            <div className="mb-[10px] px-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">Browse</div>
            <div className="space-y-[2px]">
              {browseNav.map((item) => (
                <NavLink key={item.href} {...item} active={!loading && active === item.href} />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-[10px] px-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">Yours</div>
            <div className="space-y-[2px]">
              {yoursNav.map((item) => (
                <NavLink key={item.href} {...item} active={!loading && active === item.href} />
              ))}
            </div>
          </div>

          <div className="mt-auto border-t border-divider pt-5">
            <div className="flex items-center gap-[10px] rounded-[8px] px-[10px] py-2 hover:bg-panel">
              <div className="grid h-8 w-8 place-items-center rounded-full border border-border bg-[#F5E5D3] text-[12px] font-semibold text-[#B8541F]">
                {currentUser.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium text-[#1A1814]">{currentUser.displayName}</div>
                <div className="font-mono text-[11px] text-[#85806F]">@{currentUser.username}</div>
              </div>
              <form action={signOutAction}>
                <button className="rounded-[8px] border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.05em] text-[#4A453C] transition hover:bg-[#1A1814] hover:text-white">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </aside>

        <div className="min-h-screen">
          <header className="sticky top-0 z-10 border-b border-border bg-[rgba(250,244,234,0.72)] px-5 py-5 backdrop-blur-[14px] md:px-10">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <Link href="/showcase/feed" className="flex items-center gap-2 font-serif text-[20px] font-medium tracking-[-0.02em]">
                <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-[#B8541F]" />
                Showcase
              </Link>
              <Link
                href="/showcase/compose"
                prefetch
                className="rounded-[10px] border border-border bg-card px-3 py-2 text-[12px] font-medium text-[#4A453C] transition hover:bg-[#1A1814] hover:text-white"
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
                      ? 'border-[#1A1814] bg-[#1A1814] text-white'
                      : 'border-border bg-card text-[#4A453C]'
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
              <Link
                href="/showcase/compose"
                prefetch
                className="hidden rounded-[10px] border border-border bg-card px-4 py-2 text-[13px] font-medium text-[#4A453C] transition hover:bg-[#1A1814] hover:text-white lg:inline-flex"
              >
                Compose
              </Link>
            </div>
          </header>

          <div className="px-5 py-8 md:px-10 md:py-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
