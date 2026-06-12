import Link from 'next/link';
import { ReactNode } from 'react';

export function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-surface text-[#1A1814]">
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0.04 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-[2] mx-auto flex min-h-screen max-w-[1120px] items-center px-5 py-10 md:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_520px] lg:items-center">
          <section className="hidden lg:block">
            <Link href="/" className="mb-8 inline-flex items-center gap-2 font-serif text-[24px] tracking-[-0.02em] text-[#1A1814]">
              <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-[#B8541F]" />
              Showcase
            </Link>
            <div className="max-w-[520px]">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">{eyebrow}</div>
              <h1 className="mb-4 font-serif text-[48px] leading-[1.05] tracking-[-0.03em] text-[#1A1814]">{title}</h1>
              <p className="max-w-[460px] text-[16px] leading-[1.65] text-[#4A453C]">{description}</p>
            </div>
          </section>

          <section className="overflow-hidden rounded-[24px] border border-border bg-card shadow-[0_18px_60px_rgba(26,24,20,0.08)]">
            <div className="border-b border-divider px-6 py-5 md:hidden">
              <Link href="/" className="inline-flex items-center gap-2 font-serif text-[22px] tracking-[-0.02em] text-[#1A1814]">
                <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-[#B8541F]" />
                Showcase
              </Link>
            </div>
            <div className="px-6 py-6 sm:px-8 sm:py-8">{children}</div>
            {footer ? <div className="border-t border-divider bg-surface px-6 py-4 sm:px-8">{footer}</div> : null}
          </section>
        </div>
      </div>
    </main>
  );
}
