# Dodavanje gradiva

Sve je u `src/content/`. Nakon pusha na `main` GitHub Actions provjeri sadržaj (testovi) i automatski objavi novu verziju.
Ako su obavijesti podešene, pretplaćeni korisnici dobiju i obavijest «Nuevo en Cruza el Puente».

**Najlakše:** u Claude Codeu pošalji slike bilježnice i napiši `/nueva-clase`. Claude prepiše gradivo, rasporedi ga prema
pravilima ispod, pokrene testove i pokaže tablicu promjena prije commita.

```
src/content/
  levels.ts        popis razina (A1.1, A1.2, …)
  updates.json     dnevnik satova (najstariji prvi)
  a1.1/            topics.ts · verbs.ts · rules.ts · stories.ts · sheets.ts
  a1.2/            isto, za novo gradivo
```

## 1. Novi sat → `updates.json`

Dodaj unos **na kraj** liste. Id je datum sata (`GGGG-MM-DD`), a note je kratak opis na španjolskom:

```json
[{ "id": "2026-10-07", "note": "la ropa, ir a + infinitivo" }]
```

Zadnji unos je "zadnji sat". Na početnoj stranici pojavljuje se kartica **Novedades** s oznakom «Nuevo» (i točka na kartici Hoy),
a **Antes de clase** ponavlja baš to gradivo.

## 2. Riječi → `<razina>/topics.ts`

Svaka linija je jedna kartica: `español | hrvatski | id sata`:

```
la camisa | košulja | 2026-10-07
```

Riječ ide u temu kojoj pripada. Nova tema je novi objekt u `TOPICS` (ključ `k` mora biti jedinstven u svim razinama):

```ts
{k:"ropa", t:"La ropa", hr:"odjeća", mark:"blue", v:`
la camisa | košulja | 2026-10-07
`},
```

Pravila:

- Alternative: `el zumo = el jugo` (prihvaćaju se obje), rodovi: `cansado / cansada`, suprotnosti: `fácil ≠ difícil`.
- Napomene u zagradama ne izgovaraju se i ne provjeravaju: `la planta (del edificio)`.
- Ista španjolska riječ smije se pojaviti samo jednom, u svim razinama (test to provjerava).
- **Napredak je vezan uz španjolski tekst.** Ispravak u španjolskom resetira tu karticu svima. Hrvatski dio smiješ slobodno mijenjati.

## 3. Glagoli → `<razina>/verbs.ts`

```ts
{ inf: "llevar", hr: "nositi", u: "2026-10-07" },                                     // pravilan
{ inf: "probar", hr: "probati", type: "o-ue", u: "2026-10-07" },                      // promjena u čizmi
{ inf: "ponerse", hr: "obući", refl: true, irr: ["pongo", …], note: "yo: -go" },     // nepravilan: 6 oblika (bez zamjenice)
```

Oblici se računaju automatski (osnova + nastavak, promjena samoglasnika, zamjenica). Glagoli s `type` sami se pojavljuju u
interaktivnoj čizmi. Nepravilan glagol pojavljuje se u čizmi ako u `note` piše promjena, npr. `e→ie`.

## 4. Pravila → `<razina>/rules.ts`

```ts
["Mañana ___ a comer paella.", ["voy","va","vamos"], 0, "ir a + infinitiv = budućnost.", "2026-10-07"],
```

## 5. Gramatika → `sheets.ts`, priče → `stories.ts`

- **Priče:** praznina je `{opcija|točna*|opcija::objašnjenje}`. Rečenice neka završavaju s `. ! ?` jer čitač čita rečenicu po rečenicu.
- **Gramatika:** HTML blokovi su opisani na vrhu `a1.1/sheets.ts`: `formula`, tablica `para`, `rules` (pravilo + primjer), `words` (riječi kao oblačići).
  Španjolski primjeri idu u `<i>…</i>` i tada se izgovaraju na dodir.

## 6. Razine

Razina se određuje mapom: sve u `a1.2/` je A1.2, ručno označavanje nije potrebno. Nova razina (npr. A2.1):

1. dodaj `{ id: "A2.1", name: "A2.1" }` u `levels.ts`,
2. kopiraj mapu `a1.2/` u `a2.1/` i isprazni liste,
3. registriraj je u `index.ts` (`BY_LEVEL`).

U Ajustes → Nivel korisnik bira jednu ili više razina («Todos» = sve). Razina bez gradiva je siva.

## Provjera

```bash
npm test
```

Testovi u `src/content/content.test.ts` hvataju duplikate, krive id-jeve satova, praznine bez točnog odgovora i slično.
