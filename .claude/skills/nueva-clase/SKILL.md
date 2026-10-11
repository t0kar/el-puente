---
name: nueva-clase
description: Add one class's new material to Cruza el Puente from notebook scans or photos (words, verbs, rules, grammar, a story). Use when the user shares class notes or scans, or says "nova lekcija", "novi sat", "dodaj gradivo" or "nueva clase".
---

# Nueva clase: notebook scans → course content

Read `src/content/AGENTS.md` first. It has the data rules. `docs/ADDING_CONTENT.md` has examples.

## Steps

1. **Transcribe** every page, accents included, and the Croatian meaning if it's written.
   Mark anything you can't read with `?` and ask instead of guessing.
2. **Verify** everything you transcribed before adding it (rules in `src/content/AGENTS.md` → "Verify everything from source material"):
   correct and natural Peninsular Spanish, correct standard Croatian, exactly one correct answer per quiz item, level above the
   course → `A2`/`B1`/`B2`. Fix errors from the notes instead of copying them, and list every fix in the report.
3. **Class info:** date (ask if it isn't in the notes) and level (default: the newest level that already has content, or ask).
   Append `{ "id": "YYYY-MM-DD", "note": "<2–5 word Spanish summary>" }` to `src/content/updates.json`.
4. **Words** go in `src/content/<level>/topics.ts` as `español | hrvatski | <id> | [A2|B1] | ej: Frase. → Prijevod.`:
   - Put each word in the existing topic it belongs to. Create a new topic only for a clearly new theme (unique `k`, Spanish `t`, Croatian `hr`, a `mark`).
   - Before adding, search **all** levels for the Spanish text (accent- and case-insensitive). Skip duplicates and never reword existing lines.
   - Add the article to nouns (`la camisa`), both genders for adjectives (`alto / alta`), and alternatives with `=`.
   - Give every word/short phrase a short example sentence (A1 grammar, ≤ 10 words, Croatian translation after `→`).
5. **Grammar** from the class:
   - verbs → `verbs.ts` (with `type` / `refl` / `irr`)
   - 2–4 quick rules → `rules.ts` (`{q, o, a, hr, u}`, exactly one correct option)
   - a short summary → `sheets.ts` (reuse the HTML blocks)
   - optionally a short Paco story with 5–8 gaps → `stories.ts`
     Tag everything with `u: "<id>"`.
6. **Croatian** explanations are short and natural, written for adult beginners.
7. Run `npm test`. Fix any failure in `content.test.ts`.
8. **Report** a table:
   - added (words / verbs / rules / sheets / story)
   - skipped duplicates, with where they already are
   - corrections to the source material and items tagged above the level
   - anything unreadable or uncertain
     Don't commit until the user confirms.
