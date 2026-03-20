# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # TypeScript type-check (no emit)
npm run clean        # Remove dist/
```

Requires a `GEMINI_API_KEY` in `.env.local` (see `.env.example`).

## Architecture

This is a **React 19 + TypeScript + Vite** SPA — a Batman-themed developer portfolio with two switchable themes.

### Theme System (`src/App.tsx`)

`App.tsx` is the root component that owns theme state and switches between two full-page themes:

- **`BatmanTheme`** — dark tactical HUD aesthetic (default after activation)
- **`ProTheme`** — clean light professional mode (default on load)
- **`BatSignalTransition`** — animated overlay shown during theme switches

Theme toggling is triggered by:
1. Keyboard Easter egg: type `"BATMAN"` to activate dark mode, `"BRUCE"` to exit
2. Click the name 3 times in ProTheme
3. Joker card modal inside ProTheme (triggers pixel-collapse canvas animation)

### Components

All portfolio content is **hardcoded inside the two theme components** — no CMS or external data source.

**`BatmanTheme.tsx`** — Sections: Hero, Tactical Arsenal (Skills), Service Records (Experience), Case Files (Projects), Clearances (Education/Certs), Secure Comms (Contact). Uses HUD panels, scanlines, JetBrains Mono font, red (#E50914) accents on black.

**`ProTheme.tsx`** — Same sections with professional naming. Contains two Easter eggs: a Joker card (scroll-triggered, canvas pixel-collapse animation on accept) and a cursor glitch effect (random interval, inline SVG data URI cursors).

**`BatSignalTransition.tsx`** — Full-screen overlay with spotlight + bat logo spring animation (3s). Used between theme switches.

### Styling

Tailwind CSS 4 (via `@tailwindcss/vite` plugin). Custom CSS variables and utility classes in `src/index.css`:
- `--color-bat-red: #E50914`, `--color-bat-black`, `--color-bat-gray`, `--color-bat-light`
- `.hud-panel`, `.scanline`, `.tech-border`, `.logo-red-hue`

Path alias: `@/` → project root (configured in both `vite.config.ts` and `tsconfig.json`).

### Animation

Uses the **`motion`** library (not `framer-motion`) for `whileInView` scroll animations and spring transitions. Canvas + `requestAnimationFrame` for the pixel-collapse transition in ProTheme.
