'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const NOTIFICATIONS_HREF = '/showcase/notifications';

type NavItem = { href: string; label: string; icon: ReactNode };

const browseNav: NavItem[] = [
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

const yoursNav: NavItem[] = [
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
      aria-current={active ? 'page' : undefined}
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

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ hasUnread }: { hasUnread: boolean }) {
  const isActive = useIsActive();

  return (
    <>
      <div className="mb-6">
        <div className="mb-[10px] px-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-muted">Browse</div>
        <div className="space-y-[2px]">
          {browseNav.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={isActive(item.href)}
              dot={item.href === NOTIFICATIONS_HREF && hasUnread}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-[10px] px-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-muted">Yours</div>
        <div className="space-y-[2px]">
          {yoursNav.map((item) => (
            <NavLink key={item.href} {...item} active={isActive(item.href)} />
          ))}
        </div>
      </div>
    </>
  );
}

export function MobileNav() {
  const isActive = useIsActive();

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {[...browseNav, ...yoursNav].map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href) ? 'page' : undefined}
          className={`whitespace-nowrap rounded-full border px-3 py-2 text-[12px] font-medium transition ${
            isActive(item.href) ? 'border-ink bg-ink text-white' : 'border-border bg-card text-subtle'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
