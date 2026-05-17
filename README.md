# Showcase

Showcase is a creator-first social publishing product focused on intentional posting, cross-platform distribution, and a calmer archive-driven experience.

It is designed around a simple idea:

> social platforms should reward intention instead of volume.

A creator writes once inside Showcase, previews how the post will appear on multiple platforms, publishes selectively, tracks delivery lane by lane, and keeps a clean public archive at a single profile URL.

---

## Product concept

Showcase combines three ideas into one product:

1. **A cross-platform composer**
   - write a post once
   - preview it per platform
   - publish to multiple platforms from one place

2. **A publishing monitor**
   - each external platform is treated as its own delivery lane
   - failures are isolated instead of breaking the whole publish flow
   - users can inspect what succeeded, what failed, and what needs retrying

3. **A creator profile and feed**
   - every intentional post becomes part of a creator-owned archive
   - a profile acts like a living portfolio
   - the internal feed is calmer and more deliberate than mainstream social timelines

---

## Current implementation status

This repository has moved beyond a single mockup and now includes:

- a **Next.js app** for the actual implementation
- a **landing homepage** based on the `showcase-home` prototype
- a **page-by-page routed app implementation** based on the `showcase-app` prototype
- the original HTML prototype files kept for reference during implementation

Current state:

- frontend only
- static UI implementation
- no backend yet
- no database yet
- no authentication yet
- no real API/platform integrations yet

So this is currently a **high-fidelity frontend implementation of the product concept**, not a production-ready platform.

---

## Tech stack

### Current stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Supabase client SDK**
- **Prisma**
- **Zod**

### Recommended production stack

For the real product, the current recommended stack is:

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **UI system:** shadcn/ui
- **Database:** Supabase Postgres
- **ORM:** Prisma
- **Auth:** Supabase Auth
- **Validation:** Zod
- **Backend app layer:** Next.js server actions / route handlers + repository/service structure
- **Realtime updates:** Supabase Realtime or SSE depending on feature needs
- **Jobs/queues:** Trigger.dev
- **Cache/queue backend:** Redis
- **Storage:** Supabase Storage or Cloudflare R2
- **Analytics:** PostHog
- **Email:** Resend

---

## Repository structure

### Important prototype files

- `showcase-home.html`
  - the landing-page prototype
  - used as the design reference for the public homepage

- `showcase-app.html`
  - the app/product prototype
  - contains the full multi-page internal app mockup
  - used as the design reference for the routed app implementation

### Next.js app

- `app/layout.tsx`
  - root application layout

- `app/globals.css`
  - shared global styles

- `app/page.tsx`
  - public landing homepage
  - implemented to closely follow `showcase-home.html`

### Routed Showcase app

Under `app/showcase/`:

- `app/showcase/page.tsx`
  - app entry/index page

- `app/showcase/feed/page.tsx`
  - feed view

- `app/showcase/discover/page.tsx`
  - discover view

- `app/showcase/notifications/page.tsx`
  - notifications view

- `app/showcase/compose/page.tsx`
  - post composer view

- `app/showcase/monitor/page.tsx`
  - publish monitor view

- `app/showcase/profile/page.tsx`
  - creator profile view

- `app/showcase/settings/page.tsx`
  - settings view

### Components

- `components/showcase-shell.tsx`
  - shared shell for the internal app
  - includes sidebar navigation and page chrome

- `components/showcase-ui.tsx`
  - reusable presentation components for cards, rows, avatars, platform badges, and section blocks

### Backend foundation

- `prisma/schema.prisma`
  - core relational schema for users, profiles, posts, targets, publish jobs, lane results, connected accounts, and notifications

- `lib/db/prisma.ts`
  - Prisma client singleton

- `lib/supabase/client.ts`
  - browser Supabase client factory

- `lib/supabase/server.ts`
  - server Supabase client factory

- `lib/repositories/`
  - DB access layer scaffolding for profiles, posts, notifications, and connected accounts

- `lib/validators/`
  - Zod validation schemas for profile, settings, and post operations

- `lib/types/showcase.ts`
  - typed frontend domain models

- `lib/mock/showcase.ts`
  - typed mock data used by the current UI until real reads replace it

---

## Implemented screens

### Public homepage

The landing page is implemented in Next.js and is based on `showcase-home.html`.

Implemented sections include:

- fixed top navigation
- hero section
- platform strip
- product showcase/composer section
- stats section
- features grid
- feed/product explanation section
- profile/product explanation section
- testimonial section
- pricing section
- FAQ section
- final CTA section
- footer

### Internal app screens

The internal app has routed pages for:

- Feed
- Discover
- Notifications
- Compose
- Publish Monitor
- Profile
- Settings

These are implemented as separate routes instead of one giant static HTML file.

---

## Design language

The current UI implementation follows the prototype’s core visual system:

