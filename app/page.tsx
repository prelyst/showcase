const plannedAreas = [
  'Feed',
  'Discover',
  'Notifications',
  'Compose',
  'Publish Monitor',
  'Profile',
  'Settings',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-orange-700">
            Minimal frontend setup
          </p>
          <h1 className="font-serif text-5xl tracking-tight text-stone-950 md:text-7xl">
            Showcase
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">
            A quieter social publishing app built around intentional posting, cross-platform distribution,
            and a calmer creator experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">Current status</p>
            <h2 className="mt-3 text-2xl font-semibold text-stone-950">Frontend foundation is in place</h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              This repository now has a minimal Next.js, TypeScript, and Tailwind setup so the prototype can
              start turning into a real app.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-700">
              <span className="rounded-full bg-stone-100 px-4 py-2">Next.js</span>
              <span className="rounded-full bg-stone-100 px-4 py-2">TypeScript</span>
              <span className="rounded-full bg-stone-100 px-4 py-2">Tailwind CSS</span>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-200 bg-orange-50 p-8 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-700">Planned product areas</p>
            <ul className="mt-4 space-y-3 text-base text-stone-800">
              {plannedAreas.map((area) => (
                <li key={area} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-600" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
