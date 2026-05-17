import { ShowcaseShell } from '@/components/showcase-shell';
import { SectionCard } from '@/components/showcase-ui';
import { getSettingsPageData } from '@/lib/server/showcase-data';
import { toggleConnectedAccountAction, updateSettingsAction } from './actions';

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string; connected?: string }> }) {
  const { connectedPlatforms, preferenceRows } = await getSettingsPageData();
  const params = await searchParams;
  const saved = params.saved === '1';
  const connectedNotice = params.connected;
  return (
    <ShowcaseShell title="Settings" active="/showcase/settings">
      <div className="max-w-[820px] space-y-5">
        <SectionCard title="Connected platforms" subtitle="Accounts where Showcase can publish on your behalf.">
          {connectedNotice === '1' ? <div className="border-b border-[#E8E3D4] bg-[#F4F1EA] px-6 py-4 text-[13px] text-[#4A453C]">Platform connected.</div> : null}
          {connectedNotice === '0' ? <div className="border-b border-[#E8E3D4] bg-[#F4F1EA] px-6 py-4 text-[13px] text-[#4A453C]">Platform disconnected.</div> : null}
          {connectedPlatforms.map((item) => (
            <div key={item.platform.key} className="grid items-center gap-4 border-b border-[#E8E3D4] px-6 py-4 md:grid-cols-[36px_1fr_auto_auto] last:border-b-0">
              <div className={`grid h-7 w-7 place-items-center rounded-[7px] font-mono text-[13px] font-bold ${item.platform.tone}`}>{item.platform.short}</div>
              <div>
                <div className="text-[14px] font-medium text-[#1A1814]">{item.platform.label}</div>
                <div className="font-mono text-[11px] text-[#85806F]">{item.handle}</div>
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-[0.05em] ${item.status === 'Active' ? 'text-[#5A6B3A]' : 'text-[#85806F]'}`}>{item.status}</span>
              <form action={toggleConnectedAccountAction}>
                <input type="hidden" name="platform" value={item.platform.key.toUpperCase()} />
                <input type="hidden" name="action" value={item.action === 'Connect' ? 'connect' : 'disconnect'} />
                <button className={`rounded-[10px] px-3 py-[6px] text-[12px] font-medium ${item.action === 'Connect' ? 'bg-[#B8541F] text-[#F4F1EA]' : 'border border-[#D9D3C4] text-[#4A453C]'}`}>{item.action}</button>
              </form>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Preferences" subtitle="Control how Showcase behaves for you.">
          <form action={updateSettingsAction}>
            {saved ? <div className="border-b border-[#E8E3D4] bg-[#F4F1EA] px-6 py-4 text-[13px] text-[#4A453C]">Settings updated.</div> : null}
            {preferenceRows.map((item) => {
              const fieldName = {
                'Default to all platforms': 'defaultAllPlatforms',
                'Show "published via Showcase" footer': 'showShowcaseFooter',
                'Web push notifications': 'webPushNotifications',
                'Daily digest email': 'dailyDigestEmail',
              }[item.label];

              return (
                <label key={item.label} className="flex cursor-pointer items-center justify-between gap-4 border-b border-[#E8E3D4] px-6 py-4 last:border-b-0">
                  <div>
                    <div className="mb-[2px] text-[14px] font-medium text-[#1A1814]">{item.label}</div>
                    <div className="text-[12px] text-[#85806F]">{item.description}</div>
                  </div>
                  <div className="relative">
                    <input type="checkbox" name={fieldName} defaultChecked={item.enabled} className="peer sr-only" />
                    <div className="h-[22px] w-10 rounded-full bg-[#D9D3C4] transition peer-checked:bg-[#B8541F]" />
                    <div className="absolute bottom-[3px] left-[3px] h-4 w-4 rounded-full bg-white shadow transition peer-checked:left-[21px]" />
                  </div>
                </label>
              );
            })}
            <div className="px-6 py-4">
              <button className="rounded-[10px] bg-[#1A1814] px-4 py-[10px] text-[13px] font-medium text-[#F4F1EA] transition hover:bg-[#B8541F]">Save preferences</button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Plan" subtitle="You&apos;re on the free tier.">
          <div className="px-6 py-5">
            <div className="mb-2 font-serif text-[20px] italic text-[#1A1814]">Upgrade to Creator</div>
            <div className="mb-4 text-[13px] leading-[1.5] text-[#4A453C]">
              Custom domain for your profile. Unlimited cross-posts. All 8 platforms. AI caption adaptation per platform. No Showcase footer on syndicated posts.
            </div>
            <button className="rounded-[10px] bg-[#B8541F] px-4 py-[9px] text-[13px] font-medium text-[#F4F1EA]">Upgrade · $8/month</button>
          </div>
        </SectionCard>
      </div>
    </ShowcaseShell>
  );
}
