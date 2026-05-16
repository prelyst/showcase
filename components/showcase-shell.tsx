import Link from 'next/link';
import { ReactNode } from 'react';

const browseNav = [
  { href: '/showcase/feed', label: 'Feed', icon: '≡' },
  { href: '/showcase/discover', label: 'Discover', icon: '⌕' },
  { href: '/showcase/notifications', label: 'Notifications', icon: '◔', badge: '3' },
];

const yoursNav = [
  { href: '/showcase/monitor', label: 'Publish monitor', icon: '∿' },
  { href: '/showcase/profile', label: 'Profile', icon: '◯' },
  { href: '/showcase/settings', label: 'Settings', icon: '⚙' },
];

function NavLink({ href, label, icon, active, badge }: { href: string; label: string; icon: string; active?: boolean; badge?: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-[11px] rounded-[8px] px-[10px] py-2 text-[14px] font-medium transition ${
        active ? 'bg-[#1A1814] text-[#F4F1EA]' : 'text-[#4A453C] hover:bg-[#EDE8DD] hover:text-[#1A1814]'
      }`}
    >
      <span className={`grid h-[17px] w-[17px] place-items-center text-[12px] ${active ? 'opacity-100' : 'opacity-70'}`}>{icon}</span>
      <span>{label}</span>
      {badge ? (
        <span className="ml-auto rounded-full bg-[#B8541F] px-[6px] py-[2px] font-mono text-[10px] font-semibold text-[#F4F1EA]">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function ShowcaseShell({ title, subtitle, active, children }: { title: ReactNode; subtitle?: ReactNode; active: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F4F1EA] text-[#1A1814]">
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0.04 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />
      <div className="relative z-[2] grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="hidden h-screen border-r border-[#E8E3D4] bg-[#F4F1EA] px-5 py-7 lg:sticky lg:top-0 lg:flex lg:flex-col">
          <Link href="/" className="mb-9 flex items-center gap-2 px-2 font-serif text-[22px] font-medium tracking-[-0.02em]">
            <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-[#B8541F]" />
            Showcase
          </Link>

          <Link
            href="/showcase/compose"
            className="mb-5 flex items-center justify-center gap-2 rounded-[10px] bg-[#B8541F] px-[14px] py-[11px] text-[14px] font-medium text-[#F4F1EA] transition hover:-translate-y-px hover:bg-[#1A1814]"
          >
            <span className="text-[14px]">+</span>
            <span>New post</span>
          </Link>

          <div className="mb-6">
            <div className="mb-[10px] px-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">Browse</div>
            <div className="space-y-[2px]">
              {browseNav.map((item) => (
                <NavLink key={item.href} {...item} active={active === item.href} />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-[10px] px-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">Yours</div>
            <div className="space-y-[2px]">
              {yoursNav.map((item) => (
                <NavLink key={item.href} {...item} active={active === item.href} />
              ))}
            </div>
          </div>

          <div className="mt-auto border-t border-[#E8E3D4] pt-5">
            <div className="flex items-center gap-[10px] rounded-[8px] px-[10px] py-2 hover:bg-[#EDE8DD]">
              <div className="grid h-8 w-8 place-items-center rounded-full border border-[#D9D3C4] bg-[#F5E5D3] text-[12px] font-semibold text-[#B8541F]">
                MR
              </div>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium text-[#1A1814]">Maya Rivera</div>
                <div className="font-mono text-[11px] text-[#85806F]">@mayarivera</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-h-screen">
          <header className="sticky top-0 z-10 border-b border-[#E8E3D4] bg-[rgba(244,241,234,0.88)] px-5 py-5 backdrop-blur-[12px] md:px-10">
            <div className="flex items-end justify-between gap-5">
              <div>
                <div className="font-serif text-[28px] font-normal tracking-[-0.02em] text-[#1A1814]">{title}</div>
                {subtitle ? <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.05em] text-[#85806F]">{subtitle}</div> : null}
              </div>
              <Link
                href="/showcase/compose"
                className="rounded-[10px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-2 text-[13px] font-medium text-[#4A453C] transition hover:bg-[#1A1814] hover:text-[#F4F1EA]"
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
