import { ShowcaseShell } from '@/components/showcase-shell';

const filters = [
  ['All', '184'],
  ['Showcase', '184'],
  ['X', '172'],
  ['LinkedIn', '48'],
  ['Bluesky', '168'],
  ['Reddit', '22'],
  ['Threads', '91'],
] as const;

const posts = [
  ['Published to 5 platforms', 'Apr 21', 'The thing I keep coming back to: most social platforms reward volume. The feeds that actually matter to me reward intention.', ['312 likes', '47 comments', '89 reposts']],
  ['Published to 3 platforms', 'Apr 19', "An essay I've been sitting on for eight months is finally going out tomorrow. It's about why I left Twitter in 2022 and why I'm back, on different terms.", ['184 likes', '23 comments', '31 reposts']],
  ['Published to 6 platforms', 'Apr 17', "Book progress: chapter 4 done. It took me three weeks longer than I hoped. I'm learning that writing about slowness requires permission to be slow.", ['521 likes', '78 comments', '142 reposts']],
  ['Published to 4 platforms', 'Apr 14', "A principle I keep testing: the platforms that make you post more are not the ones that make you better. Look at who's quiet and productive.", ['267 likes', '41 comments', '58 reposts']],
  ['Published to 3 platforms', 'Apr 11', 'Draft notebook entry: "The internet does not need more content. It needs more thinking." I may or may not publish this proper. But the feeling is real.', ['142 likes', '19 comments', '28 reposts']],
  ['Published to 5 platforms', 'Apr 8', 'I gave a talk yesterday to a group of designers about restraint as a creative value. Slides are below. The Q&A was better than the talk.', ['398 likes', '55 comments', '76 reposts']],
] as const;

export default function ProfilePage() {
  return (
    <ShowcaseShell title="Profile" subtitle="showcase.app/@mayarivera" active="/showcase/profile">
      <div className="max-w-[1100px]">
        <div className="mb-6 grid gap-7 rounded-[20px] border border-[#D9D3C4] bg-[#FBF9F4] p-9 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="grid h-[88px] w-[88px] place-items-center rounded-full border-2 border-[#D9D3C4] bg-[#F5E5D3] font-serif text-[34px] text-[#B8541F]">
            MR
          </div>
          <div>
            <div className="mb-1 font-serif text-[34px] tracking-[-0.02em] text-[#1A1814]">Maya Rivera</div>
            <div className="mb-3 font-mono text-[13px] text-[#85806F]">showcase.app/@mayarivera</div>
            <div className="mb-[14px] max-w-[460px] text-[15px] leading-[1.5] text-[#4A453C]">Writer thinking about the quiet web. Books forthcoming. Slow is a feature.</div>
            <div className="flex items-center gap-[6px]">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">Also on</span>
              {['X', 'in', 'B', 'r', '@'].map((chip) => (
                <div key={chip} className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#1A1814] font-mono text-[8px] font-bold text-[#FBF9F4]">{chip}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 text-right max-lg:text-left">
            <div className="flex gap-6 max-lg:flex-wrap lg:justify-end">
              {[
                ['2,847', 'Followers'],
                ['184', 'Posts'],
                ['312', 'Following'],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="font-serif text-[22px] tracking-[-0.02em] text-[#1A1814]">{value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {filters.map(([label, count], index) => (
            <button key={label} className={`flex items-center gap-[6px] rounded-full border px-[14px] py-[7px] text-[13px] font-medium whitespace-nowrap ${index === 0 ? 'border-[#1A1814] bg-[#1A1814] text-[#F4F1EA]' : 'border-[#D9D3C4] bg-[#FBF9F4] text-[#4A453C]'}`}>
              {label}
              <span className="font-mono text-[11px] opacity-60">{count}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {posts.map(([label, time, body, stats]) => (
            <article key={`${label}-${time}`} className="rounded-[14px] border border-[#D9D3C4] bg-[#FBF9F4] p-[22px] transition hover:-translate-y-px hover:border-[#85806F]">
              <div className="mb-3 flex items-center gap-2">
                <div className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#B8541F] font-mono text-[8px] font-bold text-[#F4F1EA]">S</div>
                <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">{label}</span>
                <span className="ml-auto font-mono text-[10px] text-[#85806F]">{time}</span>
              </div>
              <div className="mb-[14px] font-serif text-[15px] leading-[1.5] text-[#1A1814]">{body}</div>
              <div className="flex gap-4 font-mono text-[11px] text-[#85806F]">
                {stats.map((stat) => (
                  <span key={stat}>{stat}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </ShowcaseShell>
  );
}
