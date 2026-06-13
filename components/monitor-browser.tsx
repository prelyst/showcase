'use client';

import { useState } from 'react';

import { PublishLaneRow } from '@/components/showcase-ui';
import type { MonitorJob } from '@/lib/types/showcase';

export function MonitorBrowser({ jobs }: { jobs: MonitorJob[] }) {
  const [index, setIndex] = useState(0);
  const job = jobs[index];

  if (!job) return null;

  const atNewest = index === 0;
  const atOldest = index === jobs.length - 1;

  return (
    <div className="max-w-[900px]">
      {jobs.length > 1 ? (
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={atNewest}
            aria-label="Newer post"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-subtle transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            ←
          </button>
          <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-muted">
            Post {index + 1} of {jobs.length}
            {atNewest ? ' · latest' : ''}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(jobs.length - 1, i + 1))}
            disabled={atOldest}
            aria-label="Older post"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-subtle transition hover:border-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            →
          </button>
        </div>
      ) : null}

      <div className="mb-7 rounded-[16px] bg-ink p-7 text-white">
        <div className="mb-[14px] font-serif text-[22px] italic leading-[1.4]">{job.heroBody}</div>
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.05em] opacity-70">
          <span>{job.heroMeta}</span>
          <div className="flex items-center gap-[10px]">
            <span>{job.progressLabel}</span>
            <span className="text-[#E8D9C6]">{job.summary}</span>
            <div className="h-1 w-[120px] overflow-hidden rounded-full bg-[rgba(251,249,244,0.15)]">
              <div className="h-full rounded-full bg-[#E87D3F]" style={{ width: job.progressWidth }} />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-card">
        {job.lanes.map((lane) => (
          <PublishLaneRow key={lane.id} lane={lane} />
        ))}
      </div>
    </div>
  );
}
