# justinwender.com

Personal website for Justin Wender. **Phase 1 of a phased build** — this is the raw scaffolding only. Design system, CMS integration, content sections, and deployment configuration all come in later phases.

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- [npm](https://docs.npmjs.com/) for package management

## Folder structure

```
.
├── app/           # Next.js App Router routes, layouts, and root-level styles
├── components/    # Shared React components (empty in Phase 1)
├── lib/           # Utilities and helpers (empty in Phase 1)
├── public/        # Static assets
├── AGENTS.md      # Framework-maintained guidance for coding agents (do not remove)
├── CLAUDE.md      # Points at AGENTS.md for Claude Code sessions
└── ...            # Config files (next.config.ts, tsconfig.json, postcss.config.mjs, etc.)
```

## Running locally

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build

## Phase plan

- **Phase 1 (current):** scaffold Next.js + TypeScript + Tailwind, placeholder homepage
- **Phase 2+:** design system, fonts, layout components, Sanity CMS, content sections, deployment

Later phases will also add separate Vercel projects for subdomains (e.g. `credence.justinwender.com`).
