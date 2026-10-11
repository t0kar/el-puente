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

## Verify everything from source material

Class notes, board photos and course books are **input, not truth**. Check every item before it goes in (and when you touch old content):

- Spanish: spelling, accents, gender/agreement, natural Peninsular usage. A Latin American word goes in as an alternative
  (`el cacahuete = el maní`), not alone.
- Croatian: correct, standard (not Serbian), not misleading in the hr→es direction (two cards must not share one Croatian meaning
  without a note that tells them apart).
- Quizzes (rules, story gaps, generated questions): **exactly one** option may be correct. If another would also fit (tú/usted,
  yo/él, agreeing/disagreeing with también/tampoco/sí), add context — `(tú)`, `(yo)`, `(slažem se)` in a rule prompt, a short
  context sentence in a story (story text is spoken and used for dictation, so no brackets there) — or swap the distractor.
- Level: mark items harder than the folder's level with `A2`/`B1`/`B2` (they get a yellow pill and can be hidden in Ajustes).
- Fix errors from the source instead of copying them; list anything you're unsure about for the user. Users can also report errors
  in the app (flag button → GitHub issue labelled `reporte`).

## Must not break

- **A card's id is its Spanish text.** Reword an existing Spanish line only to fix a real error, and then add
  `"old": "new"` to `renamed.ts` (progress is migrated on load; never remove entries). Fixing the Croatian side or the example is safe.
- Spanish text must be unique across **all** levels; topic `k` and story `id` too.
- Card line: `español | hrvatski` + optional fields in this order: `<update id>`, `A2|B1|B2`, `ej: Frase. → Prijevod.` (parsed by
  `parseCardLine` in `lib/cards.ts`; unknown fields fail the test). Every word/short phrase gets an example (short, A1 grammar);
  cards that are already a full sentence don't need one. Update ids must exist in `updates.json`, same for `u` on verbs/rules/stories/sheets.
- Alternatives `a = b`, gender `cansado / cansada`, opposites `a ≠ b`, notes in `(…)` aren't spoken or checked
  (see `lib/check.ts`, `lib/speech.ts`).
- Verbs: regular `{inf, hr}`; stem change `type: "o-ue" | "e-ie" | "e-i" | "u-ue"`; reflexive `refl: true`; irregular `irr: [6 forms]`
  plus `note` (put a vowel change like `e→ie` in the note so it shows up in la bota).
  Imperatives that can't be derived (irregular `ven/venga`, reflexive `dúchate/dúchese`): `imp: [tú, usted]` — only verbs that are
  regular or have `imp` join the Imperativo drill.
- Rules: `{q: "sentence with one ___", o: [options], a: correct index, hr: "Croatian explanation", u?, x?}`. Notes in `(…)` in `q`
  aren't spoken. Verbs take `x` too.
- Stories: gap = `{option|correct*|option::Croatian explanation}`, exactly one `*`. Keep sentences ending in `. ! ?` so the
  reader splits them well.
- Sheets: HTML snippets using the blocks in `sheets.ts`'s header (`.formula`, `table.para`, `ul.rules`, `.words`, `.duo`).
  Put Spanish examples in `<i>` (they become tap-to-hear); Croatian prose is fine. `widget: "boot"` appends the interactive la bota.
  Every sheet needs `cat` (Chuleta section, `SheetCat` in `lib/types.ts`) and `hr` (one plain Croatian line: when/why you use it).
  **Explain, don't just list:** a Croatian sentence saying what the rule means, a Croatian explanation in every rule row, and
  translations of key examples (`<i>Voy a casa.</i> = Idem kući.`). Read it as a beginner would: no bare formulas, no unexplained lines.
- Content files are excluded from Prettier on purpose (long one-line entries). Keep the existing style.

## Adding a class (scans → app)

Use the `/nueva-clase` skill (`.claude/skills/nueva-clase/SKILL.md`). In short: transcribe, add the `updates.json` entry,
place words in existing or new topics of the right level, add verbs/rules/stories/sheets for the grammar, run `npm test`,
then show a review table (added / skipped duplicates / questions) before committing.
