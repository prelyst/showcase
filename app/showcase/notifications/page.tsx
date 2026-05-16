import { ShowcaseShell } from '@/components/showcase-shell';
import { NotificationRow } from '@/components/showcase-ui';
import { getNotificationsPageData } from '@/lib/server/showcase-data';

export default async function NotificationsPage() {
  const notifications = await getNotificationsPageData();
  return (
    <ShowcaseShell title="Notifications" subtitle="3 new · this week" active="/showcase/notifications">
      <div className="max-w-[760px] overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
        {notifications.map((item) => (
          <NotificationRow key={item.id} item={item} />
        ))}
      </div>
    </ShowcaseShell>
  );
}
