import { ShowcaseShellSkeleton } from '@/components/showcase-shell';
import { ListSkeleton } from '@/components/loading-skeleton';

export default function FeedLoading() {
  return (
    <ShowcaseShellSkeleton
      title={<><span>Feed </span><em className="font-light italic text-accent">/ following</em></>}
      active="/showcase/feed"
      loading
    >
      <div className="grid max-w-[1100px] gap-10 xl:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <ListSkeleton items={5} />
        </div>
        <aside className="space-y-5">
          <div className="rounded-[16px] border border-border bg-card p-5 shadow-card">
            <div className="mb-4 h-3 w-24 animate-pulse rounded bg-skeleton" />
            <ListSkeleton items={3} />
          </div>
        </aside>
      </div>
    </ShowcaseShellSkeleton>
  );
}
