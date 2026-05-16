import { ShowcaseShell } from '@/components/showcase-shell';
import { Avatar, ComposeToolButton, PlatformBadge, PublishTargetChip } from '@/components/showcase-ui';
import { composeTools, platforms, publishTargets } from '@/lib/mock/showcase';
import { getComposePageData } from '@/lib/server/showcase-data';

export default async function ComposePage() {
  const draft = await getComposePageData();
  return (
    <ShowcaseShell title={<><span>New post </span><em className="font-light italic text-[#B8541F]">/ draft</em></>} active="/showcase/compose">
      <div className="grid max-w-[1200px] gap-7 xl:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          <div className="flex items-center justify-between border-b border-[#E8E3D4] px-[22px] py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Draft</span>
            <span className="font-mono text-[11px] text-[#85806F]">247 / 3000</span>
          </div>
          <div className="p-[22px]">
            <div className="mb-[18px] flex items-center gap-3">
              <Avatar avatar={{ initials: 'MR', className: 'bg-[#F5E5D3] text-[#B8541F]' }} size="sm" />
              <div>
                <div className="text-[15px] font-medium text-[#1A1814]">{draft.authorName}</div>
                <div className="font-mono text-[12px] text-[#85806F]">{draft.authorHandle}</div>
              </div>
            </div>

            <textarea
              defaultValue={draft.content}
              className="min-h-[220px] w-full resize-none border-none bg-transparent font-serif text-[22px] leading-[1.4] text-[#1A1814] outline-none"
            />

            <div className="mt-3 border-t border-[#E8E3D4] pt-[18px]">
              <div className="flex gap-1 text-[#85806F]">
                {composeTools.map((tool) => (
                  <ComposeToolButton key={tool.label} tool={tool} />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#E8E3D4] bg-[#EDE8DD] px-[22px] py-[18px]">
            <div className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">Publishing to</div>
            <div className="flex flex-wrap gap-[6px]">
              {publishTargets.map((target) => (
                <PublishTargetChip key={target.platform.key} platform={target.platform} selected={draft.selectedTargets.includes(target.platform.key)} />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-[10px] border-t border-[#E8E3D4] bg-[#EDE8DD] px-[22px] py-[18px]">
            <button className="rounded-[10px] border border-[#D9D3C4] px-4 py-[9px] text-[13px] font-medium text-[#4A453C]">Schedule</button>
            <button className="rounded-[10px] bg-[#B8541F] px-[18px] py-[9px] text-[13px] font-medium text-[#F4F1EA]">Publish now</button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          <div className="flex items-center justify-between border-b border-[#E8E3D4] px-[22px] py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Live preview</span>
            <div className="flex gap-[2px]">
              {['Showcase', 'X', 'LinkedIn'].map((tab, index) => (
                <button
                  key={tab}
                  className={`rounded-[6px] px-3 py-[6px] font-mono text-[10px] uppercase tracking-[0.05em] ${index === 0 ? 'bg-[#1A1814] text-[#F4F1EA]' : 'text-[#85806F]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#EDE8DD] p-[22px]">
            <div className="mb-[14px] flex items-center justify-between rounded-[8px] bg-[#E5E8D4] px-[14px] py-[10px] font-mono text-[12px] text-[#5A6B3A]">
              <span>✓ All selected platforms validated</span>
              <span>READY</span>
            </div>

            <div className="rounded-[14px] border border-[#D9D3C4] bg-[#FBF9F4] p-[18px]">
              <div className="mb-3 flex items-center gap-[10px]">
                <Avatar avatar={{ initials: 'MR', className: 'bg-[#F5E5D3] text-[#B8541F]' }} size="sm" />
                <div>
                  <div className="font-serif font-medium text-[#1A1814]">{draft.authorName}</div>
                  <div className="font-mono text-[11px] text-[#85806F]">{draft.authorHandle} · now</div>
                </div>
              </div>
              <div className="font-serif text-[17px] leading-[1.5] text-[#1A1814]">
                {draft.content.replace(' #building', '')} <span className="italic text-[#B8541F]">#building</span>
              </div>
              <div className="mt-[10px] flex items-center gap-1 border-t border-dashed border-[#D9D3C4] pt-[10px]">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">Also to</span>
                {[platforms.x, platforms.linkedin, platforms.bluesky].map((platform) => (
                  <PlatformBadge key={platform.key} platform={platform} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseShell>
  );
}
