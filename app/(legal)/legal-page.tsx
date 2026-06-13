import Link from 'next/link';
import type { ReactNode } from 'react';

/** Shared chrome for the public legal pages (privacy, terms, data deletion). */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-surface text-ink">
      <header className="border-b border-border bg-card px-8 py-5 max-md:px-5">
        <div className="mx-auto flex max-w-[820px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-[20px] font-medium tracking-[-0.02em]">
            <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-accent" />
            Showcase
          </Link>
          <Link href="/" className="text-[14px] text-subtle hover:text-accent">
            ← Back to home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[820px] px-8 py-16 max-md:px-5">
        <h1 className="font-serif text-[34px] font-medium tracking-[-0.02em]">{title}</h1>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Last updated {updated}</p>
        <div className="prose-legal mt-10 space-y-6 text-[15px] leading-[1.7] text-subtle">{children}</div>
      </article>

      <footer className="border-t border-border bg-card px-8 py-8 max-md:px-5">
        <div className="mx-auto flex max-w-[820px] flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-[11px] tracking-[0.03em] text-muted">© 2026 Showcase Labs</div>
          <nav className="flex gap-5 text-[13px] text-subtle">
            <Link href="/privacy" className="hover:text-accent">Privacy</Link>
            <Link href="/terms" className="hover:text-accent">Terms</Link>
            <Link href="/data-deletion" className="hover:text-accent">Data deletion</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-[20px] font-medium text-ink">{heading}</h2>
      {children}
    </section>
  );
}
