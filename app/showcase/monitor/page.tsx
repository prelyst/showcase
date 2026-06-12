import { ShowcaseShell } from '@/components/showcase-shell';
import { EmptyState, PublishLaneRow } from '@/components/showcase-ui';
import { getMonitorPageData } from '@/lib/server/showcase-data';

export default async function MonitorPage() {
  const monitor = await getMonitorPageData();

  return (
    <ShowcaseShell title="Publish monitor" subtitle={monitor.lanes.length ? `Live · ${monitor.progressLabel} lanes complete` : 'No active jobs'} active="/showcase/monitor">
      <div className="max-w-[900px]">
        <div className="mb-7 rounded-[16px] bg-[#1A1814] p-7 text-white">
          <div className="mb-[14px] font-serif text-[22px] italic leading-[1.4]">{monitor.heroBody}</div>
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.05em] opacity-70">
            <span>{monitor.heroMeta}</span>
            <div className="flex items-center gap-[10px]">
              <span>{monitor.progressLabel}</span>
              <span className="text-[#E8D9C6]">{monitor.summary}</span>
              <div className="h-1 w-[120px] overflow-hidden rounded-full bg-[rgba(251,249,244,0.15)]">
                <div className="h-full rounded-full bg-[#E87D3F]" style={{ width: monitor.progressWidth }} />
              </div>
            </div>
          </div>
        </div>

        {monitor.lanes.length ? (
          <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-card">
            {monitor.lanes.map((lane) => (
              <PublishLaneRow key={lane.id} lane={lane} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No lanes in flight."
            hint="Publish a post and each platform’s delivery will stream here, lane by lane."
            cta={{ label: 'Compose a post', href: '/showcase/compose' }}
          />
        )}
      </div>
    </ShowcaseShell>
  );
}
