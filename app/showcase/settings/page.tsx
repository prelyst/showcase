import { ShowcaseShell } from '@/components/showcase-shell';

const connections = [
  ['X', 'X', '@mayarivera · connected 12 days ago', 'Active', 'Disconnect', 'bg-[#1A1814] text-[#FBF9F4]'],
  ['in', 'LinkedIn', 'maya-rivera-writer · connected 12 days ago', 'Active', 'Disconnect', 'bg-[#0A66C2] text-white'],
  ['B', 'Bluesky', 'mayarivera.bsky.social · connected 10 days ago', 'Active', 'Disconnect', 'bg-[#1185FE] text-white'],
  ['r', 'Reddit', 'u/mayarivera · connected 5 days ago', 'Active', 'Disconnect', 'bg-[#FF4500] text-white'],
  ['▶', 'YouTube', 'Not connected', 'Inactive', 'Connect', 'bg-[#FF0033] text-white'],
  ['@', 'Threads', 'Not connected', 'Inactive', 'Connect', 'bg-[#1A1814] text-[#FBF9F4]'],
] as const;

const preferences = [
  ['Default to all platforms', 'New posts auto-select all connected platforms.', true],
  ['Show "published via Showcase" footer', 'Adds a small credit line on cross-posted content. Creator tier removes it.', true],
  ['Web push notifications', 'Real-time alerts for likes, comments, follows.', false],
  ['Daily digest email', 'One email each morning summarizing yesterday.', true],
] as const;

export default function SettingsPage() {
  return (
    <ShowcaseShell title="Settings" active="/showcase/settings">
      <div className="max-w-[820px] space-y-5">
        <section className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          <div className="border-b border-[#E8E3D4] px-6 py-5">
            <div className="mb-1 font-serif text-[20px] tracking-[-0.01em] text-[#1A1814]">Connected platforms</div>
            <div className="text-[13px] text-[#85806F]">Accounts where Showcase can publish on your behalf.</div>
          </div>
          {connections.map(([short, name, handle, status, action, tone]) => (
            <div key={name} className="grid items-center gap-4 border-b border-[#E8E3D4] px-6 py-4 md:grid-cols-[36px_1fr_auto_auto] last:border-b-0">
              <div className={`grid h-7 w-7 place-items-center rounded-[7px] font-mono text-[13px] font-semibold ${tone}`}>{short}</div>
              <div>
                <div className="text-[14px] font-medium text-[#1A1814]">{name}</div>
                <div className="font-mono text-[11px] text-[#85806F]">{handle}</div>
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-[0.05em] ${status === 'Active' ? 'text-[#5A6B3A]' : 'text-[#85806F]'}`}>{status}</span>
              <button className={`rounded-[10px] px-3 py-[6px] text-[12px] font-medium ${action === 'Connect' ? 'bg-[#B8541F] text-[#F4F1EA]' : 'border border-[#D9D3C4] text-[#4A453C]'}`}>{action}</button>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          <div className="border-b border-[#E8E3D4] px-6 py-5">
            <div className="mb-1 font-serif text-[20px] tracking-[-0.01em] text-[#1A1814]">Preferences</div>
            <div className="text-[13px] text-[#85806F]">Control how Showcase behaves for you.</div>
          </div>
          {preferences.map(([label, sub, enabled]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-[#E8E3D4] px-6 py-4 last:border-b-0">
              <div>
                <div className="mb-[2px] text-[14px] font-medium text-[#1A1814]">{label}</div>
                <div className="text-[12px] text-[#85806F]">{sub}</div>
              </div>
              <div className={`relative h-[22px] w-10 rounded-full ${enabled ? 'bg-[#B8541F]' : 'bg-[#D9D3C4]'}`}>
                <div className={`absolute bottom-[3px] h-4 w-4 rounded-full bg-white shadow ${enabled ? 'left-[21px]' : 'left-[3px]'}`} />
              </div>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          <div className="border-b border-[#E8E3D4] px-6 py-5">
            <div className="mb-1 font-serif text-[20px] tracking-[-0.01em] text-[#1A1814]">Plan</div>
            <div className="text-[13px] text-[#85806F]">You&apos;re on the free tier.</div>
          </div>
          <div className="px-6 py-5">
            <div className="mb-2 font-serif text-[20px] italic text-[#1A1814]">Upgrade to Creator</div>
            <div className="mb-4 text-[13px] leading-[1.5] text-[#4A453C]">
              Custom domain for your profile. Unlimited cross-posts. All 8 platforms. AI caption adaptation per platform. No Showcase footer on syndicated posts.
            </div>
            <button className="rounded-[10px] bg-[#B8541F] px-4 py-[9px] text-[13px] font-medium text-[#F4F1EA]">Upgrade · $8/month</button>
          </div>
        </section>
      </div>
    </ShowcaseShell>
  );
}
