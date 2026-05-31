# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A React + TypeScript meditation timer app, scaffolded with Vite, linted with ESLint, and formatted with Prettier. Deployed to Vercel.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:5173)
npm run build        # type-check + production build (output: dist/)
npm run preview      # preview production build locally
npm run lint         # run ESLint
npm run format       # run Prettier (write)
npm run format:check # run Prettier (check only)
```

## Architecture

Single-page app with no routing. All state lives in `src/App.tsx` (timer logic, quote rotation). Presentational components live in `src/components/`.

- **Timer state**: `status` (`idle | running | finished`), `remaining` (seconds), managed with `useReducer` + `useInterval`
- **Quote rotation**: a static pool of 15 Buddhist wisdom quotes, cycled on session start and on a periodic interval while running
- **Bell sound**: played via the Web Audio API when `remaining` reaches 0 — no external asset required
- **Styling**: plain CSS modules (no CSS-in-JS framework)

## Key constraints

- Bell sound is synthesised with `AudioContext` — no audio file asset.
- Vite config targets modern browsers only (no IE11 shims).
- ESLint config extends `@typescript-eslint/recommended` and `plugin:react-hooks/recommended`.
