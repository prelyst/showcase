import { ShowcaseShell } from '@/components/showcase-shell';
import { ListSkeleton } from '@/components/loading-skeleton';

export default function MonitorLoading() {
  return (
    <ShowcaseShell title="Publish monitor" active="/showcase/monitor" loading>
      <div className="max-w-[900px] space-y-6">
        <div className="animate-pulse rounded-[18px] border border-border bg-card p-7 shadow-card">
          <div className="mb-4 h-5 w-3/4 rounded bg-skeleton" />
          <div className="h-3 w-1/3 rounded bg-skeleton" />
          <div className="mt-6 h-2 w-full rounded-full bg-skeleton" />
        </div>
        <div className="rounded-[18px] border border-border bg-card p-6 shadow-card">
          <ListSkeleton items={4} />
        </div>
      </div>
    </ShowcaseShell>
  );
}
