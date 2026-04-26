# anit-website

Editorial portfolio site by [Anit Chaudhry](https://www.linkedin.com/in/anit-choudhary-984994149/) — built with Next.js 16, Tailwind v4, and Motion. Live at [anitchaudhry.github.io/anit-website](https://anitchaudhry.github.io/anit-website/).

If you fork this to build your own personal site, the only ask is a visible upstream credit on the live site (footer link is fine). See [LICENSE](./LICENSE) for the exact terms.

## Stack

- Next.js 16 (App Router, static export)
- Tailwind CSS v4
- Motion (framer-motion successor)
- lucide-react icons
- Hosted on GitHub Pages via Actions

## Sections

1. **Hero** — parallax orbs, headline, portrait
2. **Journey** — narrative beats
3. **Experience** — collapsible role timeline
4. **Work** — three project cards
5. **Gallery** — left-to-right marquee of LinkedIn post screenshots, paused on hover
6. **Conviction** — pull-quote section
7. **Connect** — contact rail (LinkedIn / Gmail compose / OpenAnalyst / GitHub) over a cinematic video footer with a cursor-tracking Spunky mascot

## Run locally

```bash
npm install
npm run dev
```

Opens on [localhost:3000](http://localhost:3000). Hot reload works for everything.

## Build static site

```bash
npm run build
```

Outputs to `./out/`. The build sets `basePath: /anit-website` automatically when `NODE_ENV=production` — see [`next.config.ts`](./next.config.ts).

## Rebranding for your own site

Everything you'll need to touch lives in two places: text content and image assets.

### 1. Text content

| What | File |
|---|---|
| Headline / eyebrow / nav | `src/components/sections/Hero.tsx` |
| Journey copy | `src/components/sections/Journey.tsx` |
| Roles array | `src/components/sections/Experience.tsx` |
| Three project cards | `src/components/sections/Work.tsx` |
| Pull quote | `src/components/sections/Line.tsx` |
| Contact links + email template | `src/components/sections/Connect.tsx` |

### 2. Image assets (drop replacements with the same filenames)

| What | Path |
|---|---|
| Hero portrait | `public/profile/anit-hero.jpeg` |
| Mascot in Connect footer | `public/profile/spunky1.jpg` |
| Gallery posts (5, JPEG) | `public/posts/post-01.jpeg` … `post-05.jpeg` |
| Favicon | `src/app/icon.png` (any square PNG) |

If you change post count or filenames, also update the `POSTS` array in `src/components/sections/Gallery.tsx`.

### 3. Deploy config (one-time, when you fork)

- In `next.config.ts` change `basePath: "/anit-website"` to `/<your-repo-name>` (or `""` if your repo is named `<username>.github.io`).
- In your fork's GitHub repo settings → **Pages**, set **Source: GitHub Actions**.
- Push to `master`. The workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

### 4. Keep the credit

Add this somewhere visible on your live site (the Connect footer pills are a natural spot):

```tsx
<a href="https://github.com/AnitChaudhry/anit-website" target="_blank" rel="noopener noreferrer">
  Template by Anit Chaudhry
</a>
```

That's the only string attached. Otherwise — make it yours.

## License

MIT with attribution requirement. See [LICENSE](./LICENSE).
