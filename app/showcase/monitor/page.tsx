import { ShowcaseShell } from '@/components/showcase-shell';
import { PublishLaneRow } from '@/components/showcase-ui';
import { getMonitorPageData } from '@/lib/server/showcase-data';

export default async function MonitorPage() {
  const monitor = await getMonitorPageData();

  return (
    <ShowcaseShell title="Publish monitor" subtitle={`Live · ${monitor.progressLabel} lanes complete`} active="/showcase/monitor">
      <div className="max-w-[900px]">
        <div className="mb-7 rounded-[16px] bg-[#1A1814] p-7 text-[#F4F1EA]">
          <div className="mb-[14px] font-serif text-[22px] italic leading-[1.4]">{monitor.heroBody}</div>
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.05em] opacity-70">
            <span>{monitor.heroMeta}</span>
            <div className="flex items-center gap-[10px]">
              <span>{monitor.progressLabel}</span>
              <div className="h-1 w-[120px] overflow-hidden rounded-full bg-[rgba(251,249,244,0.15)]">
                <div className="h-full rounded-full bg-[#E87D3F]" style={{ width: monitor.progressWidth }} />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          {monitor.lanes.map((lane) => (
            <PublishLaneRow key={lane.id} lane={lane} />
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}
