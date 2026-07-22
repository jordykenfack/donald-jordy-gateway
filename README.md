# Donald Jordy — Gateway

A premium split-screen gateway that sits above Donald Jordy's two portfolios and
lets a visitor choose which side of his work to explore:

- **Data Science** (left) → the `jordy-portfolio` project
- **AI Studio** (right) → the `jack-portfolio` project

It is an interactive portfolio *selector*, not a conventional homepage. The two
portfolios stay independent — this project only links out to them.

## Stack

| | |
| --- | --- |
| Framework | Vite + React 18 + TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | GSAP (`matchMedia` + tweens for the split interaction) |
| Fonts | Space Grotesk (display), Inter (body), IBM Plex Mono (labels) |

Chosen to match `jack-portfolio`'s conventions (also Vite + React + Tailwind v3)
so tooling and idioms stay consistent across the ecosystem.

## Running locally

```bash
npm install
npm run dev       # http://localhost:5175
npm run build     # tsc + vite build
npm run preview   # preview the production build
```

The gateway runs on **:5175** so it never collides with the two portfolios:

| Project | Command | Local URL |
| --- | --- | --- |
| Gateway (this) | `npm run dev` | http://localhost:5175 |
| Data Science (`jordy-portfolio`, Next.js) | `npm run dev` | http://localhost:3000 |
| AI Studio (`jack-portfolio`, Vite) | `npm run dev` | http://localhost:5173 |

Start all three to click through the full experience locally.

## Changing the destinations / production URLs

Everything lives in **one file**: [`src/config/portfolios.ts`](src/config/portfolios.ts).

- `localUrl` — used in development (`import.meta.env.PROD === false`)
- `productionUrl` — used automatically in a production build

Suggested production destinations (already set as the `productionUrl` values):

- Data Science → `https://data.donaldjordy.com`
- AI Studio → `https://studio.donaldjordy.com`

Change those two strings and nothing else — no destination is hard-coded in any
component. `projectPath` in the same file is a maintainer-only reference and is
never rendered or shipped to the browser.

## Interaction & accessibility

- Each panel is a single semantic `<a>` — the whole surface is clickable,
  focusable, and Enter-activatable. No click handlers on non-semantic containers.
- Hover / focus expands the active panel to ~63% and dims the other, via GSAP
  with `overwrite: 'auto'` so rapid pointer movement retargets cleanly instead
  of stacking tweens.
- Desktop split collapses to stacked full-width cards on mobile (Data Science
  first), with titles, descriptions, and CTAs always visible — no hover needed.
- Touch / non-hover devices (`@media (hover: none)`) always show descriptions.
- `prefers-reduced-motion: reduce` disables the GSAP split and CSS animations;
  the page stays fully usable as a plain 50/50 split of two links.

## Cross-portfolio switcher

Each portfolio has a small `PortfolioSwitcher` (Data Science ⇄ AI Studio)
matching its own visual identity:

- `jordy-portfolio/src/components/PortfolioSwitcher.tsx` → in the `TopBar`
- `jack-portfolio/src/components/PortfolioSwitcher.tsx` → beside the hero monogram

Each highlights the current experience and links to the other. Their
destination URLs are configured at the top of each component (dev vs. production).
