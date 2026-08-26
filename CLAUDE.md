# Mastery Codex

A study vault — course material captured as atomic concept notes with a
prerequisite graph — plus a Next.js app that reads the vault and renders it.

## Git workflow

**`main` is the trunk. Never commit to it directly.**

Every piece of work starts by branching off `main`:

```bash
git fetch origin main
git checkout -b <branch-name> origin/main
```

Work on that branch, commit there, push it, and open a pull request into
`main`. `main` only ever moves by merging a pull request.

This holds for everything — a new feature, a one-line fix, a documentation
change. If you find yourself on `main` with edits in the working tree, stop and
move them onto a branch before committing.

## Layout

| Path | Holds |
|---|---|
| `02-Concepts/<Subject>/` | Atomic concept notes, one idea each, with YAML front matter carrying `score`, `prerequisites`, `source`, and an append-only `history` |
| `03-Reviews/cycle-log.md` | The study cycle log |
| `SOURCES.md` | What is in `assets/raw-data/`, what it became, and what it deliberately did not |
| `assets/art/` | Tracked images used by the app |
| `assets/raw-data/` | Lecture PDFs and decks — **untracked** (~150MB); notes reference them by filename |
| `test-exam-pattern-solution/` | A one-off sandbox from working out the exam format by hand. Not a template for new exams |
| `web/` | The Next.js app |
| `.claude/agents/` | The party and central agents (Lyra, Vega, Atlas, Polaris, Rigel, Corvus, Antares) |
| `.claude/skills/` | The expertise each agent loads before acting |

## The web app

Next.js 16 with the App Router, in `web/`. Read `web/AGENTS.md` before writing
app code — this version has breaking changes from what you may expect, and the
guides live in `node_modules/next/dist/docs/`.

```bash
cd web
npm install
npm run dev     # local dev server
npm run build   # production build; also typechecks
npm run lint    # eslint
```

`npm run lint` currently reports 3 pre-existing problems in `AnimatedBar.tsx`,
`PortraitFx.tsx` and `useCountUp.ts`. Leave those alone unless you are fixing
them deliberately; just do not add more.

## Final Approach exams

`web/data/finalApproach/` holds one data file per subject, each exporting
`EXAM_ITEMS`, `UNITS` and `EXAM_META`. Adding a subject takes three steps, and
they are listed at the top of `registry.ts`.

Two things worth knowing before editing them:

- **`modernSwePrinciples.ts` is transcribed**, verbatim, from the markdown in
  `test-exam-pattern-solution/`. If that markdown changes, re-transcribe.
  `dataScienceEngineering.ts` and `softwareArchitecture.ts` have no markdown
  original — they are the source, so edit them directly.
- **The UI renders every field as plain text.** Backticks around identifiers are
  the house convention, but `**bold**` and `*italic*` will show up on screen as
  literal asterisks. There is no markdown renderer in `FinalApproach.tsx`.

Spread the correct answer across all four letters. Options render in the order
written and are never shuffled, so a bank whose answer is always "A" can be
passed without reading it.
