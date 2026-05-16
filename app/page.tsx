import Link from 'next/link';

const platforms = [
  { label: 'X', short: 'X', className: 'bg-[#1A1814] text-[#FBF9F4]' },
  { label: 'LinkedIn', short: 'in', className: 'bg-[#0A66C2] text-white' },
  { label: 'Bluesky', short: 'B', className: 'bg-[#1185FE] text-white' },
  { label: 'Reddit', short: 'r', className: 'bg-[#FF4500] text-white' },
  { label: 'YouTube', short: '▶', className: 'bg-[#FF0033] text-white' },
  { label: 'Threads', short: '@', className: 'bg-[#1A1814] text-[#FBF9F4]' },
];

const publishLanes = [
  { name: 'Showcase', short: 'S', tone: 'bg-orange-700 text-stone-50', status: '0.3s', pill: 'bg-lime-100 text-lime-800' },
  { name: 'X', short: 'X', tone: 'bg-[#1A1814] text-[#FBF9F4]', status: '1.2s', pill: 'bg-lime-100 text-lime-800' },
  { name: 'LinkedIn', short: 'in', tone: 'bg-[#0A66C2] text-white', status: '2.1s', pill: 'bg-lime-100 text-lime-800' },
  { name: 'Bluesky', short: 'B', tone: 'bg-[#1185FE] text-white', status: '0.8s', pill: 'bg-lime-100 text-lime-800' },
  { name: 'Reddit', short: 'r', tone: 'bg-[#FF4500] text-white', status: 'uploading', pill: 'bg-amber-100 text-amber-800' },
  { name: 'YouTube', short: '▶', tone: 'bg-[#FF0033] text-white', status: '60s cap', pill: 'bg-rose-100 text-rose-800' },
];

const features = [
  {
    title: 'One composer, every platform',
    description:
      'Write in a single editor, choose where it goes, and keep platform-specific tweaks only when they actually matter.',
  },
  {
    title: 'See it before they see it',
    description:
      'Preview each platform before publishing, including character limits, format differences, and publish-time validation.',
  },
  {
    title: 'Fail narrow, not wide',
    description:
      'If one platform breaks, the rest still publish. Retry the broken lane instead of redoing the whole launch.',
  },
  {
    title: 'A URL that is all of you',
    description:
      'Your Showcase profile becomes the clean archive of everything you intentionally chose to publish.',
  },
  {
    title: 'The quieter feed',
    description:
      'A calmer stream of creator work, built from real posts rather than engagement bait, replies, and scraps.',
  },
  {
    title: 'You own your data',
    description:
      'Exportable content, no model training on your posts, and a product posture that respects the work you make.',
  },
];

