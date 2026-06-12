'use client';

import Link from 'next/link';
import { useState } from 'react';

const faqItems = [
  {
    question: 'Do you read my existing content from other platforms?',
    answer:
      "No. Showcase only publishes, we do not ingest or scrape. Every post on Showcase exists because you wrote it here and chose to also send it elsewhere. Your archive grows as you publish.",
  },
  {
    question: "What happens when a platform's API changes or breaks?",
    answer:
      'Each platform has its own lane and failure state. If one platform breaks, the rest still publish, and you only need to retry the lane that failed.',
  },
  {
    question: "Can I edit a post after it's been cross-posted?",
    answer:
      'You can edit the Showcase version. External platform copies remain subject to the rules and limitations of those platforms.',
  },
  {
    question: "Why isn't Instagram available yet?",
    answer:
      'Instagram and TikTok require external platform approval for publishing access. The product is designed with those lanes in mind, but support depends on platform approval.',
  },
  {
    question: 'Is my Showcase profile public?',
    answer:
      'Yes by default, because the profile is intended to function as your public archive and portfolio. More privacy controls can sit on top later.',
  },
  {
    question: 'Why should I pay for this instead of using Buffer?',
    answer:
      'Because Showcase is not just a scheduler. It combines publishing, previews, a creator profile, a native feed, and a better archive in one product.',
  },
  {
    question: 'Do you train AI on my posts?',
    answer:
      'No. The product direction here is explicitly creator-first, archive-first, and trust-sensitive.',
  },
];

const platforms = [
  { label: 'X', short: 'X', className: 'bg-[#1A1814] text-white' },
  { label: 'LinkedIn', short: 'in', className: 'bg-[#0A66C2] text-white' },
  { label: 'Bluesky', short: 'B', className: 'bg-[#1185FE] text-white' },
  { label: 'Reddit', short: 'r', className: 'bg-[#FF4500] text-white' },
  { label: 'YouTube', short: '▶', className: 'bg-[#FF0033] text-white' },
  { label: 'Threads', short: '@', className: 'bg-[#1A1814] text-white border border-card' },
  { label: 'Instagram', short: 'IG', className: 'bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] text-white', soon: true },
  { label: 'TikTok', short: 'TT', className: 'bg-black text-white border border-cyan-300', soon: true },
];

const featureCards = [
  ['One composer, every platform', 'Write in a single editor. Select where it goes. Per-platform caption overrides when you need them.'],
  ['See it before they see it', 'Faithful per-platform previews. Character limits, aspect ratios, and file size validation before publish.'],
  ['Fail narrow, not wide', 'When one platform fails, the rest still go. Fix one lane instead of redoing the whole launch.'],
  ['A URL that is all of you', 'Your Showcase profile becomes a living portfolio, with every intentional post filterable by platform.'],
  ['The quieter feed', 'Browse a feed built only from things people meant to say. No replies. No quote-dunk sludge.'],
  ['You own your data', 'Export everything, close your account anytime, and do not expect your posts to become training fodder.'],
];

