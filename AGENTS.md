# AGENTS.md — Cruza el Puente

Spanish review app (A1.1 → A1.2, growing to A2+) for Croatian adults at the El Puente language school. Mobile-first PWA.
UI text is **Spanish**; help/explanations are **Croatian** (`lang="hr"`, usually via `<Hint>`). README is in Croatian.

Stack: React 18 · TypeScript 5.9 (strict) · Vite 5 · plain CSS with design tokens · Firebase Auth + Firestore (sync) · Web Push · GitHub Pages (Firebase Hosting prepared).
No router library, no state library, no UI kit — on purpose (see "Decisions").

## Commands

| Command                           | What it does                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `npm run dev`                     | Dev server on http://localhost:5173/el-puente/ (works without Firebase: local-only mode) |
| `npm run check`                   | **Run before you finish.** typecheck + lint + format check + tests                       |
| `npm run typecheck`               | `tsc -b`                                                                                 |
| `npm run lint` / `lint:fix`       | ESLint 9 (TS, react-hooks, jsx-a11y, arrow-only)                                         |
| `npm run format` / `format:check` | Prettier (printWidth 160). Course data files are excluded                                |
| `npm test` / `test:watch`         | Vitest (node env): `src/**/*.test.ts`, `scripts/**/*.test.mjs`                           |
| `npm run build`                   | Production build into `dist/` (`BASE=/` for root hosting)                                |

Which checks: any code change → `npm run check`. CSS/UI change → also look at it in the browser at 375 px and desktop, light and dark.
Content-only change → `npm test` (content guards) is the minimum. Workflow/script change → `npm test` + run the script without secrets (it must exit cleanly).

## Architecture

```
src/
  main.tsx            entry: global CSS, ErrorBoundary, starts Firebase + service worker
  App.tsx             shell: header, tab bar, current screen or practice session
  app/                shell pieces — navigation.ts (ViewName, TABS, useNav), useRoute.ts (hash routing + back button),
                      AppHeader, TabBar, ErrorBoundary, useTheme, useHeaderScroll
  features/<name>/    one folder per screen/area: home, practice (session Runner + question views), cards, verbs,
                      games, stories, sheets, progress, settings. Feature-only components and CSS live here.
  components/         shared UI used by 2+ features (Seg, Hint, SpeakBtn, AccentBar, ConjGrid, Boot, SheetHtml, Ring, Toast, icons)
  hooks/              shared React hooks (useReader, useSync, useToast)
  lib/                framework-free logic + services: store (state/sync merge), srs, questions (session builders), check (answer
                      tolerance), verbs, numbers, cards, level, updates, reader, speech, firebase, push, types, util
  content/            course data per level folder (a1.1/, a1.2/), levels.ts, updates.json — see src/content/AGENTS.md
  styles/             tokens.css → base.css → layout.css → components.css (imported by styles/index.css)
scripts/              Node scripts run by GitHub Actions (push senders) + their tests
public/sw.js          service worker (push display + notification click only, no caching)
```

Data flow: content → `lib/level.ts` (active levels) → `lib/cards.ts` / `lib/questions.ts` → screens.
State lives in one store (`lib/store.ts`, `useSyncExternalStore`): `useAppState()`, `useSettings()`, `update(fn)`, `setSetting(k, v)`.
Every `update()` saves to localStorage and (when signed in) schedules a Firestore push; `mergeStates()` reconciles devices.

## Where things go

