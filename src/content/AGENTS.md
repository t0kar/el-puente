# src/content — course data rules

Human how-to (Croatian, with examples): [docs/ADDING_CONTENT.md](../../docs/ADDING_CONTENT.md). This file lists the rules that
are easy to break. `npm test` (`content.test.ts`) enforces most of them.

## Layout

- `levels.ts`: level registry, in teaching order. A new level = add it here, copy the `a1.2/` folder, and register the folder
  in `index.ts` (`BY_LEVEL`). Level ids are strings like `"A2.1"`; the folder name is the lowercase id.
- `<level>/topics.ts | verbs.ts | rules.ts | stories.ts | sheets.ts`: content of that level. **Don't** set `lvl` by hand,
  `index.ts` stamps it from the folder.
- `updates.json`: class log, **oldest first**, `{ "id": "YYYY-MM-DD", "note": "short Spanish summary" }`. The newest entry drives
  "Desde la última clase", "Antes de clase", the Novedades badge and the new-content push (only for classes ≤ 10 days old).

## Must not break

- **A card's id is its Spanish text.** Never reword an existing Spanish line (it resets that card's progress for every user).
  Fixing the Croatian side is safe.
- Spanish text must be unique across **all** levels; topic `k` and story `id` too.
- Card line: `español | hrvatski | <update id>`. The third field is optional; when present it must exist in `updates.json`.
  Same for `u` on verbs/stories/sheets and the 5th element of a rule when it's a string.
- Alternatives `a = b`, gender `cansado / cansada`, opposites `a ≠ b`, notes in `(…)` aren't spoken or checked
  (see `lib/check.ts`, `lib/speech.ts`).
- Verbs: regular `{inf, hr}`; stem change `type: "o-ue" | "e-ie" | "e-i" | "u-ue"`; reflexive `refl: true`; irregular `irr: [6 forms]`
  plus `note` (put a vowel change like `e→ie` in the note so it shows up in la bota).
- Rules: `[sentence with ___, options, correct index, Croatian explanation, topic number or update id]`.
- Stories: gap = `{option|correct*|option::Croatian explanation}`, exactly one `*`. Keep sentences ending in `. ! ?` so the
  reader splits them well.
- Sheets: HTML snippets using the blocks in `sheets.ts`'s header (`.formula`, `table.para`, `ul.rules`, `.words`, `.duo`).
  Put Spanish examples in `<i>` (they become tap-to-hear); Croatian prose is fine. `widget: "boot"` appends the interactive la bota.
- Content files are excluded from Prettier on purpose (long one-line entries). Keep the existing style.

## Adding a class (scans → app)

Use the `/nueva-clase` skill (`.claude/skills/nueva-clase/SKILL.md`). In short: transcribe, add the `updates.json` entry,
place words in existing or new topics of the right level, add verbs/rules/stories/sheets for the grammar, run `npm test`,
then show a review table (added / skipped duplicates / questions) before committing.
