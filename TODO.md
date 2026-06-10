# TODO.md — Showcase Production Readiness

> Last updated: 2026-06-10 · Session: 10 commits, all pushed

## ✅ Completed Today

- [x] Remove demo user auth bypass (`current-user.ts`)
- [x] Fix slug creation race condition with retry loop (`bootstrap-user.ts`)
- [x] Add DB error handling (try/catch throughout server layer)
- [x] Create Zod validation schemas for auth (`lib/validators/auth.ts`)
- [x] Integrate Zod into sign-in/sign-up server actions
- [x] Add password visibility toggle (`components/auth/password-input.tsx`)
- [x] Add confirm password field to sign-up
- [x] Add forgot password link + page (`app/auth/forgot-password`)
- [x] Remove hardcoded demo credentials from auth pages
- [x] Purge all mock/fake Maya Rivera data → empty states
- [x] Create custom 404 page (`app/not-found.tsx`)
- [x] Create error boundary with Try Again (`app/error.tsx`)
- [x] Create loading skeleton components (`components/loading-skeleton.tsx`)
- [x] Generate bug audit report (`BUG_REPORT.md`)
- [x] npm audit fix (hono CVE resolved)
- [x] Fix sub-agent tool access (profile: full, native runtime)

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

- [ ] Discovery/trending — currently lightweight, needs real aggregation
- [ ] Analytics/engagement — still presentation-level numbers in some places
- [ ] npm audit — 5 moderate remain (postcss bundled in Next.js, not fixable without downgrade)
- [ ] Dependabot — 2 moderate alerts on repo (Next.js postcss)
- [ ] Search — discover page has search input but no backend
- [ ] Profile filters — hardcoded count=0, needs real DB counts

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

---

## Agent Setup Notes

- `tools.profile`: full ✅
- `sandbox.mode`: off ✅
- Sub-agents: use `model: "opencode-go/deepseek-v4-pro"` for full write access
- Git: token configured for `Prelyst/showcase`
