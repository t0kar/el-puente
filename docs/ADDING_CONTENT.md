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

## 0. Sve provjeri, i ono iz bilježnice

Gradivo iz bilježnice, s ploče ili iz materijala nije automatski točno. Prije unosa provjeri:

- je li španjolski ispravan (naglasci, rod, slaganje) i prirodan u Španjolskoj; latinoamerička riječ ide kao alternativa (`el cacahuete = el maní`),
- je li hrvatski prijevod točan i standardan,
- ima li zadatak **točno jedan** točan odgovor. Ako bi i drugi odgovor bio točan, dodaj kontekst: `(tú)`, `(yo)`, `(slažem se)` / `(ne slažem se)`,
  ili zamijeni ometajuću opciju. Primjer: «— A mí no me gusta estudiar. — A mí ___.» bez oznake prihvaća i _sí_ i _tampoco_,
- je li izraz teži od razine tečaja: tada mu dodaj oznaku `A2` / `B1` / `B2` (vidi dolje).

Greške u izvoru ispravi, a sumnje zapiši i pitaj.

## 2. Riječi → `<razina>/topics.ts`

Svaka linija je jedna kartica: `español | hrvatski`, pa neobavezna polja (svako iza `|`, ovim redom):

- id sata: `2026-10-07`
- razina, samo ako je izraz teži od razine tečaja: `A2`, `B1` ili `B2` (u vježbi dobije žutu oznaku; Ajustes → Expresiones avanzadas ga može sakriti)
- rečenica-primjer: `ej: Španjolska rečenica. → Hrvatski prijevod.` (kratka, A1 gramatika; pokazuje se uz karticu)

```
la camisa | košulja | 2026-10-07 | ej: Paco lleva una camisa azul. → Paco nosi plavu košulju.
el soborno | mito | B2 | ej: El político acepta un soborno. → Političar prima mito.
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
- **Napredak je vezan uz španjolski tekst.** Ako ispraviš španjolski, upiši `"staro": "novo"` u `src/content/renamed.ts`, inače se ta
  kartica svima resetira. Hrvatski dio i primjer smiješ slobodno mijenjati.
- Primjer: svaka riječ ili kratki izraz neka ima `ej:`. Kartica koja je već cijela rečenica (`¿Cómo te llamas?`) ne treba ga.

## 3. Glagoli → `<razina>/verbs.ts`

```ts
{ inf: "llevar", hr: "nositi", u: "2026-10-07" },                                     // pravilan
{ inf: "mentir", hr: "lagati", type: "e-ie", x: "A2" },                               // teže od razine tečaja
{ inf: "probar", hr: "probati", type: "o-ue", u: "2026-10-07" },                      // promjena u čizmi
{ inf: "ponerse", hr: "obući", refl: true, irr: ["pongo", …], note: "yo: -go" },     // nepravilan: 6 oblika (bez zamjenice)
{ inf: "venir", hr: "doći", irr: ["vengo", …], imp: ["ven", "venga"], note: "…" },  // imp = imperativ [tú, usted]
```

Oblici se računaju automatski (osnova + nastavak, promjena samoglasnika, zamjenica). Glagoli s `type` sami se pojavljuju u
interaktivnoj čizmi. Nepravilan glagol pojavljuje se u čizmi ako u `note` piše promjena, npr. `e→ie`.
Imperativ se računa samo za pravilne glagole; za nepravilne i povratne upiši ga u `imp` (`["dúchate", "dúchese"]`)
pa i oni ulaze u vježbu Imperativo.

## 4. Pravila → `<razina>/rules.ts`

```ts
{q:"Mañana ___ a comer paella.", o:["voy","va","vamos"], a:0, hr:"ir a + infinitiv = budućnost.", u:"2026-10-07"},
{q:"(tú) ¿___ a qué hora empieza la clase?", o:["Sabes","Sabe","Sé"], a:0, hr:"tú → SABES. (usted → sabe)"},
```

`q` rečenica s jednom prazninom `___`, `o` opcije, `a` indeks točne, `hr` objašnjenje, `u` id sata, `x` razina ako je teže.
Napomene u zagradama u `q` ne izgovaraju se. Točno jedna opcija smije biti točna.

## 5. Gramatika → `sheets.ts`, priče → `stories.ts`

- **Priče:** praznina je `{opcija|točna*|opcija::objašnjenje}`. Rečenice neka završavaju s `. ! ?` jer čitač čita rečenicu po rečenicu.
  Ako bi i druga opcija bila točna, dodaj kratku rečenicu konteksta u tekst (ne zagrade: tekst se čita naglas i koristi za diktat).
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

Testovi u `src/content/content.test.ts` hvataju duplikate, krive id-jeve satova, nepoznata polja na karticama, pravila bez
jedne praznine ili s dvije iste opcije, krive zapise u `renamed.ts` i slično. Dvosmislenost ne mogu uhvatiti, zato je korak 0 važan.

Korisnici mogu prijaviti grešku u zadatku zastavicom u vježbi. Prijave stižu kao GitHub issue s oznakom `reporte`.
