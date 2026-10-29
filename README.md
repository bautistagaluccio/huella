# Huella

Website for [huellaretreat.com](https://huellaretreat.com) — kitesurf, surf, golf, ski and yoga trips for private groups, arranged from Dubai.

Originally built with Lovable; now maintained in this repo and deployed on Vercel.

## Stack

- TanStack Start (React 19, SSR) + TypeScript
- Tailwind CSS v4 + shadcn/ui components
- Supabase (enquiries table, admin auth) — currently the Lovable Cloud project `dtlqqsqnsaovisucqfup`
- Vitest for tests

## Local development

Requires Node.js 22+ and npm.

```sh
npm install
cp .env.example .env   # then fill in the Supabase values
npm run dev            # http://localhost:8080
```

Other scripts: `npm test`, `npm run build`, `npm run lint`, `npm run format`.

## Environment variables

| Name | Used by |
| --- | --- |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` | Browser client (inlined at build time) |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID` | Server-side rendering |

The publishable key is safe to expose; data access is enforced by Supabase row-level security. Never commit `.env`.

## Deployment

`vite.config.ts` builds for Vercel (`nitro: { preset: "vercel" }`), producing `.vercel/output`. Import the repo in Vercel, keep the default build settings, and add the environment variables above.

## Project layout

- `src/routes/` — pages (file-based routing): home, `/sports/$sport`, trip detail pages, `/admin-huella`
- `src/components/` — page sections; `src/components/ui/` is shadcn/ui
- `src/lib/` — trip schedules and departure data (covered by tests in `src/test/`)
- `src/assets/` — photography
- `drizzle/` — database schema and SQL migrations
- `roadmap.md` — change log of content/design decisions
