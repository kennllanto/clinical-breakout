# Unlock Me If You Can: The Vasoactive Breakout

A critical-care **breakout / escape-room game** on inotropes & vasopressors for ICU nurses
(default patient case: Mrs. Ina Pressor). Built as a static React + Vite single-page app —
no backend, all state in the browser.

Four levels, ten clinical locks, three shared team lives. Crack each lock's code, then
deliver a short clinical rationale the facilitator marks pass/fail. Designed as a single
shared facilitator board. The content is data-driven (`src/data/defaultGame.js`), so the
same engine can host any topic pack.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

> This machine runs Node from `~/.local/node`. If `node`/`npm` aren't found, run:
> `export PATH="$HOME/.local/node/bin:$PATH"` (already added to `~/.zshrc`).

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Editing game content

Click **Edit game / Import** on the briefing screen. You can edit levels, locks, codes and
rationales, **export/import CSV** (one row per lock), and reset to the built-in game.
Content is saved to the browser's `localStorage`.

## Deploy

The app is a static bundle and works on any static host.

### GitHub Pages (configured)
`.github/workflows/deploy.yml` builds on push to `main` and deploys to Pages. The Vite
`base` is set automatically to `/<repo-name>/`. After the first push:
**Repo → Settings → Pages → Build and deployment → Source: GitHub Actions.**

### Netlify / Vercel / Cloudflare Pages
These serve from the domain root, so leave `VITE_BASE` unset (defaults to `/`).
Either connect the repo (build command `npm run build`, publish dir `dist`) or drag the
`dist/` folder onto <https://app.netlify.com/drop>.
