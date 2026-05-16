import { ShowcaseShell } from '@/components/showcase-shell';

const posts = [
  {
    initials: 'EK',
    avatar: 'bg-[#F5E5D3] text-[#B8541F]',
    author: 'Elena Kowalski',
    handle: '@elenakowalski',
    time: '2h',
    body: 'Spent the morning reading through my old design files from 2019. The through-line I missed at the time is obvious now: I was solving the wrong problem.',
    hashtags: ['#design', '#reflection'],
    socials: ['X', 'in', 'B'],
    stats: ['127', '18', '34'],
  },
  {
    initials: 'JT',
    avatar: 'bg-[#E5E8D4] text-[#5A6B3A]',
    author: 'James Tam',
    handle: '@jtam',
    time: '4h',
    body: "New track's up. It's been two years since I felt okay about a song leaving my laptop. This one left quickly and I didn't want to stop it.",
    media: 'Audio · 3:42',
    socials: ['▶', '@'],
    stats: ['84', '12', '8'],
  },
  {
    initials: 'PR',
    avatar: 'bg-[#DCD4E8] text-[#5A4A78]',
    author: 'Priya Rajan',
    handle: '@priya.writes',
    time: '6h',
    body: 'An underrated kind of privilege: being able to post less.',
    hashtags: ['#creator'],
    socials: ['X', 'B', '@'],
    stats: ['312', '47', '89'],
  },
  {
    initials: 'DW',
    avatar: 'bg-[#D4E3E8] text-[#3A5A6B]',
    author: 'David Wen',
    handle: '@dwen',
    time: '11h',
    body: "Three-day experiment: I only posted the things I wrote in a notebook first. My engagement went down. My satisfaction with what I posted went up. I'm keeping it.",
    socials: ['X', 'in'],
    stats: ['156', '31', '22'],
  },
];

const trending = [
  ['01 · Craft', '#slow-publishing', '1.2k posts today'],
  ['02 · Tech', '#no-algorithm', '847 posts today'],
  ['03 · Writing', '#morning-pages', '611 posts today'],
  ['04 · Music', '#first-takes', '403 posts today'],
];

export default function FeedPage() {
  return (
    <ShowcaseShell title={<><span>Feed </span><em className="font-light italic text-[#B8541F]">/ following</em></>} active="/showcase/feed">
      <div className="grid max-w-[1100px] gap-10 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-6 flex border-b border-[#D9D3C4]">
            {['Following', 'For you', 'Quiet hours'].map((tab, index) => (
              <button
                key={tab}
                className={`-mb-px border-b-2 px-[18px] py-3 text-[14px] font-medium ${index === 0 ? 'border-[#B8541F] text-[#1A1814]' : 'border-transparent text-[#85806F]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {posts.map((post) => (
              <article key={`${post.author}-${post.time}`} className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#E8E3D4] py-6 last:border-b-0">
                <div className={`grid h-12 w-12 place-items-center rounded-full border border-[#D9D3C4] text-[14px] font-semibold ${post.avatar}`}>
                  {post.initials}
                </div>
                <div>
                  <div className="mb-[6px] flex flex-wrap items-baseline gap-2">
                    <span className="text-[15px] font-medium text-[#1A1814]">{post.author}</span>
                    <span className="font-mono text-[12px] text-[#85806F]">{post.handle}</span>
                    <span className="text-[13px] text-[#85806F]">· {post.time}</span>
                  </div>
                  <div className="mb-[14px] font-serif text-[18px] leading-[1.5] text-[#1A1814]">
                    {post.body}{' '}
                    {post.hashtags?.map((tag) => (
                      <span key={tag} className="font-medium italic text-[#B8541F]">
                        {tag}{' '}
                      </span>
                    ))}
                  </div>

                  {post.media ? (
                    <div className="mb-[14px] rounded-[12px] border border-[#D9D3C4] bg-[#EDE8DD] px-8 py-11 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
                      {post.media}
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between gap-5">
                    <div className="flex gap-6 text-[13px] text-[#85806F]">
                      <span>♥ {post.stats[0]}</span>
                      <span>💬 {post.stats[1]}</span>
                      <span>↻ {post.stats[2]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.05em] text-[#85806F]">Also on</span>
                      {post.socials.map((social) => (
                        <div key={social} className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#1A1814] font-mono text-[8px] font-bold text-[#FBF9F4]">
                          {social}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <div className="mb-5 rounded-[14px] border border-[#D9D3C4] bg-[#FBF9F4] p-5">
            <div className="mb-[14px] flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">
              <span>Trending</span>
              <span className="text-[#B8541F]">↗</span>
            </div>
            <div>
              {trending.map(([rank, tag, count]) => (
                <div key={tag} className="border-b border-[#E8E3D4] py-[10px] last:border-b-0">
                  <div className="font-mono text-[10px] tracking-[0.05em] text-[#85806F]">{rank}</div>
                  <div className="font-serif text-[17px] font-medium italic text-[#B8541F]">{tag}</div>
                  <div className="text-[12px] text-[#85806F]">{count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5 rounded-[14px] border border-[#D9D3C4] bg-[#FBF9F4] p-5">
            <div className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.08em] text-[#85806F]">Who to follow</div>
            {[
              ['SO', 'Sam Okonkwo', '@samo · writer', 'Follow'],
              ['LV', 'Lena Volkov', '@lvolkov · designer', 'Following'],
              ['HF', 'Hana Fujiwara', '@hanafuji · musician', 'Follow'],
            ].map(([initials, name, handle, button]) => (
              <div key={name} className="flex items-center gap-[10px] border-b border-[#E8E3D4] py-[10px] last:border-b-0">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-[#D9D3C4] bg-[#F5E5D3] text-[14px] font-semibold text-[#B8541F]">{initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-[#1A1814]">{name}</div>
                  <div className="font-mono text-[11px] text-[#85806F]">{handle}</div>
                </div>
                <button className={`rounded-full px-3 py-[6px] text-[12px] font-medium ${button === 'Following' ? 'border border-[#D9D3C4] text-[#1A1814]' : 'bg-[#1A1814] text-[#F4F1EA]'}`}>
                  {button}
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </ShowcaseShell>
  );
}