function PlatformBadge({ short, className }: { short: string; className: string }) {
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-semibold ${className}`}>
      {short}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-stone-100 text-[#1A1814]">
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0.04 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 px-4 pt-5">
          <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-stone-300/80 bg-[#FBF9F4]/85 px-5 py-3 shadow-[0_10px_40px_-20px_rgba(26,24,20,0.15)] backdrop-blur">
            <Link href="/" className="flex items-center gap-2 font-serif text-xl font-medium tracking-tight">
              <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-orange-700" />
              Showcase
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              <a href="#how" className="rounded-full px-4 py-2 text-sm text-stone-700 transition hover:text-stone-950">
                How it works
              </a>
              <a href="#features" className="rounded-full px-4 py-2 text-sm text-stone-700 transition hover:text-stone-950">
                Features
              </a>
              <a href="#pricing" className="rounded-full px-4 py-2 text-sm text-stone-700 transition hover:text-stone-950">
                Pricing
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <a href="#" className="hidden rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:text-stone-950 sm:inline-flex">
                Sign in
              </a>
              <Link
                href="/showcase-app.html"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1814] px-4 py-2 text-sm font-medium text-stone-50 transition hover:-translate-y-0.5 hover:bg-orange-700"
              >
                Open app →
              </Link>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden px-6 pb-20 pt-24 md:px-10 md:pt-32">
          <div className="absolute right-[-10rem] top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(245,229,211,1)_0%,rgba(245,229,211,0)_65%)] opacity-70" />
          <div className="absolute bottom-0 left-[-10rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(184,84,31,0.08)_0%,rgba(184,84,31,0)_65%)]" />

          <div className="relative mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-[#FBF9F4] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone-700">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-700" />
              Now in private beta · 1,200 creators
            </div>

            <h1 className="mt-10 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-stone-950 md:text-7xl lg:text-[6.5rem]">
              Publish <span className="font-light italic text-orange-700">once.</span>
              <br />
              Reach <span className="font-light italic text-orange-700">everywhere.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-stone-700 md:text-2xl md:leading-10">
              One composer. Eight platforms. Per-platform previews. Real failure recovery. Your entire archive in one
              URL you actually own.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-700 px-7 py-4 text-sm font-medium text-stone-50 transition hover:-translate-y-0.5 hover:bg-[#1A1814]"
              >
                Start publishing, it&apos;s free →
              </a>
              <Link
                href="/showcase-app.html"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-[#FBF9F4] px-7 py-4 text-sm font-medium text-stone-900 transition hover:border-stone-500 hover:bg-stone-50"
              >
                See the app
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-stone-500">
              <span>Free forever tier</span>
              <span className="h-1 w-1 rounded-full bg-stone-400" />
              <span>No credit card</span>
              <span className="h-1 w-1 rounded-full bg-stone-400" />
              <span>Set up in 90 seconds</span>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone-500">
              Publish to all the places your audience is
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {platforms.map((platform) => (
                <div key={platform.label} className="flex items-center gap-3 text-sm font-medium text-stone-700">
                  <PlatformBadge short={platform.short} className={platform.className} />
                  <span>{platform.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-orange-700">The product</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] text-stone-950 md:text-6xl">
                One canvas, <span className="font-light italic text-orange-700">every stage.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-700">
                Write your post. Watch it render on every platform. Publish everywhere at once and know exactly what
                happened.
              </p>
            </div>

            <div className="mt-14 rounded-[2rem] border border-stone-300 bg-[#FBF9F4] p-6 shadow-[0_30px_80px_-40px_rgba(26,24,20,0.2)] md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-dashed border-stone-300 pb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-500">showcase.app · live composer</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-lime-700">● Publishing</span>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                <div className="rounded-2xl border border-stone-300 bg-stone-100 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-stone-500">Draft · 247 / 3000</p>
                  <p className="mt-4 font-serif text-2xl leading-10 text-stone-950">
                    The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter
                    to me reward intention. <span className="italic text-orange-700">#building</span>
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200 pt-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1814] px-3 py-1.5 text-xs font-medium text-stone-50">
                      <PlatformBadge short="S" className="bg-orange-700 text-stone-50" /> Showcase
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1814] px-3 py-1.5 text-xs font-medium text-stone-50">
                      <PlatformBadge short="X" className="bg-[#1A1814] text-[#FBF9F4]" /> X
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1814] px-3 py-1.5 text-xs font-medium text-stone-50">
                      <PlatformBadge short="in" className="bg-[#0A66C2] text-white" /> LinkedIn
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1A1814] px-3 py-1.5 text-xs font-medium text-stone-50">
                      <PlatformBadge short="B" className="bg-[#1185FE] text-white" /> Bluesky
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-[#FBF9F4] px-3 py-1.5 text-xs font-medium text-stone-700">
                      <PlatformBadge short="r" className="bg-[#FF4500] text-white" /> Reddit
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-[#FBF9F4] px-3 py-1.5 text-xs font-medium text-stone-700">
                      <PlatformBadge short="@" className="bg-[#1A1814] text-[#FBF9F4]" /> Threads
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-300 bg-stone-100 p-6">
                  <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-stone-500">
                    <span>Publish monitor</span>
                    <span className="text-lime-700">4 / 6</span>
                  </div>

                  <div className="space-y-2">
                    {publishLanes.map((lane) => (
                      <div key={lane.name} className="flex items-center gap-3 border-b border-stone-200 py-3 last:border-b-0">
                        <PlatformBadge short={lane.short} className={lane.tone} />
                        <span className="flex-1 text-sm font-medium text-stone-900">{lane.name}</span>
                        <span className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.05em] ${lane.pill}`}>
                          {lane.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-orange-700">What you get</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] text-stone-950 md:text-6xl">
                Built for creators who <span className="font-light italic text-orange-700">actually publish.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-700">
                Not a marketing suite. Not an enterprise dashboard. A tool that respects your attention and your time.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[1.5rem] border border-stone-300 bg-[#FBF9F4] p-8 transition hover:-translate-y-1 hover:border-stone-500"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                    <div className="h-3 w-3 rotate-45 rounded-[2px] bg-orange-700" />
                  </div>
                  <h3 className="font-serif text-2xl leading-tight text-stone-950">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-700">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-orange-700">Pricing</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] text-stone-950 md:text-6xl">
              Free to start. <span className="font-light italic text-orange-700">Fair to grow.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-700">
              A generous free tier, because the feed needs you. A paid tier, because we&apos;d like to keep the lights on.
            </p>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <div className="rounded-[1.5rem] border border-stone-300 bg-[#FBF9F4] p-8 text-left">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-500">Free</p>
                <p className="mt-4 font-serif text-5xl tracking-[-0.03em] text-stone-950">
                  <span className="font-light italic text-orange-700">$0</span>
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.05em] text-stone-500">Forever</p>
                <p className="mt-5 border-b border-stone-200 pb-5 text-sm leading-7 text-stone-700">
                  For creators trying it out and solo publishers who post a few times a week.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[#1A1814] bg-[#1A1814] p-8 text-left text-stone-50 shadow-[0_30px_70px_-40px_rgba(26,24,20,0.4)]">
                <p className="inline-flex rounded-full bg-orange-700 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-stone-50">
                  Most popular
                </p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-stone-400">Creator</p>
                <p className="mt-4 font-serif text-5xl tracking-[-0.03em]">
                  $<span className="font-light italic text-orange-400">8</span>
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.05em] text-stone-400">Per month</p>
                <p className="mt-5 border-b border-stone-700 pb-5 text-sm leading-7 text-stone-300">
                  For creators who publish consistently and want their profile to really represent them.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-stone-300 bg-[#FBF9F4] p-8 text-left">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-500">Pro</p>
                <p className="mt-4 font-serif text-5xl tracking-[-0.03em] text-stone-950">
                  $<span className="font-light italic text-orange-700">19</span>
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.05em] text-stone-500">Per month</p>
                <p className="mt-5 border-b border-stone-200 pb-5 text-sm leading-7 text-stone-700">
                  For power creators and small teams who need scheduling, analytics, and heavier workflows.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
