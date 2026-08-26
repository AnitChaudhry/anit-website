# Editorial Portfolio Template

An open, MIT-licensed Next.js portfolio template — editorial layout, scroll-driven
motion, static export. Fork it and make it yours.

> **Note:** this repo started life as Anit Choudhary's personal site. That site has
> been discontinued and the custom domain removed; the repo stays public as a
> template. The copy, images and links below are the original author's — replace
> them with your own before deploying.
>
> Author: [Anit Choudhary](https://www.linkedin.com/in/anit-choudhary-984994149/) ·
> Founder, [Thinqmesh Technologies](https://www.thinqmesh.com)

## What I'm building

Open source, all on this profile — most of it Claude-Code-native or BYOK so you can fork it and run it yourself.

| Repo | What it is |
|---|---|
| **[10x-development-team](https://github.com/AnitChaudhry/10x-development-team)** | AI-powered development team plugin for Claude Code — 7 agents, 16 commands, 32 knowledge files, 39 components. Idea → spec → merge in one loop. |
| **[codebase-context-skill](https://github.com/AnitChaudhry/codebase-context-skill)** | Context engineering middleware for Claude Code — intelligent codebase indexing, token-efficient file selection, local tracking, testing, auditing, session persistence via MD files. |
| **[CharClaw-App](https://github.com/AnitChaudhry/CharClaw-App)** | Self-hosted AI coding agents. Fork, bring your own keys, make it yours. |
| **[Upfyn-Code-App](https://github.com/AnitChaudhry/Upfyn-Code-App)** | GUI toolkit for AI coding agents — manage Claude Code sessions, create custom agents, track usage. |
| **[upfyn-agents](https://github.com/AnitChaudhry/upfyn-agents)** | Claude Code skills plugin — statusline + kanban canvas TUI for AI coding agents. |
| **[claude-code-statusline](https://github.com/AnitChaudhry/claude-code-statusline)** | Rich, customizable statusline for Claude Code — colored legends, context bar, GitHub info, token tracking, skill display. |
| **[HRKit](https://github.com/AnitChaudhry/HRKit)** | Open-source local HR app with BYOK AI assistant, Composio integrations, recruitment kanban, per-employee folder layout. Python + SQLite. MIT. |
| **[anit-website](https://github.com/AnitChaudhry/anit-website)** | This site — open template if you want a portfolio with the same shape. |

Full list of 30 repos at [github.com/AnitChaudhry](https://github.com/AnitChaudhry?tab=repositories).

## What this repo is

Editorial portfolio site, deliberately understated. Built to host a profile and a body of work on a domain I own.

**Stack:** Next.js 16 (App Router, static export) · Tailwind CSS v4 · Motion · lucide-react · GitHub Pages via Actions · custom domain.

**Sections:**

1. Hero — parallax orbs, headline, portrait
2. Journey — narrative arc
3. Experience — collapsible role timeline
4. Work — three projects I'm shipping
5. Gallery — left-to-right marquee of LinkedIn post screenshots, paused on hover
6. Conviction — pull quote
7. Connect — LinkedIn / Gmail compose / OpenAnalyst / GitHub, over a cinematic video footer with a cursor-tracking mascot

## Run locally

```bash
npm install
npm run dev
```

Opens on [localhost:3000](http://localhost:3000).

## Build static site

```bash
npm run build      # writes ./out/
```

Deployed automatically by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on every push to `master`.

## Want to fork this for your own portfolio?

Open template — go ahead. The only ask is a visible upstream credit on the live site (the "Source on GitHub →" pill in the Connect footer is the natural spot). See [LICENSE](./LICENSE) for the exact terms.

What you'll touch:

| Section | File |
|---|---|
| Headline / eyebrow / nav | `src/components/sections/Hero.tsx` |
| Journey copy | `src/components/sections/Journey.tsx` |
| Roles array | `src/components/sections/Experience.tsx` |
| Project cards | `src/components/sections/Work.tsx` |
| Pull quote | `src/components/sections/Line.tsx` |
| Contact links + email template | `src/components/sections/Connect.tsx` |
| Hero portrait | `public/profile/anit-hero.jpeg` |
| Mascot | `public/profile/spunky1.jpg` |
| Gallery posts | `public/posts/post-01.jpeg` … `post-05.jpeg` |
| Favicon | `src/app/icon.png` |
| Site URL / SEO / OG image / sitemap / robots / llms.txt | `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `public/llms.txt`, `public/og.png` |

For a custom domain, drop a `CNAME` file in `public/` with your domain, set the DNS `CNAME` to `<your-username>.github.io`, then in repo Settings → Pages enable HTTPS.

## License

MIT with attribution. See [LICENSE](./LICENSE).
