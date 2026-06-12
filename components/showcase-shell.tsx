import Link from 'next/link';
import { ReactNode } from 'react';

import { signOutAction } from '@/app/auth/sign-in/actions';
import { DesktopNav, MobileNav } from '@/components/showcase-nav';
import { getUnreadNotificationCount } from '@/lib/repositories/notification-repository';
import { getCurrentUserView } from '@/lib/server/current-user';

/**
 * Synchronous chrome (sidebar + header). Renders no data of its own so it can be
 * used both by the async shell and by the instant loading skeleton.
 */
function ShowcaseChrome({
  title,
  subtitle,
  children,
  hasUnread,
  userCard,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  hasUnread: boolean;
  userCard: ReactNode;
}) {
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

          <DesktopNav hasUnread={hasUnread} />

          <div className="mt-auto border-t border-divider pt-5">{userCard}</div>
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

            <MobileNav />

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

export async function ShowcaseShell({ title, subtitle, children }: { title: ReactNode; subtitle?: ReactNode; active?: string; children: ReactNode; loading?: boolean }) {
  const { user: currentUser } = await getCurrentUserView();

  if (!currentUser) {
    return null;
  }

  const hasUnread = (await getUnreadNotificationCount(currentUser.id)) > 0;

  return (
    <ShowcaseChrome
      title={title}
      subtitle={subtitle}
      hasUnread={hasUnread}
      userCard={
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
      }
    >
      {children}
    </ShowcaseChrome>
  );
}

/**
 * Instant, fully synchronous loading fallback. Renders the same chrome as the
 * real shell (so the sidebar and header stay put) without awaiting any data,
 * which is what keeps loading.tsx from blanking the screen on first navigation.
 */
export function ShowcaseShellSkeleton({ title, subtitle, children }: { title: ReactNode; subtitle?: ReactNode; active?: string; children: ReactNode; loading?: boolean }) {
  return (
    <ShowcaseChrome
      title={title}
      subtitle={subtitle}
      hasUnread={false}
      userCard={
        <div className="flex items-center gap-[10px] rounded-[8px] px-[10px] py-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-skeleton" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-skeleton" />
            <div className="h-2.5 w-16 animate-pulse rounded bg-skeleton" />
          </div>
        </div>
      }
    >
      {children}
    </ShowcaseChrome>
  );
}
