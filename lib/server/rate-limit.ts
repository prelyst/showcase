import { headers } from 'next/headers';

type Bucket = { count: number; resetAt: number };

// Process-local store. Good enough for a single instance / dev; for multi-region
// serverless this should be backed by a shared store (e.g. Upstash Redis).
const store = new Map<string, Bucket>();

// Opportunistic sweep so the map can't grow without bound.
function sweep(now: number) {
  if (store.size < 5000) return;
  for (const [key, bucket] of store) {
    if (bucket.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/** Fixed-window rate limiter keyed by an arbitrary string. */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = store.get(key);

  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count, retryAfterSeconds: 0 };
}

/** Best-effort client IP from proxy headers, falling back to a shared bucket. */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return h.get('x-real-ip') ?? 'unknown';
}

/**
 * Rate-limit an auth attempt by IP + action. Defaults: 8 attempts / 10 min.
 * Reset the cache key for tests via `__resetRateLimit`.
 */
export async function limitAuthAttempt(
  action: string,
  { limit = 8, windowMs = 10 * 60 * 1000 }: { limit?: number; windowMs?: number } = {},
): Promise<RateLimitResult> {
  const ip = await getClientIp();
  return rateLimit(`auth:${action}:${ip}`, limit, windowMs);
}

/** Test-only: clear all buckets. */
export function __resetRateLimit() {
  store.clear();
}
