import { ShowcaseShellSkeleton } from '@/components/showcase-shell';
import { GridSkeleton } from '@/components/loading-skeleton';

export default function DiscoverLoading() {
  return (
    <ShowcaseShellSkeleton title="Discover" active="/showcase/discover" loading>
      <div className="max-w-[1100px]">
        <div className="mb-7 h-[52px] animate-pulse rounded-[16px] border border-border bg-card" />
        <div className="mb-4 h-6 w-48 animate-pulse rounded bg-skeleton" />
        <GridSkeleton items={4} />
        <div className="mb-4 mt-8 h-6 w-48 animate-pulse rounded bg-skeleton" />
        <GridSkeleton items={4} />
      </div>
    </ShowcaseShellSkeleton>
  );
}
