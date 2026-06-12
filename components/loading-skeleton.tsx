import React from 'react';

export function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-[16px] border border-border bg-card p-5 shadow-card">
      <div className="h-40 w-full rounded-[12px] bg-skeleton" />
      <div className="h-5 w-3/4 rounded bg-skeleton" />
      <div className="h-4 w-1/2 rounded bg-skeleton" />
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="flex w-full animate-pulse flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 rounded bg-skeleton ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

export function ListSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="flex w-full animate-pulse flex-col gap-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-12 w-12 shrink-0 rounded-full bg-skeleton" />
          <div className="flex flex-grow flex-col gap-2">
            <div className="h-4 w-1/3 rounded bg-skeleton" />
            <div className="h-3 w-1/2 rounded bg-skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** A card-grid skeleton matching the Discover layout. */
export function GridSkeleton({ items = 8 }: { items?: number }) {
  return (
    <div className="grid animate-pulse gap-[14px] md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="rounded-[14px] border border-border bg-card p-[18px] shadow-card">
          <div className="mb-3 h-3 w-12 rounded bg-skeleton" />
          <div className="mb-3 h-6 w-2/3 rounded bg-skeleton" />
          <div className="h-3 w-1/2 rounded bg-skeleton" />
        </div>
      ))}
    </div>
  );
}
