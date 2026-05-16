import { ShowcaseShell } from '@/components/showcase-shell';

const notifications = [
  ['EK', 'bg-[#F5E5D3] text-[#B8541F]', 'Elena Kowalski liked your post', '"The thing I keep coming back to: most social platforms reward volume…"', '2h', true],
  ['PR', 'bg-[#DCD4E8] text-[#5A4A78]', 'Priya Rajan started following you', 'Essays on creative practice. Newsletter on substack.', '5h', true],
  ['JT', 'bg-[#E5E8D4] text-[#5A6B3A]', 'James Tam replied to your comment', '"Agreed — the default-on behavior is the whole point."', '8h', true],
  ['DW', 'bg-[#D4E3E8] text-[#3A5A6B]', 'David Wen reposted your post', '"An underrated kind of privilege: being able to post less."', '1d', false],
  ['HF', 'bg-[#F4DCDC] text-[#A0381F]', 'Hana Fujiwara mentioned you', '"…learning a lot from how @mayarivera thinks about intention in publishing."', '2d', false],
] as const;

export default function NotificationsPage() {
  return (
    <ShowcaseShell title="Notifications" subtitle="3 new · this week" active="/showcase/notifications">
      <div className="max-w-[760px] overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
        {notifications.map(([initials, tone, title, detail, time, unread]) => (
          <div key={`${title}-${time}`} className={`grid grid-cols-[44px_1fr_auto] gap-4 border-b border-[#E8E3D4] px-[18px] py-[14px] last:border-b-0 ${unread ? 'bg-[#F5E5D3]' : ''}`}>
            <div className={`grid h-10 w-10 place-items-center rounded-full border border-[#D9D3C4] text-[14px] font-semibold ${tone}`}>{initials}</div>
            <div>
              <div className="text-[14px] font-medium text-[#1A1814]">{title}</div>
              <div className="mt-1 text-[13px] leading-[1.45] text-[#4A453C] italic">{detail}</div>
            </div>
            <div className="font-mono text-[11px] text-[#85806F]">{time}</div>
          </div>
        ))}
      </div>
    </ShowcaseShell>
  );
}
