# Showcase

Showcase is a creator-first social publishing product focused on intentional posting, cross-platform distribution, and a calmer archive-driven experience.

It is designed around a simple idea:

> social platforms should reward intention, not volume.

A creator writes once inside Showcase, previews how the post will appear on multiple platforms, publishes selectively, tracks delivery lane by lane, and keeps a clean public archive at a single profile URL.

---

## Current implementation status

This repository is now a real Next.js application with:

- a public landing page based on `showcase-home.html`
- a routed internal app based on `showcase-app.html`
- real Supabase Auth session handling
- Prisma + Supabase Postgres backing core app data
- seeded demo data and one-time DB initialization flow
- profile editing, auth, first-login bootstrap, and DB-backed draft save flow

This is no longer just a static frontend mock. It is now an early product foundation.

---

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Prisma
- Zod

---

## Key features currently implemented

### Public site
- landing homepage implemented from `showcase-home.html`

### Auth
- sign in
- sign up
- forgot password and reset password via Supabase recovery links
- sign out
- protected `/showcase/*` routes
- real Supabase session handling

### App foundation
- first-login app bootstrap
  - creates `User`
  - creates `Profile`
  - creates `UserSettings`
- user-aware shell and identity surfaces
- editable profile management
- DB-backed draft loading and saving
- DB-backed notifications/settings/profile/compose loaders
- more data-driven feed/discover/monitor routes
- OAuth connect scaffolding for external platform accounts

### Seeded demo account
- email: `maya@showcase.app`
- password: `showcase`

---

## Important files

### Prototypes
- `showcase-home.html`
- `showcase-app.html`

### App
- `app/page.tsx`
- `app/auth/sign-in/page.tsx`
- `app/auth/sign-up/page.tsx`
- `app/showcase/feed/page.tsx`
- `app/showcase/discover/page.tsx`
- `app/showcase/notifications/page.tsx`
- `app/showcase/compose/page.tsx`
- `app/showcase/monitor/page.tsx`
- `app/showcase/profile/page.tsx`
- `app/showcase/settings/page.tsx`

### Backend/data
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/migrations/`
- `lib/db/prisma.ts`
- `lib/server/bootstrap-user.ts`
- `lib/server/current-user.ts`
- `lib/server/showcase-data.ts`
- `lib/repositories/`
- `lib/validators/`

---

## Environment variables

Required:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
DIRECT_URL=
SHOWCASE_ENABLE_DB=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Notes:
- `DATABASE_URL` should be the pooled connection string
- `DIRECT_URL` should be the direct Postgres connection for Prisma migrations
- `SHOWCASE_ENABLE_DB=true` enables DB-backed app behavior
- `NEXT_PUBLIC_APP_URL` must match the deployed origin so OAuth callbacks resolve correctly

Optional OAuth provider env vars for real connected-account flows:

```env
OAUTH_X_CLIENT_ID=
OAUTH_X_CLIENT_SECRET=
OAUTH_THREADS_CLIENT_ID=
OAUTH_THREADS_CLIENT_SECRET=
OAUTH_FACEBOOK_CLIENT_ID=
OAUTH_FACEBOOK_CLIENT_SECRET=
OAUTH_INSTAGRAM_CLIENT_ID=
OAUTH_INSTAGRAM_CLIENT_SECRET=
OAUTH_YOUTUBE_CLIENT_ID=
OAUTH_YOUTUBE_CLIENT_SECRET=
SHOWCASE_OAUTH_STATE_SECRET=
```

`SHOWCASE_SCHEMA_ONCE` is no longer part of the normal workflow.

---

## Development

Install:

```bash
npm install
```

Create env file:

```bash
cp .env.example .env.local
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

---

## Database workflow

Generate Prisma client:

```bash
npm run prisma:generate
```

Create a local dev migration:

```bash
npm run prisma:migrate
```

Apply committed migrations:

```bash
npm run prisma:deploy
```

Seed demo data:

```bash
npm run prisma:seed
```

One-time DB initialization:

```bash
npm run db:init
```

This runs:
- `npm run prisma:deploy`
- `npm run prisma:seed`

Important:
- migration and seed are one-time Supabase/database setup tasks
- they should be run directly against Supabase
- they do not need to run inside Vercel builds

---

## Deployment guidance

### Vercel
Use normal build command:

```bash
npm run build
```

Recommended env:

```env
SHOWCASE_ENABLE_DB=true
```

Do not run migration or seed inside the normal Vercel build.
Initialize the database separately with:

```bash
npm run db:init
```

---

## Current routes

### Public
- `/`

### Auth
- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/callback`
- `/auth/sign-out`

### Internal app
- `/showcase`
- `/showcase/feed`
- `/showcase/discover`
- `/showcase/notifications`
- `/showcase/compose`
- `/showcase/monitor`
- `/showcase/profile`
- `/showcase/settings`

---

## Current product maturity

Working well now:
- auth
- first-login bootstrap
- profile editing
- seeded demo data
- draft save flow
- DB-backed profile/settings/notifications/compose
- more data-driven app routes
- settings writes
- notification lifecycle writes/read state
- public profile route at `/u/[slug]`
- publish job and lane record creation
- connected account state scaffolding
- auth metadata sync from profile edits
- Supabase-backed forgot-password and reset-password recovery flow

Still not fully production-complete:
- publish execution is live for X, LinkedIn, Threads, Facebook, and Instagram (image posts); YouTube video upload is still unavailable in the current worker
- discovery/trending/social graph is still lightweight
- OAuth token exchange is real for X, LinkedIn, Threads, Facebook, Instagram, and YouTube; YouTube still needs the provider API delivery adapter
- some analytics/engagement numbers are still presentation-level
- npm audit still reports moderate upstream ecosystem advisories that do not have a safe in-family auto-fix from the current dependency set

## Security / hardening notes

- rotate any Supabase/database secrets that were shared in chat during setup/debugging
- keep migrations and seed outside normal Vercel build flow
- prefer pooled `DATABASE_URL` for runtime and direct `DIRECT_URL` for Prisma migrations
- avoid storing real third-party access tokens in plaintext once OAuth flows are added

---

## Product note

Showcase should feel like:
- a creator tool, not a marketing suite
- a publishing system, not a growth-hacking dashboard
- a quieter social product, not a noisy algorithm casino

That product tone is important and should stay protected as the implementation deepens.
