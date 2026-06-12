import { ShowcaseShellSkeleton } from '@/components/showcase-shell';
import { ListSkeleton } from '@/components/loading-skeleton';

export default function SettingsLoading() {
  return (
    <ShowcaseShellSkeleton title="Settings" active="/showcase/settings" loading>
      <div className="max-w-[760px] space-y-6">
        <div className="rounded-[18px] border border-border bg-card p-6 shadow-card">
          <div className="mb-5 h-5 w-40 animate-pulse rounded bg-skeleton" />
          <ListSkeleton items={4} />
        </div>
        <div className="rounded-[18px] border border-border bg-card p-6 shadow-card">
          <div className="mb-5 h-5 w-40 animate-pulse rounded bg-skeleton" />
          <ListSkeleton items={3} />
        </div>
      </div>
    </ShowcaseShellSkeleton>
  );
}
