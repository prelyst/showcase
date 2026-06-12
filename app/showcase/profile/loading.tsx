import { ShowcaseShellSkeleton } from '@/components/showcase-shell';
import { CardSkeleton } from '@/components/loading-skeleton';

export default function ProfileLoading() {
  return (
    <ShowcaseShellSkeleton title="Profile" active="/showcase/profile" loading>
      <div className="max-w-[900px]">
        <div className="mb-8 flex animate-pulse items-center gap-5">
          <div className="h-[88px] w-[88px] rounded-full bg-skeleton" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-1/3 rounded bg-skeleton" />
            <div className="h-4 w-1/2 rounded bg-skeleton" />
          </div>
        </div>
        <div className="grid gap-[14px] md:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </ShowcaseShellSkeleton>
  );
}
