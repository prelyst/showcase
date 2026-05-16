import { ShowcaseShell } from '@/components/showcase-shell';
import { ConnectionRow, PreferenceRow, SectionCard } from '@/components/showcase-ui';
import { getSettingsPageData } from '@/lib/server/showcase-data';

export default async function SettingsPage() {
  const { connectedPlatforms, preferenceRows } = await getSettingsPageData();
  return (
    <ShowcaseShell title="Settings" active="/showcase/settings">
      <div className="max-w-[820px] space-y-5">
        <SectionCard title="Connected platforms" subtitle="Accounts where Showcase can publish on your behalf.">
          {connectedPlatforms.map((item) => (
            <ConnectionRow key={item.platform.key} item={item} />
          ))}
        </SectionCard>

        <SectionCard title="Preferences" subtitle="Control how Showcase behaves for you.">
          {preferenceRows.map((item) => (
            <PreferenceRow key={item.label} item={item} />
          ))}
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
