import { MonitorBrowser } from '@/components/monitor-browser';
import { ShowcaseShell } from '@/components/showcase-shell';
import { EmptyState } from '@/components/showcase-ui';
import { getMonitorPageData } from '@/lib/server/showcase-data';

export default async function MonitorPage() {
  const monitor = await getMonitorPageData();
  const hasJobs = monitor.jobs.length > 0;

  return (
    <ShowcaseShell
      title="Publish monitor"
      subtitle={hasJobs ? `${monitor.jobs.length} ${monitor.jobs.length === 1 ? 'post' : 'posts'} tracked` : 'No active jobs'}
      active="/showcase/monitor"
    >
      {hasJobs ? (
        <MonitorBrowser jobs={monitor.jobs} />
      ) : (
        <div className="max-w-[900px]">
          <EmptyState
            title="No lanes in flight."
            hint="Publish a post and each platform’s delivery will stream here, lane by lane."
            cta={{ label: 'Compose a post', href: '/showcase/compose' }}
          />
        </div>
      )}
    </ShowcaseShell>
  );
}
