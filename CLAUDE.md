# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server at localhost:3000
pnpm build        # production build (also runs TypeScript)
pnpm lint         # ESLint check
npx tsc --noEmit  # TypeScript validation only
```

Always use `pnpm` — not npm or yarn.

## Architecture

Next.js 16 App Router portfolio site with MDX blog support.

**Routing** — all pages live in `src/app/` using the App Router convention. The layout (`src/app/layout.tsx`) wraps every page with `Navbar` and `Footer`, centers content at `max-w-[1200px]`, and applies the Roboto font and dark slate theme globally.

**Components** — reusable components live in `src/components/`, each in its own directory. Only `Navbar` and `Footer` are re-exported from the barrel `src/components/index.ts`; all others are imported directly (e.g. `@/components/MainHeading`).

**Blog / MDX pipeline** — blog posts are `.mdx` files in `src/_posts/`. The dynamic route `src/app/blog/[slug]/page.tsx` reads them from disk via `fs.readFileSync` and compiles them at request time using `next-mdx-remote/rsc`'s `compileMDX`. MDX component overrides (e.g. `h2`, `p`) are wired in that file via the `components` map, with base HTML mappings defined in `src/components/MDX/`. The root `src/mdx-components.tsx` is required by Next.js for App Router MDX support but is currently a passthrough. The `next.config.js` enables `@next/mdx` with the experimental Rust-based compiler (`mdxRs: true`).

**Path alias** — `@/*` resolves to `src/*` (configured in `tsconfig.json`).

## Code style

- Components: named exports, PascalCase filenames, `type Props = {}` for prop types
- Strings: double quotes; `'use client'` directive uses single quotes
- Imports: Next.js/React first, then local via `@/` alias
- Tailwind responsive prefixes: `md:` and `sm:` — mobile-first
- TypeScript strict mode is on; all props must be typed
