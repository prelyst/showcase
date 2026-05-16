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

### Recommended production stack

For the real product, the best-fit stack is:

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **UI system:** shadcn/ui
- **State/data fetching:** TanStack Query
- **Backend:** Next.js route handlers for MVP, or a dedicated service layer later
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** Auth.js or Better Auth
- **Realtime updates:** SSE or websockets
- **Jobs/queues:** Trigger.dev or BullMQ
- **Cache/queue backend:** Redis
- **Storage:** S3 or Cloudflare R2
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

Run the app locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

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

## Suggested next steps

The highest-value next steps are:

1. **Refactor UI into reusable components**
   - extract cards, headers, pills, stat rows, profile blocks, etc.
   - reduce duplicated JSX between pages

2. **Make the shell more prototype-accurate**
   - replace placeholder symbols with exact SVG icons
   - improve responsive sidebar behavior
   - tighten spacing and interaction polish

3. **Connect landing page and app flow more cleanly**
   - ensure all CTA routes are intentional
   - add a proper app entry experience

4. **Introduce data models**
   - users
   - creator profiles
   - posts
   - publish jobs
   - publish lane results
   - connected external accounts

5. **Add authentication**
   - sign in
   - session handling
   - profile ownership

6. **Add backend publish orchestration**
   - queue-based publishing
   - lane-by-lane status tracking
   - retry support
   - failure logging

7. **Replace mock data with real data sources**
   - database-backed feed/profile/settings state

---

## Product notes

Showcase should feel like:

- a creator tool, not a marketing suite
- a publishing system, not a growth-hacking dashboard
- a quieter social product, not a noisy algorithm casino

That positioning matters, and the prototypes already express it well. The implementation should keep protecting that tone.