function IconBadge({ short, className }: { short: string; className: string }) {
  return <div className={`grid h-[26px] w-[26px] place-items-center rounded-[7px] font-mono text-[12px] font-bold ${className}`}>{short}</div>;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-surface font-sans text-[#1A1814]">
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 0.04 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-[2]">
        <nav className="fixed left-1/2 top-5 z-[100] w-[calc(100%-40px)] max-w-[1100px] -translate-x-1/2">
          <div className="flex items-center justify-between rounded-full border border-border bg-[rgba(251,249,244,0.82)] px-[22px] py-[14px] shadow-[0_10px_40px_-20px_rgba(26,24,20,0.15)] backdrop-blur-[16px]">
            <a href="#" className="flex items-center gap-2 font-serif text-[20px] font-medium tracking-[-0.02em]">
              <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-[#B8541F]" />
              Showcase
            </a>
            <div className="hidden items-center gap-1 md:flex">
              <a href="#how" className="rounded-full px-[14px] py-[7px] text-[14px] text-[#4A453C] hover:text-[#1A1814]">How it works</a>
              <a href="#features" className="rounded-full px-[14px] py-[7px] text-[14px] text-[#4A453C] hover:text-[#1A1814]">Features</a>
              <a href="#pricing" className="rounded-full px-[14px] py-[7px] text-[14px] text-[#4A453C] hover:text-[#1A1814]">Pricing</a>
              <a href="#faq" className="rounded-full px-[14px] py-[7px] text-[14px] text-[#4A453C] hover:text-[#1A1814]">FAQ</a>
            </div>
            <div className="flex items-center gap-2">
              <a href="#" className="hidden rounded-full px-[14px] py-2 text-[14px] font-medium text-[#4A453C] hover:text-[#1A1814] sm:inline-flex">
                Sign in
              </a>
              <Link href="/showcase/feed" className="inline-flex items-center gap-[6px] rounded-full bg-[#1A1814] px-[18px] py-[9px] text-[14px] font-medium text-white transition hover:-translate-y-px hover:bg-[#B8541F]">
                Open app →
              </Link>
            </div>
          </div>
        </nav>

        <section className="relative overflow-hidden px-8 pb-[100px] pt-[180px] text-center max-md:px-5 max-md:pb-[60px] max-md:pt-[140px]">
          <div className="pointer-events-none absolute right-[-150px] top-[20%] h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(245,229,211,1)_0%,transparent_65%)] opacity-55" />
          <div className="pointer-events-none absolute bottom-[10%] left-[-200px] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(184,84,31,0.08)_0%,transparent_65%)]" />
          <div className="relative z-[2] mx-auto max-w-[1100px]">
            <div className="inline-flex items-center gap-[10px] rounded-full border border-border bg-card px-[14px] py-[7px] font-mono text-[11px] uppercase tracking-[0.08em] text-[#4A453C]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#B8541F]" />
              Now in private beta · 1,200 creators
            </div>
            <h1 className="mt-10 font-serif text-[clamp(56px,8vw,104px)] font-normal leading-[0.95] tracking-[-0.04em] text-[#1A1814]">
              Publish <em className="font-light italic text-[#B8541F]">once.</em>
              <br />
              Reach <em className="font-light italic text-[#B8541F]">everywhere.</em>
            </h1>
            <p className="mx-auto mb-12 mt-9 max-w-[620px] text-[21px] leading-[1.55] text-[#4A453C]">
              One composer. Eight platforms. Per-platform previews. Real failure recovery. Your entire archive in one URL you actually own.
            </p>
            <div className="mb-16 flex flex-wrap items-center justify-center gap-[10px] max-md:flex-col">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-[#B8541F] px-[26px] py-[14px] text-[15px] font-medium text-white transition hover:-translate-y-px hover:bg-[#1A1814] max-md:w-full max-md:justify-center">
                Start publishing — it&apos;s free
                <span>→</span>
              </a>
              <Link href="/showcase/feed" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-[14px] text-[15px] font-medium text-[#1A1814] transition hover:border-[#85806F] hover:bg-panel max-md:w-full max-md:justify-center">
                See the app
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 font-mono text-[12px] tracking-[0.03em] text-[#85806F] max-md:gap-4">
              <span>Free forever tier</span>
              <span className="h-1 w-1 rounded-full bg-[#85806F]" />
              <span>No credit card</span>
              <span className="h-1 w-1 rounded-full bg-[#85806F]" />
              <span>Set up in 90 seconds</span>
            </div>
          </div>
        </section>

        <section className="px-8 pb-20 pt-10 text-center max-md:px-5">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.1em] text-[#85806F]">Publish to all the places your audience is</div>
            <div className="flex flex-wrap items-center justify-center gap-9 max-md:gap-5">
              {platforms.map((platform) => (
                <div key={platform.label} className="flex items-center gap-[10px] text-[15px] font-medium text-[#4A453C]">
                  <IconBadge short={platform.short} className={platform.className} />
                  <span>{platform.label}</span>
                  {platform.soon ? <span className="font-mono text-[11px] text-[#85806F]">soon</span> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="px-8 pb-10 pt-[60px] max-md:px-5">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto mb-16 max-w-[760px] text-center">
              <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#B8541F]">The product</div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.03em]">One canvas,<br /><em className="font-light italic text-[#B8541F]">every stage.</em></h2>
              <p className="mx-auto mt-5 max-w-[580px] text-[18px] leading-[1.55] text-[#4A453C]">Write your post. Watch it render on every platform. Publish everywhere at once — and know exactly what happens.</p>
            </div>

            <div className="mx-auto max-w-[1040px] rounded-[24px] border border-border bg-card p-7 shadow-[0_30px_80px_-40px_rgba(26,24,20,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] max-md:p-[18px]">
              <div className="mb-[22px] flex items-center justify-between border-b border-dashed border-border pb-[18px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">showcase.app · live composer</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]"><span className="mr-[6px] inline-block h-2 w-2 rounded-full bg-[#5A6B3A] shadow-[0_0_0_3px_#E5E8D4]" />Publishing</div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                <div className="rounded-[14px] border border-border bg-surface p-5">
                  <div className="mb-[14px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">Draft · 247 / 3000</div>
                  <div className="mb-[18px] font-serif text-[19px] leading-[1.45] text-[#1A1814]">
                    The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. <span className="font-medium italic text-[#B8541F]">#building</span>
                  </div>
                  <div className="flex flex-wrap gap-[6px] border-t border-divider pt-[14px] text-[12px] font-medium">
                    <div className="flex items-center gap-[6px] rounded-full border border-[#1A1814] bg-[#1A1814] px-[10px] py-[5px] text-white"><div className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#B8541F] font-mono text-[8px] font-bold text-white outline outline-1 outline-white">S</div>Showcase</div>
                    <div className="flex items-center gap-[6px] rounded-full border border-[#1A1814] bg-[#1A1814] px-[10px] py-[5px] text-white"><div className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#1A1814] font-mono text-[8px] font-bold text-white outline outline-1 outline-white">X</div>X</div>
                    <div className="flex items-center gap-[6px] rounded-full border border-[#1A1814] bg-[#1A1814] px-[10px] py-[5px] text-white"><div className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#0A66C2] font-mono text-[8px] font-bold text-white outline outline-1 outline-white">in</div>LinkedIn</div>
                    <div className="flex items-center gap-[6px] rounded-full border border-[#1A1814] bg-[#1A1814] px-[10px] py-[5px] text-white"><div className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#1185FE] font-mono text-[8px] font-bold text-white outline outline-1 outline-white">B</div>Bluesky</div>
                    <div className="flex items-center gap-[6px] rounded-full border border-border bg-card px-[10px] py-[5px] text-[#1A1814]"><div className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#FF4500] font-mono text-[8px] font-bold text-white">r</div>Reddit</div>
                    <div className="flex items-center gap-[6px] rounded-full border border-border bg-card px-[10px] py-[5px] text-[#1A1814]"><div className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#1A1814] font-mono text-[8px] font-bold text-white">@</div>Threads</div>
                  </div>
                </div>

                <div className="rounded-[14px] border border-border bg-surface p-[18px]">
                  <div className="mb-[10px] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">
                    <span>Publish monitor</span>
                    <span className="text-[#5A6B3A]">4 / 6</span>
                  </div>
                  {[
                    ['S', 'Showcase', 'bg-[#B8541F] text-white', '0.3s', 'bg-[#E5E8D4] text-[#5A6B3A]'],
                    ['X', 'X', 'bg-[#1A1814] text-white', '1.2s', 'bg-[#E5E8D4] text-[#5A6B3A]'],
                    ['in', 'LinkedIn', 'bg-[#0A66C2] text-white', '2.1s', 'bg-[#E5E8D4] text-[#5A6B3A]'],
                    ['B', 'Bluesky', 'bg-[#1185FE] text-white', '0.8s', 'bg-[#E5E8D4] text-[#5A6B3A]'],
                    ['r', 'Reddit', 'bg-[#FF4500] text-white', 'uploading', 'bg-[#F4E8C8] text-[#A67C1E]'],
                    ['▶', 'YouTube', 'bg-[#FF0033] text-white', '60s cap', 'bg-[#F2DCD1] text-[#A0381F]'],
                  ].map(([short, label, tone, status, pill]) => (
                    <div key={label} className="flex items-center gap-3 border-b border-divider py-[10px] text-[13px] last:border-b-0">
                      <div className={`grid h-[22px] w-[22px] place-items-center rounded-[5px] font-mono text-[10px] font-bold ${tone}`}>{short}</div>
                      <div className="flex-1 font-medium text-[#1A1814]">{label}</div>
                      <span className={`rounded-full px-2 py-[3px] font-mono text-[9px] uppercase tracking-[0.05em] ${pill}`}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 py-20 max-md:px-5">
          <div className="mx-auto max-w-[960px] border-y border-border">
            <div className="grid md:grid-cols-4">
              {[
                ['8', 'Platforms'],
                ['12.4k', 'Creators'],
                ['38.7k', 'Posts this week'],
                ['95%', 'Publish success'],
              ].map(([value, label], index) => (
                <div key={label} className={`border-divider px-8 py-8 text-center ${index < 3 ? 'md:border-r' : ''} ${index < 3 ? 'max-md:border-b' : ''}`}>
                  <div className="font-serif text-[48px] leading-none tracking-[-0.03em] text-[#1A1814]">{value.includes('.') ? <>{value.split('.')[0]}<em className="font-light italic text-[#B8541F]">.{value.split('.')[1]}</em></> : value.includes('%') ? <><em className="font-light italic text-[#B8541F]">{value.replace('%', '')}</em>%</> : <em className="font-light italic text-[#B8541F]">{value}</em>}</div>
                  <div className="mt-[10px] font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="px-8 py-[100px] max-md:px-5 max-md:py-[60px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto mb-16 max-w-[760px] text-center">
              <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#B8541F]">What you get</div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.03em]">Built for creators who<br /><em className="font-light italic text-[#B8541F]">actually publish.</em></h2>
              <p className="mx-auto mt-5 max-w-[580px] text-[18px] leading-[1.55] text-[#4A453C]">Not a marketing suite. Not an enterprise dashboard. A tool that respects your attention and your time.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {featureCards.map(([title, description]) => (
                <div key={title} className="rounded-[20px] border border-border bg-card p-8 transition hover:-translate-y-[3px] hover:border-[#85806F]">
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-[12px] bg-[#F5E5D3] text-[#B8541F]"><div className="h-3 w-3 rotate-45 rounded-[2px] bg-[#B8541F]" /></div>
                  <div className="font-serif text-[23px] font-medium leading-[1.2] tracking-[-0.01em]">{title}</div>
                  <div className="mt-[10px] text-[14px] leading-[1.55] text-[#4A453C]">{description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-8 pb-[40px] pt-[40px] max-md:px-5">
          <div className="mx-auto grid max-w-[1140px] items-center gap-20 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#B8541F]">The feed</div>
              <h3 className="font-serif text-[clamp(32px,4vw,46px)] font-normal leading-[1.1] tracking-[-0.025em]">Every post here is the<br />best thing its creator<br />wrote that week.</h3>
              <p className="mt-5 text-[17px] leading-[1.6] text-[#4A453C]">Because every post on Showcase is something a creator deliberately cross-published, the whole feed has a different feeling. Calmer. More intentional. Higher signal.</p>
              <ul className="mt-7 list-none">
                {[
                  'Following tab — chronological, no algorithm playing games',
                  'For You tab — surfaces creators whose hashtags overlap with yours',
                  'Quiet hours — mute the feed on your schedule, not the platform\'s',
                ].map((item) => (
                  <li key={item} className="flex gap-3 border-t border-divider py-[14px] text-[15px] text-[#1A1814] last:border-b">
                    <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#B8541F]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[20px] border border-border bg-card p-6 shadow-[0_30px_70px_-40px_rgba(26,24,20,0.2)]">
              <div className="mb-5 flex items-center gap-2 border-b border-dashed border-border pb-4">
                <div className="flex gap-[5px]"><span className="h-[10px] w-[10px] rounded-full bg-track" /><span className="h-[10px] w-[10px] rounded-full bg-track" /><span className="h-[10px] w-[10px] rounded-full bg-track" /></div>
                <div className="ml-[14px] rounded-[7px] border border-divider bg-surface px-[10px] py-[5px] font-mono text-[12px] text-[#85806F]">showcase.app/feed</div>
              </div>
              <div className="space-y-3">
                {([
                  ['EK', 'avatar-a', 'Elena Kowalski', '@elenakowalski · 2h', 'Spent the morning reading through my old design files from 2019. The through-line I missed at the time is obvious now: I was solving the wrong problem. #design', ['X', 'in', 'B']],
                  ['PR', 'avatar-c', 'Priya Rajan', '@priya.writes · 6h', 'An underrated kind of privilege: being able to post less. #creator', ['X', 'B', '@']],
                  ['DW', 'avatar-d', 'David Wen', '@dwen · 11h', 'Three-day experiment: I only posted the things I wrote in a notebook first. My engagement went down. My satisfaction went up. Keeping it.', ['X', 'in']],
                ] as [string, string, string, string, string, string[]][]).map(([initials, avatarClass, name, meta, body, chips]) => (
                  <div key={name} className="rounded-[12px] border border-divider bg-surface p-4">
                    <div className="mb-[10px] flex items-center gap-[10px]">
                      <div className={`grid h-9 w-9 place-items-center rounded-full border border-border text-[13px] font-semibold ${avatarClass === 'avatar-a' ? 'bg-[#F5E5D3] text-[#B8541F]' : avatarClass === 'avatar-c' ? 'bg-[#DCD4E8] text-[#5A4A78]' : 'bg-[#D4E3E8] text-[#3A5A6B]'}`}>{initials}</div>
                      <div>
                        <div className="text-[13px] font-medium text-[#1A1814]">{name}</div>
                        <div className="font-mono text-[11px] text-[#85806F]">{meta}</div>
                      </div>
                    </div>
                    <div className="font-serif text-[14px] leading-[1.5] text-[#1A1814]">{body.replace('#design', '').replace('#creator', '')}<span className="font-medium italic text-[#B8541F]">{body.includes('#design') ? '#design' : body.includes('#creator') ? '#creator' : ''}</span></div>
                    <div className="mt-[10px] flex items-center justify-between border-t border-divider pt-[10px] font-mono text-[10px] text-[#85806F]">
                      <span>127 likes · 18 comments</span>
                      <div className="flex gap-[3px]">
                        {(chips as string[]).map((chip) => (
                          <div key={chip} className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#1A1814] font-mono text-[8px] font-bold text-white">{chip}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 pb-[40px] pt-[40px] max-md:px-5">
          <div className="mx-auto grid max-w-[1140px] items-center gap-20 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-[20px] border border-border bg-card p-6 shadow-[0_30px_70px_-40px_rgba(26,24,20,0.2)] max-lg:order-2">
              <div className="mb-5 flex items-center gap-2 border-b border-dashed border-border pb-4">
                <div className="flex gap-[5px]"><span className="h-[10px] w-[10px] rounded-full bg-track" /><span className="h-[10px] w-[10px] rounded-full bg-track" /><span className="h-[10px] w-[10px] rounded-full bg-track" /></div>
                <div className="ml-[14px] rounded-[7px] border border-divider bg-surface px-[10px] py-[5px] font-mono text-[12px] text-[#85806F]">showcase.app/@mayarivera</div>
              </div>
              <div className="mb-[18px] flex items-center gap-[14px]">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-border bg-[#F5E5D3] font-serif text-[20px] font-medium text-[#B8541F]">MR</div>
                <div>
                  <div className="font-serif text-[22px] font-medium tracking-[-0.01em]">Maya Rivera</div>
                  <div className="font-mono text-[12px] text-[#85806F]">Writer · 184 posts · 2,847 followers</div>
                </div>
              </div>
              <div className="mb-[14px] flex gap-[6px] overflow-hidden">
                <div className="flex items-center gap-1 rounded-full border border-[#1A1814] bg-[#1A1814] px-[10px] py-[5px] text-[11px] font-medium text-white">All 184</div>
                <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-[10px] py-[5px] text-[11px] font-medium text-[#4A453C]"><span className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#B8541F] font-mono text-[8px] font-bold text-white">S</span>Showcase</div>
                <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-[10px] py-[5px] text-[11px] font-medium text-[#4A453C]"><span className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#1A1814] font-mono text-[8px] font-bold text-white">X</span>X 172</div>
                <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-[10px] py-[5px] text-[11px] font-medium text-[#4A453C]"><span className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#0A66C2] font-mono text-[8px] font-bold text-white">in</span>LinkedIn 48</div>
              </div>
              <div className="grid gap-[10px] md:grid-cols-2">
                {[
                  'The thing I keep coming back to: most social platforms reward volume. The feeds that matter reward intention.',
                  'An essay I\'ve been sitting on for eight months is finally going out tomorrow.',
                  'Book progress: chapter 4 done. It took me three weeks longer than I hoped.',
                  'A principle I keep testing: the platforms that make you post more are not the ones that make you better.',
                ].map((text, index) => (
                  <div key={text} className="rounded-[10px] border border-divider bg-surface p-[14px]">
                    <div className="mb-2 flex items-center gap-[6px] font-mono text-[9px] uppercase tracking-[0.05em] text-[#85806F]"><span className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#B8541F] font-mono text-[8px] font-bold text-white">S</span>{index % 2 === 0 ? '5 platforms · Apr 21' : '3 platforms · Apr 19'}</div>
                    <div className="font-serif text-[12px] leading-[1.4] text-[#1A1814]">{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-lg:order-1">
              <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#B8541F]">Your profile</div>
              <h3 className="font-serif text-[clamp(32px,4vw,46px)] font-normal leading-[1.1] tracking-[-0.025em]">The one link<br />that <em className="font-light italic text-[#B8541F]">actually</em><br />represents you.</h3>
              <p className="mt-5 text-[17px] leading-[1.6] text-[#4A453C]">Stop sending people to a Linktree, a personal site, and five social profiles. Your Showcase URL is the place where everything you publish lives — filtered, organized, yours.</p>
              <ul className="mt-7 list-none">
                {[
                  'Filter your posts by platform with one tap',
                  'Every post shows where else it was published',
                  'Custom domain on Creator tier — yourname.com becomes your showcase',
                  'Open Graph handled automatically, looks good everywhere',
                ].map((item) => (
                  <li key={item} className="flex gap-3 border-t border-divider py-[14px] text-[15px] text-[#1A1814] last:border-b">
                    <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#B8541F]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-8 py-[120px] text-center max-md:px-5">
          <div className="relative mx-auto max-w-[880px]">
            <div className="pointer-events-none absolute left-1/2 top-[-60px] -translate-x-1/2 font-serif text-[200px] italic leading-none text-[#B8541F] opacity-15 max-md:top-[-40px] max-md:text-[140px]">&quot;</div>
            <div className="relative z-[2] font-serif text-[clamp(24px,3.5vw,40px)] leading-[1.35] tracking-[-0.02em] text-[#1A1814]">
              I stopped copying the same post into six tabs. My publishing got sharper because <em className="font-light italic text-[#B8541F]">I could actually see it</em> before my audience did.
            </div>
            <div className="mt-8 inline-flex items-center justify-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-border bg-[#DCD4E8] text-[14px] font-semibold text-[#5A4A78]">PR</div>
              <div className="text-left">
                <div className="text-[15px] font-medium text-[#1A1814]">Priya Rajan</div>
                <div className="font-mono text-[11px] tracking-[0.03em] text-[#85806F]">Essayist · Showcase creator since January</div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="px-8 py-[100px] max-md:px-5 max-md:py-[60px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto mb-16 max-w-[760px] text-center">
              <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#B8541F]">Pricing</div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.03em]">Free to start.<br /><em className="font-light italic text-[#B8541F]">Fair to grow.</em></h2>
              <p className="mx-auto mt-5 max-w-[580px] text-[18px] leading-[1.55] text-[#4A453C]">A generous free tier, because the feed needs you. A paid tier, because we&apos;d like to keep the lights on.</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-[20px] border border-border bg-card p-[36px_32px]">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Free</div>
                <div className="font-serif text-[52px] leading-none tracking-[-0.03em]"><em className="font-light italic text-[#B8541F]">$0</em></div>
                <div className="mb-[22px] mt-[6px] font-mono text-[11px] uppercase tracking-[0.05em] text-[#85806F]">Forever</div>
                <div className="mb-6 border-b border-divider pb-6 text-[14px] leading-[1.5] text-[#4A453C]">For creators trying us out and solo publishers who post a few times a week.</div>
              </div>
              <div className="relative rounded-[20px] border border-[#1A1814] bg-[#1A1814] p-[36px_32px] text-white">
                <div className="absolute left-8 top-[-10px] rounded-full bg-[#B8541F] px-[10px] py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white">Most popular</div>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[rgba(251,249,244,0.6)]">Creator</div>
                <div className="font-serif text-[52px] leading-none tracking-[-0.03em]">$<em className="font-light italic text-[#E87D3F]">8</em></div>
                <div className="mb-[22px] mt-[6px] font-mono text-[11px] uppercase tracking-[0.05em] text-[rgba(251,249,244,0.6)]">Per month</div>
                <div className="mb-6 border-b border-[rgba(251,249,244,0.15)] pb-6 text-[14px] leading-[1.5] text-[rgba(251,249,244,0.75)]">For creators who publish consistently and want their profile to really represent them.</div>
              </div>
              <div className="rounded-[20px] border border-border bg-card p-[36px_32px]">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Pro</div>
                <div className="font-serif text-[52px] leading-none tracking-[-0.03em]">$<em className="font-light italic text-[#B8541F]">19</em></div>
                <div className="mb-[22px] mt-[6px] font-mono text-[11px] uppercase tracking-[0.05em] text-[#85806F]">Per month</div>
                <div className="mb-6 border-b border-divider pb-6 text-[14px] leading-[1.5] text-[#4A453C]">For power creators, freelancers, and small teams who need scheduling and analytics.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-8 py-[100px] max-md:px-5 max-md:py-[60px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto mb-16 max-w-[760px] text-center">
              <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#B8541F]">Questions</div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.03em]">Things people<br /><em className="font-light italic text-[#B8541F]">actually ask.</em></h2>
            </div>
            <div className="mx-auto max-w-[780px]">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.question} className={`cursor-pointer border-b border-border py-6 ${index === 0 ? 'border-t' : ''}`} onClick={() => setOpenFaq(isOpen ? null : index)}>
                    <div className="flex items-start justify-between gap-5">
                      <div className="font-serif text-[22px] font-medium leading-[1.3] tracking-[-0.01em] text-[#1A1814]">{item.question}</div>
                      <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition ${isOpen ? 'border-[#B8541F] bg-[#B8541F] text-white' : 'bg-panel text-[#1A1814]'}`}>
                        <span className={`text-sm transition ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </div>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'mt-[14px] max-h-[300px]' : 'max-h-0'}`}>
                      <div className="max-w-[640px] pb-1 text-[15px] leading-[1.6] text-[#4A453C]">{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-8 py-[140px] text-center max-md:px-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,229,211,1)_0%,transparent_65%)] opacity-70" />
          <div className="relative z-[2] mx-auto max-w-[820px]">
            <h2 className="mb-6 font-serif text-[clamp(44px,6vw,72px)] font-normal leading-none tracking-[-0.035em]">The quieter way<br />to <em className="font-light italic text-[#B8541F]">publish everywhere.</em></h2>
            <p className="mx-auto mb-10 max-w-[580px] text-[19px] leading-[1.55] text-[#4A453C]">Join 12,400 creators using Showcase to build a portfolio that grows every time they post. Free to start. Takes 90 seconds.</p>
            <div className="flex flex-wrap items-center justify-center gap-[10px] max-md:flex-col">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-[#B8541F] px-[26px] py-[14px] text-[15px] font-medium text-white transition hover:-translate-y-px hover:bg-[#1A1814] max-md:w-full max-md:justify-center">Start publishing free →</a>
              <Link href="/showcase/feed" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-[14px] text-[15px] font-medium text-[#1A1814] transition hover:border-[#85806F] hover:bg-panel max-md:w-full max-md:justify-center">Explore the app</Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-card px-8 pb-10 pt-20 max-md:px-5">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-[60px] grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
              <div className="max-w-[340px]">
                <a href="#" className="flex items-center gap-2 font-serif text-[20px] font-medium tracking-[-0.02em]"><span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-[#B8541F]" />Showcase</a>
                <div className="mt-4 font-serif text-[16px] italic leading-[1.5] text-[#4A453C]">The quieter way to publish everywhere. Built for creators who actually have something to say.</div>
              </div>
              {([
                ['Product', ['Features', 'Pricing', 'Open app', 'Changelog', 'Status']],
                ['Company', ['About', 'Blog', 'Careers', 'Press kit', 'Contact']],
                ['Legal', ['Terms', 'Privacy', 'Security', 'DMCA', 'Community guidelines']],
              ] as [string, string[]][]).map(([title, links]) => (
                <div key={title}>
                  <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">{title}</div>
                  <ul className="space-y-[10px]">
                    {links.map((link) => (
                      <li key={link}><a href="#" className="text-[14px] text-[#4A453C] hover:text-[#B8541F]">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-[14px] border-t border-divider pt-8">
              <div className="font-mono text-[11px] tracking-[0.03em] text-[#85806F]">© 2026 Showcase Labs · Made with restraint</div>
              <div className="flex gap-1">
                {['B', 'X', 'GH'].map((icon) => (
                  <a key={icon} href="#" className="grid h-8 w-8 place-items-center rounded-[8px] border border-border bg-surface text-[12px] text-[#4A453C] transition hover:border-[#1A1814] hover:bg-[#1A1814] hover:text-white">{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
