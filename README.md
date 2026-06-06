# portfolio

> **Live:** https://stephanvoytov.github.io/personal-site/

Personal portfolio site — dark theme, custom cursor, terminal widget, i18n.

## Stack

- **React 19** + **Vite 8** (build ~180ms, 430 modules)
- **Tailwind CSS v4** (utility-first, `@import "tailwindcss"`)
- **Framer Motion** (animations, scroll-reveal)
- **react-intersection-observer** (viewport triggers)
- Custom i18n context (EN/RU)

## Quick start

```bash
npm install
npm run dev
```

Dev server starts at `http://localhost:5173`.

## Scripts

| Command              | Description              |
|----------------------|--------------------------|
| `npm run dev`        | Start dev server (Vite)  |
| `npm run build`      | Production build → `dist/` |
| `npm run preview`    | Preview production build |
| `npm run lint`       | ESLint check             |

## Deployment

Automatic via **GitHub Actions** on push to `master`:

1. `npm run build`
2. Push to `master`
3. Action deploys to `gh-pages` branch
4. Available at `https://stephanvoytov.github.io/personal-site/`

Manual: run `npm run build`, then push `dist/` to `gh-pages`.

## Structure

```
src/
├── components/     # Hero, About, Skills, Terminal, Projects, Contact, Navbar, Footer
├── data/           # Projects data, skills categories
├── i18n.js         # English / Russian translations
├── App.jsx         # Page shell
├── main.jsx        # Entry point
└── index.css       # Theme, utilities, scroll-snap, backgrounds
```

## Features

- Dark theme with mint accent (`#34d399`), Tokyo Night palette
- Custom cursor: green dot + morph ring (changes shape over links, buttons, code, cards)
- Terminal widget: 6 sessions with char-by-char typing, line-by-line output, restart ↻
- Language switcher EN/RU (terminal stays English)
- 8 curated projects, Rugram featured with GUI/TUI labels
- Glassmorphism cards, scroll-snap blocks (`y mandatory`)
- Cursor morphs on skill tags (`code`), cards (`card`), links (`link`), buttons (`button`)
