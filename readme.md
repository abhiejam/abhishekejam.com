# abhishekejam.com

Personal site of Abhishek Ejam, built with [Next.js](https://nextjs.org) (App Router)
and [Tailwind CSS](https://tailwindcss.com), deployed on [Vercel](https://vercel.com).

This replaces the previous Jekyll site, which remains in this repository's git
history on `main`.

## Requirements

- Node.js 24 (`nvm use` reads `.nvmrc`)
- pnpm, pinned in `package.json`. If `pnpm` is not on your PATH, run
  `corepack enable` once, or prefix commands with `corepack pnpm`.

## Running locally

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Then open http://localhost:3000.

## Scripts

| Command             | Purpose                            |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Dev server with Turbopack          |
| `pnpm build`        | Production build                   |
| `pnpm start`        | Serve the production build         |
| `pnpm lint`         | ESLint, warnings treated as errors |
| `pnpm typecheck`    | `next typegen` then `tsc --noEmit` |
| `pnpm format`       | Prettier write                     |
| `pnpm format:check` | Prettier check                     |

## Layout

```
app/         routes, metadata, OG image, sitemap, robots, global CSS
components/  Nav, SocialLinks, SubscribeForm, ProjectCard, Footer
content/     site.ts, projects.ts, journey.ts — all copy lives here
public/      static assets
```

Copy and links are edited in `content/`, not in components.
