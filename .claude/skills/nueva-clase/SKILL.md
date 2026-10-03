---
name: nueva-clase
description: Add one class's new material to Cruza el Puente from notebook scans or photos (words, verbs, rules, grammar, a story). Use when the user shares class notes or scans, or says "nova lekcija", "novi sat", "dodaj gradivo" or "nueva clase".
---

# Nueva clase: notebook scans → course content

Read `src/content/AGENTS.md` first. It has the data rules. `docs/ADDING_CONTENT.md` has examples.

## Steps

1. **Transcribe** every page. Keep the teacher's Spanish exactly, accents included, and the Croatian meaning if it's written.
   Mark anything you can't read with `?` and ask instead of guessing.
2. **Class info:** date (ask if it isn't in the notes) and level (default: the newest level that already has content, or ask).
   Append `{ "id": "YYYY-MM-DD", "note": "<2–5 word Spanish summary>" }` to `src/content/updates.json`.
3. **Words** go in `src/content/<level>/topics.ts` as `español | hrvatski | <id>`:
   - Put each word in the existing topic it belongs to. Create a new topic only for a clearly new theme (unique `k`, Spanish `t`, Croatian `hr`, a `mark`).
   - Before adding, search **all** levels for the Spanish text (accent- and case-insensitive). Skip duplicates and never reword existing lines.
   - Add the article to nouns (`la camisa`), both genders for adjectives (`alto / alta`), and alternatives with `=`.
4. **Grammar** from the class:
   - verbs → `verbs.ts` (with `type` / `refl` / `irr`)
   - 2–4 quick rules → `rules.ts`
   - a short summary → `sheets.ts` (reuse the HTML blocks)
   - optionally a short Paco story with 5–8 gaps → `stories.ts`
     Tag everything with `u: "<id>"`.
5. **Croatian** explanations are short and natural, written for adult beginners.
6. Run `npm test`. Fix any failure in `content.test.ts`.
7. **Report** a table:
   - added (words / verbs / rules / sheets / story)
   - skipped duplicates, with where they already are
   - anything unreadable or uncertain
     Don't commit until the user confirms.
