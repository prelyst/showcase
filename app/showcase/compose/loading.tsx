import { ShowcaseShell } from '@/components/showcase-shell';

export default function ComposeLoading() {
  return (
    <ShowcaseShell title={<><span>New post </span><em className="font-light italic text-[#B8541F]">/ draft</em></>} active="/showcase/compose">
      <div className="grid max-w-[1200px] gap-7 xl:grid-cols-[1.1fr_1fr] animate-pulse">
        <div className="overflow-hidden rounded-[16px] border border-border bg-card">
          <div className="flex items-center justify-between border-b border-divider px-[22px] py-4">
            <div className="h-3 w-14 rounded bg-skeleton" />
            <div className="h-3 w-16 rounded bg-skeleton" />
          </div>
          <div className="p-[22px]">
            <div className="mb-[18px] flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-skeleton" />
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-skeleton" />
                <div className="h-3 w-20 rounded bg-skeleton" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 w-full rounded bg-skeleton" />
              <div className="h-6 w-[92%] rounded bg-skeleton" />
              <div className="h-6 w-[74%] rounded bg-skeleton" />
              <div className="h-6 w-[88%] rounded bg-skeleton" />
              <div className="h-6 w-[60%] rounded bg-skeleton" />
            </div>
            <div className="mt-8 flex gap-2">
              <div className="h-8 w-8 rounded-[10px] bg-skeleton" />
              <div className="h-8 w-8 rounded-[10px] bg-skeleton" />
              <div className="h-8 w-8 rounded-[10px] bg-skeleton" />
              <div className="h-8 w-8 rounded-[10px] bg-skeleton" />
            </div>
          </div>
          <div className="border-t border-divider bg-panel px-[22px] py-[18px]">
            <div className="mb-3 h-3 w-24 rounded bg-[#DDD6C8]" />
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-24 rounded-full bg-surface" />
              <div className="h-8 w-20 rounded-full bg-surface" />
              <div className="h-8 w-24 rounded-full bg-surface" />
              <div className="h-8 w-24 rounded-full bg-surface" />
            </div>
          </div>
          <div className="flex justify-end gap-[10px] border-t border-divider bg-panel px-[22px] py-[18px]">
            <div className="h-10 w-24 rounded-[10px] bg-surface" />
            <div className="h-10 w-28 rounded-[10px] bg-[#D97A46]" />
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-border bg-card">
          <div className="flex items-center justify-between border-b border-divider px-[22px] py-4">
            <div className="h-3 w-20 rounded bg-skeleton" />
            <div className="flex gap-2">
              <div className="h-7 w-16 rounded-[6px] bg-[#DDD6C8]" />
              <div className="h-7 w-10 rounded-[6px] bg-skeleton" />
              <div className="h-7 w-16 rounded-[6px] bg-skeleton" />
            </div>
          </div>
          <div className="bg-panel p-[22px]">
            <div className="mb-[14px] h-10 w-full rounded-[8px] bg-[#E5E8D4]" />
            <div className="rounded-[14px] border border-border bg-card p-[18px]">
              <div className="mb-3 flex items-center gap-[10px]">
                <div className="h-9 w-9 rounded-full bg-skeleton" />
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-skeleton" />
                  <div className="h-3 w-24 rounded bg-skeleton" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-5 w-full rounded bg-skeleton" />
                <div className="h-5 w-[86%] rounded bg-skeleton" />
                <div className="h-5 w-[62%] rounded bg-skeleton" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseShell>
  );
}
