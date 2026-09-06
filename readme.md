# abhishekejam.com

Personal site of Abhishek Ejam: an introduction, project cards, a short journey,
and a newsletter signup that opens Substack. Built with Next.js 15 (App Router),
React 19, TypeScript, and Tailwind CSS 4, with deployment through Vercel’s GitHub integration.

## Local development

Use Node.js 24 (`nvm use`) and pnpm 10.30.3, as pinned in `package.json`.
If Corepack is available, `corepack enable` enables the pnpm command.

```sh
nvm use
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. No application environment variables are required:
content and links are configured in `content/`, and the newsletter form submits
directly to Substack. The build uses `next/font/google` to fetch Figtree, so it
requires access to Google Fonts.

## Commands

| Command             | Purpose                                     |
| ------------------- | ------------------------------------------- |
| `pnpm dev`          | Start the development server with Turbopack |
| `pnpm build`        | Create a production build                   |
| `pnpm start`        | Serve an existing production build          |
| `pnpm lint`         | Run ESLint with zero warnings allowed       |
| `pnpm typecheck`    | Generate Next.js types and run TypeScript   |
| `pnpm format`       | Format files with Prettier                  |
| `pnpm format:check` | Check formatting without changing files     |

## Project structure

```text
.github/workflows/ci.yml  Lint, type, format, and build checks
app/
  page.tsx               Homepage: introduction, newsletter, projects, journey
  layout.tsx             Root layout, Figtree font, and shared metadata
  globals.css            Tailwind sources, colour tokens, and global styles
  opengraph-image.tsx     Generated social sharing image
  icon.svg               Site icon
  robots.ts              Robots metadata route
  sitemap.ts             Sitemap metadata route
components/
  Nav.tsx                Header and navigation
  SocialLinks.tsx        X, LinkedIn, and GitHub links
  SubscribeForm.tsx      Substack email signup
  ProjectCard.tsx        Project presentation
  Footer.tsx             Footer and newsletter link
content/
  site.ts                Profile, URLs, navigation, and newsletter copy
  projects.ts            Project details
  journey.ts             Journey entries
public/                  Profile images and other static assets
next.config.ts           Redirects from former site routes
package.json             Dependencies, Node/pnpm versions, and scripts
pnpm-lock.yaml           Locked dependency versions
```

The homepage is statically rendered. Former `/articles/*`, `/notes/*`, `/now`,
and `/about` routes permanently redirect to `/`. There are no local article
pages or newsletter API routes.

Update profile details and links in `content/site.ts`, project cards in
`content/projects.ts`, and journey entries in `content/journey.ts`. Profile assets
live in `public/`; `site.profileImage` selects the image and `app/page.tsx` controls
its circular crop. Theme colours are in `app/globals.css`; the generated social
image has its own colours in `app/opengraph-image.tsx`.

The `design/` and `docs/` directories, when present locally, are ignored reference
materials and are not part of the tracked application.

## CI and deployment

The [GitHub Actions workflow](.github/workflows/ci.yml) runs lint, type checking,
format checking, and a production build for pull requests and pushes to `main`.

Deploy through [Vercel’s GitHub integration](https://vercel.com/docs/git/vercel-for-github):

1. Import `abhiejam/abhishekejam.com` into Vercel.
2. Use the Next.js framework preset, the repository root as the root directory,
   Node.js 24.x, and `main` as the production branch.
3. Configure the production domain in Vercel and ensure `site.url` in
   `content/site.ts` matches it.

Vercel creates preview deployments for branch pushes and pull requests, and
production deployments for updates to `main`. No `vercel.json` or Vercel secrets
in GitHub Actions are required for this setup. Vercel deployments and GitHub
Actions checks run independently; require the checks in GitHub branch protection
to prevent merging failing changes into `main`.