- warm editorial palette
- soft paper-like backgrounds
- serif typography for expressive content
- sans-serif and monospace accents for interface structure
- gentle borders, rounded panels, and muted contrast
- calm, creator-focused layout choices

The product is intentionally positioned away from high-noise social UI patterns.

---

## What is accurate vs what is still approximate

A lot of the prototype is now represented in the actual app, but there are still differences.

### Already in place

- routed app structure
- separate screens instead of one static prototype page
- homepage matching the landing-page prototype much more closely
- shared app shell/sidebar
- high-fidelity static UI for major surfaces

### Still approximate / not complete yet

- some icons are simplified and not all are exact SVG matches
- some spacing and tiny interaction details still differ from the prototypes
- some responsive behaviors are simplified
- app data is static/mock data only
- no real backend logic exists yet
- no platform publishing integrations exist yet
- no auth, persistence, or realtime delivery state yet

---

## Development

Install dependencies:

```bash
npm install
```

Create local environment values from the template:

```bash
cp .env.example .env.local
```

Important for Prisma 7:
- Prisma Client must be generated before the app builds on a fresh machine
- `npm install` now runs `prisma generate` automatically via `postinstall`
- if generation ever needs to be rerun manually, use `npm run prisma:generate`

Required variables:

- `SHOWCASE_ENABLE_DB`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `DIRECT_URL`

Recommended behavior during first deploy:
- keep `SHOWCASE_ENABLE_DB=false` while getting the app deployed and stable
- do **not** run DB initialization inside the normal Vercel build by default
- initialize the database explicitly only when needed with `npm run db:init`
- after DB setup is finished, switch `SHOWCASE_ENABLE_DB=true` to enable DB-backed Showcase pages

Temporary first-schema option:
- if you want Vercel to create the schema one time, set `SHOWCASE_SCHEMA_ONCE=true`
- this temporarily makes `build` run `prisma migrate deploy`
- after the first successful schema creation, set `SHOWCASE_SCHEMA_ONCE=false` again

Run the app locally:

```bash
npm run dev
```

Generate Prisma client:

```bash
npm run prisma:generate
```

Run local Prisma migration:

```bash
npm run prisma:migrate
```

Apply production-safe migrations:

```bash
npm run prisma:deploy
```

Seed demo Showcase data:

```bash
npm run prisma:seed
```

Initialize the database explicitly when needed:

```bash
npm run db:init
```

This runs:
- `npm run prisma:deploy`
- `npm run prisma:seed`

The seed also ensures the demo Supabase Auth user exists:
- email: `maya@showcase.app`
- password: `showcase`

Open Prisma Studio:

```bash
npm run prisma:studio
```

Build for production:

```bash
npm run build
```

Temporary schema-once behavior during build:
- `SHOWCASE_SCHEMA_ONCE=false` → build is fast and only runs Next.js build
- `SHOWCASE_SCHEMA_ONCE=true` → build first runs `prisma migrate deploy`, then continues
- after schema exists, set `SHOWCASE_SCHEMA_ONCE=false` again

---

## Current routes

### Public

- `/`
  - landing homepage

### Internal Showcase app

- `/showcase`
- `/showcase/feed`
- `/showcase/discover`
- `/showcase/notifications`
- `/showcase/compose`
- `/showcase/monitor`
- `/showcase/profile`
- `/showcase/settings`

---

## Phase roadmap

### Phase 1, done

- extract shared Showcase UI components
- move repeated static content into typed mock data
- reduce page-level JSX duplication

### Phase 2, in progress

Backend foundation with **Supabase + Prisma**:

- Prisma schema for core product models
- Supabase client scaffolding
- Prisma client wrapper
- repository layer scaffolding
- Zod validators for core writes
- environment template for Supabase/Postgres setup

### Current Phase 3 progress

The app now has:
- DB-first loaders for profile, notifications, settings, and compose draft surfaces
- a `UserSettings` Prisma model
- safe Prisma gating for deployments via `SHOWCASE_ENABLE_DB`
- a demo seed path for:
  - user
  - profile
  - settings
  - notifications
  - connected accounts
  - draft post

### Next steps after current Phase 3 slice

1. connect a real Supabase project and Postgres connection string
2. set env vars in Vercel
3. deploy app with `SHOWCASE_ENABLE_DB=false`
4. run `npm run db:init` when ready to create schema and seed data
5. switch `SHOWCASE_ENABLE_DB=true`
6. redeploy
7. add write actions for:
   - settings
   - profile
   - draft update
   - platform target selection
5. move publish monitor onto DB-backed publish jobs and lane results

---

## Product notes

Showcase should feel like:

- a creator tool, not a marketing suite
- a publishing system, not a growth-hacking dashboard
- a quieter social product, not a noisy algorithm casino

That positioning matters, and the prototypes already express it well. The implementation should keep protecting that tone.
