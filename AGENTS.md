# Agent Development Guide

## Commands
- **Dev**: `pnpm dev` (Next.js development server)
- **Build**: `pnpm build` (production build)
- **Lint**: `pnpm lint` (ESLint check)
- **Type check**: `npx tsc --noEmit` (TypeScript validation)

## Code Style
- **Imports**: Use Next.js/React imports first, then local components with relative paths
- **Quotes**: Use double quotes for strings, single quotes for 'use client' directive
- **Components**: Named exports with PascalCase, functional components with arrow functions
- **Props**: Use TypeScript `type Props = {}` pattern for component props
- **Files**: PascalCase for components, lowercase for utilities
- **Styling**: Tailwind CSS with responsive design patterns (md:, sm:)

## TypeScript
- Strict mode enabled - all types required
- Use `@/*` path alias for src imports
- Props typing required for all components

## Framework
- Next.js 15 with App Router
- React 19 with hooks (useState, usePathname)
- Framer Motion for animations
- MDX for blog content