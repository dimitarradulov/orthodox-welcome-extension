# Repository Guidelines

## Project Structure & Module Organization

This is a Manifest V3 Chrome new-tab extension built with React, TypeScript, and Vite. `manifest.json` defines the extension entry points, permissions, background worker, and popup. Application code is in `src/`: `main.tsx` and `App.tsx` render the new-tab view, while `popup.tsx` and `PopupApp.tsx` provide the extension popup. Keep reusable UI in `src/components/`, stateful behavior in `src/hooks/`, shared helpers in `src/utils/`, and static domain data in `src/constants/` and `src/types/`. Put bundled icons and imagery under `src/assets/`. Keep component styles beside their component (for example, `components/Clock/Clock.tsx` and `Clock.css`).

## Build, Test, and Development Commands

- `npm run dev` starts the Vite development server for local extension work.
- `npm run build` runs TypeScript type checking and produces the production extension bundle in `dist/`.
- `npm run preview` serves the built bundle for a quick production-style check.

Load the generated `dist/` directory as an unpacked extension in Chrome. There is currently no automated test command; at minimum, run `npm run build` and manually verify the new-tab page and popup after changes.

## Commit & Pull Request Guidelines

Recent commits use concise, lowercase, imperative summaries such as `add a popup` or `update readme`. Keep each commit focused. Pull requests should explain the user-visible change, note manifest or permission updates, link relevant issues, and include screenshots for changes to the new-tab page or popup. Confirm `npm run build` succeeds before requesting review.
