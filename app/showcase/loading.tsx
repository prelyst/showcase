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
    <ShowcaseShell
      title={<><span>Loading </span><em className="font-light italic text-[#B8541F]">/ content</em></>}
      loading
    >
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
    </ShowcaseShell>
  );
}
