import { PendingActionButton } from '@/components/pending-action-button';
import { ShowcaseShell } from '@/components/showcase-shell';
import { EmptyState, NotificationRow } from '@/components/showcase-ui';
import { getNotificationsPageData } from '@/lib/server/showcase-data';
import { markAllNotificationsReadAction, markNotificationReadAction } from './actions';

export default async function NotificationsPage({ searchParams }: { searchParams: Promise<{ read?: string }> }) {
  const notifications = await getNotificationsPageData();
  const params = await searchParams;
  const readState = params.read;
  const unreadCount = notifications.filter((item) => item.unread).length;
  const subtitle = notifications.length ? `${unreadCount} unread · ${notifications.length} total` : 'No activity yet';
  return (
    <ShowcaseShell title="Notifications" subtitle={subtitle} active="/showcase/notifications">
      <div className="max-w-[760px]">
        <div className="mb-4 flex items-center justify-between gap-4">
          {readState === '1' ? <div className="rounded-[12px] border border-border bg-surface px-4 py-3 text-[13px] text-[#4A453C]">Notification marked as read.</div> : null}
          {readState === 'all' ? <div className="rounded-[12px] border border-border bg-surface px-4 py-3 text-[13px] text-[#4A453C]">All notifications marked as read.</div> : null}
          {notifications.length ? (
            <form action={markAllNotificationsReadAction} className="ml-auto">
              <PendingActionButton
                idle="Mark all read"
                pending="Marking all..."
                className="rounded-[10px] border border-border bg-card px-4 py-[9px] text-[13px] font-medium text-[#4A453C] transition hover:bg-[#1A1814] hover:text-white"
              />
            </form>
          ) : null}
        </div>
        {notifications.length ? (
          <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-card">
            {notifications.map((item) => (
              <form key={item.id} action={markNotificationReadAction}>
                <input type="hidden" name="notificationId" value={item.id} />
                <NotificationRow item={item} />
              </form>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing needs your attention."
            hint="Likes, comments, follows and publish updates will land here as they happen."
          />
        )}
      </div>
    </ShowcaseShell>
  );
}