- **New screen:** `features/<name>/<Name>.tsx` (+ `<name>.css` imported by it). Add the view to `ViewName`/`isView` in
  `app/navigation.ts` (and `TABS` if it's a tab), map it in `SCREENS` in `App.tsx`, add an icon to `VIEW_ICONS` if needed.
- **New question type:** type in `lib/types.ts` (`Question` union), builder in `lib/questions.ts`, view in `features/practice/`, branch in `Runner.tsx`.
- **New setting:** field + default in `lib/types.ts` / `defaultSettings()` (old saved data gets defaults via `normalize()`;
  migrate changed shapes there and add a test in `lib/store.test.ts`), then a `<Row>` in `features/settings/Settings.tsx`.
- **New synced state:** add to `AppState`, `defaultState()`, the copy in `update()`, and a merge rule in `mergeStates()` + test.
- **Shared component:** only when a second feature needs it → `components/`. Hooks shared by 2+ → `hooks/`.
- **Pure logic:** `lib/` (no React, no DOM where avoidable) with a `*.test.ts` next to it.
- **Constants:** keep local unless shared. Design values → `styles/tokens.css`. Course data → `src/content/`.

## Code conventions

- **Arrow functions only** (`const f = () => {}`), including components and hooks. Enforced by ESLint. The only exception is
  class components React requires (`app/ErrorBoundary.tsx`). Note: arrows aren't hoisted — define before module-level use.
- Named exports, no default exports (except per-level `content/<level>/index.ts`), no barrel files; import files directly.
- Components `PascalCase.tsx`; hooks `useX.ts`; everything else `camelCase.ts`; feature CSS `<feature>.css`; tests `x.test.ts` beside `x.ts`.
- Formatting is Prettier's job; don't hand-align. Keep comments short and about _why_.
- TypeScript strict; no `any` (use `unknown` + narrowing). `!` is allowed where an invariant is obvious.

## UI: styling, accessibility, states

- **Styling:** plain CSS + CSS custom properties. Use tokens from `styles/tokens.css`: colours (`--ink`, `--paper`, `--brand`,
  `--brand-strong`, `--brand-soft`, `--hl-*`, `--ok/--bad/--warn`), spacing `--sp-1…6`, radii `--r-sm/md/lg/pill`, type `--fs-*`,
  `--tap` (44 px). Never hard-code colours — dark mode only works through tokens (both dark blocks in tokens.css must match).
- **Reuse before adding:** buttons `.btn` (`.primary`, `.ghost`, `.big`), `.icon-btn`, `.chip` (toggle with `aria-pressed`), `<Seg>`
  (segmented choice), `.card`, `.pill`, `.badge`, `.mark.<colour>` (highlighter headings), `.hint`, `.fb.ok|bad|warn`, `<Toast>`, icons `<Ic.name />`.
- **Responsive:** design at 375 px first; no horizontal page scroll; phone tab bar is fixed at the bottom (≈72 px — sticky bottom
  UI must sit above it); desktop ≥ 820 px. Header hides on scroll down on phones (`body.hdr-hidden`).
- **Accessibility:** real `<button>`s for actions (never clickable `div`/`span`; ESLint jsx-a11y will complain), `aria-label` on
  icon-only buttons, `aria-pressed` for toggles, `lang="hr"` on Croatian text, visible focus (global `:focus-visible`), 44 px targets,
  keyboard shortcuts must not fire while typing in an input. Respect `prefers-reduced-motion` (global rule in base.css).
- **States:** every async/conditional UI needs loading (e.g. "Comprobando sesión…"), empty (e.g. Mis palabras), error (inline `.fb.bad`
  or `role="status"` hint) and disabled styling. The app-wide `ErrorBoundary` is the last resort, not the plan.
- **Audio:** never autoplay unless `settings.autoplay` (use `autoSpeak`); user-triggered speech uses `speak`. Long text → `useReader`.

## Integration boundaries & pitfalls

- **Env vars** (Vite, public by design, documented in `.env.example`): `VITE_FIREBASE_*`, `VITE_VAPID_PUBLIC_KEY`. Real secrets
  (`FIREBASE_SERVICE_ACCOUNT`, `VAPID_PRIVATE_KEY`, `FIREBASE_HOSTING_SERVICE_ACCOUNT`) exist only as GitHub secrets — never in `src/`.
- **Firestore:** one doc per user `users/{uid}` (whole `AppState`) + `users/{uid}/push/{device}`. Rules in `firestore.rules` must be
  republished in the Firebase console when changed. Keep `AppState` small (Spark plan limits, see README).
- **Card ids are the Spanish text.** Editing a Spanish line resets that card's progress for everyone.
- **Update ids are dates (`YYYY-MM-DD`) and compared as strings** (badge, push). Keep them sortable.
- **Base path:** GitHub Pages serves under `/el-puente/` (`vite.config.ts`); use `import.meta.env.BASE_URL` for runtime URLs.
- **localStorage keys** start with `el-puente-` — don't rename them (users would lose data).
- **Speech:** browser TTS differs per device; `onboundary` (word tracking) is missing on some voices; Chrome cuts long utterances —
  that's why the reader speaks sentence by sentence (`lib/speech.ts`, `hooks/useReader.ts`).
- **Push:** senders are `scripts/remind.mjs` (cron, every 15 min) and `scripts/notify-content.mjs` (after deploy). Decision logic is
  pure and tested; `runSender` in `scripts/lib/push.mjs` does I/O. iOS needs the app installed to the home screen.
- The embedded/preview browsers may not support service workers or audio; verify those on a real phone.

## Decisions (and when to revisit)

- **Plain CSS + tokens, no UI kit.** The notebook/highlighter look is custom; Tailwind/shadcn/MUI would mean a rewrite for no
  functional gain. If a complex widget is needed (dialog, menu, combobox), add only that Radix primitive (`@radix-ui/react-*`).
- **Hash routing, no React Router.** ~10 views, no URLs to share beyond the hash. Revisit if nested/deep-linked routes appear.
- **Custom store, no Redux/Zustand.** One synced document; `useSyncExternalStore` is enough.
- **Content as typed code, not a CMS.** Reviewed in diffs, validated by tests, no backend. New class material is added through
  Claude Code (`/nueva-clase` skill in `.claude/skills/`).

## Workflow for a change

1. Read the related feature folder, `lib/` module and this file's "Where things go".
2. Follow the existing pattern; prefer extending a component/token over adding a new one.
3. Make the smallest complete change (UI + logic + states + test where logic changed).
4. `npm run check`; for UI, look at it at 375 px and desktop, light and dark.
5. Update docs you made stale: this file, `src/content/AGENTS.md`, README, `docs/ADDING_CONTENT.md`.

## Keeping this file accurate

Update AGENTS.md in the same change when you: add/move a top-level folder, add a command or check, change a convention or
lint rule, add an env var/secret/integration, or change a decision above. Scoped rules belong in a nested `AGENTS.md`
(currently only `src/content/AGENTS.md`) — don't duplicate them here.
