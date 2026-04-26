# justinwender.com

Personal website for Justin Wender. **Phase 2 of a phased build** — Next.js scaffold plus an embedded Sanity Studio with the full content schema. Design system, public-facing content sections, and deployment all come in later phases.

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Sanity](https://www.sanity.io/) (embedded Studio + headless CMS)
- [npm](https://docs.npmjs.com/) for package management

## Folder structure

```
.
├── app/                  # Next.js App Router routes, layouts, and root-level styles
│   └── studio/           # Embedded Sanity Studio (catch-all route at /studio)
├── components/           # Shared React components
├── lib/                  # Utilities and helpers
├── public/               # Static assets
├── sanity/
│   ├── env.ts            # Reads NEXT_PUBLIC_SANITY_* env vars
│   ├── lib/client.ts     # Configured Sanity read client (no fetches yet)
│   ├── schemas/          # Document schemas (post, project, externalPublication, aboutPage, siteSettings)
│   └── structure.ts      # Studio structure (singletons + standard lists)
├── sanity.config.ts      # Sanity Studio config (consumed by /studio route)
├── AGENTS.md             # Framework-maintained guidance for coding agents (do not remove)
├── CLAUDE.md             # Points at AGENTS.md for Claude Code sessions
└── ...                   # Config files (next.config.ts, tsconfig.json, postcss.config.mjs, etc.)
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in values. Both variables are required for the Studio and the Sanity client to start:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (`ixjc7ib1` for this project). |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (`production`). |

`.env.local` is gitignored; `.env.example` is committed as documentation.

## Running locally

```bash
npm install
npm run dev
```

- App: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

The first time you open `/studio`, sign in with the Google or GitHub account that has access to the Sanity project.

## Sanity Studio

The Studio is embedded directly in the Next.js app (no separate deploy) using `next-sanity/studio`. The configuration lives in [`sanity.config.ts`](./sanity.config.ts) and the route is at [`app/studio/[[...tool]]/page.tsx`](./app/studio/%5B%5B...tool%5D%5D/page.tsx).

Schemas live under [`sanity/schemas`](./sanity/schemas):

- `post` — blog/writing entries
- `project` — portfolio projects
- `externalPublication` — links to writing published elsewhere
- `aboutPage` *(singleton)* — the About page body
- `siteSettings` *(singleton)* — contact info and social links

Singletons appear at the top of the Studio sidebar and cannot be created, duplicated, or deleted from the UI.

## Scripts

- `npm run dev` — start the dev server (app + Studio)
- `npm run build` — production build
- `npm run start` — run the production build

## Phase plan

- **Phase 1:** scaffold Next.js + TypeScript + Tailwind, placeholder homepage
- **Phase 2 (current):** embedded Sanity Studio + content schema (no public rendering yet)
- **Phase 3+:** design system, fonts, layout components, public content sections, deployment

Later phases will also add separate Vercel projects for subdomains (e.g. `credence.justinwender.com`).
