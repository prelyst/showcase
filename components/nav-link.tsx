'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

function UnreadDot({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="relative ml-auto flex h-[9px] w-[9px]" aria-label="Unread notifications" role="status">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
      <span
        className={`relative inline-flex h-[9px] w-[9px] rounded-full bg-accent ring-2 ${
          onDark ? 'ring-ink' : 'ring-card'
        }`}
      />
    </span>
  );
}

export function NavLink({
  href,
  label,
  icon,
  dot,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  dot?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-[11px] rounded-[9px] px-[11px] py-[9px] text-[14px] font-medium transition ${
        active
          ? 'bg-ink text-white shadow-[0_8px_18px_-10px_rgba(33,28,21,0.65)]'
          : 'text-subtle hover:bg-panel hover:text-ink'
      }`}
    >
      <span
        className={`grid h-[17px] w-[17px] place-items-center ${
          active ? 'opacity-100' : 'opacity-70'
        } [&>svg]:h-[17px] [&>svg]:w-[17px]`}
      >
        {icon}
      </span>
      <span>{label}</span>
      {dot ? <UnreadDot onDark={active} /> : null}
    </Link>
  );
}

export function MobileNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-full border px-3 py-2 text-[12px] font-medium transition ${
        active ? 'border-ink bg-ink text-white' : 'border-border bg-card text-subtle'
      }`}
    >
      {label}
    </Link>
  );
}
