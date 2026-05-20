import { ShowcaseShell } from '@/components/showcase-shell';

function SidebarCard() {
  return (
    <div className="rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4] p-5">
      <div className="mb-4 h-4 w-28 rounded bg-[#E8E3D4]" />
      <div className="space-y-3">
        <div className="h-3 w-full rounded bg-[#EFE9DD]" />
        <div className="h-3 w-[88%] rounded bg-[#EFE9DD]" />
        <div className="h-3 w-[72%] rounded bg-[#EFE9DD]" />
      </div>
    </div>
  );
}

function FeedCard() {
  return (
    <div className="border-b border-[#E8E3D4] py-6 first:pt-0 animate-pulse">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#E8E3D4]" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-[#E8E3D4]" />
          <div className="h-3 w-24 rounded bg-[#EFE9DD]" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-[#EFE9DD]" />
        <div className="h-4 w-[94%] rounded bg-[#EFE9DD]" />
        <div className="h-4 w-[76%] rounded bg-[#EFE9DD]" />
      </div>
      <div className="mt-5 flex gap-6">
        <div className="h-3 w-12 rounded bg-[#E8E3D4]" />
        <div className="h-3 w-12 rounded bg-[#E8E3D4]" />
        <div className="h-3 w-12 rounded bg-[#E8E3D4]" />
      </div>
    </div>
  );
}

export default function ShowcaseLoading() {
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
        <aside className="hidden h-screen border-r border-[#E8E3D4] bg-[#F4F1EA] px-5 py-7 lg:flex lg:flex-col">
          <div className="mb-9 flex items-center gap-2 px-2 font-serif text-[22px] font-medium tracking-[-0.02em]">
            <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-[#B8541F]" />
            Showcase
          </div>
          <div className="mb-5 h-11 rounded-[10px] bg-[#D97A46]" />
          <div className="space-y-[2px]">
            {['Feed', 'Discover', 'Notifications', 'Publish monitor', 'Profile', 'Settings'].map((label) => (
              <div key={label} className="rounded-[8px] px-[10px] py-2 text-[14px] font-medium text-[#4A453C]">
                {label}
              </div>
            ))}
          </div>
        </aside>

        <div className="min-h-screen">
          <header className="sticky top-0 z-10 border-b border-[#E8E3D4] bg-[rgba(244,241,234,0.88)] px-5 py-5 backdrop-blur-[12px] md:px-10">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-2 font-serif text-[20px] font-medium tracking-[-0.02em]">
                <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] bg-[#B8541F]" />
                Showcase
              </div>
              <div className="h-9 w-20 rounded-[10px] bg-[#E8E3D4]" />
            </div>
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {['Feed', 'Discover', 'Notifications', 'Monitor', 'Profile', 'Settings'].map((label) => (
                <div key={label} className="whitespace-nowrap rounded-full border border-[#D9D3C4] bg-[#FBF9F4] px-3 py-2 text-[12px] font-medium text-[#4A453C]">
                  {label}
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between gap-5">
              <div>
                <div className="font-serif text-[28px] font-normal tracking-[-0.02em] text-[#1A1814]">
                  <span>Loading </span><em className="font-light italic text-[#B8541F]">/ content</em>
                </div>
              </div>
              <div className="hidden h-10 w-24 rounded-[10px] bg-[#E8E3D4] lg:block" />
            </div>
          </header>

          <div className="px-5 py-8 md:px-10 md:py-8">
            <div className="grid max-w-[1100px] gap-10 xl:grid-cols-[1fr_320px] animate-pulse">
              <div>
                <div className="mb-6 flex border-b border-[#D9D3C4]">
                  <div className="-mb-px h-10 w-24 border-b-2 border-[#B8541F] opacity-40" />
                  <div className="ml-4 h-10 w-20" />
                  <div className="ml-4 h-10 w-24" />
                </div>

                <FeedCard />
                <FeedCard />
                <FeedCard />
              </div>

              <aside className="space-y-5">
                <SidebarCard />
                <SidebarCard />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
