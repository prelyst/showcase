import Link from 'next/link';

const pages = [
  { href: '/showcase/feed', label: 'Feed' },
  { href: '/showcase/discover', label: 'Discover' },
  { href: '/showcase/notifications', label: 'Notifications' },
  { href: '/showcase/compose', label: 'Compose' },
  { href: '/showcase/monitor', label: 'Publish monitor' },
  { href: '/showcase/profile', label: 'Profile' },
  { href: '/showcase/settings', label: 'Settings' },
];

export default function ShowcaseIndexPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-16 text-ink md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">Showcase app</p>
          <h1 className="mt-4 font-serif text-5xl tracking-[-0.03em] md:text-6xl">App routes</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-subtle">
            We are converting the app prototype into real pages. Start from any screen below.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-[20px] border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-muted"
            >
              <div className="font-serif text-2xl tracking-[-0.02em] text-ink">{page.label}</div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                Open page →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
