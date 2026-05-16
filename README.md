# Showcase

Showcase is a social publishing web app concept focused on intentional posting and cross-platform distribution.

## Vision

Showcase is built around a simple idea: social platforms should reward intention instead of volume.

The product is designed as a creator-focused publishing app where users can:
- write a post once
- preview how it appears across platforms
- selectively publish to channels like Showcase, X, LinkedIn, Bluesky, Reddit, and Threads
- monitor publishing status from one place
- manage connected accounts and creator settings

## Recommended implementation stack

For implementation, the best fit stack is:

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **UI system:** shadcn/ui
- **Data fetching/state:** TanStack Query
- **Backend:** Next.js route handlers for MVP
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** Auth.js or Better Auth
- **Realtime updates:** SSE or websockets
- **Background jobs:** Trigger.dev or BullMQ
- **Queue/cache:** Redis
- **Storage:** S3 or Cloudflare R2
- **Analytics:** PostHog
- **Email:** Resend

## Current repository status

This repository is now being transitioned from a static concept into a real frontend codebase.

At the moment it contains:
- the original HTML prototype in `showcase-app.html`
- a minimal Next.js frontend scaffold for implementation

## Minimal frontend setup

The first implementation step focuses only on the frontend foundation.

This includes:
- Next.js app router setup
- TypeScript configuration
- Tailwind CSS setup
- a basic homepage
- a lightweight app shell structure for future Showcase pages

## Planned app areas

The product surface currently maps to these main views:
- Feed
- Discover
- Notifications
- Compose
- Publish Monitor
- Profile
- Settings

## Suggested next implementation steps

After the minimal frontend setup, the next priorities should be:
1. turn the static prototype into reusable React components
2. build the persistent app shell and sidebar navigation
3. implement page routes for each main product area
4. define a database schema for users, posts, publish jobs, and connected accounts
5. add authentication
6. add background publishing job infrastructure

## Development

Install dependencies:

```bash
npm install
```

Run the frontend locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Files

- `showcase-app.html` — original single-file prototype
- `app/` — Next.js application source
- `components/` — reusable UI building blocks
- `public/` — static assets
