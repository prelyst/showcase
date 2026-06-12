import { ShowcaseShell } from '@/components/showcase-shell';
import { ListSkeleton } from '@/components/loading-skeleton';

export default function NotificationsLoading() {
  return (
    <ShowcaseShell title="Notifications" active="/showcase/notifications" loading>
      <div className="max-w-[720px] rounded-[18px] border border-border bg-card p-2 shadow-card">
        <div className="p-4">
          <ListSkeleton items={6} />
        </div>
      </div>
    </ShowcaseShell>
  );
}
