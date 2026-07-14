# radamejr.com — an interactive résumé

**Live at [radamejr.com](https://radamejr.com)**

My résumé, rendered as itself and as four "platform skins" — LinkedIn,
Twitter/X, Facebook, and GitHub — all generated from one dataset. Same
experience, education, and skills; four different native-feeling layouts,
plus a plain résumé view. It's a personal, non-commercial stylistic homage —
not affiliated with LinkedIn, X Corp., Meta, or GitHub, and the tabs aren't
links to my real accounts (see the notice on the home page).

## What's in here

- **Single source of truth.** Every page reads from `app/data/resume.ts` —
  edit it once, all five pages update.
- **Deterministic "flavor" data.** Like counts, follower numbers, the GitHub
  contribution graph (which spells something if you look closely) — all
  seeded from stable hashes, not `Math.random()`, so they're identical on
  every render with no hydration mismatches.
- **React Router 7** (SPA mode) + **TypeScript** + **Tailwind CSS v4**.
- **100% test coverage** — Vitest + React Testing Library across every
  component, route, and helper.
- **Deployed automatically** to S3 + CloudFront via GitHub Actions on every
  push to `master`.

## Pages

| Route       | What it is              |
| ----------- | ----------------------- |
| `/`         | Plain résumé            |
| `/linkedin` | LinkedIn-style profile  |
| `/twitter`  | Twitter/X-style feed    |
| `/facebook` | Facebook-style timeline |
| `/github`   | GitHub-style profile    |

## Development

```bash
npm install
npm run dev         # start the dev server at http://localhost:5173
npm test             # run the test suite
npm run coverage     # run tests with a coverage report
npm run typecheck
npm run format        # format with Prettier
```

## Built by

Built by me, [Robert Adame](https://radamejr.com), with the help of AI
coding tools (Claude Code) — pairing hands-on engineering with AI-assisted
development, which is itself part of what this site is demonstrating.
