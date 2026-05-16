import { ShowcaseShell } from '@/components/showcase-shell';

const lanes = [
  ['S', 'Showcase', 'showcase.app/@mayarivera/p/8k2j', 'Published', '0.3s', 'bg-[#B8541F] text-[#F4F1EA]', 'bg-[#E5E8D4] text-[#5A6B3A]'],
  ['X', 'X', 'x.com/mayarivera/status/183...', 'Published', '1.2s', 'bg-[#1A1814] text-[#FBF9F4]', 'bg-[#E5E8D4] text-[#5A6B3A]'],
  ['in', 'LinkedIn', 'linkedin.com/posts/mayarivera-act...', 'Published', '2.1s', 'bg-[#0A66C2] text-white', 'bg-[#E5E8D4] text-[#5A6B3A]'],
  ['B', 'Bluesky', 'bsky.app/profile/mayarivera....', 'Published', '0.8s', 'bg-[#1185FE] text-white', 'bg-[#E5E8D4] text-[#5A6B3A]'],
  ['r', 'Reddit · r/ship', 'Uploading · polling in 3s…', 'Uploading', '3.4s', 'bg-[#FF4500] text-white', 'bg-[#F4E8C8] text-[#A67C1E]'],
  ['▶', 'YouTube Shorts', 'Video exceeds 60s Shorts cap. Trim or deselect YouTube.', 'Failed', '—', 'bg-[#FF0033] text-white', 'bg-[#F2DCD1] text-[#A0381F]'],
] as const;

export default function MonitorPage() {
  return (
    <ShowcaseShell title="Publish monitor" subtitle="Live · 1 active post · 4 of 6 lanes published" active="/showcase/monitor">
      <div className="max-w-[900px]">
        <div className="mb-7 rounded-[16px] bg-[#1A1814] p-7 text-[#F4F1EA]">
          <div className="mb-[14px] font-serif text-[22px] italic leading-[1.4]">
            &quot;Shipping something quiet today. A better feed, by construction.&quot;
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.05em] opacity-70">
            <span>Published 2:14 PM · just now</span>
            <div className="flex items-center gap-[10px]">
              <span>4 / 6</span>
              <div className="h-1 w-[120px] overflow-hidden rounded-full bg-[rgba(251,249,244,0.15)]">
                <div className="h-full w-2/3 rounded-full bg-[#E87D3F]" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-[#D9D3C4] bg-[#FBF9F4]">
          {lanes.map(([short, name, detail, status, time, tone, pill]) => (
            <div key={name} className="grid items-center gap-4 border-b border-[#E8E3D4] px-6 py-[18px] md:grid-cols-[36px_1fr_auto_auto] last:border-b-0">
              <div className={`grid h-7 w-7 place-items-center rounded-[7px] font-mono text-[13px] font-semibold ${tone}`}>{short}</div>
              <div>
                <div className="text-[14px] font-medium text-[#1A1814]">{name}</div>
                <div className={`mt-[2px] font-mono text-[11px] ${status === 'Failed' ? 'text-[#A0381F]' : 'text-[#85806F]'}`}>{detail}</div>
              </div>
              <span className={`rounded-full px-[10px] py-1 font-mono text-[10px] uppercase tracking-[0.05em] ${pill}`}>{status}</span>
              <span className="font-mono text-[11px] text-[#85806F] md:text-right">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}
