"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4 tracking-tight">Something went wrong</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        An unexpected error has occurred. We've been notified and are looking into it.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
