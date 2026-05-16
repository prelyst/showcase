import { ShowcaseShell } from '@/components/showcase-shell';
import { PublishLaneRow } from '@/components/showcase-ui';
import { monitorLanes } from '@/lib/mock/showcase';

export default function MonitorPage() {
  return (
    <ShowcaseShell title="Publish monitor" subtitle="Live · 1 active post · 4 of 6 lanes published" active="/showcase/monitor">
      <div className="max-w-[900px]">
        <div className="mb-7 rounded-[16px] bg-[#1A1814] p-7 text-[#F4F1EA]">
          <div className="mb-[14px] font-serif text-[22px] italic leading-[1.4]">
            &quot;Shipping something quiet today. A better feed, by construction.&quot;
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.05em] opacity-70">
            <span>Published 2:14 PM · just now</span>
            <div className="flex items-center gap-[10px]">
              <span>4 / 6</span>
              <div className="h-1 w-[120px] overflow-hidden rounded-full bg-[rgba(251,249,244,0.15)]">
                <div className="h-full w-2/3 rounded-full bg-[#E87D3F]" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          {monitorLanes.map((lane) => (
            <PublishLaneRow key={lane.id} lane={lane} />
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}
