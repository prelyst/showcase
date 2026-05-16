import { ShowcaseShell } from '@/components/showcase-shell';

export default function ComposePage() {
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
              <div className="grid h-11 w-11 place-items-center rounded-full border border-[#D9D3C4] bg-[#F5E5D3] text-[14px] font-semibold text-[#B8541F]">
                MR
              </div>
              <div>
                <div className="text-[15px] font-medium text-[#1A1814]">Maya Rivera</div>
                <div className="font-mono text-[12px] text-[#85806F]">@mayarivera</div>
              </div>
            </div>

            <textarea
              defaultValue="The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. Showcase is built on a simple bet — that when you only post things you meant to say, the feed quietly gets better. #building"
              className="min-h-[220px] w-full resize-none border-none bg-transparent font-serif text-[22px] leading-[1.4] text-[#1A1814] outline-none"
            />

            <div className="mt-3 border-t border-[#E8E3D4] pt-[18px]">
              <div className="flex gap-1 text-[#85806F]">
                {['🖼', '▶', '🔗', '#'].map((icon) => (
                  <button key={icon} className="grid h-[34px] w-[34px] place-items-center rounded-[8px] hover:bg-[#EDE8DD] hover:text-[#1A1814]">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#E8E3D4] bg-[#EDE8DD] px-[22px] py-[18px]">
            <div className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-[#85806F]">Publishing to</div>
            <div className="flex flex-wrap gap-[6px]">
              {([
                ['S', 'Showcase', true, 'bg-[#B8541F] text-[#F4F1EA]'],
                ['X', 'X', true, 'bg-[#1A1814] text-[#FBF9F4]'],
                ['in', 'LinkedIn', true, 'bg-[#0A66C2] text-white'],
                ['B', 'Bluesky', true, 'bg-[#1185FE] text-white'],
                ['r', 'Reddit', false, 'bg-[#FF4500] text-white'],
                ['@', 'Threads', false, 'bg-[#1A1814] text-[#FBF9F4]'],
              ] as [string, string, boolean, string][]).map(([short, label, selected, tone]) => (
                <div
                  key={label}
                  className={`flex items-center gap-[6px] rounded-full border px-[10px] py-[6px] text-[12px] font-medium ${
                    selected ? 'border-[#1A1814] bg-[#1A1814] text-[#F4F1EA]' : 'border-[#D9D3C4] bg-[#FBF9F4] text-[#1A1814]'
                  }`}
                >
                  <div className={`grid h-4 w-4 place-items-center rounded-[4px] font-mono text-[8px] font-bold ${tone}`}>{short}</div>
                  <span>{label}</span>
                </div>
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
                <div className="grid h-10 w-10 place-items-center rounded-full border border-[#D9D3C4] bg-[#F5E5D3] text-[14px] font-semibold text-[#B8541F]">
                  MR
                </div>
                <div>
                  <div className="font-serif font-medium text-[#1A1814]">Maya Rivera</div>
                  <div className="font-mono text-[11px] text-[#85806F]">@mayarivera · now</div>
                </div>
              </div>
              <div className="font-serif text-[17px] leading-[1.5] text-[#1A1814]">
                The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention. Showcase is built on a simple bet — that when you only post things you meant to say, the feed quietly gets better. <span className="italic text-[#B8541F]">#building</span>
              </div>
              <div className="mt-[10px] flex items-center gap-1 border-t border-dashed border-[#D9D3C4] pt-[10px]">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">Also to</span>
                {['X', 'in', 'B'].map((chip) => (
                  <div key={chip} className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#1A1814] font-mono text-[8px] font-bold text-[#FBF9F4]">
                    {chip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseShell>
  );
}
