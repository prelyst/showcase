# TODO.md — Showcase Production Readiness

> Last updated: 2026-06-10 · 11 commits pushed

## 🔴 Before Deploy

- [ ] **Supabase/DB credentials** — need `DATABASE_URL`, `DIRECT_URL`, Supabase keys
  - `cp .env.example .env.local` and fill in values
  - Run `npx prisma generate` for types
  - Run `npm run db:init` for migrations + seed
  - Verify `npm run build` passes cleanly
- [ ] **Rotate any secrets** shared during dev/debugging
- [ ] **Forgot password flow** — wire Supabase `resetPasswordForEmail` in a server action
- [ ] **OAuth connections** — token exchange stubbed, provider API delivery is placeholder
- [ ] **Publish execution** — `lib/publish/executor.ts` still simulates delivery; needs real provider APIs

## 🟡 Polish

- [x] Discovery/trending — now aggregated from real post hashtags + real public profiles
- [x] Analytics/engagement — removed fabricated likes/comments/reposts/followers; feed/profile now show real publish-lane delivery + real derived counts
- [x] Profile filters — now real per-platform counts from enabled publish targets
- [x] Warm editorial theme — warm paper base with atmospheric color washes + layered cream cards, Fraunces display serif, terracotta/sage accents, depth + hover motion
- [x] Empty states — feed/discover/notifications/profile/monitor now have on-brand empty states
- [ ] npm audit — 5 moderate remain (postcss bundled in Next.js, not fixable without downgrade)
- [ ] Dependabot — 2 moderate alerts on repo (Next.js postcss)
- [ ] Search — discover page has search input but no backend

## 🔵 Nice-to-Have

- [ ] Dark mode support (currently beige/light theme only)
- [ ] Loading states on all async page transitions
- [ ] Skeleton components integrated into pages
- [ ] PWA / offline support
- [ ] Rate limiting on auth endpoints
- [ ] CSP headers
- [ ] Automated tests

## 🚀 Deploy

- [ ] Create `.env.local` with production Supabase keys
- [ ] Set up Vercel project pointing to this repo
- [ ] Configure env vars in Vercel dashboard
- [ ] Run `npm run db:init` against production Supabase
- [ ] Set `SHOWCASE_ENABLE_DB=true` in production

