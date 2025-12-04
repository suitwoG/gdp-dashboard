# Lex Moscua

A Duolingo-inspired law learning experience built with Next.js and Tailwind CSS. The app uses a colorful, card-based layout to present your learning path, weekly progress, achievements, and store upgrades.

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

   If your environment blocks the default registry, set an accessible registry and ensure `npm_config_http_proxy` / `npm_config_https_proxy` are unset:

   ```bash
   npm_config_http_proxy= npm_config_https_proxy= npm install --registry=https://registry.npmjs.org
   ```

2. Run the development server

   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser to explore the Learn, Leaderboard, Store, and Profile dashboards.

## Scripts

- `npm run dev` – start the Next.js dev server
- `npm run build` – build for production
- `npm run start` – run the production server
- `npm run lint` – lint the project

## Styling

Tailwind utilities are used directly in JSX/TSX. Global styles are limited to the Tailwind base/components/utilities imports.
