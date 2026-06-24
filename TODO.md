# TODO.md — Showcase Production Readiness

> Last updated: 2026-06-13 · 90 commits

## 🔴 Before Deploy

- [ ] **Supabase/DB credentials** — need `DATABASE_URL`, `DIRECT_URL`, Supabase keys
  - `cp .env.example .env.local` and fill in values
  - Run `npx prisma generate` for types
  - Run `npm run db:init` for migrations + seed
  - Verify `npm run build` passes cleanly
- [ ] **Rotate any secrets** shared during dev/debugging
- [x] **Forgot password flow** — Supabase `resetPasswordForEmail`, auth callback exchange, and reset-password update flow are wired
- [x] **OAuth connections** — real token exchange + identity fetch wired for X, LinkedIn, Threads, Facebook, Instagram (Instagram upgrades to a long-lived token); token refresh handled in the publish executor
- [ ] **Publish execution** — real provider delivery now live for X, LinkedIn, Threads, Facebook, Instagram (incl. media). Remaining:
  - [ ] **YouTube** video publishing (currently throws "not available yet")
  - [ ] Any platform without a live adapter still falls back to simulated delivery

## 🟡 Polish

- [x] Media support — posts can attach an image via Supabase Storage upload; carried through to Instagram/Facebook publishing
- [x] Discovery/trending — now aggregated from real post hashtags + real public profiles
- [x] Analytics/engagement — removed fabricated likes/comments/reposts/followers; feed/profile now show real publish-lane delivery + real derived counts
- [x] Profile filters — now real per-platform counts from enabled publish targets
- [x] Warm editorial theme — warm paper base with atmospheric color washes + layered cream cards, Fraunces display serif, terracotta/sage accents, depth + hover motion
- [x] Empty states — feed/discover/notifications/profile/monitor now have on-brand empty states
- [ ] npm audit — 6 vulns (5 moderate + 1 high): postcss XSS (bundled in Next.js, needs breaking downgrade) + esbuild dev-server advisory
- [ ] Dependabot — alerts on repo (Next.js/postcss)
- [ ] Search — discover page has a search input but no backend

## 🔵 Nice-to-Have

- [x] Dark mode support — CSS-variable token system + .dark class, no-flash script, header toggle (persists to localStorage, respects system pref)
- [x] Loading states on all async page transitions — per-route loading.tsx for feed/discover/profile/settings/monitor/notifications
- [x] Skeleton components integrated into pages — re-themed loading-skeleton.tsx to warm tokens, used across loading routes
- [x] PWA / offline support — web manifest, icons, service worker (offline fallback + asset caching), SW registration
- [x] Rate limiting on auth endpoints — fixed-window limiter by IP on sign-in/sign-up
- [x] CSP headers — full CSP + X-Frame-Options/HSTS/Referrer-Policy/Permissions-Policy in next.config.ts
- [ ] Automated tests — no test runner or tests in the repo yet

## 🚀 Deploy

- [ ] Create `.env.local` with production Supabase keys
- [ ] Set up Vercel project pointing to this repo
- [ ] Configure env vars in Vercel dashboard
- [ ] Run `npm run db:init` against production Supabase
- [ ] Set `SHOWCASE_ENABLE_DB=true` in production
