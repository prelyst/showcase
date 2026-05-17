import { PendingActionButton } from '@/components/pending-action-button';
import { ShowcaseShell } from '@/components/showcase-shell';
import { NotificationRow } from '@/components/showcase-ui';
import { getNotificationsPageData } from '@/lib/server/showcase-data';
import { markAllNotificationsReadAction, markNotificationReadAction } from './actions';

export default async function NotificationsPage({ searchParams }: { searchParams: Promise<{ read?: string }> }) {
  const notifications = await getNotificationsPageData();
  const params = await searchParams;
  const readState = params.read;
  return (
    <ShowcaseShell title="Notifications" subtitle="3 new · this week" active="/showcase/notifications">
      <div className="max-w-[760px]">
        <div className="mb-4 flex items-center justify-between gap-4">
          {readState === '1' ? <div className="rounded-[12px] border border-[#D9D3C4] bg-[#F4F1EA] px-4 py-3 text-[13px] text-[#4A453C]">Notification marked as read.</div> : null}
          {readState === 'all' ? <div className="rounded-[12px] border border-[#D9D3C4] bg-[#F4F1EA] px-4 py-3 text-[13px] text-[#4A453C]">All notifications marked as read.</div> : null}
          <form action={markAllNotificationsReadAction} className="ml-auto">
            <PendingActionButton
              idle="Mark all read"
              pending="Marking all..."
              className="rounded-[10px] border border-[#D9D3C4] bg-[#FBF9F4] px-4 py-[9px] text-[13px] font-medium text-[#4A453C] transition hover:bg-[#1A1814] hover:text-[#F4F1EA]"
            />
          </form>
        </div>
        <div className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          {notifications.map((item) => (
            <form key={item.id} action={markNotificationReadAction}>
              <input type="hidden" name="notificationId" value={item.id} />
              <NotificationRow item={item} />
            </form>
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}
