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

## Analytics and Phase 2

The root layout includes Vercel Web Analytics and Google Analytics, reusing the
old site's GA4 property `G-T91ZN1PS7M`. Tracking is disabled during development
and Vercel previews. Production builds outside Vercel also enable tracking.
The site follows the system colour preference, with no theme toggle.

Enable Web Analytics in the Vercel project dashboard before deploying.
[Vercel custom events](https://vercel.com/docs/analytics/custom-events) require
a supported plan. The same events are sent to Google Analytics:

| Event             | Source                | Meaning                                      |
| ----------------- | --------------------- | -------------------------------------------- |
| `subscribe_click` | `newsletter_form`     | A valid email form was submitted to Substack |
| `subscribe_click` | `newsletter_fallback` | The direct subscription link was clicked     |
| `namesnap_click`  | `project_card`        | The NameSnap card was clicked                |

Events contain only the source label, never the email input. Subscription events
measure intent; completed subscriptions and double opt-in happen on Substack.
The native form and links work even when JavaScript or analytics is blocked.

After deployment, verify both events in Vercel and GA4 Realtime using a browser
without tracking blockers. Record a baseline over the first seven full days:
visitors, form submissions, fallback clicks, and NameSnap clicks. Compare each
event count with visitors, noting that repeated clicks are not unique conversions.
Use Substack's own reporting for confirmed subscriptions.

Optional subscriber and product statistics are omitted until verified numbers
are available.

## Search visibility and traffic sources

Search titles and descriptions live in `content/site.ts`; the visible bio reflects
the same Melbourne software engineering and AI product work. The homepage renders
`ProfilePage`/`Person` JSON-LD from `content/structured-data.ts`. The sitemap omits
`lastModified` until a reliable content modification date is maintained. Vercel
non-production builds include a `noindex` directive.

GA4 already collects traffic attribution through the Google tag. In
**Reports → Acquisition → Traffic acquisition**, select **Session source / medium**
or **Session campaign**. Filter event counts to `subscribe_click` or
`namesnap_click` to compare actions by acquisition source. The custom event's
`source` parameter identifies the clicked element, not the acquisition source.
See [Google's campaign reporting guide](https://support.google.com/analytics/answer/10917952).

Use these URLs when sharing links to this site (do not add campaign tags to
internal navigation):

| Placement           | Sharing URL                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------- |
| LinkedIn profile    | `https://abhishekejam.com/?utm_source=linkedin&utm_medium=social&utm_campaign=profile`   |
| X profile           | `https://abhishekejam.com/?utm_source=x&utm_medium=social&utm_campaign=profile`          |
| Substack newsletter | `https://abhishekejam.com/?utm_source=substack&utm_medium=email&utm_campaign=newsletter` |

Referring sites, including AI assistants, can appear when they send a referrer or
tagged link. Missing attribution can appear as direct traffic; it cannot reliably
identify which assistant or app sent the visitor. Do not put emails or other
personal data in campaign parameters.

**Crawler visibility:** GA4 [automatically excludes known bots](https://support.google.com/analytics/answer/9888366)
and does not expose the excluded counts. Many crawlers never execute the Google
tag. Use [Vercel Firewall Observability](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features)
to inspect request user agents and bot activity, subject to the project's plan
and retention. User-agent strings alone are spoofable. No crawler-blocking rules
or artificial GA page views are added by this site.

After deployment, validate the URL in Google's Rich Results Test, verify the
production domain in Search Console, submit `/sitemap.xml`, and inspect homepage
indexing. Check an external tagged visit in GA4 and review source/medium after
report processing. Account configuration and live attribution need dashboard access.

## License

Licensed under [MIT](LICENSE).

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
