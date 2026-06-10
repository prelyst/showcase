import React from 'react';

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-800 rounded-xl animate-pulse bg-gray-900/50">
      <div className="w-full h-48 bg-gray-800 rounded-lg"></div>
      <div className="w-3/4 h-6 bg-gray-800 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-800 rounded"></div>
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="flex flex-col gap-2 animate-pulse w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-800 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        ></div>
      ))}
    </div>
  );
}

export function ListSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="flex flex-col gap-4 animate-pulse w-full">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-800 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-2 flex-grow">
            <div className="w-1/3 h-4 bg-gray-800 rounded"></div>
            <div className="w-1/2 h-3 bg-gray-800 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
